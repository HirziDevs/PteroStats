let { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
	  .setDescription('Get info of a user.')
    .addIntegerOption(option => option.setName("id").setDescription("User ID.").setRequired(true)),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross, axios, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);
    
    let input = await interaction.options.getInteger("id") || 0;

    if(input < 1){
      input = 1;
    }

    try {
      let responseData = await APIFetcher(client, "application", `/users/${input}`, 1)
  
      let attributes = responseData.attributes;
      let id = attributes.id;
      let uuid = attributes.uuid;
      let username = attributes.username;
      let email = attributes.email;
      let firstName = attributes.first_name;
      let lastName = attributes.last_name;
      let isAdmin = attributes.root_admin;
      let createdAt = attributes.created_at;
      let lastUpdated = attributes.updated_at;

      embed.setTitle("USER DETAILS")
        .setDescription(`**ID**- \`${id}\`
        **UUID**- \`${uuid}\`
        **Username**- \`${username}\`
        **Email**- \`${email}\`
        **First Name**- \`${firstName}\`
        **Last Name**- \`${lastName}\`
        **Administrator**- \`${isAdmin}\`
        **Account Created**- \`${createdAt}\`
        **Last Updated**- \`${lastUpdated}\``)
        .setColor(embedConfig.successColor);

      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      });
    }catch{
      embed.setTitle("User not present")
        .setDescription(`Use the command \`/users\` to see the list of users.`)
        .setColor(embedConfig.errorColor);

      await interaction.editReply({embeds: [embed]}).catch(error => {
        console.log(error);
      });
    }
  },
}