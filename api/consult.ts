import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required" });
    }

    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "").trim();
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY is not configured in Vercel Environment Variables.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `You are the official GoTrek Travels AI Yatra Consultant for the sacred Adi Kailash, Om Parvat, Kailash Mansarovar, and Kumaon Himalayan pilgrimages in Uttarakhand, India.
Provide warm, authoritative, accurate, and concise guidance about:
1. Inner Line Permits (ILP) issued by SDM Dharchula & ITBP verification checks.
2. Fitness requirements (blood pressure, cardio prep, medical certificate from registered doctor).
3. Recommended clothing (3-layer thermal system, feather down jacket, waterproof boots, hot water flask).
4. Route information (Kathgodam -> Dharchula -> Gunji -> Nabi -> Jolingkong / Nabhidhang).
5. Best weather months (May-June for snow, Sept-Oct for clear peaks).
Keep answers structured with bullet points and friendly Shiv-bhakt tone. Max 250 words.`;

    const candidateModels = ["gemini-3.1-flash-lite", "gemini-4-hydrogen"];
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
          },
        });
        return res.status(200).json({
          success: true,
          model,
          answer: response.text || "Hari Om! How may I assist you with your sacred journey?",
        });
      } catch (err: any) {
        lastError = err;
        console.warn(`[Vercel Gemini] Model ${model} failed:`, err?.message || err);
      }
    }

    return res.status(500).json({
      success: false,
      error: lastError?.message || "Gemini API request failed. Verify GEMINI_API_KEY in Vercel Environment Variables.",
    });
  } catch (err: any) {
    console.error("Vercel Gemini Consultant Error:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Failed to generate AI consultation",
    });
  }
}
