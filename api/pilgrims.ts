import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

const resolveServerlessDb = () => {
  try {
    const mod = require("../src/server/vercelFirebase");
    if (typeof mod?.getServerlessDb === "function") return mod.getServerlessDb();
    if (typeof mod?.default === "function") return mod.default();
    if (typeof mod?.getDb === "function") return mod.getDb();
    if (typeof mod?.default?.getServerlessDb === "function") return mod.default.getServerlessDb();
    return null;
  } catch {
    return null;
  }
};

const db = resolveServerlessDb();

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-handler-id");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch all pilgrims
  if (req.method === "GET") {
    try {
      if (db) {
        const snap = await getDocs(collection(db, "pilgrims"));
        if (!snap.empty) {
          const pilgrims: any[] = [];
          snap.forEach((d) => {
            const data = d.data();
            const { password, ...safe } = data;
            pilgrims.push(safe);
          });
          return res.status(200).json({ success: true, count: pilgrims.length, pilgrims });
        }
      }
      return res.status(200).json({ success: true, count: 0, pilgrims: [] });
    } catch (err: any) {
      console.warn("Vercel pilgrims fetch warning:", err);
      return res.status(200).json({ success: true, count: 0, pilgrims: [] });
    }
  }

  // POST: Create or register pilgrim
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const newId = body.id || `PLG-${Math.floor(1000 + Math.random() * 9000)}`;
      const registeredAt = body.registeredAt || new Date().toISOString().split("T")[0];
      const yatriBadgeId = body.yatriBadgeId || `YATRI-2027-${Math.floor(100 + Math.random() * 900)}`;

      const pilgrimRecord = {
        ...body,
        id: newId,
        registeredAt,
        yatriBadgeId,
      };

      if (db) {
        await setDoc(doc(db, "pilgrims", newId), pilgrimRecord, { merge: true });
      }

      const { password, ...safe } = pilgrimRecord;
      return res.status(201).json({ success: true, pilgrim: safe });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to save pilgrim" });
    }
  }

  // DELETE: Delete pilgrim by id
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (id && db) {
        await deleteDoc(doc(db, "pilgrims", String(id)));
      }
      return res.status(200).json({ success: true, message: `Pilgrim ${id} deleted` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to delete pilgrim" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
