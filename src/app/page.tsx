"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { HeroRatingBadge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import { RoomSearchWidgetPrimitive } from "@/components/booking/RoomSearchWidgetPrimitive";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RESORT_ASSETS } from "@/lib/assets";
import { RoomDetails } from "@/types/room";
import { Sparkles, ArrowRight, ShieldCheck, Waves, Coffee, TreePine } from "lucide-react";

export default function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      <NavbarPrimitive transparentAtTop />

      {/* 1. HERO BANNER */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-32 pb-24 md:pb-32 overflow-hidden bg-brand-navy">
        {/* Background Imagery with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src={RESORT_ASSETS.heroDesktop.src}
            alt={RESORT_ASSETS.heroDesktop.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full">
          <Container>
            <div className="max-w-3xl space-y-4">
              <FadeIn delay={0.1}>
                <HeroRatingBadge className="mb-2" />
              </FadeIn>

              <FadeIn delay={0.2}>
                <SubtitleTag inverted>Sanctuary on the River Betwa · Orchha</SubtitleTag>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-display tracking-tightest">
                  Understated luxury where royalty meets the river.
                </h1>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="font-sans text-base sm:text-lg text-brand-beige-sand/90 max-w-2xl leading-relaxed">
                  32 secluded rooms and luxury Swiss tents facing the 14 historical Chhatris. 
                  Experience authentic Bundeli warmth, lotus pool serenity, and certified zero-pollution tranquility.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <a href="#search">
                    <Button variant="gold" size="lg" withArrow>
                      Explore Availability
                    </Button>
                  </a>
                  <Link href="/design-system">
                    <Button variant="navy-outline" size="lg">
                      View Design System
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </Container>
        </div>
      </section>

      {/* 2. MANDATORY ROOM SEARCH INTERFACE (Immediately Below Hero) */}
      <section id="search" className="relative z-20 -mt-12 sm:-mt-16 mb-8 px-4">
        <Container>
          <FadeIn delay={0.2}>
            <RoomSearchWidgetPrimitive />
          </FadeIn>
        </Container>
      </section>

      {/* 3. RESORT PHILOSOPHY & TEXT-REVEAL SECTION */}
      <Section surface="canvas" spacing="default" id="about">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <SubtitleTag>Our Philosophy</SubtitleTag>
            <FadeIn>
              <TextReveal
                text="We believe a great stay is quiet, considered, and completely yours. Every room, every detail, and every interaction is arranged so arriving feels like exhaling."
                className="text-center justify-center"
              />
            </FadeIn>
            <Text variant="muted" className="max-w-xl mx-auto pt-4">
              Established across from the ancient cenotaphs of Bundelkhand, Orchha Resort is designed 
              by architect Yogesh Chandra to honor centuries of heritage with contemporary comforts.
            </Text>
          </div>
        </Container>
      </Section>

      {/* 4. FEATURED ACCOMMODATIONS (Our Rooms) */}
      <Section surface="white" spacing="default" id="rooms">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <SubtitleTag>Accommodation Showcase</SubtitleTag>
              <Heading as="h2" size="h2">Thoughtfully Designed Stays</Heading>
              <Text variant="lead" className="mt-1">
                32 private rooms and luxury Swiss tents curated for genuine rest.
              </Text>
            </div>
            <Link href="/design-system">
              <Button variant="outline" size="pill" withArrow>
                View Design System Specs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {VERIFIED_ROOMS.map((room) => (
              <FadeIn key={room.id}>
                <RoomCardPrimitive
                  room={room}
                  onEnquire={(r) => setSelectedRoom(r)}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. SIGNATURE AMENITIES (Why Stay With Us) */}
      <Section surface="beige" spacing="default" id="amenities">
        <Container>
          <div className="max-w-2xl mb-12">
            <SubtitleTag>Signature Facilities</SubtitleTag>
            <Heading as="h2" size="h2">Why Stay at Orchha Resort</Heading>
            <Text variant="lead" className="mt-2">
              Every facility is thoughtfully curated to immerse guests in tranquility, wellness, and authentic regional hospitality.
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                <Waves className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Lotus-Shaped Pool</h4>
              <p className="font-sans text-sm text-brand-olive leading-relaxed">
                Sculpted in the silhouette of a blooming lotus flower, complete with children&apos;s splash pool and sun deck loungers.
              </p>
            </div>

            <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Kaleva Restaurant</h4>
              <p className="font-sans text-sm text-brand-olive leading-relaxed">
                Vegetarian-forward dining serving Bundelkhandi specialties alongside classic Indian, Chinese, and Continental menus.
              </p>
            </div>

            <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Kerala Ayurveda Spa</h4>
              <p className="font-sans text-sm text-brand-olive leading-relaxed">
                Rejuvenating herbal massage therapies and steam baths administered by certified practitioners for mind and body equilibrium.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <FooterPrimitive />
    </div>
  );
}
