"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomDetails, RoomGalleryImage } from "@/types/room";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RESORT_ASSETS } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RoomCardPrimitive } from "@/components/rooms/RoomCardPrimitive";
import {
  Users,
  Maximize2,
  Bed,
  Sparkles,
  ShieldCheck,
  Check,
  Compass,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Phone,
  ChevronRight,
  ChevronLeft,
  Share2,
  X,
  Expand,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoomDetailViewProps {
  room: RoomDetails;
}

export function RoomDetailView({ room }: RoomDetailViewProps) {
  const asset = RESORT_ASSETS[room.imageKey] || RESORT_ASSETS.roomStandard;
  const galleryImages: RoomGalleryImage[] =
    room.gallery && room.gallery.length > 0
      ? room.gallery
      : [
          {
            src: asset.src,
            alt: asset.alt,
            caption: room.name,
          },
        ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];

  const otherRooms = VERIFIED_ROOMS.filter((r) => r.id !== room.id);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) =>
          prev > 0 ? prev - 1 : galleryImages.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) =>
          prev < galleryImages.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, galleryImages.length]);

  const whatsappMessage = encodeURIComponent(
    `Hello Orchha Resort, I am interested in reserving the ${room.name} (starting at ₹${room.startingPriceInr}/night). Could you please share availability?`
  );

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal">
      {/* 1. BREADCRUMBS & TOP NAV STRIP */}
      <div className="border-b border-brand-charcoal/10 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <Container>
          <div className="py-3 flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2 text-brand-olive">
              <Link href="/" className="hover:text-brand-gold-dark transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/rooms" className="hover:text-brand-gold-dark transition-colors">
                Accommodations
              </Link>
              <span>/</span>
              <span className="text-brand-charcoal font-medium">{room.name}</span>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 text-brand-navy hover:text-brand-gold-dark font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Accommodations</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* 2. HERO HEADER & TITLE */}
      <section className="pt-8 pb-6 bg-white border-b border-brand-charcoal/10">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {room.badge && (
                  <Badge variant="gold" size="sm">
                    {room.badge}
                  </Badge>
                )}
                <span className="text-xs font-sans text-brand-gold-dark font-semibold tracking-wider uppercase">
                  {room.views.join(" • ")}
                </span>
                {room.inventoryNote && (
                  <span className="text-xs font-sans text-brand-muted">
                    ({room.inventoryNote})
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-charcoal tracking-tight">
                {room.name}
              </h1>

              <p className="font-sans text-base sm:text-lg text-brand-olive leading-relaxed">
                {room.tagline}
              </p>
            </div>

            {/* Price Preview Card on Desktop */}
            <div className="lg:text-right shrink-0 bg-brand-canvas lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-0 border-brand-charcoal/10">
              <span className="block font-sans text-xs uppercase tracking-wider text-brand-muted">
                Nightly Tariff Starting From
              </span>
              <div className="flex items-baseline lg:justify-end gap-1.5 mt-1">
                <span className="font-sans text-3xl sm:text-4xl font-bold text-brand-navy">
                  ₹{room.startingPriceInr.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-sans text-brand-olive">+ taxes / night</span>
              </div>
              <span className="block text-[11px] font-sans text-emerald-700 mt-1">
                ✓ Best Rate Direct Guarantee • Complimentary Breakfast Included
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE MEDIA GALLERY */}
      <section className="py-8 bg-brand-stone/10 border-b border-brand-charcoal/10">
        <Container>
          <div className="space-y-4">
            {/* Main Featured Frame */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-floating bg-black/10 cursor-pointer"
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Fullscreen Expand Hint Badge */}
              <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-sans border border-white/20 transition-all tactile-3d shadow-md">
                <Expand className="w-3.5 h-3.5 text-brand-gold" />
                <span>Click to view fullscreen</span>
              </div>

              {/* Prev / Next Overlay Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : galleryImages.length - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold z-10"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev < galleryImages.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold z-10"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white flex items-end justify-between gap-4">
                <p className="font-sans text-xs sm:text-sm drop-shadow-md max-w-2xl">
                  {activeImage.caption}
                </p>
                <span className="font-mono text-xs bg-black/60 px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {galleryImages.length > 1 && (
              <div
                className={cn(
                  "grid gap-3 sm:gap-4",
                  galleryImages.length === 3 && "grid-cols-3",
                  galleryImages.length === 4 && "grid-cols-2 sm:grid-cols-4",
                  galleryImages.length >= 5 && "grid-cols-3 sm:grid-cols-5"
                )}
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold tactile-3d hover:-translate-y-0.5 active:scale-95",
                      activeImageIndex === idx
                        ? "border-brand-gold shadow-md scale-[1.02] ring-2 ring-brand-gold/40"
                        : "border-transparent opacity-70 hover:opacity-100 hover:shadow-subtle"
                    )}
                    aria-label={`View ${img.caption}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${room.name} Fullscreen Gallery`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white">
                {room.name}
              </span>
              <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-full text-brand-gold border border-white/10">
                {activeImageIndex + 1} / {galleryImages.length}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all tactile-3d hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Stage Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0 w-full max-w-7xl mx-auto">
            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Prev / Next Buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev > 0 ? prev - 1 : galleryImages.length - 1
                    )
                  }
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev < galleryImages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all tactile-3d hover:scale-105 active:scale-95 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption and Thumbnail Navigation */}
          <div className="w-full max-w-4xl mx-auto space-y-3 z-10">
            <p className="text-center font-sans text-xs sm:text-sm text-white/90">
              {activeImage.caption}
            </p>

            {galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all tactile-3d",
                      activeImageIndex === idx
                        ? "border-brand-gold ring-2 ring-brand-gold/50 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    aria-label={`Switch to ${img.caption}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. MAIN DETAILS & STICKY BOOKING GRID */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (8 cols): Description, Specs, Amenities, Architectural Highlights */}
            <div className="lg:col-span-8 space-y-12">
              {/* Key Quick Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-brand-charcoal/10 shadow-subtle overflow-hidden">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Maximize2 className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans uppercase text-brand-muted truncate">
                      Dimensions
                    </span>
                    <span className="font-sans text-sm font-semibold text-brand-charcoal truncate block">
                      {room.areaSqFt} sq ft
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Bed className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans uppercase text-brand-muted truncate">
                      Bedding
                    </span>
                    <span className="font-sans text-sm font-semibold text-brand-charcoal truncate block">
                      {room.bedType.split(" ")[0]} Bed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans uppercase text-brand-muted truncate">
                      Occupancy
                    </span>
                    <span className="font-sans text-sm font-semibold text-brand-charcoal truncate block">
                      Up to {room.maxOccupancy.adults} Guests
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans uppercase text-brand-muted truncate">
                      Perspective
                    </span>
                    <span className="font-sans text-sm font-semibold text-brand-charcoal truncate block">
                      {room.views[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Narrative Story */}
              <div className="space-y-4">
                <SubtitleTag>The Space & Atmosphere</SubtitleTag>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-normal">
                  Rooted in Bundelkhand royal heritage
                </h2>
                <p className="font-sans text-base text-brand-olive leading-relaxed">
                  {room.description}
                </p>
                <p className="font-sans text-base text-brand-olive leading-relaxed">
                  Every accommodation at The Orchha Resort is intentionally arranged to create a tranquil,
                  unhurried retreat. Located within a certified zero-pollution sanctuary along the sacred
                  River Betwa, guests awake to native birdsong and panoramic views of 16th-century Bundela
                  architecture.
                </p>
              </div>

              {/* Architectural Highlights */}
              {room.features && room.features.length > 0 && (
                <div className="space-y-4">
                  <SubtitleTag>Architectural Highlights</SubtitleTag>
                  <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-normal">
                    Craftsmanship & Thoughtful Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {room.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-charcoal/8 shadow-subtle"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-brand-gold-dark" />
                        </div>
                        <span className="font-sans text-xs sm:text-sm text-brand-charcoal/90 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Room Specifications Table */}
              {room.specs && room.specs.length > 0 && (
                <div className="space-y-4">
                  <SubtitleTag>Detailed Specifications</SubtitleTag>
                  <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-normal">
                    Room Parameters
                  </h3>
                  <div className="rounded-2xl border border-brand-charcoal/10 overflow-hidden bg-white shadow-subtle">
                    <dl className="divide-y divide-brand-charcoal/10">
                      {room.specs.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 hover:bg-brand-canvas/50 transition-colors"
                        >
                          <dt className="text-xs font-sans font-semibold text-brand-charcoal">
                            {item.label}
                          </dt>
                          <dd className="text-xs font-sans text-brand-olive sm:col-span-2">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {/* Room Amenities & Inclusions Matrix */}
              <div className="space-y-4">
                <SubtitleTag>Room Amenities & Inclusions</SubtitleTag>
                <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-normal">
                  Everything you need for a restorative stay
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {room.keyAmenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-brand-charcoal/8 text-xs font-sans text-brand-charcoal"
                    >
                      <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resort Privileges Included */}
              <div className="p-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 space-y-3">
                <div className="flex items-center gap-2 text-brand-gold-dark font-serif text-base font-semibold">
                  <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
                  <span>Complimentary Resort Privileges</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-brand-olive">
                  <li>• Access to signature Lotus-shaped swimming pool</li>
                  <li>• Daily morning heritage walking tour across from Chhatris</li>
                  <li>• 10% privilege discount on Kairali Ayurvedic Spa therapies</li>
                  <li>• Complimentary high-speed Wi-Fi throughout all rooms & grounds</li>
                  <li>• Safe private parking and driver resting facilities</li>
                </ul>
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Reservation Panel */}
            <aside className="lg:col-span-4 sticky top-20">
              <div className="bg-white border border-brand-charcoal/15 rounded-3xl p-6 sm:p-8 shadow-floating space-y-6">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-brand-muted block">
                    Reserve Direct
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-brand-navy">
                      ₹{room.startingPriceInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-sans text-brand-muted">/ night + taxes</span>
                  </div>
                  <span className="text-[11px] font-sans text-emerald-700 block mt-1">
                    ✓ Direct Booking Rate • Breakfast Included
                  </span>
                </div>

                <hr className="border-brand-charcoal/10" />

                {/* Reservation Action Buttons */}
                <div className="space-y-3">
                  <a
                    href="https://wa.me/919425141240?text=Hello%20Orchha%20Resort,%20I%20would%20like%20to%20reserve%20a%20stay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button variant="primary" size="lg" fullWidth withArrow>
                      Book This Accommodation
                    </Button>
                  </a>

                  <a
                    href={`https://wa.me/919425141240?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      className="border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Inquire via WhatsApp Desk</span>
                    </Button>
                  </a>
                </div>

                {/* Direct Phone Concierge Touchpoint */}
                <div className="pt-2 text-center text-xs font-sans text-brand-olive space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-brand-navy font-medium">
                    <Phone className="w-3.5 h-3.5 text-brand-gold-dark" />
                    <a href="tel:+919425141240" className="hover:underline">
                      +91 94251 41240
                    </a>
                    <span>•</span>
                    <a href="tel:+917680252222" className="hover:underline">
                      07680 252222
                    </a>
                  </div>
                  <span className="text-[11px] text-brand-muted block">
                    Direct Resort Reception Desk (24/7 Assistance)
                  </span>
                </div>

                {/* Reservation Guarantees */}
                <div className="pt-4 border-t border-brand-charcoal/10 space-y-2 text-[11px] font-sans text-brand-olive">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free cancellation up to 48 hours prior to arrival</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No hidden resort fees or service surcharges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant direct booking confirmation via SMS/Email</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* 5. OTHER ACCOMMODATIONS CAROUSEL / EXPLORATION */}
      <section className="py-16 bg-white border-t border-brand-charcoal/10">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <SubtitleTag>Explore Other Stays</SubtitleTag>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal">
              More sanctuaries across the resort
            </h2>
            <p className="font-sans text-sm text-brand-olive max-w-xl mx-auto">
              Refined Bundelkhandi comfort, handcrafted marble details, and serene garden views beside the Betwa River.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {otherRooms.map((other) => (
              <RoomCardPrimitive key={other.id} room={other} />
            ))}
          </div>

          <div className="text-center pt-10">
            <Link href="/rooms">
              <Button variant="outline" size="pill">
                View All Accommodations
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
