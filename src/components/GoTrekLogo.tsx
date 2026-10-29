import React, { useState } from "react";
import logoImg from "../assets/images/gotrek_logo_1786204072890.jpg";

interface GoTrekLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  showText?: boolean;
}

export const GoTrekLogo: React.FC<GoTrekLogoProps> = ({
  className = "",
  size = "md",
  showText = false,
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  // Prioritize imported Vite asset first for reliable bundled URL, then public static root fallback
  const sources = [logoImg, "/logo.jpg", "/images/logo.jpg"];

  const sizeMap: Record<string, string> = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
    custom: "",
  };

  const logoDimension = className || sizeMap[size] || sizeMap.md;

  const handleImgError = () => {
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex(currentSrcIndex + 1);
    } else {
      setCurrentSrcIndex(99); // Trigger SVG vector fallback
    }
  };

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${logoDimension} ring-1.5 ring-amber-400/80 bg-white shadow-sm flex items-center justify-center`}
      >
        {currentSrcIndex < sources.length ? (
          <img
            src={sources[currentSrcIndex]}
            alt="GoTrek Travels Official Emblem"
            onError={handleImgError}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center rounded-full select-none"
            style={{
              imageRendering: "auto",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full object-contain rounded-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer golden circular badge */}
            <circle cx="100" cy="100" r="98" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
            <circle cx="100" cy="100" r="90" fill="#FEF3C7" />
            
            {/* Sun Rays */}
            <circle cx="100" cy="72" r="32" fill="#FDE68A" opacity="0.8" />
            <circle cx="100" cy="72" r="22" fill="#F59E0B" opacity="0.3" />
            
            {/* Sacred Himalayan Mountain Peaks */}
            <polygon points="30,140 75,68 120,140" fill="#0369A1" />
            <polygon points="75,140 120,52 165,140" fill="#0F766E" />
            <polygon points="120,52 120,140 165,140" fill="#115E59" />
            
            {/* Snow Caps */}
            <polygon points="120,52 108,74 120,68 132,74" fill="#FFFFFF" />
            <polygon points="75,68 66,85 75,80 84,85" fill="#FFFFFF" />
            
            {/* River flow */}
            <path d="M40,140 Q100,128 160,140 L160,152 Q100,140 40,152 Z" fill="#38BDF8" opacity="0.9" />

            {/* Brand Banner Plate */}
            <rect x="24" y="146" width="152" height="34" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="100" y="164" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
              GOTREK
            </text>
            <text x="100" y="176" textAnchor="middle" fill="#FBBF24" fontSize="8.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="2.5">
              TRAVELS
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col justify-center select-none text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
              GOTREK
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm">
              2027
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.22em] text-amber-400 uppercase leading-none mt-1">
            TRAVELS
          </span>
          <span className="text-[9px] text-amber-200/90 font-bold uppercase tracking-wider mt-0.5">
            Official Adi Kailash & Om Parvat Yatra
          </span>
        </div>
      )}
    </div>
  );
};





