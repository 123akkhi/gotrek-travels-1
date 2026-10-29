import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Sparkles, Send, CheckCircle2, MapPin, Navigation, Building2, CreditCard, Lock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { GoTrekLogo } from "./GoTrekLogo";
import { YATRA_DESTINATIONS, PICKUP_LOCATIONS } from "../data/mockData";

interface InitialPopupModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenRazorpay?: (options: { amount: number; title: string; packageType?: string } | string) => void;
  onOpenInquiry?: (destination?: string) => void;
}

export const InitialPopupModal = memo(({ isOpen: controlledOpen, onClose: controlledClose, onOpenRazorpay, onOpenInquiry }: InitialPopupModalProps) => {
  const { language } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("Adi Kailash & Om Parvat (Dharchula Base)");
  const [pickupLocation, setPickupLocation] = useState("Kathgodam / Haldwani (Railway Station Hub)");
  const [customPickupCity, setCustomPickupCity] = useState("");
  const [travelDate, setTravelDate] = useState("2027-05-10");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const WHATSAPP_NUMBER = "917248285767";

  // Popup is strictly on-demand (no intrusive automatic timers)

  useEffect(() => {
    // Listen for custom trigger to open quick popup anytime
    const handleTrigger = () => setInternalOpen(true);
    window.addEventListener("open-quick-popup", handleTrigger);
    return () => window.removeEventListener("open-quick-popup", handleTrigger);
  }, []);

  const handleClose = () => {
    if (controlledClose) {
      controlledClose();
    } else {
      setInternalOpen(false);
    }
    sessionStorage.setItem("initialPopupDismissed", "true");
  };

  const resolvedPickup = pickupLocation === "other" && customPickupCity.trim()
    ? `Custom: ${customPickupCity.trim()}`
    : pickupLocation;

  const handleRazorpayPay = async () => {
    if (!fullName.trim() || !phone.trim()) {
      alert("Please enter your Full Name and WhatsApp Mobile number before proceeding to online booking.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          destination,
          pickupLocation: resolvedPickup,
          month: travelDate,
          travelDate,
          notes: "[Direct Advance Slot Booking via Razorpay from Initial Popup]",
          source: "Initial Popup -> Razorpay",
        }),
      });
    } catch (err) {
      console.error("Failed to post lead", err);
    }

    setSubmitting(false);
    handleClose();

    if (onOpenRazorpay) {
      if (typeof onOpenRazorpay === "function") {
        onOpenRazorpay({
          amount: 5000,
          title: destination,
          packageType: "2027 Advance Slot Confirmation",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          destination,
          pickupLocation: resolvedPickup,
          month: travelDate,
          travelDate,
          source: "Initial Popup Modal",
        }),
      });
      window.dispatchEvent(
        new CustomEvent("gotrek:lead-created", {
          detail: { fullName, phone, destination, pickupLocation: resolvedPickup },
        })
      );
    } catch (err) {
      console.error("Failed to post lead", err);
    }

    const msg = `*Quick Yatra Inquiry 2027*%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*WhatsApp:* ${encodeURIComponent(phone)}%0A*Destination:* ${encodeURIComponent(destination)}%0A*Pick-up Location:* ${encodeURIComponent(resolvedPickup)}%0A*Preferred Travel Date:* ${encodeURIComponent(travelDate)}%0A_Please send 2027 itinerary PDF, pickup logistics from ${encodeURIComponent(resolvedPickup)}, and Inner Line Permit procedure._`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg my-auto bg-white border border-[#E6E2D3] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 crisp-dialog"
          >
            {/* Header Banner */}
            <div 
              className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-4 sm:p-5 relative shrink-0"
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <GoTrekLogo size="sm" />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>{language === 'hi' ? '2027 यात्रा सीट खुली हैं' : '2027 Yatra Seats Open'}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug">
                {language === 'hi' ? 'आदि कैलाश व हिमालयी यात्रा' : 'Adi Kailash & Himalayan Yatra'}
              </h3>
              <p className="text-xs text-amber-200/90 mt-1 font-medium">
                {language === 'hi'
                  ? 'निःशुल्क यात्रा विवरण पीडीएफ, पिकअप व इनर लाइन परमिट सहायता प्राप्त करें'
                  : 'Get Instant PDF Itinerary, City Pickup & Govt Permit Support from Pithoragarh HQ'}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto overscroll-contain smooth-scroll-y">
              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-12 w-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {language === 'hi' ? 'धन्यवाद! आपकी पूछताछ प्राप्त हुई।' : 'Thank You! Inquiry Sent.'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === 'hi'
                      ? 'हमारी पिथौरागढ़ टीम शीघ्र ही आपसे व्हाट्सएप पर संपर्क करेगी।'
                      : 'Our Pithoragarh team will connect with you on WhatsApp shortly.'}
                  </p>
                  <button
                    onClick={handleClose}
                    className="min-h-[44px] px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-900 transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {language === 'hi' ? 'आपका नाम' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        autoComplete="name"
                        placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rajesh Kumar'}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 text-[16px] sm:text-xs text-slate-900 outline-hidden transition-all bg-white shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {language === 'hi' ? 'व्हाट्सएप नंबर' : 'WhatsApp Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder={language === 'hi' ? 'उदा. 9876543210' : 'e.g. 9876543210'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 text-[16px] sm:text-xs text-slate-900 outline-hidden transition-all bg-white shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Destination Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin size={12} className="text-amber-800" />
                      <span>{language === 'hi' ? 'यात्रा गंतव्य चुनें' : 'Select Pilgrimage Destination'} *</span>
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 text-[16px] sm:text-xs text-slate-900 outline-hidden transition-all bg-white font-medium cursor-pointer shadow-2xs"
                    >
                      <optgroup label="Adi Kailash & Om Parvat Circuits">
                        {YATRA_DESTINATIONS.filter(d => d.category.includes("Adi Kailash") || d.category.includes("Sacred")).map(d => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Garhwal & Alpine Shrines">
                        {YATRA_DESTINATIONS.filter(d => d.category.includes("Garhwal") || d.category.includes("Nature")).map(d => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Himachal Pradesh Expeditions">
                        {YATRA_DESTINATIONS.filter(d => d.category.includes("Himachal")).map(d => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Sacred Packages">
                        {YATRA_DESTINATIONS.filter(d => d.category.includes("Temple") || d.category.includes("VIP")).map(d => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Pick-up Location Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Navigation size={12} className="text-amber-800" />
                      <span>{language === 'hi' ? 'पिक-अप शहर चुनें' : 'Select Pick-up City (Major Cities)'} *</span>
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 text-[16px] sm:text-xs text-slate-900 outline-hidden transition-all bg-white font-medium cursor-pointer shadow-2xs"
                    >
                      <optgroup label="Uttarakhand Gateway Hubs">
                        {PICKUP_LOCATIONS.filter(p => p.state === "Uttarakhand").map(p => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Metro & Capital Cities">
                        {PICKUP_LOCATIONS.filter(p => p.state !== "Uttarakhand" && p.id !== "other").map(p => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Custom / Other">
                        <option value="other">Other City (Specify Below)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Custom city input if other is chosen */}
                  {pickupLocation === "other" && (
                    <div className="space-y-1 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 shadow-2xs">
                      <label className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                        <Building2 size={11} className="text-amber-800" />
                        <span>Enter Your City / Location</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customPickupCity}
                        onChange={(e) => setCustomPickupCity(e.target.value)}
                        placeholder="e.g. Surat, Varanasi, Indore, Nagpur..."
                        className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-[16px] sm:text-xs text-slate-900 bg-white outline-none focus:border-amber-800"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{language === 'hi' ? 'यात्रा की तारीख (कैलेंडर)' : 'Preferred Travel Date'}</span>
                      <span className="text-[10px] text-amber-700 font-semibold">2027 Season</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      min="2027-05-01"
                      max="2027-11-30"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 text-[16px] sm:text-xs text-slate-900 outline-hidden transition-all bg-white font-medium cursor-pointer shadow-2xs"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full min-h-[48px] py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:from-amber-600 active:to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                    >
                      <Send size={14} className="fill-slate-950" />
                      <span>
                        {submitting
                          ? (language === 'hi' ? 'भेजा जा रहा है...' : 'Sending...')
                          : (language === 'hi' ? 'व्हाट्सएप पर पीडीऍफ़ प्राप्त करें' : 'Get PDF Itinerary on WhatsApp')}
                      </span>
                    </button>

                    {onOpenRazorpay && (
                      <button
                        type="button"
                        onClick={handleRazorpayPay}
                        disabled={submitting}
                        className="w-full min-h-[48px] py-3 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 hover:from-slate-800 hover:to-amber-900 active:from-slate-950 active:to-black text-amber-300 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-amber-500/30 shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                      >
                        <CreditCard size={15} className="text-amber-400" />
                        <span>{language === 'hi' ? '₹5,000 अग्रिम भुगतान (रेज़रपे)' : 'Pay ₹5,000 Advance Slot (Razorpay)'}</span>
                        <Lock size={12} className="text-amber-400/70 ml-1" />
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Quick Contact Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck size={13} />
                  <span>{language === 'hi' ? '100% परमिट सुरक्षा' : '100% Permit Clearance'}</span>
                </span>
                <button
                  onClick={handleClose}
                  className="min-h-[44px] px-2 flex items-center text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
                >
                  {language === 'hi' ? 'बाद में देखें' : 'Maybe later'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

InitialPopupModal.displayName = "InitialPopupModal";

export default InitialPopupModal;

