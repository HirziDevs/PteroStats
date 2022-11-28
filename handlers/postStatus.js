const { EmbedBuilder, time, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js')
const chalk = require('chalk')

module.exports = async function postStatus({ client, panel, nodes }) {

	const channel = await client.channels.cache.get(client.config.channel)
	if (!channel) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Channel ID'))

	const files = []
	const embed = new EmbedBuilder()
	let messages = await channel.messages.fetch({ limit: 10 }).then(msg => msg.filter(m => m.author.id === client.user.id).last())
	let text = ''
	let desc = ''
	let blacklist = 0
	let content = null

	if (!client.config.nodes_resource.blacklist) client.config.nodes_resource.blacklist = []
	if (!Array.isArray(client.config.nodes_resource.blacklist) && Number.isInteger(client.config.nodes_resource.blacklist)) client.config.nodes_resource.blacklist = [client.config.nodes_resource.blacklist]
	if (client.guilds.cache.size < 1) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! This bot is not on any discord servers'))
	if (messages && messages.embeds.length < 1) {
		messages.delete()
		messages = null
	}

	if (client.config.message.content) content = client.config.message.content
	if (client.config.message.attachment) files.push(new AttachmentBuilder(client.config.message.attachment))
	if (client.config.embed.title) embed.setTitle(client.config.embed.title)
	if (client.config.embed.description) desc = client.config.embed.description + '\n'
	if (client.config.embed.color) embed.setColor(client.config.embed.color)
	if (client.config.embed.footer) embed.setFooter({ text: client.config.embed.footer })
	if (client.config.embed.thumbnail) embed.setThumbnail(client.config.embed.thumbnail)
	if (client.config.embed.image) embed.setImage(client.config.embed.image)

	panel.total_users = panel.total_users.toLocaleString()
	panel.total_servers = panel.total_servers.toLocaleString()

	const stats = new Promise((resolve, reject) => {
		if (nodes.length !== 0) {
			nodes.forEach((data, i) => {
				if (!client.config.nodes_resource.blacklist.includes(data.id)) {
					const title = data.name + ': ' + String(data.status).replace('true', client.config.status.online).replace('false', client.config.status.offline)
					let description = '```'
					switch (client.config.nodes_resource.unit.toLowerCase()) {
						case 'tb':
							description = description +
								'\nMemory : ' + Math.floor(data.memory_min / (1024 * 1000)).toLocaleString() + ' TB / ' + Math.floor(data.memory_max / (1024 * 1000)).toLocaleString() + ' TB' +
								'\nDisk : ' + Math.floor(data.disk_min / (1024 * 1000)).toLocaleString() + ' TB / ' + Math.floor(data.disk_max / (1024 * 1000)).toLocaleString() + ' TB'
							break;
						case 'gb':
							description = description +
								'\nMemory : ' + Math.floor(data.memory_min / 1024).toLocaleString() + ' GB / ' + Math.floor(data.memory_max / 1024).toLocaleString() + ' GB' +
								'\nDisk : ' + Math.floor(data.disk_min / 1024).toLocaleString() + ' GB / ' + Math.floor(data.disk_max / 1024).toLocaleString() + ' GB'
							break;
						case 'percent':
							description = description +
								'\nMemory : ' + Math.floor(data.memory_min / data.memory_max * 100) + ' %' +
								'\nDisk : ' + Math.floor(data.disk_min / data.disk_max * 100) + ' %'
							break;
						default:
							description = description +
								'\nMemory : ' + data.memory_min.toLocaleString() + ' MB / ' + data.memory_max.toLocaleString() + ' MB' +
								'\nDisk : ' + data.disk_min.toLocaleString() + ' MB / ' + data.disk_max.toLocaleString() + ' MB'
					}

					if (client.config.nodes_resource.servers) description = description + '\nServers : ' + data.total_servers.toLocaleString()
					if (client.config.nodes_resource.location) description = description + '\nLocation : ' + data.location
					if (client.config.nodes_resource.allocations) description = description + '\nAllocations : ' + data.allocations.toLocaleString()

					description = description + '\n```'

					if (client.config.nodes_resource.enable) {
						text = text + '\n**' + title.replace(':', ':**') + '\n' + description
					} else {
						text = text + '\n**' + title.replace(':', ':**')
					}
				} else {
					blacklist = blacklist + 1
					if (nodes.length - client.config.nodes_resource.blacklist.length < 1) text = '\nThere is no nodes to display'
				}

				if (i + 1 === nodes.length) resolve()
			})
		} else if (nodes.length < 1) {
			if (!messages) {
				text = '\nThere is no nodes to display'
				resolve()
			} else {
				text = messages.embeds[0].description.replaceAll(client.config.status.online, client.config.status.offline)
				if (!panel.status && String(String(messages.embeds[0].fields[0].value).split('\n')[2]).split('')[String(String(messages.embeds[0].fields[0].value).split('\n')[2]).length - 1] !== '`') {
					panel.total_users = String(String(messages.embeds[0].fields[0].value).split('\n')[2]).split('')[String(String(messages.embeds[0].fields[0].value).split('\n')[2]).length - 1]
					panel.total_servers = String(String(messages.embeds[0].fields[0].value).split('\n')[3]).split('')[String(String(messages.embeds[0].fields[0].value).split('\n')[3]).length - 1]
				}
				resolve()
			}
		}
	})

	stats.then(async () => {
		const format = await time(new Date(Date.now() + client.config.refresh * 1000), 'R')
		embed.setDescription(desc.replaceAll('{{time}}', format) + '\n**Nodes Stats [' + Math.floor(nodes.length - blacklist) + ']**' + text)
		const EmbedFields = []

		if (client.config.panel_resource.enable) {
			let stats = '**Status:** ' + String(panel.status).replace('true', client.config.status.online).replace('false', client.config.status.offline) + '\n\n'

			if (client.config.panel_resource.users) stats = stats + 'Users: ' + String(panel.total_users).replace('-1', '`Unknown`') + '\n'
			if (client.config.panel_resource.servers) stats = stats + 'Servers: ' + String(panel.total_servers).replace('-1', '`Unknown`')

			EmbedFields.push({ name: 'Panel Stats', value: stats })
		}

		if (client.config.embed.field.enable) EmbedFields.push({ name: client.config.embed.field.title, value: client.config.embed.field.description.replaceAll('{{time}}', format) })
		if (client.config.embed.timestamp) embed.setTimestamp()
		if (EmbedFields.length > 0) embed.addFields(EmbedFields)

		const row = []

		if (client.config.button.enable) {
			const button = new ActionRowBuilder
			if (client.config.button.btn1.label.length !== 0 && client.config.button.btn1.url.length !== 0) {
				button.addComponents(
					new ButtonBuilder()
						.setLabel(client.config.button.btn1.label)
						.setStyle(ButtonStyle.Link)
						.setURL(client.config.button.btn1.url)
				)
			}
			if (client.config.button.btn2.label.length !== 0 && client.config.button.btn2.url.length !== 0) {
				button.addComponents(
					new ButtonBuilder()
						.setLabel(client.config.button.btn2.label)
						.setStyle(ButtonStyle.Link)
						.setURL(client.config.button.btn2.url)
				)
			}
			if (client.config.button.btn3.label.length !== 0 && client.config.button.btn3.url.length !== 0) {
				button.addComponents(
					new ButtonBuilder()
						.setLabel(client.config.button.btn3.label)
						.setStyle(ButtonStyle.Link)
						.setURL(client.config.button.btn3.url)
				)
			}
			if (client.config.button.btn4.label.length !== 0 && client.config.button.btn4.url.length !== 0) {
				button.addComponents(
					new ButtonBuilder()
						.setLabel(client.config.button.btn4.label)
						.setStyle(ButtonStyle.Link)
						.setURL(client.config.button.btn4.url)
				)
			}
			if (client.config.button.btn5.label.length !== 0 && client.config.button.btn5.url.length !== 0) {
				button.addComponents(
					new ButtonBuilder()
						.setLabel(client.config.button.btn5.label)
						.setStyle(ButtonStyle.Link)
						.setURL(client.config.button.btn5.url)
				)
			}
			row.push(button)
		}

		if (!messages) channel.send({ content: content, embeds: [embed], components: row, files: files })
		else messages.edit({ content: content, embeds: [embed], components: row, files: files })
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('Stats posted!'))
	})
}