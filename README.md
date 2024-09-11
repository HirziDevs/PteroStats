<div align="center">

# PteroStats v4

<img alt="PteroStats Banner" src="https://images-ext-2.discordapp.net/external/oRPpwML4JUV0HbsPKtsghvIjS5ZrVwqH2KQ4tevg_Jg/https/repository-images.githubusercontent.com/381250920/e9acc9c2-2fbd-4fb0-8554-9788146d817e" width="400"/>

</div>

## Introduction
> [!WARNING]
> This is a development build! Some features may not work as intended.

PteroStats is a Discord Bot that designed to check Pterodactyl or Pelican Panel stats and post it to your Discord server.

## Preview
<img alt="PteroStats GIF Preview" src="https://usercontent.catto.pictures/hirzi/ad6e36cc-b582-460b-ab4e-b5e1dacd8b02.gif" width="300"/>

<img alt="PteroStats Image Preview" src="https://usercontent.catto.pictures/hirzi/335cba23-36e4-4ab4-a7c6-cc1f128c8273.png" width="300"/>

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
3. [Download the repository](https://github.com/HirziDevs/PteroStats/archive/refs/heads/dev.zip) and extract it.
4. Run `npm install` in the root directory of the app files.
5. Run `node index` and answer the provided questions to set up the app.

    <img alt="Installer" src="https://usercontent.catto.pictures/hirzi/94742130-baaf-40b4-b046-06eb9c7fdb8c.png" width="300"/>

    - [Getting Panel API Key](#getting-panel-api-key)
    - [Getting a Channel ID](#getting-channel-id)

6. Run `node index` again to start the app, and you're done!

    <img alt="Console Logging" src="https://usercontent.catto.pictures/hirzi/5fa377e2-d357-456e-aaf5-ae80e06b33ca.png" width="300"/>

### Getting Panel API Key 

> [!WARNING]
> The use of Application API keys is **deprecated**; you should use **Client API keys**.

> [!TIP]
> Make sure the owner of the Client API key has access to the administrator panel.

1. Go to your `Pterodactyl` or `Pelican Panel` and navigate to the `Account Page`.

    <img alt="Home" src="https://i.imgur.com/Uu97RJO.png" width="400"/>

2. Click on the `API Credentials` button.

    <img alt="Account Page" src="https://i.imgur.com/sm4THSu.png" width="400"/>

3. Fill in the `Description` and click the `Create` button.

    <img alt="Create Client API Key" src="https://i.imgur.com/Q5E0PY4.png" width="400"/>

4. Copy the API key.

    <img alt="API Key" src="https://i.imgur.com/7goShy8.png" width="400"/>

### Getting Channel ID

1. Enable Developer Mode in your Discord settings.

    <img alt="Discord User Settings" src="https://usercontent.catto.pictures/hirzi/36894499-b141-488f-98ed-40245c8f6862.png" width="400"/>

2. Right-click the text channel and select `Copy ID`.

    <img alt="Right Click Channel" src="https://usercontent.catto.pictures/hirzi/9f8352da-df5b-4587-9594-ced9b11a5507.png" width="250"/>

### Using Custom Emoji

1. Type `\` in the server that has the custom emoji you want.

    <img alt="Type \ on the chat" src="https://usercontent.catto.pictures/hirzi/2e3c821f-92f9-4b5c-863a-e020b2fbc426.png" width="350"/>

2. Select the custom emoji you want.

    <img alt="Select Custom Emoji" src="https://usercontent.catto.pictures/hirzi/7c071727-2adb-4c8c-91d3-21664948a334.png" width="300"/>

3. Copy the text!

    <img alt="Copy Emoji ID" src="https://usercontent.catto.pictures/hirzi/bd0084ac-f11b-413d-8b66-580efc011908.png" width="400"/>

4. Paste the emoji ID into the config.

    <img alt="Status Config" src="https://usercontent.catto.pictures/hirzi/369cf7af-ae32-4193-9b09-195ba6f71f62.png" width="400"/>

### Blacklist Nodes

1. Select a node from the node list on the admin page.

    <img alt="Nodes List" src="https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png" width="400"/>

2. Check the URL and copy the node ID.

    <img alt="Node ID" src="https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png" width="400"/>

3. Paste the ID into the blacklist in the config.

    <img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/3a66a55b-6ffe-4535-b192-866deab2c4ae.png" width="400"/>

You can add more than one node to the blacklist.

<img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/649eda44-625f-47e7-be0e-04c34a9aaa48.png" width="400"/>

## Reporting a Bug

Enable `log_error` in the `config.yml` file and check the console for the error message. After that, report it to our Discord server at [Support Server](https://discord.gg/zv6maQRah3).

## Links

- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [Pelican Discord Server](https://discord.gg/pelican-panel) 
- [Support Server](https://discord.gg/zv6maQRah3)
