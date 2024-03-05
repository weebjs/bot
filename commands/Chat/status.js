module.exports = {
  description: "update status",
  usage: "<status>",
  run: async (client, message, args) => {
    const status = args.join(" ");
    if (!status) {
      return message.send("please provide a status to set.");
    }


     

    const authToken = "gapi_krgKTcsyAI1502/GO7+EPYVSHZQ4MlJr4yfhd5srXV+SGLcD42oH7l2tEOCQ1lSdY1F4WT5/p5ILhRnyo1L0sQ=="; // Replace with your authorization token

    try {
      const response = await fetch(`https://www.guilded.gg/api/v1/users/@me/status`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: status,
          emoteId: 2258534,
        })
      });

      message.send(`hey! it seems like your status is now updated to "${status}". cant see your status? try reloading the page.`);
    } catch (error) {
      console.error(error);
      message.send("an error occurred while updating the status.");
    }
  },
};
