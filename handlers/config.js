
const fs = require("node:fs");
const yaml = require("js-yaml");
const cliColor = require("cli-color");

let config = yaml.load(fs.readFileSync("./config.yml", "utf8"));
if (fs.existsSync("config-dev.yml")) {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Using development configuration..."))
    config = yaml.load(fs.readFileSync("./config-dev.yml", "utf8"));
}

validateURL(config.panel.url);

function validateURL(url) {
    try {
        const testURL = new URL(url);
        if (!testURL.protocol.startsWith("http")) throw new Error();
    } catch {
        console.error('Config Error | Invalid URL Format! Example Correct URL: "https://panel.example.com"');
        process.exit();
    }
}

module.exports = config