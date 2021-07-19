module.exports = client => {
  const { MessageEmbed } = require('discord.js')
  const axios = require('axios')
  const db = require('quick.db')
  const nodetable = new db.table('nodetable')
  const chalk = require('chalk')
  const config = client.config
  const nodelist = client.nodelist

  let enablecs = config.botstatus.enable
  let cs = config.botstatus.text
  let stype = config.botstatus.type
  let ch = client.channels.cache.find(cn => cn.id === config.channel)
  let time = config.refreshtime

  let hosturl = config.panel.url
  let apikey = config.panel.clientkey
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
  console.log(chalk.green('Version: ') + chalk.cyan('Stable v1.4.0'))
  console.log(chalk.green('Refresh Time: ') + chalk.cyan(time + ' Seconds'))
  console.log(chalk.green('Bot Status: ') + chalk.cyan('Online'))
  console.log(chalk.green('Support: ') + chalk.cyan('https://discord.gg/9Z7zpdwATZ'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

  setInterval(() => {
    if (isNaN(time)) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(time + ' is not a number!'))
    if (!hosturl.includes('.')) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(hosturl + ' is invalid url!'))
    if (apikey.length < 48) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Invalid Client Apikey!!'))
    if (adminapikey.length < 48) return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Invalid Admin Apikey!!'))

    let list = []
    nodelist.forEach(data => {
      if (data.id === 'Server ID') return console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('You need to use a valid server'))
      axios(api + '/client/servers/' + data.id + '/resources', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apikey
        }
      }).then((response) => {
        axios(api + '/application/nodes/' + data.nodeid + '?include=servers,location,allocations', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + adminapikey
          }
        }).then(response => {

          let ram = 'temp'
          let disk = 'temp'

          const mode = response.data.attributes.maintenance_mode
          const loc = '[Locations: ' + response.data.attributes.relationships.location.attributes.short + ']'
          const port = '[Allocations: ' + response.data.attributes.relationships.allocations.data.length + ']'
          const servers = '[Servers: ' + response.data.attributes.relationships.servers.data.length + ']'
          const rampercent = '[Ram: ' + Math.floor(response.data.attributes.allocated_resources.memory / response.data.attributes.memory * 100) + '%/100%]'
          const diskpercent = '[Disk: ' + Math.floor(response.data.attributes.allocated_resources.disk / response.data.attributes.disk * 100) + '%/100%]'
          const rammega = '[Ram: ' + response.data.attributes.allocated_resources.memory + 'MB/' + response.data.attributes.memory + 'MB]'
          const diskmega = '[Disk: ' + response.data.attributes.allocated_resources.disk + 'MB/' + response.data.attributes.disk + 'MB]'
          const ramgiga = '[Ram: ' + Math.floor(response.data.attributes.allocated_resources.memory / 1000) + 'GB/' + Math.floor(response.data.attributes.memory / 1000) + 'GB]'
          const diskgiga = '[Disk: ' + Math.floor(response.data.attributes.allocated_resources.disk / 1000) + 'GB/' + Math.floor(response.data.attributes.disk / 1000) + 'GB]'
          if (unit === 'mb') {
            disk = diskmega
            ram = rammega
          }
          if (unit === 'gb') {
            disk = diskgiga
            ram = ramgiga
          }
          if (unit === 'percent') {
            disk = diskpercent
            ram = rampercent
          }

          let status = '**' + data.name + '**: ' + statusonline

          nodetable.set(data.nameid, {
            ram: ram,
            disk: disk,
            status: status,
            servers: servers,
            location: loc,
            port: port,
            mode: mode
          })
        }).catch(err => {
          let status = '**' + data.name + '**: ' + statusonline
          let servers = '[Servers: N/A]'
          let loc = '[Location: N/A]'
          let port = '[Allocations: N/A]'
          let ram = '[Ram: N/A]'
          let disk = '[Disk: N/A]'

          console.log(chalk.cyan('[PteroStats Checker] [Node  Resource] ') + chalk.red(data.name + ' node resource is down, make sure you put right id or vaild node id!'))
          if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] [Node  Resource] ') + chalk.red(err))

          nodetable.set(data.nameid, {
            ram: ram,
            disk: disk,
            status: status,
            servers: servers,
            location: loc,
            port: port,
            mode: false
          })
        })

      }).catch((err) => {
        console.log(chalk.cyan('[PteroStats Checker] [Node Status]') + chalk.red(data.name + ' is down!'))
        if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] [Node Status] ') + err)
        axios(api + '/application/nodes/' + data.nodeid + '?include=servers,location,allocations', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + adminapikey
          }
        }).then(response => {

          let ram = 'temp'
          let disk = 'temp'

          const mode = response.data.attributes.maintenance_mode
          const loc = '[Locations: ' + response.data.attributes.relationships.location.attributes.short + ']'
          const port = '[Allocations: ' + response.data.attributes.relationships.allocations.data.length + ']'
          const servers = '[Servers: ' + response.data.attributes.relationships.servers.data.length + ']'
          const rampercent = '[Ram: ' + Math.floor(response.data.attributes.allocated_resources.memory / response.data.attributes.memory * 100) + '%/100%]'
          const diskpercent = '[Disk: ' + Math.floor(response.data.attributes.allocated_resources.disk / response.data.attributes.disk * 100) + '%/100%]'
          const rammega = '[Ram: ' + response.data.attributes.allocated_resources.memory + 'MB/' + response.data.attributes.memory + 'MB]'
          const diskmega = '[Disk: ' + response.data.attributes.allocated_resources.disk + 'MB/' + response.data.attributes.disk + 'MB]'
          const ramgiga = '[Ram: ' + Math.floor(response.data.attributes.allocated_resources.memory / 1000) + 'GB/' + Math.floor(response.data.attributes.memory / 1000) + 'GB]'
          const diskgiga = '[Disk: ' + Math.floor(response.data.attributes.allocated_resources.disk / 1000) + 'GB/' + Math.floor(response.data.attributes.disk / 1000) + 'GB]'
          if (unit === 'mb') {
            disk = diskmega
            ram = rammega
          }
          if (unit === 'gb') {
            disk = diskgiga
            ram = ramgiga
          }
          if (unit === 'percent') {
            disk = diskpercent
            ram = rampercent
          }

          let status = '**' + data.name + '**: ' + statusoffline

          nodetable.set(data.nameid, {
            ram: ram,
            disk: disk,
            status: status,
            servers: servers,
            location: loc,
            port: port,
            mode: mode
          })

        }).catch(err => {
          let status = '**' + data.name + '**: ' + statusoffline
          let servers = '[Servers: N/A]'
          let port = '[Allocations: N/A]'
          let loc = '[Location: N/A]'
          let ram = '[Ram: N/A]'
          let disk = '[Disk: N/A]'

          console.log(chalk.cyan('[PteroStats Checker] [Node Resource] ') + chalk.red(data.name + ' node resource is down, make sure you put right id or vaild node id!'))
          if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] [Node  Resource] ') + chalk.red(err))

          nodetable.set(data.nameid, {
            ram: ram,
            disk: disk,
            status: status,
            servers: servers,
            location: loc,
            port: port,
            mode: false
          })
        })
      })

      let stats = nodetable.get(data.nameid)
      let msgStats = ''
      if (!stats) msgStats = '**' + data.name + '**: ' + checking
      if (stats) {
        let statsname = stats.status

        if (stats.mode === true) statsname = stats.status + " [Maintance]"

        if (resource === true) statsname = statsname + '\n```\n' + stats.ram + '\n' + stats.disk
        if (serverloc === true) statsname = statsname + '\n' + stats.location
        if (serverport === true) statsname = statsname + '\n' + stats.port
        if (serverres === true) statsname = statsname + '\n' + stats.servers
        if (resource === false) statsname = statsname + '\n'

        if (resource === true) msgStats = statsname + '```\n'
      }

      if (debug === true) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.blue(msgStats))
      list.push(msgStats)
    })

    axios(api + '/application/servers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + adminapikey
      }
    }).then(response => {
      let res = response.data.meta.pagination.total
      db.set('serverCount', res)
    }).catch(err => {
      db.set('serverCount', 'N/A')
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
    }).then(response => {
      let res = response.data.meta.pagination.total
      db.set('userCount', res)
    }).catch(err => {
      db.set('userCount', 'N/A')
      console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('Panel is down!'))
      if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
    })

    let userCount = db.get('userCount')
    let serverCount = db.get('serverCount')

    if (userCount === null) userCount = checking
    if (serverCount === null) serverCount = checking

    if (userCount !== 'N/A') db.set('panel', '**Panel**: ' + statusonline)
    if (userCount === 'N/A') {
      db.set('panel', '**Panel**: ' + statusoffline)
      console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red('panel is down!'))
    }
    if (userCount === checking) db.set('panel', '**Panel**: ' + checking)
    let panel = db.get('panel') + '\n\nUsers: ' + userCount + '\nServers: ' + serverCount

    if (panel === null) panel = '**Panel**: ' + checking + '\n\nUsers: ' + userCount + '\nServers: ' + serverCount

    let nodes
    list.forEach((d) => {
      if (!nodes) return nodes = d
      nodes = nodes + d
    })
    let nodeCount = '[Total ' + list.length + ']'

    if (nodes === undefined) nodes = checking + 'Please wait ' + time + 'seconds'

    let embedfooter = 'Updated every ' + time + ' seconds'
    if (enablef === true) embedfooter = 'Updated every ' + time + ' seconds | ' + footer
    let embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .addField('Panel Stats', panel)
      .setFooter(embedfooter)
      .setThumbnail(client.user.avatarURL())
    if (enablets === true) {
      embed.setTimestamp()
    }
    if (enabledesc === true) {
      embed.setDescription(desc + '\n**Nodes Stats' + nodeCount + '**\n' + nodes)
    } else {
      embed.setDescription('\n**Nodes Stats' + nodeCount + '**\n' + nodes)
    }

    ch.send(embed).then(msg => { msg.delete({ timeout: time + '000' }) })

    console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Posted Stats'))
    if (panel !== null) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Stats Updated'))
    console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Updating Stats in ' + time + ' Seconds'))
  }, time + '000')
}
