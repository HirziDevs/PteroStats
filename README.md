<div align="center">

<img alt="PteroStats Banner" src="https://images-ext-2.discordapp.net/external/oRPpwML4JUV0HbsPKtsghvIjS5ZrVwqH2KQ4tevg_Jg/https/repository-images.githubusercontent.com/381250920/e9acc9c2-2fbd-4fb0-8554-9788146d817e" width="400"/>


</div>

## This is a development build! some features may not work.

## Introduction
PteroStats is a bot designed to check Pterodactyl Panel and Nodes status and post it to your discord server

## Example
- Test Panel

    <img alt="Example" src="https://i.imgur.com/fzQANo5.gif" width="200"/>

## Installation
1. [Getting API key from pterodactyl](#getting-apikey-from-pterodactyl)
2. [Creating Discord Bot](#creating-discord-bot)
3. [Inviting Discord Bot](#inviting-discord-bot)
4. [Getting Channel ID](#getting-channel-id)
5. [Starting bot](#starting-bot)

- [Using Custom Emoji](#using-custom-emoji)
- [Blacklist Nodes](#blacklist-nodes)

### Getting API key from pterodactyl

> [!WARNING]
> The use of Application API keys are  **deprecated**, you should use **Client API keys** in the config file

1. Go to your `Pterodactyl Panel` and go to `Account Page`.

    <img alt="Home" src="https://i.imgur.com/Uu97RJO.png" width="400"/>

2. Click on the `API Credentials` button

    <img alt="Account Page" src="https://i.imgur.com/sm4THSu.png" width="400"/>

3. Fill the `Description` and click on the `Create` button

    <img alt="Create Client API Key" src="https://i.imgur.com/Q5E0PY4.png" width="400"/>

4. Copy the API key.

    <img alt="API Key" src="https://i.imgur.com/7goShy8.png" width="400"/>

5. Paste the panel API key and panel url at the config

    <img alt="Panel Config" src="https://usercontent.catto.pictures/hirzi/2b9365b8-69d2-4fa0-8eac-3efc8591b765.png" width="400"/>

### Creating Discord Bot
Please refer to [this website](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

Paste the bot token at the config

<img alt="Bot Config" src="https://usercontent.catto.pictures/hirzi/4eb4d5ff-6969-4461-b01d-c45888cfc994.png" width="400"/>

### Inviting Discord Bot
Please refer to [this website](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

### Getting Channel ID
1. Enable Developer Feature at your discord settings

    <img alt="Discord User Settings" src="https://usercontent.catto.pictures/hirzi/36894499-b141-488f-98ed-40245c8f6862.png" width="400"/>

2. Right Click text channel and select `Copy ID`

    <img alt="Right Click Channel" src="https://usercontent.catto.pictures/hirzi/9f8352da-df5b-4587-9594-ced9b11a5507.png" width="250"/>

3. Paste the channel id at the config

    <img alt="Channel Config" src="https://usercontent.catto.pictures/hirzi/b34cdbee-1e24-49f2-8219-efe0344a24f9.png" width="400"/>

### Starting bot
1. Make sure you have done the things above
2. Run `npm install` in the root directory of the bot files.
3. Run `node index` and you are done.

if you need help contact me on discord `@hirzidevs` or join [our discord support server](https://discord.gg/zv6maQRah3)

### Using Custom Emoji
1. type `\` in server that has custom emoji you want

    <img alt="Type \ on the chat" src="https://usercontent.catto.pictures/hirzi/2e3c821f-92f9-4b5c-863a-e020b2fbc426.png" width="350"/>

2. Select custom emoji you want

    <img alt="Select Custom Emoji" src="https://usercontent.catto.pictures/hirzi/7c071727-2adb-4c8c-91d3-21664948a334.png" width="300"/>

3. Copy the text!

    <img alt="Copy Emoji ID" src="https://usercontent.catto.pictures/hirzi/bd0084ac-f11b-413d-8b66-580efc011908.png" width="400"/>

4. Paste the emoji id at the config

    <img alt="Status Config" src="https://usercontent.catto.pictures/hirzi/458ad1d6-019b-4b27-be60-3cbabfa07c06.png" width="400"/>

### Blacklist Nodes
1. Select node from node list on admin page

    <img alt="Nodes List" src="https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png" width="400"/>

2. Check the url and copy the node id

    <img alt="Node Id" src="https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png" width="400"/>

3. Paste the id to the blacklist on config

    <img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/cfb479bf-64da-43e5-b0d1-f7c0c78bf068.png" width="400"/>

You can add more than one node in the blacklist

<img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/85b6a9b1-8ec9-4395-b5b1-6f85d3f52162.png" width="400"/>

## The node is online but the embed is read as offline

If you having this issue, you can enable `log_error` on the config file and report it to our discord server at [Support Server](https://discord.gg/zv6maQRah3)

## Links

- [PteroStats DiscordJS v13](https://github.com/HirziDevs/PteroStats/tree/3d0512c3323ecf079101104c7ecf3c94d265e298)
- [PteroStats DiscordJS v12](https://github.com/HirziDevs/PteroStats/tree/bcfa266be64dda11955f0bf9732da086bcea522c)
- [Pterodactyl Panel](https://pterodactyl.io)
- [Pterodactyl API Documentation](https://github.com/devnote-dev/ptero-notes/)
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [PteroBot Support Server](https://discord.gg/zv6maQRah3)
