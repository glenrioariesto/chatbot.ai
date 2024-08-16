require("dotenv").config();
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-flash";
const { API_KEY_GEMINI } = process.env;

const compare = async (msg) => {
  const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  let prompt = `Anda adalah chatbot industri kreatif yang siap membantu member grup WhatsApp dengan pertanyaan terkait industri kreatif. Berikut adalah beberapa topik yang dapat Anda bantu:
  1. **Tren Industri**: Informasi tentang tren terbaru dalam desain grafis, media digital, atau seni visual.
  2. **Perangkat dan Alat**: Rekomendasi perangkat lunak atau alat terbaik untuk proyek kreatif.
  3. **Teknik dan Proses**: Panduan tentang teknik desain, proses pembuatan konten, atau tips praktis.
  4. **Sumber Daya dan Referensi**: Sumber daya, tutorial, atau referensi untuk mengembangkan keterampilan.
  5. **Karir dan Peluang**: Peluang karir, portofolio, atau tips untuk sukses di industri kreatif.

  Pesan Anda: ${msg}`;
  const parts = [{ text: prompt }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const { response } = result;
  return response.text();
};

module.exports = { compare };
