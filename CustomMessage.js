const {
    ButtonBuilder,
    ButtonStyle,
    ContainerBuilder,
    SectionBuilder,
    SeparatorBuilder,
    TextDisplayBuilder,
    ThumbnailBuilder
} = require("discord.js");

function createStatusAccessory({ customId, text, online }) {
    const status = String(text || "");
    const customEmoji = status.match(/<(a?):([A-Za-z0-9_]+):(\d+)>/);
    const label = status
        .replace(/<a?:[A-Za-z0-9_]+:\d+>/g, "")
        .replace(/:[A-Za-z0-9_+-]+:/g, "")
        .trim()
        .slice(0, 80) || (online ? "Online" : "Offline");
    const button = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(online ? ButtonStyle.Success : ButtonStyle.Danger)
        .setDisabled(true);

    if (customEmoji) {
        button.setEmoji({
            name: customEmoji[2],
            id: customEmoji[3],
            animated: customEmoji[1] === "a"
        });
    }

    return button;
}

function PanelStatsComponent({ id, heading, author, authorIcon, statusText, online, messageContent, description, stats, accentColor }) {
    const component = new ContainerBuilder().setId(id);

    if (Number.isInteger(accentColor)) component.setAccentColor(accentColor);

    if (messageContent) component.addTextDisplayComponents(new TextDisplayBuilder().setContent(messageContent));

    if (author) {
        const authorDisplay = new TextDisplayBuilder().setContent(`**${author}**`);
        if (authorIcon) {
            component.addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(authorDisplay)
                    .setThumbnailAccessory(new ThumbnailBuilder().setURL(authorIcon))
            );
        } else {
            component.addTextDisplayComponents(authorDisplay);
        }
    }

    component.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(heading))
            .setButtonAccessory(createStatusAccessory({
                customId: `pterostats:status:${id}`,
                text: statusText,
                online
            }))
    );

    if (description) component.addTextDisplayComponents(new TextDisplayBuilder().setContent(description));
    if (stats) {
        component.addSeparatorComponents(new SeparatorBuilder());
        component.addTextDisplayComponents(new TextDisplayBuilder().setContent(`\`\`\`\n${stats}\n\`\`\``));
    }

    return component;
}

function NodeStatsComponent({ id, name, statusText, online, stats, accentColor }) {
    const component = new ContainerBuilder();

    if (Number.isInteger(id)) component.setId(id);
    if (Number.isInteger(accentColor)) component.setAccentColor(accentColor);

    component.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent(`### ${name}`))
            .setButtonAccessory(createStatusAccessory({
                customId: `pterostats:node-status:${id}`,
                text: statusText,
                online
            }))
    );
    if (stats) {
        component.addSeparatorComponents(new SeparatorBuilder());
        component.addTextDisplayComponents(new TextDisplayBuilder().setContent(`\`\`\`\n${stats}\n\`\`\``));
    }

    return component;
}

module.exports = { PanelStatsComponent, NodeStatsComponent };
