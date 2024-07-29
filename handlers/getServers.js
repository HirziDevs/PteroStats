const config = require("./config.js");
const cliColor = require("cli-color");

module.exports = async function getServers() {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Getting panel servers..."))
    return fetch(`${new URL(config.panel.url).origin}/api/application/servers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.panel.key}`
        },
    })
        .then((res) => res.json())
        .then((data) => data.data.length)
}