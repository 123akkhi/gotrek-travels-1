import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Film
} from 'lucide-react';
import { ReelItem } from '../types';
import { REELS_DATA } from '../data/reelsData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ReelsSectionProps {
  onOpenInquiry: (destination?: string) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onOpenInquiry }) => {
  const [reels, setReels] = useState<ReelItem[]>(REELS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isAddReelModalOpen, setIsAddReelModalOpen] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const reelsScrollRef = useRef<HTMLDivElement>(null);

  // New reel form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<ReelItem['category']>('adi-kailash');
  const [newCreator, setNewCreator] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Filtered reels list
  const filteredReels = selectedCategory === 'all'
    ? reels
    : reels.filter((r) => r.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Yatra Reels' },
    { id: 'adi-kailash', label: 'Adi Kailash ॐ' },
    { id: 'om-parvat', label: 'Om Parvat' },
    { id: 'parvati-sarovar', label: 'Parvati Sarovar' },
    { id: 'offroad', label: '4x4 Offroad' },
    { id: 'helicopter', label: 'Helicopter' },
    { id: 'yatri-experience', label: 'Yatri Experience' }
  ];

  const scrollReels = (direction: 'left' | 'right') => {
    if (reelsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      const el = reelsScrollRef.current;
      // If at end, loop to start
      if (direction === 'right' && el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = reelsScrollRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto sliding interval for reels carousel (relaxed to 8.5s, pauses when off-screen or tab hidden)
  useEffect(() => {
    if (isPaused || activeReelIndex !== null || !isInView) return;
    const interval = setInterval(() => {
      if (document.hidden) return;
      scrollReels('right');
    }, 8500);
    return () => clearInterval(interval);
  }, [isPaused, activeReelIndex, isInView]);

  const handleOpenReel = (id: string) => {
    const idx = filteredReels.findIndex((r) => r.id === id);
    if (idx !== -1) {
      setActiveReelIndex(idx);
    }
  };

  const handleAddReelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    const createdReel: ReelItem = {
      id: `reel-user-${Date.now()}`,
      title: newTitle,
      destination: newLocation,
      location: newLocation,
      posterImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      videoUrl: newVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-peak-under-a-clear-blue-sky-42823-large.mp4',
      likesCount: 1,
      viewsCount: '1',
      sharesCount: 0,
      duration: '0:30',
      category: newCategory,
      categoryLabel: categories.find((c) => c.id === newCategory)?.label || 'Yatra Reel',
      creatorName: newCreator || 'Yatri Traveller',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      audioTrack: 'Original Himalayan Ground Sound',
      caption: newCaption || 'Unforgettable Yatra memory with GoTrek Travels!',
      packageSlug: 'adi-kailash-yatra-standard',
      isVerified: true,
      createdAt: 'Just now'
    };

    setReels([createdReel, ...reels]);
    setIsAddReelModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewLocation('');
    setNewCreator('');
    setNewCaption('');
    setNewVideoUrl('');
    // Open newly created reel
    setActiveReelIndex(0);
  };

  return (
    <section id="reels" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow Orbs & Background Grid */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Film size={14} className="animate-pulse" />
              <span>Real Himalayan Yatra Videos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Yatra <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">Reels & Moments</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Authentic ground footage captured by our trip leads, guides, and yatris at Adi Kailash, Om Parvat, Parvati Sarovar, and 4x4 Offroad circuits.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Slider Navigation Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollReels('left')}
                className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-md"
                title="Slide Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollReels('right')}
                className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-md"
                title="Slide Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <button
              onClick={() => setIsAddReelModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Submit Reel</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Sliding Carousel Track for Reels */}
        <div
          ref={reelsScrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-1 scrollbar-none transform-gpu"
        >
          {filteredReels.map((reel) => (
            <ReelCardItem key={reel.id} reel={reel} onOpen={handleOpenReel} />
          ))}
        </div>
      </div>

      {/* FULLSCREEN REEL PLAYER OVERLAY MODAL */}
      <AnimatePresence mode="wait">
        {activeReelIndex !== null && filteredReels[activeReelIndex] && (
          <InteractiveReelModal
            key={filteredReels[activeReelIndex].id}
            reel={filteredReels[activeReelIndex]}
            currentIndex={activeReelIndex}
            totalReels={filteredReels.length}
            onClose={() => setActiveReelIndex(null)}
            onNext={() => setActiveReelIndex((prev) => (prev !== null && prev < filteredReels.length - 1 ? prev + 1 : 0))}
            onPrev={() => setActiveReelIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredReels.length - 1))}
            onOpenInquiry={onOpenInquiry}
          />
        )}
      </AnimatePresence>

      {/* SUBMIT REEL MODAL */}
      <AnimatePresence>
        {isAddReelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl text-left crisp-dialog"
            >
              <button
                onClick={() => setIsAddReelModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Film size={14} />
                <span>Share Ground Video</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                Submit Yatra Reel
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Share your authentic video memory from Adi Kailash, Om Parvat, or Kumaon trek with the community!
              </p>

              <form onSubmit={handleAddReelSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reel Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Parvati Sarovar Morning Aarti & Cold Dip"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Location / Altitude *</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Jolingkong (14,500 ft)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ReelItem['category'])}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
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

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Creator Name / Handle</label>
                  <input
                    type="text"
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    placeholder="e.g. Rahul Verma (@rahul_trek)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Video Link / MP4 URL (Optional)</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://... (Leave blank for HD sample stream)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Caption / Story</label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Write a brief caption about this moment..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddReelModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Send size={14} />
                    <span>Publish Reel</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* INDIVIDUAL REEL CARD ITEM WITH HOVER VIDEO PREVIEW */
interface ReelCardItemProps {
  reel: ReelItem;
  onOpen: (id: string) => void;
}

const ReelCardItem: React.FC<ReelCardItemProps> = ({ reel, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && hoverVideoRef.current) {
      hoverVideoRef.current.currentTime = 0;
      hoverVideoRef.current.play().catch(() => {});
    } else if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(reel.id)}
      className="group relative w-[220px] sm:w-[260px] md:w-[270px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/60 cursor-pointer shadow-2xl snap-start transform-gpu transition-all duration-300"
    >
      {/* Background Poster Image */}
      <img
        src={reel.posterImage}
        alt={reel.title}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
          isHovered && reel.videoUrl ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Live Muted Video Hover Preview */}
      {reel.videoUrl && (
        <video
          ref={hoverVideoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur border border-white/20 text-[10px] font-bold text-amber-300 flex items-center gap-1">
          <Eye size={10} />
          {reel.viewsCount}
        </span>

        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur text-amber-300 text-[10px] font-bold border border-amber-500/40">
          {reel.duration}
        </span>
      </div>

      {/* Center Play Button Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 transition-all">
          <Play size={20} className="ml-1 fill-slate-950" />
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 z-10 space-y-1.5 text-left">
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold truncate">
          <MapPin size={10} className="shrink-0" />
          <span className="truncate">{reel.location}</span>
        </div>

        <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
          {reel.title}
        </h3>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10">
          <span className="truncate font-medium text-slate-300">@{reel.creatorName}</span>
          <span className="flex items-center gap-1 text-rose-400 font-bold shrink-0">
            <Heart size={10} className="fill-rose-400" />
            {reel.likesCount.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* INTERACTIVE FULLSCREEN REEL PLAYER MODAL WITH AMBIENT BACKGROUND GLOW */
interface InteractiveReelModalProps {
  reel: ReelItem;
  currentIndex: number;
  totalReels: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenInquiry: (destination?: string) => void;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(reel.likesCount);
  const [progress, setProgress] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    setLikeCount(reel.likesCount);
    setIsLiked(false);
    setIsPlaying(true);
    setProgress(0);
    setVideoError(false);
  }, [reel]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      if (bgVideoRef.current) bgVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      if (bgVideoRef.current) bgVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleShare = () => {
    const msg = `*Check out this Yatra Reel on GoTrek Travels!*%0A%0A*${encodeURIComponent(
      reel.title
    )}*%0A📍 Location: ${encodeURIComponent(
      reel.location
    )}%0A%0AWatch authentic video & book your Yatra now: https://gotrek.in/#reels`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-2 sm:p-4 overflow-hidden"
    >
      {/* AMBIENT SMOOTH BACKGROUND REEL GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-1000 opacity-40 blur-3xl scale-125 z-0">
        {reel.videoUrl && !videoError ? (
          <video
            ref={bgVideoRef}
            src={reel.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover saturate-150 brightness-90 transform-gpu"
          />
        ) : (
          <img
            src={reel.posterImage}
            alt=""
            className="w-full h-full object-cover saturate-150 brightness-90 transform-gpu"
          />
        )}
      </div>

      {/* Dark Ambient Backdrop Click to Close */}
      <div className="absolute inset-0 z-10" onClick={onClose} />

      {/* Close Button Top Right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 hover:scale-105 transition-all cursor-pointer shadow-xl"
      >
        <X size={20} />
      </button>

      {/* Central 9:16 Reel Player Container with Smooth Motion */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-xs sm:max-w-sm aspect-[9/16] max-h-[85vh] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800/80 shadow-[0_0_60px_rgba(245,158,11,0.15)] z-20 flex flex-col justify-between transform-gpu"
      >
        {/* Video or Image Stream */}
        {reel.videoUrl && !videoError ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.posterImage}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
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

        {/* Top Progress Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-30">
          <div
            className="h-full bg-amber-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header Controls Overlay */}
        <div className="relative z-30 p-4 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={reel.creatorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={reel.creatorName}
              className="w-8 h-8 rounded-full border border-amber-400 object-cover"
            />
            <div className="text-left">
              <div className="flex items-center gap-1 text-xs font-bold text-white">
                <span>{reel.creatorName}</span>
                {reel.isVerified && <CheckCircle2 size={12} className="text-amber-400 fill-amber-400/20" />}
              </div>
              <div className="text-[10px] text-amber-300 font-medium flex items-center gap-1">
                <MapPin size={9} />
                <span>{reel.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-slate-900/60 text-white backdrop-blur hover:bg-slate-800 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>

        {/* Center Play/Pause Overlay Indicator */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-slate-950/80 text-amber-400 flex items-center justify-center backdrop-blur border border-amber-400/40 shadow-2xl">
              <Play size={28} className="ml-1 fill-amber-400" />
            </div>
          </div>
        )}

        {/* Right Action Sidebar Overlay */}
        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4">
          {/* Like Button */}
          <button
            onClick={handleLikeToggle}
            className="group flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur border transition-all ${
              isLiked
                ? 'bg-rose-600/90 border-rose-500 text-white scale-110 shadow-lg shadow-rose-600/30'
                : 'bg-slate-900/60 border-white/20 text-white hover:bg-slate-800'
            }`}>
              <Heart size={20} className={isLiked ? 'fill-white' : ''} />
            </div>
            <span className="text-[10px] font-bold text-white shadow-sm">
              {likeCount.toLocaleString()}
            </span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-600/90 border border-emerald-400 text-white flex items-center justify-center backdrop-blur hover:scale-105 transition-all shadow-lg">
              <WhatsAppIcon size={20} />
            </div>
            <span className="text-[10px] font-bold text-white">Share</span>
          </button>

          {/* Spinning Audio Track Icon */}
          <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-amber-400/50 p-1 flex items-center justify-center animate-spin duration-3000">
            <Music size={14} className="text-amber-400" />
          </div>
        </div>

        {/* Bottom Details & Direct Booking CTA */}
        <div className="relative z-30 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent space-y-2.5 text-left pr-16">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
            <Sparkles size={11} />
            <span>{reel.categoryLabel}</span>
          </div>

          <h3 className="text-sm font-bold text-white leading-tight">
            {reel.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 font-normal leading-snug">
            {reel.caption}
          </p>

          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Music size={10} className="text-amber-400 shrink-0" />
            <span className="truncate">{reel.audioTrack}</span>
          </div>

          {/* Direct "Book This Yatra" CTA Button */}
          <button
            onClick={() => {
              onClose();
              onOpenInquiry(reel.packageSlug || 'Adi Kailash & Om Parvat Yatra 2027');
            }}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Book This Yatra Package</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Up & Down Scroll Control Arrows for Desktop */}
      <div className="hidden sm:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={onPrev}
          className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 hover:scale-110 transition-all cursor-pointer shadow-xl"
          title="Previous Reel (Up Arrow)"
        >
          <ChevronUp size={22} />
        </button>

        <div className="text-[10px] font-mono font-bold text-amber-400 text-center">
          {currentIndex + 1} / {totalReels}
        </div>

        <button
          onClick={onNext}
          className="p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 hover:scale-110 transition-all cursor-pointer shadow-xl"
          title="Next Reel (Down Arrow)"
        >
          <ChevronDown size={22} />
        </button>
      </div>
    </motion.div>
  );
};
