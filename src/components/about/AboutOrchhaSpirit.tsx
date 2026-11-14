"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Landmark, Crown, ShieldAlert, BookOpen, Compass, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutOrchhaSpirit() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const chhatrisAsset = ABOUT_HERITAGE_ASSETS.historicChhatris;

  const milestones = [
    {
      year: "1531 AD",
      title: "Founding by Raja Rudra Pratap Singh",
      role: "The Hidden Citadel",
      story:
        "Rudra Pratap Singh, chieftain of the Bundela Rajputs, chose this dense forest curve along the Betwa River to establish his capital. The name 'Orchha' translates in the local dialect to 'Ondchho'—meaning 'hidden' or 'tucked away'—offering natural defence against imperial armies.",
      badge: "Bundela Dynasty Origin",
    },
    {
      year: "1605 – 1627 AD",
      title: "Golden Era of Maharaja Bir Singh Deo",
      role: "Architectural Zenith",
      story:
        "The reign of Maharaja Bir Singh Deo marked the pinnacle of Orchha's artistic and architectural flowering. He commissioned the world-renowned Jahangir Mahal, the monumental Chaturbhuj Temple, and dozens of civic reservoirs, combining Hindu temple geometry with sophisticated Mughal stonecraft.",
      badge: "Classical Golden Age",
    },
    {
      year: "17th – 18th Century",
      title: "The 14 Royal Cenotaphs at Kanchan Ghat",
      role: "Memorials to the Bundela Rulers",
      story:
        "Erected along the sacred water's edge at Kanchan Ghat, these 14 soaring cenotaphs (Chhatris) commemorate the rulers of Orchha and their queens. Unlike conventional royal tombs, they unite cubical Rajput pavilions with soaring temple spires (shikharas), standing directly across the water from our resort.",
      badge: "Riverfront Cenotaphs",
    },
    {
      year: "Living Legend",
      title: "The Kingdom Where Rama Reigns as King",
      role: "The Ram Raja Tradition",
      story:
        "Orchha is celebrated throughout the world as the only place where Lord Rama is revered not solely as a deity, but as the reigning secular Sovereign of the land. At the Ram Raja Temple, He receives a formal armed guard of honour by the Madhya Pradesh police force four times every day.",
      badge: "Living Sacred Tradition",
    },
  ];

  return (
    <section id="spirit" className="py-20 sm:py-28 bg-brand-navy text-white overflow-hidden relative">
      {/* Decorative background watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-sans font-medium uppercase tracking-widest mb-3 border border-brand-gold/30">
            <Landmark className="w-3.5 h-3.5" />
            <span>Heritage Horizon • Bundelkhand</span>
          </div>
          <Heading as="h2" size="hero" inverted className="text-white">
            The Spirit of Orchha &amp; The 14 Cenotaphs
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold mt-2">
            A centuries-old legacy viewed in quiet reverence from our riverbank
          </p>
          <p className="font-sans text-brand-beige/80 text-base sm:text-lg mt-4 max-w-2xl font-light leading-relaxed">
            While our resort was thoughtfully conceived by contemporary architect Yogesh Chandra to provide 5-star comfort,
            our entire atmosphere is shaped by the timeless silhouettes of Orchha&apos;s royal heritage rising directly across the Betwa.
          </p>
        </div>

        {/* 2-Column Layout: Left = Monument Context & Transparency; Right = Interactive Historical Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Monument Image & Strict Historical Integrity Callout */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden border border-brand-gold/30 shadow-floating bg-brand-charcoal/40">
                <div className="relative aspect-square w-full max-h-[420px]">
                  <Image
                    src={chhatrisAsset.src}
                    alt={chhatrisAsset.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* Distinction Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-gold/40 text-xs text-brand-beige flex items-center gap-2 shadow-subtle">
                    <ShieldAlert className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>
                      <strong>Destination Landmark:</strong> 14 Royal Cenotaphs at Kanchan Ghat (Historic monument context, not resort property)
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-serif text-lg font-medium block">
                      The 14 Royal Chhatris of Kanchan Ghat
                    </span>
                    <span className="font-sans text-xs text-brand-gold/90 block mt-0.5">
                      Seen across the tranquil waters of the Betwa from The Orchha Resort
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Research Integrity Statement */}
            <FadeIn delay={0.15}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs sm:text-sm text-brand-beige/85 space-y-2.5">
                <div className="flex items-center gap-2 text-brand-gold font-sans font-bold uppercase tracking-wider text-xs">
                  <Crown className="w-4 h-4" />
                  Our Commitment to Historical Truth
                </div>
                <p className="leading-relaxed">
                  We take pride in absolute transparency: <em>The Orchha Resort does not claim to be a royal palace converted from ancient times</em>. We are a premier hospitality sanctuary designed to honor Bundelkhand&apos;s architectural spirit while offering modern comforts, immaculate hygiene, and front-row contemplation of Orchha&apos;s monuments.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Historical Chronology & Interactive Journey */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Chronicles of Bundelkhand
              </span>
              <span className="font-sans text-xs text-white/50">
                Click any era to read the chronicle
              </span>
            </div>

            {/* Chronology Accordion / Cards */}
            <div className="space-y-3">
              {milestones.map((item, idx) => {
                const isActive = selectedMilestone === idx;
                return (
                  <div
                    key={item.year}
                    onClick={() => setSelectedMilestone(idx)}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 sm:p-5 transition-all duration-300",
                      isActive
                        ? "bg-white/10 border-brand-gold/60 shadow-subtle"
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg sm:text-xl font-bold text-brand-gold">
                          {item.year}
                        </span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                        <span className="font-sans text-sm sm:text-base font-medium text-white">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded text-[11px] font-sans font-medium uppercase tracking-wider shrink-0",
                          isActive
                            ? "bg-brand-gold text-brand-navy"
                            : "bg-white/10 text-white/70"
                        )}
                      >
                        {item.role}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-3.5 mt-2 border-t border-white/10 text-sm text-brand-beige/90 leading-relaxed font-light"
                      >
                        <p>{item.story}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
