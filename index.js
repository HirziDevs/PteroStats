const fs = require("node:fs");
const cliColor = require("cli-color");
const package = require("./package.json");
const axios = require("axios");
const errorLogging = require("./handlers/errorLogging.js");

process.stdout.write(cliColor.reset);
if (fs.existsSync("logs.txt")) {
    if (!fs.existsSync("./logs")) fs.mkdirSync("./logs")
    fs.renameSync("logs.txt", `logs/${Date.now()}.txt`);
}

console.log(
    `    _${cliColor.blueBright.bold(`${cliColor.underline("Ptero")}dact${cliColor.underline("yl & P")}eli${cliColor.underline("can")}`)}___    ______   ______   \n` +
    `   /\\  ___\\  /\\__  _\\ /\\  __ \\  /\\__  _\\ /\\  ___\\  \n` +
    `   \\ \\___  \\ \\/_ \\ \\/ \\ \\ \\_\\ \\ \\/_/\\ \\/ \\ \\___  \\ \n` +
    `    \\/\\_____\\   \\ \\_\\  \\ \\_\\ \\_\\   \\ \\_\\  \\/\\_____\\ \n` +
    `     \\/_____/    \\/_/   \\/_/\\/_/    \\/_/   \\/_____/${cliColor.yellowBright.bold(`${package.version}`)}`
);

console.log(
    ` \nCopyright © 2022 - ${new Date().getFullYear()} HirziDevs & Contributors\n ` +
    " \nDiscord: https://discord.znproject.my.id" +
    " \n Source: https://github.com/HirziDevs/PteroStats" +
    " \nLicense: https://github.com/Hirzidevs/PteroStats/blob/main/LICENSE" +
    ` \n \n${package.description}\n `
);

if (!fs.existsSync(".env") || !fs.existsSync(".setup-complete")) return require("./handlers/setup.js")();

process.on('uncaughtException', (error) => errorLogging(error))
process.on('unhandledRejection', (error) => errorLogging(error))

require("./handlers/application.js")();