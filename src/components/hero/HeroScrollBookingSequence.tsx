"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { RESORT_ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/Button";
import { RoomSearchWidgetPrimitive } from "@/components/booking/RoomSearchWidgetPrimitive";
import { ArrowDown, Sparkles, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroScrollBookingSequenceProps {
  className?: string;
}

export function HeroScrollBookingSequence({ className }: HeroScrollBookingSequenceProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress along the hero section for fluid cinematic zoom
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Smooth progressive zoom animation directly tied to scroll position (1.0 -> 1.25)
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.25], { clamp: true });
  const scale = shouldReduceMotion ? 1 : rawScale;

  // Smooth scroll handler for first-screen CTA button
  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking-sequence");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      id="hero-and-reservation"
      className={cn("relative w-full bg-brand-canvas overflow-visible", className)}
    >
      {/* ─────────────────────────────────────────────────────────────────
          1. CINEMATIC HERO SECTION
          Full-viewport architectural aerial photograph with progressive
          scroll-based zoom and high-contrast editorial glass surface
          ───────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        {/* Background Cinematic Zooming Photo Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{
              scale,
              transformOrigin: "center 42%",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="relative w-full h-full transform-gpu"
          >
            <Image
              src={RESORT_ASSETS.heroDesktop.src}
              alt={RESORT_ASSETS.heroDesktop.alt}
              fill
              priority
              sizes="100vw"
              quality={95}
              className="object-cover object-[center_40%]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Dynamic Darkening Vignette Layer - Balanced contrast for typography while preserving river and sunset colors */}
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
          </motion.div>
        </div>

        {/* Hero Editorial Text Container */}
        <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-24 sm:pb-28 px-4 sm:px-6 md:px-8 lg:px-12 max-w-wide mx-auto w-full flex flex-col items-start justify-center flex-1 pointer-events-auto">
          {/* ─────────────────────────────────────────────────────────────
              SOPHISTICATED TRANSLUCENT EDITORIAL GLASS SURFACE (IMAGE-FIRST)
              Compact luxury container with controlled backdrop blur,
              gilded specular highlights, and unobtrusive footprint
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="group relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 overflow-hidden bg-gradient-to-br from-white/[0.14] via-[#080D15]/28 to-[#0B131E]/42 backdrop-blur-xl backdrop-saturate-[190%] border border-white/25 border-t-white/45 border-l-white/35 border-r-white/20 border-b-white/15 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_0_24px_rgba(244,223,192,0.06),0_16px_40px_-10px_rgba(0,0,0,0.45),0_0_1px_1px_rgba(197,160,89,0.22)] space-y-2.5 sm:space-y-3 transition-all duration-500 hover:border-white/35 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_0_28px_rgba(244,223,192,0.08),0_20px_48px_-10px_rgba(0,0,0,0.5),0_0_1px_1px_rgba(197,160,89,0.28)]"
          >
            {/* Liquid Glass Internal Specular Refraction Layer */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-white/[0.14] via-[#F4DFC0]/[0.05] to-transparent rounded-full blur-2xl pointer-events-none transform-gpu"
            />
            {/* Warm Sunset Ambient Reflection in Corner */}
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -right-12 w-56 h-56 bg-gradient-to-tl from-[#C5A059]/12 via-transparent to-transparent rounded-full blur-2xl pointer-events-none transform-gpu"
            />
            {/* Prismatic Top Edge Specular Hairline */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none"
            />

            {/* Compact Top Metadata: Rating Badge & Location Label */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 pt-0.5">
              {/* Compact Social Rating Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-brand-navy/10 shadow-sm text-[11px] font-sans">
                <div className="flex -space-x-1.5">
                  <span className="inline-block w-4 h-4 rounded-full bg-brand-gold/20 border border-white flex items-center justify-center text-[8px] font-bold text-brand-gold-dark">
                    ✦
                  </span>
                  <span className="inline-block w-4 h-4 rounded-full bg-brand-navy/20 border border-white flex items-center justify-center text-[8px] font-bold text-brand-navy">
                    R
                  </span>
                </div>
                <span className="font-semibold text-brand-navy">4.9</span>
                <span className="text-amber-500 text-[10px]">★</span>
                <span className="text-brand-muted hidden sm:inline">·</span>
                <span className="font-medium text-brand-charcoal text-[11px] hidden sm:inline">Excellent Stay</span>
              </div>

              {/* Compact Location Label */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-[#F4DFC0] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider backdrop-blur-md">
                <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                <span>KANCHANGHAT · ORCHHA, MP</span>
              </div>
            </div>

            {/* Refined Headline with Controlled Line Wrapping */}
            <h1 className="relative z-10 font-serif text-2xl sm:text-[1.75rem] md:text-[1.95rem] lg:text-[2.1rem] font-normal text-white leading-[1.2] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              Understated luxury where royalty meets the river.
            </h1>

            {/* Compact Factual Description */}
            <p className="relative z-10 font-sans text-xs sm:text-[13px] text-white/90 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              50 secluded heritage rooms and suites facing the 14 historical Chhatris.
              Experience authentic Bundeli warmth, lotus pool serenity, and zero-pollution tranquility.
            </p>

            {/* Compact Primary Action Button Group */}
            <div className="relative z-10 pt-1 sm:pt-1.5 flex flex-wrap items-center gap-3">
              <Button
                variant="sage"
                size="md"
                withArrow
                onClick={handleScrollToBooking}
                className="shadow-[0_4px_18px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_22px_rgba(112,141,121,0.35)] text-xs sm:text-sm tracking-wide"
              >
                Book Your Stay
              </Button>

              <button
                type="button"
                onClick={handleScrollToBooking}
                className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-wider text-[#F4DFC0]/85 hover:text-white transition-colors"
              >
                <span>Scroll to Reserve</span>
                <ArrowDown className="w-3 h-3 animate-bounce text-brand-gold-light" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          2. INTEGRATED RESERVATION SANCTUARY SUITE
          Seamless floating luxury booking dock bridging the cinematic
          hero directly into the resort philosophy with zero dead space
          ───────────────────────────────────────────────────────────────── */}
      <section
        id="booking-sequence"
        className="relative z-20 -mt-16 sm:-mt-20 lg:-mt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 max-w-container mx-auto w-full"
      >
        <div className="rounded-3xl bg-brand-beige border border-brand-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-visible relative">
          {/* Header Bar */}
          <div className="bg-brand-navy rounded-t-3xl px-4 sm:px-6 py-3 sm:py-3.5 border-b border-brand-gold/20 flex items-center justify-between gap-2 text-xs text-white font-sans">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3 text-brand-gold" />
              </div>
              <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-brand-beige-sand">
                Reserve Your Sanctuary · Best Tariff Guarantee
              </span>
            </div>
          </div>

          {/* Search Content Body */}
          <div className="p-4 sm:p-7 md:p-8 bg-brand-beige w-full max-w-full box-border">
            <RoomSearchWidgetPrimitive className="border-none shadow-none p-0 bg-transparent w-full max-w-full" />
          </div>

          {/* Reassurance Strip */}
          <div className="bg-brand-beige-sand rounded-b-3xl px-4 sm:px-6 py-3 border-t border-brand-charcoal/10 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-olive font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
              <span>Zero reservation fee · Flexible 48-hour free cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span className="font-medium text-brand-charcoal">
                24/7 Front Desk WhatsApp Concierge:{" "}
                <a
                  href="https://wa.me/919926219900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:underline"
                >
                  +91 99262 19900
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
