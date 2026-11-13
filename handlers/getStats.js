const { EmbedBuilder } = require("discord.js");
const getNodeConfiguration = require("./getNodeConfiguration.js");
const getNodesDetails = require("./getNodesDetails.js");
const getWingsStatus = require("./getWingsStatus.js");
const promiseTimeout = require("./promiseTimeout.js");
const errorLogging = require("./errorLogging.js");
const sendMessage = require("./sendMessage.js");
const getServers = require("./getServers.js");
const config = require("./configuration.js");
const getUsers = require("./getUsers.js");
const webhook = require("./webhook.js");
const cliColor = require("cli-color");
const path = require('node:path');
const fs = require("node:fs");

let refreshTimer;
let refreshInProgress = false;

function scheduleNextRefresh(client) {
    if (refreshTimer) clearTimeout(refreshTimer);

    refreshTimer = setTimeout(() => {
        refreshTimer = null;
        module.exports(client).catch(error => {
            if (config.log_error) console.error(error);
            errorLogging(error);
        });
    }, config.refresh * 1000);
}

module.exports = async function getStats(client) {
    if (refreshInProgress) return;

    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }

    refreshInProgress = true;

    try {
        let cache = (() => {
            try {
                return JSON.parse(fs.readFileSync(path.join(__dirname, "../cache.json")))
            } catch {
                return false
            }
        })()

        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow("Retrieving panel nodes..."))
        const nodesStats = await promiseTimeout(getNodesDetails(), config.timeout * 1000);
        if (!nodesStats) throw new Error("Failed to get nodes attributes");

        const statusPromises = nodesStats.slice(0, config.nodes_settings.limit).map(async (node) => {
            console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Fetching ${cliColor.blueBright(node.attributes.name)} configuration...`))
            const nodeConfig = await getNodeConfiguration(node.attributes.id);
            console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.yellow(`Checking ${cliColor.blueBright(node.attributes.name)} wings status...`))
            const nodeStatus = await promiseTimeout(getWingsStatus(node, nodeConfig.token), config.timeout * 1000);

            let nodeUptime = cache ? (() => {
                return cache.nodes.find((n) => n.attributes.id === node.attributes.id)?.uptime || Date.now()
            })() : Date.now()

            if (!nodeUptime && nodeStatus) nodeUptime = Date.now()

            if (!nodeStatus) {
                nodeUptime = false
                if (cache && cache.nodes.find((n) => n.attributes.id === node.attributes.id)?.status)
                    webhook(
                        new EmbedBuilder()
                            .setTitle("Node Offline")
                            .setColor("ED4245")
                            .setDescription(`Node \`${node.attributes.name}\` is currently offline`)
                    )
                console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright(`Node ${cliColor.blueBright(node.attributes.name)} is currently offline.`))
            } else {
                if (cache && !cache.nodes.find((n) => n.attributes.id === node.attributes.id)?.status)
                    webhook(
                        new EmbedBuilder()
                            .setTitle("Node Online")
                            .setColor("57F287")
                            .setDescription(`Node \`${node.attributes.name}\` is back online`)
                    )
            }

            return {
                attributes: {
                    id: node.attributes.id,
                    name: node.attributes.name,
                    memory: node.attributes.memory,
                    disk: node.attributes.disk,
                    cpu: node.attributes.cpu,
                    fqdn: node.attributes.fqdn,
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
            servers: await getServers(),
            users: await getUsers(),
            nodes: await Promise.all(statusPromises),
            isPanelDown: !cache?.uptime,
            timestamp: Date.now()
        }

        fs.writeFileSync("cache.json", JSON.stringify(data, null, 2), "utf8");

        if (data.isPanelDown) webhook(
            new EmbedBuilder()
                .setTitle("Panel Online")
                .setColor("57F287")
                .setDescription(`Panel is back online`)
        )

        data.client = client
        data.panel = true

        return await sendMessage(data);
    } catch (error) {
        if (config.log_error) console.error(error)
        errorLogging(error)
        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Panel is currently offline."));

        let results;
        try {
            results = JSON.parse(await fs.promises.readFile(path.join(__dirname, "../cache.json"), "utf8"));
        } catch (cacheError) {
            if (cacheError.code === "ENOENT") {
                console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Last cache was not found!"));
            } else {
                console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Something went wrong with cache data..."));
            }
            return await sendMessage({ client, cache: false, panel: false });
        }

        if (results.uptime) webhook(
            new EmbedBuilder()
                .setTitle("Panel Offline")
                .setColor("ED4245")
                .setDescription(`Panel is currently offline`)
        );
        results.uptime = false;
        fs.writeFileSync("cache.json", JSON.stringify(results, null, 2), "utf8");

        results.client = client
        results.panel = false
        results.cache = true
        return await sendMessage(results);
    } finally {
        refreshInProgress = false;
        scheduleNextRefresh(client);
    }
}