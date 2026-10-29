import React, { useState, useEffect } from "react";
import {
  BlogArticle,
  YatraNewsBulletin,
  getAllBlogArticles,
  getAllNewsBulletins,
  saveCustomBlogArticle,
  saveCustomNewsBulletin,
  deleteCustomBlogArticle,
  deleteCustomNewsBulletin
} from "../data/blogsData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Search,
  Sparkles,
  Tag,
  Compass,
  Newspaper,
  Radio,
  ShieldCheck,
  Share2,
  Check,
  Plus,
  AlertTriangle,
  Flame,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  RefreshCw,
  X,
  Mail,
  Bell,
  CheckCircle2,
  Loader2,
  Send,
  User,
  Info,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface BlogListingPageProps {
  onBackToHome: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({
  onBackToHome,
  onSelectArticle,
  onOpenInquiry
}) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [newsList, setNewsList] = useState<YatraNewsBulletin[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "guides" | "news">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<YatraNewsBulletin | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [shareCopiedId, setShareCopiedId] = useState<string | null>(null);

  // Newsletter state for Blog Listing
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

  // Load data from storage/defaults on mount and sync
  const reloadData = () => {
    setArticles(getAllBlogArticles());
    setNewsList(getAllNewsBulletins());
    try {
      const stored = localStorage.getItem("gotrek_yatra_newsletter_sub");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setNewsletterSuccessData(parsed);
          setNewsletterStatus("success");
        }
      }
    } catch {}
  };

  const toggleNewsletterTopic = (topic: string) => {
    setNewsletterTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterErrorMessage("");

    const cleanEmail = newsletterEmail.trim().toLowerCase();
    const cleanName = newsletterName.trim();

    if (!cleanEmail) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Please enter your email address to subscribe.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(cleanEmail)) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Please enter a valid email format (e.g., pilgrim@gmail.com).");
      return;
    }

    if (cleanEmail.length > 100) {
      setNewsletterStatus("error");
      setNewsletterErrorMessage("Email address cannot exceed 100 characters.");
      return;
    }

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
          source: "GoTrek Blog Listing & Yatra Bulletins"
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
    reloadData();
  }, []);

  const guideCategories = ["All", "Pilgrimage Guide", "Trekking Guide", "Offbeat Himalaya", "Medical & Safety"];
  const newsCategories = ["All", "Breaking Bulletin", "Route & BRO Road Alert", "Govt & SDM Permit Notice", "Weather & Season Advisory", "Batch & Heli Update"];

  // Filter Articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter News
  const filteredNews = newsList.filter((news) => {
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
    const matchesSearch =
      news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (title: string, url: string, id: string) => {
    const shareText = `*GoTrek Yatra Bulletin*: ${title}\n${url || window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyNewsLink = (newsId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/?news=${newsId}`);
    setShareCopiedId(newsId);
    setTimeout(() => setShareCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 font-sans relative overflow-hidden"
    >
      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10 relative z-10">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-start">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-[#E6E2D3] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Top Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xs"
          >
            <Radio size={14} className="text-amber-800 animate-pulse" />
            <span>2027 Himalayan Dispatch & Knowledge Hub</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#1E293B] tracking-tight"
          >
            Yatra Bulletins & <span className="italic font-normal text-amber-800">Travel Handbooks</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#5A5A40] text-sm sm:text-base leading-relaxed italic"
          >
            Daily verified route conditions, SDM Dharchula permit updates, high-altitude medical insights, and in-depth pilgrimage guides curated by our native Kumaoni expedition team.
          </motion.p>
        </motion.div>

        {/* Primary View Switcher & Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E6E2D3] rounded-[28px] p-4 sm:p-6 shadow-sm space-y-4"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  setActiveTab("all");
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Sparkles size={14} />
                <span>All Updates ({articles.length + newsList.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("news");
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "news"
                    ? "bg-amber-900 text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Radio size={14} className={activeTab === "news" ? "animate-pulse text-amber-300" : "text-amber-700"} />
                <span>Live Yatra News ({newsList.length})</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </button>

              <button
                onClick={() => {
                  setActiveTab("guides");
                  setSelectedCategory("All");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "guides"
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <BookOpen size={14} />
                <span>In-Depth Guides ({articles.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search flights, permits, BRO road, AMS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2.5 rounded-full border border-[#E6E2D3] bg-[#FDFBF7] text-[16px] sm:text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-800 w-full transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Category Filters */}
          <div className="pt-2 border-t border-[#E6E2D3] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none touch-pan-x overscroll-x-contain">
              {(activeTab === "news" ? newsCategories : guideCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer shrink-0 min-h-[32px] flex items-center justify-center ${
                    selectedCategory === cat
                      ? "bg-amber-900 text-white border-amber-900 shadow-2xs"
                      : "bg-[#FDFBF7] text-slate-700 border-[#E6E2D3] hover:bg-amber-100/60 active:bg-amber-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-medium text-slate-500">
              Showing{" "}
              <strong className="text-slate-900">
                {activeTab === "all"
                  ? filteredArticles.length + filteredNews.length
                  : activeTab === "news"
                  ? filteredNews.length
                  : filteredArticles.length}
              </strong>{" "}
              publications
            </div>
          </div>
        </motion.div>

        {/* SECTION: LIVE NEWS & BULLETINS */}
        {(activeTab === "all" || activeTab === "news") && filteredNews.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B]">
                  Live Route Alerts & Official Yatra Bulletins
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100/70 border border-amber-300 px-3 py-1 rounded-full">
                Dharchula Operations Center
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <article
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="group bg-white border border-[#E6E2D3] rounded-[24px] p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Top Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          news.urgency === "Urgent Alert"
                            ? "bg-rose-100 text-rose-900 border border-rose-300"
                            : news.urgency === "Official Notice"
                            ? "bg-amber-100 text-amber-950 border border-amber-300"
                            : "bg-emerald-100 text-emerald-950 border border-emerald-300"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span>{news.urgency}</span>
                      </span>

                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        <Clock size={11} className="text-amber-700" />
                        <span>{news.publishedAt}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors leading-snug">
                      {news.headline}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {news.summary}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-4 mt-4 border-t border-[#E6E2D3] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 max-w-[70%]">
                      <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate text-[11px] font-medium">{news.source}</span>
                    </div>

                    <span className="text-amber-900 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: IN-DEPTH TRAVEL GUIDES */}
        {(activeTab === "all" || activeTab === "guides") && filteredArticles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-amber-800" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E293B]">
                  Official Himalayan Guides & Handbooks
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {filteredArticles.length} detailed articles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  onClick={() => onSelectArticle(article.slug)}
                  className="group bg-white border border-[#E6E2D3] rounded-[24px] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  {/* Cover Image & Category Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <BlurUpImage
                      src={article.coverImage}
                      blurDataURL={getDestinationBlurPlaceholder(article.slug || article.category)}
                      alt={article.title}
                      preset="card"
                      loading="lazy"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-amber-950 border border-amber-300 font-bold text-[10px] uppercase tracking-wider shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-[11px] font-medium">
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <Calendar size={12} className="text-amber-400" />
                        <span>{article.publishedAt}</span>
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <Clock size={12} className="text-amber-400" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    {/* Author Info & Read CTA */}
                    <div className="pt-4 border-t border-[#E6E2D3] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="h-8 w-8 rounded-full object-cover border border-amber-300"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {article.author.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {article.author.role}
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
                        <span>Read Guide</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && filteredNews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E6E2D3] p-8 space-y-4 shadow-sm">
            <Sparkles size={36} className="mx-auto text-amber-700" />
            <h3 className="text-lg font-bold text-slate-900">No matching updates found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any articles or bulletins matching "{searchQuery}". Try broader keywords like "Permit", "BRO", "Kedarnath", or "Fitness".
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-2 px-5 py-2.5 rounded-full bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Newsletter Signup Form for Future Yatra Updates & Travel Tips */}
        <section
          id="blog-listing-newsletter-signup"
          aria-labelledby="listing-newsletter-heading"
          className="bg-linear-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] border border-amber-300/70 rounded-[28px] p-6 sm:p-10 shadow-sm relative overflow-hidden mt-12"
        >
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
                    onClick={() => onOpenInquiry && onOpenInquiry("Adi Kailash Yatra 2027")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Plan Your Yatra Now</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubscribe} className="space-y-6">
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

                  <h3 id="listing-newsletter-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] leading-snug">
                    Subscribe for 2027 Yatra Updates & Mountain Advisories
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Receive verified Inner Line Permit window notifications, Border Roads Organisation clearance updates, weather bulletins, and sacred expedition tips directly to your email inbox.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select your advisory preferences:
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
                      className="w-full h-full min-h-[44px] py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
      </div>

      {/* DETAILED NEWS BULLETIN MODAL */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border border-[#E6E2D3] rounded-t-[28px] sm:rounded-[28px] max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#E6E2D3] bg-[#FAF8F5] flex items-center justify-between gap-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2 pr-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedNews.urgency === "Urgent Alert"
                        ? "bg-rose-100 text-rose-900 border border-rose-300"
                        : selectedNews.urgency === "Official Notice"
                        ? "bg-amber-100 text-amber-950 border border-amber-300"
                        : "bg-emerald-100 text-emerald-950 border border-emerald-300"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                    <span>{selectedNews.urgency}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold">
                    {selectedNews.category}
                  </span>

                  <span className="text-[11px] text-slate-500 font-medium">
                    {selectedNews.publishedAt}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="h-9 w-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close bulletin"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4 flex-1">
                {/* News Headline */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E293B] leading-snug">
                    {selectedNews.headline}
                  </h2>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                    {selectedNews.summary}
                  </div>
                </div>

                {/* Detailed Points */}
                {selectedNews.fullDetails && selectedNews.fullDetails.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Official Advisory & Field Details:
                    </h4>
                    <ul className="space-y-2 bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E6E2D3]">
                      {selectedNews.fullDetails.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Source Verification Badge */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">Verified Source: </span>
                      <span>{selectedNews.source}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                    Verified
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 sm:p-5 border-t border-[#E6E2D3] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleShare(selectedNews.headline, window.location.href, selectedNews.id)}
                    className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyNewsLink(selectedNews.id)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Copy Link"
                  >
                    {shareCopiedId === selectedNews.id ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedNews(null);
                    if (onOpenInquiry) {
                      onOpenInquiry("Adi Kailash Yatra 2027");
                    }
                  }}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center"
                >
                  Contact Desk Officer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogListingPage;

