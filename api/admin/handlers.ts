import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

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

const DEFAULT_HANDLERS = [
  {
    id: "HND-01",
    name: "GoTrek Travels Admin",
    email: "mailgotrek@gmail.com",
    phone: "7248285767",
    role: "Admin Operations Manager",
    badgeId: "GT-ADM-01",
    station: "Pithoragarh Operations HQ",
    status: "Active",
    createdAt: "2027-01-01",
  },
  {
    id: "HND-02",
    name: "Vikram Singh Bisht",
    email: "admin@gotrektravels.com",
    phone: "7248285767",
    role: "Admin Operations Manager",
    badgeId: "GT-ADM-02",
    station: "Pithoragarh Operations HQ",
    status: "Active",
    createdAt: "2027-01-10",
  },
  {
    id: "HND-03",
    name: "Vinay Gururani",
    email: "vinay.ops@gotrektravels.com",
    phone: "7248285767",
    role: "Co-Founder & SDM Lead",
    badgeId: "GT-ADM-03",
    station: "SDM Office Dharchula Desk",
    status: "Active",
    createdAt: "2027-01-11",
  },
  {
    id: "HND-05",
    name: "Pawan Singh Bisht",
    email: "pawan.fleet@gotrektravels.com",
    phone: "7248285767",
    role: "Co-Founder & 4x4 Fleet Director",
    badgeId: "GT-FLT-01",
    station: "Pithoragarh 4x4 Garage Base",
    status: "On Duty",
    createdAt: "2027-01-12",
  },
  {
    id: "HND-06",
    name: "Deepak Singh Mehta",
    email: "deepak.guide@gotrektravels.com",
    phone: "9876543210",
    role: "Lead High-Altitude Guide",
    badgeId: "GT-LEAD-01",
    station: "Nabi Village Base Homestay",
    status: "On Duty",
    createdAt: "2027-02-01",
  },
  {
    id: "HND-07",
    name: "Suresh Joshi",
    email: "sdm.liaison@gotrektravels.com",
    phone: "9411155555",
    role: "SDM Permit Liaison Officer",
    badgeId: "GT-SDM-09",
    station: "Dharchula Checkpoint Desk",
    status: "Active",
    createdAt: "2027-02-10",
  },
];

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-handler-id");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch handlers
  if (req.method === "GET") {
    try {
      if (db) {
        const snap = await getDocs(collection(db, "handlers"));
        if (!snap.empty) {
          const list: any[] = [];
          snap.forEach((d) => {
            const data = d.data();
            const { password, ...safe } = data;
            list.push(safe);
          });
          return res.status(200).json({ success: true, count: list.length, handlers: list });
        }
      }
      return res.status(200).json({ success: true, count: DEFAULT_HANDLERS.length, handlers: DEFAULT_HANDLERS });
    } catch (err: any) {
      console.warn("Vercel handlers fetch warning:", err);
      return res.status(200).json({ success: true, count: DEFAULT_HANDLERS.length, handlers: DEFAULT_HANDLERS });
    }
  }

  // POST: Create new handler
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const newId = body.id || `HND-${Math.floor(10 + Math.random() * 90)}`;
      const handlerData = {
        ...body,
        id: newId,
        status: body.status || "Active",
        createdAt: body.createdAt || new Date().toISOString().split("T")[0],
      };

      if (db) {
        await setDoc(doc(db, "handlers", newId), handlerData, { merge: true });
      }

      const { password, ...safe } = handlerData;
      return res.status(201).json({ success: true, handler: safe });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to create handler" });
    }
  }

  // DELETE: Delete handler
  if (req.method === "DELETE") {
    try {
      const id = req.query?.id || req.body?.id || req.url?.split("/").pop();
      if (id && db) {
        await deleteDoc(doc(db, "handlers", String(id)));
      }
      return res.status(200).json({ success: true, message: `Handler ${id} deleted` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to delete handler" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
