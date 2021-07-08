module.exports = client => {
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
]
    
    const { MessageEmbed } = require("discord.js");
    const axios = require("axios");
    const db = require("quick.db");
    const ping = require("ping-tcp-js");
    const chalk = require("chalk");
    const config = require("../config.json");
    let hosturl = config.panelurl;
    let apikey = config.clientapikey;
    let ch = client.channels.cache.find(cn => cn.id === config.channel);
    let statusonline = config.monline;
    let statusoffline = config.moffline;
    let checking = config.mcheck
    let adminapikey = config.adminapikey;
    let hostname = config.hostname;
    let time = config.time
    
    setInterval(() => {
      client.user.setActivity(hostname + `Panel Stats`, { type: "WATCHING" });
    }, 10000);

    console.log("=+=+=+=+=+=+=+=+=+=+=+=");
    console.log("Name: PteroStats");
    console.log("Version: Alpha");
    console.log("=+=+=+=+=+=+=+=+=+=+=+=");
  
    //PteroStats Checker
    setInterval(() => {
    if(isNaN(time)) return console.log(chalk.blue("[PteroStats Checker] ") + chalk.red(time + "is not a number!"))
    
      //Node Status Checker
      let list = []
      nodelist.forEach(data => {
      if(data.id === "Server ID") return console.log(chalk.blue("[PteroStats Checker] ") + chalk.red("You need to use a valid server"))
      let id = data.id.replace(/\,/g)
      axios(`${hosturl}/api/client/servers/${data.id}/resources`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`
        }
      }).then((response) => {
          db.set(data.nameid, `${data.name}: ${statusonline}`);
        }).catch(() => {
          db.set(data.nameid, `${data.name}: ${statusoffline}`);
          console.log(chalk.blue("[PteroStats Checker] ") + chalk.red(data.name + " is down!"))
        });
      
      let msgStats = db.get(data.nameid) + '\n'
      list.push(msgStats)
    })
  
      //Panel Status Checker
      //ServerList
      axios(`${hosturl}/api/application/servers`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminapikey}`
        }
      }).then(response => {
          let res = response.data.meta.pagination.total;
          db.set("serverCount", res);
        }).catch(err => {
          db.set("serverCount", "N/A");
          console.log(chalk.blue("[PteroStats Checker] ") + chalk.red("Panel is down"))
        });

      //Userlist
      axios(`${hosturl}/api/application/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminapikey}`
        }
      }).then(response => {
          let res = response.data.meta.pagination.total;
          db.set("userCount", res);
        }).catch(err => {
          db.set("userCount", "N/A");
          console.log(chalk.blue("[PteroStats Checker] ") + chalk.red("Panel is down!"))
        });
    
      let userCount = db.get("userCount")
      let serverCount = db.get("serverCount")
      
      //embed
      if(userCount === null) userCount = checking;
      if(serverCount === null) serverCount = checking;

      if(userCount !== "N/A") db.set("panel", `**Panel**: ${statusonline}`);
      if(userCount === "N/A") {
          db.set("panel", `**Panel**: ${statusoffline}`);
          console.log(chalk.blue("[PteroStats Checker] ") + chalk.red("panel is down!"))
      }
      if(userCount === checking) db.set("panel", `**Panel**: ${checking}`);
      let panel = `${db.get("panel")}\n\nUsers: ${userCount}\nServers: ${serverCount}`;


      if (panel === null) panel = `**Panel**: checking status\n\nUsers: ${userCount}\nServers: ${serverCount}`;
  	  let nodes
      list.forEach((message) => {
          if(!nodes) nodes = message
          nodes = nodes + message
      })
      let nodemessage = `__**Nodes Stats**__\n${nodes}\n\n__**Panel Stats**__\n${panel}`;

      let embed = new MessageEmbed()
        .setTitle(`${hostname} Uptime`)
        .setColor(config.embedcolor)
        .setDescription(nodemessage)
        .setTimestamp()
        .setFooter("Updated every 1 minutes | By Hirzi#8701")
        .setThumbnail(client.user.avatarURL());
  
      ch.send(embed).then(msg => {msg.delete({ timeout: time + "000" });});

      console.log(chalk.blue("[PteroStats Checker] ") + chalk.green("Posted Stats"));
      if (panel !== null)
        console.log(chalk.blue("[PteroStats Checker] ") + chalk.green("Stats Updated")
        );
      console.log(chalk.blue("[PteroStats Checker] ") +chalk.green("Updating Stats in " + time + " Seconds"));
    }, time + "000");
  };
  
