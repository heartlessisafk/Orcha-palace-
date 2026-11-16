"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SubtitleTag, Heading } from "@/components/ui/Typography";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { SPA_DECORATIVE_ASSETS, SPA_PHOTOGRAPHY_REGISTRY } from "@/lib/spa-assets";
import { SPA_CONTACT_INFO } from "@/data/spa-catalog";
import { Leaf, Droplets, Wind, Sparkles, HeartHandshake } from "lucide-react";

export function SpaEditorialRoyal() {
  return (
    <section className="py-20 md:py-28 bg-brand-beige/40 border-b border-brand-gold/15 relative overflow-hidden">
      {/* Decorative Botanical Leaf in bottom-left */}
      <div className="absolute bottom-6 left-2 md:left-8 w-28 h-40 md:w-36 md:h-52 opacity-25 pointer-events-none -scale-x-100 z-0">
        <Image
          src={SPA_DECORATIVE_ASSETS.botanicalBranch.src}
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>

      <Container className="relative z-10">
        {/* Word-by-Word Scroll Reveal Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <SubtitleTag>Royal Bundelkhand Sanctuary</SubtitleTag>

          <FadeIn>
            <TextReveal
              text="We strive to establish prime health in every person be it physical, mental or spiritual. Every therapy is arranged so arriving feels like exhaling."
              className="text-center justify-center max-w-3xl mx-auto"
            />
          </FadeIn>

          <p className="font-serif italic text-sm md:text-base text-brand-gold-dark pt-2">
            The Orchha Resort Spa Philosophy • Grounded in Classical Ayurveda
          </p>
        </div>

        {/* 3 Core Ayurvedic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <FadeIn delay={0.1}>
            <div className="h-full bg-brand-canvas p-6 sm:p-8 rounded-2xl border border-brand-gold/25 shadow-subtle flex flex-col justify-between hover:border-brand-gold/60 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark border border-brand-gold/30">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-navy">
                  Medicated Herbal Oils
                </h3>
                <p className="font-sans text-sm text-brand-charcoal/80 leading-relaxed">
                  Prepared according to classical Kerala traditions, our warm herbal oils penetrate deep into muscle tissues, stimulating lymphatic circulation and soothing tired fibers.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-charcoal/10 text-xs font-serif italic text-brand-gold-dark">
                Used in Abhyangam, Shirodhara &amp; Marma therapies
              </div>
            </div>
          </FadeIn>

          {/* Pillar 2 */}
          <FadeIn delay={0.2}>
            <div className="h-full bg-brand-canvas p-6 sm:p-8 rounded-2xl border border-brand-gold/25 shadow-subtle flex flex-col justify-between hover:border-brand-gold/60 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark border border-brand-gold/30">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-navy">
                  Dosha Equilibrium
                </h3>
                <p className="font-sans text-sm text-brand-charcoal/80 leading-relaxed">
                  Ayurveda recognizes that true well-being requires balance among Vata, Pitta, and Kapha humors. Our therapies focus on releasing physical blockage and promoting deep mental peace.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-charcoal/10 text-xs font-serif italic text-brand-gold-dark">
                Prescribed to match individual constitution
              </div>
            </div>
          </FadeIn>

          {/* Pillar 3 */}
          <FadeIn delay={0.3}>
            <div className="h-full bg-brand-canvas p-6 sm:p-8 rounded-2xl border border-brand-gold/25 shadow-subtle flex flex-col justify-between hover:border-brand-gold/60 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold-dark border border-brand-gold/30">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-navy">
                  Restorative Botanicals
                </h3>
                <p className="font-sans text-sm text-brand-charcoal/80 leading-relaxed">
                  Natural herbal poultices, freshly ground exfoliants, and therapeutic body wraps hydrate the skin and clear toxins in a peaceful, unhurried riverfront setting.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-charcoal/10 text-xs font-serif italic text-brand-gold-dark">
                Pure ingredients with zero synthetic additives
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
