<div align="center">

# PteroStats

<img alt="PteroStats Banner" src="https://images-ext-2.discordapp.net/external/oRPpwML4JUV0HbsPKtsghvIjS5ZrVwqH2KQ4tevg_Jg/https/repository-images.githubusercontent.com/381250920/e9acc9c2-2fbd-4fb0-8554-9788146d817e" width="400"/>

</div>

## Introduction
PteroStats is a Discord App/Bot that designed to check Pterodactyl or Pelican Panel stats and post it to your Discord server.

## Preview
<img alt="PteroStats Image Preview" src="https://usercontent.catto.pictures/hirzi/e6f6fe6a-8c0e-4c7a-8b73-d4af752324f4.png" width="300"/>

<img alt="PteroStats Console Preview" src="https://usercontent.catto.pictures/hirzi/8ce3aac6-5c46-4626-bd14-af994b602f8e.png" width="300"/>

<img alt="PteroStats GIF Preview" src="https://usercontent.catto.pictures/hirzi/ad6e36cc-b582-460b-ab4e-b5e1dacd8b02.gif" width="300"/>

## Guide
- [Starting the App/Bot](#starting-the-appbot)
- [Changing Env Configuration](#changing-env-configuration)
- [Getting an Panel API key](#getting-panel-api-key)
- [Getting a Channel ID](#getting-channel-id)
- [Using Custom Emoji](#using-custom-emoji)
- [Blacklist Nodes](#blacklist-nodes)

### Starting the App/Bot
1. [Create your Discord App/Bot](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
2. [Invite your Discord App/Bot to your Discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
3. Download this repository:
    - [Downloading this repository](https://github.com/HirziDevs/PteroStats/archive/refs/heads/dev.zip) and extract it.
    - Using Git: Run `git clone -b dev https://github.com/HirziDevs/PteroStats.git` in the command line.
4. Run `npm install` in the root directory of the app/bot files.
5. Run `node index` and answer the provided questions to set up the app/bot.

    <img alt="Setup" src="https://usercontent.catto.pictures/hirzi/b8645828-591d-4d52-b6d8-51f8df60440c.png" width="300"/>

    - [Getting Panel API Key](#getting-panel-api-key)
    - [Getting a Channel ID](#getting-channel-id)

6. Run `node index` if you want to start the app/bot again, and you're done!

    <img alt="Console Logging" src="https://usercontent.catto.pictures/hirzi/8ce3aac6-5c46-4626-bd14-af994b602f8e.png" width="300"/>

### Changing Env Configuration
> [!TIP]
> You can change other configuration at the `config.yml` file.

1. Run `node setup` in the root directory of the app/bot files.
2. Enter `2` to change configuration.

    <img alt="Change Configuration" src="https://usercontent.catto.pictures/hirzi/f61ebf43-3df8-4b86-93ac-166e2de1edcd.png" width="300"/>

3. Answer the provided question to set up the app/bot.
4. Run `node index` if you want to start the app/bot again, and you're done!

### Getting Panel API Key 
> [!WARNING]
> The use of Application API keys is **deprecated**; you should use **Client API keys**.

> [!TIP]
> Make sure the owner of the Client API key has access to the administrator panel.

1. Go to your `Pterodactyl` or `Pelican` Panel and navigate to the `Account Page`.

    <img alt="Home" src="https://usercontent.catto.pictures/hirzi/6d3e4c63-c5e8-4d94-9d78-07bb937b1dbd.png" width="400"/>

2. Click on the `API Credentials` button.

    <img alt="Account Page" src="https://usercontent.catto.pictures/hirzi/0a2327ee-243a-4dd1-86f4-549f1ab8a91c.png" width="400"/>

3. Fill in the `Description` and click the `Create` button.

    <img alt="Create Client API Key" src="https://usercontent.catto.pictures/hirzi/7fcf5b7e-0087-4cf2-9e57-fed01292fd10.png" width="400"/>

4. Copy the API key.

    <img alt="API Key" src="https://usercontent.catto.pictures/hirzi/267cf48a-7229-4bb6-8c77-7d0c0884f6ba.png" width="400"/>

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

    <img alt="Pterodactyl Nodes List" src="https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png" width="400"/>

    <img alt="Pelican Nodes List" src="https://usercontent.catto.pictures/hirzi/5994fbf0-03ac-4196-9bb5-e945401f204e.png" width="400"/>

2. Check the URL and copy the node ID.

    <img alt="Pterodactyl Node ID" src="https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png" width="400"/>

    <img alt="Pelican Node ID" src="https://usercontent.catto.pictures/hirzi/0ff8d9fc-6125-4fbb-8e19-ff8743cd365c.png" width="400"/>

3. Paste the ID into the blacklist in the config.

    <img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/bfae6a04-8dad-4db1-b3d8-05e6db691516.png" width="400"/>

You can add more than one node to the blacklist.

<img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/7b5d6c7f-54d9-40ea-b5a6-9192325ba2a0.png" width="400"/>

## Reporting a Bug
Enable `log_error` in the `config.yml` file and check the console for the error message. After that, report it to our Discord server at [Support Server](https://discord.znproject.my.id).

## Links
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [Pelican Discord Server](https://discord.gg/pelican-panel) 
- [Support Server](https://discord.znproject.my.id)
