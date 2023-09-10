const { SlashCommandBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Obtenha meu ping!"),

    async execute(interaction) {

        const { client } = interaction;

        let ping = client.ws.ping;

        interaction.reply({ content: `🏓• **Pong!**\n<a:Online:1102913435781562419> Latência em **${Math.round(ping)} ms**\n<a:Loading:1077708788808810576> Tempo Resposta:  **${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}**`, ephemeral: false });
    }
}