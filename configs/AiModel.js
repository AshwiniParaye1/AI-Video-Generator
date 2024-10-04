/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json"
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30seconds video on topic : interesting historical story along with AI image prompt in realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: '## 30-Second Historical Story: The Lost City of Petra\n\n**JSON Format:**\n\n```json\n[\n  {\n    "imagePrompt": "A vast, sun-baked desert landscape, with towering sandstone cliffs in the distance. A lone traveler on a camel walks across the sand, silhouetted against the setting sun.",\n    "contentText": "Legend speaks of a city lost to time, hidden within the heart of the desert, known as Petra.  For centuries, its existence was mere whispers, a forgotten echo in the sands."\n  },\n  {\n    "imagePrompt": "Close-up shot of a hand delicately tracing a map, revealing the intricate carvings of ancient writing. The map is marked with a red dot, signifying Petra\'s location.",\n    "contentText": "But in the 19th century, a Swiss explorer, Johann Ludwig Burckhardt, ventured into the unknown, guided by ancient maps and whispers of the lost city."\n  },\n  {\n    "imagePrompt": "A breathtaking view of Petra\'s iconic Treasury, carved into the rose-colored rock face, sunlight illuminating its ornate facade.",\n    "contentText": "And there it was, emerging from the sandstone cliffs - Petra, a marvel of ancient engineering and artistry, hidden for centuries."\n  },\n  {\n    "imagePrompt": "A procession of people, dressed in traditional Nabatean attire, walking through the Siq, the narrow canyon leading to Petra, with the Treasury looming at the end.",\n    "contentText": "The Nabateans, a skilled desert people, built this magnificent city, a testament to their ingenuity and power."\n  },\n  {\n    "imagePrompt": "A panoramic view of Petra, showcasing its intricate rock-cut architecture, tombs, and temples, nestled amongst the mountains.",\n    "contentText": "Petra, the lost city, was once a thriving trading hub, a crossroads of cultures, connecting East and West."\n  },\n  {\n    "imagePrompt": "A lone traveler standing before the Treasury, gazing up at its intricate carvings, lost in contemplation of the past.",\n    "contentText": "Today, Petra stands as a silent testament to a forgotten civilization, a reminder of the enduring power of human ingenuity and the mysteries that lie hidden within the sands of time."\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure contains 6 scenes for a 30-second video:\n\n- **Scene 1:** Introduces the story with a dramatic desert setting and the mystery of Petra.\n- **Scene 2:** Highlights the discovery of Petra by focusing on the map and the explorer\'s journey.\n- **Scene 3:** Showcases the awe-inspiring grandeur of the Treasury, the most iconic feature of Petra.\n- **Scene 4:** Depicts the Nabateans, the city\'s builders, walking through the Siq, adding historical context.\n- **Scene 5:** Provides a broader perspective of Petra as a thriving city, emphasizing its cultural significance.\n- **Scene 6:** Concludes with a contemplative shot of a lone traveler, highlighting the enduring legacy of Petra. \n\n**Note:** These image prompts are suggestions and can be modified to enhance the visual storytelling of your video. You can adjust the language, framing, and specific details to fit your artistic vision. \n'
        }
      ]
    }
  ]
});
