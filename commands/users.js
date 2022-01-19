module.exports = {
  name : 'users',
  description : 'Info of all created users',
      
  async run(Discord, client, prefix, message, args, axios, adminRoleID, APIFetcher, bytesConverter, percentageCalculator, timeConverter){
    if(!message.member.roles.cache.has(adminRoleID)){
      return;
    }
    let embed = new Discord.MessageEmbed()
    .setColor(0x95fd91)
    let list = "";
    let ids = [];
    let usernames = [];
    let emails = [];
    let i = 0;
    try {
      let responseData = await APIFetcher(client, "application", "/users", 2)

      responseData.forEach(async response => {
        let attributes = response.attributes;
        let id = attributes.id;
        let username = attributes.username;
        let email = attributes.email;
        ids[i++] = id;
        usernames[id] = username;
        emails[id] = email;
      })
      
      let page = 1;
      let start = 0;
      let stop = 9;
      if(args[0] && (!isNaN(args[0]))){
        page = args[0] * 1;
        if(page < 1){
          page = 1;
        }
        else if(page > 1){
          if(((((page-1)*10)+1) > ids.length)){
            page = 1;
          }else{
            start += (page-1)*10;
            stop += (page-1)*10;
          }
        }
      }
      if(stop > ids.length-1){
        stop = ids.length-1;
      }

      for(i=start; i<=stop; i++){
        if(ids[i]){
          list = list + `\`\`\`ID- ${ids[i]}\nUsername- ${usernames[ids[i]]}\nEmail- ${emails[ids[i]]}\`\`\`\n`;
        }
      }

      embed.setTitle("USER DETAILS")
      .setDescription(list)
      .setFooter(`Page- ${page}/${Math.floor(ids.length/10)+1}`);
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