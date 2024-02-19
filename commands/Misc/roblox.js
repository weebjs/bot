const axios = require("axios");
const { Embed } = require("guilded.js");
const noblox = require("noblox.js");

module.exports = {
  description: "Get Roblox user information",
  aliases: ["userinfo", "robloxinfo"],
  usage: "<Roblox username>",
  run: async (client, message, args) => {
    const username = args[0];
    if (!username) {
      const embed = new Embed()
        .setTitle("Incorrect Command Usage ❌")
        .setDescription("For the argument target, I was expecting a `username`, but I didn't receive that. \n\n**You must mention a Roblox username to go forward with this action!**")
        .setColor("#FF3131");

      return message.reply({ embeds: [embed], isSilent: true });
    }

    try {
      let ids = await noblox.getIdFromUsername(username);
      let i = await noblox.getPlayerInfo({ userId: ids });
      const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${ids}&size=720x720&format=png&isCircular=true`;
      const img = await axios.get(url);
      const imgurl = img.data.data[0]?.imageUrl;

      const embed = new Embed()
        .setColor("#FFEFE5")
        .setTitle(`Information for ${i.username}`)
        .setThumbnail(imgurl)
        .addField("Display Name", `\`${i.displayName}\``)
        .addField("Followers", `\`${i.followerCount || "None"}\``, true)
        .addField("Friends", `\`${i.friendCount || "None"}\``, true)
        .addField("Followings", `\`${i.followingCount || "None"}\``, true)
        .addField("Joined At", `\`${i.joinDate}\``, false);

      message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error); 
      const embed = new Embed()
        .setTitle("Error ❌")
        .setDescription("Failed to get Roblox information, or the roblox user **doesn't** exist. \n\n *Please try again later, or report it to our [Support Server](guilded.gg/zapguilded).*")
        .setColor("#FF3131");

      message.reply({ embeds: [embed], isSilent: true });
    }
  },
};