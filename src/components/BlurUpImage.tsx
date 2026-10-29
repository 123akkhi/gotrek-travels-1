import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  generateResponsiveSrcSet,
  resolveSizesAttribute,
  ResponsiveImagePreset,
  SrcSetOptions,
} from "../utils/imageSrcset";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export interface BlurUpImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  blurDataURL?: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  preset?: ResponsiveImagePreset;
  responsiveWidths?: number[];
  srcSetOptions?: SrcSetOptions;
  disableSrcSet?: boolean;
  lazy?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * BlurUpImage component implements a high-performance responsive image strategy:
 * 1. IntersectionObserver-based lazy loading: only requests image assets when scrolled into or near viewport.
 * 2. Displays a low-resolution base64 placeholder with a Gaussian blur instantaneously (0ms layout stability, CLS 0).
 * 3. Uses dynamic `srcset` & `sizes` to ensure mobile devices download lightweight compressed images (360w-640w)
 *    while desktop screens receive high-resolution assets (1280w-1920w), dramatically slashing LCP times.
 * 4. Smoothly cross-fades from the blurred low-res placeholder to full crisp clarity once loaded.
 */
export const BlurUpImage: React.FC<BlurUpImageProps> = ({
  src,
  blurDataURL,
  alt,
  containerClassName = "",
  className = "",
  fallbackSrc,
  priority = false,
  loading = "lazy",
  preset,
  responsiveWidths,
  srcSetOptions,
  disableSrcSet = false,
  lazy = true,
  rootMargin = "250px",
  threshold = 0,
  srcSet: customSrcSet,
  sizes: customSizes,
  onError,
  onLoad,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(containerRef, {
    enabled: !priority && lazy,
    rootMargin,
    threshold,
    freezeOnceVisible: true,
  });

  const shouldLoadImage = priority || !lazy || isIntersecting;

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFallbackActive, setIsFallbackActive] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const setImgRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setCurrentSrc(src);
    setIsFallbackActive(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  // Compute responsive srcset for modern browsers
  const computedSrcSet = useMemo(() => {
    if (customSrcSet) return customSrcSet;
    if (disableSrcSet || isFallbackActive) return undefined;
    return generateResponsiveSrcSet(currentSrc, {
      widths: responsiveWidths,
      ...srcSetOptions,
    });
  }, [customSrcSet, disableSrcSet, isFallbackActive, currentSrc, responsiveWidths, srcSetOptions]);

  // Compute optimal sizes attribute
  const computedSizes = useMemo(() => {
    return resolveSizesAttribute(preset, customSizes);
  }, [preset, customSizes]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* 1. Low-Resolution Base64 Blurred Placeholder (0ms LCP bridge & CLS prevention) */}
      {blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover filter blur-md scale-105 transform pointer-events-none transition-opacity duration-300 ease-in-out ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* 2. High-Resolution Lazy-Loaded Image with Responsive SrcSet & Smooth Cross-Fade */}
      {shouldLoadImage && (
        <img
          ref={setImgRef}
          src={currentSrc}
          srcSet={computedSrcSet}
          sizes={computedSrcSet ? computedSizes : undefined}
          alt={alt}
          loading={priority ? "eager" : loading}
          decoding="async"
          // @ts-ignore - fetchPriority standard in modern browsers
          fetchPriority={priority ? "high" : "auto"}
          onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
          }}
          onError={(e) => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
              setIsFallbackActive(true);
              setCurrentSrc(fallbackSrc);
            }
            onError?.(e);
          }}
          className={`${className} transition-opacity duration-300 ease-out ${
            priority || isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...restProps}
        />
      )}
    </div>
  );
};

export default BlurUpImage;
