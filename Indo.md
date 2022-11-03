<div align="center">

<img alt="PteroStats Banner" src="https://cdn.discordapp.com/attachments/626755594526916629/978478722489393153/20220524_090325.png" width="400"/>

## Bahasa / Language
[[Indonesia]](https://github.com/HirziDevs/PteroStats/blob/dev/Indo.md) | [[Inggris]](https://github.com/HirziDevs/PteroStats/blob/dev/README.md)

</div>

## Pengenalan
PteroStats adalah bot yang dirancang untuk memeriksa status panel pterodactyl dan dikirim ke server discord

## Contoh
- Test Panel

    <img alt="Example" src="https://cdn.discordapp.com/attachments/988796533430448148/991520721467613224/example.gif" width="200"/>

- [Calvs Cloud](https://discord.gg/ssCQjhrBJN)

    <img alt="Calvs Cloud" src="https://media.discordapp.net/attachments/819757140155564062/1037353043487887410/unknown.png" width="200">

## Instalasi
 1. [Mendapatkan apikey dari pterodactyl](#mendapatkan-apikey-dari-pterodactyl)
 2. [Membuat Discord Bot](#membuat-discord-bot)
 3. [Menginvite Discord Bot](#menginvite-discord-bot)
 4. [Mendapatkan Channel ID](#mendapatkan-channel-id)
 5. [Memulai Bot](#memulai-bot)

 - [Mengunakan custom emoji](#mengunakan-custom-emoji)
 - [Blacklist Nodes](#blacklist-nodes)

### Mendapatkan apikey dari pterodactyl
1. Pergi ke `panel admin pterodactyl` dan pergi ke `Application API`

    <img alt="Admin Panel" src="https://usercontent.catto.pictures/hirzi/aabafe57-cbfe-4d7f-9d6d-4a63a7f23d4c.png" width="400"/>

2. Klik tombol `Create New`

    <img alt="Application API Page" src="https://usercontent.catto.pictures/hirzi/f916f0c6-0968-4125-8226-ba4daa1de902.png" width="400"/>

3. Set semua permission ke `read` dan untuk description kamu bisa mengisi apa saja

    <img alt="Create Application API" src="https://usercontent.catto.pictures/hirzi/3e4575cb-4f52-4bd9-9091-36fda20bedad.png" width="400"/>

4. Copy apikey-nya.

    <img alt="Application API List" src="https://usercontent.catto.pictures/hirzi/9142b0b3-0556-4741-840c-6976c3fe3ad4.png" width="400"/>

5. Paste panel apikeynya dan panel urlnya di config

    <img alt="Panel Config" src="https://usercontent.catto.pictures/hirzi/2b9365b8-69d2-4fa0-8eac-3efc8591b765.png" width="400"/>

### Membuat Discord Bot
Kalian bisa cek [website ini](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

Paste bot tokennya di config

<img alt="Bot Config" src="https://usercontent.catto.pictures/hirzi/4eb4d5ff-6969-4461-b01d-c45888cfc994.png" width="400"/>

### Menginvite Discord Bot
Kalian bisa cek [website ini](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

### Mendapatkan Channel ID
1. Aktifkan `Developer Mode` di settings discord kamu

    <img alt="Discord User Settings" src="https://usercontent.catto.pictures/hirzi/36894499-b141-488f-98ed-40245c8f6862.png" width="400"/>

2. Klik kanan teks channel dan pilih `Copy ID`

    <img alt="Right Click Channel" src="https://usercontent.catto.pictures/hirzi/9f8352da-df5b-4587-9594-ced9b11a5507.png" width="250"/>

3. Paste id channelnya di config

    <img alt="Channel Config" src="https://usercontent.catto.pictures/hirzi/b34cdbee-1e24-49f2-8219-efe0344a24f9.png" width="400"/>

### Memulai Bot
1. Pastikan kamu telah melakukan semua yang ada diatas
2. Jalankan command `npm install` di folder yang berisi file bot
3. Jalankan command `node index` dan kamu selesai!

Jika kamu mendapat masalah bisa dm `Hirzi#8701` didiscord atau join [server support kami](https://discord.gg/zv6maQRah3)

### Mengunakan custom emoji
1. ketik `\` di server yang ada custom emojinya

    <img alt="Type \ on the chat" src="https://usercontent.catto.pictures/hirzi/2e3c821f-92f9-4b5c-863a-e020b2fbc426.png" width="350"/>

2. Pilih custom emoji yang kamu mau

    <img alt="Select Custom Emoji" src="https://usercontent.catto.pictures/hirzi/7c071727-2adb-4c8c-91d3-21664948a334.png" width="300"/>

3. Copy textnya!

    <img alt="Copy Emoji ID" src="https://usercontent.catto.pictures/hirzi/bd0084ac-f11b-413d-8b66-580efc011908.png" width="400"/>

4. Paste id emojinya di config

    <img alt="Status Config" src="https://usercontent.catto.pictures/hirzi/458ad1d6-019b-4b27-be60-3cbabfa07c06.png" width="400"/>

### Blacklist Nodes
1. Pilih node yang ada di node list admin page

    <img alt="Nodes List" src="https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png" width="400"/>

2. Cek urlnya dan copy id nodenya

    <img alt="Node Id" src="https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png" width="400"/>

3. Masukan ke blacklist di config

    <img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/cfb479bf-64da-43e5-b0d1-f7c0c78bf068.png" width="400"/>

Kamu bisa memasukan lebih dari 1 node untuk di blacklist

<img alt="Blacklist Config" src="https://usercontent.catto.pictures/hirzi/85b6a9b1-8ec9-4395-b5b1-6f85d3f52162.png" width="400"/>

## Permission apikey

Jika kamu mengalami error 403 coba aktifkan `read & write` di semua opsi permission

<img alt="Application API Permission" src="https://usercontent.catto.pictures/hirzi/273d5b86-5249-42d0-bfc6-1dcfcae4efe7.png" width="400"/>

## Links

- [Pterodactyl Panel](https://pterodactyl.io)
- [Pterodactyl Api Documentation](https://dashflo/docs/api/pterodactyl/v1)
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [PteroBot Support Server](https://discord.gg/zv6maQRah3)
- [PteroBot Support Server (Indonesia)](https://discord.gg/EYaFB7WSg6)