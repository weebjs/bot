const { Embed } = require("guilded.js");

module.exports = {
  name: "help",
  description: "View every command for the bot.",
  usage: "gemini help or gemini help [command name]",
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
            .setDescription(`**Description** - ${command.description}\n**Aliases** - ${command.aliases || 'None'}\n**Usage** - ${command.usage || 'None'}`)
            .setColor("#36363D");

          // Send the embed as a reply
          const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
        }
      } else {
        // If no command name is provided, display information about all available commands
        const embed = new Embed()
          .setTitle("Available Commands")
          .setColor("#36363D")
          .addField("chat", "start a conversation with Gemini.", true)
          .addfield("help", "view all commands useable for Gemini.", true)
          .setThumbnail("https://cdn.gilcdn.com/ContentMediaGenericFiles/75c19999563391a1c9a1934810b952e5-Full.webp?w=512&h=512");

        // Send the embed as a reply
        const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
