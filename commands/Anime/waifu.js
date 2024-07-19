const { EmbedBuilder, Uploader } = require('revolttools.js');
const axios = require('axios');

exports.default = {
  name: 'waifu',
  description: 'generate a random waifu image.',
  async code(message, args, client) {
    try {
      const response = await axios.get('https://api.waifu.im/search?included_tags=waifu');

      const image = response.data.images[0].url;
      const uploader = new Uploader(client)

      const embed = new EmbedBuilder()
      
        .setTitle("Here's your waifu image!")
        .setUrl(image) // Set the URL of the embed to the image URL
        .setMedia(await uploader.upload(image, "image.jpeg"));

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      let emb = new EmbedBuilder()
        .setDescription("An error occurred while executing this command.")
        .setTitle("Error!")
        .setColour("red")
        .setIconUrl("https://autumn.revolt.chat/attachments/j9pxBtz-QGDyCaBsWlVq1um8zB6iKDgfw03vCRjJGH/002_stop.PNG")

      message.reply({ embeds: [emb] });
    }
  },
};