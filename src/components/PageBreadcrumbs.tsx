import React, { useState } from 'react';
import { Home, ChevronRight, ArrowLeft, Phone, ShieldCheck, Share2, Check, Sparkles } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
  backLabel?: string;
  badge?: string;
  badgeType?: 'gold' | 'emerald' | 'sky';
  showShare?: boolean;
  className?: string;
}

export const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({
  items,
  onBack,
  backLabel = 'Back',
  badge,
  badgeType = 'gold',
  showShare = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const badgeClasses = {
    gold: 'bg-amber-500/15 text-amber-900 border-amber-400/40',
    emerald: 'bg-emerald-500/15 text-emerald-900 border-emerald-400/40',
    sky: 'bg-sky-500/15 text-sky-900 border-sky-400/40',
  }[badgeType];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Structured JSON-LD BreadcrumbList for Search Engines (Google, Bing)
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href 
        ? (item.href.startsWith('http') ? item.href : `https://gotrektravels.com${item.href}`)
        : `https://gotrektravels.com/#${item.label.toLowerCase().replace(/\s+/g, '-')}`,
    })),
  };

  return (
    <>
      {/* Search Engine Crawler JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <nav
        aria-label="Breadcrumb"
        className={`w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5D9] px-4 sm:px-6 lg:px-8 py-2.5 transition-all shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] select-none ${className}`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Back Button & Structured Microdata Trail */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200/80 font-bold transition-all shadow-2xs hover:shadow-xs shrink-0 cursor-pointer text-xs active:scale-95"
                title="Go back to previous page"
              >
                <ArrowLeft size={13} className="text-amber-600" />
                <span>{backLabel}</span>
              </button>
            )}

            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              className="flex items-center gap-1.5 text-slate-500 whitespace-nowrap"
            >
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isFirst = index === 0;

                return (
                  <li
                    key={index}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center gap-1.5"
                  >
                    {index > 0 && (
                      <ChevronRight size={12} className="text-slate-400 shrink-0 select-none" />
                    )}

                    <meta itemProp="position" content={`${index + 1}`} />

                    {item.onClick && !isLast ? (
                      <button
                        onClick={item.onClick}
                        itemProp="item"
                        className="hover:text-amber-800 font-medium transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
                      >
                        {isFirst && <Home size={12} className="text-amber-600 mb-0.5 shrink-0" />}
                        {item.icon && <span className="shrink-0">{item.icon}</span>}
                        <span itemProp="name">{item.label}</span>
                      </button>
                    ) : item.href && !isLast ? (
                      <a
                        href={item.href}
                        itemProp="item"
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                        className="hover:text-amber-800 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {isFirst && <Home size={12} className="text-amber-600 mb-0.5 shrink-0" />}
                        {item.icon && <span className="shrink-0">{item.icon}</span>}
                        <span itemProp="name">{item.label}</span>
                      </a>
                    ) : (
                      <span
                        itemProp="name"
                        aria-current={isLast ? 'page' : undefined}
                        className={`font-semibold flex items-center gap-1 ${
                          isLast
                            ? 'text-slate-900 font-bold max-w-[180px] sm:max-w-[340px] md:max-w-[460px] truncate'
                            : 'text-slate-600'
                        }`}
                      >
                        {isFirst && <Home size={12} className="text-amber-600 mb-0.5 shrink-0" />}
                        {item.icon && <span className="shrink-0">{item.icon}</span>}
                        <span className="truncate">{item.label}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: Badge, Share, and 24/7 Helpline */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {badge && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeClasses}`}>
                <ShieldCheck size={12} className="shrink-0 text-amber-600" />
                <span>{badge}</span>
              </span>
            )}

            {showShare && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-600 hover:text-amber-800 hover:bg-amber-100/50 transition-colors border border-transparent hover:border-amber-200 cursor-pointer"
                title="Copy link to package"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={12} className="text-slate-500" />
                    <span>Share</span>
                  </>
                )}
              </button>
            )}

            <a
              href="tel:+917248285767"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-amber-700 transition-colors pl-2 border-l border-slate-200"
            >
              <Phone size={11} className="text-amber-600" />
              <span>24/7 Helpline: <strong className="font-mono text-slate-900">+91 72482 85767</strong></span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

