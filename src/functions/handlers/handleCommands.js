require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

/**@param {import("discord.js").Client} */
module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)

                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} - loaded.`)
            }
        }
        const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN)
        const ClientId = '831137731346169916'

                try {
                    console.log(`Started refreshing ${client.commands.length} application (/) commands.`);

                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data = await rest.put(
                        Routes.applicationCommands(ClientId),
                        {
                            body: client.commandArray,
                        },
                    );

                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                } catch (error) {
                    // And of course, make sure you catch and log any errors!
                    console.error(error);
                }
    }
}