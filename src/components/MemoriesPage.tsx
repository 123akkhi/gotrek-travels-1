import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ZoomIn,
  MapPin,
  Camera
} from "lucide-react";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface MemoryPicture {
  id: string;
  title: string;
  location: string;
  category: 'all' | 'adi-kailash' | 'om-parvat' | 'parvati-sarovar' | 'chardham' | 'himalayas';
  thumb?: string;
  image: string;
}

const MEMORIES_PICTURES: MemoryPicture[] = [
  {
    id: "mem-1",
    title: "Adi Kailash Peak at Sunrise",
    location: "Jolingkong, Vyas Valley (14,500 FT)",
    category: "adi-kailash",
    thumb: "/images/memories/group-memory-01.webp",
    image: "/images/memories/group-memory-01.webp"
  },
  {
    id: "mem-2",
    title: "Sacred Snow 'ॐ' on Om Parvat",
    location: "Nabhidhang (14,000 FT)",
    category: "om-parvat",
    thumb: "/images/memories/group-memory-02.webp",
    image: "/images/memories/group-memory-02.webp"
  },
  {
    id: "mem-3",
    title: "Crystal Waters of Parvati Sarovar",
    location: "Parvati Sarovar Lake (14,900 FT)",
    category: "parvati-sarovar",
    thumb: "/images/memories/group-memory-03.webp",
    image: "/images/memories/group-memory-03.webp"
  },
  {
    id: "mem-4",
    title: "Gauri Kund Emerald Tarn",
    location: "Foot of Adi Kailash (15,200 FT)",
    category: "parvati-sarovar",
    thumb: "/images/memories/group-memory-04.webp",
    image: "/images/memories/group-memory-04.webp"
  },
  {
    id: "mem-5",
    title: "Kedarnath Temple Snow Peaks",
    location: "Kedarnath Dham (11,755 FT)",
    category: "chardham",
    thumb: "/images/memories/group-memory-05.webp",
    image: "/images/memories/group-memory-05.webp"
  },
  {
    id: "mem-6",
    title: "Nabi Traditional Wooden Village",
    location: "Vyas Valley (10,200 FT)",
    category: "adi-kailash",
    thumb: "/images/memories/group-memory-06.webp",
    image: "/images/memories/group-memory-06.webp"
  },
  {
    id: "mem-7",
    title: "Badrinath Shrine & Neelkanth Peak",
    location: "Badrinath Dham (10,279 FT)",
    category: "chardham",
    thumb: "/images/memories/group-memory-07.webp",
    image: "/images/memories/group-memory-07.webp"
  },
  {
    id: "mem-8",
    title: "Gunji Confluence & Alpine Valley",
    location: "Gunji (10,500 FT)",
    category: "adi-kailash",
    thumb: "/images/memories/group-memory-08.webp",
    image: "/images/memories/group-memory-08.webp"
  },
  {
    id: "mem-9",
    title: "Panchachuli Five Sacred Summits",
    location: "Darma Valley (13,800 FT)",
    category: "himalayas",
    thumb: "/images/memories/group-memory-09.webp",
    image: "/images/memories/group-memory-09.webp"
  },
  {
    id: "mem-10",
    title: "Nabi",
    location: "Adi kailash",
    category: "adi-kailash",
    thumb: "/images/memories/group-memory-10.webp",
    image: "/images/memories/group-memory-10.webp"
  },
  {
    id: "mem-11",
    title: "Holy Mansarovar Darshan from Lipulekh",
    location: "Old Lipulekh Pass (18,300 FT)",
    category: "adi-kailash",
    thumb: "/images/destinations/adi-kailash2.webp",
    image: "/images/destinations/adi-kaliash2.webp"
  },
  {
    id: "mem-12",
    title: "Alpine Wildflowers in Bloom",
    location: "High Himalaya Valley (12,000 FT)",
    category: "himalayas",
    thumb: "/images/destinations/adi-kailash3.webp",
    image: "/images/destinations/adi-kaliash3.webp"
  },
  {
    id: "mem-13",
    title: "Kuti Village Ancient Stone Homes",
    location: "Kuti Valley (12,300 FT)",
    category: "adi-kailash",
    thumb: "/images/destinations/adi-kailash5.webp",
    image: "/images/destinations/adi-kailash5.webp"
  },
  {
    id: "mem-14",
    title: "adi kailash",
    location: "Adi kailash",
    category: "chardham",
    thumb: "/images/destinations/adi-kailash6.webp",
    image: "/images/destinations/adi-kailash6.webp"
  },
  {
    id: "mem-15",
    title: "Jolingkong Camp Under Starry Sky",
    location: "Adi Kailash Base (14,500 FT)",
    category: "adi-kailash",
    thumb: "/images/destinations/adi-kailash4.webp",
    image: "/images/destinations/adi-kailash4.webp"
  },
  {
    id: "mem-16",
    title: "Divine Om Parvat Golden Glow",
    location: "Nabhidhang Sunset (14,000 FT)",
    category: "om-parvat",
    thumb: "/images/destinations/adi-kailash.webp",
    image: "/images/destinations/adi-kailash.webp"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Pictures" },
  { id: "adi-kailash", label: "Adi Kailash" },
  { id: "om-parvat", label: "Om Parvat" },
  { id: "parvati-sarovar", label: "Parvati Sarovar & Gauri Kund" },
  { id: "chardham", label: "Char Dham" },
  { id: "himalayas", label: "Sacred Peaks" }
];

interface MemoriesPageProps {
  onBackToHome: () => void;
  onOpenInquiry?: (destination?: string) => void;
  onSelectPackage?: (slug: string) => void;
  onOpenReelsPage?: () => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = memo(({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Sacred Memories & Photos | GoTrek Travels";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredPictures = activeCategory === "all"
    ? MEMORIES_PICTURES
    : MEMORIES_PICTURES.filter(p => p.category === activeCategory);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPictures.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPictures.length) % filteredPictures.length);
  };

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
  }, [lightboxIndex, filteredPictures.length]);

  const activePhoto = lightboxIndex !== null ? filteredPictures[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-20 select-none">
      
      {/* Top Header Bar */}
      <header className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer border border-stone-200 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform text-[#C91D24]" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Camera size={14} className="text-[#C91D24]" />
            <span>{filteredPictures.length} Photos</span>
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Yatra <span className="text-[#C91D24]">Memories</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Pure pilgrimage pictures of Adi Kailash, sacred Om Parvat & the Himalayan abodes.
        </p>
      </section>

      {/* Minimal Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? "bg-[#C91D24] text-white shadow-sm ring-2 ring-[#C91D24]/20"
                  : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Photo Grid - Pictures Only */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredPictures.map((pic, index) => (
            <motion.div
              key={pic.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: index * 0.02 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200/80"
            >
              <BlurUpImage
                src={pic.thumb || pic.image}
                blurDataURL={getDestinationBlurPlaceholder(pic.id || pic.category)}
                alt={pic.title}
                loading="lazy"
                decoding="async"
                preset="card"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Gradient Scrim on Hover with Picture Title & Location */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mb-0.5">
                  <MapPin size={11} className="shrink-0" />
                  <span className="truncate">{pic.location}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-snug">
                  {pic.title}
                </h3>
              </div>

              {/* Center Magnify Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <ZoomIn size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Simple Fullscreen Lightbox Photo Viewer */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none"
              aria-label="Close photo"
            >
              <X size={22} />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C91D24] text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C91D24] text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>

            {/* Main Picture Frame */}
            <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
              <motion.img
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Caption & Location */}
              <div className="mt-4 text-center text-white space-y-1">
                <h2 className="text-base sm:text-xl font-bold tracking-tight">
                  {activePhoto.title}
                </h2>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-medium">
                  <MapPin size={12} />
                  <span>{activePhoto.location}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  {lightboxIndex + 1} / {filteredPictures.length}
                </div>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
});

MemoriesPage.displayName = "MemoriesPage";
export default MemoriesPage;
