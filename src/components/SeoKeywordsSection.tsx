import React, { useState } from "react";
import { Search, Sparkles, Compass, ShieldCheck, ChevronRight, FileText, MapPin, ExternalLink, HelpCircle } from "lucide-react";

export const SeoKeywordsSection: React.FC<{
  onOpenInquiry: (topic?: string) => void;
}> = ({ onOpenInquiry }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const TRENDING_KEYWORDS = [
    { tag: "Adi Kailash Yatra Package 2027", query: "Adi Kailash Yatra 2027 Batch Dates & Price" },
    { tag: "Om Parvat Permit Online Dharchula", query: "Inner Line Permit Online Application Dharchula" },
    { tag: "Char Dham Yatra 2027 Registration", query: "Uttarakhand Char Dham Online E-Pass Registration" },
    { tag: "Darma Valley & Panchachuli Base Camp", query: "Panchachuli Base Camp Darma Valley Itinerary" },
    { tag: "Chaudas Valley & Narayan Ashram Tour", query: "Chaudas Valley Narayan Ashram & Rung Culture Guide" },
    { tag: "Vyas Valley & Adi Kailash Circuit", query: "Vyas Valley History Ved Vyas Cave & Route" },
    { tag: "Parvati Sarovar Height & Distance", query: "Parvati Sarovar Lake Trek Guide & Altitude" },
    { tag: "Kathgodam to Dharchula Bolero Taxi", query: "Kathgodam to Dharchula Share Taxi Fare" },
    { tag: "Pithoragarh Helicopter Service Booking", query: "Pithoragarh Naini Saini Airport Helicopter Service" },
    { tag: "KMVN Alternative Private Tour Operator", query: "Best Registered Local Tour Operator Dharchula" },
    { tag: "Jolingkong Homestay Booking Gunji", query: "Jolingkong & Nabi Village Homestay Facilities" },
  ];

  const POPULAR_FAQS = [
    {
      q: "Does GoTrek offer Char Dham Yatra (Kedarnath, Badrinath, Yamunotri, Gangotri)?",
      a: "Yes! GoTrek Travels operates complete 10 to 14-day Char Dham Yatra packages starting from Haridwar/Rishikesh/Delhi with VIP temple passes, helicopter options for Kedarnath, and sanitized deluxe stays. You can also combine Char Dham with our Adi Kailash & Om Parvat circuit.",
    },
    {
      q: "What is special about Darma Valley and Chaudas Valley?",
      a: "Darma Valley is famous for close-up views of the 5 glacier peaks of Panchachuli from Duktu/Dantu villages, while Chaudas Valley is home to the peaceful Narayan Ashram (7,400 ft) and rich Bhotia Rung cultural heritage.",
    },
    {
      q: "How to reach Adi Kailash and Om Parvat from Delhi/Kathgodam?",
      a: "Take a train or Volvo bus from New Delhi to Kathgodam Railway Station. From Kathgodam, GoTrek arranges 4x4 Bolero transport through Almora, Pithoragarh to Dharchula (280 km, ~9 hours). From Dharchula, the Vyas Valley route goes to Gunji and Jolingkong.",
    },
    {
      q: "Is Inner Line Permit mandatory for Vyas Valley, Darma Valley & Om Parvat?",
      a: "Yes. Because these valleys lie along the strategic Indo-Tibet border corridor, an Inner Line Permit (ILP) issued by the Sub-Divisional Magistrate (SDM) office Dharchula and ITBP clearance is legally required for all Indian pilgrims.",
    },
  ];

  const filteredKeywords = TRENDING_KEYWORDS.filter(
    (k) =>
      k.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="seo-topics" className="py-20 bg-white border-t border-[#E6E2D3] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={13} className="text-amber-800" />
            <span>Trending Yatra Search Topics & SEO Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            Everything You Need To Know About <span className="italic text-amber-800">Kumaon Pilgrimages</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Search verified travel guides, permit rules, altitude charts, road conditions, and 2027 batch availability curated by Dharchula ground experts.
          </p>
        </div>

        {/* Live Search Keyword Input */}
        <div className="max-w-2xl mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics: 'Permit rules', 'Helicopter fare', 'May 2027 dates'..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#F5F2ED] border border-[#E6E2D3] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-700 shadow-xs"
          />
        </div>

        {/* Trending Search Chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {filteredKeywords.map((kw, i) => (
            <button
              key={i}
              onClick={() => onOpenInquiry(kw.query)}
              className="px-3.5 py-2 rounded-full bg-[#F9F7F2] hover:bg-amber-100/70 border border-[#E6E2D3] hover:border-amber-400 text-slate-800 text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102"
            >
              <Compass size={13} className="text-amber-800 shrink-0" />
              <span>{kw.tag}</span>
              <ChevronRight size={12} className="text-slate-400 shrink-0" />
            </button>
          ))}
        </div>

        {/* SEO Information & FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {POPULAR_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-3 hover:border-amber-700/40 transition-all shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-amber-300">
                  Q{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] leading-snug">{faq.q}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-11">{faq.a}</p>
              <div className="pl-11 pt-1">
                <button
                  onClick={() => onOpenInquiry(faq.q)}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 underline underline-offset-2"
                >
                  <span>Ask Dharchula Helpdesk for details</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Authority Badge */}
        <div className="p-6 rounded-3xl bg-[#1E293B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Google & AI Search Indexing Guarantee
              </h4>
              <p className="text-xs text-slate-300">
                GoTrek Travels Pithoragarh — UK Tourism Reg #UTTR/PITHORAGARH/04-2026/450066 | MSME UDYAM-UK-09-0011014 | SDM Dharchula Desk
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry("SEO Permit Inquiry")}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-md"
          >
            Apply For 2027 Batch Permit
          </button>
        </div>
      </div>
    </section>
  );
};
