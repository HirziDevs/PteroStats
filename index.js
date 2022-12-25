const fs = require('fs');
const child = require('child_process');

function InstallPackages() {
	console.log('You didn\'t install the required node packages first!')
	console.log('Please wait... starting to install all required node packages using child process')
	console.log('If the bot can\'t install the package please install it manually')
	try {
		child.execSync('npm i')
		console.log('Install complete!, please run "node index" command again!')
		process.exit()
	} catch (err) {
		console.log('Error! ', err)
		console.log('Support Server: https://discord.gg/zv6maQRah3')
		process.exit()
	}
}

if (Number(process.version.split('.')[0]) < 16) {
	console.log('Invalid NodeJS Version!, Please use NodeJS 16.x or upper')
	process.exit()
}
if (fs.existsSync('./node_modules')) {
	if (fs.existsSync('./node_modules/discord.js')) {
		const check = require('./node_modules/discord.js/package.json')
		if (Number(check.version.split('.')[0]) !== 14) {
			console.log('Invalid Discord.JS Version!, Please use Discord.JS 14.x')
			process.exit()
		}
	} else InstallPackages()
	if (fs.existsSync('./node_modules/axios')) {
		const check = require('./node_modules/axios/package.json')
		if (Number(check.version.split('.')[1]) > 1) {
			console.log('Invalid Axios Version!, Please use Axios 1.1.3')
			process.exit()
		}
	} else InstallPackages()
	if (fs.existsSync('./node_modules/chalk')) {
		const check = require('./node_modules/chalk/package.json')
		if (Number(check.version.split('.')[0]) > 4) {
			console.log('Invalid Chalk Version!, Please use Chalk 4.1.2')
			process.exit()
		}
	} else InstallPackages()
	if (!fs.existsSync('./node_modules/js-yaml')) InstallPackages()
} else InstallPackages()

const chalk = require('chalk');
const yaml = require('js-yaml');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

if (client.config.panel.adminkey || client.config.resource || client.config.message.image) {
	console.log(chalk.cyan('[PteroStats] ') + chalk.red('You are using old config file, please update your config file at ') + chalk.green('https://github.com/HirziDevs/PteroStats/blob/main/config.yml'))
	process.exit()
}
if (client.config.token.startsWith('Put') || !client.config.token.length) {
	console.log(chalk.cyan('[PteroStats] ') + chalk.red('Error! Invalid Discord Bot Token'))
	process.exit()
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(client.config.token);