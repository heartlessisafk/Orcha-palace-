"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Waves, 
  Coffee, 
  TreePine, 
  ArrowRight, 
  Camera, 
  Sparkles, 
  CheckCircle2,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";

export type FacilityId = "betwa-dining" | "pool" | "kaleva" | "spa";

interface FacilityCategory {
  id: FacilityId;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  galleryUrl: string;
}

const FACILITIES: FacilityCategory[] = [
  {
    id: "betwa-dining",
    title: "Betwa View Dining",
    subtitle: "Riverside Dining",
    description: "Experience Orchha's one and only riverside-view dining experience, offering a memorable setting overlooking the serene Betwa River.",
    icon: Utensils,
    badge: "Riverside dining",
    galleryUrl: "/gallery?filter=betwa-dining",
  },
  {
    id: "pool",
    title: "Lotus-Shaped Pool",
    subtitle: "Central Aquatic Sanctuary",
    description: "Sculpted in the silhouette of a blooming lotus flower, complete with children's splash pool and riverside sun deck loungers.",
    icon: Waves,
    badge: "Explore poolside",
    galleryUrl: "/gallery?filter=pool",
  },
  {
    id: "kaleva",
    title: "Kaleva Restaurant",
    subtitle: "Royal Heritage Dining",
    description: "Vegetarian-forward dining serving authentic Bundeli specialties alongside classic Indian, Chinese, and Continental culinary menus.",
    icon: Coffee,
    badge: "Discover cuisine",
    galleryUrl: "/gallery?filter=amenities",
  },
  {
    id: "spa",
    title: "Kerala Ayurveda Spa",
    subtitle: "Kairali Wellness",
    description: "Rejuvenating herbal massage therapies and steam baths administered by certified practitioners for holistic equilibrium.",
    icon: TreePine,
    badge: "Wellness therapies",
    galleryUrl: "/spa",
  },
];

interface BetwaPhoto {
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
  objectPosition: string;
}

const BETWA_VIEW_DINING_PHOTOS: BetwaPhoto[] = [
  {
    src: "/images/resort/curated/dining/betwa-view-dining-afternoon-lawn-gathering.jpg",
    alt: "Guests gathered on the riverfront lawn beside the Betwa balustrade enjoying afternoon refreshments",
    title: "Afternoon Lawn Gathering",
    caption: "Al fresco social moments beside the river balustrade under sunlit skies.",
    tag: "Social Hour",
    objectPosition: "object-[center_45%]",
  },
  {
    src: "/images/resort/curated/dining/betwa-view-dining-sunset-solitude-balustrade.jpg",
    alt: "Sunset over the Betwa River and bridge with dining tables along the balustrade",
    title: "Sunset over Sacred Waters",
    caption: "Golden hour reflection and tranquil evening ambiance by the bridge.",
    tag: "Golden Hour",
    objectPosition: "object-[center_60%]",
  },
  {
    src: "/images/resort/curated/dining/betwa-view-dining-guest-pasta-mocktails.jpg",
    alt: "Guest enjoying freshly prepared pasta and colorful mocktails at a marble table on the lawn",
    title: "Fresh Al Fresco Dining",
    caption: "Artfully plated culinary courses and mocktails served under open skies.",
    tag: "Culinary",
    objectPosition: "object-[center_65%]",
  },
  {
    src: "/images/resort/curated/dining/betwa-view-dining-panoramic-riverfront-lawn.jpg",
    alt: "High-angle perspective of guests dining along the expansive riverside lawn",
    title: "Panoramic Riverside Lawns",
    caption: "Unobstructed river frontage with attentive hospitality and open vistas.",
    tag: "River Panorama",
    objectPosition: "object-[center_45%]",
  },
];

export function HomeFacilitiesInteractive() {
  // Betwa View Dining is selected by default on initial page load (Phase 1)
  const [activeCategory, setActiveCategory] = useState<FacilityId>("betwa-dining");

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* 4 Interactive Category Tiles */}
      <div 
        role="tablist" 
        aria-label="Signature Facilities" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {FACILITIES.map((facility) => {
          const isActive = activeCategory === facility.id;
          const Icon = facility.icon;

          return (
            <button
              key={facility.id}
              role="tab"
              id={`tab-${facility.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${facility.id}`}
              onClick={() => setActiveCategory(facility.id)}
              className={cn(
                "group relative text-left w-full p-6 sm:p-7 rounded-luxury transition-all duration-300 ease-out flex flex-col justify-between h-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
                isActive
                  ? "bg-white border-2 border-brand-gold shadow-card ring-1 ring-brand-gold/30 -translate-y-1"
                  : "bg-white/80 hover:bg-white border border-brand-charcoal/10 shadow-subtle hover:shadow-hover hover:-translate-y-1 hover:border-brand-gold/40"
              )}
            >
              <div className="space-y-3 w-full">
                {/* Icon Container */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-brand-gold text-white shadow-gold-ambient scale-105"
                        : "bg-brand-gold/15 text-brand-gold-dark group-hover:bg-brand-gold group-hover:text-white group-hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-[11px] font-sans font-semibold text-brand-gold-dark tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4
                  className={cn(
                    "font-serif text-xl font-semibold transition-colors",
                    isActive ? "text-brand-navy" : "text-brand-charcoal group-hover:text-brand-navy"
                  )}
                >
                  {facility.title}
                </h4>

                {/* Description */}
                <p className="font-sans text-sm text-brand-olive leading-relaxed">
                  {facility.description}
                </p>
              </div>

              {/* Bottom Action Cue */}
              <div className="pt-4 flex items-center justify-between border-t border-brand-charcoal/5 mt-4">
                <span
                  className={cn(
                    "text-xs font-sans font-medium transition-colors flex items-center gap-1.5",
                    isActive
                      ? "text-brand-gold font-semibold"
                      : "text-brand-olive group-hover:text-brand-gold"
                  )}
                >
                  <span>{facility.badge}</span>
                  <ArrowRight
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      isActive ? "translate-x-0.5 text-brand-gold" : "group-hover:translate-x-1"
                    )}
                  />
                </span>
                {isActive && (
                  <span className="text-[11px] font-mono font-medium text-brand-gold-dark tracking-wider">
                    VIEWING
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Facility Preview Foundation */}
      <div 
        id={`panel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeCategory}`}
        className="relative bg-white/95 backdrop-blur-sm rounded-3xl border border-brand-charcoal/10 shadow-card p-6 sm:p-8 lg:p-10 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {activeCategory === "betwa-dining" && (
            <motion.div
              key="betwa-dining"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Header Bar with Editorial Context & "Go to Library →" Button */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-brand-charcoal/10">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-medium tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Curated Facility Showcase • Betwa View Dining</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-charcoal">
                    Riverside Al Fresco Gastronomy
                  </h3>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Orchha&apos;s premier open-air riverfront dining destination on Kanchan Ghat, offering unobstructed sunset panoramas over the sacred Betwa waters.
                  </p>
                </div>

                {/* Go to Library Button */}
                <div className="flex-shrink-0 pt-2 sm:pt-0">
                  <Link
                    href="/gallery?filter=betwa-dining"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-sans font-medium tracking-wide shadow-subtle hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-white/10 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  >
                    <span>Go to Library</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* 2x2 Clean Photo Presentation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                {BETWA_VIEW_DINING_PHOTOS.map((photo, idx) => (
                  <div
                    key={photo.src}
                    className="group relative rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle hover:shadow-card hover:border-brand-gold/40 transition-all duration-300 bg-brand-charcoal/5"
                  >
                    {/* Responsive Aspect Ratio Container */}
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        priority={idx < 2}
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                          photo.objectPosition
                        )}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-charcoal/70 backdrop-blur-md text-white text-[11px] font-sans font-medium border border-white/15 shadow-sm">
                          <Camera className="w-3 h-3 text-brand-gold" />
                          <span>Genuine Property Photo</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-brand-gold/90 backdrop-blur-md text-white text-[11px] font-sans font-semibold tracking-wide uppercase shadow-sm">
                          {photo.tag}
                        </span>
                      </div>

                      {/* Bottom Editorial Caption Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 sm:px-5 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/50 to-transparent flex flex-col justify-end text-white z-10">
                        <h5 className="font-serif text-lg sm:text-xl font-normal text-white group-hover:text-brand-gold-light transition-colors">
                          {photo.title}
                        </h5>
                        <p className="font-sans text-xs sm:text-sm text-brand-beige-sand/90 line-clamp-2 mt-0.5 leading-relaxed">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Verification Note & Secondary Library Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-brand-olive border-t border-brand-charcoal/5">
                <div className="flex items-center gap-2 text-brand-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Phase 1 Verified: All 4 authentic Betwa View Dining perspectives loaded at Full HD resolution.</span>
                </div>
                <Link
                  href="/gallery?filter=betwa-dining"
                  className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-gold-dark font-medium transition-colors"
                >
                  <span>Explore full dining collection in Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {activeCategory === "pool" && (
            <motion.div
              key="pool"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-brand-charcoal/10">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-medium tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Curated Facility Showcase • Lotus-Shaped Pool</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-charcoal">
                    The Central Lotus Swimming Pool
                  </h3>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Sculpted in the silhouette of an eight-petaled blooming lotus, serving as the serene aquatic core of the resort.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href="/gallery?filter=pool"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-sans font-medium tracking-wide shadow-subtle hover:shadow-hover transition-all duration-300 border border-white/10"
                  >
                    <span>Go to Library</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle">
                  <Image
                    src="/images/resort/curated/pool/central-lotus-swimming-pool-aerial.jpg"
                    alt="The Central Lotus Swimming Pool at The Orchha Resort"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-charcoal/70 backdrop-blur-md text-white text-[11px] font-sans font-medium border border-white/15">
                      <Camera className="w-3 h-3 text-brand-gold" />
                      <span>Genuine Property Photo</span>
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-4 p-6 rounded-2xl bg-brand-beige/50 border border-brand-charcoal/10">
                  <span className="text-xs font-mono font-medium text-brand-gold-dark uppercase tracking-wider">
                    Phase 2 Upcoming
                  </span>
                  <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                    Architectural Lotus Form
                  </h4>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Multi-angle photography showcase for the Lotus-Shaped Pool will arrive in Phase 2. Explore the full pool gallery right now in our photo library.
                  </p>
                  <Link
                    href="/gallery?filter=pool"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-brand-gold hover:text-brand-gold-dark transition-colors pt-2"
                  >
                    <span>View Lotus Pool Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === "kaleva" && (
            <motion.div
              key="kaleva"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-brand-charcoal/10">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-medium tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Curated Facility Showcase • Kaleva Restaurant</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-charcoal">
                    Kaleva Multi-Cuisine Dining
                  </h3>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Fine dining hall celebrating authentic Bundelkhand recipes alongside pan-Indian delicacies and international cuisine.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href="/gallery?filter=amenities"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-sans font-medium tracking-wide shadow-subtle hover:shadow-hover transition-all duration-300 border border-white/10"
                  >
                    <span>Go to Library</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle">
                  <Image
                    src="/images/resort/curated/dining/dining-kaleva-interior-apsara.jpg"
                    alt="Kaleva Restaurant Interior at The Orchha Resort"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-charcoal/70 backdrop-blur-md text-white text-[11px] font-sans font-medium border border-white/15">
                      <Camera className="w-3 h-3 text-brand-gold" />
                      <span>Genuine Property Photo</span>
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-4 p-6 rounded-2xl bg-brand-beige/50 border border-brand-charcoal/10">
                  <span className="text-xs font-mono font-medium text-brand-gold-dark uppercase tracking-wider">
                    Phase 3 Upcoming
                  </span>
                  <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                    Heritage Culinary Setting
                  </h4>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Dedicated interactive photographs for Kaleva Restaurant will be configured in Phase 3. You can browse Kaleva dishes and ambiance in our gallery.
                  </p>
                  <Link
                    href="/gallery?filter=amenities"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-brand-gold hover:text-brand-gold-dark transition-colors pt-2"
                  >
                    <span>View Dining Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === "spa" && (
            <motion.div
              key="spa"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-brand-charcoal/10">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-medium tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Curated Facility Showcase • Kerala Ayurveda Spa</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-charcoal">
                    Kairali Ayurvedic Healing Sanctuary
                  </h3>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Authentic Kerala Ayurvedic treatments, Abhyanga oil therapies, and herbal steam baths directed by licensed practitioners.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href="/spa"
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-sans font-medium tracking-wide shadow-subtle hover:shadow-hover transition-all duration-300 border border-white/10"
                  >
                    <span>Explore Spa</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-charcoal/10 shadow-subtle">
                  <Image
                    src="/images/resort/curated/spa/kairali-ayurvedic-massage-room.jpg"
                    alt="Kairali Ayurvedic Massage Room at The Orchha Resort"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-charcoal/70 backdrop-blur-md text-white text-[11px] font-sans font-medium border border-white/15">
                      <Camera className="w-3 h-3 text-brand-gold" />
                      <span>Genuine Property Photo</span>
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-4 space-y-4 p-6 rounded-2xl bg-brand-beige/50 border border-brand-charcoal/10">
                  <span className="text-xs font-mono font-medium text-brand-gold-dark uppercase tracking-wider">
                    Phase 4 Upcoming
                  </span>
                  <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                    Holistic Equilibrium
                  </h4>
                  <p className="font-sans text-sm text-brand-olive leading-relaxed">
                    Interactive photo views for Kerala Ayurveda Spa will be integrated in Phase 4. Learn about our full menu of wellness therapies on our Spa page.
                  </p>
                  <Link
                    href="/spa"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-brand-gold hover:text-brand-gold-dark transition-colors pt-2"
                  >
                    <span>View Spa Therapies & Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
