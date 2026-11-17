"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { Button } from "@/components/ui/Button";
import { ArrowDown, ShieldCheck, Sparkles } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";

export function WeddingHero() {
  const shouldReduceMotion = useReducedMotion();
  const heroAsset = WEDDING_ASSETS.royalCoupleMandap;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-brand-navy pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
      {/* 1. Cinematic Background Image with Tailored Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroAsset.src}
          alt={heroAsset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-[1.01] transition-transform duration-1000 ease-out"
        />
        {/* Soft top gradient for crisp text legibility over floral canopy */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-transparent via-[26%] to-[50%]" />
        {/* Rich bottom gradient for smooth transition into next section and clear dock contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent from-[0%] via-[20%] to-[42%]" />
      </div>

      {/* 2. Top-Anchored Compact Typography (Keeps Couple and Canopy Unobstructed) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-2.5 sm:space-y-3.5 pt-2 sm:pt-3">
        {/* Delicate Eyebrow Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy/75 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[11px] sm:text-xs font-sans font-medium tracking-widest uppercase shadow-subtle"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
          <span>Royal Wedding Celebrations</span>
          <span className="w-1 h-1 rounded-full bg-brand-gold/60" />
          <span>The Orchha Resort</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white leading-[1.15] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] max-w-3xl mx-auto"
        >
          Where Royal Heritage Becomes{" "}
          <span className="font-serif italic text-brand-gold font-normal">
            Your Forever
          </span>
        </motion.h1>

        {/* Concise Poetic Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
          className="font-sans text-xs sm:text-sm md:text-base text-brand-beige/95 max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] text-pretty"
        >
          Exchange eternal vows amidst illuminated riverside banquet lawns, fragrant floral canopies,
          and the timeless grace of 16th-century Bundelkhand majesty.
        </motion.p>
      </div>

      {/* 3. Center Breathing Space (Unobstructed View of Couple & Floral Walk) */}
      <div className="flex-1 min-h-[160px] sm:min-h-[260px]" />

      {/* 4. Bottom Dock: Refined CTAs & Translucent Highlights Strip */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: LUXURY_EASE }}
        className="relative z-10 w-full max-w-5xl mx-auto space-y-3.5"
      >
        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="gold"
            size="pill"
            onClick={() => scrollToSection("wedding-enquiry")}
            className="w-full sm:w-auto px-7 py-3 shadow-floating font-medium text-xs sm:text-sm"
          >
            <span>Enquire About Your Wedding</span>
            <ArrowDown className="w-3.5 h-3.5 ml-2" />
          </Button>

          <Button
            variant="navy-outline"
            size="pill"
            onClick={() => scrollToSection("wedding-venues")}
            className="w-full sm:w-auto px-7 py-3 backdrop-blur-md text-xs sm:text-sm"
          >
            <span>Explore Wedding Spaces</span>
          </Button>
        </div>

        {/* Translucent Venue Highlights Strip */}
        <div className="bg-brand-navy/80 backdrop-blur-md border border-white/12 rounded-xl sm:rounded-full py-2.5 px-4 sm:px-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          {/* Authentic Property Photography Badge */}
          <div className="flex items-center gap-2 text-[11px] font-sans text-brand-gold/90 tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <span className="text-white/90 font-medium">Authentic Orchha Resort Wedding Photography</span>
          </div>

          {/* Key Venue Highlights Ribbon */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-xs text-white/80 font-sans">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span>Grand Riverfront Lawns</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span>1,500 sq ft Ballroom</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span>50 Heritage Rooms</span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
