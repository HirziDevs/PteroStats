const { Client, Collection } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const client = new Client();
const config = require('./config.json');

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.login(config.token);
