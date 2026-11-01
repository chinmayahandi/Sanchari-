"use client";

import React from "react";
import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export interface MobileStickyBookingBarProps {
  price: number;
  unitLabel: string; // e.g. "/ night", "/ day", "/ person"
  onBookClick: () => void;
  subtitle?: string;
  ctaText?: string;
}

export function MobileStickyBookingBar({
  price,
  unitLabel,
  onBookClick,
  subtitle = "Check demo availability",
  ctaText = "Enquire Now",
}: MobileStickyBookingBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Rate Summary */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-navy leading-none">
              {formatCurrency(price)}
            </span>
            <span className="text-xs text-surface-muted truncate">{unitLabel}</span>
          </div>
          <span className="text-[11px] text-forest font-semibold block truncate mt-0.5">
            {subtitle}
          </span>
        </div>

        {/* CTA Button */}
        <Button
          variant="forest"
          size="md"
          onClick={onBookClick}
          className="shrink-0 shadow-sm font-bold"
          leftIcon={<Calendar className="w-3.5 h-3.5 text-sunshine" />}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
