## PteroStats (1.0)

![img](https://media.discordapp.net/attachments/796259732683227157/861126504246411264/20210704_130856.jpg)

## Introduction

PteroStats is a bot designed to check Panel, Nodes, and Databases status and post it to discord server

* Written in Javascript, CloudServer is faster and more stable.
* PteroControl can be used with any server on Pterodactyl, irregardless of whether it's on shared hosting or your own hosted panel

PteroStats is still **under development** and we welcome contributions. 

Installation
--------------------

- `Create server at your pterodactyl panel and copy the server id`
- `Paste the server id at nodelist array` [index.js line 17](https://github.com/HirziDevs/PteroStats/blob/main/index.js)
- `fill in the required informations in the config.json file`
- `Run npm install in the root directory of the bot files`
- `Run node index.js and you are done`
- `To add more nodes go to this link` [This Link](https://github.com/HirziDevs/PteroStats#adding-more-nodes-and-databases)

Config
--------------------

You need to put right config to make the bot work at [config.json](https://github.com/HirziDevs/PteroStats/blob/main/config.json) file
```
{
  "token": "BOT TOKEN", //Your Discord Bot Token
  "panelurl": "HOST PANEL LINK", //Your Hosting Panel Url/Link
  "clientapikey": "CLIENT APIKEY", //Your Hosting Client Apikey
  "adminapikey": "ADMIN APIKEY", //Your Hosting Admin/Application Apikey
  "channel": "CHANNEL ID", //Your Discord Channel Id For The Embed
  "hostname": "HOSTING NAME", //Your Hosting Name
  "embedcolor": "E5BE11", //Embed Color
  "monline": ":green_circle: Online", //Status Online Message
  "moffline": ":red_circle: Offline", //Status Offline Message
  "mcheck": ":orange_circle: Checking", //Status Checking Message
  "footer": "By Hirzi#8701", //Footer for the embed
  "time": "60" //How Much Seconds The Embed Will Be Refreshes
}
```

Adding more nodes
--------------------

Add more items like bellow to `nodelist` array at [index.js line 17](https://github.com/HirziDevs/PteroStats/blob/main/index.js)
```
{
    id: "Server ID",
    name: "**Example Server**",
    nameid: "Node1"
},
```

if you need help contact me on discord `Hirzi#8701` or join [our discord server here](https://discord.gg/9Z7zpdwATZ)

Screenshot
--------------------

[**ItzyStore**](https://discord.gg/PS4Mf6DBzt)
![img](https://media.discordapp.net/attachments/796259732683227157/863359897210060820/IMG_20210710_164939.jpg)

[**SpaceCloud**](https://discord.gg/28z8CYmPEY)
![img](https://media.discordapp.net/attachments/796259732683227157/863359896912658472/IMG_20210710_170313.jpg)

Links
--------------------

* __[Discord](https://discord.gg/9Z7zpdwATZ)__
