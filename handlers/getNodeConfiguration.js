const config = require("./config.js");

module.exports = async function getNodeConfiguration(id) {
    return fetch(`${new URL(config.panel.url).origin}/api/application/nodes/${id}/configuration`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.panel.key}`
        },
    })
        .then((res) => res.json())
        .then((data) => data)
}