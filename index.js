const { Client, Intents } = require('discord.js')
const fs = require('fs')
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
})
const yaml = require('js-yaml')
const chalk = require('chalk')
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))
client.config = config

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
    })
})

if (config.token === 'BOT TOKEN') console.log(chalk.blue('[PteroStats Checker] ') + chalk.red('Invalid Token, Check ') + chalk.green('config.yml') + chalk.red(' file to change token'))
client.login(config.token)
