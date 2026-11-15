import React, { useState, memo, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  HeartPulse,
  Flower2,
  Home,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Phone,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Compass,
  CreditCard,
  Lock,
  Download,
  Share2,
  HelpCircle,
  Check,
  Star,
  Flame,
  Coffee,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BlurUpImage } from "./BlurUpImage";
import { useLanguage } from "../context/LanguageContext";
import {
  WOMEN_BATCH_DATES,
  WOMEN_SAFETY_PILLARS,
  WOMEN_BATCH_ITINERARY,
  WOMEN_YATRI_REVIEWS,
  WOMEN_BATCH_FAQS,
  WomenBatchDate
} from "../data/womenBatchData";

// Visual assets generated for the Women Special Batch
const HERO_BANNER = "/images/memories/group-memory-03.webp";
const DARSHAN_IMG = "/images/memories/group-memory-06.webp";
const LEAD_MEDIC_IMG = "/images/team/team5.webp";

interface WomenSpecialBatchPageProps {
  onBackToHome: () => void;
  onOpenInquiry: (destination?: string) => void;
  onOpenRazorpay?: (options: { amount: number; title: string; packageType?: string } | string) => void;
}

export const WomenSpecialBatchPage = memo(function WomenSpecialBatchPage({
  onBackToHome,
  onOpenInquiry,
  onOpenRazorpay
}: WomenSpecialBatchPageProps) {
  const { language } = useLanguage();
  const [selectedBatch, setSelectedBatch] = useState<WomenBatchDate>(WOMEN_BATCH_DATES[0]);
  const [activeTab, setActiveTab] = useState<'dates' | 'itinerary' | 'safety' | 'kit' | 'faqs'>('dates');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [copiedShare, setCopiedShare] = useState(false);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const WHATSAPP_NUMBER = "917248285767";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Adi Kailash Women Special Batch 2027 | GoTrek Travels",
        text: "Join the 100% women-led Adi Kailash & Om Parvat Yatra with certified lady guides, lady medics, and attached washroom stays.",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleBookBatch = (batch?: WomenBatchDate) => {
    const targetBatch = batch || selectedBatch;
    const destString = `Adi Kailash Women Special Batch 2027 (${targetBatch.formattedRange})`;
    if (onOpenRazorpay) {
      onOpenRazorpay({
        amount: 5000,
        title: destString,
        packageType: "2027 Women Special Advance Slot"
      });
    } else {
      onOpenInquiry(destString);
    }
  };

  const handleInquireWhatsApp = (batch?: WomenBatchDate) => {
    const targetBatch = batch || selectedBatch;
    const msg = `Namaste GoTrek Travels!%0A%0AI would like to inquire about joining the *Adi Kailash Women Special Batch 2027*.%0A%0A*Preferred Dates:* ${encodeURIComponent(targetBatch.formattedRange)}%0A*Theme:* ${encodeURIComponent(targetBatch.theme)}%0A%0APlease share the detailed PDF itinerary, female safety protocols, and seat availability. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-slate-900 selection:bg-rose-200 selection:text-rose-950 font-sans pb-24 sm:pb-16">
      
      {/* 1. TOP ANNOUNCEMENT & BREADCRUMB BAR (Blush Rose Accent) */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-white border-b border-rose-700/60 py-2.5 px-3 sm:px-6 sticky top-0 z-40 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          
          {/* Back Navigation Button */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-rose-100 hover:text-white font-bold transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-lg hover:bg-white/10 active:scale-95"
            title="Return to GoTrek Home"
          >
            <ArrowLeft size={16} className="text-rose-300" />
            <span className="hidden sm:inline">GoTrek Home</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Center Title / Kicker */}
          <div className="flex items-center gap-2 truncate text-center">
            <span className="inline-block text-rose-300">🌸</span>
            <span className="font-extrabold uppercase tracking-wider text-rose-100 text-[11px] sm:text-xs truncate">
              {language === 'hi' ? 'आदि कैलाश नारी शक्ति विशेष यात्रा दल २०२७' : 'Women Special Batch 2027 • Nari Shakti Yatra'}
            </span>
            <span className="hidden md:inline text-rose-300/80">·</span>
            <span className="hidden md:inline text-rose-200 text-[11px]">
              100% Women-Led • Lady Trek Leader & Medic
            </span>
          </div>

          {/* Quick Actions (Share + Call) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-colors cursor-pointer"
              title="Share Women Special Batch"
            >
              <Share2 size={14} />
            </button>
            {copiedShare && (
              <span className="text-[10px] text-rose-200 font-bold bg-rose-950 px-2 py-0.5 rounded animate-in fade-in">
                Link copied!
              </span>
            )}
            <a
              href="tel:+917248285767"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/60 hover:bg-rose-950 border border-rose-400/40 text-rose-200 hover:text-white transition-colors"
            >
              <Phone size={11} className="text-rose-300" />
              <span className="font-mono text-[11px]">+91 72482 85767</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. HERO SHOWCASE WITH REAL HIMALAYAN WOMEN YATRI BANNER */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Warm Rose Overlay */}
        <div className="absolute inset-0">
          <BlurUpImage
            src={HERO_BANNER}
            alt="Indian women yatris trekking in blooming pink Himalayan rhododendron trail to Adi Kailash"
            className="w-full h-full object-cover object-center brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-rose-950/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-rose-950/30" />
        </div>

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            
            {/* Elegant Text Kicker (No Pill Enclosures) */}
            <div className="flex items-center gap-2 text-rose-200 text-xs sm:text-sm font-semibold tracking-wide">
              <span>Himalayan Buransh Season</span>
              <span aria-hidden="true" className="text-rose-400">·</span>
              <span>100% Women-Led Convoys</span>
              <span aria-hidden="true" className="text-rose-400">·</span>
              <span>Kathgodam / Dharchula Base</span>
            </div>

            {/* Primary Page Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-md">
              Adi Kailash & Om Parvat <br />
              <span className="bg-gradient-to-r from-rose-200 via-pink-200 to-rose-100 bg-clip-text text-transparent">
                Women Special Batch
              </span>
            </h1>

            {/* Hindi Subtitle */}
            <p className="text-rose-200/90 text-sm sm:text-base font-medium">
              आदि कैलाश एवं ॐ पर्वत पावन नारी शक्ति यात्रा दल · २०२७
            </p>

            {/* Description Paragraph */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal drop-shadow-xs">
              A thoughtfully curated Himalayan pilgrimage exclusively for women. Travel in comfortable 4x4 convoys guided by certified female mountain instructors from NIM Uttarkashi, accompanied by a dedicated lady paramedic, private attached-washroom stays, and an intimate sisterhood of like-minded yatris.
            </p>

            {/* Unboxed Metadata Stats Row with Typographic Separators */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-white">
                <Clock size={15} className="text-rose-400 shrink-0" />
                <span>6 Days / 5 Nights</span>
              </span>
              <span aria-hidden="true" className="text-rose-400/80">·</span>
              <span className="flex items-center gap-1.5 text-white">
                <Users size={15} className="text-rose-400 shrink-0" />
                <span>Max 14 Women Yatris</span>
              </span>
              <span aria-hidden="true" className="text-rose-400/80">·</span>
              <span className="flex items-center gap-1.5 text-white">
                <MapPin size={15} className="text-rose-400 shrink-0" />
                <span>14,500 ft (4,420 m)</span>
              </span>
              <span aria-hidden="true" className="text-rose-400/80">·</span>
              <span className="flex items-center gap-1.5 text-rose-300 font-bold">
                <ShieldCheck size={15} className="text-rose-400 shrink-0" />
                <span>100% SDM Inner Line Permit</span>
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => handleBookBatch()}
                className="min-h-[50px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 hover:from-rose-500 hover:to-pink-600 active:from-rose-800 active:to-pink-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-rose-950/40 border border-rose-400/40 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard size={17} className="text-rose-200" />
                <span>Reserve Women Seat (₹5,000 Advance)</span>
                <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleInquireWhatsApp()}
                className="min-h-[50px] px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={18} className="text-emerald-400" />
                <span>WhatsApp Women Desk (+91-72482-85767)</span>
              </button>
            </div>

            {/* Trust reassurance note */}
            <p className="text-[11px] text-rose-200/80 flex items-center gap-1.5 pt-1">
              <Lock size={12} className="text-rose-400 shrink-0" />
              <span>Official GoTrek Pithoragarh native operations • 100% refundable/transferable advance up to 30 days before departure</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. STICKY SUB-NAVIGATION TABS (Segmented Control) */}
      <div className="sticky top-[45px] z-30 bg-[#FFF5F7]/95 backdrop-blur-md border-b border-rose-200/80 py-2.5 px-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Filter Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'dates', label: '2027 Batch Dates', icon: Calendar },
              { id: 'itinerary', label: '6-Day Itinerary', icon: Compass },
              { id: 'safety', label: 'Women Safety & Medics', icon: ShieldCheck },
              { id: 'kit', label: 'Hygiene & Comfort Kit', icon: Flower2 },
              { id: 'faqs', label: 'Questions & FAQs', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-white/80 text-rose-950 hover:bg-rose-100/70 border border-rose-200/60'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-rose-200' : 'text-rose-700'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Price Badge */}
          <div className="hidden lg:flex items-center gap-2 text-right shrink-0">
            <span className="text-[11px] text-rose-900 font-medium">All-Inclusive</span>
            <span className="text-base font-black text-rose-800">₹36,500</span>
            <span className="text-[10px] text-slate-500">/ yatri</span>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">

        {/* TAB 1: 2027 FIXED DEPARTURE BATCH DATES */}
        {activeTab === 'dates' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                  Fixed Departure Schedule • Max 14 Seats per Batch
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                  Choose Your 2027 Sacred Batch
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Timed specifically around optimal Himalayan weather, blooming alpine wildflowers, and auspicious Hindu sacred tithis.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-rose-900 font-bold bg-rose-100/70 border border-rose-200 px-3 py-1.5 rounded-xl self-start md:self-auto">
                <Users size={14} className="text-rose-700" />
                <span>Small Groups (12–14 Women Only)</span>
              </div>
            </div>

            {/* Batch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {WOMEN_BATCH_DATES.map((batch) => {
                const isSelected = selectedBatch.id === batch.id;
                return (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-rose-600 shadow-md ring-2 ring-rose-500/20'
                        : 'bg-white/80 hover:bg-white border-rose-200/80 hover:border-rose-300 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                          {batch.seasonBadge}
                        </span>
                        
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            batch.status === 'Few Seats Left'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : batch.status === 'Filling Fast'
                              ? 'bg-rose-100 text-rose-900 border border-rose-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {batch.availableSeats} of {batch.totalSeats} seats left
                        </span>
                      </div>

                      {/* Date Range */}
                      <div className="font-serif text-lg font-bold text-slate-900 leading-tight">
                        {batch.formattedRange}
                      </div>

                      <div className="text-xs font-bold text-rose-800 mt-1">
                        {batch.theme}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {batch.themeHindi}
                      </div>

                      {/* Special Highlight */}
                      <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-rose-100">
                        {batch.specialHighlight}
                      </p>
                    </div>

                    {/* Bottom CTA on Card */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookBatch(batch);
                        }}
                        className={`flex-1 min-h-[42px] px-3 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200'
                        }`}
                      >
                        <span>Select & Book</span>
                        <ChevronRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInquireWhatsApp(batch);
                        }}
                        className="min-h-[42px] px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center"
                        title="Chat on WhatsApp about this date"
                      >
                        <WhatsAppIcon size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Batch Summary Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-rose-500/30">
              <div className="space-y-1.5">
                <div className="text-xs uppercase font-extrabold tracking-wider text-rose-300">
                  Currently Selected Batch
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {selectedBatch.formattedRange} — {selectedBatch.theme}
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                  {selectedBatch.specialHighlight} · {selectedBatch.availableSeats} of {selectedBatch.totalSeats} seats remaining.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleBookBatch(selectedBatch)}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-white hover:bg-rose-50 active:bg-rose-100 text-rose-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} className="text-rose-700" />
                  <span>Book This Batch (₹5,000 Advance)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleInquireWhatsApp(selectedBatch)}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <WhatsAppIcon size={18} className="text-white" />
                  <span>WhatsApp Inquire</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 6-DAY DAY-BY-DAY ITINERARY ACCORDION */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                Comfort-Paced Expedition • Kathgodam to Vyas Valley
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                6-Day Sacred Itinerary
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Specially designed with gradual acclimatization stages, unhurried morning departures, and peaceful evening gatherings facing sacred Himalayan peaks.
              </p>
            </div>

            <div className="space-y-3.5">
              {WOMEN_BATCH_ITINERARY.map((dayItem) => {
                const isExpanded = expandedDay === dayItem.day;
                return (
                  <div
                    key={dayItem.day}
                    className="bg-white rounded-2xl border border-rose-200/80 shadow-xs overflow-hidden transition-all"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? null : dayItem.day)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-rose-50/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        {/* Day Number Badge */}
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 border border-rose-200 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold uppercase leading-none">Day</span>
                          <span className="text-base font-black leading-none">{dayItem.day}</span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span>{dayItem.altitude}</span>
                            <span aria-hidden="true">·</span>
                            <span>{dayItem.distance}</span>
                          </div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 truncate">
                            {dayItem.title}
                          </h4>
                          <p className="text-[11px] text-rose-700 font-medium truncate">
                            {dayItem.hindiTitle}
                          </p>
                        </div>
                      </div>

                      <div className="p-2 rounded-full bg-slate-100 text-slate-600 shrink-0">
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-rose-700' : ''}`}
                        />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="px-4 sm:px-5 pb-5 border-t border-rose-100 pt-3 space-y-4 text-xs text-slate-700 bg-[#FFFDFE]"
                        >
                          <p className="leading-relaxed text-slate-700 text-xs sm:text-sm">
                            {dayItem.description}
                          </p>

                          {/* Key Highlights Grid */}
                          <div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                              Day {dayItem.day} Sacred Highlights:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {dayItem.highlights.map((hl, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-center gap-2 p-2 rounded-xl bg-rose-50/70 border border-rose-200/60 text-slate-800 text-xs"
                                >
                                  <CheckCircle2 size={13} className="text-rose-700 shrink-0" />
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stays & Meals Info Row */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                            <div className="flex items-start gap-2">
                              <Home size={15} className="text-rose-700 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-900 block">Stay Arrangement:</span>
                                <span className="text-slate-600">{dayItem.stay}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Coffee size={15} className="text-amber-700 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-900 block">Meals Included:</span>
                                <span className="text-slate-600">{dayItem.meals}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WOMEN SAFETY & FEMALE MEDICS */}
        {activeTab === 'safety' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                  Zero Compromise Protocol • Certified Mountain Staff
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                  Guided by Women, for Women
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High-altitude expeditions require specialized attention to female physiology, acclimatization rhythm, and menstrual hygiene. GoTrek was founded in Pithoragarh, and our women special batches feature dedicated female leaders trained in wilderness rescue and mountain altitude medicine.
                </p>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-rose-200 bg-slate-900">
                <BlurUpImage
                  src={LEAD_MEDIC_IMG}
                  alt="Certified Indian female Himalayan trek leader and female medic by expedition 4x4"
                  className="w-full h-64 sm:h-72 object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-white text-xs">
                  <div className="font-bold">Meet Your Mountain Guardians</div>
                  <div className="text-[11px] text-rose-200">NIM Certified Female Mountain Leader & Paramedic</div>
                </div>
              </div>
            </div>

            {/* 6 Safety Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WOMEN_SAFETY_PILLARS.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 border border-rose-200 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900 leading-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-rose-700 font-medium">
                        {pillar.hindiTitle}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Perks check list */}
                  <div className="pt-3 border-t border-rose-100 space-y-1.5">
                    {pillar.perks.map((perk, perkIdx) => (
                      <div key={perkIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <Check size={12} className="text-emerald-600 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIMENTARY HYGIENE & COMFORT KIT */}
        {activeTab === 'kit' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-100/80 via-white to-pink-50 border border-rose-300 shadow-sm">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                  Complimentary GoTrek Pilgrim Kit
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  The GoTrek Himalayan Women Comfort Kit
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every yatri in our women special batch receives a curated, eco-friendly hygiene pack at Dharchula base before driving into the high valley. Packaged in a reusable organic cotton tote bag.
                </p>
              </div>

              {/* Kit Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {[
                  {
                    title: "Organic Sanitary Napkins",
                    desc: "Biodegradable, chemical-free high-absorbency pads suitable for cold climates.",
                    badge: "Eco-Friendly"
                  },
                  {
                    title: "Herbal Heating Patches",
                    desc: "Air-activated self-heating adhesive patches providing 8+ hours of cramp soothing at sub-zero temperatures.",
                    badge: "Pain Relief"
                  },
                  {
                    title: "Gentle Intimate Wipes",
                    desc: "Alcohol-free, pH-balanced sanitizing wipes for refreshing hygiene without freezing water.",
                    badge: "Dermatologically Tested"
                  },
                  {
                    title: "SPF 50+ Cold Sunblock",
                    desc: "Broad-spectrum UV protection formulated specifically for thin high-altitude Himalayan sun rays.",
                    badge: "High UV Defense"
                  },
                  {
                    title: "Heavy Thermal Bed Socks",
                    desc: "Extra-warm pure wool socks to keep your feet toasty inside the homestay quilts.",
                    badge: "Warmth"
                  },
                  {
                    title: "Himalayan Herbal Lip Balm",
                    desc: "Made with cold-pressed apricot kernel oil and beeswax to prevent painful dry lip cracks.",
                    badge: "Moisture"
                  },
                  {
                    title: "Biodegradable Disposal Bags",
                    desc: "Odor-free, discreet sealable pouches ensuring zero trash left behind on sacred trails.",
                    badge: "Leave No Trace"
                  },
                  {
                    title: "Parvati Sarovar Brass Diya",
                    desc: "Sacred handcrafted brass prayer lamp to light during our sisterhood deep-daan ceremony.",
                    badge: "Sacred Souvenir"
                  }
                ].map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-4 rounded-2xl bg-white border border-rose-200/90 shadow-2xs space-y-2"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Washroom Guarantee Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-rose-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300 shrink-0">
                  <Home size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Guaranteed Attached Washrooms Across Vyas Valley
                  </h4>
                  <p className="text-xs text-rose-200">
                    No outdoor pit toilets or shared common tents. All homestays in Dharchula, Gunji, Nabi, and Kuti are pre-inspected with private indoor washrooms and hot water buckets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FREQUENTLY ASKED QUESTIONS */}
        {activeTab === 'faqs' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="text-center mb-8 space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                Transparent Guidance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Everything you need to know about joining our women special batches.
              </p>
            </div>

            <div className="space-y-3">
              {WOMEN_BATCH_FAQS.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs space-y-2"
                >
                  <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-rose-700 font-sans font-bold">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SACRED DARSHAN & SISTERHOOD SHOWCASE (Visual Break with Darshan Photo) */}
        <section className="rounded-3xl overflow-hidden bg-slate-950 text-white relative border border-rose-300/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
              <BlurUpImage
                src={DARSHAN_IMG}
                alt="Indian women pilgrims offering prayers by Parvati Sarovar Lake in front of Adi Kailash"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
            </div>

            {/* Right Spiritual Content */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-bold uppercase tracking-widest">
                <span>🌸</span>
                <span>The Tapasya Abode of Goddess Parvati</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Deep-Daan at Parvati Sarovar & Sunrise Om Parvat
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Hindu lore, Goddess Parvati bathed and meditated in these sacred alpine waters before marrying Lord Shiva. When women yatris gather here in sisterhood, the spiritual resonance is profound. We arrange a tranquil evening aarti by the lakeside with handcrafted brass lamps and Pahari hymns.
              </p>

              {/* Inclusions Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-100 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-rose-400 shrink-0" />
                  <span>Special Sisterhood Aarti Kit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-rose-400 shrink-0" />
                  <span>Native Kumaoni Puja Vidhi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-rose-400 shrink-0" />
                  <span>Sacred Holy Water Bottle</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-rose-400 shrink-0" />
                  <span>Group Memory Photo Book</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TRANSPARENT ALL-INCLUSIVE PRICING TABLE */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-300/80 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
                100% Transparent • Zero Hidden Surcharges
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                All-Inclusive Women Batch Pricing
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Everything from pickup to drop-off, permits, medical support, stays, and meals is included.
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-rose-800">
                ₹36,500
              </span>
              <span className="text-xs text-slate-500 font-medium">
                per yatri (Ex-Kathgodam 6D/5N)
              </span>
            </div>
          </div>

          {/* Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-rose-100">
            {/* Inclusions */}
            <div className="space-y-2.5">
              <div className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>What's 100% Included:</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>4x4 Mahindra Bolero / Scorpio fleet with verified native drivers throughout Vyas Valley</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>All 5 nights stay in verified hotels & homestays with guaranteed attached washrooms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Certified NIM female trek leader & traveling lady paramedic with medical oxygen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>All Sattvik vegetarian meals, morning Buransh tea, and evening hot water bottles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% official Inner Line Permits (ILP) and SDM Dharchula administrative clearance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Complimentary GoTrek Himalayan Comfort & Hygiene Kit</span>
                </li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="space-y-2.5">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertCircle size={15} className="text-slate-400" />
                <span>Exclusions (Clear & Upfront):</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Train or flight tickets to/from Kathgodam Railway Station</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Personal pony / horse or Doli charges (optional for Parvati Sarovar walk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Personal expenses, laundry, extra snacks or packaged beverages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Any medical evacuation costs beyond initial wilderness first aid</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Bottom CTA Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rose-100">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-800">Direct From Dharchula?</span> Opt for Ex-Dharchula package at <span className="font-bold text-rose-800">₹28,500</span> (5 Days / 4 Nights).
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleBookBatch()}
                className="flex-1 sm:flex-initial min-h-[46px] px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard size={15} />
                <span>Pay ₹5,000 Advance</span>
              </button>

              <button
                type="button"
                onClick={() => handleInquireWhatsApp()}
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. PILGRIM SISTERHOOD REVIEWS */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-700">
              Verified Pilgrim Voices
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Sisterhood Memories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Real reflections from women who completed the sacred circuit with GoTrek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WOMEN_YATRI_REVIEWS.map((review, rIdx) => (
              <div
                key={rIdx}
                className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, sIdx) => (
                      <Star key={sIdx} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{review.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0 border border-rose-300">
                    {review.avatarText}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {review.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {review.city} · {review.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FINAL INSPIRATIONAL CLOSING BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950 via-rose-900 to-pink-950 text-white text-center space-y-4 border border-rose-400/30 shadow-2xl">
          <span className="text-2xl">🌸</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
            Embrace the Divine Call of Adi Kailash in 2027
          </h2>
          <p className="text-xs sm:text-sm text-rose-200 max-w-xl mx-auto leading-relaxed">
            Spaces are limited to ensure personalized safety and intimate sisterhood. Reserve your seat today with a simple ₹5,000 advance.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleBookBatch()}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Book 2027 Women Seat Now
            </button>
            <button
              type="button"
              onClick={() => handleInquireWhatsApp()}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon size={18} />
              <span>Chat with Pithoragarh Desk</span>
            </button>
          </div>
        </section>
      </div>

      {/* 9. STICKY BOTTOM MOBILE ACTION BAR (Only visible on mobile screens) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FFF5F7]/95 backdrop-blur-md border-t border-rose-300 p-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] flex items-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={() => handleBookBatch()}
          className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-rose-700 active:bg-rose-800 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          <CreditCard size={15} />
          <span>Book Batch (₹5,000)</span>
        </button>

        <button
          type="button"
          onClick={() => handleInquireWhatsApp()}
          className="min-h-[46px] px-3.5 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shrink-0"
        >
          <WhatsAppIcon size={16} />
          <span>WhatsApp</span>
        </button>
      </div>

    </div>
  );
});

WomenSpecialBatchPage.displayName = "WomenSpecialBatchPage";

export default WomenSpecialBatchPage;
