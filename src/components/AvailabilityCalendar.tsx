import React, { useState, memo } from "react";
import {
  Calendar,
  Flame,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Clock,
  ArrowRight,
  Sun,
  Snowflake,
  CloudRain,
  Gift,
  Check,
  CreditCard,
  PhoneCall,
  Info,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface BatchItem {
  id: string;
  batchCode: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  month: string;
  monthKey: "may" | "june" | "july" | "august" | "september" | "october";
  totalSeats: number;
  seatsLeft: number;
  status: "Almost Full" | "Filling Fast" | "Available";
  isPeak: boolean;
  festivalNotice?: string;
}

export interface MonthSeasonInfo {
  key: "may" | "june" | "july" | "august" | "september" | "october";
  name: string;
  seasonTag: "Super Peak" | "Prime Peak" | "Monsoon Window" | "Autumn Peak" | "Closing Peak";
  isPeakBooking: boolean;
  urgencyLevel: "extreme" | "high" | "moderate";
  temperature: string;
  weatherSummary: string;
  permitQuotaStatus: string;
  percentBooked: number;
  highlightReason: string;
  bestFor: string;
}

export const MONTH_SEASONS_2027: MonthSeasonInfo[] = [
  {
    key: "may",
    name: "May 2027",
    seasonTag: "Super Peak",
    isPeakBooking: true,
    urgencyLevel: "extreme",
    temperature: "6°C to 16°C",
    weatherSummary: "Fresh snow on peaks • Sacred temple opening • Crystal clear waters",
    permitQuotaStatus: "88% SDM Quota Claimed",
    percentBooked: 88,
    highlightReason: "Annual sacred opening window. Fresh snow covers Om Parvat & Jolingkong. Batches sell out 3-4 months in advance.",
    bestFor: "Devotees seeking early-season divine opening Darshan & pristine snow vistas",
  },
  {
    key: "june",
    name: "June 2027",
    seasonTag: "Prime Peak",
    isPeakBooking: true,
    urgencyLevel: "extreme",
    temperature: "12°C to 20°C",
    weatherSummary: "Mildest mountain climate • Longest daylight • Lush alpine meadows",
    permitQuotaStatus: "92% SDM Quota Claimed",
    percentBooked: 92,
    highlightReason: "Highest demand month of the year! Comfortable daytime temperatures and smooth roads through Vyas Valley.",
    bestFor: "Families, senior citizens, and first-time Himalayan pilgrims",
  },
  {
    key: "july",
    name: "July 2027",
    seasonTag: "Monsoon Window",
    isPeakBooking: false,
    urgencyLevel: "moderate",
    temperature: "10°C to 18°C",
    weatherSummary: "Misty mountains • Lush green valleys • Selective safe weather windows",
    permitQuotaStatus: "Limited Batches (50% Quota)",
    percentBooked: 50,
    highlightReason: "Lower valley rains require flexible travel buffer days. Higher Vyas Valley remains serene and verdant.",
    bestFor: "Adventure-ready pilgrims with flexible schedules seeking serene, uncrowded trails",
  },
  {
    key: "august",
    name: "August 2027",
    seasonTag: "Monsoon Window",
    isPeakBooking: false,
    urgencyLevel: "moderate",
    temperature: "10°C to 18°C",
    weatherSummary: "Brahma Kamal & wildflowers blooming • Serene spiritual aura",
    permitQuotaStatus: "Limited Batches (55% Quota)",
    percentBooked: 55,
    highlightReason: "Sacred Brahma Kamal flowers bloom near Parvati Sarovar. Selective departures with 24/7 BRO road updates.",
    bestFor: "Flora lovers and devotees drawn to holy wildflowers and quiet meditation",
  },
  {
    key: "september",
    name: "September 2027",
    seasonTag: "Autumn Peak",
    isPeakBooking: true,
    urgencyLevel: "extreme",
    temperature: "7°C to 17°C",
    weatherSummary: "100% azure blue skies • Zero cloud cover • Ultra-sharp mountain photography",
    permitQuotaStatus: "82% SDM Quota Claimed",
    percentBooked: 82,
    highlightReason: "The photographer's paradise! Crystal-clear clarity reveals every groove of the sacred snow-Om on Om Parvat.",
    bestFor: "Photography enthusiasts, spiritual seekers & post-monsoon yatris",
  },
  {
    key: "october",
    name: "October 2027",
    seasonTag: "Closing Peak",
    isPeakBooking: true,
    urgencyLevel: "high",
    temperature: "2°C to 13°C",
    weatherSummary: "Golden autumn foliage • Crisp Himalayan air • Sacred pre-winter quiet",
    permitQuotaStatus: "74% SDM Quota Claimed",
    percentBooked: 74,
    highlightReason: "Final pilgrimage window before winter snow shuts high passes. Chilly starlit nights and golden sunrise peaks.",
    bestFor: "Devotees seeking serene, unhurried divine Darshan before winter closure",
  },
];

export const ALL_BATCHES_2027: BatchItem[] = [
  // May 2027 (Peak Opening)
  {
    id: "b27-may-01",
    batchCode: "AK-MAY-01",
    startDate: "May 08, 2027",
    endDate: "May 13, 2027",
    dateRange: "May 08 - May 13, 2027",
    month: "May 2027",
    monthKey: "may",
    totalSeats: 15,
    seatsLeft: 2,
    status: "Almost Full",
    isPeak: true,
    festivalNotice: "Opening Batch · Temple Inaugural Aarti",
  },
  {
    id: "b27-may-02",
    batchCode: "AK-MAY-02",
    startDate: "May 15, 2027",
    endDate: "May 20, 2027",
    dateRange: "May 15 - May 20, 2027",
    month: "May 2027",
    monthKey: "may",
    totalSeats: 15,
    seatsLeft: 3,
    status: "Filling Fast",
    isPeak: true,
  },
  {
    id: "b27-may-03",
    batchCode: "AK-MAY-03",
    startDate: "May 22, 2027",
    endDate: "May 27, 2027",
    dateRange: "May 22 - May 27, 2027",
    month: "May 2027",
    monthKey: "may",
    totalSeats: 15,
    seatsLeft: 4,
    status: "Filling Fast",
    isPeak: true,
  },
  {
    id: "b27-may-04",
    batchCode: "AK-MAY-04",
    startDate: "May 29, 2027",
    endDate: "June 03, 2027",
    dateRange: "May 29 - June 03, 2027",
    month: "May 2027",
    monthKey: "may",
    totalSeats: 15,
    seatsLeft: 5,
    status: "Filling Fast",
    isPeak: true,
  },

  // June 2027 (Summer Prime Peak)
  {
    id: "b27-jun-01",
    batchCode: "AK-JUN-01",
    startDate: "June 05, 2027",
    endDate: "June 10, 2027",
    dateRange: "June 05 - June 10, 2027",
    month: "June 2027",
    monthKey: "june",
    totalSeats: 15,
    seatsLeft: 2,
    status: "Almost Full",
    isPeak: true,
    festivalNotice: "Highest Demand · Weekend Departure",
  },
  {
    id: "b27-jun-02",
    batchCode: "AK-JUN-02",
    startDate: "June 12, 2027",
    endDate: "June 17, 2027",
    dateRange: "June 12 - June 17, 2027",
    month: "June 2027",
    monthKey: "june",
    totalSeats: 15,
    seatsLeft: 4,
    status: "Filling Fast",
    isPeak: true,
  },
  {
    id: "b27-jun-03",
    batchCode: "AK-JUN-03",
    startDate: "June 19, 2027",
    endDate: "June 24, 2027",
    dateRange: "June 19 - June 24, 2027",
    month: "June 2027",
    monthKey: "june",
    totalSeats: 15,
    seatsLeft: 3,
    status: "Filling Fast",
    isPeak: true,
    festivalNotice: "Summer Solstice Special Meditation",
  },
  {
    id: "b27-jun-04",
    batchCode: "AK-JUN-04",
    startDate: "June 26, 2027",
    endDate: "July 01, 2027",
    dateRange: "June 26 - July 01, 2027",
    month: "June 2027",
    monthKey: "june",
    totalSeats: 15,
    seatsLeft: 6,
    status: "Available",
    isPeak: true,
  },

  // July 2027 (Monsoon Selective)
  {
    id: "b27-jul-01",
    batchCode: "AK-JUL-01",
    startDate: "July 07, 2027",
    endDate: "July 12, 2027",
    dateRange: "July 07 - July 12, 2027",
    month: "July 2027",
    monthKey: "july",
    totalSeats: 12,
    seatsLeft: 7,
    status: "Available",
    isPeak: false,
    festivalNotice: "Guru Purnima Sacred Darshan",
  },
  {
    id: "b27-jul-02",
    batchCode: "AK-JUL-02",
    startDate: "July 21, 2027",
    endDate: "July 26, 2027",
    dateRange: "July 21 - July 26, 2027",
    month: "July 2027",
    monthKey: "july",
    totalSeats: 12,
    seatsLeft: 8,
    status: "Available",
    isPeak: false,
  },

  // August 2027 (Monsoon Wildflowers)
  {
    id: "b27-aug-01",
    batchCode: "AK-AUG-01",
    startDate: "August 04, 2027",
    endDate: "August 09, 2027",
    dateRange: "August 04 - August 09, 2027",
    month: "August 2027",
    monthKey: "august",
    totalSeats: 12,
    seatsLeft: 6,
    status: "Available",
    isPeak: false,
    festivalNotice: "Shravan Month Special Bilva Puja",
  },
  {
    id: "b27-aug-02",
    batchCode: "AK-AUG-02",
    startDate: "August 18, 2027",
    endDate: "August 23, 2027",
    dateRange: "August 18 - August 23, 2027",
    month: "August 2027",
    monthKey: "august",
    totalSeats: 12,
    seatsLeft: 5,
    status: "Filling Fast",
    isPeak: false,
    festivalNotice: "Brahma Kamal Sacred Bloom Window",
  },

  // September 2027 (Autumn Clear Peak)
  {
    id: "b27-sep-01",
    batchCode: "AK-SEP-01",
    startDate: "September 04, 2027",
    endDate: "September 09, 2027",
    dateRange: "September 04 - September 09, 2027",
    month: "September 2027",
    monthKey: "september",
    totalSeats: 15,
    seatsLeft: 3,
    status: "Filling Fast",
    isPeak: true,
    festivalNotice: "Crystal Sky Week · Perfect Visibility",
  },
  {
    id: "b27-sep-02",
    batchCode: "AK-SEP-02",
    startDate: "September 11, 2027",
    endDate: "September 16, 2027",
    dateRange: "September 11 - September 16, 2027",
    month: "September 2027",
    monthKey: "september",
    totalSeats: 15,
    seatsLeft: 2,
    status: "Almost Full",
    isPeak: true,
  },
  {
    id: "b27-sep-03",
    batchCode: "AK-SEP-03",
    startDate: "September 18, 2027",
    endDate: "September 23, 2027",
    dateRange: "September 18 - September 23, 2027",
    month: "September 2027",
    monthKey: "september",
    totalSeats: 15,
    seatsLeft: 4,
    status: "Filling Fast",
    isPeak: true,
    festivalNotice: "Navratri Divine Pilgrimage Batch",
  },
  {
    id: "b27-sep-04",
    batchCode: "AK-SEP-04",
    startDate: "September 25, 2027",
    endDate: "September 30, 2027",
    dateRange: "September 25 - September 30, 2027",
    month: "September 2027",
    monthKey: "september",
    totalSeats: 15,
    seatsLeft: 5,
    status: "Filling Fast",
    isPeak: true,
  },

  // October 2027 (Closing Autumn Peak)
  {
    id: "b27-oct-01",
    batchCode: "AK-OCT-01",
    startDate: "October 03, 2027",
    endDate: "October 08, 2027",
    dateRange: "October 03 - October 08, 2027",
    month: "October 2027",
    monthKey: "october",
    totalSeats: 15,
    seatsLeft: 4,
    status: "Filling Fast",
    isPeak: true,
    festivalNotice: "Golden Valley Autumn Foliage",
  },
  {
    id: "b27-oct-02",
    batchCode: "AK-OCT-02",
    startDate: "October 10, 2027",
    endDate: "October 15, 2027",
    dateRange: "October 10 - October 15, 2027",
    month: "October 2027",
    monthKey: "october",
    totalSeats: 15,
    seatsLeft: 6,
    status: "Available",
    isPeak: true,
  },
  {
    id: "b27-oct-03",
    batchCode: "AK-OCT-03",
    startDate: "October 17, 2027",
    endDate: "October 22, 2027",
    dateRange: "October 17 - October 22, 2027",
    month: "October 2027",
    monthKey: "october",
    totalSeats: 15,
    seatsLeft: 3,
    status: "Almost Full",
    isPeak: true,
    festivalNotice: "Final Season Closing Batch · Deepawali Season",
  },
];

interface AvailabilityCalendarProps {
  packageTitle?: string;
  selectedBatchDate?: string;
  onSelectBatchDate: (batchDate: string) => void;
  onOpenInquiry?: (destination?: string) => void;
  onOpenRazorpay?: (options: { amount: number; title: string; packageType?: string }) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = memo(({
  packageTitle = "Adi Kailash & Om Parvat Yatra",
  selectedBatchDate,
  onSelectBatchDate,
  onOpenInquiry,
  onOpenRazorpay,
}) => {
  const [activeMonthKey, setActiveMonthKey] = useState<MonthSeasonInfo["key"]>("may");
  const [selectedBatchId, setSelectedBatchId] = useState<string>(() => {
    const match = ALL_BATCHES_2027.find((b) => b.dateRange === selectedBatchDate);
    return match ? match.id : ALL_BATCHES_2027[0].id;
  });

  const activeMonthInfo =
    MONTH_SEASONS_2027.find((m) => m.key === activeMonthKey) || MONTH_SEASONS_2027[0];

  const batchesInActiveMonth = ALL_BATCHES_2027.filter(
    (b) => b.monthKey === activeMonthKey
  );

  const selectedBatch =
    ALL_BATCHES_2027.find((b) => b.id === selectedBatchId) || batchesInActiveMonth[0];

  const handleSelectBatch = (batch: BatchItem) => {
    setSelectedBatchId(batch.id);
    onSelectBatchDate(batch.dateRange);
  };

  const handleMonthChange = (key: MonthSeasonInfo["key"]) => {
    setActiveMonthKey(key);
    const firstInMonth = ALL_BATCHES_2027.find((b) => b.monthKey === key);
    if (firstInMonth) {
      setSelectedBatchId(firstInMonth.id);
      onSelectBatchDate(firstInMonth.dateRange);
    }
  };

  return (
    <div
      id="availability-calendar-section"
      className="bg-white border border-[#E6E2D3] rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-md relative overflow-hidden space-y-8"
    >
      {/* Background Subtle Mountain Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* 1. Header with Badge & Live Urgency Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F5F2ED] pb-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-[11px] font-bold uppercase tracking-wider">
            <Calendar size={13} className="text-amber-800" />
            <span>2027 Sacred Yatra Availability Radar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            Peak Booking Months &{" "}
            <span className="font-extrabold text-[#C91D24]">
              Live Batch Availability
            </span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Due to strict SDM Dharchula inner line permit quotas and limited high-altitude eco-cottage capacities,{" "}
            <strong className="text-slate-900 font-semibold">May–June</strong> and{" "}
            <strong className="text-slate-900 font-semibold">September–October</strong> peak dates book out months in advance.
          </p>
        </div>

        {/* Live Booking Pulse Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300/80 rounded-2xl p-3.5 sm:p-4 text-xs space-y-1.5 shrink-0 shadow-xs max-w-sm">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C91D24]" />
            </span>
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#C91D24]">
              High Booking Pulse
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-snug">
            <strong>148 Pilgrims</strong> locked their 2027 batch slots in the last 7 days. Early bookers receive priority SDM permit processing.
          </p>
        </div>
      </div>

      {/* 2. Interactive Month Selector Tabs (Highlighting Peak Seasons) */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <TrendingUp size={14} className="text-amber-800" />
            <span>Select Month to Check Peak Windows & Departure Dates:</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            🔥 Peak Months = Highest Darshan Clarity
          </span>
        </div>

        {/* Month Pills Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {MONTH_SEASONS_2027.map((month) => {
            const isActive = activeMonthKey === month.key;
            return (
              <button
                key={month.key}
                type="button"
                onClick={() => handleMonthChange(month.key)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#1E293B] text-white border-slate-900 shadow-md scale-[1.02]"
                    : "bg-[#FDFBF7] hover:bg-amber-50/60 border-[#E6E2D3] text-slate-800"
                }`}
              >
                {/* Top Badge for Peak / Window */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      month.isPeakBooking
                        ? isActive
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-[#C91D24]/10 text-[#C91D24] font-bold border border-[#C91D24]/20"
                        : isActive
                        ? "bg-slate-700 text-slate-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {month.seasonTag}
                  </span>

                  {month.isPeakBooking && (
                    <Flame
                      size={13}
                      className={isActive ? "text-amber-300" : "text-[#C91D24]"}
                    />
                  )}
                </div>

                {/* Month Name & Booking Bar */}
                <div className="space-y-1">
                  <div className="font-serif font-bold text-base leading-tight">
                    {month.name.split(" ")[0]}
                  </div>
                  <div
                    className={`text-[10px] leading-tight ${
                      isActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {month.temperature}
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="pt-1.5 space-y-1">
                    <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          month.percentBooked > 85
                            ? "bg-[#C91D24]"
                            : month.percentBooked > 75
                            ? "bg-amber-500"
                            : "bg-emerald-600"
                        }`}
                        style={{ width: `${month.percentBooked}%` }}
                      />
                    </div>
                    <div
                      className={`text-[9px] font-bold flex justify-between ${
                        isActive ? "text-amber-300" : "text-amber-900"
                      }`}
                    >
                      <span>{month.percentBooked}% Claimed</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Month Deep Dive Spotlight Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMonthKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-5 sm:p-6 bg-[#FAF7F2] border border-[#E6E2D3] shadow-xs relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Description & Seasonal Insight */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {activeMonthInfo.name} Pilgrimage Guide
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    activeMonthInfo.isPeakBooking
                      ? "bg-red-100 text-[#C91D24] border border-red-300"
                      : "bg-blue-100 text-blue-900 border border-blue-300"
                  }`}
                >
                  {activeMonthInfo.isPeakBooking ? (
                    <>
                      <Flame size={12} className="text-[#C91D24]" />
                      <span>Peak Booking Window • Early Sign-Up Recommended</span>
                    </>
                  ) : (
                    <>
                      <CloudRain size={12} className="text-blue-800" />
                      <span>Monsoon Window • Selective Departures</span>
                    </>
                  )}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeMonthInfo.highlightReason}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E6E2D3]">
                  <Sun size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Climate & Conditions:</span>
                    <span className="text-slate-600 text-[11px]">
                      {activeMonthInfo.weatherSummary} ({activeMonthInfo.temperature})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-[#E6E2D3]">
                  <Users size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Ideal Travelers:</span>
                    <span className="text-slate-600 text-[11px]">{activeMonthInfo.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Permit Status & Urgency Callout */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E6E2D3] shadow-xs space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center justify-between">
                <span>SDM Permit Allocation</span>
                <ShieldCheck size={14} className="text-emerald-700" />
              </div>

              <div className="space-y-1">
                <div className="text-lg font-serif font-bold text-slate-900">
                  {activeMonthInfo.permitQuotaStatus}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Only 45 daily pilgrim permits are granted by SDM Dharchula for Vyas Valley.
                </p>
              </div>

              <div className="pt-2 border-t border-[#F5F2ED] flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Advance Token:</span>
                <span className="font-bold text-emerald-800">₹3,000 to ₹5,000 / seat</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. Batch Date Cards Grid for Active Month */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
              Scheduled Fixed Departure Batches ({batchesInActiveMonth.length} Batches)
            </h3>
            <p className="text-xs text-slate-500">
              Select your preferred dates below to lock your seats with advance token:
            </p>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 hidden sm:inline">
            6 Days / 5 Nights Ex-Kathgodam / Dharchula
          </span>
        </div>

        {/* Batch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {batchesInActiveMonth.map((batch) => {
            const isSelected = selectedBatch.id === batch.id;
            return (
              <div
                key={batch.id}
                onClick={() => handleSelectBatch(batch)}
                className={`rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-amber-50 to-orange-50/50 border-[#C91D24] shadow-md ring-2 ring-[#C91D24]/20"
                    : "bg-white hover:bg-slate-50 border-[#E6E2D3] hover:border-amber-400"
                }`}
              >
                {/* Header: Batch Code & Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-slate-500 font-mono">
                      {batch.batchCode}
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        batch.status === "Almost Full"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : batch.status === "Filling Fast"
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>

                  {/* Dates */}
                  <div>
                    <h4 className="text-base font-serif font-bold text-slate-900 leading-snug">
                      {batch.dateRange}
                    </h4>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={12} className="text-amber-800" />
                      <span>6 Days Circuit</span>
                    </div>
                  </div>

                  {/* Festival / Special Tag if any */}
                  {batch.festivalNotice && (
                    <div className="text-[10px] text-amber-900 bg-amber-100/70 p-1.5 rounded-lg border border-amber-200/80 font-medium flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-700 shrink-0" />
                      <span className="truncate">{batch.festivalNotice}</span>
                    </div>
                  )}
                </div>

                {/* Footer: Remaining Seats & Selection Button */}
                <div className="pt-4 border-t border-[#F5F2ED] mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Seat Capacity:</span>
                    <span
                      className={`font-bold text-xs ${
                        batch.seatsLeft <= 3 ? "text-[#C91D24]" : "text-slate-800"
                      }`}
                    >
                      {batch.seatsLeft} of {batch.totalSeats} Left
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBatch(batch);
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#C91D24] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={13} />
                        <span>Selected Batch</span>
                      </>
                    ) : (
                      <span>Select This Date</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Early Sign-Up Guarantees & Perks (Conversion Driver) */}
      <div className="bg-gradient-to-r from-amber-900 to-[#1E293B] text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
              <Gift size={13} className="text-amber-400" />
              <span>Early Sign-Up 2027 Privileges</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-serif font-light text-white tracking-tight">
              Why Reserve Your 2027 Adi Kailash Batch Early?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Locking your seat today guarantees your SDM permit quota and insulates your booking against 2027 tariff updates.
            </p>

            {/* 4 Key Early Booker Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">100% Price Lock Guarantee:</strong> Protect against 2027 diesel & hotel rate hikes.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">Free Batch Reschedule:</strong> Switch your departure date up to 30 days prior with ₹0 penalty.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">Guaranteed Window Seat in 4x4 SUV:</strong> Premium seating allocated by booking timestamp.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">
                  <strong className="text-white">Priority SDM Permit Filing:</strong> Express paperwork submission 60 days before yatra.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3 text-center sm:text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Selected Departure
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
              {selectedBatch.dateRange}
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Advance Token: <strong>₹5,000 / Person</strong> (Deductible from total package).
            </p>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (onOpenRazorpay) {
                    onOpenRazorpay({
                      amount: 5000,
                      title: `2027 Early Bird Advance — ${selectedBatch.dateRange}`,
                      packageType: packageTitle,
                    });
                  } else if (onOpenInquiry) {
                    onOpenInquiry(`${packageTitle} (${selectedBatch.dateRange})`);
                  }
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <CreditCard size={14} />
                <span>Reserve Seat for ₹5,000</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const msg = `*Early 2027 Yatra Reservation Inquiry — GoTrek Travels*%0A%0A*Package:* ${encodeURIComponent(packageTitle)}%0A*Selected Batch:* ${encodeURIComponent(selectedBatch.dateRange)} (${selectedBatch.month})%0A%0A_Hello GoTrek, I want to reserve my seats for this 2027 peak window. Please share permit submission timeline and bank details._`;
                  window.open(`https://wa.me/917248285767?text=${msg}`, "_blank");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon size={14} />
                <span>WhatsApp Permit Officer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AvailabilityCalendar.displayName = "AvailabilityCalendar";
