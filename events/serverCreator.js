//Person should enable auto port assigning in the panel settings for this command to work properly


let users = {};
let msgChannel;
let serverName, userID, eggID, RAM, SWAP, disk, IO, CPU, databasesCount, backupsCount, allocationsCount;

module.exports = (Discord, client, prefix, axios, adminRoleID, botCommandsChannelID, APIFetcher, bytesConverter, percentageCalculator, timeConverter) =>{
  client.on('message', async message => {
    let embed = new Discord.MessageEmbed()
    .setColor(0x95fd91);

    let hosturl = client.config.panel.url;
    if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
    if(!hosturl.endsWith("/")) hosturl = hosturl + "/";

    let adminAPIKey = client.config.panel.adminkey;

    if(message.guild){
      if(message.author.bot){ 
        return;
      }

      let authorID = message.author.id;

      if(message.content.toLowerCase() == `${prefix}create`){
        if(botCommandsChannelID && botCommandsChannelID != "null" && botCommandsChannelID != ""){
          if(message.channel.id != botCommandsChannelID && (!message.member.roles.cache.has(adminRoleID))){
            return
          }
        }
        msgChannel = message.channel;
        if(!(authorID in users)) {
          users[authorID] = {"step" : 1};

          embed.setDescription("Please provide a name for the server")
          .setFooter("Type 'cancel' to cancel server creation.");      
          await message.channel.send(embed).catch(error => {});
          return;
        }
      }
      else{
        if(authorID in users && message.channel == msgChannel){
          let creator = users[authorID];
          if(message.content.toLowerCase() == "cancel"){
            embed.setDescription(`Server creation canceled.`)
            .setColor(0xff4747);
            await message.channel.send(embed).catch(error => {});
            delete users[authorID];
            return;
          }
          else{

            switch(creator.step){
              case 1:
                serverName = message.content;
                if(!serverName){
                  serverName = "A Server";
                }
                embed.setDescription("Please provide ID of the user who will own the server.")
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 2:
                userID =  message.content;
                if((!userID) || isNaN(userID)){
                  userID = 1;
                }
                embed.setDescription("Please provide ID of the egg that the server will use.")
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 3:
                eggID =  message.content;
                if((!eggID) || isNaN(eggID)){
                  eggID = 1;
                }
                embed.setDescription(`Please provide the amount of RAM the server will have. (in MB)
                \`\`\`1GB- 1024\n2GB- 2048\n3GB- 3072\n4GB- 4096\n5GB- 5120\n6GB- 6144\n7GB- 7168\n8GB- 8192\n9GB- 9216\n10GB- 10240\`\`\``)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 4:
                RAM =  message.content;
                if((!RAM) || isNaN(RAM)){
                  RAM = 1024;
                }
                embed.setDescription(`Please provide the amount of SWAP MEMORY the server will have. (in MB)
                \`\`\`1GB- 1024\n2GB- 2048\n3GB- 3072\n4GB- 4096\n5GB- 5120\n6GB- 6144\n7GB- 7168\n8GB- 8192\n9GB- 9216\n10GB- 10240\`\`\``)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 5:
                SWAP =  message.content;
                if((!SWAP) || isNaN(SWAP)){
                  SWAP = 1024;
                }
                embed.setDescription(`Please provide the amount of STORAGE the server will have. (in MB)
                \`\`\`1GB- 1024\n2GB- 2048\n3GB- 3072\n4GB- 4096\n5GB- 5120\n6GB- 6144\n7GB- 7168\n8GB- 8192\n9GB- 9216\n10GB- 10240\`\`\``)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 6:
                disk =  message.content;
                if((!disk) || isNaN(disk)){
                  disk = 1024;
                }
                embed.setDescription(`Please provide the amount of BLOCK IO the server will have.
                (Muse be between 10-1000)`)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 7:
                IO =  message.content;
                if((!IO) || isNaN(IO)){
                  IO = 50;
                }else if(IO < 10){
                  IO = 10;
                }else if(IO > 1000){
                  IO = 1000;
                }
                embed.setDescription(`Please provide the amount of CPU the server will have. (in %)`)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 8:
                CPU =  message.content;
                if((!IO) || isNaN(IO)){
                  CPU = 100;
                }
                embed.setDescription(`Please provide the number of DATABASES the server will have.`)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 9:
                databasesCount =  message.content;
                if((!databasesCount) || isNaN(databasesCount)){
                  databasesCount = 1;
                }
                embed.setDescription(`Please provide the number of BACKUPS the server will have.`)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 10:
                backupsCount =  message.content;
                if((!backupsCount) || isNaN(backupsCount)){
                  backupsCount = 1;
                }
                embed.setDescription(`Please provide the number of PORTS the server can create.`)
                .setFooter("Type 'cancel' to cancel server creation.");
                await message.channel.send(embed).catch(error => {});
                creator.step++;
                break;
              case 11:
                allocationsCount =  message.content;
                if((!allocationsCount) || isNaN(allocationsCount)){
                  allocationsCount = 1;
                }
                creator.step++;
                embed.setDescription("**Please cross-check the above details.**\nReact with ✅ to start server creation or with ❌ to cancel.");
                let reactionMsg = await message.channel.send(embed).catch(error => {});
                await reactionMsg.react('✅').then(
                  reactionMsg.react('❌')
                );
                reactionMsg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                  {max: 1, time: 240000 }).then(async collected => {
                    if (collected.first().emoji.name === '✅') {
                      try{
                        await axios({
                          method: 'post',
                          url: `${hosturl}api/application/servers`,
                          data: {
                            "name": serverName,
                            "user": userID,
                            "egg": eggID,
                            "docker_image": "quay.io/pterodactyl/core:java",
                            "startup": "java -Xms128M -Xmx128M -jar server.jar",
                            "limits": {
                            "memory": RAM,
                            "swap": SWAP,
                            "disk": disk,
                            "io": IO,
                            "cpu": CPU
                          },
                          "feature_limits": {
                            "databases": databasesCount,
                            "backups": backupsCount
                          }
                        },
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer ' + adminAPIKey
                        }
                      }).then(async response => {
                        embed.setDescription("Server creation started.")
                        await message.channel.send(embed).catch(error => {});
                        delete users[authorID];
                      });
                    }catch{
                      embed.setTitle("Serever creation error!")
                      .setDescription("If your inputs are correct and it still doesn't work pls join our discord server and report the issue.")
                      .setColor(0xff4747);
                      await message.channel.send(embed).catch(error => {});
                      delete users[authorID];
                    }
                  }
                });
            }
          }
        }
      }
    }
  });
}
