import { collection, getDocs } from "firebase/firestore";
import { getServerlessDb } from "./firebase.js";

export { getServerlessDb };

export interface ServerlessHandlerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  badgeId: string;
  station: string;
  status: "Active" | "On Duty" | "Off Duty" | "Pending Verification";
  verificationCode?: string;
  createdAt: string;
}

export const DEFAULT_SERVERLESS_HANDLERS: ServerlessHandlerAccount[] = [
  {
    id: "HND-01",
    name: "GoTrek Travels Admin",
    email: "mailgotrek@gmail.com",
    phone: "7248285767",
    password: "admin",
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
    password: "admin",
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
    password: "admin",
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
    password: "fleet",
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
    password: "guide",
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
    password: "permit",
    role: "SDM Permit Liaison Officer",
    badgeId: "GT-SDM-09",
    station: "SDM Office Dharchula",
    status: "Active",
    createdAt: "2027-02-15",
  },
];

export async function loadHandlersList(db: ReturnType<typeof getServerlessDb>): Promise<ServerlessHandlerAccount[]> {
  if (!db) return DEFAULT_SERVERLESS_HANDLERS;
  try {
    const snap = await getDocs(collection(db, "handlers"));
    if (!snap.empty) {
      const list: ServerlessHandlerAccount[] = [];
      snap.forEach((d) => {
        const item = d.data() as ServerlessHandlerAccount;
        if (item && item.email?.toLowerCase() !== "akshayra987@gmail.com") {
          list.push(item);
        }
      });
      if (list.length > 0) return list;
    }
  } catch (err) {
    console.warn("Vercel handlers fetch warning:", err);
  }
  return DEFAULT_SERVERLESS_HANDLERS;
}

export function findHandlerByIdentifier(
  handlers: ServerlessHandlerAccount[],
  identifier: string
): ServerlessHandlerAccount | undefined {
  const cleanId = String(identifier || "").trim().toLowerCase();
  const cleanDigits = cleanId.replace(/\D/g, "");
  const cleanTen = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;
  return handlers.find((h) => {
    const hDigits = String(h.phone || "").replace(/\D/g, "");
    const hTen = hDigits.length >= 10 ? hDigits.slice(-10) : hDigits;
    return (
      h.email.toLowerCase() === cleanId ||
      h.phone.trim() === cleanId ||
      (cleanDigits && hDigits === cleanDigits) ||
      (cleanTen.length === 10 && hTen === cleanTen)
    );
  });
}
