const chalk = require('chalk')
const checkStatus = require('../handlers/checkStatus')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.cyan('[PteroStats]') + chalk.green(' Bot is up!'))
        console.log(chalk.cyan('[PteroStats]') + chalk.green(' If you need support you can join our discord server https://discord.gg/zv6maQRah3'))

        if (client.guilds.cache.size === 0) return console.log(chalk.cyan('[PteroStats]') + chalk.red(' There is bot is not in servers, please invite the bot first!'))

        if (client.config.bot_status.enable) {
            if (!['PLAYING', 'WATCHING', 'LISTENING', 'COMPETING'].includes(client.config.status.type)) {
                console.log('Invalid Status Type!, Can be "WATCHING", "PLAYING", "LISTENING", or "COMPETING"')
            } else {
                client.user.setActivity(client.config.status.text, { type: client.config.status.type })
            }
        }

        if (client.config.refresh < 10) console.log('Refresh below 10 seconds is not recommended!')

        checkStatus(client)

        setInterval(async () => {
            checkStatus(client)
        }, client.config.refresh * 1000)
    }
}