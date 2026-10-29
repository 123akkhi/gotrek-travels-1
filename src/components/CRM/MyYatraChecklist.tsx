import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  MinusCircle,
  FileText,
  HeartPulse,
  Backpack,
  Search,
  Filter,
  Plus,
  RotateCcw,
  Printer,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Info,
  Calendar,
  MapPin,
  X,
  FileCheck2,
  Stethoscope,
  Compass,
} from "lucide-react";
import { LeadBooking } from "../../types";

export type ChecklistStatus = "completed" | "in_progress" | "action_required" | "exempt";
export type ChecklistCategory = "documents" | "medical" | "personal";

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  description: string;
  required: boolean;
  checkpoint: string;
  status: ChecklistStatus;
  notes?: string;
  updatedAt?: string;
  ilpKey?: "aadharProvided" | "policeVerification" | "medicalCertificate" | "sdmApproval" | "itbpClearance";
}

interface MyYatraChecklistProps {
  leads: LeadBooking[];
  selectedLeadId?: string | null;
  onSelectLead?: (lead: LeadBooking | null) => void;
  onUpdateLeadIlp?: (
    leadId: string,
    ilpUpdates: Partial<LeadBooking["ilpStatus"]>
  ) => void;
}

const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // ─── 1. ESSENTIAL DOCUMENTS ──────────────────────────────────────────
  {
    id: "doc-sdm-ilp",
    category: "documents",
    title: "Inner Line Permit (ILP) SDM Dharchula Clearance",
    description: "Official Sub-Divisional Magistrate border area clearance required for Nabi, Gunji, Jolingkong & Lipulekh route.",
    required: true,
    checkpoint: "SDM Dharchula / Pithoragarh Admin",
    status: "in_progress",
    notes: "Application dispatched to Dharchula SDM office.",
    ilpKey: "sdmApproval",
  },
  {
    id: "doc-aadhar",
    category: "documents",
    title: "Government ID (Aadhaar / Passport) Front & Back",
    description: "Original physical Aadhaar card + 3 verified hard copies with clear DOB and complete residential address.",
    required: true,
    checkpoint: "Kathgodam & Dharchula Checkpost",
    status: "completed",
    notes: "Verified with UIDAI database. Original carried physically.",
    ilpKey: "aadharProvided",
  },
  {
    id: "doc-police-verification",
    category: "documents",
    title: "Police Verification Certificate (PVC)",
    description: "Character & criminal record clearance from local police station/SP office issued within last 6 months.",
    required: true,
    checkpoint: "Dharchula Kotwali & ITBP Base",
    status: "completed",
    notes: "Local Thana police certificate verified and stamped.",
    ilpKey: "policeVerification",
  },
  {
    id: "doc-biometric-photos",
    category: "documents",
    title: "Biometric Passport Photographs (4 Hard Copies)",
    description: "Recent color passport photos with clear white background for SDM register, ITBP entry log, and KMVN accommodation.",
    required: true,
    checkpoint: "Dharchula Permit Office",
    status: "completed",
    notes: "4 physical copies attached in waterproof dossier envelope.",
  },
  {
    id: "doc-indemnity-bond",
    category: "documents",
    title: "Notarized Indemnity Undertaking Bond",
    description: "Legal self-declaration on ₹100 non-judicial stamp paper indemnifying high-altitude weather and road roadblock contingencies.",
    required: true,
    checkpoint: "Dharchula Base Registration",
    status: "action_required",
    notes: "Pending stamp paper signing with notary at Dharchula.",
  },
  {
    id: "doc-itbp-border-slip",
    category: "documents",
    title: "ITBP Border Checkpost Clearance Slip",
    description: "Inner line verification slip endorsed by Indo-Tibetan Border Police officers at Gunji and Kalapani.",
    required: true,
    checkpoint: "Gunji & Kalapani ITBP Post",
    status: "in_progress",
    notes: "Endorsement scheduled during Day 3 batch arrival at Gunji.",
    ilpKey: "itbpClearance",
  },

  // ─── 2. MEDICAL FITNESS PROOFS ──────────────────────────────────────
  {
    id: "med-fitness-cert",
    category: "medical",
    title: "High-Altitude Medical Fitness Certificate (Form A)",
    description: "Standard pilgrimage fitness certificate signed and stamped by an authorized MBBS or MD registered physician.",
    required: true,
    checkpoint: "Base Camp Medical Screening",
    status: "completed",
    notes: "Certified fit for altitudes up to 15,000 ft by Dr. R. Verma.",
    ilpKey: "medicalCertificate",
  },
  {
    id: "med-ecg-report",
    category: "medical",
    title: "12-Lead Resting Electrocardiogram (ECG) Report",
    description: "Recent resting ECG trace taken within 30 days of yatra departure confirming healthy cardiac rhythm and absence of ischemia.",
    required: true,
    checkpoint: "Dharchula CMO Verification",
    status: "completed",
    notes: "Normal sinus rhythm confirmed, rate 74 bpm.",
  },
  {
    id: "med-bp-pulse",
    category: "medical",
    title: "Resting Blood Pressure & Pulse Rate Clearance",
    description: "Target resting blood pressure below 140/90 mmHg and resting pulse under 90 bpm to minimize Acute Mountain Sickness (AMS).",
    required: true,
    checkpoint: "Daily Vitals Log at Dharchula & Gunji",
    status: "completed",
    notes: "Baseline reading: 122/82 mmHg, resting pulse 76 bpm.",
  },
  {
    id: "med-blood-sugar",
    category: "medical",
    title: "Blood Sugar Baseline & Baseline SpO2 Saturation",
    description: "Baseline pulse oximetry showing SpO2 ≥ 95% at base altitude and well-managed glycemic levels.",
    required: true,
    checkpoint: "Kathgodam & Dharchula Briefing",
    status: "completed",
    notes: "Resting SpO2: 98% at Haldwani base.",
  },
  {
    id: "med-diamox-plan",
    category: "medical",
    title: "Doctor Acclimatization Consent & Diamox Schedule",
    description: "Physician guidance on preventive Acetazolamide (Diamox 125mg), hydration regimen (4L water/day), and altitude pacing.",
    required: false,
    checkpoint: "Medical Officer Consultation",
    status: "in_progress",
    notes: "Prescription received; starting 24h prior to Dharchula-Gunji ascent.",
  },
  {
    id: "med-emergency-contact",
    category: "medical",
    title: "Emergency Medical Information & Kin Declaration",
    description: "Record of blood group, known drug allergies, insurance policy ID, and 2 verified primary emergency telephone contacts.",
    required: true,
    checkpoint: "Expedition Dispatch Manifest",
    status: "completed",
    notes: "Blood group O+ve. Next-of-kin contacts verified.",
  },

  // ─── 3. PERSONAL ITEMS & EXPEDITION GEAR ────────────────────────────
  {
    id: "gear-down-jacket",
    category: "personal",
    title: "Sub-Zero Feather Down Jacket (-5°C to -10°C Rated)",
    description: "Windproof and water-resistant hooded heavy jacket. Temperatures at Jyolingkong (14,900 ft) often dip below freezing.",
    required: true,
    checkpoint: "Kathgodam Departure Check",
    status: "completed",
    notes: "Decathlon Trek 500 (-10°C rated) packed.",
  },
  {
    id: "gear-thermal-inners",
    category: "personal",
    title: "Thermal Base Layers (2 Upper + 2 Lower Sets)",
    description: "Moisture-wicking merino wool or poly-thermal inner wear for sub-zero darshan mornings at Parvati Sarovar.",
    required: true,
    checkpoint: "Luggage Pre-Packing",
    status: "completed",
    notes: "2 pairs pure merino wool inners packed in compression bag.",
  },
  {
    id: "gear-trekking-boots",
    category: "personal",
    title: "High-Ankle Waterproof Boots & Woollen Socks (4 Pairs)",
    description: "Sturdy broken-in boots with deep lugs for loose moraine and stony trails around Adi Kailash base.",
    required: true,
    checkpoint: "Trail Suitability Check",
    status: "completed",
    notes: "Boots broken-in; 4 pairs technical trekking wool socks packed.",
  },
  {
    id: "gear-sunglasses",
    category: "personal",
    title: "UV400 Polarized Mountain Sunglasses",
    description: "Wrap-around UV protection glasses to prevent snow glare and alpine snow blindness at high elevation.",
    required: true,
    checkpoint: "Alpine Gear Inspection",
    status: "action_required",
    notes: "Needs Category 3/4 polarized glasses before Kathgodam.",
  },
  {
    id: "gear-medical-kit",
    category: "personal",
    title: "Personal High-Altitude First Aid & Acclimatization Kit",
    description: "Diamox, Camphor inhalation pouch, Paracetamol, ORS sachets, Band-Aids, blister tapes, and throat lozenges.",
    required: true,
    checkpoint: "Day-pack Pocket Inspection",
    status: "in_progress",
    notes: "Camphor pouch & ORS acquired; picking Diamox strips today.",
  },
  {
    id: "gear-power-bank",
    category: "personal",
    title: "10,000mAh+ Cold-Resistant Power Bank & Headlamp",
    description: "Sub-zero cold drains phone batteries fast. Powerful LED headlamp with spare AAA batteries for 4:30 AM starts.",
    required: true,
    checkpoint: "Day-pack Electronics Check",
    status: "completed",
    notes: "20,000mAh power bank fully charged + Black Diamond headlamp.",
  },
  {
    id: "gear-thermos-flask",
    category: "personal",
    title: "1-Liter Insulated Stainless Steel Thermos Flask",
    description: "Drinking warm boiled water on the route prevents bronchospasm, chills, and mountain dehydration.",
    required: true,
    checkpoint: "Daily 4x4 Transit Check",
    status: "completed",
    notes: "Milton 1L double-wall vacuum flask ready.",
  },
  {
    id: "gear-trekking-pole",
    category: "personal",
    title: "Heavy-Duty Trekking Pole with Mud/Snow Baskets",
    description: "Reduces 30% of knee and joint strain on steep descents from Parvati Kund and Om Parvat view points.",
    required: false,
    checkpoint: "Trailhead (Kuti / Jolingkong)",
    status: "completed",
    notes: "Aluminum anti-shock pole with rubber tips.",
  },
  {
    id: "gear-rain-poncho",
    category: "personal",
    title: "Heavy Waterproof Poncho & Rucksack Rain Cover",
    description: "Mountain storms can be sudden along Kali River gorge; protects sensitive documents and electronic equipment.",
    required: true,
    checkpoint: "Kathgodam Boarding",
    status: "action_required",
    notes: "Need heavy-duty rain poncho suitable over backpack.",
  },
];

const CATEGORY_META: Record<
  ChecklistCategory,
  { label: string; icon: typeof FileText; color: string; badgeColor: string; description: string }
> = {
  documents: {
    label: "Essential Documents",
    icon: FileText,
    color: "from-sky-600 to-blue-700",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
    description: "SDM Inner Line Permits, Govt photo IDs, police verification & border checkpost clearances.",
  },
  medical: {
    label: "Medical Fitness Proofs",
    icon: HeartPulse,
    color: "from-rose-600 to-pink-700",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    description: "Doctor fitness certificate, 12-lead ECG, BP clearance & high-altitude acclimatization safety.",
  },
  personal: {
    label: "Personal Items & Alpine Gear",
    icon: Backpack,
    color: "from-amber-600 to-orange-700",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    description: "Sub-zero feather down jacket, waterproof high-ankle boots, UV goggles, thermos & first aid.",
  },
};

const STATUS_CONFIG: Record<
  ChecklistStatus,
  {
    label: string;
    shortLabel: string;
    icon: typeof CheckCircle2;
    badgeBg: string;
    textColor: string;
    borderColor: string;
    dotColor: string;
    next: ChecklistStatus;
  }
> = {
  completed: {
    label: "Verified / Completed",
    shortLabel: "Verified",
    icon: CheckCircle2,
    badgeBg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    dotColor: "bg-emerald-500",
    next: "action_required",
  },
  in_progress: {
    label: "In Review / Processing",
    shortLabel: "In Review",
    icon: Clock,
    badgeBg: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
    dotColor: "bg-amber-500",
    next: "completed",
  },
  action_required: {
    label: "Action Required / Missing",
    shortLabel: "Missing",
    icon: AlertTriangle,
    badgeBg: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    dotColor: "bg-rose-500",
    next: "in_progress",
  },
  exempt: {
    label: "Exempt / Optional",
    shortLabel: "Optional",
    icon: MinusCircle,
    badgeBg: "bg-slate-100",
    textColor: "text-slate-600",
    borderColor: "border-slate-200",
    dotColor: "bg-slate-400",
    next: "completed",
  },
};

export const MyYatraChecklist: React.FC<MyYatraChecklistProps> = ({
  leads,
  selectedLeadId,
  onSelectLead,
  onUpdateLeadIlp,
}) => {
  // ─── STATE MANAGEMENT ──────────────────────────────────────────
  const [activeLeadId, setActiveLeadId] = useState<string | null>(selectedLeadId || (leads[0]?.id || null));
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"all" | ChecklistCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ChecklistStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Custom Task State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ChecklistCategory>("documents");
  const [newDescription, setNewDescription] = useState("");
  const [newCheckpoint, setNewCheckpoint] = useState("Expedition Base");
  const [newRequired, setNewRequired] = useState(true);

  // Synchronize activeLeadId if prop selectedLeadId changes
  useEffect(() => {
    if (selectedLeadId) {
      setActiveLeadId(selectedLeadId);
    }
  }, [selectedLeadId]);

  const currentLead = useMemo(() => {
    return leads.find((l) => l.id === activeLeadId) || null;
  }, [leads, activeLeadId]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  // ─── LOCAL STORAGE KEY FOR CURRENT SELECTION ──────────────────
  const storageKey = useMemo(() => {
    return activeLeadId
      ? `gotrek_checklist_lead_${activeLeadId}`
      : "gotrek_checklist_master_user";
  }, [activeLeadId]);

  // Load items on mount or when active lead changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: ChecklistItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If we have a current lead, merge their real ILP statuses into the items
          if (currentLead) {
            const merged: ChecklistItem[] = parsed.map((item): ChecklistItem => {
              if (item.ilpKey === "aadharProvided") {
                return {
                  ...item,
                  status: (currentLead.ilpStatus.aadharProvided ? "completed" : item.status) as ChecklistStatus,
                };
              }
              if (item.ilpKey === "policeVerification") {
                return {
                  ...item,
                  status: (currentLead.ilpStatus.policeVerification ? "completed" : item.status) as ChecklistStatus,
                };
              }
              if (item.ilpKey === "medicalCertificate") {
                return {
                  ...item,
                  status: (currentLead.ilpStatus.medicalCertificate ? "completed" : item.status) as ChecklistStatus,
                };
              }
              if (item.ilpKey === "sdmApproval") {
                const sdm = currentLead.ilpStatus.sdmApproval;
                const mapped: ChecklistStatus =
                  sdm === "Issued"
                    ? "completed"
                    : sdm === "In Progress"
                    ? "in_progress"
                    : sdm === "Rejected"
                    ? "action_required"
                    : "in_progress";
                return { ...item, status: mapped };
              }
              if (item.ilpKey === "itbpClearance") {
                return {
                  ...item,
                  status: (currentLead.ilpStatus.itbpClearance === "Cleared" ? "completed" : "in_progress") as ChecklistStatus,
                };
              }
              return item;
            });
            setItems(merged);
            return;
          }
          setItems(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to load checklist from localStorage:", e);
    }

    // Default template items initialized with lead's ILP if available
    let initial = DEFAULT_CHECKLIST_ITEMS.map((item) => ({ ...item }));
    if (currentLead) {
      initial = initial.map((item) => {
        if (item.ilpKey === "aadharProvided") {
          return {
            ...item,
            status: currentLead.ilpStatus.aadharProvided ? "completed" : "action_required",
          };
        }
        if (item.ilpKey === "policeVerification") {
          return {
            ...item,
            status: currentLead.ilpStatus.policeVerification ? "completed" : "action_required",
          };
        }
        if (item.ilpKey === "medicalCertificate") {
          return {
            ...item,
            status: currentLead.ilpStatus.medicalCertificate ? "completed" : "action_required",
          };
        }
        if (item.ilpKey === "sdmApproval") {
          const sdm = currentLead.ilpStatus.sdmApproval;
          const mapped: ChecklistStatus =
            sdm === "Issued"
              ? "completed"
              : sdm === "In Progress"
              ? "in_progress"
              : "action_required";
          return { ...item, status: mapped };
        }
        if (item.ilpKey === "itbpClearance") {
          return {
            ...item,
            status: currentLead.ilpStatus.itbpClearance === "Cleared" ? "completed" : "in_progress",
          };
        }
        return item;
      });
    }
    setItems(initial);
  }, [storageKey, currentLead]);

  // Save changes to localStorage whenever items change
  const saveItems = useCallback(
    (newItems: ChecklistItem[]) => {
      setItems(newItems);
      try {
        localStorage.setItem(storageKey, JSON.stringify(newItems));
      } catch (e) {
        console.warn("Failed to save checklist:", e);
      }
    },
    [storageKey]
  );

  // ─── STATUS CYCLING & UPDATE ───────────────────────────────────
  const handleToggleStatus = (itemId: string) => {
    const targetItem = items.find((i) => i.id === itemId);
    if (!targetItem) return;

    const nextStatus = STATUS_CONFIG[targetItem.status].next;
    handleSetStatus(itemId, nextStatus);
  };

  const handleSetStatus = (itemId: string, newStatus: ChecklistStatus) => {
    const updated = items.map((item) => {
      if (item.id === itemId) {
        const itemUpdated = {
          ...item,
          status: newStatus,
          updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        };

        // Sync with parent lead ILP state if applicable
        if (currentLead && item.ilpKey && onUpdateLeadIlp) {
          if (item.ilpKey === "aadharProvided") {
            onUpdateLeadIlp(currentLead.id, {
              aadharProvided: newStatus === "completed",
            });
          } else if (item.ilpKey === "policeVerification") {
            onUpdateLeadIlp(currentLead.id, {
              policeVerification: newStatus === "completed",
            });
          } else if (item.ilpKey === "medicalCertificate") {
            onUpdateLeadIlp(currentLead.id, {
              medicalCertificate: newStatus === "completed",
            });
          } else if (item.ilpKey === "sdmApproval") {
            onUpdateLeadIlp(currentLead.id, {
              sdmApproval: newStatus === "completed" ? "Issued" : newStatus === "in_progress" ? "In Progress" : "Pending",
            });
          } else if (item.ilpKey === "itbpClearance") {
            onUpdateLeadIlp(currentLead.id, {
              itbpClearance: newStatus === "completed" ? "Cleared" : "Pending",
            });
          }
        }

        return itemUpdated;
      }
      return item;
    });

    saveItems(updated);
    showToast(`Updated to: ${STATUS_CONFIG[newStatus].label}`);
  };

  // ─── SAVE NOTES ────────────────────────────────────────────────
  const handleSaveNotes = (itemId: string) => {
    const updated = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            notes: tempNotes,
            updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          }
        : item
    );
    saveItems(updated);
    setEditingNotesId(null);
    showToast("Notes saved successfully");
  };

  // ─── RESET TO DEFAULT ──────────────────────────────────────────
  const handleReset = () => {
    if (window.confirm("Reset this yatra checklist to recommended expedition protocol defaults?")) {
      let initial = DEFAULT_CHECKLIST_ITEMS.map((item) => ({ ...item }));
      saveItems(initial);
      showToast("Reset to default high-altitude protocol");
    }
  };

  // ─── ADD CUSTOM ITEM ───────────────────────────────────────────
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      description: newDescription.trim() || "Custom yatri task added by expedition coordinator.",
      checkpoint: newCheckpoint.trim() || "Dharchula / Base Camp",
      required: newRequired,
      status: "action_required",
      notes: "Custom task created",
      updatedAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    saveItems([newItem, ...items]);
    setShowAddCustomModal(false);
    setNewTitle("");
    setNewDescription("");
    setNewCheckpoint("Expedition Base");
    setNewRequired(true);
    showToast("Added custom checklist task");
  };

  // ─── DELETE CUSTOM ITEM ────────────────────────────────────────
  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Remove this task from the checklist?")) {
      const updated = items.filter((i) => i.id !== itemId);
      saveItems(updated);
      showToast("Task removed");
    }
  };

  // ─── STATS & READINESS SCORE COMPUTATION ────────────────────────
  const stats = useMemo(() => {
    const total = items.length;
    if (total === 0) {
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        actionRequired: 0,
        percentage: 0,
        byCategory: {
          documents: { total: 0, completed: 0, percentage: 0 },
          medical: { total: 0, completed: 0, percentage: 0 },
          personal: { total: 0, completed: 0, percentage: 0 },
        },
      };
    }

    const completed = items.filter((i) => i.status === "completed" || i.status === "exempt").length;
    const inProgress = items.filter((i) => i.status === "in_progress").length;
    const actionRequired = items.filter((i) => i.status === "action_required").length;
    const percentage = Math.round((completed / total) * 100);

    const getCatStats = (cat: ChecklistCategory) => {
      const catItems = items.filter((i) => i.category === cat);
      const catTotal = catItems.length;
      const catComp = catItems.filter((i) => i.status === "completed" || i.status === "exempt").length;
      return {
        total: catTotal,
        completed: catComp,
        percentage: catTotal > 0 ? Math.round((catComp / catTotal) * 100) : 0,
      };
    };

    return {
      total,
      completed,
      inProgress,
      actionRequired,
      percentage,
      byCategory: {
        documents: getCatStats("documents"),
        medical: getCatStats("medical"),
        personal: getCatStats("personal"),
      },
    };
  }, [items]);

  // ─── FILTERED ITEMS ────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesNotes = item.notes?.toLowerCase().includes(q) || false;
        const matchesCheckpoint = item.checkpoint.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesNotes && !matchesCheckpoint) return false;
      }
      return true;
    });
  }, [items, categoryFilter, statusFilter, searchQuery]);

  // ─── WHATSAPP SHARE GENERATOR ─────────────────────────────────
  const handleSendWhatsAppChecklist = () => {
    const yatriName = currentLead?.fullName || "Yatri";
    const pendingDocs = items
      .filter((i) => i.status === "action_required" || i.status === "in_progress")
      .map((i) => `• ${i.title} (${STATUS_CONFIG[i.status].shortLabel})`)
      .slice(0, 8)
      .join("\n");

    const message = encodeURIComponent(
      `🙏 *Namaste ${yatriName} ji!*\n\n` +
      `Here is your official *GoTrek Yatra Checklist Status* for Adi Kailash & Om Parvat:\n\n` +
      `📊 *Overall Readiness:* ${stats.percentage}% Ready\n` +
      `📄 *Documents:* ${stats.byCategory.documents.completed}/${stats.byCategory.documents.total} Completed\n` +
      `🩺 *Medical Fitness:* ${stats.byCategory.medical.completed}/${stats.byCategory.medical.total} Completed\n` +
      `🎒 *Personal Gear:* ${stats.byCategory.personal.completed}/${stats.byCategory.personal.total} Packed\n\n` +
      (pendingDocs ? `⚠️ *Pending Action Items:*\n${pendingDocs}\n\n` : `✅ *All mandatory high-altitude items are verified and complete!*\n\n`) +
      `Please ensure all pending items are submitted prior to departure at Dharchula SDM office.\n\n` +
      `🚩 *GoTrek Himalayan Operations & Dispatch Team*`
    );

    const phone = currentLead?.phone ? currentLead.phone.replace(/[^0-9]/g, "") : "";
    const url = phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
    showToast("Opened WhatsApp with checklist report");
  };

  // ─── PRINT / EXPORT ────────────────────────────────────────────
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/70 overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-full bg-slate-950 text-amber-400 border border-amber-400/40 text-xs font-bold shadow-xl flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ─── EXPEDITION TOP HEADER & PILGRIM SELECTOR ───────────── */}
      <div className="bg-white border-b border-slate-200/90 px-4 sm:px-6 py-4 shrink-0 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-inner">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-slate-950 text-base sm:text-lg tracking-tight">
                  My Yatra Checklist
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Inner Line Protocol & Fitness
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Track mandatory SDM permits, medical fitness proofs, and sub-zero personal gear with real-time status indicators.
              </p>
            </div>
          </div>

          {/* Pilgrim Manifest Switcher & Top Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Pilgrim Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <UserCheck size={14} className="text-amber-700" />
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">Tracking For:</span>
              <select
                value={activeLeadId || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveLeadId(val || null);
                  const found = leads.find((l) => l.id === val) || null;
                  if (onSelectLead) onSelectLead(found);
                }}
                className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer max-w-[200px] truncate"
              >
                <option value="">Master Protocol (My Yatra)</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.fullName} ({l.destination.replace(/ - .*/, "")})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <button
              onClick={handleSendWhatsAppChecklist}
              className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Share checklist report with pilgrim on WhatsApp"
            >
              <MessageSquare size={13} />
              <span className="hidden md:inline">WhatsApp Report</span>
            </button>

            <button
              onClick={() => setShowAddCustomModal(true)}
              className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>+ Add Task</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Reset checklist to recommended defaults"
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Print Yatra Checklist for Checkposts"
            >
              <Printer size={14} />
            </button>
          </div>
        </div>

        {/* Selected Pilgrim Context Bar (If a lead is active) */}
        {currentLead && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {currentLead.fullName}
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin size={12} className="text-amber-600" />
                {currentLead.destination}
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Calendar size={12} className="text-slate-400" />
                Batch: {currentLead.month}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-slate-500">ID: {currentLead.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">ILP Clearance Status:</span>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  currentLead.ilpStatus.sdmApproval === "Issued"
                    ? "bg-emerald-100 text-emerald-800"
                    : currentLead.ilpStatus.sdmApproval === "In Progress"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                SDM {currentLead.ilpStatus.sdmApproval}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── READINESS SCORE & CATEGORY PROGRESS SUMMARY ────────── */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
          {/* Main Overall Readiness Meter */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-10 text-white pointer-events-none">
              <Compass size={110} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Expedition Readiness
                </span>
                <span className="font-mono font-black text-lg text-emerald-400">
                  {stats.percentage}%
                </span>
              </div>
              <h3 className="font-black text-xl text-white mt-1">
                {stats.percentage >= 90
                  ? "Cleared for Ascent"
                  : stats.percentage >= 60
                  ? "In Preparation"
                  : "Action Required"}
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {stats.completed} of {stats.total} checkpoints complete & verified
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    stats.percentage >= 90
                      ? "bg-emerald-500"
                      : stats.percentage >= 60
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Base Kathgodam</span>
                <span>Jyolingkong (14,900 ft)</span>
              </div>
            </div>
          </div>

          {/* 1. Essential Documents Card */}
          <div
            onClick={() => setCategoryFilter(categoryFilter === "documents" ? "all" : "documents")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              categoryFilter === "documents"
                ? "bg-sky-50/80 border-sky-400 shadow-sm ring-2 ring-sky-300/30"
                : "bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                  <FileText size={18} />
                </div>
                <span className="font-mono font-bold text-xs text-sky-900 bg-sky-100/80 px-2 py-0.5 rounded-full">
                  {stats.byCategory.documents.completed}/{stats.byCategory.documents.total}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-2">Essential Documents</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                SDM ILP, Aadhaar, Police verification
              </p>
            </div>

            <div className="mt-3">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-600 rounded-full transition-all duration-300"
                  style={{ width: `${stats.byCategory.documents.percentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-semibold">
                <span>{stats.byCategory.documents.percentage}% Complete</span>
                <span className="text-sky-700">Filter Category →</span>
              </div>
            </div>
          </div>

          {/* 2. Medical Fitness Proofs Card */}
          <div
            onClick={() => setCategoryFilter(categoryFilter === "medical" ? "all" : "medical")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              categoryFilter === "medical"
                ? "bg-rose-50/80 border-rose-400 shadow-sm ring-2 ring-rose-300/30"
                : "bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <HeartPulse size={18} />
                </div>
                <span className="font-mono font-bold text-xs text-rose-900 bg-rose-100/80 px-2 py-0.5 rounded-full">
                  {stats.byCategory.medical.completed}/{stats.byCategory.medical.total}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-2">Medical Fitness Proofs</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                MBBS certificate, 12-lead ECG, BP vitals
              </p>
            </div>

            <div className="mt-3">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-600 rounded-full transition-all duration-300"
                  style={{ width: `${stats.byCategory.medical.percentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-semibold">
                <span>{stats.byCategory.medical.percentage}% Complete</span>
                <span className="text-rose-700">Filter Category →</span>
              </div>
            </div>
          </div>

          {/* 3. Personal Items & Gear Card */}
          <div
            onClick={() => setCategoryFilter(categoryFilter === "personal" ? "all" : "personal")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              categoryFilter === "personal"
                ? "bg-amber-50/80 border-amber-400 shadow-sm ring-2 ring-amber-300/30"
                : "bg-white hover:bg-slate-50 border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Backpack size={18} />
                </div>
                <span className="font-mono font-bold text-xs text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  {stats.byCategory.personal.completed}/{stats.byCategory.personal.total}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-2">Personal Items & Gear</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                Sub-zero jacket, boots, goggles, thermos
              </p>
            </div>

            <div className="mt-3">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all duration-300"
                  style={{ width: `${stats.byCategory.personal.percentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-semibold">
                <span>{stats.byCategory.personal.percentage}% Packed</span>
                <span className="text-amber-800">Filter Category →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SEARCH, CATEGORY TABS & STATUS FILTER TOOLBAR ─────── */}
      <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents, medical proofs or gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === "all"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Categories ({items.length})
          </button>
          <button
            onClick={() => setCategoryFilter("documents")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              categoryFilter === "documents"
                ? "bg-sky-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText size={13} />
            <span>Documents ({stats.byCategory.documents.total})</span>
          </button>
          <button
            onClick={() => setCategoryFilter("medical")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              categoryFilter === "medical"
                ? "bg-rose-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <HeartPulse size={13} />
            <span>Medical Proofs ({stats.byCategory.medical.total})</span>
          </button>
          <button
            onClick={() => setCategoryFilter("personal")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              categoryFilter === "personal"
                ? "bg-amber-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Backpack size={13} />
            <span>Personal Gear ({stats.byCategory.personal.total})</span>
          </button>
        </div>

        {/* Status Filter Dropdown / Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-bold hidden sm:inline">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer focus:border-amber-500"
          >
            <option value="all">All Statuses ({items.length})</option>
            <option value="action_required">🔴 Missing / Action Required ({stats.actionRequired})</option>
            <option value="in_progress">🟡 In Review / Processing ({stats.inProgress})</option>
            <option value="completed">🟢 Verified / Completed ({stats.completed})</option>
            <option value="exempt">⚪ Exempt / Optional</option>
          </select>
        </div>
      </div>

      {/* ─── CHECKLIST ITEMS LIST ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
              <Filter size={24} />
            </div>
            <h4 className="font-black text-slate-900 text-base">
              No Tasks Found
            </h4>
            <p className="text-xs text-slate-500">
              No checklist items match the current search or filters. Try clearing your filters or adding a custom task.
            </p>
            <button
              onClick={() => {
                setCategoryFilter("all");
                setStatusFilter("all");
                setSearchQuery("");
              }}
              className="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const statusConfig = STATUS_CONFIG[item.status];
            const catMeta = CATEGORY_META[item.category];
            const StatusIcon = statusConfig.icon;
            const CatIcon = catMeta.icon;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl bg-white border transition-all ${
                  item.status === "action_required"
                    ? "border-rose-200 hover:border-rose-300 shadow-2xs"
                    : item.status === "completed"
                    ? "border-slate-200 hover:border-emerald-300"
                    : "border-slate-200 hover:border-amber-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left Column: Icon, Details, Badges */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Interactive Status Indicator Toggle Icon */}
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform hover:scale-105 cursor-pointer ${statusConfig.badgeBg} ${statusConfig.borderColor} ${statusConfig.textColor}`}
                      title={`Click to cycle status (Current: ${statusConfig.label})`}
                    >
                      <StatusIcon size={20} />
                    </button>

                    <div className="space-y-1 min-w-0 flex-1">
                      {/* Title & Category Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {item.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${catMeta.badgeColor}`}
                        >
                          <CatIcon size={10} />
                          <span>{catMeta.label}</span>
                        </span>
                        {item.required ? (
                          <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                            Mandatory
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            Recommended
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Checkpoint & Notes Context */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 text-slate-600 font-medium">
                          <MapPin size={11} className="text-amber-600" />
                          <span>Checkpoint: <strong>{item.checkpoint}</strong></span>
                        </span>

                        {item.updatedAt && (
                          <span className="text-slate-400">
                            Updated {item.updatedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Status Switcher Dropdown & 1-Tap Trigger */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {/* Status Pill with Dropdown */}
                    <div className="relative">
                      <select
                        value={item.status}
                        onChange={(e) => handleSetStatus(item.id, e.target.value as ChecklistStatus)}
                        className={`text-xs font-bold py-1.5 pl-2.5 pr-7 rounded-xl border appearance-none outline-none cursor-pointer transition-colors ${statusConfig.badgeBg} ${statusConfig.borderColor} ${statusConfig.textColor}`}
                      >
                        <option value="completed">🟢 Verified / Completed</option>
                        <option value="in_progress">🟡 In Review / Processing</option>
                        <option value="action_required">🔴 Missing / Action Required</option>
                        <option value="exempt">⚪ Exempt / Optional</option>
                      </select>
                      <ChevronDown
                        size={12}
                        className={`absolute right-2.5 top-2.5 pointer-events-none ${statusConfig.textColor}`}
                      />
                    </div>

                    {/* Quick 1-Tap Advance Button */}
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Quick cycle status"
                    >
                      <span>Next</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Notes & Verification Remark Section */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start justify-between gap-3 text-xs">
                  {editingNotesId === item.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add verification notes, permit filing #, or doctor details..."
                        className="flex-1 px-3 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-amber-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveNotes(item.id)}
                        className="py-1 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs cursor-pointer hover:bg-emerald-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="py-1 px-2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                        Notes:
                      </span>
                      <p className="text-xs text-slate-600 italic truncate flex-1">
                        {item.notes || "No notes entered yet."}
                      </p>
                      <button
                        onClick={() => {
                          setEditingNotesId(item.id);
                          setTempNotes(item.notes || "");
                        }}
                        className="text-[11px] font-bold text-amber-800 hover:text-amber-900 underline cursor-pointer shrink-0"
                      >
                        {item.notes ? "Edit Note" : "+ Add Note"}
                      </button>
                    </div>
                  )}

                  {/* Delete option for custom tasks */}
                  {item.id.startsWith("custom-") && (
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-[10px] text-rose-500 hover:text-rose-700 underline cursor-pointer shrink-0 ml-2"
                    >
                      Delete Task
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── ADD CUSTOM TASK MODAL ──────────────────────────────── */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    Add Custom Yatra Task
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add a custom verification item for this expedition
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomItem} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quad-Biking Permit, Altitude Oximeter in Pocket"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ChecklistCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none cursor-pointer focus:border-amber-500"
                  >
                    <option value="documents">Essential Documents</option>
                    <option value="medical">Medical Fitness Proofs</option>
                    <option value="personal">Personal Items & Gear</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Checkpoint Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kathgodam / Gunji"
                    value={newCheckpoint}
                    onChange={(e) => setNewCheckpoint(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Description & Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Details on what to verify or pack..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reqTask"
                  checked={newRequired}
                  onChange={(e) => setNewRequired(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 accent-amber-600 cursor-pointer"
                />
                <label htmlFor="reqTask" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Mandatory Checkpoint (Affects departure clearance)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="py-2 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs cursor-pointer hover:bg-amber-400 shadow-xs"
                >
                  + Add to Checklist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyYatraChecklist;
