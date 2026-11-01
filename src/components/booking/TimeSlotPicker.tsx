"use client";

import React from "react";
import { Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

export interface TimeSlot {
  id: string;
  timeRange: string;
  slotTitle: string;
  duration: string;
  rate?: number;
  isAvailable: boolean;
  remainingCapacity?: number;
}

export interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
  selectedDateText?: string;
  className?: string;
}

export function TimeSlotPicker({
  slots,
  selectedSlotId,
  onSelectSlot,
  selectedDateText,
  className,
}: TimeSlotPickerProps) {
  if (!slots || slots.length === 0) {
    return (
      <div className={cn("p-6 rounded-2xl bg-surface-light border border-dashed border-surface-border text-center space-y-2", className)}>
        <Calendar className="w-8 h-8 text-surface-muted mx-auto" />
        <h4 className="text-xs font-bold text-navy">No Time Slots Scheduled</h4>
        <p className="text-[11px] text-surface-muted max-w-xs mx-auto leading-relaxed">
          There are no demonstration time slots configured for {selectedDateText || "this selection"}. Please choose an alternate date.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold text-navy uppercase tracking-wider">
          Available Time Slots
        </label>
        <span className="text-[10px] text-surface-muted">
          Sample schedules
        </span>
      </div>

      <div className="space-y-2">
        {slots.map((slot) => {
          const isSelected = selectedSlotId === slot.id;
          return (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.isAvailable}
              onClick={() => onSelectSlot(slot)}
              className={cn(
                "w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs",
                !slot.isAvailable
                  ? "bg-surface-light border-surface-border/60 opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "bg-forest-50 border-forest text-navy ring-1 ring-forest shadow-sm"
                  : "bg-white border-surface-border hover:border-forest/50 hover:bg-surface-light/40"
              )}
              aria-pressed={isSelected}
            >
              <div className="min-w-0 flex items-start gap-2.5">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors",
                    isSelected
                      ? "border-forest bg-forest text-white"
                      : "border-surface-border bg-white"
                  )}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5 truncate">
                  <span className="font-bold text-navy block truncate">
                    {slot.slotTitle}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-surface-muted">
                    <span className="flex items-center gap-1 font-semibold text-forest">
                      <Clock className="w-3 h-3" />
                      {slot.timeRange}
                    </span>
                    <span>&bull;</span>
                    <span>{slot.duration}</span>
                    {slot.remainingCapacity !== undefined && (
                      <>
                        <span>&bull;</span>
                        <span>{slot.remainingCapacity} spots left</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {slot.rate !== undefined && (
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-navy text-xs block">
                    {formatCurrency(slot.rate)}
                  </span>
                  <span className="text-[10px] text-surface-muted">demo fee</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
