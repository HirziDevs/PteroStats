## PteroStats

![img](https://media.discordapp.net/attachments/796259732683227157/861126504246411264/20210704_130856.jpg)

## Introduction

PteroStats is a bot designed to check Pterodactyl Panel and Nodes status and post it to discord server

- Written in Javascript, CloudServer is faster and more stable.
- PteroControl can be used with any server on Pterodactyl, irregardless of whether it's on shared hosting or your own hosted panel

PteroStats is still **under development** and we welcome contributions. 

## How it works?

PteroStats checks [pterodactyl](https://pterodactyl.io) server(s) [resource api](https://dashflo.net/docs/api/pterodactyl/v1/#req_a8875d2840c64cbdb40e9bdb6cba4f75) with [axios](https://www.npmjs.com/package/axios) to get server resource, if the api didn't reply that mean the node of the server is getting [wings/daemon](https://pterodactyl.io/wings/1.0/installing.html) down and mark the node as offline

## Screenshot

- [**ItzyStore**](https://discord.gg/PS4Mf6DBzt)
![img](https://media.discordapp.net/attachments/796259732683227157/863359897210060820/IMG_20210710_164939.jpg)

- [**SpaceCloud**](https://discord.gg/28z8CYmPEY)
![img](https://media.discordapp.net/attachments/796259732683227157/863359896912658472/IMG_20210710_170313.jpg)

## Installation

- `Create server at your pterodactyl panel and copy the server id`
- `Paste the server id at nodelist array` [index.js line 17](https://github.com/HirziDevs/PteroStats/blob/main/index.js)
- `fill in the required informations in the config.json file`
- `Run npm install in the root directory of the bot files`
- `Run node index.js and you are done`
- `To add more nodes go to this link` [This Link](https://github.com/HirziDevs/PteroStats#adding-more-nodes-and-databases)

## Setuping Config

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

## Adding more nodes

Add more items like bellow to `nodelist` array at [index.js line 17](https://github.com/HirziDevs/PteroStats/blob/main/index.js)
```
{
    id: "Server ID",
    name: "**Example Server**",
    nameid: "Node1"
},
```

if you need help contact me on discord `Hirzi#8701` or join [our discord server here](https://discord.gg/9Z7zpdwATZ)

## FAQ

Q: The node is online but the bot said offline

A: Make sure the serverid is correct and the server is not on installation progress

-

Q: Do the server must be online?

A: No, the bot can still checks server while it online or offline

-

Q: Can i use pterodactyl v0.7?

A: No, the pterodactyl v0.7 is not supported

-

Q: How much nodes can i add?

A: You can add as much your panel have

-

Q: How i can get support?

A: You can join our [discord server](https://discord.gg/9Z7zpdwATZ)

## Links

* __[Discord](https://discord.gg/9Z7zpdwATZ)__
