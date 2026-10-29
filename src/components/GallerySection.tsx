import React, { useState, useEffect, memo } from "react";
import { GalleryImage } from "../types";
import { 
  Camera, 
  MapPin, 
  Mountain, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Sparkles, 
  Eye, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Filter, 
  ZoomIn,
  Download,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

export const DESTINATION_GALLERY: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Adi Kailash Peak Reflection",
    destination: "Adi Kailash (Jolingkong)",
    category: "adi-kailash",
    categoryLabel: "Adi Kailash & Om Parvat",
    image: "/images/destinations/adi-kailash1.webp",
    altitude: "14,500 ft",
    location: "Vyas Valley, Pithoragarh",
    caption: "The majestic peak of Chhota Kailash reflected pristine in Parvati Sarovar waters at sunrise.",
    photographer: "Kumaon Alpine Media",
    bestTime: "May – Oct"
  },
  {
    id: "gal-2",
    title: "Natural 'ॐ' Symbol on Om Parvat",
    destination: "Om Parvat (Nabhidhang)",
    category: "om-parvat",
    categoryLabel: "Adi Kailash & Om Parvat",
    image: "/images/destinations/om-parvat.webp",
    altitude: "14,000 ft",
    location: "Nabhidhang View Point",
    caption: "Nature's divine miracle: white snow naturally carving the sacred Devanagari 'ॐ' on black rock face.",
    photographer: "GoTrek Field Unit",
    bestTime: "May – June, Sept – Oct"
  },
  {
    id: "gal-3",
    title: "Kedarnath Temple Under Snow Stars",
    destination: "Kedarnath Dham",
    category: "char-dham",
    categoryLabel: "Char Dham Shrines",
    image: "/images/temples/kedarnath.webp",
    altitude: "11,755 ft",
    location: "Rudraprayag, Garhwal",
    caption: "The 1,000-year-old stone temple of Lord Shiva standing proud in front of Kedarnath peak.",
    photographer: "P. Sharma",
    bestTime: "May – June, Sept – Nov"
  },
  {
    id: "gal-4",
    title: "Turquoise Parvati Sarovar",
    destination: "Parvati Sarovar Lake",
    category: "lakes-and-rivers",
    categoryLabel: "Sacred Lakes & Rivers",
    image: "/images/destinations/parvati-sarovar.webp",
    altitude: "14,900 ft",
    location: "Jolingkong Plateau",
    caption: "Devotees take holy dips in the ice-cold glacial waters of Parvati Sarovar worshipping Devi Parvati.",
    photographer: "Vyas Expeditions",
    bestTime: "June – Sept"
  },
  {
    id: "gal-5",
    title: "Badrinath Temple Colors",
    destination: "Badrinath Dham",
    category: "char-dham",
    categoryLabel: "Char Dham Shrines",
    image: "/images/destinations/badrinath.webp",
    altitude: "10,279 ft",
    location: "Chamoli District",
    caption: "Vibrant facade of Badrinath Temple dedicated to Lord Vishnu, set between Nar & Narayana mountain ranges.",
    photographer: "Garhwal Vikas",
    bestTime: "May – Oct"
  },
  {
    id: "gal-6",
    title: "Alpine Wildflowers Bloom",
    destination: "Valley of Flowers",
    category: "valley-of-flowers",
    categoryLabel: "Valley of Flowers",
    image: "/images/destinations/valley-of-flowers.webp",
    altitude: "12,000 ft",
    location: "UNESCO World Heritage Site",
    caption: "Over 500 varieties of wild Himalayan orchids, poppies, and brahma kamal carpeting the valley in July.",
    photographer: "Botanical Survey Team",
    bestTime: "July – August"
  },
  {
    id: "gal-7",
    title: "Panchachuli Five Peaks",
    destination: "Darma Valley",
    category: "darma-valley",
    categoryLabel: "Darma Valley",
    image: "/images/memories/panchachuli.webp",
    altitude: "13,800 ft",
    location: "Dugtu / Dantu Village",
    caption: "The five legendary snow summits where Pandavas cooked their last meal before heavenly ascension.",
    photographer: "Darma Trekker",
    bestTime: "May – Oct"
  },
  {
    id: "gal-8",
    title: "Gauri Kund Glacial Tarn",
    destination: "Gauri Kund (Adi Kailash)",
    category: "lakes-and-rivers",
    categoryLabel: "Sacred Lakes & Rivers",
    image: "/images/destinations/gaurikund.webp",
    altitude: "15,200 ft",
    location: "Foot of Adi Kailash Peak",
    caption: "Sacred high-altitude tarn revered as Goddess Parvati's bathing pool, surrounded by ancient moraine.",
    photographer: "GoTrek Patrol",
    bestTime: "June – Sept"
  },
  {
    id: "gal-9",
    title: "Gangotri Temple & Bhagirathi River",
    destination: "Gangotri Dham",
    category: "char-dham",
    categoryLabel: "Char Dham Shrines",
    image: "/images/temples/gangotri.webp",
    altitude: "10,200 ft",
    location: "Uttarkashi",
    caption: "White granite shrine where Goddess Ganga descended to earth through Lord Shiva's matted locks.",
    photographer: "Uttarakhand Tourism",
    bestTime: "May – Oct"
  },
  {
    id: "gal-10",
    title: "Nabi Heritage Wooden Village",
    destination: "Nabi Village",
    category: "adi-kailash",
    categoryLabel: "Adi Kailash & Om Parvat",
    image: "/images/destinations/kutti-village.webp",
    altitude: "10,500 ft",
    location: "Vyas Valley",
    caption: "Traditional Rung community wooden homestays offering organic Kumaoni cuisine and warm hospitality.",
    photographer: "Nabi Homestay Co-op",
    bestTime: "May – Nov"
  },
  {
    id: "gal-11",
    title: "Sri Hemkund Sahib Star Gurudwara",
    destination: "Hemkund Sahib",
    category: "valley-of-flowers",
    categoryLabel: "Valley of Flowers",
    image: "/images/memories/hemkund-sahib.webp",
    altitude: "15,200 ft",
    location: "Chamoli District",
    caption: "High altitude glacial lake and star-shaped Sikh shrine where Guru Gobind Singh Ji meditated.",
    photographer: "Sangat Photo Archive",
    bestTime: "June – Oct"
  },
  {
    id: "gal-12",
    title: "Yamunotri Temple & Surya Kund",
    destination: "Yamunotri Dham",
    category: "char-dham",
    categoryLabel: "Char Dham Shrines",
    image: "/images/temples/yamunotri.webp",
    altitude: "10,804 ft",
    location: "Uttarkashi",
    caption: "Thermal hot water springs at Divya Shila where yatris cook rice offerings before worship.",
    photographer: "Garhwal Heritage",
    bestTime: "May – Oct"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Destinations" },
  { id: "adi-kailash", label: "Adi Kailash & Om Parvat" },
  { id: "char-dham", label: "Char Dham Shrines" },
  { id: "valley-of-flowers", label: "Valley of Flowers" },
  { id: "darma-valley", label: "Darma Valley" },
  { id: "lakes-and-rivers", label: "Sacred Lakes & Rivers" },
];

interface GallerySectionProps {
  onOpenInquiry: (destination?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = memo(({ onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [memoryFormSubmitted, setMemoryFormSubmitted] = useState(false);

  const filteredImages = DESTINATION_GALLERY.filter((img) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "adi-kailash") return img.category === "adi-kailash" || img.category === "om-parvat";
    return img.category === activeCategory;
  });

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section id="gallery" className="py-20 bg-[#F5F2ED] relative border-t border-[#E6E2D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xs">
            <Camera size={14} className="text-amber-800 animate-pulse" />
            <span>Official Destination Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            Sacred Shrines <span className="italic text-amber-800">& Himalayan Views</span>
          </h2>
          <p className="text-[#5A5A40] text-sm sm:text-base italic">
            High-definition photographs from our official 2025 ground expeditions across Vyas Valley, Char Dham, and Kumaon sanctuaries.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "text-white shadow-md scale-105"
                    : "text-[#1E293B] bg-white border border-[#E6E2D3] hover:bg-[#FDFBF7]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTabBg"
                    className="absolute inset-0 bg-[#5A5A40] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photo Grid with Stagger & Zoom hover */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-[24px] bg-white border border-[#E6E2D3] overflow-hidden shadow-2xs hover:shadow-xl cursor-pointer transition-all duration-300"
              >
                {/* Image Box */}
                <div className="relative h-64 w-full overflow-hidden bg-[#F5F2ED]">
                  <BlurUpImage
                    src={img.image}
                    blurDataURL={getDestinationBlurPlaceholder(img.destination?.toLowerCase().replace(/\s+/g, '-') || img.id)}
                    alt={img.title}
                    loading="lazy"
                    preset="gallery"
                    fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-[#1E293B]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                  {/* Top Badge: Altitude */}
                  {img.altitude && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Mountain size={12} className="text-amber-400" />
                      <span>{img.altitude}</span>
                    </div>
                  )}

                  {/* Top Badge: Category */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-900/80 backdrop-blur-md border border-amber-400/30 text-amber-200 text-[10px] font-bold">
                    {img.categoryLabel}
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1 text-white">
                    <h3 className="font-serif font-bold text-base leading-tight group-hover:text-amber-300 transition-colors">
                      {img.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-200 font-medium">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-amber-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{img.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-300 font-bold">
                        <Eye size={12} />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Share Memory Banner */}
        <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0">
              <Camera size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1E293B]">Have Photos From Previous Yatras?</h4>
              <p className="text-xs text-slate-600">Share your Adi Kailash or Char Dham photography with our community archive & get featured in 2027 brochure.</p>
            </div>
          </div>

          <button
            onClick={() => setIsMemoryModalOpen(true)}
            className="px-6 py-3 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 shadow-xs hover:scale-105"
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Submit Photo Memory</span>
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#1E293B] border border-slate-700 rounded-[28px] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] crisp-dialog"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/60 hover:bg-amber-900 text-white flex items-center justify-center transition-colors border border-white/20"
              >
                <X size={18} />
              </button>

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/60 hover:bg-amber-900 text-white flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/60 hover:bg-amber-900 text-white flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronRight size={22} />
              </button>

              {/* Image Preview Area */}
              <div className="lg:w-2/3 h-72 sm:h-96 lg:h-auto bg-black flex items-center justify-center relative overflow-hidden">
                <BlurUpImage
                  src={activeImage.image}
                  blurDataURL={getDestinationBlurPlaceholder(activeImage.destination?.toLowerCase().replace(/\s+/g, '-') || activeImage.id)}
                  alt={activeImage.title}
                  preset="detailBanner"
                  priority={true}
                  fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
                  containerClassName="w-full h-full flex items-center justify-center"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Sidebar Info Area */}
              <div className="lg:w-1/3 p-6 sm:p-8 text-white space-y-6 flex flex-col justify-between bg-slate-900/90 overflow-y-auto">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    <Compass size={12} />
                    <span>{activeImage.categoryLabel}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                    {activeImage.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{activeImage.caption}"
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-amber-400 shrink-0" />
                      <span className="font-bold text-white">Location:</span> {activeImage.location}
                    </div>

                    {activeImage.altitude && (
                      <div className="flex items-center gap-2">
                        <Mountain size={14} className="text-amber-400 shrink-0" />
                        <span className="font-bold text-white">Altitude:</span> {activeImage.altitude}
                      </div>
                    )}

                    {activeImage.bestTime && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-amber-400 shrink-0" />
                        <span className="font-bold text-white">Best Season:</span> {activeImage.bestTime}
                      </div>
                    )}

                    {activeImage.photographer && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Camera size={14} className="shrink-0" />
                        <span>Credit: {activeImage.photographer}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setLightboxIndex(null);
                      onOpenInquiry(activeImage.destination);
                    }}
                    className="w-full py-3.5 rounded-full bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Inquire For {activeImage.destination}</span>
                    <Send size={14} />
                  </button>

                  <div className="text-[10px] text-slate-400 text-center">
                    Image {lightboxIndex !== null ? lightboxIndex + 1 : 1} of {filteredImages.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHARE PHOTO MEMORY MODAL */}
      <AnimatePresence>
        {isMemoryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMemoryModalOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-5 crisp-dialog"
            >
              <button
                onClick={() => setIsMemoryModalOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#F5F2ED] text-slate-700 flex items-center justify-center hover:bg-amber-100 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-bold uppercase tracking-wider">
                  <Camera size={12} className="text-amber-800" />
                  <span>Yatra Memory Archive</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1E293B]">Submit Your Yatra Photo</h3>
                <p className="text-xs text-slate-500">Share high quality photos from Adi Kailash, Om Parvat or Char Dham to feature on our official platform.</p>
              </div>

              {memoryFormSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Photo Memory Received!</h4>
                  <p className="text-xs text-slate-600">Our curation team will review and publish your photograph with proper credits.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMemoryFormSubmitted(true);
                    setTimeout(() => {
                      setMemoryFormSubmitted(false);
                      setIsMemoryModalOpen(false);
                    }, 3000);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E6E2D3] text-xs bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Destination / Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parvati Sarovar / Kedarnath"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E6E2D3] text-xs bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Photo Drive / Cloud Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E6E2D3] text-xs bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Caption / Story (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Brief note about when you visited..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E6E2D3] text-xs bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-amber-800"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
                  >
                    Submit Photo Entry
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

GallerySection.displayName = "GallerySection";
