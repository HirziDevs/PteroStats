const { WebhookClient, EmbedBuilder } = require("discord.js")
const config = require("./config")
const cliColor = require("cli-color")

module.exports = function Webhook(embed) {
    if (config.notifier.enable) {
        try {
            const webhook = new WebhookClient({
                url: config.notifier.webhook
            })
            webhook.send({
                embeds: [
                    new EmbedBuilder(embed.data)
                        .setAuthor({
                            name: config.notifier.embed.author.name || null,
                            iconURL: config.notifier.embed.author.icon || null
                        })
                        .setFooter({
                            text: config.notifier.embed.footer.text || null,
                            iconURL: config.notifier.embed.footer.icon || null
                        })
                        .setURL(config.notifier.embed.url || null)
                        .setTimestamp(config.notifier.embed.timestamp ? new Date() : null)
                        .setThumbnail(config.notifier.embed.thumbnail || null)
                        .setImage(config.notifier.embed.image || null)
                ]
            })
        } catch (error) {
            console.log(error)
            console.log(cliColor.cyanBright("[PteroStats] ") + cliColor.redBright("Invalid Webhook URL"))
        }
    }
}