const { EmbedBuilder } = require("revolttools.js");

exports.default = {
  name: "kick",
  description: "Kick a user.",
  async code(message, args, client) {
    console.log(message.channel.server)
    if (message.member.hasPermission(message.channel.server, "KickMembers") === false) {
      let emb = new EmbedBuilder()
        .setDescription("To execute this command, you need the `KickMembers` permission!")
        .setTitle("Error!")
        .setColour("red");

      message.reply({ embeds: [emb] });
      return;
    }

    const parts = message.content.split(' ');
    const target_id = parts[1]?.replace("<@", "").replace(">", "");
    if (!target_id) {
      let emb = new EmbedBuilder()
        .setDescription("You didn't provide a user to kick!")
        .setTitle("Error!")
        .setColour("red")
        .setIconUrl("https://autumn.revolt.chat/attachments/j9pxBtz-QGDyCaBsWlVq1um8zB6iKDgfw03vCRjJGH/002_stop.PNG") 

      message.reply({ embeds: [emb] });
      return;
    }

    const reason = parts[2] || "None";
    let target = await message.channel.server.fetchMember(target_id);
    if (!target) {
      let emb = new EmbedBuilder()
        .setDescription(`This user doesn't exist.`)
        .setTitle("Error!")
        .setColour("red")
        .setIconUrl("https://autumn.revolt.chat/attachments/j9pxBtz-QGDyCaBsWlVq1um8zB6iKDgfw03vCRjJGH/002_stop.PNG")

      message.reply({ embeds: [emb] });
      return;
    }

    if (!target.kickable) {
      let emb = new EmbedBuilder()
        .setDescription("I can't kick this user.")
        .setTitle("Error!")
        .setColour("red")
        .setIconUrl("https://autumn.revolt.chat/attachments/j9pxBtz-QGDyCaBsWlVq1um8zB6iKDgfw03vCRjJGH/002_stop.PNG")

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