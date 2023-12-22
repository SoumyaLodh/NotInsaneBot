/**
 * @module main
 * @description Main module for initializing and running the Discord bot.
 */

/**
 * @typedef {import("discord.js").Client} Client
 */

/**
 * @typedef {import("discord.js").Collection<import("discord.js").Command>} CommandCollection
 */

// Import required modules
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// Create a new Discord client instance
/**
 * @type {Client}
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.AutoModerationConfiguration,
  ],
});

// Initialize collections for storing commands
/**
 * @type {CommandCollection}
 */
client.commands = new Collection();

/**
 * @type {import("discord.js").Command[]}
 */
client.commandArray = [];

// Load commands from function files
const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(
    (file) => file.endsWith(".js")
  );
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Handle events and commands
client.handleEvents();
client.handleCommands();

// Log in to Discord using the bot token
client.login(process.env.BOT_TOKEN);
