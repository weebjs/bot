const figlet = require('figlet');

module.exports = {
  run: async (client) => {
    const art = figlet.textSync('yay!');

    console.log('\x1b[34m[INFO]\x1b[0m:', `Logged in as ${client.user.name}`);
    await client.fetchServers();
    const status = {
      content: `$help • zapguilded.me`,
      emoteId: 2308512,
    };
    await client.setStatus(status);
    console.log('\x1b[34m[INFO]\x1b[0m:', `${client.servers.cache.size} servers`);
        console.log(art);
  },
};
