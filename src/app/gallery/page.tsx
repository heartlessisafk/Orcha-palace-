import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading, AnimatedParagraph, AnimatedTag } from "@/components/motion/AnimatedTypography";
import { Sparkles, Calendar, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Photo Gallery | The Orchha Resort — Betwa River Sanctuary",
  description:
    "Explore authentic high-resolution photography of The Orchha Resort. Featuring our lotus-shaped swimming pool, deluxe rooms, luxury Swiss tents, Kaleva restaurant, Kairali Ayurvedic spa, and riverside celebrations overlooking the 14 Royal Chhatris.",
  alternates: {
    canonical: "https://www.orchharesort.com/gallery",
  },
  openGraph: {
    title: "Photo Gallery | The Orchha Resort — Betwa River Sanctuary",
    description:
      "Explore authentic high-resolution photography of The Orchha Resort. Featuring our lotus-shaped swimming pool, deluxe rooms, luxury Swiss tents, and riverfront heritage.",
    url: "https://www.orchharesort.com/gallery",
    images: ["/images/resort/curated/pool/pool-lotus-twilight-glow.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | The Orchha Resort",
    description:
      "Explore authentic high-resolution photography of The Orchha Resort across accommodations, wellness, dining, and heritage.",
    images: ["/images/resort/curated/pool/pool-lotus-twilight-glow.jpg"],
  },
};

export default function GalleryPage() {
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ]);

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Navigation */}
      <NavbarPrimitive transparentAtTop />

      <main id="main-content" className="flex-1">
        {/* Cinematic Gallery Hero */}
        <section className="relative min-h-[58vh] sm:min-h-[64vh] flex items-end pb-12 sm:pb-16 pt-32 overflow-hidden bg-brand-charcoal">
          {/* Background Image: Iconic Lotus Pool Twilight - Authentic Natural Colors */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/curated/pool/pool-lotus-twilight-glow.jpg"
              alt="Orchha Resort Lotus Pool Twilight Glow"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Restrained neutral scrim ensuring crisp typography while showcasing genuine pool turquoise & courtyard warmth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-radial-vignette opacity-30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-sand text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Verified Resort Visual Chronicle</span>
              </div>

              <AnimatedHeading as="h1" size="hero" inverted delay={0.1}>
                Atmospheres of <br />
                <span className="italic font-light text-brand-sand">The Orchha Resort</span>
              </AnimatedHeading>

              <AnimatedParagraph variant="lead" className="text-white/85 max-w-2xl" delay={0.25}>
                Step inside our riverside sanctuary. Discover the sacred blooming geometry of our lotus pool, 
                hand-carved Bundelkhand stone architecture, luxury Swiss tents under starry skies, and royal 
                banquets overlooking the ancient 14 Chhatris.
              </AnimatedParagraph>

              {/* Key Highlights Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-white/70 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>100% Genuine Resort Photography</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>Kanchan Ghat, Betwa Riverfront</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Interactive Viewer */}
        <GalleryViewer />

        {/* Bottom Booking Invitation CTA */}
        <section className="py-16 md:py-24 bg-brand-beige/50 border-t border-brand-charcoal/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-medium">
              Experience It in Person
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-navy max-w-2xl mx-auto leading-snug">
              Begin Your Journey to the Riverside Sanctuary
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-charcoal/70 max-w-xl mx-auto">
              Whether you seek a quiet wellness retreat, a royal heritage holiday, or a destination celebration, 
              The Orchha Resort welcomes you with genuine Bundelkhand warmth.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/#rooms">
                <Button variant="primary" size="pill" withArrow>
                  Reserve Your Stay
                </Button>
              </Link>
              <Link href="/weddings">
                <Button variant="outline" size="pill">
                  Plan a Destination Wedding
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterPrimitive />
    </div>
  );
}
