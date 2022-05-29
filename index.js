const fs = require('fs');
const child = require("child_process")

if (Number(process.version.split('.')[0]) < 16) {
    console.log('Invalid NodeJS Version!, Please use NodeJS 16.x or upper')
    process.exit()
}
if (fs.existsSync('./node_modules')) {
    const check = require('./node_modules/discord.js/package.json')
    if (Number(check.version.split('.')[0]) !== 13) {
        console.log('Invalid Discord.JS Version!, Please use Discord.JS 13.x')
        process.exit()
    }
} else {
    console.log('You are not installing package first, please wait until Auto Installer complete.')
    child.execSync('npm i').catch((err) => {
      console.log('An error detected: ', err)
      console.log('Need Support? https://discord.gg/zv6maQRah3')
      process.exit()
    })
    console.log("Auto Installer complete! Please re run this bot!")
    process.exit()
}

const yaml = require('js-yaml');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Load Config
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
client.config = config

// Read Events Files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (client) => event.execute(client));
    } else {
        client.on(event.name, (client) => event.execute(client));
    }
}

// Login to bot
try {
    client.login(config.token);
} catch (Err) {
    console.log('Invalid discord bot token')
    process.exit()
}
