require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require("discord.js")


const client = new Client({
	intents: GatewayIntentBits.Guilds,
});

client.commands = new Collection();
client.commandArray = []


const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
	const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}
client.handleEvents()
client.handleCommands()


client.login(process.env.BOT_TOKEN);