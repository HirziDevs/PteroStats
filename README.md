<div align="center">

# PteroStats v4

<img alt="PteroStats Banner" src="https://images-ext-2.discordapp.net/external/oRPpwML4JUV0HbsPKtsghvIjS5ZrVwqH2KQ4tevg_Jg/https/repository-images.githubusercontent.com/381250920/e9acc9c2-2fbd-4fb0-8554-9788146d817e" width="400"/>

</div>

## This is a development build! some features may not work.

## Introduction
PteroStats is a Discord Bot that designed to check Pterodactyl or Pelican Panel stats and post it to your Discord server.

## Preview
<img alt="PteroStats V4 Preview" src="https://github.com/user-attachments/assets/5673b374-ea60-4c08-89a0-03b51cb636a2" width="300"/>

## Installation
- [Starting the App](#starting-the-app)
- [Getting an Panel API key](#getting-panel-api-key)
- [Getting a Channel ID](#getting-channel-id)
- [Using Custom Emoji](#using-custom-emoji)
- [Blacklist Nodes](#blacklist-nodes)
- [Reporting a Bug](#reporting-a-bug) 

### Starting the App
1. [Create your Discord App](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
2. [Invite your Discord App to your Discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
3. Run `npm install` in the root directory of the app files.
4. Run `node index` and answer the provided questions to set up the app.

    <img alt="PteroStats V4 Preview" src="https://usercontent.catto.pictures/hirzi/ea764c65-3efe-4fbf-989a-58830bf26f05.png" width="300"/>

    - [Getting Panel API Key](#getting-panel-api-key)
    - [Getting a Channel ID](#getting-channel-id)

5. Run `node index` again to start the app, and you're done!

If you need help, contact me on [our Discord support server](https://discord.gg/zv6maQRah3).

### Getting Panel API key 

> [!WARNING]
> The use of Application API keys are  **deprecated**, you should use **Client API keys**.

1. Go to your `Pterodactyl or Pelican Panel` and go to `Account Page`.

    <img alt="Home" src="https://i.imgur.com/Uu97RJO.png" width="400"/>

2. Click on the `API Credentials` button

    <img alt="Account Page" src="https://i.imgur.com/sm4THSu.png" width="400"/>

3. Fill the `Description` and click on the `Create` button

    <img alt="Create Client API Key" src="https://i.imgur.com/Q5E0PY4.png" width="400"/>

4. Copy the API key.

    <img alt="API Key" src="https://i.imgur.com/7goShy8.png" width="400"/>

### Getting Channel ID
1. Enable Developer Feature at your discord settings

    <img alt="Discord User Settings" src="https://usercontent.catto.pictures/hirzi/36894499-b141-488f-98ed-40245c8f6862.png" width="400"/>

2. Right Click text channel and select `Copy ID`

    <img alt="Right Click Channel" src="https://usercontent.catto.pictures/hirzi/9f8352da-df5b-4587-9594-ced9b11a5507.png" width="250"/>

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

## Reporting a Bug

Enable `log_error` in the `config.yml` file and check the console for the error message. After that, report it to our Discord server at [Support Server](https://discord.gg/zv6maQRah3).

## Links

- [PteroStats DiscordJS v13](https://github.com/HirziDevs/PteroStats/tree/3d0512c3323ecf079101104c7ecf3c94d265e298)
- [PteroStats DiscordJS v12](https://github.com/HirziDevs/PteroStats/tree/bcfa266be64dda11955f0bf9732da086bcea522c)
- [Pelican Panel](https://pelican.dev)
- [Pterodactyl Panel](https://pterodactyl.io)
- [Pelican API Documentation](https://demo.pelican.dev/docs/api)
- [Pterodactyl API Documentation](https://github.com/devnote-dev/ptero-notes/)
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [Pelican Discord Server](https://discord.gg/pelican-panel) 
- [Support Server](https://discord.gg/zv6maQRah3)
