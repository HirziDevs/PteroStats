const { Client, Collection } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const client = new Client();
const axios = require('axios')
const db = require("quick.db")
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
let name1 = "**Node is-a6**"
let id2 = "1151dae7"
let name2 = "**Node is-b1**"
let id3 = "6fcc4ff0"
let name3 = "**Node is-b2**"
let id4 = "e165f6ba"
let name4 = "**Node is-b5**"
let id5 = "899c59c4"
let name5 = "**Node VectorCraft**"
let id6 = "0482c8db"
let name6 = "**Node is-ss1**"
let id7 = "cfc4c6d4"
let name7 = "**Node is-c1**"
let id8 = "3e96a95b"
let name8 = "**Node is-c2**"

let statusonline = ":green_circle: Online"
let statusoffline = ":red_circle: Offline"

axios(`${hosturl}/api/client/servers/${id1}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  db.set("mn1 ",`${name1}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn1 ",`${name1}: ${statusoffline}`)
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
  db.set("mn2 ",`${name2}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn2 ",`${name2}: ${statusoffline}`)
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
  db.set("mn3 ",`${name3}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn3 ",`${name3}: ${statusoffline}`)
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
  db.set("mn4 ",`${name4}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn4 ",`${name4}: ${statusoffline}`)
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
  db.set("mn5 ",`${name5}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn5 ",`${name5}: ${statusoffline}`)
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
  db.set("mn6 ",`${name6}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn6 ",`${name6}: ${statusoffline}`)
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
  db.set("mn7 ",`${name7}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn7 ",`${name7}: ${statusoffline}`)
  });

axios(`${hosturl}/api/client/servers/${id8}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  db.set("mn8 ",`${name8}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn8 ",`${name8}: ${statusoffline}`)
  });
  
  let mn1 = db.get("mn1 ")
  let mn2 = db.get("mn2 ")
  let mn3 = db.get("mn3 ")
  let mn4 = db.get("mn4 ")
  let mn5 = db.get("mn5 ")
  let mn6 = db.get("mn6 ")
  let mn7 = db.get("mn7 ")
  let mn8 = db.get("mn8 ")
  
  let nodemessage = `__**Node List**__\n${mn1}\n${mn2}\n${mn3}\n${mn4}\n${mn5}\n${mn6}\n${mn7}\n${mn8}\n\n__**DataBases**__\n**MariaDB**: NA`
  let embed = new MessageEmbed()
  .setTitle('ItzStore Status')
  .setColor("E5BE11")
  .setDescription(nodemessage)
  .setTimestamp()
  .setFooter("Updated every 1 minutes")

  ch.send(embed).then(msg => { msg.delete({timeout: 60000}) })
}, 60000)
