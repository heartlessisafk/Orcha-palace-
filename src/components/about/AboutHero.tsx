"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles, Shield } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const heroAsset = ABOUT_HERITAGE_ASSETS.heroPavilions;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 1. Cinematic Background Image with Atmospheric Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroAsset.src}
          alt={heroAsset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle cinematic gradient and warm heritage ambient tones so the aerial sunset shines through warmly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/75 via-[#081222]/35 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
      </div>

      {/* 2. Central Content Container (Proportionate & Refined) */}
      <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto w-full mt-2 sm:mt-4">
        {/* Unified Translucent Glass Panel encompassing all 5 core elements */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="relative rounded-3xl p-5 sm:p-7 md:p-8 text-center bg-gradient-to-b from-[#070F1E]/80 via-[#0B1528]/75 to-[#070F1E]/85 backdrop-blur-md backdrop-saturate-150 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10 space-y-4 sm:space-y-5"
        >
          {/* 1. Eyebrow badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-brand-navy-deep/80 backdrop-blur-sm border border-brand-gold/45 text-[#F3D382] text-[10px] sm:text-xs font-sans font-medium tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3 h-3 text-[#F3D382] shrink-0" />
              <span>The Story of Orchha Resort</span>
              <span className="w-1 h-1 rounded-full bg-[#F3D382] shrink-0" />
              <span>Kanchanghat Sanctuary</span>
            </div>
          </div>

          {/* 2. Hero Title */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-[1.15] tracking-tight text-balance max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Where Sacred Waters Meet{" "}
            <span className="font-serif italic text-[#F3D382] font-normal">
              Bundela Grandeur
            </span>
          </h1>

          {/* 3. Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-brand-beige max-w-xl mx-auto font-normal leading-relaxed text-pretty drop-shadow-sm">
            Conceived in quiet reverence beside the calm ripples of the Betwa River.
            Designed by Architect Yogesh Chandra, offering 50 rooms across
            from Orchha&apos;s 16th-century royal cenotaphs in a certified zero-pollution haven.
          </p>

          {/* 4. Verified Facts Ribbon (3 Statistic Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-xl sm:max-w-2xl mx-auto pt-0.5">
            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-300">
              <span className="block font-serif text-lg sm:text-xl text-[#F3D382] font-medium drop-shadow-sm">
                Kanchan Ghat
              </span>
              <span className="block font-sans text-[10px] sm:text-[11px] text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Direct Betwa Riverfront
              </span>
            </div>

            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-300">
              <span className="block font-serif text-lg sm:text-xl text-[#F3D382] font-medium drop-shadow-sm">
                50 Rooms
              </span>
              <span className="block font-sans text-[10px] sm:text-[11px] text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Garden &amp; Pool Facing
              </span>
            </div>

            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-xl p-2.5 sm:p-3 text-center transition-all duration-300">
              <span className="block font-serif text-lg sm:text-xl text-[#F3D382] font-medium drop-shadow-sm">
                0% Pollution
              </span>
              <span className="block font-sans text-[10px] sm:text-[11px] text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Certified Tranquil Belt
              </span>
            </div>
          </div>

          {/* 5. Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection("betwa-setting")}
              className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-2.5 shadow-floating bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-medium text-xs sm:text-sm"
            >
              Explore The Story
              <ArrowDown className="w-3.5 h-3.5 ml-1.5" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("reserve")}
              className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md font-medium text-xs sm:text-sm"
            >
              Reserve Your Sanctuary Stay
            </Button>
          </div>
        </motion.div>

        {/* Bottom Photograph Attribution */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-4 sm:pt-6 flex items-center justify-center px-2"
        >
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-sans text-white/90 tracking-wider uppercase px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-navy-deep/85 backdrop-blur-md border border-white/15 shadow-sm text-center">
            <Shield className="w-3.5 h-3.5 text-[#F3D382] shrink-0" />
            <span>Official Resort Photograph • Evening Pavilions &amp; Lawns at The Orchha Resort</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
