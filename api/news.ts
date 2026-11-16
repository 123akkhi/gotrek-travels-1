import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import * as vercelFirebase from "../src/server/vercelFirebase";
import { DEFAULT_NEWS_BULLETINS } from "../src/data/blogsData";

const firebaseExports = vercelFirebase as any;
const db =
  firebaseExports.getServerlessDb?.() ??
  firebaseExports.db ??
  firebaseExports.default ??
  null;

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-handler-id");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch news bulletins
  if (req.method === "GET") {
    try {
      let firestoreNews: any[] = [];
      if (db) {
        const snap = await getDocs(collection(db, "news"));
        if (!snap.empty) {
          snap.forEach((d) => {
            const data = d.data();
            if (data && data.id && data.headline) {
              firestoreNews.push({ ...data, isCustom: true });
            }
          });
        }
      }

      const map = new Map<string, any>();
      DEFAULT_NEWS_BULLETINS.forEach((n) => map.set(n.id, n));
      firestoreNews.forEach((n) => map.set(n.id, n));
      const combined = Array.from(map.values());

      return res.status(200).json({ success: true, count: combined.length, news: combined });
    } catch (err: any) {
      console.warn("Vercel news fetch warning:", err);
      return res.status(200).json({ success: true, count: DEFAULT_NEWS_BULLETINS.length, news: DEFAULT_NEWS_BULLETINS });
    }
  }

  // POST: Create or update news bulletin
  if (req.method === "POST") {
    try {
      const bulletin = req.body || {};
      const id = bulletin.id || `bulletin_${Date.now()}`;
      if (!bulletin.headline || !bulletin.summary) {
        return res.status(400).json({ success: false, error: "Headline and summary are required" });
      }

      const bulletinData = {
        ...bulletin,
        id,
        isCustom: true,
        updatedAt: new Date().toISOString(),
      };

      if (db) {
        await setDoc(doc(db, "news", id), bulletinData, { merge: true });
        console.log(`[Vercel Firestore] News bulletin '${id}' saved to 'news' collection`);
      }

      return res.status(201).json({ success: true, bulletin: bulletinData });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to save news bulletin" });
    }
  }

  // DELETE: Delete news bulletin by id
  if (req.method === "DELETE") {
    try {
      const id = req.query?.id || req.body?.id || req.url?.split("/").pop();
      if (!id) {
        return res.status(400).json({ success: false, error: "ID is required" });
      }

      if (db) {
        await deleteDoc(doc(db, "news", String(id)));
        console.log(`[Vercel Firestore] News bulletin '${id}' deleted from 'news' collection`);
      }

      return res.status(200).json({ success: true, message: `News bulletin '${id}' deleted successfully` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to delete news" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
