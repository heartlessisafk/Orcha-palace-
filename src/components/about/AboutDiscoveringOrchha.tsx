"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { Compass, MapPin, Clock, Train, Plane, Car, Sparkles, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutDiscoveringOrchha() {
  const [activeTab, setActiveTab] = useState<"attractions" | "transit">("attractions");

  const attractions = [
    {
      id: "chhatris",
      name: "The 14 Royal Chhatris (Cenotaphs)",
      distance: "200 m • Direct Riverbank View",
      time: "Directly opposite resort",
      bestTime: "Sunrise & Dusk",
      highlight:
        "17th–18th century memorials built on Kanchan Ghat. Their distinctive fusion of Rajput pavilions with Hindu temple shikharas reflects in the water directly before our resort lawns.",
      tag: "Kanchan Ghat Landmark",
    },
    {
      id: "jahangir",
      name: "Jahangir Mahal & Raja Mahal",
      distance: "1.5 km from Resort",
      time: "5 mins drive / 15 mins walk",
      bestTime: "Morning or Late Afternoon",
      highlight:
        "Commissioned by Maharaja Bir Singh Deo in the early 17th century to honor Mughal Emperor Jahangir. Features 236 chambers, stone balconies, and exquisite Bundeli frescoes of royal pageantry.",
      tag: "Imperial Fort Complex",
    },
    {
      id: "ramraja",
      name: "Ram Raja Temple & Chaturbhuj Temple",
      distance: "1.2 km from Resort",
      time: "4 mins drive",
      bestTime: "Evening Aarti (07:00 PM)",
      highlight:
        "The sacred heart of Orchha. Lord Rama is revered as a reigning King, receiving a ceremonial armed police guard of honour. Adjacent stands Chaturbhuj Temple, rising over 100 meters above the town.",
      tag: "Living Spiritual Heritage",
    },
    {
      id: "rafting",
      name: "Betwa River Rafting & Wildlife Sanctuary",
      distance: "500 m to Launch Point",
      time: "2 mins drive",
      bestTime: "07:30 AM – 11:00 AM",
      highlight:
        "Gentle Class I & II river rafting past granite boulders and ancient monuments. The adjacent sanctuary spans dense teak forests sheltering spotted deer, nilgai, langurs, and kingfishers.",
      tag: "Nature & Adventure",
    },
    {
      id: "laxminarayan",
      name: "Laxminarayan Temple",
      distance: "2.5 km from Resort",
      time: "7 mins drive",
      bestTime: "Morning Light",
      highlight:
        "A striking triangular synthesis of fort and temple architecture. Famous for its vibrant wall murals depicting episodes from the Ramayana, Mahabharata, and the 1857 war of independence.",
      tag: "Fresco Masterpiece",
    },
  ];

  const transitRoutes = [
    {
      mode: "Railway Station",
      icon: Train,
      hub: "Jhansi Junction (Virangana Lakshmibai - VGLJ)",
      distance: "18 km (~30–35 mins)",
      details:
        "Major railway junction on the North-Central line. Serviced by high-speed Shatabdi Express, Vande Bharat Express, and Rajdhani trains connecting New Delhi (4.5 hrs), Agra (2 hrs), and Bhopal (3 hrs).",
      advice: "Resort private pickup available 24/7 upon request.",
    },
    {
      mode: "Domestic Airport",
      icon: Plane,
      hub: "Gwalior Airport (GWL)",
      distance: "125 km (~2.5–3 hours)",
      details:
        "Direct flights to New Delhi, Mumbai, Bengaluru, and Hyderabad. Smooth 4-lane national highway (NH 44) connectivity directly to Jhansi and Orchha.",
      advice: "Chauffeured resort transfers easily arranged with our concierge.",
    },
    {
      mode: "Heritage Airport",
      icon: Plane,
      hub: "Khajuraho Airport (HJR)",
      distance: "170 km (~3.5 hours)",
      details:
        "Convenient connection for travelers pairing Orchha with the UNESCO World Heritage temples of Khajuraho via NH 39.",
      advice: "Ideal for the classic Agra–Gwalior–Orchha–Khajuraho heritage circuit.",
    },
    {
      mode: "Road & Highway",
      icon: Car,
      hub: "National Highway 44 & State Highway 37",
      distance: "Direct Highway Access",
      details:
        "Well-maintained tarmac roads leading directly to Kanchanghat. Secure on-site private valet parking and EV charging points available for personal vehicles.",
      advice: "Ample complimentary parking for guest vehicles and tourist coaches.",
    },
  ];

  return (
    <section id="heritage" className="py-20 sm:py-28 bg-brand-white text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <SubtitleTag>Destination Guide</SubtitleTag>
            <Heading as="h2" size="hero" className="mt-2 text-brand-navy">
              Discovering Orchha From Our Sanctuary
            </Heading>
            <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark mt-2">
              Centuries of art, architecture, and sacred folklore within moments
            </p>
            <Text variant="lead" className="mt-3 text-brand-charcoal/80">
              The Orchha Resort serves as your peaceful sanctuary base. Explore timeless palaces and temples by day, and return to quiet river breezes and lotus pool serenity by night.
            </Text>
          </div>

          {/* Toggle Tab */}
          <div className="flex items-center gap-2 p-1 bg-brand-canvas rounded-xl border border-brand-charcoal/10 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("attractions")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all",
                activeTab === "attractions"
                  ? "bg-brand-navy text-white shadow-subtle"
                  : "text-brand-charcoal/70 hover:text-brand-navy"
              )}
            >
              Key Heritage Sites
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("transit")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all",
                activeTab === "transit"
                  ? "bg-brand-navy text-white shadow-subtle"
                  : "text-brand-charcoal/70 hover:text-brand-navy"
              )}
            >
              Getting Here &amp; Transit
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === "attractions" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((site, idx) => (
              <FadeIn key={site.id} delay={idx * 0.08}>
                <div className="bg-brand-canvas rounded-2xl p-6 border border-brand-charcoal/10 shadow-subtle hover:shadow-hover hover:-translate-y-1.5 hover:scale-[1.012] hover:border-brand-gold/40 active:scale-[0.985] cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-brand-gold-dark px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30">
                        {site.tag}
                      </span>
                      <span className="text-xs text-brand-charcoal/60 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {site.time}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                      {site.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-sans text-brand-navy font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                      <span>{site.distance}</span>
                    </div>

                    <p className="text-sm text-brand-charcoal/80 leading-relaxed font-light">
                      {site.highlight}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-charcoal/8 flex items-center justify-between text-xs text-brand-charcoal/70">
                    <span className="italic">Recommended: {site.bestTime}</span>
                    <span className="font-semibold text-brand-gold-dark flex items-center gap-1">
                      Guided Tour Available
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transitRoutes.map((route, idx) => {
              const Icon = route.icon;
              return (
                <FadeIn key={route.hub} delay={idx * 0.1}>
                  <div className="bg-brand-canvas rounded-2xl p-6 sm:p-7 border border-brand-charcoal/10 shadow-subtle hover:shadow-hover hover:-translate-y-1.5 hover:scale-[1.012] hover:border-brand-gold/40 transition-all duration-300 ease-out space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-sans text-xs uppercase tracking-wider text-brand-gold-dark font-bold block">
                            {route.mode}
                          </span>
                          <span className="font-serif text-lg font-semibold text-brand-navy">
                            {route.hub}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-brand-gold/15 text-brand-navy border border-brand-gold/30">
                        {route.distance}
                      </span>
                    </div>

                    <p className="text-sm text-brand-charcoal/85 leading-relaxed font-light">
                      {route.details}
                    </p>

                    <div className="bg-white rounded-lg p-3 border border-brand-charcoal/8 text-xs text-brand-charcoal/80 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{route.advice}</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
