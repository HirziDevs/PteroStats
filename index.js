const { Client, Collection, Intents, MessageEmbed, Permissions } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const path = require('path')
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

const clientID = client.config.clientID;
const token = client.config.token;
const guildID = client.config.serverID;

client.commands = new Collection();
const commands = [];
let commandsDirectoryLocation = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsDirectoryLocation).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

let eventsDirectoryLocation = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsDirectoryLocation).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const embedConfig = require("./embedConfig.json")

  let embed = new MessageEmbed()
    .setColor(embedConfig.defaultColor)

  const event = require(`./events/${file}`);

  try{
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, embed, MessageEmbed, config, embedConfig, Permissions, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, embed, MessageEmbed, config, embedConfig, Permissions, ...args));
    }
  }catch (error){
    console.log(`Error in emitting an event-\n${error}`)
  }
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

if (config.token === 'BOT TOKEN') console.log(chalk.blue('[PteroStats Checker] ') + chalk.red('Invalid Token, Check ') + chalk.green('config.yml') + chalk.red(' file to change token'))

client.login(config.token)
