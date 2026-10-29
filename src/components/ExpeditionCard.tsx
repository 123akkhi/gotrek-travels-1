import React, { memo, useState } from "react";
import { Expedition } from "../types";
import { Clock, MapPin, Mountain, ArrowRight, CheckCircle2, Sparkles, Heart, PhoneCall } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";
import { prefetchComponent } from "../utils/lazyWithRetry";

interface ExpeditionCardProps {
  expedition: Expedition;
  onOpenInquiry: (destination: string) => void;
  onViewDetails?: (slug: string) => void;
}

export const ExpeditionCard = memo(({ expedition, onOpenInquiry, onViewDetails }: ExpeditionCardProps) => {
  const { language, translate } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(expedition.slug);
    } else {
      onOpenInquiry(expedition.title);
    }
  };

  const startingFromText = 
    language === 'hi' ? 'प्रारंभिक शुल्क' :
    language === 'gu' ? 'પ્રારંભિક ભાડું' :
    language === 'mr' ? 'सुरुवातीचे भाडे' :
    language === 'bn' ? 'শুরুর খরচ' : 'Starting from';

  const perYatriText =
    language === 'hi' ? '/ यात्री' :
    language === 'gu' ? '/ યાત્રી' :
    language === 'mr' ? '/ भाविक' :
    language === 'bn' ? '/ যাত্রী' : '/ yatri';

  const exploreText = 
    language === 'hi' ? 'यात्रा विवरण' :
    language === 'gu' ? 'વિગત જુઓ' :
    language === 'mr' ? 'तपशील' :
    language === 'bn' ? 'বিবরণ' : 'Explore';

  const enquireText = 
    language === 'hi' ? 'पूछताछ करें' :
    language === 'gu' ? 'પૂછપરછ' :
    language === 'mr' ? 'चौकशी' :
    language === 'bn' ? 'অনুসন্ধান' : 'Enquire Now';

  const batchOpenText = 
    language === 'hi' ? '2027 बैच चालू' :
    language === 'gu' ? '2027 બેચ શરૂ' :
    language === 'mr' ? '2027 बॅच सुरू' :
    language === 'bn' ? '২০২৭ ব্যাচ খোলা' : '2027 Batch Open';

  const bulletColors = [
    "bg-amber-400",
    "bg-emerald-400",
    "bg-sky-400",
    "bg-purple-400",
  ];

  return (
    <div 
      onMouseEnter={() => prefetchComponent(() => import("./DestinationDetailPage"), "DestinationDetailPage", true)}
      className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#C91D24]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-slate-900/10 relative h-full select-none"
    >
      {/* 1. Image Banner with Blur-Up Strategy */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <div onClick={handleCardClick} className="w-full h-full cursor-pointer">
          <BlurUpImage
            src={expedition.image}
            blurDataURL={getDestinationBlurPlaceholder(expedition.id || expedition.slug)}
            alt={translate(expedition.title)}
            loading="lazy"
            preset="card"
            rootMargin="250px"
            referrerPolicy="no-referrer"
            fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges & Wishlist Heart */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {expedition.badge ? (
              <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs border border-amber-400/40 text-amber-300 font-bold text-[9px] uppercase tracking-wider shadow-xs">
                {translate(expedition.badge)}
              </span>
            ) : null}
            <span className="px-2.5 py-1 rounded-full bg-[#C91D24] text-white font-black text-[9px] uppercase tracking-wider shadow-xs">
              2027
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(prev => !prev);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-red-600 flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer"
            aria-label="Add to wishlist"
          >
            <Heart 
              size={15} 
              className={isSaved ? "fill-red-600 text-red-600 scale-110 transition-transform" : "transition-transform"} 
            />
          </button>
        </div>

        {/* Duration Chip at bottom left of image */}
        <div className="absolute bottom-2.5 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs border border-white/20 text-white font-bold text-[10px] flex items-center gap-1.5 shadow-xs">
            <Clock size={11} className="text-amber-400" />
            <span>{expedition.duration}</span>
          </span>
        </div>
      </div>

      {/* 2. Card Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-2.5">
          {/* Header Title */}
          <h3 
            onClick={handleCardClick}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {translate(expedition.title)}
          </h3>

          {/* Key Inclusions with colored bullets (matching screenshot style) */}
          <div className="space-y-1.5 pt-1">
            {expedition.highlights.slice(0, 3).map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                <span className={`w-2 h-2 rounded-full shrink-0 ${bulletColors[idx % bulletColors.length]}`} />
                <span className="truncate">{translate(h)}</span>
              </div>
            ))}
          </div>

          {/* Route Snippet */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
            <MapPin size={12} className="text-[#C91D24] shrink-0" />
            <span className="truncate font-semibold text-slate-800">
              {translate(expedition.location)}
            </span>
          </div>
        </div>

        {/* 3. Pricing & Two-Action Buttons matching screenshot */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5 mt-auto">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              {startingFromText}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                {expedition.price}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">{perYatriText}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Button 1: Enquire Now - Radiant Golden Amber */}
            <button
              type="button"
              id={`inquire-package-btn-${expedition.slug}`}
              onClick={() => onOpenInquiry(expedition.title)}
              className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-98 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 text-center"
              aria-label={`Enquire about ${expedition.title}`}
            >
              <PhoneCall size={12} className="shrink-0 fill-slate-950 text-slate-950" />
              <span className="truncate">{enquireText}</span>
            </button>

            {/* Button 2: Explore Itinerary - Auspicious Vermilion Red */}
            <button
              type="button"
              id={`view-package-btn-${expedition.slug}`}
              onClick={handleCardClick}
              className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] active:scale-98 text-white font-black text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1 text-center border border-red-300/30"
              aria-label={`Explore itinerary for ${expedition.title}`}
            >
              <span className="truncate">{exploreText}</span>
              <ArrowRight size={12} className="shrink-0 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ExpeditionCard.displayName = "ExpeditionCard";
