/**
 * @module interactionCreate
 * @description Event handler for the InteractionCreate event, used to manage slash commands.
 */

const { Events } = require("discord.js");

/**
 * @typedef {import("discord.js").Client} Client
 */

/**
 * @typedef {import("discord.js").Interaction} Interaction
 */

/**
 * @typedef {import("discord.js").Collection<import("discord.js").Command>} CommandCollection
 */

module.exports = {
    /**
     * The name of the event.
     * @type {import("discord.js").Events}
     */
    name: Events.InteractionCreate,

    /**
     * Handles slash command interactions.
     * @param {Client} client - The Discord client instance.
     * @param {Interaction} interaction - The interaction that triggered the event.
     * @returns {Promise<void>}
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            /**
             * @type {CommandCollection}
             */
            const { commands } = client;

            const { commandName } = interaction;
            const command = commands.get(commandName); // Retrieve command by name

            if (!command) return; // Exit if command not found

            try {
                await command.execute(interaction, client); // Execute the command
            } catch (error) {
                console.error(error); // Log error for debugging
                await interaction.reply({
                    content: "Something went wrong while executing this command.",
                    ephemeral: true, // Send ephemeral response to user
                });
            }
        }
    },
};
