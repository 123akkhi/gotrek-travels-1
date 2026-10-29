import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Briefcase,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  IndianRupee,
  Send,
  Building2,
  Video,
  TrendingUp,
  Search,
  PenTool,
  Users,
  ChevronRight,
  ShieldCheck,
  FileCheck2
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  icon: React.ElementType;
  tag: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const JOB_OPENINGS: JobPosting[] = [
  {
    id: "video-editor",
    title: "Video Editor & Reel Specialist",
    department: "Media & Content",
    location: "Rishikesh / Dharchula / Remote",
    type: "Full-Time / Contract",
    experience: "1 - 3 Years",
    salary: "₹25,000 - ₹45,000 / month",
    icon: Video,
    tag: "High Priority",
    description: "Create breathtaking cinematic reels, drone edits, pilgrim stories, and high-converting video shorts for Instagram, YouTube, and digital ads showcasing Adi Kailash, Om Parvat, and Himalayan Yatra expeditions.",
    responsibilities: [
      "Edit raw 4K drone footage, GoPro action shots, and pilgrim interviews into engaging 30-90 second reels and YouTube vlogs.",
      "Add engaging typography, sound design, ambient Himalayan chants, color grading, and trend-aware audio.",
      "Collaborate with ground guides and content creators in Dharchula to turn raw mobile uploads into viral content.",
      "Optimize video export settings for multi-platform distribution (IG Reels, YouTube Shorts, Facebook, Ads)."
    ],
    requirements: [
      "Proficiency in Premiere Pro, DaVinci Resolve, or CapCut Pro.",
      "Strong portfolio of travel, outdoor adventure, or culture video reels.",
      "Good sense of pace, rhythm, storytelling, and sound design.",
      "Ability to turn turnaround projects quickly during peak yatra season."
    ]
  },
  {
    id: "bda-sales",
    title: "Business Development Associate (BDA)",
    department: "Sales & Pilgrim Relations",
    location: "Rishikesh / Delhi NCR / Remote",
    type: "Full-Time",
    experience: "1 - 4 Years",
    salary: "₹30,000 - ₹60,000 + Uncapped Commissions",
    icon: TrendingUp,
    tag: "Urgent Hiring",
    description: "Drive group package sales, convert inbound pilgrim inquiries via phone & WhatsApp, build relationships with tour agents, ashrams, and corporate travel desks for 2027 Himalayan Yatra bookings.",
    responsibilities: [
      "Manage incoming inquiries from website forms, WhatsApp leads, and phone calls; guide pilgrims on itinerary, medical fitness, and permit guidelines.",
      "Close bookings for standard, luxury, and customized group batches to Adi Kailash, Om Parvat, and Valley of Flowers.",
      "Tie up with B2B travel operators, corporate HR desks, and regional spiritual groups across Gujarat, Maharashtra, South India, and Delhi NCR.",
      "Maintain lead data, booking deposits, and follow-ups in our internal CRM system."
    ],
    requirements: [
      "Proven sales experience in domestic travel, pilgrimage tourism, or high-value consultation sales.",
      "Excellent spoken & written communication in Hindi & English (Gujarati/Marathi/Telugu is a plus).",
      "Empathy and patience when dealing with senior citizen pilgrims and family coordinators.",
      "Goal-driven mindset with target achievements."
    ]
  },
  {
    id: "marketing-lead",
    title: "Marketing Lead & Growth Strategist",
    department: "Marketing & Acquisition",
    location: "Rishikesh / Hybrid / Delhi NCR",
    type: "Full-Time Lead Role",
    experience: "3 - 6 Years",
    salary: "₹50,000 - ₹90,000 / month + Performance Bonuses",
    icon: Building2,
    tag: "Leadership Role",
    description: "Lead GoTrek's overall marketing engine across performance ads (Meta/Google), email campaigns, influencer tie-ups, offline print collateral, and brand positioning as India's premier Adi Kailash operator.",
    responsibilities: [
      "Formulate and execute multi-channel customer acquisition campaigns to achieve 2,500+ pilgrim bookings per season.",
      "Manage Meta Ads & Google Search/Performance Max budgets, tracking Cost Per Lead (CPL) and Customer Acquisition Cost (CAC).",
      "Lead creative direction for digital ad graphics, brochures, booth displays, and landing page conversion optimizations.",
      "Build partnerships with spiritual influencers, travel vloggers, and regional Yatra communities."
    ],
    requirements: [
      "Proven track record scaling revenue in travel, hospitality, or D2C brands.",
      "Hands-on expertise in Meta Ads Manager, Google Ads, Google Analytics, and lead funnel tracking.",
      "Data-driven mindset paired with strong aesthetic & creative judgment.",
      "Leadership experience managing designers, editors, and ad agencies."
    ]
  },
  {
    id: "content-creator",
    title: "On-Field Content Creator & Vlogger",
    department: "Media & On-Ground Team",
    location: "Dharchula / Vyas Valley / On-Expedition",
    type: "Seasonal / Full-Time",
    experience: "0 - 3 Years",
    salary: "₹25,000 - ₹40,000 / month + Full Accommodation & Travel",
    icon: PenTool,
    tag: "On-Field Role",
    description: "Travel with our expedition batches from Dharchula to Gunji, Jolingkong (Adi Kailash Base), and Om Parvat to capture live pilgrim moments, homestay warmth, Bhotia culture, and mountain landscapes.",
    responsibilities: [
      "Accompany 4x4 convoys to film high-energy daily vlogs, pilgrim testimonials, and behind-the-scenes ground operations.",
      "Host live Q&A sessions on Instagram/YouTube answering questions about altitude, weather, food, and homestays.",
      "Take crisp iPhone/GoPro/DSLR photos of scenic milestones, meals, and cultural evening dance performances.",
      "Coordinate with Pithoragarh HQ team to transfer daily raw assets."
    ],
    requirements: [
      "High physical fitness suited for high-altitude mountain travel (up to 14,000 ft).",
      "Energetic, articulate on camera, and fluent in Hindi (Kumaoni/Garhwali is a great bonus).",
      "Skilled with smartphone photography, GoPro stabilization, and basic video editing.",
      "Passionate about Himalayan heritage, spiritual journeys, and outdoor adventure."
    ]
  },
  {
    id: "seo-specialist",
    title: "SEO Specialist & Content Strategist",
    department: "Digital Marketing",
    location: "Remote / Hybrid",
    type: "Full-Time / Part-Time",
    experience: "2 - 5 Years",
    salary: "₹30,000 - ₹55,000 / month",
    icon: Search,
    tag: "Remote Friendly",
    description: "Dominate search engine results for Adi Kailash Yatra, Om Parvat packages, Inner Line Permits, and Himalayan pilgrimage keywords through technical SEO, content cluster strategy, and high-authority link building.",
    responsibilities: [
      "Perform keyword research to identify high-intent pilgrimage search queries and content gaps.",
      "Write and optimize comprehensive travel guides, FAQs, and location landing pages for search engines and AI search.",
      "Monitor technical site health, Core Web Vitals, schema markup (Tour, FAQ, LocalBusiness), and site speed.",
      "Execute ethical outreach for backlinks from travel magazines, news portals, and Uttarakhand tourism blogs."
    ],
    requirements: [
      "Demonstrated success ranking travel, e-commerce, or local services on Page 1 of Google.",
      "Mastery of Ahrefs, SEMrush, Google Search Console, Screaming Frog, and WordPress/React SEO.",
      "Strong analytical capability to track keyword movements, organic traffic, and inquiry conversions.",
      "Clear, engaging English writing ability."
    ]
  }
];

interface CareersPageProps {
  onBack: () => void;
  onOpenInquiry: (topic?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onBack, onOpenInquiry }) => {
  const [selectedRole, setSelectedRole] = useState<string>("video-editor");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "Video Editor & Reel Specialist",
    experience: "1 - 3 Years",
    portfolioUrl: "",
    about: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeJob = JOB_OPENINGS.find((j) => j.id === selectedRole) || JOB_OPENINGS[0];

  const handleSubmit = async (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          destination: `CAREER APPLICATION: ${formData.role}`,
          travellers: formData.experience,
          notes: `Portfolio/Resume: ${formData.portfolioUrl}\nNote: ${formData.about}`,
        }),
      });
    } catch (err) {
      console.error("Failed recording career lead", err);
    }

    setLoading(false);

    if (viaWhatsApp) {
      const msg = `*Job Application — GoTrek Travels Hiring 2027*%0A%0A*Position:* ${encodeURIComponent(formData.role)}%0A*Name:* ${encodeURIComponent(formData.fullName)}%0A*Mobile:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Experience:* ${encodeURIComponent(formData.experience)}%0A*Portfolio Link:* ${encodeURIComponent(formData.portfolioUrl || "N/A")}%0A%0A*About Candidate:* ${encodeURIComponent(formData.about || "Interested in joining GoTrek team.")}`;
      window.open(`https://wa.me/917248285767?text=${msg}`, "_blank");
    }

    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Himalayan Careers', active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="We are Hiring for 2027"
        badgeType="emerald"
      />

      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12 relative z-10">
        {/* Hero Banner Section */}
        <div className="bg-gradient-to-br from-[#1E293B] via-[#2A384C] to-[#1E293B] rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-amber-500/20">
          {/* Floating Back Button */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Luminous Om Symbol in Sky */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
            <OmLightSymbol size="hero" glowColor="gold" animated={true} />
          </div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Briefcase size={14} className="text-amber-400" />
              <span>We Are Hiring • Season 2027 Expansion</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-light tracking-tight leading-tight">
              Build the Future of <span className="italic text-amber-400">Himalayan Pilgrimage</span> & Adventure
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join GoTrek Travels — Kumaon's premier Adi Kailash & Om Parvat tour operator. We are recruiting passionate Video Editors, Business Development Associates, Marketing Leads, Content Creators, and SEO Specialists for our Rishikesh, Dharchula, Delhi, and Remote teams.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Building2 size={14} className="text-amber-400" />
                <span>Rishikesh, Dharchula & Remote Roles</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <Sparkles size={14} className="text-amber-400" />
                <span>Competitive Compensation + Incentives</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>Fast-Track Interview Process</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Tabs & Job Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Job Openings Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-lg font-serif font-bold text-[#1E293B] px-1 flex items-center justify-between">
              <span>Current Openings ({JOB_OPENINGS.length})</span>
              <span className="text-xs font-normal text-amber-800">Select to view</span>
            </h2>

            <div className="space-y-3">
              {JOB_OPENINGS.map((job) => {
                const Icon = job.icon;
                const isSelected = selectedRole === job.id;

                return (
                  <button
                    key={job.id}
                    onClick={() => {
                      setSelectedRole(job.id);
                      setFormData((prev) => ({ ...prev, role: job.title }));
                    }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "bg-[#1E293B] text-white border-[#1E293B] shadow-md scale-[1.01]"
                        : "bg-white text-slate-800 border-[#E6E2D3] hover:border-amber-400 hover:bg-[#FAF8F3]"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl shrink-0 ${
                        isSelected ? "bg-amber-500 text-slate-950" : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-amber-400/20 text-amber-300" : "bg-slate-100 text-slate-700"
                        }`}>
                          {job.department}
                        </span>
                        <span className="text-[10px] font-bold text-amber-600 truncate">{job.tag}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base truncate">{job.title}</h3>

                      <div className={`flex flex-wrap items-center gap-3 text-[11px] ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                          <IndianRupee size={12} className="shrink-0" />
                          <span>{job.salary}</span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Role Details & Application Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Detailed Role Description */}
            <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#F5F2ED] pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider">
                    {activeJob.department} Role
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock size={13} className="text-amber-800" />
                    <span>Experience: {activeJob.experience}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B]">
                  {activeJob.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <MapPin size={14} className="text-amber-800" />
                    <span>{activeJob.location}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <IndianRupee size={14} />
                    <span>{activeJob.salary}</span>
                  </div>
                  <span>•</span>
                  <div className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px]">
                    {activeJob.type}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Role Summary</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {activeJob.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-3 border-t border-[#F5F2ED] pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requirements & Skills</h3>
                <ul className="space-y-2">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <Sparkles size={14} className="text-amber-700 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Application Form Box */}
            <div id="apply-form" className="bg-[#1E293B] text-white rounded-[28px] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                  <FileCheck2 size={12} className="text-amber-400" />
                  <span>Direct HR Application Desk</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Apply for: <span className="text-amber-400">{activeJob.title}</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Submit your details below or apply directly via WhatsApp to fast-track your interview with GoTrek HR.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-900/60 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white">Application Submitted!</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Thank you for applying for the <strong>{formData.role}</strong> position at GoTrek Travels. Our recruitment lead will review your profile and contact you within 24–48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-amber-400 underline hover:text-amber-300 pt-2"
                  >
                    Submit another application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Relevant Experience
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                      >
                        <option value="Fresher / 0 - 1 Year">Fresher / 0 - 1 Year</option>
                        <option value="1 - 3 Years">1 - 3 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years Senior</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Portfolio / Drive / LinkedIn Link
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://drive.google.com/your-resume-or-portfolio"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Why do you want to join GoTrek Travels?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      placeholder="Briefly tell us about your skills, travel passion, or previous work experience..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* Dual Submit Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Apply via WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <Send size={14} />
                      <span>{loading ? "Submitting..." : "Submit Application Form"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareersPage;
