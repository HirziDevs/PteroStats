const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
	  .setDescription('Show help message.'),
  
  async execute(client, embed, MessageEmbed, config, embedConfig, Permissions, interaction, tick, cross){
    embed = new MessageEmbed()
      .setColor(embedConfig.defaultColor);

    await embed.setDescription(`
    **~~------------------------------------------~~**
    > **${client.user.username} Help**
    **~~------------------------------------------~~**
    > __/power \`<serverID>\`__ **-** *Power Control options for a server*.
    > __/run \`<serverID>\` \`<command>\`__ **-** *Run a command in a server's console*.
    > __/stats \`<serverID>\`__ **-** *View a server's stats*.
    > __/userinfo \`<ID>\`__ **-** *View a user's info*.
    > __/users__ **-** *Get a list of all users*.`);

    await interaction.editReply({embeds: [embed]}).catch(async error => {
      console.log(error);
    });
  },
}