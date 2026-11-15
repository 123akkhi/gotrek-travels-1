import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebaseConfig from "../../../firebase-applet-config.json";

let db: any = null;
try {
  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const resolvedDbId = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)")
    ? firebaseConfig.firestoreDatabaseId
    : (firebaseConfig.projectId === "gotrek-travels" ? "default" : undefined);
  try {
    db = resolvedDbId
      ? initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true }, resolvedDbId)
      : initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
  } catch {
    db = resolvedDbId
      ? getFirestore(firebaseApp, resolvedDbId)
      : getFirestore(firebaseApp);
  }
} catch (e) {
  console.warn("Vercel Firebase initialization warning:", e);
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      age,
      city,
      state,
      preferredYatra,
      emergencyContactName,
      emergencyContactPhone,
    } = req.body || {};

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        error: "Full Name, Email, Mobile Number, and Password are required for registration.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const newId = `PLG-${Math.floor(1000 + Math.random() * 9000)}`;
    const yatriBadgeId = `YATRI-2027-${Math.floor(100 + Math.random() * 900)}`;
    const registeredAt = new Date().toISOString().split("T")[0];

    const pilgrimRecord = {
      id: newId,
      name: String(name).trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password,
      gender: gender || "Unspecified",
      age: age ? String(age) : "",
      city: city || "",
      state: state || "",
      preferredYatra: preferredYatra || "Adi Kailash & Om Parvat Yatra",
      emergencyContactName: emergencyContactName || "",
      emergencyContactPhone: emergencyContactPhone || "",
      yatriBadgeId,
      registeredAt,
    };

    if (db) {
      try {
        await setDoc(doc(db, "pilgrims", newId), pilgrimRecord, { merge: true });
        console.log(`[Vercel Firestore] Pilgrim ${newId} (${cleanEmail}) saved to 'pilgrims' collection`);

        // Also create lead booking record in 'leads' collection
        const leadId = `YATRI-2027-REG${Math.floor(100 + Math.random() * 900)}`;
        const newLead = {
          id: leadId,
          fullName: String(name).trim(),
          email: cleanEmail,
          phone: cleanPhone,
          destination: preferredYatra || "Adi Kailash & Om Parvat Yatra 2027",
          travellers: 1,
          createdAt: registeredAt,
          month: "May 2027",
          vehiclePreference: "suv",
          status: "New Inquiry",
          tripStatus: "Upcoming",
          ilpStatus: {
            aadharProvided: false,
            policeVerification: false,
            medicalCertificate: false,
            sdmApproval: "Pending",
            itbpClearance: "Pending",
          },
          assignedVehicle: "Unassigned",
          assignedGuide: "Unassigned",
          totalAmount: 38000,
          advancePaid: 0,
          notes: `New Pilgrim Portal Registration (${city || "India"}, ${state || ""}). Emergency Contact: ${emergencyContactName || "N/A"}.`,
        };
        await setDoc(doc(db, "leads", leadId), newLead, { merge: true });
        console.log(`[Vercel Firestore] Lead ${leadId} created for pilgrim ${newId}`);
      } catch (dbErr) {
        console.error("Failed to write pilgrim to Firestore:", dbErr);
      }
    }

    const { password: _, ...userProfile } = pilgrimRecord;
    return res.status(201).json({
      success: true,
      message: "Yatri Pilgrimage Account successfully registered!",
      user: userProfile,
      token: `yatri_token_${Date.now()}_${newId}`,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Registration failed" });
  }
}
