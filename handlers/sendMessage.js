
const { EmbedBuilder, time, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const uptimeFormatter = require("./uptimeFormatter.js");
const convertUnits = require("./convertUnits.js");
const errorLogging = require("./errorLogging.js");
const config = require("./configuration.js");
const cliColor = require("cli-color");

module.exports = async function sendMessage({ client, cache, panel, uptime, nodes, servers, users }) {
    let embed = new EmbedBuilder()
        .setAuthor({
            name: config.embed.nodes.author.name || null,
            iconURL: config.embed.nodes.author.icon || null
        })
        .setDescription(config.embed.nodes.description || null)
        .setTitle(config.embed.nodes.title || null)
        .setColor(config.embed.nodes.color || null)
        .setURL(config.embed.nodes.url || null)
        .setThumbnail(config.embed.nodes.thumbnail || null)

    let embeds = [embed];

    if (nodes && nodes.length > 0) {
        if (config.nodes_settings.details) {
            nodes.forEach((node, index) => {
                if (index % 25 === 0 && index !== 0) {
                    embed = new EmbedBuilder().setColor(config.embed.nodes.color);
                    if (embeds.length < 9) embeds.push(embed);
                }

                embed.addFields({
                    name: `${node.attributes.name} - ${node.status ? config.status.online : config.status.offline}`,
                    value:
                        "```\n" +
                        (config.nodes_settings.host ? `Host   : ${node.attributes.fqdn}\n` : "") +
                        `Memory : ${convertUnits(node.attributes.allocated_resources.memory, node.attributes.memory, config.nodes_settings.unit)}\n` +
                        `Disk   : ${convertUnits(node.attributes.allocated_resources.disk, node.attributes.disk, config.nodes_settings.unit)}` +
                        (node.attributes?.allocated_resources?.cpu ? `\nCPU    : ${node.attributes?.allocated_resources?.cpu || 0}%` : "") +
                        (config.nodes_settings.servers ? `\nServers: ${node.attributes.relationships.servers}${config.nodes_settings.allocations_as_max_servers ? ` / ${node.attributes.relationships.allocations}` : ""}` : "") +
                        (config.nodes_settings.uptime ? `\nUptime : ${node.uptime ? uptimeFormatter(Date.now() - node.uptime) : "N/A"}` : "") +
                        "```"
                });
            });
        } else embeds[0].setDescription((embed.data.description ? (embed.data.description + "\n\n") : "") + nodes.map(node => `**${node.attributes.name}** - ${node.status ? config.status.online : config.status.offline}`).join("\n"));
    }

    let panelEmbed = new EmbedBuilder()
        .setAuthor({
            name: config.embed.panel.author.name || null,
            iconURL: config.embed.panel.author.icon || null
        })
        .setColor(config.embed.panel.color || null)
        .setTitle(config.embed.panel.title || null)
        .setURL(config.embed.panel.url || null)
        .setTimestamp(config.embed.panel.timestamp ? new Date() : null)
        .setFooter({
            text: config.embed.panel.footer.text || null,
            iconURL: config.embed.panel.footer.icon || null
        })
        .setThumbnail(config.embed.panel.thumbnail || null)
        .setImage(config.embed.panel.image || null)
        .setDescription(
            config.embed.panel.description
                .replace(
                    "{{time}}",
                    time(new Date(Date.now() + (config.refresh * 1000) + 1000), "R")
                ) || null
        )
        .addFields({
            name: `Panel - ${panel ? config.status.online : config.status.offline}`,
            value:
                "```\n" +
                (config.panel_settings.host ? `Host   : ${new URL(process.env.PanelURL).host}\n` : "") +
                `Nodes  : ${nodes.length}\n` +
                (config.panel_settings.servers ? `Servers: ${servers || "Unknown"}\n` : "") +
                (config.panel_settings.users ? `Users  : ${users || "Unknown"}\n` : "") +
                (config.panel_settings.uptime ? `Uptime : ${uptime ? uptimeFormatter(Date.now() - uptime) : "N/A"}\n` : "") +
                "```"
        });

    if (config.panel_settings.status) embeds.unshift(panelEmbed);

    embeds[embeds.length - 1]
        .setTimestamp(config.embed.nodes.timestamp ? new Date() : null)
        .setFooter({
            text: config.embed.nodes.footer.text || null,
            iconURL: config.embed.nodes.footer.icon || null
        })
        .setImage(config.embed.nodes.image || null)

    if ((!cache && !panel) || (!nodes || nodes.length < 1)) {
        embeds[embeds.length - 1].setDescription(
            embeds[embeds.length - 1].data.description ? embeds[embeds.length - 1].data.description + "\n\nThere are no nodes to be display!" : "There are no nodes to be display!"
        );
    }

    const components = []

    if (config.button.enable) {
        for (const row of ["row1", "row2", "row3", "row4", "row5"]) {
            const buttons = config.button[row]?.slice(0, 5).filter(button => button.label && button.url);

            if (buttons && buttons.length > 0) {
                components.push(
                    new ActionRowBuilder().addComponents(
                        buttons.map(button =>
                            new ButtonBuilder()
                                .setLabel(button.label)
                                .setURL(button.url)
                                .setStyle(ButtonStyle.Link)
                        )
                    )
                );
            }
        }
    }

    try {
        const channel = await client.channels.fetch(process.env?.DiscordChannel);
        const messages = await channel.messages.fetch({ limit: 10 });
        const botMessage = messages.find(msg => msg.author.id === client.user.id);

        console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.green(`Panel stats successfully posted to the ${cliColor.blueBright(channel.name)} channel!`));

        setTimeout(() => client.getStats(client), config.refresh * 1000);

        if (botMessage) {
            await botMessage.edit({ content: config.message.content || null, embeds, components });
        } else {
            await channel.send({ content: config.message.content || null, embeds, components });
        }
    } catch (error) {
        try {
            if (error.rawError?.code === 429) {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Error 429 | Your IP has been rate limited by either Discord or your website. If it's a rate limit with Discord, you must wait. If it's a issue with your website, consider whitelisting your server IP."));
            } else if (error.rawError?.code === 403) {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("FORBIDDEN | The channel ID you provided is incorrect. Please double check you have the right ID. If you're not sure, read our documentation: \n>>https://github.com/HirziDevs/PteroStats#getting-channel-id<<"));
            } else if (error.code === "ENOTFOUND") {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("ENOTFOUND | DNS Error. Ensure your network connection and DNS server are functioning correctly."));
            } else if (error.rawError?.code === 50001) {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Discord Error | Your discord bot doesn't have access to see/send message/edit message in the channel!"));
            } else if (error.rawError?.errors && Object?.values(error.rawError.errors)[0]?._errors[0]?.code === "MAX_EMBED_SIZE_EXCEEDED") {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Discord Error | Embed message limit exceeded! Please limit or decrease the nodes that need to be shown in the config!"));
            } else if (error.rawError?.errors && Object?.values(error.rawError.errors)[0]?._errors[0]?.code) {
                console.error(Object.values(error.rawError.errors)[0]._errors[0].message);
            } else {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Discord Error"), error);
            }
            errorLogging(error)
            process.exit();
        } catch (err) {
            console.error(error)
            process.exit();
        }
    }
}