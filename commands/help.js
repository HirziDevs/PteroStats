module.exports = {
    name : 'help',
    description : 'commands help',
    
    async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
      let embed = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setColor(0x95fd91)
      let helpText = `**Members**
      > ${prefix}stats \`<serverID>\``
      
      if(message.member.roles.cache.has(adminRoleID)){
        helpText = helpText +`\n**Admins**
        > ${prefix}power \`<serverID>\`
        > ${prefix}run \`<serverID>\` \`<command>\``
      }

      embed.setDescription(helpText);

      await message.channel.send(embed).catch(error => {});
    }
  }