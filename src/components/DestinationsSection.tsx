import React, { useState, useRef, useCallback, useEffect } from "react";
import { EXPEDITIONS } from "../data/mockData";
import { ExpeditionCard } from "./ExpeditionCard";
import { Compass, Sparkles, Search, X, SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage, Language } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";
import { SmoothFlowingText } from "./SmoothFlowingText";

interface DestinationsSectionProps {
  onOpenInquiry: (destination: string) => void;
  onViewDetails: (slug: string) => void;
  onOpenSearch?: () => void;
}

interface DestinationTile {
  id: string;
  name: Record<Language, string>;
  image: string;
  blurDataURL?: string;
  badge: Record<Language, string>;
  slug: string;
  tag: Record<Language, string>;
}

const DESTINATION_TILES: DestinationTile[] = [
  {
    id: "mansarovar",
    name: {
      en: "Kailash Mansarovar",
      hi: "कैलाश मानसरोवर",
      gu: "કૈલાશ માનસરોવર",
      mr: "कैलास मानसरोवर",
      bn: "কৈলাশ মানস সরোবর"
    },
    image: "/images/destinations/Kailash-Mansarovar.webp",
    badge: {
      en: "Indian Vantage 18,300 FT",
      hi: "भारतीय सीमा 18,300 फीट",
      gu: "ભારતીય સીમા 18,300 ફૂટ",
      mr: "भारतीय सीमा 18,300 फूट",
      bn: "ভারতীয় সীমা ১৮,৩০০ ফুট"
    },
    slug: "kailash-mansarovar",
    tag: {
      en: "No China Visa",
      hi: "वीजा मुक्त",
      gu: "વિઝા મુક્ત",
      mr: "व्हिसा मुक्त",
      bn: "ভিসা মুক্ত"
    }
  },
  {
    id: "adi-kailash",
    name: {
      en: "Adi Kailash",
      hi: "आदि कैलाश",
      gu: "આદિ કૈલાશ",
      mr: "आदि कैलास",
      bn: "আদি কৈলাশ"
    },
    image: "/images/destinations/adi-kailash4.webp",
    badge: {
      en: "Chhota Kailash & Om Parvat",
      hi: "छोटा कैलाश व ॐ पर्वत",
      gu: "છોટા કૈલાશ અને ૐ પર્વત",
      mr: "छोटा कैलास आणि ॐ पर्वत",
      bn: "ছোট কৈলাশ ও ওঁ পর্বত"
    },
    slug: "adi-kailash",
    tag: {
      en: "SDM Cleared",
      hi: "परमिट सुलभ",
      gu: "પરમિટ સુલભ",
      mr: "परमिट सुलभ",
      bn: "পারমিট সহজ"
    }
  },
  {
    id: "chardham",
    name: {
      en: "Char Dham",
      hi: "चार धाम",
      gu: "ચાર ધામ",
      mr: "चार धाम",
      bn: "চার ধাম"
    },
    image: "/images/destinations/char-dham.webp",
    badge: {
      en: "Kedarnath & Badrinath",
      hi: "केदारनाथ व बद्रीनाथ",
      gu: "કેદારનાથ અને બદ્રીનાથ",
      mr: "केदारनाथ आणि बद्रीनाथ",
      bn: "কেদারনাথ ও বদ্রীনাথ"
    },
    slug: "chardham-yatra",
    tag: {
      en: "VIP Darshan",
      hi: "वीआईपी दर्शन",
      gu: "વીઆઈપી દર્શન",
      mr: "व्हीआयपी दर्शन",
      bn: "ভিআইপি দর্শন"
    }
  },
  {
    id: "spiti",
    name: {
      en: "Spiti Valley",
      hi: "स्पीति घाटी",
      gu: "સ્પિતિ ખીણ",
      mr: "स्पिती व्हॅली",
      bn: "স্পিতি ভ্যালি"
    },
    image: "/images/destinations/spiti-valley.webp",
    badge: {
      en: "Chandratal & Key Gompa",
      hi: "चंद्रताल व की गोम्पा",
      gu: "ચંદ્રતાલ અને કી ગોમ્પા",
      mr: "चंद्रताल आणि की गोम्पा",
      bn: "চন্দ্রতাল ও কি গোম্পা"
    },
    slug: "spiti-valley",
    tag: {
      en: "Cold Desert",
      hi: "शीत मरुस्थल",
      gu: "શીત રણ",
      mr: "शीत वाळवंट",
      bn: "শীতল মরুভূমি"
    }
  },
  {
    id: "manali",
    name: {
      en: "Manali & Solang",
      hi: "मनाली व सोलांग",
      gu: "મનાલી અને સોલાંગ",
      mr: "मनाली आणि सोलांग",
      bn: "মানালি ও সোলাং"
    },
    image: "/images/destinations/manali-snowfall.webp",
    badge: {
      en: "Atal Tunnel & Rohtang",
      hi: "अटल टनल व रोहतांग",
      gu: "અટલ ટનલ અને રોહતાંગ",
      mr: "अटल बोगदा आणि रोहतांग",
      bn: "অটল টানেল ও রোহতাং"
    },
    slug: "manali-solang-lahaul",
    tag: {
      en: "Snow & Valley",
      hi: "बर्फबारी स्थल",
      gu: "હિમ વર્ષા",
      mr: "बर्फाळ प्रदेश",
      bn: "তুষারপাত"
    }
  },
  {
    id: "flowers",
    name: {
      en: "Valley of Flowers",
      hi: "फूलों की घाटी",
      gu: "ફૂલોની ખીણ",
      mr: "व्हॅली ऑफ फ्लॉवर्स",
      bn: "ভ্যালি অফ ফ্লাওয়ার্স"
    },
    image: "/images/destinations/valley-of-flowers.webp",
    badge: {
      en: "UNESCO Heritage & Hemkund",
      hi: "हेमकुंड साहिब व प्रकृति",
      gu: "હેમકુંડ સાહિબ અને કુદરત",
      mr: "हेमकुंड साहिब व निसर्ग",
      bn: "হেমকুণ্ড সাহেব ও প্রকৃতি"
    },
    slug: "valley-of-flowers",
    tag: {
      en: "Floral Bloom",
      hi: "दुर्लभ पुष्प",
      gu: "દુર્લભ ફૂલો",
      mr: "दुर्मिळ फुले",
      bn: "দুর্লভ ফুল"
    }
  }
];

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onOpenInquiry,
  onViewDetails,
  onOpenSearch,
}) => {
  const { language, translate } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const langKey = (['en', 'hi', 'gu', 'mr', 'bn'].includes(language) ? language : 'en') as Language;

  const categories = [
    { 
      id: "all", 
      label: language === 'hi' ? "सभी पवित्र यात्राएं" : 
             language === 'gu' ? "બધા પવિત્ર પ્રવાસો" : 
             language === 'mr' ? "सर्व पवित्र यात्रा" : 
             language === 'bn' ? "সমস্ত পবিত্র যাত্রা" : "All Sacred Expeditions" 
    },
    { 
      id: "himachal", 
      label: language === 'hi' ? "हिमाचल प्रदेश ट्रिप्स" : 
             language === 'gu' ? "હિમાચલ પ્રદેશ પ્રવાસો" : 
             language === 'mr' ? "हिमाचल प्रदेश ट्रिप्स" : 
             language === 'bn' ? "হিমাচল প্রদেশ ট্রিপ" : "Himachal Pradesh Trips" 
    },
    { 
      id: "adi-kailash", 
      label: language === 'hi' ? "आदि कैलाश व ॐ पर्वत" : 
             language === 'gu' ? "આદિ કૈલાશ અને ૐ પર્વત" : 
             language === 'mr' ? "आदि कैलास आणि ॐ पर्वत" : 
             language === 'bn' ? "আদি কৈলাশ ও ওঁ পর্বত" : "Adi Kailash & Om Parvat" 
    },
    { 
      id: "char-dham", 
      label: language === 'hi' ? "चार धाम यात्रा" : 
             language === 'gu' ? "ચાર ધામ યાત્રા" : 
             language === 'mr' ? "चार धाम यात्रा" : 
             language === 'bn' ? "চার ধাম যাত্রা" : "Char Dham Yatra" 
    },
    { 
      id: "darma", 
      label: language === 'hi' ? "दारमा व अन्य ट्रेक" : 
             language === 'gu' ? "દારમા અને ખીણ ટ્રેક" : 
             language === 'mr' ? "दारमा आणि व्हॅली ट्रेक" : 
             language === 'bn' ? "দারমা ও ভ্যালি ট্রেক" : "Darma & Valley Treks" 
    },
  ];

  const filteredExpeditions = EXPEDITIONS.filter((exp) => {
    // 1. Category Filter
    let matchesCategory = true;
    if (activeCategory === "himachal") {
      const lower = (exp.title + " " + exp.location + " " + exp.slug).toLowerCase();
      matchesCategory = lower.includes("spiti") || lower.includes("manali") || lower.includes("shimla") || 
             lower.includes("dharamshala") || lower.includes("kasol") || lower.includes("kinnaur") || 
             lower.includes("dalhousie") || lower.includes("bir") || lower.includes("himachal") || lower.includes("jibhi");
    } else if (activeCategory === "adi-kailash") {
      matchesCategory = exp.title.toLowerCase().includes("adi kailash") || exp.title.toLowerCase().includes("om parvat");
    } else if (activeCategory === "char-dham") {
      matchesCategory = exp.title.toLowerCase().includes("char dham") || exp.title.toLowerCase().includes("kedarnath") || exp.title.toLowerCase().includes("badrinath");
    } else if (activeCategory === "darma") {
      matchesCategory = exp.title.toLowerCase().includes("darma") || exp.title.toLowerCase().includes("flower");
    }

    if (!matchesCategory) return false;

    // 2. Search Query Filter (multi-token smooth search)
    if (!searchQuery.trim()) return true;
    const queryTokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const searchableText = (
      exp.title + " " +
      exp.location + " " +
      exp.duration + " " +
      (exp.altitude || "") + " " +
      (exp.badge || "") + " " +
      (exp.difficulty || "") + " " +
      (exp.description || "") + " " +
      (exp.highlights?.join(" ") || "") + " " +
      (exp.slug || "")
    ).toLowerCase();

    return queryTokens.every(token => searchableText.includes(token));
  });

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth + 20 : 350;
    const currentIdx = Math.round(el.scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(currentIdx, 0), filteredExpeditions.length - 1));
  }, [filteredExpeditions.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setActiveSlide(0);
    }
  }, [activeCategory, searchQuery]);

  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth + 20 : 350;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (idx: number) => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth + 20 : 350;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  const circuitsTitle = 
    language === 'hi' ? "पावन तीर्थ परिक्रमा परिपथ 2027" :
    language === 'gu' ? "પવિત્ર તીર્થ પરિક્રમા સર્કિટ 2027" :
    language === 'mr' ? "पावन तीर्थ परिक्रमा सर्किट 2027" :
    language === 'bn' ? "পবিত্র তীর্থ পরিক্রমা সার্কিট ২০২৭" : "Sacred Pilgrimage Circuits 2027";

  const partnerBadge = 
    language === 'hi' ? "सरकारी पंजीकृत एवं केएमवीएन अधिकृत पार्टनर" :
    language === 'gu' ? "સરકારી નોંધાયેલ અને કેએમવીએન અધિકૃત પાર્ટનર" :
    language === 'mr' ? "शासन नोंदणीकृत आणि केएमव्हीएन अधिकृत भागीदार" :
    language === 'bn' ? "সরকারি নিবন্ধিত ও কেএমভিএন অনুমোদিত অংশীদার" : "Verified Govt Registered & KMVN Partner";

  const subHeaderTitle = 
    language === 'hi' ? 'पवित्र तीर्थ यात्राएं 2027' :
    language === 'gu' ? 'પવિત્ર તીર્થ યાત્રાઓ 2027' :
    language === 'mr' ? 'पवित्र तीर्थयात्रा 2027' :
    language === 'bn' ? 'পবিত্র তীর্থযাত্রা ২০২৭' : 'Sacred Pilgrimages 2027';

  const headingStart = 
    language === 'hi' ? 'प्रमुख पावन' :
    language === 'gu' ? 'મુખ્ય પવિત્ર' :
    language === 'mr' ? 'प्रमुख पावन' :
    language === 'bn' ? 'প্রধান পবিত্র' : 'Featured Sacred';

  const headingAccent = 
    language === 'hi' ? 'तीर्थ पैकेज' :
    language === 'gu' ? 'યાત્રા પેકેજ' :
    language === 'mr' ? 'यात्रा पॅकेजेस' :
    language === 'bn' ? 'ভ্রমণ প্যাকেজ' : 'Yatra Packages';

  const subDescription = 
    language === 'hi' 
      ? 'प्रतिदिन का यात्रा विवरण, ऊंचाई मानचित्र, पैकिंग गाइड एवं ऑनलाईन सीट बुकिंग देखने हेतु गंतव्य चुनें।' 
      : language === 'gu'
      ? 'દૈનિક પ્રવાસ વર્ણન, ઊંચાઈ નકશો, પેકિંગ ગાઈડ અને ઓનલાઈન બુકિંગ જોવા માટે સ્થળ પસંદ કરો.'
      : language === 'mr'
      ? 'दैनंदिन प्रवासाचे वर्णन, उंची नकाशा, पॅकिंग मार्गदर्शक आणि ऑनलाइन बुकिंग पाहण्यासाठी गंतव्य निवडा.'
      : language === 'bn'
      ? 'দৈনিক ভ্রমণসূচি, উচ্চতার মানচিত্র, প্যাকিং গাইড এবং অনলাইন সিট বুকিং দেখতে গন্তব্য নির্বাচন করুন।'
      : 'Select a destination to view day-by-day detailed itineraries, altitude maps, packing guides, and online seat bookings.';

  return (
    <section id="categories-grid" className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF7F0] via-[#FFFDF9] to-[#F8F5EE] relative border-t border-amber-100/70 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* 1. Quick Destination Categories (6 Rounded Photo Tiles) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-[#DC2626]" />
              <span>{circuitsTitle}</span>
            </h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100/70 border border-amber-300/60 px-3 py-1 rounded-full hidden sm:inline-block shadow-2xs">
              {partnerBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {DESTINATION_TILES.map((tile, idx) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onViewDetails(tile.slug)}
                className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-stone-200/80 hover:border-amber-400 bg-slate-950 will-change-transform"
              >
                {/* Background Photo with Blur-Up Strategy */}
                <BlurUpImage
                  src={tile.image}
                  blurDataURL={tile.blurDataURL || getDestinationBlurPlaceholder(tile.id)}
                  alt={tile.name[langKey] || tile.name.en}
                  loading="lazy"
                  decoding="async"
                  preset="tile"
                  rootMargin="200px"
                  referrerPolicy="no-referrer"
                  fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-black/95 transition-colors" />

                {/* Top Tag */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white px-2 py-0.5 rounded-full shadow-xs border border-red-300/30">
                    {tile.tag[langKey] || tile.tag.en}
                  </span>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 text-center flex flex-col justify-end">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight drop-shadow-md">
                    {tile.name[langKey] || tile.name.en}
                  </h4>
                  <span className="text-[10px] text-amber-300 font-extrabold truncate mt-0.5">
                    {tile.badge[langKey] || tile.badge.en}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 2. Detailed Expeditions Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 pt-8 border-t border-amber-200/50"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-amber-100 border border-red-200 text-[#DC2626] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xs">
            <Compass size={14} className="text-[#DC2626]" />
            <span>{subHeaderTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            <span>{headingStart} </span>
            <span className="text-[#DC2626]">{headingAccent}</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
            <SmoothFlowingText
              text={subDescription}
              as="span"
              variant="fade-blur"
              delay={0.15}
            />
          </p>
        </motion.div>

        {/* Sliding Filter Tabs & Search Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-md border border-red-500 scale-[1.03]"
                      : "bg-white text-slate-700 border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-2xs"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search Input */}
          <div className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, place, days, or altitude (e.g. Kedarnath, Spiti)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C91D24]/20 focus:border-[#C91D24] shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  title="Clear filter"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-1.5 flex items-center justify-between px-3 text-[11px] text-slate-500">
                <span>Found <strong className="text-slate-900">{filteredExpeditions.length}</strong> matching packages</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#C91D24] hover:underline font-semibold cursor-pointer"
                >
                  Reset filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expedition Cards Grid or Empty State */}
        {filteredExpeditions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search size={28} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              No packages found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Try adjusting your spelling or explore other categories, or use our global search for blogs, permits, and routes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                Clear all filters
              </button>
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span>Open Global Search</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative group/slider">
            {/* Left Circular Red Navigation Arrow matching screenshot */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleScrollStep('left')}
                className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C91D24] text-white shadow-xl hover:bg-[#a5151c] active:scale-90 flex items-center justify-center transition-all cursor-pointer border-2 border-white"
                aria-label="Previous package"
              >
                <ChevronLeft size={22} className="-ml-0.5" />
              </button>
            )}

            {/* Right Circular Red Navigation Arrow matching screenshot */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleScrollStep('right')}
                className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C91D24] text-white shadow-xl hover:bg-[#a5151c] active:scale-90 flex items-center justify-center transition-all cursor-pointer border-2 border-white"
                aria-label="Next package"
              >
                <ChevronRight size={22} className="-mr-0.5" />
              </button>
            )}

            {/* Horizontal Sliding Carousel Track */}
            <div
              ref={sliderRef}
              onScroll={checkScroll}
              className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-1 -mx-3 sm:mx-0 px-3 sm:px-0"
            >
              {filteredExpeditions.map((exp) => (
                <div
                  key={exp.id}
                  className="w-[84vw] sm:w-[330px] md:w-[350px] lg:w-[360px] shrink-0 snap-start flex flex-col"
                >
                  <ExpeditionCard
                    expedition={exp}
                    onOpenInquiry={onOpenInquiry}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Pagination Indicator Dots matching screenshot */}
            {filteredExpeditions.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6">
                {filteredExpeditions.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeSlide === idx
                        ? "w-7 sm:w-9 h-2 bg-[#C91D24]"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
