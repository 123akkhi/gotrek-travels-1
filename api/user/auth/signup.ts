import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, collection, doc, getDocs, setDoc } from "firebase/firestore";

const FIREBASE_CONFIG = {
  projectId: "gotrek-travels",
  appId: "1:42157767715:web:8383d5f8a3374d9b434596",
  apiKey: "AIzaSyCuCFgHEMNPO3YUdCHUaZ1K32_Fx1Owxm8",
  authDomain: "gotrek-travels.firebaseapp.com",
  firestoreDatabaseId: "default",
  storageBucket: "gotrek-travels.firebasestorage.app",
  messagingSenderId: "42157767715",
  measurementId: "G-KFHH5B8EKH",
};

const DEFAULT_HANDLERS = [
  { id: "HND-01", name: "GoTrek Travels Admin", email: "mailgotrek@gmail.com", phone: "7248285767", password: "admin", role: "Admin Operations Manager", badgeId: "GT-ADM-01", station: "Pithoragarh Operations HQ", status: "Active", createdAt: "2027-01-01" },
  { id: "HND-02", name: "Vikram Singh Bisht", email: "admin@gotrektravels.com", phone: "7248285767", password: "admin", role: "Admin Operations Manager", badgeId: "GT-ADM-02", station: "Pithoragarh Operations HQ", status: "Active", createdAt: "2027-01-10" },
  { id: "HND-03", name: "Vinay Gururani", email: "vinay.ops@gotrektravels.com", phone: "7248285767", password: "admin", role: "Co-Founder & SDM Lead", badgeId: "GT-ADM-03", station: "SDM Office Dharchula Desk", status: "Active", createdAt: "2027-01-11" },
  { id: "HND-05", name: "Pawan Singh Bisht", email: "pawan.fleet@gotrektravels.com", phone: "7248285767", password: "fleet", role: "Co-Founder & 4x4 Fleet Director", badgeId: "GT-FLT-01", station: "Pithoragarh 4x4 Garage Base", status: "On Duty", createdAt: "2027-01-12" },
  { id: "HND-06", name: "Deepak Singh Mehta", email: "deepak.guide@gotrektravels.com", phone: "9876543210", password: "guide", role: "Lead High-Altitude Guide", badgeId: "GT-LEAD-01", station: "Nabi Village Base Homestay", status: "On Duty", createdAt: "2027-02-01" },
  { id: "HND-07", name: "Suresh Joshi", email: "sdm.liaison@gotrektravels.com", phone: "9411155555", password: "permit", role: "SDM Permit Liaison Officer", badgeId: "GT-SDM-09", station: "SDM Office Dharchula", status: "Active", createdAt: "2027-02-15" },
];

function getDb() {
  try {
    const app = !getApps().length ? initializeApp(FIREBASE_CONFIG) : getApp();
    try {
      return initializeFirestore(app, { ignoreUndefinedProperties: true }, "default");
    } catch {
      return getFirestore(app, "default");
    }
  } catch (e) {
    console.warn("Vercel Firebase initialization warning:", e);
    return null;
  }
}

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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { name, email, phone, password, role, station } = parseJsonBody(req);
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, error: "Name, Email, Phone, and Password are required" });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const rawDigits = String(phone).replace(/\D/g, "");
    const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;
    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, error: "Please provide a valid 10-digit mobile number." });
    }

    const db = getDb();
    let handlers: any[] = DEFAULT_HANDLERS;
    if (db) {
      try {
        const snap = await getDocs(collection(db, "handlers"));
        if (!snap.empty) {
          const list: any[] = [];
          snap.forEach((d) => {
            const item = d.data();
            if (item && item.email?.toLowerCase() !== "akshayra987@gmail.com") list.push(item);
          });
          if (list.length > 0) handlers = list;
        }
      } catch {}
    }

    if (handlers.some((h) => h.email?.toLowerCase() === cleanEmail)) {
      return res.status(400).json({ success: false, error: "An account with this email already exists. Please log in instead." });
    }

    const newId = `HND-0${handlers.length + 1}`;
    const badgeId = `GT-${role?.includes("Lead") ? "LEAD" : role?.includes("Permit") ? "SDM" : role?.includes("Fleet") ? "FLT" : "ADM"}-0${handlers.length + 1}`;
    const verificationCode = String(Math.floor(100000 + Math.random() * 900000));

    const newHandler: Record<string, any> = {
      id: newId,
      name: String(name).trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: String(password),
      role: role || "Ground Trip Lead",
      badgeId,
      station: station || "Pithoragarh Operations HQ",
      status: "Pending Verification",
      verificationCode,
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (db) {
      try {
        await setDoc(doc(db, "handlers", newId), newHandler, { merge: true });
        await setDoc(doc(db, "otps", cleanPhone), {
          phone: cleanPhone,
          code: verificationCode,
          name: newHandler.name,
          createdAt: new Date().toISOString(),
          expiresAt: Date.now() + 10 * 60 * 1000,
          verified: false,
        }, { merge: true });
      } catch (e) {
        console.warn("[Vercel Staff Signup] Firestore write warning:", e);
      }
    }

    const smsText = `Your GoTrek Travels Staff CRM Registration OTP code is ${verificationCode}. Valid for 10 minutes.`;
    const whatsappText = encodeURIComponent(
      `Hello GoTrek Travels Admin,\nI have registered as a new staff member for CRM access.\nFull Name: ${newHandler.name}\nRole: ${newHandler.role}\nMobile: ${newHandler.phone}\nEmail: ${newHandler.email}\nStation: ${newHandler.station}\nVerification OTP: ${verificationCode}\nPlease authenticate my staff access.`
    );

    const { password: _, ...handlerProfile } = newHandler;
    return res.status(201).json({
      success: true,
      requiresOtp: true,
      pendingVerification: true,
      businessPhone: "+91 72482 85767",
      phone: cleanPhone,
      verificationCode,
      codePreview: verificationCode,
      smsLink: `sms:${cleanPhone}?body=${encodeURIComponent(smsText)}`,
      whatsappLink: `https://wa.me/917248285767?text=${whatsappText}`,
      smsDelivery: {
        delivered: false,
        provider: "none",
        providerLabel: "Preview OTP Mode",
        emailSent: false,
        targetPhone: cleanPhone,
        e164Phone: `+91${cleanPhone}`,
        message: `Preview OTP ready for +91${cleanPhone}`,
      },
      message: `Staff Registration submitted! Use preview OTP ${verificationCode} to verify.`,
      user: handlerProfile,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Registration failed" });
  }
}