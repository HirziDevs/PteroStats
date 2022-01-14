module.exports = {
  name : 'users',
  description : 'Info of all created users',
      
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    let embed = new Discord.MessageEmbed()
    .setColor(0x95fd91)
    let list = "**ID** -> **USERNAME**\n";
    try {
      let responseData = await APIFetcher(client, "application", "/users", 2)

      responseData.forEach(async response => {
        let attributes = response.attributes;
        let id = attributes.id;
        let username = attributes.username;
        list = list + `\`${id}\` -> \`${username}\`\n`
      })

      embed.setTitle("USER DETAILS")
      .setDescription(list)
      await message.channel.send(embed).catch(error => {})
    } catch {
      embed.setTitle("Error creating a server.")
        .setDescription(`Please report it to the bot dev`)
        .setColor(0xff4747)
      await message.channel.send(embed).catch(error => {})
      return
    }
  }
}