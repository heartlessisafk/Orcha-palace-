import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { VERIFIED_ROOMS } from "@/data/rooms";
import { RoomDetailView } from "@/components/rooms/RoomDetailView";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { SITE_CONFIG } from "@/lib/site-config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return VERIFIED_ROOMS.map((room) => ({
    slug: room.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = VERIFIED_ROOMS.find((r) => r.id === slug);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: `${room.name} — Luxury Stay in Orchha`,
    description: `${room.description.slice(0, 155)}... Starting at ₹${room.startingPriceInr}/night. Book direct for best rates at ${SITE_CONFIG.name}.`,
    openGraph: {
      title: `${room.name} | ${SITE_CONFIG.name}`,
      description: room.tagline,
      images: room.gallery && room.gallery.length > 0 ? [room.gallery[0].src] : [],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = VERIFIED_ROOMS.find((r) => r.id === slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <NavbarPrimitive />
      <main id="main-content" className="pt-20">
        <RoomDetailView room={room} />
      </main>
      <FooterPrimitive />
    </>
  );
}
