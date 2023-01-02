const { ActivityType } = require('discord.js')
const chalk = require('chalk')
const checkStatus = require('../handlers/checkStatus')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('Bot is up!'))
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('If you need support you can join our discord server https://discord.gg/zv6maQRah3'))
		console.log(chalk.cyan('[PteroStats] ') + chalk.yellow('If some node is online but the embed is read as offline, please enable ') + chalk.green('log_error') + chalk.yellow(' on config file and report it at https://discord.gg/zv6maQRah3'))

		if (client.guilds.cache.size < 1) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! This bot is not on any discord servers'))
		if (client.config.timeout < 1) {
			console.log(chalk.cyan('[PteroStats] ') + chalk.red('Timeout cannot be less than 1 seconds!'))
			client.config.timeout = 1
		}

		if (client.config.refresh > 1 && client.config.refresh < 10) console.log(chalk.cyan('[PteroStats] ') + chalk.red('Refresh Time below 10 seconds is not recommended!'))
		else if (client.config.refresh < 1) {
			console.log(chalk.cyan('[PteroStats] ') + chalk.red('Refresh Time cannot be less than 1 seconds!'))
			client.config.refresh = 10
		}

		if (client.config.presence.text && client.config.presence.type) {
			switch (client.config.presence.type.toLowerCase()) {
				case 'playing':
					client.config.presence.type = ActivityType.Playing
					break;
				case 'listening':
					client.config.presence.type = ActivityType.Listening
					break;
				case 'competing':
					client.config.presence.type = ActivityType.Competing
					break;
				default:
					client.config.presence.type = ActivityType.Watching
			}

			client.user.setActivity(client.config.presence.text, { type: client.config.presence.type })
		}

		if (client.config.presence.status) {
			if (!['idle', 'online', 'dnd', 'invisible'].includes(client.config.presence.status.toLowerCase())) client.config.presence.status = 'online'

			client.user.setStatus(client.config.presence.status);
		}

		checkStatus({ client: client })

		setInterval(() => {
			checkStatus({ client: client })
		}, client.config.refresh * 1000)
	}
}