import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  ThumbsUp,
  Pause,
  Play,
  Quote,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { REVIEWS, FAQS } from "../data/mockData";
import { Review } from "../types";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

// Official Google Multi-color G Icon
const GoogleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
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
const GoogleStars = ({ rating = 5, size = 16 }: { rating?: number; size?: number }) => (
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

// Dynamic Google avatar palette
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
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: "easeOut" as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const,
    },
  }),
};

export const ReviewsFaq = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isNearViewport = useIntersectionObserver(sectionRef, {
    rootMargin: "300px",
    freezeOnceVisible: true,
  });

  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [googleRating, setGoogleRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(3850);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  // Fetch real Google Place reviews ONLY when section approaches viewport
  useEffect(() => {
    if (!isNearViewport) return;

    let isMounted = true;
    fetch("/api/google-reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
        if (data.rating) setGoogleRating(data.rating);
        if (data.totalReviews) setTotalReviews(data.totalReviews);
      })
      .catch((err) => {
        console.warn("Google reviews fetch completed with local fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [isNearViewport]);

  const total = reviews.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic sliding timer - starts ONLY when in/near viewport
  useEffect(() => {
    if (!isNearViewport || isPaused || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(interval);
  }, [isNearViewport, isPaused, total, handleNext]);

  const currentReview = reviews[currentIndex] || reviews[0];

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] border-t border-b border-amber-100/80 min-h-[580px]"
    >
      {!isNearViewport ? (
        <div className="max-w-4xl mx-auto space-y-12 animate-pulse" aria-hidden="true">
          {/* Skeleton Header */}
          <div className="text-center space-y-3">
            <div className="h-6 w-48 bg-stone-200/80 rounded-full mx-auto" />
            <div className="h-9 w-72 sm:w-96 bg-stone-200/80 rounded-xl mx-auto" />
            <div className="h-4 w-60 bg-stone-200/60 rounded mx-auto" />
          </div>

          {/* Skeleton Review Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md min-h-[320px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-stone-200" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-stone-200 rounded" />
                  <div className="h-3 w-24 bg-stone-200/70 rounded" />
                </div>
              </div>
              <div className="h-4 w-24 bg-stone-200 rounded" />
            </div>
            <div className="h-4 w-36 bg-amber-100 rounded" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-stone-100 rounded" />
              <div className="h-4 w-5/6 bg-stone-100 rounded" />
              <div className="h-4 w-2/3 bg-stone-100 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header: Verified Google Reviews Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <GoogleIcon className="w-4 h-4" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Google Customer Reviews
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Loved by <span className="text-[#C91D24]">Pilgrims Across India</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="text-base text-amber-600 font-extrabold">{googleRating.toFixed(1)}</span>
              <GoogleStars rating={5} size={16} />
            </div>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-slate-700">
              {totalReviews.toLocaleString()}+ Verified Ratings on Google Maps
            </span>
          </div>
        </div>

        {/* ONE-BY-ONE SLIDING GOOGLE REVIEW CAROUSEL */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Main Slide Card Container with fixed min-height for zero layout shift */}
          <div className="relative min-h-[340px] sm:min-h-[310px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentReview.id || currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl shadow-amber-900/5 relative overflow-hidden flex flex-col justify-between space-y-5"
              >
                {/* Large Subtle Google Watermark */}
                <div className="absolute top-4 right-4 opacity-10 pointer-events-none select-none">
                  <GoogleIcon className="w-24 h-24" />
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

                {/* Review Text */}
                <div className="relative z-10">
                  <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed italic line-clamp-4 sm:line-clamp-none">
                    "{currentReview.text}"
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

                {/* Bottom Footer of Card: Thumbs Up & Google Source */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleLike(currentReview.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                      likedMap[currentReview.id]
                        ? "bg-amber-100 text-amber-900"
                        : "bg-stone-100 hover:bg-stone-200 text-slate-700"
                    }`}
                  >
                    <ThumbsUp
                      size={12}
                      className={likedMap[currentReview.id] ? "fill-amber-700 text-amber-700" : ""}
                    />
                    <span>
                      Helpful (
                      {(currentReview.likesCount || 12) + (likedMap[currentReview.id] ? 1 : 0)})
                    </span>
                  </button>

                  <a
                    href="https://g.page/r/gotrektravels-pithoragarh/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View on Google</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Prev / Next buttons */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Google review"
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-slate-800 flex items-center justify-center border border-stone-200 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slider Dots & Progress */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 font-semibold mr-1">
                {currentIndex + 1} / {total}
              </span>

              <div className="flex items-center gap-1.5">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 h-2 bg-[#C91D24]"
                        : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>

              {/* Pause/Play Toggle */}
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                title={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
                aria-label={isPaused ? "Resume auto-slide" : "Pause auto-slide"}
                className="ml-2 w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPaused ? <Play size={11} className="ml-0.5" /> : <Pause size={11} />}
              </button>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Google review"
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 text-slate-800 flex items-center justify-center border border-stone-200 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Bottom Action: Write a Review on Google CTA */}
          <div className="text-center mt-6">
            <a
              href="https://g.page/r/gotrektravels-pithoragarh/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-slate-300 text-slate-800 text-xs font-bold shadow-xs hover:shadow-md transition-all group"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Write a Review on Google</span>
              <ExternalLink size={12} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* COMPACT PILGRIM FAQS ACCORDION */}
        <div className="pt-10 border-t border-stone-200/90 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <HelpCircle size={14} />
              <span>Yatra FAQs & Clearances</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Essential guidelines on SDM Dharchula permits, 4x4 Boleros, and altitude safety.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-2.5">
            {FAQS.slice(0, 5).map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-amber-300 shadow-sm"
                      : "border-stone-200/80 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-amber-700 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="px-4 sm:px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      )}
    </section>
  );
});

ReviewsFaq.displayName = "ReviewsFaq";
