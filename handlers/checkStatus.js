const { EmbedBuilder } = require('discord.js')
const axios = require('axios')
const axiosRetry = require("axios-retry")
const chalk = require('chalk')

axiosRetry(axios, { retries: 5 })

const postStatus = require('./postStatus')

module.exports = function checkStatus({ client }) {

	function Embed({ node }) {
		return new EmbedBuilder()
			.setTitle('Node Logging') //if you wanted to change this please change at line 175 too
			.setDescription('`' + node.name + '` is down!')
			.setFooter({ text: 'Please see console for more details' })
			.setTimestamp()
			.setColor('ED4245')
	}

	if (client.config.channel.startsWith('Put')) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Channel ID'))
		process.exit()
	} else if (client.config.panel.url.startsWith('Put')) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Panel URL'))
		process.exit()
	} else if (client.config.panel.key.startsWith('Put')) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Apikey'))
		process.exit()
	} else if (!client.config.panel.url.startsWith('http')) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Panel URL'))
		console.log(chalk.cyan('[PteroStats] ') + chalk.red('1. Make sure the panel url is starts with "https://" or "http://"'))
		process.exit()
	}

	if (client.config.panel.url.endsWith('/')) client.config.panel.url = client.config.panel.url.slice(0, -1)

	const nodes = []
	const embeds = []

	const panel = {
		status: false,
		total_servers: -1,
		total_users: -1,
	}

	console.log(chalk.cyan('[PteroStats] ') + chalk.green('Getting nodes stats'))

	const panelStats = new Promise((resolve, reject) => {
		axios(client.config.panel.url + '/api/application/users', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + client.config.panel.key
			}
		}).then((users) => {
			axios(client.config.panel.url + '/api/application/servers', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + client.config.panel.key
				}
			}).then((servers) => {
				panel.total_users = users.data.meta.pagination.total
				panel.total_servers = servers.data.meta.pagination.total
				panel.status = true

				resolve()
			})
		}).catch((error) => {
			if (error.response) {
				if (error.response.status === 403) {
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid apikey'))
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('1. Make sure the apikey is from admin page not account page'))
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('2. Make sure the apikey has read permission on all options'))
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('3. Make sure the apikey is exist'))
				} else if (error.response.status === 404) {
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Panel URL'))
					console.log(chalk.cyan('[PteroStats] ') + chalk.red('1. Make sure the panel url is like "https://panel.example.com"'))
				} else console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! ' + error))
			} else console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! ' + error))
			resolve()
		})
	})

	const nodeStats = new Promise((resolve, reject) => {
		axios(client.config.panel.url + '/api/application/nodes?include=servers,location,allocations', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + client.config.panel.key
			}
		}).then((res) => {
			res.data.data.forEach((node, i) => {
				axios(client.config.panel.url + '/api/application/nodes/' + node.attributes.id + '/configuration', {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + client.config.panel.key
					}
				}).then((data) => {
					const body = {
						id: node.attributes.id,
						name: node.attributes.name,
						location: node.attributes.relationships.location.attributes.short,
						allocations: node.attributes.relationships.allocations.data.length,
						maintenance: node.attributes.maintenance_mode,
						total_servers: node.attributes.relationships.servers.data.length,
						memory_min: node.attributes.allocated_resources.memory,
						memory_max: node.attributes.memory,
						disk_min: node.attributes.allocated_resources.disk,
						disk_max: node.attributes.disk,
					}

					const stats = new Promise((statsResolve, statsReject) => {
						axios(node.attributes.scheme + '://' + node.attributes.fqdn + ':' + node.attributes.daemon_listen + '/api/servers', {
							method: 'GET',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + data.data.token
							}
						}).then(() => {
							body.status = true
							return statsResolve()
						}).catch((error) => {
							if (client.config.log_error) console.log(chalk.cyan('[PteroStats] ') + chalk.yellow('[Node: ' + node.attributes.name + '] ') + chalk.red(error))
							embeds.push(Embed({ node: body }))
							body.status = false
							return statsResolve()
						})
						setTimeout(() => {
							if (body.status === undefined) {
								if (client.config.log_error) console.log(chalk.cyan('[PteroStats] ') + chalk.yellow('[Node: ' + node.attributes.name + '] ') + chalk.red('Timeout!'))
								embeds.push(Embed({ node: body }))
								body.status = false
								return statsResolve()
							}
						}, client.config.timeout * 1000)
					})
					stats.then(() => {
						nodes.push(body)
						if (nodes.length === res.data.data.length) resolve()
					})
				}).catch(() => resolve())
			})
		}).catch(() => resolve())
	})

	panelStats.then(() => {
		nodeStats.then(async () => {
			nodes.sort(function (a, b) { return a.id - b.id })
			postStatus({ client: client, panel: panel, nodes: nodes })

			// this feature is still in testing
			if (client.config.mentions.user.length > 0 || client.config.mentions.role.length > 0 && client.config.mentions.channel) {
				if (Array.isArray(client.config.mentions.user) || Array.isArray(client.config.mentions.role)) {
					let mentions = ''

					await client.config.mentions.user.forEach((user) => {
						if (!isNaN(Number(user))) {
							mentions = mentions + ' <@' + user + '>'
						}
					})
					await client.config.mentions.role.forEach((role) => {
						if (!isNaN(Number(role))) {
							mentions = mentions + ' <@&' + role + '>'
						}
					})

					const channel = await client.channels.cache.get(client.config.mentions.channel)
					if (channel) {
						const messages = await channel.messages.fetch({ limit: 10 }).then(msg => msg.filter(m => m.author.id === client.user.id && m.embeds[0].data.title === 'Node Logging').first())
						if (messages) messages.embeds.forEach((MsgEmbed) => {
							embeds.forEach((embed, i) => {
								if (MsgEmbed.data.description === embed.data.description) embeds.splice(i, 1)
								nodes.forEach((node) => {
									if (MsgEmbed.data.description.startsWith('`' + node.name) && node.status === true) messages.delete()
								})
							})
						})
						if (embeds.length > 0) channel.send({ content: mentions, embeds: embeds })
					}
				}
			}
		})
	})
}