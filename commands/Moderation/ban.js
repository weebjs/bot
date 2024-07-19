const { EmbedBuilder } = require("revolttools.js");

exports.default = {
    name: "ban",
    description: "ban a user.",
    async code(message, args, client) {
        if (message.member.hasPermission(message.channel.server, "BanMembers") === false) {
            let emb = new EmbedBuilder()
                .setDescription("To execute this command, you need the `BanMembers` permission!")
                .setTitle("Error!")
                .setColour("red");

            message.reply({ embeds: [emb] });
            return;
        }

        const parts = message.content.split(' ');
        const target_id = parts[1]?.replace("<@", "").replace(">", "");
        if (!target_id) {
            let emb = new EmbedBuilder()
                .setDescription("You didn't provide a user to ban!")
                .setTitle("Error!")
                .setColour("red")

            message.reply({ embeds: [emb] });
            return;
        }

        const reason = parts[2];
        let target = await message.channel.server.fetchMember(target_id);
        if (!target) {
            let emb = new EmbedBuilder()
                .setDescription(`This user doesn't exist.`)
                .setTitle("Error!")
                .setColour("red");

            message.reply({ embeds: [emb] });
            return;
        }

        if (!target.bannable) {
            let emb = new EmbedBuilder()
                .setDescription("I can't ban this user.")
                .setTitle("Error!")
                .setColour("red");

            message.reply({ embeds: [emb] });
        } else {
            await target.ban();
            let emb = new EmbedBuilder()
                .setDescription(`<@${target_id}> has been banned! \nBanned by: <@${message.author_id}> \nReason: ${reason}`)
                .setTitle("Success!")
                .setColour("green");

            message.reply({ embeds: [emb] });
        }
    }
};