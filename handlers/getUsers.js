const cliColor = require("cli-color");

module.exports = async function getUsers() {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Retrieving panel users..."))
    return fetch(`${new URL(process.env?.PanelURL).origin}/api/application/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env?.PanelKEY}`
        },
    })
        .then((res) => res.json())
        .then((data) => data.meta.pagination.total)
}