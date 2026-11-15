import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Building2,
  Sparkles,
  MapPin,
  ShieldCheck,
  Bed,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Search,
  Check,
  Info,
  Pause,
  Play,
  LayoutGrid,
  SlidersHorizontal,
  X,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import { ADI_KAILASH_HOTELS, AccommodationStay } from "../data/hotelsData";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { BlurUpImage } from "./BlurUpImage";

interface HotelsPageProps {
  onBack: () => void;
  onOpenInquiry?: (stayName?: string) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = memo(({ onBack, onOpenInquiry }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'premium' | 'standard'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedStay, setSelectedStay] = useState<AccommodationStay | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse drag support for smooth slider interaction
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const filteredHotels = ADI_KAILASH_HOTELS.filter((hotel) => {
    const matchesFilter = activeFilter === 'all' ? true : hotel.tier === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const premiumCount = ADI_KAILASH_HOTELS.filter((h) => h.tier === 'premium').length;
  const standardCount = ADI_KAILASH_HOTELS.filter((h) => h.tier === 'standard').length;

  // Scroll checking for slider buttons and progress indicators
  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    const hasMoreRight = el.scrollWidth - el.clientWidth > 10;
    setCanScrollRight(hasMoreRight ? el.scrollLeft < el.scrollWidth - el.clientWidth - 15 : false);

    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 360;
    const currentIdx = Math.round(el.scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(currentIdx, 0), Math.max(filteredHotels.length - 1, 0)));
  }, [filteredHotels.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || viewMode !== 'slider') return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, viewMode]);

  // Reset scroll on filter change
  useEffect(() => {
    if (sliderRef.current && viewMode === 'slider') {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeFilter, viewMode]);

  // Gentle, slow-slideshow timer (advances every 4.5 seconds in slider mode)
  useEffect(() => {
    if (isPaused || viewMode !== 'slider' || filteredHotels.length <= 1) return;

    const interval = setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;
      const firstCard = el.firstElementChild as HTMLElement | null;
      const gap = window.innerWidth >= 640 ? 24 : 16;
      const cardWidth = firstCard ? firstCard.clientWidth + gap : 360;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, viewMode, filteredHotels.length]);

  const handleScrollNav = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 360;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 360;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: "Home", onClick: onBack },
          { label: "Yatra Accommodations (15 Verified)", active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="Standard & Premium Deluxe"
        badgeType="gold"
      />

      {/* Subtle Background Om Motif */}
      <FloatingOmBackground density="sparse" className="opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8 relative z-10">
        
        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#1E293B] via-[#2A384C] to-[#1E293B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-amber-500/20"
        >
          {/* Top Actions & Back button */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer hover:border-amber-400/50"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>

            <span className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Vyas & Kumaon Corridor 2027
            </span>
          </div>

          <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10 hidden sm:block">
            <OmLightSymbol size="hero" glowColor="gold" animated={true} />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-widest">
              <Building2 size={13} className="text-amber-400" />
              <span>15 Official Route Properties</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light tracking-tight leading-tight">
              Yatra Stays: <span className="italic text-amber-400">15 Standard & Premium</span> Accommodations
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              From heated alpine wooden cottages at Gunji & Nabi to authentic village homestays and riverside retreats in Dharchula. Every stay is inspected for cleanliness, hot water, thick high-altitude bedding, and pure sattvik meals.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-700/80">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400">15</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Inspected Stays</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400">{premiumCount}</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Premium Deluxe</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400">{standardCount}</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Standard Homestays</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Sattvik Dining</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter, View Toggle, and Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm">
          {/* Segmented Tier Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-[#C91D24] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Stays (15)
            </button>
            <button
              onClick={() => setActiveFilter('premium')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeFilter === 'premium'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles size={12} />
              <span>Premium Deluxe ({premiumCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('standard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeFilter === 'standard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bed size={12} />
              <span>Standard Homestays ({standardCount})</span>
            </button>
          </div>

          {/* Right Controls: View Toggle, Play/Pause, and Search */}
          <div className="flex items-center gap-2">
            {/* View Mode Switcher: Slider vs Grid */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('slider')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Sliding Slideshow Manner"
              >
                <SlidersHorizontal size={14} />
                <span className="hidden md:inline">Sliding</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Full Grid View"
              >
                <LayoutGrid size={14} />
                <span className="hidden md:inline">Grid</span>
              </button>
            </div>

            {/* Slider Navigation Buttons (Shown only in slider mode) */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play size={13} className="text-emerald-600 ml-0.5" /> : <Pause size={13} className="text-slate-600" />}
                </button>
                <button
                  onClick={() => handleScrollNav("left")}
                  disabled={!canScrollLeft}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollLeft
                      ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-900 hover:text-white shadow-xs"
                      : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Previous Hotel"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => handleScrollNav("right")}
                  disabled={!canScrollRight}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollRight
                      ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-900 hover:text-white shadow-xs"
                      : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Next Hotel"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Search Box */}
            <div className="relative min-w-[160px] sm:min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter stays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* 1. SLIDING MANNER VIEW (Horizontal Smooth Slider) */}
        {viewMode === 'slider' ? (
          <div className="space-y-4">
            <div
              ref={sliderRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              onMouseDown={(e) => {
                isDraggingRef.current = true;
                hasDraggedRef.current = false;
                startXRef.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
                scrollLeftRef.current = sliderRef.current?.scrollLeft || 0;
              }}
              onMouseMove={(e) => {
                if (!isDraggingRef.current || !sliderRef.current) return;
                const x = e.pageX - (sliderRef.current.offsetLeft || 0);
                const walk = (x - startXRef.current) * 1.3;
                if (Math.abs(walk) > 5) hasDraggedRef.current = true;
                sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
              }}
              onMouseUp={() => {
                isDraggingRef.current = false;
              }}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 cursor-grab active:cursor-grabbing select-none"
            >
              {filteredHotels.map((hotel, index) => (
                <div
                  key={hotel.id}
                  onClick={() => {
                    if (!hasDraggedRef.current) {
                      setSelectedStay(hotel);
                    }
                  }}
                  className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 bg-white rounded-3xl border border-slate-200/90 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  {/* Banner Image with Blur-Up */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <BlurUpImage
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/20 to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md ${
                          hotel.tier === "premium"
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "bg-emerald-600 text-white font-bold"
                        }`}
                      >
                        {hotel.tierBadge}
                      </span>
                      {hotel.altitude && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs border border-white/20">
                          {hotel.altitude}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/90 text-slate-900 shadow-md">
                        {hotel.roomType}
                      </span>
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                        <MapPin size={12} />
                        <span>{hotel.location}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg leading-tight truncate">
                        {hotel.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1"
                        >
                          <Check size={10} className="text-emerald-600" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-800">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStay(hotel);
                        }}
                        className="text-xs font-bold text-[#C91D24] hover:text-[#A3161C] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenInquiry) {
                            onOpenInquiry(`${hotel.name} (${hotel.location})`);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-[#C91D24] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        Inquire Stay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Progress Indicator Dots */}
            {filteredHotels.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-2">
                {filteredHotels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx
                        ? "w-8 bg-[#C91D24]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Jump to stay ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 2. GRID MANNER VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => setSelectedStay(hotel)}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <BlurUpImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/20 to-black/30 pointer-events-none" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md ${
                        hotel.tier === "premium"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-emerald-600 text-white font-bold"
                      }`}
                    >
                      {hotel.tierBadge}
                    </span>
                    {hotel.altitude && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs border border-white/20">
                        {hotel.altitude}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/90 text-slate-900 shadow-md">
                      {hotel.roomType}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                      <MapPin size={12} />
                      <span>{hotel.location}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-tight truncate">
                      {hotel.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1"
                      >
                        <Check size={10} className="text-emerald-600" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-800">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStay(hotel);
                      }}
                      className="text-xs font-bold text-[#C91D24] hover:text-[#A3161C] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Amenities</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenInquiry) {
                          onOpenInquiry(`${hotel.name} (${hotel.location})`);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-[#C91D24] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredHotels.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Info size={32} className="mx-auto text-slate-400 mb-2" />
            <h3 className="font-bold text-slate-700 text-sm">No stays match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filter tabs or clear your search query.</p>
          </div>
        )}
      </div>

      {/* MODAL POPUP FOR STAY DETAILS (Rendered directly into document.body via Portal for 100% reliable positioning) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedStay && (
              <div
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
                onClick={() => setSelectedStay(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-300/40 relative my-auto max-h-[92vh] flex flex-col"
                >
                  {/* Modal Banner */}
                  <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0">
                    <BlurUpImage
                      src={selectedStay.image}
                      alt={selectedStay.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/50" />

                    {/* Prominent Close Button */}
                    <button
                      onClick={() => setSelectedStay(null)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 border border-white/20"
                      aria-label="Close modal popup"
                    >
                      <X size={18} />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm ${
                            selectedStay.tier === 'premium' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {selectedStay.tierBadge}
                        </span>
                        {selectedStay.altitude && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/10">
                            {selectedStay.altitude}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {selectedStay.packageInclusion}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl leading-tight drop-shadow-md">
                        {selectedStay.name}
                      </h3>
                      {selectedStay.hindiName && (
                        <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                          {selectedStay.hindiName}
                        </p>
                      )}
                      <p className="text-xs text-amber-300 flex items-center gap-1 mt-1 font-semibold">
                        <MapPin size={13} />
                        <span>{selectedStay.location}</span>
                        <span className="mx-1">•</span>
                        <span>{selectedStay.roomType}</span>
                      </p>
                    </div>
                  </div>

                  {/* Modal Scrollable Content */}
                  <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1.5">About this Accommodation</h4>
                      <p className="leading-relaxed text-slate-600 text-xs">{selectedStay.description}</p>
                    </div>

                    {/* Room Type & Sharing Details */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Room Type</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">{selectedStay.roomType}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Allotment Mode</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5">{selectedStay.sharingType}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Verified Amenities & Heating</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStay.amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span className="text-[11px] font-medium text-slate-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <ShieldCheck size={15} className="text-amber-700" />
                        <span>GoTrek Pilgrim Inspection Guarantee</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-amber-800/90">
                        All yatris booked with GoTrek receive guaranteed hot water buckets, clean heavy thermal bedding, and hot Sattvik meals prepared fresh by native hosts.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          const stayName = `${selectedStay.name} (${selectedStay.location})`;
                          setSelectedStay(null);
                          if (onOpenInquiry) onOpenInquiry(stayName);
                        }}
                        className="flex-1 py-3.5 px-4 rounded-xl bg-[#C91D24] hover:bg-[#A3161C] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Inquire & Reserve for 2027
                      </button>

                      <a
                        href={`https://wa.me/917248285767?text=${encodeURIComponent(
                          `Namaste! I want to check availability for ${selectedStay.name} (${selectedStay.location}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
    </motion.div>
  );
});

HotelsPage.displayName = "HotelsPage";

export default HotelsPage;
