async function loadEvents(bot) {
    const { loadFiles } = require("../utilities/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading( "Events", "Status" );

    await bot.events.clear();
    
    const Files = await loadFiles("src//core//events");
    
    Files.forEach((file) => {
        const event = require(file);
    
        const execute = (...args) => event.execute(...args, bot);
        bot.events.set(event.name, execute);

        if (event.rest) {
            if (event.once) bot.rest.once(event.name, execute);
            else bot.rest.on(event.name, execute);
        } else {
            if (event.once) bot.once(event.name, execute);
            else bot.on(event.name, execute);
        }

        table.addRow(event.name, "🟩");
    })

    console.log(table.toString());
    logger.info("[ LOADER ] Successfully loaded Event(s).");
}

module.exports = { loadEvents };