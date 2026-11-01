"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageGalleryProps {
  images: string[];
  title: string;
  badgeText?: string;
  className?: string;
}

export function ImageGallery({
  images,
  title,
  badgeText,
  className,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // Fallback Karnataka tourism stock image if an external URL fails
  const fallbackImage = "/images/hero-karnataka-landmarks.jpg";

  const safeImages = images && images.length > 0 ? images : [fallbackImage];

  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1));
  }, [safeImages.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0));
  }, [safeImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while lightbox is active
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <>
      {/* ==================================================== */}
      {/* GRID GALLERY DISPLAY                                 */}
      {/* ==================================================== */}
      <div className={cn("relative group select-none", className)}>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2.5 sm:gap-3 rounded-2xl overflow-hidden shadow-card border border-surface-border bg-navy-950">
          {/* Main Large Hero Image (Spans 2 cols, 2 rows on desktop) */}
          <div
            onClick={() => handleOpenLightbox(0)}
            className="md:col-span-2 md:row-span-2 relative aspect-[16/10] md:aspect-auto md:min-h-[380px] lg:min-h-[440px] cursor-pointer overflow-hidden bg-navy-900 group/main"
            role="button"
            tabIndex={0}
            aria-label={`View photo 1 of ${safeImages.length} for ${title}`}
            onKeyDown={(e) => e.key === "Enter" && handleOpenLightbox(0)}
          >
            <Image
              src={imgErrors[0] ? fallbackImage : safeImages[0]}
              alt={`${title} - Main photo`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImgErrors((prev) => ({ ...prev, [0]: true }))}
              className="object-cover group-hover/main:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-60 group-hover/main:opacity-40 transition-opacity" />

            {badgeText && (
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-sunshine" />
                  <span>{badgeText}</span>
                </span>
              </div>
            )}

            <button
              type="button"
              className="absolute bottom-3.5 left-3.5 md:hidden z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-navy text-xs font-bold shadow-md"
            >
              <Images className="w-3.5 h-3.5" />
              <span>1 / {safeImages.length}</span>
            </button>
          </div>

          {/* Supporting Thumbnail Grid (Cols 3 & 4) */}
          {safeImages.slice(1, 5).map((img, idx) => {
            const actualIndex = idx + 1;
            const isLast = idx === 3 && safeImages.length > 5;
            return (
              <div
                key={actualIndex}
                onClick={() => handleOpenLightbox(actualIndex)}
                className="hidden md:block relative aspect-[16/10] cursor-pointer overflow-hidden bg-navy-900 group/thumb"
                role="button"
                tabIndex={0}
                aria-label={`View photo ${actualIndex + 1} of ${safeImages.length}`}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleOpenLightbox(actualIndex)
                }
              >
                <Image
                  src={imgErrors[actualIndex] ? fallbackImage : img}
                  alt={`${title} - Thumbnail ${actualIndex + 1}`}
                  fill
                  sizes="25vw"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [actualIndex]: true }))
                  }
                  className="object-cover group-hover/thumb:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-navy-950/10 group-hover/thumb:bg-transparent transition-colors" />

                {/* Overlay on the last thumbnail if more images exist */}
                {isLast && (
                  <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-2 text-center group-hover/thumb:bg-navy-950/65 transition-colors">
                    <Images className="w-6 h-6 mb-1 text-sunshine" />
                    <span className="text-sm font-extrabold">
                      +{safeImages.length - 4} More
                    </span>
                    <span className="text-[11px] text-navy-200">View All Photos</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Photos Desktop Button */}
        <button
          type="button"
          onClick={() => handleOpenLightbox(0)}
          className="absolute bottom-4 right-4 hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-surface-border text-navy text-xs font-bold shadow-lg hover:bg-white hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-forest"
        >
          <Images className="w-4 h-4 text-forest" />
          <span>View All {safeImages.length} Photos</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* ACCESSIBLE FULLSCREEN LIGHTBOX MODAL                 */}
      {/* ==================================================== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer for ${title}`}
        >
          {/* Top Bar: Title, Counter & Close Button */}
          <div className="flex items-center justify-between text-white z-20">
            <div className="space-y-0.5">
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {title}
              </h3>
              <p className="text-xs text-navy-300">
                Photo {activeIndex + 1} of {safeImages.length} &bull; Use Arrow keys or buttons to navigate
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sunshine"
              aria-label="Close fullscreen gallery (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center: Image & Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sunshine"
              aria-label="Previous image (Left arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={
                  imgErrors[activeIndex]
                    ? fallbackImage
                    : safeImages[activeIndex]
                }
                alt={`${title} - Fullscreen photo ${activeIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain rounded-lg"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sunshine"
              aria-label="Next image (Right arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20 max-w-4xl mx-auto">
            {safeImages.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                  activeIndex === idx
                    ? "border-sunshine scale-105 shadow-md"
                    : "border-white/20 opacity-60 hover:opacity-100"
                )}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <Image
                  src={imgErrors[idx] ? fallbackImage : thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
