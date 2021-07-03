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
let hosturl = "https://host.itzystore.xyz"
let apikey = "hgQGH3wpNVP98FTxl2PDOmjQLLmz4WBHsDft1HQPcosqPevS"
let ch = client.channels.cache.find(cn => cn.id === '837238424628363294')

let id1 = "6154c1cc"
let name1 = "is-a6"
let id2 = "1151dae7"
let name2 = "is-b1"
let id3 = "6fcc4ff0"
let name3 = "is-b2"
let id4 = "e165f6ba"
let name4 = "is-b3"
let id5 = "899c59c4"
let name5 = "vectorcraft"
let id6 = "0482c8db"
let name6 = "is-ss1"
let id7 = "cfc4c6d4"
let name7 = "is-c1"

axios(`${hosturl}/api/client/servers/${id1}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn1 = `Node ${name1} is :green_circle: online`
  })
  .catch(err => {
  let mn1 = `Node ${name1} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id2}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn2 = `Node ${name2} is :green_circle: online`
  })
  .catch(err => {
  let mn2 = `Node ${name2} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id3}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn3 = `Node ${name3} is :green_circle: online`
  })
  .catch(err => {
  let mn3 = `Node ${name3} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id4}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn4 = `Node ${name4} is :green_circle: online`
  })
  .catch(err => {
  let mn4 = `Node ${name4} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id5}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn5 = `Node ${name5} is :green_circle: online`
  })
  .catch(err => {
  let mn5 = `Node ${name5} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id6}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn6 = `Node ${name6} is :green_circle: online`
  })
  .catch(err => {
  let mn6 = `Node ${name6} is :red_circle: offline`
  });
	
axios(`${hosturl}/api/client/servers/${id7}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  let mn7 = `Node ${name7} is :green_circle: online`
  })
  .catch(err => {
  let mn7 = `Node ${name7} is :red_circle: offline`
  });
  
  let nodemessage = `${mn1}\n${mn2}\n${mn3}\n${mn4}\n${mn5}\n${mn6}\n${mn7}`
  let embed = new Discord.MessageEmbed()
  .setTitle('Node List')
  .setDescription(nodemessage)

  ch.send(embed).then(msg => { msg.delete({timeout: 60000}) })
}, 60000)
