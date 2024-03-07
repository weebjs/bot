const { Embed } = require("guilded.js");

module.exports = {
  name: "help",
  description: "*View every command for the bot.*",
  usage: "\`g!help [command name]\`",
  run: async (client, message, args) => {
    try {
      const commandName = args[0]; // Get the command name from the user's input

      // If a command name is provided, display information about that command
      if (commandName) {
        const command = client.commands.get(commandName); // Get the command object based on the name

        if (!command) {
          const embed = new Embed()
            .setTitle("Uh Oh ❗")
            .setDescription("This command doesn't exist.\n\nPlease use the `help` command to view every available command to use.")
            .setColor("#FF3131");

          const errorembed = await message.reply({ embeds: [embed], isSilent: true });
        } else {
          // Create an embed with the command name and description
          const embed = new Embed()
            .setTitle(command.name)
            .setDescription(`*${command.description}* \n\n**Usage:** \`${command.usage || 'None'}\` \n\n**Aliases:** \`${command.aliases || 'None'}\``)
            .setColor("#36363D");

          // Send the embed as a reply
          const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
        }
      } else {
        // If no command name is provided, display information about all available commands
        const embed = new Embed()
          .setTitle("Available Commands :scroll:")
          .setColor("#36363D")
          .setDescription("*View every single command availible to use for gemini.*")
          .addField(":robot_face: • AI", "`chat`", true)
          .addField(":wrench: • Utility", "`help`", true)
          .addField("Notice ❗", "This bot is in early beta, Some features won't work. If that happens, please report to our [Support Server](guilded.gg/geminiai). Thanks!")
          .setThumbnail("https://cdn.gilcdn.com/UserAvatar/ec9d9c1a1d1d3e08c53a439c1a5cd595-Large.webp?w=450&h=450");

        // Send the embed as a reply
        const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
      }
    } catch (error) {
      console.error(error);
    }
  },
};