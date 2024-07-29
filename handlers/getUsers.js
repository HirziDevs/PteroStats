const config = require("./config.js");
const cliColor = require("cli-color");

module.exports = async function getUsers() {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Getting panel users..."))
    return fetch(`${new URL(config.panel.url).origin}/api/application/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.panel.key}`
        },
    })
        .then((res) => res.json())
        .then((data) => data.data.length)
}