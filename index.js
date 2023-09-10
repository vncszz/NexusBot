const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [
    Partials.User,
    Partials.GuildMember
  ]
});

console.clear();
module.exports = client;

const { Events } = require("discord.js");
const { loadEvents } = require("./Handlers/handlerEvent");
const { loadCommands } = require("./Handlers/handlerCommand");

client.commands = new Collection();
client.events = new Collection();
client.modals = new Collection();

/// ANTI CRASH

process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});

//LOGIN
client.login(process.env.TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});