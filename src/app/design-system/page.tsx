"use client";

import React, { useState } from "react";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Badge, HeroRatingBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Stepper } from "@/components/ui/Stepper";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import { RoomSearchWidgetPrimitive } from "@/components/booking/RoomSearchWidgetPrimitive";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RoomDetails } from "@/types/room";
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function DesignSystemPage() {
  const [stepperVal, setStepperVal] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);

  const colorTokens = [
    { name: "Brand Navy", hex: "#0C1731", role: "Primary Dark Surface / Footers", bgClass: "bg-brand-navy", textClass: "text-white" },
    { name: "Navy Light", hex: "#1A2B50", role: "Elevated Navy / Hover State", bgClass: "bg-brand-navy-light", textClass: "text-white" },
    { name: "Heritage Beige", hex: "#F4F0E6", role: "Primary Warm Linen Background", bgClass: "bg-brand-beige", textClass: "text-brand-charcoal" },
    { name: "Sand Linen", hex: "#E8DCC5", role: "Muted Neutral / Badges", bgClass: "bg-brand-beige-sand", textClass: "text-brand-charcoal" },
    { name: "Antique Bronze", hex: "#8C6D3F", role: "Accent CTA / Borders / Rating", bgClass: "bg-brand-gold", textClass: "text-white" },
    { name: "Gold Highlight", hex: "#B89758", role: "Hover Accent / Star Accents", bgClass: "bg-brand-gold-light", textClass: "text-brand-navy" },
    { name: "Earth Charcoal", hex: "#260E01", role: "Primary Body Text (Warm Black)", bgClass: "bg-brand-charcoal", textClass: "text-white" },
    { name: "Canvas Warm", hex: "#FDFBF7", role: "Default Page Canvas", bgClass: "bg-brand-canvas", textClass: "text-brand-charcoal" },
  ];

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col">
      <NavbarPrimitive />

      {/* Header Banner */}
      <div className="pt-28 pb-12 bg-brand-navy text-white border-b border-white/10">
        <Container>
          <div className="max-w-3xl space-y-3">
            <SubtitleTag inverted>Design System & Foundation Spec</SubtitleTag>
            <Heading as="h1" size="h1" inverted>
              Orchha Resort Design Tokens & UI Primitives
            </Heading>
            <Text variant="on-dark">
              Audited Phase 2 design system establishing reusable color tokens, typography scales,
              interactive states, accessibility standards, and motion choreography for the Orchha Resort redesign.
            </Text>
          </div>
        </Container>
      </div>

      <main className="flex-1 space-y-16 py-12">
        {/* 1. Color Palette Tokens */}
        <Section surface="canvas" spacing="compact">
          <Container>
            <div className="mb-8">
              <SubtitleTag>01. Color & Contrast Tokens</SubtitleTag>
              <Heading as="h2" size="h2">Audited Navy & Beige Palette</Heading>
              <Text variant="lead">Grounded in midnight river navy, heritage sand linen, and antique temple bronze.</Text>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {colorTokens.map((token) => (
                <div key={token.hex} className="rounded-xl overflow-hidden border border-brand-charcoal/10 shadow-subtle bg-white">
                  <div className={`h-24 ${token.bgClass} flex items-end p-3`}>
                    <span className={`text-xs font-mono font-bold ${token.textClass}`}>{token.hex}</span>
                  </div>
                  <div className="p-3 space-y-0.5">
                    <p className="font-sans text-xs font-semibold text-brand-charcoal">{token.name}</p>
                    <p className="font-sans text-[11px] text-brand-muted">{token.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 2. Typography Hierarchy */}
        <Section surface="white" spacing="compact">
          <Container>
            <div className="mb-8">
              <SubtitleTag>02. Typography System</SubtitleTag>
              <Heading as="h2" size="h2">Serif Editorial & Modern Sans Pairings</Heading>
              <Text variant="lead">Crimson Text for royal narrative headings; DM Sans for interface and body copy.</Text>
            </div>

            <div className="space-y-6 max-w-4xl border-y border-brand-charcoal/10 py-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-brand-muted">Hero Heading (Crimson Text 600)</span>
                <p className="font-serif text-4xl sm:text-5xl font-semibold text-brand-charcoal leading-display tracking-tightest">
                  Where ancient Bundelkhand meets the serene Betwa.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-brand-muted">Section Heading H2 (Crimson Text 600)</span>
                <Heading as="h2" size="h2">Refined Stays for Discerning Travelers</Heading>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-brand-muted">Card Heading H3 (Crimson Text 600)</span>
                <Heading as="h3" size="h3">Deluxe Room Garden Facing</Heading>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-brand-muted">Body Lead & Primary (DM Sans 400)</span>
                <Text variant="lead">
                  Situated in a certified zero-pollution sanctuary 18 km from Jhansi, featuring 50 heritage accommodations and genuine Bundelkhandi warmth.
                </Text>
                <Text variant="body" className="mt-2">
                  All rooms boast satellite LED television, individual climate air-conditioning, stocked mini-bar, digital safety locker, and 24-hour in-room dining.
                </Text>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Foundational UI Components */}
        <Section surface="canvas" spacing="compact">
          <Container>
            <div className="mb-8">
              <SubtitleTag>03. Interactive Buttons & Badges</SubtitleTag>
              <Heading as="h2" size="h2">Tactile Buttons & Social Proof Badges</Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buttons Showcase */}
              <Card variant="bordered" padding="md" className="space-y-4">
                <h4 className="font-serif text-lg font-semibold text-brand-navy">Button Variants</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" withArrow>Primary Navy</Button>
                  <Button variant="gold" withArrow>Antique Gold</Button>
                  <Button variant="secondary">Linen Secondary</Button>
                  <Button variant="outline">Hairline Outline</Button>
                  <Button variant="primary" size="sm">Small Pill</Button>
                  <Button variant="primary" isLoading>Loading State</Button>
                </div>
              </Card>

              {/* Badges Showcase */}
              <Card variant="bordered" padding="md" className="space-y-4">
                <h4 className="font-serif text-lg font-semibold text-brand-navy">Badges & Social Proof</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <HeroRatingBadge />
                  <Badge variant="gold">Signature Experience</Badge>
                  <Badge variant="navy">Lotus Pool View</Badge>
                  <Badge variant="beige">Birdwatcher Sanctuary</Badge>
                  <Badge variant="outline">320 SQ FT</Badge>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* 4. Motion Choreography: Scroll Text Reveal */}
        <Section surface="beige" spacing="compact">
          <Container>
            <div className="mb-6">
              <SubtitleTag>04. Motion Choreography</SubtitleTag>
              <Heading as="h2" size="h2">Word-by-Word Scroll Opacity Reveal</Heading>
              <Text variant="lead">Scroll the page down to observe individual words interpolating from 20% to 100% opacity.</Text>
            </div>

            <Card variant="elevated" padding="lg" className="bg-white">
              <TextReveal
                text="We believe a great stay is quiet, considered, and completely yours. Every room, every detail, and every interaction is arranged so arriving feels like exhaling."
                wordClassName="text-brand-charcoal"
              />
            </Card>
          </Container>
        </Section>

        {/* 5. Mandatory Room Search Component Primitive */}
        <Section surface="canvas" spacing="compact">
          <Container>
            <div className="mb-6">
              <SubtitleTag>05. Booking Architecture Preparation</SubtitleTag>
              <Heading as="h2" size="h2">Mandatory Room-Search Widget Primitive</Heading>
              <Text variant="lead">
                Docked directly beneath the hero banner on the homepage. Includes date pickers, guest/room counters, validation, and direct WhatsApp concierge / OTA handoff modal.
              </Text>
            </div>

            <RoomSearchWidgetPrimitive />
          </Container>
        </Section>

        {/* 6. Foundational Room Card Primitive */}
        <Section surface="white" spacing="compact">
          <Container>
            <div className="mb-8">
              <SubtitleTag>06. Accommodation Card Primitives</SubtitleTag>
              <Heading as="h2" size="h2">Verified 50-Room Categories</Heading>
              <Text variant="lead">Hover over cards to verify the 1.03x luxury image zoom and specifications layout.</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VERIFIED_ROOMS.slice(0, 2).map((room) => (
                <RoomCardPrimitive
                  key={room.id}
                  room={room}
                  onEnquire={(r) => setSelectedRoom(r)}
                />
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <FooterPrimitive />
    </div>
  );
}
