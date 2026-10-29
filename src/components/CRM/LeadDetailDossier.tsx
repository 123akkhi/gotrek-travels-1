import React, { memo, useState, useEffect, useRef } from "react";
import {
  X,
  Phone,
  Send,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  DollarSign,
  AlertCircle,
  FileText,
  User,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ChevronLeft,
  Save,
  Check,
  Edit3,
  MapPin,
  Calendar,
  Mail,
  Users,
  ClipboardCheck
} from "lucide-react";
import { LeadBooking } from "../../types";

interface LeadDetailDossierProps {
  lead: LeadBooking;
  onClose: () => void;
  onUpdateStatus: (id: string, updates: Partial<LeadBooking>) => void;
  onDeleteRequest: (lead: LeadBooking) => void;
  renderTripStatusBadge: (status: 'Upcoming' | 'Confirmed' | 'Processing' | 'Completed' | 'On Hold') => React.ReactNode;
  getLeadTripStatus: (lead: LeadBooking) => 'Upcoming' | 'Confirmed' | 'Processing' | 'Completed' | 'On Hold';
  onOpenChecklist?: (lead: LeadBooking) => void;
}

const VEHICLE_OPTIONS = [
  "Unassigned",
  "UK-05 Scorpio (Scorpio 4x4) #1",
  "UK-05 Scorpio (Scorpio 4x4) #2",
  "UK-05 Bolero Camper 4WD #1",
  "UK-05 Bolero Camper 4WD #2",
  "UK-05 Force Urbania (12 Seater)",
  "Kathgodam Innova Crysta Escort"
];

const GUIDE_OPTIONS = [
  "Unassigned",
  "Deepak Singh Mehta (IMF Certified)",
  "Vinay Gururani (High-Altitude Specialist)",
  "Pawan Singh Bisht (4x4 Expedition Lead)",
  "Prakash Joshi (Vyas Valley Local)",
  "Kalyan Singh (Darma Valley Native)",
  "Anand Singh Dhami (Senior Sherpa)"
];

const PICKUP_OPTIONS = [
  "Kathgodam / Haldwani (Railway Station Hub)",
  "Pantnagar Airport (PGH Flight Arrivals)",
  "Dehradun Airport / Haridwar Railway Hub",
  "Delhi NCR (Custom Group Private Tempo)",
  "Dharchula Base Office Directly"
];

export const LeadDetailDossier: React.FC<LeadDetailDossierProps> = memo(({
  lead,
  onClose,
  onUpdateStatus,
  onDeleteRequest,
  renderTripStatusBadge,
  getLeadTripStatus,
  onOpenChecklist,
}) => {
  // Local state for smooth, un-lagged input editing
  const [localLead, setLocalLead] = useState<LeadBooking>(lead);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("Synced");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize when active selected lead switches
  useEffect(() => {
    setLocalLead(lead);
    setSaveStatus("saved");
    if (lead.updatedAt) {
      try {
        const d = new Date(lead.updatedAt);
        setLastSavedTime(d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      } catch (e) {
        setLastSavedTime("Just now");
      }
    }
  }, [lead.id]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Smooth debounced field update handler
  const handleFieldChange = (updates: Partial<LeadBooking>, immediate = false) => {
    const updated = { ...localLead, ...updates };
    setLocalLead(updated);
    setSaveStatus("saving");

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    const commitUpdates = () => {
      const nowIso = new Date().toISOString();
      const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      onUpdateStatus(lead.id, {
        ...updates,
        updatedAt: nowIso,
        detailsFilled: true,
      });
      setSaveStatus("saved");
      setLastSavedTime(timeStr);
    };

    if (immediate) {
      commitUpdates();
    } else {
      debounceTimerRef.current = setTimeout(commitUpdates, 400);
    }
  };

  // Immediate save trigger for manual clicks
  const handleManualSave = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    const nowIso = new Date().toISOString();
    const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    onUpdateStatus(lead.id, {
      ...localLead,
      updatedAt: nowIso,
      detailsFilled: true,
    });
    setSaveStatus("saved");
    setLastSavedTime(timeStr);
  };

  // Calculate ILP readiness percentage
  const ilpSteps = [
    localLead.ilpStatus.aadharProvided,
    localLead.ilpStatus.policeVerification,
    localLead.ilpStatus.medicalCertificate,
    localLead.ilpStatus.sdmApproval === "Issued"
  ];
  const completedIlpSteps = ilpSteps.filter(Boolean).length;
  const ilpPercentage = Math.round((completedIlpSteps / 4) * 100);

  const totalAmount = localLead.totalAmount || 0;
  const advancePaid = localLead.advancePaid || 0;
  const balanceDue = Math.max(0, totalAmount - advancePaid);

  const handleSendWhatsApp = (templateType: "ilp" | "confirmation" | "pickup") => {
    let message = "";
    if (templateType === "ilp") {
      message = `Namaste ${localLead.fullName}! Greetings from GoTrek Travels Pithoragarh.\n\nRegarding your Adi Kailash & Om Parvat Yatra booking (${localLead.id}):\n• SDM Dharchula Inner Line Permit Status: ${localLead.ilpStatus.sdmApproval}\n• Aadhar Card: ${localLead.ilpStatus.aadharProvided ? "Verified ✓" : "Pending Action"}\n• Police Verification: ${localLead.ilpStatus.policeVerification ? "Verified ✓" : "Pending Action"}\n• Medical Fitness: ${localLead.ilpStatus.medicalCertificate ? "Verified ✓" : "Required from MBBS Doctor"}\n\nPlease share the pending certificates so we can secure your SDM border clearance without delay.\n\nWarm regards,\nGoTrek Operations Desk (+91 72482 85767)`;
    } else if (templateType === "confirmation") {
      message = `Jai Bhole! Dear ${localLead.fullName},\n\nWe are pleased to confirm your high-altitude pilgrimage with GoTrek Travels:\n• Booking ID: ${localLead.id}\n• Package: ${localLead.destination}\n• Travel Date: ${localLead.month}\n• Yatris: ${localLead.travellers}\n• Advance Received: ₹${advancePaid.toLocaleString("en-IN")}\n• Balance Due at Kathgodam: ₹${balanceDue.toLocaleString("en-IN")}\n\nOur local team at Pithoragarh is preparing your permits and 4x4 transport. Har Har Mahadev!`;
    } else {
      message = `Namaste ${localLead.fullName}! Here is your GoTrek Yatra transit briefing:\n• Pickup Hub: ${localLead.pickupLocation || "Kathgodam Railway Station"}\n• Assigned Vehicle: ${localLead.assignedVehicle || "4x4 Himalayan Expedition Vehicle"}\n• Mountain Trip Lead: ${localLead.assignedGuide || "GoTrek Certified Expedition Captain"}\n• Important: Keep 4 physical passport photos and original Aadhar with you.\n\nContact your Dharchula Ground Desk anytime at +91 72482 85767.`;
    }

    const cleanPhone = localLead.phone.replace(/[^0-9]/g, "");
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`, "_blank");
    setCopiedTemplate(templateType);
    setTimeout(() => setCopiedTemplate(null), 3000);
  };

  return (
    <div className="w-full lg:w-[440px] xl:w-[490px] bg-white border-l border-slate-200/90 flex flex-col h-full min-h-0 overflow-hidden shadow-xl shrink-0 z-20 transition-all duration-200">
      {/* High-Visibility Sticky Mobile Navigation Bar */}
      <div className="lg:hidden bg-slate-950 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0 shadow-md">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 py-1.5 px-3 rounded-xl bg-slate-800/90 border border-slate-700/80 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>← Back to Yatris Manifest</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {localLead.id}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Dossier Header with Live Save / Sync Status */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between shrink-0 gap-2">
        <div className="space-y-1.5 pr-2 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300/60">
              {localLead.id}
            </span>
            {renderTripStatusBadge(getLeadTripStatus(localLead))}
            
            {/* Live Saved / Updating Status Pill */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                saveStatus === "saving"
                  ? "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
              }`}
            >
              {saveStatus === "saving" ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                  Updating...
                </>
              ) : (
                <>
                  <Check size={11} className="text-emerald-700" />
                  Updated {lastSavedTime}
                </>
              )}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight truncate">
            {localLead.fullName}
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
            <span className="truncate">{localLead.destination}</span>
            <span>·</span>
            <strong className="text-slate-700 whitespace-nowrap">{localLead.travellers} Yatris</strong>
            <span>·</span>
            <span className="text-slate-600 whitespace-nowrap">{localLead.month}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-xs cursor-pointer active:scale-95"
            title="Return to Pilgrim Manifest"
          >
            <ChevronLeft size={16} />
            <span className="hidden xs:inline">Back to Yatris</span>
            <span className="xs:hidden">Back</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Dossier"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Dossier Scrollable Body */}
      <div className="flex-1 overflow-y-auto smooth-scroll-y p-4 sm:p-5 space-y-4 text-xs text-slate-700 min-h-0 overscroll-contain touch-pan-y pb-16">
        {/* 1-Tap Quick Trip Status Selector */}
        <div className="p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span>Yatri Trip Stage</span>
            <span className="text-slate-400 font-normal">Tap to update instant</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {(["Upcoming", "Confirmed", "Processing", "Completed", "On Hold"] as const).map((st) => {
              const currentActive = getLeadTripStatus(localLead) === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    const newTripStatus = st;
                    const newStatus =
                      st === "Confirmed"
                        ? "Approved & Booked"
                        : st === "Processing"
                        ? "ILP Processing"
                        : st === "Completed"
                        ? "Completed"
                        : st === "On Hold"
                        ? "Cancelled"
                        : "New Inquiry";
                    handleFieldChange({ tripStatus: newTripStatus, status: newStatus }, true);
                  }}
                  className={`py-1.5 px-1 rounded-xl text-[10px] font-bold text-center transition-all cursor-pointer ${
                    currentActive
                      ? st === "Confirmed"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : st === "Processing"
                        ? "bg-sky-600 text-white shadow-xs"
                        : st === "Completed"
                        ? "bg-purple-600 text-white shadow-xs"
                        : st === "On Hold"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-amber-600 text-white shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Contact Bar */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${localLead.phone}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Phone size={13} />
            <span>Call Pilgrim</span>
          </a>

          <button
            onClick={() => handleSendWhatsApp("confirmation")}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Send size={13} />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setShowEditProfile((prev) => !prev)}
            className={`py-2.5 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              showEditProfile
                ? "bg-amber-100 border-amber-300 text-amber-900 shadow-2xs"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
            title="Fill / Edit Yatri Details"
          >
            <Edit3 size={13} />
            <span>{showEditProfile ? "Hide Profile" : "Edit Profile"}</span>
          </button>
        </div>

        {/* EDITABLE / FILLED YATRI DETAILS SECTION */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <User size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Pilgrim Journey Profile</h4>
                <p className="text-[10px] text-slate-500">Filled contact & logistics details</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleManualSave}
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Save size={11} />
              <span>Save Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <User size={11} />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={localLead.fullName}
                onChange={(e) => handleFieldChange({ fullName: e.target.value })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 text-xs outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Phone size={11} />
                <span>WhatsApp Phone</span>
              </label>
              <input
                type="text"
                value={localLead.phone}
                onChange={(e) => handleFieldChange({ phone: e.target.value })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 text-xs outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Mail size={11} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={localLead.email || ""}
                placeholder="pilgrim@example.com"
                onChange={(e) => handleFieldChange({ email: e.target.value })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-slate-900 text-xs outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Users size={11} />
                <span>Number of Yatris</span>
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={localLead.travellers}
                onChange={(e) => handleFieldChange({ travellers: Math.max(1, Number(e.target.value)) })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 text-xs outline-none focus:border-amber-700"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <MapPin size={11} />
                <span>Pick-up Location Hub</span>
              </label>
              <select
                value={localLead.pickupLocation || PICKUP_OPTIONS[0]}
                onChange={(e) => handleFieldChange({ pickupLocation: e.target.value }, true)}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-slate-900 text-xs outline-none cursor-pointer focus:border-amber-700"
              >
                {PICKUP_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Calendar size={11} />
                <span>Preferred Travel Month / Batch Date</span>
              </label>
              <input
                type="text"
                value={localLead.month}
                placeholder="e.g. May 2027, 15 May Departure"
                onChange={(e) => handleFieldChange({ month: e.target.value })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 font-medium text-slate-900 text-xs outline-none focus:border-amber-700"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Quick Templates */}
        <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
          <div className="flex items-center justify-between text-amber-950 font-bold">
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <MessageSquare size={13} className="text-amber-800" />
              <span>One-Click WhatsApp Updates</span>
            </span>
            {copiedTemplate && (
              <span className="text-[10px] text-emerald-700 font-bold">Sent!</span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleSendWhatsApp("ilp")}
              className="py-1.5 px-3 rounded-lg bg-white border border-amber-200/80 text-left font-semibold text-slate-800 hover:border-amber-500 hover:bg-amber-100/30 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>1. Request ILP & Medical Certificate</span>
              <ExternalLink size={11} className="text-amber-700" />
            </button>
            <button
              onClick={() => handleSendWhatsApp("confirmation")}
              className="py-1.5 px-3 rounded-lg bg-white border border-amber-200/80 text-left font-semibold text-slate-800 hover:border-amber-500 hover:bg-amber-100/30 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>2. Send Booking Confirmation & Advance Receipt</span>
              <ExternalLink size={11} className="text-amber-700" />
            </button>
            <button
              onClick={() => handleSendWhatsApp("pickup")}
              className="py-1.5 px-3 rounded-lg bg-white border border-amber-200/80 text-left font-semibold text-slate-800 hover:border-amber-500 hover:bg-amber-100/30 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>3. Send Kathgodam Pickup & Vehicle Details</span>
              <ExternalLink size={11} className="text-amber-700" />
            </button>
          </div>
        </div>

        {/* Inner Line Permit (ILP) Progress & Checklist */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Inner Line Permit (ILP) Status</h4>
                <p className="text-[10px] text-slate-500">Dharchula SDM & ITBP Gunji Clearance</p>
              </div>
            </div>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              {ilpPercentage}% Ready
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                ilpPercentage === 100 ? "bg-emerald-500" : ilpPercentage > 50 ? "bg-sky-500" : "bg-amber-500"
              }`}
              style={{ width: `${ilpPercentage}%` }}
            />
          </div>

          {/* Quick Jump to Full My Yatra Checklist */}
          {onOpenChecklist && (
            <button
              type="button"
              onClick={() => onOpenChecklist(localLead)}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300/80 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ClipboardCheck size={14} className="text-amber-700" />
              <span>Open & Track 'My Yatra Checklist'</span>
            </button>
          )}

          {/* Checklist Toggles */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors">
              <span className="font-medium text-slate-800 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${localLead.ilpStatus.aadharProvided ? "bg-emerald-500" : "bg-slate-300"}`} />
                Aadhar Card Front & Back Received
              </span>
              <input
                type="checkbox"
                checked={localLead.ilpStatus.aadharProvided}
                onChange={(e) =>
                  handleFieldChange({
                    ilpStatus: { ...localLead.ilpStatus, aadharProvided: e.target.checked }
                  }, true)
                }
                className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors">
              <span className="font-medium text-slate-800 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${localLead.ilpStatus.policeVerification ? "bg-emerald-500" : "bg-slate-300"}`} />
                Police Verification Certificate
              </span>
              <input
                type="checkbox"
                checked={localLead.ilpStatus.policeVerification}
                onChange={(e) =>
                  handleFieldChange({
                    ilpStatus: { ...localLead.ilpStatus, policeVerification: e.target.checked }
                  }, true)
                }
                className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors">
              <span className="font-medium text-slate-800 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${localLead.ilpStatus.medicalCertificate ? "bg-emerald-500" : "bg-slate-300"}`} />
                MBBS Doctor Medical Fitness Certificate
              </span>
              <input
                type="checkbox"
                checked={localLead.ilpStatus.medicalCertificate}
                onChange={(e) =>
                  handleFieldChange({
                    ilpStatus: { ...localLead.ilpStatus, medicalCertificate: e.target.checked }
                  }, true)
                }
                className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
              />
            </label>
          </div>

          {/* SDM Approval Dropdown */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-700">SDM Dharchula Approval:</span>
            <select
              value={localLead.ilpStatus.sdmApproval}
              onChange={(e) =>
                handleFieldChange({
                  ilpStatus: { ...localLead.ilpStatus, sdmApproval: e.target.value as any }
                }, true)
              }
              className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1 font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-700"
            >
              <option value="Pending">Pending Review</option>
              <option value="In Progress">In Progress (Submitted to SDM)</option>
              <option value="Issued">Issued (Permit Ready ✓)</option>
              <option value="Rejected">Rejected (Incomplete Docs)</option>
            </select>
          </div>
        </div>

        {/* Workflow & Inquiry Stage */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h4 className="font-bold text-slate-900 text-xs">Yatra Booking Workflow Status</h4>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Trip Priority Status
              </label>
              <select
                value={localLead.tripStatus || getLeadTripStatus(localLead)}
                onChange={(e) => handleFieldChange({ tripStatus: e.target.value as any }, true)}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-700"
              >
                <option value="Upcoming">Upcoming (Scheduled for Batch)</option>
                <option value="Confirmed">Confirmed (Booking & Advance Locked)</option>
                <option value="Processing">Processing (Permit / Police Clearance)</option>
                <option value="Completed">Completed (Yatra Successfully Finished)</option>
                <option value="On Hold">On Hold (Pending Payment / Verification)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Inquiry Stage
              </label>
              <select
                value={localLead.status}
                onChange={(e) => handleFieldChange({ status: e.target.value as any }, true)}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-700"
              >
                <option value="New Inquiry">New Inquiry</option>
                <option value="Contacted">Contacted</option>
                <option value="Docs Received">Docs Received</option>
                <option value="ILP Processing">ILP Processing</option>
                <option value="Approved & Booked">Approved & Booked</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4x4 Fleet & Guide Allocation */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Car size={16} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Vehicle & Sherpa Guide Allocation</h4>
              <p className="text-[10px] text-slate-500">Dharchula 4x4 Convoy & Certified Mountain Leads</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500">Assigned 4x4 SUV</label>
              <select
                value={localLead.assignedVehicle || "Unassigned"}
                onChange={(e) => handleFieldChange({ assignedVehicle: e.target.value }, true)}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-700"
              >
                {VEHICLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500">Lead Mountain Guide</label>
              <select
                value={localLead.assignedGuide || "Unassigned"}
                onChange={(e) => handleFieldChange({ assignedGuide: e.target.value }, true)}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-700"
              >
                {GUIDE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financials & Balance Calculation */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-xs">Payment Ledger & Receipts</h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${balanceDue === 0 ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
              {balanceDue === 0 ? "Fully Settled ✓" : `₹${balanceDue.toLocaleString("en-IN")} Due`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500">Total Yatra Cost (₹)</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => handleFieldChange({ totalAmount: Number(e.target.value) })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 outline-none focus:border-amber-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500">Advance Paid (₹)</label>
              <input
                type="number"
                value={advancePaid}
                onChange={(e) => handleFieldChange({ advancePaid: Number(e.target.value) })}
                className="w-full mt-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-amber-900 outline-none focus:border-amber-700"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold">Remaining Balance:</span>
            <span className="font-black text-slate-900 text-sm">
              ₹{balanceDue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Notes & Special Dietary / Medical Requirements */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-xs">Yatri Field Notes & Requirements</h4>
            {saveStatus === "saving" && (
              <span className="text-[10px] text-amber-700 font-semibold">Saving notes...</span>
            )}
          </div>
          <textarea
            rows={3}
            value={localLead.notes || ""}
            onChange={(e) => handleFieldChange({ notes: e.target.value })}
            placeholder="e.g. Senior citizen in group, needs ground floor room at Nabi homestay, pure Jain food..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-800 outline-none focus:border-amber-700 resize-none text-xs leading-relaxed"
          />
        </div>

        {/* Delete Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onDeleteRequest(lead)}
            className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 hover:text-rose-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete Customer Record</span>
          </button>
        </div>
      </div>
    </div>
  );
});

LeadDetailDossier.displayName = "LeadDetailDossier";
