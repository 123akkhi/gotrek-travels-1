import React, { useState } from 'react';
import { FamousSpot } from '../data/destinationsData';
import {
  MapPin, Mountain, Sparkles, CheckCircle2,
  Compass, ArrowRight, BookOpen, Layers, Bot
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BlurUpImage } from './BlurUpImage';

interface FamousSpotsShowcaseProps {
  spots?: FamousSpot[];
  destinationTitle?: string;
  onOpenConsultant?: () => void;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

export const FamousSpotsShowcase: React.FC<FamousSpotsShowcaseProps> = ({
  spots,
  destinationTitle = "Adi Kailash & Om Parvat Sacred Circuit",
  onOpenConsultant,
  onOpenInquiry,
}) => {
  const { language, translate } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!spots || spots.length === 0) {
    return null;
  }

  const categories = ['All', ...Array.from(new Set(spots.map((s) => s.category)))];

  const filteredSpots = selectedCategory === 'All'
    ? spots
    : spots.filter((s) => s.category === selectedCategory);

  const headerBadge = 
    language === 'hi' ? 'पावन भूगोल एवं पौराणिक स्थल' :
    language === 'gu' ? 'પવિત્ર ભૂગોળ અને પૌરાણિક સ્થળો' :
    language === 'mr' ? 'पावन भूगोल आणि पौराणिक ठिकाणे' :
    language === 'bn' ? 'পবিত্র ভূগোল ও পৌরাণিক স্থান' : 'Sacred Geography & Mythological Landmarks';

  const famousSitesLabel = 
    language === 'hi' ? 'प्रमुख पावन स्थल' :
    language === 'gu' ? 'મુખ્ય પવિત્ર સ્થળો' :
    language === 'mr' ? 'प्रमुख पवित्र ठिकाणे' :
    language === 'bn' ? 'প্রধান পবিত্র স্থান' : 'Famous Sites';

  const filterLabel = 
    language === 'hi' ? 'फ़िल्टर:' :
    language === 'gu' ? 'ફિલ્ટર:' :
    language === 'mr' ? 'फिल्टर:' :
    language === 'bn' ? 'ফিল্টার:' : 'Filter:';

  const allLabel = 
    language === 'hi' ? 'सभी' :
    language === 'gu' ? 'બધા' :
    language === 'mr' ? 'सर्व' :
    language === 'bn' ? 'সব' : 'All';

  const askAiLabel = 
    language === 'hi' ? 'स्थल के बारे में AI से पूछें' :
    language === 'gu' ? 'સ્થળ વિશે AI ને પૂછો' :
    language === 'mr' ? 'ठिकाणाबद्दल AI ला विचारा' :
    language === 'bn' ? 'স্থান সম্পর্কে AI কে জিজ্ঞাসা করুন' : 'Ask AI About Spot';

  const inquireLabel = 
    language === 'hi' ? 'यात्रा परामर्श' :
    language === 'gu' ? 'યાત્રા પૂછપરછ' :
    language === 'mr' ? 'यात्रा चौकशी' :
    language === 'bn' ? 'যাত্রা অনুসন্ধান' : 'Inquire Yatra';

  const spiritualSignificanceLabel = 
    language === 'hi' ? 'आध्यात्मिक महत्व' :
    language === 'gu' ? 'આધ્યાત્મિક મહત્વ' :
    language === 'mr' ? 'आध्यात्मिक महत्त्व' :
    language === 'bn' ? 'আধ্যাত্মিক তাৎপর্য' : 'Spiritual Significance';

  const mythologicalHistoryLabel = 
    language === 'hi' ? 'पौराणिक कथा एवं इतिहास' :
    language === 'gu' ? 'પૌરાણિક કથા અને ઇતિહાસ' :
    language === 'mr' ? 'पौराणिक कथा आणि इतिहास' :
    language === 'bn' ? 'পৌরাণিক কথা ও ইতিহাস' : 'Mythological Lore & History';

  const keySightsLabel = 
    language === 'hi' ? 'प्रमुख दर्शन एवं अनुभव:' :
    language === 'gu' ? 'મુખ્ય દર્શન અને અનુભવો:' :
    language === 'mr' ? 'प्रमुख दर्शन आणि अनुभव:' :
    language === 'bn' ? 'প্রধান দর্শন ও অভিজ্ঞতা:' : 'Key Sights & Experiences:';

  return (
    <div id="famous-spots-section" className="space-y-6">
      {/* Header Container */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#FFFDF9] border border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-[11px] uppercase tracking-widest border border-amber-300">
              <Sparkles size={13} className="text-amber-800" />
              <span>{headerBadge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] flex items-center gap-2">
              <span>{translate(destinationTitle)} - {famousSitesLabel}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A40] max-w-2xl leading-relaxed">
              {language === 'hi' 
                ? 'पवित्र हिमनदी झीलों, प्राकृतिक बर्फ के चमत्कारों और महाभारत कालीन पांडव खेतों जैसे पावन तीर्थ स्थलों का अन्वेषण करें।'
                : language === 'gu'
                ? 'પવિત્ર ગ્લેશિયલ તળાવો, કુદરતી બરફના ચમત્કારો અને મહાભારત યુગના પાંડવ ખેતરો જેવા પાવન તીર્થ સ્થળોનું અન્વેષણ કરો.'
                : language === 'mr'
                ? 'पवित्र हिमनदी तलाव, नैसर्गिक बर्फाचे चमत्कार आणि महाभारत काळातील पांडव शेतांचे दर्शन घ्या.'
                : language === 'bn'
                ? 'পবিত্র হিমবাহ হ্রদ, প্রাকৃতিক তুষার অলৌকিক নিদর্শন এবং মহাভারত যুগের পাণ্ডব ক্ষেত্রসমূহের অন্বেষণ করুন।'
                : 'Explore revered high-altitude pilgrimage landmarks from sacred glacial lakes and natural snow miracles to Mahabharata-era Pandava terraced fields.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300 text-center">
              <div className="text-xl font-bold font-serif text-amber-900">{spots.length}</div>
              <div className="text-[10px] font-semibold uppercase text-[#5A5A40] tracking-wider">{famousSitesLabel}</div>
            </div>
          </div>
        </div>

        {/* Route Progression Ribbon */}
        <div className="p-3.5 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Compass size={13} className="text-amber-800" />
              <span>{language === 'hi' ? 'व्यास व कुटी घाटी पावन ऊंचाई अनुक्रम' : 'Vyas & Kuti Valley Sacred Elevation Progression'}</span>
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              {language === 'hi' ? 'मोटरेबल 4x4 बोलेरो मार्ग' : 'Motorable 4x4 Bolero Route'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-[11px] font-medium text-slate-700 whitespace-nowrap">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3] font-semibold text-[#1E293B]">
              Dharchula (3,000 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3]">
              Chialekh (10,800 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3]">
              Garbyang (10,300 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-bold">
              Gunji & Nabi (10,500 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-bold">
              Bheem Ki Kheti (11,200 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3]">
              Kuti Village (12,300 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200 border border-amber-400 text-amber-950 font-bold">
              Jolingkong / Adi Kailash (14,500 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200 border border-amber-400 text-amber-950 font-bold">
              Nabhidhang / Om Parvat (14,000 ft)
            </span>
            <span className="text-amber-700 font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E6E2D3]">
              Kalapani & Vyas Gufa (11,800 ft)
            </span>
          </div>
        </div>

        {/* Category Filtering Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Layers size={13} /> {filterLabel}
          </span>
          {categories.map((cat) => {
            const count = cat === 'All' ? spots.length : spots.filter((s) => s.category === cat).length;
            const isSelected = selectedCategory === cat;
            const displayCategory = cat === 'All' ? allLabel : translate(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'bg-[#F5F2ED] hover:bg-[#E6E2D3] text-[#5A5A40]'
                }`}
              >
                <span>{displayCategory}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-amber-400 text-slate-900 font-bold' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredSpots.map((spot, idx) => {
          const isFeatured = ['Nabhidhang', 'Gunji', 'Bheem Ki Kheti', 'Jolingkong', 'Parvati Sarovar'].some((kw) =>
            spot.name.includes(kw)
          );

          return (
            <div
              key={idx}
              className={`rounded-[26px] bg-white border transition-all duration-300 shadow-2xs flex flex-col justify-between overflow-hidden group h-full ${
                isFeatured ? 'border-amber-300 ring-1 ring-amber-200/60' : 'border-[#E6E2D3] hover:border-amber-300'
              }`}
            >
              <div>
                {/* Spot Image Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <BlurUpImage
                    src={spot.image}
                    alt={translate(spot.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                    preset="spot"
                    referrerPolicy="no-referrer"
                    fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Badges on Top */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {translate(spot.category)}
                    </span>
                    {spot.altitude && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Mountain size={11} /> {spot.altitude}
                      </span>
                    )}
                  </div>

                  {/* Spot Title inside bottom overlay */}
                  <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5 pointer-events-none">
                    {spot.hindiName && (
                      <div className="text-[11px] font-bold text-amber-300 tracking-wide">
                        {spot.hindiName}
                      </div>
                    )}
                    <h4 className="font-serif font-bold text-base sm:text-lg text-white leading-snug drop-shadow-sm">
                      {translate(spot.name)}
                    </h4>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  {/* Location Info */}
                  {spot.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} className="text-amber-700 shrink-0" />
                      <span>{translate(spot.location)}</span>
                    </div>
                  )}

                  {/* Spiritual Significance Box */}
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border-l-4 border-amber-600 text-xs text-[#1E293B] space-y-1">
                    <div className="font-bold uppercase tracking-wider text-amber-900 text-[10px] flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-700" />
                      <span>{spiritualSignificanceLabel}</span>
                    </div>
                    <p className="italic leading-relaxed">{translate(spot.significance)}</p>
                  </div>

                  {/* Mythological Lore (if present) */}
                  {spot.mythologicalLore && (
                    <div className="p-3.5 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] text-xs text-[#1E293B] space-y-1">
                      <div className="font-bold uppercase tracking-wider text-slate-800 text-[10px] flex items-center gap-1">
                        <BookOpen size={11} className="text-amber-800" />
                        <span>{mythologicalHistoryLabel}</span>
                      </div>
                      <p className="text-[#5A5A40] leading-relaxed text-[11px]">{translate(spot.mythologicalLore)}</p>
                    </div>
                  )}

                  {/* Descriptive Text */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {translate(spot.description)}
                  </p>

                  {/* Key Highlights */}
                  {spot.keyHighlights && spot.keyHighlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="font-bold text-[10px] uppercase tracking-wider text-slate-700">{keySightsLabel}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {spot.keyHighlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#1E293B]">
                            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                            <span className="truncate">{translate(hl)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action CTAs */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                {onOpenConsultant && (
                  <button
                    onClick={onOpenConsultant}
                    className="py-2 px-3 rounded-full bg-[#F5F2ED] hover:bg-[#E6E2D3] text-[#1E293B] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Bot size={13} className="text-amber-800" />
                    <span>{askAiLabel}</span>
                  </button>
                )}

                {onOpenInquiry && (
                  <button
                    onClick={() => onOpenInquiry(destinationTitle)}
                    className="py-2 px-3 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <span>{inquireLabel}</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
