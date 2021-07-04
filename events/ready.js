module.exports = (client) => {

const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const db = require('quick.db');
const ping = require('ping-tcp-js');
const chalk = require('chalk');
const config = require('../config.json');

  setInterval(() => {
  client.user.setActivity(`Hosting Nodes`,{ type: "WATCHING" });
  },10000);
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");
  console.log("Name: NodeStatus");
  console.log("Version: Alpha");
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");

setInterval(() => {
let hosturl = config.panelurl
let apikey = config.clientapikey
let ch = client.channels.cache.find(cn => cn.id === config.channel)
let statusonline = config.monline
let statusoffline = config.monline
let adminapikey = config.adminapikey
let hostname = config.hostname

let id1 = "Server ID"
let name1 = "**Node Name**"

let dbip1 = "Database Ip"
let dbport1 = "Database Port"
let dbname1 = "**Example DB**"


//Node Status Checker
axios(`${hosturl}/api/client/servers/${id1}/resources`, {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apikey}`,
  }
})
  .then(response => {
  db.set("mn1",`${name1}: ${statusonline}`)
  })
  .catch(err => {
  db.set("mn1",`${name1}: ${statusoffline}`)
  });

//Database Status Checker
ping.ping(dbip1, dbport1)
  .then(() => {
  db.set("db1",`${dbname1}: ${statusonline}`)
  })
  .catch(err => {
  db.set("db1",`${dbname1}: ${statusoffline}`)
  });
  
//Embed Message
  let mn1 = db.get("mn1")
  if(mn1 === null) mn1 = `${name1}: checking status`
  
  let db1 = db.get("db1")
  if(db1 === null) db1 = `${dbname1}: checking status`
  
  let nodemessage = `__**Nodes List**__\n${mn1}\n\n__**DataBases List**__\n${db1}`
  let embed = new MessageEmbed()
  .setTitle(`${hostname} Uptime`)
  .setColor(config.embedcolor)
  .setDescription(nodemessage)
  .setTimestamp()
  .setFooter("Updated every 1 minutes | By Hirzi#8701")
  .setThumbnail(client.user.avatarURL());
   
   ch.send(embed).then(msg => { msg.delete({timeout: 60000}) })
   console.log(chalk.blue('[Hirzi Nodes Checker] ') + chalk.green("Posted Stats"));
   if(mn1 !== null) console.log(chalk.blue('[Hirzi Nodes Checker] ') + chalk.green("Stats Updated"));
   console.log(chalk.blue('[Hirzi Nodes Checker] ') + chalk.green("Next Stats in 60 Seconds"));
}, 60000)
}
