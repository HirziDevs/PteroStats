const config = require("./config.js");
const fs = require("node:fs");
const cliColor = require("cli-color");

module.exports = async function getStats() {
    let cache = (() => {
        try {
            return JSON.parse(fs.readFileSync(require('node:path').join(__dirname, "../cache.json")))
        } catch {
            return false
        }
    })()

    console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Retrieving panel nodes..."))
    const nodesStats = await require("./getNodesDetails.js")();
    if (!nodesStats) throw new Error("Failed to get nodes attributes");

    const statusPromises = nodesStats.slice(0, config.nodes_settings.limit).map(async (node) => {
        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Fetching ${cliColor.blueBright(node.attributes.name)} configuration...`))
        const nodeConfig = await require("./getNodeConfiguration.js")(node.attributes.id);
        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Checking ${cliColor.blueBright(node.attributes.name)} wings status...`))
        const nodeStatus = await require("./promiseTimeout.js")(require("./getWingsStatus.js")(node, nodeConfig.token), config.timeout * 1000);

        let nodeUptime = cache ? (() => {
            return cache.nodes.find((n) => n.attributes.id === node.attributes.id)?.uptime || Date.now()
        })() : Date.now()

        if (!nodeUptime && nodeStatus) nodeUptime = Date.now()

        if (!nodeStatus) {
            nodeUptime = false
            console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright(`Node ${cliColor.blueBright(node.attributes.name)} is currently offline.`))
        }

        return {
            attributes: {
                id: node.attributes.id,
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
            uptime: nodeUptime,
            status: nodeStatus
        };
    });

    const data = {
        uptime: cache ? (() => {
            return cache.uptime || Date.now()
        })() : Date.now(),
        servers: await require("./getServers.js")(),
        users: await require("./getUsers.js")(),
        nodes: await Promise.all(statusPromises),
        timestamp: Date.now()
    }

    fs.writeFileSync("cache.json", JSON.stringify(data, null, 2), "utf8");

    return data
}