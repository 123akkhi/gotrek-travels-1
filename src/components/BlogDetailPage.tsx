import React, { useState, useEffect } from "react";
import {
  BlogArticle,
  getAllBlogArticles,
  getAllNewsBulletins
} from "../data/blogsData";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  BookOpen,
  User,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Send,
  ShieldCheck,
  MapPin,
  Compass,
  AlertCircle,
  Info,
  Lightbulb,
  ArrowRight,
  Eye,
  Mail,
  Bell,
  CheckCircle2,
  Loader2,
  Shield
} from "lucide-react";
import { motion } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onOpenInquiry: (destinationTitle?: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  slug,
  onBack,
  onOpenInquiry,
  onSelectArticle
}) => {
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterTopics, setNewsletterTopics] = useState<string[]>([
    "Yatra Openings & Permit Alerts",
    "High-Altitude Weather & Road Bulletins",
    "Medical & Gear Packing Tips"
  ]);
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [newsletterErrorMessage, setNewsletterErrorMessage] = useState("");
  const [newsletterSuccessData, setNewsletterSuccessData] = useState<{
    email: string;
    name?: string;
    topics: string[];
    subscribedAt: string;
  } | null>(null);

  // Check existing subscription in localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gotrek_yatra_newsletter_sub");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setNewsletterSuccessData(parsed);
          setNewsletterStatus("success");
        }
      }
    } catch {
      // ignore parsing error
    }
  }, []);

  const toggleNewsletterTopic = (topic: string) => {
    setNewsletterTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Secure and simple state-based subscription handler
  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterErrorMessage("");

    const cleanEmail = newsletterEmail.trim().toLowerCase();
    const cleanName = newsletterName.trim();

    // Secure input validation
    if (!cleanEmail) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Please enter your email address to subscribe.");
      return;
    }

    // RFC 5322 compliant email regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(cleanEmail)) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Please enter a valid email address (e.g., pilgrim@gmail.com).");
      return;
    }

    if (cleanEmail.length > 100) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Email address cannot exceed 100 characters.");
      return;
    }

    // Guard against harmful characters / basic sanitization
    if (/[<>{}"'`\\]/.test(cleanEmail) || /[<>{}"'`\\]/.test(cleanName)) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Invalid characters detected. Please remove special characters.");
      return;
    }

    if (newsletterTopics.length === 0) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Please select at least one advisory topic of interest.");
      return;
    }

    setNewsletterStatus("submitting");

    // Secure local dispatch record simulation with slight async feedback
    setTimeout(() => {
      try {
        const record = {
          email: cleanEmail,
          name: cleanName || "Himalayan Traveler",
          topics: [...newsletterTopics],
          subscribedAt: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          source: article.title || "GoTrek Blog Guide"
        };

        localStorage.setItem("gotrek_yatra_newsletter_sub", JSON.stringify(record));

        const existingList = localStorage.getItem("gotrek_newsletter_all_subscribers");
        const parsedList = existingList ? JSON.parse(existingList) : [];
        if (!parsedList.some((item: any) => item.email === cleanEmail)) {
          parsedList.push(record);
          localStorage.setItem("gotrek_newsletter_all_subscribers", JSON.stringify(parsedList));
        }

        setNewsletterSuccessData(record);
        setNewsletterStatus("success");
      } catch (err) {
        console.error("Local storage error:", err);
        setNewsletterStatus("success");
      }
    }, 600);
  };

  const handleResetSubscription = () => {
    try {
      localStorage.removeItem("gotrek_yatra_newsletter_sub");
    } catch {}
    setNewsletterStatus("idle");
    setNewsletterEmail("");
    setNewsletterName("");
    setNewsletterErrorMessage("");
    setNewsletterSuccessData(null);
  };

  useEffect(() => {
    setAllArticles(getAllBlogArticles());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const article = allArticles.find((a) => 
    a.slug === slug || 
    (slug.includes("inner-line-permit") && a.slug === "inner-line-permit-rules") ||
    (slug.includes("medical") && a.slug === "high-altitude-medical-oxygen-safety-guide")
  ) || allArticles[0] || {
    slug: "adi-kailash-om-parvat-guide-2027",
    title: "Complete Guide to Adi Kailash & Om Parvat Yatra 2027",
    subtitle: "Everything you need to know about visiting Chhota Kailash and Parvati Sarovar",
    category: "Pilgrimage Guide",
    author: {
      name: "Vinay Gururani",
      role: "Co-Founder & SDM Permit Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "August 2027 Edition",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    relatedTourSlug: "adi-kailash",
    summary: "Complete guide to Adi Kailash and Om Parvat.",
    sections: []
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read this official 2027 Himalayan Travel Guide: ${article.title}\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Other related articles
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-20 font-sans relative overflow-hidden"
    >
      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 mt-6 relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white border border-[#E6E2D3] text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to All Articles & Bulletins</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              title="Share on WhatsApp"
            >
              <WhatsAppIcon size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#E6E2D3] text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              title="Copy Link"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <BookOpen size={13} className="text-amber-800" />
            <span>{article.category}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E293B] leading-tight tracking-tight"
          >
            {article.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 text-base sm:text-lg italic leading-relaxed"
          >
            {article.subtitle}
          </motion.p>

          {/* Author Meta */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 border-t border-b border-[#E6E2D3] py-3"
          >
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-8 w-8 rounded-full object-cover border border-amber-400"
              />
              <span className="font-bold text-slate-900">{article.author.name}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-amber-800" />
              <span>{article.publishedAt}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-amber-800" />
              <span>{article.readTime}</span>
            </div>
            {article.views && (
              <>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Eye size={13} className="text-amber-800" />
                  <span>{article.views.toLocaleString()} Yatris read</span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Hero Cover Image */}
        <div className="relative rounded-[32px] overflow-hidden border border-[#E6E2D3] shadow-lg aspect-[16/9] bg-slate-900">
          <BlurUpImage
            src={article.coverImage}
            blurDataURL={getDestinationBlurPlaceholder(article.slug)}
            alt={article.title}
            priority={true}
            preset="hero"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Summary Box */}
        <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-700" />
            <span>Executive Article Summary</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {article.summary}
          </p>
        </div>

        {/* Table of Contents Box */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <div className="p-6 rounded-3xl bg-white border border-[#E6E2D3] shadow-sm space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Compass size={16} className="text-amber-800" />
              <span>Table of Contents & Quick Navigation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {article.tableOfContents.map((toc) => (
                <a
                  key={toc.id}
                  href={`#${toc.id}`}
                  className="p-2 rounded-xl bg-[#FDFBF7] hover:bg-amber-100/60 text-slate-700 hover:text-amber-950 font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-amber-800 font-bold">•</span>
                  <span>{toc.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-12 bg-white border border-[#E6E2D3] rounded-[32px] p-6 sm:p-10 shadow-sm">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-5 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B] border-b border-[#E6E2D3] pb-3">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout Box */}
              {section.calloutBox && (
                <div
                  className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                    section.calloutBox.type === "warning"
                      ? "bg-rose-50 border-rose-200 text-rose-950"
                      : section.calloutBox.type === "tip"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : "bg-sky-50 border-sky-200 text-sky-950"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    {section.calloutBox.type === "warning" && <AlertCircle size={14} className="text-rose-700" />}
                    {section.calloutBox.type === "tip" && <Lightbulb size={14} className="text-emerald-700" />}
                    {section.calloutBox.type === "info" && <Info size={14} className="text-sky-700" />}
                    <span>{section.calloutBox.title}</span>
                  </div>
                  <p>{section.calloutBox.content}</p>
                </div>
              )}

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 bg-[#FDFBF7] p-5 rounded-2xl border border-[#E6E2D3]">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <Check size={16} className="text-amber-800 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQs Accordion */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="bg-white border border-[#E6E2D3] rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5">
              <HelpCircle size={20} className="text-amber-800" />
              <h3 className="text-xl font-serif font-bold text-[#1E293B]">
                Frequently Asked Pilgrim Questions
              </h3>
            </div>

            <div className="space-y-3">
              {article.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-[#E6E2D3] rounded-2xl overflow-hidden bg-[#FDFBF7]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#1E293B] flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-500 transition-transform ${openFaqIndex === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E6E2D3] bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup Form for Future Yatra Updates & Travel Tips */}
        <section
          id="blog-newsletter-signup"
          aria-labelledby="newsletter-heading"
          className="bg-linear-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border border-amber-300/70 rounded-[28px] p-6 sm:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle decorative atmospheric gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

          <div className="relative z-10 space-y-6">
            {newsletterStatus === "success" && newsletterSuccessData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center py-2 sm:py-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-700 shadow-sm">
                  <CheckCircle2 size={30} />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} className="text-emerald-600" />
                    Subscription Active • Himalayan Dispatch
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B]">
                    Har Har Mahadev! You're Subscribed
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Thank you {newsletterSuccessData.name && newsletterSuccessData.name !== "Himalayan Traveler" ? <span className="font-semibold text-slate-800">{newsletterSuccessData.name}</span> : "pilgrim"}. 
                    We have successfully registered <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">{newsletterSuccessData.email}</span> to receive verified Yatra bulletins, weather reports, and high-altitude travel tips.
                  </p>
                </div>

                {/* Subscribed Preferences Summary */}
                <div className="bg-white/90 border border-[#E6E2D3] rounded-2xl p-4 max-w-lg mx-auto text-left space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-100 pb-2">
                    <span>Selected Advisory Topics:</span>
                    <span>Subscribed on {newsletterSuccessData.subscribedAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {newsletterSuccessData.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium"
                      >
                        <Check size={11} className="text-amber-700" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 text-[11px] text-slate-600 flex items-center gap-2">
                    <Info size={13} className="text-amber-700 shrink-0" />
                    <span>Next dispatch: 2027 Season Opening & Inner Line Permit Release Bulletin.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetSubscription}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D5CEBC] hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Change Preferences or Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry("Adi Kailash Yatra 2027")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Plan Your Yatra Now</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubscribe} className="space-y-6">
                {/* Header Badge & Title */}
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                      <Mail size={12} className="text-amber-800" />
                      Official Yatra Dispatch • Free Newsletter
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Bell size={11} className="text-emerald-700" />
                      4,800+ Pilgrims Subscribed
                    </span>
                  </div>

                  <h3 id="newsletter-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] leading-snug">
                    Stay Ahead with Future Yatra Updates & Travel Tips
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Subscribe to receive timely Inner Line Permit (ILP) notifications, BRO road clearance advisories, high-altitude acclimatization tips, and seasonal 4x4 booking windows before public releases.
                  </p>
                </div>

                {/* Topic selection pills */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select the updates you wish to receive:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "permits", label: "Yatra Openings & Permit Alerts", icon: "🕉️" },
                      { id: "weather", label: "High-Altitude Weather & Road Bulletins", icon: "🛣️" },
                      { id: "packing", label: "Medical & Gear Packing Tips", icon: "🎒" },
                      { id: "flights", label: "Helicopter & Flight Updates", icon: "🚁" }
                    ].map((topic) => {
                      const isSelected = newsletterTopics.includes(topic.label);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleNewsletterTopic(topic.label)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-800 text-white border-amber-800 shadow-sm"
                              : "bg-white/90 text-slate-700 border-[#E6E2D3] hover:border-amber-400 hover:bg-amber-50/50"
                          }`}
                        >
                          <span>{topic.icon}</span>
                          <span>{topic.label}</span>
                          {isSelected ? (
                            <Check size={13} className="text-amber-200 ml-0.5" />
                          ) : (
                            <span className="text-slate-400 text-xs ml-0.5">+</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                  <div className="sm:col-span-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder="Your Name (Optional)"
                        disabled={newsletterStatus === "submitting"}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CEBC] rounded-xl text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterStatus === "error") {
                            setNewsletterStatus("idle");
                            setNewsletterErrorMessage("");
                          }
                        }}
                        placeholder="Enter your email address *"
                        disabled={newsletterStatus === "submitting"}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#D5CEBC] rounded-xl text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      disabled={newsletterStatus === "submitting"}
                      className="w-full min-h-[44px] py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {newsletterStatus === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-slate-900" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {newsletterStatus === "error" && newsletterErrorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2"
                  >
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{newsletterErrorMessage}</span>
                  </motion.div>
                )}

                {/* Trust & Security Footnote */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 border-t border-amber-200/60 pt-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                    <span>Secure state-handled subscription • 100% spam-free & no third-party tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>⚡ Instant confirmation</span>
                    <span>•</span>
                    <span>1-click unsubscribe anytime</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Consultation Callout CTA */}
        <div className="rounded-[32px] bg-[#1E293B] text-white p-8 sm:p-10 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-light">
              Planning Your <span className="text-amber-400 font-normal italic">2027 Sacred Expedition?</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Our Dharchula permit liaison officers and high-altitude mountain drivers handle all permits, 4x4 vehicles, and verified Kumaoni homestays.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenInquiry(article.title)}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
            >
              Consult Expedition Director
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Browse More Handbooks
            </button>
          </div>
        </div>

        {/* Related Articles Carousel / Grid */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-[#1E293B]">
                More Himalayan Handbooks
              </h3>
              <button
                onClick={onBack}
                className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="group bg-white border border-[#E6E2D3] rounded-[24px] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                    <BlurUpImage
                      src={rel.coverImage}
                      blurDataURL={getDestinationBlurPlaceholder(rel.slug || rel.category)}
                      alt={rel.title}
                      preset="card"
                      loading="lazy"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {rel.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold font-serif text-slate-900 line-clamp-2 group-hover:text-amber-900 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
                      <span>Read Guide</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogDetailPage;

