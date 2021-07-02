const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client();
const axios = require('axios')
const node = require('nodeactyl')
require("discord-buttons")(client);

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		client.commands.set(commandName, props);
	});
});

client.login("ODU5MzA0NzQyOTcwODUxMzI5.YNqv5w.3ZqRw_qTN6seZt_Ue5K9BYJJzs4");

setInterval(() => {
let hosturl = "https://host.itzy-store.net"
let id = "6154c1cc"
let apikey = "hgQGH3wpNVP98FTxl2PDOmjQLLmz4WBHsDft1HQPcosqPevS"

let Client = new node.NodeactylClient(hosturl, apikey);
const stats = Client.getServerUsages(id);
const status = (stats.current_state);

const ch = client.channels.cache.get('837238494765645834')
const msg = ch.messages.cache.get('860438916275240971')

if(status === 'offline') {
msg.edit(`Node is online\nTime : ${Date.now()}`)
} else if(status !== 'offline') {
msg.edit(`Node is offline\nTime : ${Date.now()}`)
}

}, 20000)
