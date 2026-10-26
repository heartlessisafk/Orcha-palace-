"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ORCHHA_HERITAGE_LOCATIONS, HeritageLocationMarker } from "@/data/orchha-map";
import { RESORT_ASSETS } from "@/lib/assets";
import { SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  X,
  Navigation,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PalaceToMapFinaleProps {
  className?: string;
  id?: string;
}

export function PalaceToMapFinale({
  className,
  id = "map-experience",
}: PalaceToMapFinaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [selectedLocation, setSelectedLocation] = useState<HeritageLocationMarker | null>(
    ORCHHA_HERITAGE_LOCATIONS[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Track scroll progress through the pinned track (0.00 to 1.00)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SCROLL-LINKED TRANSFORMS (Inspired by Inversa-Scroll-Animation)
  // ─────────────────────────────────────────────────────────────────────────

  // ACT I: Hero Text Lift & Dissolve
  const heroTextOpacity = useTransform(scrollYProgress, [0.00, 0.18], [1.0, 0.0], { clamp: true });
  const heroTextY = useTransform(scrollYProgress, [0.00, 0.18], [0, -45], { clamp: true });

  // ACT II: Image Saturation, Darkening & Line-Art Transformation
  // Inversa: saturate(1) -> saturate(0), overlay opacity 0.35 -> 0.85
  const imageSaturation = useTransform(scrollYProgress, [0.10, 0.32], [1.0, 0.0], { clamp: true });
  const imageOverlayOpacity = useTransform(scrollYProgress, [0.10, 0.35], [0.35, 0.88], { clamp: true });
  const imageScale = useTransform(scrollYProgress, [0.00, 0.35], [1.06, 1.0], { clamp: true });

  // Architectural Outline & Coordinate Grid (Scales in and illuminates)
  const lineArtOpacity = useTransform(scrollYProgress, [0.16, 0.30, 0.44, 0.54], [0.0, 1.0, 1.0, 0.0], { clamp: true });
  const lineArtScale = useTransform(scrollYProgress, [0.16, 0.36], [1.2, 1.0], { clamp: true });

  const gridOverlayOpacity = useTransform(scrollYProgress, [0.24, 0.36, 0.65, 0.75], [0.0, 0.85, 0.85, 0.2], { clamp: true });
  const gridScale = useTransform(scrollYProgress, [0.22, 0.36], [1.6, 1.0], { clamp: true });

  // ACT III: Cartographic Map Canvas Reveal
  const mapOpacity = useTransform(scrollYProgress, [0.38, 0.52, 0.82, 0.92], [0.0, 1.0, 1.0, 0.35], { clamp: true });
  const mapScale = useTransform(scrollYProgress, [0.38, 0.55], [0.94, 1.0], { clamp: true });
  const mapPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.36 && p < 0.82 ? "auto" : "none"));

  // ACT IV: Location Markers Staggered Emergence
  const resortMarkerOpacity = useTransform(scrollYProgress, [0.48, 0.56], [0.0, 1.0], { clamp: true });
  const cenotaphMarkerOpacity = useTransform(scrollYProgress, [0.52, 0.60], [0.0, 1.0], { clamp: true });
  const fortMarkerOpacity = useTransform(scrollYProgress, [0.56, 0.64], [0.0, 1.0], { clamp: true });
  const templeMarkerOpacity = useTransform(scrollYProgress, [0.60, 0.68], [0.0, 1.0], { clamp: true });
  const laxmiMarkerOpacity = useTransform(scrollYProgress, [0.64, 0.72], [0.0, 1.0], { clamp: true });

  // ACT V: The Final Closing Invitation
  const ctaCardOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0.0, 1.0], { clamp: true });
  const ctaCardY = useTransform(scrollYProgress, [0.82, 0.94], [40, 0], { clamp: true });
  const ctaCardScale = useTransform(scrollYProgress, [0.82, 0.94], [0.96, 1.0], { clamp: true });
  const ctaPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.82 ? "auto" : "none"));

  // Visual Scroll Progress Indicator
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Filtered locations
  const displayedLocations =
    activeCategory === "all"
      ? ORCHHA_HERITAGE_LOCATIONS
      : ORCHHA_HERITAGE_LOCATIONS.filter((loc) => loc.category === activeCategory);

  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking-sequence") || document.getElementById("rooms");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        "relative bg-[#0C131D] text-white border-t border-brand-gold/20 overflow-visible lg:overflow-visible",
        "lg:h-[450vh]",
        className
      )}
    >
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP PINNED VIEWPORT EXPERIENCE (lg: screens)
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between items-center overflow-hidden">
        {/* Layer 1: Atmospheric Background Architectural Image */}
        <motion.div
          style={{
            scale: imageScale,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <motion.div
            style={{
              filter: useTransform(imageSaturation, (s) => `saturate(${s})`),
            }}
            className="relative w-full h-full"
          >
            <Image
              src={RESORT_ASSETS.chhatrisHeritage.src}
              alt="The 14 Royal Cenotaphs along the River Betwa in Orchha"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Dynamic Darkness Overlay (Inversa: 0.35 -> 0.88) */}
          <motion.div
            style={{
              opacity: imageOverlayOpacity,
            }}
            className="absolute inset-0 bg-[#0C131D]"
          />

          {/* Subtle Ambient Radial Palette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_70%)]" />
        </motion.div>

        {/* Layer 2: Inversa-Style Architectural Coordinate Grid Overlay */}
        <motion.div
          style={{
            opacity: gridOverlayOpacity,
            scale: gridScale,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="w-[88%] h-[82%] border border-brand-gold/25 relative">
            {/* Grid Crosshairs & Coordinate Labels */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 divide-x divide-y divide-brand-gold/30">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="relative">
                  {i % 5 === 0 && (
                    <span className="absolute top-1 left-1.5 text-[9px] font-mono text-brand-gold tracking-wider font-semibold">
                      +{25.34 + i * 0.002}°N
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Corner Bracket Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand-gold" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-brand-gold" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-brand-gold" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand-gold" />
          </div>
        </motion.div>

        {/* Layer 3: ACT II Architectural Line-Art Silhouette (Chhatris & Domes) */}
        <motion.div
          style={{
            opacity: lineArtOpacity,
            scale: lineArtScale,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="w-full max-w-5xl h-[520px] relative px-8 flex items-center justify-center">
            {/* SVG Architectural Blueprint of Orchha Royal Spire Silhouettes */}
            <svg
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(230,202,133,0.6)]"
            >
              {/* Ground & Plinth lines */}
              <line x1="50" y1="420" x2="950" y2="420" stroke="#E6CA85" strokeWidth="2.5" strokeDasharray="6 3" />
              <line x1="100" y1="435" x2="900" y2="435" stroke="#E6CA85" strokeWidth="1.5" strokeOpacity="0.7" />

              {/* Center Monument: The Grand Shikhara / Cenotaph Spire */}
              <path
                d="M500 80 L520 180 L545 270 L560 360 L570 420 L430 420 L440 360 L455 270 L480 180 Z"
                stroke="#F5E2B3"
                strokeWidth="2.5"
                fill="rgba(230,202,133,0.08)"
              />
              {/* Spire Kalash & Finial */}
              <circle cx="500" cy="70" r="7" stroke="#F5E2B3" strokeWidth="2" fill="rgba(245,226,179,0.5)" />
              <line x1="500" y1="50" x2="500" y2="70" stroke="#F5E2B3" strokeWidth="2" />

              {/* Chhatri Arched Tiers */}
              <path d="M465 240 Q500 215 535 240" stroke="#F5E2B3" strokeWidth="2" />
              <path d="M450 310 Q500 280 550 310" stroke="#F5E2B3" strokeWidth="2" />
              <path d="M435 380 Q500 340 565 380" stroke="#F5E2B3" strokeWidth="2" />

              {/* Left Flanking Chhatri Dome */}
              <path
                d="M280 160 L300 240 L315 320 L330 420 L230 420 L245 320 L260 240 Z"
                stroke="#E6CA85"
                strokeWidth="2"
                strokeOpacity="0.9"
                fill="rgba(197,160,89,0.05)"
              />
              <circle cx="280" cy="150" r="6" stroke="#E6CA85" strokeWidth="1.5" />
              <line x1="280" y1="135" x2="280" y2="150" stroke="#E6CA85" strokeWidth="1.5" />
              <path d="M255 280 Q280 260 305 280" stroke="#E6CA85" strokeWidth="1.5" />

              {/* Right Flanking Chhatri Dome */}
              <path
                d="M720 160 L740 240 L755 320 L770 420 L670 420 L685 320 L700 240 Z"
                stroke="#E6CA85"
                strokeWidth="2"
                strokeOpacity="0.9"
                fill="rgba(197,160,89,0.05)"
              />
              <circle cx="720" cy="150" r="6" stroke="#E6CA85" strokeWidth="1.5" />
              <line x1="720" y1="135" x2="720" y2="150" stroke="#E6CA85" strokeWidth="1.5" />
              <path d="M695 280 Q720 260 745 280" stroke="#E6CA85" strokeWidth="1.5" />

              {/* Outer Pavilion Minarets */}
              <path d="M120 250 L135 330 L145 420 L95 420 L105 330 Z" stroke="#C5A059" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="120" cy="242" r="5" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.6" />

              <path d="M880 250 L895 330 L905 420 L855 420 L865 330 Z" stroke="#C5A059" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="880" cy="242" r="5" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.6" />

              {/* Subtle Dimension Annotation Lines */}
              <line x1="500" y1="40" x2="980" y2="40" stroke="#E6CA85" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
              <text x="780" y="32" fill="#E6CA85" fontSize="11" fontFamily="monospace" opacity="0.7">
                ELEVATION 248M • BUNDELA 1605 CE
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Layer 4: ACT III & IV Cartographic Map of Orchha Canvas */}
        <motion.div
          style={{
            opacity: mapOpacity,
            scale: mapScale,
            pointerEvents: mapPointerEvents as any,
          }}
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-6xl h-[620px] rounded-3xl bg-[#090E17]/90 border border-brand-gold/30 shadow-2xl relative overflow-hidden flex flex-col backdrop-blur-md">
            {/* Map Header Bar */}
            <div className="px-6 py-4 border-b border-brand-gold/20 flex items-center justify-between bg-black/40 z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-brand-gold animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-wide text-white">
                    The Heritage Geography of Orchha
                  </h3>
                  <p className="font-sans text-xs text-brand-gold/70">
                    Sacred Betwa River Valley • 25.3516° N, 78.6424° E
                  </p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "All Landmarks" },
                  { id: "resort", label: "Sanctuary" },
                  { id: "monument", label: "Palaces & Forts" },
                  { id: "temple", label: "Temples" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-sans transition-all duration-200 border",
                      activeCategory === cat.id
                        ? "bg-brand-gold text-brand-navy border-brand-gold font-semibold shadow-sm"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-brand-gold/40"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Vector Cartographic Canvas */}
            <div className="flex-1 relative w-full h-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#111C2B,#080D15)]">
              {/* SVG Map Layer: Betwa River & Topographic Contours */}
              <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <linearGradient id="riverGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#1E4F8A" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#1B426E" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#133050" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E6CA85" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Topographic Elevation Contour Lines */}
                <path
                  d="M100 200 C300 150, 400 350, 850 250"
                  stroke="#E6CA85"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M50 350 C250 300, 450 500, 920 400"
                  stroke="#E6CA85"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M150 100 C350 50, 600 220, 900 120"
                  stroke="#E6CA85"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* The Majestic Betwa River Channel (Flows South to North) */}
                <path
                  d="M 680 600
                     C 630 520, 580 460, 560 380
                     C 545 320, 520 280, 460 220
                     C 420 180, 440 120, 430 0
                     L 470 0
                     C 480 120, 470 170, 510 210
                     C 570 270, 605 310, 620 370
                     C 645 450, 700 520, 750 600
                     Z"
                  fill="url(#riverGradient)"
                  stroke="#5BA2DC"
                  strokeWidth="2"
                  strokeOpacity="0.85"
                />

                {/* River Secondary Branch forming Orchha Fort Island */}
                <path
                  d="M 520 270
                     C 450 240, 410 180, 410 100
                     C 410 40, 430 0, 430 0
                     L 410 0
                     C 390 40, 390 110, 430 190
                     C 470 260, 500 280, 520 270 Z"
                  fill="#1B3A5A"
                  fillOpacity="0.6"
                  stroke="#4A88BA"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />

                {/* Historic Stone Multi-Arched Bridge over Betwa */}
                <line x1="510" y1="230" x2="440" y2="215" stroke="#E6CA85" strokeWidth="4" strokeLinecap="round" />
                <line x1="510" y1="230" x2="440" y2="215" stroke="#000" strokeWidth="1" strokeDasharray="4 3" />

                {/* River Flow Direction Indicators */}
                <path d="M 630 500 L 610 460" stroke="#7CB6E6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M 570 350 L 540 310" stroke="#7CB6E6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <text x="635" y="480" fill="#7CB6E6" fontSize="10" fontFamily="sans-serif" opacity="0.7" letterSpacing="2">
                  BETWA RIVER (FLOW ▲)
                </text>
              </svg>

              {/* LOCATION MARKERS OVERLAY */}
              {displayedLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                const isPrimary = loc.isPrimary;

                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    style={{
                      left: `${loc.mapCoords.x}%`,
                      top: `${loc.mapCoords.y}%`,
                    }}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex flex-col items-center transition-all duration-300 focus:outline-none",
                      isSelected && "z-40 scale-110"
                    )}
                    aria-label={`Inspect ${loc.name}`}
                  >
                    {/* Concentric Pulse Rings for Primary (The Orchha Resort) */}
                    {isPrimary && (
                      <span className="absolute -inset-3 rounded-full bg-brand-gold/30 animate-ping opacity-75 pointer-events-none" />
                    )}

                    {/* Marker Pin Badge */}
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg transition-all duration-300 border backdrop-blur-md",
                        isPrimary
                          ? "bg-brand-gold text-brand-navy border-white font-bold ring-2 ring-brand-gold/50"
                          : isSelected
                          ? "bg-white text-brand-navy border-brand-gold font-semibold"
                          : "bg-[#0C131D]/90 text-white/90 border-brand-gold/40 hover:border-brand-gold hover:bg-[#152030]"
                      )}
                    >
                      <MapPin
                        className={cn(
                          "w-3.5 h-3.5",
                          isPrimary ? "text-brand-navy fill-brand-navy" : isSelected ? "text-brand-gold fill-brand-gold" : "text-brand-gold"
                        )}
                      />
                      <span className="text-xs tracking-wide whitespace-nowrap">{loc.name}</span>
                    </div>

                    {/* Small distance indicator below pin */}
                    <span className="text-[10px] font-sans text-brand-gold/80 bg-black/60 px-1.5 py-0.5 rounded mt-0.5 border border-brand-gold/20 backdrop-blur-sm">
                      {loc.distanceFromResort}
                    </span>
                  </button>
                );
              })}

              {/* Floating Inspector Panel for Selected Location */}
              <AnimatePresence>
                {selectedLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-40 bg-[#0C131D]/95 border border-brand-gold/40 rounded-2xl p-5 shadow-2xl backdrop-blur-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-brand-gold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-brand-gold" />
                          <span>{selectedLocation.badgeText}</span>
                        </div>
                        <h4 className="font-serif text-lg text-white font-normal mt-0.5">
                          {selectedLocation.name}
                        </h4>
                        {selectedLocation.hindiName && (
                          <span className="text-xs text-white/50 block font-serif">
                            {selectedLocation.hindiName}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedLocation(null)}
                        className="text-white/40 hover:text-white p-1 rounded-full transition-colors"
                        aria-label="Close attraction card"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-sans text-xs text-white/80 leading-relaxed">
                      {selectedLocation.description}
                    </p>

                    <div className="pt-2 border-t border-brand-gold/20 flex items-center justify-between text-xs text-brand-gold/90 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{selectedLocation.walkingTime}</span>
                      </div>
                      <div className="text-[11px] text-white/50 font-mono">
                        {selectedLocation.realCoordinates}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Compass Rose Widget in Bottom Right */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden md:flex flex-col items-center p-2 rounded-full bg-black/40 border border-brand-gold/25 backdrop-blur-sm">
                <span className="text-[9px] font-mono text-brand-gold font-bold">N</span>
                <Navigation className="w-4 h-4 text-brand-gold transform -rotate-45" />
                <span className="text-[8px] font-mono text-white/40">25°N</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layer 5: ACT I Opening Monumental Headline */}
        <motion.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
          }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6 pointer-events-none"
        >
          <div className="max-w-3xl space-y-4">
            <SubtitleTag inverted>Beyond the Ordinary</SubtitleTag>
            <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-normal text-white tracking-tight leading-tight">
              Discover Orchha
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              A sanctuary beside the sacred Betwa. A world of 16th-century royal heritage unfolding just beyond your doorstep.
            </p>
            <div className="pt-6 inline-flex items-center gap-2 text-xs font-mono text-brand-gold/80 tracking-widest uppercase">
              <span>Scroll down to enter the cartographic reveal</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </motion.div>

        {/* Layer 6: ACT V The Final Closing Invitation */}
        <motion.div
          style={{
            opacity: ctaCardOpacity,
            y: ctaCardY,
            scale: ctaCardScale,
            pointerEvents: ctaPointerEvents as any,
          }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6"
        >
          <div className="w-full max-w-2xl bg-[#080D15]/95 border border-brand-gold/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-xl">
            {/* Ambient Corner Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-60 h-60 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none"
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-xs font-serif tracking-widest text-brand-gold uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              The Sacred Valley of Bundelkhand
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight leading-snug">
              Your next chapter begins here.
            </h3>

            <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
              Where 16th-century royal grandeur meets the unhurried tranquility of the Betwa. Reserve your private sanctuary across from the cenotaphs.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="pill"
                onClick={handleScrollToBooking}
                withArrow
                className="w-full sm:w-auto"
              >
                Book Your Stay
              </Button>

              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="pill"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                >
                  Explore Property Story
                </Button>
              </Link>
            </div>

            {/* Direct Concierge WhatsApp Touchpoint */}
            <div className="pt-2 text-xs font-sans text-white/50">
              Direct Concierge:{" "}
              <a
                href="https://wa.me/919425141240?text=Hello%20Orchha%20Resort,%20I%20would%20like%20to%20plan%20my%20stay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:underline inline-flex items-center gap-1"
              >
                +91 94251 41240 (WhatsApp Desk)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Global Desktop Progress Indicator Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
          <motion.div
            style={{ width: progressPercent }}
            className="h-full bg-brand-gold"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          RESPONSIVE MOBILE & TABLET LAYOUT (< lg: screens)
          Touch-optimized interactive map and closing invitation
          ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden px-4 py-16 sm:px-6 max-w-3xl mx-auto space-y-12">
        {/* Mobile Header Banner */}
        <header className="text-center space-y-3">
          <SubtitleTag inverted>Beyond the Ordinary</SubtitleTag>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Discover Orchha
          </h2>
          <p className="font-sans text-sm text-white/80 leading-relaxed max-w-md mx-auto">
            A sanctuary beside the sacred Betwa. Explore the 16th-century fortresses, royal cenotaphs, and sacred temples surrounding The Orchha Resort.
          </p>
        </header>

        {/* Mobile Interactive Map Representation */}
        <div className="bg-[#090E17] border border-brand-gold/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-serif text-white tracking-wide">
                Heritage Map of Orchha
              </span>
            </div>
            <span className="text-[10px] font-mono text-brand-gold/70">25.35°N, 78.64°E</span>
          </div>

          {/* Interactive Mobile Map Canvas */}
          <div className="relative h-[340px] w-full bg-[radial-gradient(ellipse_at_center,#111C2B,#080D15)] overflow-hidden">
            {/* Simplified River SVG */}
            <svg
              viewBox="0 0 400 340"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path
                d="M 280 340 C 250 280, 230 240, 220 180 C 210 120, 180 80, 170 0 L 190 0 C 200 80, 230 120, 240 180 C 250 240, 270 280, 300 340 Z"
                fill="#20456A"
                stroke="#4A88BA"
                strokeWidth="1.5"
                opacity="0.8"
              />
            </svg>

            {/* Mobile Touch Markers */}
            {ORCHHA_HERITAGE_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              const isPrimary = loc.isPrimary;

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{
                    left: `${loc.mapCoords.x}%`,
                    top: `${loc.mapCoords.y}%`,
                  }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-200",
                    isSelected && "z-30 scale-105"
                  )}
                  aria-label={`Select ${loc.name}`}
                >
                  <div
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-sans flex items-center gap-1 border shadow-md",
                      isPrimary
                        ? "bg-brand-gold text-brand-navy border-white font-bold"
                        : isSelected
                        ? "bg-white text-brand-navy border-brand-gold font-semibold"
                        : "bg-[#0C131D]/90 text-white/90 border-brand-gold/40"
                    )}
                  >
                    <MapPin className="w-3 h-3 text-brand-gold" />
                    <span>{loc.name.split(" ")[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Location Inspector Card */}
          {selectedLocation && (
            <div className="p-5 bg-[#0C131D] border-t border-brand-gold/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans text-brand-gold uppercase tracking-wider">
                  {selectedLocation.badgeText}
                </span>
                <span className="text-[11px] text-white/50">{selectedLocation.walkingTime}</span>
              </div>
              <h4 className="font-serif text-base text-white">{selectedLocation.name}</h4>
              <p className="font-sans text-xs text-white/75 leading-relaxed">
                {selectedLocation.description}
              </p>
              <div className="text-[10px] text-brand-gold font-mono pt-1">
                Distance: {selectedLocation.distanceFromResort}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Final Closing Invitation */}
        <div className="bg-[#090E17] border border-brand-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-serif tracking-widest text-brand-gold uppercase">
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            The Sacred Valley of Bundelkhand
          </span>
          <h3 className="font-serif text-2xl text-white font-normal">
            Your next chapter begins here.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-md mx-auto">
            Where 16th-century royal grandeur meets the unhurried tranquility of the Betwa. Reserve your private sanctuary across from the cenotaphs.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <Button
              variant="gold"
              size="pill"
              onClick={handleScrollToBooking}
              withArrow
              className="w-full"
            >
              Book Your Stay
            </Button>

            <Link href="/about" className="w-full">
              <Button
                variant="outline"
                size="pill"
                className="w-full border-white/20 text-white"
              >
                Explore Property Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
