import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  RotateCcw,
  Pill,
  Wind,
  Droplets,
  Thermometer,
  Stethoscope,
  Mountain,
  BedDouble,
  FileCheck2,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Info,
  ShieldAlert,
  Sun,
  Coffee,
  HelpCircle,
} from "lucide-react";

interface YatraHealthAltitudeSectionProps {
  onOpenInquiry?: (destination?: string) => void;
  onSelectBlog?: (slug?: string) => void;
  onOpenMedicalFitness?: () => void;
}

type TabType = "acclimatization" | "ams-symptoms" | "medical-checklist";

interface ChecklistItem {
  id: string;
  category: "diagnostic" | "prescription" | "symptomatic" | "protection";
  name: string;
  dosageOrUsage: string;
  essentialLevel: "Mandatory" | "Highly Recommended" | "Recommended";
  whyNeeded: string;
}

const MEDICAL_CHECKLIST_DATA: ChecklistItem[] = [
  // Diagnostic & Oxygen
  {
    id: "oximeter",
    category: "diagnostic",
    name: "Fingertip Pulse Oximeter",
    dosageOrUsage: "Check SpO2 twice daily (keep inside warm pocket)",
    essentialLevel: "Mandatory",
    whyNeeded: "Cold batteries drain fast. Tests oxygen saturation before symptoms show.",
  },
  {
    id: "oxygen-canister",
    category: "diagnostic",
    name: "Portable Oxygen Canister (Oxy99 / Similar)",
    dosageOrUsage: "3-5 puffs during sudden breathlessness",
    essentialLevel: "Highly Recommended",
    whyNeeded: "Provides emergency relief while 4x4 SUV reaches clinical base.",
  },
  {
    id: "thermometer",
    category: "diagnostic",
    name: "Digital Clinical Thermometer",
    dosageOrUsage: "Monitor for fever / hypothermia chills",
    essentialLevel: "Recommended",
    whyNeeded: "Distinguishes mountain fatigue from bacterial fever or chest infection.",
  },

  // Prescription & Prophylaxis
  {
    id: "diamox",
    category: "prescription",
    name: "Diamox (Acetazolamide 125mg / 250mg)",
    dosageOrUsage: "Consult your doctor (usually 125mg BD starting at Dharchula)",
    essentialLevel: "Highly Recommended",
    whyNeeded: "Acidifies blood to stimulate breathing rate during sleep at 10,000+ ft.",
  },
  {
    id: "personal-meds",
    category: "prescription",
    name: "Personal Chronic Medications (BP / Diabetes / Thyroid)",
    dosageOrUsage: "Full regular dosage + minimum 5 days reserve buffer",
    essentialLevel: "Mandatory",
    whyNeeded: "Mountain switchbacks and landslides can extend stays; no pharmacies above Dharchula.",
  },
  {
    id: "doctor-fitness-cert",
    category: "prescription",
    name: "Doctor Medical Certificate & Blood Group Card",
    dosageOrUsage: "Original signed copy with emergency contact details",
    essentialLevel: "Mandatory",
    whyNeeded: "Required for SDM Inner Line Permit endorsement at Dharchula.",
  },

  // Symptomatic Relief & First Aid
  {
    id: "ors-electral",
    category: "symptomatic",
    name: "ORS / Electral / Enerzal Sachets",
    dosageOrUsage: "2-3 packets daily dissolved in lukewarm water",
    essentialLevel: "Mandatory",
    whyNeeded: "Rapid cellular rehydration. Thin cold air dehydrates lungs twice as fast as plains.",
  },
  {
    id: "paracetamol",
    category: "symptomatic",
    name: "Paracetamol (650mg) & Ibuprofen (400mg)",
    dosageOrUsage: "1 tab after meals for altitude tension headache or body aches",
    essentialLevel: "Mandatory",
    whyNeeded: "First line of defense against primary acclimatization headaches.",
  },
  {
    id: "antiemetic",
    category: "symptomatic",
    name: "Avomine / Ondansetron (Nausea & Motion)",
    dosageOrUsage: "1 tab 30 mins before winding 4x4 mountain drives",
    essentialLevel: "Highly Recommended",
    whyNeeded: "Relieves mountain motion sickness on the 100+ hairpin turns to Gunji.",
  },
  {
    id: "antacid",
    category: "symptomatic",
    name: "Antacid (Omeprazole 20mg / Gelusil / Pudin Hara)",
    dosageOrUsage: "1 tab empty stomach in morning or after rich meals",
    essentialLevel: "Recommended",
    whyNeeded: "High altitude slows gastrointestinal transit, causing bloating and gastric reflux.",
  },
  {
    id: "antidiarrheal",
    category: "symptomatic",
    name: "Loperamide / O2 / Norflox-TZ & Probiotic",
    dosageOrUsage: "For acute stomach upset or bacterial gut dysentery",
    essentialLevel: "Highly Recommended",
    whyNeeded: "Prevents severe dehydrating diarrhea when adapting to mountain water sources.",
  },
  {
    id: "nasal-saline",
    category: "symptomatic",
    name: "Nasal Saline Spray & Decongestant Drops",
    dosageOrUsage: "2 sprays in each nostril morning and night",
    essentialLevel: "Recommended",
    whyNeeded: "Prevents nosebleeds and dry mucosal crusting in zero-humidity sub-zero winds.",
  },
  {
    id: "throat-lozenges",
    category: "symptomatic",
    name: "Throat Lozenges (Strepsils / Cofsils / Ginger Chew)",
    dosageOrUsage: "Suck as needed when throat feels parched or scratchy",
    essentialLevel: "Recommended",
    whyNeeded: "Soothes the notorious high-altitude 'Himalayan Dry Cough' (Khumbu cough).",
  },

  // Cold, Sun & Skin Protection
  {
    id: "camphor-pouch",
    category: "protection",
    name: "Natural Camphor (Karpoor) Handkerchief Pouch",
    dosageOrUsage: "Inhale gently when feeling lightheaded or congested",
    essentialLevel: "Recommended",
    whyNeeded: "Traditional Ayurvedic remedy that opens nasal airways and creates refreshing mental clarity.",
  },
  {
    id: "spf50-sunscreen",
    category: "protection",
    name: "Broad Spectrum SPF 50+ Sunscreen & Lip Balm with UV filter",
    dosageOrUsage: "Reapply every 3 hours on face, neck, and ears",
    essentialLevel: "Mandatory",
    whyNeeded: "UV radiation increases 12% per 1,000m elevation. Snow reflection causes severe blistering.",
  },
  {
    id: "bandages-antiseptic",
    category: "protection",
    name: "Blister Band-Aids, Betadine & Crepe Bandage",
    dosageOrUsage: "Apply to friction points on heels before walking",
    essentialLevel: "Recommended",
    whyNeeded: "Trekking boots on frozen gravel can cause friction blisters that hinder yatra.",
  },
];

const LOCAL_STORAGE_KEY = "gotrek_yatra_medical_checklist_v2";

export const YatraHealthAltitudeSection = memo(({ onOpenInquiry, onSelectBlog, onOpenMedicalFitness }: YatraHealthAltitudeSectionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("acclimatization");
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if local storage fails
    }
    // Default checked essentials
    return ["oximeter", "diamox", "ors-electral", "personal-meds"];
  });

  const [copySuccess, setCopySuccess] = useState(false);
  const [checklistFilter, setChecklistFilter] = useState<"all" | "diagnostic" | "prescription" | "symptomatic" | "protection">("all");

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {}
  }, [checkedIds]);

  const toggleCheckItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setCheckedIds(MEDICAL_CHECKLIST_DATA.map((item) => item.id));
  };

  const handleResetChecklist = () => {
    setCheckedIds([]);
  };

  const handleCopyChecklist = () => {
    const text = MEDICAL_CHECKLIST_DATA.map(
      (item) =>
        `[${checkedIds.includes(item.id) ? "x" : " "}] ${item.name} (${item.essentialLevel})\n   Usage: ${item.dosageOrUsage}\n   Note: ${item.whyNeeded}`
    ).join("\n\n");

    const fullText = `GoTrek Himalayan Yatra - High Altitude Medical & Health Checklist:\n\n${text}\n\nChecked: ${checkedIds.length}/${MEDICAL_CHECKLIST_DATA.length} items packed.\nGoTrek 24/7 Medical Oxygen Support: +91 94120 12345`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const filteredChecklist = useMemo(() => {
    if (checklistFilter === "all") return MEDICAL_CHECKLIST_DATA;
    return MEDICAL_CHECKLIST_DATA.filter((item) => item.category === checklistFilter);
  }, [checklistFilter]);

  const completionPercentage = Math.round(
    (checkedIds.length / MEDICAL_CHECKLIST_DATA.length) * 100
  );

  return (
    <section
      id="yatra-health-guide"
      className="relative py-16 sm:py-24 bg-[#FBF9F4] border-t border-b border-[#E6E0D2] overflow-hidden"
    >
      {/* Background Subtle Mountain Watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-bold uppercase tracking-[0.18em]">
            <HeartPulse size={15} className="text-emerald-700 animate-pulse" />
            <span>High-Altitude Pilgrim Medical Protocols</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            Yatra Health & <span className="italic text-amber-800">Altitude Guide</span>
          </h2>

          <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed">
            Adi Kailash (14,950 ft) and Om Parvat (14,000 ft) feature ~40% lower atmospheric oxygen.
            Equip yourself with proven mountain acclimatization protocols, early AMS triage, and our verified medical checklist.
          </p>

          {/* Quick Stat Pill Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-left">
            <div className="p-3 rounded-xl bg-white border border-[#E6E0D2] shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <Wind size={15} />
                <span>14,950 FT</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Highest point at Parvati Sarovar; gradual staging prevents hypoxia.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6E0D2] shadow-2xs">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                <Activity size={15} />
                <span>2x Daily SpO2</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Morning & night vitals tracked by GoTrek expedition leads.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6E0D2] shadow-2xs">
              <div className="flex items-center gap-2 text-blue-800 text-xs font-bold">
                <Stethoscope size={15} />
                <span>O2 In Every 4x4</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Medical oxygen cylinders & regulators in all Bolero/Scorpio SUVs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6E0D2] shadow-2xs">
              <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
                <ShieldCheck size={15} />
                <span>ITBP Base Sync</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Emergency direct liaison with military border medical outposts.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex justify-center mb-10">
          <div
            id="yatra-health-tabs"
            className="inline-flex p-1.5 rounded-2xl bg-[#EFE9DC] border border-[#DDD5C5] shadow-inner max-w-full overflow-x-auto"
          >
            <button
              type="button"
              id="tab-acclimatization"
              onClick={() => setActiveTab("acclimatization")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "acclimatization"
                  ? "bg-white text-[#1E293B] shadow-xs border border-[#D5CDBC]"
                  : "text-[#6B6B55] hover:text-[#1E293B]"
              }`}
            >
              <Mountain size={16} className={activeTab === "acclimatization" ? "text-amber-700" : ""} />
              <span>1. Acclimatization Rules</span>
            </button>

            <button
              type="button"
              id="tab-ams-symptoms"
              onClick={() => setActiveTab("ams-symptoms")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "ams-symptoms"
                  ? "bg-white text-[#1E293B] shadow-xs border border-[#D5CDBC]"
                  : "text-[#6B6B55] hover:text-[#1E293B]"
              }`}
            >
              <AlertTriangle size={16} className={activeTab === "ams-symptoms" ? "text-rose-700" : ""} />
              <span>2. AMS Symptoms & Triage</span>
            </button>

            <button
              type="button"
              id="tab-medical-checklist"
              onClick={() => setActiveTab("medical-checklist")}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "medical-checklist"
                  ? "bg-white text-[#1E293B] shadow-xs border border-[#D5CDBC]"
                  : "text-[#6B6B55] hover:text-[#1E293B]"
              }`}
            >
              <Pill size={16} className={activeTab === "medical-checklist" ? "text-emerald-700" : ""} />
              <span>3. Medical Essentials Checklist</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {checkedIds.length}/{MEDICAL_CHECKLIST_DATA.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {/* 1. ACCLIMATIZATION TIPS TAB */}
          {activeTab === "acclimatization" && (
            <motion.div
              key="tab-acclimatization"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Golden Rule Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-200/70 text-amber-900 shrink-0">
                    <Mountain size={24} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">
                      The Golden Rule of High Altitude: Never Ascend with Symptoms
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900/80 mt-1 leading-relaxed">
                      If you experience headache, nausea, or dizziness, stop ascending immediately. Rest, hydrate, and notify your GoTrek driver. If symptoms worsen, descent of even 1,500 ft (from Jolingkong back to Gunji or Dharchula) provides immediate physiological recovery.
                    </p>
                  </div>
                </div>
                {onSelectBlog && (
                  <button
                    type="button"
                    onClick={() => onSelectBlog("high-altitude-medical-oxygen-safety-guide")}
                    className="shrink-0 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Read Full Medical Guide</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>

              {/* 6 Core Acclimatization Principles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Principle 1 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-4">
                    <BedDouble size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    Staged Altitude Sleep
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    Climb High, Sleep Low
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    GoTrek’s curated circuit pauses at Dharchula (3,000 ft) for permit briefing, then ascends to Gunji/Nabi (10,500 ft) for 2 overnight stays. This allows your kidneys to produce erythropoietin, increasing oxygen-carrying red blood cells before visiting 14,950 ft.
                  </p>
                </div>

                {/* Principle 2 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 mb-4">
                    <Droplets size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1">
                    Hydration Discipline
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    Drink 4 to 5 Liters Daily
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cold alpine air holds minimal humidity; your lungs expel moisture rapidly with every breath. Drink warm water, herbal Kahwa, ginger tea, and 2 sachets of ORS daily. Check urine color: pale straw yellow indicates optimal hydration; dark yellow signals acute dehydration.
                  </p>
                </div>

                {/* Principle 3 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mb-4">
                    <Coffee size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                    High-Carb Mountain Fuel
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    Eat Complex Carbohydrates
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Carbohydrates require 8% to 10% less oxygen to metabolize into energy compared to heavy fats and proteins. Enjoy fresh local Kumaoni meals: Mandua (finger millet) roti, Bhatt ki Churkani (soybean dal), hot khichdi, and boiled potatoes. Avoid heavy oily junk food.
                  </p>
                </div>

                {/* Principle 4 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-800 mb-4">
                    <ShieldAlert size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 mb-1">
                    Zero Depressants
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    No Alcohol, Tobacco or Sedatives
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Alcohol, cigarette smoking, and over-the-counter sleeping pills depress the respiratory drive during sleep. This causes severe drops in nighttime blood oxygen, triggering acute morning headaches and early AMS. Maintain a clean, pure sattvic routine.
                  </p>
                </div>

                {/* Principle 5 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800 mb-4">
                    <Activity size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-800 mb-1">
                    Movement & Breathing
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    Master the "Sherpa Shuffle"
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    At Jolingkong and Nabhidhang, walk slowly with small deliberate steps. Synchronize breathing: inhale deeply through your nose, pause for half a second, and exhale gently through pursed lips. Never run, jog, or jump for photographs at 14,000+ ft.
                  </p>
                </div>

                {/* Principle 6 */}
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D4] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 mb-4">
                    <Sun size={20} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 mb-1">
                    Thermal Protection
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    Cover Ears, Head & Core
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hypothermia drains your body's energy reserves and mimics altitude sickness. Always wear a thermal fleece beanie that covers the ears, windproof neck gaiter, and wool socks. Never sleep with cold feet — wear clean dry wool socks inside your quilt.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. AMS SYMPTOMS & TRIAGE TAB */}
          {activeTab === "ams-symptoms" && (
            <motion.div
              key="tab-ams-symptoms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Triage Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stage 1: Mild / Moderate AMS */}
                <div className="p-6 rounded-2xl bg-white border-2 border-amber-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        Stage 1: Common
                      </span>
                      <span className="text-xs font-semibold text-slate-500">SpO2: 78% – 85%</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                      Mild to Moderate AMS
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Occurs in 30–40% of pilgrims on Day 2 or 3 as the body adapts to Vyas Valley.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Typical Symptoms:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>Frontal or bitemporal throbbing headache</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>Unusual fatigue & mild lightheadedness</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>Loss of appetite, mild nausea upon waking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>Restless sleep with vivid dreams</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-xs font-bold text-amber-900 mb-1">
                      Action Protocol:
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Do not ascend further. Rest in homestay, take 500ml warm water with ORS, take Paracetamol 650mg. If symptoms don't resolve in 4-6 hours, start Diamox (under doctor advice).
                    </p>
                  </div>
                </div>

                {/* Stage 2: HAPE (Lungs) */}
                <div className="p-6 rounded-2xl bg-white border-2 border-rose-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
                        Critical: Lungs
                      </span>
                      <span className="text-xs font-semibold text-slate-500">SpO2: &lt; 70%</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-rose-950 mb-2">
                      HAPE (Pulmonary Edema)
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Fluid builds inside the lungs due to constriction of pulmonary capillaries under low oxygen.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Red Flag Signs:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span className="font-semibold text-rose-900">Breathlessness even while lying flat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>Persistent wet cough with rattling sound</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>Pink or frothy sputum (blood-tinged)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>Cyanosis: Bluish or grayish lips & nailbeds</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                    <div className="text-xs font-bold text-rose-900 mb-1">
                      Emergency Action:
                    </div>
                    <p className="text-xs text-rose-800 leading-relaxed">
                      <strong>IMMEDIATE DESCENT.</strong> Connect to GoTrek 4x4 high-flow oxygen cylinder (4-6 L/min). Descend immediately toward Dharchula. Evacuate to ITBP Base Hospital.
                    </p>
                  </div>
                </div>

                {/* Stage 3: HACE (Brain) */}
                <div className="p-6 rounded-2xl bg-white border-2 border-red-500 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                        Life Threatening: Brain
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Immediate SOS</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                      HACE (Cerebral Edema)
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Brain tissue swells due to severe hypoxia. Requires urgent, immediate descent within minutes.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Cardinal Symptoms:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span className="font-semibold text-red-900">Ataxia: Inability to walk in a straight line</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Severe unyielding headache unaffected by pain meds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Confusion, hallucinations, or irrational behavior</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Extreme stupor or loss of consciousness</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50 border border-red-300">
                    <div className="text-xs font-bold text-red-900 mb-1">
                      Critical SOS Protocol:
                    </div>
                    <p className="text-xs text-red-800 leading-relaxed">
                      Administer 8mg Dexamethasone immediately under medical supervision. High-flow oxygen. <strong>Descend at once</strong> in 4x4. Alert ITBP heli-evacuation base at Dharchula.
                    </p>
                  </div>
                </div>
              </div>

              {/* The "Tandem Walking Test" & Pulse Oximeter Reference Guide */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6E0D2] shadow-2xs space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Stethoscope size={18} className="text-emerald-700" />
                      <span>The 60-Second Mountain Self-Check: Tandem Heel-to-Toe Test</span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Before heading out from Gunji or Jolingkong each morning, perform this simple neurological test.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
                    Standard Medical Field Test
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      How to do the Ataxia Test:
                    </div>
                    <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside">
                      <li>Find a flat stretch in your homestay or room.</li>
                      <li>Walk 10 steps in a straight line, placing the heel of one foot directly against the toes of the other.</li>
                      <li>Keep arms loosely by your sides.</li>
                      <li>
                        <strong>Result:</strong> If you sway severely, stumble sideways, or cannot take 5 steps without losing balance, <strong>you have early Ataxia (HACE)</strong>. Inform GoTrek staff immediately.
                      </li>
                    </ol>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span>Altitude SpO2 Interpretation Table:</span>
                      <Activity size={14} className="text-slate-500" />
                    </div>
                    <div className="text-xs space-y-1.5">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-100/60 text-emerald-950 font-medium">
                        <span>SpO2 &gt; 85% at 14,000 ft</span>
                        <span className="text-[11px] font-bold">Excellent Mountain Adaptation</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-amber-100/60 text-amber-950 font-medium">
                        <span>SpO2 75% – 85% at 14,000 ft</span>
                        <span className="text-[11px] font-bold">Normal / Mild Hypoxia (Rest & Hydrate)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-rose-100/60 text-rose-950 font-medium">
                        <span>SpO2 &lt; 70% at any altitude</span>
                        <span className="text-[11px] font-bold text-rose-800">Oxygen Therapy & Descent Required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. MEDICAL ESSENTIALS CHECKLIST TAB */}
          {activeTab === "medical-checklist" && (
            <motion.div
              key="tab-medical-checklist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Checklist Action Bar */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6E0D2] shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Pilgrim Packing Progress:
                    </h3>
                    <span className="text-sm font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {checkedIds.length} of {MEDICAL_CHECKLIST_DATA.length} Packed ({completionPercentage}%)
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full sm:w-80 h-2.5 bg-slate-100 rounded-full overflow-hidden mt-2.5 border border-slate-200">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Items are saved to your browser automatically. Click any item to check/uncheck.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <button
                    type="button"
                    id="copy-medical-checklist-btn"
                    onClick={handleCopyChecklist}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  >
                    {copySuccess ? (
                      <>
                        <Check size={14} className="text-emerald-700" />
                        <span className="text-emerald-800">Checklist Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    id="select-all-checklist-btn"
                    onClick={handleSelectAll}
                    className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                  >
                    <CheckCircle2 size={14} />
                    <span>Check All</span>
                  </button>

                  <button
                    type="button"
                    id="reset-checklist-btn"
                    onClick={handleResetChecklist}
                    className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>

                  {onOpenMedicalFitness && (
                    <button
                      type="button"
                      id="open-full-medical-pass-btn"
                      onClick={onOpenMedicalFitness}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 border border-amber-500"
                    >
                      <HeartPulse size={14} className="text-[#C91D24] animate-pulse" />
                      <span>Full Medical Clearance Pass →</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Essentials (16)" },
                  { id: "diagnostic", label: "Diagnostic & Oxygen (3)" },
                  { id: "prescription", label: "Prescription & Prophylaxis (3)" },
                  { id: "symptomatic", label: "Symptomatic & Gut (7)" },
                  { id: "protection", label: "Skin & Cold Shield (3)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setChecklistFilter(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      checklistFilter === tab.id
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Checklist Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredChecklist.map((item) => {
                  const isChecked = checkedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheckItem(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        isChecked
                          ? "bg-emerald-50/50 border-emerald-300 shadow-2xs"
                          : "bg-white border-[#E6E0D2] hover:border-slate-300"
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-emerald-700"
                        aria-label={`Toggle ${item.name}`}
                      >
                        {isChecked ? (
                          <CheckCircle2 size={22} className="fill-emerald-600 text-white" />
                        ) : (
                          <Circle size={22} className="text-slate-300 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold truncate ${
                              isChecked ? "line-through text-slate-500" : "text-slate-900"
                            }`}
                          >
                            {item.name}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              item.essentialLevel === "Mandatory"
                                ? "bg-rose-100 text-rose-800"
                                : item.essentialLevel === "Highly Recommended"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.essentialLevel}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mt-1">
                          <span className="font-semibold text-slate-800">Usage:</span> {item.dosageOrUsage}
                        </p>

                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          "{item.whyNeeded}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Medical Advisory Callout */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-3">
                <Info size={18} className="text-blue-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Important Doctor Prescription Advisory:</strong> All medications (especially Diamox / Acetazolamide, BP drugs, and antibiotics) must be reviewed with your registered family physician prior to travel. Acetazolamide is contraindicated in individuals with known sulfur allergies. GoTrek guides provide logistical safety and oxygen; they do not prescribe prescription pharmaceuticals.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Banner: GoTrek Medical Infrastructure Guarantee */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>GoTrek Medical Safety Shield Included</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-tight">
                Traveling with Senior Citizens or First-Time Pilgrims?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every GoTrek 4x4 Bolero and Scorpio carries dedicated medical-grade oxygen cylinders, oximeters, and first-aid kits. Our high-altitude drivers and Sherpa guides are certified in CPR and mountain triage protocols.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              {onOpenInquiry && (
                <button
                  type="button"
                  id="consult-medical-inquiry-btn"
                  onClick={() => onOpenInquiry("Medical Inquiry / Senior Citizen Assistance")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <PhoneCall size={15} />
                  <span>Consult Medical Team</span>
                </button>
              )}

              {onSelectBlog && (
                <button
                  type="button"
                  id="read-altitude-blog-btn"
                  onClick={() => onSelectBlog("high-altitude-medical-oxygen-safety-guide")}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
                >
                  <FileCheck2 size={15} />
                  <span>Oxygen Safety Guide</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

YatraHealthAltitudeSection.displayName = "YatraHealthAltitudeSection";

export default YatraHealthAltitudeSection;
