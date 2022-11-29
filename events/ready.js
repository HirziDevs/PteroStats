const { ActivityType } = require('discord.js')
const chalk = require('chalk')
const checkStatus = require('../handlers/checkStatus')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('Bot is up!'))
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('If you need support you can join our discord server https://discord.gg/zv6maQRah3'))

		if (client.guilds.cache.size < 1) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! This bot is not on any discord servers'))
		if (client.config.refresh < 10) console.log(chalk.cyan('[PteroStats] ') + chalk.red('Refresh lower than 10 seconds is not recommended!'))

		if (client.config.bot_status || client.config.nodes_resource || client.config.panel_resource) {
			console.log(chalk.cyan('[PteroStats] ') + chalk.red('You used `bot_status`, `panel_resource` and `nodes_resource` instead of `presence`, `panel_settings` and `nodes_settings` in the config, please update your config file at ') + chalk.green('https://github.com/HirziDevs/PteroStats/blob/main/config.yml ') + chalk.red('before it can no longer be supported'))
			client.config.presence = client.config.bot_status
			client.config.nodes_settings = client.config.nodes_resource
			client.config.panel_settings = client.config.panel_resource
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