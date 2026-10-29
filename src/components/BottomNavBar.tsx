import React from "react";
import { Home, Compass, MapPin, BookOpen, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface BottomNavBarProps {
  activeTab?: string;
  onGoHome?: () => void;
  onOpenExplore?: () => void;
  onOpenInquiry?: (dest?: string) => void;
  onOpenBlogs?: () => void;
  onOpenProfile?: () => void;
  onOpenAiConsultant?: () => void;
  onOpenSearch?: () => void;
  currentCircuit?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = "home",
  onGoHome,
  onOpenExplore,
  onOpenInquiry,
  onOpenBlogs,
  onOpenProfile,
  currentCircuit,
}) => {
  const { t } = useLanguage();

  return (
    <>
      <nav
        id="mobile-bottom-navigation-bar"
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] pt-1 pb-[calc(env(safe-area-inset-bottom,0px)+6px)] px-1 sm:px-3 md:hidden select-none"
      >
        <div className="max-w-md mx-auto flex items-center justify-between relative">
          
          {/* 1. Home Button */}
          <button
            id="btn-mobile-nav-home"
            onClick={() => {
              if (onGoHome) onGoHome();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-all active:scale-95 cursor-pointer ${
              activeTab === "home" ? "text-[#C91D24] font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            aria-label={t("nav.home", "Home")}
          >
            <div className="relative">
              <Home size={19} className={activeTab === "home" ? "stroke-[2.5]" : "stroke-2"} />
              {activeTab === "home" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C91D24] rounded-full" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">{t("nav.home", "Home")}</span>
          </button>

          {/* 2. Explore Button */}
          <button
            id="btn-mobile-nav-explore"
            onClick={() => {
              if (onOpenExplore) onOpenExplore();
              const elem = document.getElementById("packages") || document.getElementById("categories-grid");
              if (elem) elem.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-all active:scale-95 cursor-pointer ${
              activeTab === "explore" ? "text-[#C91D24] font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            aria-label={t("nav.destinations", "Explore")}
          >
            <div className="relative">
              <Compass size={19} className={activeTab === "explore" ? "stroke-[2.5]" : "stroke-2"} />
              {activeTab === "explore" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C91D24] rounded-full" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">{t("nav.destinations", "Explore")}</span>
          </button>

          {/* 3. Elevated Floating Center Red Button (Book 2027) */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-5">
            <button
              id="btn-mobile-nav-book-center"
              onClick={() => {
                if (onOpenInquiry) onOpenInquiry("Adi Kailash & Om Parvat 2027");
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#B71C1C] via-[#C91D24] to-[#E53935] text-white shadow-lg shadow-red-600/40 border-3 border-white flex items-center justify-center hover:scale-105 active:scale-90 transition-transform cursor-pointer group"
              title={t("nav.bookNow", "Book 2027")}
              aria-label={t("nav.bookNow", "Book 2027")}
            >
              <MapPin size={21} className="text-white fill-white/20 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[9px] font-black text-[#C91D24] mt-0.5 tracking-tight uppercase">{t("nav.bookNow", "Book 2027")}</span>
          </div>


          {/* 5. Blogs & Guides Button */}
          <button
            id="btn-mobile-nav-blogs"
            onClick={() => {
              if (onOpenBlogs) onOpenBlogs();
            }}
            className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-all active:scale-95 cursor-pointer ${
              activeTab === "blogs" ? "text-[#C91D24] font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            aria-label={t("nav.guides", "Guides")}
          >
            <div className="relative">
              <BookOpen size={19} className={activeTab === "blogs" ? "stroke-[2.5]" : "stroke-2"} />
              {activeTab === "blogs" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C91D24] rounded-full" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">{t("nav.guides", "Guides")}</span>
          </button>

          {/* 6. Profile / Account Button */}
          <button
            id="btn-mobile-nav-profile"
            onClick={() => {
              if (onOpenProfile) onOpenProfile();
            }}
            className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-all active:scale-95 cursor-pointer ${
              activeTab === "profile" ? "text-[#C91D24] font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
            aria-label={t("nav.profile", "Profile")}
          >
            <div className="relative">
              <User size={19} className={activeTab === "profile" ? "stroke-[2.5]" : "stroke-2"} />
              {activeTab === "profile" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C91D24] rounded-full" />
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5">{t("nav.profile", "Profile")}</span>
          </button>
        </div>
      </nav>
    </>
  );
};

