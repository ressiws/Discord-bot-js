async function loadCommands(bot) {
    const { loadFiles } = require("../utilities/fileLoader");

    logger.info(`\n===========================================\n               LOADING COMMANDS               \n===========================================`)

    await bot.commands.clear();

    let commandsArray = [];

    const Files = await loadFiles("src/core/commands");

    logger.info(`[LOADER] [COMMANDS] Loading Core Commands...`)
    Files.forEach((file) => {
        const command = require(file);
        try {
            logger.info(`   [LOADER] [COMMANDS] Loading ${command.data.name}...`)

            bot.commands.set(command.data.name, command);
            
            logger.info(`   [LOADER] [COMMANDS] Successfully loaded ${command.data.name}.`)

            commandsArray.push(command.data.toJSON());

        } catch (e) {
            throw `[COMMANDS] Error while loading commands: ${e.message}\n${e.stack}.`
        }
    });
    bot.application.commands.set(commandsArray);

    logger.success(`[LOADER] [COMMANDS] Successfully loaded Core Commands.`)
}

module.exports = { loadCommands }