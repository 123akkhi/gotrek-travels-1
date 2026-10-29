import React, { useState, useEffect } from "react";
import { WifiOff, DownloadCloud, Mountain, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { listenToNetworkChanges } from "../utils/serviceWorkerRegistration";
import { getOfflineCacheStatus } from "../utils/offlineTrekStorage";

export const OfflineTrekBar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const cacheStatus = getOfflineCacheStatus();

  useEffect(() => {
    const cleanup = listenToNetworkChanges((online) => {
      setIsOnline(online);
      if (!online) {
        setIsDismissed(false); // Re-open on network loss
      }
    });
    return cleanup;
  }, []);

  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Offline Mode Notification"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-white shadow-2xl space-y-2.5 crisp-dialog"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <WifiOff size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Offline Trek Mode Active
                </h4>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Zero network detected in Vyas Valley.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Dismiss offline banner"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[11px] text-slate-300">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 size={13} />
            <span>Cached Route & Altitude Available</span>
          </div>

          <a
            href="#route"
            onClick={() => setIsDismissed(true)}
            className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider transition-colors"
          >
            View Map
          </a>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
