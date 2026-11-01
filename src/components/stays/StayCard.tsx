"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Home, ArrowRight, Calendar } from "lucide-react";
import { Stay } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { formatCurrency } from "@/lib/utils";

interface StayCardProps {
  stay: Stay;
}

export function StayCard({ stay }: StayCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          <Image
            src={stay.heroImage}
            alt={stay.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-black/20" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="teal" size="sm" className="bg-teal text-white border-0 font-medium text-[11px]">
              {stay.type}
            </Badge>
          </div>

          {/* Demo Pricing Badge */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-navy shadow-sm backdrop-blur-sm">
              {formatCurrency(stay.indicativePricePerNight)}
              <span className="text-[10px] font-normal text-surface-muted ml-1">
                / night (demo)
              </span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-teal font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{stay.destinationName}, {stay.district}</span>
            </div>

            <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors tracking-tight mb-2">
              <Link href={`/stays/${stay.slug}`}>{stay.name}</Link>
            </h3>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-2 mb-4">
              {stay.description}
            </p>

            {/* Quick Specs */}
            <div className="flex items-center gap-3 text-xs text-surface-muted mb-4 pb-3 border-b border-surface-border">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-navy-600" />
                <span>Up to {stay.maxGuests} Guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-navy-600" />
                <span>{stay.bedrooms} {stay.bedrooms === 1 ? "Room" : "Rooms"}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              href={`/stays/${stay.slug}`}
              className="text-xs font-bold text-teal hover:underline inline-flex items-center gap-1"
            >
              <span>View Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Calendar className="w-3.5 h-3.5 text-teal" />}
            >
              Enquire
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="stay"
        serviceId={stay.id}
        serviceTitle={stay.name}
        destinationName={stay.destinationName}
        basePrice={stay.indicativePricePerNight}
        priceUnitLabel="per night"
        maxCapacity={stay.maxGuests}
      />
    </>
  );
}
