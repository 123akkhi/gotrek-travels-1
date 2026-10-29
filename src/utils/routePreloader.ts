/**
 * Proactive Route Preloader for 0ms transition latency
 */
export const preloadRoutes = {
  destinationDetail: () => import("../components/DestinationDetailPage"),
  packageDetail: () => import("../components/PackageDetailPage"),
  blogDetail: () => import("../components/BlogDetailPage"),
  blogListing: () => import("../components/BlogListingPage"),
  seoPage: () => import("../components/SeoPageRenderer"),
  teamPage: () => import("../components/TeamPage"),
  careersPage: () => import("../components/CareersPage"),
  whatToWear: () => import("../components/WhatToWearPage"),
  termsPage: () => import("../components/TermsPage"),
  privacyPage: () => import("../components/PrivacyPolicyPage"),
  crmDashboard: () => import("../components/CRM/CrmDashboard"),
  inquiryModal: () => import("../components/InquiryModal"),
  aiConsultantModal: () => import("../components/AiConsultantModal"),
  whatToWearModal: () => import("../components/WhatToWearModal"),
  razorpayModal: () => import("../components/RazorpayCheckoutModal"),
  userAuthModal: () => import("../components/UserAuthModal"),
};

/**
 * Trigger preload safely on hover / focus
 */
export function prefetchRoute(routeName: keyof typeof preloadRoutes) {
  try {
    const loader = preloadRoutes[routeName];
    if (typeof loader === "function") {
      const res = loader();
      if (res && typeof res.catch === 'function') {
        res.catch(() => {
          // Ignore prefetch network errors silently
        });
      }
    }
  } catch (e) {
    // Fail silently
  }
}
