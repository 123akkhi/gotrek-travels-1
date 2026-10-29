import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
  Phone,
  Send,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Car,
  DollarSign,
  AlertCircle,
  FileText,
  User,
  Shield,
  ShieldCheck,
  TrendingUp,
  X,
  ExternalLink,
  Lock,
  ChevronRight,
  Sparkles,
  BookOpen,
  Radio,
  RadioTower,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  LogOut,
  ClipboardCheck
} from "lucide-react";
import { LeadBooking, HandlerUser, HandlerRole } from "../../types";
import { INITIAL_LEADS } from "../../data/mockData";
import { GoTrekLogo } from "../GoTrekLogo";
import { HandlerAuthModal } from "../HandlerAuthModal";
import { CrmAuthGate } from "./CrmAuthGate";
import { CrmPublicationsManager } from "./CrmPublicationsManager";
import { CrmStatsCards } from "./CrmStatsCards";
import { LeadDetailDossier } from "./LeadDetailDossier";
import { AddLeadModal } from "./AddLeadModal";
import { HandlersRosterModal } from "./HandlersRosterModal";
import { AddHandlerModal } from "./AddHandlerModal";
import { MyYatraChecklist } from "./MyYatraChecklist";

interface CrmDashboardProps {
  onClose: () => void;
}

const LEADS_CACHE_KEY = "gotrek_crm_leads_cache";
const HANDLER_CACHE_KEY = "gotrek_handler_user";

export const CrmDashboard: React.FC<CrmDashboardProps> = ({ onClose }) => {
  // ─── AUTHENTICATION STATE ──────────────────────────────────────
  const [currentHandler, setCurrentHandler] = useState<HandlerUser | null>(() => {
    try {
      const saved = localStorage.getItem(HANDLER_CACHE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // ─── LEADS & CACHE STATE (Protected - Empty until authenticated) ──
  const [leads, setLeads] = useState<LeadBooking[]>(() => {
    try {
      const savedUser = localStorage.getItem(HANDLER_CACHE_KEY);
      if (!savedUser) return []; // No session, zero data exposed
      const cached = localStorage.getItem(LEADS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const [selectedLead, setSelectedLead] = useState<LeadBooking | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Just now");

  // ─── FILTERS & SEARCH ──────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [destinationFilter, setDestinationFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"newest" | "travelDate" | "advance" | "name">("newest");
  const [mainView, setMainView] = useState<"leads" | "news_desk" | "yatra_checklist">("leads");
  const [showMetrics, setShowMetrics] = useState(true);
  const [cardViewMode, setCardViewMode] = useState<"streamlined" | "full">("streamlined");
  const [recentlyUpdatedIds, setRecentlyUpdatedIds] = useState<Set<string>>(new Set());

  // ─── HANDLERS ROSTER ───────────────────────────────────────────
  const [handlers, setHandlers] = useState<HandlerUser[]>([]);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [isAddHandlerModalOpen, setIsAddHandlerModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [deleteConfirmationLead, setDeleteConfirmationLead] = useState<LeadBooking | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ─── EXPEDITION CLOCK (IST) ───────────────────────────────────
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // ─── AUTHENTICATION & SESSION LOGOUT ─────────────────────────
  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem(HANDLER_CACHE_KEY);
      localStorage.removeItem("gotrek_handler_token");
      localStorage.removeItem(LEADS_CACHE_KEY);
    } catch (e) {}
    setCurrentHandler(null);
    setLeads([]);
    setSelectedLead(null);
    setHandlers([]);
    showToast("Signed out. CRM data secured.");
  }, [showToast]);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    const saved = localStorage.getItem(HANDLER_CACHE_KEY);
    const handler = currentHandler || (saved ? JSON.parse(saved) : null);
    const token = localStorage.getItem("gotrek_handler_token") || (handler ? `gt_token_${handler.id}` : "");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (handler?.id) headers["x-handler-id"] = handler.id;
    return headers;
  }, [currentHandler]);

  // ─── FETCH LEADS & HANDLERS ────────────────────────────────────
  const fetchLeads = useCallback(async (showSyncIndicator = false) => {
    const saved = localStorage.getItem(HANDLER_CACHE_KEY);
    const handler = currentHandler || (saved ? JSON.parse(saved) : null);
    if (!handler) {
      setLeads([]);
      return;
    }
    if (showSyncIndicator) setIsSyncing(true);
    try {
      const token = localStorage.getItem("gotrek_handler_token") || `gt_token_${handler.id}`;
      const res = await fetch("/api/leads", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "x-handler-id": handler.id,
        },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        try {
          localStorage.setItem(LEADS_CACHE_KEY, JSON.stringify(data.leads));
        } catch (e) {}
        setLastSyncedTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.warn("CRM fetch leads warning (using cached data):", err);
    } finally {
      if (showSyncIndicator) setIsSyncing(false);
    }
  }, [currentHandler, handleLogout]);

  const fetchHandlers = useCallback(async () => {
    const saved = localStorage.getItem(HANDLER_CACHE_KEY);
    const handler = currentHandler || (saved ? JSON.parse(saved) : null);
    if (!handler) {
      setHandlers([]);
      return;
    }
    try {
      const token = localStorage.getItem("gotrek_handler_token") || `gt_token_${handler.id}`;
      const res = await fetch("/api/admin/handlers", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "x-handler-id": handler.id,
        },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.handlers)) {
          setHandlers(data.handlers);
        }
      }
    } catch (err) {
      console.warn("CRM fetch handlers warning:", err);
    }
  }, [currentHandler, handleLogout]);

  useEffect(() => {
    if (!currentHandler) return;
    fetchLeads(false);
    fetchHandlers();
  }, [fetchLeads, fetchHandlers, currentHandler]);

  // Real-time listener when inquiry or checkout modal registers or updates details
  useEffect(() => {
    if (!currentHandler) return;
    const handleLeadCreated = (e: any) => {
      fetchLeads(false);
      const detail = e.detail;
      if (detail?.id) {
        setRecentlyUpdatedIds((prev) => new Set(prev).add(detail.id));
        setTimeout(() => {
          setRecentlyUpdatedIds((prev) => {
            const next = new Set(prev);
            next.delete(detail.id);
            return next;
          });
        }, 6000);
      }
      if (detail?.fullName) {
        showToast(`✨ New Yatri details received: ${detail.fullName}`);
      }
    };

    const handleLeadUpdated = (e: any) => {
      fetchLeads(false);
      const detail = e.detail;
      if (detail?.id) {
        setRecentlyUpdatedIds((prev) => new Set(prev).add(detail.id));
        setTimeout(() => {
          setRecentlyUpdatedIds((prev) => {
            const next = new Set(prev);
            next.delete(detail.id);
            return next;
          });
        }, 5000);
      }
    };

    window.addEventListener("gotrek:lead-created", handleLeadCreated);
    window.addEventListener("gotrek:lead-updated", handleLeadUpdated);
    return () => {
      window.removeEventListener("gotrek:lead-created", handleLeadCreated);
      window.removeEventListener("gotrek:lead-updated", handleLeadUpdated);
    };
  }, [fetchLeads, showToast, currentHandler]);

  // Background auto-refresh polling every 60 seconds (paused when tab is hidden)
  useEffect(() => {
    if (!currentHandler) return;
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchLeads(false);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchLeads, currentHandler]);

  // Keep selectedLead in sync with updated leads
  useEffect(() => {
    if (selectedLead) {
      const updated = leads.find((l) => l.id === selectedLead.id);
      if (updated) setSelectedLead(updated);
    } else if (leads.length > 0) {
      setSelectedLead(leads[0]);
    }
  }, [leads]);

  // ─── DERIVED TRIP STATUS HELPER ────────────────────────────────
  const getLeadTripStatus = useCallback((lead: LeadBooking): 'Upcoming' | 'Confirmed' | 'Processing' | 'Completed' | 'On Hold' => {
    if (lead.tripStatus) return lead.tripStatus;
    if (lead.status === 'Approved & Booked') return 'Confirmed';
    if (lead.status === 'ILP Processing' || lead.status === 'Docs Received') return 'Processing';
    if (lead.status === 'Cancelled') return 'On Hold';
    return 'Upcoming';
  }, []);

  // ─── FILTERED & SORTED LEADS (Memoized for 60fps) ──────────────
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = lead.fullName.toLowerCase().includes(term);
          const matchPhone = lead.phone.includes(term);
          const matchId = lead.id.toLowerCase().includes(term);
          const matchDest = lead.destination.toLowerCase().includes(term);
          const matchGuide = lead.assignedGuide?.toLowerCase().includes(term);
          if (!matchName && !matchPhone && !matchId && !matchDest && !matchGuide) return false;
        }

        // Status filter
        if (statusFilter !== "All") {
          const tripStatus = getLeadTripStatus(lead);
          if (statusFilter === "Confirmed" && tripStatus !== "Confirmed") return false;
          if (statusFilter === "ILP Processing" && lead.status !== "ILP Processing" && tripStatus !== "Processing") return false;
          if (statusFilter === "New Inquiry" && lead.status !== "New Inquiry") return false;
          if (statusFilter === "Docs Received" && lead.status !== "Docs Received") return false;
          if (statusFilter === "Completed" && tripStatus !== "Completed") return false;
          if (statusFilter === "On Hold" && tripStatus !== "On Hold") return false;
        }

        // Destination filter
        if (destinationFilter !== "All") {
          if (!lead.destination.toLowerCase().includes(destinationFilter.toLowerCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
        if (sortBy === "advance") return (b.advancePaid || 0) - (a.advancePaid || 0);
        if (sortBy === "travelDate") return (a.month || "").localeCompare(b.month || "");
        return 0;
      });
  }, [leads, searchTerm, statusFilter, destinationFilter, sortBy, getLeadTripStatus]);

  // ─── OPTIMISTIC STATUS UPDATE ──────────────────────────────────
  const handleUpdateLeadStatus = async (id: string, updates: Partial<LeadBooking>) => {
    const nowIso = new Date().toISOString();
    const enrichedUpdates: Partial<LeadBooking> = {
      ...updates,
      updatedAt: nowIso,
      detailsFilled: true,
    };

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...enrichedUpdates } : l))
    );

    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, ...enrichedUpdates } : null));
    }

    // Highlight as recently updated in the UI
    setRecentlyUpdatedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setRecentlyUpdatedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 5000);

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(enrichedUpdates),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.lead) {
          setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
          if (selectedLead && selectedLead.id === id) {
            setSelectedLead(data.lead);
          }
        }
        showToast("✓ Pilgrim details updated");
      }
    } catch (err) {
      console.warn("Failed to persist lead update:", err);
    }
  };

  // ─── SYNC LEAD ILP FROM YATRA CHECKLIST ───────────────────────
  const handleUpdateLeadIlp = (
    leadId: string,
    ilpUpdates: Partial<LeadBooking["ilpStatus"]>
  ) => {
    const current = leads.find((l) => l.id === leadId);
    if (!current) return;
    const mergedIlp = { ...current.ilpStatus, ...ilpUpdates };
    handleUpdateLeadStatus(leadId, { ilpStatus: mergedIlp });
  };

  // ─── ADD NEW LEAD ──────────────────────────────────────────────
  const handleCreateLead = async (formData: any) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        setSelectedLead(data.lead);
        showToast(`Yatri ${data.lead.fullName} registered successfully!`);
      }
    } catch (err) {
      console.error("Failed to add lead:", err);
    }
  };

  // ─── DELETE CONFIRMATION ───────────────────────────────────────
  const handleConfirmDelete = async () => {
    if (!deleteConfirmationLead) return;
    const target = deleteConfirmationLead;
    setDeleteConfirmationLead(null);

    // Optimistic remove
    setLeads((prev) => prev.filter((l) => l.id !== target.id));
    if (selectedLead?.id === target.id) {
      setSelectedLead(leads.find((l) => l.id !== target.id) || null);
    }

    try {
      const res = await fetch(`/api/leads/${target.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showToast(`Record ${target.id} removed`);
      }
    } catch (err) {
      console.warn("Failed to delete lead:", err);
    }
  };

  // ─── EXPORT TO CSV (SDM / ITBP FORMAT) ─────────────────────────
  const handleExportCSV = () => {
    const headers = [
      "Booking ID",
      "Pilgrim Full Name",
      "Phone",
      "Email",
      "Destination Package",
      "Yatris Count",
      "Travel Month/Date",
      "Pickup Location",
      "Trip Status",
      "Aadhar Provided",
      "Police Verification",
      "Medical Certificate",
      "SDM Dharchula Approval",
      "Assigned Vehicle",
      "Assigned Mountain Guide",
      "Total Package (INR)",
      "Advance Paid (INR)",
      "Balance Due (INR)",
      "Special Notes"
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.destination}"`,
      l.travellers || 1,
      `"${l.month}"`,
      `"${l.pickupLocation || ""}"`,
      `"${getLeadTripStatus(l)}"`,
      l.ilpStatus.aadharProvided ? "YES" : "NO",
      l.ilpStatus.policeVerification ? "YES" : "NO",
      l.ilpStatus.medicalCertificate ? "YES" : "NO",
      `"${l.ilpStatus.sdmApproval}"`,
      `"${l.assignedVehicle || "Unassigned"}"`,
      `"${l.assignedGuide || "Unassigned"}"`,
      l.totalAmount || 0,
      l.advancePaid || 0,
      Math.max(0, (l.totalAmount || 0) - (l.advancePaid || 0)),
      `"${(l.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GoTrek_Yatra_Manifest_SDM_Dharchula_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Manifest CSV generated for SDM & ITBP checkposts");
  };

  // ─── BADGE RENDERING HELPER ────────────────────────────────────
  const renderTripStatusBadge = useCallback((status: 'Upcoming' | 'Confirmed' | 'Processing' | 'Completed' | 'On Hold') => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/80 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Confirmed
          </span>
        );
      case 'Processing':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300/80 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
            ILP Processing
          </span>
        );
      case 'Completed':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300/80 flex items-center gap-1">
            Completed
          </span>
        );
      case 'On Hold':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300/80 flex items-center gap-1">
            On Hold
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 flex items-center gap-1">
            New Inquiry
          </span>
        );
    }
  }, []);

  // ─── STRICT AUTHENTICATION GUARD ────────────────────────────────
  // Without verified staff login/signup, do not open CRM data to anyone
  if (!currentHandler) {
    return (
      <div className="fixed inset-0 h-[100dvh] z-[150] bg-slate-950 flex flex-col justify-end sm:justify-center p-0 sm:p-3 md:p-5 overflow-hidden animate-fade-in">
        <div className="w-full h-full max-h-[100dvh] sm:max-h-[96dvh] max-w-[1600px] mx-auto bg-slate-950 border border-slate-800 rounded-none sm:rounded-[24px] shadow-2xl flex flex-col min-h-0 overflow-hidden relative">
          {/* Header */}
          <header className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <GoTrekLogo size="sm" className="h-8 w-8" />
              <div>
                <h1 className="font-black text-sm sm:text-base tracking-wide text-white">
                  GoTrek Yatra Dispatch & CRM
                </h1>
                <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1.5">
                  <Lock size={11} />
                  <span>Restricted Operations Zone • Staff Sign-In & Verification Required</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <X size={18} />
            </button>
          </header>

          {/* Auth Gate View */}
          <CrmAuthGate
            onLoginSuccess={(user, token) => {
              setCurrentHandler(user);
              if (token) localStorage.setItem("gotrek_handler_token", token);
              showToast(`Welcome, ${user.name}! CRM unlocked.`);
            }}
            onClose={onClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 h-[100dvh] z-[150] bg-slate-900/85 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-3 md:p-5 overflow-hidden animate-fade-in">
      <div className="w-full h-full max-h-[100dvh] sm:max-h-[96dvh] max-w-[1600px] mx-auto bg-slate-50 border border-slate-300/80 rounded-none sm:rounded-[24px] shadow-2xl flex flex-col min-h-0 overflow-hidden relative">
        
        {/* ─── TOAST NOTIFICATION ───────────────────────────────── */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-full bg-slate-950 text-amber-400 border border-amber-400/40 text-xs font-bold shadow-xl flex items-center gap-2 pointer-events-none"
            >
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── COMMAND CENTER HEADER ────────────────────────────── */}
        <header className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Logo & Operational Beacon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <GoTrekLogo
                size="sm"
                className="h-8 w-8"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-sm sm:text-base tracking-wide text-white">
                    GoTrek Yatra Dispatch & CRM
                  </h1>
                  <span className="hidden md:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-600/40">
                    Live Dispatch
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Pithoragarh HQ & Dharchula Base
                  </span>
                  <span>•</span>
                  <span>{istTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMainView("leads")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                mainView === "leads"
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users size={14} />
              <span className="hidden sm:inline">Pilgrim Manifest ({leads.length})</span>
              <span className="sm:hidden">Manifest ({leads.length})</span>
            </button>
            <button
              onClick={() => setMainView("yatra_checklist")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                mainView === "yatra_checklist"
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ClipboardCheck size={14} />
              <span className="hidden sm:inline">My Yatra Checklist</span>
              <span className="sm:hidden">Checklist</span>
            </button>
            <button
              onClick={() => setMainView("news_desk")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                mainView === "news_desk"
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <RadioTower size={14} />
              <span className="hidden sm:inline">Live News & Bulletins</span>
              <span className="sm:hidden">News</span>
            </button>
          </div>

          {/* Top Actions & Staff Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sync Status Button */}
            <button
              onClick={() => fetchLeads(true)}
              disabled={isSyncing}
              className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-200 py-1.5 px-2.5 rounded-lg hover:bg-slate-900 border border-slate-800 cursor-pointer"
              title="Refresh leads from cloud database"
            >
              <RefreshCw size={12} className={isSyncing ? "animate-spin text-amber-400" : ""} />
              <span>{isSyncing ? "Syncing..." : `Synced ${lastSyncedTime}`}</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="Export complete roster for SDM & ITBP checkposts"
            >
              <Download size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Register Yatri */}
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="py-1.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>+ Register Yatri</span>
            </button>

            {/* Staff User Avatar & Switch Account */}
            {currentHandler && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={() => setIsRosterModalOpen(true)}
                  className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity cursor-pointer group"
                  title="View Staff Operations Roster"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-xs">
                    {currentHandler.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs font-bold text-slate-200 leading-tight group-hover:text-amber-400 transition-colors">
                      {currentHandler.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[130px]">
                      {currentHandler.role}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-[10px] text-slate-400 hover:text-amber-400 underline decoration-slate-600 cursor-pointer hidden sm:inline"
                  title="Switch Staff Account"
                >
                  Switch
                </button>

                {/* Secure Sign Out & Lock Button */}
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-2.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Log out and lock CRM manifest data"
                >
                  <LogOut size={13} />
                  <span className="hidden sm:inline">Lock & Exit</span>
                </button>
              </div>
            )}

            {/* Exit Dashboard */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              title="Close CRM Dashboard"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ─── MAIN WORKSPACE CONTENT ───────────────────────────── */}
        {mainView === "news_desk" ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-slate-100">
            <CrmPublicationsManager currentHandlerName={currentHandler?.name || "Operations Lead"} />
          </div>
        ) : mainView === "yatra_checklist" ? (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-slate-100">
            <MyYatraChecklist
              leads={leads}
              selectedLeadId={selectedLead?.id}
              onSelectLead={(lead) => setSelectedLead(lead)}
              onUpdateLeadIlp={handleUpdateLeadIlp}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50/60">
            {/* Top Metrics Section with Mobile Quick Toggle */}
            <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xs shrink-0">
              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 lg:hidden">
                <span className="text-[11px] font-bold text-slate-700">Operational Summary ({leads.length} Yatris)</span>
                <button
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>{showMetrics ? "Hide" : "Show"} Metrics</span>
                  {showMetrics ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
              {showMetrics && (
                <div className="p-3 sm:p-4">
                  <CrmStatsCards leads={leads} />
                </div>
              )}
            </div>

            {/* Filter & Action Toolbar */}
            <div className="px-4 sm:px-5 py-3 border-b border-slate-200/80 bg-white flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px] sm:min-w-[240px] max-w-md">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Yatri name, phone, lead ID, vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300/80 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-amber-700 focus:bg-white transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none smooth-scroll-x touch-pan-x py-1 max-w-full">
                {[
                  { id: "All", label: "All Yatris", count: leads.length },
                  {
                    id: "Confirmed",
                    label: "Confirmed",
                    count: leads.filter((l) => getLeadTripStatus(l) === "Confirmed").length,
                  },
                  {
                    id: "ILP Processing",
                    label: "ILP Processing",
                    count: leads.filter((l) => l.status === "ILP Processing" || getLeadTripStatus(l) === "Processing").length,
                  },
                  {
                    id: "New Inquiry",
                    label: "New",
                    count: leads.filter((l) => l.status === "New Inquiry").length,
                  },
                  {
                    id: "Completed",
                    label: "Completed",
                    count: leads.filter((l) => getLeadTripStatus(l) === "Completed").length,
                  },
                  {
                    id: "On Hold",
                    label: "On Hold",
                    count: leads.filter((l) => getLeadTripStatus(l) === "On Hold").length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`py-1.5 px-3 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      statusFilter === tab.id
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        statusFilter === tab.id ? "bg-slate-700 text-amber-400" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle, Sort & Destination Dropdowns */}
              <div className="flex items-center gap-2 ml-auto flex-wrap">
                {/* Streamlined vs Full Details View Switch */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setCardViewMode("streamlined")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      cardViewMode === "streamlined"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Optimized & clean summary view"
                  >
                    Clean View
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardViewMode("full")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      cardViewMode === "full"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Show all technical permit checkpoints"
                  >
                    Full Details
                  </button>
                </div>

                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-amber-700"
                >
                  <option value="All">All Packages</option>
                  <option value="Adi Kailash">Adi Kailash</option>
                  <option value="Om Parvat">Om Parvat</option>
                  <option value="Kathgodam">From Kathgodam</option>
                  <option value="Darma">Darma Valley</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-amber-700"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="travelDate">Sort: Travel Date</option>
                  <option value="advance">Sort: Advance Paid</option>
                  <option value="name">Sort: Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Split Workspace: Left Leads Grid + Right Dossier Inspector */}
            <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden relative">
              {/* Left Side: Leads Manifest List */}
              <div
                className={`flex-1 overflow-y-auto smooth-scroll-y p-3 sm:p-5 space-y-3 min-h-0 overscroll-contain touch-pan-y ${
                  selectedLead ? "hidden lg:block" : "block"
                }`}
              >
                {filteredLeads.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
                    <Users size={36} className="mx-auto text-slate-300" />
                    <h3 className="font-bold text-slate-800 text-base">
                      No Pilgrim Inquiries Found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No records match the active search query or filter tags. Try clearing filters or register a new yatri.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("All");
                        setDestinationFilter("All");
                      }}
                      className="py-2 px-4 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id;
                      const isRecentlyUpdated = recentlyUpdatedIds.has(lead.id);
                      const tripStatus = getLeadTripStatus(lead);
                      const balanceDue = Math.max(0, (lead.totalAmount || 0) - (lead.advancePaid || 0));
                      const completedDocs = [
                        lead.ilpStatus.aadharProvided,
                        lead.ilpStatus.policeVerification,
                        lead.ilpStatus.medicalCertificate
                      ].filter(Boolean).length;

                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden bg-white ${
                            isSelected
                              ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md bg-amber-50/15"
                              : isRecentlyUpdated
                              ? "border-emerald-500 ring-2 ring-emerald-500/30 shadow-md bg-emerald-50/20 animate-pulse"
                              : "border-slate-200/90 hover:border-slate-300 hover:shadow-2xs"
                          }`}
                        >
                          {/* Priority Status Left Accent Strip */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                              tripStatus === "Confirmed"
                                ? "bg-emerald-500"
                                : tripStatus === "Processing"
                                ? "bg-sky-500"
                                : tripStatus === "Completed"
                                ? "bg-purple-500"
                                : tripStatus === "On Hold"
                                ? "bg-rose-500"
                                : "bg-amber-500"
                            }`}
                          />

                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pl-2">
                            {/* Pilgrim Primary Profile */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                                {lead.fullName.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-bold text-slate-900 text-sm truncate max-w-[180px] sm:max-w-xs">
                                    {lead.fullName}
                                  </h4>
                                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                                    {lead.id}
                                  </span>
                                  {renderTripStatusBadge(tripStatus)}

                                  {/* Prominent Details Updated Badge when person filled details */}
                                  {(isRecentlyUpdated || lead.updatedAt) && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0">
                                      <Sparkles size={10} className="text-emerald-600" />
                                      <span>Details Updated</span>
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                                  <span className="text-slate-800 font-semibold">{lead.destination}</span>
                                  <span className="text-slate-400 mx-1.5">·</span>
                                  <strong className="text-slate-800">{lead.travellers} Yatris</strong>
                                  <span className="text-slate-400 mx-1.5">|</span>
                                  <span className="text-slate-500">{lead.month}</span>
                                </p>

                                {/* Clean Filled Information Chips (Pickup, Notes, Docs) */}
                                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap text-[10px]">
                                  {lead.pickupLocation && (
                                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-medium truncate max-w-[200px]">
                                      📍 {lead.pickupLocation.split("(")[0].trim()}
                                    </span>
                                  )}

                                  {lead.notes && lead.notes.trim().length > 0 && (
                                    <span
                                      className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-semibold truncate max-w-[180px]"
                                      title={lead.notes}
                                    >
                                      💬 Has Request
                                    </span>
                                  )}

                                  {/* In Clean Mode: show compact summary badge only if documents were provided */}
                                  {cardViewMode === "streamlined" && completedDocs > 0 && (
                                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                                      📄 {completedDocs}/3 Docs Provided
                                    </span>
                                  )}

                                  {lead.ilpStatus.sdmApproval === "Issued" && (
                                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                                      ✓ Permit Ready
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Full Details Mode: Render the entire raw technical checklist */}
                            {cardViewMode === "full" && (
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span
                                  className={`px-2 py-0.5 rounded-md font-semibold border ${
                                    lead.ilpStatus.aadharProvided
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-slate-100 text-slate-500 border-slate-200"
                                  }`}
                                >
                                  Aadhar {lead.ilpStatus.aadharProvided ? "✓" : "Pending"}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md font-semibold border ${
                                    lead.ilpStatus.policeVerification
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-slate-100 text-slate-500 border-slate-200"
                                  }`}
                                >
                                  Police {lead.ilpStatus.policeVerification ? "✓" : "Pending"}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md font-semibold border ${
                                    lead.ilpStatus.medicalCertificate
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-slate-100 text-slate-500 border-slate-200"
                                  }`}
                                >
                                  Medical {lead.ilpStatus.medicalCertificate ? "✓" : "Pending"}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md font-bold border ${
                                    lead.ilpStatus.sdmApproval === "Issued"
                                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                      : lead.ilpStatus.sdmApproval === "In Progress"
                                      ? "bg-sky-100 text-sky-900 border-sky-300"
                                      : "bg-amber-100 text-amber-900 border-amber-300"
                                  }`}
                                >
                                  SDM: {lead.ilpStatus.sdmApproval}
                                </span>
                              </div>
                            )}

                            {/* Financials & Quick Action Buttons */}
                            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-900">
                                  ₹{(lead.advancePaid || 0).toLocaleString("en-IN")}{" "}
                                  <span className="text-[10px] text-slate-400 font-sans font-normal">paid</span>
                                </p>
                                <p className="text-[10px] font-semibold text-slate-500">
                                  {balanceDue === 0 ? (
                                    <span className="text-emerald-700 font-bold">Settled ✓</span>
                                  ) : (
                                    `₹${balanceDue.toLocaleString("en-IN")} due`
                                  )}
                                </p>
                              </div>

                              <div className="flex items-center gap-1">
                                <select
                                  value={lead.status}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    const newStatus = e.target.value as any;
                                    const updates: Partial<LeadBooking> = { status: newStatus };
                                    if (newStatus === "Approved & Booked") updates.tripStatus = "Confirmed";
                                    else if (newStatus === "ILP Processing") updates.tripStatus = "Processing";
                                    else if (newStatus === "Cancelled") updates.tripStatus = "On Hold";
                                    handleUpdateLeadStatus(lead.id, updates);
                                  }}
                                  className="text-[10px] font-bold py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 outline-none cursor-pointer hidden sm:inline-block"
                                  title="Quick update yatri status"
                                >
                                  <option value="New Inquiry">New Inquiry</option>
                                  <option value="ILP Processing">ILP Processing</option>
                                  <option value="Approved & Booked">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">On Hold</option>
                                </select>

                                <a
                                  href={`tel:${lead.phone}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="Call Pilgrim"
                                >
                                  <Phone size={13} />
                                </a>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const clean = lead.phone.replace(/[^0-9]/g, "");
                                    const phoneNum = clean.length === 10 ? `91${clean}` : clean;
                                    window.open(
                                      `https://wa.me/${phoneNum}?text=${encodeURIComponent(
                                        `Namaste ${lead.fullName}, greetings from GoTrek Travels regarding your upcoming Adi Kailash & Om Parvat Yatra booking (${lead.id}).`
                                      )}`,
                                      "_blank"
                                    );
                                  }}
                                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                                  title="Quick WhatsApp message"
                                >
                                  <Send size={13} />
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmationLead(lead);
                                  }}
                                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side: Selected Lead Dossier Inspector */}
              {selectedLead ? (
                <LeadDetailDossier
                  lead={selectedLead}
                  onClose={() => setSelectedLead(null)}
                  onUpdateStatus={handleUpdateLeadStatus}
                  onDeleteRequest={(lead) => setDeleteConfirmationLead(lead)}
                  renderTripStatusBadge={renderTripStatusBadge}
                  getLeadTripStatus={getLeadTripStatus}
                  onOpenChecklist={(lead) => {
                    setSelectedLead(lead);
                    setMainView("yatra_checklist");
                  }}
                />
              ) : (
                <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-8 text-center bg-white border-l border-slate-200/90 text-slate-600 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner">
                    <Users size={32} />
                  </div>
                  <div className="max-w-sm space-y-1.5">
                    <h3 className="font-black text-slate-900 text-lg">
                      Pilgrim Manifest Inspector
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Select any pilgrim from the manifest list to inspect SDM Inner Line Permits, 4x4 vehicle assignment, expedition captain, and dispatch WhatsApp templates.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setIsAddLeadModalOpen(true)}
                      className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus size={14} />
                      <span>+ Register New Yatri</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── MODALS ────────────────────────────────────────────── */}
        {/* Add Lead Modal */}
        <AddLeadModal
          isOpen={isAddLeadModalOpen}
          onClose={() => setIsAddLeadModalOpen(false)}
          onSubmit={handleCreateLead}
        />

        {/* Handlers Staff Roster Modal */}
        <HandlersRosterModal
          isOpen={isRosterModalOpen}
          onClose={() => setIsRosterModalOpen(false)}
          handlers={handlers}
          onOpenAddHandler={() => setIsAddHandlerModalOpen(true)}
        />

        {/* Add Handler Modal */}
        <AddHandlerModal
          isOpen={isAddHandlerModalOpen}
          onClose={() => setIsAddHandlerModalOpen(false)}
          onSubmit={async (handlerData) => {
            try {
              const res = await fetch("/api/admin/handlers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(handlerData),
              });
              const data = await res.json();
              if (data.success && data.handler) {
                setHandlers((prev) => [...prev, data.handler]);
                showToast(`Staff credentials issued to ${data.handler.name}`);
              }
            } catch (err) {
              console.warn("Failed to create handler account:", err);
            }
          }}
        />

        {/* Handler Auth Modal (Login / Switch Account) */}
        <HandlerAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentHandler(user);
            try {
              localStorage.setItem(HANDLER_CACHE_KEY, JSON.stringify(user));
            } catch (e) {}
            showToast(`Welcome back, ${user.name}`);
          }}
        />

        {/* Safe Delete Confirmation Modal (Iframe Safe) */}
        <AnimatePresence>
          {deleteConfirmationLead && (
            <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <Trash2 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Delete Yatri Inquiry?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Are you sure you want to remove <strong>{deleteConfirmationLead.fullName}</strong> ({deleteConfirmationLead.id}) from the active operations database?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setDeleteConfirmationLead(null)}
                    className="py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CrmDashboard;
