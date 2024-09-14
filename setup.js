const fs = require("node:fs");
const cliColor = require("cli-color");
const package = require("./package.json");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

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

if (!fs.existsSync(".env")) return require("./handlers/setup.js")();

console.log(cliColor.yellowBright(
    "Configuration is already set. Please select one of the following options:\n \n" +
    `${cliColor.cyanBright("1")} ${cliColor.blueBright("»")} Start the App\n` +
    `${cliColor.cyanBright("2")} ${cliColor.blueBright("»")} Change configuration\n `
));

readline.question('> ', async (answer) => {
    readline.close();

    switch (answer) {
        case '2':
            require("./handlers/setup.js")();
            break;
        case '1':
            require("./handlers/application.js")();
            break;
        default:
            console.log(cliColor.redBright('Invalid input. Please type either 1 or 2.'));
    }
});
