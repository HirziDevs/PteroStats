const bytesConverter = require("../calculator/bytesConverter.js")
const percentageCalculator = require("../calculator/percentageCalculator.js")

module.exports = client => {

  //Code are very sensitive, please changes things on config.yml instead
  
  const { MessageEmbed } = require('discord.js')
  const axios = require('axios')
  const db = require('quick.db')
  const nodetable = new db.table('node')
  const paneltable = new db.table('panel')
  const chalk = require('chalk')
  const config = client.config

  let enablecs = config.botstatus.enable
  let cs = config.botstatus.text
  let stype = config.botstatus.type
  let channelsIDs = config.channels
  let time = config.refreshtime

  let hosturl = config.panel.url
  let adminapikey = config.panel.adminkey

  let statusonline = config.status.online
  let statusoffline = config.status.offline
  let checking = config.status.check
  let resource = config.resource.enable
  let serverres = config.resource.servers
  let serverport = config.resource.allocations
  let serverloc = config.resource.location
  let unit = config.resource.unit

  let title = config.embed.title
  let color = config.embed.color
  let desc = config.embed.description.text
  let footer = config.embed.footer.text
  let enablets = config.embed.timestamp
  let enabledesc = config.embed.description.enable
  let enablef = config.embed.footer.enable

  let debug = config.debug
  let debugerror = config.debugaxios

  let monitorLink = config.monitorLink;

  if (debug === true) {
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Debug Mode: ') + chalk.cyan('true'))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Debug Axios Mode: ') + chalk.cyan(debugerror))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Resource: ') + chalk.cyan(resource))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Custom Status: ') + chalk.cyan(enablecs))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Timestamp: ') + chalk.cyan(enablets))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Description: ') + chalk.cyan(enabledesc))
    console.log(chalk.magenta('[PteroStats Debug] ') + chalk.green('Enable Footer: ') + chalk.cyan(enablef))
  }

  if (!hosturl.includes('http')) hosturl = 'http://' + hosturl
  let unapi = hosturl + '/api'
  let api = unapi.replace('//api', '/api')

  if (enablecs === true) {
    client.user.setActivity(cs, { type: stype })
  } else {
    client.user.setActivity(title + ' Panel Stats', { type: 'WATCHING' })
  }

  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  console.log(chalk.green('Name: ') + chalk.cyan('PteroStats'))
  console.log(chalk.green('Version: ') + chalk.cyan('Stable v1.5.0'))
  console.log(chalk.green('Refresh Time: ') + chalk.cyan(time + ' Seconds'))
  console.log(chalk.green('Bot Status: ') + chalk.cyan('Online'))
  console.log(chalk.green('Support: ') + chalk.cyan('https://discord.gg/zv6maQRah3'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  
  if(paneltable.get('URL') === null) console.log(chalk.cyan('It seems you are using our bot for first time, thank you for choosing our bot, if you need help you can join our support server!'))
  if(paneltable.get('URL') !== api) console.log(chalk.cyan('Panel url changed, please allow the bot to check the nodes status for ' + time + ' seconds'))
  paneltable.set('URL',api)

  setInterval(() => {
    if (isNaN(time)) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(time + ' is not a number!'))
    if (!hosturl.includes('.')) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(hosturl + ' is invalid url!'))
    if (adminapikey.length < 48) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Invalid Admin Apikey!!'))

    let list = []
    axios(api + '/application/nodes/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + adminapikey
      }
    }).then(async (response) => {
      let data = response.data.data
      data.forEach(nodes => {
        let id = nodes.attributes.id
        axios(api + '/application/nodes/' + id + '?include=servers,location,allocations', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + adminapikey
          }
        }).then(node => {
          axios(api + '/application/nodes/' + id + '/configuration', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + adminapikey
            }
          }).then(data => {
            axios(node.data.attributes.scheme + '://' + node.data.attributes.fqdn + ':' + node.data.attributes.daemon_listen + '/api/servers', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.data.token
              }
            }).then(status => {
              let ram = 'temp'
              let disk = 'temp'

              const mode = node.data.attributes.maintenance_mode
              const loc = 'Locations: ' + node.data.attributes.relationships.location.attributes.short
              const port = 'Allocations: ' + node.data.attributes.relationships.allocations.data.length
              const servers = 'Servers: ' + node.data.attributes.relationships.servers.data.length
              const rampercent = 'RAM: ' + Math.floor(node.data.attributes.allocated_resources.memory / node.data.attributes.memory * 100) + '%/100%'
              const diskpercent = 'Disk: ' + Math.floor(node.data.attributes.allocated_resources.disk / node.data.attributes.disk * 100) + '%/100%'
              const rammega = 'RAM: ' + node.data.attributes.allocated_resources.memory + 'MB/' + node.data.attributes.memory + 'MB'
              const diskmega = 'Disk: ' + node.data.attributes.allocated_resources.disk + 'MB/' + node.data.attributes.disk + 'MB'
              const ramgiga = 'RAM: ' + Math.floor(node.data.attributes.allocated_resources.memory / 1000) + 'GB/' + Math.floor(node.data.attributes.memory / 1000) + 'GB'
              const diskgiga = 'Disk: ' + Math.floor(node.data.attributes.allocated_resources.disk / 1000) + 'GB/' + Math.floor(node.data.attributes.disk / 1000) + 'GB'
              if (unit === 'mb') {
                disk = diskmega
                ram = rammega
               }else if (unit === 'gb') {
                disk = diskgiga
                ram = ramgiga
               }else if (unit === 'percent') {
                disk = diskpercent
                ram = rampercent
               }else if(unit === 'custom') {
                 let RAMTotal = Math.round(node.data.attributes.memory)
                 let RAMTotalText = bytesConverter(RAMTotal, "MB")
                 let RAM = Math.round(node.data.attributes.allocated_resources.memory)
                 let RAMText = bytesConverter(RAM, "MB")
                 let RAMPercent = percentageCalculator(RAM, RAMTotal)

                 let DiskTotal = Math.round(node.data.attributes.disk)
                 let DiskTotalText = bytesConverter(DiskTotal, "MB")
                 let Disk = Math.round(node.data.attributes.allocated_resources.disk)
                 let DiskText = bytesConverter(Disk, "MB")
                 let DiskPercent = percentageCalculator(Disk, DiskTotal)

                 ram = `RAM: ${RAMText}/${RAMTotalText} (${RAMPercent}%)`
                 disk = `Disk: ${DiskText}/${DiskTotalText} (${DiskPercent}%)`
              }

              nodetable.set('node' + id, {
                ram: ram,
                disk: disk,
                status: true,
                servers: servers,
                location: loc,
                port: port,
                mode: mode
              })

            }).catch((err) => {
              let servers = '[Servers: N/A]'
              let loc = '[Location: N/A]'
              let port = '[Allocations: N/A]'
              let ram = '[Ram: N/A]'
              let disk = '[Disk: N/A]'

              console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(node.data.attributes.name + ' is down!'))
              if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))

              nodetable.set('node' + id, {
                ram: ram,
                disk: disk,
                status: false,
                servers: servers,
                location: loc,
                port: port,
                mode: false
              })
            })
          }).catch((err) => {
            console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
          })
        }).catch((err) => {
          console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
        })

        let stats = nodetable.get('node' + id)
        let msgStats;
        if (`${stats}` === 'null') msgStats = '**' + nodes.attributes.name + '**: ' + checking + '\n'
        if (`${stats}` !== 'null') {
          let statsname = '**' + nodes.attributes.name + '**: '

          if (stats.status === true) statsname = statsname + statusonline
          if (stats.status === false) statsname = statsname + statusoffline
            
          if (resource === false) msgStats = statsname + '\n'

          if (stats.mode === true) statsname = statsname + ' [Maintance]'

          if (resource === true) statsname = statsname + '\n```\n' + stats.ram + '\n' + stats.disk
          if (serverloc === true) statsname = statsname + '\n' + stats.location
          if (serverport === true) statsname = statsname + '\n' + stats.port
          if (serverres === true) statsname = statsname + '\n' + stats.servers
          if (resource === false) statsname = statsname + '\n'

          if (resource === true) msgStats = statsname + '```\n'
        }

        list.push(msgStats)
      })

      axios(api + '/application/servers', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + adminapikey
        }
      }).then(ser => {
        let res = ser.data.meta.pagination.total
        paneltable.set('serverCount', res)
      }).catch((err) => {
        paneltable.set('serverCount', 'N/A')
        console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Panel is down'))
        if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
      })

      axios(api + '/application/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + adminapikey
        }
      }).then(usr => {
        let res = usr.data.meta.pagination.total
        paneltable.set('userCount', res)
      }).catch((err) => {
        paneltable.set('userCount', 'N/A')
        console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Panel is down!'))
        if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
      })

      let userCount = paneltable.get('userCount')
      let serverCount = paneltable.get('serverCount')

      if (userCount === null) userCount = 'checking'
      if (serverCount === null) serverCount = 'checking'

      if (userCount !== 'N/A') paneltable.set('panel', `[**Panel**](${hosturl}): ` + statusonline)
      if (userCount === 'N/A') {
        paneltable.set('panel', `[**Panel**](${hosturl}): ` + statusoffline)
        console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('panel is down!'))
      }
      if (userCount === checking) paneltable.set('panel', '**Panel**: ' + checking)
      let panel = paneltable.get('panel') + '\n\n**Users**: \`' + userCount + '\`\n**Servers**: \`' + serverCount + '\`'

      if (panel === null) panel = `[**Panel**](${hosturl}): ` + checking + '\n\n**Users**: \`' + userCount + '\`\n**Servers**: \`' + serverCount + '\`'

      let nodes
      list.forEach((d) => {
        if (!nodes) return nodes = d
        nodes = nodes + d
      })

      console.log(chalk.cyan(['[PteroStats Checker] ']) + chalk.green('Connected to ' + list.length + ' nodes'))
      let nodeCount = '[Total ' + list.length + ']'

      if (debug === true) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.blue(nodes))
      if (nodes === undefined) {
        nodes = checking + ' Please wait ' + time + ' seconds'
        console.log(chalk.cyan(['[PteroStats Checker] ']) + chalk.yellow(checking + ' Please wait ' + time + ' seconds'))
      }

      let embedfooter = 'Updated every ' + time + ' seconds'
      if (enablef === true) embedfooter = 'Updated every ' + time + ' seconds | ' + footer

      let embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .addField('Panel Stats', panel)
      .setFooter({text: embedfooter})
      .setThumbnail(client.user.avatarURL())
      
      if (enablets === true) {
        embed.setTimestamp()
      }

      let text = "Nodes Stats";

      if(monitorLink && monitorLink.startsWith("https://")){
        text = `[Nodes Stats](${monitorLink})`
      }

      if (enabledesc === true) {
        embed.setDescription(desc + `\n**${text} ` + nodeCount + '**\n' + nodes)
      } else {
        embed.setDescription(`\n**${text} ` + nodeCount + '**\n' + nodes)
      }
      for(let i=0; i<=channelsIDs.length-1; i++){
        let ch = await client.channels.cache.get(channelsIDs[i])
        if(ch){
          let messages = await ch.messages.fetch({limit: 10})
          messages = await messages.filter(m => m.author.id === client.user.id).last();
          if (messages == null) await ch.send({embeds: [embed]}).catch(error => {console.log(error)})
          else await messages.edit({embeds: [embed]}).catch(error => {console.log(error)})
        }
      }

      console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Posted Stats'))
      if (panel !== null) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Stats Updated'))
      console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Updating Stats in ' + time + ' Seconds'))

    }).catch((err) => {
      console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red(err) + chalk.cyan(' Need Support? https://discord.gg/zv6maQRah3'))
    })
  }, time + '000')
}
