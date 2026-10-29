import React from 'react';
import { motion } from 'motion/react';

interface OmLightSymbolProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'watermark';
  className?: string;
  glowColor?: 'amber' | 'gold' | 'white' | 'warm';
  showRays?: boolean;
  animated?: boolean;
}

export const OmLightSymbol: React.FC<OmLightSymbolProps> = ({
  size = 'md',
  className = '',
  glowColor = 'gold',
  showRays = true,
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-32 h-32 text-6xl',
    hero: 'w-44 h-44 sm:w-56 sm:h-56 text-8xl sm:text-[110px]',
    watermark: 'w-72 h-72 sm:w-[450px] sm:h-[450px] text-[180px] sm:text-[300px]',
  };

  const glowStyles = {
    gold: {
      aura: 'from-amber-400/40 via-amber-500/20 to-transparent',
      text: 'from-amber-100 via-amber-300 to-amber-500',
      dropShadow: 'drop-shadow-[0_0_25px_rgba(245,158,11,0.65)]',
      borderGlow: 'border-amber-400/30',
    },
    amber: {
      aura: 'from-amber-500/45 via-orange-500/25 to-transparent',
      text: 'from-amber-200 via-amber-400 to-amber-600',
      dropShadow: 'drop-shadow-[0_0_30px_rgba(217,119,6,0.7)]',
      borderGlow: 'border-amber-500/40',
    },
    white: {
      aura: 'from-white/50 via-amber-100/20 to-transparent',
      text: 'from-white via-amber-100 to-amber-200',
      dropShadow: 'drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]',
      borderGlow: 'border-white/40',
    },
    warm: {
      aura: 'from-orange-300/35 via-amber-400/20 to-transparent',
      text: 'from-orange-100 via-amber-200 to-amber-400',
      dropShadow: 'drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]',
      borderGlow: 'border-amber-300/30',
    },
  };

  const style = glowStyles[glowColor];

  if (size === 'watermark') {
    return (
      <div className={`pointer-events-none select-none relative flex items-center justify-center ${className}`}>
        {/* Soft Radial Ambient Light Halo */}
        <div className={`absolute inset-0 bg-radial ${style.aura} rounded-full blur-3xl opacity-60 transform scale-125`} />
        
        {/* Giant Watermark Om Symbol */}
        <span className={`font-serif font-black text-transparent bg-clip-text bg-gradient-to-b ${style.text} opacity-15 sm:opacity-20 transition-all duration-1000 transform hover:scale-105`}>
          ॐ
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Radiant Glowing Rays Background */}
      {showRays && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outer Luminous Aura Glow */}
          <div className={`absolute inset-[-20%] rounded-full bg-radial ${style.aura} blur-xl animate-pulse`} style={{ animationDuration: '4s' }} />
          
          {/* Divine Sunburst Light Rays SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full opacity-40 animate-spin-slow pointer-events-none"
            style={{ animationDuration: '30s' }}
          >
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-amber-300/40" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" className="text-amber-400/30" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 90 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={100 + 90 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2 4"
                className="text-amber-300/30"
              />
            ))}
          </svg>
        </div>
      )}

      {/* Main Om Symbol Character with Gold Light Gradient & Drop Shadow */}
      <motion.div
        initial={animated ? { scale: 0.9, opacity: 0 } : false}
        animate={animated ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center text-center leading-none"
      >
        <span className={`font-serif font-black text-transparent bg-clip-text bg-gradient-to-b ${style.text} ${style.dropShadow} tracking-normal`}>
          ॐ
        </span>
      </motion.div>
    </div>
  );
};

/* Floating Background Om Motifs for Smooth Divine Atmosphere */
interface FloatingOmBackgroundProps {
  density?: 'sparse' | 'normal' | 'rich';
  className?: string;
  isDark?: boolean;
}

export const FloatingOmBackground: React.FC<FloatingOmBackgroundProps> = ({
  density = 'normal',
  className = '',
  isDark = false,
}) => {
  const itemsCount = density === 'sparse' ? 2 : density === 'normal' ? 3 : 5;

  // Static lightweight watermark positioning for instant 60/120fps scrolling
  const omConfigs = [
    { top: '10%', left: '4%', size: 'text-7xl sm:text-9xl' },
    { top: '38%', right: '5%', size: 'text-8xl sm:text-[130px]' },
    { top: '75%', left: '6%', size: 'text-7xl sm:text-9xl' },
    { top: '50%', left: '15%', size: 'text-6xl sm:text-8xl' },
    { top: '88%', right: '10%', size: 'text-8xl sm:text-[120px]' },
  ].slice(0, itemsCount);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 select-none ${className}`}>
      {omConfigs.map((cfg, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center opacity-[0.04] sm:opacity-[0.06] select-none"
          style={{
            top: cfg.top,
            left: cfg.left,
            right: cfg.right,
          }}
        >
          <span
            className={`font-serif font-black ${cfg.size} leading-none tracking-normal ${
              isDark ? 'text-amber-300' : 'text-amber-900'
            }`}
          >
            ॐ
          </span>
        </div>
      ))}
    </div>
  );
};

/* Smooth Stone Container Card Component */
interface SmoothStoneCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'travertine' | 'darkSlate' | 'sandstone';
  showOmWatermark?: boolean;
  omPosition?: 'top-right' | 'bottom-right' | 'center';
  glowBorder?: boolean;
  onClick?: () => void;
}

export const SmoothStoneCard: React.FC<SmoothStoneCardProps> = ({
  children,
  className = '',
  variant = 'light',
  showOmWatermark = true,
  omPosition = 'top-right',
  glowBorder = true,
  onClick,
}) => {
  const variantStyles = {
    light: 'bg-gradient-to-b from-[#FAF8F5] via-[#F5F2ED] to-[#EFECE6] text-[#1E293B] border-[#E6E0D2] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)]',
    travertine: 'bg-gradient-to-b from-[#F7F4EE] via-[#EFECE4] to-[#E8E3D8] text-[#1E293B] border-[#DCD6C8] shadow-[0_12px_35px_-12px_rgba(60,50,30,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]',
    darkSlate: 'bg-gradient-to-b from-[#1C2536] via-[#141C2B] to-[#0F172A] text-slate-100 border-[#2D3A52] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]',
    sandstone: 'bg-gradient-to-b from-[#FDFBF7] via-[#F8F5EE] to-[#F1EBE0] text-[#1E293B] border-[#E3DCCB] shadow-[0_10px_30px_-10px_rgba(180,140,90,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]',
  };

  const omPosClasses = {
    'top-right': 'top-2 right-2 sm:top-4 sm:right-4',
    'bottom-right': 'bottom-2 right-2 sm:bottom-4 sm:right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${variantStyles[variant]} ${glowBorder ? 'hover:border-amber-400/50 hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.12)]' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Smooth Stone Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' h='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Subtle Glowing Corner Light Accent */}
      {glowBorder && (
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Optional Om Light Watermark in Stone */}
      {showOmWatermark && (
        <div className={`absolute ${omPosClasses[omPosition]} pointer-events-none opacity-[0.08] sm:opacity-[0.12] transition-opacity duration-300 hover:opacity-[0.2]`}>
          <span className="font-serif font-black text-6xl sm:text-8xl text-amber-900 dark:text-amber-200 select-none">
            ॐ
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* Creative Om Light Hero Header Banner */
interface OmLightHeroHeaderProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  location?: string;
  duration?: string;
  altitude?: string;
  bannerImage?: string;
  badgeText?: string;
  onBookClick?: () => void;
  onInquiryClick?: () => void;
}

export const OmLightHeroHeader: React.FC<OmLightHeroHeaderProps> = ({
  title,
  subtitle,
  tagline,
  location,
  duration,
  altitude,
  bannerImage,
  badgeText = "SACRED ABODE OF LORD SHIVA · ॐ PARVAT & ADI KAILASH 2027",
  onBookClick,
  onInquiryClick,
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#0F172A] min-h-[440px] sm:min-h-[540px] flex items-end">
      {/* Banner Background Image */}
      {bannerImage && (
        <img
          src={bannerImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105 transition-transform duration-1000 brightness-90"
        />
      )}

      {/* Dark Stone & Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />

      {/* Floating Glowing Sacred Om Light Motif in Sky */}
      <div className="absolute top-6 right-6 sm:top-12 sm:right-16 pointer-events-none z-10">
        <OmLightSymbol size="hero" glowColor="gold" animated={true} />
      </div>

      {/* Smooth Stone Bottom Curved Frame */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-10 pt-20 space-y-4">
        {/* Sacred Badge with Glowing Om */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-amber-200 text-[11px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.25)]">
          <span className="font-serif font-black text-amber-400 text-sm">ॐ</span>
          <span>{badgeText}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
          {title}
        </h1>

        {/* Tagline / Subtitle */}
        {(tagline || subtitle) && (
          <p className="text-base sm:text-xl font-medium text-amber-100/90 max-w-3xl leading-relaxed drop-shadow-xs">
            {tagline || subtitle}
          </p>
        )}

        {/* Key Attributes Pills in Smooth Stone Styling */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {location && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5">
              <span>📍 {location}</span>
            </div>
          )}
          {duration && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-200 flex items-center gap-1.5">
              <span>⏱️ {duration}</span>
            </div>
          )}
          {altitude && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
              <span>⛰️ Max Altitude: {altitude}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
