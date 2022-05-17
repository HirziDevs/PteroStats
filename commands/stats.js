
let { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
	  .setDescription('Get stats of a server.')
    .addStringOption(option => option.setName("id").setDescription("Server ID.").setRequired(true)),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);
    
    let input = await interaction.options.getString("id") || "";
      
    if (input.length != 8) {
      embed.setTitle("Please provide a correct server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(embedConfig.errorColor)
      
      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      });

      return;
    }
      
    try {
      let responseData = await APIFetcher(client, "client", `/servers/${input}/resources/`, 1)
      console.log(responseData);
      let attributes = responseData.attributes
      let state = attributes.current_state
      let isSuspended = attributes.is_suspended
      let resources = attributes.resources
      let cpuUsage = `${resources.cpu_absolute.toFixed(2)}`
      let ramUsage = resources.memory_bytes/(1024*1024)
      let diskUsage = resources.disk_bytes/(1024*1024)
      let uptime = timeConverter(resources.uptime, "ms")
      responseData = await APIFetcher(client, "client", `/servers/${input}/`, 1)
      console.log(responseData);
      attributes = responseData.attributes
      let name = attributes.name
      let node = attributes.node
      let id = attributes.internal_id;
      let uuid = attributes.uuid
      let description = attributes.description || ""
      
      if(description.length > 100){
        description.length = 97
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
          .setColor(embedConfig.defaultColor)
      }else if(isSuspended){
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **SUSPENDED**.`)
          .setColor(embedConfig.errorColor)
      }else{
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
          .setColor(embedConfig.successColor)
      }
      
      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      });
    }catch{
      embed.setTitle("Invalid Server Identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(embedConfig.errorColor)
    
      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      });
      
      return
    }
  },
}