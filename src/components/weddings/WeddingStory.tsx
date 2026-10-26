"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { Sparkles, Heart, Landmark, ShieldCheck, CheckCircle2, Moon } from "lucide-react";

export function WeddingStory() {
  const aerialAsset = WEDDING_ASSETS.aerialLawnNight;

  return (
    <section id="wedding-story" className="py-20 sm:py-28 bg-brand-canvas text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <SubtitleTag>Destination Romance</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            A Royal Setting on Sacred Waters
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Where Bundelkhand&apos;s heritage blesses your new beginning
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            In Orchha, history is not a relic preserved behind glass—it is a living, breathing backdrop.
            Exchanging vows here connects your celebration to centuries of romance, devotion, and monumental beauty.
          </Text>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase (Aerial Night Shot of Wedding Lawns) */}
          <div className="lg:col-span-7 space-y-4">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-elevated bg-brand-navy">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={aerialAsset.src}
                    alt={aerialAsset.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />

                  {/* Verified Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-navy/10 shadow-subtle flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                    <span className="font-sans text-xs font-medium text-brand-navy">
                      Genuine Resort Aerial Night Photography
                    </span>
                  </div>

                  {/* Caption on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-sans font-medium uppercase tracking-wider bg-brand-gold text-brand-navy mb-1.5">
                      Banquet Lawns Under Night Sky
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-medium leading-snug drop-shadow-md">
                      Sprawling Illuminated Wedding Grounds at The Orchha Resort
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Narrative & Property Truth */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.15}>
              <div className="border-l-2 border-brand-gold pl-5 py-1">
                <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                  &ldquo;A wedding in Orchha is an intimate journey into royalty—a place where the stars shine brighter across the river and sacred vows echo with timeless dignity.&rdquo;
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4 text-brand-charcoal/85 leading-relaxed text-sm sm:text-base font-light">
                <p>
                  Nestled directly upon <strong>Kanchanghat</strong>, The Orchha Resort offers an idyllic sanctuary for multi-day destination weddings. While commercial city hotels rush wedding parties through rigid banquet hall slots, our riverside retreat offers wide-open space, unhurried time, and complete exclusivity.
                </p>
                <p>
                  Surrounded by a certified <strong>zero-pollution atmosphere</strong>, guests breathe clean, fresh river air while celebrating under open night skies. The historic 14 royal cenotaphs stand directly opposite the water, illuminated in twilight to create an incomparable backdrop for wedding photography.
                </p>
              </div>
            </FadeIn>

            {/* Verified Why-Orchha Points */}
            <FadeIn delay={0.35}>
              <div className="bg-white rounded-xl p-5 border border-brand-charcoal/10 shadow-subtle space-y-3.5">
                <div className="font-sans text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  Why Couples Choose Orchha Resort
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-brand-charcoal/80">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Exclusive Property Buyout:</strong> Take over all 44 rooms and Swiss tents to turn the entire resort into a private wedding estate.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Spiritual Reverence:</strong> Seek blessings at the revered Ram Raja Temple (just 1.2 km away) before your pheras.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Seamless Connectivity:</strong> Conveniently located 18 km from Jhansi Junction (direct Shatabdi &amp; Vande Bharat trains from Delhi).</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
