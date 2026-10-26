"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PHOTO_CATALOGUE, PhotoRecord } from "@/data/photo-catalogue";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Camera, 
  Calendar, 
  Tag, 
  Compass,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Filter tab configuration
interface FilterGroup {
  id: string;
  label: string;
  categories: PhotoRecord["category"][];
}

const FILTER_GROUPS: FilterGroup[] = [
  { id: "all", label: "All Curated Views", categories: [] },
  { id: "aerial", label: "Aerial & Grounds", categories: ["aerial-landscapes"] },
  { id: "architecture", label: "Architecture", categories: ["architecture-exterior"] },
  { id: "rooms", label: "Rooms & Tents", categories: ["rooms-deluxe", "rooms-tents", "rooms-suites"] },
  { id: "pool", label: "Lotus Pool", categories: ["pool-gardens"] },
  { id: "dining", label: "Dining & Bar", categories: ["dining-kaleva", "dining-riverfront"] },
  { id: "spa", label: "Kairali Spa", categories: ["spa-kairali"] },
  { id: "weddings", label: "Weddings", categories: ["weddings-celebrations"] },
  { id: "heritage", label: "Heritage Cenotaphs", categories: ["heritage-surroundings"] },
  { id: "experiences", label: "Guest Moments", categories: ["guest-experiences"] },
];

export function GalleryViewer() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Curated photos list
  const curatedPhotos = useMemo(() => {
    return PHOTO_CATALOGUE.filter((p) => p.curatedPath && !p.isExcluded);
  }, []);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return curatedPhotos;
    const group = FILTER_GROUPS.find((g) => g.id === activeFilter);
    if (!group) return curatedPhotos;
    return curatedPhotos.filter((p) => group.categories.includes(p.category));
  }, [activeFilter, curatedPhotos]);

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
    setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

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

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section className="py-12 md:py-16">
      {/* Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
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
                onClick={() => setActiveFilter(group.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/50",
                  isActive
                    ? "bg-brand-navy text-brand-sand shadow-md"
                    : "bg-white/80 text-brand-charcoal hover:bg-brand-beige border border-brand-charcoal/10"
                )}
              >
                <span>{group.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                    isActive
                      ? "bg-brand-sand/20 text-brand-sand"
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

      {/* Masonry / Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => {
              const isPortrait = photo.dimensions.orientation === "portrait";
              const isHeroRole = photo.recommendedRole === "hero";

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.02 }}
                  onClick={() => openLightbox(index)}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden bg-brand-charcoal/5 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-charcoal/8",
                    isPortrait ? "aspect-[3/4]" : "aspect-[4/3]",
                    isHeroRole && "sm:col-span-2 lg:col-span-2 aspect-[16/10]"
                  )}
                >
                  {/* Image */}
                  <Image
                    src={photo.curatedPath || photo.googlePhotosUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={index < 4}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-brand-charcoal/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                      {photo.category.replace("-", " ")}
                    </span>
                    {photo.qualityScore >= 9 && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-brand-gold/90 backdrop-blur-md text-brand-charcoal flex items-center gap-1 shadow-sm font-mono">
                        <Sparkles className="w-3 h-3 text-brand-charcoal" />
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Maximize2 className="w-4 h-4 text-brand-sand shrink-0" />
                        <span className="text-xs font-mono text-brand-sand tracking-wide">
                          Click to View Fullscreen
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-medium text-white leading-snug drop-shadow-sm">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-white/80 line-clamp-2 mt-1">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
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
                <span className="font-mono text-xs text-brand-sand tracking-widest uppercase">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="hidden sm:inline-block font-sans text-xs text-white/70">
                  {currentPhoto.category.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
                className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-brand-charcoal/60 hover:bg-brand-charcoal/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
                className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-brand-charcoal/60 hover:bg-brand-charcoal/90 text-white border border-white/15 backdrop-blur-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
