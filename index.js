const { Client, Collection } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const client = new Client();
const config = require('./config.json');

let nodelist = [
{
    id: "Server ID",
    name: "**Example Server 1**",
    nameid: "Node1"
},
{
    id: "Server ID",
    name: "**Example Server 2**",
    nameid: "Node2"
},
//Add more code like bellow to the nodeslist array after comma and before "]" if you want to add more nodes
//{
//    id: "Server ID",
//    name: "**Example Server 3**",
//    nameid: "Node3"
//},
]
client.nodelist = nodelist

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

if(config.token === "BOT TOKEN") console.log(chalk.blue("[PteroStats Checker] ") + chalk.red("Invalid Token, Check ") + chalk.green("config.json") + chalk.red(" file to change token"))
client.login(config.token);
