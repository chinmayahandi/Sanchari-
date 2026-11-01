"use client";

import React, { useMemo } from "react";
import { Calendar, RotateCcw, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onReset?: () => void;
  minNights?: number;
  className?: string;
  compact?: boolean;
}

export function DateRangePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  onReset,
  minNights = 1,
  className,
  compact = false,
}: DateRangePickerProps) {
  // Format today's date in YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  // Compute minimum permitted check-out date
  const minCheckOutStr = useMemo(() => {
    if (!checkInDate) return todayStr;
    const cin = new Date(checkInDate);
    cin.setDate(cin.getDate() + minNights);
    return cin.toISOString().split("T")[0];
  }, [checkInDate, minNights, todayStr]);

  // Validation logic
  const validationError = useMemo(() => {
    if (checkInDate && checkInDate < todayStr) {
      return "Check-in date cannot be in the past.";
    }
    if (checkInDate && checkOutDate) {
      const cin = new Date(checkInDate).getTime();
      const cout = new Date(checkOutDate).getTime();
      if (cout <= cin) {
        return "Check-out date must be after check-in.";
      }
    }
    return null;
  }, [checkInDate, checkOutDate, todayStr]);

  // Number of nights calculation
  const nightsCount = useMemo(() => {
    if (!checkInDate || !checkOutDate) return null;
    const cin = new Date(checkInDate).getTime();
    const cout = new Date(checkOutDate).getTime();
    if (isNaN(cin) || isNaN(cout) || cout <= cin) return null;
    return Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
  }, [checkInDate, checkOutDate]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    onCheckInChange(newCheckIn);

    // If new check-in is >= current check-out, automatically update check-out to checkIn + minNights
    if (checkOutDate && newCheckIn >= checkOutDate) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + minNights);
      onCheckOutChange(nextDay.toISOString().split("T")[0]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Date Input Fields */}
      <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
        {/* Check-In */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
            Check-In
          </label>
          <div className="relative flex items-center">
            <input
              type="date"
              min={todayStr}
              value={checkInDate}
              onChange={handleCheckInChange}
              className={cn(
                "w-full px-3 py-2 text-xs rounded-xl border bg-surface-light text-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer transition-all",
                validationError && !checkOutDate ? "border-rose-400" : "border-surface-border"
              )}
              aria-label="Check-in date"
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
            Check-Out
          </label>
          <div className="relative flex items-center">
            <input
              type="date"
              min={minCheckOutStr}
              value={checkOutDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
              disabled={!checkInDate}
              className={cn(
                "w-full px-3 py-2 text-xs rounded-xl border bg-surface-light text-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                validationError ? "border-rose-400" : "border-surface-border"
              )}
              aria-label="Check-out date"
            />
          </div>
        </div>
      </div>

      {/* Validation or Selected Nights Status */}
      <div className="flex items-center justify-between text-xs">
        {validationError ? (
          <div className="flex items-center gap-1.5 text-rose-600 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{validationError}</span>
          </div>
        ) : nightsCount !== null ? (
          <div className="flex items-center gap-1.5 text-forest font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {nightsCount} {nightsCount === 1 ? "Night" : "Nights"} Selected
            </span>
          </div>
        ) : (
          <span className="text-surface-muted text-[11px]">
            Select dates to compute stay total
          </span>
        )}

        {(checkInDate || checkOutDate) && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-surface-muted hover:text-navy transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Availability Preview Disclaimer */}
      <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-2 text-[11px] text-emerald-950">
        <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
        <span className="leading-tight">
          <strong>Availability preview</strong> — final room calendar will be verified when live bookings connect.
        </span>
      </div>
    </div>
  );
}
