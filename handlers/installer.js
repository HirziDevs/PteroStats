const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require("fs")
const cliColor = require("cli-color")

const questions = [
    "Please enter your panel name: ",
    "Please enter your panel URL: ",
    "Please enter your panel API key: ",
    "Please enter your bot token: ",
    "Please enter your channel ID: "
];

const answers = [];

const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = function Installer() {
    console.log("Welcome! Please fill this question to start PteroStats.");

    const askQuestion = (index) => {
        if (index < questions.length) {
            console.log(questions[index]);

            readline.question('> ', answer => {
                let isValid = true;

                if (index === 1 && !isValidURL(answer)) {
                    console.log(cliColor.redBright("Invalid URL. Please enter a valid URL."));
                    isValid = false;
                } else if (index === 2 && !/^(plcn_|ptlc_|peli_|ptla_)/.test(answer)) {
                    console.log(cliColor.redBright("Invalid API key. It must start with 'plcn_' or 'ptlc_'."));
                    isValid = false;
                } else if (index === 4 && !/^\d+$/.test(answer)) {
                    console.log(cliColor.redBright("Invalid Channel ID. It must be a number."));
                    isValid = false;
                }

                if (index === 2 && /^(peli_|ptla_)/.test(answer)) console.log(cliColor.yellow("The use of Application API keys are deprecated, you should use Client API keys"));

                if (isValid) {
                    answers.push(isValidURL(answer) ? new URL(answer).origin : answer);
                    askQuestion(index + 1);
                } else {
                    askQuestion(index);
                }
            });
        } else {

            fs.writeFileSync(".env", `PanelURL=${answers[1]}\nPanelKEY=${answers[2]}\nDiscordBotToken=${answers[3]}\nDiscordChannel=${answers[4]}`, "utf8")
            fs.writeFileSync("config.yml", fs.readFileSync("./config.yml", "utf8").replaceAll("Hosting Panel", answers[0]).replaceAll("https://panel.example.com", answers[1]), "utf-8")
            console.log(cliColor.green(` \nConfiguration saved in ${cliColor.blueBright(".env")} and ${cliColor.blueBright("config.yml")}.\n `));

            console.log(cliColor.cyanBright("Please restart the bot to continue."))
            readline.close();
        }
    };

    askQuestion(0);
}