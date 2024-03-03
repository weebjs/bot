module.exports = {
  run: (client) => {
    console.log(`[ ${client.user.name} ] : Connected to Guilded`)

    const status = {
      content: `Gemini AI • gemini-guilded-chat.vercel.app`,
      emoteId: 90001800,
    };
    await client.setStatus(status);
  }
}
