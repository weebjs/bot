const axios = require('axios');
const { Embed } = require('guilded.js');

module.exports = {
  name: 'anime-search',
  description: 'Searches for anime on MyAnimeList.',
  run: async (client, message, args) => {
    const query = args.join(' ');
    const searchOptions = {
      method: 'GET',
      url: 'https://myanimelist.p.rapidapi.com/v2/anime/search',
      params: {
        q: query,
        limit: '50',
        offset: '0',
      },
      headers: {
        'X-RapidAPI-Key': 'bc1b5d8cdcmsh92ffb5fb71fed1ap1e3bc1jsn362413c13354',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
      },
    };

    try {
      const searchResponse = await axios.request(searchOptions);
      const animeList = searchResponse.data;

      // Get the first anime from the list
      const anime = animeList[0];

      // Get the anime details using the anime ID
      const animeOptions = {
        method: 'GET',
        url: `https://myanimelist.p.rapidapi.com/anime/${anime.myanimelist_id}`,
        headers: {
          'X-RapidAPI-Key': 'bc1b5d8cdcmsh92ffb5fb71fed1ap1e3bc1jsn362413c13354',
          'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
        },
      };

      const animeResponse = await axios.request(animeOptions);
      const a = animeResponse.data;

      const embed = new Embed()
        .setColor('#36363D')
        .setTitle(`${a.title_en || a.title.ov}`)
        .setThumbnail(a.picture_url)
        .setDescription(a.synopsis) 
        .addField(`Episodes:`, `${a.information.episodes}`, true)
        .addField(`Rating:`, `${a.information.rating}`, true)
        .addField(`Airing:`, `${a.information.aired}`, true)
        .addField(`Duration:`, `${a.information.duration}`, true)

      message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while searching for anime.');
    }
  }, 
};