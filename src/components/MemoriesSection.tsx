import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { 
  Camera, 
  MapPin, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export interface MemoryPhotoItem {
  id: string;
  title: string;
  location: string;
  category: "all" | "adi-kailash" | "om-parvat" | "parvati-sarovar" | "chardham";
  thumb: string;
  full: string;
}

export const HOMEPAGE_MEMORIES: MemoryPhotoItem[] = [
  {
    id: "mem-1",
    title: "Adi Kailash Peak at Sunrise",
    location: "Jolingkong, Vyas Valley (14,500 FT)",
    category: "adi-kailash",
    thumb: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-2",
    title: "Sacred Snow 'ॐ' on Om Parvat",
    location: "Nabhidhang (14,000 FT)",
    category: "om-parvat",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-3",
    title: "Crystal Waters of Parvati Sarovar",
    location: "Parvati Sarovar Lake (14,900 FT)",
    category: "parvati-sarovar",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-4",
    title: "Gauri Kund Emerald Glacial Tarn",
    location: "Foot of Adi Kailash (15,200 FT)",
    category: "parvati-sarovar",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-5",
    title: "Holy Mansarovar View from Old Lipulekh",
    location: "Old Lipulekh Pass (18,300 FT)",
    category: "adi-kailash",
    thumb: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-6",
    title: "Nabi Traditional Heritage Village",
    location: "Vyas Valley (10,200 FT)",
    category: "adi-kailash",
    thumb: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-7",
    title: "Kedarnath Temple Snow Peaks",
    location: "Kedarnath Dham (11,755 FT)",
    category: "chardham",
    thumb: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1280&q=85&fm=webp"
  },
  {
    id: "mem-8",
    title: "Gunji Alpine Valley & Confluence",
    location: "Gunji (10,500 FT)",
    category: "adi-kailash",
    thumb: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=640&q=75&fm=webp",
    full: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1280&q=85&fm=webp"
  }
];

interface MemoriesSectionProps {
  onOpenMemoriesPage?: () => void;
}

export const MemoriesSection = memo(({ onOpenMemoriesPage }: MemoriesSectionProps) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = activeCategory === "all"
    ? HOMEPAGE_MEMORIES
    : HOMEPAGE_MEMORIES.filter(p => p.category === activeCategory);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  const scrollSlider = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = 320;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth"
    });
  };

  const titleText = 
    language === 'hi' ? 'यात्रा संस्मरण (फोटोज़)' :
    language === 'gu' ? 'યાત્રા સ્મૃતિઓ (ફોટા)' :
    language === 'mr' ? 'यात्रा आठवणी (छायाचित्रे)' :
    language === 'bn' ? 'যাত্রা স্মৃতি (ফটোগ্রাফি)' : 'Yatra Memories';

  const subtitleText = 
    language === 'hi' ? 'आदि कैलाश, ॐ पर्वत एवं पवित्र हिमालय के वास्तविक तीर्थ चित्र।' :
    language === 'gu' ? 'આદિ કૈલાશ, ૐ પર્વત અને પવિત્ર હિમાલયના વાસ્તવિક યાત્રા ફોટા.' :
    language === 'mr' ? 'आदि कैलास, ॐ पर्वत आणि पवित्र हिमालयाची मूळ तीर्थ छायाचित्रे.' :
    language === 'bn' ? 'আদি কৈলাশ, ওঁ পর্বত এবং পবিত্র হিমালয়ের আসল তীর্থ ছবি।' : 
    'Pure pilgrimage pictures of Adi Kailash, sacred Om Parvat & Himalayan abodes.';

  return (
    <section id="memories" className="py-14 sm:py-18 bg-[#FDFBF7] border-t border-stone-200/90 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C91D24]/10 border border-[#C91D24]/20 text-[#C91D24] text-[11px] font-bold uppercase tracking-wider">
              <Camera size={13} />
              <span>Memories • Pictures Only</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {titleText}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              {subtitleText}
            </p>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Sliding Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider("left")}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label="Previous photos"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label="Next photos"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {onOpenMemoriesPage && (
              <button
                onClick={onOpenMemoriesPage}
                className="px-4 py-2 rounded-full bg-[#C91D24] hover:bg-[#a5151c] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>View All Photos</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          {[
            { id: "all", label: "All Pictures" },
            { id: "adi-kailash", label: "Adi Kailash" },
            { id: "om-parvat", label: "Om Parvat" },
            { id: "parvati-sarovar", label: "Parvati Sarovar" },
            { id: "chardham", label: "Char Dham" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Sliding Track - Pure Pictures Only */}
        <div 
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
              className="w-[72vw] sm:w-[280px] md:w-[320px] shrink-0 snap-start rounded-2xl overflow-hidden bg-slate-900 border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 group cursor-pointer relative aspect-[4/3]"
            >
              <img
                src={photo.thumb}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                width={320}
                height={240}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Scrim Overlay on Hover / Touch */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 text-white pointer-events-none">
                <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                  <MapPin size={11} className="shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {photo.title}
                </h3>
              </div>

              {/* Center Magnify Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                  <ZoomIn size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Picture only + caption) */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X size={20} />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C91D24] text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C91D24] text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Photo */}
            <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
              <img
                src={activePhoto.full}
                alt={activePhoto.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />

              <div className="mt-3 text-center text-white space-y-0.5">
                <h3 className="text-base sm:text-lg font-bold">
                  {activePhoto.title}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-medium">
                  <MapPin size={12} />
                  <span>{activePhoto.location}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono pt-0.5">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </div>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
});

MemoriesSection.displayName = "MemoriesSection";
export default MemoriesSection;
