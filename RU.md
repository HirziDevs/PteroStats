<div align="center">

<img alt="Баннер PteroStats" src="https://cdn.discordapp.com/attachments/626755594526916629/978478722489393153/20220524_090325.png" width="400"/>

## Язык / Language / Bahasa
[[Русский]](/RU.md) | [[Английский]](/README.md) | [[Индонезийский]](/IN.md)

</div>

## Введение
PteroStats - это бот, предназначенный для проверки состояния панели и нод Pterodactyl и отправки информации на ваш сервер Discord.

## Пример
- Тестовая панель

    <img alt="Пример" src="https://cdn.discordapp.com/attachments/988796533430448148/991520721467613224/example.gif" width="200"/>

- [Calvs Cloud](https://discord.gg/ssCQjhrBJN)

    <img alt="Calvs Cloud" src="https://media.discordapp.net/attachments/819757140155564062/1037353043487887410/unknown.png" width="200">

## Установка
1. [Получение API ключа от Pterodactyl](#getting-apikey-from-pterodactyl)
2. [Создание бота Discord](#creating-discord-bot)
3. [Пригласить бота Discord](#inviting-discord-bot)
4. [Получение ID канала](#getting-channel-id)
5. [Запуск бота](#starting-bot)

- [Использование пользовательских эмодзи](#using-custom-emoji)
- [Черный список узлов](#blacklist-nodes)

### Получение API ключа от Pterodactyl
1. Зайдите на свою страницу администратора и перейдите в раздел `Application API`.

    <img alt="Панель администратора" src="https://usercontent.catto.pictures/hirzi/aabafe57-cbfe-4d7f-9d6d-4a63a7f23d4c.png" width="400"/>

2. Нажмите на кнопку `Create New`.

    <img alt="Страница API-приложений" src="https://usercontent.catto.pictures/hirzi/f916f0c6-0968-4125-8226-ba4daa1de902.png" width="400"/>

3. Установите для всех опций разрешение `read`, а для описания вы можете поставить все, что захотите

    <img alt="Создание API приложения" src="https://usercontent.catto.pictures/hirzi/3e4575cb-4f52-4bd9-9091-36fda20bedad.png" width="400"/>

4. Скопируйте ключ API.

    <img alt="Список API приложений" src="https://usercontent.catto.pictures/hirzi/9142b0b3-0556-4741-840c-6976c3fe3ad4.png" width="400"/>

5. Вставьте API-ключ панели и URL панели в config

    <img alt="Конфигурация панели" src="https://usercontent.catto.pictures/hirzi/2b9365b8-69d2-4fa0-8eac-3efc8591b765.png" width="400"/>

### Создание Discord бота
Пожалуйста, обратитесь к [этому сайту](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

Вставьте токен бота в конфигурацию

<img alt="Конфигурация бота" src="https://usercontent.catto.pictures/hirzi/4eb4d5ff-6969-4461-b01d-c45888cfc994.png" width="400"/>

### Приглашение бота Discord
Пожалуйста, обратитесь к [этому сайту](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

### Получение ID канала
1. Включите функцию разработчика в настройках Discord

    <img alt="Настройки пользователя Discord" src="https://usercontent.catto.pictures/hirzi/36894499-b141-488f-98ed-40245c8f6862.png" width="400"/>

2. Щелкните правой кнопкой мыши текстовый канал и выберите `Копировать ID`.

    <img alt="Канал с правой кнопкой мыши" src="https://usercontent.catto.pictures/hirzi/9f8352da-df5b-4587-9594-ced9b11a5507.png" width="250"/>

3. Вставьте ID канала в конфигурацию

    <img alt="Конфигурация канала" src="https://usercontent.catto.pictures/hirzi/b34cdbee-1e24-49f2-8219-efe0344a24f9.png" width="400"/>

### Запуск бота
1. Убедитесь, что вы выполнили все вышеперечисленные действия.
2. Запустите `npm install` в корневом каталоге файлов бота.
3. Запустите `node index` и все готово.

Если вам нужна помощь, свяжитесь со мной по Discord `Hirzi#8701` или присоединяйтесь к [нашему серверу поддержки Discord](https://discord.gg/zv6maQRah3)

### Использование пользовательских эмодзи
1. Введите `\` на сервере, в которой есть нужные Вам эмодзи

    <img alt="Type \ on the chat" src="https://usercontent.catto.pictures/hirzi/2e3c821f-92f9-4b5c-863a-e020b2fbc426.png" width="350"/>

2. Выберите нужный Вам пользовательский эмодзи

    <img alt="Выберите пользовательские эмодзи" src="https://usercontent.catto.pictures/hirzi/7c071727-2adb-4c8c-91d3-21664948a334.png" width="300"/>

3. Скопируйте текст!

    <img alt="Копирование идентификатора эмодзи" src="https://usercontent.catto.pictures/hirzi/bd0084ac-f11b-413d-8b66-580efc011908.png" width="400"/>

4. Вставьте ID эмодзи в конфигурацию

    <img alt="Конфигурация статуса" src="https://usercontent.catto.pictures/hirzi/458ad1d6-019b-4b27-be60-3cbabfa07c06.png" width="400"/>

### Черный список нод
1. Выберите ноду из списка нод на странице администратора

    <img alt="Список нод" src="https://usercontent.catto.pictures/hirzi/5699fdbd-7c3c-4fa5-ae2c-d0ccb39cb69e.png" width="400"/>

2. Проверьте URL и скопируйте ID ноды

    <img alt="ID ноды" src="https://usercontent.catto.pictures/hirzi/45f855fc-6d96-4b23-a96e-892071189d01.png" width="400"/>

3. Вставьте ID в черный список в конфигурации

    <img alt="Конфигурация черного списка" src="https://usercontent.catto.pictures/hirzi/cfb479bf-64da-43e5-b0d1-f7c0c78bf068.png" width="400"/>

В черный список можно добавить более одной ноды

<img alt="Конфигурация черного списка" src="https://usercontent.catto.pictures/hirzi/85b6a9b1-8ec9-4395-b5b1-6f85d3f52162.png" width="400"/>

## Нода находится в сети, но embed считается оффлайн.

Если у вас возникла эта проблема, вы можете включить `log_error` в конфигурационном файле и сообщить о ней на наш сервер Discord по адресу [Сервер поддержки](https://discord.gg/zv6maQRah3)

## Ссылки

- [PteroStats DiscordJS v13](https://github.com/HirziDevs/PteroStats/tree/3d0512c3323ecf079101104c7ecf3c94d265e298)
- [PteroStats DiscordJS v12](https://github.com/HirziDevs/PteroStats/tree/bcfa266be64dda11955f0bf9732da086bcea522c)
- [Панель Pterodactyl](https://pterodactyl.io)
- [Документация Pterodactyl API](https://dashflo/docs/api/pterodactyl/v1)
- [Сервер Pterodactyl в Discord](https://discord.gg/pterodactyl)
- [Сервер поддержки PteroBot](https://discord.gg/zv6maQRah3)
- [Сервер поддержки PteroBot (Индонезия)](https://discord.gg/EYaFB7WSg6)
