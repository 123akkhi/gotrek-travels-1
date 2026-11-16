import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import * as vercelFirebase from "../src/server/vercelFirebase";
import { DEFAULT_BLOG_ARTICLES } from "../src/data/blogsData";

const firebaseExports = vercelFirebase as any;
const db =
  firebaseExports.getServerlessDb?.() ??
  firebaseExports.getFirestoreDb?.() ??
  firebaseExports.getDb?.() ??
  firebaseExports.db ??
  (typeof firebaseExports.default === "function" ? firebaseExports.default() : null);

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-handler-id");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: Fetch all blogs
  if (req.method === "GET") {
    try {
      let firestoreBlogs: any[] = [];
      if (db) {
        const snap = await getDocs(collection(db, "blogs"));
        if (!snap.empty) {
          snap.forEach((d) => {
            const data = d.data();
            if (data && data.slug && data.title) {
              firestoreBlogs.push({ ...data, isCustom: true });
            }
          });
        }
      }

      const map = new Map<string, any>();
      DEFAULT_BLOG_ARTICLES.forEach((art) => map.set(art.slug, art));
      firestoreBlogs.forEach((art) => map.set(art.slug, art));
      const combined = Array.from(map.values());

      return res.status(200).json({ success: true, count: combined.length, blogs: combined });
    } catch (err: any) {
      console.warn("Vercel blogs fetch warning:", err);
      return res.status(200).json({ success: true, count: DEFAULT_BLOG_ARTICLES.length, blogs: DEFAULT_BLOG_ARTICLES });
    }
  }

  // POST: Create or update blog
  if (req.method === "POST") {
    try {
      const blog = req.body || {};
      const slug = blog.slug || blog.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (!slug || !blog.title) {
        return res.status(400).json({ success: false, error: "Title and slug are required" });
      }

      const blogData = {
        ...blog,
        slug,
        isCustom: true,
        updatedAt: new Date().toISOString(),
      };

      if (db) {
        await setDoc(doc(db, "blogs", slug), blogData, { merge: true });
        console.log(`[Vercel Firestore] Blog '${slug}' saved to 'blogs' collection`);
      }

      return res.status(201).json({ success: true, blog: blogData });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to save blog" });
    }
  }

  // DELETE: Delete blog by slug
  if (req.method === "DELETE") {
    try {
      const slug = req.query?.slug || req.body?.slug || req.url?.split("/").pop();
      if (!slug) {
        return res.status(400).json({ success: false, error: "Slug is required" });
      }

      if (db) {
        await deleteDoc(doc(db, "blogs", String(slug)));
        console.log(`[Vercel Firestore] Blog '${slug}' deleted from 'blogs' collection`);
      }

      return res.status(200).json({ success: true, message: `Blog '${slug}' deleted successfully` });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message || "Failed to delete blog" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
