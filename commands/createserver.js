exports.run = (client, message, args) => {
const { MessageEmbed } = require('discord.js')

const node = require('nodeactyl')
const admin = node.NodeactylApplication("https://host.itzy-store.net","IibMNIKmkjn5fp0kEMDiqKSpHeQ4lkmE030OIOatN7Usk8IN")

admin.createServer("latest", "Itzy Test Server", "79", "20", "quay.io/parkervcp/pterodactyl-images:debian_nodejs-14", 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then  /usr/local/bin/npm install --production; fi; /usr/local/bin/node /home/container/{{BOT_JS_FILE}}', "100", "0", "100", "500", "100", "1", "1", "1").then(response => {
message.reply("server created")
console.log(response)
}).catch(e => {
console.log(e)
message.reply("server not created")
})
}
