const { EmbedBuilder } = require("revolttools.js")

exports.default = {
    name: "serverinfo",
    description: "Get information on a server.",
    async code(message, args, client) {
        const server = message.channel.server;
        console.log(server.bannerURL)

        const embed = new EmbedBuilder()
            .setTitle("Server Information")
            .setDescription(`Name: \`${server.name}\` \nID: \`${server._id}\` \nOwner: <@${server.owner}>\``);

        await message.reply({ embeds: [embed] });
    }
}