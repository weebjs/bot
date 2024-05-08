const { Collection, Client } = require("discord.js");
const { token, prefix, color, ownerId, mongoURI } = require("./settings.json");
const functions = require("./handlers/functions");
const client = new Client({ token: token });
const express = require('express');
const app = express();
let port = 5000;
app.get('/', (req, res) => {
  res.send(`Ready`)
});
app.listen(port, () => {});

    await client.fetchServers();
    console.log(`Logged in as ${client.user.name}`);
    console.log(`Fetched ${client.servers.cache.size} servers!`);

client.commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId };
client.functions = functions;

for (let handler of ["command", "event"]) require(`./handlers/${handler}`)(client);

client.login();
