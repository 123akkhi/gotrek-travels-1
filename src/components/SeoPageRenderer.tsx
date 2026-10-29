import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Download,
  CreditCard,
  MessageSquare,
  Building2,
  ChevronRight,
  FileText,
  Compass,
  PhoneCall,
  Lock,
  Search,
  Users,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEO_PAGES, SeoPageData } from "../data/seoPagesData";
import { generateItineraryPdf } from "../utils/pdfGenerator";
import { YatraWeatherCard } from "./YatraWeatherCard";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { HotelsAccommodationSection } from "./HotelsAccommodationSection";
import { WhatToWearPage } from "./WhatToWearPage";
import { RelatedPackagesSection } from "./RelatedPackagesSection";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface SeoPageRendererProps {
  slug: string;
  onBackToHome: () => void;
  onSelectSeoPage: (slug: string) => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug: string) => void;
  onOpenRazorpay: (options: { amount: number; title: string; packageType?: string }) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const SeoPageRenderer: React.FC<SeoPageRendererProps> = ({
  slug,
  onBackToHome,
  onSelectSeoPage,
  onSelectDestination,
  onSelectPackage,
  onOpenRazorpay,
  onOpenInquiry,
}) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [b2bForm, setB2bForm] = useState({
    agencyName: "",
    contactPerson: "",
    phone: "",
    city: "",
    estimatedYatris: "10-25 Yatris/Year",
  });
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  if (slug === "packing-list-what-to-wear") {
    return (
      <WhatToWearPage
        onBackToHome={onBackToHome}
        onOpenInquiry={onOpenInquiry}
        onOpenRazorpay={onOpenRazorpay}
      />
    );
  }

  const page = SEO_PAGES.find((p) => p.slug === slug) || SEO_PAGES[0];
  const isAdiKailashPage = page.slug.includes("adi-kailash") || page.slug.includes("hotels-homestays-in-gunji-nabi-dharchula");

  const handleDownloadPdf = () => {
    generateItineraryPdf({
      title: page.h1,
      subtitle: page.subtitle,
      duration: "6 Days / 5 Nights",
      altitude: page.keyFacts[0]?.value || "14,500 ft",
      startingPoint: "Kathgodam / Dharchula",
      bestSeason: "May – October 2027",
      highlights: page.highlights,
      itinerary: [
        { day: 1, title: "Kathgodam to Dharchula", description: "Pickup from Kathgodam station in 4x4 Bolero, drive via Almora & Pithoragarh to Dharchula hotel." },
        { day: 2, title: "Dharchula Medical Check & ILP Verification to Nabi", description: "Health checkup at Dharchula hospital, SDM permit clearance and drive to Nabi village homestay." },
        { day: 3, title: "Nabi to Jolingkong & Adi Kailash Darshan", description: "Early morning drive to Jolingkong, Parvati Sarovar parikrama and Gauri Kund views." },
        { day: 4, title: "Nabi to Om Parvat (Nabhi Dhang) & Ved Vyas Cave", description: "Witness miraculous natural snow OM pattern on Om Parvat and Kali Mata temple." },
        { day: 5, title: "Nabi / Gunji to Dharchula Return", description: "Scenic return drive via Kuti valley border checkposts." },
        { day: 6, title: "Dharchula to Kathgodam Drop", description: "Transfer back to Kathgodam station with lifetime spiritual memories." },
      ],
      inclusions: [
        "4x4 Bolero / Camper vehicle for entire tour",
        "Inner Line Permit filing at SDM Office Dharchula",
        "Rung community homestay accommodation in Nabi/Gunji",
        "All meals (Breakfast, Lunch, Dinner, Evening Tea)",
        "Doctor-certified medical oxygen cylinder in vehicle",
      ],
      exclusions: ["Personal laundry & tip", "Hotels before Kathgodam pickup"],
      permitsRequired: ["Aadhar Card Copy", "Police Verification Certificate", "Doctor Fitness Form"],
    });
  };

  const handleB2bSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setB2bSubmitted(true);
    const msg = `Hello GoTrek B2B Desk! My Agency: ${b2bForm.agencyName}, Contact: ${b2bForm.contactPerson}, Phone: ${b2bForm.phone}, City: ${b2bForm.city}. I want B2B wholesale rates for ${page.title}.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/917248285767?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden">
      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12 relative z-10">
        {/* Main Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#1E293B] via-[#2A3B52] to-[#1E293B] text-white border border-amber-500/30 shadow-xl relative overflow-hidden"
        >
          {/* Floating Back Button */}
          <div className="mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Luminous Om Symbol in Sky */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
            <OmLightSymbol size="hero" glowColor="gold" animated={true} />
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest shadow-sm">
                {page.heroBadge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>SDM Dharchula Approved Page</span>
              </span>
              <span className="text-xs text-slate-300 ml-auto flex items-center gap-1">
                <Clock size={12} />
                <span>{page.readTime}</span>
                <span className="mx-1">•</span>
                <span>{page.updatedDate}</span>
              </span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight tracking-tight"
              >
                {page.h1}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed"
              >
                {page.subtitle}
              </motion.p>
            </div>

            {/* Quick Key Facts Chips */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {page.keyFacts.map((kf, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">{kf.label}</div>
                  <div className="text-xs font-bold text-white">{kf.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10"
            >
              <button
                onClick={() =>
                  onOpenRazorpay({
                    amount: 3000,
                    title: `Advance Deposit — ${page.title}`,
                    packageType: page.title,
                  })
                }
                className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 hover:scale-102"
              >
                <CreditCard size={16} />
                <span>Pay Advance ₹3,000 / Seat</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/30 flex items-center gap-2"
              >
                <Download size={16} className="text-amber-300" />
                <span>Download Itinerary PDF</span>
              </button>

              <button
                onClick={() => onOpenInquiry(`Inquiry about ${page.title}`)}
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ml-auto"
              >
                <MessageSquare size={16} />
                <span>Ask Dharchula Officer</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editorial Article Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Card */}
            <div className="p-7 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <FileText size={16} />
                <span>Comprehensive Overview & Travel Intelligence</span>
              </div>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {page.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Structured Table (If Available) */}
            {page.tableData && (
              <div className="p-6 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-4 overflow-hidden">
                <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                  <Compass size={18} className="text-amber-800" />
                  <span>{page.tableData.title}</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#1E293B] text-white font-bold">
                        {page.tableData.headers.map((h, i) => (
                          <th key={i} className="p-3 border-b border-slate-700">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E2D3]">
                      {page.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-[#FDFBF7]" : "bg-white"}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-800 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Highlights List */}
            <div className="p-7 rounded-[28px] bg-[#F5F2ED] border border-[#E6E2D3] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <Sparkles size={18} className="text-amber-800" />
                <span>Key Expedition Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(page.highlights || []).map((hl, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#E6E2D3] text-xs font-medium text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Weather Section */}
            <YatraWeatherCard slug={page.slug.includes('darma') ? 'darma-valley' : page.slug.includes('kailash') ? 'adi-kailash' : 'adi-kailash'} onOpenInquiry={onOpenInquiry} />

            {/* Step-by-Step Guide (If present) */}
            {page.stepByStepGuide && (
              <div className="p-7 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-amber-800" />
                  <span>Step-by-Step Official Clearance Process</span>
                </h3>
                <div className="space-y-3">
                  {page.stepByStepGuide.map((step, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#1E293B]">{step.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotels & Accommodations Section (Only on Adi Kailash Pages, Excluded on B2B Pages) */}
            {isAdiKailashPage && page.category !== 'B2B Partner' && !page.slug.startsWith('b2b-') && (
              <div className="rounded-[28px] overflow-hidden">
                <HotelsAccommodationSection
                  onOpenInquiry={onOpenInquiry}
                  titleOverride="Hotels & Homestays Directory"
                  subtitleOverride="Compare verified Standard homestays vs. Premium deluxe stays for this yatra route."
                />
              </div>
            )}

            {/* FAQs Accordion */}
            <div className="p-7 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <FileText size={18} className="text-amber-800" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3">
                {page.faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-[#E6E2D3] overflow-hidden">
                    <button
                      onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                      className="w-full text-left p-4 bg-[#F9F7F2] hover:bg-amber-50 text-xs font-bold text-[#1E293B] flex items-center justify-between transition-colors"
                    >
                      <span>Q: {faq.q}</span>
                      <ChevronRight
                        size={16}
                        className={`text-slate-400 transition-transform ${activeFaqIndex === i ? "rotate-90" : ""}`}
                      />
                    </button>
                    {activeFaqIndex === i && (
                      <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-[#E6E2D3]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column: B2B Desk & Quick Booking */}
          <div className="lg:col-span-4 space-y-6">
            {/* B2B Agent Wholesale Desk Box */}
            <div className="p-6 rounded-[28px] bg-[#1E293B] text-white border border-amber-500/30 shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    B2B Travel Partner Portal
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30">
                  Agent Desk Active
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-white text-sm">Are you a Travel Agent or DMC?</h4>
                <p className="text-slate-300 leading-relaxed">
                  Get official GoTrek B2B wholesale rates, white-label 4x4 Bolero banners, and priority SDM Inner Line Permit filing for your client groups.
                </p>
              </div>

              {b2bSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-xs space-y-2">
                  <div className="font-bold text-emerald-300">✓ B2B Inquiry Forwarded!</div>
                  <p>Our Dharchula B2B Desk Manager Captain Devendra will contact your agency shortly on WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-2.5 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Agency / Company Name *"
                    value={b2bForm.agencyName}
                    onChange={(e) => setB2bForm({ ...b2bForm, agencyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Contact Person Name *"
                    value={b2bForm.contactPerson}
                    onChange={(e) => setB2bForm({ ...b2bForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number *"
                    value={b2bForm.phone}
                    onChange={(e) => setB2bForm({ ...b2bForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City / State *"
                    value={b2bForm.city}
                    onChange={(e) => setB2bForm({ ...b2bForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <WhatsAppIcon size={16} className="text-white" />
                    <span>Get B2B Rate Sheet via WhatsApp</span>
                  </button>
                </form>
              )}

              <div className="pt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 border-t border-white/10">
                <Lock size={10} />
                <span>Confidential Agent Tariffs • Direct Dharchula DMC</span>
              </div>
            </div>

            {/* Direct Yatri Seat Deposit Card */}
            <div className="p-6 rounded-[28px] bg-white border border-[#E6E2D3] shadow-xs space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
                <span>May & June 2027 Batches Open</span>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold text-[#1E293B]">₹3,000 / Yatri</div>
                <div className="text-xs text-slate-500">Advance Seat Booking Deposit</div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Reserve your 2027 seats now via Razorpay. Balance amount payable after reaching Dharchula briefing.
              </p>

              <button
                onClick={() =>
                  onOpenRazorpay({
                    amount: 3000,
                    title: `2027 Advance Deposit — ${page.title}`,
                    packageType: page.title,
                  })
                }
                className="w-full py-3.5 rounded-full bg-[#1E293B] hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <CreditCard size={15} className="text-amber-300" />
                <span>Pay ₹3,000 Deposit Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic & Responsive Related Packages & Circuits Grid Section (Full Width for Tablet & Big Screen) */}
      <div className="w-full pt-4">
        <RelatedPackagesSection
          currentSlug={slug}
          onSelectDestination={onSelectDestination}
          onSelectPackage={onSelectPackage}
          onOpenInquiry={onOpenInquiry}
        />
      </div>

      {/* 20+ SEO Dedicated Pages Navigation Hub Grid */}
      <div className="pt-12 border-t border-[#E6E2D3] space-y-6 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest border border-amber-300">
            <Search size={12} className="text-amber-800" />
            <span>Full Directory of 27+ SEO Landing Pages</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1E293B]">
            Explore Other Specialized <span className="italic text-amber-800">Yatra Guides</span>
          </h3>
          <p className="text-xs text-slate-600">
            Select any dedicated landing page below for specialized route maps, permit rules, altitude charts, and B2B agent tariffs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEO_PAGES.map((p) => (
            <button
              key={p.slug}
              onClick={() => {
                onSelectSeoPage(p.slug);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                p.slug === page.slug
                  ? "bg-[#1E293B] text-white border-amber-500 shadow-md"
                  : "bg-white text-slate-800 border-[#E6E2D3] hover:border-amber-400 hover:bg-amber-50/50"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className={p.slug === page.slug ? "text-amber-300" : "text-amber-800"}>
                    {p.category}
                  </span>
                  <span className={p.slug === page.slug ? "text-slate-300" : "text-slate-400"}>
                    {p.readTime}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-tight group-hover:text-amber-900 transition-colors">
                  {p.title}
                </h4>
                <p className={`text-[11px] line-clamp-2 ${p.slug === page.slug ? "text-slate-300" : "text-slate-500"}`}>
                  {p.subtitle}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between text-[10px] font-bold mt-2 border-t border-slate-200/50">
                <span className={p.slug === page.slug ? "text-amber-300" : "text-amber-800"}>Read Page Guide</span>
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
