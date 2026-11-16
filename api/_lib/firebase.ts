import fs from "fs";
import path from "path";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const DEFAULT_FIREBASE_CONFIG = {
  projectId: "gotrek-travels",
  appId: "1:42157767715:web:8383d5f8a3374d9b434596",
  apiKey: "AIzaSyCuCFgHEMNPO3YUdCHUaZ1K32_Fx1Owxm8",
  authDomain: "gotrek-travels.firebaseapp.com",
  firestoreDatabaseId: "default",
  storageBucket: "gotrek-travels.firebasestorage.app",
  messagingSenderId: "42157767715",
  measurementId: "G-KFHH5B8EKH",
};

function loadFirebaseConfig() {
  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (parsed && parsed.projectId) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[Vercel Firebase] Could not read firebase-applet-config.json from cwd:", err);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function getServerlessDb() {
  try {
    const firebaseConfig = loadFirebaseConfig();
    const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const resolvedDbId =
      firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)"
        ? firebaseConfig.firestoreDatabaseId
        : firebaseConfig.projectId === "gotrek-travels"
        ? "default"
        : undefined;
    try {
      return resolvedDbId
        ? initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true }, resolvedDbId)
        : initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
    } catch {
      return resolvedDbId ? getFirestore(firebaseApp, resolvedDbId) : getFirestore(firebaseApp);
    }
  } catch (err) {
    console.warn("Vercel Firebase initialization warning:", err);
    return null;
  }
}