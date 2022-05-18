let { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
	  .setDescription('Get info of a user.')
    .addStringOption(option => option.setName("id").setDescription("Server ID.").setRequired(true)),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    
  },
}














/*
module.exports = {
  name : 'user',
  description : 'Info of a user',
        
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    if(!message.member.roles.cache.has(adminRoleID)){
      return;
    }
    let embed = new Discord.MessageEmbed()
    .setColor(0x95fd91)
    if((!args[0]) || isNaN(args[0])){
      embed.setDescription("Please provide a user ID")
      .setColor(0xff4747)
      await message.reply({embeds: [embed]}).catch(error => {})
      return
    }
    try {
      let responseData = await APIFetcher(client, "application", `/users/${args[0]}`, 1)
      console.log(responseData)
  
      let attributes = responseData.attributes;
      let id = attributes.id;
      let uuid = attributes.uuid;
      let username = attributes.username;
      let email = attributes.email;
      let firstName = attributes.first_name;
      let lastName = attributes.last_name;
      let isAdmin = attributes.root_admin;
      let created = attributes.created_at;
      let lastUpdated = attributes.updated_at;

      embed.setAuthor(message.author.username, message.author.avatarURL())
      .setTitle("USER DETAILS")
      .setDescription(`**ID**- \`${id}\`
      **UUID**- \`${uuid}\`
      **Username**- \`${username}\`
      **Email**- \`${email}\`
      **First Name**- \`${firstName}\`
      **Last Name**- \`${lastName}\`
      **Administrator**- \`${isAdmin}\`
      **Account Created**- \`${created}\`
      **Last Updated**- \`${lastUpdated}\``)
      await message.reply({embeds: [embed]}).catch(error => {})
    } catch {
      embed.setTitle("Wrong user ID provided")
      .setDescription(`Use the command \`${prefix}users\` to see the list of users`)
      .setColor(0xff4747)
      await message.reply({embeds: [embed]}).catch(error => {})
      return
    }
  }
}
*/