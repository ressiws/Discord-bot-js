const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("test"),
    execute(interaction) {
        interaction.reply({ 
            content: "Pong!",
            ephemeral: true
        });
    } 
}