"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";

export function AnnouncementStrip() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-navy text-white text-xs py-2 px-4 border-b border-navy-800 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center p-1 rounded-full bg-orange-500/20 text-orange shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
          </span>
          <p className="text-navy-100 font-medium">
            <span className="hidden sm:inline">Explore Karnataka responsibly: </span>
            Discover authentic homestays, licensed guides, and community experiences.
          </p>
          <Link
            href="/destinations"
            className="hidden md:inline-flex items-center gap-1 text-orange hover:text-orange-300 font-semibold transition-colors ml-1"
          >
            <span>Start exploring</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-navy-300 hover:text-white p-1 rounded transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
