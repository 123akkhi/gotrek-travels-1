import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Building2,
  Sparkles,
  MapPin,
  ShieldCheck,
  Coffee,
  Bed,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
  Check,
  Star,
  Info
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
  const [selectedStay, setSelectedStay] = useState<AccommodationStay | null>(null);

  const filteredHotels = ADI_KAILASH_HOTELS.filter((hotel) => {
    const matchesFilter = activeFilter === 'all' ? true : hotel.tier === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const premiumCount = ADI_KAILASH_HOTELS.filter(h => h.tier === 'premium').length;
  const standardCount = ADI_KAILASH_HOTELS.filter(h => h.tier === 'standard').length;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-10 relative z-10">
        
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
              From heated wooden alpine cottages at Gunji & Nabi to authentic village homestays and riverside retreats in Dharchula. Every stay is inspected for cleanliness, hot water, thick high-altitude bedding, and pure sattvik meals.
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

        {/* Filter and Search Controls */}
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

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by village or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
            />
          </div>
        </div>

        {/* 15 Stays Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/70 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Hotel Banner Image with Blur-Up */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <BlurUpImage
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                {/* Badges Top Left & Right */}
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

                {/* Location Title Bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                    <MapPin size={12} />
                    <span>{hotel.location}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight drop-shadow-sm truncate">
                    {hotel.name}
                  </h3>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
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

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedStay(hotel)}
                    className="text-xs font-bold text-[#C91D24] hover:text-[#A3161C] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Amenities</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => {
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
            </motion.div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Info size={32} className="mx-auto text-slate-400 mb-2" />
            <h3 className="font-bold text-slate-700 text-sm">No stays match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filter tabs or clear your search query.</p>
          </div>
        )}
      </div>

      {/* Modal Popup for Stay Details */}
      <AnimatePresence>
        {selectedStay && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
            onClick={() => setSelectedStay(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-300/40 relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Banner */}
              <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0">
                <BlurUpImage
                  src={selectedStay.image}
                  alt={selectedStay.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/40" />

                <button
                  onClick={() => setSelectedStay(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <ArrowLeft size={16} />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        selectedStay.tier === 'premium' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {selectedStay.tierBadge}
                    </span>
                    {selectedStay.altitude && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white">
                        {selectedStay.altitude}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-xl leading-tight">{selectedStay.name}</h3>
                  <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} />
                    <span>{selectedStay.location}</span>
                  </p>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">About this Stay</h4>
                  <p className="leading-relaxed text-slate-600">{selectedStay.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Verified Facilities & Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStay.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-medium text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-amber-700" />
                    <span>GoTrek Pilgrim Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800/90">
                    All yatris booked under GoTrek package tiers receive confirmed room allotments with hot bucket/running water, hygienic bedding, and fresh Kumaoni sattvik meals.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const stayName = `${selectedStay.name} (${selectedStay.location})`;
                      setSelectedStay(null);
                      if (onOpenInquiry) onOpenInquiry(stayName);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#C91D24] hover:bg-[#A3161C] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-md"
                  >
                    Inquire Availability for 2027
                  </button>

                  <a
                    href={`https://wa.me/917248285767?text=${encodeURIComponent(
                      `Namaste! I want to check availability for ${selectedStay.name} (${selectedStay.location}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-all cursor-pointer"
                  >
                    WhatsApp Desk
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

HotelsPage.displayName = "HotelsPage";

export default HotelsPage;
