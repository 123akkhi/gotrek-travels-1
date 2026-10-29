import React, { useState, useEffect, memo, useMemo } from "react";
import { 
  Navigation, 
  Mountain, 
  Clock, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  DownloadCloud, 
  HardDrive, 
  Radio, 
  AlertTriangle, 
  PhoneCall, 
  Compass, 
  ShieldCheck,
  Activity,
  Layers,
  MapPin,
  HeartPulse,
  RefreshCw,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  getOfflineTrekData, 
  saveTrekDataOffline, 
  getOfflineCacheStatus, 
  OfflineTrekData, 
  TrekCheckpoint 
} from "../utils/offlineTrekStorage";
import { listenToNetworkChanges } from "../utils/serviceWorkerRegistration";

type ViewMode = "itinerary" | "altitude";

export const RouteMap = memo(() => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>("itinerary");
  const [selectedCheckpointId, setSelectedCheckpointId] = useState<string>("cp-jolingkong");
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [cacheStatus, setCacheStatus] = useState(getOfflineCacheStatus());
  const [isDownloadingCache, setIsDownloadingCache] = useState(false);
  const [cacheSuccessMessage, setCacheSuccessMessage] = useState<string | null>(null);

  // Load offline data from localStorage / default
  const trekData: OfflineTrekData = useMemo(() => getOfflineTrekData(), []);

  useEffect(() => {
    const cleanup = listenToNetworkChanges((online) => {
      setIsOnline(online);
    });
    return cleanup;
  }, []);

  const handleCacheOffline = () => {
    setIsDownloadingCache(true);
    setTimeout(() => {
      const success = saveTrekDataOffline(trekData);
      setCacheStatus(getOfflineCacheStatus());
      setIsDownloadingCache(false);
      if (success) {
        setCacheSuccessMessage("Route Map & Altitude charts cached 100% offline in browser storage!");
        setTimeout(() => setCacheSuccessMessage(null), 4000);
      }
    }, 600);
  };

  const currentItinerary = useMemo(() => {
    return trekData.itinerarySummary.find((d) => d.day === activeDay) || trekData.itinerarySummary[0];
  }, [trekData, activeDay]);

  const selectedCheckpoint = useMemo(() => {
    return trekData.checkpoints.find((cp) => cp.id === selectedCheckpointId) || trekData.checkpoints[7];
  }, [trekData, selectedCheckpointId]);

  // Max altitude for chart normalization
  const maxAlt = 15500;

  return (
    <section id="route" className="py-20 bg-[#FDFBF7] relative border-t border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Offline & Service Worker Status Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-white border border-[#E6E2D3] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isOnline ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
              {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <h4 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                  {isOnline ? "Online Network Active" : "Offline Trek Mode Engaged (Zero Network Zone)"}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  Vyas Valley Ready
                </span>
              </div>
              <p className="text-xs text-[#5A5A40] mt-0.5">
                {cacheStatus.isCached 
                  ? "Local storage cache & Service Worker active. Full day-by-day maps, altitude profiles, and SOS guides are accessible offline." 
                  : "Cache route & altitude data now to access high-altitude maps without mobile reception."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              id="cache-offline-trek-pack-btn"
              onClick={handleCacheOffline}
              disabled={isDownloadingCache}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 focus-visible:ring-2 focus-visible:ring-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-75"
            >
              {isDownloadingCache ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Caching Offline...</span>
                </>
              ) : (
                <>
                  <DownloadCloud size={15} />
                  <span>{cacheStatus.isCached ? "Re-sync Offline Pack" : "Save Offline for Trek"}</span>
                </>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F2ED] border border-[#E6E2D3] text-[11px] font-semibold text-[#5A5A40]">
              <HardDrive size={13} className="text-amber-800" />
              <span>Storage: Ready</span>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {cacheSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-2xs"
            >
              <FileCheck size={18} className="text-emerald-700 shrink-0" />
              <span>{cacheSuccessMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Navigation size={14} className="text-amber-700 animate-spin-slow" />
            <span>Sacred Vyas Valley Circuit & Altitude Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
            Day-by-Day <span className="text-amber-800 font-extrabold">Route & Altitude Guide</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            From the foothills of Kathgodam (1,700 ft) to the alpine sanctuary of Parvati Sarovar & Jolingkong (14,900 ft).
          </p>
        </div>

        {/* Main View Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-1.5 rounded-2xl bg-white border border-[#E6E2D3] inline-flex items-center gap-1 shadow-2xs">
            <button
              type="button"
              id="tab-itinerary-view"
              onClick={() => setViewMode("itinerary")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === "itinerary"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-[#5A5A40] hover:text-[#1E293B] hover:bg-[#F5F2ED]"
              }`}
            >
              <Compass size={15} />
              <span>Day Itinerary</span>
            </button>

            <button
              type="button"
              id="tab-altitude-view"
              onClick={() => setViewMode("altitude")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === "altitude"
                  ? "bg-amber-800 text-white shadow-xs"
                  : "text-[#5A5A40] hover:text-[#1E293B] hover:bg-[#F5F2ED]"
              }`}
            >
              <Mountain size={15} />
              <span>Altitude & Oxygen Profile</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: DAY-BY-DAY ROUTE ITINERARY */}
        {viewMode === "itinerary" && (
          <div className="space-y-6">
            {/* Days Tabs Header */}
            <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
              {trekData.itinerarySummary.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  id={`btn-day-tab-${d.day}`}
                  onClick={() => setActiveDay(d.day)}
                  className={`relative px-5 py-3 rounded-full font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                    activeDay === d.day
                      ? "bg-[#5A5A40] text-white shadow-md font-bold scale-105"
                      : "bg-white border border-[#E6E2D3] text-[#1E293B] hover:bg-[#F5F2ED]"
                  }`}
                >
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${activeDay === d.day ? "bg-amber-400 text-slate-950 font-black" : "bg-[#F5F2ED] text-[#1E293B]"}`}>
                    {d.day}
                  </span>
                  <span>Day {d.day}</span>
                </button>
              ))}
            </div>

            {/* Day Detail Card with Motion Slide */}
            <div className="p-5 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[32px] bg-white border border-[#E6E2D3] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center overflow-hidden">
              {/* Day info */}
              <div className="lg:col-span-7 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
                        Day {currentItinerary.day} Itinerary
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#1E293B] font-bold bg-[#F5F2ED] px-3 py-1 rounded-full border border-[#E6E2D3]">
                        <Mountain size={14} className="text-amber-700" />
                        <span>Altitude: {currentItinerary.altitude}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#1E293B] font-bold bg-[#F5F2ED] px-3 py-1 rounded-full border border-[#E6E2D3]">
                        <Clock size={14} className="text-amber-700" />
                        <span>Distance: {currentItinerary.distance}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] leading-snug">
                      {currentItinerary.title}
                    </h3>

                    <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E6E2D3] text-xs text-[#1E293B] font-medium flex items-center gap-2">
                      <MapPin size={15} className="text-amber-800 shrink-0" />
                      <span><strong>Transit Route:</strong> {currentItinerary.route}</span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-dashed border-[#E6E2D3]">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                        Overnight Halt & Safety Protocol:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1E293B]">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-amber-700 shrink-0 mt-0.5" />
                          <span><strong>Stay:</strong> {currentItinerary.stay}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span><strong>Safety:</strong> {currentItinerary.keySafetyNote}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Graphical Elevation Card */}
              <div className="lg:col-span-5 p-6 rounded-[24px] bg-[#F5F2ED] border border-[#E6E2D3] space-y-4 text-center">
                <div className="text-[10px] font-bold uppercase text-[#5A5A40] tracking-widest flex items-center justify-center gap-1.5">
                  <Activity size={13} className="text-amber-700" />
                  <span>Altitude Profile: Day {activeDay} of 5</span>
                </div>

                <div className="relative h-48 w-full bg-white rounded-2xl p-4 flex flex-col justify-between border border-[#E6E2D3]">
                  <div className="flex justify-between text-[9px] text-[#5A5A40] font-bold uppercase tracking-wider">
                    <span>Kathgodam (1.7k ft)</span>
                    <span>Gunji (10.5k ft)</span>
                    <span>Parvati Sarovar (14.9k ft)</span>
                  </div>

                  {/* Visual Step Bars */}
                  <div className="flex items-end justify-between px-2 h-24">
                    {trekData.itinerarySummary.map((step) => (
                      <button
                        key={step.day}
                        type="button"
                        onClick={() => setActiveDay(step.day)}
                        className="flex flex-col items-center gap-1.5 group cursor-pointer"
                      >
                        <motion.div
                          animate={{ height: `${step.day * 16 + 18}px` }}
                          transition={{ duration: 0.3 }}
                          className={`w-4 rounded-t transition-colors ${
                            step.day <= activeDay ? "bg-amber-700 group-hover:bg-amber-800" : "bg-[#E6E2D3]"
                          }`}
                        />
                        <span className={`text-[10px] font-black ${step.day === activeDay ? "text-amber-800" : "text-[#5A5A40]"}`}>
                          D{step.day}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#5A5A40] font-medium italic">
                    All-Terrain 4x4 Bolero / SUV Transport + Local Rung Guides
                  </div>
                </div>

                <div className="text-xs text-[#5A5A40] font-medium leading-relaxed">
                  Inner Line Permits cleared at Dharchula SDM office cover Pangla, Gunji, Nabi, Jolingkong & Nabhidhang.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE HIGH-ALTITUDE & OXYGEN CHART */}
        {viewMode === "altitude" && (
          <div className="space-y-6">
            {/* Elevation SVG Chart Container */}
            <div className="p-5 sm:p-8 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B]">
                    High-Altitude Elevation & Oxygen Saturation Curve
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5A40]">
                    Select any checkpoint along the Vyas Valley circuit to view elevation, oxygen %, and cell reception status.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Max Peak: 14,900 ft
                  </span>
                </div>
              </div>

              {/* Interactive Elevation Checkpoints Grid / SVG Graph */}
              <div className="relative overflow-x-auto pb-4">
                <div className="min-w-[700px] bg-[#FDFBF7] p-6 rounded-2xl border border-[#E6E2D3] space-y-6">
                  {/* Oxygen Saturation Indicator Header */}
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold uppercase tracking-wider pb-2 border-b border-[#E6E2D3]">
                    <div className="text-emerald-800">Kathgodam (96% O₂)</div>
                    <div className="text-emerald-700">Dharchula (92% O₂)</div>
                    <div className="text-amber-700">Chialekh (74% O₂)</div>
                    <div className="text-amber-800">Gunji/Nabi (70% O₂)</div>
                    <div className="text-red-700">Jolingkong/Parvati (57% O₂)</div>
                  </div>

                  {/* Visual Elevation Curve Graph */}
                  <div className="h-44 relative flex items-end justify-between px-4 pt-6">
                    {/* Background grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
                      <div className="border-b border-dashed border-slate-400 text-[9px] text-slate-500 pl-1">15,000 ft (Parvati Sarovar)</div>
                      <div className="border-b border-dashed border-slate-400 text-[9px] text-slate-500 pl-1">10,000 ft (Gunji Acclimatization)</div>
                      <div className="border-b border-dashed border-slate-400 text-[9px] text-slate-500 pl-1">5,000 ft (Bhowali / Kainchi)</div>
                      <div className="border-b border-dashed border-slate-400 text-[9px] text-slate-500 pl-1">1,700 ft (Kathgodam)</div>
                    </div>

                    {/* Interactive Checkpoint Nodes */}
                    {trekData.checkpoints.map((cp, idx) => {
                      const heightPercent = Math.round((cp.altitudeFt / maxAlt) * 100);
                      const isSelected = cp.id === selectedCheckpointId;

                      return (
                        <button
                          key={cp.id}
                          type="button"
                          id={`node-${cp.id}`}
                          onClick={() => setSelectedCheckpointId(cp.id)}
                          className="relative flex flex-col items-center group z-10 cursor-pointer focus:outline-hidden"
                        >
                          {/* Floating altitude tag on hover / select */}
                          <div className={`mb-2 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all ${
                            isSelected 
                              ? "bg-amber-800 text-white shadow-xs scale-110" 
                              : "bg-white text-slate-700 border border-slate-300 opacity-80 group-hover:opacity-100"
                          }`}>
                            {cp.altitudeFt.toLocaleString()} ft
                          </div>

                          {/* Node Pillar */}
                          <div 
                            style={{ height: `${heightPercent * 1.1}px` }} 
                            className={`w-6 rounded-t-lg transition-all flex items-start justify-center pt-1.5 ${
                              isSelected
                                ? "bg-linear-to-t from-amber-600 to-amber-800 shadow-md ring-2 ring-amber-400"
                                : cp.altitudeFt > 12000
                                ? "bg-linear-to-t from-red-600/70 to-red-800/80 group-hover:opacity-100 opacity-85"
                                : cp.altitudeFt > 8000
                                ? "bg-linear-to-t from-amber-600/70 to-amber-800/80 group-hover:opacity-100 opacity-85"
                                : "bg-linear-to-t from-emerald-600/70 to-emerald-800/80 group-hover:opacity-100 opacity-85"
                            }`}
                          >
                            <span className="text-[9px] font-black text-white">#{idx + 1}</span>
                          </div>

                          {/* Node label */}
                          <span className={`mt-2 text-[10px] font-bold max-w-[65px] text-center leading-tight line-clamp-2 ${
                            isSelected ? "text-amber-900 underline" : "text-slate-700"
                          }`}>
                            {cp.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Checkpoint Deep-Dive Card */}
              <div className="p-6 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-amber-800 text-white text-[10px] font-bold uppercase tracking-wider">
                      Day {selectedCheckpoint.day} Milestone
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedCheckpoint.acclimatizationZone.includes("Red")
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : selectedCheckpoint.acclimatizationZone.includes("Orange")
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}>
                      Zone: {selectedCheckpoint.acclimatizationZone}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-[#1E293B]">
                    {selectedCheckpoint.name}
                  </h4>

                  <p className="text-xs text-[#5A5A40] leading-relaxed">
                    <strong>Trekker Tip:</strong> {selectedCheckpoint.tips}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#1E293B]">
                    <div><strong>Distance from Start:</strong> {selectedCheckpoint.distanceFromStartKm} km</div>
                    <div><strong>Coordinates:</strong> {selectedCheckpoint.latitude}° N, {selectedCheckpoint.longitude}° E</div>
                    <div><strong>Medical:</strong> {selectedCheckpoint.medicalFacility}</div>
                  </div>
                </div>

                {/* Oxygen & Network Gauge */}
                <div className="p-4 rounded-xl bg-white border border-[#E6E2D3] space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1">
                      <span>Atmospheric Oxygen</span>
                      <span className="text-amber-800">{selectedCheckpoint.oxygenLevelPercent}% of Sea Level</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${selectedCheckpoint.oxygenLevelPercent}%` }} 
                        className={`h-full rounded-full ${
                          selectedCheckpoint.oxygenLevelPercent < 65 
                            ? "bg-red-500" 
                            : selectedCheckpoint.oxygenLevelPercent < 80 
                            ? "bg-amber-500" 
                            : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Cellular Reception
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      {selectedCheckpoint.networkStatus.includes("Strong") ? (
                        <Wifi size={14} className="text-emerald-600" />
                      ) : selectedCheckpoint.networkStatus.includes("Intermittent") ? (
                        <Wifi size={14} className="text-amber-600" />
                      ) : (
                        <WifiOff size={14} className="text-red-600" />
                      )}
                      <span>{selectedCheckpoint.networkStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
});

RouteMap.displayName = "RouteMap";
