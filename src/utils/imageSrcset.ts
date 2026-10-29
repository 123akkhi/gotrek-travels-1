/**
 * GoTrek Responsive Image & SrcSet Optimization Utility
 * 
 * Provides automated responsive `srcset` generation and `sizes` presets for destination
 * photos. Ensures mobile devices fetch lightweight, highly compressed assets (360w-640w)
 * while desktop displays receive crisp, high-resolution photography (1280w-1920w),
 * drastically slashing mobile byte payloads and maximizing Largest Contentful Paint (LCP) scores.
 */

export const DEFAULT_RESPONSIVE_WIDTHS = [360, 480, 640, 768, 1024, 1280, 1600, 1920];

export type ResponsiveImagePreset = 
  | 'hero' 
  | 'card' 
  | 'tile' 
  | 'detailBanner' 
  | 'spot' 
  | 'gallery' 
  | 'thumbnail'
  | 'custom';

/**
 * Standard CSS media-query sizes presets tailored to GoTrek layout breakpoints.
 */
export const RESPONSIVE_IMAGE_SIZES: Record<ResponsiveImagePreset, string> = {
  // Homepage Hero Slide Peak Visual (col-span-5 in grid, full width on mobile)
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 640px',

  // Expedition and Package Cards (1-col mobile, 2-col tablet, 3-col desktop)
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px',

  // Destination Grid Tiles (2-col mobile, 3-col tablet, 6-col desktop)
  tile: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px',

  // Full-bleed Destination & Package Detail Hero Banners
  detailBanner: '(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px',

  // Famous Spots & Temples Showcase Cards
  spot: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',

  // Photo Gallery Grid (1-col mobile, 2-col tablet, 3/4-col desktop)
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 450px',

  // Tiny Avatars or Homestay Thumbnails
  thumbnail: '(max-width: 640px) 96px, 128px',

  // Custom fallback
  custom: '(max-width: 768px) 100vw, 1200px'
};

export interface SrcSetOptions {
  widths?: number[];
  qualityMobile?: number;
  qualityTablet?: number;
  qualityDesktop?: number;
  crop?: boolean;
}

/**
 * Checks if a given image URL can be dynamically resized via URL query parameters.
 */
export function isOptimizableImageUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  // Ignore data URIs and SVGs
  if (url.startsWith('data:') || url.startsWith('blob:') || url.endsWith('.svg')) {
    return false;
  }
  // Unsplash images support dynamic width, quality, and format params
  if (url.includes('images.unsplash.com') || url.includes('unsplash.com')) {
    return true;
  }
  return false;
}

/**
 * Formats a single image URL for a specific target pixel width and quality setting.
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality?: number
): string {
  if (!isOptimizableImageUrl(src)) {
    return src;
  }

  try {
    const url = new URL(src);

    // Compute optimal quality depending on target width if not explicitly provided
    // Lower quality for mobile screens yields dramatic byte savings with no perceptible artifacting
    const resolvedQuality = quality ?? (width <= 480 ? 70 : width <= 768 ? 75 : 82);

    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', resolvedQuality.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');

    return url.toString();
  } catch {
    // If URL parsing fails, attempt string regex replacement or return as-is
    if (src.includes('unsplash.com')) {
      const cleanBase = src.split('?')[0];
      const resolvedQuality = quality ?? (width <= 480 ? 70 : width <= 768 ? 75 : 82);
      return `${cleanBase}?auto=format&fit=crop&w=${width}&q=${resolvedQuality}`;
    }
    return src;
  }
}

/**
 * Generates a full `srcset` string with multiple width descriptors.
 * Example output:
 * "https://images.unsplash.com/...?w=360&q=70 360w, https://images.unsplash.com/...?w=640&q=75 640w, ..."
 */
export function generateResponsiveSrcSet(
  src: string,
  options?: SrcSetOptions
): string | undefined {
  if (!isOptimizableImageUrl(src)) {
    return undefined;
  }

  const widths = options?.widths || DEFAULT_RESPONSIVE_WIDTHS;

  return widths
    .map((w) => {
      const q =
        w <= 480
          ? options?.qualityMobile ?? 70
          : w <= 768
          ? options?.qualityTablet ?? 75
          : options?.qualityDesktop ?? 82;

      const sizedUrl = getOptimizedImageUrl(src, w, q);
      return `${sizedUrl} ${w}w`;
    })
    .join(', ');
}

/**
 * Returns the recommended sizes attribute based on preset or custom string.
 */
export function resolveSizesAttribute(
  preset?: ResponsiveImagePreset,
  customSizes?: string
): string {
  if (customSizes) return customSizes;
  if (preset && RESPONSIVE_IMAGE_SIZES[preset]) {
    return RESPONSIVE_IMAGE_SIZES[preset];
  }
  return RESPONSIVE_IMAGE_SIZES.card;
}
