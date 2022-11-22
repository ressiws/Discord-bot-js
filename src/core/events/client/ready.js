const { loadCommnds } = require("../../../dependencies/handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(bot) {
        loadCommnds(bot);
    }
} 