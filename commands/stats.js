
let { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
	  .setDescription('Get stats of a server.')
    .addStringOption(option => option.setName("id").setDescription("Server ID.").setRequired(true)),
  
  async execute(client, MessageEmbed, embed, config, embedConfig, database, Permissions, interaction, messageEmojisReplacer, tick, cross, errorLogger, logger){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);

    let IP = await interaction.options.getString("ip");

    if(interaction.options.getSubcommand() === "java"){
      let javaPort = await interaction.options.getInteger("java_port") || 25565;
      let bedrockPort = await interaction.options.getInteger("bedrock_port") || null;

      if(javaPort < 1){
        javaPort = null;
        await database.set("java_port", javaPort);

        embed.setDescription(`${cross} Java Port Cannot be less than 0.`)
          .setDescription(embedConfig.errorColor);

        return;
      }
      
      if(bedrockPort < 1){
        bedrockPort = null;
        await database.set("bedrock_port", bedrockPort);
      }

      try{
        let rawData = await javaFetcher(client, interaction.id, IP, javaPort);
            
        if(rawData){
          if(rawData[0] === "ONLINE"){
            let motd = rawData[1];
            let version = rawData[2];
            let online = rawData[3];
            let max = rawData[4];
  
            let sampleList = rawData[5];
            
            let favicon = rawData[6];
            let roundTripLatency = rawData[7];
  
            let playersList;
  
            let queryPort = await interaction.options.getInteger("query_port");

            if(queryPort < 1){
              queryPort = null;
              await database.set("query_port", queryPort);
            }
  
            if(queryPort){
              let rawData2 = ["OFFLINE"];

              try{
                rawData2 = await queryFetcher(client, IP, queryPort);
  
                if(rawData2[0] === "ONLINE"){
                  playersList = rawData2[1];
                }
              }catch{}
            }

            if(bedrockPort){
              let rawData3 = ["OFFLINE"];
              
              try{
                rawData3 = await bedrockFetcher(client, IP, bedrockPort);
    
                if(rawData3[0] === "ONLINE"){
                  javaPort = `JAVA- ${javaPort}\nBEDROCK- ${bedrockPort}`;
                }
              }catch{}
            }
      
            embed = new MessageEmbed()
              .addFields({
                name: `${grass} SERVER EDITION`,
                value: `\`\`\`fix\nJAVA\n\`\`\``
              },
              {
                name: `${wifi} SERVER IP`,
                value: `\`\`\`fix\n${IP}\n\`\`\``
              },
              {
                name: `${wifi} SERVER PORT`,
                value: `\`\`\`fix\n${javaPort}\n\`\`\``
              },
              {
                name: `${settings} SERVER VERSION`,
                value: `\`\`\`fix\n${version}\n\`\`\``
              },
              {
                name: `${users} PLAYING`,
                value: `\`\`\`fix\n${online}/${max}\n\`\`\``
              },
              {
                name: `${pen} MOTD`,
                value: `\`\`\`fix\n${motd}\n\`\`\``
              },
              {
                name: `${signal} LATENCY`,
                value: `\`\`\`fix\n${roundTripLatency}ms\n\`\`\``
              })
              .setColor(embedConfig.successColor)
              .setThumbnail(favicon);
  
            if(playersList && playersList.length > 0){
              await embed.addField(`${users} PLAYERS`, `\`\`\`fix\n${playersList}\n\`\`\``);
            }else if(sampleList && sampleList.length > 0){
              await embed.addField(`${users} PLAYERS`, `\`\`\`fix\n${sampleList}\n\`\`\``);
            }
          }else if(rawData[0] === "OFFLINE"){
            if(bedrockPort){
              javaPort = `JAVA- ${javaPort}\nBEDROCK/PE- ${bedrockPort}`;
            }

            await embed.setTitle("OFFLINE")
              .addFields({
                name: `${grass} SERVER EDITION`,
                value: `\`\`\`fix\nJAVA\n\`\`\``
              },
              {
                name: `${wifi} SERVER IP`,
                value: `\`\`\`fix\n${IP}\n\`\`\``
              },
              {
                name: `${wifi} SERVER PORT`,
                value: `\`\`\`fix\n${javaPort}\n\`\`\``
              })
              .setColor(embedConfig.errorColor)
              .setThumbnail(defaultLogo);
          }else{
            embed = new MessageEmbed()
              .setDescription(`${cross} Error showing server stats.`)
              .setColor(embedConfig.errorColor)
              .setThumbnail(defaultLogo);
          }
        }else{
          embed = new MessageEmbed()
            .setDescription(`${cross} Unable to fetch the data. Please check if the **\`IP\`** and **\`PORT\`** are correct.\nAlso check if the server is online.`)
            .setColor(embedConfig.errorColor)
            .setThumbnail(defaultLogo);
        }
      }catch (error){
        embed = new MessageEmbed()
          .setDescription(`${cross} **Error Fetching server stats**-\n\`\`\`${error}\`\`\``)
          .setColor(embedConfig.errorColor)
          .setThumbnail(defaultLogo);
      }
    }else if(interaction.options.getSubcommand() === "bedrock"){
      let bedrockPort = await interaction.options.getInteger("bedrock_port") || 19132;

      if(bedrockPort < 1){
        bedrockPort = null;
        await database.set("bedrock_port", bedrockPort);

        embed.setDescription(`${cross} Bedrock Port Cannot be less than 0.`)
          .setDescription(embedConfig.errorColor);

        return;
      }
      
      try{
        let rawData = await bedrockFetcher(client, IP, bedrockPort);
            
        if(rawData){
          if(rawData[0] === "ONLINE"){  
            let edition = rawData[1];
            let motd = rawData[2];
            let version = rawData[3];
            let online = rawData[4];
            let max = rawData[5];
            let portIPv4 = rawData[6];
            let portIPv6 = rawData[7];

            if(portIPv4 !== "NULL"){
              bedrockPort = `DEFAULT- ${bedrockPort}\nIPv4- ${portIPv4}`;

              if(portIPv6 !== "NULL"){
                bedrockPort = bedrockPort + `\nIPv6- ${portIPv6}`
              }
            }else{
              if(portIPv6 !== "NULL"){
                bedrockPort = `DEFAULT- ${bedrockPort}\nIPv6- ${portIPv6}`
              }
            }
      
            embed = new MessageEmbed()
              .addFields({
                name: `${grass} SERVER EDITION`,
                value: `\`\`\`fix\n${edition}\n\`\`\``
              },
              {
                name: `${wifi} SERVER IP`,
                value: `\`\`\`fix\n${IP}\n\`\`\``
              },
              {
                name: `${wifi} SERVER PORT`,
                value: `\`\`\`fix\n${bedrockPort}\n\`\`\``
              },
              {
                name: `${settings} SERVER VERSION`,
                value: `\`\`\`fix\n${version}\n\`\`\``
              },
              {
                name: `${users} PLAYING`,
                value: `\`\`\`fix\n${online}/${max}\n\`\`\``
              },
              {
                name: `${pen} MOTD`,
                value: `\`\`\`fix\n${motd}\n\`\`\``
              })
              .setColor(embedConfig.successColor);
          }else if(rawData[0] === "OFFLINE"){
            await embed.setTitle("OFFLINE")
              .addFields({
                name: `${grass} SERVER EDITION`,
                value: `\`\`\`fix\nBEDROCK\n\`\`\``
              },
              {
                name: `${wifi} SERVER IP`,
                value: `\`\`\`fix\n${IP}\n\`\`\``
              },
              {
                name: `${wifi} SERVER PORT(IPv4)`,
                value: `\`\`\`fix\n${portIPv4}\n\`\`\``
              })
              .setColor(embedConfig.errorColor)
              .setThumbnail(defaultLogo);
          }else{
            embed = new MessageEmbed()
              .setDescription(`${cross} Error showing server stats.`)
              .setColor(embedConfig.errorColor)
              .setThumbnail(defaultLogo);
          }
        }else{
          embed = new MessageEmbed()
            .setDescription(`${cross} Unable to fetch the data. Please check if the **\`IP\`** and **\`PORT\`** are correct.\nAlso check if the server is online.`)
            .setColor(embedConfig.errorColor)
            .setThumbnail(defaultLogo);
        }
      }catch (error){
        embed = new MessageEmbed()
          .setDescription(`${cross} **Error Fetching server stats**-\n\`\`\`${error}\`\`\``)
          .setColor(embedConfig.errorColor)
          .setThumbnail(defaultLogo);
      }
    }else{
      await embed.setDescription(`${cross} Server IP, port not set.`)
        .setColor(embedConfig.errorColor);
      
      await interaction.editReply({embeds: [embed]}).catch(async error => {
        await errorLogger(client, interaction, error, "src/commands/status.js : 287");
      });

      return;
    }
      
    await interaction.editReply({embeds: [embed]}).catch(async error => {
      await errorLogger(client, interaction, error, "src/commands/status.js : 294");
    });
  },
}































module.exports = {
  name : 'stats',
  description : 'get stats of a server',
  
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    let embed = new Discord.MessageEmbed()
      .setColor(0x2f3136)
    
    if (!args[0]) {
      embed.setTitle("Please provide your server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.reply({embeds: [embed]}).catch(error => { })
      return
    }
    
    if (args[0].length != 8) {
      embed.setTitle("Please provide a correct server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.reply({embeds: [embed]}).catch(error => { })
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
      await message.reply({embeds: [embed]}).catch(error => {})
    } catch {
      embed.setTitle("Invalid Server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(0xff4747)
      await message.reply({embeds: [embed]}).catch(error => {})
      return
    }
  }
}