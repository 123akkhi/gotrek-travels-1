import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { INITIAL_LEADS } from "../../src/data/mockData";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-handler-id");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Retrieve leads (returns standard CRM format { success: true, count, leads })
  if (req.method === "GET") {
    try {
      if (db) {
        const snap = await getDocs(collection(db, "leads"));
        if (!snap.empty) {
          const leads: any[] = [];
          snap.forEach((d) => {
            const item = d.data();
            if (item && item.id) {
              leads.push({
                ...item,
                fullName: item.fullName || item.name || "Yatri",
                destination: item.destination || "Adi Kailash Yatra",
                phone: item.phone || "",
              });
            }
          });
          leads.sort((a, b) => ((b.id || "") > (a.id || "") ? 1 : -1));
          return res.status(200).json({ success: true, count: leads.length, leads });
        }
      }
      return res.status(200).json({ success: true, count: INITIAL_LEADS.length, leads: INITIAL_LEADS });
    } catch (err: any) {
      console.warn("Vercel leads fetch warning:", err);
      return res.status(200).json({ success: true, count: INITIAL_LEADS.length, leads: INITIAL_LEADS });
    }
  }

  // POST: Create new lead booking
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const newId = body.id || `GT-2027-${Math.floor(Math.random() * 899 + 100)}`;
      const nowIso = new Date().toISOString();
      const leadData = {
        id: newId,
        createdAt: body.createdAt || nowIso.split("T")[0],
        updatedAt: nowIso,
        detailsFilled: true,
        fullName: (body.fullName || body.name || "Yatri").trim(),
        phone: String(body.phone || "").trim(),
        email: (body.email || "").trim(),
        destination: body.destination || "Adi Kailash & Om Parvat Yatra",
        pickupLocation: body.pickupLocation || "Kathgodam / Haldwani (Railway Station Hub)",
        travellers: Number(body.travellers) || 1,
        month: body.month || body.travelDate || "May 2027",
        vehiclePreference: body.vehiclePreference || "suv",
        status: body.status || "New Inquiry",
        tripStatus: body.tripStatus || "Upcoming",
        ilpStatus: body.ilpStatus || {
          aadharProvided: false,
          policeVerification: false,
          medicalCertificate: false,
          sdmApproval: "Pending",
          itbpClearance: "Pending",
        },
        assignedVehicle: body.assignedVehicle || "Unassigned",
        assignedGuide: body.assignedGuide || "Unassigned",
        totalAmount: body.totalAmount || (Number(body.travellers) || 1) * 38000,
        advancePaid: body.advancePaid || 0,
        notes: body.notes || "Submitted via website instant inquiry.",
      };

      if (db) {
        try {
          await setDoc(doc(db, "leads", newId), leadData, { merge: true });
          console.log(`[Vercel Firestore] Lead ${newId} saved to 'leads'`);
        } catch (dbErr) {
          console.error("Failed to write lead to Firestore on Vercel:", dbErr);
        }
      }

      return res.status(201).json({ success: true, lead: leadData });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to submit lead" });
    }
  }

  // DELETE: Delete lead booking
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (id && db) {
        await deleteDoc(doc(db, "leads", String(id)));
      }
      return res.status(200).json({ success: true, message: `Lead ${id} deleted` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to delete lead" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
