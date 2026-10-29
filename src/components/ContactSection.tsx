import React, { useState, memo } from "react";
import { MapPin, PhoneCall, Mail, MessageSquare, Send, Clock, ShieldCheck, CheckCircle2, Sparkles, User, Calendar, Users, HelpCircle, Navigation, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { GmailIcon } from "./GmailIcon";
import { YATRA_DESTINATIONS, PICKUP_LOCATIONS } from "../data/mockData";

interface ContactSectionProps {
  onOpenInquiry?: (destination?: string) => void;
}

const INQUIRY_TYPES = [
  { id: "general", label: "2027 Yatra Inquiry", desc: "General packages, dates & pricing" },
  { id: "permit", label: "SDM Permit Assistance", desc: "ILP documentation & medical fitness" },
  { id: "group", label: "Group & Private 4x4", desc: "Private family SUV & helicopter booking" },
];

export const ContactSection = memo(({ onOpenInquiry }: ContactSectionProps) => {
  const [activeInquiryType, setActiveInquiryType] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("Kathgodam / Haldwani (Railway Station Hub)");
  const [customPickupCity, setCustomPickupCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    yatra: "Adi Kailash & Om Parvat (Dharchula Base)",
    travelers: "2",
    travelDate: "2027-05-10",
    message: "",
  });

  const resolvedPickup = pickupLocation === "other" && customPickupCity.trim()
    ? `Custom: ${customPickupCity.trim()}`
    : pickupLocation;

  const handleSubmit = async (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.yatra,
          pickupLocation: resolvedPickup,
          travellers: Number(formData.travelers) || 1,
          month: formData.travelDate,
          travelDate: formData.travelDate,
          notes: `${activeInquiryType.toUpperCase()} Inquiry: ${formData.message}`,
        }),
      });
    } catch (err) {
      console.error("Failed to record lead", err);
    }

    if (viaWhatsApp) {
      const typeLabel = INQUIRY_TYPES.find(t => t.id === activeInquiryType)?.label || "General Inquiry";
      const waMsg = `*New Yatra Inquiry (${typeLabel}) — GoTrek Travels 2027*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*WhatsApp Mobile:* ${encodeURIComponent(formData.phone)}%0A*Sacred Yatra Destination:* ${encodeURIComponent(formData.yatra)}%0A*Pick-up Location:* ${encodeURIComponent(resolvedPickup)}%0A*Travelers:* ${encodeURIComponent(formData.travelers)}%0A*Preferred Travel Date:* ${encodeURIComponent(formData.travelDate)}%0A${formData.message ? `*Special Request:* ${encodeURIComponent(formData.message)}%0A` : ""}%0A_Please share 2027 itinerary, pickup coordination from ${encodeURIComponent(resolvedPickup)}, permit guidelines & pricing details._`;
      window.open(`https://wa.me/917248285767?text=${waMsg}`, "_blank");
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", yatra: "Adi Kailash & Om Parvat (Dharchula Base)", travelers: "2", travelDate: "2027-05-10", message: "" });
      setPickupLocation("Kathgodam / Haldwani (Railway Station Hub)");
      setCustomPickupCity("");
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-[#F5F2ED] relative border-t border-[#E6E2D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xs">
            <PhoneCall size={14} className="text-amber-800 animate-pulse" />
            <span>24/7 Official Contact & Permit Control</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            Connect With Our <span className="italic text-amber-800">Pithoragarh HQ</span>
          </h2>
          <p className="text-[#5A5A40] text-sm sm:text-base italic">
            Have questions about destinations, major city pickups, Inner Line Permits, or booking seats? Speak directly with our Kumaon Yatra desk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & HQs with Hover Motion */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Primary Helpline Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 shadow-2xs hover:shadow-md transition-all space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <PhoneCall size={22} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    24/7 Yatra Helpline & WhatsApp Desk
                  </div>
                  <a href="tel:+917248285767" className="text-xl font-bold font-mono text-[#1E293B] hover:text-amber-800 transition-colors">
                    +91 72482 85767
                  </a>
                  <div className="text-xs text-slate-500 font-medium">WhatsApp / Call: +91 7248285767</div>
                  <div className="text-xs text-amber-800 font-bold mt-0.5">
                    Official Email: <a href="mailto:mailgotrek@gmail.com" className="underline hover:text-amber-950">mailgotrek@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5F2ED] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <a
                  href="https://wa.me/917248285767?text=Hello%20GoTrek,%20I%20want%20information%20regarding%20Adi%20Kailash%20and%20Char%20Dham%20Yatra%202027."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] p-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] active:bg-[#18A048] text-white font-bold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-2xs"
                >
                  <WhatsAppIcon size={16} className="text-white" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mailgotrek@gmail.com&su=Adi%20Kailash%20%26%20Om%20Parvat%20Yatra%20Inquiry%202027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-50 active:bg-slate-100 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-2xs"
                >
                  <GmailIcon size={16} />
                  <span>Open in Gmail</span>
                </a>

                <a
                  href="mailto:mailgotrek@gmail.com"
                  className="min-h-[44px] p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold hover:bg-amber-100 active:bg-amber-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-2xs"
                >
                  <Mail size={14} className="text-amber-800" />
                  <span>Email App</span>
                </a>
              </div>
            </motion.div>

            {/* Office Details */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 shadow-2xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <MapPin size={16} className="text-amber-800" />
                <span>Head Office & Operations Desk</span>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E6E2D3] space-y-1 hover:border-amber-400 transition-colors">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>GoTrek Travels Head Office</span>
                    <span className="text-[9px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-bold">Main Office</span>
                  </div>
                  <p className="text-slate-700 font-medium">Roadways Workshop Road, Opp. Joshi Bhawan, Chandrabhaga, Pithoragarh, Uttarakhand</p>
                  <div className="text-[10px] text-slate-500 font-semibold pt-1">
                    Central Booking, SDM Permit Liaison & Ground Operations Control
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-center gap-3 shadow-2xs">
              <Clock size={18} className="text-amber-800 shrink-0" />
              <div>
                <span className="font-bold block">Pithoragarh Control Room Timings:</span>
                <span className="text-slate-700">Open All 7 Days: 6:00 AM – 10:00 PM (Emergency WhatsApp 24/7)</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Callback Form with Sliding Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white border border-[#E6E2D3] rounded-[32px] p-6 sm:p-8 shadow-md space-y-6"
          >
            <div className="space-y-4 border-b border-[#F5F2ED] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-emerald-700" />
                  <span>Instant Call Back within 15 Minutes</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-700" />
                  <span>SDM Permit Authorized Desk</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#1E293B]">
                  Request Official 2027 Yatra Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select your destination, pickup hub, and inquiry category below for customized assistance from our Dharchula team.
                </p>
              </div>

              {/* Inquiry Category Sliding Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                {INQUIRY_TYPES.map((t) => {
                  const isSelected = activeInquiryType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveInquiryType(t.id)}
                      className={`relative min-h-[44px] p-2.5 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-900 text-white font-bold shadow-sm"
                          : "bg-[#FDFBF7] border border-[#E6E2D3] text-slate-700 hover:bg-[#F5F2ED]"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="inquiryTabBg"
                          className="absolute inset-0 bg-amber-900 rounded-2xl"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="font-bold">{t.label}</div>
                        <div className={`text-[10px] ${isSelected ? "text-amber-200" : "text-slate-500"}`}>
                          {t.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
                >
                  <CheckCircle2 size={40} className="mx-auto text-emerald-600 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our Dharchula Yatra officer has received your <span className="font-bold text-slate-900">{INQUIRY_TYPES.find(t=>t.id===activeInquiryType)?.label}</span> request and will call you on <span className="font-bold text-slate-900">{formData.phone}</span> within 15 minutes with complete guidelines for pickup at <span className="font-bold text-slate-900">{resolvedPickup}</span>.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=mailgotrek@gmail.com&su=Official%20Yatra%20Inquiry%20-%20${encodeURIComponent(formData.name)}&body=Hello%20GoTrek%20Team,%0A%0AMy%20Name:%20${encodeURIComponent(formData.name)}%0APhone:%20${encodeURIComponent(formData.phone)}%0AYatra%20Destination:%20${encodeURIComponent(formData.yatra)}%0APick-up%20Location:%20${encodeURIComponent(resolvedPickup)}%0ATravelers:%20${formData.travelers}%0ATravel%20Date:%20${formData.travelDate}%0A%0ANotes:%20${encodeURIComponent(formData.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all shadow-xs"
                    >
                      <GmailIcon size={14} />
                      <span>Send Duplicate to mailgotrek@gmail.com via Gmail</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key={activeInquiryType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => handleSubmit(e, false)} 
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <User size={12} className="text-amber-800" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <PhoneCall size={12} className="text-amber-800" />
                        <span>Mobile Number (WhatsApp) *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Destination & Pick-up Hub */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={12} className="text-amber-800" />
                        <span>Select Sacred Yatra Destination *</span>
                      </label>
                      <select
                        value={formData.yatra}
                        onChange={(e) => setFormData({ ...formData, yatra: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all cursor-pointer shadow-2xs"
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
                        <optgroup label="Temple Circuits & VIP Expeditions">
                          {YATRA_DESTINATIONS.filter(d => d.category.includes("Temple") || d.category.includes("VIP")).map(d => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <Navigation size={12} className="text-amber-800" />
                        <span>Pick-up Location (Major Cities) *</span>
                      </label>
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all cursor-pointer shadow-2xs"
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
                        <optgroup label="Other Locations">
                          <option value="other">Other City (Specify Below)</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Custom city input if other is chosen */}
                  {pickupLocation === "other" && (
                    <div className="space-y-1 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 shadow-2xs">
                      <label className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                        <Building2 size={11} className="text-amber-800" />
                        <span>Specify Your Pick-up City / Location</span>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <Users size={12} className="text-amber-800" />
                        <span>Travelers</span>
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all cursor-pointer shadow-2xs"
                      >
                        <option value="1">1 Person (Solo Yatri)</option>
                        <option value="2">2 Persons (Couple/Friends)</option>
                        <option value="4">4 Persons (Standard SUV Group)</option>
                        <option value="6">6 Persons (Family Batch)</option>
                        <option value="8">8+ Persons (Private Group)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-amber-800" />
                          <span>Travel / Batch Date *</span>
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold">2027 Season</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        min="2027-05-01"
                        max="2027-11-30"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all font-medium cursor-pointer shadow-2xs"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        {[
                          { label: "10 May", date: "2027-05-10" },
                          { label: "25 May", date: "2027-05-25" },
                          { label: "10 Jun", date: "2027-06-10" },
                          { label: "15 Sep", date: "2027-09-15" },
                          { label: "05 Oct", date: "2027-10-05" },
                        ].map((b) => (
                          <button
                            key={b.date}
                            type="button"
                            onClick={() => setFormData({ ...formData, travelDate: b.date })}
                            className={`text-[10px] min-h-[30px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                              formData.travelDate === b.date
                                ? "bg-amber-800 text-white border-amber-800 font-bold shadow-2xs"
                                : "bg-white border-[#E6E2D3] text-[#5A5A40] hover:bg-amber-50 hover:border-amber-400"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle size={12} className="text-amber-800" />
                      <span>Special Requests or Questions (Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        activeInquiryType === "permit"
                          ? "State any medical conditions, police clearance status, or passport/Aadhaar questions..."
                          : activeInquiryType === "group"
                          ? "Specify if requiring dedicated Innova/Bolero 4x4 or elderly support..."
                          : "Mention if traveling with senior citizens, flight arrival time, or preferred pickup point..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E6E2D3] text-[16px] sm:text-xs text-slate-900 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all shadow-2xs"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="w-full min-h-[48px] py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Send WhatsApp Inquiry</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full min-h-[48px] py-3.5 rounded-full bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 group cursor-pointer"
                    >
                      <span>Request Callback</span>
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

