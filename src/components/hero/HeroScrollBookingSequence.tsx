"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { RESORT_ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/Button";
import { HeroRatingBadge } from "@/components/ui/Badge";
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
              className="object-cover object-center"
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
        <div className="relative z-10 pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-wide mx-auto w-full my-auto flex flex-col items-start pointer-events-auto">
          {/* ─────────────────────────────────────────────────────────────
              SOPHISTICATED TRANSLUCENT EDITORIAL GLASS SURFACE
              High-contrast typography container with controlled backdrop
              blur, gilded accent pill, and natural soft shadow
              ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative max-w-3xl rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-brand-navy/80 via-brand-navy/65 to-brand-navy/45 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)] space-y-4"
          >
            {/* Social Rating Badge */}
            <div className="flex items-center gap-3">
              <HeroRatingBadge />
            </div>

            {/* High-Contrast Location Kicker */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-light text-[11px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>KANCHANGHAT · ORCHHA, MADHYA PRADESH, INDIA</span>
              </div>
            </div>

            {/* Monumental Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold text-white leading-display tracking-tightest drop-shadow-sm">
              Understated luxury where royalty meets the river.
            </h1>

            {/* Factual Description */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-brand-beige-sand/95 max-w-2xl leading-relaxed">
              50 secluded heritage rooms and suites facing the 14 historical Chhatris.
              Experience authentic Bundeli warmth, lotus pool serenity, and zero-pollution tranquility.
            </p>

            {/* Primary Action Button Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                withArrow
                onClick={handleScrollToBooking}
                className="shadow-floating hover:shadow-navy font-medium text-sm"
              >
                Book Your Stay
              </Button>

              <button
                type="button"
                onClick={handleScrollToBooking}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-brand-beige-sand/80 hover:text-white transition-colors"
              >
                <span>Scroll to Reserve</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-brand-gold-light" />
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
          <div className="bg-brand-navy rounded-t-3xl px-6 py-3.5 border-b border-brand-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white font-sans">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-brand-gold" />
              </div>
              <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-brand-beige-sand">
                Reserve Your Sanctuary · Best Tariff Guarantee
              </span>
            </div>
            <span className="text-brand-gold-light/80 text-[11px] font-sans">
              50 Heritage Accommodations · Instant Concierge Confirmation
            </span>
          </div>

          {/* Search Content Body */}
          <div className="p-5 sm:p-7 md:p-8 bg-brand-beige">
            <RoomSearchWidgetPrimitive className="border-none shadow-none p-0 bg-transparent" />
          </div>

          {/* Reassurance Strip */}
          <div className="bg-brand-beige-sand rounded-b-3xl px-6 py-3 border-t border-brand-charcoal/10 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-olive font-sans">
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
