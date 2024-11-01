const errorLogging = require("./errorLogging.js");
const config = require("./configuration.js");

module.exports = async function getWingsStatus(node, nodeToken) {
    return fetch(`${node.attributes.scheme}://${node.attributes.fqdn}:${node.attributes.daemon_listen}/api/servers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${nodeToken}`
        },
    })
        .then((res) => res.json())
        .then(() => true)
        .catch((error) => {
            if (config.log_error) console.error(error);
            errorLogging(error, true)
            return false
        })
}