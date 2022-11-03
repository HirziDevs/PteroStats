const chalk = require('chalk')
const checkStatus = require('../handlers/checkStatus')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('Bot is up!'))
		console.log(chalk.cyan('[PteroStats] ') + chalk.green('If you need support you can join our discord server https://discord.gg/zv6maQRah3'))

		if (client.guilds.cache.size < 1) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Err! This bot is not on any discord servers'))

		if (client.config.bot_status.enable && client.config.bot_status.text.length > 0) {
			if (!['PLAYING', 'WATCHING', 'LISTENING', 'COMPETING'].includes(client.config.bot_status.type.toUpperCase() || client.config.bot_status.type.length < 1)) {
				console.log(chalk.cyan('[PteroStats] ') + chalk.red('Err! Invalid Status Type!, Can be "WATCHING", "PLAYING", "LISTENING", or "COMPETING"'))
			} else {
				client.user.setActivity(client.config.bot_status.text, { type: client.config.bot_status.type.toUpperCase() })
			}
		}

		if (client.config.refresh < 10) console.log('Refresh lower than 10 seconds is not recommended!')

		checkStatus(client)

		setInterval(() => {
			checkStatus(client)
		}, client.config.refresh * 1000)
	}
}