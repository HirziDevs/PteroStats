module.exports = {
  name : 'power',
  description : 'start/stop/restart/kill',
  
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    if(!message.member.roles.cache.has(adminRoleID)){
      return;
    }
    let hosturl = client.config.panel.url;
    if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
    if(!hosturl.endsWith("/")) hosturl = hosturl + "/";
    let embed = new Discord.MessageEmbed()
      .setColor(0x2f3136)
    if ((!args[0])) {
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
      let powerSignal, subURL;
      let powerText = "**POWER ACTIONS**\nㅤ🟢 START\nㅤ🟡 RESTART\nㅤ🔴 STOP\nㅤ❌ KILL\nㅤ🟩 REINSTALL\nㅤ🔸 SUSPEND\nㅤ🔹 UNSUSPEND\nㅤ🔺 SAFELY DELETE\nㅤ🔻 FORCEFULLY DELETE\nㅤ🗑️ CANCEL";
      let adminAccountAPIKey = client.config.clientkey
      let adminKey = client.config.panel.adminkey
      let responseData = await APIFetcher(client, "client", `/servers/${args[0]}/resources/`, 1)
      let attributes = responseData.attributes
      let isSuspended = attributes.is_suspended
      responseData = await APIFetcher(client, "client", `/servers/${args[0]}/`, 1)
      attributes = responseData.attributes
      let name = attributes.name
      let node = attributes.node
      let id = attributes.internal_id;
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
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **INSTALLING**.`)
          .setColor(0xFFA500)
        await message.reply({embeds: [embed]}).catch(error => {})
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
        await message.reply({embeds: [embed]}).catch(error => {})  
      }
      else{
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.\n
          -------------
          ${powerText}`)
          .setColor(0x95fd91)
        let msg = await message.reply({embeds: [embed]}).catch(error => {})
        await msg.react('🟢').then(
          msg.react('🟡'),
          msg.react('🔴'),
          msg.react('❌'),
          msg.react('🟩'),
          msg.react('🔸'),
          msg.react('🔹'),
          msg.react('🔺'),
          msg.react('🔻'),
          msg.react('🗑️')
        )
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🟢' || reaction.emoji.name == '🟡' || reaction.emoji.name == '🔴' || reaction.emoji.name == '❌' || reaction.emoji.name == '🟩' || reaction.emoji.name == '🔸' || reaction.emoji.name == '🔹' || reaction.emoji.name == '🔺' || reaction.emoji.name == '🔻' || reaction.emoji.name == '🗑️'),
          { max: 1, time: 30000 }).then(async collected => {
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
              powerText = "**POWER ACTION** - ㅤ❌ KILLED";
            }
            else if(collected.first().emoji.name == '🟩'){
              powerSignal= "empty"
              subURL = "reinstall"
              powerText = "**POWER ACTION** - ㅤ🟩 REINSTALLING";
            }
            else if(collected.first().emoji.name == '🔸'){
              powerSignal= "empty"
              subURL = "suspend"
              powerText = "**POWER ACTION** - ㅤ🔸 SUSPENDED";
            }
            else if(collected.first().emoji.name == '🔹'){
              powerSignal= "empty"
              subURL = "unsuspend"
              powerText = "**POWER ACTION** - ㅤ🔹 UNSUSPENDED";
            }
            else if(collected.first().emoji.name == '🔺'){
              powerSignal= "delete"
              subURL = ""
              powerText = "**POWER ACTION** - ㅤ🔺 SAFELY DELETING";
            }
            else if(collected.first().emoji.name == '🔻'){
              powerSignal= "delete"
              subURL = "force"
              powerText = "**POWER ACTION** - ㅤ🔻 FORCEFULLY DELETING";
            }
            else{
              powerSignal= null
              powerText = "**POWER ACTION** - ㅤ🗑️ CANCELED";
            }
            if(powerSignal){
              if(powerSignal == "empty" && subURL){
                await axios({
                  method: 'post',
                  url: `${hosturl}api/application/servers/${id}/${subURL}`,
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + adminKey
                  }
                })
              }
              else if(powerSignal == "delete"){
                await axios({
                  method: 'delete',
                  url: `${hosturl}api/application/servers/${id}/${subURL}`,
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + adminKey
                  }
                })
              }
              else{
                await axios({
                  method: 'post',
                  url: `${hosturl}api/client/servers/${args[0]}/power`,
                  data: {
                    "signal": powerSignal
                  },
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + adminAccountAPIKey
                  }
                })
              }
            }
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
            await msg.edit({embeds: [embed]}).catch(error => {})
        }).catch(async() => {
          powerText = "**POWER ACTION** - ㅤ🗑️ CANCELED";
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
          await msg.edit({embeds: [embed]}).catch(error => {})
        });
      }
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