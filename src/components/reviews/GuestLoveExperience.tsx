"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { VERIFIED_GUEST_REVIEWS, GuestReviewItem } from "@/data/reviews";
import { SubtitleTag, Heading, Text } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/Badge";
import {
  Star,
  Quote,
  ExternalLink,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GuestLoveExperienceProps {
  className?: string;
  id?: string;
}

export function GuestLoveExperience({
  className,
  id = "guest-stories",
}: GuestLoveExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Track scroll progress along the pinned container track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // CARD 1 TRANSFORMS (Enters at start, exits LEFT)
  const x1 = useTransform(scrollYProgress, [0.08, 0.26], [0, -750]);
  const rotate1 = useTransform(scrollYProgress, [0.08, 0.26], [0, -5]);
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.24], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.08, 0.26], [1, 0.95]);

  // CARD 2 TRANSFORMS (Enters RIGHT, settles, exits RIGHT)
  const x2 = useTransform(scrollYProgress, [0.14, 0.30, 0.44, 0.54], [750, 0, 0, 750]);
  const rotate2 = useTransform(scrollYProgress, [0.14, 0.30, 0.44, 0.54], [5, 0, 0, 5]);
  const opacity2 = useTransform(scrollYProgress, [0.14, 0.26, 0.44, 0.54], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.14, 0.30, 0.44, 0.54], [0.95, 1, 1, 0.95]);

  // CARD 3 TRANSFORMS (Enters LEFT, settles, exits LEFT)
  const x3 = useTransform(scrollYProgress, [0.42, 0.56, 0.68, 0.78], [-750, 0, 0, -750]);
  const rotate3 = useTransform(scrollYProgress, [0.42, 0.56, 0.68, 0.78], [-5, 0, 0, -5]);
  const opacity3 = useTransform(scrollYProgress, [0.42, 0.52, 0.68, 0.78], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.42, 0.56, 0.68, 0.78], [0.95, 1, 1, 0.95]);

  // CARD 4 TRANSFORMS (Enters RIGHT, settles in center)
  const x4 = useTransform(scrollYProgress, [0.66, 0.80], [750, 0]);
  const rotate4 = useTransform(scrollYProgress, [0.66, 0.80], [5, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.66, 0.76, 0.88, 0.94], [0, 1, 1, 0]);
  const scale4 = useTransform(scrollYProgress, [0.66, 0.80, 0.88, 0.94], [0.95, 1, 1, 0.94]);

  // ACT IV: COLLECTIVE MEMORY MOMENT (Fades in over center to conclude sequence)
  const opacityCollective = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const yCollective = useTransform(scrollYProgress, [0.88, 0.96], [35, 0]);
  const scaleCollective = useTransform(scrollYProgress, [0.88, 0.96], [0.96, 1]);

  // Progress dot indicator states
  const activeDotIndex = useTransform(scrollYProgress, [0, 0.28, 0.52, 0.74, 0.92], [0, 1, 2, 3, 4]);
  const [currentIndicator, setCurrentIndicator] = useState(0);

  useEffect(() => {
    return activeDotIndex.on("change", (val) => {
      setCurrentIndicator(Math.round(val));
    });
  }, [activeDotIndex]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        "relative bg-[#FAF7F0] text-brand-charcoal border-t border-brand-charcoal/10",
        // Desktop pinned scroll track height; normal flow on mobile/tablet
        "lg:h-[380vh]",
        className
      )}
    >
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP PINNED VIEWPORT EXPERIENCE (lg: screens)
          ───────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between items-center py-10 px-8 overflow-hidden">
        {/* Subtle radial ambient atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(197,160,89,0.08),transparent_65%)]"
        />

        {/* ACT I: Header & Stage Invitation */}
        <header className="relative z-10 text-center max-w-3xl mx-auto space-y-2 pt-2">
          <SubtitleTag>Guest Voices & Memories</SubtitleTag>
          <h2 className="font-serif text-3xl xl:text-4xl font-normal text-brand-charcoal tracking-tight">
            Not just a stay. A memory that stays.
          </h2>
          <p className="font-sans text-sm text-brand-olive max-w-xl mx-auto leading-relaxed">
            Authentic reflections from travelers who experienced the tranquil riverbanks, historic cenotaphs, and warm hospitality of The Orchha Resort.
          </p>
        </header>

        {/* ACT II & III: THE CARD STAGE (Alternating Left/Right Motion) */}
        <div className="relative z-20 w-full max-w-4xl h-[460px] flex items-center justify-center my-auto">
          {/* CARD 1 — Robert H (Exits Left) */}
          <motion.div
            style={{
              x: x1,
              rotate: rotate1,
              opacity: opacity1,
              scale: scale1,
            }}
            className="absolute inset-0 pointer-events-auto"
          >
            <ReviewEditorialCard review={VERIFIED_GUEST_REVIEWS[0]} />
          </motion.div>

          {/* CARD 2 — Verified Traveler / River Mist (Enters Right, Exits Right) */}
          <motion.div
            style={{
              x: x2,
              rotate: rotate2,
              opacity: opacity2,
              scale: scale2,
            }}
            className="absolute inset-0 pointer-events-auto"
          >
            <ReviewEditorialCard review={VERIFIED_GUEST_REVIEWS[1]} />
          </motion.div>

          {/* CARD 3 — Heritage Traveler / Tents & Pool (Enters Left, Exits Left) */}
          <motion.div
            style={{
              x: x3,
              rotate: rotate3,
              opacity: opacity3,
              scale: scale3,
            }}
            className="absolute inset-0 pointer-events-auto"
          >
            <ReviewEditorialCard review={VERIFIED_GUEST_REVIEWS[2]} />
          </motion.div>

          {/* CARD 4 — Family Guest / Kaleva Dining (Enters Right, Settles) */}
          <motion.div
            style={{
              x: x4,
              rotate: rotate4,
              opacity: opacity4,
              scale: scale4,
            }}
            className="absolute inset-0 pointer-events-auto"
          >
            <ReviewEditorialCard review={VERIFIED_GUEST_REVIEWS[3]} />
          </motion.div>

          {/* ACT IV: THE COLLECTIVE MEMORY MOMENT */}
          <motion.div
            style={{
              opacity: opacityCollective,
              y: yCollective,
              scale: scaleCollective,
            }}
            className="absolute inset-0 pointer-events-auto flex items-center justify-center"
          >
            <div className="w-full max-w-3xl bg-white border border-brand-gold/30 rounded-2xl p-8 xl:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-xs font-serif tracking-widest text-brand-gold-dark uppercase">
                <Compass className="w-3.5 h-3.5 text-brand-gold" />
                The Orchha Sanctuary
              </div>

              <h3 className="font-serif text-2xl xl:text-3xl text-brand-charcoal font-normal leading-snug">
                &ldquo;Some places are remembered long after you leave.&rdquo;
              </h3>

              <p className="font-sans text-brand-olive text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Long after returning home, what lingers is the stillness of the Betwa River at sunrise,
                the sacred silhouette of ancient cenotaphs against the dusk, and the genuine Bundelkhandi
                warmth that makes every guest feel like honored royalty.
              </p>

              {/* Handoff Invitation into the upcoming Map Finale */}
              <div className="pt-4 flex flex-col items-center justify-center gap-2 text-brand-charcoal/60">
                <span className="text-xs uppercase tracking-widest font-sans font-medium text-brand-gold-dark">
                  Continue To Location & Heritage Map
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4 text-brand-gold" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation Bar / Progress Scrubbing Indicator */}
        <footer className="relative z-10 w-full max-w-4xl flex items-center justify-between border-t border-brand-charcoal/10 pt-4 text-xs text-brand-olive">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest uppercase text-brand-charcoal/80">
              {currentIndicator < 4 ? `Memory ${currentIndicator + 1} of 4` : "Collective Memory"}
            </span>
            <span className="text-brand-charcoal/30">•</span>
            <span>Scroll downward to journey through guest stories</span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentIndicator === step
                    ? "w-8 bg-brand-gold"
                    : "w-2 bg-brand-charcoal/20"
                )}
                aria-label={`Story step ${step + 1}`}
              />
            ))}
          </div>
        </footer>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          RESPONSIVE MOBILE & TABLET EDITORIAL EXPERIENCE (< lg: screens)
          ───────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden px-4 py-16 sm:px-6 max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <SubtitleTag>Guest Voices & Memories</SubtitleTag>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-normal">
            Not just a stay. A memory that stays.
          </h2>
          <p className="font-sans text-sm text-brand-olive leading-relaxed max-w-md mx-auto">
            Authentic reflections from verified travelers who experienced the tranquil riverbanks, historic cenotaphs, and warm hospitality of The Orchha Resort.
          </p>
        </header>

        {/* Mobile Interactive Card Carousel */}
        <div className="space-y-6">
          <div className="relative">
            <ReviewEditorialCard review={VERIFIED_GUEST_REVIEWS[activeMobileIndex]} />
          </div>

          {/* Mobile Controls & Indicator */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() =>
                setActiveMobileIndex((prev) =>
                  prev > 0 ? prev - 1 : VERIFIED_GUEST_REVIEWS.length - 1
                )
              }
              className="p-2.5 rounded-full bg-white border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-gold/10 transition-colors shadow-sm"
              aria-label="Previous guest review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {VERIFIED_GUEST_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeMobileIndex === idx
                      ? "w-6 bg-brand-gold"
                      : "w-2 bg-brand-charcoal/20"
                  )}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveMobileIndex((prev) =>
                  prev < VERIFIED_GUEST_REVIEWS.length - 1 ? prev + 1 : 0
                )
              }
              className="p-2.5 rounded-full bg-white border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-gold/10 transition-colors shadow-sm"
              aria-label="Next guest review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Collective Memory Card */}
        <div className="bg-white border border-brand-gold/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-subtle">
          <span className="inline-flex items-center gap-1.5 text-xs font-serif tracking-widest text-brand-gold-dark uppercase">
            <Compass className="w-3.5 h-3.5 text-brand-gold" />
            The Collective Memory
          </span>
          <h3 className="font-serif text-xl text-brand-charcoal font-normal">
            &ldquo;Some places are remembered long after you leave.&rdquo;
          </h3>
          <p className="font-sans text-xs sm:text-sm text-brand-olive leading-relaxed">
            Long after returning home, what lingers is the stillness of the Betwa River at sunrise,
            the sacred silhouette of ancient cenotaphs against the dusk, and the genuine Bundelkhandi
            warmth that makes every guest feel like family.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial Review Card Component
 * Formatted with luxury typography, verified ratings, genuine resort photography,
 * and direct attribution links to official platforms.
 */
function ReviewEditorialCard({ review }: { review: GuestReviewItem }) {
  return (
    <article className="w-full h-full bg-white border border-brand-charcoal/12 rounded-2xl shadow-floating hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">
      {/* Left Column: Review Content & Attributions */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
        {/* Aspect Tag & Star Rating */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-charcoal/10 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-gold-dark">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{review.verifiedLabel}</span>
          </div>

          <div className="flex items-center gap-1.5" aria-label={`Rating: ${review.rating} out of 5 stars`}>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4",
                    i < Math.floor(review.rating)
                      ? "fill-amber-400 text-amber-400"
                      : i < review.rating
                      ? "fill-amber-400/50 text-amber-400"
                      : "text-brand-charcoal/20"
                  )}
                />
              ))}
            </div>
            <span className="font-sans text-xs font-semibold text-brand-charcoal ml-1">
              {review.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* The Review Quote */}
        <blockquote className="space-y-3">
          <Quote className="w-6 h-6 text-brand-gold/40 rotate-180" />
          <p className="font-serif text-base sm:text-lg lg:text-xl text-brand-charcoal font-normal leading-relaxed italic">
            &ldquo;{review.quote}&rdquo;
          </p>
        </blockquote>

        {/* Reviewer Meta & Source Link */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-brand-charcoal/10">
          <div>
            <cite className="not-italic font-sans font-semibold text-sm sm:text-base text-brand-charcoal block">
              {review.author}
            </cite>
            <div className="flex items-center gap-2 text-xs text-brand-olive mt-0.5">
              {review.location && <span>{review.location}</span>}
              {review.location && <span>•</span>}
              <span className="text-brand-gold-dark">{review.aspect}</span>
            </div>
          </div>

          {/* Genuine External Source Link */}
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-brand-navy hover:text-brand-gold-dark transition-colors py-1 px-3 rounded-full bg-brand-canvas border border-brand-charcoal/15 self-start sm:self-auto"
            title={`View verified review on ${review.sourceName}`}
          >
            <span>Read on {review.sourceName}</span>
            <ExternalLink className="w-3 h-3 text-brand-gold-dark" />
          </a>
        </div>
      </div>

      {/* Right Column: Genuine Resort Photograph Preview */}
      <div className="w-full md:w-5/12 lg:w-4/12 relative min-h-[220px] md:min-h-[auto] bg-brand-stone/10 border-t md:border-t-0 md:border-l border-brand-charcoal/10">
        <Image
          src={review.image.src}
          alt={review.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent md:hidden" />
        <div className="absolute bottom-2 left-3 right-3 text-[11px] font-sans text-white/90 drop-shadow-md md:hidden">
          {review.image.caption}
        </div>
        <div className="hidden md:block absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-sans text-white/90 leading-tight border border-white/10">
          {review.image.caption}
        </div>
      </div>
    </article>
  );
}
