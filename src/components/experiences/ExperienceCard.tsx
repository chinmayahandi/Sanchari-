"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { Experience } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { formatCurrency } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          <Image
            src={experience.heroImage}
            alt={experience.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-black/20" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="orange" size="sm" className="bg-orange text-white border-0 font-medium text-[11px]">
              {experience.category}
            </Badge>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-navy shadow-sm backdrop-blur-sm">
              {formatCurrency(experience.indicativePricePerPerson)}
              <span className="text-[10px] font-normal text-surface-muted ml-1">
                / person (demo)
              </span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-teal font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{experience.destinationName}, {experience.district}</span>
            </div>

            <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors tracking-tight mb-2 line-clamp-1">
              <Link href={`/experiences/${experience.slug}`}>
                {experience.title}
              </Link>
            </h3>

            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-2 mb-4">
              {experience.overview}
            </p>

            {/* Quick Specs */}
            <div className="flex items-center gap-4 text-xs text-surface-muted mb-4 pb-3 border-b border-surface-border">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-navy-600" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-navy-600" />
                <span>Max {experience.maxGroupSize}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              href={`/experiences/${experience.slug}`}
              className="text-xs font-bold text-teal hover:underline inline-flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-orange" />}
            >
              Book Demo
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="experience"
        serviceId={experience.id}
        serviceTitle={experience.title}
        destinationName={experience.destinationName}
        basePrice={experience.indicativePricePerPerson}
        priceUnitLabel="per person"
        maxCapacity={experience.maxGroupSize}
      />
    </>
  );
}
