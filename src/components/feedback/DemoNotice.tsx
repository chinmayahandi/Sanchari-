import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoNoticeProps {
  className?: string;
  compact?: boolean;
  message?: string;
}

export function DemoNotice({
  className,
  compact = false,
  message = "Frontend Demonstration: Rates, listings, and availability represent curated sample data. No real bookings or payment processing are active.",
}: DemoNoticeProps) {
  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80",
          className
        )}
      >
        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Demonstration Data</span>
      </span>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 sm:p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3",
        className
      )}
    >
      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="font-semibold block sm:inline mr-1 text-amber-900">
          Demonstration Mode:
        </strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
