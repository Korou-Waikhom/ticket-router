const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function classifyTicket(customerText) {
  const prompt = `
    You are an expert customer support routing AI. 
    Analyze the following customer message: "${customerText}"

    Return a strictly formatted JSON object with exactly these keys:
    - "sentiment" (Must be: "Angry", "Neutral", or "Positive")
    - "intent" (Must be: "Billing", "Tech Support", or "Sales")
    - "urgency" (Must be: "High", "Medium", or "Low")
    - "auto_reply" (A short, polite drafted response to the query)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error communicating with AI", error);
    throw new Error("Failed to classify ticket");
  }
}

module.exports = { classifyTicket };
