const figlet = require('figlet');

module.exports = {
  run: async (client) => {
    const art = figlet.textSync('yay!');

    console.log('\x1b[34m[INFO]\x1b[0m:', `Logged in as ${client.user.name}`);
    await client.fetchServers();
    const status = {
      content: `Gemini AI • gemini-guilded-chat.vercel.app`,
      emoteId: 90002555,
    };
    await client.setStatus(status);
    console.log('\x1b[34m[INFO]\x1b[0m:', `${client.servers.cache.size} servers`);
        console.log(art);
  },
};
