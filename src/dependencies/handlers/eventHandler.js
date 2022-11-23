async function loadEvents(bot) {
    const { loadFiles } = require("../utilities/fileLoader");

    logger.info(`\n===========================================\n               LOADING EVENTS               \n===========================================`)

    let stats = {
        success: 0,
        fail: 0
    }

    await bot.events.clear();
    
    const Files = await loadFiles("src/core/events");
    
    logger.info(`[LOADER] [EVENTS] Loading Events...`)
    Files.forEach((file) => {
        const event = require(file);
        try {
            logger.info(`   [LOADER] [EVENTS] Loading ${event.name}...`)

            const execute = (...args) => event.execute(...args, bot);
            bot.events.set(event.name, execute);

            logger.success(`   [LOADER] [EVENTS] ${event.name} successfully loaded.`)

            if (event.rest) {
                if (event.once) bot.rest.once(event.name, execute);
                else bot.rest.on(event.name, execute);
            } else {
                if (event.once) bot.once(event.name, execute);
                else bot.on(event.name, execute);
            }				            
            stats.success++
        } catch (e) {
            logger.error(`[LOADER] [EVENTS] Error while loading ${event.name}:`, e)
            stats.fail++
        }
    })
    logger.success(`[LOADER] [EVENTS] Successfully loaded Events.\nEVENTS LOADED: ${stats.success}/${stats.success + stats.fail}\nEVENTS FAILED: ${stats.fail}/${stats.success + stats.fail}`)
}

module.exports = { loadEvents };