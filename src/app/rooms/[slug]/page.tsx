import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RoomDetailView } from "@/components/rooms/RoomDetailView";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { SITE_CONFIG } from "@/lib/site-config";
import { getRoomSchema, getBreadcrumbSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const LEGACY_SLUG_MAP: Record<string, string> = {
  "standard-room": "standard-bed",
  "deluxe-room": "deluxe-marble-bed",
};

export async function generateStaticParams() {
  return [
    ...VERIFIED_ROOMS.map((room) => ({
      slug: room.id,
    })),
    { slug: "standard-room" },
    { slug: "deluxe-room" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedId = LEGACY_SLUG_MAP[slug] || slug;
  const room = VERIFIED_ROOMS.find((r) => r.id === resolvedId);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  const roomImage =
    room.gallery && room.gallery.length > 0 ? [room.gallery[0].src] : [];

  return {
    title: `${room.name} — Luxury Stay in Orchha`,
    description: `${room.description.slice(0, 155)}... Starting at ₹${room.startingPriceInr}/night. Book direct for best rates at ${SITE_CONFIG.name}.`,
    alternates: {
      canonical: `https://www.orchharesort.com/rooms/${room.id}`,
    },
    openGraph: {
      title: `${room.name} | ${SITE_CONFIG.name}`,
      description: room.tagline,
      url: `https://www.orchharesort.com/rooms/${room.id}`,
      images: roomImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.name} — Luxury Stay in Orchha`,
      description: room.tagline,
      images: roomImage,
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resolvedId = LEGACY_SLUG_MAP[slug] || slug;
  const room = VERIFIED_ROOMS.find((r) => r.id === resolvedId);

  if (!room) {
    notFound();
  }

  const roomJsonLd = getRoomSchema(room);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/rooms" },
    { name: room.name, path: `/rooms/${room.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NavbarPrimitive />
      <main id="main-content" className="pt-20">
        <RoomDetailView room={room} />
      </main>
      <FooterPrimitive />
    </>
  );
}
