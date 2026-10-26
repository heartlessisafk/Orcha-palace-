"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SubtitleTag, Heading, Text } from "@/components/ui/Typography";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { ClippedReveal } from "@/components/motion/ClippedReveal";
import { RESORT_ASSETS } from "@/lib/assets";
import { SPA_PHILOSOPHY } from "@/data/spa";
import { Leaf, Droplets, Wind, Sparkles } from "lucide-react";

export function SpaEditorial() {
  return (
    <Section surface="canvas" spacing="default" id="philosophy">
      <Container>
        {/* Editorial Scroll-Reveal Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <SubtitleTag>The Wellness Philosophy</SubtitleTag>
          <FadeIn>
            <TextReveal
              text={SPA_PHILOSOPHY.quote}
              className="text-center justify-center max-w-3xl mx-auto"
            />
          </FadeIn>
          <p className="font-sans text-xs tracking-wider uppercase text-brand-gold font-medium pt-3">
            {SPA_PHILOSOPHY.attribution}
          </p>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image with Clipped Reveal */}
          <div className="lg:col-span-6 relative">
            <ClippedReveal direction="up" delay={0.1} className="rounded-luxury shadow-card border border-brand-charcoal/10">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={RESORT_ASSETS.spaHerbs.src}
                  alt={RESORT_ASSETS.spaHerbs.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClippedReveal>

            {/* Overlaid Floating Callout Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 max-w-xs p-5 rounded-xl bg-white border border-brand-gold/30 shadow-floating">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-navy">
                  Zero-Pollution Sanctuary
                </span>
              </div>
              <p className="font-sans text-xs text-brand-olive leading-relaxed">
                Quiet river breezes, clean Bundelkhand air, and birdsong replace modern clinic noise.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <SubtitleTag>Authentic Kerala Tradition</SubtitleTag>
            <Heading as="h2" size="h2">
              Ancient Wisdom Anchored by the River Betwa
            </Heading>
            <Text variant="lead">
              At Orchha Resort, wellness is never rushed. Unlike commercial hotel spas, our therapies follow classical Ayurvedic traditions rooted in the balancing of the three Doshas — Vata, Pitta, and Kapha.
            </Text>
            <Text variant="body">
              Every session begins with warm medicated oils, prepared using time-honored botanical recipes. Combined with therapeutic steam and gentle riverside calm, the body unburdens accumulated fatigue from urban living and travels across the heritage trails.
            </Text>

            {/* 3 Ayurvedic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-charcoal/10">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <Wind className="w-4 h-4" />
                </div>
                <h5 className="font-serif text-base font-semibold text-brand-charcoal">Vata Calm</h5>
                <p className="font-sans text-xs text-brand-olive leading-normal">Warm sesame &amp; herbal oils ground restless nervous energy.</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <h5 className="font-serif text-base font-semibold text-brand-charcoal">Pitta Balance</h5>
                <p className="font-sans text-xs text-brand-olive leading-normal">Cooling sandalwood and botanical herbs soothe systemic heat.</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
                <h5 className="font-serif text-base font-semibold text-brand-charcoal">Kapha Vitality</h5>
                <p className="font-sans text-xs text-brand-olive leading-normal">Herbal steam and warm bolus treatments stimulate lymphatic flow.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
