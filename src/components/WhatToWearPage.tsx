import React, { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shirt,
  Sparkles,
  ShieldCheck,
  Footprints,
  Zap,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Download,
  Calendar,
  Thermometer,
  Wind,
  Sun,
  PackageCheck,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  ShoppingBag,
  HeartPulse,
  RotateCcw,
  Check,
  FileText,
  Search,
  Filter,
  CheckSquare,
  Save,
  Clock
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface WhatToWearPageProps {
  onBackToHome?: () => void;
  onOpenInquiry?: (destination?: string) => void;
  onOpenRazorpay?: (options: { amount: number; title: string; packageType?: string }) => void;
}

interface PackingItem {
  id: string;
  category: "documents" | "clothing" | "footwear" | "gear" | "medical";
  name: string;
  spec: string;
  isMandatory: boolean;
}

const LOCAL_STORAGE_KEY = "gotrek_yatra_packing_checklist_v1";

const PACKING_ITEMS: PackingItem[] = [
  // Permits & Mandatory Documents
  { id: "d1", category: "documents", name: "Original Govt Photo ID (Aadhaar / Voter ID / Passport)", spec: "Mandatory for Inner Line Permit (ILP) checks at Dharchula, Gunji & Nabi", isMandatory: true },
  { id: "d2", category: "documents", name: "Physical Medical Fitness Certificate", spec: "Signed by registered physician within 30 days of Yatra date", isMandatory: true },
  { id: "d3", category: "documents", name: "4 Recent Passport-Size Photographs", spec: "Submitted with physical ILP application at Dharchula SDM office", isMandatory: true },
  { id: "d4", category: "documents", name: "Emergency Cash (₹5,000 - ₹10,000)", spec: "No working ATMs or reliable UPI networks beyond Dharchula in Vyas Valley", isMandatory: true },

  // Clothing & Layering
  { id: "c1", category: "clothing", name: "2 Sets Heavy Thermal Innerwear (Top & Bottom)", spec: "Merino Wool or Heat-Tech synthetic (Avoid pure cotton)", isMandatory: true },
  { id: "c2", category: "clothing", name: "1 Heavy Polar Fleece Jacket (200-300 GSM)", spec: "Essential mid-layer insulation for evening homestays in Gunji & Nabi", isMandatory: true },
  { id: "c3", category: "clothing", name: "1 Down Feather Jacket (-10°C Rated)", spec: "Heavy hooded puffer for sub-zero winds at Om Parvat sunrise & Jolingkong", isMandatory: true },
  { id: "c4", category: "clothing", name: "2 Windproof & Waterproof Trekking Pants", spec: "Quick-dry fleece-lined pants with zip pockets (Avoid heavy denims)", isMandatory: true },
  { id: "c5", category: "clothing", name: "3-4 Breathable Full-Sleeve T-Shirts", spec: "Synthetic dry-fit shirts for daytime drives and walks in lower valleys", isMandatory: false },
  { id: "c6", category: "clothing", name: "Waterproof Rain Poncho / Windcheater", spec: "Weather at 14,000 ft turns quickly; keeps clothes dry to avoid hypothermia", isMandatory: true },

  // Footwear & Extremities
  { id: "f1", category: "footwear", name: "High-Ankle Waterproof Trekking Shoes", spec: "Sturdy rubber grip soles (Quechua MH100/500, Wildcraft or Columbia)", isMandatory: true },
  { id: "f2", category: "footwear", name: "4 Pairs Heavy Woolen / Thermal Socks", spec: "Cold feet induce body chills; keep 1 pair exclusively for night sleep", isMandatory: true },
  { id: "f3", category: "footwear", name: "Thermal Balaclava / Fleece Monkey Cap", spec: "Protects head, ears, and neck from cold wind chill (prevents altitude headaches)", isMandatory: true },
  { id: "f4", category: "footwear", name: "1 Pair Fleece Gloves + 1 Outer Waterproof Gloves", spec: "Dual layer for early morning Jolingkong walks & sub-zero camera holding", isMandatory: true },
  { id: "f5", category: "footwear", name: "UV Polarized Category-3 Sunglasses", spec: "Crucial to prevent snow glare and UV strain at Parvati Sarovar", isMandatory: true },
  { id: "f6", category: "footwear", name: "Camp Slippers / Crocs for Homestays", spec: "Easy slip-ons for indoor homestay movement without re-tying shoe laces", isMandatory: false },

  // Gear & Hydration
  { id: "g1", category: "gear", name: "1 Litre Stainless Steel Thermos Flask", spec: "Continuous warm water intake is the #1 medical deterrent for AMS", isMandatory: true },
  { id: "g2", category: "gear", name: "20,000 mAh High Capacity Power Bank", spec: "Mobile phone batteries drain rapidly in sub-zero temperatures; keep in inner pocket", isMandatory: true },
  { id: "g3", category: "gear", name: "LED Headlamp or Torch with Extra Batteries", spec: "For night village movement and early 4:00 AM Om Parvat sunrise departures", isMandatory: true },
  { id: "g4", category: "gear", name: "Flexi Duffel Bag / Soft Rucksack (60L)", spec: "Hard shell plastic suitcases NOT permitted in 4x4 Bolero boot compartments", isMandatory: true },
  { id: "g5", category: "gear", name: "Trekking Pole with Rubber Tip", spec: "Provides knee joint support during Parvati Sarovar & Gauri Kund walks", isMandatory: false },

  // Medical & Personal
  { id: "m1", category: "medical", name: "Personal Medicine Kit + Diamox", spec: "Consult doctor for altitude acclimatization protocol (start at Dharchula)", isMandatory: true },
  { id: "m2", category: "medical", name: "SPF 50+ Sunscreen & Lip Balm with SPF", spec: "High UV radiation at 14,500 ft causes rapid sun blistering", isMandatory: true },
  { id: "m3", category: "medical", name: "Biodegradable Wet Wipes & Sanitizer", spec: "Tap water is freezing; wet wipes essential for face and hands hygiene", isMandatory: true },
  { id: "m4", category: "medical", name: "Personal Finger Pulse Oximeter", spec: "Monitor oxygen saturation (SpO2) and pulse twice daily at Gunji base", isMandatory: false },
  { id: "m5", category: "medical", name: "Natural Camphor / Karpoor Pouch", spec: "Traditional aromatic relief to inhale when feeling breathless in thin air", isMandatory: false },
];

const CATEGORIES = [
  { id: "all", label: "All Items", icon: PackageCheck },
  { id: "documents", label: "Permits & ID", icon: FileText },
  { id: "clothing", label: "Clothing & Layers", icon: Shirt },
  { id: "footwear", label: "Footwear & Head", icon: Footprints },
  { id: "gear", label: "Gear & Power", icon: Zap },
  { id: "medical", label: "Medical & Health", icon: HeartPulse },
] as const;

export const WhatToWearPage = memo(({
  onBackToHome,
  onOpenInquiry,
  onOpenRazorpay,
}: WhatToWearPageProps) => {
  const { language } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState<"may" | "sep">("may");

  // Persistent localStorage for checklist
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not retrieve checklist from localStorage", e);
    }
    return {};
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "remaining" | "packed" | "mandatory">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const WHATSAPP_NUMBER = "917248285767";

  // Sync with persistent localStorage on every change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedItems));
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSavedTime(timeStr);
    } catch (e) {
      console.warn("Could not save checklist to localStorage", e);
    }
  }, [checkedItems]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkAllPacked = () => {
    const allPacked: Record<string, boolean> = {};
    PACKING_ITEMS.forEach((item) => {
      allPacked[item.id] = true;
    });
    setCheckedItems(allPacked);
  };

  const handleResetChecklist = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setShowResetConfirm(false);
  };

  const totalCount = PACKING_ITEMS.length;
  const packedCount = Object.values(checkedItems).filter(Boolean).length;
  const remainingCount = totalCount - packedCount;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const mandatoryTotal = PACKING_ITEMS.filter((i) => i.isMandatory).length;
  const mandatoryPacked = PACKING_ITEMS.filter((i) => i.isMandatory && checkedItems[i.id]).length;
  const allMandatoryDone = mandatoryPacked === mandatoryTotal;
  const isAllDone = packedCount === totalCount;

  // Filter items based on category, status, and search query
  const filteredItems = PACKING_ITEMS.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    const isChecked = !!checkedItems[item.id];
    if (statusFilter === "remaining" && isChecked) {
      return false;
    }
    if (statusFilter === "packed" && !isChecked) {
      return false;
    }
    if (statusFilter === "mandatory" && !item.isMandatory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.spec.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getCategoryStats = (catId: string) => {
    if (catId === "all") {
      return { packed: packedCount, total: totalCount };
    }
    const items = PACKING_ITEMS.filter((i) => i.category === catId);
    const packed = items.filter((i) => checkedItems[i.id]).length;
    return { packed, total: items.length };
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent("Namaste GoTrek Team! I need guidance on clothing, shoes, and packing list for Adi Kailash Yatra 2027.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'What to Wear & Packing Guide', active: true }
        ]}
        onBack={onBackToHome}
        backLabel="Home"
        badge="Altitude Packing Guide"
        badgeType="gold"
      />

      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#451A03] text-white py-12 sm:py-20 px-4 sm:px-8 overflow-hidden">
        {/* Floating Back Button */}
        {onBackToHome && (
          <div className="max-w-5xl mx-auto mb-6 relative z-20">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* Luminous Om Symbol in Sky */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
          <OmLightSymbol size="hero" glowColor="gold" animated={true} />
        </div>

        {/* Background Overlay Art */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)]" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-md"
          >
            <Shirt size={14} className="text-amber-400" />
            <span>{language === "hi" ? "हिमालयी वस्त्र एवं सामग्री गाइड" : "Official High Altitude Clothing & Gear Guide"}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight"
          >
            {language === "hi" ? "आदि कैलाश व ॐ पर्वत" : "What to Wear for"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              {language === "hi" ? "यात्रा में क्या पहनें?" : "Adi Kailash & Om Parvat Yatra"}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed"
          >
            {language === "hi"
              ? "धारचूला (3,000 फीट) से जोलिंगकोंग व नाभीढांग (14,500 फीट) तक तापमान -5°C तक गिर जाता है। safe व आरामदायक यात्रा के लिए त्रिस्तरीय तापीय (3-Layer Thermal) वस्त्र प्रणाली को अपनाएं।"
              : "Temperatures at Jolingkong & Nabhidhang drop down to -5°C at dawn. Master the proven 3-layer thermal clothing protocol, footwear guide, power essentials, and printable gear checklist."}
          </motion.p>

          {/* Key Stat Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
          >
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Elevation Range</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">3,000 to 14,500 ft</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Sub-Zero Range</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">-5°C to 15°C</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Layering System</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">3-Layer Thermal</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Bag Preference</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">60L Flexi Duffel</div>
            </div>
          </motion.div>

          {/* Action Row */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-wrap items-center gap-3"
          >
            <a
              href="#interactive-checklist"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <PackageCheck size={16} />
              <span>{language === "hi" ? "चेकलिस्ट पर जाएं" : "Open Packing Checklist"}</span>
            </a>

            <button
              onClick={handleDownloadPdf}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={16} />
              <span>{language === "hi" ? "प्रिंट / डाउनलोड लिस्ट" : "Print Packing PDF"}</span>
            </button>

            <button
              onClick={handleWhatsAppHelp}
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>{language === "hi" ? "व्हाट्सएप गाइड मदद" : "Ask Gear Expert"}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 space-y-16">

        {/* 1. Month-by-Month Weather & Temperature Selector */}
        <section className="bg-white border border-[#E6E2D3] rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E2D3] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                <Thermometer size={14} />
                <span>Season Wise Climate</span>
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#1E293B] mt-1">
                {language === "hi" ? "मौसम व तापमान तालिका" : "Vyas Valley Seasonal Temperature Guide"}
              </h2>
            </div>

            {/* Toggle Switch */}
            <div className="inline-flex p-1 rounded-full bg-[#F5F2ED] border border-[#E6E2D3]">
              <button
                onClick={() => setSelectedMonth("may")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedMonth === "may"
                    ? "bg-[#1E293B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                May - June (Snow Season)
              </button>
              <button
                onClick={() => setSelectedMonth("sep")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedMonth === "sep"
                    ? "bg-[#1E293B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sept - Oct (Autumn Clear Sky)
              </button>
            </div>
          </div>

          {selectedMonth === "may" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-amber-900 font-bold text-sm">
                  <span>Dharchula (3,000 ft)</span>
                  <Sun size={18} className="text-amber-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#1E293B]">22°C to 30°C</div>
                <p className="text-xs text-slate-600">Warm sub-tropical climate. Normal cotton clothes or light t-shirts needed during day.</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-amber-900 font-bold text-sm">
                  <span>Gunji & Nabi (10,500 ft)</span>
                  <Wind size={18} className="text-amber-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#1E293B]">8°C to 16°C</div>
                <p className="text-xs text-slate-600">Pleasant during sunny afternoons. Chilly evenings requiring fleece & light down jacket.</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-amber-900 font-bold text-sm">
                  <span>Jolingkong (14,500 ft)</span>
                  <Thermometer size={18} className="text-rose-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-rose-900">-2°C to 8°C</div>
                <p className="text-xs text-slate-600">Freezing winds & snow patches near Parvati Sarovar. Full 3-layer down jacket mandatory.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between text-blue-900 font-bold text-sm">
                  <span>Dharchula (3,000 ft)</span>
                  <Sun size={18} className="text-blue-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#1E293B]">18°C to 26°C</div>
                <p className="text-xs text-slate-600">Clear post-monsoon blue skies with crisp mountain breeze.</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between text-blue-900 font-bold text-sm">
                  <span>Gunji & Nabi (10,500 ft)</span>
                  <Wind size={18} className="text-blue-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-[#1E293B]">4°C to 12°C</div>
                <p className="text-xs text-slate-600">Crisp clear evenings. Night temperatures hover around 0°C inside homestays.</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between text-blue-900 font-bold text-sm">
                  <span>Jolingkong & Om Parvat</span>
                  <Thermometer size={18} className="text-rose-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-rose-900">-5°C to 4°C</div>
                <p className="text-xs text-slate-600">Crystal clear Om Parvat sunrise, but sub-zero windchill. Thermal balaclava & down jacket essential.</p>
              </div>
            </div>
          )}
        </section>

        {/* 2. The 3-Layer Thermal Clothing Protocol */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles size={12} className="text-amber-700" />
              <span>Scientific Layering Method</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1E293B]">
              {language === "hi" ? "अनिवार्य 3-लेयर वस्त्र प्रणाली" : "The Mandatory 3-Layer Thermal Protocol"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40]">
              Why wear 3 thin technical layers instead of 1 bulky coat? Air trapped between layers provides maximum insulation and allows you to adjust as you drive or walk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Layer 1 */}
            <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 flex items-center justify-center font-bold font-serif text-xl">
                01
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800">Base Layer (Skin)</span>
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Thermal Innerwear</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Merino wool or synthetic heat-tech top and bottom. Absorbs body sweat and keeps your skin completely dry during walking.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F2ED] text-[11px] text-slate-800 font-medium">
                ⚡ <strong>Pro Tip:</strong> Pack 2 complete sets. Never wear cotton innerwear as cotton holds sweat and turns ice cold.
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold font-serif text-xl">
                02
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800">Mid Layer (Insulation)</span>
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Heavy Fleece Jacket</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traps the warm air generated by your body. High-density 200 GSM polar fleece or heavy woolen sweater keeps you cozy inside 4x4 Bolero and village homestays.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F2ED] text-[11px] text-slate-800 font-medium">
                ⚡ <strong>Pro Tip:</strong> Easy to unzip or remove when driving in sunny lower valleys like Dharchula and Dharchula-Chialekh route.
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 shadow-sm space-y-4 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-900 text-white flex items-center justify-center font-bold font-serif text-xl">
                03
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-800">Outer Shell (Protection)</span>
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Down Feather Jacket</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heavy hooded feather down jacket rated for -10°C. Blocks freezing high-altitude mountain winds at Om Parvat Nabhidhang and Jolingkong.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F2ED] text-[11px] text-slate-800 font-medium">
                ⚡ <strong>Pro Tip:</strong> Ensure it has a deep hood and wind-tight sleeve cuffs. Rainproof outer fabric is highly recommended.
              </div>
            </div>
          </div>
        </section>

        {/* 3. Footwear, Extremities & Power Essentials */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Footwear Box */}
          <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-900">
                <Footprints size={22} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1E293B]">Footwear & Foot Warmth</h3>
                <p className="text-xs text-slate-500">Keep feet dry & protected from cold rocks</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>High-Ankle Waterproof Shoes:</strong> Deep rubber tread soles (e.g. Quechua MH100/MH500). High ankle support prevents sprains over Jolingkong riverbeds.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>4 Pairs Woolen Socks:</strong> Cold feet make your entire body feel freezing. Wear fresh dry woolen socks before going to sleep at Nabi homestay.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Homestay Slippers:</strong> A light pair of slip-ons or Crocs to use inside village homestays without tying shoe laces every time.
                </div>
              </li>
            </ul>
          </div>

          {/* Extremities & Power Box */}
          <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-slate-900 text-amber-300">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1E293B]">Extremities & Battery Care</h3>
                <p className="text-xs text-slate-500">Protect head, neck, eyes & electronics</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Thermal Balaclava:</strong> Covers head, ears, and neck. 70% of body heat escapes from unshielded head and neck in cold mountain winds.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Category-3 UV Sunglasses:</strong> Prevents snow blindness and severe eye strain when reflecting morning sunlight off snow-capped peaks.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>20,000 mAh Power Bank:</strong> Mobile batteries discharge quickly in sub-zero cold. Keep your phone inside an inner pocket near your body heat.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Interactive Packing Checklist Section */}
        <section id="interactive-checklist" className="bg-[#1E293B] text-white rounded-[32px] p-6 sm:p-10 space-y-6 shadow-xl border border-slate-700/60 relative">
          {/* Header & Storage Status */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest border border-amber-400/30">
                  <PackageCheck size={14} className="text-amber-400" />
                  <span>{language === "hi" ? "डिजिटल पैकिंग चेकलिस्ट" : "Interactive Yatri Tool"}</span>
                </div>

                {/* Persistent Local Storage Live Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-medium border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <Save size={11} />
                  <span>
                    {lastSavedTime
                      ? `Saved to this device at ${lastSavedTime}`
                      : "Persistent offline local storage active"}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {language === "hi" ? "आपकी यात्रा पैकिंग चेकलिस्ट" : "Interactive Yatri Packing Checklist"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {language === "hi"
                  ? "अपनी सामग्री पैक करते समय आइटम पर क्लिक करके चेक ऑफ करें। आपकी प्रगति आपके डिवाइस में सुरक्षित रहेगी।"
                  : "Check off items as you pack your 60L duffel bag. Your progress is automatically saved to your browser so you can return anytime."}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 min-w-[280px] space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-300 flex items-center gap-1.5">
                  <CheckSquare size={14} />
                  <span>Packing Progress</span>
                </span>
                <span className="text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 font-mono">
                  {packedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>

              {/* Gradient Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 p-0.5 border border-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Status Breakdown Pills */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 border-t border-slate-800">
                <span className={allMandatoryDone ? "text-emerald-400 font-semibold" : "text-amber-300"}>
                  {allMandatoryDone ? "✓ All Mandatory Packed" : `${mandatoryPacked}/${mandatoryTotal} Mandatory Done`}
                </span>
                <span className="text-slate-400">
                  {remainingCount === 0 ? "All packed! 🎉" : `${remainingCount} to pack`}
                </span>
              </div>
            </div>
          </div>

          {/* Celebration Achievement Banners */}
          {isAllDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 border border-emerald-500/40 text-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">Har Har Mahadev! Everything is Packed</h4>
                  <p className="text-xs text-emerald-200/90">
                    All {totalCount} essentials are packed in your duffel bag. You are fully geared for the 14,500 ft sub-zero passes.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md"
              >
                Print Final List
              </button>
            </motion.div>
          )}

          {!isAllDone && allMandatoryDone && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 flex items-center gap-3 text-xs">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>
                <strong>Excellent!</strong> All {mandatoryTotal} high-altitude mandatory items (permits, thermals, medicines, and down jacket) are packed. Finish the remaining optional items at your leisure.
              </span>
            </div>
          )}

          {/* Filter Bar: Category Tabs, Search, and Status Buttons */}
          <div className="space-y-3.5 pt-1">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {CATEGORIES.map((cat) => {
                const stats = getCategoryStats(cat.id);
                const isSelected = selectedCategory === cat.id;
                const IconComponent = cat.icon;
                const isCatComplete = stats.packed === stats.total && stats.total > 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <IconComponent size={14} className={isSelected ? "text-slate-950" : "text-amber-400"} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? "bg-slate-950 text-amber-300"
                          : isCatComplete
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {stats.packed}/{stats.total}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Second Row: Search + Status Filters + Bulk Actions */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter items (e.g. jacket, thermals, Diamox, cash, socks)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Toggle & Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-700">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilter === "all"
                        ? "bg-slate-700 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter("remaining")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilter === "remaining"
                        ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    To Pack ({remainingCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter("packed")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilter === "packed"
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Packed ({packedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter("mandatory")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      statusFilter === "mandatory"
                        ? "bg-rose-500 text-white font-bold shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Mandatory ({mandatoryTotal})
                  </button>
                </div>

                {/* Bulk Actions: Mark All & Reset with safety */}
                <button
                  onClick={handleMarkAllPacked}
                  title="Mark all items as packed"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={13} className="text-emerald-400" />
                  <span>Pack All</span>
                </button>

                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    title="Clear saved checklist"
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1 bg-rose-950/80 border border-rose-600/60 rounded-xl px-2 py-1 text-[11px]">
                    <span className="text-rose-200">Reset?</span>
                    <button
                      onClick={handleResetChecklist}
                      className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-1.5 py-0.5 text-slate-300 hover:text-white text-[10px] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checklist Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-300 flex items-center justify-center mx-auto">
                <CheckSquare size={24} />
              </div>
              <h3 className="text-sm font-serif font-bold text-white">No items matching your criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {statusFilter === "remaining"
                  ? "All items in this view are already marked as packed! Switch to 'All' to review them."
                  : "Try clearing your search or category filter to view all items."}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Show All Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {filteredItems.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={isChecked}
                    onClick={() => toggleCheck(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCheck(item.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isChecked
                        ? "bg-emerald-950/20 border-emerald-500/40 text-slate-300 hover:bg-emerald-950/30"
                        : "bg-slate-800/80 border-slate-700/90 text-white hover:bg-slate-800 hover:border-slate-600 shadow-xs"
                    }`}
                  >
                    {/* Animated Checkbox Indicator */}
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isChecked
                          ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-xs scale-105"
                          : "border-slate-500 bg-slate-900 hover:border-amber-400"
                      }`}
                    >
                      {isChecked && <Check size={14} className="stroke-[3.5]" />}
                    </div>

                    {/* Item Information */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`text-xs font-bold leading-snug transition-all ${
                            isChecked
                              ? "line-through text-slate-400"
                              : "text-white"
                          }`}
                        >
                          {item.name}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.isMandatory && (
                            <span className="text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Mandatory
                            </span>
                          )}
                          <span
                            className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                              isChecked
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-slate-700/60 text-slate-400"
                            }`}
                          >
                            {isChecked ? "Packed" : "To Pack"}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.spec}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer Assistance & Tips */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-amber-300">💡 Pro Packing Tip:</span>
              <span>
                Roll thermals and seal inside transparent ziplock bags to protect from dust and moisture in 4x4 Boleros.
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDownloadPdf}
                className="text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
              >
                Print / Save PDF
              </button>
              <span>•</span>
              <button
                onClick={handleWhatsAppHelp}
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer"
              >
                Ask Gear Guide
              </button>
            </div>
          </div>
        </section>

        {/* 5. Duffel Bag vs Rigid Suitcase Warning */}
        <section className="bg-amber-50 border border-amber-300 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="p-4 rounded-2xl bg-amber-200/80 text-amber-950 shrink-0">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              <AlertCircle size={12} />
              <span>Important Luggage Protocol</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-amber-950">
              Why Flexi Duffel Bags are Required for 4x4 Boleros?
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Vyas Valley terrain requires 4x4 Mahindra Boleros and Scorpios where 6 passengers share boot space. Rigid plastic hard-shell suitcases cannot squeeze into boot compartments. Please carry a flexible 60L duffel bag or soft rucksack. You can leave extra city luggage safely at our Pithoragarh HQ cloak room!
            </p>
          </div>
        </section>

        {/* 6. High-Altitude Clothing FAQs */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#1E293B]">
              Frequently Asked Questions on Attire & Gear
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40]">
              Got questions before packing? Review responses from our Dharchula ground team.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              {
                q: "Can I rent down jackets or trekking poles in Dharchula?",
                a: "Yes! Our GoTrek Base HQ provides sanitized heavy down jackets (-10°C rated) and trekking poles on small daily rental for yatris who prefer not to buy new gear.",
              },
              {
                q: "Are sports shoes / sneakers suitable for Parvati Sarovar?",
                a: "Normal flat-sole sneakers or sports shoes slip on riverbed rocks and get soaked easily. Sturdy high-ankle waterproof shoes with deep rubber grooves (like Quechua MH100) are highly recommended.",
              },
              {
                q: "Is cotton thermal innerwear recommended?",
                a: "No. Cotton absorbs body sweat and retains moisture, making you feel ice cold at high altitudes. Synthetic Heat-Tech or Merino Wool thermal innerwear is mandatory.",
              },
              {
                q: "How many clothes should I carry for the 6-day yatra?",
                a: "Keep your bag light! 2 sets thermal innerwear, 1 fleece jacket, 1 down jacket, 2 trekking pants, 4 pairs woolen socks, and 3-4 dry-fit t-shirts are more than enough for the entire circuit.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E6E2D3] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-serif font-bold text-sm text-[#1E293B] flex items-center justify-between gap-4 hover:bg-[#F5F2ED] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-amber-800 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 text-slate-500 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#5A5A40] border-t border-[#F5F2ED] leading-relaxed bg-[#FDFBF7]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 7. Call to Action Footer Card */}
        <section className="bg-gradient-to-r from-[#1E293B] via-slate-900 to-amber-950 text-white rounded-[32px] p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest border border-amber-400/30">
            <Sparkles size={12} className="text-amber-400" />
            <span>2027 Yatra Seats Open</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold max-w-2xl mx-auto leading-tight">
            Ready for your Sacred Yatra to Adi Kailash & Om Parvat?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Book directly from Pithoragarh HQ. Includes Inner Line Permit clearance, 4x4 Mahindra vehicle, homestay, pure sattvic meals & high-altitude medical guide escort.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenInquiry?.("Adi Kailash & Om Parvat Yatra 2027")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              Get Instant WhatsApp Itinerary
            </button>

            <button
              onClick={handleWhatsAppHelp}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall size={15} className="text-amber-300" />
              <span>Talk to Dharchula Permit Desk</span>
            </button>
          </div>
        </section>
      </main>
    </motion.div>
  );
});

WhatToWearPage.displayName = "WhatToWearPage";

export default WhatToWearPage;
