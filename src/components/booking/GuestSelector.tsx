"use client";

import React, { useState, useRef, useEffect } from "react";
import { Users, Plus, Minus, ChevronDown, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GuestCounts {
  adults: number;
  children: number;
  rooms?: number;
}

export interface GuestSelectorProps {
  counts: GuestCounts;
  onChange: (counts: GuestCounts) => void;
  maxCapacity: number;
  maxRooms?: number;
  allowRooms?: boolean;
  className?: string;
}

export function GuestSelector({
  counts,
  onChange,
  maxCapacity,
  maxRooms = 3,
  allowRooms = false,
  className,
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalGuests = counts.adults + counts.children;
  const isAtCapacity = totalGuests >= maxCapacity;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const updateCount = (key: keyof GuestCounts, delta: number) => {
    const current = counts[key] ?? 0;
    const nextVal = current + delta;

    if (key === "adults") {
      if (nextVal < 1) return; // Must have at least 1 adult
      if (counts.children + nextVal > maxCapacity) return;
      onChange({ ...counts, adults: nextVal });
    } else if (key === "children") {
      if (nextVal < 0) return;
      if (counts.adults + nextVal > maxCapacity) return;
      onChange({ ...counts, children: nextVal });
    } else if (key === "rooms") {
      if (nextVal < 1 || nextVal > maxRooms) return;
      onChange({ ...counts, rooms: nextVal });
    }
  };

  return (
    <div className={cn("relative space-y-1", className)} ref={containerRef}>
      <label className="block text-[11px] font-bold text-navy uppercase tracking-wider">
        Guests & Capacity
      </label>

      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl border border-surface-border bg-surface-light hover:bg-white text-navy focus:outline-none focus:ring-2 focus:ring-forest transition-all"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <Users className="w-3.5 h-3.5 text-teal shrink-0" />
          <span className="font-semibold">
            {counts.adults} {counts.adults === 1 ? "Adult" : "Adults"}
            {counts.children > 0 && `, ${counts.children} ${counts.children === 1 ? "Child" : "Children"}`}
            {allowRooms && counts.rooms && `, ${counts.rooms} ${counts.rooms === 1 ? "Room" : "Rooms"}`}
          </span>
          <span className="text-[10px] text-surface-muted hidden sm:inline">
            (Max {maxCapacity})
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-surface-muted transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-30 mt-1 p-4 rounded-xl bg-white border border-surface-border shadow-xl space-y-4 animate-fadeIn">
          {/* Adults row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-navy block">Adults</span>
              <span className="text-[11px] text-surface-muted">Age 13 and above</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => updateCount("adults", -1)}
                disabled={counts.adults <= 1}
                className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease adult count"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-extrabold text-navy">
                {counts.adults}
              </span>
              <button
                type="button"
                onClick={() => updateCount("adults", 1)}
                disabled={isAtCapacity}
                className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase adult count"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children row */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-border">
            <div>
              <span className="text-xs font-bold text-navy block">Children</span>
              <span className="text-[11px] text-surface-muted">Ages 2 to 12</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => updateCount("children", -1)}
                disabled={counts.children <= 0}
                className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease child count"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-extrabold text-navy">
                {counts.children}
              </span>
              <button
                type="button"
                onClick={() => updateCount("children", 1)}
                disabled={isAtCapacity}
                className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase child count"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rooms row (if supported) */}
          {allowRooms && (
            <div className="flex items-center justify-between pt-3 border-t border-surface-border">
              <div>
                <span className="text-xs font-bold text-navy block">Rooms</span>
                <span className="text-[11px] text-surface-muted">Units reserved</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => updateCount("rooms", -1)}
                  disabled={(counts.rooms ?? 1) <= 1}
                  className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease room count"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center text-xs font-extrabold text-navy">
                  {counts.rooms ?? 1}
                </span>
                <button
                  type="button"
                  onClick={() => updateCount("rooms", 1)}
                  disabled={(counts.rooms ?? 1) >= maxRooms}
                  className="w-7 h-7 rounded-lg border border-surface-border bg-surface-light flex items-center justify-center text-navy hover:bg-surface-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase room count"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Capacity warning message if limit reached */}
          {isAtCapacity && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Maximum capacity of <strong>{maxCapacity} guests</strong> reached for this property.
              </span>
            </div>
          )}

          {/* Done Confirmation Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm Selection</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
