const { Client } = require("revolt.js.js");
const { Collection } = require("discord.js");
const { token, prefix, color, mongoURI } = require("./settings.json");
const functions = require("./handlers/functions");


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

client.loginBot();
