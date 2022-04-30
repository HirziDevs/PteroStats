# PteroStats

![Version](https://img.shields.io/github/package-json/v/HirziDevs/PteroStats?style=flat-square)
![License](https://img.shields.io/github/license/HirziDevs/PteroStats?style=flat-square)

![PteroStats Banner](https://media.discordapp.net/attachments/796259732683227157/861126504246411264/20210704_130856.jpg)

## Introduction

PteroStats is a bot designed to check Pterodactyl Panel and Nodes status and post it to your discord server

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

enable `read` on all options, if it still doesnt work you can try enabling `read & write` on all options
![Admin Apikey Permission](https://media.discordapp.net/attachments/819757140155564062/876320084992331816/Screenshot_2021-08-15-11-20-05-56.jpg)

### Setuping Config

You need to put right config to make the bot work at [config.yml](https://github.com/HirziDevs/PteroStats/blob/main/config.yml) file
```
##########################################
#                                        #
#         Client Initialization          #
#                                        #
##########################################
client:
    token: 'Discord Bot Token' # Your bot token which can be found on (https://discord.com/developers/applications/)
    activity: "NObody loves me:( wanna be friends?" # The bot activity EG/ (playing <LEAVE A STAR ON THE REPO>)
    status: 'dnd' # Bot status. Ex: online, idle, dnd

embed:
    title: 'PteroStats Hosting' # Embed Title here. Ex: MyHost Stats
    color_primary: 'e172fc' # Embed Hex color here.
 
    description: 
       enable: false # Enable Embed Description (MUST BE "true" OR "false")
       text: 'Embed Description' # Embed Description
 
    footer: 
       enable: true # Enable Embed Footer (MUST BE "true" OR "false")
       text: 'By Hirzi#8701' # Embed Footer
 
    timestamp: true # Enable Embed TimeStamp (MUST BE "true" OR "false")

##########################################
#                                        #
#      Settings and configuration        #
#                                        #
##########################################
channel:
    id: '962288046944960542' # The channel where you want to show the statistics (ID)
    refreshtime: 60 # Time after which the embed will be edited/refreshed (MUST BE A SECONDS) (RECOMMENDED MORE THAN 20 SECONDS)

pterodactyl:
    url: 'https://panel.pterostats.net' # Put the URL to your panel here. Example: https://panel.pterostats.net
    key: 'yhBaWjWcmUTseBq72lBBGL53DIDX4Z5dwbP4xzz3D' # Put your API Key here. (Must be an admin api key with read permissions)

status:
    online: ':green_circle: UP' # Message if the status is Online
    offline: ':red_circle: DOWN' # Message if the status is Offline
    check: ':orange_circle: Checking' # Message if the status is Checking

resource:
    enable: true # Enable resource option ex [Ram: 2gb/5gb] below node name (MUST BE "true" OR "false")
    servers: true # Enable Total server on the node to resource text (MUST BE "true" OR "false")
    allocations: true # Enable Total Allocation on the node to resource text (MUST BE "true" OR "false")
    location: true # Enable location short name on the node to resource text (MUST BE "true" OR "false")
    unit: 'gb' # Must be 'mb', 'gb', or 'percent'

# Developers feature
checker: false # Enable and Disable checker log to console
debug: false # Enable and Disable debug log to console
debugaxios: false #Enable and Disable axios error logs
```

## Other
### FAQ

Q: Can i use pterodactyl v0.7?

A: No, version v0.7 of pterodactyl panel is not supported

-

Q: How much nodes can i add?

A: The bot will automatically add nodes from your panel

-

Q: How can i get support?

A: You can join our [discord server](https://discord.gg/zv6maQRah3)

### Links

* __[PteroBot Discord](https://discord.gg/zv6maQRah3)__
* __[Pterodactyl Panel](https://pterodactyl.io)__
* __[Pterodactyl API](https://dashflo.net/docs/api/pterodactyl/v1)__

### Special Thanks to

- ItsJustNickDev(from Discord)
