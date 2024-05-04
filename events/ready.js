const p = require("primebit.js");

module.exports = {
  run: async (client) => {
    await client.fetchServers();
    p.success(`Logged in as ${client.user.name}`);
    p.log(`${client.servers.cache.size}`);
  },
};