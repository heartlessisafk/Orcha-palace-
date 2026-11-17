"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { ArrowDown } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";

export function WeddingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const heroAsset = WEDDING_ASSETS.royalCoupleMandap;

  // Track scroll progress through the hero section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Cinematic scroll-driven zoom (starts wide, pushes smoothly into the couple)
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.0, 1.18]
  );

  // Subtle upward crane/dolly movement keeping the couple as the primary focal point
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -32]
  );

  // Text content dissolves softly as visitor scrolls into the hero
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.48],
    [1, 0]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.48],
    shouldReduceMotion ? [0, 0] : [0, -36]
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] overflow-hidden bg-[#080D15] text-white"
    >
      {/* ─────────────────────────────────────────────────────────────────
          1. CINEMATIC BACKGROUND PHOTOGRAPH WITH SCROLL-DRIVEN ZOOM
          Starts in a wide, expansive composition and slowly pushes in
          towards the royal couple as the visitor scrolls.
          ───────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
          transformOrigin: "center 45%",
        }}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
      >
        <Image
          src={heroAsset.src}
          alt={heroAsset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />

        {/* Ethereal top vignette: ensures effortless text legibility while letting chandelier glow through */}
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Subtle radial focus vignette: softly guides attention toward the central couple */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_45%,rgba(8,13,21,0.38)_100%)] pointer-events-none" />

        {/* Ground shadow vignette: grounds the CTAs and blends softly into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#080D15]/90 via-[#080D15]/30 to-transparent pointer-events-none" />
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────
          2. EDITORIAL TYPOGRAPHY & REFINED LUXURY CTAS
          Framed cleanly with ample negative space to let the photograph dominate.
          ───────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        className="relative z-10 flex flex-col justify-between h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10 text-center transform-gpu"
      >
        {/* Editorial Heading & Evocative Description */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#FAF6F0] leading-[1.12] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            Where Royal Heritage Becomes{" "}
            <span className="italic font-serif text-[#E6CA85] whitespace-nowrap">
              Your Forever
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="font-sans text-xs sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] text-balance"
          >
            Exchange eternal vows amidst illuminated riverside banquet lawns, fragrant floral canopies,
            and the timeless grace of 16th-century Bundelkhand majesty.
          </motion.p>
        </div>

        {/* Center Breathing Room: Completely unobstructed view of the couple, chandeliers & floral arch */}
        <div className="flex-1 min-h-[140px] sm:min-h-[220px]" />

        {/* Refined Action CTAs (Understated Luxury Styling, High Contrast) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full"
        >
          <button
            onClick={() => scrollToSection("wedding-enquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0A1018] font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(197,160,89,0.4)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <span>Enquire About Your Wedding</span>
            <ArrowDown className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollToSection("wedding-venues")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-black/30 hover:bg-black/50 border border-white/35 hover:border-[#C5A059] text-white hover:text-[#F4DFC0] font-sans text-xs sm:text-sm font-medium tracking-wider uppercase rounded-md backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <span>Explore Wedding Spaces</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
