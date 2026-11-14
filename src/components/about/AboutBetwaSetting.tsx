"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Waves, Sparkles, MapPin, Wind, Sun, Moon, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutBetwaSetting() {
  const [activeTab, setActiveTab] = useState<"dawn" | "day" | "dusk">("dawn");

  const facadeAsset = ABOUT_HERITAGE_ASSETS.riverSetting;
  const gardenAsset = ABOUT_HERITAGE_ASSETS.gardenWalkways;

  const moments = {
    dawn: {
      title: "Mornings by the River Mist",
      desc: "As dawn breaks over Kanchanghat, cool breezes carry the distant chime of temple bells from the Ram Raja shrine across the Betwa. River kingfishers dart over polished granite boulders, and dew settles on manicured lawn grasses.",
      tag: "06:00 AM – 08:30 AM",
      image: facadeAsset.src,
      alt: facadeAsset.alt,
    },
    day: {
      title: "Shaded Garden Canopies",
      desc: "Throughout the sunlit afternoon, mature neem, mango, and peepal trees cast cool dappled shade across stone pathways. Within this certified non-polluted belt, the air is clean, fragrant with flowering flora, and undisturbed by traffic.",
      tag: "10:00 AM – 04:30 PM",
      image: gardenAsset.src,
      alt: gardenAsset.alt,
    },
    dusk: {
      title: "Twilight Reflections & Starlit Solitude",
      desc: "Sunset transforms the Betwa into shimmering liquid bronze. Low-rise resort pavilions glow with warm amber lighting, inviting guests to sit along the lawn edge with tea and watch the ancient silhouettes of the cenotaphs recede into dusk.",
      tag: "05:30 PM – 09:00 PM",
      image: facadeAsset.src,
      alt: "The Orchha Resort twilight reflections along the Betwa riverbank",
    },
  };

  const currentMoment = moments[activeTab];

  return (
    <section id="betwa-setting" className="py-20 sm:py-28 bg-brand-canvas text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <SubtitleTag>Geography &amp; Sanctuary</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            The Place Beside the Betwa
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Where Kanchanghat whispers to the water
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            The ancient Sanskrit name for the Betwa is <em>Vetravati</em>—&ldquo;she who contains cane and reeds.&rdquo;
            Long worshipped as a sacred watercourse of central India, its waters flow clear and unhurried past the resort&apos;s stone boundary.
          </Text>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase & Genuine Photo Frame */}
          <div className="lg:col-span-7 space-y-4">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-elevated bg-brand-beige/40">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={currentMoment.image}
                    alt={currentMoment.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Floating Verified Badge on Image */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-navy/10 shadow-subtle flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                    <span className="font-sans text-xs font-medium text-brand-navy">
                      Genuine Resort Photography
                    </span>
                  </div>

                  {/* Caption banner on bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-sans font-medium uppercase tracking-wider bg-brand-gold text-brand-navy mb-1.5">
                      {currentMoment.tag}
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-medium leading-snug drop-shadow-md">
                      {currentMoment.title}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Time-of-Day Interactive Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 p-1.5 bg-brand-beige/80 rounded-xl border border-brand-charcoal/8">
              <button
                type="button"
                onClick={() => setActiveTab("dawn")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all",
                  activeTab === "dawn"
                    ? "bg-white text-brand-navy shadow-subtle border border-brand-gold/30"
                    : "text-brand-charcoal/70 hover:text-brand-navy hover:bg-white/40"
                )}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>River Dawn</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("day")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all",
                  activeTab === "day"
                    ? "bg-white text-brand-navy shadow-subtle border border-brand-gold/30"
                    : "text-brand-charcoal/70 hover:text-brand-navy hover:bg-white/40"
                )}
              >
                <Wind className="w-3.5 h-3.5 text-teal-600" />
                <span>Daylight Flora</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("dusk")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all",
                  activeTab === "dusk"
                    ? "bg-white text-brand-navy shadow-subtle border border-brand-gold/30"
                    : "text-brand-charcoal/70 hover:text-brand-navy hover:bg-white/40"
                )}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Twilight Dusk</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Property Truth */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.15}>
              <div className="border-l-2 border-brand-gold pl-5 py-1">
                <p className="font-serif text-lg sm:text-xl text-brand-navy leading-relaxed italic">
                  &ldquo;Here, arrival is not merely checking into a room; it is the quiet sensation of the mind settling to the ancient rhythm of the water.&rdquo;
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4 text-brand-charcoal/85 leading-relaxed text-sm sm:text-base">
                <p>
                  Located directly upon <strong>Kanchanghat</strong>, The Orchha Resort occupies one of the rarest vantage points in Madhya Pradesh. While the historic monuments of Orchha draw visitors from around the world, this side of the river remains protected, sheltered from commercial noise and vehicle thoroughfare.
                </p>
                <p>
                  The resort stands within a certified <strong>zero-pollution belt</strong>. There are no industrial complexes, no urban traffic jams, and no light pollution to drown out the night stars. Instead, manicured lawns transition gently toward the riverbank, framed by native trees that shelter over 80 species of resident and migratory birds.
                </p>
              </div>
            </FadeIn>

            {/* Verified Fact Points */}
            <FadeIn delay={0.35}>
              <div className="bg-white rounded-xl p-5 border border-brand-charcoal/10 shadow-subtle space-y-3.5">
                <div className="font-sans text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  Verified Property Geography
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-brand-charcoal/80">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Direct Riverbank Frontage:</strong> Immediate access to the stone banks of Kanchanghat and sunrise vistas.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>100% Non-Polluted Haven:</strong> Clean, fresh air surrounded by natural forest cover and river breezes.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Effortless Access:</strong> Just 18 km from Jhansi Junction railway station (Virangana Lakshmibai) and 125 km from Gwalior Airport.</span>
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
