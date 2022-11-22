/*
* INFO:
*   Discord-bot Template 
*       Made by: Swisser
*
* VERSIONS:
*   Bot: v1.0.0
*   Discord.js: v14.6.0
*/

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { loadCommnds } = require("../dependencies/handlers/commandHandler");
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const bot = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions], 
    partials: [User, Message, GuildMember, ThreadMember]
 });

const { loadEvents } = require("../dependencies/handlers/eventHandler");

bot.config = require("../../config.json");
bot.events = new Collection();
bot.commands = new Collection();

bot.utils = {};

const Logger = require('../dependencies/utilities/logger')
bot.utils.logger = new Logger()
global.logger = bot.utils.logger

bot.login(bot.config.token).then(() => {

    logger.info("[ LOADER ] Booting up Core..");
    try {
        loadEvents(bot);
    } catch (e) {
        logger.error(`[LOADER] Could not initialize core:`, e);
        return false;
    }

    bot.user.setActivity(`with Swisser's brain & patience`)
}).catch((err) => console.log(err));