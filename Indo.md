<div align="center">

![PteroStats Banner](https://cdn.discordapp.com/attachments/626755594526916629/978478722489393153/20220524_090325.png)

## Bahasa / Language
[[Indonesia]](https://github.com/HirziDevs/PteroStats/blob/dev/Indo.md) | [[Inggris]](https://github.com/HirziDevs/PteroStats/blob/dev/README.md)

</div>

## Pengenalan
PteroStats adalah bot yang dirancang untuk memeriksa status panel pterodactyl dan dikirim ke server discord

## Instalasi
 - [Mendapatkan apikey dari pterodactyl](#mendapatkan-apikey-dari-pterodactyl)
 - [Membuat Discord Bot](#membuat-discord-bot)
 - [Menginvite Discord Bot](#menginvite-discord-bot)
 - [Mendapatkan Channel ID](#mendapatkan-channel-id)
 - [Memulai Bot](#memulai-bot)
 - [Mengunakan custom emoji](#mengunakan-custom-emoji)
 - [Blacklist Nodes](#blacklist-nodes)

### Mendapatkan apikey dari pterodactyl
- Pergi ke `panel admin pterodactyl` dan pergi ke `Application API`

    ![Admin Panel](https://usercontent.catto.pictures/hirzi/aabafe57-cbfe-4d7f-9d6d-4a63a7f23d4c.png)

- Klik tombol `Create New`

    ![Application API Page](https://usercontent.catto.pictures/hirzi/f916f0c6-0968-4125-8226-ba4daa1de902.png)

- Set semua permission ke `read` dan untuk description kamu bisa mengisi apa saja

    ![Create Application API](https://usercontent.catto.pictures/hirzi/3e4575cb-4f52-4bd9-9091-36fda20bedad.png)

- Copy apikey-nya.

    ![Application API List](https://usercontent.catto.pictures/hirzi/9142b0b3-0556-4741-840c-6976c3fe3ad4.png)

### Membuat Discord Bot
Kalian bisa cek [website ini](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

### Menginvite Discord Bot
Kalian bisa cek [website ini](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

### Mendapatkan Channel ID
1. Aktifkan `Developer Mode` di settings discord kamu

    ![Discord User Settings](https://usercontent.catto.pictures/hirzi/c5e825d1-c323-4b19-a11b-e2f004d4906e.png)

2. Klik kanan teks channel dan pilih `Copy ID`

    ![Klik Kanan Channel](https://usercontent.catto.pictures/hirzi/e5fa4f62-b28f-45fd-a544-429f23899edb.png)

### Memulai Bot
- Masukan `token` bot discord di `line token` yang terdapat di file `config.yml`
- Copy `id channel` diserver discord kamu dan masukan ke line `channel` di file `config.yml`
- Masukan `apikey` dan `url` pterodactyl di `line panel` di file `config.yml`
- Jalankan command `npm install` di folder yang berisi file bot
- Jalankan command `node index` dan kamu selesai!

Jika kamu mendapat masalah bisa dm `Hirzi#8701` didiscord atau join [server support kami](https://discord.gg/zv6maQRah3)

### Mengunakan custom emoji
1. ketik `\` di server yang ada custom emojinya

    ![Type \ on the chat](https://usercontent.catto.pictures/hirzi/1f59b255-7c5d-48f2-ab93-5358429cec83.png)

2. Pilih custom emoji yang kamu mau

    ![Select Custom Emoji](https://usercontent.catto.pictures/hirzi/38098261-7257-4e4d-8945-4ac5c252c952.png)

3. Copy textnya!

    ![Copy Emoji ID](https://usercontent.catto.pictures/hirzi/33800ccf-9ed5-4d54-9747-2983b23e1755.png)

### Blacklist Nodes
1. Pilih node yang ada di node list admin page
    
    ![Nodes List](https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png)

2. Cek urlnya dan copy id nodenya

    ![Node Id](https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png)

3. Masukan ke blacklist di config

    ![Blacklist Config](https://usercontent.catto.pictures/hirzi/9c40da3d-fa01-447e-aa86-7871da9da282.png)

Kamu bisa memasukan lebih dari 1 node untuk di blacklist

![Blacklist Config](https://usercontent.catto.pictures/hirzi/f2a34ca9-accf-4d31-a246-f9dcc6a2fd75.png)

## Permission apikey

Pilih Aktifkan `read` di semua opsi permission, jika tetap error pilih `read & write` di semua opsi permission

![Application API Permission](https://media.discordapp.net/attachments/819757140155564062/876320084992331816/Screenshot_2021-08-15-11-20-05-56.jpg)

## Links

- [Pterodactyl Panel](https://pterodactyl.io)
- [Pterodactyl Api Documentation](https://dashflo/docs/api/pterodactyl/v1)
- [Pterodactyl Discord Server](https://discord.gg/pterodactyl)
- [PteroBot Support Server](https://discord.gg/zv6maQRah3)
- [PteroBot Support Server (Indonesia)](https://discord.gg/EYaFB7WSg6)