"use client";

import React from "react";
import { formatCurrency, cn } from "@/lib/utils";
import { Info, Sparkles } from "lucide-react";

export interface PriceLineItem {
  label: string;
  amount: number;
  isBold?: boolean;
  subtext?: string;
}

export interface PriceBreakdownProps {
  items: PriceLineItem[];
  total: number;
  totalLabel?: string;
  demoNotice?: string;
  className?: string;
}

export function PriceBreakdown({
  items,
  total,
  totalLabel = "Estimated Total",
  demoNotice = "Demonstration estimate. Final taxes & charges calculated upon official booking engine connection.",
  className,
}: PriceBreakdownProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-surface-light border border-surface-border space-y-2.5 text-xs select-none",
        className
      )}
    >
      <div className="flex items-center justify-between pb-1 border-b border-surface-border/60">
        <span className="font-bold text-navy text-[11px] uppercase tracking-wider">
          Price Calculation
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Demo Rates</span>
        </span>
      </div>

      {/* Individual Line Items */}
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-baseline text-surface-muted">
            <div>
              <span className={item.isBold ? "font-semibold text-navy" : ""}>
                {item.label}
              </span>
              {item.subtext && (
                <span className="text-[10px] text-surface-muted block">{item.subtext}</span>
              )}
            </div>
            <span className={cn("font-medium", item.isBold ? "font-bold text-navy" : "text-navy")}>
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Row */}
      <div className="flex justify-between items-baseline font-bold text-navy border-t border-surface-border pt-2 text-sm">
        <span>{totalLabel}:</span>
        <span className="text-forest text-base sm:text-lg font-black">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Demo Notice */}
      {demoNotice && (
        <p className="text-[10px] text-surface-muted leading-tight pt-1 flex items-start gap-1">
          <Info className="w-3 h-3 text-teal shrink-0 mt-0.5" />
          <span>{demoNotice}</span>
        </p>
      )}
    </div>
  );
}
