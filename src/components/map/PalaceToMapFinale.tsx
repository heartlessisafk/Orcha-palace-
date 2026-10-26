"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ORCHHA_HERITAGE_LOCATIONS, HeritageLocationMarker } from "@/data/orchha-map";
import { RESORT_ASSETS } from "@/lib/assets";
import { SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  Clock,
  ExternalLink,
  X,
  Navigation,
  Sparkles,
  ChevronRight,
  Landmark,
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
  // STRICT 5-STAGE NON-OVERLAPPING SCROLL CHOREOGRAPHY
  // ─────────────────────────────────────────────────────────────────────────

  // STAGE A: Hero Headline Lift & Clean Exit (0.00 - 0.14)
  // Guaranteed complete exit by 0.12 with visibility hidden above 0.14
  const heroTextOpacity = useTransform(scrollYProgress, [0.00, 0.11], [1.0, 0.0], { clamp: true });
  const heroTextY = useTransform(scrollYProgress, [0.00, 0.11], [0, -50], { clamp: true });
  const heroVisibility = useTransform(scrollYProgress, (p) => (p >= 0.13 ? "hidden" : "visible"));
  const heroPointerEvents = useTransform(scrollYProgress, (p) => (p < 0.11 ? "auto" : "none"));

  // STAGE B: Image Saturation Dissolve & Architectural Blueprint (0.10 - 0.34)
  const imageSaturation = useTransform(scrollYProgress, [0.06, 0.22], [1.0, 0.0], { clamp: true });
  const imageOverlayOpacity = useTransform(scrollYProgress, [0.06, 0.26], [0.35, 0.94], { clamp: true });
  const imageScale = useTransform(scrollYProgress, [0.00, 0.28], [1.05, 1.0], { clamp: true });

  // Architectural Outline & Coordinate Grid (emerges at 0.12, peaks at 0.20-0.26, fades into map by 0.36)
  const lineArtOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.26, 0.34], [0.0, 1.0, 1.0, 0.0], { clamp: true });
  const lineArtScale = useTransform(scrollYProgress, [0.12, 0.26], [1.12, 1.0], { clamp: true });

  const gridOverlayOpacity = useTransform(scrollYProgress, [0.16, 0.24, 0.34, 0.40], [0.0, 0.6, 0.6, 0.1], { clamp: true });
  const gridScale = useTransform(scrollYProgress, [0.16, 0.26], [1.3, 1.0], { clamp: true });

  // STAGE C & D: Antique Cartographic Atlas & Anti-Collision Geography (0.28 - 0.80)
  // Emerges strictly AFTER the Stage A headline is gone; gently dissolves before Stage E emerges
  const mapOpacity = useTransform(scrollYProgress, [0.28, 0.40, 0.74, 0.84], [0.0, 1.0, 1.0, 0.0], { clamp: true });
  const mapScale = useTransform(scrollYProgress, [0.28, 0.42, 0.74, 0.84], [0.95, 1.0, 1.0, 0.98], { clamp: true });
  const mapPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.28 && p < 0.80 ? "auto" : "none"));

  // STAGE E: Final Closing Luxury Invitation (0.80 - 0.96)
  const ctaCardOpacity = useTransform(scrollYProgress, [0.80, 0.90], [0.0, 1.0], { clamp: true });
  const ctaCardY = useTransform(scrollYProgress, [0.80, 0.90], [40, 0], { clamp: true });
  const ctaCardScale = useTransform(scrollYProgress, [0.80, 0.90], [0.96, 1.0], { clamp: true });
  const ctaPointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.80 ? "auto" : "none"));

  // Global Desktop Progress Indicator Bar
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

          {/* Dynamic Darkness Overlay */}
          <motion.div
            style={{
              opacity: imageOverlayOpacity,
            }}
            className="absolute inset-0 bg-[#080D15]"
          />

          {/* Subtle Ambient Radial Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08),transparent_75%)]" />
        </motion.div>

        {/* Layer 2: Archival Survey Coordinate Grid (Stage B) */}
        <motion.div
          style={{
            opacity: gridOverlayOpacity,
            scale: gridScale,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="w-[90%] h-[84%] border border-brand-gold/20 relative">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 divide-x divide-y divide-brand-gold/15">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="relative">
                  {i % 6 === 0 && (
                    <span className="absolute top-1 left-1.5 text-[8px] font-mono text-brand-gold/60 tracking-wider">
                      +{25.34 + i * 0.002}°N
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Fine Archival Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-brand-gold/60" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-brand-gold/60" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-brand-gold/60" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-brand-gold/60" />
          </div>
        </motion.div>

        {/* Layer 3: STAGE B Architectural Line-Art Silhouette (Chhatris & Domes) */}
        <motion.div
          style={{
            opacity: lineArtOpacity,
            scale: lineArtScale,
          }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="w-full max-w-5xl h-[520px] relative px-8 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(197,160,89,0.35)]"
            >
              {/* Ground & Plinth lines */}
              <line x1="60" y1="420" x2="940" y2="420" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.8" />
              <line x1="100" y1="432" x2="900" y2="432" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.5" />

              {/* Center Monument: Grand Shikhara / Cenotaph Spire */}
              <path
                d="M500 80 L520 180 L545 270 L560 360 L570 420 L430 420 L440 360 L455 270 L480 180 Z"
                stroke="#F5E2B3"
                strokeWidth="2"
                fill="rgba(197,160,89,0.06)"
              />
              {/* Spire Kalash & Finial */}
              <circle cx="500" cy="70" r="6" stroke="#F5E2B3" strokeWidth="1.5" fill="rgba(245,226,179,0.3)" />
              <line x1="500" y1="52" x2="500" y2="70" stroke="#F5E2B3" strokeWidth="1.5" />

              {/* Chhatri Arched Tiers */}
              <path d="M465 240 Q500 215 535 240" stroke="#E6CA85" strokeWidth="1.5" />
              <path d="M450 310 Q500 280 550 310" stroke="#E6CA85" strokeWidth="1.5" />
              <path d="M435 380 Q500 340 565 380" stroke="#E6CA85" strokeWidth="1.5" />

              {/* Left Flanking Chhatri Dome */}
              <path
                d="M280 160 L300 240 L315 320 L330 420 L230 420 L245 320 L260 240 Z"
                stroke="#C5A059"
                strokeWidth="1.5"
                strokeOpacity="0.85"
                fill="rgba(197,160,89,0.04)"
              />
              <circle cx="280" cy="150" r="5" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="280" y1="136" x2="280" y2="150" stroke="#C5A059" strokeWidth="1.2" />
              <path d="M255 280 Q280 260 305 280" stroke="#C5A059" strokeWidth="1.2" />

              {/* Right Flanking Chhatri Dome */}
              <path
                d="M720 160 L740 240 L755 320 L770 420 L670 420 L685 320 L700 240 Z"
                stroke="#C5A059"
                strokeWidth="1.5"
                strokeOpacity="0.85"
                fill="rgba(197,160,89,0.04)"
              />
              <circle cx="720" cy="150" r="5" stroke="#C5A059" strokeWidth="1.2" />
              <line x1="720" y1="136" x2="720" y2="150" stroke="#C5A059" strokeWidth="1.2" />
              <path d="M695 280 Q720 260 745 280" stroke="#C5A059" strokeWidth="1.2" />

              {/* Dimension Annotation Line */}
              <line x1="500" y1="42" x2="940" y2="42" stroke="#C5A059" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.4" />
              <text x="760" y="34" fill="#C5A059" fontSize="10" fontFamily="monospace" opacity="0.7" letterSpacing="1.5">
                SURVEY ELEVATION 248M · 1605 CE
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Layer 4: STAGE C & D Museum Cartographic Atlas of Orchha */}
        <motion.div
          style={{
            opacity: mapOpacity,
            scale: mapScale,
            pointerEvents: mapPointerEvents as any,
          }}
          className="absolute inset-0 flex items-center justify-center p-6 xl:p-10 z-20"
        >
          <div className="w-full max-w-6xl h-[650px] rounded-2xl bg-[#090F18]/95 border border-brand-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col backdrop-blur-xl">
            {/* Museum Map Top Title & Curatorial Bar */}
            <div className="px-6 py-3.5 border-b border-brand-gold/20 flex items-center justify-between bg-black/40 z-20">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 border border-brand-gold/35 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-base tracking-wide text-white">
                    The Heritage Geography of Orchha
                  </h3>
                  <p className="font-sans text-[11px] text-brand-gold/70">
                    Sacred Betwa River Valley · Bundelkhand · 25.3516° N, 78.6424° E
                  </p>
                </div>
              </div>

              {/* Filter Pills */}
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
                        ? "bg-brand-gold text-brand-navy border-brand-gold font-medium shadow-sm"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-brand-gold/40 hover:text-white"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Vector Cartographic Canvas */}
            <div className="flex-1 relative w-full h-full overflow-hidden bg-[#0A1018]">
              {/* SVG Cartographic Masterwork: Betwa River, Island, Contours & Archival Geometry */}
              <svg
                viewBox="0 0 1000 650"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  {/* Antique River Gradient */}
                  <linearGradient id="authenticBetwaGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0E1E2F" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#142B42" stopOpacity="0.95" />
                    <stop offset="75%" stopColor="#183654" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#112437" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Fort Island Channel Gradient */}
                  <linearGradient id="fortChannelGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0F2236" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#142E48" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#102235" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Fine Gold Pattern for Shoals & River Islands */}
                  <pattern id="riverSandbarPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="6" y2="6" stroke="#C5A059" strokeWidth="0.6" strokeOpacity="0.15" />
                  </pattern>
                </defs>

                {/* Subtle Archival Survey Coordinate Lat/Long Lines */}
                <line x1="100" y1="0" x2="100" y2="650" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="300" y1="0" x2="300" y2="650" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="500" y1="0" x2="500" y2="650" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="700" y1="0" x2="700" y2="650" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="900" y1="0" x2="900" y2="650" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />

                <line x1="0" y1="150" x2="1000" y2="150" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="0" y1="350" x2="1000" y2="350" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />
                <line x1="0" y1="550" x2="1000" y2="550" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.12" />

                {/* Topographic Granite Elevation Contours */}
                <path
                  d="M 60 120 C 180 80, 260 160, 380 140 C 420 130, 430 80, 480 60"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.18"
                  strokeDasharray="5 4"
                  fill="none"
                />
                <path
                  d="M 80 240 C 160 210, 240 280, 360 250 C 400 240, 410 200, 440 180"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.18"
                  strokeDasharray="5 4"
                  fill="none"
                />
                <path
                  d="M 60 480 C 180 430, 280 520, 420 460 C 450 440, 460 380, 480 360"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.18"
                  strokeDasharray="5 4"
                  fill="none"
                />
                <path
                  d="M 720 580 C 820 540, 890 590, 960 560"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.15"
                  strokeDasharray="5 4"
                  fill="none"
                />
                <path
                  d="M 740 400 C 830 360, 900 420, 970 380"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.15"
                  strokeDasharray="5 4"
                  fill="none"
                />

                {/* Ancient Heritage Carriage Pathway (Laxmi Temple to Ram Raja to Stone Bridge) */}
                <path
                  d="M 180 110 C 220 180, 260 220, 300 250 L 300 380"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.35"
                  fill="none"
                />
                <path
                  d="M 300 250 C 350 250, 390 270, 430 280"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.35"
                  fill="none"
                />

                {/* THE SACRED BETWA RIVER MAIN CHANNEL (Natural Organic Meander South to North) */}
                <path
                  d="M 680 650
                     C 650 560, 630 480, 610 400
                     C 595 330, 580 270, 565 190
                     C 555 120, 560 60, 550 0
                     L 615 0
                     C 630 60, 635 120, 645 190
                     C 660 270, 680 340, 700 410
                     C 725 490, 755 570, 780 650
                     Z"
                  fill="url(#authenticBetwaGradient)"
                  stroke="#2E5579"
                  strokeWidth="1"
                  strokeOpacity="0.75"
                />

                {/* River Shoreline Ripple Texture */}
                <path
                  d="M 670 650 C 640 560, 620 480, 600 400 C 585 330, 570 270, 555 190 C 545 120, 550 60, 540 0"
                  stroke="#3B6C9A"
                  strokeWidth="0.75"
                  strokeDasharray="4 6"
                  strokeOpacity="0.5"
                  fill="none"
                />
                <path
                  d="M 790 650 C 765 570, 735 490, 710 410 C 690 340, 670 270, 655 190 C 645 120, 640 60, 625 0"
                  stroke="#3B6C9A"
                  strokeWidth="0.75"
                  strokeDasharray="4 6"
                  strokeOpacity="0.5"
                  fill="none"
                />

                {/* RIVER BETWA SECONDARY BRANCH (Forming Orchha Fort Island) */}
                <path
                  d="M 605 380
                     C 550 350, 480 330, 450 280
                     C 425 240, 440 170, 475 120
                     C 510 70, 540 30, 550 0
                     L 520 0
                     C 505 35, 480 80, 445 130
                     C 405 185, 395 250, 420 300
                     C 455 355, 530 385, 595 405
                     Z"
                  fill="url(#fortChannelGradient)"
                  stroke="#2E5579"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                />

                {/* ORCHHA FORT ISLAND (Formed between East & West Channels) */}
                <path
                  d="M 600 375
                     C 545 345, 470 325, 445 280
                     C 425 240, 440 170, 475 120
                     C 510 70, 540 35, 550 0
                     C 560 60, 555 120, 565 190
                     C 580 270, 595 330, 600 375
                     Z"
                  fill="#0D1622"
                  stroke="#C5A059"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />

                {/* Fort Island Rocky Texture Hatching */}
                <path
                  d="M 480 150 L 530 190 M 470 200 L 540 250 M 460 260 L 520 300"
                  stroke="#C5A059"
                  strokeWidth="0.6"
                  strokeDasharray="2 4"
                  strokeOpacity="0.25"
                />

                {/* Historic Stone Multi-Arched Bundela Bridge (Spanning western channel to Island) */}
                <g>
                  {/* Bridge Deck */}
                  <line x1="428" y1="285" x2="455" y2="280" stroke="#D4C3A3" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="428" y1="285" x2="455" y2="280" stroke="#080D15" strokeWidth="1.2" strokeDasharray="3 2" />
                  {/* Bridge Pier Piers */}
                  <circle cx="434" cy="284" r="1.5" fill="#C5A059" />
                  <circle cx="442" cy="282" r="1.5" fill="#C5A059" />
                  <circle cx="450" cy="281" r="1.5" fill="#C5A059" />
                  {/* Bridge Label */}
                  <text x="390" y="302" fill="#D4C3A3" fontSize="8" fontFamily="serif" opacity="0.65" letterSpacing="1">
                    STONE BRIDGE
                  </text>
                </g>

                {/* River Vetravati Flow Text */}
                <text
                  x="635"
                  y="520"
                  fill="#78A6D0"
                  fontSize="8.5"
                  fontFamily="serif"
                  letterSpacing="3"
                  opacity="0.6"
                  transform="rotate(-76 635 520)"
                >
                  RIVER BETWA (VETRAVATI) ▲ FLOW NORTH
                </text>

                {/* Fine Antique 8-Point Compass Rose (Bottom Right) */}
                <g transform="translate(930, 580)">
                  <circle cx="0" cy="0" r="26" fill="#080D15" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.4" />
                  <circle cx="0" cy="0" r="23" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="2 3" strokeOpacity="0.25" />
                  {/* 8-point star points */}
                  <polygon points="0,-22 4,-6 0,0 -4,-6" fill="#C5A059" />
                  <polygon points="0,-22 -4,-6 0,0" fill="#F5E2B3" />
                  <polygon points="0,22 4,6 0,0 -4,6" fill="#8C7036" />
                  <polygon points="22,0 6,4 0,0 6,-4" fill="#8C7036" />
                  <polygon points="-22,0 -6,4 0,0 -6,-4" fill="#8C7036" />
                  {/* Compass Labels */}
                  <text x="-3" y="-25" fill="#F5E2B3" fontSize="8" fontFamily="serif" fontWeight="bold">N</text>
                  <text x="-2.5" y="32" fill="#C5A059" fontSize="7" fontFamily="serif" opacity="0.6">S</text>
                  <text x="26" y="2.5" fill="#C5A059" fontSize="7" fontFamily="serif" opacity="0.6">E</text>
                  <text x="-34" y="2.5" fill="#C5A059" fontSize="7" fontFamily="serif" opacity="0.6">W</text>
                </g>

                {/* ─────────────────────────────────────────────────────────────
                    SVG HAIRLINE LEADER LINES (ANTI-COLLISION CARTOGRAPHIC SYSTEM)
                    Strict non-overlapping angles extending from pin to label zone
                    ───────────────────────────────────────────────────────────── */}
                {/* 1. The Orchha Resort Leader: x: 670, y: 312 -> x: 720, y: 312 */}
                <line x1="670" y1="312" x2="720" y2="312" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.85" />
                <circle cx="720" cy="312" r="1.5" fill="#F5E2B3" />

                {/* 2. 14 Royal Cenotaphs Leader: x: 670, y: 494 -> x: 720, y: 494 */}
                <line x1="670" y1="494" x2="720" y2="494" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="720" cy="494" r="1.5" fill="#C5A059" />

                {/* 3. Orchha Fort Island Leader: x: 500, y: 170 -> x: 500, y: 120 */}
                <line x1="500" y1="170" x2="500" y2="120" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="500" cy="120" r="1.5" fill="#C5A059" />

                {/* 4. Ram Raja Temple Leader: x: 300, y: 247 -> x: 260, y: 247 */}
                <line x1="300" y1="247" x2="260" y2="247" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="260" cy="247" r="1.5" fill="#C5A059" />

                {/* 5. Chaturbhuj Temple Leader: x: 300, y: 390 -> x: 260, y: 390 */}
                <line x1="300" y1="390" x2="260" y2="390" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="260" cy="390" r="1.5" fill="#C5A059" />

                {/* 6. Laxmi Narayan Temple Leader: x: 180, y: 104 -> x: 140, y: 104 */}
                <line x1="180" y1="104" x2="140" y2="104" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="140" cy="104" r="1.5" fill="#C5A059" />
              </svg>

              {/* ─────────────────────────────────────────────────────────────
                  PINS & TYPOGRAPHIC CALLOUTS (ZERO OVERLAP GUARANTEED)
                  Dedicated quadrants with museum serif typography
                  ───────────────────────────────────────────────────────────── */}
              {displayedLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                const isPrimary = loc.isPrimary;

                return (
                  <React.Fragment key={loc.id}>
                    {/* The Geographic Pin Marker */}
                    <button
                      onClick={() => setSelectedLocation(loc)}
                      style={{
                        left: `${loc.mapCoords.x}%`,
                        top: `${loc.mapCoords.y}%`,
                      }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex items-center justify-center focus:outline-none transition-transform duration-200",
                        isSelected && "scale-125 z-40"
                      )}
                      aria-label={`Inspect ${loc.name}`}
                    >
                      {isPrimary ? (
                        /* The Orchha Resort Primary Monogram / Faceted Star */
                        <div className="relative flex items-center justify-center">
                          {/* Warm static luminous halo */}
                          <div className="absolute -inset-2 rounded-full bg-brand-gold/20 blur-[3px]" />
                          <div className="w-6 h-6 rounded-full bg-[#080D15] border-2 border-brand-gold flex items-center justify-center shadow-lg">
                            {/* Inner 8-point gold crest symbol */}
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-gold">
                              <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
                              <circle cx="12" cy="12" r="2" fill="#080D15" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        /* Heritage Landmark Marker: Fine Polished Brass Disc with Center Dot */
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-200 shadow-md",
                            isSelected
                              ? "bg-brand-gold border-white ring-2 ring-brand-gold/40 scale-110"
                              : "bg-[#0A1018] border-brand-gold/70 group-hover:border-brand-gold group-hover:scale-110"
                          )}
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isSelected ? "bg-brand-navy" : "bg-brand-gold"
                            )}
                          />
                        </div>
                      )}
                    </button>

                    {/* Dedicated Non-Overlapping Typographic Callout Label */}
                    <div
                      data-landmark-label={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      style={
                        loc.callout.quadrant === "E"
                          ? { left: "72%", top: "48%", transform: "translateY(-50%)" }
                          : loc.callout.quadrant === "SE"
                          ? { left: "72%", top: "76%", transform: "translateY(-50%)" }
                          : loc.callout.quadrant === "N"
                          ? { left: "50%", top: "12%", transform: "translateX(-50%)" }
                          : loc.callout.quadrant === "W"
                          ? { right: "75%", top: "38%", transform: "translateY(-50%)" }
                          : loc.callout.quadrant === "SW"
                          ? { right: "75%", top: "60%", transform: "translateY(-50%)" }
                          : { right: "86%", top: "16%", transform: "translateY(-50%)" }
                      }
                      className={cn(
                        "absolute z-30 cursor-pointer select-none transition-all duration-200",
                        loc.callout.align === "right" && "text-right",
                        loc.callout.align === "center" && "text-center",
                        loc.callout.align === "left" && "text-left",
                        isSelected ? "opacity-100" : "opacity-85 hover:opacity-100"
                      )}
                    >
                      {/* Subtitle / Category Tag */}
                      <span
                        className={cn(
                          "block text-[9.5px] uppercase font-sans tracking-widest font-medium leading-none mb-1",
                          isPrimary
                            ? "text-brand-gold font-semibold"
                            : isSelected
                            ? "text-brand-gold"
                            : "text-white/60"
                        )}
                      >
                        {isPrimary ? "★ Primary Sanctuary" : loc.callout.subtitle}
                      </span>

                      {/* Monument / Resort Title */}
                      <span
                        className={cn(
                          "block font-serif tracking-wide leading-tight",
                          isPrimary
                            ? "text-base font-medium text-[#F5E2B3]"
                            : isSelected
                            ? "text-sm text-white font-medium underline underline-offset-4 decoration-brand-gold/60"
                            : "text-sm text-white/90 group-hover:text-white"
                        )}
                      >
                        {loc.name}
                      </span>

                      {/* Subtle Distance & Orientation Caption */}
                      <span className="block text-[10px] font-sans text-brand-gold/75 mt-0.5 leading-none">
                        {loc.distanceFromResort}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Museum Corner Curatorial Inspector Drawer (Selected Landmark) */}
              <AnimatePresence>
                {selectedLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-5 left-5 z-40 max-w-sm w-full bg-[#070D16]/95 border border-brand-gold/35 rounded-xl p-4 shadow-2xl backdrop-blur-md space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium text-brand-gold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-brand-gold" />
                          <span>{selectedLocation.badgeText}</span>
                        </div>
                        <h4 className="font-serif text-base text-white font-normal mt-0.5 leading-snug">
                          {selectedLocation.name}
                        </h4>
                        {selectedLocation.hindiName && (
                          <span className="text-[11px] text-white/50 block font-serif">
                            {selectedLocation.hindiName}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedLocation(null)}
                        className="text-white/40 hover:text-white p-1 rounded-full transition-colors"
                        aria-label="Close attraction card"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-sans text-[11.5px] text-white/80 leading-relaxed">
                      {selectedLocation.description}
                    </p>

                    <div className="pt-2 border-t border-brand-gold/20 flex items-center justify-between text-[11px] text-brand-gold/90 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-brand-gold" />
                        <span>{selectedLocation.walkingTime}</span>
                      </div>
                      <div className="text-[10px] text-white/50 font-mono">
                        {selectedLocation.realCoordinates}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Layer 5: STAGE A Opening Monumental Headline (Clean Exit by 0.12) */}
        <motion.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
            visibility: heroVisibility as any,
            pointerEvents: heroPointerEvents as any,
          }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6"
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

        {/* Layer 6: STAGE E The Final Closing Invitation */}
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
          Curated museum atlas layout with touch-friendly navigation
          ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden px-4 py-16 sm:px-6 max-w-3xl mx-auto space-y-10">
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

        {/* Mobile Curated Cartographic Atlas */}
        <div className="bg-[#090F18] border border-brand-gold/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-brand-gold/20 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-serif text-white tracking-wide">
                Heritage Atlas of Orchha
              </span>
            </div>
            <span className="text-[10px] font-mono text-brand-gold/70">25.35°N, 78.64°E</span>
          </div>

          {/* Interactive Mobile Map Canvas */}
          <div className="relative h-[360px] w-full bg-[#0A1018] overflow-hidden">
            {/* Authentic Mobile River Channel */}
            <svg
              viewBox="0 0 400 360"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Betwa River Path */}
              <path
                d="M 270 360 C 240 280, 225 220, 215 150 C 205 90, 190 40, 185 0 L 220 0 C 230 40, 245 90, 255 150 C 265 220, 280 280, 310 360 Z"
                fill="#142B42"
                stroke="#2E5579"
                strokeWidth="1"
                opacity="0.85"
              />
              {/* Fort Island Branch */}
              <path
                d="M 220 200 C 180 170, 160 110, 165 40 L 180 0 L 195 0 C 185 40, 195 100, 225 150 Z"
                fill="#0F2236"
                stroke="#2E5579"
                strokeWidth="0.8"
                opacity="0.75"
              />
              {/* Bridge */}
              <line x1="165" y1="130" x2="195" y2="125" stroke="#D4C3A3" strokeWidth="3" />
            </svg>

            {/* Mobile Touch Pins */}
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
                    "absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center p-2.5 transition-all duration-200 focus:outline-none",
                    isSelected && "scale-115 z-30"
                  )}
                  aria-label={`Select ${loc.name}`}
                >
                  {isPrimary ? (
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-1.5 rounded-full bg-brand-gold/25 blur-[2px]" />
                      <div className="w-6 h-6 rounded-full bg-[#080D15] border-2 border-brand-gold flex items-center justify-center shadow-lg">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-brand-gold">
                          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-200",
                        isSelected
                          ? "bg-brand-gold border-white ring-2 ring-brand-gold/40"
                          : "bg-[#0A1018] border-brand-gold"
                      )}
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-brand-navy" : "bg-brand-gold"
                        )}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Location Inspector Card */}
          {selectedLocation && (
            <div className="p-5 bg-[#080D15] border-t border-brand-gold/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans text-brand-gold uppercase tracking-wider font-medium">
                  {selectedLocation.badgeText}
                </span>
                <span className="text-[11px] text-white/50">{selectedLocation.walkingTime}</span>
              </div>
              <h4 className="font-serif text-lg text-white">{selectedLocation.name}</h4>
              <p className="font-sans text-xs text-white/80 leading-relaxed">
                {selectedLocation.description}
              </p>
              <div className="text-[11px] text-brand-gold/90 font-mono pt-1 flex items-center justify-between">
                <span>Distance: {selectedLocation.distanceFromResort}</span>
                <span className="text-white/40">{selectedLocation.realCoordinates}</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Final Closing Invitation */}
        <div className="bg-[#090F18] border border-brand-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
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
                className="w-full border-white/20 text-white hover:bg-white/10"
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
