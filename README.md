<div align="center">

![PteroStats Banner](https://cdn.discordapp.com/attachments/626755594526916629/978478722489393153/20220524_090325.png)

## Language / Bahasa
[[English]](https://github.com/HirziDevs/PteroStats/blob/dev/README.md) | [[Indonesia]](https://github.com/HirziDevs/PteroStats/blob/dev/Indo.MD)

</div>

## Introduction
PteroStats is a bot designed to check Pterodactyl Panel and Nodes status and post it to your discord server

## Installation

### Getting apikey from pterodactyl
- Go to your `pterodactyl admin page` and go to `Application API`.

    ![Idk](https://usercontent.catto.pictures/hirzi/d5225df9-7395-491b-a214-dcd110b12308.png)

- Click on the `Create New` button

    ![Idk](https://usercontent.catto.pictures/hirzi/5ac33e25-ac37-416a-99a6-46d860a51645.png)

- Set all options permission to `read` and for description you can put whatever you want

    ![Idk](https://usercontent.catto.pictures/hirzi/a0c4a721-e1eb-483f-9a36-0c2aaa213186.png)

- Copy the apikey.

    ![Idk](https://usercontent.catto.pictures/hirzi/086111e0-0ffa-48ee-8839-801e0c3678cc.png)

### Creating Discord Bot
Please refer to [this website](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

### Inviting Discord Bot
Please refer to [this website](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

### Getting Channel ID
1. Enable Developer Feature at your discord settings

    ![Idk](https://usercontent.catto.pictures/hirzi/c5e825d1-c323-4b19-a11b-e2f004d4906e.png)

2. Copy Channel ID

    ![Idk](https://usercontent.catto.pictures/hirzi/e5fa4f62-b28f-45fd-a544-429f23899edb.png)

### Starting bot
- Put discord bot token in `config.yml` at `token line`.
- Put your pterodactyl `apikey` and `url` in `config.yml` at `panel line`.
- Copy `channel id` from your discord server and put it in `config.yml` file at `channel line`.
- Run `npm install` in the root directory of the bot files.
- Run `node index` and you are done.

if you need help contact me on discord `Hirzi#8701` or join [our discord support server](https://discord.gg/zv6maQRah3)

### Using Custom Emoji
1. type `\` in guild that has custom emoji you want

    ![Idk](https://usercontent.catto.pictures/hirzi/1f59b255-7c5d-48f2-ab93-5358429cec83.png)

2. Select custom emoji you want

    ![Idk](https://usercontent.catto.pictures/hirzi/38098261-7257-4e4d-8945-4ac5c252c952.png)

3. Copy the text!

    ![Idk](https://usercontent.catto.pictures/hirzi/33800ccf-9ed5-4d54-9747-2983b23e1755.png)

## Admin Apikey Permission

enable `read` on all options, if still didn't work enable `read & write` on all options

![Admin Apikey Permission](https://media.discordapp.net/attachments/819757140155564062/876320084992331816/Screenshot_2021-08-15-11-20-05-56.jpg)

## Links

- [Pterodactyl Panel](https://pterodactyl.io)
- [Pterodactyl Api Documentation](https://dashflo/docs/api/pterodactyl/v1)
- [Pterodactyl Discord Server]((https://discord.gg/pterodactyl))
- [PteroBot Support Server](https://discord.gg/zv6maQRah3)
- [PteroBot Support Server (Indonesia)](https://discord.gg/EYaFB7WSg6)