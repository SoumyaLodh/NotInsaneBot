const { Events } = require('discord.js');


module.exports = {
	/**
	 * The name of the event.
	 * @type {import("discord.js").Events}
	 */
	name: Events.ClientReady,

	/**
	 * @type { boolean }
	 */
	once: true,

	/**
	 * Function to execute when the 'ClientReady' event is triggered.
	 * @param {import("discord.js").Client} client - The Discord client instance.
	 * @returns {Promise<void>}
	 */
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};