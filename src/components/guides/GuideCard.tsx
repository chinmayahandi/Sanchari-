"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Languages, Award, ArrowRight, MessageSquare } from "lucide-react";
import { Guide } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { formatCurrency } from "@/lib/utils";

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 p-5 flex flex-col justify-between h-full">
        <div>
          {/* Header Row */}
          <div className="flex items-start gap-3.5 mb-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-navy-100 shrink-0 border border-surface-border">
              <Image
                src={guide.avatar}
                alt={guide.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-teal font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{guide.location}</span>
              </div>
              <h3 className="text-base font-bold text-navy group-hover:text-teal transition-colors truncate">
                <Link href={`/guides/${guide.slug}`}>{guide.name}</Link>
              </h3>
              <p className="text-[11px] text-surface-muted flex items-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-orange" />
                <span>{guide.yearsExperience} Years Local Guide</span>
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-3">
            <div className="flex items-center gap-1 text-[11px] text-surface-muted mb-1.5 font-medium">
              <Languages className="w-3 h-3 text-teal" />
              <span>Languages spoken:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {guide.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-navy-50 text-navy font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Bio snippet */}
          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-3 mb-4">
            {guide.bio}
          </p>

          {/* Expertise pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.expertise.slice(0, 2).map((exp) => (
              <span
                key={exp}
                className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-medium"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-surface-border flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-surface-muted block">Indicative Day Rate</span>
            <span className="text-sm font-bold text-navy">
              {formatCurrency(guide.indicativeDayRate)}
              <span className="text-[10px] font-normal text-surface-muted ml-0.5">(demo)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/guides/${guide.slug}`}
              className="text-xs font-semibold text-teal hover:underline px-1"
            >
              Profile
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<MessageSquare className="w-3.5 h-3.5 text-teal" />}
            >
              Enquire
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="guide"
        serviceId={guide.id}
        serviceTitle={`Guide Service with ${guide.name}`}
        destinationName={guide.location}
        basePrice={guide.indicativeDayRate}
        priceUnitLabel="per day"
        maxCapacity={10}
      />
    </>
  );
}
