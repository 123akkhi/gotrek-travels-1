import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { LiveTicker } from "./components/LiveTicker";
import { HeroSlider } from "./components/HeroSlider";
import { ContentTrustBar } from "./components/ContentTrustBar";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { BottomNavBar } from "./components/BottomNavBar";
import { PageLoadingFallback } from "./components/PageLoadingFallback";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PilgrimUser } from "./types";
import { lazyWithRetry, prefetchComponent } from "./utils/lazyWithRetry";
import { SEOHead } from "./components/SEOHead";
import { SectionSkeleton } from "./components/SectionSkeleton";
import { DeferredSection } from "./components/DeferredSection";
import type { BookingReceiptData } from "./utils/receiptGenerator";

// Code-split below-the-fold homepage components for lightning-fast first paint
const DestinationsSection = lazyWithRetry(() => import("./components/DestinationsSection"), "DestinationsSection");
const Footer = lazyWithRetry(() => import("./components/Footer").then(m => ({ default: m.Footer })), "Footer");
const WhatsAppChatWidget = lazyWithRetry(() => import("./components/WhatsAppChatWidget").then(m => ({ default: m.WhatsAppChatWidget })), "WhatsAppChatWidget");
const AskLocalExpertFloatingButton = lazyWithRetry(() => import("./components/AskLocalExpertFloatingButton").then(m => ({ default: m.AskLocalExpertFloatingButton })), "AskLocalExpertFloatingButton");
const OfflineTrekBar = lazyWithRetry(() => import("./components/OfflineTrekBar").then(m => ({ default: m.OfflineTrekBar })), "OfflineTrekBar");
const YatraTiers = lazyWithRetry(() => import("./components/YatraTiers"), "YatraTiers");
const SacredTemples = lazyWithRetry(() => import("./components/SacredTemples"), "SacredTemples");
const ReviewsFaq = lazyWithRetry(() => import("./components/ReviewsFaq"), "ReviewsFaq");
const ContactSection = lazyWithRetry(() => import("./components/ContactSection"), "ContactSection");

// Code-split dynamic views with auto-retry on network/chunk errors
const DestinationDetailPage = lazyWithRetry(() => import("./components/DestinationDetailPage"), "DestinationDetailPage");
const PackageDetailPage = lazyWithRetry(() => import("./components/PackageDetailPage"), "PackageDetailPage");
const BlogDetailPage = lazyWithRetry(() => import("./components/BlogDetailPage"), "BlogDetailPage");
const BlogListingPage = lazyWithRetry(() => import("./components/BlogListingPage"), "BlogListingPage");
const SeoPageRenderer = lazyWithRetry(() => import("./components/SeoPageRenderer"), "SeoPageRenderer");
const TeamPage = lazyWithRetry(() => import("./components/TeamPage"), "TeamPage");
const CareersPage = lazyWithRetry(() => import("./components/CareersPage"), "CareersPage");
const WhatToWearPage = lazyWithRetry(() => import("./components/WhatToWearPage"), "WhatToWearPage");
const MedicalFitnessPage = lazyWithRetry(() => import("./components/MedicalFitnessPage"), "MedicalFitnessPage");
const TermsPage = lazyWithRetry(() => import("./components/TermsPage"), "TermsPage");
const PrivacyPolicyPage = lazyWithRetry(() => import("./components/PrivacyPolicyPage"), "PrivacyPolicyPage");
const AboutUsPage = lazyWithRetry(() => import("./components/AboutUsPage"), "AboutUsPage");
const ReelsPage = lazyWithRetry(() => import("./components/ReelsPage").then(m => ({ default: m.ReelsPage })), "ReelsPage");
const MemoriesPage = lazyWithRetry(() => import("./components/MemoriesPage").then(m => ({ default: m.MemoriesPage })), "MemoriesPage");
const PithoragarhFlightsPage = lazyWithRetry(() => import("./components/PithoragarhFlightsPage"), "PithoragarhFlightsPage");
const PaymentSuccessPage = lazyWithRetry(() => import("./components/PaymentSuccessPage"), "PaymentSuccessPage");
const CrmDashboard = lazyWithRetry(() => import("./components/CRM/CrmDashboard"), "CrmDashboard");

// Code-split modals with auto-retry
const InquiryModal = lazyWithRetry(() => import("./components/InquiryModal"), "InquiryModal");
const AiConsultantModal = lazyWithRetry(() => import("./components/AiConsultantModal"), "AiConsultantModal");
const WhatToWearModal = lazyWithRetry(() => import("./components/WhatToWearModal"), "WhatToWearModal");
const RazorpayCheckoutModal = lazyWithRetry(() => import("./components/RazorpayCheckoutModal"), "RazorpayCheckoutModal");
const UserAuthModal = lazyWithRetry(() => import("./components/UserAuthModal"), "UserAuthModal");
const InitialPopupModal = lazyWithRetry(() => import("./components/InitialPopupModal"), "InitialPopupModal");
const GlobalSearchModal = lazyWithRetry(() => import("./components/GlobalSearchModal"), "GlobalSearchModal");

const floatingPageVariants = {
  initial: { 
    opacity: 0, 
    y: 12
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.28, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { 
      duration: 0.16, 
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  }
};

function getInitialRouteState() {
  if (typeof window === 'undefined') {
    return {
      destinationSlug: '',
      blogSlug: '',
      packageSlug: '',
      seoSlug: '',
      isAboutUsOpen: false,
      isTeamPageOpen: false,
      isCareersPageOpen: false,
      isClothingGuideOpen: false,
      isTermsPageOpen: false,
      isPrivacyPageOpen: false,
      isReelsPageOpen: false,
      isMemoriesPageOpen: false,
      isPithoragarhFlightsOpen: false,
      isPaymentSuccessOpen: false,
      isMedicalFitnessOpen: false,
    };
  }

  const rawPath = window.location.pathname;
  if (!rawPath || rawPath === '/') {
    return {
      destinationSlug: '',
      blogSlug: '',
      packageSlug: '',
      seoSlug: '',
      isAboutUsOpen: false,
      isTeamPageOpen: false,
      isCareersPageOpen: false,
      isClothingGuideOpen: false,
      isTermsPageOpen: false,
      isPrivacyPageOpen: false,
      isReelsPageOpen: false,
      isMemoriesPageOpen: false,
      isPithoragarhFlightsOpen: false,
      isPaymentSuccessOpen: false,
      isMedicalFitnessOpen: false,
    };
  }

  const cleanPath = decodeURIComponent(rawPath)
    .trim()
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/\/$/, '');

  const state = {
    destinationSlug: '',
    blogSlug: '',
    packageSlug: '',
    seoSlug: '',
    isAboutUsOpen: false,
    isTeamPageOpen: false,
    isCareersPageOpen: false,
    isClothingGuideOpen: false,
    isTermsPageOpen: false,
    isPrivacyPageOpen: false,
    isReelsPageOpen: false,
    isMemoriesPageOpen: false,
    isPithoragarhFlightsOpen: false,
    isPaymentSuccessOpen: false,
    isMedicalFitnessOpen: false,
  };

  if (!cleanPath) return state;

  if (cleanPath.startsWith('destinations/') || cleanPath.startsWith('destination/')) {
    state.destinationSlug = cleanPath.replace(/^destinations?\//, '');
    return state;
  }
  if (cleanPath.startsWith('packages/') || cleanPath.startsWith('package/')) {
    state.packageSlug = cleanPath.replace(/^packages?\//, '');
    return state;
  }
  if (cleanPath.startsWith('blogs/') || cleanPath.startsWith('blog/')) {
    state.blogSlug = cleanPath.replace(/^blogs?\//, '');
    return state;
  }
  if (cleanPath === 'blogs' || cleanPath === 'blog') {
    state.blogSlug = 'all';
    return state;
  }
  if (cleanPath === 'about-us' || cleanPath === 'about') {
    state.isAboutUsOpen = true;
    return state;
  }
  if (cleanPath === 'team' || cleanPath === 'our-team') {
    state.isTeamPageOpen = true;
    return state;
  }
  if (cleanPath === 'careers' || cleanPath === 'jobs') {
    state.isCareersPageOpen = true;
    return state;
  }
  if (cleanPath === 'what-to-wear' || cleanPath === 'packing-list' || cleanPath === 'clothing-guide') {
    state.isClothingGuideOpen = true;
    return state;
  }
  if (cleanPath === 'terms' || cleanPath === 'terms-and-conditions') {
    state.isTermsPageOpen = true;
    return state;
  }
  if (cleanPath === 'privacy-policy' || cleanPath === 'privacy') {
    state.isPrivacyPageOpen = true;
    return state;
  }
  if (cleanPath === 'reels' || cleanPath === 'yatra-reels') {
    state.isReelsPageOpen = true;
    return state;
  }
  if (cleanPath === 'memories' || cleanPath === 'gallery' || cleanPath === 'yatra-memories') {
    state.isMemoriesPageOpen = true;
    return state;
  }
  if (
    cleanPath === 'pithoragarh-flights' ||
    cleanPath === 'flights' ||
    cleanPath === 'flights-to-pithoragarh' ||
    cleanPath === 'how-to-reach-pithoragarh' ||
    cleanPath === 'flight-details'
  ) {
    state.isPithoragarhFlightsOpen = true;
    return state;
  }
  if (
    cleanPath === 'medical-fitness' ||
    cleanPath === 'medical-pass' ||
    cleanPath === 'medical-certificate' ||
    cleanPath === 'fitness-pass' ||
    cleanPath === 'fitness'
  ) {
    state.isMedicalFitnessOpen = true;
    return state;
  }

  return state;
}

export default function App() {
  const [initialRoute] = useState(() => getInitialRouteState());
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryDestination, setInquiryDestination] = useState<string | undefined>();
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState<string>(initialRoute.destinationSlug);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(initialRoute.blogSlug);
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>(initialRoute.packageSlug);
  const [selectedSeoSlug, setSelectedSeoSlug] = useState<string>(initialRoute.seoSlug);
  const [isTeamPageOpen, setIsTeamPageOpen] = useState<boolean>(initialRoute.isTeamPageOpen);
  const [isCareersPageOpen, setIsCareersPageOpen] = useState<boolean>(initialRoute.isCareersPageOpen);
  const [isClothingGuideOpen, setIsClothingGuideOpen] = useState<boolean>(initialRoute.isClothingGuideOpen);
  const [isMedicalFitnessOpen, setIsMedicalFitnessOpen] = useState<boolean>(initialRoute.isMedicalFitnessOpen);
  const [isTermsPageOpen, setIsTermsPageOpen] = useState<boolean>(initialRoute.isTermsPageOpen);
  const [isPrivacyPageOpen, setIsPrivacyPageOpen] = useState<boolean>(initialRoute.isPrivacyPageOpen);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState<boolean>(initialRoute.isAboutUsOpen);
  const [isReelsPageOpen, setIsReelsPageOpen] = useState<boolean>(initialRoute.isReelsPageOpen);
  const [isMemoriesPageOpen, setIsMemoriesPageOpen] = useState<boolean>(initialRoute.isMemoriesPageOpen);
  const [isPithoragarhFlightsOpen, setIsPithoragarhFlightsOpen] = useState<boolean>(initialRoute.isPithoragarhFlightsOpen);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState<boolean>(initialRoute.isPaymentSuccessOpen);
  const [activeBookingReceipt, setActiveBookingReceipt] = useState<BookingReceiptData | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState<boolean>(false);
  const [razorpayPackage, setRazorpayPackage] = useState<string>("Adi Kailash & Om Parvat Yatra 2027");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isQuickPopupOpen, setIsQuickPopupOpen] = useState<boolean>(false);
  const [showFloatingWidgets, setShowFloatingWidgets] = useState<boolean>(false);

  // Defer non-critical floating widgets (WhatsApp, expert pill, offline bar) until after frame 1
  useEffect(() => {
    const timer = setTimeout(() => setShowFloatingWidgets(true), 1200);
    const handleQuickPopup = () => setIsQuickPopupOpen(true);
    window.addEventListener("open-quick-popup", handleQuickPopup);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-quick-popup", handleQuickPopup);
    };
  }, []);

  // Background Idle Pre-warmer: prewarm common modals after initial page has stabilized
  useEffect(() => {
    try {
      sessionStorage.removeItem("app_chunk_auto_reloaded");
    } catch {}

    const prewarmCommon = () => {
      // Stage 1: Critical high-traffic page views and inquiry modal (immediate idle)
      prefetchComponent(() => import("./components/DestinationDetailPage"), "DestinationDetailPage");
      prefetchComponent(() => import("./components/PackageDetailPage"), "PackageDetailPage");
      prefetchComponent(() => import("./components/InquiryModal"), "InquiryModal");

      // Stage 2: Core media and discovery pages (after 1s)
      setTimeout(() => {
        prefetchComponent(() => import("./components/BlogListingPage"), "BlogListingPage");
        prefetchComponent(() => import("./components/MemoriesPage"), "MemoriesPage");
        prefetchComponent(() => import("./components/AboutUsPage"), "AboutUsPage");
        prefetchComponent(() => import("./components/GlobalSearchModal"), "GlobalSearchModal");
      }, 1000);

      // Stage 3: Yatri utility, flight, and guide pages (after 2.5s)
      setTimeout(() => {
        prefetchComponent(() => import("./components/TeamPage"), "TeamPage");
        prefetchComponent(() => import("./components/WhatToWearPage"), "WhatToWearPage");
        prefetchComponent(() => import("./components/MedicalFitnessPage"), "MedicalFitnessPage");
        prefetchComponent(() => import("./components/PithoragarhFlightsPage"), "PithoragarhFlightsPage");
        prefetchComponent(() => import("./components/ReelsPage"), "ReelsPage");
      }, 2500);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(prewarmCommon, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback?.(id);
    } else {
      const timer = setTimeout(prewarmCommon, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Yatri Pilgrim Auth State
  const [isUserAuthOpen, setIsUserAuthOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [pilgrimUser, setPilgrimUser] = useState<PilgrimUser | null>(() => {
    try {
      const saved = localStorage.getItem('gotrek_pilgrim_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleOpenUserAuth = useCallback((tab?: 'login' | 'signup') => {
    setAuthModalTab(tab || 'login');
    setIsUserAuthOpen(true);
  }, []);

  const handleLogoutUser = useCallback(() => {
    localStorage.removeItem('gotrek_pilgrim_user');
    setPilgrimUser(null);
  }, []);

  const handleLoginSuccessUser = useCallback((user: PilgrimUser) => {
    setPilgrimUser(user);
  }, []);

  const handleOpenInquiry = useCallback((destination?: string) => {
    setInquiryDestination(destination);
    setIsInquiryOpen(true);
  }, []);

  const handleCloseInquiry = useCallback(() => {
    setIsInquiryOpen(false);
  }, []);

  const handleOpenAiConsultant = useCallback(() => {
    setIsAiConsultantOpen(true);
  }, []);

  const handleCloseAiConsultant = useCallback(() => {
    setIsAiConsultantOpen(false);
  }, []);

  const handleToggleCrm = useCallback(() => {
    setIsCrmOpen((prev) => !prev);
  }, []);

  const handleSelectDestination = useCallback((slug: string) => {
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsMedicalFitnessOpen(false);
    setSelectedDestinationSlug(slug);
    const targetPath = `/destinations/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewDetails = handleSelectDestination;

  const handleSelectBlog = useCallback((slug?: string) => {
    setSelectedDestinationSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsMedicalFitnessOpen(false);
    const cleanSlug = slug || '';
    setSelectedBlogSlug(cleanSlug);
    const targetPath = cleanSlug ? `/blogs/${cleanSlug}` : '/blogs';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectPackage = useCallback((slug?: string) => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsMedicalFitnessOpen(false);
    const chosenSlug = slug || 'adi-kailash-yatra-standard';
    setSelectedPackageSlug(chosenSlug);
    const targetPath = `/packages/${chosenSlug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsPaymentSuccessOpen(false);
    setIsMedicalFitnessOpen(false);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPaymentSuccess = useCallback((booking?: BookingReceiptData) => {
    if (booking) {
      setActiveBookingReceipt(booking);
    } else {
      // Try to load latest booking from localStorage
      try {
        const saved = localStorage.getItem('gotrek_latest_booking');
        if (saved) {
          setActiveBookingReceipt(JSON.parse(saved));
        }
      } catch {}
    }
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsRazorpayOpen(false);
    setIsMedicalFitnessOpen(false);
    setIsPaymentSuccessOpen(true);
    const targetPath = '/payment-success';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSeoPage = useCallback((slug: string) => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsPaymentSuccessOpen(false);
    setIsMedicalFitnessOpen(false);
    const validSlug = slug || 'adi-kailash-yatra-2027';
    setSelectedSeoSlug(validSlug);
    const targetPath = `/${validSlug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser back/forward buttons and direct URL visits
  useEffect(() => {
    const handleLocationSync = async () => {
      const rawPath = window.location.pathname;
      if (!rawPath || rawPath === '/') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsPithoragarhFlightsOpen(false);
        setIsMedicalFitnessOpen(false);
        return;
      }

      const cleanPath = decodeURIComponent(rawPath)
        .trim()
        .toLowerCase()
        .replace(/^\//, '')
        .replace(/\/$/, '');

      if (!cleanPath) return;

      // Match destination paths: /destinations/slug or /destination/slug
      if (cleanPath.startsWith('destinations/') || cleanPath.startsWith('destination/')) {
        const destSlug = cleanPath.replace(/^destinations?\//, '');
        if (destSlug) {
          handleSelectDestination(destSlug);
          return;
        }
      }

      // Match package paths: /packages/slug or /package/slug
      if (cleanPath.startsWith('packages/') || cleanPath.startsWith('package/')) {
        const pkgSlug = cleanPath.replace(/^packages?\//, '');
        if (pkgSlug) {
          handleSelectPackage(pkgSlug);
          return;
        }
      }

      // Match blog paths: /blogs/slug or /blog/slug or /blogs
      if (cleanPath.startsWith('blogs/') || cleanPath.startsWith('blog/')) {
        const blogSlug = cleanPath.replace(/^blogs?\//, '');
        if (blogSlug) {
          handleSelectBlog(blogSlug);
          return;
        }
      } else if (cleanPath === 'blogs' || cleanPath === 'blog') {
        handleSelectBlog('all');
        return;
      }

      // Match static informative views
      if (cleanPath === 'about-us' || cleanPath === 'about') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsAboutUsOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'team' || cleanPath === 'our-team') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsTeamPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'careers' || cleanPath === 'jobs') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsCareersPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'what-to-wear' || cleanPath === 'packing-list' || cleanPath === 'clothing-guide') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsClothingGuideOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'terms' || cleanPath === 'terms-and-conditions') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsTermsPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'privacy-policy' || cleanPath === 'privacy') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsPrivacyPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'reels' || cleanPath === 'yatra-reels') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsMemoriesPageOpen(false);
        setIsReelsPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (cleanPath === 'memories' || cleanPath === 'gallery' || cleanPath === 'yatra-memories') {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsPithoragarhFlightsOpen(false);
        setIsMemoriesPageOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (
        cleanPath === 'pithoragarh-flights' ||
        cleanPath === 'flights' ||
        cleanPath === 'flights-to-pithoragarh' ||
        cleanPath === 'how-to-reach-pithoragarh' ||
        cleanPath === 'flight-details' ||
        cleanPath === 'pithoragarh-flight-details' ||
        cleanPath === 'flights-schedule'
      ) {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsPaymentSuccessOpen(false);
        setIsMedicalFitnessOpen(false);
        setIsPithoragarhFlightsOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (
        cleanPath === 'medical-fitness' ||
        cleanPath === 'medical-pass' ||
        cleanPath === 'medical-certificate' ||
        cleanPath === 'fitness-pass' ||
        cleanPath === 'fitness' ||
        cleanPath === 'yatra-fitness' ||
        cleanPath === 'medical-form'
      ) {
        setSelectedDestinationSlug('');
        setSelectedBlogSlug('');
        setSelectedPackageSlug('');
        setSelectedSeoSlug('');
        setIsTeamPageOpen(false);
        setIsCareersPageOpen(false);
        setIsClothingGuideOpen(false);
        setIsTermsPageOpen(false);
        setIsPrivacyPageOpen(false);
        setIsAboutUsOpen(false);
        setIsReelsPageOpen(false);
        setIsMemoriesPageOpen(false);
        setIsPithoragarhFlightsOpen(false);
        setIsPaymentSuccessOpen(false);
        setIsMedicalFitnessOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Match Payment Success / Receipt confirmation views
      if (
        cleanPath === 'payment-success' ||
        cleanPath === 'payment-successful' ||
        cleanPath === 'booking-success' ||
        cleanPath === 'booking-confirmed' ||
        cleanPath === 'receipt' ||
        cleanPath === 'payment-receipt' ||
        cleanPath.startsWith('payment-success')
      ) {
        handleOpenPaymentSuccess();
        return;
      }

      // Check if direct slug matches any registered dataset asynchronously
      try {
        const [{ SEO_PAGES }, { DESTINATIONS_DATA }, { EXPEDITIONS }, { BLOG_ARTICLES }] = await Promise.all([
          import("./data/seoPagesData"),
          import("./data/destinationsData"),
          import("./data/mockData"),
          import("./data/blogsData"),
        ]);

        const matchedSeoPage = SEO_PAGES.find(p => p.slug === cleanPath || p.slug.replace(/-/g, ' ') === cleanPath.replace(/-/g, ' '));
        if (matchedSeoPage) {
          handleSelectSeoPage(matchedSeoPage.slug);
          return;
        }

        const matchedDestination = Object.values(DESTINATIONS_DATA).find(d => d.slug === cleanPath);
        if (matchedDestination) {
          handleSelectDestination(matchedDestination.slug);
          return;
        }

        const matchedExpedition = EXPEDITIONS.find(e => e.slug === cleanPath);
        if (matchedExpedition) {
          handleSelectPackage(matchedExpedition.slug);
          return;
        }

        const matchedBlog = BLOG_ARTICLES.find(b => b.slug === cleanPath);
        if (matchedBlog) {
          handleSelectBlog(matchedBlog.slug);
          return;
        }
      } catch (err) {
        console.warn("Route slug sync deferred:", err);
      }
    };

    handleLocationSync();
    window.addEventListener('popstate', handleLocationSync);
    return () => window.removeEventListener('popstate', handleLocationSync);
  }, [handleSelectSeoPage, handleSelectDestination, handleSelectPackage, handleSelectBlog]);

  // Global Keyboard Shortcut for Search (Ctrl+K, Cmd+K, /)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleOpenTeamPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsTeamPageOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenCareersPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsCareersPageOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenClothingPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsClothingGuideOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenTermsPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsTermsPageOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPrivacyPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsAboutUsOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsPrivacyPageOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenAboutUsPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsAboutUsOpen(true);
    const targetPath = '/about-us';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseAboutUsPage = useCallback(() => {
    setIsAboutUsOpen(false);
  }, []);

  const handleOpenReelsPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsReelsPageOpen(true);
    const targetPath = '/reels';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenMemoriesPage = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsMemoriesPageOpen(true);
    const targetPath = '/memories';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPithoragarhFlights = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsMedicalFitnessOpen(false);
    setIsPithoragarhFlightsOpen(true);
    const targetPath = '/pithoragarh-flights';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenMedicalFitness = useCallback(() => {
    setSelectedDestinationSlug('');
    setSelectedBlogSlug('');
    setSelectedPackageSlug('');
    setSelectedSeoSlug('');
    setIsTeamPageOpen(false);
    setIsCareersPageOpen(false);
    setIsClothingGuideOpen(false);
    setIsTermsPageOpen(false);
    setIsPrivacyPageOpen(false);
    setIsAboutUsOpen(false);
    setIsReelsPageOpen(false);
    setIsMemoriesPageOpen(false);
    setIsPithoragarhFlightsOpen(false);
    setIsPaymentSuccessOpen(false);
    setIsMedicalFitnessOpen(true);
    const targetPath = '/medical-fitness';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseMedicalFitness = useCallback(() => {
    setIsMedicalFitnessOpen(false);
    if (window.location.pathname === '/medical-fitness') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenRazorpayCheckout = useCallback((options?: { amount?: number; title?: string; packageType?: string } | string) => {
    if (typeof options === 'string') {
      setRazorpayPackage(options || "Adi Kailash Yatra 2027");
    } else if (options && typeof options === 'object') {
      setRazorpayPackage(options.title || "Adi Kailash Yatra 2027");
    } else {
      setRazorpayPackage("Adi Kailash Yatra 2027");
    }
    setIsRazorpayOpen(true);
  }, []);

  const currentActivePage = isPithoragarhFlightsOpen
    ? 'flights'
    : isMedicalFitnessOpen
    ? 'medical-fitness'
    : isReelsPageOpen
    ? 'reels'
    : isMemoriesPageOpen
    ? 'memories'
    : isAboutUsOpen
    ? 'about'
    : isTeamPageOpen
    ? 'team'
    : isCareersPageOpen
    ? 'careers'
    : isClothingGuideOpen
    ? 'clothing'
    : isTermsPageOpen
    ? 'terms'
    : isPrivacyPageOpen
    ? 'privacy'
    : selectedDestinationSlug
    ? 'destination'
    : selectedPackageSlug
    ? 'package'
    : selectedBlogSlug
    ? 'blog'
    : selectedSeoSlug
    ? 'seo'
    : 'home';

  return (
    <LanguageProvider>
      {/* Centralized Dynamic SEO Metadata & Canonical URL Manager */}
      <SEOHead
        destinationSlug={selectedDestinationSlug}
        packageSlug={selectedPackageSlug}
        blogSlug={selectedBlogSlug}
        seoSlug={selectedSeoSlug}
        isAboutUsOpen={isAboutUsOpen}
        isTeamPageOpen={isTeamPageOpen}
        isCareersPageOpen={isCareersPageOpen}
        isTermsPageOpen={isTermsPageOpen}
        isPrivacyPageOpen={isPrivacyPageOpen}
        isReelsPageOpen={isReelsPageOpen}
        isMemoriesPageOpen={isMemoriesPageOpen}
        isClothingGuideOpen={isClothingGuideOpen}
        isPithoragarhFlightsOpen={isPithoragarhFlightsOpen}
        isMedicalFitnessOpen={isMedicalFitnessOpen}
      />

      <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased selection:bg-amber-200 selection:text-amber-900">
        {/* Scroll Depth Progress Indicator */}
        <ScrollProgressBar />

        {/* 1. Top Live Ticker (GPU accelerated marquee) */}
        <LiveTicker />

        {/* 2. Optimized Navbar */}
        <Navbar
          onOpenInquiry={handleOpenInquiry}
          onOpenAiConsultant={handleOpenAiConsultant}
          onToggleCrm={handleToggleCrm}
          isCrmActive={isCrmOpen}
          currentUser={pilgrimUser}
          onOpenUserAuth={handleOpenUserAuth}
          onLogoutUser={handleLogoutUser}
          onOpenClothingGuide={handleOpenClothingPage}
          onGoHome={handleGoHome}
          onSelectDestination={(slug) => {
            setSelectedBlogSlug('');
            setSelectedPackageSlug('');
            setSelectedSeoSlug('');
            setIsReelsPageOpen(false);
            setIsMemoriesPageOpen(false);
            setSelectedDestinationSlug(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectBlog={handleSelectBlog}
          onSelectPackage={handleSelectPackage}
          onSelectSeoPage={handleSelectSeoPage}
          onOpenTeamPage={handleOpenTeamPage}
          onOpenCareersPage={handleOpenCareersPage}
          onOpenAboutUsPage={handleOpenAboutUsPage}
          onOpenReelsPage={handleOpenReelsPage}
          onOpenMemoriesPage={handleOpenMemoriesPage}
          onSelectPithoragarhFlights={handleOpenPithoragarhFlights}
          onOpenMedicalFitness={handleOpenMedicalFitness}
          onOpenSearch={() => setIsSearchOpen(true)}
          activePage={currentActivePage}
        />

        {/* Conditional rendering based on active view with Suspense and smooth floating page transitions */}
        <ErrorBoundary onReset={handleGoHome}>
          <AnimatePresence mode="wait">
            {isPaymentSuccessOpen ? (
              <motion.div
                key="payment-success-page"
                variants={floatingPageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Suspense fallback={<PageLoadingFallback message="Loading Payment Receipt & Booking Voucher..." />}>
                  <PaymentSuccessPage
                    bookingData={activeBookingReceipt}
                    onBackToHome={handleGoHome}
                    onOpenInquiry={handleOpenInquiry}
                    onSelectDestination={handleSelectDestination}
                  />
                </Suspense>
              </motion.div>
            ) : selectedSeoSlug ? (
            <motion.div
              key={`seo-${selectedSeoSlug}`}
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Guide & Route Map..." />}>
                <SeoPageRenderer
                  slug={selectedSeoSlug}
                  onBackToHome={() => setSelectedSeoSlug('')}
                  onSelectSeoPage={handleSelectSeoPage}
                  onSelectDestination={handleSelectDestination}
                  onSelectPackage={handleSelectPackage}
                  onOpenRazorpay={handleOpenRazorpayCheckout}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : isPithoragarhFlightsOpen ? (
            <motion.div
              key="pithoragarh-flights-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Flight Timings & Airport Guide..." />}>
                <PithoragarhFlightsPage
                  onBackToHome={handleGoHome}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectPackage={handleSelectPackage}
                  onSelectDestination={handleSelectDestination}
                />
              </Suspense>
            </motion.div>
          ) : isClothingGuideOpen ? (
            <motion.div
              key="clothing-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Altitude Packing Guide..." />}>
                <WhatToWearPage
                  onBackToHome={() => setIsClothingGuideOpen(false)}
                  onOpenInquiry={handleOpenInquiry}
                  onOpenRazorpay={handleOpenRazorpayCheckout}
                />
              </Suspense>
            </motion.div>
          ) : isMedicalFitnessOpen ? (
            <motion.div
              key="medical-fitness-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Medical Fitness Assessment & Clearance Pass..." />}>
                <MedicalFitnessPage
                  onBackToHome={handleCloseMedicalFitness}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectPackage={handleSelectPackage}
                />
              </Suspense>
            </motion.div>
          ) : isTeamPageOpen ? (
            <motion.div
              key="team-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Native Kumaoni Team..." />}>
                <TeamPage
                  onBack={() => setIsTeamPageOpen(false)}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : isCareersPageOpen ? (
            <motion.div
              key="careers-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Himalayan Careers Desk..." />}>
                <CareersPage
                  onBack={() => setIsCareersPageOpen(false)}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : isTermsPageOpen ? (
            <motion.div
              key="terms-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Yatra Policy & Terms..." />}>
                <TermsPage
                  onBack={() => setIsTermsPageOpen(false)}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : isPrivacyPageOpen ? (
            <motion.div
              key="privacy-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Pilgrim Privacy Policy..." />}>
                <PrivacyPolicyPage
                  onBack={() => setIsPrivacyPageOpen(false)}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : isAboutUsOpen ? (
            <motion.div
              key="about-us-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading About GoTrek Travels..." />}>
                <AboutUsPage
                  onBack={handleGoHome}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectDestination={handleSelectDestination}
                  onSelectPackage={handleSelectPackage}
                  onSelectTeam={handleOpenTeamPage}
                  onSelectCareers={handleOpenCareersPage}
                />
              </Suspense>
            </motion.div>
          ) : isReelsPageOpen ? (
            <motion.div
              key="reels-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Sacred Yatra Reels..." />}>
                <ReelsPage
                  onBackToHome={handleGoHome}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectPackage={handleSelectPackage}
                  onOpenMemoriesPage={handleOpenMemoriesPage}
                />
              </Suspense>
            </motion.div>
          ) : isMemoriesPageOpen ? (
            <motion.div
              key="memories-page"
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Sacred Memories & Photo Gallery..." />}>
                <MemoriesPage
                  onBackToHome={handleGoHome}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectPackage={handleSelectPackage}
                  onOpenReelsPage={handleOpenReelsPage}
                />
              </Suspense>
            </motion.div>
          ) : selectedPackageSlug ? (
            <motion.div
              key={`pkg-${selectedPackageSlug}`}
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Expedition Details..." />}>
                <PackageDetailPage
                  packageSlug={selectedPackageSlug}
                  onBack={() => setSelectedPackageSlug('')}
                  onOpenInquiry={handleOpenInquiry}
                  onOpenRazorpay={handleOpenRazorpayCheckout}
                  onSelectPackage={handleSelectPackage}
                  onSelectDestination={handleSelectDestination}
                />
              </Suspense>
            </motion.div>
          ) : selectedBlogSlug ? (
            <motion.div
              key={`blog-${selectedBlogSlug}`}
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Pilgrim Journal..." />}>
                {selectedBlogSlug === 'all' || selectedBlogSlug === 'blogs' || selectedBlogSlug === 'index' ? (
                  <BlogListingPage
                    onBackToHome={() => setSelectedBlogSlug('')}
                    onSelectArticle={handleSelectBlog}
                  />
                ) : (
                  <BlogDetailPage
                    slug={selectedBlogSlug}
                    onBack={() => setSelectedBlogSlug('all')}
                    onOpenInquiry={handleOpenInquiry}
                    onSelectArticle={handleSelectBlog}
                  />
                )}
              </Suspense>
            </motion.div>
          ) : selectedDestinationSlug ? (
            <motion.div
              key={`dest-${selectedDestinationSlug}`}
              variants={floatingPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<PageLoadingFallback message="Loading Sacred Circuit Map..." />}>
                <DestinationDetailPage
                  slug={selectedDestinationSlug}
                  onBack={() => setSelectedDestinationSlug('')}
                  onOpenConsultant={handleOpenAiConsultant}
                  onSelectDestination={handleSelectDestination}
                  onSelectPackage={handleSelectPackage}
                  onOpenInquiry={handleOpenInquiry}
                />
              </Suspense>
            </motion.div>
          ) : (
            /* Main Front Website Layout */
            <motion.main 
              key="home-main"
              variants={floatingPageVariants}
              initial={false}
              animate="animate"
              exit="exit"
              className="relative overflow-hidden bg-[#FDFBF7]"
            >
              {/* 3. Hero Section Slider */}
              <HeroSlider
                onOpenInquiry={handleOpenInquiry}
                onOpenAiConsultant={handleOpenAiConsultant}
                onSelectDestination={handleSelectDestination}
              />

              {/* 3.5. Direct Content & Trust Pillars Bar */}
              <ContentTrustBar />

              {/* 4. Yatra Packages & Destinations Section */}
              <DeferredSection minHeight="560px" rootMargin="350px 0px" fallback={<SectionSkeleton type="packages" />}>
                <Suspense fallback={<SectionSkeleton type="packages" />}>
                  <DestinationsSection
                    onOpenInquiry={handleOpenInquiry}
                    onViewDetails={handleViewDetails}
                    onOpenSearch={() => setIsSearchOpen(true)}
                  />
                </Suspense>
              </DeferredSection>

              {/* 5. Standard vs Premium Tiers Breakdown */}
              <DeferredSection minHeight="420px" fallback={<SectionSkeleton type="light" />}>
                <Suspense fallback={<SectionSkeleton type="light" />}>
                  <div className="fast-section">
                    <YatraTiers onOpenInquiry={handleOpenInquiry} onSelectPackage={handleSelectPackage} onSelectSeoPage={handleSelectSeoPage} />
                  </div>
                </Suspense>
              </DeferredSection>

              {/* 6. En Route Sacred Shrines & Temples */}
              <DeferredSection id="temples" minHeight="450px" fallback={<SectionSkeleton type="light" />}>
                <Suspense fallback={<SectionSkeleton type="light" />}>
                  <div className="fast-section">
                    <SacredTemples onSelectDestination={handleSelectDestination} onOpenInquiry={handleOpenInquiry} />
                  </div>
                </Suspense>
              </DeferredSection>

              {/* 7. Verified Reviews & Accordion FAQ */}
              <DeferredSection id="faq" minHeight="480px" fallback={<SectionSkeleton type="light" />}>
                <Suspense fallback={<SectionSkeleton type="light" />}>
                  <div className="fast-section">
                    <ReviewsFaq />
                  </div>
                </Suspense>
              </DeferredSection>


              {/* 11. 24/7 Contact HQ & Direct Permit Office Desk */}
              <DeferredSection minHeight="450px" fallback={<SectionSkeleton type="dark" />}>
                <Suspense fallback={<SectionSkeleton type="dark" />}>
                  <div className="fast-section">
                    <ContactSection onOpenInquiry={handleOpenInquiry} />
                  </div>
                </Suspense>
              </DeferredSection>
            </motion.main>
          )}
        </AnimatePresence>
        </ErrorBoundary>

        {/* 11. Footer */}
        <DeferredSection minHeight="320px" fallback={<SectionSkeleton type="footer" />}>
          <Suspense fallback={<SectionSkeleton type="footer" />}>
            <Footer
              onToggleCrm={handleToggleCrm}
              onOpenInquiry={handleOpenInquiry}
              onSelectDestination={handleSelectDestination}
              onSelectPackage={handleSelectPackage}
              onSelectBlog={handleSelectBlog}
              onSelectSeoPage={handleSelectSeoPage}
              onSelectAboutUs={handleOpenAboutUsPage}
              onSelectTeam={handleOpenTeamPage}
              onSelectCareers={handleOpenCareersPage}
              onSelectWhatToWear={handleOpenClothingPage}
              onSelectMedicalFitness={handleOpenMedicalFitness}
              onSelectTerms={handleOpenTermsPage}
              onSelectPrivacy={handleOpenPrivacyPage}
              onSelectReels={handleOpenReelsPage}
              onSelectMemories={handleOpenMemoriesPage}
              onSelectPithoragarhFlights={handleOpenPithoragarhFlights}
            />
          </Suspense>
        </DeferredSection>

        {/* Dynamic Modals wrapped in ErrorBoundary and Suspense */}
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            {/* Inquiry & Permit Modal */}
            {isInquiryOpen && (
              <InquiryModal
                isOpen={isInquiryOpen}
                onClose={handleCloseInquiry}
                defaultDestination={inquiryDestination}
                onOpenRazorpay={handleOpenRazorpayCheckout}
              />
            )}

            {/* AI Consultant Modal (Gemini API) */}
            {isAiConsultantOpen && (
              <AiConsultantModal
                isOpen={isAiConsultantOpen}
                onClose={handleCloseAiConsultant}
              />
            )}

            {/* Razorpay Online Payment Gateway Modal */}
            {isRazorpayOpen && (
              <RazorpayCheckoutModal
                isOpen={isRazorpayOpen}
                onClose={() => setIsRazorpayOpen(false)}
                destinationTitle={razorpayPackage}
                defaultAmount={3000}
                onViewSuccessPage={(bookingData) => {
                  setIsRazorpayOpen(false);
                  handleOpenPaymentSuccess(bookingData);
                }}
              />
            )}

            {/* Pilgrim Yatri Authentication & Registration Modal */}
            {isUserAuthOpen && (
              <UserAuthModal
                isOpen={isUserAuthOpen}
                onClose={() => setIsUserAuthOpen(false)}
                currentUser={pilgrimUser}
                onLoginSuccess={handleLoginSuccessUser}
                onLogout={handleLogoutUser}
                initialTab={authModalTab}
                onOpenBooking={handleOpenInquiry}
              />
            )}

            {/* Smooth Initial Booking & Permit Popup (Loaded only when explicitly triggered) */}
            {isQuickPopupOpen && (
              <InitialPopupModal 
                isOpen={isQuickPopupOpen}
                onClose={() => setIsQuickPopupOpen(false)}
                onOpenRazorpay={handleOpenRazorpayCheckout}
                onOpenInquiry={handleOpenInquiry}
              />
            )}

            {/* Yatra Operations CRM Dashboard */}
            <AnimatePresence>
              {isCrmOpen && <CrmDashboard onClose={handleToggleCrm} />}
            </AnimatePresence>

            {/* Instant Global Search Modal */}
            {isSearchOpen && (
              <GlobalSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelectDestination={handleSelectDestination}
                onSelectPackage={handleSelectPackage}
                onSelectSeoPage={handleSelectSeoPage}
                onSelectBlog={handleSelectBlog}
                onOpenClothingGuide={handleOpenClothingPage}
                onOpenTeamPage={handleOpenTeamPage}
                onOpenCareersPage={handleOpenCareersPage}
                onOpenAboutUsPage={handleOpenAboutUsPage}
                onOpenReelsPage={handleOpenReelsPage}
                onOpenMemoriesPage={handleOpenMemoriesPage}
                onOpenTermsPage={handleOpenTermsPage}
                onOpenPrivacyPage={handleOpenPrivacyPage}
                onOpenInquiry={handleOpenInquiry}
                onGoHome={handleGoHome}
                onSelectPithoragarhFlights={handleOpenPithoragarhFlights}
                onOpenMedicalFitness={handleOpenMedicalFitness}
              />
            )}
          </Suspense>
        </ErrorBoundary>

        {/* Floating Background Widgets deferred after critical load path */}
        {showFloatingWidgets && (
          <Suspense fallback={null}>
            {/* Floating Ask a Local Expert Button (AI Yatra Consultant) */}
            <AskLocalExpertFloatingButton onOpenAiConsultant={handleOpenAiConsultant} />

            {/* Live WhatsApp Chat Support Widget */}
            <WhatsAppChatWidget />

            {/* High-Altitude Offline Trek Notification & Route Caching Banner */}
            <OfflineTrekBar />
          </Suspense>
        )}

        {/* Mobile Sticky Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={currentActivePage}
          onGoHome={handleGoHome}
          onOpenExplore={() => {
            handleGoHome();
            const elem = document.getElementById("packages") || document.getElementById("categories-grid");
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
          }}
          onOpenInquiry={handleOpenInquiry}
          onOpenBlogs={() => handleSelectBlog("all")}
          onOpenProfile={() => handleOpenUserAuth("login")}
          onOpenAiConsultant={handleOpenAiConsultant}
          onOpenSearch={() => setIsSearchOpen(true)}
          currentCircuit={selectedDestinationSlug || selectedPackageSlug || undefined}
        />
      </div>
    </LanguageProvider>
  );
}
