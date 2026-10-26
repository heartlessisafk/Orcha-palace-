"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SPA_DECORATIVE_ASSETS, SPA_PHOTOGRAPHY_REGISTRY } from "@/lib/spa-assets";
import { SPA_CONTACT_INFO } from "@/data/spa-catalog";
import { Sparkles, ArrowDown, Flower2, Clock, CheckCircle2, ShoppingBag } from "lucide-react";

export interface SpaHeroRoyalProps {
  selectedCount: number;
  subtotal: number;
  onOpenTray: () => void;
  onOpenEnquiry: () => void;
}

export function SpaHeroRoyal({
  selectedCount,
  subtotal,
  onOpenTray,
  onOpenEnquiry,
}: SpaHeroRoyalProps) {
  const handleScrollToCatalogue = () => {
    const el = document.getElementById("catalogue");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-brand-canvas border-b border-brand-gold/15">
      {/* Decorative Botanical Leaf in top-right corner */}
      <div className="absolute top-12 right-2 md:right-8 w-32 h-44 md:w-44 md:h-60 opacity-30 pointer-events-none z-0">
        <Image
          src={SPA_DECORATIVE_ASSETS.botanicalBranch.src}
          alt=""
          fill
          sizes="176px"
          className="object-contain"
        />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Royal Typography & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={0.1}>
              {/* Royal Heritage Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-beige border border-brand-gold/40 text-brand-charcoal text-xs font-sans shadow-subtle">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src={SPA_DECORATIVE_ASSETS.royalCrest.src}
                    alt=""
                    fill
                    sizes="16px"
                    className="object-contain"
                  />
                </div>
                <span className="font-semibold tracking-wider uppercase text-[11px] text-brand-gold-dark">
                  {SPA_CONTACT_INFO.brandName}
                </span>
                <span className="text-brand-charcoal/30">•</span>
                <span className="text-brand-charcoal/80">Kanchanghat Sanctuary</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-navy font-bold leading-[1.12] tracking-tight">
                  Sacred Ayurvedic Wellness &amp; Royal Rejuvenation
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark">
                  Authentic Kerala therapies on the peaceful banks of the Betwa
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-sans text-brand-charcoal/80 text-base sm:text-lg leading-relaxed max-w-xl">
                Immerse yourself in centuries of natural healing. From authentic warm medicated oil Abhyangam and meditative Shirodhara to restorative herbal wraps, every therapy is formulated to bring equilibrium to body, mind, and spirit.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleScrollToCatalogue}
                  className="shadow-elevated group"
                >
                  <ArrowDown className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Explore 11 Spa Treatments
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenTray}
                  className="border-brand-gold/40 hover:bg-brand-beige text-brand-charcoal"
                >
                  <ShoppingBag className="w-4 h-4 mr-2 text-brand-gold-dark" />
                  <span>
                    {selectedCount > 0
                      ? `Treatment Tray (${selectedCount}) • ₹${subtotal.toLocaleString("en-IN")}`
                      : "Open Treatment Tray"}
                  </span>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              {/* Trust Badges strictly from PDF & Property Audit */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-brand-charcoal/10 text-xs text-brand-charcoal/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-dark shrink-0" />
                  <span>11 Verified Therapies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-dark shrink-0" />
                  <span>Warm Medicated Herbal Oils</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-dark shrink-0" />
                  <span>Kerala Trained Practitioners</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Photographic Composition */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.25} className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Shirodhara Arch Composition */}
              <div className="relative rounded-t-full rounded-b-2xl overflow-hidden border-2 border-brand-gold/30 shadow-elevated bg-brand-beige aspect-[3/4] max-h-[520px]">
                <Image
                  src={SPA_PHOTOGRAPHY_REGISTRY.shirodhara.master}
                  alt={SPA_PHOTOGRAPHY_REGISTRY.shirodhara.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />

                {/* Overlaid Treatment Callout */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-canvas/95 backdrop-blur-md p-3.5 rounded-xl border border-brand-gold/30 shadow-subtle">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-gold-dark">
                        Featured Royal Ritual
                      </p>
                      <h3 className="font-serif font-bold text-base text-brand-navy">
                        Shirodhara (शिरोधारा)
                      </h3>
                      <p className="text-xs text-brand-charcoal/70">
                        60 Minutes • ₹3,080 + Taxes
                      </p>
                    </div>
                    <button
                      onClick={handleScrollToCatalogue}
                      className="px-3 py-1.5 rounded-full bg-brand-navy text-white text-xs font-sans font-medium hover:bg-brand-navy-light transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Overlapping Inset Card: Abhyangam */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-brand-canvas p-2.5 rounded-2xl shadow-elevated border border-brand-gold/30 hidden sm:block max-w-[210px]">
                <div className="relative w-full h-24 rounded-lg overflow-hidden">
                  <Image
                    src={SPA_PHOTOGRAPHY_REGISTRY.abhyangam.card}
                    alt={SPA_PHOTOGRAPHY_REGISTRY.abhyangam.alt}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <div className="pt-2 px-1">
                  <p className="text-[10px] uppercase font-sans font-semibold tracking-wider text-brand-gold-dark">
                    Full-Body Massage
                  </p>
                  <p className="font-serif font-bold text-xs text-brand-navy leading-tight">
                    Abhyangam (50 mins)
                  </p>
                  <p className="text-[11px] font-sans font-semibold text-brand-charcoal mt-0.5">
                    ₹2,200
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
