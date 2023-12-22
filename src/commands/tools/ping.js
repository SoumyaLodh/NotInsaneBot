/**
 * @module ping
 * @description Slash command for measuring and returning ping information.
 */

const { SlashCommandBuilder, Interaction } = require("discord.js");

/**
 * @typedef {import("discord.js").Message} Message
 */

/**
 * @typedef {Object} PingCommandData
 * @property {string} name - The name of the slash command.
 * @property {string} description - The description of the slash command.
 */

/**
 * @typedef {Object} PingCommand
 * @property {PingCommandData} data - The metadata for the slash command.
 * @property {(interaction: Interaction, client: import("discord.js").Client) => Promise<void>} execute - The function to execute when the slash command is invoked.
 */

/**
 * @type {PingCommand}
 */
module.exports = {
    /**
     * @type {PingCommandData}
     */
    data: new SlashCommandBuilder().setName("ping").setDescription("Returns Ping"),

    /**
     * Executes the ping command.
     * @param {Interaction} interaction - The interaction that triggered the command.
     * @param {import("discord.js").Client} client - The Discord client instance.
     * @returns {Promise<void>}
     */
    async execute(interaction, client) {
        /**
         * @type {Message}
         */
        const message = await interaction.deferReply({ fetchReply: true });
        const newMessage = `API Latency: ${client.ws.ping} \n Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({ content: newMessage });
    },
};
