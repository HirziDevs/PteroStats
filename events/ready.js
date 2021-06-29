module.exports = (client) => {
  setInterval(() => {
  client.user.setActivity(`ItzyManager`,{ type: "WATCHING" });
  },60000);
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");
  console.log("Name: PteroManager");
  console.log("Version: Beta");
  console.log("=+=+=+=+=+=+=+=+=+=+=+=");
} 
