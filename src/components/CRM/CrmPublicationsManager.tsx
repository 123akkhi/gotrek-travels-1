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
} from "../../data/blogsData";
import {
  BookOpen,
  Radio,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Clock,
  Calendar,
  ShieldCheck,
  Search,
  Sparkles,
  ExternalLink,
  X,
  FileText,
  Send,
  Eye,
  RefreshCw
} from "lucide-react";

interface CrmPublicationsManagerProps {
  currentHandlerName: string;
}

export const CrmPublicationsManager: React.FC<CrmPublicationsManagerProps> = ({
  currentHandlerName
}) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [newsList, setNewsList] = useState<YatraNewsBulletin[]>([]);
  const [activeTab, setActiveTab] = useState<"news" | "blogs">("news");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewNewsModalOpen, setIsNewNewsModalOpen] = useState(false);
  const [isNewBlogModalOpen, setIsNewBlogModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form states for new news bulletin
  const [newNews, setNewNews] = useState<{
    headline: string;
    category: "Breaking Bulletin" | "Route & BRO Road Alert" | "Govt & SDM Permit Notice" | "Weather & Season Advisory" | "Batch & Heli Update";
    urgency: "Good News" | "Urgent Alert" | "Official Notice" | "Operational Update";
    summary: string;
    source: string;
    fullDetails: string;
  }>({
    headline: "",
    category: "Route & BRO Road Alert",
    urgency: "Operational Update",
    summary: "",
    source: `GoTrek Dharchula Operations Desk (${currentHandlerName})`,
    fullDetails: "• BRO 65 RCC clearing machinery stationed\n• 4x4 Bolero / Scorpio convoys moving smoothly\n• Weather: Clear skies and optimal visibility"
  });

  // Form states for new blog handbook
  const [newBlog, setNewBlog] = useState<{
    title: string;
    subtitle: string;
    category: "Pilgrimage Guide" | "Trekking Guide" | "Offbeat Himalaya" | "Culture & Heritage" | "Medical & Safety";
    readTime: string;
    coverImage: string;
    summary: string;
    content: string;
  }>({
    title: "",
    subtitle: "A verified 2027 Himalayan field briefing by GoTrek Travels",
    category: "Pilgrimage Guide",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    summary: "",
    content: "### 1. Essential Preparation\nEnsure your medical fitness certificate and SDM Inner Line Permit are completed at least 7 days prior to departure.\n\n### 2. Best Season & Weather\nMay through June offers clear Himalayan views, while September and October feature crystal-clear blue skies."
  });

  const loadData = () => {
    setArticles(getAllBlogArticles());
    setNewsList(getAllNewsBulletins());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.headline || !newNews.summary) {
      showToast("Please fill in headline and summary", "error");
      return;
    }

    const points = newNews.fullDetails
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} • ${now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;

    const bulletinItem: YatraNewsBulletin = {
      id: `bulletin_${Date.now()}`,
      headline: newNews.headline,
      category: newNews.category,
      urgency: newNews.urgency,
      publishedAt: formattedDate,
      summary: newNews.summary,
      fullDetails: points.length > 0 ? points : [newNews.summary],
      source: newNews.source || `GoTrek Desk (${currentHandlerName})`,
      verified: true
    };

    saveCustomNewsBulletin(bulletinItem);

    // Sync with backend API
    try {
      await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bulletinItem)
      });
    } catch (err) {
      console.warn("Backend news sync fallback", err);
    }

    loadData();
    setIsNewNewsModalOpen(false);
    setNewNews({
      headline: "",
      category: "Route & BRO Road Alert",
      urgency: "Operational Update",
      summary: "",
      source: `GoTrek Dharchula Operations Desk (${currentHandlerName})`,
      fullDetails: "• BRO 65 RCC clearing machinery stationed\n• 4x4 Bolero / Scorpio convoys moving smoothly\n• Weather: Clear skies and optimal visibility"
    });
    showToast("Live News Bulletin published successfully!");
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm("Are you sure you want to delete this news bulletin?")) {
      deleteCustomNewsBulletin(id);
      try {
        await fetch(`/api/news/${id}`, { method: "DELETE" });
      } catch (err) {}
      loadData();
      showToast("News bulletin deleted");
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) {
      showToast("Please fill in article title and summary", "error");
      return;
    }

    const slug = newBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blogItem: BlogArticle = {
      slug,
      title: newBlog.title,
      subtitle: newBlog.subtitle,
      category: newBlog.category,
      author: {
        name: currentHandlerName || "GoTrek Editorial Desk",
        role: "Expedition Director",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      publishedAt: `${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })} Edition`,
      readTime: newBlog.readTime || "6 min read",
      coverImage: newBlog.coverImage,
      relatedTourSlug: "adi-kailash",
      summary: newBlog.summary,
      views: 120,
      sections: [
        {
          id: "overview",
          heading: "Overview & Guidelines",
          paragraphs: [newBlog.summary, newBlog.content]
        }
      ]
    };

    saveCustomBlogArticle(blogItem);

    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogItem)
      });
    } catch (err) {
      console.warn("Backend blog sync fallback", err);
    }

    loadData();
    setIsNewBlogModalOpen(false);
    setNewBlog({
      title: "",
      subtitle: "A verified 2027 Himalayan field briefing by GoTrek Travels",
      category: "Pilgrimage Guide",
      readTime: "7 min read",
      coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      summary: "",
      content: ""
    });
    showToast("Travel Handbook article published successfully!");
  };

  const handleDeleteBlog = async (slug: string) => {
    if (confirm("Are you sure you want to delete this handbook article?")) {
      deleteCustomBlogArticle(slug);
      try {
        await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      } catch (err) {}
      loadData();
      showToast("Handbook article removed");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-[#FDFBF7]">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div
          className={`fixed top-5 right-5 z-[200] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
            feedbackMsg.type === "success"
              ? "bg-emerald-800 text-white"
              : "bg-rose-800 text-white"
          }`}
        >
          <Check size={16} />
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="p-4 sm:p-5 bg-white border-b border-[#E6E2D3] flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-2xl bg-[#F5F2ED] border border-[#E6E2D3] flex items-center gap-1">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "news"
                  ? "bg-amber-900 text-white shadow-2xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Radio size={14} className={activeTab === "news" ? "animate-pulse" : ""} />
              <span>Live News Bulletins ({newsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#1E293B] text-white shadow-2xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <BookOpen size={14} />
              <span>Travel Handbooks & Guides ({articles.length})</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "news" ? (
            <button
              onClick={() => setIsNewNewsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Broadcast Live News Alert</span>
            </button>
          ) : (
            <button
              onClick={() => setIsNewBlogModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Write Travel Handbook</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto smooth-scroll-y p-4 sm:p-6 space-y-4 min-h-0 overscroll-contain touch-pan-y pb-12 sm:pb-8">
        {activeTab === "news" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Live Dispatch Stream & Route Alerts
                </h3>
                <p className="text-xs text-slate-500">
                  Broadcast immediate alerts regarding BRO Tawaghat-Lipulekh road, SDM Dharchula permits, or weather advisories.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E6E2D3] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.urgency === "Urgent Alert"
                            ? "bg-rose-100 text-rose-900 border border-rose-300"
                            : item.urgency === "Official Notice"
                            ? "bg-amber-100 text-amber-950 border border-amber-300"
                            : "bg-emerald-100 text-emerald-950 border border-emerald-300"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span>{item.urgency}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.publishedAt}
                        </span>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                          title="Delete Bulletin"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.headline}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[75%] font-medium">
                      Source: {item.source}
                    </span>
                    <span className="text-amber-800 font-bold">Active On Site</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Published Himalayan Handbooks
                </h3>
                <p className="text-xs text-slate-500">
                  High-converting educational articles explaining rituals, packing lists, permits, and offbeat routes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((art) => (
                <div
                  key={art.slug}
                  className="bg-white border border-[#E6E2D3] rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] relative bg-slate-900">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 text-amber-950 font-bold text-[9px] uppercase">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-500 font-medium">
                        {art.readTime}
                      </span>
                      <button
                        onClick={() => handleDeleteBlog(art.slug)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: BROADCAST LIVE NEWS BULLETIN */}
      {isNewNewsModalOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#E6E2D3] rounded-[28px] max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[90dvh] overflow-y-auto overscroll-contain touch-pan-y">
            <div className="flex items-center justify-between border-b border-[#E6E2D3] pb-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
                <Radio size={18} className="animate-pulse" />
                <span>Broadcast Live Yatra Bulletin</span>
              </div>
              <button
                onClick={() => setIsNewNewsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Urgency Status *
                </label>
                <select
                  value={newNews.urgency}
                  onChange={(e: any) => setNewNews({ ...newNews, urgency: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 bg-white"
                >
                  <option value="Operational Update">Operational Update (Regular)</option>
                  <option value="Good News">Good News (Road Open / Clear Skies)</option>
                  <option value="Official Notice">Official Notice (SDM / Permit Advisory)</option>
                  <option value="Urgent Alert">Urgent Alert (Weather / Landslide Advisory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={newNews.category}
                  onChange={(e: any) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 bg-white"
                >
                  <option value="Route & BRO Road Alert">Route & BRO Road Alert</option>
                  <option value="Govt & SDM Permit Notice">Govt & SDM Permit Notice</option>
                  <option value="Breaking Bulletin">Breaking Bulletin</option>
                  <option value="Weather & Season Advisory">Weather & Season Advisory</option>
                  <option value="Batch & Heli Update">Batch & Heli Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  value={newNews.headline}
                  onChange={(e) => setNewNews({ ...newNews, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="e.g. BRO Clears Nazang stretch; 4x4 convoys moving smoothly"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary / Overview *
                </label>
                <textarea
                  value={newNews.summary}
                  onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="Brief summary visible on cards..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Detailed Points (1 per line)
                </label>
                <textarea
                  value={newNews.fullDetails}
                  onChange={(e) => setNewNews({ ...newNews, fullDetails: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 font-mono text-[11px]"
                  placeholder="• BRO 65 RCC clearing machinery stationed&#10;• 4x4 Bolero / Scorpio convoys moving smoothly"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Verified Source Attribution
                </label>
                <input
                  type="text"
                  value={newNews.source}
                  onChange={(e) => setNewNews({ ...newNews, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="e.g. BRO Swastik & Dharchula Ops"
                />
              </div>

              <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewNewsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Publish Live Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE TRAVEL HANDBOOK */}
      {isNewBlogModalOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#E6E2D3] rounded-[28px] max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[90dvh] overflow-y-auto overscroll-contain touch-pan-y">
            <div className="flex items-center justify-between border-b border-[#E6E2D3] pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <BookOpen size={18} className="text-amber-800" />
                <span>Write Himalayan Handbook</span>
              </div>
              <button
                onClick={() => setIsNewBlogModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Handbook Title *
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="e.g. Panchachuli Base Camp 2027 Expedition Guide"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newBlog.category}
                    onChange={(e: any) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 bg-white"
                  >
                    <option value="Pilgrimage Guide">Pilgrimage Guide</option>
                    <option value="Trekking Guide">Trekking Guide</option>
                    <option value="Offbeat Himalaya">Offbeat Himalaya</option>
                    <option value="Medical & Safety">Medical & Safety</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                    placeholder="e.g. 7 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={newBlog.coverImage}
                  onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary *
                </label>
                <textarea
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="Key takeaways and summary for pilgrims..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Content / Main Guidance
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E2D3] text-xs text-slate-900"
                  placeholder="Detailed guidance, trail points, altitude precautions..."
                />
              </div>

              <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewBlogModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Publish Handbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
