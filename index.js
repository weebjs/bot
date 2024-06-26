const { Client } = require("guilded.js");
const { Collection } = require("discord.js");
const { token, prefix, color, ownerId, mongoURI } = require("./settings.json");
const functions = require("./handlers/functions");
const client = new Client({
    token: token,
    rest: {
        headers: { "x-guilded-bot-api-use-official-markdown": "true" }
    },
    ws: {
        headers: { "x-guilded-bot-api-use-official-markdown": "true" }
    }
});


const express = require('express');
const app = express();
let port = 5000;
app.get('/', (req, res) => {
  res.send(`Ready`)
})
app.listen(port, () => {
  console.log(`${port}`)
})

client.commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId };
client.functions = functions;

for(let handler of  ["command", "event"]) require(`./handlers/${handler}`)(client);

client.login();
