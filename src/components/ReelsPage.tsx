import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Music,
  Eye,
  CheckCircle2,
  Plus,
  Send,
  ArrowRight,
  ShieldCheck,
  Compass,
  Film,
  Camera,
  Layers,
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Flame,
  Award,
  Filter,
  Check
} from "lucide-react";
import { ReelItem } from "../types";
import { REELS_DATA } from "../data/reelsData";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { FloatingOmBackground } from "./OmLightMotif";

interface ReelsPageProps {
  onBackToHome: () => void;
  onOpenInquiry: (destination?: string) => void;
  onSelectPackage?: (slug: string) => void;
  onOpenMemoriesPage?: () => void;
}

export const ReelsPage: React.FC<ReelsPageProps> = memo(({
  onBackToHome,
  onOpenInquiry,
  onSelectPackage,
  onOpenMemoriesPage
}) => {
  const [reels, setReels] = useState<ReelItem[]>(REELS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isAddReelModalOpen, setIsAddReelModalOpen] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // New reel submission form state
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState<ReelItem["category"]>("adi-kailash");
  const [newCreator, setNewCreator] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newInstagramHandle, setNewInstagramHandle] = useState("");

  useEffect(() => {
    document.title = "Sacred Yatra Reels & Real Darshan Videos | GoTrek Travels";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = [
    { id: "all", label: "All Yatra Reels", count: reels.length },
    { id: "adi-kailash", label: "Adi Kailash ॐ", count: reels.filter(r => r.category === "adi-kailash").length },
    { id: "om-parvat", label: "Om Parvat", count: reels.filter(r => r.category === "om-parvat").length },
    { id: "parvati-sarovar", label: "Parvati Sarovar", count: reels.filter(r => r.category === "parvati-sarovar").length },
    { id: "offroad", label: "4x4 Offroad", count: reels.filter(r => r.category === "offroad").length },
    { id: "helicopter", label: "Helicopter", count: reels.filter(r => r.category === "helicopter").length },
    { id: "yatri-experience", label: "Yatri Experience", count: reels.filter(r => r.category === "yatri-experience").length }
  ];

  const filteredReels = selectedCategory === "all"
    ? reels
    : reels.filter(r => r.category === selectedCategory);

  const handleOpenReel = (id: string) => {
    const idx = filteredReels.findIndex(r => r.id === id);
    if (idx !== -1) {
      setActiveReelIndex(idx);
    }
  };

  const handleAddReelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const createdReel: ReelItem = {
      id: `reel-user-${Date.now()}`,
      title: newTitle,
      destination: newLocation,
      location: newLocation,
      posterImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      videoUrl: newVideoUrl.trim() || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      likesCount: 1,
      viewsCount: "1",
      sharesCount: 0,
      duration: "0:30",
      category: newCategory,
      categoryLabel: categories.find(c => c.id === newCategory)?.label || "Yatra Reel",
      creatorName: newCreator.trim() || (newInstagramHandle ? `@${newInstagramHandle.replace(/^@/, '')}` : "Pilgrim Traveler"),
      creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      audioTrack: "Har Har Mahadev - Himalayan Temple Chants",
      caption: newCaption || "Sacred Himalayan pilgrimage moments captured with GoTrek Travels.",
      packageSlug: "adi-kailash-yatra-standard",
      isVerified: true,
      createdAt: "Just now"
    };

    setReels([createdReel, ...reels]);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsAddReelModalOpen(false);
      setNewTitle("");
      setNewLocation("");
      setNewCreator("");
      setNewCaption("");
      setNewVideoUrl("");
      setNewInstagramHandle("");
      setActiveReelIndex(0);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-amber-400 selection:text-slate-950 pb-20 relative">
      <FloatingOmBackground density="sparse" className="opacity-30 pointer-events-none" />

      {/* Top Breadcrumbs & Back Navigation Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B1120]/90 backdrop-blur-md sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer border border-slate-700 shadow-xs group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <PageBreadcrumbs
              items={[
                { label: "Home", href: "/", onClick: onBackToHome },
                { label: "Yatra Reels & Moments", active: true }
              ]}
              className="hidden sm:flex"
            />
          </div>

          <div className="flex items-center gap-2">
            {onOpenMemoriesPage && (
              <button
                onClick={onOpenMemoriesPage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-all cursor-pointer border border-amber-500/30"
              >
                <Camera size={13} />
                <span>View Photo Memories</span>
              </button>
            )}
            <button
              onClick={() => setIsAddReelModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Plus size={14} strokeWidth={3} />
              <span>Submit Reel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0F172A] via-[#0A0F1D] to-[#070B14]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Film size={13} className="text-amber-400" />
            <span>Sacred Himalayan Video Moments</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Yatra <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">Reels & Video Stories</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Watch authentic 9:16 vertical reels recorded live by Yatris and our local Kumaoni guides across Adi Kailash, Om Parvat, Parvati Sarovar, and rugged Himalayan 4x4 trails.
          </p>

          {/* Quick Stats Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-amber-400" />
              <span><strong>350k+</strong> Yatra Views</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span><strong>100%</strong> Authentic Ground Footage</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-amber-400" />
              <span><strong>SDM Approved</strong> Drone Corridors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips Bar */}
      <section className="sticky top-[125px] z-20 bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800/80 py-3.5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 shrink-0 text-slate-400 text-xs font-bold pr-2">
            <Filter size={13} className="text-amber-400" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/40"
                    : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Reels Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredReels.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 max-w-lg mx-auto p-8 space-y-4">
            <Film size={36} className="text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No reels found in this category</h3>
            <p className="text-xs text-slate-400">Be the first pilgrim to submit a reel for this holy circuit!</p>
            <button
              onClick={() => setIsAddReelModalOpen(true)}
              className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              Submit Reel
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredReels.map((reel, index) => (
              <ReelGridCard
                key={reel.id}
                reel={reel}
                onOpen={() => setActiveReelIndex(index)}
                onBook={() => onOpenInquiry(reel.packageSlug || "Adi Kailash & Om Parvat Yatra 2027")}
              />
            ))}
          </div>
        )}

        {/* Community Callout & Drone Videography Notice */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Share Your Sacred Memories</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Have you traveled with GoTrek to Adi Kailash or Om Parvat?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Submit your raw video clips or Instagram reels. Featured reels receive official GoTrek Yatra Merchandise and a dedicated spot on our verified portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddReelModalOpen(true)}
              className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Submit Your Reel</span>
            </button>
            <button
              onClick={() => onOpenInquiry("Adi Kailash Yatra 2027")}
              className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Book Yatra 2027</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* FULLSCREEN REEL PLAYER OVERLAY MODAL */}
      <AnimatePresence>
        {activeReelIndex !== null && filteredReels[activeReelIndex] && (
          <InteractiveReelModal
            key={filteredReels[activeReelIndex].id}
            reel={filteredReels[activeReelIndex]}
            currentIndex={activeReelIndex}
            totalReels={filteredReels.length}
            onClose={() => setActiveReelIndex(null)}
            onNext={() => setActiveReelIndex(prev => (prev !== null && prev < filteredReels.length - 1 ? prev + 1 : 0))}
            onPrev={() => setActiveReelIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredReels.length - 1))}
            onOpenInquiry={onOpenInquiry}
          />
        )}
      </AnimatePresence>

      {/* SUBMIT REEL MODAL */}
      <AnimatePresence>
        {isAddReelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Film size={18} className="text-amber-400" />
                  <h3 className="text-lg font-black text-white">Submit Yatra Reel</h3>
                </div>
                <button
                  onClick={() => setIsAddReelModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {submissionSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h4 className="text-base font-bold text-white">Reel Submitted Successfully!</h4>
                  <p className="text-xs text-slate-300">Your video reel is now published in the community feed.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReelSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Reel Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sunrise reflections at Parvati Sarovar"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Location / Shrine *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Jolingkong, Vyas Valley"
                        value={newLocation}
                        onChange={e => setNewLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value as ReelItem["category"])}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="adi-kailash">Adi Kailash ॐ</option>
                        <option value="om-parvat">Om Parvat</option>
                        <option value="parvati-sarovar">Parvati Sarovar</option>
                        <option value="offroad">4x4 Offroad</option>
                        <option value="helicopter">Helicopter</option>
                        <option value="yatri-experience">Yatri Experience</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Your Name / Handle</label>
                      <input
                        type="text"
                        placeholder="e.g., Rajesh Sharma"
                        value={newCreator}
                        onChange={e => setNewCreator(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Instagram Handle (Optional)</label>
                      <input
                        type="text"
                        placeholder="@username"
                        value={newInstagramHandle}
                        onChange={e => setNewInstagramHandle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Video URL (MP4 / Direct Link)</label>
                    <input
                      type="url"
                      placeholder="https://...mp4 (leave empty for sample video)"
                      value={newVideoUrl}
                      onChange={e => setNewVideoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Caption / Spiritual Experience</label>
                    <textarea
                      rows={2}
                      placeholder="Describe the moment, divine feeling, or temperature during the shot..."
                      value={newCaption}
                      onChange={e => setNewCaption(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddReelModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black uppercase tracking-wider shadow-md"
                    >
                      Publish Reel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* INDIVIDUAL REEL GRID CARD */
interface ReelGridCardProps {
  reel: ReelItem;
  onOpen: () => void;
  onBook: () => void;
}

const ReelGridCard: React.FC<ReelGridCardProps> = ({ reel, onOpen, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-400/80 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Background Poster Image */}
      <img
        src={reel.posterImage}
        alt={reel.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 ${
          isHovered && reel.videoUrl ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Hover Video Stream */}
      {reel.videoUrl && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Dark Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none" />

      {/* Top Badges */}
      <div className="relative z-10 p-3 flex items-center justify-between text-[11px] font-bold">
        <span className="px-2 py-0.8 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 flex items-center gap-1">
          <Eye size={10} />
          {reel.viewsCount}
        </span>
        <span className="px-2 py-0.8 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10 font-mono text-[10px]">
          {reel.duration}
        </span>
      </div>

      {/* Center Play Button Overlay on Hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-11 h-11 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
          <Play size={18} className="fill-slate-950 translate-x-0.5" />
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="relative z-10 p-3 space-y-1.5">
        <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-300/90 truncate">
          <MapPin size={10} className="shrink-0" />
          <span className="truncate">{reel.location}</span>
        </div>

        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
          {reel.title}
        </h4>

        <div className="pt-1 flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10">
          <span className="truncate font-medium">@{reel.creatorName}</span>
          <div className="flex items-center gap-1 font-bold text-amber-300">
            <Heart size={11} className="fill-amber-400" />
            <span>{reel.likesCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* INTERACTIVE FULLSCREEN REEL MODAL */
interface InteractiveReelModalProps {
  reel: ReelItem;
  currentIndex: number;
  totalReels: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenInquiry: (dest?: string) => void;
}

const InteractiveReelModal: React.FC<InteractiveReelModalProps> = ({
  reel,
  currentIndex,
  totalReels,
  onClose,
  onNext,
  onPrev,
  onOpenInquiry
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(reel.likesCount);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLiked(false);
    setLikeCount(reel.likesCount);
    setVideoError(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsMuted(true);
      });
    }
  }, [reel]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `*Check out this Yatra Reel on GoTrek Travels!*%0A%0A*${encodeURIComponent(
      reel.title
    )}*%0ALocation: ${encodeURIComponent(
      reel.location
    )}%0A%0AWatch authentic video & book your Yatra now: https://gotrek.in/#reels`;
    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl overflow-hidden p-2 sm:p-4">
      {/* Central 9:16 Reel Player */}
      <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[92vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex flex-col justify-between">
        {/* Video / Poster */}
        {reel.videoUrl && !videoError ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            loop
            autoPlay
            playsInline
            muted={isMuted}
            onError={() => setVideoError(true)}
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <img
            src={reel.posterImage}
            alt={reel.title}
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          />
        )}

        {/* Top Header Controls */}
        <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <img
              src={reel.creatorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={reel.creatorName}
              className="w-8 h-8 rounded-full border border-amber-400 object-cover"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{reel.creatorName}</span>
                {reel.isVerified && <CheckCircle2 size={12} className="text-amber-400" />}
              </div>
              <div className="text-[10px] text-amber-300/90 flex items-center gap-1">
                <MapPin size={9} />
                <span>{reel.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Play/Pause Overlay Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">
              <Play size={28} className="translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Right Side Social Actions Column */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              liked ? "bg-red-500 text-white scale-110" : "bg-black/50 text-white group-hover:bg-black/80"
            }`}>
              <Heart size={18} className={liked ? "fill-white" : ""} />
            </div>
            <span className="text-[10px] font-bold">{likeCount}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center group-hover:bg-black/80 transition-all">
              <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold">Share</span>
          </button>
        </div>

        {/* Bottom Metadata & Booking CTA */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="space-y-1 text-left max-w-[80%]">
            <h3 className="text-sm font-bold text-white leading-snug">{reel.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{reel.caption}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium">
              <Music size={10} />
              <span className="truncate">{reel.audioTrack}</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenInquiry(reel.packageSlug || "Adi Kailash & Om Parvat Yatra 2027");
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book This Holy Yatra</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Prev / Next Navigation Floating Side Buttons */}
      <button
        onClick={onPrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white items-center justify-center border border-slate-700 shadow-xl cursor-pointer"
        title="Previous Reel"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white items-center justify-center border border-slate-700 shadow-xl cursor-pointer"
        title="Next Reel"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
