const { Embed } = require("guilded.js");

// Access your API key as an environment variable (see "Set up your API key" above)
module.exports = {
  name: "servercount",
  description: "Shows how many servers using Gemini AI.",
  run: async (client, message, args) => {
    await client.fetchServers();

    const embed = new Embed()
      .setDescription(`\`${client.servers.cache.size}\``)
      .setColor("GREEN");

    message.reply({ embeds: [embed], isPrivate: true });

    return;
  }
};