import Razorpay from "razorpay";

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
    const { amount, currency = "INR", receipt, packageName, fullName, phone, email, travellers, month } = parseJsonBody(req);
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: "Valid payment amount is required" });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    if (keyId && keySecret) {
      try {
        const instance = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await instance.orders.create({
          amount: amountInPaise,
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: {
            packageName: packageName || "Adi Kailash Yatra Deposit",
            fullName: fullName || "Pilgrim Yatri",
            phone: phone || "",
            email: email || "",
            travellers: String(travellers || 1),
            month: month || "May 2027",
          },
        });

        return res.status(200).json({
          success: true,
          isLiveKey: true,
          keyId,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        });
      } catch (razorError: any) {
        const msg = razorError?.error?.description || razorError?.message || "Razorpay rejected your API keys";
        console.error("[Vercel Razorpay] Order creation failed with configured keys:", msg);
        return res.status(502).json({
          success: false,
          error: `Razorpay API error: ${msg}. Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel.`,
        });
      }
    }

    const demoOrderId = `order_demo_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return res.status(200).json({
      success: true,
      isLiveKey: false,
      keyId: keyId || "rzp_test_demoKey",
      orderId: demoOrderId,
      amount: amountInPaise,
      currency,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Failed to create order" });
  }
}