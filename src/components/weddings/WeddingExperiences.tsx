"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { Sparkles, Music, Flame, Utensils, HeartHandshake, Tent, ShieldCheck } from "lucide-react";

export function WeddingExperiences() {
  const experiences = [
    {
      id: "mehendi",
      icon: Sparkles,
      tag: "Daytime Ritual",
      title: "Haldi & Mehendi by the Lotus Pool",
      description:
        "Bask in warm sunshine and gentle river breezes beside the lotus-petal pool. Draped in bright marigold and bougainvillea, with poolside chaat stalls, refreshing sherbets, and live dholak rhythms setting the festive mood.",
      image: WEDDING_ASSETS.lotusPoolside.src,
      alt: WEDDING_ASSETS.lotusPoolside.alt,
      highlights: [
        "Open-air sun deck adorned with colorful festive canopies",
        "Poolside beverage service and live culinary counters",
        "Foot relaxation therapies available via Ayurveda team",
      ],
    },
    {
      id: "sangeet",
      icon: Music,
      tag: "Evening Spectacle",
      title: "The Sangeet Night Under the Stars",
      description:
        "Turn the night into a royal spectacle on the grand lawn stage. Equipped for high-fidelity sound, dynamic concert trusses, cold pyrotechnic fountains, and lively performances by family members and local Bundelkhand folk dancers.",
      image: WEDDING_ASSETS.sangeetCelebration.src,
      alt: WEDDING_ASSETS.sangeetCelebration.alt,
      highlights: [
        "Elevated performance stage with cold-pyro safe fountains",
        "Dedicated dance floor and professional sound provisions",
        "Nightly Bundeli folk troupes (Rai & Badhai) for authentic cultural flair",
      ],
    },
    {
      id: "pheras",
      icon: Flame,
      tag: "Sacred Vivah",
      title: "The Sacred Pheras in Canopied Splendor",
      description:
        "Exchange sacred vows under a canopy of illuminated lotus pendants and fragrant mogra strings. As evening temple bells resonate across the Betwa, your union is consecrated in an atmosphere of deep spiritual serenity.",
      image: WEDDING_ASSETS.mandapCanopy.src,
      alt: WEDDING_ASSETS.mandapCanopy.alt,
      highlights: [
        "Vedic havan setup with traditional fire-safe brass kund",
        "Hanging illuminated lotus lamps and fresh floral garlands",
        "Riverside sunset views across to Orchha's 14 royal cenotaphs",
      ],
    },
    {
      id: "feasting",
      icon: Utensils,
      tag: "Culinary Feast",
      title: "Royal Banqueting by Kaleva",
      description:
        "Our master chefs craft bespoke wedding menus celebrating the rich culinary heritage of central India alongside refined North Indian royal curries, live charcoal tandoor stations, authentic chaat gallis, and international delicacies.",
      image: "/images/resort/genuine/kaleva.jpg",
      alt: "Kaleva Restaurant dining team at The Orchha Resort",
      highlights: [
        "Customizable regional Bundelkhandi royal delicacies",
        "Expansive vegetarian and multi-cuisine banquet layouts",
        "Live interactive cooking counters and artisanal mithai bars",
      ],
    },
    {
      id: "wellness",
      icon: HeartHandshake,
      tag: "Bridal Rejuvenation",
      title: "Bridal Pampering & Kerala Ayurveda",
      description:
        "Ensure bride, groom, and parents look and feel their most radiant. Our dedicated Kerala Ayurveda wellness pavilion provides restorative Abhyanga herbal oil massages, Shirodhara relaxation, and detoxifying herbal steam baths.",
      image: "/images/resort/genuine/spa2.jpg",
      alt: "Ayurveda Wellness Therapy Suite at The Orchha Resort",
      highlights: [
        "Pre-wedding destress therapies and skin rejuvenation",
        "Synchronized herbal oil massage for couple relaxation",
        "11 authentic Ayurvedic therapies prepared with native botanicals",
      ],
    },
    {
      id: "stay",
      icon: Tent,
      tag: "Guest Sanctuary",
      title: "Exclusive Accommodations for 44 Keys",
      description:
        "Host your entire wedding party together in privacy. With Standard Room Garden Facing, Deluxe Room Garden Facing, Deluxe Marble Bed Garden Facing, and Super Deluxe Pool Facing accommodations, all your loved ones stay on-site, sharing breakfast by the pool and late-night laughter.",
      image: WEDDING_ASSETS.guestSwissTents.src,
      alt: WEDDING_ASSETS.guestSwissTents.alt,
      highlights: [
        "11 Air-conditioned luxury Swiss tents nestled in private gardens",
        "Full resort buyout options for complete multi-day exclusivity",
        "24-hour room service, daily housekeeping, and front-desk concierge",
      ],
    },
  ];

  return (
    <section id="wedding-experiences" className="py-20 sm:py-28 bg-brand-canvas text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <SubtitleTag>Curated Celebrations</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            Celebration Moments &amp; Rituals
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Every tradition honored with beauty, comfort, and gracious hospitality
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            From sunrise Haldi laughter by the lotus pool to midnight Sangeet encores under the Bundelkhand stars, discover how your wedding celebrations unfold.
          </Text>
        </div>

        {/* 3x2 Grid of Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <FadeIn key={exp.id} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle hover:shadow-hover hover:-translate-y-1.5 hover:scale-[1.012] hover:border-brand-gold/40 active:scale-[0.985] transition-all duration-300 ease-out flex flex-col h-full group cursor-pointer">
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-beige">
                    <Image
                      src={exp.image}
                      alt={exp.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

                    {/* Tag badge on image */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-brand-navy/10 text-[11px] font-sans font-medium text-brand-navy">
                      {exp.tag}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="font-serif text-base sm:text-lg font-medium drop-shadow-sm">
                        {exp.title}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-brand-gold-dark font-sans text-xs font-bold uppercase tracking-wider">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{exp.tag}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>

                    {/* Highlights list */}
                    <div className="space-y-1.5 pt-3 border-t border-brand-charcoal/8">
                      {exp.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-brand-charcoal/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 mt-1" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
