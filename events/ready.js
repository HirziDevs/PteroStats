const chalk = require('chalk')
const checkStatus = require('../handlers/checkStatus')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(chalk.cyan('[PteroStats] ') + chalk.green('Bot is up!'))
        console.log(chalk.cyan('[PteroStats] ') + chalk.green('If you need support you can join our discord server https://discord.gg/zv6maQRah3'))

        if (client.guilds.cache.size < 1) return console.log(chalk.cyan('[PteroStats] ') + chalk.red('Err! This bot is not on any discord servers'))

        if (client.config.bot_status.enable) {
            if (!['PLAYING', 'WATCHING', 'LISTENING', 'COMPETING'].includes(client.config.bot_status.type)) {
                console.log(chalk.cyan('[PteroStats] ') + chalk.red('Err! Invalid Status Type!, Can be "WATCHING", "PLAYING", "LISTENING", or "COMPETING"'))
            } else {
                client.user.setActivity(client.config.bot_status.text, { type: client.config.bot_status.type })
            }
        }

        if (client.config.refresh < 10) console.log('Refresh below 10 seconds is not recommended!')

        checkStatus(client)

        setInterval(() => {
            checkStatus(client)
        }, client.config.refresh * 1000)
    }
}