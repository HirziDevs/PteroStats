const { MessageEmbed, Formatters, MessageActionRow, MessageButton } = require('discord.js')
const chalk = require('chalk')

module.exports = async function postStatus(client, panel, nodes) {

    const channel = await client.channels.cache.get(client.config.channel)

    if (!channel) return console.log('Invalid Channel ID')

    let messages = await channel.messages.fetch({ limit: 10 })
    messages = messages.filter(m => m.author.id === client.user.id).last();
    if (messages && messages.embeds.length === 0) {
        messages.delete()
        messages = null
    }

    const format = await Formatters.time(new Date(Date.now() + client.config.refresh * 1000), 'R')
    const embed = new MessageEmbed()

    let text = ''
    let desc = ''

    if (client.config.embed.title) embed.setTitle(client.config.embed.title)
    if (client.config.embed.description) desc = client.config.embed.description.replaceAll('{{time}}', format) + '\n'
    if (client.config.embed.color) embed.setColor(client.config.embed.color)
    if (client.config.embed.footer) embed.setFooter({ text: client.config.embed.footer })
    if (client.config.embed.thumbnail) embed.setThumbnail(client.config.embed.thumbnail)
    if (client.config.embed.image) embed.setImage(client.config.embed.image)

    panel.total_users = panel.total_users.toLocaleString()
    panel.total_servers = panel.total_servers.toLocaleString()

    const stats = new Promise((resolve, reject) => {
        if (nodes.length !== 0) {
            nodes.forEach((data, i) => {
                const title = data.name + ': ' + String(data.status).replace('true', client.config.status.online).replace('false', client.config.status.offline)
                let description = '```' + '\n' +
                    'Status  : ' + String(data.status).replace('true', client.config.status.online).replace('false', client.config.status.offline) + '\n'

                switch (client.config.resource.unit) {
                    case 'gb':
                        description = description +
                            'Memory  : ' + Math.floor(data.memory_min / 1000).toLocaleString() + ' Gb /' + Math.floor(data.memory_max / 1000).toLocaleString() + ' Gb\n' +
                            'Disk    : ' + Math.floor(data.disk_min / 1000).toLocaleString() + 'Gb /' + Math.floor(data.disk_max / 1000).toLocaleString() + ' Gb\n'
                        break;
                    case 'percent':
                        description = description +
                            'Memory  : ' + Math.floor(data.memory_min / data.memory_max * 100) + ' %\n' +
                            'Disk    : ' + Math.floor(data.disk_min / data.disk_max * 100) + ' %\n'
                        break;
                    default:
                        description = description +
                            'Memory  : ' + data.memory_min.toLocaleString() + ' Mb /' + data.memory_max.toLocaleString() + ' Mb\n' +
                            'Disk    : ' + data.disk_min.toLocaleString() + 'Mb /' + data.disk_max.toLocaleString() + ' Mb\n'
                }

                if (client.config.resource.location) description = description + 'Location: ' + data.location + '\n'
                if (client.config.resource.allocations) description = description + 'Servers : ' + data.allocations.toLocaleString() + '\n'
                if (client.config.resource.servers) description = description + 'Servers : ' + data.total_servers.toLocaleString() + '\n'

                description = description + '```'

                if (client.config.resource.enable) {
                    text = text + '\n**' + title.replace(':', ':**') + '\n' + description
                } else {
                    text = text + '\n**' + title.replace(':', ':**')
                }

                if (i + 1 === nodes.length) resolve()
            })
        } else if (nodes.length === 0) {
            if (!messages) {
                text = 'There is no nodes to display'
                resolve()
            } else {
                text = messages.embeds[0].fields[0].value.replaceAll(client.config.status.online, client.config.status.offline)
                if (!panel.status && String(String(messages.embeds[0].fields[1].value).split('\n')[2]).split('')[String(String(messages.embeds[0].fields[1].value).split('\n')[2]).length - 1] !== '`') {
                    panel.total_users = String(String(messages.embeds[0].fields[1].value).split('\n')[2]).split('')[String(String(messages.embeds[0].fields[1].value).split('\n')[2]).length - 1]
                    panel.total_servers = String(String(messages.embeds[0].fields[1].value).split('\n')[3]).split('')[String(String(messages.embeds[0].fields[1].value).split('\n')[3]).length - 1]
                }
                resolve()
            }
        }
    })

    stats.then(async () => {

        embed.setDescription(desc + '\n**Nodes Stats [' + nodes.length + ']**' + text)
        embed.addField('Panel Stats',
            '**Status:** ' + String(panel.status).replace('true', client.config.status.online).replace('false', client.config.status.offline) + '\n\n' +
            'Users: ' + String(panel.total_users).replace('-1', '`Unknown`') + '\n' +
            'Servers: ' + String(panel.total_servers).replace('-1', '`Unknown`')
        )

        if (client.config.embed.field.enable) {
            embed.addField(client.config.embed.field.title, client.config.embed.field.description.replaceAll('{{time}}', format))
        }

        embed.setTimestamp()

        let row = []

        if (client.config.button.enable) {
            row = new MessageActionRow
            if (client.config.button.btn1.label.length !== 0 && client.config.button.btn1.label.link.length !== 0) {
                row.addComponents(
                    new MessageButton()
                        .setLabel(client.config.button.btn1.label)
                        .setStyle('LINK')
                        .setURL(client.config.button.btn1.url)
                )
            }
            if (client.config.button.btn2.label.length !== 0 && client.config.button.btn2.label.link.length !== 0) {
                row.addComponents(
                    new MessageButton()
                        .setLabel(client.config.button.btn2.label)
                        .setStyle('LINK')
                        .setURL(client.config.button.btn2.url)
                )
            }
            if (client.config.button.btn3.label.length !== 0 && client.config.button.btn3.label.link.length !== 0) {
                row.addComponents(
                    new MessageButton()
                        .setLabel(client.config.button.btn3.label)
                        .setStyle('LINK')
                        .setURL(client.config.button.btn3.url)
                )
            }
            if (client.config.button.btn4.label.length !== 0 && client.config.button.btn4.label.link.length !== 0) {
                row.addComponents(
                    new MessageButton()
                        .setLabel(client.config.button.btn4.label)
                        .setStyle('LINK')
                        .setURL(client.config.button.btn4.url)
                )
            }
            if (client.config.button.btn5.label.length !== 0 && client.config.button.btn5.label.link.length !== 0) {
                row.addComponents(
                    new MessageButton()
                        .setLabel(client.config.button.btn5.label)
                        .setStyle('LINK')
                        .setURL(client.config.button.btn5.url)
                )
            }

            row = [row]
        }

        if (!messages) channel.send({ embeds: [embed] })
        else messages.edit({ embeds: [embed], components: row })
        console.log(chalk.cyan('[PteroStats]') + chalk.green(' stats posted!'))
    })
}