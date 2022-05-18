let { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('run')
	  .setDescription('Run a command in a server\'s console.')
    .addStringOption(option => option.setName("id").setDescription("Server ID.").setRequired(true))
    .addStringOption(option => option.setName("command").setDescription("Command.").setRequired(true)),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);
    
    let input = await interaction.options.getString("id") || "";
    let command = await interaction.options.getString("command") || "";
      
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
      
    try{
      let hosturl = client.config.panel.url;
  
      if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
  
      if(!hosturl.endsWith("/")) hosturl = hosturl + "/";

      let adminAccountAPIKey = client.config.panel.clientkey
      let responseData = await APIFetcher(client, "client", `/servers/${input}/resources/`, 1)
      let attributes = responseData.attributes
      let isSuspended = attributes.is_suspended
      responseData = await APIFetcher(client, "client", `/servers/${input}/`, 1)
      attributes = responseData.attributes
      let name = attributes.name
      let node = attributes.node
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
        embed.setTitle("Server Stats")
          .setDescription(`**ID**- \`${input}\`.
          **UUID**- \`${uuid}\`.
          **Name**- \`${name}\`.
          **Description**- \`${description}\`.
          **Node**- \`${node}\`.`)
          .setColor(0x95fd91)
        
        await interaction.editReply({embeds: [embed]}).catch(error => {
          console.log(error);
        });
        
        await axios({
          method: 'post',
          url: `${hosturl}api/client/servers/${input}/command`,
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
            .setDescription(`**ID**- \`${input}\`.
            **UUID**- \`${uuid}\`.
            **Name**- \`${name}\`.
            **Description**- \`${description}\`.
            **Node**- \`${node}\`.\n
            -------------
            Command Sent-
            \`\`\`${command}\`\`\``)
            .setColor(0x95fd91);

          await interaction.editReply({embeds: [embed]}).catch(error => {
            console.log(error);
          });
        })
      }
    }catch(error){
      console.log(error);

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