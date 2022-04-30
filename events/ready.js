module.exports = client => {

  //Code are very sensitive, please changes things on config.yml instead
  
  const { MessageEmbed } = require('discord.js');
  const db = require('quick.db');
  const nodetable = new db.table('node');
  const paneltable = new db.table('panel');
  const chalk = require('chalk');

  // Pretty much unnecessary but.... Load our requests functions from the file
  const requests = require('../utils/requests.js');
  client.exec = requests

  // Why would people even care xD
  if (process.env.debug === true) {
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Debug Mode: ') + chalk.cyan('true'))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Debug Axios Mode: ') + chalk.cyan(process.env.debugaxios))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Resource: ') + chalk.cyan(process.env.resource.enable))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Timestamp: ') + chalk.cyan(process.env.embed.timestamp))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Description: ') + chalk.cyan(process.env.embed.description.enable))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Footer: ') + chalk.cyan(process.env.embed.footer.enable))
  }

  let hosturl = process.env.pterodactyl.url;

  if (!hosturl.includes('http')) hosturl = 'http://' + hosturl
  let unapi = hosturl + '/api'
  let api = unapi.replace('//api', '/api')

  client.user.setActivity(process.env.client.activity, { type: 'PLAYING' });
  client.user.setStatus(process.env.client.status);

  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  console.log(chalk.green('Name: ') + chalk.cyan('PteroStats'))
  console.log(chalk.green('Version: ') + chalk.cyan('Stable v1.5.6'))
  console.log(chalk.green('Refresh Time: ') + chalk.cyan(process.env.channel.refreshtime + ' Seconds'))
  console.log(chalk.green('Bot Status: ') + chalk.cyan('Online'))
  console.log(chalk.green('Support: ') + chalk.cyan('https://discord.gg/zv6maQRah3'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  
  if(paneltable.get('URL') === null) console.log(chalk.cyan('It seems you are using our bot for first time, thank you for choosing our bot, if you need help you can join our support server!'))
  if(paneltable.get('URL') !== api) console.log(chalk.cyan('Panel url changed, please allow the bot to do a first time run with the new configurations and check back in ' + process.env.channel.refreshtime + ' seconds'))
  
  paneltable.set('URL',api)

  setInterval(() => {
    if (isNaN(process.env.channel.refreshtime)) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(process.env.channel.refreshtime + ' is not a number'))
    if (!hosturl.includes('.')) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(hosturl + ' is not a valid url'))
    if (process.env.pterodactyl.key.length < 48) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Please provide a valid api key for the bot to work properly'))

    let list = []
 
    client.exec.getNodes(api, process.env.pterodactyl.key).then( async response => {
      response.forEach(nodes => {
        client.exec.getAllocations(api, process.env.pterodactyl.key, nodes.attributes.id).then(node => {
          client.exec.getNodeConfig(api, process.env.pterodactyl.key, nodes.attributes.id).then(data => {
            client.exec.getNodeStatus(node.data.attributes.scheme, node.data.attributes.fqdn, node.data.attributes.daemon_listen, data.data.token).then(status => {
      
              let ram = 'temp'
              let disk = 'temp'

              if (process.env.resource.unit === 'mb') {
                disk = '[Disk: ' + node.data.attributes.allocated_resources.disk + 'MB/' + node.data.attributes.disk + 'MB]'
                ram = '[Ram: ' + node.data.attributes.allocated_resources.memory + 'MB/' + node.data.attributes.memory + 'MB]'
              } else if (process.env.resource.unit === 'gb') {
                disk = '[Disk: ' + Math.floor(node.data.attributes.allocated_resources.disk / 1000) + 'GB/' + Math.floor(node.data.attributes.disk / 1000) + 'GB]'
                ram = '[Ram: ' + Math.floor(node.data.attributes.allocated_resources.memory / 1000) + 'GB/' + Math.floor(node.data.attributes.memory / 1000) + 'GB]'
              } else if (process.env.resource.unit === 'percent') {
                disk = '[Disk: ' + Math.floor(node.data.attributes.allocated_resources.disk / node.data.attributes.disk * 100) + '%/100%]'
                ram = '[Ram: ' + Math.floor(node.data.attributes.allocated_resources.memory / node.data.attributes.memory * 100) + '%/100%]'
              } else {
                disk = '[Disk: ' + Math.floor(node.data.attributes.allocated_resources.disk / 1000) + 'GB/' + Math.floor(node.data.attributes.disk / 1000) + 'GB]'
                ram = '[Ram: ' + Math.floor(node.data.attributes.allocated_resources.memory / 1000) + 'GB/' + Math.floor(node.data.attributes.memory / 1000) + 'GB]'
                console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red("An invalid value was provided in the UNIT field. Defaulting to the default one") + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
              }

              nodetable.set('node' + nodes.attributes.id, {
                ram: ram,
                disk: disk,
                status: true,
                servers: '[Servers: ' + node.data.attributes.relationships.servers.data.length + ']',
                location: '[Locations: ' + node.data.attributes.relationships.location.attributes.short + ']',
                port: '[Allocations: ' + node.data.attributes.relationships.allocations.data.length + ']',
                mode: node.data.attributes.maintenance_mode
              })

            }).catch((err) => {
              if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(node.data.attributes.name + ' is down!'))
              if (process.env.debugaxios === true) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))

              nodetable.set('node' + nodes.attributes.id, {
                ram: '[Ram: N/A]',
                disk: '[Disk: N/A]',
                status: false,
                servers: '[Servers: N/A]',
                location: '[Location: N/A]',
                port: '[Allocations: N/A]',
                mode: false
              })
            })
          }).catch((err) => {
            console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
          })
        }).catch((err) => {
          console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
        })

        let stats = nodetable.get('node' + nodes.attributes.id)
        let msgStats;
        if (`${stats}` === 'null') msgStats = '**' + nodes.attributes.name + '**: ' + process.env.status.check + '\n'
        if (`${stats}` !== 'null') {
          let statsname = '**' + nodes.attributes.name + '**: '

          if (stats.status === true) statsname = statsname + process.env.status.online
          if (stats.status === false) statsname = statsname + process.env.status.offline
            
          if (process.env.resource.enable === false) msgStats = statsname + '\n'

          if (stats.mode === true) statsname = statsname + ' [Maintenance]'

          if (process.env.resource.enable === true) statsname = statsname + '\n```\n' + stats.ram + '\n' + stats.disk
          if (process.env.resource.location === true) statsname = statsname + '\n' + stats.location
          if (process.env.resource.allocations === true) statsname = statsname + '\n' + stats.port
          if (process.env.resource.servers === true) statsname = statsname + '\n' + stats.servers
          if (process.env.resource.enable === false) statsname = statsname + '\n'

          if (process.env.resource.enable === true) msgStats = statsname + '```\n'
        }

        list.push(msgStats)
      })

      client.exec.queryServers(api, process.env.pterodactyl.key).then(ser => {
        paneltable.set('serverCount', ser.data.meta.pagination.total)
      }).catch((err) => {
        paneltable.set('serverCount', 'N/A')
        if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Panel is down'))
        if (process.env.debugaxios === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
      })

      client.exec.queryUsers(api, process.env.pterodactyl.key).then(usr => {
        paneltable.set('userCount', usr.data.meta.pagination.total)
      }).catch((err) => {
        paneltable.set('userCount', 'N/A')
        if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Panel is down!'))
        if (debugaxios === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
      })

      let userCount = paneltable.get('userCount')
      let serverCount = paneltable.get('serverCount')

      if (userCount === null) userCount = 'checking'
      if (serverCount === null) serverCount = 'checking'

      if (userCount !== 'N/A') paneltable.set('panel', '**Panel**: ' + process.env.status.online)
      if (userCount === 'N/A') {
        paneltable.set('panel', '**Panel**: ' + process.env.status.offline)
        if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('panel is down!'))
      }
      if (userCount === process.env.status.check) paneltable.set('panel', '**Panel**: ' + process.env.status.check)
      let panel = paneltable.get('panel') + '\n\nUsers: ' + userCount + '\nServers: ' + serverCount

      if (panel === null) panel = '**Panel**: ' + process.env.status.check + '\n\nUsers: ' + userCount + '\nServers: ' + serverCount

      let nodes
      list.forEach((d) => {
        if (!nodes) return nodes = d
        nodes = nodes + d
      })

      if (process.env.checker === true) console.log(chalk.cyan(['[PteroStats Checker] ']) + chalk.green('Connected to ' + list.length + ' nodes'))
      let nodeCount = '[Total ' + list.length + ']'

      if (process.env.debug === true) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.blue(nodes))
      if (nodes === undefined) {
        nodes = process.env.status.check + ' Please wait ' + time + ' seconds'
        if (process.env.checker === true) console.log(chalk.cyan(['[PteroStats Checker] ']) + chalk.yellow(process.env.status.check + ' Please wait ' + process.env.channel.refreshtime + ' seconds'))
      }

      let embedfooter = 'Updated every ' + process.env.channel.refreshtime + ' seconds'
      if (process.env.embed.footer.enable === true) embedfooter = 'Updated every ' + process.env.channel.refreshtime + ' seconds | ' + process.env.embed.footer.text

      let FINAL_EMBED = new MessageEmbed()
        .setTitle(process.env.embed.title)
        .setColor(process.env.embed.color_primary)
        .addField('Panel Stats', `${panel}`)
        .setFooter({ text: embedfooter })
        .setThumbnail(client.user.avatarURL())
      if (process.env.embed.timestamp === true) {
        FINAL_EMBED.setTimestamp()
      }
      if (process.env.embed.description.enable === true) {
        FINAL_EMBED.setDescription(`${process.env.embed.description.text}\n**Nodes Stats ${nodeCount}**\n${nodes}`)
      } else {
        FINAL_EMBED.setDescription(`\n**Nodes Stats ${nodeCount}**\n${nodes}`)
      }

      let messages = await client.channels.cache.find(cn => cn.id === process.env.channel.id).messages.fetch({limit: 10})
      messages = messages.filter(m => m.author.id === client.user.id).last();

      if (messages == null) client.channels.cache.find(cn => cn.id === process.env.channel.id).send({ embeds: [FINAL_EMBED] })
      else messages.edit({ embeds: [FINAL_EMBED] })


      if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Posted Stats'))
      if (panel !== null && process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Stats Updated'))
      if (process.env.checker === true) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Updating Stats in ' + process.env.channel.refreshtime + ' Seconds'))

    }).catch((err) => {
      console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
    })
  }, process.env.channel.refreshtime + '000')
}
