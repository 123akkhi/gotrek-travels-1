import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  Pause,
  Play,
  Quote,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import {
  GoogleReview,
  GoogleReviewsResponse,
  fetchGoogleReviews,
  VERIFIED_FALLBACK_REVIEWS,
} from "../services/googleReviewsService";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// Official Google Multi-color G Icon
export const GoogleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

// Google Star Rating Component
export const GoogleStars = ({ rating = 5, size = 16 }: { rating?: number; size?: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={
          star <= rating
            ? "fill-[#F4B400] text-[#F4B400]"
            : "fill-slate-200 text-slate-300"
        }
      />
    ))}
  </div>
);

// Dynamic Google avatar palette based on name initial
const getAvatarColor = (initial: string) => {
  const colors = [
    "bg-[#1A73E8]", // Google Blue
    "bg-[#D93025]", // Google Red
    "bg-[#1E8E3E]", // Google Green
    "bg-[#E37400]", // Google Amber
    "bg-[#9334E6]", // Google Purple
    "bg-[#007B83]", // Google Teal
    "bg-[#C2185B]", // Google Pink
    "bg-[#49599A]", // Google Indigo
  ];
  const charCode = initial.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

interface GoogleReviewsSliderProps {
  className?: string;
  autoplayIntervalMs?: number;
  showGoogleActionButtons?: boolean;
}

export const GoogleReviewsSlider = memo(({
  className = "",
  autoplayIntervalMs = 6000,
  showGoogleActionButtons = true,
}: GoogleReviewsSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNearViewport = useIntersectionObserver(containerRef, {
    rootMargin: "350px",
    freezeOnceVisible: true,
  });

  const [reviewsData, setReviewsData] = useState<GoogleReviewsResponse>({
    success: true,
    source: "verified_google_store",
    placeName: "Gotrek Travels",
    rating: 4.7,
    totalReviews: 230,
    reviews: VERIFIED_FALLBACK_REVIEWS,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch reviews using the cached service when approaching viewport
  useEffect(() => {
    if (!isNearViewport) return;

    let isMounted = true;
    setIsRefreshing(true);

    fetchGoogleReviews({ forceRefresh: true })
      .then((data) => {
        if (isMounted) {
          if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
            setReviewsData(data);
          }
          setIsRefreshing(false);
        }
      })
      .catch((err) => {
        console.warn("[GoogleReviewsSlider] Service fetch error:", err);
        if (isMounted) setIsRefreshing(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isNearViewport]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchGoogleReviews({ forceRefresh: true })
      .then((data) => {
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsData(data);
        }
      })
      .finally(() => setIsRefreshing(false));
  };

  const reviews = reviewsData?.reviews || [];
  const total = reviews.length;

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer with pause on hover/interaction
  useEffect(() => {
    if (!isNearViewport || isPaused || total <= 1 || isLoading) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayIntervalMs);

    return () => clearInterval(interval);
  }, [isNearViewport, isPaused, total, isLoading, autoplayIntervalMs, handleNext]);

  const currentReview = reviews[currentIndex] || reviews[0];

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const googleRating = reviewsData?.rating || 4.7;
  const totalReviewsCount = reviewsData?.totalReviews || 230;

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* 1. Header: Trip to Temples Style Google Trust Badge */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
          <GoogleIcon className="w-4 h-4" />
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            Google Customer Reviews
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Loved by <span className="text-[#C91D24]">Pilgrims Across India</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="text-base text-amber-600 font-extrabold">{googleRating.toFixed(1)}</span>
            <GoogleStars rating={5} size={16} />
          </div>
          <span className="text-slate-300">•</span>
          <span className="font-semibold text-slate-700">
            {totalReviewsCount.toLocaleString()}+ Verified Ratings on Google Maps
          </span>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-amber-800 bg-white hover:bg-amber-50 border border-slate-200 px-2.5 py-0.5 rounded-full transition-all cursor-pointer shadow-2xs"
            title="Fetch real-time reviews directly from Google Places API"
          >
            <RefreshCw size={11} className={isRefreshing ? "animate-spin text-amber-600" : ""} />
            <span>{isRefreshing ? "Updating..." : "Live Google Sync"}</span>
          </button>
        </div>
      </div>

      {/* 2. Fast-Loading Slider Card (Trip to Temples Style, One-by-One) */}
      <div
        className="relative max-w-2xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Card Container with fixed min-height for zero layout shift (CLS = 0) */}
        <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center">
          {isLoading || !currentReview ? (
            /* Lightweight Skeleton Card */
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl shadow-amber-900/5 space-y-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-36 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentReview.id || currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl shadow-amber-900/5 relative overflow-hidden flex flex-col justify-between space-y-4 select-none"
              >
                {/* Large Subtle Google Watermark */}
                <div className="absolute top-4 right-4 opacity-5 pointer-events-none select-none">
                  <GoogleIcon className="w-28 h-28" />
                </div>

                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    {currentReview.avatar ? (
                      <img
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full ${getAvatarColor(
                          currentReview.initial || currentReview.name.charAt(0)
                        )} text-white font-bold text-base flex items-center justify-center shadow-md ring-2 ring-white`}
                      >
                        {currentReview.initial || currentReview.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {currentReview.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200/80">
                          <CheckCircle2 size={11} className="text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                        {currentReview.location && (
                          <span>{currentReview.location}</span>
                        )}
                        {currentReview.isLocalGuide && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-amber-800 font-semibold flex items-center gap-1">
                              <GoogleIcon className="w-2.5 h-2.5" />
                              <span>Local Guide</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating & Relative Time */}
                  <div className="text-right shrink-0">
                    <GoogleStars rating={currentReview.rating || 5} size={15} />
                    <span className="text-[11px] text-slate-400 block mt-1 font-medium">
                      {currentReview.relativeTime || currentReview.date || "Verified"}
                    </span>
                  </div>
                </div>

                {/* Sacred Circuit Tag */}
                {currentReview.yatraPackage && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#C91D24] font-bold">
                    <Sparkles size={12} className="text-[#C91D24] shrink-0" />
                    <span className="truncate">{currentReview.yatraPackage}</span>
                  </div>
                )}

                {/* Review Quote Text */}
                <div className="relative z-10">
                  <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed italic line-clamp-4 sm:line-clamp-none">
                    &ldquo;{currentReview.text}&rdquo;
                  </p>
                </div>

                {/* Owner Response Box (if present) */}
                {currentReview.ownerResponse && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-900 text-[11px]">
                      <span>{currentReview.ownerResponse.author}</span>
                      <span className="text-[10px] text-amber-700 font-normal">
                        • {currentReview.ownerResponse.date}
                      </span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      {currentReview.ownerResponse.text}
                    </p>
                  </div>
                )}

                {/* Card Footer: Helpful Reaction + Verified Google Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => handleLike(currentReview.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      likedMap[currentReview.id]
                        ? "bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-2xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <ThumbsUp size={13} className={likedMap[currentReview.id] ? "fill-blue-600" : ""} />
                    <span>Helpful ({currentReview.likesCount ? currentReview.likesCount + (likedMap[currentReview.id] ? 1 : 0) : 12})</span>
                  </button>

                  <a
                    href="https://maps.google.com/?q=GoTrek+Travels+Dharchula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <span>View original on Google</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* 3. Slider Controls: Circular Prev/Next Arrows + Expandable Indicator Pills + Autoplay Toggle */}
        <div className="flex items-center justify-between pt-5 px-2">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer hover:border-amber-400"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Center Indicator Dots (Trip to Temples Expandable Active Pill) */}
          <div className="flex items-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-7 sm:w-8 h-2 bg-[#C91D24] shadow-xs"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer hover:border-amber-400"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 4. Secondary Controls: Autoplay Pause/Play & Direct Review Link */}
        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-slate-500">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 font-medium transition-colors cursor-pointer text-[11px]"
            title={isPaused ? "Resume autoplay" : "Pause autoplay"}
          >
            {isPaused ? <Play size={11} className="fill-slate-700" /> : <Pause size={11} className="fill-slate-700" />}
            <span>{isPaused ? "Resume Slides" : "Pause"}</span>
          </button>

          {showGoogleActionButtons && (
            <a
              href="https://g.page/r/CRMBICRA01wjEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C91D24] hover:text-[#b0181e] hover:underline cursor-pointer"
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Write a Review on Google</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

GoogleReviewsSlider.displayName = "GoogleReviewsSlider";
