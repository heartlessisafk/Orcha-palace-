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
        {/* Subtle cinematic gradient so authentic resort photograph shines through warmly around the glass panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/80 via-black/40 to-black/35" />
      </div>

      {/* 2. Central Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full mt-6">
        {/* Unified Translucent Glass Panel encompassing all 5 core elements */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="relative rounded-3xl p-6 sm:p-10 md:p-12 text-center bg-gradient-to-b from-[#070F1E]/80 via-[#0B1528]/75 to-[#070F1E]/85 backdrop-blur-md backdrop-saturate-150 border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10 space-y-6 sm:space-y-8"
        >
          {/* 1. Eyebrow badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-navy-deep/80 backdrop-blur-sm border border-brand-gold/45 text-[#F3D382] text-[10px] sm:text-xs md:text-sm font-sans font-medium tracking-wider sm:tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F3D382] shrink-0" />
              <span>The Story of Orchha Resort</span>
              <span className="w-1 h-1 rounded-full bg-[#F3D382] shrink-0" />
              <span>Kanchanghat Sanctuary</span>
            </div>
          </div>

          {/* 2. Hero Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.12] tracking-tight text-balance max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Where Sacred Waters Meet{" "}
            <span className="font-serif italic text-[#F3D382] font-normal">
              Bundela Grandeur
            </span>
          </h1>

          {/* 3. Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-beige max-w-2xl mx-auto font-normal leading-relaxed text-pretty drop-shadow-sm">
            Conceived in quiet reverence beside the calm ripples of the Betwa River.
            Designed by Architect Yogesh Chandra, offering 44 sanctuary keys across
            from Orchha&apos;s 16th-century royal cenotaphs in a certified zero-pollution haven.
          </p>

          {/* 4. Verified Facts Ribbon (3 Statistic Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl sm:max-w-3xl mx-auto pt-1">
            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-2xl p-3.5 sm:p-4 text-center transition-all duration-300">
              <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
                Kanchan Ghat
              </span>
              <span className="block font-sans text-xs text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Direct Betwa Riverfront
              </span>
            </div>

            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-2xl p-3.5 sm:p-4 text-center transition-all duration-300">
              <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
                44 Sanctuary Keys
              </span>
              <span className="block font-sans text-xs text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Rooms &amp; Deluxe AC Swiss Tents
              </span>
            </div>

            <div className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm border border-white/12 hover:border-brand-gold/40 rounded-2xl p-3.5 sm:p-4 text-center transition-all duration-300">
              <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
                0% Pollution
              </span>
              <span className="block font-sans text-xs text-white/85 uppercase tracking-wider mt-0.5 font-medium">
                Certified Tranquil Belt
              </span>
            </div>
          </div>

          {/* 5. Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("betwa-setting")}
              className="w-full sm:w-auto px-8 py-3.5 shadow-floating bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-medium"
            >
              Explore The Story
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("reserve")}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md font-medium"
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
          className="pt-6 sm:pt-8 flex items-center justify-center px-2"
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
