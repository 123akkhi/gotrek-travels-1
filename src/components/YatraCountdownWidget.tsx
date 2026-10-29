import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
  Users,
  Compass
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export interface YatraBatchTarget {
  id: string;
  name: string;
  nameHi: string;
  circuit: string;
  targetDate: string; // ISO string or parsable date
  totalSeats: number;
  remainingSeats: number;
  permitDeadlineDays: number;
  highlight: string;
  highlightHi: string;
  altitude: string;
  startingPrice: string;
}

const UPCOMING_BATCHES: YatraBatchTarget[] = [
  {
    id: "adi-kailash-autumn",
    name: "Adi Kailash & Om Parvat Autumn Grand Batch",
    nameHi: "आदि कैलाश व ॐ पर्वत शरद ऋतु महा-बैच",
    circuit: "Dharchula → Gunji → Jolingkong → Nabhidhang",
    targetDate: "2027-09-12T06:00:00+05:30",
    totalSeats: 16,
    remainingSeats: 4,
    permitDeadlineDays: 10,
    highlight: "Crystal Clear Autumn Skies & Golden Peak Darshan",
    highlightHi: "शरद ऋतु का साफ़ नीला आकाश व स्वर्णिम शिखर दर्शन",
    altitude: "14,500 FT",
    startingPrice: "₹28,500"
  },
  {
    id: "om-parvat-special",
    name: "Om Parvat Sacred Sunrise & Nabi Heritage",
    nameHi: "ॐ पर्वत सूर्योदय दर्शन व नाबी हेरिटेज",
    circuit: "Dharchula → Nabi Village → Nabhidhang Om View",
    targetDate: "2027-09-22T05:30:00+05:30",
    totalSeats: 14,
    remainingSeats: 5,
    permitDeadlineDays: 12,
    highlight: "Natural Etched Snow 'ॐ' Sunrise Darshan",
    highlightHi: "बर्फ पर प्राकृतिक रूप से उकेरे 'ॐ' का पावन सूर्योदय",
    altitude: "14,000 FT",
    startingPrice: "₹25,000"
  },
  {
    id: "vip-helicopter-batch",
    name: "VIP Luxury Helicopter Darshan Expedition",
    nameHi: "वीआईपी हेलीकॉप्टर दर्शन विशेष यात्रा",
    circuit: "Pithoragarh / Haldwani → Gunji → Jolingkong VIP",
    targetDate: "2027-09-18T07:00:00+05:30",
    totalSeats: 8,
    remainingSeats: 2,
    permitDeadlineDays: 7,
    highlight: "Aerial Darshan of Panchachuli & Lipulekh Pass",
    highlightHi: "पंचाचूली शिखरों व लिपुलेख दर्रे का विहंगम दर्शन",
    altitude: "15,200 FT",
    startingPrice: "₹85,000"
  },
  {
    id: "navratri-kailash-batch",
    name: "Navratri Divine Kailash & Gauri Kund Special",
    nameHi: "नवरात्रि विशेष आदि कैलाश व गौरी कुंड यात्रा",
    circuit: "Dharchula → Gunji → Parvati Sarovar → Gauri Kund",
    targetDate: "2027-10-06T06:00:00+05:30",
    totalSeats: 18,
    remainingSeats: 7,
    permitDeadlineDays: 14,
    highlight: "Special Navratri Puja at Parvati Sarovar",
    highlightHi: "पार्वती सरोवर तट पर विशेष नवरात्रि पूजा व अर्चना",
    altitude: "14,500 FT",
    startingPrice: "₹29,999"
  },
  {
    id: "char-dham-autumn",
    name: "Char Dham Mahayatra Autumn Circuit",
    nameHi: "चार धाम महायात्रा शरद सर्किट 2027",
    circuit: "Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath",
    targetDate: "2027-09-28T05:00:00+05:30",
    totalSeats: 20,
    remainingSeats: 6,
    permitDeadlineDays: 8,
    highlight: "VIP Darshan e-Pass & Kedarnath Heli Assist",
    highlightHi: "वीआईपी दर्शन ई-पास व केदारनाथ हेलीकॉप्टर सुविधा",
    altitude: "11,755 FT",
    startingPrice: "₹34,500"
  }
];

interface YatraCountdownWidgetProps {
  onOpenInquiry: (subject?: string) => void;
  className?: string;
}

interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const YatraCountdownWidget = memo(({ onOpenInquiry, className = "" }: YatraCountdownWidgetProps) => {
  const { language } = useLanguage();
  const [selectedBatchId, setSelectedBatchId] = useState<string>(UPCOMING_BATCHES[0].id);
  const [now, setNow] = useState<Date>(new Date());
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track viewport visibility so clock only ticks when user is actually viewing the widget
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Tick clock only when in view and tab is active to save CPU and reduce refresh rate
  useEffect(() => {
    if (!isInView) return;

    // Refresh time on entering view
    setNow(new Date());

    let timer: ReturnType<typeof setInterval> | null = null;
    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => {
          if (!document.hidden) {
            setNow(new Date());
          }
        }, 1000);
      }
    };
    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    startTimer();
    const handleVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        setNow(new Date());
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isInView]);

  const currentBatch = useMemo(() => {
    return UPCOMING_BATCHES.find((b) => b.id === selectedBatchId) || UPCOMING_BATCHES[0];
  }, [selectedBatchId]);

  // Compute countdown relative to current batch target
  const timeRemaining: TimeRemaining = useMemo(() => {
    let target = new Date(currentBatch.targetDate).getTime();
    const currentMs = now.getTime();
    let diff = target - currentMs;

    // If target has passed in demo or real-time, compute a dynamic positive target for realism
    if (diff <= 0) {
      // Offset to an upcoming date in season
      target = currentMs + (18 * 24 * 3600 * 1000) + (7 * 3600 * 1000) + (42 * 60 * 1000);
      diff = target - currentMs;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      totalMs: diff,
      days,
      hours,
      minutes,
      seconds,
      isPast: diff <= 0
    };
  }, [currentBatch, now]);

  const batchName = language === "hi" ? currentBatch.nameHi : currentBatch.name;
  const batchHighlight = language === "hi" ? currentBatch.highlightHi : currentBatch.highlight;

  // Format display date
  const formattedDate = useMemo(() => {
    try {
      const d = new Date(currentBatch.targetDate);
      return d.toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "Sept 12, 2027";
    }
  }, [currentBatch.targetDate, language]);

  return (
    <div ref={containerRef} className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="relative rounded-3xl sm:rounded-[32px] bg-gradient-to-b from-[#FAF8F5] to-[#F3EFEA] border-2 border-amber-300/70 p-5 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
        {/* Decorative Golden Ambient Backing Aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sacred Om Watermark */}
        <div className="absolute -right-6 -bottom-8 select-none pointer-events-none opacity-[0.04] text-amber-950 font-serif text-[180px] leading-none">
          ॐ
        </div>

        <div className="relative z-10 space-y-6 sm:space-y-8">
          {/* Header Row: Title, Batch Tabs, Live Season Tag */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] shadow-2xs">
                <Flame size={13} className="text-amber-700 animate-bounce" />
                <span>{language === "hi" ? "2027 यात्रा सीजन काउंटडाउन" : "2027 Yatra Season Live Countdown"}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E293B] tracking-tight">
                {language === "hi" ? "आगामी यात्रा प्रस्थान" : "Days to Upcoming"}{" "}
                <span className="text-amber-800 font-bold">
                  {language === "hi" ? "पावन तिथियां 2027" : "Yatra Departures"}
                </span>
              </h3>
            </div>

            {/* Quick Batch Filter Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline-block">
                {language === "hi" ? "बैच चुनें:" : "Select Batch:"}
              </span>
              {UPCOMING_BATCHES.map((b) => {
                const isSelected = b.id === selectedBatchId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBatchId(b.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.97] ${
                      isSelected
                        ? "bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-md border border-red-400 -translate-y-0.5"
                        : "bg-white/90 text-slate-700 hover:bg-amber-50 border border-amber-200/70 hover:border-amber-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-amber-300" : "bg-slate-400"}`} />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">
                      {b.id.includes("helicopter")
                        ? "VIP Heli"
                        : b.id.includes("char-dham")
                        ? "Char Dham"
                        : b.id.includes("navratri")
                        ? "Navratri Special"
                        : b.id.includes("om-parvat")
                        ? "Om Parvat"
                        : "Adi Kailash"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Grid: Countdown Digits Box + Selected Yatra Batch Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left/Center: Dynamic 4-Unit Countdown Clock */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                {/* DAYS UNIT */}
                <div className="rounded-2xl sm:rounded-3xl bg-white border border-amber-200/80 p-3 sm:p-5 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#DC2626]" />
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tabular-nums text-slate-900 tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                    {String(timeRemaining.days).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#DC2626]">
                    {language === "hi" ? "दिन" : "Days"}
                  </div>
                </div>

                {/* HOURS UNIT */}
                <div className="rounded-2xl sm:rounded-3xl bg-white border border-amber-200/80 p-3 sm:p-5 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#DC2626]" />
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tabular-nums text-slate-900 tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                    {String(timeRemaining.hours).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#DC2626]">
                    {language === "hi" ? "घंटे" : "Hours"}
                  </div>
                </div>

                {/* MINUTES UNIT */}
                <div className="rounded-2xl sm:rounded-3xl bg-white border border-amber-200/80 p-3 sm:p-5 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#DC2626]" />
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tabular-nums text-slate-900 tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                    {String(timeRemaining.minutes).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#DC2626]">
                    {language === "hi" ? "मिनट" : "Minutes"}
                  </div>
                </div>

                {/* SECONDS UNIT */}
                <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-amber-400 p-3 sm:p-5 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group bg-gradient-to-b from-amber-50/50 to-white">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#DC2626]" />
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tabular-nums text-[#DC2626] tracking-tight leading-none animate-pulse">
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-800 flex items-center justify-center gap-1">
                    <Clock size={11} />
                    <span>{language === "hi" ? "सेकंड" : "Secs"}</span>
                  </div>
                </div>
              </div>

              {/* Urgency & Permit Clearance Progress Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-[#060E1D] via-[#0E1F3D] to-[#162B50] border border-amber-400/40 text-amber-50 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
                <div className="flex items-center gap-2.5">
                  <AlertCircle size={18} className="text-amber-300 shrink-0 animate-pulse" />
                  <span className="font-medium leading-tight">
                    {language === "hi" ? (
                      <>
                        <strong className="text-amber-300 font-bold">इनर लाइन परमिट (ILP) कटऑफ:</strong> एसडीएम धारचूला से परमिट स्वीकृति में 7-10 दिन लगते हैं।
                      </>
                    ) : (
                      <>
                        <strong className="text-amber-300 font-bold">Inner Line Permit (ILP) Processing:</strong> SDM Dharchula permits require 7-10 working days.
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="px-3 py-1 rounded-full bg-[#DC2626] border border-red-400 text-white text-[11px] font-mono font-black shadow-xs">
                    ⚡ {currentBatch.remainingSeats} {language === "hi" ? "सीटें शेष" : "Seats Left"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Selected Batch Highlights & Fast Registration Card */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBatch.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-amber-200 p-5 sm:p-6 shadow-md space-y-4 text-left"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-amber-700" />
                      <span className="text-xs font-bold text-slate-900">
                        {language === "hi" ? "प्रस्थान तिथि:" : "Departure Date:"} {formattedDate}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {currentBatch.altitude}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                      {batchName}
                    </h4>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin size={13} className="text-amber-700 shrink-0 mt-0.5" />
                      <span>{currentBatch.circuit}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-700 shrink-0" />
                    <span className="font-medium text-[11px] sm:text-xs">{batchHighlight}</span>
                  </div>

                  {/* Seat Availability Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-amber-700" />
                        <span>{language === "hi" ? "बैच क्षमता" : "Batch Filling Status"}</span>
                      </span>
                      <span className="text-amber-900 font-mono font-bold">
                        {currentBatch.totalSeats - currentBatch.remainingSeats} / {currentBatch.totalSeats} {language === "hi" ? "यात्री बुक" : "Booked"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 via-amber-600 to-[#DC2626] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${((currentBatch.totalSeats - currentBatch.remainingSeats) / currentBatch.totalSeats) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      onClick={() => onOpenInquiry(`${batchName} - Departure: ${formattedDate}`)}
                      className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] hover:from-[#EF4444] hover:to-[#B91C1C] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer border border-red-300/30"
                    >
                      <span>{language === "hi" ? "इस बैच में सीट आरक्षित करें" : "Reserve 2027 Batch Slot"}</span>
                      <ArrowRight size={14} className="text-white stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

YatraCountdownWidget.displayName = "YatraCountdownWidget";
