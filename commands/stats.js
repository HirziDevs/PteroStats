module.exports = {
  name : 'stats',
  description : 'check stats of a server',
  
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    let embed = new Discord.MessageEmbed()
      .setColor(0x2f3136)
    if(!message.member.roles.cache.has(adminRoleID)){
      return;
    }
    if ((!args[0])) {
      embed.setTitle("Please provide your server ID.")
        .setDescription(`Don't know what a server ID is?
      Open your server's console and see the code at the last of console url.
      Eg- \`https://connect.aasgard.in/server/4c09a487\`.
      Here, \`4c09a487\` is the server ID.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => { })
      return
    }
    if (args[0].length != 8) {
      embed.setTitle("Please provide a correct server ID.")
        .setDescription(`Don't know what a server ID is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://connect.aasgard.in/server/4c09a487\`.
        Here, \`4c09a487\` is the server ID.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => { })
      return
    }
    try {
      let powerSignal;
      let powerText = "**POWER ACTIONS**\nㅤ🟢 START\nㅤ🟡 RESTART\nㅤ🔴 STOP\nㅤ❌ KILL";
      let adminAccountAPIKey = client.config.adminAccountAPIKey
      let responseData = await APIFetcher(client, "client", `/servers/${args[0]}/resources/`, 1)
      let attributes = responseData.attributes
      let state = attributes.current_state
      let isSuspended = attributes.is_suspended
      let resources = attributes.resources
      let cpuUsage = `${resources.cpu_absolute.toFixed(2)}`
      let ramUsage = resources.memory_bytes/(1024*1024)
      let diskUsage = resources.disk_bytes/(1024*1024)
      let uptime = timeConverter(resources.uptime, "ms")
      responseData = await APIFetcher(client, "client", `/servers/${args[0]}/`, 1)
      attributes = responseData.attributes
      let name = attributes.name
      let node = attributes.node
      let uuid = attributes.uuid
      let description = attributes.description
      if(!description){
        description = " "
      }
      if(description.length>60){
        description.length = 57
        description = description + "..."
      }
      let ramTotal = attributes.limits.memory
      let diskTotal = attributes.limits.disk
      let cpuTotal = `${attributes.limits.cpu.toFixed(2)}`
      let databases = attributes.feature_limits.databases
      let ports = attributes.feature_limits.allocations
      let backups = attributes.feature_limits.backups
      let isInstalling = attributes.is_installing
      let RAM, DISK, CPU
      if(ramTotal <= 0.00){
        RAM = `${bytesConverter(ramUsage, "MB")} Used`
      }else{
        RAM = `${bytesConverter(ramUsage, "MB")}/${bytesConverter(ramTotal, "MB")} [${percentageCalculator(ramUsage, ramTotal)}]`
      }
      if(diskTotal <= 0.00){
        DISK = `${bytesConverter(diskUsage, "MB")} Used`
      }else{
        DISK = `${bytesConverter(diskUsage, "MB")}/${bytesConverter(diskTotal, "MB")} [${percentageCalculator(diskUsage, diskTotal)}]`
      }
      if(cpuTotal <= 0.00){
        CPU = `${cpuUsage}% Used`
      }else{
        CPU = `${cpuUsage}%/${cpuTotal}%`
      }
      if(isInstalling){
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${args[0]}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **INSTALLING**.`)
          .setColor(0xFFA500)
        await message.channel.send(embed).catch(error => {})
      }
      else if(isSuspended){
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${args[0]}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **SUSPENDED**.`)
          .setColor(0xff4747)
        await message.channel.send(embed).catch(error => {})  
      }
      else{
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${args[0]}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **State**- \`${state}\`.
          **Uptime**- \`${uptime}\`.
          **Resources**-
          ㅤ**RAM**- \`${RAM}\`.
          ㅤ**CPU**- \`${CPU}\`.
          ㅤ**Disk**- \`${DISK}\`.
          ㅤ**Databases**- \`${databases}\`.
          ㅤ**Ports**- \`${ports}\`.
          ㅤ**Backups**- \`${backups}\`.\n
          -------------
          ${powerText}`)
          .setColor(0x95fd91)
        let msg = await message.channel.send(embed).catch(error => {})
        await msg.react('🟢').then(
          msg.react('🟡'),
          msg.react('🔴'),
          msg.react('❌')
        )
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🟢' || reaction.emoji.name == '🟡' || reaction.emoji.name == '🔴' || reaction.emoji.name == '❌'),
          { max: 1, time: 30000 }).then(async collected => {
            if(collected.first().emoji.name == '🟢' || collected.first().emoji.name == '🟡' || collected.first().emoji.name == '🔴' || collected.first().emoji.name == '❌'){
              if(collected.first().emoji.name == '🟢'){
                powerSignal= "start"
                powerText = "**POWER ACTION** - ㅤ🟢 STARTING";
              }
              else if(collected.first().emoji.name == '🟡'){
                powerSignal= "restart"
                powerText = "**POWER ACTION** - ㅤ🟡 RESTARTING";
              }
              else if(collected.first().emoji.name == '🔴'){
                powerSignal= "stop"
                powerText = "**POWER ACTION** - ㅤ🔴 STOPPING";
              } 
              else if(collected.first().emoji.name == '❌'){
                powerSignal= "kill"
                powerText = "**POWER ACTION** - ㅤ❌ KILLING";
              }
              await axios({
                method: 'post',
                url: `https://connect.aasgard.in/api/client/servers/${args[0]}/power`,
                data: {
                  "signal": powerSignal
                },
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + adminAccountAPIKey
                }
              })
              await msg.reactions.removeAll()
              embed.setTitle("Server Stats")
              .setDescription(`**ID**- \`${args[0]}\`.
              **UUID**- \`${uuid}\`.
              **Name**- \`${name}\`.
              **Description**- \`${description}\`.
              **Node**- \`${node}\`.\n
              -------------
              ${powerText}`)
              .setColor(0x95fd91)
              await msg.edit(embed).catch(error => {})
            }
        }).catch(async() => {});
      }
    } catch {
      embed.setTitle("Invalid Server ID.")
        .setDescription(`Don't know what a server ID is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://connect.aasgard.in/server/4c09a487\`.
        Here, \`4c09a487\` is the server ID.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => {})
      return
    }
  }
}