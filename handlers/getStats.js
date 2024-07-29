const config = require("./config.js");
const fs = require("node:fs");
const getNodesDetails = require("./getNodesDetails.js");
const getNodeConfiguration = require("./getNodeConfiguration.js");
const getWingsStatus = require("./getWingsStatus.js");
const getServers = require("./getServers.js");
const getUsers = require("./getUsers.js");
const promiseTimeout = require("./promiseTimeout.js");
const cliColor = require("cli-color");

module.exports = async function getStats() {
    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Getting panel nodes..."))
    const nodesStats = await getNodesDetails();
    if (!nodesStats) throw new Error("Failed to get nodes attributes");

    const statusPromises = nodesStats.slice(0, config.nodes_settings.limit).map(async (node) => {
        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Getting "${node.attributes.name}" configuration...`))
        const nodeConfig = await getNodeConfiguration(node.attributes.id);
        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Getting "${node.attributes.name}" wings status...`))
        const nodeStatus = await promiseTimeout(getWingsStatus(node, nodeConfig.token), config.timeout * 1000);

        if (!nodeStatus)
            console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright(`Node "${node.attributes.name}" is offline`))
        return {
            attributes: {
                name: node.attributes.name,
                memory: node.attributes.memory,
                disk: node.attributes.disk,
                cpu: node.attributes.cpu,
                allocated_resources: node.attributes.allocated_resources,
                relationships: {
                    allocations: node.attributes.relationships.allocations.data.length,
                    servers: node.attributes.relationships.servers.data.length
                }
            },
            status: nodeStatus
        };
    });

    const data = {
        servers: await getServers(),
        users: await getUsers(),
        nodes: await Promise.all(statusPromises),
        timestamp: Date.now()
    }

    fs.writeFileSync("cache.json", JSON.stringify(data, null, 2), "utf8");

    return data
}