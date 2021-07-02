const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client();
const axios = require('axios')
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
axios({
        url: hosturl + "/api/client/servers/" + id + "/resources",
        method: 'GET',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            'Authorization': 'Bearer ' + apikey,
            'Content-Type': 'application/json',
            'Accept': 'Application/vnd.pterodactyl.v1+json',
        }
    }).then(response => {
        let status = "true"
        client.channels.cache.get("837238494765645834").send(status);
    }).catch(error => {
        let status = "false"
        client.channels.cache.get("837238494765645834").send(status);
    })

}, 10000)
