"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles, Shield, Compass, MapPin } from "lucide-react";
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
      {/* 1. Cinematic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroAsset.src}
          alt={heroAsset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Neutral luxury scrim to preserve authentic warm golden teak & heritage salon tones while ensuring optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        {/* Concentrated central feathered elliptical gradient behind the text content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(6, 12, 27, 0.88) 0%, rgba(6, 12, 27, 0.6) 50%, transparent 95%)",
          }}
        />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 mt-6">
        {/* Eyebrow badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy-deep/90 backdrop-blur-md border border-brand-gold/50 text-[#F3D382] text-xs sm:text-sm font-sans font-medium tracking-widest uppercase shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F3D382]" />
          <span>The Story of Orchha Resort</span>
          <span className="w-1 h-1 rounded-full bg-[#F3D382]" />
          <span>Kanchanghat Sanctuary</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.12] tracking-tight text-balance max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          Where Sacred Waters Meet{" "}
          <span className="font-serif italic text-[#F3D382] font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Bundela Grandeur
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASE }}
          className="font-sans text-base sm:text-lg md:text-xl text-brand-beige max-w-2xl mx-auto font-normal leading-relaxed text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        >
          Conceived in quiet reverence beside the calm ripples of the Betwa River.
          Designed by Architect Yogesh Chandra, offering 44 sanctuary keys across
          from Orchha&apos;s 16th-century royal cenotaphs in a certified zero-pollution haven.
        </motion.p>

        {/* Verified Facts Ribbon */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: LUXURY_EASE }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2"
        >
          <div className="bg-brand-navy-deep/85 backdrop-blur-md border border-brand-gold/40 rounded-xl p-3 sm:p-4 text-center shadow-xl transition-all">
            <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
              Kanchan Ghat
            </span>
            <span className="block font-sans text-xs text-white/95 uppercase tracking-wider mt-0.5 font-medium">
              Direct Betwa Riverfront
            </span>
          </div>

          <div className="bg-brand-navy-deep/85 backdrop-blur-md border border-brand-gold/40 rounded-xl p-3 sm:p-4 text-center shadow-xl transition-all">
            <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
              44 Sanctuary Keys
            </span>
            <span className="block font-sans text-xs text-white/95 uppercase tracking-wider mt-0.5 font-medium">
              Rooms &amp; Deluxe AC Swiss Tents
            </span>
          </div>

          <div className="bg-brand-navy-deep/85 backdrop-blur-md border border-brand-gold/40 rounded-xl p-3 sm:p-4 text-center shadow-xl transition-all">
            <span className="block font-serif text-xl sm:text-2xl text-[#F3D382] font-medium drop-shadow-sm">
              0% Pollution
            </span>
            <span className="block font-sans text-xs text-white/95 uppercase tracking-wider mt-0.5 font-medium">
              Certified Tranquil Belt
            </span>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
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
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy-deep/60 backdrop-blur-md border-white/40 text-white hover:bg-white/15 hover:border-white/70 shadow-md font-medium"
          >
            Reserve Your Sanctuary Stay
          </Button>
        </motion.div>

        {/* Genuine Photography Label */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-6 sm:pt-10 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-sans text-white/90 tracking-wider uppercase px-4 py-1.5 rounded-full bg-brand-navy-deep/85 backdrop-blur-md border border-white/15 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#F3D382]" />
            <span>Official Resort Photograph • Evening Pavilions &amp; Lawns at The Orchha Resort</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
