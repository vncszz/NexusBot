const { ActivityType } = require("discord.js");


const presences = [
  {
    name: `Feito com 🤍`,
    type: ActivityType.Playing,
  },

];

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {

    console.log(`Online como ${client.user.username}\nAssistindo ${client.users.cache.size} Membros`);

    async function setPresence() {
      const presence = presences[Math.floor(Math.random() * presences.length)];

      client.user.setPresence({
        status: "Online",
        activities: [
          {
            name: presence.name,
            type: presence.type,
          },
        ],
      });
    }
    setPresence();
    setInterval(async function () {
      await setPresence();
    }, 600000);


  },
}