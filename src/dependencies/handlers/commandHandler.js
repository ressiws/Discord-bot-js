async function loadCommnds(bot) {
    const { loadFiles } = require("../utilities/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading( "Commands", "Status" );

    await bot.commands.clear();

    let commandsArray = [];

    const Files = await loadFiles("src//core//commands");

    Files.forEach((file) => {
        const command = require(file);
        bot.commands.set(command.data.name, command);
        
        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "🟩");
    });

    bot.application.commands.set(commandsArray);

    console.log(table.toString());
    logger.info("[ LOADER ] Successfully loaded Command(s).");
}

module.exports = { loadCommnds }