## Docker

This is a guide to run the bot using docker (alternative way to run the bot).

### Installation

```bash
curl -fsSL https://get.docker.com | sh
```

### Docker Compose

- Copy the `docker-compose.yml` file to your server and run `docker compose pull`
- Copy the `config.yml` file at the same directory as the `docker-compose.yml` file and configure it (refer to the [Starting the App/Bot](https://github.com/HirziDevs/PteroStats#starting-the-appbot) section)

    ```bash
    docker compose up -d
    docker compose logs -f pterostats
    ```

### Docker Run

```bash
docker run -d --name pterostats -v $(pwd)/config.yml:/app/config.yml ghcr.io/hirzidevs/pterostats:latest
docker logs -f pterostats
```