const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const yaml = require('js-yaml');
const chalk = require('chalk');

// Load config file and bind it to the process.env so that we can access it from other files
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
process.env = config

// Register all events files from the events folder
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
    })
})

// Login to the bot
if (process.env.client.token === 'Discord Bot Token') console.log(chalk.blue('[PteroStats Checker] ') + chalk.red('Please provide a bot token to run the bot on, Check ') + chalk.green('config.yml') + chalk.red(' file to change the token'))
client.login(process.env.client.token)
