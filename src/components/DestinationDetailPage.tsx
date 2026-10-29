import React, { useState, lazy, Suspense } from 'react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  MapPin, Clock, Mountain, Calendar, ArrowLeft, ShieldCheck, Check, ChevronDown,
  Sparkles, Shirt, Footprints, Zap, AlertTriangle, FileText, CheckCircle2,
  Lock, CreditCard, Compass, Info, HeartHandshake, HelpCircle, Download, Building2, CloudSun,
  Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RelatedPackagesSection } from './RelatedPackagesSection';
import { FamousSpotsShowcase } from './FamousSpotsShowcase';
import { OmLightSymbol, SmoothStoneCard, FloatingOmBackground } from './OmLightMotif';
import { PageBreadcrumbs } from './PageBreadcrumbs';
import { TravelQuickActionStrip } from './TravelQuickActionStrip';
import { BlurUpImage } from './BlurUpImage';
import { getDestinationBlurPlaceholder } from '../utils/blurPlaceholders';

// Lazy-load heavy non-critical modals and sections to slash TBT and initial bundle execution
const RazorpayCheckoutModal = lazy(() =>
  import('./RazorpayCheckoutModal').then(m => ({ default: m.RazorpayCheckoutModal }))
);
const HotelsAccommodationSection = lazy(() =>
  import('./HotelsAccommodationSection').then(m => ({ default: m.HotelsAccommodationSection }))
);
const YatraWeatherCard = lazy(() =>
  import('./YatraWeatherCard').then(m => ({ default: m.YatraWeatherCard }))
);

interface DestinationDetailPageProps {
  slug: string;
  onBack: () => void;
  onOpenConsultant?: () => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug: string) => void;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  slug,
  onBack,
  onOpenConsultant,
  onSelectDestination,
  onSelectPackage,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'spots' | 'itinerary' | 'weather' | 'clothing' | 'permits' | 'faqs' | 'hotels'>('overview');
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);

  // Retrieve destination data or fallback to 'adi-kailash'
  const dest = DESTINATIONS_DATA[slug] || 
    DESTINATIONS_DATA[slug?.toLowerCase()] || 
    Object.values(DESTINATIONS_DATA).find(d => d.slug === slug || d.slug.includes(slug) || slug.includes(d.slug)) || 
    DESTINATIONS_DATA['adi-kailash'];

  const isAdiKailash = dest.slug === 'adi-kailash' || dest.slug === 'adi-kailash-yatra' || dest.slug === 'adi-kailash-yatra-package';
  const isHimachal = dest.location.includes("Himachal") || [
    'spiti-valley',
    'manali-solang-lahaul',
    'shimla-kufri-chail',
    'dharamshala-mcleodganj',
    'dharamshala-mcleodganj-triund',
    'kasol-manikaran-jibhi',
    'kinnaur-kalpa-sangla',
    'dalhousie-khajjiar-bir',
    'dalhousie-khajjiar-birbilling'
  ].includes(dest.slug);

  const famousSpotsCount = dest.famousSpots?.length || 0;

  const tabs = [
    { id: 'overview', label: 'Overview & Highlights' },
    ...(famousSpotsCount > 0 ? [{ id: 'spots' as const, label: `Famous Spots (${famousSpotsCount})`, icon: Landmark }] : []),
    { id: 'itinerary', label: `Day-Wise Itinerary (${dest.itinerary.length} Days)` },
    ...(isAdiKailash ? [{ id: 'hotels' as const, label: 'Hotels & Stays (Standard vs Premium)', icon: Building2 }] : []),
    { id: 'clothing', label: 'What to Wear & Pack', icon: Shirt },
    { id: 'permits', label: isHimachal ? 'Permits & Guidelines' : 'Inner Line Permits & Rules', icon: FileText },
    { id: 'faqs', label: 'FAQs & Guidelines', icon: HelpCircle },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      {/* Hero Banner Header */}
      <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-[#0F172A]">
        {/* Floating Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-30">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to All Destinations</span>
          </button>
        </div>

        <BlurUpImage
          src={dest.bannerImage}
          blurDataURL={getDestinationBlurPlaceholder(dest.slug)}
          alt={dest.title}
          referrerPolicy="no-referrer"
          priority={true}
          preset="detailBanner"
          fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover opacity-90 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-transparent to-transparent" />

        {/* Luminous Glowing Om Light Motif floating in upper corner */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
          <OmLightSymbol size="hero" glowColor="gold" animated={true} />
        </div>

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-8 pb-8 space-y-3 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-200 text-[11px] font-bold uppercase tracking-widest border border-amber-400/40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <span className="font-serif font-black text-amber-300">ॐ</span>
              <span>{dest.location}</span>
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest border border-white/20">
              Max Altitude: {dest.altitude}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md"
          >
            {dest.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber-100 text-sm sm:text-base font-serif italic max-w-2xl drop-shadow-xs"
          >
            {dest.subtitle}
          </motion.p>

          {/* Quick Metrics Bar in Smooth Stone Styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-3xl"
          >
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
                <Clock size={12} /> Duration
              </div>
              <div className="font-bold text-sm sm:text-base">{dest.duration}</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
                <Mountain size={12} /> Difficulty
              </div>
              <div className="font-bold text-sm sm:text-base">{dest.difficulty}</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
                <Calendar size={12} /> Best Season
              </div>
              <div className="font-bold text-xs sm:text-sm truncate">{dest.bestMonths}</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
                <ShieldCheck size={12} /> Permit Status
              </div>
              <div className="font-bold text-xs sm:text-sm text-emerald-300">100% SDM Managed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Tabs Navigation with responsive sticky offset */}
      <div className="sticky top-[78px] sm:top-[88px] lg:top-[94px] z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6E2D3] py-2.5 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#1E293B] text-white shadow-2xs'
                : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
            }`}
          >
            Overview & Highlights
          </button>

          {dest.famousSpots && dest.famousSpots.length > 0 && (
            <button
              onClick={() => setActiveTab('spots')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'spots'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Landmark size={14} className="text-amber-600" />
              <span>Famous Spots & Sites ({dest.famousSpots.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'itinerary'
                ? 'bg-[#1E293B] text-white shadow-2xs'
                : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
            }`}
          >
            Day-Wise Itinerary ({dest.itinerary.length} Days)
          </button>

          {isAdiKailash && (
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-[#1E293B] text-white shadow-2xs'
                  : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
              }`}
            >
              <Building2 size={14} />
              <span>Hotels & Stays</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('weather')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'weather'
                ? 'bg-[#1E293B] text-amber-400 shadow-2xs'
                : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
            }`}
          >
            <CloudSun size={14} className="text-amber-500" />
            <span>Live Weather</span>
          </button>

          <button
            onClick={() => setActiveTab('clothing')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'clothing'
                ? 'bg-amber-800 text-white shadow-2xs'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
            }`}
          >
            <Shirt size={14} />
            <span>What to Wear & Pack</span>
          </button>

          <button
            onClick={() => setActiveTab('permits')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'permits'
                ? 'bg-[#1E293B] text-white shadow-2xs'
                : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
            }`}
          >
            Inner Line Permits (ILP)
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'bg-[#1E293B] text-white shadow-2xs'
                : 'bg-[#F5F2ED] text-[#5A5A40] hover:bg-[#E6E2D3]'
            }`}
          >
            Destination FAQs
          </button>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E6E2D3] space-y-4 shadow-2xs">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B] flex items-center gap-2">
                  <Compass size={22} className="text-amber-800" />
                  <span>About {dest.title}</span>
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#5A5A40]">
                  {dest.overview}
                </p>

                <div className="p-4 rounded-2xl bg-[#F5F2ED] border-l-4 border-amber-700 text-xs text-[#1E293B] space-y-1 italic">
                  <div className="font-bold not-italic uppercase tracking-wider text-amber-900">Spiritual Significance</div>
                  <p>{dest.spiritualSignificance}</p>
                </div>
              </div>

              {/* Famous Spots & Sacred Landmarks Component */}
              {dest.famousSpots && dest.famousSpots.length > 0 && (
                <FamousSpotsShowcase
                  spots={dest.famousSpots}
                  destinationTitle={dest.title}
                  onOpenConsultant={onOpenConsultant}
                  onOpenInquiry={onOpenInquiry}
                />
              )}

              {/* Highlights */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E6E2D3] space-y-4 shadow-2xs">
                <h3 className="text-lg font-serif font-bold text-[#1E293B] flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-700" />
                  <span>Expedition Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.highlights.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-[#1E293B]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Live Weather Card */}
              <Suspense fallback={<div className="h-40 rounded-2xl bg-amber-50/50 animate-pulse" />}>
                <YatraWeatherCard slug={dest.slug} onOpenInquiry={onOpenInquiry} />
              </Suspense>

              {/* 4 Sacred Dhams Complete Detailed Breakdown */}
              {(dest.slug === 'chardham-yatra' || dest.slug.includes('dham')) && (
                <div className="p-6 sm:p-8 rounded-[28px] bg-[#FFFDF9] border border-amber-300 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-[10px] uppercase tracking-widest border border-amber-300">
                        <Sparkles size={12} className="text-amber-800" />
                        <span>The Four Sacred Shrines Circuit</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#1E293B] mt-1.5">
                        Detailed Guide to Every Sacred Dham
                      </h3>
                    </div>
                    <p className="text-xs text-amber-900/80 italic max-w-xs">
                      Comprehensive breakdown of Yamunotri, Gangotri, Kedarnath, and Badrinath. Click any Dham to view its dedicated full guide page.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Yamunotri Dham */}
                    <div className="bg-white border border-[#E6E2D3] rounded-[22px] p-5 space-y-3.5 hover:border-amber-400 transition-all shadow-2xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            Shrine 1 · Yamunotri
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">10,800 ft · Uttarkashi</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-[#1E293B]">Yamunotri Dham</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Revered origin shrine of Mother Yamuna atop Kalindi Parvat. Known for thermal boiling spring <strong>Surya Kund</strong> where pilgrims cook rice prasad, Divya Shila worship, and 6 km riverside trek from Janki Chatti.
                        </p>
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E6E2D3] text-[11px] space-y-1">
                          <div className="font-bold text-amber-900">Key Rituals & Highlights:</div>
                          <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                            <li>Surya Kund Boiling Spring Rice Prasadam</li>
                            <li>Divya Shila & Yamuna Devi Black Marble Idol Puja</li>
                            <li>Gauri Kund Warm Bath & Kalindi Parvat Views</li>
                          </ul>
                        </div>
                      </div>
                      {onSelectDestination && (
                        <button
                          onClick={() => onSelectDestination('yamunotri-dham')}
                          className="w-full py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center mt-2"
                        >
                          Explore Full Yamunotri Page →
                        </button>
                      )}
                    </div>

                    {/* Gangotri Dham */}
                    <div className="bg-white border border-[#E6E2D3] rounded-[22px] p-5 space-y-3.5 hover:border-amber-400 transition-all shadow-2xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            Shrine 2 · Gangotri
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">10,200 ft · Uttarkashi</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-[#1E293B]">Gangotri Dham</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Source of sacred Bhagirathi (Ganga) River. White granite 18th-century temple surrounded by tall Deodar forests. Direct motorable road with zero trekking required.
                        </p>
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E6E2D3] text-[11px] space-y-1">
                          <div className="font-bold text-amber-900">Key Rituals & Highlights:</div>
                          <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                            <li>Holy Ganga Snan at Bhagirathi Ghat</li>
                            <li>Evening Ganga Aarti & Submerged Shivling View</li>
                            <li>Harsil Valley Apple Orchards Stopover</li>
                          </ul>
                        </div>
                      </div>
                      {onSelectDestination && (
                        <button
                          onClick={() => onSelectDestination('gangotri-dham')}
                          className="w-full py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center mt-2"
                        >
                          Explore Full Gangotri Page →
                        </button>
                      )}
                    </div>

                    {/* Kedarnath Dham */}
                    <div className="bg-white border border-[#E6E2D3] rounded-[22px] p-5 space-y-3.5 hover:border-amber-400 transition-all shadow-2xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            Shrine 3 · Kedarnath
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">11,755 ft · Rudraprayag</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-[#1E293B]">Kedarnath Dham</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          11th Jyotirlinga of Lord Shiva. 1,000-year-old stone temple built by Adi Shankaracharya near Chorabari Glacier. Accessible via 16 km trek from Gaurikund or IRCTC helicopter.
                        </p>
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E6E2D3] text-[11px] space-y-1">
                          <div className="font-bold text-amber-900">Key Rituals & Highlights:</div>
                          <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                            <li>Triangular Shiva Linga Abhishek & Evening Aarti</li>
                            <li>Bhairavnath Temple Hike overlooking valley</li>
                            <li>Bhim Shila Rock Worship & High Altitude Stay</li>
                          </ul>
                        </div>
                      </div>
                      {onSelectDestination && (
                        <button
                          onClick={() => onSelectDestination('kedarnath-dham')}
                          className="w-full py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center mt-2"
                        >
                          Explore Full Kedarnath Page →
                        </button>
                      )}
                    </div>

                    {/* Badrinath Dham */}
                    <div className="bg-white border border-[#E6E2D3] rounded-[22px] p-5 space-y-3.5 hover:border-amber-400 transition-all shadow-2xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            Shrine 4 · Badrinath
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">10,830 ft · Chamoli</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-[#1E293B]">Badrinath Dham</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Supreme Abode of Lord Badri Vishal (Vishnu) between Nar & Narayana mountains. Houses self-manifested black stone idol & 45°C sulfur hot spring (Tapt Kund).
                        </p>
                        <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#E6E2D3] text-[11px] space-y-1">
                          <div className="font-bold text-amber-900">Key Rituals & Highlights:</div>
                          <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                            <li>Tapt Kund 45°C Thermal Bath & Swarna Aarti</li>
                            <li>Mana Village (Last Indian Village on Tibet Border)</li>
                            <li>Vyas Gufa, Ganesha Cave & Saraswati River Origin</li>
                          </ul>
                        </div>
                      </div>
                      {onSelectDestination && (
                        <button
                          onClick={() => onSelectDestination('badrinath-dham')}
                          className="w-full py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center mt-2"
                        >
                          Explore Full Badrinath Page →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E6E2D3] space-y-6 shadow-2xs">
                <h3 className="text-lg font-serif font-bold text-[#1E293B]">Package Scope & Inclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3">
                    <div className="font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-700" />
                      <span>What Is Included</span>
                    </div>
                    <ul className="space-y-2">
                      {dest.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A5A40]">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle size={16} className="text-rose-700" />
                      <span>What Is Excluded</span>
                    </div>
                    <ul className="space-y-2">
                      {dest.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A5A40]">
                          <span className="text-rose-700 font-bold">✗</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FAMOUS SPOTS & SACRED LANDMARKS */}
          {activeTab === 'spots' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <FamousSpotsShowcase
                spots={dest.famousSpots}
                destinationTitle={dest.title}
                onOpenConsultant={onOpenConsultant}
                onOpenInquiry={onOpenInquiry}
              />
            </div>
          )}

          {/* TAB 2: WEATHER & CONDITIONS */}
          {activeTab === 'weather' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Suspense fallback={<div className="h-64 rounded-2xl bg-amber-50/50 animate-pulse" />}>
                <YatraWeatherCard slug={dest.slug} onOpenInquiry={onOpenInquiry} />
              </Suspense>
            </div>
          )}

          {/* TAB 3: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-6 rounded-[28px] bg-white border border-[#E6E2D3] space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Day-by-Day Sacred Itinerary</h3>
                <p className="text-xs text-[#5A5A40]">
                  Carefully planned route incorporating high-altitude acclimatization stops and medical safety checks.
                </p>
              </div>

              <div className="space-y-3">
                {dest.itinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="rounded-[24px] bg-white border border-[#E6E2D3] overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#F5F2ED]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-9 w-9 rounded-full bg-[#1E293B] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E293B]">
                              {day.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#5A5A40] pt-0.5">
                              <span className="flex items-center gap-1">
                                <Mountain size={12} className="text-amber-800" /> Altitude: {day.altitude}
                              </span>
                              <span>•</span>
                              <span>Distance: {day.distance}</span>
                            </div>
                          </div>
                        </div>

                        <ChevronDown size={18} className={`text-[#5A5A40] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-0 border-t border-[#E6E2D3]/60 space-y-3 text-xs bg-[#FDFBF7]">
                          <p className="leading-relaxed text-[#5A5A40] pt-2">{day.desc}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                            <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D3]">
                              <span className="font-bold text-[#1E293B]">Night Stay:</span> {day.stay}
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D3]">
                              <span className="font-bold text-[#1E293B]">Meals:</span> {day.meals}
                            </div>
                          </div>

                          {day.activities && day.activities.length > 0 && (
                            <div className="pt-2">
                              <div className="font-bold text-[#1E293B] uppercase text-[10px] tracking-wider pb-1">Key Activities:</div>
                              <div className="flex flex-wrap gap-1.5">
                                {day.activities.map((act, idx) => (
                                  <span key={idx} className="px-2.5 py-1 rounded-full bg-[#F5F2ED] text-[#1E293B] text-[10px] font-medium border border-[#E6E2D3]">
                                    • {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WHAT TO WEAR & PACK */}
          {activeTab === 'clothing' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-amber-900 to-[#1E293B] text-white space-y-3 shadow-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <Shirt size={14} />
                  <span>High Altitude Packing Checklist</span>
                </div>
                <h3 className="text-2xl font-serif font-bold">What to Wear & Bring for {dest.title}</h3>
                <p className="text-xs text-amber-100 max-w-xl leading-relaxed">
                  Temperatures above 14,000 ft drop rapidly below freezing at dawn. Following a strict 3-layer clothing protocol prevents hypothermia and ensures a joyful pilgrimage.
                </p>
              </div>

              {/* Categories */}
              {dest.whatToWear.map((cat, idx) => (
                <div key={idx} className="p-6 rounded-[28px] bg-white border border-[#E6E2D3] space-y-4 shadow-2xs">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#1E293B] flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-800" />
                      <span>{cat.category}</span>
                    </h4>
                    <p className="text-xs text-[#5A5A40] pt-1">{cat.description}</p>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((item, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-bold text-[#1E293B]">{item.name}</div>
                          <div className="text-[11px] text-[#5A5A40]">{item.notes}</div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase w-fit ${
                          item.importance === 'Mandatory'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {item.importance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PERMITS */}
          {activeTab === 'permits' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E6E2D3] space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-emerald-100 text-emerald-900">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#1E293B]">
                      {isHimachal ? 'Travel Permits & Regulations Guide' : 'Inner Line Permit (ILP) Guide'}
                    </h3>
                    <p className="text-xs text-[#5A5A40]">
                      {isHimachal
                        ? '100% processed by GoTrek via Himachal Tourism & District Administration'
                        : '100% processed by GoTrek via SDM Office Dharchula / Uttarakhand Tourism'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="font-bold text-[#1E293B] uppercase tracking-wider text-[11px]">Required Official Documents:</div>
                  <div className="space-y-2">
                    {dest.permitDetails.requiredDocs.map((doc, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] flex items-center gap-2 text-[#1E293B]">
                        <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                  <div className="font-bold uppercase tracking-wider text-[10px]">Processing Timeline:</div>
                  <p>{dest.permitDetails.processingDays}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-6 rounded-[28px] bg-white border border-[#E6E2D3] space-y-1">
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Frequently Asked Questions</h3>
                <p className="text-xs text-[#5A5A40]">Specific answers for {dest.title}</p>
              </div>

              <div className="space-y-3">
                {dest.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-[24px] bg-white border border-[#E6E2D3] space-y-2 text-xs shadow-2xs">
                    <h4 className="font-serif font-bold text-sm text-[#1E293B] flex items-center gap-2">
                      <HelpCircle size={16} className="text-amber-800 shrink-0" />
                      <span>{faq.question}</span>
                    </h4>
                    <p className="text-[#5A5A40] leading-relaxed pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hotels' && isAdiKailash && (
            <div className="animate-in fade-in duration-300">
              <Suspense fallback={<div className="h-64 rounded-2xl bg-amber-50/50 animate-pulse" />}>
                <HotelsAccommodationSection />
              </Suspense>
            </div>
          )}
        </div>

        {/* Right Column (Sticky Razorpay Booking Widget) */}
        <div className="space-y-6">
          <div className="sticky top-[120px] p-6 sm:p-8 rounded-[32px] bg-white border border-[#E6E2D3] shadow-lg space-y-6">
            <div className="space-y-2 border-b border-[#E6E2D3] pb-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                  2027 Batch Reservations
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
                  <span>12 Seats Left</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-serif font-bold text-[#1E293B]">
                  ₹{(dest.priceStandard ?? 0).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#5A5A40]">/ pilgrim (Standard)</span>
              </div>
              <div className="text-xs text-[#5A5A40]">
                Premium SUV Option: <span className="font-bold text-amber-900">₹{(dest.pricePremium ?? 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] space-y-2">
                <div className="font-bold text-[#1E293B] flex items-center gap-1.5">
                  <Lock size={12} className="text-amber-800" />
                  <span>Razorpay Gateway Deposit</span>
                </div>
                <p className="text-[11px] text-[#5A5A40]">
                  Pay <strong className="text-[#1E293B]">₹3,000 / seat advance</strong> online now. Balance payable upon {dest.startingPoint ? dest.startingPoint.split('/')[0].trim() : 'trip'} departure briefing.
                </p>
              </div>

              <button
                onClick={() => setIsRazorpayOpen(true)}
                className="w-full py-4 rounded-full bg-[#1E293B] hover:bg-[#5A5A40] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <CreditCard size={16} className="text-amber-300" />
                <span>Pay ₹3,000 Advance via Razorpay</span>
              </button>

              <button
                onClick={() => {
                  const msg = `*Yatra Booking Consultation — GoTrek Travels 2027*%0A%0A*Package:* ${encodeURIComponent(dest.title)}%0A*Standard Rate:* ₹${(dest.priceStandard ?? 0).toLocaleString('en-IN')}%0A*Location:* ${encodeURIComponent(dest.location)}%0A*Duration:* ${encodeURIComponent(dest.duration)}%0A%0A_Hello GoTrek Team, I would like to consult with your team regarding package itinerary, batch dates, inner line permits, and payment options._`;
                  window.open(`https://wa.me/917248285767?text=${msg}`, '_blank');
                }}
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>Consult with Team on WhatsApp</span>
              </button>

              <button
                onClick={async () => {
                  const { generateItineraryPdf } = await import('../utils/pdfGenerator');
                  generateItineraryPdf({
                    title: dest.title,
                    subtitle: dest.subtitle,
                    duration: dest.duration,
                    altitude: dest.altitude,
                    startingPoint: dest.startingPoint,
                    endingPoint: dest.endingPoint,
                    bestSeason: dest.bestMonths,
                    difficulty: dest.difficulty,
                    highlights: dest.highlights,
                    itinerary: dest.itinerary.map((it) => ({
                      day: it.day,
                      title: it.title,
                      description: it.desc,
                      stay: it.stay,
                      altitude: it.altitude,
                      meals: it.meals,
                      activities: it.activities,
                    })),
                    inclusions: dest.inclusions,
                    exclusions: dest.exclusions,
                    permitsRequired: dest.permitDetails.requiredDocs,
                  });
                }}
                className="w-full py-3 rounded-full bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
              >
                <Download size={15} className="text-amber-800" />
                <span>Download Full Itinerary PDF</span>
              </button>

              <button
                onClick={onOpenConsultant}
                className="w-full py-3 rounded-full bg-white border border-[#E6E2D3] hover:bg-[#F5F2ED] text-[#1E293B] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles size={14} className="text-amber-700" />
                <span>Consult AI Yatra Lead</span>
              </button>
            </div>

            <div className="text-[10px] text-[#5A5A40] text-center pt-2 space-y-1">
              <div>📞 24/7 Ground Support: +91 72482 85767</div>
              <div>📍 Head Office: Roadways Workshop Road, Opp. Joshi Bhawan, Chandrabhaga, Pithoragarh, Uttarakhand</div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width All Related Packages Section for Tablet & Large Screen Optimization */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 w-full">
        <RelatedPackagesSection
          currentSlug={dest.slug}
          onSelectDestination={onSelectDestination}
          onSelectPackage={onSelectPackage}
          onOpenInquiry={onOpenInquiry}
        />
      </div>

      {/* Razorpay Checkout Modal loaded strictly on demand */}
      {isRazorpayOpen && (
        <Suspense fallback={null}>
          <RazorpayCheckoutModal
            isOpen={isRazorpayOpen}
            onClose={() => setIsRazorpayOpen(false)}
            destinationTitle={dest.title}
            defaultAmount={5000}
          />
        </Suspense>
      )}
    </motion.div>
  );
};

export default DestinationDetailPage;

