let { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('power')
	  .setDescription('start/stop/restart/kill.')
    .addStringOption(option => option.setName("id").setDescription("Server ID.").setRequired(true)),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);

    let hosturl = client.config.panel.url;

    if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;

    if(!hosturl.endsWith("/")) hosturl = hosturl + "/";

    let adminAccountAPIKey = client.config.panel.clientkey;
    
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
      let powerSignal, subURL;
      let powerText = "**POWER ACTIONS**\nㅤ🟢 START\nㅤ🟡 RESTART\nㅤ🔴 STOP\nㅤ❌ KILL\nㅤ🟩 REINSTALL\nㅤ🔸 SUSPEND\nㅤ🔹 UNSUSPEND\nㅤ🔺 SAFELY DELETE\nㅤ🔻 FORCEFULLY DELETE\nㅤ🗑️ CANCEL";
      let responseData = await APIFetcher(client, "client", `/servers/${input}/resources/`, 1)
      let attributes = responseData.attributes
      let isSuspended = attributes.is_suspended
      responseData = await APIFetcher(client, "client", `/servers/${input}/`, 1)
      attributes = responseData.attributes
      let name = attributes.name
      let node = attributes.node
      let id = attributes.internal_id;
      let uuid = attributes.uuid
      let description = attributes.description || " "
      let isInstalling = attributes.is_installing

      if(description.length > 100){
        description.length = 97
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
          .setColor(embedConfig.defaultColor)

        await interaction.editReply({embeds: [embed]}).catch(error => {
          console.log(error);
        })
      }else if(isSuspended){
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.
          **SUSPENDED**.`)
          .setColor(embedConfig.errorColor)

        await interaction.editReply({embeds: [embed]}).catch(error => {
          console.log(error);
        })
      }else{
        const buttons1 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("start")
              .setLabel("🟢 START")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("restart")
              .setLabel("🟡 RESTART")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("stop")
              .setLabel("🔴 STOP")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("kill")
              .setLabel("❌ KILL")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("reinstall")
              .setLabel("🟩 RE-INSTALL")
              .setStyle("PRIMARY")
          );


        const buttons2 = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("suspend")
            .setLabel("🔸 SUSPEND")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("unsuspend")
            .setLabel("🔹 UNSUSPEND")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("deletesafely")
            .setLabel("🔺 DELETE SAFELY")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("deleteforcefully")
            .setLabel("🔻 DELETE FORCEFULLY")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("cancel")
            .setLabel("🗑️ CANCEL")
            .setStyle("PRIMARY")
        );

        const collector = await interaction.channel.createMessageComponentCollector();
    
        collector.on('collect', async button => {
          if(button.customId === "start"){
            powerSignal= "start"
            powerText = "**POWER ACTION** - ㅤ🟢 STARTING";
          }else if(button.customId === "restart"){
            powerSignal= "restart"
            powerText = "**POWER ACTION** - ㅤ🟡 RESTARTING";
          }else if(button.customId === "stop"){
            powerSignal= "stop"
            powerText = "**POWER ACTION** - ㅤ🔴 STOPPING";
          }else if(button.customId === "kill"){
            powerSignal= "kill"
            powerText = "**POWER ACTION** - ㅤ❌ KILLED";
          }else if(button.customId === "restart"){
            powerSignal= "empty"
            subURL = "reinstall"
            powerText = "**POWER ACTION** - ㅤ🟩 REINSTALLING";
          }else if(button.customId === "suspend"){
            powerSignal= "empty"
            subURL = "suspend"
            powerText = "**POWER ACTION** - ㅤ🔸 SUSPENDED";
          }else if(button.customId === "unsuspend"){
            powerSignal= "empty"
            subURL = "unsuspend"
            powerText = "**POWER ACTION** - ㅤ🔹 UNSUSPENDED";
          }else if(button.customId === "deletesafely"){
            powerSignal= "delete"
            subURL = ""
            powerText = "**POWER ACTION** - ㅤ🔺 SAFELY DELETING";
          }else if(button.customId === "deleteforcefully"){
            powerSignal= "delete"
            subURL = "force"
            powerText = "**POWER ACTION** - ㅤ🔻 FORCEFULLY DELETING";
          }else{
            powerSignal= null
            powerText = "**POWER ACTION** - ㅤ🗑️ CANCELED";
          }

          await buttons1.components[0].setDisabled(true);
          await buttons1.components[1].setDisabled(true);
          await buttons1.components[2].setDisabled(true);
          await buttons1.components[3].setDisabled(true);
          await buttons1.components[4].setDisabled(true);
          await buttons2.components[0].setDisabled(true);
          await buttons2.components[1].setDisabled(true);
          await buttons2.components[2].setDisabled(true);
          await buttons2.components[3].setDisabled(true);
          await buttons2.components[4].setDisabled(true);
          
          if(powerSignal){
            if(powerSignal === "empty" && subURL){
              await axios({
                method: 'post',
                url: `${hosturl}api/application/servers/${id}/${subURL}`,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + adminKey
                }
              })
            }else if(powerSignal === "delete"){
              await axios({
                method: 'delete',
                url: `${hosturl}api/application/servers/${id}/${subURL}`,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + adminKey
                }
              })
            }else{
              await axios({
                method: 'post',
                url: `${hosturl}api/client/servers/${input}/power`,
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

          await button.reply({content: "*"}).then(async () => {
            await button.deleteReply();
          }).catch(error => {
            console.log(error);
          });

          embed.setTitle("Server Stats")
            .setDescription(`**ID**- \`${input}\`.
            **UUID**- \`${uuid}\`.
            **Name**- \`${name}\`.
            **Description**- \`${description}\`.
            **Node**- \`${node}\`.\n
            -------------
            ${powerText}`)
            .setColor(embedConfig.successColor);

          await interaction.editReply({embeds: [embed], components: [buttons1, buttons2]}).catch(error => {
            console.log(error);
          })
        });

        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${id}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.\n
          -------------
          ${powerText}`)
          .setColor(embedConfig.successColor)
        
        await interaction.editReply({embeds: [embed], components: [buttons1, buttons2]}).catch(error => {
          console.log(error);
        })
      }
    }catch(error){
      console.log(error);
      embed.setTitle("Invalid Server identifier.")
        .setDescription(`Don't know what a server identifier is?
        Open your server's console and see the code at the last of console url.
        Eg- \`https://your.host.url/server/4c09a487\`.
        Here, \`4c09a487\` is the server identifier.`)
        .setColor(embedConfig.errorColor)
      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      })
      return
    }
  },
}