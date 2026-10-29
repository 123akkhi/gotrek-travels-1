import React, { useState, memo } from "react";
import { motion, PanInfo } from "motion/react";
import { X, Sparkles, Send, Loader2, Bot, User, CheckCircle2, ShieldCheck } from "lucide-react";

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConsultantModal = memo(({ isOpen, onClose }: AiConsultantModalProps) => {
  const [prompt, setPrompt] = useState("");
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hari Om! I am your GoTrek AI Yatra & Inner Line Permit Consultant. Ask me about medical fitness certificates, Aadhar permit rules, high-altitude gear checklist, or road conditions for Adi Kailash & Om Parvat 2027.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const diff = e.changedTouches[0].clientY - touchStartY;
      if (diff > 80) {
        onClose();
      }
      setTouchStartY(null);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userText = prompt.trim();
    setPrompt("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: `Notice: ${data.error || "Unable to consult AI right now. Inner Line Permits require Aadhar + Police Verification + Doctor Medical Certificate."}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Notice: Unable to reach AI server. You can contact GoTrek Travels team directly via WhatsApp for permit queries." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What medical fitness certificate is required for ITBP?",
    "How does GoTrek get my Inner Line Permit (ILP)?",
    "What high-altitude clothes should I pack for Jolingkong?",
    "Can senior citizens do the Adi Kailash Yatra?",
  ];

  return (
    <div 
      className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl my-auto bg-white border border-[#E6E2D3] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh] crisp-dialog"
      >
        {/* Modal Header */}
        <div 
          className="p-4 sm:p-5 border-b border-[#E6E2D3] bg-[#F5F2ED] flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900">
              <Sparkles size={18} className="animate-pulse text-amber-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B]">AI Yatra & Permit Assistant</h3>
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                Powered by Gemini API · Official GoTrek Knowledge Base
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#E6E2D3] text-[#1E293B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto smooth-scroll-y space-y-4 text-xs bg-[#FDFBF7]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="p-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 shrink-0 mt-0.5">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.sender === "user"
                    ? "bg-[#5A5A40] text-white font-medium rounded-tr-none shadow-xs"
                    : "bg-white border border-[#E6E2D3] text-[#1E293B] rounded-tl-none shadow-xs"
                }`}
              >
                {m.text}
              </div>

              {m.sender === "user" && (
                <div className="p-1.5 rounded-full bg-[#1E293B] text-white shrink-0 mt-0.5">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold p-3 bg-amber-50 rounded-2xl border border-amber-200 w-fit">
              <Loader2 size={16} className="animate-spin text-amber-700" />
              <span>Consulting Yatra & Permit AI database...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2.5 bg-[#F5F2ED] border-t border-[#E6E2D3] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(q);
              }}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#FDFBF7] text-[#1E293B] text-[10px] font-bold shrink-0 border border-[#E6E2D3] shadow-2xs cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E6E2D3] flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about Inner Line Permit, medical fitness, clothing, or routes..."
            className="flex-1 bg-[#FDFBF7] border border-[#E6E2D3] rounded-full px-4 py-2.5 text-xs text-[#1E293B] placeholder-[#5A5A40]/60 focus:border-[#5A5A40] outline-none"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-4 py-2.5 rounded-full bg-[#1E293B] hover:bg-[#5A5A40] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Send size={14} />
            <span className="hidden xs:inline">Ask AI</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
});

AiConsultantModal.displayName = "AiConsultantModal";

export default AiConsultantModal;
