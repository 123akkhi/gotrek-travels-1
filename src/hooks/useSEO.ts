import { useEffect } from "react";
import type { SEOConfig } from "../utils/seoManager";

/**
 * Custom hook to dynamically override or set SEO metadata inside any component.
 * Isolated in hooks to comply with React Fast Refresh rules.
 */
export function useSEO(config: Partial<SEOConfig> | (() => Partial<SEOConfig>), deps: any[] = []) {
  useEffect(() => {
    import("../utils/seoManager")
      .then(({ getDefaultSeoConfig, updateSeoMetadata }) => {
        const resolvedConfig = typeof config === "function" ? config() : config;
        const defaultConfig = getDefaultSeoConfig();

        updateSeoMetadata({
          ...defaultConfig,
          ...resolvedConfig,
          breadcrumbs: resolvedConfig.breadcrumbs || defaultConfig.breadcrumbs,
          schema: resolvedConfig.schema || defaultConfig.schema,
        });
      })
      .catch((err) => {
        console.warn("[useSEO] Failed to dynamically update SEO tags:", err);
      });
  }, deps);
}

export default useSEO;
