## Docker

This is a guide to run the bot using docker (alternative way to run the bot)

### Installation

```bash
curl -fsSL https://get.docker.com | sh
```

### Docker Compose

- Copy the `docker-compose.yml` file to your server and run `docker compose pull`
- Copy the `config.yml` file at the same directory as the `docker-compose.yml` file and configure it
- Fill the environment variables in the `docker-compose.yml` file and run the bot using `docker compose up -d`

```bash
docker compose up -d
docker compose logs -f pterostats
```

### Docker Run

- Replace the `<PanelURL>`, `<PanelKEY>`, `<DISCORD_BOT_TOKEN>`, and `<DISCORD_CHANNEL_ID>` with your own values in the command below
- Copy the `config.yml` file at the same directory where you run the command and configure it

```bash
docker run -d --name pterostats -e PanelURL=<PanelURL> -e PanelKEY=<PanelKEY> -e DiscordBotToken=<DISCORD_BOT_TOKEN> -e DiscordChannel=<DISCORD_CHANNEL_ID> -v $(pwd)/config.yml:/app/config.yml ghcr.io/hirzidevs/pterostats:latest
docker logs -f pterostats
```
