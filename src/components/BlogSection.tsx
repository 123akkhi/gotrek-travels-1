import React, { useState, useEffect, memo } from "react";
import {
  BlogArticle,
  YatraNewsBulletin,
  getAllBlogArticles,
  getAllNewsBulletins
} from "../data/blogsData";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Tag,
  Compass,
  Calendar,
  Radio,
  ShieldCheck,
  Flame,
  ChevronRight
} from "lucide-react";

interface BlogSectionProps {
  onSelectArticle: (slug: string) => void;
  onOpenAllBlogs?: () => void;
}

export const BlogSection = memo(({ onSelectArticle, onOpenAllBlogs }: BlogSectionProps) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [newsList, setNewsList] = useState<YatraNewsBulletin[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sectionTab, setSectionTab] = useState<"guides" | "news">("guides");

  useEffect(() => {
    setArticles(getAllBlogArticles());
    setNewsList(getAllNewsBulletins());
  }, []);

  const categories = ["All", "Pilgrimage Guide", "Trekking Guide", "Offbeat Himalaya", "Medical & Safety"];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const latestNews = newsList[0];

  return (
    <section id="blogs" className="py-20 bg-[#F5F2ED] relative border-t border-[#E6E2D3] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Live News Alert Banner */}
        {latestNews && (
          <div
            onClick={() => {
              if (onOpenAllBlogs) onOpenAllBlogs();
            }}
            className="group cursor-pointer rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white p-3.5 sm:p-4 border border-amber-500/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider shrink-0">
                <Radio size={12} className="animate-pulse text-rose-400" />
                <span>Live Bulletin</span>
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-100 line-clamp-1 group-hover:text-amber-200 transition-colors">
                <strong className="text-amber-300">{latestNews.category}:</strong> {latestNews.headline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 shrink-0 self-end sm:self-auto group-hover:translate-x-1 transition-transform">
              <span>View Yatra Dispatch</span>
              <ChevronRight size={14} />
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6E2D3] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold uppercase tracking-[0.2em]">
              <BookOpen size={14} className="text-amber-800" />
              <span>Official 2027 Himalayan Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
              Yatra Insights & <span className="italic text-amber-800 font-normal">Travel Handbooks</span>
            </h2>
            <p className="text-[#5A5A40] text-sm sm:text-base italic">
              Verified articles on SDM Dharchula permits, BRO road status, high-altitude preparation, and sacred pilgrimage traditions authored by our field team.
            </p>
          </div>

          {/* Tab & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-[#E6E2D3]">
              <button
                onClick={() => setSectionTab("guides")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  sectionTab === "guides"
                    ? "bg-[#1E293B] text-white shadow-2xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                Guides ({articles.length})
              </button>
              <button
                onClick={() => setSectionTab("news")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  sectionTab === "news"
                    ? "bg-amber-900 text-white shadow-2xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                Live News ({newsList.length})
              </button>
            </div>

            <div className="relative shrink-0">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search flights, permits, route, AMS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full border border-[#E6E2D3] bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-800 w-full sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills (when guides selected) */}
        {sectionTab === "guides" && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1E293B] text-white border-[#1E293B] shadow-2xs"
                    : "bg-white text-slate-700 border-[#E6E2D3] hover:bg-amber-100/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* SECTION CONTENT: GUIDES */}
        {sectionTab === "guides" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.slice(0, 4).map((article) => (
              <article
                key={article.slug}
                onClick={() => onSelectArticle(article.slug)}
                className="group bg-white border border-[#E6E2D3] rounded-[28px] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                {/* Cover Image & Category Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-amber-950 border border-amber-300 font-bold text-[10px] uppercase tracking-wider shadow-2xs">
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
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
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
        )}

        {/* SECTION CONTENT: LIVE NEWS BULLETINS */}
        {sectionTab === "news" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((news) => (
              <div
                key={news.id}
                onClick={() => {
                  if (onOpenAllBlogs) onOpenAllBlogs();
                }}
                className="group bg-white border border-[#E6E2D3] rounded-[24px] p-5 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        news.urgency === "Urgent Alert"
                          ? "bg-rose-100 text-rose-900"
                          : news.urgency === "Official Notice"
                          ? "bg-amber-100 text-amber-950"
                          : "bg-emerald-100 text-emerald-950"
                      }`}
                    >
                      <span>{news.urgency}</span>
                    </span>

                    <span className="text-[10px] text-slate-500 font-medium">
                      {news.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors leading-snug">
                    {news.headline}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E6E2D3] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[70%]">
                    {news.source}
                  </span>
                  <span className="text-amber-900 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA to Full Portal */}
        {onOpenAllBlogs && (
          <div className="text-center pt-4">
            <button
              onClick={onOpenAllBlogs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-102"
            >
              <BookOpen size={15} />
              <span>Explore All Handbooks & News Dispatches</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
