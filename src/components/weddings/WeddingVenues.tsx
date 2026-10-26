"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { Trees, Sparkles, Columns, Waves, Building2, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeddingVenues() {
  const [activeVenueIndex, setActiveVenueIndex] = useState(0);

  const venues = [
    {
      id: "lawns",
      label: "Grand Banquet Lawns",
      icon: Trees,
      tag: "Outdoor Grandeur",
      title: "The Grand Riverfront Banquet Lawns",
      description:
        "An expansive open-air celebration venue set amidst manicured riverside lawns. With ample space for grand stages, dining pavilions, elaborate buffet setups, and royal baraat processions, the lawns offer an enchanting canvas under the starlit Bundelkhand sky.",
      image: WEDDING_ASSETS.aerialLawnNight.src,
      alt: WEDDING_ASSETS.aerialLawnNight.alt,
      features: [
        "Sprawling open-sky capacity for grand wedding receptions and large guest gatherings",
        "Dedicated covered entrance promenade for red-carpet VIP guest arrival",
        "Ample power infrastructure for concert lighting, audio trusses, and pyrotechnics",
      ],
      eventSuitability: "Grand Wedding Reception, Royal Sangeet Night, Grand Baraat Arrival",
    },
    {
      id: "stage",
      label: "Royal Reception Stage",
      icon: Sparkles,
      tag: "Majestic Stagecraft",
      title: "The Royal Architectural Stage",
      description:
        "Designed with intricate white jaali screens echoing traditional Bundeli palace architecture, multi-tiered crystal chandeliers, and lavish fresh floral swags. Provides a breathtaking focal point for varmala ceremonies, formal receptions, and royal photography.",
      image: WEDDING_ASSETS.grandReceptionStage.src,
      alt: WEDDING_ASSETS.grandReceptionStage.alt,
      features: [
        "Handcrafted white jaali architectural arches with warm stage illumination",
        "Multi-tiered crystal chandeliers and cascading fresh floral garlands",
        "Plush velvet sofa seating for the couple and formal family greetings",
      ],
      eventSuitability: "Varmala Ceremony, Royal Reception, Family Portraits & Stage Greetings",
    },
    {
      id: "mandap",
      label: "Canopied Mandap Pavilion",
      icon: Columns,
      tag: "Sacred Intimacy",
      title: "Canopied Royal Mandap Pavilion",
      description:
        "A gorgeously styled canopied sanctuary adorned with warm-lit suspended lotus lamps, fragrant strings of fresh mogra and marigolds, and mirrored mosaic pillars. Created for solemn Vedic pheras with riverside night breezes flowing through.",
      image: WEDDING_ASSETS.mandapCanopy.src,
      alt: WEDDING_ASSETS.mandapCanopy.alt,
      features: [
        "Suspended glowing lotus lamps echoing the resort's central lotus motif",
        "Fragrant fresh jasmine and marigold floral tassels creating a sacred aura",
        "Mirrored mosaic pillars reflecting candle flame and traditional ceremonial lamps",
      ],
      eventSuitability: "Sacred Pheras, Vedic Vivah Rituals, Intimate Family Feasts",
    },
    {
      id: "ballroom",
      label: "Royal Ballroom (1,500 sq ft)",
      icon: Building2,
      tag: "Climate-Controlled Elegance",
      title: "The 1,500 sq ft Royal Ballroom",
      description:
        "A spacious indoor hall equipped with full air-conditioning and audio-visual provisions. Ideal for pre-wedding functions, bridal dance rehearsals, intimate indoor ceremonies, and seamless weather-proof event contingencies.",
      image: WEDDING_ASSETS.royalBallroom.src,
      alt: WEDDING_ASSETS.royalBallroom.alt,
      features: [
        "Verified 1,500 sq ft pillarless floor plan with flexible banquet seating",
        "Complete climate control for year-round comfort regardless of season",
        "Perfect backup venue ensuring worry-free celebrations rain or shine",
      ],
      eventSuitability: "Sangeet Dance Rehearsals, Indoor Haldi, Pre-Wedding Cocktail Evenings",
    },
    {
      id: "poolside",
      label: "Lotus Poolside Promenade",
      icon: Waves,
      tag: "Aquatic Romance",
      title: "The Lotus Poolside Promenade",
      description:
        "The resort's signature lotus-shaped swimming pool terrace bordered by sandstone baradaris and palm trees. Transforms during the daytime into a vibrant splash of color for Haldi and Mehendi, or a romantic lantern-lit lounge by dusk.",
      image: WEDDING_ASSETS.lotusPoolside.src,
      alt: WEDDING_ASSETS.lotusPoolside.alt,
      features: [
        "Unique lotus-petal aquatic geometry providing distinctive photo angles",
        "Open-air sun terraces with parasols and shaded pavilion seating",
        "Ideal setting for poolside chaat stalls, dholak beats, and sundowner mocktails",
      ],
      eventSuitability: "Sun-Kissed Mehendi, Haldi Floral Shower, Welcome Sundowner Cocktails",
    },
  ];

  const currentVenue = venues[activeVenueIndex];

  return (
    <section id="wedding-venues" className="py-20 sm:py-28 bg-brand-white text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SubtitleTag>Celebration Venues</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            Celebration Spaces &amp; Venues
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Verified settings for every ritual of your royal celebration
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            From expansive riverfront lawns capable of grand banquet setups to climate-controlled indoor halls and the signature lotus pool terrace.
          </Text>
        </div>

        {/* Venue Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {venues.map((venue, idx) => {
            const Icon = venue.icon;
            const isActive = activeVenueIndex === idx;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => setActiveVenueIndex(idx)}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl text-left border transition-all duration-300 ease-out cursor-pointer",
                  "hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                  isActive
                    ? "bg-brand-navy text-white border-brand-navy shadow-subtle ring-2 ring-brand-gold/40"
                    : "bg-brand-canvas text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-beige/60 hover:border-brand-gold/30"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-brand-gold" : "text-brand-charcoal/60"
                  )}
                />
                <div className="min-w-0">
                  <span className="block font-sans text-xs font-bold uppercase tracking-wider truncate">
                    {venue.label}
                  </span>
                  <span
                    className={cn(
                      "block text-[10px] truncate mt-0.5",
                      isActive ? "text-white/70" : "text-brand-charcoal/60"
                    )}
                  >
                    {venue.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Venue Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-brand-canvas/60 rounded-2xl p-6 sm:p-8 border border-brand-charcoal/10 shadow-subtle">
          {/* Left Column: Genuine Photo Frame */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="relative rounded-xl overflow-hidden border border-brand-charcoal/10 shadow-elevated bg-brand-beige">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={currentVenue.image}
                    alt={currentVenue.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

                  {/* Genuine Photo Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-navy/10 shadow-subtle flex items-center gap-1.5 text-xs text-brand-navy font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Verified Property Venue Photo</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-serif text-lg sm:text-xl font-medium drop-shadow-sm">
                      {currentVenue.title}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Space Story & Specs */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-brand-gold/20 text-brand-gold-dark border border-brand-gold/30 mb-2">
                {currentVenue.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">
                {currentVenue.title}
              </h3>
            </div>

            <p className="font-sans text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-light">
              {currentVenue.description}
            </p>

            {/* Key Features List */}
            <div className="space-y-2 pt-1 border-t border-brand-charcoal/10">
              {currentVenue.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/90">
                  <Check className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Event Suitability Note */}
            <div className="bg-white rounded-lg p-3.5 border border-brand-gold/30 text-xs text-brand-charcoal/80 space-y-1">
              <span className="font-sans font-bold uppercase tracking-wider text-brand-navy block">
                Recommended Celebrations
              </span>
              <p className="text-brand-charcoal/85 font-sans">
                {currentVenue.eventSuitability}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
