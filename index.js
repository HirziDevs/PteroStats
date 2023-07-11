const intigrityCheck = require("./modules/intigrityCheck");

if(!intigrityCheck()){
  return console.log("Intigrity check failed!");
}

const fs = require("node:fs");
const chalk = require("chalk");
const yaml = require("js-yaml");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.config = yaml.load(fs.readFileSync("./config.yml", "utf8"));

if (
  client.config.panel.adminkey ||
  client.config.resource ||
  client.config.message.image
) {
  console.log(
    chalk.cyan("[PteroStats] ") +
      chalk.red(
        "You are using old config file, please update your config file at "
      ) +
      chalk.green(
        "https://github.com/HirziDevs/PteroStats/blob/main/config.yml"
      )
  );
  process.exit();
}

if (client.config.token.startsWith("Put") || !client.config.token.length) {
  console.log(
    chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Discord Bot Token")
  );
  process.exit();
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(client.config.token);
