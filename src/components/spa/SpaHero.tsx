"use client";

import React from "react";
import Image from "next/image";
import { RESORT_ASSETS } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { Sparkles, Calendar, Flower2, Clock } from "lucide-react";

export interface SpaHeroProps {
  onOpenEnquiry: (treatmentName?: string) => void;
}

export function SpaHero({ onOpenEnquiry }: SpaHeroProps) {
  const handleScrollToTreatments = () => {
    const el = document.getElementById("treatments");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-end pt-36 pb-20 md:pb-28 overflow-hidden bg-brand-navy">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={RESORT_ASSETS.spaHero.src}
          alt={RESORT_ASSETS.spaHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/55 to-black/35" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-3xl space-y-4">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brand-gold/30 text-xs text-brand-navy font-sans shadow-subtle">
                <Flower2 className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span className="font-semibold tracking-wide uppercase text-[11px] text-brand-navy">
                  Authentic Kerala Ayurveda &amp; Herbal Steam Bath
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SubtitleTag inverted className="mb-2">
                Wellness Pavilion · The Orchha Resort
              </SubtitleTag>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-white leading-display tracking-tightest">
                A quiet sanctuary to restore natural equilibrium.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-sans text-sm sm:text-base md:text-lg text-brand-beige-sand/90 max-w-2xl leading-relaxed">
                Slow down on the tranquil banks of the Betwa River. Experience classical Kerala Ayurvedic therapies, warm herbal steam baths, and medicated oils customized to your personal constitution in zero-pollution serenity.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.4}>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  withArrow
                  onClick={handleScrollToTreatments}
                  className="shadow-floating hover:shadow-navy"
                >
                  Explore Spa Treatments
                </Button>

                <Button
                  variant="navy-outline"
                  size="lg"
                  onClick={() => onOpenEnquiry()}
                >
                  Enquire About a Treatment
                </Button>
              </div>
            </FadeIn>

            {/* Quick Timing & Location Strip */}
            <FadeIn delay={0.5}>
              <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-brand-beige-sand/75 font-sans border-t border-white/10 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span>Open Daily: 8:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span>Certified Kerala Ayurvedic Practitioners</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </section>
  );
}
