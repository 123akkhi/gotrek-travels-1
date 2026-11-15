import React, { useState, useEffect, useRef } from "react";
import {
  BlogArticle,
  YatraNewsBulletin,
  BlogGalleryItem,
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
  RefreshCw,
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  ImagePlus
} from "lucide-react";

const fetchPublications = async <T,>(endpoint: string): Promise<T[]> => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return response.json() as Promise<T[]>;
};

const savePublication = async <T,>(endpoint: string, publication: T): Promise<void> => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(publication)
  });
  if (!response.ok) throw new Error(`Failed to save ${endpoint}`);
};

const deletePublication = async (endpoint: string): Promise<void> => {
  const response = await fetch(endpoint, { method: "DELETE" });
  if (!response.ok) throw new Error(`Failed to delete ${endpoint}`);
};

const fetchBlogsFromFirestore = () => fetchPublications<BlogArticle>("/api/blogs");
const fetchNewsFromFirestore = () => fetchPublications<YatraNewsBulletin>("/api/news");
const saveBlogToFirestore = (blog: BlogArticle) => savePublication("/api/blogs", blog);
const saveNewsToFirestore = (news: YatraNewsBulletin) => savePublication("/api/news", news);
const deleteBlogFromFirestore = (slug: string) =>
  deletePublication(`/api/blogs/${encodeURIComponent(slug)}`);
const deleteNewsFromFirestore = (id: string) =>
  deletePublication(`/api/news/${encodeURIComponent(id)}`);

export const HIMALAYAN_PHOTO_PRESETS = [
  {
    name: "Adi Kailash Sacred Peak",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    desc: "Holy peak view from Jolingkong base"
  },
  {
    name: "Om Parvat Snow Crest",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    desc: "Miraculous snow formation near Nabhidang"
  },
  {
    name: "Parvati Sarovar Lake",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Emerald high-altitude sacred lake reflection"
  },
  {
    name: "Darma Valley Meadows",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    desc: "Alpine river valley & Panchachuli massif"
  }
];

/**
 * Compresses an image file from user device into an optimized web-ready JPEG DataURL.
 * Keeps payload lightweight (~80-250KB) so Firestore and browser rendering are instantaneous.
 */
export const compressImageFile = (
  file: File,
  maxWidth = 1400,
  maxHeight = 1000,
  quality = 0.84
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

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

  // Form states for new/editing blog handbook
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [editingBlogOriginal, setEditingBlogOriginal] = useState<BlogArticle | null>(null);
  const [coverPhotoSource, setCoverPhotoSource] = useState<"device" | "presets" | "url">("device");
  const [isCompressingCover, setIsCompressingCover] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Supporting device gallery photos
  const [galleryPhotos, setGalleryPhotos] = useState<Array<{ id: string; url: string; caption: string; tag?: string }>>([]);
  const [isCompressingGallery, setIsCompressingGallery] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

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
    coverImage: HIMALAYAN_PHOTO_PRESETS[0].url,
    summary: "",
    content: "### 1. Essential Preparation\nEnsure your medical fitness certificate and SDM Inner Line Permit are completed at least 7 days prior to departure.\n\n### 2. Best Season & Weather\nMay through June offers clear Himalayan views, while September and October feature crystal-clear blue skies."
  });

  const loadData = async () => {
    // 1. Initial fast local load
    setArticles(getAllBlogArticles());
    setNewsList(getAllNewsBulletins());

    // 2. Live Firestore sync
    try {
      const liveBlogs = await fetchBlogsFromFirestore();
      if (liveBlogs && liveBlogs.length > 0) {
        setArticles(liveBlogs);
      }
    } catch (e) {
      console.warn("CRM blogs live fetch error:", e);
    }

    try {
      const liveNews = await fetchNewsFromFirestore();
      if (liveNews && liveNews.length > 0) {
        setNewsList(liveNews);
      }
    } catch (e) {
      console.warn("CRM news live fetch error:", e);
    }
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

    // Save directly to Firestore collection 'news'
    try {
      await saveNewsToFirestore(bulletinItem);
    } catch (fsErr) {
      console.warn("Firestore client news sync error:", fsErr);
    }

    await loadData();
    setIsNewNewsModalOpen(false);
    setNewNews({
      headline: "",
      category: "Route & BRO Road Alert",
      urgency: "Operational Update",
      summary: "",
      source: `GoTrek Dharchula Operations Desk (${currentHandlerName})`,
      fullDetails: "• BRO 65 RCC clearing machinery stationed\n• 4x4 Bolero / Scorpio convoys moving smoothly\n• Weather: Clear skies and optimal visibility"
    });
    showToast("Live News Bulletin saved to Firebase & published!");
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm("Are you sure you want to delete this news bulletin?")) {
      deleteCustomNewsBulletin(id);

      // Delete from Firestore
      try {
        await deleteNewsFromFirestore(id);
      } catch (fsErr) {
        console.warn("Firestore client news delete error:", fsErr);
      }

      await loadData();
      showToast("News bulletin deleted from Firebase & site");
    }
  };

  const handleOpenCreateBlog = () => {
    setEditingBlogSlug(null);
    setEditingBlogOriginal(null);
    setCoverPhotoSource("device");
    setNewBlog({
      title: "",
      subtitle: "A verified 2027 Himalayan field briefing by GoTrek Travels",
      category: "Pilgrimage Guide",
      readTime: "7 min read",
      coverImage: HIMALAYAN_PHOTO_PRESETS[0].url,
      summary: "",
      content: "### 1. Essential Preparation\nEnsure your medical fitness certificate and SDM Inner Line Permit are completed at least 7 days prior to departure.\n\n### 2. Best Season & Weather\nMay through June offers clear Himalayan views, while September and October feature crystal-clear blue skies."
    });
    setGalleryPhotos([]);
    setIsNewBlogModalOpen(true);
  };

  const handleOpenEditBlog = (art: BlogArticle) => {
    setEditingBlogSlug(art.slug);
    setEditingBlogOriginal(art);
    setCoverPhotoSource(art.coverImage?.startsWith("data:") ? "device" : "url");
    setNewBlog({
      title: art.title,
      subtitle: art.subtitle || "A verified 2027 Himalayan field briefing by GoTrek Travels",
      category: art.category,
      readTime: art.readTime || "7 min read",
      coverImage: art.coverImage,
      summary: art.summary,
      content: art.sections?.[0]?.paragraphs?.slice(1).join("\n\n") || art.sections?.[0]?.paragraphs?.[0] || ""
    });

    const existingGallery: Array<{ id: string; url: string; caption: string; tag?: string }> = [];
    if (art.gallery && art.gallery.length > 0) {
      art.gallery.forEach((g, idx) => {
        existingGallery.push({
          id: `gal-${idx}-${Date.now()}`,
          url: g.url,
          caption: g.caption || "Expedition Photo",
          tag: g.tag || "Field Photo"
        });
      });
    } else if (art.sections?.[0]?.gallery && art.sections[0].gallery.length > 0) {
      art.sections[0].gallery.forEach((g, idx) => {
        existingGallery.push({
          id: `gal-${idx}-${Date.now()}`,
          url: g.url,
          caption: g.caption || "Expedition Photo",
          tag: g.tag || "Field Photo"
        });
      });
    }
    setGalleryPhotos(existingGallery);
    setIsNewBlogModalOpen(true);
  };

  const handleCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (JPG, PNG, WebP)", "error");
      return;
    }
    try {
      setIsCompressingCover(true);
      const dataUrl = await compressImageFile(file, 1400, 1000, 0.85);
      setNewBlog((prev) => ({ ...prev, coverImage: dataUrl }));
      setCoverPhotoSource("device");
      showToast("Photo selected from device! You can change it anytime.", "success");
    } catch (err) {
      console.error("Cover image upload error:", err);
      showToast("Failed to process device image", "error");
    } finally {
      setIsCompressingCover(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsCompressingGallery(true);
      const newItems: Array<{ id: string; url: string; caption: string; tag?: string }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await compressImageFile(file, 1200, 900, 0.82);
        const defaultCaption = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        newItems.push({
          id: `gal-${Date.now()}-${i}`,
          url: dataUrl,
          caption: defaultCaption.charAt(0).toUpperCase() + defaultCaption.slice(1),
          tag: "Expedition Photo"
        });
      }
      if (newItems.length > 0) {
        setGalleryPhotos((prev) => [...prev, ...newItems]);
        showToast(`Added ${newItems.length} supporting photo(s) from device`, "success");
      }
    } catch (err) {
      console.error("Gallery photos upload error:", err);
      showToast("Failed to process gallery photos", "error");
    } finally {
      setIsCompressingGallery(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleRemoveGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) {
      showToast("Please fill in article title and summary", "error");
      return;
    }

    if (!newBlog.coverImage) {
      showToast("Please select or upload a cover photo for the handbook", "error");
      return;
    }

    const slug = editingBlogSlug || newBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const galleryPayload: BlogGalleryItem[] = galleryPhotos.map((g) => ({
      url: g.url,
      caption: g.caption || "Himalayan Expedition Glimpse",
      tag: g.tag || "Field Photo"
    }));

    const blogItem: BlogArticle = {
      slug,
      title: newBlog.title,
      subtitle: newBlog.subtitle,
      category: newBlog.category,
      author: editingBlogOriginal?.author || {
        name: currentHandlerName || "GoTrek Editorial Desk",
        role: "Expedition Director",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      publishedAt: editingBlogOriginal?.publishedAt || `${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })} Edition`,
      readTime: newBlog.readTime || "6 min read",
      coverImage: newBlog.coverImage,
      relatedTourSlug: editingBlogOriginal?.relatedTourSlug || "adi-kailash",
      summary: newBlog.summary,
      isCustom: true,
      views: editingBlogOriginal?.views || 120,
      sections: [
        {
          id: "overview",
          heading: "Overview & Guidelines",
          paragraphs: [newBlog.summary, newBlog.content],
          gallery: galleryPayload.length > 0 ? galleryPayload : undefined
        }
      ],
      gallery: galleryPayload.length > 0 ? galleryPayload : undefined
    };

    saveCustomBlogArticle(blogItem);

    // Save simultaneously to backend server disk & Firestore collection 'blogs'
    try {
      await saveBlogToFirestore(blogItem);
      console.log(`[CRM] Blog '${slug}' saved to backend server & Firestore`);
    } catch (saveErr) {
      console.warn("Blog save error:", saveErr);
    }

    await loadData();
    setIsNewBlogModalOpen(false);
    const wasEditing = Boolean(editingBlogSlug);
    setEditingBlogSlug(null);
    setEditingBlogOriginal(null);
    showToast(wasEditing ? "Handbook article & photos updated in backend & site!" : "Handbook article saved to backend & published!");
  };

  const handleDeleteBlog = async (slug: string) => {
    if (confirm("Are you sure you want to delete this handbook article?")) {
      deleteCustomBlogArticle(slug);

      // Delete from backend server disk & Firestore
      try {
        await deleteBlogFromFirestore(slug);
        console.log(`[CRM] Blog '${slug}' deleted from backend & Firestore`);
      } catch (delErr) {
        console.warn("Blog delete error:", delErr);
      }

      await loadData();
      showToast("Handbook article removed from backend & site");
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
              onClick={handleOpenCreateBlog}
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
                  className="bg-white border border-[#E6E2D3] rounded-2xl overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div className="aspect-[16/9] relative bg-slate-900 overflow-hidden">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-amber-950 font-bold text-[9px] uppercase shadow-xs">
                        {art.category}
                      </span>
                      {art.coverImage?.startsWith("data:") && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-500/30 text-[9px] font-bold shadow-xs">
                          Device Photo
                        </span>
                      )}
                    </div>
                    {art.gallery && art.gallery.length > 0 && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold flex items-center gap-1 shadow-xs">
                        <Camera size={10} />
                        <span>{art.gallery.length} Photos</span>
                      </span>
                    )}
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

                    <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-between gap-2 text-xs">
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">
                        {art.readTime}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditBlog(art)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-[11px] font-bold transition-colors cursor-pointer"
                          title="Edit Handbook & Change Photos"
                        >
                          <Edit2 size={12} />
                          <span>Edit / Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(art.slug)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
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

      {/* MODAL: CREATE OR EDIT TRAVEL HANDBOOK WITH DEVICE PHOTO UPLOAD & CHANGE */}
      {isNewBlogModalOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#E6E2D3] rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[92dvh] overflow-y-auto overscroll-contain touch-pan-y">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E6E2D3] pb-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {editingBlogSlug ? "Edit Himalayan Handbook" : "Write Himalayan Handbook"}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal">
                    {editingBlogSlug
                      ? "Update handbook guidance and change photos from your device"
                      : "Create and publish yatra guides with photos from your phone or PC"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNewBlogModalOpen(false);
                  setEditingBlogSlug(null);
                  setEditingBlogOriginal(null);
                }}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {editingBlogSlug && (
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
                <Sparkles size={16} className="text-amber-800 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Editing Handbook:</strong> You are modifying <em>"{newBlog.title}"</em>. You can replace the cover photo with any picture from your device, add extra photos, and update details. Changes will synchronize with Firebase and the live website.
                </p>
              </div>
            )}

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Handbook Title *
                </label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 focus:border-amber-800 outline-none shadow-2xs font-medium"
                  placeholder="e.g. Panchachuli Base Camp 2027 Expedition Guide"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newBlog.category}
                    onChange={(e: any) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 bg-white focus:border-amber-800 outline-none shadow-2xs font-medium cursor-pointer"
                  >
                    <option value="Pilgrimage Guide">Pilgrimage Guide</option>
                    <option value="Trekking Guide">Trekking Guide</option>
                    <option value="Offbeat Himalaya">Offbeat Himalaya</option>
                    <option value="Culture & Heritage">Culture & Heritage</option>
                    <option value="Medical & Safety">Medical & Safety</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 focus:border-amber-800 outline-none shadow-2xs font-medium"
                    placeholder="e.g. 6 min read"
                  />
                </div>
              </div>

              {/* COVER PHOTO FROM DEVICE SECTION */}
              <div className="space-y-2 pt-1 border-t border-[#E6E2D3]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Camera size={14} className="text-amber-800" />
                    <span>Primary Cover Photo *</span>
                  </label>

                  {/* Source Switcher */}
                  <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setCoverPhotoSource("device")}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                        coverPhotoSource === "device"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Upload size={12} />
                      <span>From Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverPhotoSource("presets")}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                        coverPhotoSource === "presets"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Sparkles size={12} />
                      <span>Himalayan Presets</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverPhotoSource("url")}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                        coverPhotoSource === "url"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <ImageIcon size={12} />
                      <span>Image URL</span>
                    </button>
                  </div>
                </div>

                {/* Hidden File Input for Device Upload */}
                <input
                  ref={coverFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={handleCoverFileChange}
                />

                {/* Cover Image Preview Card if Photo Exists */}
                {newBlog.coverImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E6E2D3] bg-slate-950 aspect-[16/9] shadow-sm group">
                    <img
                      src={newBlog.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-wide border border-white/20 flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-emerald-400" />
                        <span>{newBlog.coverImage.startsWith("data:") ? "Device Photo Loaded" : "Cover Photo Active"}</span>
                      </span>
                    </div>

                    {/* Action buttons on hover / overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        disabled={isCompressingCover}
                        className="px-3 py-1.5 rounded-full bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                      >
                        <RefreshCw size={13} className={isCompressingCover ? "animate-spin" : ""} />
                        <span>{isCompressingCover ? "Processing Photo..." : "Change Photo from Device"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewBlog((prev) => ({ ...prev, coverImage: "" }))}
                        className="px-3 py-1.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Remove Photo</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => coverFileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {isCompressingCover ? "Processing device photo..." : "Click to select a photo from your device"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Uploads from iPhone, Android, or laptop (JPG, PNG, WebP)
                      </p>
                    </div>
                  </div>
                )}

                {/* Himalayan Presets Picker */}
                {coverPhotoSource === "presets" && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
                    <p className="text-[11px] font-bold text-slate-700">
                      Choose from authentic high-resolution Himalayan scenic shots:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {HIMALAYAN_PHOTO_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setNewBlog((prev) => ({ ...prev, coverImage: preset.url }));
                            showToast(`Selected "${preset.name}" as cover photo`);
                          }}
                          className={`relative rounded-xl overflow-hidden aspect-[4/3] border text-left group cursor-pointer transition-all ${
                            newBlog.coverImage === preset.url
                              ? "ring-2 ring-amber-800 border-amber-800 scale-98"
                              : "border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white leading-tight truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Web URL Input */}
                {coverPhotoSource === "url" && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 animate-in fade-in">
                    <label className="text-[11px] font-bold text-slate-700">
                      Direct Image Web URL (Unsplash, CDN, or Cloud Storage)
                    </label>
                    <input
                      type="url"
                      value={newBlog.coverImage}
                      onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                )}
              </div>

              {/* SUPPORTING GALLERY PHOTOS FROM DEVICE */}
              <div className="space-y-2 pt-2 border-t border-[#E6E2D3]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ImagePlus size={14} className="text-amber-800" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Expedition Photo Gallery from Device ({galleryPhotos.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    disabled={isCompressingGallery}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    <Plus size={12} />
                    <span>{isCompressingGallery ? "Adding..." : "+ Add Photos from Device"}</span>
                  </button>

                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    multiple
                    className="hidden"
                    onChange={handleGalleryFileChange}
                  />
                </div>

                {galleryPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {galleryPhotos.map((item) => (
                      <div
                        key={item.id}
                        className="relative rounded-xl overflow-hidden border border-[#E6E2D3] bg-slate-100 group flex flex-col"
                      >
                        <div className="aspect-[4/3] relative bg-slate-900 overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryPhoto(item.id)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600/90 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                            title="Remove Photo"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                        <div className="p-1.5 bg-white border-t border-slate-200">
                          <input
                            type="text"
                            value={item.caption}
                            onChange={(e) => {
                              const val = e.target.value;
                              setGalleryPhotos((prev) =>
                                prev.map((p) => (p.id === item.id ? { ...p, caption: val } : p))
                              );
                            }}
                            placeholder="Caption (e.g. Gunji village)"
                            className="w-full text-[10px] text-slate-700 font-medium px-1.5 py-0.5 rounded border border-slate-200 outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">
                    No extra gallery photos attached yet. Click "+ Add Photos from Device" to upload yatra glimpses (camp views, mountain passes, local culture).
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary & Key Takeaways *
                </label>
                <textarea
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 focus:border-amber-800 outline-none shadow-2xs font-medium"
                  placeholder="Key takeaways and field advisory for pilgrims..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Content / Field Briefing
                </label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] text-xs text-slate-900 focus:border-amber-800 outline-none shadow-2xs font-medium"
                  placeholder="Detailed guidance, trail points, altitude precautions, daily itinerary highlights..."
                />
              </div>

              <div className="pt-3 border-t border-[#E6E2D3] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewBlogModalOpen(false);
                    setEditingBlogSlug(null);
                    setEditingBlogOriginal(null);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>{editingBlogSlug ? "Save & Update Handbook" : "Publish Handbook"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
