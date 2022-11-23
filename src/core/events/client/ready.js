const { loadCommands } = require("../../../dependencies/handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(bot) {
        loadCommands(bot);
    }
} 