import React, { useState, useEffect, memo } from "react";
import { motion } from "motion/react";
import {
  X,
  Send,
  Calendar,
  Users,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Check,
  CreditCard,
  Lock,
  Loader2,
  Navigation,
  Building2,
  Car,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Edit3,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { GmailIcon } from "./GmailIcon";
import { YATRA_DESTINATIONS, PICKUP_LOCATIONS } from "../data/mockData";

export type InquiryStep = 'personal' | 'destination' | 'payment';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultPickupLocation?: string;
  onOpenRazorpay?: (destination: string) => void;
}

export const InquiryModal = memo(({
  isOpen,
  onClose,
  defaultDestination = "Adi Kailash & Om Parvat (Ex-Kathgodam)",
  defaultPickupLocation = "Kathgodam / Haldwani (Railway Station Hub)",
  onOpenRazorpay,
}: InquiryModalProps) => {
  // Stepper State
  const [currentStep, setCurrentStep] = useState<InquiryStep>('personal');
  const [stepError, setStepError] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState(defaultDestination);
  const [pickupLocation, setPickupLocation] = useState(defaultPickupLocation);
  const [customPickupCity, setCustomPickupCity] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [travelDate, setTravelDate] = useState("2027-05-10");
  const [vehicle, setVehicle] = useState("suv");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Sync props when opened
  useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
    }
  }, [defaultDestination]);

  useEffect(() => {
    if (defaultPickupLocation) {
      setPickupLocation(defaultPickupLocation);
    }
  }, [defaultPickupLocation]);

  // Pre-fill user profile if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gotrek_pilgrim_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name && !fullName) setFullName(parsed.name);
        if (parsed.phone && !phone) setPhone(parsed.phone);
      }
    } catch {}
  }, []);

  const WHATSAPP_NUMBER = "917248285767";

  if (!isOpen) return null;

  const resolvedPickup = pickupLocation === "other" && customPickupCity.trim()
    ? `Custom: ${customPickupCity.trim()}`
    : pickupLocation;

  // Real-time validations
  const isPersonalComplete =
    fullName.trim().length >= 2 && phone.trim().replace(/\D/g, '').length >= 10;
  const isDestinationComplete =
    Boolean(destination) &&
    (pickupLocation !== "other" || customPickupCity.trim().length > 0) &&
    Boolean(travelDate);

  const stepNumber =
    currentStep === 'personal' ? 1 : currentStep === 'destination' ? 2 : 3;
  const progressPercent =
    currentStep === 'personal' ? 33 : currentStep === 'destination' ? 66 : 100;

  const formattedTravelDate = (() => {
    try {
      const d = new Date(travelDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch {}
    return travelDate || 'May 2027';
  })();

  const handleProceedToDestination = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setStepError("Please provide your full name before continuing.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanPhone.length < 10) {
      setStepError("Please provide a valid 10-digit WhatsApp mobile number.");
      return;
    }
    setStepError(null);
    setCurrentStep('destination');
  };

  const handleProceedToPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pickupLocation === "other" && !customPickupCity.trim()) {
      setStepError("Please specify your custom pickup city.");
      return;
    }
    setStepError(null);
    setCurrentStep('payment');
  };

  const handleStepClick = (target: InquiryStep) => {
    if (target === 'destination' || target === 'payment') {
      if (!isPersonalComplete) {
        setStepError("Please fill your Name and WhatsApp phone number first.");
        setCurrentStep('personal');
        return;
      }
    }
    if (target === 'payment') {
      if (pickupLocation === "other" && !customPickupCity.trim()) {
        setStepError("Please specify your custom pickup city.");
        setCurrentStep('destination');
        return;
      }
    }
    setStepError(null);
    setCurrentStep(target);
  };

  const handlePayRazorpay = async () => {
    if (!fullName.trim() || !phone.trim()) {
      setStepError("Please provide your Full Name and WhatsApp Mobile number before proceeding to payment.");
      setCurrentStep('personal');
      return;
    }

    setSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          destination,
          pickupLocation: resolvedPickup,
          travellers,
          month: travelDate,
          travelDate,
          vehicle,
          notes: `[Razorpay Intent] ${notes || 'User initiated ₹5,000 Advance Slot Booking'}`,
        }),
      });

      window.dispatchEvent(new CustomEvent("gotrek:lead-created", {
        detail: { fullName, phone, destination, pickupLocation: resolvedPickup }
      }));
    } catch (e) {
      console.error("Error creating payment lead:", e);
    } finally {
      setSubmitting(false);
      onClose();
      if (onOpenRazorpay) {
        onOpenRazorpay(destination);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      setStepError("Please enter your name and WhatsApp number.");
      setCurrentStep('personal');
      return;
    }

    setSubmitting(true);
    setStepError(null);

    try {
      if (dontShowAgain) {
        localStorage.setItem("gotrek_hide_inquiry_popup", "true");
      }

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          destination,
          pickupLocation: resolvedPickup,
          travellers,
          month: travelDate,
          travelDate,
          vehicle,
          notes,
        }),
      });

      window.dispatchEvent(new CustomEvent("gotrek:lead-created", {
        detail: { fullName, phone, destination, pickupLocation: resolvedPickup }
      }));

      const message = `*Yatra Booking Inquiry 2027 — GoTrek Travels Pithoragarh*%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Selected Destination:* ${encodeURIComponent(destination)}%0A*Pick-up City:* ${encodeURIComponent(resolvedPickup)}%0A*Preferred Travel Date:* ${encodeURIComponent(travelDate)} (${encodeURIComponent(formattedTravelDate)})%0A*Group Size:* ${encodeURIComponent(travellers)} Travelers%0A*Vehicle Preference:* ${encodeURIComponent(vehicle === "suv" ? "Scorpio / Isuzu 4x4" : "Bolero 4x4 Camper")}%0A${notes ? `*Special Request:* ${encodeURIComponent(notes)}%0A` : ""}%0A_Please share 2027 batch availability, inner line permit prerequisites, and confirmation details._`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl my-auto bg-white border border-[#E6E2D3] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] crisp-dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-b border-[#E6E2D3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-amber-800 text-white shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-800">
                Official 2027 Yatra Booking & Permits
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B]">
                Plan Your Holy Yatra Expedition
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#E6E2D3] text-[#1E293B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* REAL-TIME PROGRESS INDICATOR */}
        {!submitted && (
          <div className="bg-[#FAF8F5] border-b border-[#E6E2D3] px-4 py-3 sm:px-6 shrink-0">
            {/* Step info header */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#1E293B] text-white text-[10px] font-bold tracking-wider">
                  Step {stepNumber} of 3
                </span>
                <span className="text-xs font-bold text-[#1E293B]">
                  {currentStep === 'personal' && 'Personal Details'}
                  {currentStep === 'destination' && 'Destination & Route'}
                  {currentStep === 'payment' && 'Review & Confirmation'}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                  progressPercent === 100
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {progressPercent}% Ready
              </span>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="relative w-full h-2 bg-slate-200/80 rounded-full overflow-hidden mb-2.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-600 rounded-full"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* 3 Step Interactive Breadcrumb Nodes */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {/* Step 1: Personal Details */}
              <button
                type="button"
                onClick={() => handleStepClick('personal')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'personal'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : isPersonalComplete
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'personal'
                      ? 'bg-white/20 text-white'
                      : isPersonalComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isPersonalComplete && currentStep !== 'personal' ? (
                    <Check size={12} />
                  ) : (
                    <User size={12} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    1. Personal
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'personal' ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {fullName ? fullName.split(' ')[0] : 'Name & Contact'}
                  </div>
                </div>
              </button>

              {/* Step 2: Destination */}
              <button
                type="button"
                onClick={() => handleStepClick('destination')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'destination'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : isDestinationComplete
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'destination'
                      ? 'bg-white/20 text-white'
                      : isDestinationComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDestinationComplete && currentStep !== 'destination' ? (
                    <Check size={12} />
                  ) : (
                    <MapPin size={12} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    2. Destination
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'destination' ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {formattedTravelDate}
                  </div>
                </div>
              </button>

              {/* Step 3: Payment / Confirmation */}
              <button
                type="button"
                onClick={() => handleStepClick('payment')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'payment'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'payment'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <CreditCard size={12} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    3. Payment
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'payment' ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    Slot & Permit
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto space-y-4 bg-[#FDFBF7] smooth-scroll-y">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider">
                ✓ All 3 Steps Completed · Inquiry Dispatched
              </span>
              <h4 className="text-2xl font-bold text-[#1E293B]">Inquiry Received!</h4>
              <p className="text-[#5A5A40] text-xs max-w-sm mx-auto">
                Your Yatra inquiry has been logged in GoTrek Operations CRM and redirected to WhatsApp (+91-72482-85767).
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=mailgotrek@gmail.com&su=Official%20Yatra%20Inquiry%20-%20${encodeURIComponent(fullName)}&body=Hello%20GoTrek%20Team,%0A%0AMy%20Name:%20${encodeURIComponent(fullName)}%0APhone:%20${encodeURIComponent(phone)}%0AYatra%20Destination:%20${encodeURIComponent(destination)}%0APick-up%20City:%20${encodeURIComponent(resolvedPickup)}%0ATravelers:%20${travellers}%0ATravel%20Date:%20${travelDate}%0AVehicle:%20${vehicle}%0A${notes ? `Notes:%20${encodeURIComponent(notes)}%0A` : ""}%0AThank%20you.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <GmailIcon size={16} />
                  <span>Send via Gmail</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Validation alert */}
              {stepError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2 animate-in fade-in">
                  <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">{stepError}</div>
                  <button
                    type="button"
                    onClick={() => setStepError(null)}
                    className="text-rose-600 hover:text-rose-900 text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* STEP 1: PERSONAL DETAILS */}
              {currentStep === 'personal' && (
                <motion.div
                  key="inquiry-personal"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5">
                    <User size={16} className="text-amber-800 shrink-0" />
                    <p className="text-[11px] text-amber-900 leading-snug">
                      Your name and mobile number are registered with GoTrek Pithoragarh dispatch for Inner Line Permit (ILP) guidance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-amber-800" />
                          <span>Full Name *</span>
                        </span>
                        {fullName.trim().length >= 2 && (
                          <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                            <Check size={11} /> Verified
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder="e.g. Rameshwar Sharma"
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Phone size={13} className="text-amber-800" />
                          <span>WhatsApp Mobile *</span>
                        </span>
                        {phone.trim().replace(/\D/g, '').length >= 10 && (
                          <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                            <Check size={11} /> 10-Digit
                          </span>
                        )}
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-[11px] font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (stepError) setStepError(null);
                          }}
                          placeholder="9876543210"
                          className="w-full bg-white border border-[#E6E2D3] rounded-xl pl-11 pr-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all font-mono shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Next Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleProceedToDestination}
                      className="w-full min-h-[44px] py-3.5 rounded-xl bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Continue to Destination & Dates</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DESTINATION & LOGISTICS */}
              {currentStep === 'destination' && (
                <motion.div
                  key="inquiry-destination"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center gap-1">
                        <MapPin size={13} className="text-amber-800" />
                        <span>Yatra Destination Selection *</span>
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                      >
                        <optgroup label="Adi Kailash & Om Parvat Circuits">
                          {YATRA_DESTINATIONS.filter(
                            (d) =>
                              d.category.includes("Adi Kailash") ||
                              d.category.includes("Sacred")
                          ).map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name} ({d.duration})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Garhwal & Alpine Shrines">
                          {YATRA_DESTINATIONS.filter(
                            (d) =>
                              d.category.includes("Garhwal") ||
                              d.category.includes("Nature")
                          ).map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name} ({d.duration})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Himachal Pradesh Expeditions">
                          {YATRA_DESTINATIONS.filter((d) =>
                            d.category.includes("Himachal")
                          ).map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name} ({d.duration})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Temple Circuits & VIP Expeditions">
                          {YATRA_DESTINATIONS.filter(
                            (d) =>
                              d.category.includes("Temple") ||
                              d.category.includes("VIP")
                          ).map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center gap-1">
                        <Navigation size={13} className="text-amber-800" />
                        <span>Pick-up Location (Major Cities) *</span>
                      </label>
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                      >
                        <optgroup label="Uttarakhand Gateway Hubs">
                          {PICKUP_LOCATIONS.filter(
                            (p) => p.state === "Uttarakhand"
                          ).map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Metro & Capital Cities">
                          {PICKUP_LOCATIONS.filter(
                            (p) => p.state !== "Uttarakhand" && p.id !== "other"
                          ).map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Other Locations">
                          <option value="other">Other City (Specify Below)</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {pickupLocation === "other" && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 animate-in fade-in">
                      <label className="font-bold text-[#1E293B] flex items-center gap-1">
                        <Building2 size={13} className="text-amber-800" />
                        <span>Specify Your Pick-up City / Location</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customPickupCity}
                        onChange={(e) => setCustomPickupCity(e.target.value)}
                        placeholder="e.g. Surat, Indore, Varanasi, Nagpur, Patna..."
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 outline-none shadow-2xs"
                      />
                    </div>
                  )}

                  {/* Preferred Date & Travellers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-amber-800" />
                          <span>Preferred Travel Date *</span>
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold">
                          {formattedTravelDate}
                        </span>
                      </label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        min="2027-05-01"
                        max="2027-11-30"
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] font-medium focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all shadow-2xs"
                      />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                          { label: "May 10", date: "2027-05-10" },
                          { label: "May 25", date: "2027-05-25" },
                          { label: "Jun 10", date: "2027-06-10" },
                          { label: "Sep 15", date: "2027-09-15" },
                          { label: "Oct 05", date: "2027-10-05" },
                        ].map((b) => (
                          <button
                            key={b.date}
                            type="button"
                            onClick={() => setTravelDate(b.date)}
                            className={`text-[10px] min-h-[28px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer flex items-center justify-center ${
                              travelDate === b.date
                                ? "bg-amber-800 text-white border-amber-800 font-bold"
                                : "bg-white border-[#E6E2D3] text-[#5A5A40] hover:bg-amber-50"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center gap-1">
                        <Users size={13} className="text-amber-800" />
                        <span>Total Travellers</span>
                      </label>
                      <select
                        value={travellers}
                        onChange={(e) => setTravellers(e.target.value)}
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                      >
                        <option value="1">1 Person (Solo Yatri)</option>
                        <option value="2">2 Persons</option>
                        <option value="4">4 Persons (Standard SUV Group)</option>
                        <option value="6">6 Persons</option>
                        <option value="8">8+ Persons (Private Batch)</option>
                      </select>

                      <div className="pt-2">
                        <label className="font-bold text-[#1E293B]">Vehicle Preference</label>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setVehicle("standard")}
                            className={`flex-1 min-h-[36px] py-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                              vehicle === "standard"
                                ? "bg-amber-800 border-amber-800 text-white shadow-xs"
                                : "bg-white border-[#E6E2D3] text-[#1E293B] hover:bg-slate-50"
                            }`}
                          >
                            Bolero Camper
                          </button>
                          <button
                            type="button"
                            onClick={() => setVehicle("suv")}
                            className={`flex-1 min-h-[36px] py-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                              vehicle === "suv"
                                ? "bg-amber-800 border-amber-800 text-white shadow-xs"
                                : "bg-white border-[#E6E2D3] text-[#1E293B] hover:bg-slate-50"
                            }`}
                          >
                            Scorpio / Isuzu 4x4
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('personal')}
                      className="min-h-[44px] px-4 py-3.5 rounded-xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="min-h-[44px] flex-1 py-3.5 rounded-xl bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Proceed to Review & Booking</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW & PAYMENT / SUBMISSION */}
              {currentStep === 'payment' && (
                <motion.div
                  key="inquiry-payment"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  {/* Summary Card */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-amber-200/80 pb-1.5">
                      <span className="font-bold text-[#1E293B] flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                        <span>Yatra Booking Overview</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep('personal')}
                        className="text-[10px] font-bold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 size={11} />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Pilgrim Contact
                        </span>
                        <span className="font-bold text-slate-900">{fullName}</span>
                        <span className="block text-[10px] text-slate-600">
                          +91 {phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Travel Date & Pax
                        </span>
                        <span className="font-bold text-slate-900">
                          {formattedTravelDate}
                        </span>
                        <span className="block text-[10px] text-slate-600">
                          {travellers} Travelers ({vehicle.toUpperCase()})
                        </span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-amber-200/60">
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Circuit & Pickup
                        </span>
                        <span className="font-bold text-slate-900 block truncate">
                          {destination}
                        </span>
                        <span className="text-[10px] text-slate-600 block truncate">
                          Pickup: {resolvedPickup}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1E293B]">
                      Special Requests / Senior Citizens / Pickup Specifics (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="e.g. Flight arrival time / ground floor homestay / medical assistance..."
                      className="w-full bg-white border border-[#E6E2D3] rounded-xl p-3 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none resize-none transition-all shadow-2xs"
                    />
                  </div>

                  {/* Don't show again checkbox */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="dontShow"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="accent-[#5A5A40] rounded cursor-pointer h-4 w-4"
                    />
                    <label
                      htmlFor="dontShow"
                      className="text-[11px] text-[#5A5A40] font-medium cursor-pointer select-none"
                    >
                      Don't show popup again on this device
                    </label>
                  </div>

                  {/* Action Buttons: WhatsApp Inquiry + Razorpay Online Booking */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full min-h-[48px] py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-white" />
                          <span>Processing Permit Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <WhatsAppIcon size={20} className="text-white" />
                          <span>Send WhatsApp Inquiry & Get Permit PDF</span>
                        </>
                      )}
                    </button>

                    {onOpenRazorpay && (
                      <button
                        type="button"
                        onClick={handlePayRazorpay}
                        disabled={submitting}
                        className="w-full min-h-[48px] py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 hover:from-amber-500 hover:to-amber-800 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-950/20 border border-amber-500/40 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                      >
                        <CreditCard size={17} className="text-amber-300" />
                        <span>Pay ₹5,000 Advance Slot Booking (Razorpay)</span>
                        <Lock size={13} className="text-amber-200/80 ml-1" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentStep('destination')}
                      className="w-full min-h-[40px] py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Back to Destination & Logistics</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
});

InquiryModal.displayName = "InquiryModal";

export default InquiryModal;
