"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ORCHHA_HERITAGE_LOCATIONS, HeritageLocationMarker } from "@/data/orchha-map";
import { RESORT_ASSETS } from "@/lib/assets";
import { SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { RealOrchhaMap } from "./RealOrchhaMap";
import {
  Compass,
  ExternalLink,
  Navigation,
  Sparkles,
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
  const [selectedLocation, setSelectedLocation] = useState<HeritageLocationMarker>(
    ORCHHA_HERITAGE_LOCATIONS[0]
  );

  // Track scroll progress through the pinned track (0.00 to 1.00)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 5-STAGE STRICT NON-OVERLAPPING SCROLL CHOREOGRAPHY
  // ─────────────────────────────────────────────────────────────────────────

  // STAGE 1: Hero Headline Lift & Clean Exit (0.00 - 0.12)
  const heroTextOpacity = useTransform(scrollYProgress, [0.00, 0.11], [1.0, 0.0], { clamp: true });
  const heroTextY = useTransform(scrollYProgress, [0.00, 0.11], [0, -40], { clamp: true });
  const heroVisibility = useTransform(scrollYProgress, (p) => (p >= 0.13 ? "hidden" : "visible"));
  const heroPointerEvents = useTransform(scrollYProgress, (p) => (p < 0.11 ? "auto" : "none"));

  // STAGE 2: Image Saturation Dissolve & Architectural Blueprint (0.08 - 0.30)
  const imageOverlayOpacity = useTransform(scrollYProgress, [0.06, 0.26], [0.22, 0.94], { clamp: true });
  const imageScale = useTransform(scrollYProgress, [0.00, 0.28], [1.05, 1.0], { clamp: true });

  // Architectural Grid & Cenotaph Blueprint
  const lineArtOpacity = useTransform(scrollYProgress, [0.10, 0.18, 0.25, 0.32], [0.0, 1.0, 1.0, 0.0], { clamp: true });
  const lineArtScale = useTransform(scrollYProgress, [0.10, 0.25], [1.1, 1.0], { clamp: true });
  const lineArtVisibility = useTransform(scrollYProgress, (p) => (p >= 0.08 && p <= 0.34 ? "visible" : "hidden"));

  const gridOverlayOpacity = useTransform(scrollYProgress, [0.12, 0.20, 0.28, 0.34], [0.0, 0.5, 0.5, 0.0], { clamp: true });
  const gridVisibility = useTransform(scrollYProgress, (p) => (p >= 0.10 && p <= 0.36 ? "visible" : "hidden"));

  // STAGE 3 & 4: Real Geographic Map & Tourist Explorer (0.28 - 0.78)
  const mapOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.72, 0.82], [0.0, 1.0, 1.0, 0.0], { clamp: true });
  const mapScale = useTransform(scrollYProgress, [0.28, 0.38, 0.72, 0.82], [0.96, 1.0, 1.0, 0.98], { clamp: true });
  const mapVisibility = useTransform(scrollYProgress, (p) => (p >= 0.26 && p <= 0.84 ? "visible" : "hidden"));
  const mapPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.28 && p < 0.78 ? "auto" : "none"));

  // STAGE 5: Final Luxury Booking Invitation (0.78 - 0.96)
  const ctaCardOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0.0, 1.0], { clamp: true });
  const ctaCardY = useTransform(scrollYProgress, [0.78, 0.88], [40, 0], { clamp: true });
  const ctaCardScale = useTransform(scrollYProgress, [0.78, 0.88], [0.96, 1.0], { clamp: true });
  const ctaVisibility = useTransform(scrollYProgress, (p) => (p >= 0.76 ? "visible" : "hidden"));
  const ctaPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.78 ? "auto" : "none"));

  // Global Desktop Progress Indicator Bar
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleScrollToBooking = () => {
    const bookingSection =
      document.getElementById("booking-sequence") ||
      document.getElementById("rooms") ||
      document.getElementById("amenities");
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
        "relative bg-[#080D15] text-white border-t border-brand-gold/20 overflow-visible lg:overflow-visible",
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
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu"
        >
          <div className="relative w-full h-full">
            <Image
              src={RESORT_ASSETS.heritageGeographyHero.src}
              alt={RESORT_ASSETS.heritageGeographyHero.alt}
              fill
              sizes="100vw"
              priority
              className="object-cover object-[center_35%]"
            />
          </div>

          {/* Warm Heritage Atmospheric Tone Blending Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D15]/65 via-transparent to-[#080D15]/30 pointer-events-none" />

          {/* Warm Ambient Golden & Navy Radial Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14),rgba(12,23,49,0.22)_65%,rgba(8,13,21,0.60)_100%)] pointer-events-none" />

          {/* Dynamic Darkness Overlay (Dissolves smoothly into Stage 2 Architectural Blueprint) */}
          <motion.div
            style={{
              opacity: imageOverlayOpacity,
            }}
            className="absolute inset-0 bg-[#080D15] transform-gpu"
          />
        </motion.div>

        {/* Layer 2: Archival Survey Coordinate Grid (Stage 2) */}
        <motion.div
          style={{
            opacity: gridOverlayOpacity,
            visibility: gridVisibility as any,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center transform-gpu"
        >
          <div className="w-[92%] h-[86%] border border-brand-gold/20 relative">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 divide-x divide-y divide-brand-gold/15">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="relative">
                  {i % 6 === 0 && (
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-brand-gold/60 tracking-wider">
                      +{25.34 + i * 0.002}°N · +78.63°E
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Fine Archival Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t border-l border-brand-gold/60" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t border-r border-brand-gold/60" />
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b border-l border-brand-gold/60" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b border-r border-brand-gold/60" />
          </div>
        </motion.div>

        {/* Layer 3: Architectural Line-Art Silhouette (Stage 2) */}
        <motion.div
          style={{
            opacity: lineArtOpacity,
            scale: lineArtScale,
            visibility: lineArtVisibility as any,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center transform-gpu"
        >
          <div className="w-full max-w-5xl h-[500px] relative px-8 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(197,160,89,0.35)]"
            >
              <line x1="60" y1="420" x2="940" y2="420" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.8" />
              <line x1="100" y1="432" x2="900" y2="432" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.5" />

              {/* Center Cenotaph Shikhara */}
              <path
                d="M500 80 L520 180 L545 270 L560 360 L570 420 L430 420 L440 360 L455 270 L480 180 Z"
                stroke="#F5E2B3"
                strokeWidth="2"
                fill="rgba(197,160,89,0.06)"
              />
              <circle cx="500" cy="70" r="6" stroke="#F5E2B3" strokeWidth="1.5" fill="rgba(245,226,179,0.3)" />
              <line x1="500" y1="52" x2="500" y2="70" stroke="#F5E2B3" strokeWidth="1.5" />
              <path d="M465 240 Q500 215 535 240" stroke="#E6CA85" strokeWidth="1.5" />
              <path d="M450 310 Q500 280 550 310" stroke="#E6CA85" strokeWidth="1.5" />

              {/* Left Flanking Chhatri Dome */}
              <path
                d="M280 160 L300 240 L315 320 L330 420 L230 420 L245 320 L260 240 Z"
                stroke="#C5A059"
                strokeWidth="1.5"
                strokeOpacity="0.85"
                fill="rgba(197,160,89,0.04)"
              />

              {/* Right Flanking Chhatri Dome */}
              <path
                d="M720 160 L740 240 L755 320 L770 420 L670 420 L685 320 L700 240 Z"
                stroke="#C5A059"
                strokeWidth="1.5"
                strokeOpacity="0.85"
                fill="rgba(197,160,89,0.04)"
              />

              <line x1="500" y1="42" x2="940" y2="42" stroke="#C5A059" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.4" />
              <text x="760" y="34" fill="#C5A059" fontSize="10" fontFamily="monospace" opacity="0.7" letterSpacing="1.5">
                SURVEY ELEVATION 248M · 1605 CE
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Layer 4: STAGE 3 & 4 Real Geographic Map & Tourist Explorer */}
        <motion.div
          style={{
            opacity: mapOpacity,
            scale: mapScale,
            visibility: mapVisibility as any,
            pointerEvents: mapPointerEvents as any,
          }}
          className="absolute inset-0 flex items-center justify-center p-6 xl:p-10 z-20 transform-gpu will-change-[transform,opacity]"
        >
          <div className="w-full max-w-7xl h-[680px]">
            <RealOrchhaMap
              onSelectLandmark={setSelectedLocation}
              selectedLandmarkId={selectedLocation?.id}
              className="h-full"
            />
          </div>
        </motion.div>

        {/* Layer 5: STAGE 1 Hero Title (Clean entrance and dissolution before map) */}
        <motion.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
            visibility: heroVisibility as any,
            pointerEvents: heroPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
        >
          {/* Refined Translucent Floating Information Panel (White / Warm Ivory Luxury Glass) */}
          <div className="w-full max-w-2xl text-center space-y-5 px-8 py-10 sm:px-12 sm:py-12 rounded-3xl bg-white/90 sm:bg-white/95 backdrop-blur-md border border-brand-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative overflow-hidden">
            {/* Subtle Ambient Gold Corner Highlight */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-44 h-44 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/5 border border-brand-gold/35 text-xs font-serif tracking-widest text-brand-gold-dark uppercase font-medium">
              <Compass className="w-3.5 h-3.5 text-brand-gold-dark animate-spin-slow" />
              Sacred Betwa River Valley · Bundelkhand
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy font-normal tracking-tight leading-tight">
              The Heritage Geography of Orchha
            </h2>

            <p className="font-sans text-sm sm:text-base text-brand-charcoal/80 max-w-lg mx-auto leading-relaxed">
              Discover the temples, royal architecture, and river landscapes surrounding your stay.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-brand-gold-dark font-medium tracking-widest">
              <span>SCROLL TO UNVEIL REAL GEOGRAPHY</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </motion.div>

        {/* Layer 6: STAGE 5 Final Luxury Booking Invitation */}
        <motion.div
          style={{
            opacity: ctaCardOpacity,
            y: ctaCardY,
            scale: ctaCardScale,
            visibility: ctaVisibility as any,
            pointerEvents: ctaPointerEvents as any,
          }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6 transform-gpu"
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
              Stay close to the stories of Orchha.
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
          Streamlined mobile-first geography explorer with dedicated map space
          ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden px-3 py-6 sm:px-6 sm:py-10 max-w-4xl mx-auto space-y-6">
        {/* Mobile Real Map Component */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <RealOrchhaMap
            onSelectLandmark={setSelectedLocation}
            selectedLandmarkId={selectedLocation?.id}
          />
        </div>

        {/* Mobile Booking Invitation Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0B131E] border border-brand-gold/30 text-center space-y-3 sm:space-y-4">
          <h3 className="font-serif text-xl text-white font-medium">
            Stay close to the stories of Orchha.
          </h3>
          <p className="font-sans text-xs text-white/70 max-w-md mx-auto">
            Where 16th-century royal grandeur meets the unhurried tranquility of the Betwa. Reserve your private sanctuary across from the cenotaphs.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="gold"
              size="sm"
              onClick={handleScrollToBooking}
              className="w-full sm:w-auto"
            >
              Book Your Stay
            </Button>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-white/20 text-white"
              >
                Property Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
