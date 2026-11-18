export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const rawGemini = (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "")
    .trim()
    .replace(/^(GEMINI_API_KEY|GOOGLE_GEMINI_API_KEY)\s*=\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .replace(/\s+/g, "");
  const geminiKeyFormat = !rawGemini
    ? "missing"
    : rawGemini.startsWith("AIza")
    ? "valid_aiza_key"
    : rawGemini.startsWith("AQ.")
    ? "valid_aq_auth_key"
    : "unexpected_prefix";

  return res.status(200).json({
    status: "ok",
    app: "GoTrek Travels - Yatra & CRM (Vercel Serverless)",
    envConfigured: {
      geminiApiKey: Boolean(rawGemini),
      geminiKeyFormat,
      googlePlacesApiKey: Boolean(
        (
          process.env.GOOGLE_PLACES_API_KEY ||
          process.env.GOOGLE_MAPS_API_KEY ||
          process.env.VITE_GOOGLE_MAPS_API_KEY ||
          process.env.GOOGLE_API_KEY ||
          ""
        ).trim()
      ),
      googlePlaceId: Boolean((process.env.GOOGLE_PLACE_ID || "").trim()),
      razorpayKeyId: Boolean((process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim()),
      razorpayKeySecret: Boolean((process.env.RAZORPAY_KEY_SECRET || "").trim()),
      whatsappToken: Boolean((process.env.WHATSAPP_API_TOKEN || "").trim()),
      whatsappPhoneNumberId: Boolean((process.env.WHATSAPP_PHONE_NUMBER_ID || "").trim()),
      whatsappOtpTemplate: Boolean((process.env.WHATSAPP_OTP_TEMPLATE_NAME || "").trim()),
      fast2smsApiKey: Boolean((process.env.FAST2SMS_API_KEY || "").trim()),
      smtpEmail: Boolean(
        (process.env.SMTP_USER || process.env.GMAIL_USER || "").trim() &&
          (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "").trim()
      ),
    },
  });
}
