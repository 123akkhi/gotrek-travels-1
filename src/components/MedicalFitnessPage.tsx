import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Download,
  Printer,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  CheckSquare,
  Square,
  Search,
  ChevronDown,
  ChevronUp,
  Mountain,
  FileText,
  User,
  Phone,
  Calendar,
  Pill,
  Wind,
  Droplets,
  Stethoscope,
  Clock,
  HelpCircle,
  Share2,
  BadgeCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useLanguage } from "../context/LanguageContext";
import {
  downloadMedicalClearancePassPdf,
  downloadBlankDoctorFitnessFormPdf,
  MedicalPassData
} from "../utils/medicalPassGenerator";

export interface MedicalFitnessPageProps {
  onBackToHome?: () => void;
  onOpenInquiry?: (destination?: string) => void;
  onSelectPackage?: (slug: string) => void;
}

export interface CircuitOption {
  id: string;
  title: string;
  altitude: string;
  elevationMeters: number;
  oxygenLevelPercent: string;
  difficulty: "High Altitude" | "Extreme High Pass" | "Moderate Trek" | "Spiritual Circuit";
  packageSlug?: string;
  description: string;
}

export const YATRA_CIRCUITS: CircuitOption[] = [
  {
    id: "adi-kailash",
    title: "Adi Kailash & Om Parvat Yatra",
    altitude: "14,950 ft (4,557 m)",
    elevationMeters: 4557,
    oxygenLevelPercent: "~58% of Sea Level",
    difficulty: "High Altitude",
    packageSlug: "adi-kailash-yatra-standard",
    description: "Remote Vyas Valley expedition. 4x4 Bolero transport with gradual acclimatization at Dharchula and Gunji."
  },
  {
    id: "kailash-mansarovar",
    title: "Kailash Mansarovar View (Old Lipulekh)",
    altitude: "17,060 ft (5,200 m)",
    elevationMeters: 5200,
    oxygenLevelPercent: "~52% of Sea Level",
    difficulty: "Extreme High Pass",
    packageSlug: "kailash-mansarovar-darshan-lipulekh",
    description: "Highest Indian territory viewpoint. Sub-zero morning temperatures; requires strong cardiovascular baseline."
  },
  {
    id: "chardham",
    title: "Char Dham Yatra (Kedarnath & Badrinath)",
    altitude: "11,755 ft (3,583 m)",
    elevationMeters: 3583,
    oxygenLevelPercent: "~66% of Sea Level",
    difficulty: "Spiritual Circuit",
    packageSlug: "chardham-yatra-complete",
    description: "Includes 16 km Kedarnath trek from Gaurikund. High physical walking endurance recommended."
  },
  {
    id: "valley-of-flowers",
    title: "Valley of Flowers & Hemkund Sahib",
    altitude: "14,107 ft (4,300 m)",
    elevationMeters: 4300,
    oxygenLevelPercent: "~60% of Sea Level",
    difficulty: "Moderate Trek",
    packageSlug: "valley-of-flowers-hemkund-trek",
    description: "Continuous steep mountain ascents from Ghangaria. Strong knee and ankle stability essential."
  },
  {
    id: "tungnath",
    title: "Chopta, Tungnath & Chandrashila",
    altitude: "13,100 ft (4,000 m)",
    elevationMeters: 4000,
    oxygenLevelPercent: "~62% of Sea Level",
    difficulty: "Moderate Trek",
    packageSlug: "chopta-tungnath-chandrashila-trek",
    description: "Highest Shiva temple in the world. Moderate gradient trek suitable for fit beginners."
  }
];

export interface FitnessItem {
  id: string;
  category: "vitals" | "cardio" | "altitude" | "stamina" | "documents";
  title: string;
  guideline: string;
  whyNeeded: string;
  isMandatory: boolean;
}

export const FITNESS_CHECKLIST: FitnessItem[] = [
  // 1. Vital Signs & Baseline Parameters
  {
    id: "v1",
    category: "vitals",
    title: "Resting Blood Pressure within safe threshold (< 140/90 mmHg)",
    guideline: "Systolic between 100-139 mmHg and Diastolic between 60-89 mmHg. If on BP medication, condition must be stable.",
    whyNeeded: "High altitude naturally elevates blood pressure due to vasoconstriction in cold air.",
    isMandatory: true
  },
  {
    id: "v2",
    category: "vitals",
    title: "Resting Pulse Rate under 90 bpm at sea level",
    guideline: "Resting heart rate consistently below 90 beats per minute with regular heart rhythm.",
    whyNeeded: "Pulse increases by 20-30 bpm at 14,000 ft as the body compensates for reduced oxygen.",
    isMandatory: true
  },
  {
    id: "v3",
    category: "vitals",
    title: "Baseline Blood Oxygen Saturation (SpO2 ≥ 95% at home)",
    guideline: "Tested using a fingertip pulse oximeter at sea level or normal home elevation.",
    whyNeeded: "At 14,000 ft SpO2 naturally drops to 80-86%. Starting with normal lungs prevents early hypoxia.",
    isMandatory: true
  },
  {
    id: "v4",
    category: "vitals",
    title: "Blood Glucose levels controlled (for Diabetic Yatris)",
    guideline: "Fasting < 130 mg/dL and HbA1c < 8.0 with doctor's dietary consent.",
    whyNeeded: "Cold weather and physical exertion cause rapid glucose utilization; stable baseline is critical.",
    isMandatory: false
  },
  {
    id: "v5",
    category: "vitals",
    title: "No active fever, viral throat infection, or cough in last 14 days",
    guideline: "Completely symptom-free from acute upper respiratory viral or bacterial infections.",
    whyNeeded: "A pre-existing chest infection drastically increases the risk of High Altitude Pulmonary Edema (HAPE).",
    isMandatory: true
  },

  // 2. Cardiopulmonary & Respiratory Health
  {
    id: "c1",
    category: "cardio",
    title: "No recent heart attack (MI), bypass, or stent within past 6 months",
    guideline: "Pilgrims with past cardiac history must obtain formal clearance from their treating cardiologist.",
    whyNeeded: "Sub-zero temperatures and thin air put extra workload on the coronary arteries.",
    isMandatory: true
  },
  {
    id: "c2",
    category: "cardio",
    title: "No unstable angina, chest tightness, or uncorrected arrhythmia",
    guideline: "Must be free from exertional chest pain, unexplained palpitations, or dizzy spells.",
    whyNeeded: "Myocardial oxygen demand rises significantly on mountain inclines.",
    isMandatory: true
  },
  {
    id: "c3",
    category: "cardio",
    title: "No severe COPD or chronic asthma requiring regular nebulization",
    guideline: "Mild asthma controlled by occasional dry inhaler is permissible with doctor's green light.",
    whyNeeded: "Dry freezing mountain air can trigger severe bronchospasms above 10,000 ft.",
    isMandatory: true
  },
  {
    id: "c4",
    category: "cardio",
    title: "Able to climb 3 flights of standard stairs without debilitating breathlessness",
    guideline: "Equivalent to climbing 45-50 steps at continuous normal conversational speed.",
    whyNeeded: "Practical clinical indicator of cardiac reserve and functional aerobic capacity.",
    isMandatory: true
  },
  {
    id: "c5",
    category: "cardio",
    title: "No history of stroke (CVA), TIA, or unmanaged epilepsy/seizures",
    guideline: "Stable neurological health with no unexplained fainting episodes or loss of consciousness.",
    whyNeeded: "Remote Vyas Valley is several hours away from advanced neurological intensive care.",
    isMandatory: true
  },

  // 3. High Altitude & AMS Readiness
  {
    id: "a1",
    category: "altitude",
    title: "Familiar with Acute Mountain Sickness (AMS) warning symptoms",
    guideline: "Understands early indicators: persistent headache, nausea, unusual fatigue, loss of appetite, dizziness.",
    whyNeeded: "Early self-reporting allows guides to provide oxygen and halt ascent before severe illness develops.",
    isMandatory: true
  },
  {
    id: "a2",
    category: "altitude",
    title: "Agreement to strictly follow GoTrek's gradual ascent & night stops",
    guideline: "Staging at Dharchula (3,000 ft), Gunji (10,500 ft), and Nabi (10,200 ft) without rushing.",
    whyNeeded: "Gradual acclimatization lets red blood cells naturally produce 2,3-DPG to release oxygen to tissues.",
    isMandatory: true
  },
  {
    id: "a3",
    category: "altitude",
    title: "Consulted doctor on Diamox (Acetazolamide) prophylaxis protocol",
    guideline: "Discussed 125 mg BD dosage starting at Dharchula if advised (check for sulfa drug allergies).",
    whyNeeded: "Diamox mildly acidifies blood, stimulating brainstem breathing centers during high altitude sleep.",
    isMandatory: false
  },
  {
    id: "a4",
    category: "altitude",
    title: "Agreement to the Golden Rule: 'Descend immediately if AMS worsens'",
    guideline: "Agrees that group safety and guide decisions take priority over reaching the summit.",
    whyNeeded: "Immediate descent of 2,000-3,000 ft is the only definitive curative measure for advanced mountain sickness.",
    isMandatory: true
  },
  {
    id: "a5",
    category: "altitude",
    title: "No previous history of severe HAPE or HACE without specialist clearance",
    guideline: "High Altitude Pulmonary or Cerebral Edema recurrence risk requires prior clinical evaluation.",
    whyNeeded: "Individual genetic susceptibility to severe high-altitude vascular leakage.",
    isMandatory: true
  },

  // 4. Physical Stamina & Joint Mobility
  {
    id: "s1",
    category: "stamina",
    title: "Capacity to briskly walk 4–5 km continuously on flat road in 45–55 minutes",
    guideline: "Recommended training routine for 3-4 weeks prior to the pilgrimage date.",
    whyNeeded: "Ensures stamina for walking between 4x4 parking points, temple steps, and Parvati Sarovar.",
    isMandatory: true
  },
  {
    id: "s2",
    category: "stamina",
    title: "Knees, ankles, and hips stable for uneven gravel and rocky Himalayan terrain",
    guideline: "No acute ligament tears, unhealed fractures, or severe grade IV osteoarthritis preventing walking.",
    whyNeeded: "Even with 4x4 Bolero vehicles, sacred darshan viewpoints require walking on stones and slopes.",
    isMandatory: true
  },
  {
    id: "s3",
    category: "stamina",
    title: "Comfortable with 5–7 hours of bumpy 4x4 SUV driving on mountain terrain",
    guideline: "Capable of sitting in 4x4 camper/Bolero with seatbelt along winding Himalayan border roads.",
    whyNeeded: "Dharchula to Gunji involves active border road expansion corridors.",
    isMandatory: true
  },
  {
    id: "s4",
    category: "stamina",
    title: "Practice of deep diaphragmatic breathing (Pranayama / Anulom Vilom)",
    guideline: "10-15 minutes of rhythmic nasal breathing daily improves vital lung capacity.",
    whyNeeded: "Maximizes alveolar ventilation efficiency in oxygen-depleted mountain air.",
    isMandatory: false
  },

  // 5. Mandatory Documentation & Medical Kit
  {
    id: "d1",
    category: "documents",
    title: "Doctor's Signed Physical Medical Fitness Certificate (within 30 days)",
    guideline: "Standard MBBS/MD doctor certificate required for SDM Dharchula Inner Line Permit (ILP).",
    whyNeeded: "Mandatory statutory requirement under Uttarakhand Home Department border transit rules.",
    isMandatory: true
  },
  {
    id: "d2",
    category: "documents",
    title: "5-Day extra reserve buffer of personal chronic daily medicines",
    guideline: "Keep BP, thyroid, diabetes, or heart prescriptions in your waterproof daypack (never in vehicle boot).",
    whyNeeded: "Sudden mountain landslides or road clearances can extend homestay stays by 24-48 hours.",
    isMandatory: true
  },
  {
    id: "d3",
    category: "documents",
    title: "Personal High-Altitude First Aid Pouch & Fingertip Pulse Oximeter",
    guideline: "Includes ORS/Electral, Paracetamol 650, Avomine/Stugeron for motion sickness, band-aids.",
    whyNeeded: "Immediate personal access prevents minor issues from escalating into journey disruption.",
    isMandatory: true
  },
  {
    id: "d4",
    category: "documents",
    title: "Valid Govt Photo ID (Aadhaar / Passport / Voter ID) matching medical record",
    guideline: "Required at ITBP and Uttarakhand Police check posts at Balwakot, Dharchula, and Gunji.",
    whyNeeded: "SDM Dharchula ILP approval matches biometric name with medical clearance.",
    isMandatory: true
  }
];

const LOCAL_STORAGE_KEY = "gotrek_medical_fitness_data_v1";

export const MedicalFitnessPage: React.FC<MedicalFitnessPageProps> = memo(({
  onBackToHome,
  onOpenInquiry,
  onSelectPackage
}) => {
  const { language } = useLanguage();

  // Selected Circuit
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitOption>(YATRA_CIRCUITS[0]);

  // Pilgrim Profile Information
  const [pilgrimName, setPilgrimName] = useState("");
  const [pilgrimAge, setPilgrimAge] = useState<number | string>(42);
  const [pilgrimGender, setPilgrimGender] = useState("Male");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Checked Items State
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  // UI Filters
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFaq, setShowFaq] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Clearance ID (generated once per session or loaded)
  const [clearanceId, setClearanceId] = useState("");

  // Load initial state from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.checkedIds) setCheckedIds(parsed.checkedIds);
        if (parsed.pilgrimName) setPilgrimName(parsed.pilgrimName);
        if (parsed.pilgrimAge) setPilgrimAge(parsed.pilgrimAge);
        if (parsed.pilgrimGender) setPilgrimGender(parsed.pilgrimGender);
        if (parsed.bloodGroup) setBloodGroup(parsed.bloodGroup);
        if (parsed.emergencyContact) setEmergencyContact(parsed.emergencyContact);
        if (parsed.emergencyPhone) setEmergencyPhone(parsed.emergencyPhone);
        if (parsed.circuitId) {
          const match = YATRA_CIRCUITS.find((c) => c.id === parsed.circuitId);
          if (match) setSelectedCircuit(match);
        }
        if (parsed.clearanceId) {
          setClearanceId(parsed.clearanceId);
        }
      }
    } catch {}

    if (!clearanceId) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setClearanceId(`GOTREK-MED-2027-${randomNum}`);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          checkedIds,
          pilgrimName,
          pilgrimAge,
          pilgrimGender,
          bloodGroup,
          emergencyContact,
          emergencyPhone,
          circuitId: selectedCircuit.id,
          clearanceId: clearanceId || `GOTREK-MED-2027-8942`,
          updatedAt: new Date().toISOString()
        })
      );
    } catch {}
  }, [checkedIds, pilgrimName, pilgrimAge, pilgrimGender, bloodGroup, emergencyContact, emergencyPhone, selectedCircuit, clearanceId]);

  // Statistics calculation
  const mandatoryItems = useMemo(() => FITNESS_CHECKLIST.filter((i) => i.isMandatory), []);
  const totalMandatoryCount = mandatoryItems.length; // 18 items

  const checkedMandatoryCount = useMemo(() => {
    return mandatoryItems.filter((i) => checkedIds[i.id]).length;
  }, [mandatoryItems, checkedIds]);

  const totalAllCount = FITNESS_CHECKLIST.length; // 23 items
  const totalCheckedCount = useMemo(() => {
    return Object.values(checkedIds).filter(Boolean).length;
  }, [checkedIds]);

  const mandatoryPercent = Math.round((checkedMandatoryCount / totalMandatoryCount) * 100);
  const overallPercent = Math.round((totalCheckedCount / totalAllCount) * 100);

  // Ready to Go State: All mandatory items must be ticked!
  const isReadyToGo = checkedMandatoryCount === totalMandatoryCount;

  // Age suitability triage
  const ageNum = Number(pilgrimAge) || 0;
  const ageTriage = useMemo(() => {
    if (ageNum >= 18 && ageNum <= 55) {
      return {
        label: "Optimal Fitness Band (18-55 Yrs)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        note: "Excellent age profile for high altitude adaptation."
      };
    }
    if (ageNum > 55 && ageNum <= 65) {
      return {
        label: "Senior Yatri Vigilance (56-65 Yrs)",
        color: "text-amber-800 bg-amber-50 border-amber-300",
        note: "Normal fitness band. Routine cardiac & BP check advised prior to travel."
      };
    }
    if (ageNum > 65) {
      return {
        label: "Senior Yatri Special Clearance (65+ Yrs)",
        color: "text-purple-800 bg-purple-50 border-purple-300",
        note: "SDM Dharchula requires thorough MBBS medical fitness certificate and ECG."
      };
    }
    if (ageNum > 0 && ageNum < 18) {
      return {
        label: "Junior Pilgrim (Under 18 Yrs)",
        color: "text-sky-800 bg-sky-50 border-sky-300",
        note: "Accompanied by guardian. Altitude hydration monitoring recommended."
      };
    }
    return {
      label: "Age Not Specified",
      color: "text-slate-700 bg-slate-100 border-slate-200",
      note: "Standard altitude guidelines apply."
    };
  }, [ageNum]);

  // Toggle individual checklist item
  const handleToggleItem = useCallback((id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Tick all standard health items
  const handleTickAll = useCallback(() => {
    const allChecked: Record<string, boolean> = {};
    FITNESS_CHECKLIST.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedIds(allChecked);
  }, []);

  // Reset checklist
  const handleResetChecklist = useCallback(() => {
    setCheckedIds({});
  }, []);

  // Download PDF Medical Pass
  const handleDownloadPdf = useCallback(() => {
    const passData: MedicalPassData = {
      clearanceId: clearanceId || `GOTREK-MED-2027-8942`,
      pilgrimName: pilgrimName || "Registered Pilgrim",
      age: pilgrimAge,
      gender: pilgrimGender,
      bloodGroup: bloodGroup,
      emergencyContact: emergencyContact,
      emergencyPhone: emergencyPhone,
      destinationTitle: selectedCircuit.title,
      altitude: selectedCircuit.altitude,
      issueDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      totalChecked: checkedMandatoryCount,
      totalRequired: totalMandatoryCount,
      clearedStatus: isReadyToGo ? "VERIFIED_READY_TO_GO" : "CONDITIONAL_PHYSICIAN_CLEARANCE"
    };

    downloadMedicalClearancePassPdf(passData);
  }, [
    clearanceId,
    pilgrimName,
    pilgrimAge,
    pilgrimGender,
    bloodGroup,
    emergencyContact,
    emergencyPhone,
    selectedCircuit,
    checkedMandatoryCount,
    totalMandatoryCount,
    isReadyToGo
  ]);

  // Download Blank Doctor Medical Form
  const handleDownloadDoctorForm = useCallback(() => {
    downloadBlankDoctorFitnessFormPdf(pilgrimName, selectedCircuit.title);
  }, [pilgrimName, selectedCircuit]);

  // Print pass
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Share clearance link
  const handleShare = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  }, []);

  // Filtered Checklist items
  const filteredItems = useMemo(() => {
    return FITNESS_CHECKLIST.filter((item) => {
      // Category filter
      if (activeCategoryFilter === "mandatory" && !item.isMandatory) return false;
      if (activeCategoryFilter !== "all" && activeCategoryFilter !== "mandatory" && item.category !== activeCategoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.guideline.toLowerCase().includes(q) ||
          item.whyNeeded.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategoryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-slate-50 to-[#FDF8F0] text-slate-900 pb-20 select-text">
      
      {/* 1. Page Header & Breadcrumbs */}
      <div className="bg-gradient-to-r from-[#A3161C] via-[#8B0000] to-[#700000] text-white pt-24 pb-12 shadow-lg border-b border-amber-400/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <PageBreadcrumbs
            items={[
              { label: "Home", onClick: onBackToHome },
              { label: "High-Altitude Safety", onClick: onBackToHome },
              { label: "Medical Fitness & Clearance Pass", active: true }
            ]}
            onBack={onBackToHome}
            backLabel="Back to Home"
            badge="Official Yatra Protocol"
            badgeType="gold"
          />

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <HeartPulse size={14} className="text-amber-300 animate-pulse" />
                <span>Self-Assessment & Inner Line Permit Clearance Pass</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
                High-Altitude Medical Fitness Pass
              </h1>
              <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
                Select your intended Himalayan circuit, tick the mandatory health parameters, and instantly unlock your official{" "}
                <strong className="text-amber-200">GoTrek Medical Clearance Pass & Readiness Certificate</strong>.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white">
                <ShieldCheck size={14} className="text-emerald-300" />
                <span>SDM Dharchula ILP Aligned</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white">
                <Stethoscope size={14} className="text-amber-300" />
                <span>MBBS Certificate Format Ready</span>
              </div>
              <button
                onClick={handleDownloadDoctorForm}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
                title="Download standard blank medical fitness format for your doctor"
              >
                <Download size={13} />
                <span>Doctor Blank Form (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
        
        {/* Step 1: Circuit Selection Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-amber-200/80 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 font-black text-sm">
                1
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Select Your Sacred Expedition Circuit</h2>
                <p className="text-xs text-slate-500">Altitude norms and oxygen requirements calibrate automatically.</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2">
              <Mountain size={14} className="text-amber-600 shrink-0" />
              <span>Max Altitude: <strong className="text-slate-900">{selectedCircuit.altitude}</strong></span>
              <span className="text-slate-300">•</span>
              <span>Oxygen: <strong className="text-amber-700">{selectedCircuit.oxygenLevelPercent}</strong></span>
            </div>
          </div>

          {/* Circuit Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {YATRA_CIRCUITS.map((circuit) => {
              const isSelected = selectedCircuit.id === circuit.id;
              return (
                <button
                  key={circuit.id}
                  onClick={() => setSelectedCircuit(circuit)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? "bg-amber-50/80 border-amber-500 shadow-sm ring-2 ring-amber-400/20"
                      : "bg-white hover:bg-slate-50/80 border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs font-bold leading-snug ${isSelected ? "text-[#C91D24]" : "text-slate-800"}`}>
                      {circuit.title}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      circuit.difficulty === "Extreme High Pass"
                        ? "bg-purple-100 text-purple-800"
                        : circuit.difficulty === "High Altitude"
                        ? "bg-red-100 text-red-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {circuit.altitude}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {circuit.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Pilgrim Particulars (Self Declaration Details) */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 font-black text-sm">
              2
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Pilgrim Health Profile (Printed on Official Pass)</h2>
              <p className="text-xs text-slate-500">Required to generate your personalized clearance certificate and emergency contact dossier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pilgrim Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={pilgrimName}
                  onChange={(e) => setPilgrimName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Age (Years) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  min="8"
                  max="85"
                  placeholder="42"
                  value={pilgrimAge}
                  onChange={(e) => setPilgrimAge(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/50 font-bold text-slate-800"
              >
                <option value="O+">O Positive (O+)</option>
                <option value="A+">A Positive (A+)</option>
                <option value="B+">B Positive (B+)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="O-">O Negative (O-)</option>
                <option value="A-">A Negative (A-)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="AB-">AB Negative (AB-)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Nominee & Phone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Spouse / +91-9876543210"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Age Triage Note */}
          <div className={`mt-3 p-2.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${ageTriage.color}`}>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="shrink-0" />
              <span><strong>{ageTriage.label}:</strong> {ageTriage.note}</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/70 font-black">
              Verified
            </span>
          </div>
        </div>

        {/* 3. Real-Time Fitness Progress Bar & Readiness Gauge ("AND THEN YOU ARE READY TO GO") */}
        <div className={`rounded-2xl p-5 sm:p-6 mb-8 transition-all duration-500 shadow-lg border ${
          isReadyToGo
            ? "bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/60 border-emerald-400 shadow-emerald-500/10 ring-2 ring-emerald-400/30"
            : "bg-white border-slate-200 shadow-slate-200/50"
        }`}>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left status info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full shrink-0 ${
                  isReadyToGo ? "bg-emerald-500 animate-ping" : "bg-amber-400 animate-pulse"
                }`} />
                <span className={`text-xs font-black uppercase tracking-wider ${
                  isReadyToGo ? "text-emerald-800" : "text-amber-800"
                }`}>
                  {isReadyToGo ? "Clearance Condition Fulfilled" : "Assessment in Progress"}
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-black ${
                isReadyToGo ? "text-emerald-950" : "text-slate-900"
              }`}>
                {isReadyToGo ? (
                  <span className="inline-flex items-center gap-2">
                    <span>You Are Medically Cleared & Ready to Go!</span>
                    <BadgeCheck size={26} className="text-emerald-600 inline" />
                  </span>
                ) : (
                  <span>Tick the required parameters below to get cleared</span>
                )}
              </h3>

              <p className={`text-xs sm:text-sm ${
                isReadyToGo ? "text-emerald-800" : "text-slate-600"
              }`}>
                {isReadyToGo
                  ? `All ${totalMandatoryCount} mandatory high-altitude health parameters verified for ${selectedCircuit.title}. Your pass is issued!`
                  : `${checkedMandatoryCount} of ${totalMandatoryCount} mandatory parameters verified (${totalMandatoryCount - checkedMandatoryCount} remaining).`}
              </p>
            </div>

            {/* Right Progress Counter & Gauge */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className={`text-3xl sm:text-4xl font-black font-mono ${
                  isReadyToGo ? "text-emerald-700" : "text-amber-700"
                }`}>
                  {mandatoryPercent}%
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {checkedMandatoryCount}/{totalMandatoryCount} Mandatory Cleared
                </div>
              </div>

              {/* Circular / Pill Graphic */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xs shadow-inner border border-black/5 bg-white">
                {isReadyToGo ? (
                  <div className="text-center">
                    <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                    <span className="text-[9px] font-black text-emerald-800 block uppercase">PASS</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <HeartPulse size={20} className="text-amber-600 mx-auto animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-500 block">{totalCheckedCount}/23</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continuous Progress Bar Track */}
          <div className="mt-4 w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200 relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mandatoryPercent}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`h-full rounded-full transition-all duration-300 ${
                isReadyToGo
                  ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
                  : "bg-gradient-to-r from-amber-400 via-amber-500 to-[#C91D24]"
              }`}
            />
          </div>

          {/* CELEBRATORY "READY TO GO" BADGE & PASS CONTAINER */}
          <AnimatePresence>
            {isReadyToGo && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 15 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-emerald-200/80 overflow-hidden"
              >
                {/* Official Clearance Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-500 shadow-md relative overflow-hidden">
                  
                  {/* Decorative Background Stamp */}
                  <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none select-none">
                    <ShieldCheck size={220} className="text-emerald-900" />
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
                    
                    {/* Left details */}
                    <div className="space-y-2 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                        <span>OFFICIAL YATRA CLEARANCE PASS # {clearanceId}</span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-black text-slate-900">
                        {pilgrimName ? `${pilgrimName.toUpperCase()} — MEDICALLY CLEARED` : "PILGRIM MEDICALLY CLEARED"}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Destination</span>
                          <strong className="text-slate-900">{selectedCircuit.title}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Altitude Cleared</span>
                          <strong className="text-emerald-700">{selectedCircuit.altitude}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Blood Group</span>
                          <strong className="text-amber-700">{bloodGroup}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Age / Gender</span>
                          <strong className="text-slate-900">{pilgrimAge} Yrs / {pilgrimGender}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Clearance Date</span>
                          <strong className="text-slate-900">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Verification Status</span>
                          <strong className="text-emerald-700">100% Cleared [OK]</strong>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Verification Box */}
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
                      <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                        <QRCodeSVG
                          value={`GoTrek Travels | Verified Medical Clearance Pass\nRef: ${clearanceId}\nPilgrim: ${pilgrimName || "Registered Pilgrim"}\nAge: ${pilgrimAge}\nBlood Group: ${bloodGroup}\nCircuit: ${selectedCircuit.title}\nStatus: VERIFIED_READY_TO_GO\nBase: Dharchula SDM Liaison`}
                          size={76}
                          level="M"
                        />
                      </div>
                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <span className="font-bold text-slate-800 block">Digital Verification</span>
                        <span>Scan at Dharchula base</span>
                        <span className="text-emerald-700 font-bold block">✓ SDM Protocol Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Cleared Pass */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleDownloadPdf}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Download size={14} />
                      <span>Download Official Medical Pass (PDF)</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Printer size={14} />
                      <span>Print Pass</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenInquiry) {
                          onOpenInquiry(`${selectedCircuit.title} (Medically Cleared - Pass #${clearanceId})`);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#C91D24] hover:bg-red-800 active:scale-95 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Sparkles size={14} className="text-amber-300" />
                      <span>Proceed to Book Yatra 2027</span>
                    </button>

                    <button
                      onClick={handleDownloadDoctorForm}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Download Doctor Physical Form</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
                    >
                      <Share2 size={13} />
                      <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 3: Interactive Checklist Items */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 mb-8">
          
          {/* Header & Quick Ticking Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 font-black text-sm">
                3
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Medical Fitness & Altitude Parameters</h2>
                <p className="text-xs text-slate-500">Tick each parameter to confirm your physical fitness and readiness.</p>
              </div>
            </div>

            {/* Fast bulk action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTickAll}
                className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#C91D24] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Select all if you satisfy standard healthy high-altitude conditions"
              >
                <CheckSquare size={14} />
                <span>Tick All Standard Health Norms</span>
              </button>

              <button
                onClick={handleResetChecklist}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                title="Reset all selections"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Search and Category Filter Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 text-xs font-bold">
              {[
                { key: "all", label: `All Criteria (${totalAllCount})` },
                { key: "mandatory", label: `Mandatory (${totalMandatoryCount})` },
                { key: "vitals", label: "1. Vitals" },
                { key: "cardio", label: "2. Heart & Lungs" },
                { key: "altitude", label: "3. AMS & Altitude" },
                { key: "stamina", label: "4. Stamina" },
                { key: "documents", label: "5. Papers & Kit" }
              ].map((tab) => {
                const isActive = activeCategoryFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategoryFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#C91D24] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-60 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search health check..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-slate-50/50"
              />
            </div>
          </div>

          {/* Checklist Items List */}
          <div className="space-y-2.5">
            {filteredItems.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No items match your search or filter. Try switching tabs.
              </div>
            ) : (
              filteredItems.map((item) => {
                const isChecked = !!checkedIds[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                        : "bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {/* Checkbox Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 size={16} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white hover:border-slate-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-xs sm:text-sm font-bold ${
                          isChecked ? "text-emerald-950" : "text-slate-900"
                        }`}>
                          {item.title}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.isMandatory ? (
                            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              Recommended
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.guideline}
                      </p>

                      <div className="pt-1 flex items-start gap-1.5 text-[11px] text-amber-800">
                        <Info size={13} className="text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Clinical Rationale:</strong> {item.whyNeeded}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Fast Action Footer inside Card */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Checked <strong className="text-slate-800">{totalCheckedCount}</strong> of {totalAllCount} items.
              {isReadyToGo ? (
                <span className="text-emerald-700 font-bold ml-1.5">✓ All mandatory requirements satisfied!</span>
              ) : (
                <span className="text-amber-700 font-medium ml-1.5">
                  Complete {totalMandatoryCount - checkedMandatoryCount} more mandatory items to unlock pass.
                </span>
              )}
            </span>

            {!isReadyToGo && (
              <button
                onClick={handleTickAll}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all cursor-pointer shrink-0"
              >
                Tick All & Complete Pass →
              </button>
            )}
          </div>
        </div>

        {/* 4. Altitude Acclimatization Rules & On-Ground Safety Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          
          {/* Box 1: Golden Rules of High Altitude */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Mountain size={16} className="text-amber-600" />
              <span>The 3 Golden Altitude Rules of Vyas Valley</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span><strong>Hydrate Rhythmical:</strong> Drink 3-4 liters of lukewarm water daily. Avoid alcohol, caffeine, or sleeping pills which suppress respiratory drive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span><strong>Climb High, Sleep Low:</strong> Daytime drives touch high passes, while overnight homestays in Gunji (10,500 ft) allow restorative recovery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <span><strong>Never Conceal Symptoms:</strong> Inform your GoTrek mountain captain at the first headache or nausea. Medical oxygen is available on board.</span>
              </li>
            </ul>
          </div>

          {/* Box 2: GoTrek Medical Safety Net */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-5 border border-amber-300/60 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#C91D24] font-bold text-sm">
              <ShieldCheck size={16} className="text-[#C91D24]" />
              <span>GoTrek High-Altitude Medical Infrastructure</span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p>
                Every GoTrek 4x4 expedition vehicle in the Pithoragarh–Dharchula–Gunji circuit is equipped with:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-800">
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex items-center gap-2">
                  <Wind size={14} className="text-sky-600" />
                  <span>Medical Oxygen Cylinders</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex items-center gap-2">
                  <HeartPulse size={14} className="text-red-600" />
                  <span>Daily SpO2 Pulse Oximetry</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex items-center gap-2">
                  <Pill size={14} className="text-emerald-600" />
                  <span>High-Altitude First Aid Box</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200 flex items-center gap-2">
                  <Phone size={14} className="text-amber-600" />
                  <span>ITBP Base Camp Medical Liaison</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FAQs Accordion */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFaq(!showFaq)}>
            <div className="flex items-center gap-2">
              <HelpCircle size={18} className="text-amber-600" />
              <h3 className="font-bold text-base text-slate-900">Frequently Asked Medical Fitness Questions</h3>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              {showFaq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {showFaq && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block text-xs">Can seniors above 60 years participate in Adi Kailash & Om Parvat?</strong>
                <p className="mt-1 leading-relaxed">
                  Yes, over 40% of our pilgrims are seniors aged 55 to 72! Since 4x4 Bolero transport takes yatris right up to Jolingkong base (walking under 2-3 km), healthy seniors with managed blood pressure and normal ECG routinely complete the pilgrimage safely.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block text-xs">Is Diamox (Acetazolamide) mandatory for everyone?</strong>
                <p className="mt-1 leading-relaxed">
                  Diamox is not mandatory, but it is highly recommended by high-altitude specialists. It helps your body adjust faster by stimulating respiration during sleep. Anyone with a known sulfa drug allergy should NOT take Diamox.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block text-xs">What happens if a pilgrim feels breathless or sick at Gunji or Jolingkong?</strong>
                <p className="mt-1 leading-relaxed">
                  GoTrek expedition leaders carry medical oxygen cylinders in every vehicle and perform SpO2 checks twice daily. In case of acute AMS, the yatri is placed on oxygen and immediately escorted to lower altitudes (Nabi or Dharchula). ITBP medical centers are situated along the route.
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block text-xs">Where do I get the physical doctor's certificate signed?</strong>
                <p className="mt-1 leading-relaxed">
                  You can print the blank "Doctor Medical Certificate Form (PDF)" provided above and have it signed by any registered MBBS or MD physician in your home city within 30 days before the pilgrimage date.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 6. Medical Disclaimer Note */}
        <div className="text-[11px] text-slate-500 text-center max-w-3xl mx-auto space-y-1.5 pb-6">
          <p>
            <strong>Statutory Medical Notice:</strong> This interactive medical fitness checklist is designed in accordance with the standard high-altitude pilgrimage guidelines of Uttarakhand Tourism Development Board (UTDB) and the Sub-Divisional Magistrate (SDM) of Dharchula.
          </p>
          <p>
            The digital clearance pass serves as a pre-arrival self-declaration. Final on-ground biometric verification (blood pressure and SpO2 check) is performed at Dharchula base camp prior to transit into the Inner Line zone.
          </p>
        </div>

      </div>
    </div>
  );
});
