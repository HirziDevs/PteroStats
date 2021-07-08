## PteroStats (1.0)

![img](https://media.discordapp.net/attachments/796259732683227157/861126504246411264/20210704_130856.jpg)

## Introduction

PteroStats is a bot designed to check Panel, Nodes, and Databases status and post it to discord server

* Written in Javascript, CloudServer is faster and more stable.
* PteroControl can be used with any server on Pterodactyl, irregardless of whether it's on shared hosting or your own hosted panel

PteroStats is still **under development** and we welcome contributions. 

Links
--------------------

* __[Discord](https://discord.gg/9Z7zpdwATZ)__

Installation
--------------------

- `Create server at your pterodactyl panel and copy the server id`
- `Paste the server id at nodelist array` [Jump to the file](https://github.com/HirziDevs/PteroStats/blob/main/events/ready.js)
- `fill in the required informations in the config.json file`
- `Run npm install in the root directory of the bot files`
- `Run node index.js and you are done`
- `To add more nodes go to this link` [LINK](https://github.com/HirziDevs/PteroStats#adding-more-nodes-and-databases)

Screenshot
--------------------

![img](https://media.discordapp.net/attachments/861112767174803466/861194338687385610/IMG_20210704_173809.jpg)

Adding more nodes
--------------------

Add more arrays like bellow to `nodelist` at [ready.js line 2](https://github.com/HirziDevs/PteroStats/blob/main/events/ready.js)
```
{
    id: "Server ID",
    name: "**Example Server**",
    nameid: "Node1"
},
```
