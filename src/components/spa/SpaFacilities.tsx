"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SubtitleTag, Heading, Text } from "@/components/ui/Typography";
import { HoverZoom } from "@/components/motion/HoverZoom";
import { FadeIn } from "@/components/motion/FadeIn";
import { VERIFIED_SPA_FACILITIES } from "@/data/spa";
import { RESORT_ASSETS } from "@/lib/assets";
import { Check, Sparkles } from "lucide-react";

export function SpaFacilities() {
  return (
    <Section surface="beige" spacing="default" id="facilities">
      <Container>
        <div className="max-w-2xl mb-12 md:mb-16">
          <SubtitleTag>Verified Property Facilities</SubtitleTag>
          <Heading as="h2" size="h2">The Wellness Pavilion</Heading>
          <Text variant="lead" className="mt-2">
            Designed exclusively for quiet therapeutic focus, featuring custom teakwood massage tables, herbal steam suites, and tranquil riverfront gardens.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VERIFIED_SPA_FACILITIES.map((facility, idx) => {
            const asset = RESORT_ASSETS[facility.imageKey] || RESORT_ASSETS.ayurvedaSpa;

            return (
              <FadeIn key={facility.id} delay={idx * 0.1}>
                <div className="flex flex-col h-full rounded-luxury bg-white border border-brand-charcoal/10 overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300">
                  {/* Image Frame with Hover Zoom */}
                  <HoverZoom aspectRatio="4:3">
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </HoverZoom>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-brand-gold mb-1">
                      {facility.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2.5">
                      {facility.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-olive leading-relaxed mb-5">
                      {facility.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mt-auto pt-4 border-t border-brand-charcoal/8 text-xs text-brand-charcoal/90 font-sans">
                      {facility.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
