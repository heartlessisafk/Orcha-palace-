import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  Sparkles,
  ShieldCheck,
  Compass,
  Waves,
  Coffee,
  CheckCircle,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accommodations & Luxury Rooms | The Orchha Resort",
  description:
    "Explore 50 thoughtfully designed accommodations: Standard Room Garden Facing, Deluxe Room Garden Facing, Deluxe Marble Bed Garden Facing, and Super Deluxe Pool Facing on the banks of River Betwa in Orchha.",
  alternates: {
    canonical: "https://www.orchharesort.com/rooms",
  },
  openGraph: {
    title: "Luxury Accommodations & Rooms | The Orchha Resort",
    description:
      "Serene heritage retreats across from the 14 Royal Cenotaphs in Orchha. Featuring Standard Room Garden Facing, Deluxe Room Garden Facing, Deluxe Marble Bed Garden Facing, and Super Deluxe Pool Facing.",
    url: "https://www.orchharesort.com/rooms",
    images: ["/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accommodations & Luxury Rooms | The Orchha Resort",
    description:
      "Explore 50 thoughtfully designed accommodations: Standard Room Garden Facing, Deluxe Room Garden Facing, Deluxe Marble Bed Garden Facing, and Super Deluxe Pool Facing on the banks of River Betwa in Orchha.",
    images: ["/images/resort/curated/rooms/room-deluxe-interior-panoramic.jpg"],
  },
};

export default function RoomsPage() {
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/rooms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NavbarPrimitive />

      <main id="main-content" className="pt-20 bg-brand-canvas text-brand-charcoal min-h-screen">
        {/* 1. HERO SECTION */}
        <section className="relative py-20 lg:py-28 bg-[#0C1731] text-white overflow-hidden border-b border-brand-gold/20">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <Image
              src="/images/resort/curated/pool/pool-lotus-twilight-glow.jpg"
              alt="The Orchha Resort lotus pool and heritage landscape at dusk"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1731]/95 via-[#0C1731]/80 to-transparent" />

          <Container className="relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-serif tracking-widest text-brand-gold uppercase">
                <Compass className="w-3.5 h-3.5 text-brand-gold" />
                Sanctuary on the River Betwa
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
                Accommodations &amp; Suites
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                A collection of 50 peaceful rooms and suites nestled in certified zero-pollution
                riverside gardens across from the 14 Royal Cenotaphs.
              </p>

              {/* Direct Booking Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-sans text-brand-gold/90">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  Best Rate Direct Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  Complimentary Breakfast Included
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  Free 48-Hour Cancellation
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. ROOM CATALOG GRID */}
        <Section surface="canvas" spacing="default" id="catalog">
          <Container>
            <div className="space-y-4 text-center max-w-2xl mx-auto mb-12">
              <SubtitleTag>Accommodation Showcase</SubtitleTag>
              <Heading as="h2" size="h2">
                Thoughtfully Designed Stays
              </Heading>
              <Text variant="muted">
                Each category reflects authentic Bundelkhandi architecture, handcrafted teak
                furnishings, and unhurried riverside tranquility.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {VERIFIED_ROOMS.map((room) => (
                <RoomCardPrimitive key={room.id} room={room} />
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. RESORT AMENITIES & EXPERIENCES INCLUDED */}
        <Section surface="white" spacing="default" className="border-t border-brand-charcoal/10">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <SubtitleTag>The Sanctuary Experience</SubtitleTag>
                <Heading as="h2" size="h2">
                  More than just a room. A complete heritage retreat.
                </Heading>
                <Text variant="body" className="leading-relaxed">
                  Stepping outside your door opens into landscaped riverside flora, the gentle murmur of
                  the River Betwa, and the iconic lotus-shaped pool reflecting Orchha&apos;s 16th-century
                  skyline.
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-brand-canvas border border-brand-charcoal/8 space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                      <Waves className="w-4 h-4 text-brand-gold-dark" />
                      <span>Lotus Pool Deck</span>
                    </div>
                    <p className="text-xs text-brand-olive leading-relaxed">
                      Signature blooming lotus-silhouette swimming pool with palm sun loungers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-canvas border border-brand-charcoal/8 space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                      <Sparkles className="w-4 h-4 text-brand-gold-dark" />
                      <span>Kairali Ayurvedic Spa</span>
                    </div>
                    <p className="text-xs text-brand-olive leading-relaxed">
                      Authentic Kerala herbal therapies, Abhyangam massage, and rejuvenation sessions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-canvas border border-brand-charcoal/8 space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                      <Coffee className="w-4 h-4 text-brand-gold-dark" />
                      <span>Kaleva Dining</span>
                    </div>
                    <p className="text-xs text-brand-olive leading-relaxed">
                      Multi-cuisine dining under hand-carved stone pillars and riverside alfresco tables.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-canvas border border-brand-charcoal/8 space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm">
                      <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                      <span>Zero-Pollution Air</span>
                    </div>
                    <p className="text-xs text-brand-olive leading-relaxed">
                      Pristine riverside micro-climate with certified zero vehicular smog or noise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-floating">
                <Image
                  src="/images/resort/curated/dining/dining-riverfront-alfresco.jpg"
                  alt="Alfresco riverside dining overlooking the River Betwa and Chhatris"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono text-brand-gold uppercase">Riverside Sanctuary</span>
                  <h4 className="font-serif text-xl font-normal">Alfresco Dining along the Betwa River</h4>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. CONCIERGE ASSISTANCE CTA BANNER */}
        <section className="py-16 bg-[#0C1731] text-white border-t border-brand-gold/20">
          <Container size="narrow">
            <div className="text-center space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-serif tracking-widest text-brand-gold uppercase">
                <Compass className="w-3.5 h-3.5 text-brand-gold" />
                Personalized Reservation Concierge
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Planning a special holiday or family celebration?
              </h2>

              <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
                Our reservations desk is available 24 hours a day to assist with room selections,
                bespoke heritage tours, and riverfront dining arrangements.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/919425141240?text=Hello%20Orchha%20Resort,%20I%20would%20like%20to%20plan%20my%20stay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="gold" size="pill" withArrow className="w-full sm:w-auto gap-2">
                    <MessageCircle className="w-4 h-4 text-brand-navy" />
                    <span>WhatsApp Concierge</span>
                  </Button>
                </a>

                <a href="tel:+919425141240" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="pill"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 gap-2"
                  >
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span>Call +91 94251 41240</span>
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <FooterPrimitive />
    </>
  );
}
