const commandUsed = new Set();

const APIFetcher = require("../fetcher/APIFetcher.js");
const bytesConverter = require("../calculator/bytesConverter.js");
const percentageCalculator = require("../calculator/percentageCalculator.js");
const timeConverter = require();

module.exports = {
  name: 'interactionCreate',
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction) {
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);
      
    if(interaction.user.bot){
      return;
    }
      
    if (!interaction.isCommand()) return;

    let commandName = await interaction.commandName;
  
    const command = await client.commands.get(commandName);
  
    if (!command) return;
  
    await interaction.deferReply({ephemeral: true});
  
    const tick = "✅";
    const cross = "❌";

    let adminRole = await interaction.member.roles.cache.find(role => role.id === config.adminRoleID);

    if(!adminRole){
      console.log("Admin role not set.");

      return;
    }
  
    try {
      if(interaction && (!interaction.member.roles.cache.find(role => role.id == config.adminRoleID))){
        embed.setDescription(`${cross} Missing Permission Role.`)
          .setColor(embedConfig.errorColor);
    
        await interaction.editReply({embeds: [embed]}).catch(async error => {
          console.log(error);
        });
    
        return;
      }
  
      if (commandUsed.has(interaction.user.id)) {
        embed.setDescription(`${cross} Please wait for 3 seconds before using the command.`)
        .setColor(embedConfig.errorColor);

        await interaction.editReply({embeds: [embed]}).catch(async error => {
          console.log(error);
        });

        return;
      }else{
        await command.execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross);

        commandUsed.add(interaction.user.id);
        
        setTimeout(() => {
          commandUsed.delete(interaction.user.id);
        }, 3 * 1000);
      }
    }catch(error){
      console.log(error);
  
      embed.setDescription(`${cross} Error while executing this command.`)
        .setColor(embedConfig.errorColor);
  
      await interaction.editReply({ embeds: [embed]}).catch(async error => {
        console.log(error);
      });
    }
  },
};