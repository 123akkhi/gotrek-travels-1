/**
 * GoTrek Media Asset Registry
 * 
 * Central registry linking public folder images to their corresponding sections.
 * When you add custom files into `/public/images/...`, update the filenames here
 * or reference them directly using `/images/<folder>/<filename>`.
 */

export const MEDIA_FOLDERS = {
  destinations: '/images/destinations',
  temples: '/images/temples',
  reels: '/images/reels',
  memories: '/images/memories'
} as const;

/**
 * Quick helper to build public image path with fallback
 */
export function getLocalImagePath(
  folder: keyof typeof MEDIA_FOLDERS,
  filename: string,
  fallbackUrl?: string
): string {
  if (!filename && fallbackUrl) return fallbackUrl;
  return `${MEDIA_FOLDERS[folder]}/${filename}`;
}
