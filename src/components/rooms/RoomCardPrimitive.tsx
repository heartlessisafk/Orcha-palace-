"use client";

import React from "react";
import Image from "next/image";
import { RoomDetails } from "@/types/room";
import { RESORT_ASSETS } from "@/lib/assets";
import { HoverZoom } from "@/components/motion/HoverZoom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, Maximize2, Bed, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoomCardPrimitiveProps {
  room: RoomDetails;
  onEnquire?: (room: RoomDetails) => void;
  className?: string;
}

export function RoomCardPrimitive({ room, onEnquire, className }: RoomCardPrimitiveProps) {
  const asset = RESORT_ASSETS[room.imageKey] || RESORT_ASSETS.roomStandard;

  return (
    <div
      className={cn(
        "group flex flex-col rounded-luxury bg-white border border-brand-charcoal/10 overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300 ease-out",
        className
      )}
    >
      {/* Media Frame with Hover Zoom */}
      <div className="relative">
        <HoverZoom aspectRatio="4:3">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </HoverZoom>

        {/* Category / Setting Badge */}
        {room.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <Badge variant="gold" size="sm" className="shadow-subtle">
              {room.badge}
            </Badge>
          </div>
        )}

        {/* Staging Disclaimer Tag if using placeholder */}
        {asset.isStagingPlaceholder && (
          <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white/80 font-sans">
            Staging Composition
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-4 mb-2.5">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-brand-gold">
              {room.views[0]}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-charcoal leading-tight">
              {room.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="block font-sans text-[10px] uppercase tracking-wider text-brand-muted">
              From
            </span>
            <span className="font-sans text-xl font-bold text-brand-navy">
              ₹{room.startingPriceInr.toLocaleString("en-IN")}
            </span>
            <span className="block font-sans text-[10px] text-brand-muted">/ night</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-sm text-brand-olive leading-relaxed mb-5 line-clamp-2">
          {room.description}
        </p>

        {/* Quick Specifications Strip */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-charcoal/8 text-xs text-brand-olive mb-6">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>{room.areaSqFt} sq ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="truncate">{room.bedType.split(" ")[0]} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>Up to {room.maxOccupancy.adults} guests</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <Button
            variant="primary"
            size="md"
            fullWidth
            withArrow
            onClick={() => onEnquire?.(room)}
          >
            Reserve or Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
