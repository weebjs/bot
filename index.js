const revolt = require("revolt.js");
const client = new revolt.Client();
const revoltHandler = require("revolthandler.js");
const { token, prefix } = require("./settings.json");
const handler = new revoltHandler.Handler({
  client: client, //required
  prefix: prefix, //required
  owners: ["Your Revolt ID"], //required , optional add more owner Id
  path: "./commands", //optional, (default : "./commands")
});
client.once("ready", () => {
  handler.start();
});
client.loginBot(token);