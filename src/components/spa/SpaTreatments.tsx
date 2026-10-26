"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SubtitleTag, Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HoverZoom } from "@/components/motion/HoverZoom";
import { FadeIn } from "@/components/motion/FadeIn";
import { VERIFIED_SPA_TREATMENTS, SpaTreatment } from "@/data/spa";
import { RESORT_ASSETS } from "@/lib/assets";
import { Clock, Info, Check, ArrowRight } from "lucide-react";

export interface SpaTreatmentsProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export function SpaTreatments({ onSelectTreatment }: SpaTreatmentsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Therapies" },
    { id: "rejuvenation", label: "Rejuvenation" },
    { id: "therapeutic", label: "Therapeutic & Pain Relief" },
    { id: "detox", label: "Detox & Steam" },
    { id: "traditional", label: "Traditional Rituals" },
  ];

  const filteredTreatments =
    activeCategory === "all"
      ? VERIFIED_SPA_TREATMENTS
      : VERIFIED_SPA_TREATMENTS.filter((t) => t.category === activeCategory);

  return (
    <Section surface="white" spacing="default" id="treatments">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <SubtitleTag>Authentic Ayurvedic Therapies</SubtitleTag>
            <Heading as="h2" size="h2">Ayurvedic Treatment Menu</Heading>
            <Text variant="lead" className="mt-2">
              Every therapy is prescribed and administered using pure botanical medicated oils formulated according to ancient Kerala texts.
            </Text>
          </div>

          {/* Pricing Transparency Disclaimer */}
          <div className="rounded-xl bg-brand-beige/60 border border-brand-charcoal/10 p-4 max-w-sm text-xs text-brand-olive flex items-start gap-2.5 shrink-0">
            <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-brand-charcoal block">Pricing Transparency</span>
              <span>Therapy durations and tariffs are finalized upon consultation with our on-site Ayurvedic physician to tailor oil formulations to your Dosha.</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-brand-charcoal/8 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-brand-navy text-white shadow-subtle"
                  : "bg-brand-beige/50 text-brand-charcoal/80 hover:bg-brand-beige hover:text-brand-navy"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment, idx) => {
            const asset = RESORT_ASSETS[treatment.imageKey] || RESORT_ASSETS.ayurvedaSpa;

            return (
              <FadeIn key={treatment.id} delay={idx * 0.08}>
                <div className="group flex flex-col h-full rounded-luxury bg-brand-canvas border border-brand-charcoal/10 overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300">
                  {/* Image Frame */}
                  <div className="relative">
                    <HoverZoom aspectRatio="4:3">
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </HoverZoom>

                    {treatment.badge && (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <Badge variant="gold" size="sm" className="shadow-subtle">
                          {treatment.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Sanskrit and Name */}
                    <div className="mb-2">
                      {treatment.sanskritName && (
                        <span className="font-serif text-xs text-brand-gold font-medium tracking-wide block">
                          {treatment.sanskritName}
                        </span>
                      )}
                      <h3 className="font-serif text-xl font-semibold text-brand-charcoal leading-snug">
                        {treatment.name}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-brand-olive leading-relaxed mb-4">
                      {treatment.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-5 text-xs text-brand-charcoal/80 font-sans">
                      {treatment.highlights.slice(0, 3).map((hl) => (
                        <li key={hl} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Duration / Consultation Note */}
                    <div className="mt-auto pt-3 border-t border-brand-charcoal/8 flex items-center justify-between text-xs text-brand-muted mb-4 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{treatment.verifiedDetails.durationNote.split("(")[0]}</span>
                      </div>
                      <span className="text-[11px] font-medium text-brand-gold-dark">
                        Consultation Required
                      </span>
                    </div>

                    {/* Enquiry Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      withArrow
                      onClick={() => onSelectTreatment(treatment.name)}
                    >
                      Enquire About Treatment
                    </Button>
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
