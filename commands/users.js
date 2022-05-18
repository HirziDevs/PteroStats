let { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const pageBuilder = require("../builder/pageBuilder.js");

let idsList = [];
let usernamesList = [];
let emailsList = [];
let i = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('users')
	  .setDescription('Get a list of all the users.'),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);
      
    try {
      let pno = 1;
      let responseData = await APIFetcher(client, "application", "/users", 2)

      responseData.forEach(async response => {
        let attributes = response.attributes;
        let id = attributes.id;
        let username = attributes.username;
        let email = attributes.email;
        idsList[i++] = id;
        usernamesList[id] = username;
        emailsList[id] = email;
      });


      const fbButtons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("previous") 
            .setLabel("Previous")
            .setStyle("PRIMARY"),
          new MessageButton()
           .setCustomId("next")
           .setLabel("Next")
           .setStyle("PRIMARY")
        );

      const collector = await interaction.channel.createMessageComponentCollector();

      async function showUsersList(pageNo){
        const data = await pageBuilder(pageNo, idsList);
  
        let start = data[0] || 0;
        let stop = data[1] || 9;
        let page = data[2] || 1;
        let pages = data[3] || 1;

        let usersList = [];

        for(let i=start; i<=stop; i++){
          if(idsList[i]){
            usersList[i] = `\`\`\`\n${i}.\nID- ${idsList[i]}\nUsername- ${usernamesList[idsList[i]]}\nEmail- ${emailsList[idsList[i]]}\`\`\``
          }
        }

        usersList = usersList.join("\n");
        
        await embed.setAuthor({name: `${idsList.length} Users`})
          .setDescription(usersList)
          .setFooter({text: `Page- ${page}/${pages}`});
    
        let p = false;
        let n = false;
    
        if(page === 1 && pages === 1){
          p = n = true;
        }else if(page === 1){
          p = true;
          n = false;
        }else if(page === pages){
          p = false;
          n = true
        }
    
        fbButtons.components[0].setDisabled(p);
        fbButtons.components[1].setDisabled(n);

        await interaction.editReply({embeds: [embed], components: [fbButtons]}).catch(async error => {
          await errorLogger(client, interaction, error, "src/commands/bot.js : 145");
        });
      }

      collector.on('collect', async button => {
        if (button.customId === 'previous') {
          pno--;
        }else if(button.customId === 'next'){
          pno++;
        }
      
        await button.reply({content: "*"}).then(async () => {
          await button.deleteReply();
        }).catch(error => {
          console.log(error);
        });
    
        await showUsersList(pno);
      });

      pno = 1;

      await showUsersList(pno);
    }catch(error){
      console.log(error);

      embed.setTitle("Error")
        .setDescription(`Unable to find users list.
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