const config = require("./configuration.js");
const cliColor = require("cli-color");

module.exports = async function getServers() {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Retrieving panel servers..."))
    return fetch(`${new URL(process.env?.PanelURL).origin}/api/application/servers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env?.PanelKEY}`
        },
    })
        .then((res) => res.json())
        .then((data) => data.meta.pagination.total)
}