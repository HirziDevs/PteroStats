module.exports = client => {
  const { MessageEmbed } = require("discord.js");
  const axios = require("axios");
  const db = require("quick.db");
  const ping = require("ping-tcp-js");
  const pterostatus = require("pterostatus");
  const chalk = require("chalk");
  const config = require("../config.json");

  setInterval(() => {
    client.user.setActivity(`Hosting Nodes`, { type: "WATCHING" });
  }, 10000);
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");
  console.log("Name: PteroStats");
  console.log("Version: Alpha");
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");

  //PteroStats Checker
  setInterval(() => {
    let hosturl = config.panelurl;
    let apikey = config.clientapikey;
    let ch = client.channels.cache.find(cn => cn.id === config.channel);
    let statusonline = config.monline;
    let statusoffline = config.monline;
    let adminapikey = config.adminapikey;
    let hostname = config.hostname;

    let id1 = "Server ID";
    let name1 = "**Node Name**";

    let dbip1 = "Database Ip";
    let dbport1 = "Database Port";
    let dbname1 = "**DB Name**";

    //Node Status Checker
    axios(`${hosturl}/api/client/servers/${id1}/resources`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`
      }
    })
      .then(response => {
        db.set("mn1", `${name1}: ${statusonline}`);
      })
      .catch(err => {
        db.set("mn1", `${name1}: ${statusoffline}`);
      });

    //Database Status Checker
    ping
      .ping(dbip1, dbport1)
      .then(() => {
        db.set("db1", `${dbname1}: ${statusonline}`);
      })
      .catch(err => {
        db.set("db1", `${dbname1}: ${statusoffline}`);
      });

    //Panel Status Checker
    ping
      .ping({ hosturl })
      .then(() => {
        db.set("panel", `Panel: ${statusonline}`);
      })
      .catch(err => {
        db.set("panel", `Panel: ${statusoffline}`);
      });
    axios(`${hosturl}/api/application/servers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminapikey}`
      }
    })
      .then(response => {
        let res = response.data.meta.pagination.total;
        db.set("serverCount", res);
      })
      .catch(err => {
        db.set("serverCount", "N/A");
      });
    axios(`${hosturl}/api/application/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminapikey}`
      }
    })
      .then(response => {
        let res = response.data.meta.pagination.total;
        db.set("userCount", res);
      })
      .catch(err => {
        db.set("userCount", "N/A");
      });

    //Embed Message
    let mn1 = db.get("mn1");
    if (mn1 === null) mn1 = `${name1}: checking status`;

    let db1 = db.get("db1");
    if (db1 === null) db1 = `${dbname1}: checking status`;

    let panel = `${db.get(
      "panel"
    )}\n\nUsers: ${userCount}\nServers: ${serverCount}`;
    if (panel === null)
      panel = `Panel: checking status\n\nUsers: ${userCount}\nServers: ${serverCount}`;

    let nodemessage = `__**Nodes Stats**__\n${mn1}\n\n__**DataBases Stats**__\n${db1}\n\n__**Panel Stats**__\n${panel}`;
    let embed = new MessageEmbed()
      .setTitle(`${hostname} Uptime`)
      .setColor(config.embedcolor)
      .setDescription(nodemessage)
      .setTimestamp()
      .setFooter("Updated every 1 minutes | By Hirzi#8701")
      .setThumbnail(client.user.avatarURL());

    ch.send(embed).then(msg => {
      msg.delete({ timeout: 60000 });
    });
    console.log(
      chalk.blue("[PteroStats Nodes Checker] ") + chalk.green("Posted Stats")
    );
    if (panel !== null)
      console.log(
        chalk.blue("[PteroStats Nodes Checker] ") + chalk.green("Stats Updated")
      );
    console.log(
      chalk.blue("[PteroStats Checker] ") +
        chalk.green("Updating Stats in 60 Seconds")
    );
  }, 60000);
};
