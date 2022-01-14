const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()

const fs = require('fs')
const { readdirSync } = require('fs')
const { join } = require ('path')
const axios = require('axios');

const yaml = require('js-yaml')
const chalk = require('chalk')
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))

const bytesConverter = require("./calculator/bytesConverter.js")
const percentageCalculator = require("./calculator/percentageCalculator.js")
const timeConverter = require("./calculator/timeConverter.js")
const APIFetcher = require("./fetcher/APIFetcher.js")


client.config = config

let prefix = client.config.prefix
let botCommandsChannelID = client.config.botCommandsChannelID
let adminRoleID = client.config.adminRoleID

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for(const file of commandFiles){
  const command = require(join(__dirname, "commands", `${file}`))
  client.commands.set(command.name,command)
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
  })
})

client.on("message", async message => {
  if (message.guild) {
    if (message.author.bot) {
      return
    }
    if (message.content.startsWith(prefix)) {
      if (!client.config.panel.url) {
        embed.setDescription("Panel URL not set.")
          .setColor(0xff4747)
        await message.channel.send(embed).catch(error => { })
        return
      }
      if(botCommandsChannelID && botCommandsChannelID != "null" && botCommandsChannelID != ""){
        if(message.channel.id != botCommandsChannelID){
          return
        }
      }

      let args = await message.content.slice(prefix.length).split(/ +/)  
      
      let command = args.shift().toLowerCase()

      if(client.commands.has(command)){
        await client.commands.get(command).run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter)
      }
    }
  }
})

if (config.token === 'BOT TOKEN') console.log(chalk.blue('[PteroStats Checker] ') + chalk.red('Invalid Token, Check ') + chalk.green('config.yml') + chalk.red(' file to change token'))
client.login(config.token)
