module.exports = {
  description: "update status",
  usage: "<status>",
  run: async (client, message, args) => {
    const status = args.join(" ");
    if (!status) {
      return message.send("please provide a status to set.");
    }


     

    const authToken = "gapi_syDhhYVRqYS0iou3ROGkPR7kj1NIhe5pK7PmFc9cfljk/G7D/XpBREBOLDn042rkCBC0xPOU6Q8HBQ2g8P2Tgw=="; // Replace with your authorization token

    try {
      const response = await fetch(`https://www.guilded.gg/api/v1/users/@me/status`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: status,
          emoteId: 90002579,
        })
      });

      message.send(`hey! it seems like your status is now updated to "${status}". cant see your status? try reloading the page.`);
    } catch (error) {
      console.error(error);
      message.send("an error occurred while updating the status.");
    }
  },
};
