"use client";

import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export interface AvailabilitySlot {
  timeOfDay: string;
  slotName: string;
  duration: string;
  rate: number;
  available: boolean;
}

export interface AvailabilityCalendarProps {
  guideName: string;
  dayRate: number;
  onSelectSlot: (slot: { date: string; slotName: string; rate: number }) => void;
}

export function AvailabilityCalendar({
  guideName,
  dayRate,
  onSelectSlot,
}: AvailabilityCalendarProps) {
  // Pre-generate the upcoming 7 days starting today
  const today = new Date();
  const daysList = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      dateString: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString("en-US", { month: "short" }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(0);

  const selectedDay = daysList[selectedDateIndex];

  // Daily typical tour sessions
  const slots: AvailabilitySlot[] = [
    {
      timeOfDay: "07:00 AM - 10:30 AM",
      slotName: "Morning Heritage & Temple Circuit",
      duration: "3.5 hrs",
      rate: Math.round(dayRate * 0.55),
      available: true,
    },
    {
      timeOfDay: "03:30 PM - 06:45 PM",
      slotName: "Sunset Archaeology & Storytelling Walk",
      duration: "3.25 hrs",
      rate: Math.round(dayRate * 0.55),
      available: selectedDay.isWeekend ? true : selectedDateIndex % 2 === 0,
    },
    {
      timeOfDay: "08:30 AM - 05:00 PM",
      slotName: "Full-Day Comprehensive Expedition",
      duration: "8 hrs (incl. lunch break)",
      rate: dayRate,
      available: selectedDateIndex !== 2, // simulated slot state
    },
  ];

  const handleContinue = () => {
    const chosenSlot = selectedSlotIndex !== null ? slots[selectedSlotIndex] : slots[0];
    onSelectSlot({
      date: selectedDay.dateString,
      slotName: chosenSlot.slotName,
      rate: chosenSlot.rate,
    });
  };

  return (
    <div className="rounded-2xl bg-white border border-surface-border p-5 sm:p-6 shadow-card space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-forest uppercase tracking-wider block">
            Schedule & Availability Preview
          </span>
          <h3 className="text-base font-bold text-navy mt-0.5">
            Book Guided Time with {guideName}
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Live Preview
        </span>
      </div>

      {/* Date Picker Carousel */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-surface-muted block">
          Select Tour Date:
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {daysList.map((d, idx) => {
            const isSelected = selectedDateIndex === idx;
            return (
              <button
                key={d.dateString}
                type="button"
                onClick={() => {
                  setSelectedDateIndex(idx);
                  setSelectedSlotIndex(0);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "bg-forest text-white border-forest shadow-md scale-105"
                    : "bg-surface-light border-surface-border text-charcoal hover:border-forest/50 hover:bg-white"
                }`}
              >
                <span
                  className={`text-[10px] font-bold uppercase block ${
                    isSelected ? "text-forest-100" : "text-surface-muted"
                  }`}
                >
                  {d.dayName}
                </span>
                <span className="text-base font-extrabold block my-0.5">{d.dayNumber}</span>
                <span
                  className={`text-[9px] block ${
                    isSelected ? "text-forest-200" : "text-surface-muted"
                  }`}
                >
                  {d.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots for Selected Date */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-surface-muted block">
          Available Sessions for {selectedDay.dayName}, {selectedDay.monthName} {selectedDay.dayNumber}:
        </label>
        <div className="space-y-2">
          {slots.map((slot, idx) => {
            const isSelected = selectedSlotIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => slot.available && setSelectedSlotIndex(idx)}
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                  !slot.available
                    ? "opacity-50 bg-slate-50 border-dashed border-slate-200 cursor-not-allowed"
                    : isSelected
                    ? "bg-forest-50/70 border-forest text-navy shadow-sm ring-1 ring-forest"
                    : "bg-white border-surface-border hover:border-forest/40"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-navy">{slot.slotName}</span>
                    {!slot.available && (
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.2 rounded">
                        Booked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-surface-muted">
                    <Clock className="w-3 h-3 text-forest" />
                    <span>{slot.timeOfDay}</span>
                    <span>&bull;</span>
                    <span>{slot.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-surface-border">
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-extrabold text-navy">
                      {formatCurrency(slot.rate)}
                    </span>
                    <span className="text-[10px] text-surface-muted ml-1">(demo)</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-forest bg-forest text-white"
                        : "border-surface-border bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Slot Price Breakdown & Booking Button */}
      {selectedSlotIndex !== null && (
        <div className="p-3.5 rounded-xl bg-surface-ivory border border-sunshine/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-surface-muted">Selected Tour:</span>
            <span className="font-semibold text-navy truncate max-w-[200px]">
              {slots[selectedSlotIndex].slotName}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-surface-muted">Tour Date:</span>
            <span className="font-semibold text-navy">
              {selectedDay.dayName}, {selectedDay.monthName} {selectedDay.dayNumber},{" "}
              {today.getFullYear()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs border-t border-sunshine/30 pt-2 font-bold">
            <span className="text-navy">Total Indicative Fee:</span>
            <span className="text-forest text-sm">
              {formatCurrency(slots[selectedSlotIndex].rate)}
            </span>
          </div>
        </div>
      )}

      <Button
        variant="forest"
        size="lg"
        onClick={handleContinue}
        className="w-full justify-center shadow-md font-bold"
        rightIcon={<ChevronRight className="w-4 h-4" />}
      >
        Continue to Booking Enquiry
      </Button>

      <p className="text-[11px] text-surface-muted text-center leading-tight">
        * Guide dates and sessions are demonstration placeholders for frontend preview.
      </p>
    </div>
  );
}
