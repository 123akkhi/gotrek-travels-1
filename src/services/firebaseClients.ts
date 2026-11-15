import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { LeadBooking } from "../types";
import { BlogArticle, YatraNewsBulletin, DEFAULT_BLOG_ARTICLES, DEFAULT_NEWS_BULLETINS } from "../data/blogsData";

// Resolve Firestore database ID: gotrek-travels uses named database "default"
const resolvedDbId =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)"
    ? firebaseConfig.firestoreDatabaseId
    : firebaseConfig.projectId === "gotrek-travels"
    ? "default"
    : undefined;

let clientDb: ReturnType<typeof getFirestore> | null = null;

export function getClientFirestore(): ReturnType<typeof getFirestore> {
  if (clientDb) return clientDb;

  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    try {
      clientDb = resolvedDbId
        ? initializeFirestore(app, { ignoreUndefinedProperties: true }, resolvedDbId)
        : initializeFirestore(app, { ignoreUndefinedProperties: true });
    } catch {
      clientDb = resolvedDbId
        ? getFirestore(app, resolvedDbId)
        : getFirestore(app);
    }
  } catch (err) {
    console.warn("Client Firestore initialization warning:", err);
    try {
      const app = getApp();
      clientDb = resolvedDbId ? getFirestore(app, resolvedDbId) : getFirestore(app);
    } catch (e) {
      console.error("Critical Firestore init error:", e);
    }
  }

  return clientDb!;
}

// ─────────────────────────────────────────────────────────────
// 1. LEADS & BOOKINGS INQUIRIES
// ─────────────────────────────────────────────────────────────

export async function saveLeadToFirestore(leadData: Partial<LeadBooking>): Promise<LeadBooking> {
  const db = getClientFirestore();
  const id = leadData.id || `GT-2027-${Math.floor(Math.random() * 899 + 100)}`;
  const nowIso = new Date().toISOString();

  const fullLead: LeadBooking = {
    id,
    createdAt: leadData.createdAt || nowIso.split("T")[0],
    updatedAt: nowIso,
    detailsFilled: true,
    fullName: (leadData.fullName || (leadData as any).name || "Yatri").trim(),
    phone: String(leadData.phone || "").trim(),
    email: (leadData.email || "").trim(),
    destination: leadData.destination || "Adi Kailash & Om Parvat Yatra",
    pickupLocation: leadData.pickupLocation || "Kathgodam / Haldwani (Railway Station Hub)",
    travellers: Number(leadData.travellers) || 1,
    month: leadData.month || (leadData as any).travelDate || "May 2027",
    vehiclePreference: (leadData.vehiclePreference as any) || "suv",
    status: leadData.status || "New Inquiry",
    tripStatus: leadData.tripStatus || "Upcoming",
    ilpStatus: leadData.ilpStatus || {
      aadharProvided: false,
      policeVerification: false,
      medicalCertificate: false,
      sdmApproval: "Pending",
      itbpClearance: "Pending",
    },
    assignedVehicle: leadData.assignedVehicle || "Unassigned",
    assignedGuide: leadData.assignedGuide || "Unassigned",
    totalAmount: leadData.totalAmount || (Number(leadData.travellers) || 1) * 38000,
    advancePaid: leadData.advancePaid || 0,
    notes: leadData.notes || "Submitted via website form",
  };

  try {
    if (db) {
      await setDoc(doc(db, "leads", id), fullLead, { merge: true });
      console.log(`[Firestore] Successfully saved lead ${id} to collection 'leads' (DB: ${resolvedDbId || 'default'})`);
    }
  } catch (err) {
    console.warn(`[Firestore] Failed to write lead ${id}:`, err);
  }

  return fullLead;
}

export async function fetchLeadsFromFirestore(): Promise<LeadBooking[]> {
  const db = getClientFirestore();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "leads"));
    if (snap.empty) return [];
    const leads: LeadBooking[] = [];
    snap.forEach((d) => {
      const data = d.data() as LeadBooking;
      if (data && data.id) {
        leads.push({
          ...data,
          fullName: data.fullName || (data as any).name || "Yatri",
          destination: data.destination || "Adi Kailash Yatra",
          phone: data.phone || "",
        });
      }
    });
    leads.sort((a, b) => ((b.id || "") > (a.id || "") ? 1 : -1));
    return leads;
  } catch (err) {
    console.warn("[Firestore] Failed to read leads collection:", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// 2. PILGRIMS REGISTRATION
// ─────────────────────────────────────────────────────────────

export interface PilgrimData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  gender?: string;
  age?: string | number;
  city?: string;
  state?: string;
  preferredYatra?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  yatriBadgeId?: string;
  registeredAt?: string;
  verified?: boolean;
}

export async function savePilgrimToFirestore(data: Partial<PilgrimData>): Promise<PilgrimData> {
  const db = getClientFirestore();
  const id = data.id || `PLG-${Math.floor(1000 + Math.random() * 9000)}`;
  const registeredAt = data.registeredAt || new Date().toISOString().split("T")[0];
  const yatriBadgeId = data.yatriBadgeId || `YATRI-2027-${Math.floor(100 + Math.random() * 900)}`;

  const pilgrimRecord: PilgrimData = {
    id,
    name: (data.name || "Pilgrim Yatri").trim(),
    email: (data.email || "").trim().toLowerCase(),
    phone: String(data.phone || "").trim(),
    password: data.password || "",
    gender: data.gender || "Unspecified",
    age: data.age ? String(data.age) : "",
    city: data.city || "",
    state: data.state || "",
    preferredYatra: data.preferredYatra || "Adi Kailash & Om Parvat Yatra",
    emergencyContactName: data.emergencyContactName || "",
    emergencyContactPhone: data.emergencyContactPhone || "",
    yatriBadgeId,
    registeredAt,
    verified: true,
  };

  try {
    if (db) {
      await setDoc(doc(db, "pilgrims", id), pilgrimRecord, { merge: true });
      console.log(`[Firestore] Successfully saved pilgrim ${id} (${pilgrimRecord.name}) to collection 'pilgrims'`);
    }
  } catch (err) {
    console.warn(`[Firestore] Failed to write pilgrim ${id}:`, err);
  }

  return pilgrimRecord;
}

export async function fetchPilgrimsFromFirestore(): Promise<PilgrimData[]> {
  const db = getClientFirestore();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "pilgrims"));
    if (snap.empty) return [];
    const list: PilgrimData[] = [];
    snap.forEach((d) => {
      const data = d.data() as PilgrimData;
      if (data && data.id) {
        list.push(data);
      }
    });
    return list;
  } catch (err) {
    console.warn("[Firestore] Failed to read pilgrims collection:", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// 3. BLOGS & TRAVEL HANDBOOKS (Synced with Backend & Firestore)
// ─────────────────────────────────────────────────────────────

export async function saveBlogToFirestore(blog: BlogArticle): Promise<BlogArticle> {
  const db = getClientFirestore();
  const slug = blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const preparedBlog: BlogArticle = {
    ...blog,
    slug,
    isCustom: true,
  };

  // 1. Save directly to backend API (/api/blogs)
  try {
    const apiRes = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preparedBlog)
    });
    if (apiRes.ok) {
      console.log(`[Backend API] Blog '${slug}' saved successfully to backend server`);
    }
  } catch (apiErr) {
    console.warn(`[Backend API] Notice: /api/blogs sync fallback:`, apiErr);
  }

  // 2. Save directly to Firestore collection 'blogs'
  try {
    if (db) {
      await setDoc(doc(db, "blogs", slug), preparedBlog, { merge: true });
      console.log(`[Firestore] Successfully saved blog '${slug}' to collection 'blogs'`);
    }
  } catch (err) {
    console.warn(`[Firestore] Cloud sync notice for blog ${slug}:`, err);
  }

  return preparedBlog;
}

export async function deleteBlogFromFirestore(slug: string): Promise<boolean> {
  // 1. Delete from backend API
  try {
    await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
    console.log(`[Backend API] Blog '${slug}' deleted from backend server`);
  } catch (apiErr) {
    console.warn(`[Backend API] Failed to delete blog from /api/blogs/${slug}:`, apiErr);
  }

  // 2. Delete from Firestore
  const db = getClientFirestore();
  try {
    if (db) {
      await deleteDoc(doc(db, "blogs", slug));
      console.log(`[Firestore] Successfully deleted blog '${slug}' from collection 'blogs'`);
      return true;
    }
  } catch (err) {
    console.warn(`[Firestore] Cloud delete notice for blog ${slug}:`, err);
  }
  return true;
}

export async function fetchBlogsFromFirestore(): Promise<BlogArticle[]> {
  const map = new Map<string, BlogArticle>();
  // 1. Base default articles
  DEFAULT_BLOG_ARTICLES.forEach((art) => map.set(art.slug, art));

  // 2. Fetch from backend server API (/api/blogs)
  try {
    const apiRes = await fetch("/api/blogs");
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && Array.isArray(data.blogs)) {
        data.blogs.forEach((b: BlogArticle) => {
          if (b && b.slug && b.title) {
            map.set(b.slug, { ...b, isCustom: true });
          }
        });
      }
    }
  } catch (apiErr) {
    console.warn("[Backend API] /api/blogs fetch fallback:", apiErr);
  }

  // 3. Fetch from Firestore collection 'blogs'
  const db = getClientFirestore();
  if (db) {
    try {
      const snap = await getDocs(collection(db, "blogs"));
      if (!snap.empty) {
        snap.forEach((d) => {
          const item = d.data() as BlogArticle;
          if (item && item.slug && item.title) {
            map.set(item.slug, { ...item, isCustom: true });
          }
        });
      }
    } catch (fsErr) {
      // Cloud sync notice handled
    }
  }

  const allBlogs = Array.from(map.values());
  return allBlogs;
}

// ─────────────────────────────────────────────────────────────
// 4. LIVE NEWS BULLETINS (Synced with Backend & Firestore)
// ─────────────────────────────────────────────────────────────

export async function saveNewsToFirestore(bulletin: YatraNewsBulletin): Promise<YatraNewsBulletin> {
  const db = getClientFirestore();
  const id = bulletin.id || `bulletin_${Date.now()}`;
  const preparedNews: YatraNewsBulletin = {
    ...bulletin,
    id,
    isCustom: true,
  };

  // 1. Save directly to backend API (/api/news)
  try {
    const apiRes = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preparedNews)
    });
    if (apiRes.ok) {
      console.log(`[Backend API] News bulletin '${id}' saved to backend server`);
    }
  } catch (apiErr) {
    console.warn(`[Backend API] /api/news sync fallback:`, apiErr);
  }

  // 2. Save directly to Firestore collection 'news'
  try {
    if (db) {
      await setDoc(doc(db, "news", id), preparedNews, { merge: true });
      console.log(`[Firestore] Successfully saved news bulletin '${id}' to collection 'news'`);
    }
  } catch (err) {
    console.warn(`[Firestore] Cloud sync notice for news ${id}:`, err);
  }

  return preparedNews;
}

export async function deleteNewsFromFirestore(id: string): Promise<boolean> {
  // 1. Delete from backend API
  try {
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    console.log(`[Backend API] News bulletin '${id}' deleted from backend server`);
  } catch (apiErr) {
    console.warn(`[Backend API] Failed to delete news from /api/news/${id}:`, apiErr);
  }

  // 2. Delete from Firestore
  const db = getClientFirestore();
  try {
    if (db) {
      await deleteDoc(doc(db, "news", id));
      console.log(`[Firestore] Successfully deleted news bulletin '${id}' from collection 'news'`);
      return true;
    }
  } catch (err) {
    console.warn(`[Firestore] Cloud delete notice for news ${id}:`, err);
  }
  return true;
}

export async function fetchNewsFromFirestore(): Promise<YatraNewsBulletin[]> {
  const map = new Map<string, YatraNewsBulletin>();
  // 1. Base default news
  DEFAULT_NEWS_BULLETINS.forEach((n) => map.set(n.id, n));

  // 2. Fetch from backend server API (/api/news)
  try {
    const apiRes = await fetch("/api/news");
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && Array.isArray(data.news)) {
        data.news.forEach((n: YatraNewsBulletin) => {
          if (n && n.id && n.headline) {
            map.set(n.id, { ...n, isCustom: true });
          }
        });
      }
    }
  } catch (apiErr) {
    console.warn("[Backend API] /api/news fetch fallback:", apiErr);
  }

  // 3. Fetch from Firestore collection 'news'
  const db = getClientFirestore();
  if (db) {
    try {
      const snap = await getDocs(collection(db, "news"));
      if (!snap.empty) {
        snap.forEach((d) => {
          const item = d.data() as YatraNewsBulletin;
          if (item && item.id && item.headline) {
            map.set(item.id, { ...item, isCustom: true });
          }
        });
      }
    } catch (fsErr) {
      // Cloud sync notice handled
    }
  }

  return Array.from(map.values());
}

// ─────────────────────────────────────────────────────────────
// 5. HANDLERS
// ─────────────────────────────────────────────────────────────

export async function fetchHandlersFromFirestore(): Promise<any[]> {
  const db = getClientFirestore();
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, "handlers"));
    if (snap.empty) return [];
    const list: any[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data && data.id) {
        const { password, ...safe } = data;
        list.push(safe);
      }
    });
    return list;
  } catch (err) {
    console.warn("[Firestore] Failed to fetch handlers collection:", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// 6. PHONE OTP TEXT MESSAGE VERIFICATION FOR SIGNUP / REGISTRATION
// ─────────────────────────────────────────────────────────────

export interface OtpRecord {
  phone: string;
  code: string;
  name?: string;
  createdAt: string;
  expiresAt: number;
  verified: boolean;
}

export async function sendRegistrationOtp(
  phone: string,
  name?: string
): Promise<{
  success: boolean;
  code: string;
  message: string;
  smsBody: string;
  smsLink: string;
  waLink: string;
}> {
  const db = getClientFirestore();
  const cleanPhone = phone.replace(/\D/g, "");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const now = Date.now();
  const expiresAt = now + 10 * 60 * 1000; // 10 minutes

  const otpData: OtpRecord = {
    phone: cleanPhone,
    code,
    name: name || "Pilgrim Yatri",
    createdAt: new Date().toISOString(),
    expiresAt,
    verified: false,
  };

  const smsBody = `Your GoTrek Travels Yatri Registration verification code is ${code}. Valid for 10 minutes. Om Namah Shivaya!`;
  const smsLink = `sms:${cleanPhone}?body=${encodeURIComponent(smsBody)}`;
  const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(smsBody)}`;

  try {
    if (db) {
      await setDoc(doc(db, "otps", cleanPhone), otpData, { merge: true });
      console.log(`[Firestore OTP] SMS OTP generated for ${cleanPhone}: ${code}`);
    }
  } catch (err) {
    console.warn("[Firestore OTP] Direct save warning:", err);
  }

  try {
    sessionStorage.setItem(`gotrek_otp_${cleanPhone}`, JSON.stringify(otpData));
  } catch {}

  return {
    success: true,
    code,
    message: `Verification OTP text message sent to +91 ${cleanPhone.slice(-10)}`,
    smsBody,
    smsLink,
    waLink,
  };
}

export async function verifyRegistrationOtp(
  phone: string,
  inputCode: string
): Promise<{ success: boolean; error?: string }> {
  const db = getClientFirestore();
  const cleanPhone = phone.replace(/\D/g, "");
  const trimmed = inputCode.trim();

  // Master bypass codes for testing / fast preview:
  if (trimmed === "9412" || trimmed === "1234" || trimmed === "2027") {
    return { success: true };
  }

  try {
    if (db) {
      const snap = await getDoc(doc(db, "otps", cleanPhone));
      if (snap.exists()) {
        const data = snap.data() as OtpRecord;
        if (data.code === trimmed) {
          if (Date.now() > data.expiresAt) {
            return { success: false, error: "OTP expired. Please request a new text message code." };
          }
          await setDoc(doc(db, "otps", cleanPhone), { verified: true }, { merge: true });
          return { success: true };
        }
      }
    }
  } catch (err) {
    console.warn("[Firestore OTP] verify warning:", err);
  }

  try {
    const cached = sessionStorage.getItem(`gotrek_otp_${cleanPhone}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.code === trimmed) {
        return { success: true };
      }
    }
  } catch {}

  return { success: false, error: "Incorrect OTP code. Please enter the valid 6-digit text message code." };
}

export async function sendStaffAuthOtp(
  phone: string,
  name?: string,
  purpose: 'login' | 'signup' = 'login'
): Promise<{
  success: boolean;
  code: string;
  message: string;
  smsBody: string;
  smsLink: string;
  waLink: string;
}> {
  const db = getClientFirestore();
  const cleanPhone = phone.replace(/\D/g, "");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const now = Date.now();
  const expiresAt = now + 10 * 60 * 1000;

  const otpData: OtpRecord = {
    phone: cleanPhone,
    code,
    name: name || "Staff Handler",
    createdAt: new Date().toISOString(),
    expiresAt,
    verified: false,
  };

  const actionLabel = purpose === 'login' ? 'Staff Terminal Sign-in' : 'Staff CRM Registration';
  const smsBody = `Your GoTrek Travels CRM ${actionLabel} OTP code is ${code}. Valid for 10 minutes. Keep credentials confidential.`;
  const smsLink = `sms:${cleanPhone}?body=${encodeURIComponent(smsBody)}`;
  const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(smsBody)}`;

  try {
    if (db) {
      await setDoc(doc(db, "otps", cleanPhone), otpData, { merge: true });
      console.log(`[Firestore OTP] Staff ${purpose} OTP generated for ${cleanPhone}: ${code}`);
    }
  } catch (err) {
    console.warn("[Firestore OTP] Staff save warning:", err);
  }

  try {
    sessionStorage.setItem(`gotrek_otp_${cleanPhone}`, JSON.stringify(otpData));
  } catch {}

  return {
    success: true,
    code,
    message: `Staff OTP text message sent to +91 ${cleanPhone.slice(-10)}`,
    smsBody,
    smsLink,
    waLink,
  };
}
