"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Compass, Waves, Tent, BedDouble, Columns, Sparkles, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutArchitectureSpaces() {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  const spaces = [
    {
      id: "pool",
      label: "Lotus-Shaped Pool",
      icon: Waves,
      tag: "Signature Aquatic Centre",
      title: "The Central Lotus Swimming Pool",
      description:
        "Designed in the symbolic contour of a blooming lotus flower, the resort's expansive outdoor swimming pool serves as the serene centrepiece of the property. Filtered and maintained to international hygiene standards, the pool is bordered by teak loungers, flowering frangipani, and terracotta pavilion verandas. As evening approaches, underwater luminaires cast amber reflections across the surface.",
      image: ABOUT_HERITAGE_ASSETS.lotusPool.src,
      alt: ABOUT_HERITAGE_ASSETS.lotusPool.alt,
      features: [
        "Unique lotus-petal geometry with children's shallow wading area",
        "Open-air sun deck with parasols and pool beverage service",
        "Filtered daily with eco-conscious freshwater recirculation",
      ],
      architectNote:
        "Conceived by Yogesh Chandra as a visual reservoir echoing the historic kunds of Orchha while serving as a revitalizing oasis.",
    },
    {
      id: "tents",
      label: "Luxury Swiss Tents",
      icon: Tent,
      tag: "Garden Glamping Experience",
      title: "11 Deluxe Air-Conditioned Swiss Tents",
      description:
        "Tucked into secluded garden alcoves beneath flowering shade trees, the resort's 11 Deluxe Swiss Tents offer a romantic safari-style immersion into nature. Built upon solid stone plinths and crafted with heavy-gauge weatherproof canvas, each tent features full interior climate control, timber furnishings, private ensuite tiled bathrooms, and a personal shaded veranda facing the orchards.",
      image: ABOUT_HERITAGE_ASSETS.swissTents.src,
      alt: ABOUT_HERITAGE_ASSETS.swissTents.alt,
      features: [
        "Full split air conditioning and heating for year-round comfort",
        "Modern attached bathroom with 24-hour hot running water",
        "Private outdoor veranda overlooking manicured lawns",
      ],
      architectNote:
        "Inspired by royal encampments of Bundela rulers during hunting and military expeditions across central India.",
    },
    {
      id: "rooms",
      label: "Deluxe Rooms",
      icon: BedDouble,
      tag: "Refined Modern Comfort",
      title: "Deluxe Guest Rooms & Suites",
      description:
        "The resort offers 27 Standard Rooms and 6 spacious Deluxe Rooms. Each accommodation balances timeless Rajput elegance with modern comfort: polished timber headboards, large view windows welcoming garden breezes, high-speed Wi-Fi, satellite television, and ergonomic desk spaces.",
      image: ABOUT_HERITAGE_ASSETS.deluxeRoom.src,
      alt: ABOUT_HERITAGE_ASSETS.deluxeRoom.alt,
      features: [
        "Generous 350+ sq ft floor plans with garden or pool vistas",
        "Premium bedding, fine linens, and custom carved furnishings",
        "Modern amenities: mini-fridge, tea maker, electronic safe",
      ],
      architectNote:
        "Low-rise building wings oriented to maximize natural cross-ventilation and shield guest suites from daytime thermal gain.",
    },
    {
      id: "courtyard",
      label: "Courtyards & Baradari",
      icon: Columns,
      tag: "Traditional Stone Craft",
      title: "Pillared Baradari & Open Courtyards",
      description:
        "Throughout the resort grounds, traditional stone architecture creates natural gathering spaces. Hand-carved sandstone pillars support classic baradaris (twelve-pillared pavilions) where guests can pause with a book or sip masala chai. Courtyard jaali screens cast geometric shadows across stone walkways as the sun moves across the sky.",
      image: ABOUT_HERITAGE_ASSETS.architecturalDetails.src,
      alt: ABOUT_HERITAGE_ASSETS.architecturalDetails.alt,
      features: [
        "Sandstone baradari pavilion for quiet reading and gatherings",
        "Traditional jaali stone screens providing natural cooling",
        "Seamless transition between indoor lounges and shaded garden paths",
      ],
      architectNote:
        "Every archway and stone plinth honors Bundela craftsmanship while maintaining clean, uncluttered contemporary lines.",
    },
  ];

  const currentSpace = spaces[activeSpaceIndex];

  return (
    <section id="architecture" className="py-20 sm:py-28 bg-brand-white text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <SubtitleTag>Architectural Design</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            Architecture, Courtyards &amp; Grounds
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Conceived by Architect Yogesh Chandra (New Delhi)
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            A harmonious low-rise resort campus that honors Bundelkhand&apos;s heritage through sandstone baradaris, lotus waterworks, and 44 tranquil guest sanctuaries.
          </Text>
        </div>

        {/* Space Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {spaces.map((space, idx) => {
            const Icon = space.icon;
            const isActive = activeSpaceIndex === idx;
            return (
              <button
                key={space.id}
                type="button"
                onClick={() => setActiveSpaceIndex(idx)}
                className={cn(
                  "flex items-center gap-2.5 p-3 sm:p-4 rounded-xl text-left border transition-all duration-300 ease-out cursor-pointer",
                  "hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                  isActive
                    ? "bg-brand-navy text-white border-brand-navy shadow-subtle ring-2 ring-brand-gold/40"
                    : "bg-brand-canvas text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-beige/60 hover:border-brand-gold/30"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-brand-gold" : "text-brand-charcoal/60"
                  )}
                />
                <div className="min-w-0">
                  <span className="block font-sans text-xs font-bold uppercase tracking-wider truncate">
                    {space.label}
                  </span>
                  <span
                    className={cn(
                      "block text-[11px] truncate mt-0.5",
                      isActive ? "text-white/70" : "text-brand-charcoal/60"
                    )}
                  >
                    {space.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Space Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-brand-canvas/60 rounded-2xl p-6 sm:p-8 border border-brand-charcoal/10 shadow-subtle">
          {/* Left Column: Genuine Photo Frame */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="relative rounded-xl overflow-hidden border border-brand-charcoal/10 shadow-elevated bg-brand-beige">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={currentSpace.image}
                    alt={currentSpace.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Genuine Photo Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-navy/10 shadow-subtle flex items-center gap-1.5 text-xs text-brand-navy font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <span>Official Property Photo</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-serif text-lg sm:text-xl font-medium drop-shadow-sm">
                      {currentSpace.title}
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
                {currentSpace.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">
                {currentSpace.title}
              </h3>
            </div>

            <p className="font-sans text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-light">
              {currentSpace.description}
            </p>

            {/* Key Features List */}
            <div className="space-y-2 pt-1 border-t border-brand-charcoal/10">
              {currentSpace.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/90">
                  <Check className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Architect's Design Note */}
            <div className="bg-white rounded-lg p-3.5 border border-brand-gold/30 text-xs text-brand-charcoal/80 space-y-1">
              <span className="font-sans font-bold uppercase tracking-wider text-brand-navy block">
                Architect&apos;s Design Note
              </span>
              <p className="italic text-brand-charcoal/80 font-serif">
                &ldquo;{currentSpace.architectNote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
