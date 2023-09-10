const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
} = require("discord.js");
const {
    UserRepository,
    clientUtilsRepository,
    AnimeRepository,
    ShopItemRepository,
} = require("../../database/Schemas");
const { ClientEmbed } = require("../../");
const translate = require("@iamtraction/google-translate");
const moment = require("moment-timezone");


module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        const guilds = this.client.guilds.cache.size;
        const usuarios = this.client.users.cache.size;
        this.client.database.users = UserRepository;
        this.client.database.clientUtils = clientUtilsRepository;
        this.client.database.anime = AnimeRepository;
        this.client.database.shopitem = ShopItemRepository;
        this.client.user.setActivity(`Feito com ❤️`);

        this.client.user.setStatus("dnd");
        console.log(
            `\x1b[33m[CLIENT]\x1b[0m [\x1b[33m${new Date().toLocaleTimeString(
                "pt-br",
                { timeZone: "America/Sao_Paulo" }
            )}\x1b[0m]`,
            `Client \x1b[33msuccessfully \x1b[0mlogged in.`
        );

        console.log(
            `\x1b[34m[CLIENT]\x1b[0m [\x1b[34m${new Date().toLocaleTimeString(
                "pt-br",
                { timeZone: "America/Sao_Paulo" }
            )}\x1b[0m]`,
            `Currently i am on \x1b[34m${guilds.toLocaleString()} \x1b[0mservers`
        );

        console.log(
            `\x1b[35m[CLIENT]\x1b[0m [\x1b[35m${new Date().toLocaleTimeString(
                "pt-br",
                { timeZone: "America/Sao_Paulo" }
            )}\x1b[0m]`,
            `I currently manage \x1b[35m${usuarios.toLocaleString()} \x1b[0mmembers`
        );
        const allowedCommands = ["coupon"];
        const filteredCommands = this.client.commands.filter(
            (command) => !allowedCommands.includes(command.name)
        );
        await this.client.application.commands.set(filteredCommands);
        setInterval(async () => {
            const shopItems = await this.client.database.shopitem.find({
                roleId: { $exists: true },
            });
            const items = {};
            for (const item of shopItems) {
                items[item.name] = {
                    field: item.name,
                    roleId: item.roleId,
                };
            }

            const expiredUsers = await this.client.database.users.find({
                vip_expiration: { $lt: new Date() },
            });

            for (const user of expiredUsers) {
                const guild = await this.client.guilds.fetch("988251099117006878");
                const member = guild.members.cache.get(user.id);

                for (const itemType in items) {
                    if (user[itemType] > 0) {
                        const role = guild.roles.cache.get(items[itemType].roleId);
                        member.roles.remove(role);

                        let update = {};
                        update[itemType] = 0;

                        await this.client.database.users.findOneAndUpdate(
                            { id: user.id },
                            { $set: update }
                        );
                    }
                }
            }
        }, 60000);

        console.log(
            `\x1b[36m[SLASH]\x1b[0m [\x1b[36m${new Date().toLocaleTimeString(
                "pt-br",
                { timeZone: "America/Sao_Paulo" }
            )}\x1b[0m] All \x1b[36m${this.client.commands.size
            }\x1b[0m Commands were successfully logged`
        );

    });
}
