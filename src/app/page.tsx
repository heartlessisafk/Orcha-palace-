"use client";

import React, { useState } from "react";
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
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import { GuestLoveExperience } from "@/components/reviews/GuestLoveExperience";
import { PalaceToMapFinale } from "@/components/map/PalaceToMapFinale";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RESORT_ASSETS } from "@/lib/assets";
import { RoomDetails } from "@/types/room";
import { Waves, Coffee, TreePine, Sparkles, MapPin, Compass, Camera, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      <NavbarPrimitive transparentAtTop />

      {/* 1 & 2. CINEMATIC HERO & SCROLL-TRANSFORMING BOOKING SEQUENCE */}
      <HeroScrollBookingSequence />

      {/* 3. RESORT PHILOSOPHY & WORD-BY-WORD SCROLL REVEAL */}
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

      {/* 4. FEATURED ACCOMMODATIONS (Our Rooms & Tents) */}
      <Section surface="white" spacing="default" id="rooms">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <SubtitleTag>Accommodation Showcase</SubtitleTag>
              <Heading as="h2" size="h2">Thoughtfully Designed Stays</Heading>
              <Text variant="lead" className="mt-1">
                32 private rooms and luxury Swiss tents facing landscaped orchards and the lotus pool.
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
              // Apply TiltCard 3D depth to the Royal Heritage Suite for subtle tactile elegance
              const isSuite = room.category === "suite";
              const CardContent = (
                <RoomCardPrimitive
                  room={room}
                  onEnquire={(r) => setSelectedRoom(r)}
                />
              );

              return (
                <FadeIn key={room.id} delay={idx * 0.1}>
                  {isSuite ? (
                    <TiltCard maxTilt={2.0}>{CardContent}</TiltCard>
                  ) : (
                    CardContent
                  )}
                </FadeIn>
              );
            })}
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
            <FadeIn delay={0.1}>
              <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <Waves className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Lotus-Shaped Pool</h4>
                <p className="font-sans text-sm text-brand-olive leading-relaxed">
                  Sculpted in the silhouette of a blooming lotus flower, complete with children&apos;s splash pool and riverside sun deck loungers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Kaleva Restaurant</h4>
                <p className="font-sans text-sm text-brand-olive leading-relaxed">
                  Vegetarian-forward dining serving authentic Bundeli specialties alongside classic Indian, Chinese, and Continental culinary menus.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="p-7 rounded-luxury bg-white border border-brand-charcoal/10 shadow-subtle space-y-3 h-full">
                <div className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                  <TreePine className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-brand-charcoal">Kerala Ayurveda Spa</h4>
                <p className="font-sans text-sm text-brand-olive leading-relaxed">
                  Rejuvenating herbal massage therapies and steam baths administered by certified practitioners for holistic equilibrium.
                </p>
              </div>
            </FadeIn>
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
                Set just 500 meters along the peaceful riverbanks, Orchha Resort provides unobstructed views of the grand 17th-century multi-storied memorials of the Bundela rulers. Experience golden-hour sunsets from our manicured lawns or your Swiss tent verandah.
              </Text>
              <div className="pt-2">
                <Link href="/#rooms">
                  <Button variant="gold" size="pill" withArrow>
                    Explore Riverside Tents
                  </Button>
                </Link>
              </div>
            </div>

            <ClippedReveal direction="up" delay={0.2} className="rounded-luxury border border-white/10 shadow-floating">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={RESORT_ASSETS.chhatrisHeritage.src}
                  alt={RESORT_ASSETS.chhatrisHeritage.alt}
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
                  src="/images/resort/curated/rooms/room-deluxe-king-pool-view.jpg"
                  alt="Deluxe Room with Lotus Pool View"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Accommodations</span>
                  <h4 className="font-serif text-sm text-white font-medium">Deluxe Room Pool View</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/dining/dining-riverfront-alfresco.jpg"
                  alt="Al Fresco Riverfront Dining"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Riverfront Dining</span>
                  <h4 className="font-serif text-sm text-white font-medium">Betwa Riverside Kebabs</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/weddings/wedding-lawn-canopy-mandap.jpg"
                  alt="Royal Wedding Canopy Mandap"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Royal Celebrations</span>
                  <h4 className="font-serif text-sm text-white font-medium">Emerald & Ivory Mandap</h4>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.25}>
              <Link href="/gallery" className="group block relative aspect-square rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all">
                <Image
                  src="/images/resort/curated/architecture/architecture-lobby-ganesha.jpg"
                  alt="Sandstone Ganesha Lobby Mural"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-brand-gold uppercase">Architecture</span>
                  <h4 className="font-serif text-sm text-white font-medium">Handcrafted Stone Ganesha</h4>
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

      <FooterPrimitive />
    </div>
  );
}
