import React, { memo, useRef, useState, useCallback, useEffect } from "react";
import { SACRED_TEMPLES } from "../data/mockData";
import { MapPin, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Heart, PhoneCall, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";
import { SmoothFlowingText } from "./SmoothFlowingText";

interface SacredTemplesProps {
  onSelectDestination?: (slug: string) => void;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

const TEMPLE_HIGHLIGHTS: Record<string, string[]> = {
  "kainchi-dham": [
    "Neem Karoli Baba Ashram",
    "Evening Hanuman Aarti",
    "Spiritual Silence & Prasad"
  ],
  "chitai-golu-devta": [
    "10,000+ Sacred Brass Bells",
    "God of Divine Justice",
    "Ancient Wish Fulfillment"
  ],
  "jageshwar-dham": [
    "124 Ancient Stone Shrines",
    "8th Jyotirlinga Heritage",
    "Sacred Deodar Cedar Valley"
  ],
  "patal-bhuvaneshwar": [
    "Subterranean Cave Sanctum",
    "33 Crore Deities Enshrined",
    "Adi Shankaracharya Legacy"
  ],
  "haat-kalika": [
    "Maa Mahakali Shaktipeeth",
    "Kumaon Regiment Protector",
    "Akhand Sacred Jyoti"
  ],
  "kasar-devi": [
    "Unique Geomagnetic Belt",
    "Swami Vivekananda Seat",
    "360° Snow Peaks View"
  ],
  "baijnath-temple": [
    "12th C. Katyuri Dynasty",
    "Gomati River Ghat Aarti",
    "Rare Black Stone Idol"
  ],
  "bagnath-temple": [
    "Sarayu-Gomati Confluence",
    "Lord Shiva Manifestation",
    "Himalayan Yatra Gateway"
  ]
};

export const SacredTemples = memo(({ onSelectDestination, onOpenInquiry }: SacredTemplesProps) => {
  const { language, translate } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [savedTemples, setSavedTemples] = useState<Record<string, boolean>>({});

  // Mouse drag support for smooth desktop scrolling
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTemples(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sectionBadge = 
    language === 'hi' ? 'मार्ग में स्थित पावन तीर्थ' :
    language === 'gu' ? 'માર્ગમાં સ્થિત પવિત્ર તીર્થ' :
    language === 'mr' ? 'मार्गातील पावन तीर्थक्षेत्रे' :
    language === 'bn' ? 'যাত্রাপথের পবিত্র তীর্থস্থান' : 'Spiritual En Route Stops';

  const sectionTitle = 
    language === 'hi' ? 'मार्ग में स्थित प्राचीन मंदिर एवं शक्तिपीठ' :
    language === 'gu' ? 'માર્ગમાં સ્થિત પ્રાચીન મંદિરો અને શક્તિપીઠો' :
    language === 'mr' ? 'मार्गातील प्राचीन मंदिरे व शक्तीपीठे' :
    language === 'bn' ? 'যাত্রাপথের প্রাচীন মন্দির ও শক্তিপীঠ' : 'Sacred Shrines & Temples En Route';

  const sectionSubtitle = 
    language === 'hi' 
      ? 'पवित्र व्यास घाटी एवं ॐ पर्वत यात्रा पर जाने से पूर्व कुमाऊं के इन प्राचीन धामों में दर्शन व पूजन करें।' 
      : language === 'gu'
      ? 'પવિત્ર વ્યાસ ઘાટી અને ૐ પર્વત યાત્રા શરૂ કરતાં પહેલાં કુમાઉના આ પવિત્ર ધામોમાં આશીર્વાદ મેળવો.'
      : language === 'mr'
      ? 'पवित्र व्यास खोरे आणि ॐ पर्वत यात्रेला जाण्यापूर्वी कुमाऊंमधील या प्राचीन धाम्यांचे दर्शन घ्या.'
      : language === 'bn'
      ? 'পবিত্র ব্যাস উপত্যকা এবং ওঁ পর্বত যাত্রায় যাওয়ার পূর্বে কুমাউনের প্রাচীন ধামসমূহের পুণ্য দর্শন করুন।'
      : 'Seek divine blessings at ancient Kumaon shrines before ascending into the sacred Vyas Valley & Om Parvat circuit.';

  const guideBadge = 
    language === 'hi' ? 'दर्शन मार्गदर्शिका' :
    language === 'gu' ? 'દર્શન માર્ગદર્શિકા' :
    language === 'mr' ? 'दर्शन मार्गदर्शक' :
    language === 'bn' ? 'দর্শন নির্দেশিকা' : 'Darshan Guide';

  const exploreText = 
    language === 'hi' ? 'मंदिर विवरण' :
    language === 'gu' ? 'વિગત જુઓ' :
    language === 'mr' ? 'तपशील' :
    language === 'bn' ? 'বিবরণ' : 'Explore Temple';

  const enquireText = 
    language === 'hi' ? 'दर्शन पूछताछ' :
    language === 'gu' ? 'પૂછપરછ' :
    language === 'mr' ? 'चौकशी' :
    language === 'bn' ? 'অনুসন্ধান' : 'Enquire Now';

  const darshanIncludedText =
    language === 'hi' ? 'यात्रा में शामिल' :
    language === 'gu' ? 'યાત્રામાં શામેલ' :
    language === 'mr' ? 'यात्रेत समाविष्ट' :
    language === 'bn' ? 'যাত্রায় অন্তর্ভুক্ত' : 'En Route Halt';

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
    setActiveSlide(Math.min(Math.max(currentIdx, 0), SACRED_TEMPLES.length - 1));
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();

    // Re-verify scroll layout after hydration and font/image settling
    const t1 = setTimeout(checkScroll, 100);
    const t2 = setTimeout(checkScroll, 400);

    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const handleScrollStep = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (idx: number) => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    const cardWidth = firstCard ? firstCard.clientWidth + gap : 350;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (slug: string) => {
    if (hasDraggedRef.current) return;
    if (onSelectDestination) {
      onSelectDestination(slug);
    }
  };

  const bulletColors = [
    "bg-amber-400",
    "bg-emerald-400",
    "bg-sky-400",
  ];

  return (
    <section id="temples" className="py-12 sm:py-16 bg-gradient-to-b from-[#F8F5EE] via-[#FFFDF9] to-[#FAF7F0] relative border-t border-amber-100/70 overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-amber-100 border border-red-200 text-[#DC2626] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xs">
            <span className="font-bold text-xs">ॐ</span>
            <span>{sectionBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <span>{sectionTitle.split(' ')[0]} </span>
            <span className="text-[#DC2626]">{sectionTitle.substring(sectionTitle.indexOf(' ') + 1)}</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal">
            <SmoothFlowingText
              text={sectionSubtitle}
              as="span"
              variant="fade-blur"
              delay={0.15}
            />
          </p>
        </motion.div>

        {/* Sliding Carousel Wrapper identical in style to DestinationsSection */}
        <div className="relative group/temples-slider">
          {/* Left Red Nav Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScrollStep('left')}
              className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C91D24] text-white shadow-xl hover:bg-[#a5151c] active:scale-90 flex items-center justify-center transition-all cursor-pointer border-2 border-white"
              aria-label="Previous temple"
            >
              <ChevronLeft size={22} className="-ml-0.5" />
            </button>
          )}

          {/* Right Red Nav Arrow Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScrollStep('right')}
              className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C91D24] text-white shadow-xl hover:bg-[#a5151c] active:scale-90 flex items-center justify-center transition-all cursor-pointer border-2 border-white"
              aria-label="Next temple"
            >
              <ChevronRight size={22} className="-mr-0.5" />
            </button>
          )}

          {/* Horizontal Slider Track */}
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-1 -mx-3 sm:mx-0 px-3 sm:px-0 cursor-grab active:cursor-grabbing"
          >
            {SACRED_TEMPLES.map((temple, idx) => {
              const highlights = TEMPLE_HIGHLIGHTS[temple.slug] || [
                translate(temple.deity),
                "Sacred Himalayan En Route Halt",
                "Spiritual Darshan & Blessings"
              ];
              const isSaved = !!savedTemples[temple.id];

              return (
                <div
                  key={temple.id}
                  className="w-[84vw] sm:w-[330px] md:w-[350px] lg:w-[360px] shrink-0 snap-start flex flex-col"
                >
                  <div 
                    className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#C91D24]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-slate-900/10 relative h-full select-none"
                  >
                    {/* 1. Top Image Banner with BlurUpImage */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <div 
                        onClick={() => handleCardClick(temple.slug)} 
                        className="w-full h-full cursor-pointer"
                      >
                        <BlurUpImage
                          src={temple.image}
                          blurDataURL={getDestinationBlurPlaceholder(temple.slug || temple.id)}
                          alt={translate(temple.name)}
                          loading="lazy"
                          preset="card"
                          rootMargin="250px"
                          referrerPolicy="no-referrer"
                          fallbackSrc="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1280&q=80"
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                      {/* Top Badges & Wishlist Heart */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs border border-amber-400/40 text-amber-300 font-bold text-[9px] uppercase tracking-wider shadow-xs">
                            {guideBadge}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-[#C91D24] text-white font-black text-[9px] uppercase tracking-wider shadow-xs">
                            2027
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(temple.id, e)}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-red-600 flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
                          aria-label="Save temple"
                        >
                          <Heart 
                            size={15} 
                            className={isSaved ? "fill-red-600 text-red-600 scale-110 transition-transform" : "transition-transform"} 
                          />
                        </button>
                      </div>

                      {/* Location Chip at bottom left of image */}
                      <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs border border-white/20 text-white font-bold text-[10px] flex items-center gap-1.5 shadow-xs">
                          <MapPin size={11} className="text-amber-400" />
                          <span>{translate(temple.location)}</span>
                        </span>
                      </div>

                      {/* Om symbol subtle watermark */}
                      <div className="absolute bottom-2 right-3 pointer-events-none opacity-40">
                        <span className="text-white font-bold text-sm">ॐ</span>
                      </div>
                    </div>

                    {/* 2. Card Content Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                      <div className="space-y-2">
                        {/* Deity Sub-tag */}
                        <div className="flex items-center gap-1.5 text-amber-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                          <Sparkles size={12} className="text-amber-500 shrink-0" />
                          <span className="truncate">{translate(temple.deity)}</span>
                        </div>

                        {/* Temple Title */}
                        <h3 
                          onClick={() => handleCardClick(temple.slug)}
                          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors leading-snug cursor-pointer line-clamp-1"
                        >
                          {translate(temple.name)}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-normal">
                          {translate(temple.desc)}
                        </p>
                      </div>

                      {/* Highlight Bullets */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        {highlights.slice(0, 3).map((item, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <span className={`w-1.5 h-1.5 rounded-full ${bulletColors[hIdx % bulletColors.length]} shrink-0`} />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* 3. Footer Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>{darshanIncludedText}</span>
                          </span>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                            Free Darshan
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleCardClick(temple.slug)}
                            className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] active:scale-95 text-white font-black text-xs flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer border border-red-300/30"
                          >
                            <span>{exploreText}</span>
                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5 stroke-[2.5]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onOpenInquiry && onOpenInquiry(temple.name)}
                            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 text-slate-950 font-black text-xs flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                          >
                            <PhoneCall size={12} className="fill-slate-950 text-slate-950" />
                            <span>{enquireText}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Indicator Dots matching DestinationsSection */}
          {SACRED_TEMPLES.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6">
              {SACRED_TEMPLES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === idx
                      ? "w-7 sm:w-9 h-2 bg-[#C91D24]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to temple slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
});

SacredTemples.displayName = "SacredTemples";
