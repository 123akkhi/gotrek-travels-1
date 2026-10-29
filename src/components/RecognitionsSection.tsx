import React from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";

export const UttarakhandTourismLogo: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => (
  <svg viewBox="0 0 160 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mountains swoosh */}
    <path d="M40 50 C55 25, 75 18, 95 32 C110 42, 125 30, 138 20" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
    <path d="M48 55 C62 33, 80 26, 100 38 C115 48, 128 38, 142 28" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M56 60 C70 42, 85 36, 104 46 C116 54, 128 46, 145 36" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
    <text x="80" y="68" textAnchor="middle" fill="#0F172A" fontSize="10.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.05em">
      Uttarakhand
    </text>
    <text x="80" y="78" textAnchor="middle" fill="#0284C7" fontSize="7" fontWeight="700" letterSpacing="0.15em">
      TOURISM
    </text>
  </svg>
);

export const MsmeLogo: React.FC<{ className?: string }> = ({ className = "h-9 w-auto" }) => (
  <svg viewBox="0 0 160 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="10" width="110" height="42" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
    {/* Ashok Chakra Emblem Symbol */}
    <circle cx="45" cy="31" r="12" stroke="#1E3A8A" strokeWidth="1.5" fill="#EFF6FF" />
    <circle cx="45" cy="31" r="3" fill="#1E3A8A" />
    <path d="M45 19 L45 43 M33 31 L57 31 M37 23 L53 39 M37 39 L53 23" stroke="#1E3A8A" strokeWidth="1" />
    <text x="65" y="29" fill="#1E293B" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.08em">
      MSME
    </text>
    <text x="65" y="42" fill="#64748B" fontSize="6.5" fontWeight="700" letterSpacing="0.05em">
      Ministry of MSME, Govt. of India
    </text>
  </svg>
);

export const NidhiLogo: React.FC<{ className?: string }> = ({ className = "h-9 w-auto" }) => (
  <svg viewBox="0 0 150 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="10" width="110" height="42" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
    <circle cx="42" cy="31" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
    <path d="M42 24 L42 38 M35 31 L49 31" stroke="#0284C7" strokeWidth="1.5" />
    <text x="60" y="32" fill="#0369A1" fontSize="15" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.05em">
      nidhi
    </text>
    <text x="60" y="43" fill="#64748B" fontSize="6.5" fontWeight="600">
      Ministry of Tourism
    </text>
  </svg>
);

export const TripadvisorLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tripadvisor Owl Eyes Logo */}
    <g transform="translate(10, 8)">
      <circle cx="20" cy="22" r="12" fill="none" stroke="#00AA6C" strokeWidth="2.5" />
      <circle cx="44" cy="22" r="12" fill="none" stroke="#00AA6C" strokeWidth="2.5" />
      <circle cx="20" cy="22" r="6" fill="#000000" />
      <circle cx="44" cy="22" r="6" fill="#000000" />
      <circle cx="22" cy="20" r="2" fill="#FFFFFF" />
      <circle cx="46" cy="20" r="2" fill="#FFFFFF" />
      <path d="M32 22 L32 28 L27 25 Z" fill="#00AA6C" />
      <path d="M32 22 L32 28 L37 25 Z" fill="#00AA6C" />
      <path d="M12 12 C18 6, 26 8, 32 14 C38 8, 46 6, 52 12" stroke="#00AA6C" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <text x="76" y="32" fill="#000000" fontSize="13" fontWeight="800" fontFamily="sans-serif">
      Tripadvisor
    </text>
  </svg>
);

export const GstLogo: React.FC<{ className?: string }> = ({ className = "h-9 w-auto" }) => (
  <svg viewBox="0 0 160 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="10" width="110" height="44" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
    {/* GST Document icon */}
    <rect x="36" y="18" width="20" height="26" rx="2" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5" />
    <path d="M40 24 L52 24 M40 28 L50 28 M40 32 L48 32 M40 36 L46 36" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="53" cy="35" r="5.5" fill="#FFFFFF" stroke="#16A34A" strokeWidth="1.5" />
    <path d="M51 35 L52.5 36.5 L55.5 33.5" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="64" y="29" fill="#1E293B" fontSize="11" fontWeight="800" fontFamily="sans-serif">
      GST Verified
    </text>
    <text x="64" y="41" fill="#16A34A" fontSize="7" fontWeight="700" letterSpacing="0.05em">
      Govt. of India Tax Portal
    </text>
  </svg>
);

export interface RecognitionItem {
  id: string;
  title: string;
  code: string;
  statusText: string;
  statusType: "recognized" | "govt_regd" | "verified" | "profile" | "active";
  logo: React.ReactNode;
  link?: string;
}

export const RECOGNITIONS_DATA: RecognitionItem[] = [
  {
    id: "uttarakhand-tourism",
    title: "Uttarakhand Tourism",
    code: "UTTR/PITHORAGARH/04-2026/450066",
    statusText: "Recognized",
    statusType: "recognized",
    logo: <UttarakhandTourismLogo className="h-10 w-auto" />,
  },
  {
    id: "msme-india",
    title: "MSME India",
    code: "UDYAM-UK-09-0011014",
    statusText: "Govt. Regd",
    statusType: "govt_regd",
    logo: <MsmeLogo className="h-9 w-auto" />,
  },
  {
    id: "nidhi-portal",
    title: "Nidhi Portal",
    code: "EUK000366",
    statusText: "Verified",
    statusType: "verified",
    logo: <NidhiLogo className="h-9 w-auto" />,
  },
  {
    id: "tripadvisor",
    title: "Tripadvisor",
    code: "Traveller's Choice",
    statusText: "View Profile",
    statusType: "profile",
    logo: <TripadvisorLogo className="h-8 w-auto" />,
    link: "https://www.tripadvisor.in",
  },
  {
    id: "gst-verified",
    title: "GST Verified",
    code: "05CEQPB8319P1ZX",
    statusText: "Active",
    statusType: "active",
    logo: <GstLogo className="h-9 w-auto" />,
  },
];

interface RecognitionsSectionProps {
  className?: string;
  isDark?: boolean;
}

export const RecognitionsSection: React.FC<RecognitionsSectionProps> = ({
  className = "",
  isDark = true,
}) => {
  return (
    <section className={`w-full py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <h3
            className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Our <span className="text-[#D97706] font-serif">Recognitions & Partners</span>
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Recognized by trusted institutions and partnered with leading travel platforms to deliver safe, reliable pilgrimage journeys.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {RECOGNITIONS_DATA.map((item) => {
            const isLink = Boolean(item.link);
            const CardWrapper = isLink ? "a" : "div";
            const linkProps = isLink
              ? {
                  href: item.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardWrapper
                key={item.id}
                {...linkProps}
                className={`flex flex-col items-center justify-between text-center p-5 rounded-2xl transition-all duration-300 bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 group ${
                  isLink ? "cursor-pointer" : ""
                }`}
              >
                {/* Logo Area */}
                <div className="h-14 flex items-center justify-center mb-3">
                  {item.logo}
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-900 mb-2.5 font-sans tracking-tight">
                  {item.title}
                </h4>

                {/* Registration Code Badge Pill */}
                <div className="w-full my-auto py-1 px-1">
                  <div className="w-full px-2.5 py-1.5 rounded-xl bg-[#FFF9E6] border border-[#F59E0B]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center">
                    <span className="text-[11px] sm:text-[11.5px] font-mono font-extrabold text-[#1E293B] tracking-tight leading-tight select-all break-all sm:break-words">
                      {item.code}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold">
                  {item.statusType === "profile" ? (
                    <span className="text-[#D97706] group-hover:text-amber-800 flex items-center gap-1 transition-colors">
                      <ExternalLink size={13} />
                      <span>{item.statusText}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>{item.statusText}</span>
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RecognitionsSection;
