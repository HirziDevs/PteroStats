module.exports = client => {
  const { MessageEmbed } = require('discord.js')
  const axios = require('axios')
  const db = require('quick.db')
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
  console.log(chalk.green('Version: ') + chalk.cyan('Stable v1.2.0'))
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
        db.set(data.nameid, '**' + data.name + '**' + ': ' + statusonline)
      }).catch((err) => {
        db.set(data.nameid, '**' + data.name + '**' + ': ' + statusoffline)
        console.log(chalk.cyan('[PteroStats Checker] ') + chalk.red(data.name + ' is down!'))
        if (debugerror === true) console.log(chalk.magenta('[PteroStats Debug] ') + err)
      })

      let msgStats = db.get(data.nameid) + '\n'
      if (db.get(data.nameid) === null) msgStats = data.name + ' : ' + checking
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

    let embedfooter = 'Updated every ' + time + ' seconds'
    if (enablef === true) embedfooter = 'Updated every ' + time + ' seconds | ' + footer
    let embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .addField('Nodes Stats' + nodeCount, nodes)
      .addField('Panel Stats', panel)
      .setFooter(embedfooter)
      .setThumbnail(client.user.avatarURL())
    if (enablets === true) {
      embed.setTimestamp()
    }
    if (enabledesc === true) {
      embed.setDescription(desc)
    }

    ch.send(embed).then(msg => { msg.delete({ timeout: time + '000' }) })

    if (nodes.includes(['null', 'undefined]'])) console.log(chalk.magenta('[PteroStats Debug] ') + chalk.red('Nodes list has null/undefined on it'))
    console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Posted Stats'))
    if (panel !== null) console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Stats Updated'))
    console.log(chalk.cyan('[PteroStats Checker] ') + chalk.green('Updating Stats in ' + time + ' Seconds'))
  }, time + '000')
}
