import { GoogleGenAI } from "@google/genai";

function parseJsonBody(req: any): Record<string, any> {
  if (!req || req.body == null) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) || {};
    } catch {
      return {};
    }
  }
  return typeof req.body === "object" ? req.body : {};
}

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
    const { prompt } = parseJsonBody(req);
    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required" });
    }

    const rawKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "").trim();
    const apiKey = rawKey
      .replace(/^(GEMINI_API_KEY|GOOGLE_GEMINI_API_KEY)\s*=\s*/i, "")
      .replace(/^["']|["']$/g, "")
      .replace(/\s+/g, "");

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

    const candidateModels = ["gemini-4-hydrogen", "gemini-3.1-flash-lite"];
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

    const errMsg = String(lastError?.message || "");
    if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("API key not valid") || errMsg.includes("UNAUTHENTICATED")) {
      return res.status(401).json({
        success: false,
        error:
          "Google rejected GEMINI_API_KEY (401 API_KEY_INVALID). In Google Cloud Console -> Credentials for this key, set Application restrictions = None and API restrictions = 'Generative Language API' (or Don't restrict key), confirm @google/genai >= 3.5.0 is deployed, then Redeploy Vercel.",
      });
    }

    return res.status(500).json({
      success: false,
      error: errMsg || "Gemini API request failed. Verify GEMINI_API_KEY in Vercel Environment Variables.",
    });
  } catch (err: any) {
    console.error("Vercel Gemini Consultant Error:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Failed to generate AI consultation",
    });
  }
}
