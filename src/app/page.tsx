"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { HeroScrollBookingSequence } from "@/components/hero/HeroScrollBookingSequence";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { ClippedReveal } from "@/components/motion/ClippedReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedHeading, AnimatedParagraph } from "@/components/motion/AnimatedTypography";
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import { GuestLoveExperience } from "@/components/reviews/GuestLoveExperience";
import { PalaceToMapFinale } from "@/components/map/PalaceToMapFinale";
import { HomeFacilitiesInteractive } from "@/components/home/HomeFacilitiesInteractive";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RESORT_ASSETS } from "@/lib/assets";
import { Waves, Coffee, TreePine, Sparkles, MapPin, Compass, Camera, ArrowRight, Utensils } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      <NavbarPrimitive transparentAtTop />

      <main id="main-content" className="flex-1">
        {/* 1 & 2. CINEMATIC HERO & SCROLL-TRANSFORMING BOOKING SEQUENCE */}
        <HeroScrollBookingSequence />

      {/* 3. SIGNATURE AMENITIES (Why Stay at Orchha Resort) */}
      <Section surface="beige" spacing="default" id="amenities">
        <Container>
          <div className="max-w-2xl mb-12">
            <SubtitleTag>Signature Facilities</SubtitleTag>
            <AnimatedHeading as="h2" size="h2" delay={0.05}>Why Stay at Orchha Resort</AnimatedHeading>
            <AnimatedParagraph variant="lead" className="mt-2" delay={0.15}>
              Every facility is thoughtfully curated to immerse guests in tranquility, wellness, and authentic regional hospitality.
            </AnimatedParagraph>
          </div>

          <HomeFacilitiesInteractive />
        </Container>
      </Section>

      {/* 4. FEATURED ACCOMMODATIONS (Our Rooms & Tents) */}
      <Section surface="white" spacing="default" id="rooms">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <SubtitleTag>Accommodation Showcase</SubtitleTag>
              <Heading as="h2" size="h2">Thoughtfully Designed Stays</Heading>
              <Text variant="lead" className="mt-1">
                50 private rooms and suites facing landscaped gardens and the lotus pool.
              </Text>
            </div>
            <Link href="/about">
              <Button variant="outline" size="pill" withArrow>
                Our Property Story
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {VERIFIED_ROOMS.map((room, idx) => {
              const CardContent = (
                <RoomCardPrimitive
                  room={room}
                  onEnquire={(r) => {
                    const bookingDock = document.getElementById("booking-sequence");
                    if (bookingDock) {
                      bookingDock.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = `/rooms/${r.id}`;
                    }
                  }}
                />
              );

              return (
                <FadeIn key={room.id} delay={idx * 0.1}>
                  <TiltCard maxTilt={1.8}>{CardContent}</TiltCard>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. RESORT PHILOSOPHY & WORD-BY-WORD SCROLL REVEAL */}
      <Section surface="canvas" spacing="default" id="about">
        <Container size="narrow">
          <div className="text-center space-y-4 mb-8">
            <SubtitleTag>Our Philosophy</SubtitleTag>
            <FadeIn>
              <TextReveal
                text="We believe a great stay is quiet, considered, and completely yours. Every room, every detail, and every interaction is arranged so arriving feels like exhaling."
                className="text-center justify-center max-w-3xl mx-auto"
              />
            </FadeIn>
            <Text variant="muted" className="max-w-xl mx-auto pt-4">
              Established on the sacred riverbanks of Bundelkhand across from the 14 royal cenotaphs,
              The Orchha Resort combines royal architectural harmony with 5-star comforts in a certified zero-pollution sanctuary.
            </Text>
          </div>
        </Container>
      </Section>

      {/* 6. CLIPPED PHOTOGRAPHY BANNER (Heritage Setting) */}
      <Section surface="navy" spacing="compact" id="heritage">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <SubtitleTag inverted>Historical Horizons</SubtitleTag>
              <Heading as="h2" size="h2" inverted>
                Direct Views of the 14 Royal Cenotaphs
              </Heading>
              <Text variant="on-dark">
                Set just 500 meters along the peaceful riverbanks, Orchha Resort provides unobstructed views of the grand 17th-century multi-storied memorials of the Bundela rulers. Experience golden-hour sunsets from our manicured lawns and private balconies.
              </Text>
              <div className="pt-2">
                <Link href="/rooms">
                  <Button variant="gold" size="pill" withArrow>
                    Explore Accommodations
                  </Button>
                </Link>
              </div>
            </div>

            <ClippedReveal direction="up" delay={0.2} className="rounded-luxury border border-white/10 shadow-floating">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={RESORT_ASSETS.historicalHorizons.src}
                  alt={RESORT_ASSETS.historicalHorizons.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ClippedReveal>
          </div>
        </Container>
      </Section>

      {/* 6.5 VISUAL GALLERY SHOWCASE TEASER */}
      <Section surface="canvas" spacing="default" id="gallery-preview">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <SubtitleTag>Visual Archive</SubtitleTag>
              <Heading as="h2" size="h2">The Resort in Photographs</Heading>
              <Text variant="lead" className="mt-2">
                A curated visual chronicle of 300 genuine captures across our blooming lotus pool, heritage guest wings, riverfront dining, and celebratory lawns.
              </Text>
            </div>
            <Link href="/gallery" className="shrink-0">
              <Button variant="outline" size="pill" withArrow>
                View Full Photo Gallery
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <FadeIn delay={0.05} className="col-span-2 row-span-2">
              <Link href="/gallery" className="group block relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/pool/pool-lotus-twilight-glow.jpg"
                  alt="Lotus Swimming Pool at Twilight"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">Lotus Pool & Grounds</span>
                  <h4 className="font-serif text-xl text-white font-medium">Twilight Pool Glow & Chhatris</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/aerial/gallery-aerial-betwa-chhatris.jpg"
                  alt="Aerial View of 14 Royal Cenotaphs & Betwa Waters"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Heritage Horizons</span>
                  <h4 className="font-serif text-sm text-white font-medium">Aerial Kanchan Ghat & Betwa</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/heritage/gallery-riverfront-promenade-dusk.jpg"
                  alt="Riverfront Terrace Promenade with Evening Lanterns"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Riverfront Walkways</span>
                  <h4 className="font-serif text-sm text-white font-medium">Betwa Riverside Promenade</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/gardens/gallery-riverside-lawn-lounge.jpg"
                  alt="Manicured Riverside Lawn with Shaded Lounge Seating"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Resort Lawns</span>
                  <h4 className="font-serif text-sm text-white font-medium">Al Fresco Riverside Lawn</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.25}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/heritage/gallery-chhatri-sunset-silhouette.jpg"
                  alt="Silhouette of Royal Cenotaph Dome at Twilight Sunset"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Twilight Splendour</span>
                  <h4 className="font-serif text-sm text-white font-medium">Cenotaph Sunset Silhouette</h4>
                </div>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* 7. THE GUEST LOVE EXPERIENCE (Second-Last Homepage Section: Alternating Tinder-Inspired Card Choreography) */}
      <GuestLoveExperience />

        {/* 8. CINEMATIC PALACE-TO-MAP SCROLL FINALE (Closing Experience inspired by Inversa-Scroll-Animation) */}
        <PalaceToMapFinale id="map-experience" />
      </main>

      <FooterPrimitive />
    </div>
  );
}
