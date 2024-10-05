<div align="center">

# PteroStats

<img alt="PteroStats Banner" src="https://usercontent.catto.pictures/hirzi/c6880886-21e2-43da-b218-0ac4c229b001.png" width="400"/>

</div>

## Introduction
PteroStats is a Discord App/Bot designed to check Pterodactyl or Pelican Panel stats and post it to your Discord server.

## Preview
<div style="display: flex; justify-content: center; align-items: center;">
    <img alt="PteroStats Setup Preview" src="https://usercontent.catto.pictures/hirzi/b8645828-591d-4d52-b6d8-51f8df60440c.png" width="300" style="margin-right: 20px;"/>
    <img alt="PteroStats Image Preview" src="https://usercontent.catto.pictures/hirzi/e6f6fe6a-8c0e-4c7a-8b73-d4af752324f4.png" width="300" style="margin-right: 20px;"/>
    <img alt="PteroStats Console Preview" src="https://usercontent.catto.pictures/hirzi/8ce3aac6-5c46-4626-bd14-af994b602f8e.png" width="300"/>
</div>

## Guide
- [Starting the App/Bot](#starting-the-appbot)
- [Changing Env Configuration](https://github.com/HirziDevs/PteroStats/blob/main/guide/changing-env-configuration.md)
- [How to get Panel API key](https://github.com/HirziDevs/PteroStats/blob/main/guide/panel-api-key.md)
- [How to get Channel ID](https://github.com/HirziDevs/PteroStats/blob/main/guide/channel-id.md)
- [How to use Custom Emoji](https://github.com/HirziDevs/PteroStats/blob/main/guide/custom-emoji.md)
- [Blacklist Nodes](https://github.com/HirziDevs/PteroStats/blob/main/guide/blacklist-nodes.md)
- [Notifier](https://github.com/HirziDevs/PteroStats/blob/main/guide/notifier.md)
- [Docker](https://github.com/HirziDevs/PteroStats/blob/main/guide/docker.md)

### Starting the App/Bot
1. [Create your Discord App/Bot](https://discordjs.guide/preparations/setting-up-a-bot-application).
2. [Invite your Discord App/Bot to your Discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
3. Download this repository:
    - Manually: [Download this repository](https://github.com/HirziDevs/PteroStats/archive/refs/heads/main.zip) and extract it.
    - Using GIT: Run `git clone https://github.com/HirziDevs/PteroStats.git` in the command line.
4. Run `npm install` in the root directory of the app/bot files.
5. Run `node index.js` and answer the prompted questions to set up the app/bot.

    <img alt="Setup" src="https://usercontent.catto.pictures/hirzi/b8645828-591d-4d52-b6d8-51f8df60440c.png" width="300"/>

    - [Getting an Panel API key](https://github.com/HirziDevs/PteroStats/blob/main/guide/panel-api-key.md)
    - [Getting a Channel ID](https://github.com/HirziDevs/PteroStats/blob/main/guide/channel-id.md)

6. Run `node index.js` if you want to start the app/bot again, and you're done!

    <img alt="Console Logging" src="https://usercontent.catto.pictures/hirzi/8ce3aac6-5c46-4626-bd14-af994b602f8e.png" width="300"/>

## Reporting a Bug
Enable `log_error` in the `config.yml` file and check the console for the error message. After that, report it to our Discord server at [Support Server](https://discord.znproject.my.id).

## Links
### Support Server
- [Discord](https://discord.znproject.my.id)

### Pterodactyl & Pelican Panel server
Please do not ask about PteroStats here.
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [Pelican Discord Server](https://discord.gg/pelican-panel)
