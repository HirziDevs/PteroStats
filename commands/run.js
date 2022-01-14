module.exports = {
    name : 'run',
    description : 'run a command on a server',
    
    async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
      if(!message.member.roles.cache.has(adminRoleID)){
        return;
      }
      let embed = new Discord.MessageEmbed()
        .setColor(0x2f3136)
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
        let adminAccountAPIKey = client.config.adminAccountAPIKey
        let responseData = await APIFetcher(client, "client", `/servers/${args[0]}/resources/`, 1)
        let attributes = responseData.attributes
        let isSuspended = attributes.is_suspended
        responseData = await APIFetcher(client, "client", `/servers/${args[0]}/`, 1)
        attributes = responseData.attributes
        let name = attributes.name
        let node = attributes.node
        let uuid = attributes.uuid
        let description = attributes.description
        let isInstalling = attributes.is_installing
        if(!description){
          description = " "
        }
        if(description.length>60){
          description.length = 57
          description = description + "..."
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
            **Node**- \`${node}\`.`)
            .setColor(0x95fd91)
          let msg = await message.channel.send(embed).catch(error => {})
          let command = args.slice(1).join(" ");
          await axios({
            method: 'post',
            url: `https://connect.aasgard.in/api/client/servers/${args[0]}/command`,
            data: {
              "command": command
            },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + adminAccountAPIKey
            }
          }).then(async sucess => {
            embed.setTitle("Server Stats")
              .setDescription(`**ID**- \`${args[0]}\`.
              **UUID**- \`${uuid}\`.
              **Name**- \`${name}\`.
              **Description**- \`${description}\`.
              **Node**- \`${node}\`.\n
              -------------
              Command Sent-
              \`\`\`
              ${command}
              \`\`\``)
              .setColor(0x95fd91)
              await msg.edit(embed).catch(error => {})
          })
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