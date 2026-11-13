const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ContainerBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    MessageFlags,
    SectionBuilder,
    SeparatorBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder,
    time
} = require("discord.js");
const uptimeFormatter = require("./uptimeFormatter.js");
const convertUnits = require("./convertUnits.js");
const errorLogging = require("./errorLogging.js");
const config = require("./configuration.js");
const cliColor = require("cli-color");
const { PanelStatsComponent, NodeStatsComponent } = require("../CustomMessage.js");

const PANEL_COMPONENT_ID = 10000;
const NODE_GROUP_COMPONENT_ID = 20000;
const CONTROL_COMPONENT_ID = 30000;
const NODE_GROUP_SIZE = 5;

function getAccentColor(color) {
    const value = String(color || "").replace(/^#/, "");
    return /^[\da-f]{6}$/i.test(value) ? Number.parseInt(value, 16) : undefined;
}

function addMediaGallery(container, urls) {
    const items = urls.filter(Boolean).map(url => new MediaGalleryItemBuilder().setURL(url));
    if (items.length) container.addMediaGalleryComponents(new MediaGalleryBuilder().addItems(...items));
}

function addEmbedHeading(container, embed, fallbackTitle) {
    const title = embed.title || fallbackTitle;
    const linkedTitle = embed.url ? `[${title}](${embed.url})` : title;
    const heading = [
        embed.author?.name && `**${embed.author.name}**`,
        `### ${linkedTitle}`
    ].filter(Boolean).join("\n");

    if (embed.author?.icon) {
        container.addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(new TextDisplayBuilder().setContent(heading))
                .setThumbnailAccessory(new ThumbnailBuilder().setURL(embed.author.icon))
        );
    } else {
        container.addTextDisplayComponents(new TextDisplayBuilder().setContent(heading));
    }

    if (embed.description) container.addTextDisplayComponents(new TextDisplayBuilder().setContent(embed.description));
}

function addEmbedFooter(container, embed, includeTimestamp) {
    const footer = embed.footer?.text;
    const timestamp = includeTimestamp ? `Updated <t:${Math.floor(Date.now() / 1000)}:F>` : "";
    const content = [footer, timestamp].filter(Boolean).join(" | ");

    if (content) container.addTextDisplayComponents(new TextDisplayBuilder().setContent(content));
}

function getButtonRows() {
    if (!config.button.enable) return [];

    return ["row1", "row2", "row3", "row4", "row5"]
        .map(rowName => (config.button[rowName] || [])
            .filter(button => button.label && button.url)
            .slice(0, 5))
        .filter(buttons => buttons.length)
        .map(buttons => new ActionRowBuilder().addComponents(
            buttons.map(button => new ButtonBuilder()
                .setLabel(button.label)
                .setURL(button.url)
                .setStyle(ButtonStyle.Link))
        ));
}

module.exports = async function sendMessage({ client, cache, panel, uptime, nodes = [], servers, users }) {
    const nextUpdate = time(new Date(Date.now() + (config.refresh * 1000) + 1000), "R");
    const panelEmbed = config.embed.panel;
    const nodeEmbed = config.embed.nodes;
    const buttonRows = getButtonRows();
    const panelComponent = PanelStatsComponent({
        id: PANEL_COMPONENT_ID,
        heading: `### ${panelEmbed.url ? `[${panelEmbed.title || "Panel Stats"}](${panelEmbed.url})` : panelEmbed.title || "Panel Stats"}`,
        author: panelEmbed.author?.name,
        authorIcon: panelEmbed.author?.icon,
        statusText: panel ? config.status.online : config.status.offline,
        online: Boolean(panel),
        messageContent: config.message.content,
        description: (panelEmbed.description || "").replaceAll("{{time}}", nextUpdate),
        stats: [
            config.panel_settings.host ? `Host   : ${new URL(process.env.PanelURL).host}` : "",
            `Nodes  : ${nodes.length}`,
            config.panel_settings.servers ? `Servers: ${servers || "Unknown"}` : "",
            config.panel_settings.users ? `Users  : ${users || "Unknown"}` : "",
            config.panel_settings.uptime ? `Uptime : ${uptime ? uptimeFormatter(Date.now() - uptime) : "N/A"}` : ""
        ].filter(Boolean).join("\n"),
        accentColor: getAccentColor(panelEmbed.color)
    });

    addMediaGallery(panelComponent, [panelEmbed.thumbnail, panelEmbed.image, panelEmbed.footer?.icon]);
    addEmbedFooter(panelComponent, panelEmbed, panelEmbed.timestamp);

    const nodeComponents = nodes.map(node => {
        const stats = [
            config.nodes_settings.host ? `Host   : ${node.attributes.fqdn}` : "",
            `Memory : ${convertUnits(node.attributes.allocated_resources.memory, node.attributes.memory, config.nodes_settings.unit)}`,
            `Disk   : ${convertUnits(node.attributes.allocated_resources.disk, node.attributes.disk, config.nodes_settings.unit)}`,
            node.attributes?.allocated_resources?.cpu ? `CPU    : ${node.attributes.allocated_resources.cpu}%` : "",
            config.nodes_settings.servers
                ? `Servers: ${node.attributes.relationships.servers}${config.nodes_settings.allocations_as_max_servers ? ` / ${node.attributes.relationships.allocations}` : ""}`
                : "",
            config.nodes_settings.uptime ? `Uptime : ${node.uptime ? uptimeFormatter(Date.now() - node.uptime) : "N/A"}` : ""
        ].filter(Boolean).join("\n");

        return NodeStatsComponent({
            id: node.attributes.id,
            name: node.attributes.name,
            statusText: node.status ? config.status.online : config.status.offline,
            online: Boolean(node.status),
            stats: config.nodes_settings.details ? stats : "",
            accentColor: getAccentColor(nodeEmbed.color)
        });
    });

    const nodeGroups = [];
    for (let index = 0; index < nodeComponents.length || index === 0; index += NODE_GROUP_SIZE) {
        const groupIndex = nodeGroups.length;
        const groupId = NODE_GROUP_COMPONENT_ID + groupIndex;
        const group = new ContainerBuilder().setId(groupId);

        if (getAccentColor(nodeEmbed.color) !== undefined) group.setAccentColor(getAccentColor(nodeEmbed.color));
        addEmbedHeading(group, nodeEmbed, "Nodes Stats");
        addMediaGallery(group, [nodeEmbed.thumbnail, nodeEmbed.image, nodeEmbed.footer?.icon]);
        addEmbedFooter(group, nodeEmbed, nodeEmbed.timestamp);

        const currentNodes = nodeComponents.slice(index, index + NODE_GROUP_SIZE);
        if (!currentNodes.length) {
            group.addSeparatorComponents(new SeparatorBuilder());
            group.addTextDisplayComponents(new TextDisplayBuilder().setContent("There are no nodes to be displayed!"));
        }
        nodeGroups.push({ id: groupId, components: [group, ...currentNodes] });
    }

    const plans = [];
    if (config.panel_settings.status) {
        plans.push({ id: PANEL_COMPONENT_ID, components: [panelComponent] });
    }
    if (buttonRows.length || (!config.panel_settings.status && config.message.content)) {
        const controlComponent = new ContainerBuilder().setId(CONTROL_COMPONENT_ID);
        if (!config.panel_settings.status && config.message.content) {
            controlComponent.addTextDisplayComponents(new TextDisplayBuilder().setContent(config.message.content));
        }
        controlComponent.addActionRowComponents(...buttonRows);
        plans.push({ id: CONTROL_COMPONENT_ID, components: [controlComponent] });
    }
    plans.push(...nodeGroups);

    try {
        const channel = await client.channels.fetch(process.env?.DiscordChannel);
        const fetchedMessages = await channel.messages.fetch({ limit: 100 });
        const botMessages = [...fetchedMessages.values()].filter(message => message.author.id === client.user.id);
        const usedMessages = new Set();

        for (const plan of plans) {
            const existingMessage = botMessages.find(message =>
                !usedMessages.has(message.id) &&
                message.components.some(component => component.id === plan.id)
            );

            if (existingMessage) {
                await existingMessage.edit({ flags: MessageFlags.IsComponentsV2, components: plan.components });
                usedMessages.add(existingMessage.id);
            } else {
                await channel.send({ flags: MessageFlags.IsComponentsV2, components: plan.components });
            }
        }

        const staleMessages = botMessages.filter(message =>
            !usedMessages.has(message.id) &&
            (message.embeds.length > 0 || message.flags.has(MessageFlags.IsComponentsV2))
        );
        await Promise.all(staleMessages.map(message => message.delete()));

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
            } else if (error.rawError?.errors && ["MAX_EMBED_SIZE_EXCEEDED", "MAX_COMPONENTS_EXCEEDED"].includes(Object.values(error.rawError.errors)[0]?._errors?.[0]?.code)) {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Discord message limit exceeded! Please limit or decrease the nodes that need to be shown in the config!"));
            } else if (error.rawError?.errors && Object?.values(error.rawError.errors)[0]?._errors[0]?.code) {
                console.error(Object.values(error.rawError.errors)[0]._errors[0].message);
            } else {
                console.error(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Discord Error"), error);
            }
            errorLogging(error);
            process.exit();
        } catch (err) {
            console.error(error);
            process.exit();
        }
    }
};
