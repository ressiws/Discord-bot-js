const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    execute(interaction, bot) {
        // checking if the interaction type is not a chat input command
        if (!interaction.isChatInputCommand()) return;

        const command = bot.commands.get(interaction.commandName);
        if (!command) return interaction.reply({
            content: "This command is currently disabled",
            ephemeral: true
        });

        if (command.developer && interaction.user.id !== "743904375776346133") 
            return interaction.reply({
                content: "This command is only available to the developer",
                ephemeral: true
            });

        command.exeecute(interaction, bot);
    }
}