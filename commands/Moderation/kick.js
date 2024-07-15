const { EmbedBuilder } = require("revolttools.js");

exports.default = {
  name: "kick",
  description: "kick a user.",
  async code(message, args, client) {
    if (message.member.hasPermission(message.channel.server, "KickMembers") === false) {
      let emb = new EmbedBuilder()
        .setDescription("You don't have enough permissions to use this command!")
        .setTitle("Error!")
        .setColour("red");

      message.reply({ embeds: [emb] });
      return;
    }

    let target_id = message.content.split(' ')[1];
    if (!target_id) {
      let emb = new EmbedBuilder()
        .setDescription("You didn't provide a user to kick!")
        .setTitle("Error!")
        .setColour("red")

      message.reply({ embeds: [emb] });
      return;
    }

    let reason = message.content.split(' ')[2];
    let target = await message.channel.server.fetchMember(target_id);
    if (!target) {
      let emb = new EmbedBuilder()
        .setDescription(`This user doesn't exist.`)
        .setTitle("Error!")
        .setColour("red");

      message.reply({ embeds: [emb] });
      return;
    }

    if (!target.kickable) {
      let emb = new EmbedBuilder()
        .setDescription("I can't kick this user.")
        .setTitle("Error!")
        .setColour("red");

      message.reply({ embeds: [emb] });
    } else {
      await target.kick();
      let emb = new EmbedBuilder()
        .setDescription(`<@${target_id}> has been kicked! \nKicked by: <@${message.author_id}> \nReason: ${reason}`)
        .setTitle("Success!")
        .setColour("green");

      message.reply({ embeds: [emb] });
    }
  }
};