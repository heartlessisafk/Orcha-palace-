"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { ABOUT_HERITAGE_ASSETS } from "@/lib/about-assets";
import { Button } from "@/components/ui/Button";
import { Utensils, Sparkles, Activity, Music, ArrowRight, ShieldCheck } from "lucide-react";

export function AboutHospitality() {
  const experiences = [
    {
      id: "kaleva",
      icon: Utensils,
      eyebrow: "Culinary Heritage",
      title: "Kaleva Multi-Cuisine Restaurant",
      description:
        "Named after traditional hospitality feasts, Kaleva presents the authentic flavors of Bundelkhand alongside classical North Indian, Continental, and Oriental cuisines. Dine within the warm timber-lined indoor hall or request a lantern-lit table on the poolside lawn under the starlit sky.",
      image: ABOUT_HERITAGE_ASSETS.kalevaDining.src,
      alt: ABOUT_HERITAGE_ASSETS.kalevaDining.alt,
      features: [
        "Regional Bundelkhandi specialties and royal thalis",
        "Poolside outdoor dining and beverage service",
        "Open daily for breakfast, lunch, and dinner",
      ],
      ctaLabel: "View Dining Offerings",
      ctaHref: "/#dining",
    },
    {
      id: "ayurveda",
      icon: Sparkles,
      eyebrow: "Holistic Wellness",
      title: "Authentic Kerala Ayurveda Spa",
      description:
        "Tucked into a tranquil pavilion, our dedicated wellness retreat is staffed by experienced practitioners versed in ancient Kerala healing. Featuring classic Shirodhara oil stream therapies, synchronized Abhyanga herbal massages, and restorative herbal steam baths using native botanical infusions.",
      image: ABOUT_HERITAGE_ASSETS.ayurvedaSpaRoom.src,
      alt: ABOUT_HERITAGE_ASSETS.ayurvedaSpaRoom.alt,
      features: [
        "11 curated traditional therapies from our royal spa menu",
        "Custom wooden Shirodhara vessels and medicated herbal oils",
        "Herbal steam chamber for post-massage deep detoxification",
      ],
      ctaLabel: "Explore Full Spa Menu (11 Treatments)",
      ctaHref: "/spa",
    },
    {
      id: "sports",
      icon: Activity,
      eyebrow: "Active Recreation",
      title: "Riverside Tennis & Sports",
      description:
        "For guests who appreciate active wellness, the resort features an outdoor tennis and badminton court framed by riverfront trees and greenery. Wake to early morning matches as the river mist clears, or utilize the fully equipped fitness gymnasium.",
      image: ABOUT_HERITAGE_ASSETS.riversideSports.src,
      alt: ABOUT_HERITAGE_ASSETS.riversideSports.alt,
      features: [
        "Full-size outdoor hard tennis and badminton court",
        "Equipped gymnasium with cardio and strength stations",
        "Complimentary racquets and sports equipment at the desk",
      ],
      ctaLabel: "Resort Amenities Guide",
      ctaHref: "/#amenities",
    },
    {
      id: "cultural",
      icon: Music,
      eyebrow: "Cultural Living",
      title: "Bundeli Folk Dances & Evenings",
      description:
        "As twilight descends, the resort courtyard comes alive with the rhythm of the dholak and nagada. Local Bundelkhand folk dancers perform celebratory Rai and Badhai dances in vibrant traditional attire, sharing the folklore of brave kings and timeless devotion.",
      image: ABOUT_HERITAGE_ASSETS.banquetCourtyard.src,
      alt: ABOUT_HERITAGE_ASSETS.banquetCourtyard.alt,
      features: [
        "Nightly Bundeli folk performances under courtyard lanterns",
        "Open-air celebration lawns for private banquets & weddings",
        "1,500 sq ft Ballroom hall for destination gatherings",
      ],
      ctaLabel: "Inquire for Celebrations",
      ctaHref: "#reserve",
    },
  ];

  return (
    <section id="hospitality" className="py-20 sm:py-28 bg-brand-canvas text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <SubtitleTag>Life at The Resort</SubtitleTag>
          <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
            Hospitality, Dining &amp; Rejuvenation
          </Heading>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
            Warm Bundelkhandi warmth paired with thoughtful 5-star comforts
          </p>
          <Text variant="lead" className="mt-4 text-brand-charcoal/80 max-w-2xl">
            From the fragrant spices of Kaleva to the soothing rhythm of warm herbal oils in the Ayurveda suite, every moment is arranged to restore both body and spirit.
          </Text>
        </div>

        {/* 2x2 Grid of Rich Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <FadeIn key={exp.id} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col h-full group">
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-beige">
                    <Image
                      src={exp.image}
                      alt={exp.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Verified Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-navy/10 shadow-subtle flex items-center gap-1.5 text-xs text-brand-navy font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-dark" />
                      <span>Verified Resort Amenity</span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white flex items-center justify-between">
                      <span className="font-serif text-lg sm:text-xl font-medium drop-shadow-sm">
                        {exp.title}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-brand-gold-dark font-sans text-xs font-bold uppercase tracking-wider">
                        <Icon className="w-4 h-4" />
                        <span>{exp.eyebrow}</span>
                      </div>
                      <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-light">
                        {exp.description}
                      </p>
                      <div className="space-y-1.5 pt-2">
                        {exp.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-brand-charcoal/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-brand-charcoal/8">
                      <Link
                        href={exp.ctaHref}
                        className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-brand-navy hover:text-brand-gold transition-colors group/link"
                      >
                        <span>{exp.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
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
