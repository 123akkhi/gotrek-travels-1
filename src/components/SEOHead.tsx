import React, { useEffect } from "react";
import type { 
  SEOConfig, 
  RouteState 
} from "../utils/seoManager";

export interface SEOHeadProps extends RouteState {
  overrideConfig?: Partial<SEOConfig>;
}

/**
 * SEOHead Component
 * Automatically resolves and updates document title, canonical URLs,
 * Open Graph meta tags, Twitter card tags, and Schema.org structured data.
 * Uses code-splitting to keep initial home page load ultra-fast.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  destinationSlug,
  packageSlug,
  blogSlug,
  seoSlug,
  isAboutUsOpen,
  isTeamPageOpen,
  isCareersPageOpen,
  isTermsPageOpen,
  isPrivacyPageOpen,
  isReelsPageOpen,
  isMemoriesPageOpen,
  isClothingGuideOpen,
  isPithoragarhFlightsOpen,
  isMedicalFitnessOpen,
  overrideConfig,
}) => {
  useEffect(() => {
    // If user is on the base home page with no sub-views open, the server-side
    // HTML already has the exact home page title, canonical, and Schema tags.
    const isRootHome =
      !destinationSlug &&
      !packageSlug &&
      !blogSlug &&
      !seoSlug &&
      !isAboutUsOpen &&
      !isTeamPageOpen &&
      !isCareersPageOpen &&
      !isTermsPageOpen &&
      !isPrivacyPageOpen &&
      !isReelsPageOpen &&
      !isMemoriesPageOpen &&
      !isClothingGuideOpen &&
      !isPithoragarhFlightsOpen &&
      !isMedicalFitnessOpen &&
      !overrideConfig &&
      (typeof window === "undefined" || window.location.pathname === "/" || window.location.pathname === "");

    if (isRootHome) return;

    // Dynamically load seoManager only when route or modal state changes
    import("../utils/seoManager")
      .then(({ resolveCurrentSeoConfig, updateSeoMetadata }) => {
        const base = resolveCurrentSeoConfig({
          destinationSlug,
          packageSlug,
          blogSlug,
          seoSlug,
          isAboutUsOpen,
          isTeamPageOpen,
          isCareersPageOpen,
          isTermsPageOpen,
          isPrivacyPageOpen,
          isReelsPageOpen,
          isMemoriesPageOpen,
          isClothingGuideOpen,
          isPithoragarhFlightsOpen,
          isMedicalFitnessOpen,
        });

        const finalConfig = overrideConfig
          ? {
              ...base,
              ...overrideConfig,
              breadcrumbs: overrideConfig.breadcrumbs || base.breadcrumbs,
              schema: overrideConfig.schema || base.schema,
            }
          : base;

        updateSeoMetadata(finalConfig);
      })
      .catch((err) => {
        console.warn("[SEOHead] Failed to dynamically update SEO tags:", err);
      });
  }, [
    destinationSlug,
    packageSlug,
    blogSlug,
    seoSlug,
    isAboutUsOpen,
    isTeamPageOpen,
    isCareersPageOpen,
    isTermsPageOpen,
    isPrivacyPageOpen,
    isReelsPageOpen,
    isMemoriesPageOpen,
    isClothingGuideOpen,
    isPithoragarhFlightsOpen,
    isMedicalFitnessOpen,
    overrideConfig,
  ]);

  return null; // Side-effect component managing document head
};

export default SEOHead;

