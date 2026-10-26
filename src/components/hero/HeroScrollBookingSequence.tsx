"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { RESORT_ASSETS } from "@/lib/assets";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { HeroRatingBadge } from "@/components/ui/Badge";
import { SubtitleTag } from "@/components/ui/Typography";
import { RoomSearchWidgetPrimitive } from "@/components/booking/RoomSearchWidgetPrimitive";
import { Calendar, Users, ArrowDown, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroScrollBookingSequenceProps {
  className?: string;
}

export function HeroScrollBookingSequence({ className }: HeroScrollBookingSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookingPanelRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress through the hero-to-booking transformation track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background Video transforms
  const videoScale = useTransform(scrollYProgress, [0, 0.75], [1.0, 0.94]);
  const videoOpacity = useTransform(scrollYProgress, [0.15, 0.8], [1.0, 0.3]);
  const videoOverlayDarkness = useTransform(scrollYProgress, [0.1, 0.7], [0.35, 0.75]);

  // Hero Text overlay transforms (fades out as user scrolls)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.35], [1.0, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.35], [0, -35]);

  // Warm-Beige Reservation Panel transforms (rises up and expands)
  const panelY = useTransform(scrollYProgress, [0.15, 0.75], ["65vh", "0vh"]);
  const panelScale = useTransform(scrollYProgress, [0.15, 0.75], [0.94, 1.0]);
  const panelOpacity = useTransform(scrollYProgress, [0.12, 0.45], [0.4, 1.0]);

  // Smooth scroll handler for first-screen CTA button
  const handleScrollToBooking = () => {
    if (containerRef.current) {
      // Scroll to the point in the track where the booking panel is fully settled (~70% of track)
      const targetScroll = containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.72;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // REDUCED MOTION OR MOBILE STATIC FALLBACK
  if (shouldReduceMotion) {
    return (
      <div className={cn("relative bg-brand-navy", className)}>
        {/* Static Hero */}
        <div className="relative min-h-[85vh] flex flex-col justify-end pt-32 pb-20 px-5 sm:px-8 md:px-12">
          <div className="absolute inset-0 z-0">
            <Image
              src={RESORT_ASSETS.heroDesktop.src}
              alt={RESORT_ASSETS.heroDesktop.alt}
              fill
              priority
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-black/30" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <HeroRatingBadge />
            <SubtitleTag inverted>Sanctuary on the River Betwa · Orchha</SubtitleTag>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-display">
              Understated luxury where royalty meets the river.
            </h1>
            <p className="font-sans text-base text-brand-beige-sand/90 max-w-xl">
              32 secluded rooms and luxury Swiss tents facing the 14 historical Chhatris.
            </p>
            <div className="pt-2">
              <Button variant="gold" size="lg" withArrow onClick={handleScrollToBooking}>
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>

        {/* Static Docked Booking Panel */}
        <div className="relative z-20 -mt-10 px-4 pb-12 max-w-container mx-auto">
          <RoomSearchWidgetPrimitive />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[190vh] bg-brand-navy", className)}
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Cinematic Video Layer */}
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={RESORT_ASSETS.heroDesktop.src}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            >
              <source src={RESORT_ASSETS.heroVideo.src} type="video/mp4" />
              {/* Fallback image if video fails to decode */}
              <Image
                src={RESORT_ASSETS.heroDesktop.src}
                alt={RESORT_ASSETS.heroDesktop.alt}
                fill
                priority
                className="object-cover"
              />
            </video>
          ) : (
            <Image
              src={RESORT_ASSETS.heroDesktop.src}
              alt={RESORT_ASSETS.heroDesktop.alt}
              fill
              priority
              className="object-cover"
            />
          )}

          {/* Staging Video Disclaimer Label */}
          {RESORT_ASSETS.heroVideo.isStagingPlaceholder && (
            <div className="absolute top-24 right-6 z-20 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-white/70 font-sans tracking-wide">
              Staging Atmospheric Video · Drone Asset in Production
            </div>
          )}
        </motion.div>

        {/* Dynamic Darkening Vignette Layer */}
        <motion.div
          style={{ opacity: videoOverlayDarkness }}
          className="absolute inset-0 z-1 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-black/40 pointer-events-none"
        />

        {/* 1. First-Screen Hero Content (Fades out as user scrolls) */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="relative z-10 pt-32 sm:pt-36 px-5 sm:px-8 md:px-12 lg:px-16 max-w-wide mx-auto w-full pointer-events-auto"
        >
          <div className="max-w-3xl space-y-3.5">
            <HeroRatingBadge />

            <div>
              <SubtitleTag inverted className="mb-2">
                Betwa River Sanctuary · Orchha, Madhya Pradesh
              </SubtitleTag>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-white leading-display tracking-tightest">
                Understated luxury where royalty meets the river.
              </h1>
            </div>

            <p className="font-sans text-sm sm:text-base md:text-lg text-brand-beige-sand/90 max-w-2xl leading-relaxed">
              32 secluded heritage rooms and luxury Swiss tents facing the 14 historical Chhatris. 
              Experience authentic Bundeli warmth, lotus pool serenity, and zero-pollution tranquility.
            </p>

            {/* MANDATORY FIRST-SCREEN "BOOK YOUR STAY" ACTION */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                withArrow
                onClick={handleScrollToBooking}
                className="shadow-floating hover:shadow-navy"
              >
                Book Your Stay
              </Button>

              <button
                type="button"
                onClick={handleScrollToBooking}
                className="hidden sm:inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-brand-beige-sand/80 hover:text-white transition-colors"
              >
                <span>Scroll to Reserve</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-brand-gold-light" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Rising Warm-Beige Reservation Panel */}
        <motion.div
          ref={bookingPanelRef}
          style={{ y: panelY, scale: panelScale, opacity: panelOpacity }}
          className="relative z-20 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 max-w-container mx-auto w-full origin-bottom"
        >
          <div className="rounded-2xl bg-brand-beige border border-brand-gold/25 shadow-floating overflow-hidden transition-all duration-300">
            {/* Panel Header Bar */}
            <div className="bg-brand-navy px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs text-white font-sans">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
                <span className="font-semibold tracking-wider uppercase text-[11px] text-brand-beige-sand">
                  Reserve Your Sanctuary · Best Tariff Guarantee
                </span>
              </div>
              <span className="hidden sm:inline-block text-white/70 text-[11px]">
                32 Rooms &amp; Swiss Tents · Instant Confirmation
              </span>
            </div>

            {/* Panel Search Content Body */}
            <div className="p-5 sm:p-7 bg-brand-beige">
              <RoomSearchWidgetPrimitive className="border-none shadow-none p-0 bg-transparent" />
            </div>

            {/* Quick Reassurance Strip */}
            <div className="bg-brand-beige-sand/40 px-6 py-2.5 border-t border-brand-charcoal/8 flex flex-wrap items-center justify-between gap-3 text-[11px] text-brand-olive font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span>Zero reservation fee · Flexible 48-hour free cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>24/7 Front Desk WhatsApp Concierge: +91 99262 19900</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
