import React, { useState, useEffect, useRef } from "react";
import { X, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface WhatsAppChatWidgetProps {
  phoneNumber?: string;
  dutyOfficerName?: string;
  className?: string;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({
  phoneNumber = "917248285767",
  dutyOfficerName = "GoTrek Yatra Helpdesk (Pithoragarh)",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
    "🇮🇳 Check Inner Line Permit Documents needed for Adi Kailash",
    "🏔️ May & June 2027 Available Batch Dates",
    "🚁 Helicopter Services for Om Parvat / Kedarnath",
    "👨‍👩‍👧‍👦 Custom Family & Senior Citizen Group Booking",
  ];

  // Auto-close on click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSendToWhatsApp = (textToSend?: string) => {
    const finalMsg = textToSend || userMessage || "Hello GoTrek Team, I want to inquire about Adi Kailash & Om Parvat Yatra 2027.";
    const encoded = encodeURIComponent(finalMsg);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={chatContainerRef}
      className={`fixed bottom-20 sm:bottom-24 right-3.5 sm:right-6 z-[990] flex flex-col items-end pointer-events-none pb-safe select-none ${className}`}
    >
      {/* Floating Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-3 w-[330px] sm:w-[360px] max-w-[calc(100vw-28px)] max-h-[calc(100vh-180px)] bg-white border border-[#E6E2D3] rounded-[24px] sm:rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col font-sans select-auto"
          >
            {/* Header Banner */}
            <div className="bg-[#128C7E] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-base border-2 border-white shadow-xs">
                    <WhatsAppIcon size={20} className="text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-300 border-2 border-[#128C7E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-emerald-100 uppercase tracking-widest">
                    <ShieldCheck size={11} />
                    <span>GoTrek Official WhatsApp</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[180px] sm:max-w-none">{dutyOfficerName}</h4>
                  <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-ping" />
                    <span>Online • Instant Response</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="p-3.5 sm:p-4 bg-[#F5F2ED] space-y-3 text-xs overflow-y-auto smooth-scroll-y flex-1">
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#E6E2D3] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-bold text-amber-900">GoTrek Dharchula Desk</span>
                  <span>Just now</span>
                </div>
                <p className="text-slate-800 leading-relaxed text-xs">
                  🙏 <strong>Jai Baba Adi Kailash!</strong> Welcome to GoTrek Official Yatra Helpdesk. How can we assist your pilgrimage today?
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <CheckCircle2 size={12} />
                  <span>SDM Permit & 2027 Departure Desk Active</span>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">Quick Inquiries:</div>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendToWhatsApp(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-[#E6E2D3] hover:border-amber-300 text-[11px] text-slate-800 font-medium transition-all shadow-2xs flex items-center justify-between group cursor-pointer"
                  >
                    <span className="pr-2">{prompt}</span>
                    <Send size={12} className="text-slate-400 group-hover:text-amber-800 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendToWhatsApp();
              }}
              className="p-3 bg-white border-t border-[#E6E2D3] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your question for Dharchula team..."
                className="flex-1 bg-[#FDFBF7] border border-[#E6E2D3] rounded-full px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="h-9 w-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-transform active:scale-90 shadow-md cursor-pointer"
                aria-label="Send message to WhatsApp"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with Tooltip on Hover */}
      <div className="relative pointer-events-auto flex items-center gap-2">
        {/* Hover / Context Tooltip (Appears to the left of the button on hover) */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 6, scale: 0.95 }}
              animate={{ opacity: 1, x: -8, scale: 1 }}
              exit={{ opacity: 0, x: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full bg-slate-950/95 text-white text-xs font-semibold shadow-xl border border-emerald-500/40 whitespace-nowrap backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-bold">Chat on WhatsApp</span>
              <span className="text-slate-300 text-[11px] font-normal border-l border-slate-700 pl-2">
                Instant Helpdesk
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean, Plain & Simple WhatsApp Floating Button */}
        <button
          id="btn-whatsapp-chat-icon"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasOpened(true);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Chat on WhatsApp with GoTrek Team"
          aria-label="Chat on WhatsApp with GoTrek Team"
        >
          <WhatsAppIcon size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

