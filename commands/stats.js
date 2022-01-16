module.exports = {
  name : 'stats',
  description : 'get stats of a server',
  
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    let embed = new Discord.MessageEmbed()
      .setColor(0x2f3136)
    if ((!args[0])) {
      embed.setTitle("Please provide your server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => { })
      return
    }
    if (args[0].length != 8) {
      embed.setTitle("Please provide a correct server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => { })
      return
    }
    try {
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
      let id = attributes.internal_id;
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
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **INSTALLING**.`)
          .setColor(0xFFA500)
      }
      else if(isSuspended){
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **SUSPENDED**.`)
          .setColor(0xff4747)
      }
      else{
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
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
          ㅤ**Backups**- \`${backups}\`.`)
          .setColor(0x95fd91)
      }
      await message.channel.send(embed).catch(error => {})
    } catch {
      embed.setTitle("Invalid Server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => {})
      return
    }
  }
}