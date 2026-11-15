import React, { memo, useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ADI_KAILASH_HOTELS, AccommodationStay } from "../data/hotelsData";
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  PhoneCall, 
  Bed, 
  ShieldCheck, 
  X, 
  ArrowRight,
  Coffee,
  Check,
  Pause,
  Play,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";

interface HotelsSectionProps {
  onOpenInquiry?: (stayName?: string) => void;
}

export const HotelsSection = memo(({ onOpenInquiry }: HotelsSectionProps) => {
  const { language } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'premium' | 'standard'>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedStay, setSelectedStay] = useState<AccommodationStay | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Mouse drag support for smooth desktop scrolling
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const filteredHotels = ADI_KAILASH_HOTELS.filter(hotel => {
    if (activeFilter === 'all') return true;
    return hotel.tier === activeFilter;
  });

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    const hasMoreRight = el.scrollWidth - el.clientWidth > 10;
    setCanScrollRight(hasMoreRight ? el.scrollLeft < el.scrollWidth - el.clientWidth - 15 : false);

    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;
    const currentIdx = Math.round(el.scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(currentIdx, 0), filteredHotels.length - 1));
  }, [filteredHotels.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Reset scroll position on filter change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeFilter]);

  // Gentle, slow-slideshow timer (advances every 4.5s)
  useEffect(() => {
    if (isPaused || filteredHotels.length <= 1) return;

    const interval = setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;
      const firstCard = el.firstElementChild as HTMLElement | null;
      const gap = window.innerWidth >= 640 ? 24 : 16;
      const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;

      // When near the end, loop back smoothly to start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, filteredHotels.length]);

  const scroll = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = sliderRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (stay: AccommodationStay) => {
    if (hasDraggedRef.current) return;
    setSelectedStay(stay);
  };

  // Close popup modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStay) {
        setSelectedStay(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStay]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStay]);

  const badgeText = 
    language === 'hi' ? '15 प्रमाणित आवास एवं होमस्टे' :
    language === 'gu' ? '15 પ્રમાણિત હોટેલ્સ અને હોમસ્ટે' :
    language === 'mr' ? '15 प्रमाणित हॉटेल्स आणि होमस्टे' :
    language === 'bn' ? '১৫টি অনুমোদিত হোটেল ও হোমস্টে' : '15 Verified Hotels & Alpine Stays';

  const sectionTitle = 
    language === 'hi' ? '15 स्टैंडर्ड एवं प्रीमियम होटल व्यवस्था' :
    language === 'gu' ? '15 સ્ટાન્ડર્ડ અને પ્રીમિયમ હોટેલ વ્યવસ્થા' :
    language === 'mr' ? '15 स्टँडर्ड आणि प्रीमियम हॉटेल्स व्यवस्था' :
    language === 'bn' ? '১৫টি স্ট্যান্ডার্ড ও প্রিমিয়াম হোটেল ব্যবস্থা' : '15 Standard & Premium Yatra Stays';

  const sectionSubtitle = 
    language === 'hi'
      ? 'धारचूला के रिवरसाइड डीलक्स होटल से लेकर गुंजी और नाबी के गर्म अल्पाइन पाइन कॉटेज का मंद स्लाइडिंग संग्रह।'
      : 'Explore our 15 handpicked standard homestays and premium deodar wooden cottages across Dharchula, Gunji, Nabi, and Vyas Valley.';

  const premiumCount = ADI_KAILASH_HOTELS.filter(h => h.tier === 'premium').length;
  const standardCount = ADI_KAILASH_HOTELS.filter(h => h.tier === 'standard').length;

  return (
    <section id="hotels" className="relative py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/90 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Building2 size={14} className="text-[#C91D24]" />
              <span>{badgeText}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {sectionTitle}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {sectionSubtitle}
            </p>
          </div>

          {/* Controls: Slow Slideshow Indicator + Left/Right Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 text-xs font-bold shadow-xs transition-colors cursor-pointer"
              title={isPaused ? "Resume slow slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={12} className="fill-slate-700" /> : <Pause size={12} className="fill-slate-700" />}
              <span className="hidden sm:inline">{isPaused ? "Resume" : "Slow Slideshow"}</span>
            </button>

            {/* Left Circular Arrow */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                canScrollLeft 
                  ? "bg-[#C91D24] text-white hover:bg-[#a5151c] active:scale-95" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
              aria-label="Previous stay"
              title="Previous stay"
            >
              <ChevronLeft size={20} className="stroke-[2.5]" />
            </button>

            {/* Right Circular Arrow */}
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                canScrollRight 
                  ? "bg-[#C91D24] text-white hover:bg-[#a5151c] active:scale-95" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
              aria-label="Next stay"
              title="Next stay"
            >
              <ChevronRight size={20} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Filter Segmented Control: All (15), Premium (7), Standard (8) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? "bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-stone-200"
            }`}
          >
            All 15 Stays (15)
          </button>

          <button
            onClick={() => setActiveFilter('premium')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'premium'
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md ring-2 ring-amber-500/30"
                : "bg-white text-slate-700 hover:bg-amber-50/50 border border-stone-200"
            }`}
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Premium Deluxe ({premiumCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter('standard')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'standard'
                ? "bg-emerald-700 text-white shadow-md ring-2 ring-emerald-600/30"
                : "bg-white text-slate-700 hover:bg-emerald-50/50 border border-stone-200"
            }`}
          >
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Standard Homestays ({standardCount})</span>
          </button>
        </div>

        {/* SLOW SLIDING SHOWCASE TRACK */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setIsPaused(false);
          }}
          onMouseEnter={() => setIsPaused(true)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-1 cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {filteredHotels.map((hotel, index) => {
            const isPremium = hotel.tier === 'premium';

            return (
              <div
                key={hotel.id}
                className="w-[84vw] sm:w-[340px] md:w-[370px] lg:w-[390px] shrink-0 snap-start flex flex-col"
              >
                <div
                  onClick={() => handleCardClick(hotel)}
                  className="group rounded-3xl bg-white border border-stone-200/90 hover:border-[#C91D24]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl relative h-full cursor-pointer"
                >
                  {/* Hotel Photo Banner with Blur-Up Strategy */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <BlurUpImage
                      src={hotel.image}
                      alt={hotel.name}
                      loading="lazy"
                      decoding="async"
                      preset="card"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                    {/* Top Tier Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-xs flex items-center gap-1 ${
                        isPremium 
                          ? "bg-amber-600/90 text-white border-amber-300/40"
                          : "bg-emerald-700/90 text-white border-emerald-300/40"
                      }`}>
                        {isPremium ? <Sparkles size={11} className="text-amber-200" /> : <CheckCircle2 size={11} className="text-emerald-200" />}
                        <span>{hotel.tierBadge}</span>
                      </span>
                    </div>

                    {/* Top Right: Location & Altitude */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-200 text-[10px] font-bold border border-white/20 flex items-center gap-1 shadow-xs">
                        <MapPin size={10} className="text-amber-400" />
                        <span>{hotel.location}</span>
                        <span className="text-slate-400">•</span>
                        <span>{hotel.altitude}</span>
                      </span>
                    </div>

                    {/* Bottom Left Rating */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-white">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-bold">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span>{hotel.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-medium">({hotel.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {hotel.roomType}
                        </span>
                        <span className="text-[10px] font-bold text-[#C91D24] bg-red-50 px-2 py-0.5 rounded-full">
                          {hotel.sharingType}
                        </span>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#C91D24] transition-colors leading-snug line-clamp-1">
                        {hotel.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {hotel.description}
                      </p>

                      {/* Amenities Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[10px] font-medium"
                          >
                            <Check size={10} className="text-emerald-600 stroke-[3]" />
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStay(hotel);
                        }}
                        className="text-xs font-bold text-slate-700 hover:text-[#C91D24] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Amenities</span>
                        <ArrowRight size={12} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenInquiry) onOpenInquiry(`Hotel Stay: ${hotel.name}`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <PhoneCall size={11} />
                        <span>Enquire Stay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots for the Slow Slideshow */}
        <div className="flex items-center justify-center gap-1.5 pt-6">
          {filteredHotels.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? "w-7 sm:w-8 h-2 bg-[#C91D24] shadow-xs"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to hotel ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* POPUP MODAL: Detailed Stay View & Inclusions (Rendered in portal for 100% viewport coverage) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedStay && (
              <div 
                className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-center md:items-center bg-black/85 backdrop-blur-md overflow-hidden p-0 md:p-6"
                onClick={() => setSelectedStay(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.98 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full md:max-w-4xl bg-white rounded-t-[28px] md:rounded-3xl shadow-2xl border border-stone-200 flex flex-col md:flex-row overflow-hidden max-h-[92vh] md:max-h-[86vh]"
                >
                  {/* Mobile Pull Handle */}
                  <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-2 md:hidden shrink-0" />

                  {/* LEFT PANE (Desktop) / TOP BANNER (Mobile) */}
                  <div className="relative h-48 sm:h-56 md:h-auto md:w-5/12 bg-slate-950 shrink-0 flex flex-col justify-between overflow-hidden">
                    <img
                      src={selectedStay.image}
                      alt={selectedStay.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-black/50 pointer-events-none" />

                    {/* Top Badges & Mobile Close Button */}
                    <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm ${
                            selectedStay.tier === 'premium' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-emerald-600 text-white font-bold'
                          }`}
                        >
                          {selectedStay.tierBadge}
                        </span>
                        {selectedStay.altitude && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs border border-white/20">
                            {selectedStay.altitude}
                          </span>
                        )}
                      </div>

                      {/* Close Button on Mobile (high touch target 44x44) */}
                      <button
                        onClick={() => setSelectedStay(null)}
                        className="md:hidden min-w-[40px] min-h-[40px] rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/20 active:scale-95"
                        aria-label="Close modal popup"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Overlay Details on Image (Stay title, location, package tag) */}
                    <div className="relative z-10 p-3.5 sm:p-4 text-white">
                      <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-amber-400/25 text-amber-300 border border-amber-400/30 mb-1">
                        {selectedStay.packageInclusion}
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl leading-tight text-white drop-shadow-md">
                        {selectedStay.name}
                      </h3>
                      {selectedStay.hindiName && (
                        <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                          {selectedStay.hindiName}
                        </p>
                      )}
                      <p className="text-xs text-amber-300 flex items-center gap-1 mt-1 font-semibold">
                        <MapPin size={13} className="shrink-0" />
                        <span>{selectedStay.location}</span>
                        <span className="mx-1">•</span>
                        <span>{selectedStay.roomType}</span>
                      </p>
                    </div>
                  </div>

                  {/* RIGHT PANE (Desktop) / BODY PANE (Mobile) */}
                  <div className="flex-1 flex flex-col overflow-hidden bg-white">
                    {/* Desktop-only Header with Close button */}
                    <div className="hidden md:flex items-center justify-between p-5 pb-3 border-b border-slate-100 shrink-0">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                          Official Route Accommodation • Kumaon Mandal
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {selectedStay.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setSelectedStay(null)}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Scrollable Content Pane */}
                    <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 md:p-6 space-y-4 text-xs text-slate-700">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">About this Accommodation</h4>
                        <p className="leading-relaxed text-slate-600 text-xs sm:text-[13px]">{selectedStay.description}</p>
                      </div>

                      {/* Room Type & Allotment Grid */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Room Category</div>
                          <div className="font-bold text-slate-800 text-xs sm:text-[13px] mt-0.5">{selectedStay.roomType}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Allotment Mode</div>
                          <div className="font-bold text-slate-800 text-xs sm:text-[13px] mt-0.5">{selectedStay.sharingType}</div>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                        <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                          Key Features:
                        </div>
                        {selectedStay.keyHighlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Verified Amenities Grid */}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-2">Verified Amenities & Heating</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedStay.amenities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs">
                              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                              <span className="font-medium text-[11px] sm:text-xs">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* GoTrek Inspection Guarantee */}
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <ShieldCheck size={15} className="text-amber-700" />
                          <span>GoTrek Pilgrim Inspection Guarantee</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-amber-800/90">
                          All yatris booked with GoTrek receive guaranteed hot water buckets, clean heavy thermal bedding, and hot Sattvik meals prepared fresh by native hosts.
                        </p>
                      </div>
                    </div>

                    {/* STICKY BOTTOM ACTION BAR (Always visible on mobile & docked on desktop) */}
                    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] md:pb-4 flex flex-col sm:flex-row gap-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const stayName = `${selectedStay.name} (${selectedStay.location})`;
                          setSelectedStay(null);
                          if (onOpenInquiry) onOpenInquiry(stayName);
                        }}
                        className="flex-1 min-h-[46px] py-3 px-4 rounded-xl bg-[#C91D24] hover:bg-[#A3161C] active:bg-[#851016] text-white font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        <span>Inquire & Reserve for 2027</span>
                        <ChevronRight size={15} />
                      </button>

                      <a
                        href={`https://wa.me/917248285767?text=${encodeURIComponent(
                          `Namaste! I want to check availability for ${selectedStay.name} (${selectedStay.location}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[46px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <span>WhatsApp Desk</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
});

HotelsSection.displayName = "HotelsSection";

export default HotelsSection;
