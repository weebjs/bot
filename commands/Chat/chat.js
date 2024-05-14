const { Embed, Client } = require("guilded.js");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDJSCiol8CvtVJebCbd3seCpAxXU-5D6PI");

module.exports = {
  name: "chat",
  description: "Start a conversation with Gemini!",
  run: async (client, message, args) => {
    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const generationConfig = {
        temperature: 0,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const prompt = args.join(" "); // Extract prompt from args

      if (prompt.length > 1000) {
        const embed = new Embed()
          .setTitle("Oh no!")
          .setColor("RED")
          .setDescription(
            "Your prompt is too long. Please provide a prompt with less than **1000** characters."
          );

        message.reply({ embeds: [embed] });

        return;
      }

      const result = await chat.sendMessage(prompt);
      const response = await result.response;

      const text = response.text();
      console.log(text);

      if (text.length > 2045) {
        const embed = new Embed()
          .setTitle("Oh no!")
          .setColor("RED")
          .setDescription(
            "That response is too long. Please try again with a different prompt."
          );

        message.reply({ embeds: [embed] });

        return;
      }

    message.reply(text);
    } catch (err) {
      console.error(err);
    }
  },
};
