const { Embed } = require("guilded.js")
module.exports = {
  description: "Get the latency of the bot",
  run: async (client, message) => {
      let msg = await message.send({content : "pinging..."});
      let ping = Date.now() - message.createdAt.getTime();
      let server = client.servers.fetch(message.serverId);
      let embed = {
        title : "Pong!",
        description : `My latency is ${ping}ms`,
        
      }
    await msg.edit({embeds : [embed]} )
  }
}