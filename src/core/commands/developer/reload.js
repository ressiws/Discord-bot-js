const { 
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client} = require("discord.js");

const { loadCommands } = require("../../../dependencies/handlers/commandHandler");
const { loadEvents } = require("../../../dependencies/handlers/eventHandler");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your commands/events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName("commands")
    .setDescription("Reload your commands.")),

    execute(interaction, bot) {
        const subCommand = interaction.options.getSubcommand();
        switch (subCommand) {
            case "events" : {
                for(const [key, value] of bot.events)
                bot.removeListener(`${key}`, value, true);
                loadEvents(bot);
                interaction.reply({content: "Reloaded Events", ephemeral: true});
            }
            break;
            case "commands" : {
                loadCommands(bot);
                interaction.reply({content: "Reloaded Commands", ephemeral: true});
            }
            break;
        }
    }
}