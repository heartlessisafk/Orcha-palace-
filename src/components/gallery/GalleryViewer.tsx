"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PHOTO_CATALOGUE, PhotoRecord } from "@/data/photo-catalogue";
import { LUXURY_EASE } from "@/lib/motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Camera, 
  Compass,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// Filter tab configuration
interface FilterGroup {
  id: string;
  label: string;
  categories: PhotoRecord["category"][];
}

const FILTER_GROUPS: FilterGroup[] = [
  { id: "all", label: "All Curated Views", categories: [] },
  { id: "architecture", label: "Architecture", categories: ["architecture-exterior", "aerial-landscapes"] },
  { id: "rooms", label: "Rooms & Suites", categories: ["rooms-deluxe", "rooms-tents", "rooms-suites"] },
  { id: "pool", label: "Lotus Pool", categories: ["pool-gardens"] },
  { id: "weddings", label: "Weddings", categories: ["weddings-celebrations"] },
  { id: "amenities", label: "Amenities & Dining", categories: ["dining-kaleva", "dining-riverfront", "spa-kairali"] },
  { id: "experiences", label: "Experiences", categories: ["heritage-surroundings", "guest-experiences"] },
];

const INITIAL_VISIBLE_COUNT = 6;
const BATCH_INCREMENT = 3;

/**
 * Responsive column count hook
 * 1 col on mobile (< 640px)
 * 2 cols on tablet (640px - 1023px)
 * 3 cols on desktop (>= 1024px)
 */
function useGalleryColumns(): number {
  const [columns, setColumns] = useState<number>(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

/**
 * Returns aspect ratio class preserving natural orientation without excessive cropping
 */
function getTileAspectClass(photo: PhotoRecord): string {
  const isSignature = (photo.qualityScore || 8) >= 9;
  if (photo.dimensions.orientation === "portrait") {
    return isSignature ? "aspect-[3/4]" : "aspect-[4/5]";
  }
  if (photo.dimensions.orientation === "landscape") {
    return isSignature ? "aspect-[16/10]" : "aspect-[3/2]";
  }
  return "aspect-square";
}

export function GalleryViewer() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const columns = useGalleryColumns();

  // Curated photos list (Strictly deduplicated: excludes duplicates & exclusions)
  const curatedPhotos = useMemo(() => {
    return PHOTO_CATALOGUE.filter((p) => p.curatedPath && !p.isExcluded && !p.isDuplicate);
  }, []);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return curatedPhotos;
    const group = FILTER_GROUPS.find((g) => g.id === activeFilter);
    if (!group) return curatedPhotos;
    return curatedPhotos.filter((p) => group.categories.includes(p.category));
  }, [activeFilter, curatedPhotos]);

  // When active category changes, reset visible count to initial batch
  const handleFilterChange = (groupId: string) => {
    setActiveFilter(groupId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Progressive reveal slice
  const visiblePhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const remainingCount = Math.max(0, filteredPhotos.length - visibleCount);
  const nextBatchSize = Math.min(BATCH_INCREMENT, remainingCount);
  const hasMore = remainingCount > 0;

  const handleDiscoverMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, filteredPhotos.length));
  };

  // Partition visible photos across column tracks to eliminate empty chasms and gaps
  const columnTracks = useMemo(() => {
    const tracks: { photo: PhotoRecord; globalIndex: number }[][] = Array.from(
      { length: columns },
      () => []
    );
    visiblePhotos.forEach((photo, index) => {
      tracks[index % columns].push({ photo, globalIndex: index });
    });
    return tracks;
  }, [visiblePhotos, columns]);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % visiblePhotos.length);
  }, [lightboxIndex, visiblePhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + visiblePhotos.length) % visiblePhotos.length);
  }, [lightboxIndex, visiblePhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  // Mobile swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextPhoto();
    if (isRightSwipe) prevPhoto();
  };

  const currentPhoto = lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <section className="py-6 md:py-10">
      {/* Sticky Category Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-brand-canvas/95 backdrop-blur-md py-3.5 border-y border-brand-charcoal/10 shadow-sm mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none no-scrollbar">
            {FILTER_GROUPS.map((group) => {
              const count =
                group.id === "all"
                  ? curatedPhotos.length
                  : curatedPhotos.filter((p) => group.categories.includes(p.category)).length;

              if (count === 0 && group.id !== "all") return null;

              const isActive = activeFilter === group.id;

              return (
                <button
                  key={group.id}
                  onClick={() => handleFilterChange(group.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-250 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer",
                    "tactile-3d hover:-translate-y-0.5 active:scale-[0.97]",
                    isActive
                      ? "bg-brand-navy text-white shadow-md ring-1 ring-brand-gold/60 hover:shadow-gold-ambient font-semibold"
                      : "bg-white/90 text-brand-charcoal hover:bg-brand-beige border border-brand-charcoal/10 shadow-subtle hover:shadow-card"
                  )}
                >
                  <span>{group.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium",
                      isActive
                        ? "bg-brand-gold/25 text-brand-gold-light"
                        : "bg-brand-charcoal/5 text-brand-charcoal/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Architectural Masonry Photo Gallery (Zero-Empty-Gap Architecture) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          >
            {columnTracks.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6 w-full">
                {column.map(({ photo, globalIndex }) => {
                  const isInitialBatch = globalIndex < INITIAL_VISIBLE_COUNT;
                  const staggerOffset = isInitialBatch 
                    ? globalIndex * 0.05 
                    : (globalIndex % BATCH_INCREMENT) * 0.08;
                  const aspectClass = getTileAspectClass(photo);

                  return (
                    <motion.div
                      key={photo.id}
                      layout="position"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: staggerOffset,
                        ease: LUXURY_EASE,
                      }}
                      onClick={() => openLightbox(globalIndex)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(globalIndex);
                        }
                      }}
                      className={cn(
                        "group relative w-full rounded-2xl overflow-hidden bg-brand-charcoal/5 cursor-pointer shadow-subtle hover:shadow-hover border border-brand-charcoal/10 hover:border-brand-gold/60 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
                        aspectClass,
                        "hover:-translate-y-1.5 hover:scale-[1.012] active:scale-[0.985]"
                      )}
                      aria-label={`Open photo: ${photo.title}`}
                    >
                      {/* Real Authentic Resort Photograph */}
                      <Image
                        src={photo.curatedPath || photo.googlePhotosUrl}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority={globalIndex < 3}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-brand-charcoal/70 backdrop-blur-md text-white border border-white/10 shadow-sm">
                          {photo.category.replace("-", " ")}
                        </span>
                        {photo.qualityScore >= 9 && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-brand-gold/90 backdrop-blur-md text-brand-navy flex items-center gap-1 shadow-sm font-mono font-semibold">
                            <Sparkles className="w-3 h-3 text-brand-navy" />
                            Signature
                          </span>
                        )}
                      </div>

                      {/* Editorial Gradient Overlay & Metadata on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-[#F3D382] shrink-0" />
                            <span className="text-xs font-mono text-[#F3D382] tracking-wider uppercase font-medium">
                              Click to View Fullscreen
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-medium text-white leading-snug drop-shadow-sm">
                            {photo.title}
                          </h3>
                          <p className="font-sans text-xs text-white/85 line-clamp-2 mt-1 leading-relaxed">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* High-Contrast "Discover More Photographs" Action Area */}
        <div className="mt-14 text-center flex flex-col items-center justify-center gap-3.5">
          {hasMore ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleDiscoverMore}
              withArrow
              className="rounded-full shadow-md hover:shadow-gold-ambient border border-brand-gold/50 group px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-[#F8F4EC] font-medium text-sm transition-all duration-300 tactile-3d"
            >
              <span className="text-[#F8F4EC] font-medium tracking-wide">
                Discover More Photographs
              </span>
              <span className="ml-2.5 px-2.5 py-0.5 rounded-full bg-brand-gold/25 border border-brand-gold/40 text-brand-gold-light text-xs font-mono font-semibold shadow-inner">
                +{nextBatchSize}
              </span>
            </Button>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-beige/60 border border-brand-charcoal/10 text-xs font-sans text-brand-charcoal/80 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span>All {filteredPhotos.length} curated photographs in this view are displayed</span>
            </div>
          )}

          <span className="font-mono text-xs text-brand-charcoal/70 font-medium">
            Displaying {visiblePhotos.length} of {filteredPhotos.length} unique views
          </span>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-charcoal/95 backdrop-blur-xl flex flex-col justify-between"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Top Bar Controls */}
            <div className="px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 z-20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-brand-gold-light tracking-widest uppercase">
                  Photo {lightboxIndex + 1} of {visiblePhotos.length}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="hidden sm:inline-block font-sans text-xs text-white/70">
                  {currentPhoto.category.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all tactile-3d hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Media Viewer & Chevrons */}
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-brand-charcoal/60 hover:bg-brand-charcoal/90 text-white border border-white/15 backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer shadow-lg"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full max-w-6xl max-h-[75vh] flex items-center justify-center">
                <Image
                  src={currentPhoto.curatedPath || currentPhoto.googlePhotosUrl}
                  alt={currentPhoto.title}
                  fill
                  className="object-contain drop-shadow-2xl select-none"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={nextPhoto}
                className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-brand-charcoal/60 hover:bg-brand-charcoal/90 text-white border border-white/15 backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer shadow-lg"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Info Tray */}
            <div className="px-4 sm:px-8 py-5 bg-brand-charcoal/80 border-t border-white/10 backdrop-blur-md z-20">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-serif text-xl sm:text-2xl font-medium text-white">
                      {currentPhoto.title}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                      Score {currentPhoto.qualityScore}/10
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
                    {currentPhoto.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-white/60 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{currentPhoto.originalFilename}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{currentPhoto.dimensions.width}×{currentPhoto.dimensions.height}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
