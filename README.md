# PteroStats

![Version](https://img.shields.io/github/package-json/v/HirziDevs/PteroStats?style=flat-square)
![License](https://img.shields.io/github/license/HirziDevs/PteroStats?style=flat-square)

![PteroStats Banner](https://media.discordapp.net/attachments/796259732683227157/861126504246411264/20210704_130856.jpg)

## Introduction

PteroStats is a bot designed to check Pterodactyl Panel and Nodes status and post it to your discord server

- Written in Javascript, CloudServer is faster and more stable.
- PteroControl can be used with any server on Pterodactyl, irregardless of whether it's on shared hosting or your own hosted panel

PteroStats is still **under development** and we welcome contributions. 

### How it works?

PteroStats checks [pterodactyl](https://pterodactyl.io) nodes wings with [axios](https://www.npmjs.com/package/axios) to get nodes wings status, if the api didn't reply that mean the node is having [wings/daemon](https://pterodactyl.io/wings/1.0/installing.html) down and mark the node as offline

### Screenshot

- [**TreeCloud**](https://discord.gg/TCBhPan6SY)
![TreeCloud PteroStats](https://media.discordapp.net/attachments/819757140155564062/880346867949518848/Screenshot_2021-08-26-14-03-15-50_572064f74bd5f9fa804b05334aa4f912.jpg)
- [**ItzyStore**](https://discord.gg/PS4Mf6DBzt)
![ItzyStore PteroStats](https://media.discordapp.net/attachments/796259732683227157/863359897210060820/IMG_20210710_164939.jpg)
- [**SpaceCloud**](https://discord.gg/28z8CYmPEY)
![SpaceCloud PteroStats](https://media.discordapp.net/attachments/586738538448420881/866624597171372032/IMG_20210719_171633.jpg)

## Installation

- `fill in the required informations in the config.yml file`
- `Run npm install in the root directory of the bot files`
- `Run node index.js and you are done`

if you need help contact me on discord `Hirzi#8701` or join [our discord server here](https://discord.gg/zv6maQRah3)

## Admin Apikey Permission

enable `read` on all options, if still didn't work enable `read & write` on all options
![Admin Apikey Permission](https://media.discordapp.net/attachments/819757140155564062/876320084992331816/Screenshot_2021-08-15-11-20-05-56.jpg)

### Setuping Config

You need to put right config to make the bot work at [config.yml](https://github.com/HirziDevs/PteroStats/blob/main/config.yml) file
```
# PteroStats config
# If you need help, join our discord server here: https://discord.gg/zv6maQRah3

# Bot Info's
clientID : 'Discord Bot ID'
token: 'BOT TOKEN' # Put bot token here, check https://discord.dev to create and get bot token
botstatus:
  enable: false # Enable Custom Status (MUST BE "true" OR "false")
  text: 'Hosting Panel' # Bot Status Message
  type: 'WATCHING' # Bot Status Type. Ex: PLAYING, WATCHING, LISTENING, STREAMING

# Discord Server;s Configuration
serverID: "ID OF DISCORD SERVER"
adminRoleID: "ROLE ID" #Only this role wll have pemrission to use the commands

# Channels and RefreshTime Configuration
channels: ['CHANNEL1 ID', 'CHANNEL2 ID'] # Put channel ids here where the embed will be sent
refreshtime: 10 # Time when the embed edited/refreshed (MUST BE A SECONDS) (RECOMMENDED MORE THAN 20 SECONDS)

# Place uptime monitor link here
monitorLink: 'LINK OF UPTIME MONITOR'

# Panel Info's
panel:
  url: 'HOST PANEL LINK' # Put panel url here. Example: https://panel.purenodes.net
  adminkey: 'ADMIN APIKEY' # Put Admin Apikey here. check https://your.host.url/admin/api (your.host.url is an example link) to get the Admin ApiKey
  clientkey: "CLIENT KEY" #Put your account's Client API key. 

# Embed Configuration
embed: 
  title: 'EMBED TITLE' # Embed Title here. Ex: PureNodes Stats
  color: 'E5BE11' # Embed Hex color here.
  thumbnail: '' # Provide image URL of thumbnail of embed
  image: '' # Provide image URL of image of embed
  description: 
    enable: false # Enable Embed Description (MUST BE "true" OR "false")
    text: 'EMBED DESCRIPTION' # Embed Description
  footer: 
    enable: true # Enable Embed Footer (MUST BE "true" OR "false")
    text: 'By Hirzi#8701' # Embed Footer
  timestamp: true # Enable Embed TimeStamp (MUST BE "true" OR "false")

# Status Message Configuration
status:
  online: ':green_circle: Online' # Message if the status is Online
  offline: ':red_circle: Offline' # Message if the status is Offline
  check: ':orange_circle: Checking' # Message if the status is Checking

# Node Resource
resource:
  enable: true # Enable resource option ex [Ram: 2gb/5gb] bellow node name (MUST BE "true" OR "false")
  servers: true # Enable Total server on the node to resource text (MUST BE "true" OR "false")
  allocations: true # Enable Total Allocation on the node to resource text (MUST BE "true" OR "false")
  location: true # Enable location short name on the node to resource text (MUST BE "true" OR "false")
  unit: 'custom' # Must be 'mb', 'gb', 'percent', 'custom'

# Developers feature
debug: false # Enable and Disable debug log to console
debugaxios: false #Enable and Disable axios error logs
```

## Other
### FAQ

Q: Can i use pterodactyl v0.7?

A: No, the pterodactyl v0.7 is not supported

-

Q: How much nodes can i add?

A: The bot will automatically add nodes from your panel

-

Q: How i can get support?

A: You can join our [discord server](https://discord.gg/zv6maQRah3)

### Links

* __[PteroBot Discord](https://discord.gg/zv6maQRah3)__
* __[Pterodactyl Panel](https://pterodactyl.io)__
* __[Pterodactyl API](https://dashflo.net/docs/api/pterodactyl/v1)__

### Special Thanks to

- ItsJustNickDev(from Discord)
