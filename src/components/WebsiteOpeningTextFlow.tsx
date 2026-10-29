import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface WebsiteOpeningTextFlowProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const SILKY_EASE = [0.16, 1, 0.3, 1] as const;

export const WebsiteOpeningTextFlow: React.FC<WebsiteOpeningTextFlowProps> = memo(({
  onComplete,
  forceShow = false
}) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on initial session landing or if forced
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("gotrek_opening_text_flow_seen");
      if (!hasSeen) {
        setIsVisible(true);
        sessionStorage.setItem("gotrek_opening_text_flow_seen", "true");
      }
    } catch {
      setIsVisible(true);
    }
  }, [forceShow]);

  // Auto-dismiss smoothly after the text flow completes (~1.55 seconds total)
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, 1550);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
    window.dispatchEvent(new CustomEvent("opening-text-flow-complete"));
  };

  // Content localized for graceful flow
  const sacredMantra = language === "hi" 
    ? "ॐ नमः शिवाय" 
    : language === "gu" 
    ? "ૐ નમઃ શિવાય" 
    : language === "mr" 
    ? "ॐ नमः शिवाय" 
    : language === "bn" 
    ? "ওঁ নমঃ শিবায়" 
    : "ॐ NAMAH SHIVAYA";

  const brandTagline = language === "hi"
    ? "गोट्रेक पावन हिमालयी यात्रा नेटवर्क"
    : language === "gu"
    ? "ગોટ્રેક પવિત્ર હિમાલયી યાત્રા નેટવર્ક"
    : language === "mr"
    ? "गोट्रेक पावन हिमालयीन यात्रा नेटवर्क"
    : language === "bn"
    ? "গোত্রেক পবিত্র হিমালয় তীর্থ নেটওয়ার্ক"
    : "GOTREK SACRED HIMALAYAN EXPEDITIONS";

  const sacredCircuits = language === "hi"
    ? "आदि कैलाश • ॐ पर्वत • मानसरोवर दर्शन • चार धाम 2027"
    : language === "gu"
    ? "આદિ કૈલાશ • ૐ પર્વત • માનસરોવર દર્શન • ચાર ધામ 2027"
    : language === "mr"
    ? "आदि कैलास • ॐ पर्वत • मानसरोवर दर्शन • चार धाम 2027"
    : language === "bn"
    ? "আদি কৈলাশ • ওঁ পর্বত • মানস সরোবর দর্শন • চার ধাম ২০২৭"
    : "Adi Kailash • Om Parvat • Kailash Mansarovar • Char Dham 2027";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(4px)",
            transition: { duration: 0.55, ease: SILKY_EASE } 
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071120] text-white cursor-pointer select-none overflow-hidden px-4 text-center"
          aria-live="polite"
        >
          {/* Subtle Ambient Cosmic Aurora Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 1.15 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-amber-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-red-950/40 to-transparent"
            />
          </div>

          {/* Central Flowing Text Container */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
            
            {/* 1. Divine Sacred Mantra with Flowing Golden Aura */}
            <motion.div
              initial={{ opacity: 0, y: 22, filter: "blur(10px)", scale: 0.94 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.65, ease: SILKY_EASE }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-serif font-black tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
              <span className="flowing-shimmer-gold font-bold tracking-wider">{sacredMantra}</span>
              <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
            </motion.div>

            {/* 2. Main Brand Title: Fluid Flowing Words Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.68, delay: 0.16, ease: SILKY_EASE }}
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                <span className="block text-white mb-1">
                  {language === "en" ? "GOTREK TRAVELS" : "गोट्रेक ट्रैवल्स"}
                </span>
                <span className="flowing-shimmer-gold block text-xl sm:text-2xl md:text-3xl font-sans font-bold tracking-wide text-amber-200">
                  {brandTagline}
                </span>
              </motion.h1>
            </div>

            {/* 3. Sacred Circuits Flowing Stream */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.62, delay: 0.35, ease: SILKY_EASE }}
              className="text-xs sm:text-sm text-sky-200/90 font-medium tracking-wide leading-relaxed pt-1"
            >
              <p className="border-t border-b border-white/10 py-2 px-3 inline-block">
                {sacredCircuits}
              </p>
            </motion.div>

            {/* 4. Instant Skip / Enter Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wider flex items-center justify-center gap-1.5 pt-2 hover:text-white transition-colors"
            >
              <span>Click anywhere or tap to enter</span>
              <ArrowRight size={12} className="inline" />
            </motion.div>

          </div>

          {/* Bottom Flowing Progress Ribbon */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.55, ease: "linear" }}
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
});

WebsiteOpeningTextFlow.displayName = "WebsiteOpeningTextFlow";
export default WebsiteOpeningTextFlow;
