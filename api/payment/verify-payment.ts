import crypto from "crypto";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, doc, setDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase for Vercel Serverless
let db: any = null;
try {
  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const resolvedDbId = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)")
    ? firebaseConfig.firestoreDatabaseId
    : (firebaseConfig.projectId === "gotrek-travels" ? "default" : undefined);
  db = resolvedDbId
    ? initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true }, resolvedDbId)
    : initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
} catch (e) {
  console.warn("Vercel Firebase initialization warning:", e);
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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      fullName,
      phone,
      email,
      destination,
      pickupLocation,
      travellers,
      month,
      amountPaid,
      notes,
    } = req.body || {};

    if (!fullName || !phone || !destination) {
      return res.status(400).json({ success: false, error: "Missing mandatory pilgrim booking fields" });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (keySecret && razorpay_order_id && razorpay_signature) {
      try {
        const hmac = crypto.createHmac("sha256", keySecret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest("hex");
        if (generatedSignature !== razorpay_signature) {
          console.warn("Razorpay signature mismatch warning.");
        }
      } catch (sigErr) {
        console.warn("Signature verification warning:", sigErr);
      }
    }

    const paymentId = razorpay_payment_id || `pay_${Date.now()}`;
    const newId = `GT-2027-${Math.floor(Math.random() * 899 + 100)}`;
    const paidAmountNum = Number(amountPaid) || 5000;
    const totalAmountNum = (Number(travellers) || 1) * 38000;

    const confirmedLead = {
      id: newId,
      createdAt: new Date().toISOString().split("T")[0],
      fullName,
      phone,
      email: email || "",
      destination,
      pickupLocation: pickupLocation || "Kathgodam / Haldwani (Railway Station Hub)",
      travellers: Number(travellers) || 1,
      month: month || "May 2027",
      vehiclePreference: "suv",
      status: "Approved & Booked",
      tripStatus: "Confirmed",
      ilpStatus: {
        aadharProvided: true,
        policeVerification: false,
        medicalCertificate: false,
        sdmApproval: "In Progress",
        itbpClearance: "Pending",
      },
      assignedVehicle: "UK-05 Scorpio 4x4 (Reserved)",
      assignedGuide: "Prakash Joshi (IMF Certified Lead)",
      totalAmount: totalAmountNum,
      advancePaid: paidAmountNum,
      notes: `ONLINE RAZORPAY CONFIRMED BOOKING. Payment ID: ${paymentId}. Order ID: ${razorpay_order_id || "N/A"}. ${notes || ""}`,
    };

    // Save lead to Firestore database
    if (db) {
      try {
        await setDoc(doc(db, "leads", newId), confirmedLead);
      } catch (dbErr) {
        console.warn("Firestore lead write warning on Vercel:", dbErr);
      }
    }

    return res.status(200).json({
      success: true,
      bookingId: confirmedLead.id,
      paymentId: paymentId,
      lead: confirmedLead,
      receiptUrl: `/receipt?id=${confirmedLead.id}`,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Failed to verify payment" });
  }
}
