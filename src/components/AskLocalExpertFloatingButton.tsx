import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AskLocalExpertFloatingButtonProps {
  onOpenAiConsultant: () => void;
  className?: string;
}

export const AskLocalExpertFloatingButton: React.FC<AskLocalExpertFloatingButtonProps> = ({
  onOpenAiConsultant,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`hidden sm:flex fixed bottom-6 left-6 z-[990] items-center pointer-events-none ${className}`}
    >
      {/* Clean Compact Floating Button on the Left */}
      <div className="relative pointer-events-auto flex items-center">
        <button
          id="btn-ask-local-expert-icon"
          onClick={onOpenAiConsultant}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-amber-700 hover:bg-amber-800 text-white shadow-md border-2 border-amber-200 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          aria-label="Ask Local Expert (AI Yatra Guide)"
          title="Ask a Local Expert"
        >
          <Sparkles size={20} className="text-amber-100" />
        </button>

        {/* Hover / Context Tooltip (Appears to the right of the button) */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -6, scale: 0.95 }}
              animate={{ opacity: 1, x: 8, scale: 1 }}
              exit={{ opacity: 0, x: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-950/95 text-white text-xs font-semibold shadow-xl border border-amber-500/40 whitespace-nowrap backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-amber-300 font-bold">Ask Local Expert</span>
              <span className="text-slate-300 text-[11px] font-normal border-l border-slate-700 pl-2">
                2027 Permit & Route Help
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
