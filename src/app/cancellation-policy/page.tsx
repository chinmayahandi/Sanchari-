import React from "react";
import { Metadata } from "next";
import { AlertCircle, CalendarX } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy (Draft for Review) — Sanchari",
  description: "Draft cancellation windows and refund schedules for Sanchari homestays and guides.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Booking Terms (Draft)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Cancellation Policy
        </h1>
        <p className="text-xs text-surface-muted">
          Draft Version 1.0 &bull; Last updated: October 2026 &bull; Marked for Review
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Review Note:</strong> The cancellation policies outlined below are draft schedules intended for host and operator consensus before public commercial bookings go live.
        </p>
      </div>

      <div className="prose prose-navy max-w-none text-xs sm:text-sm text-surface-muted space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">1. Homestay & Plantation Accommodations</h2>
          <p className="leading-relaxed">
            Because homestays and estate bungalows operate with limited rooms (typically 2 to 6 units), cancellations impact family operators significantly:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Standard Window:</strong> Full refund for cancellations made at least 5 days prior to scheduled check-in time (12:00 PM).
            </li>
            <li>
              <strong>Late Cancellations (2–4 days before arrival):</strong> 50% refund or free date adjustment subject to host availability.
            </li>
            <li>
              <strong>Within 48 hours of check-in:</strong> Non-refundable to protect the host against last-minute vacancies.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">2. Licensed Local Guides</h2>
          <p className="leading-relaxed">
            Guide bookings involve personal reservation of an expert&apos;s full day:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>Up to 48 hours prior to tour start:</strong> Full refund, no administrative fee.
            </li>
            <li>
              <strong>Within 24 hours of scheduled tour:</strong> 50% cancellation fee to compensate the guide for blocked dates.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">3. Cultural Workshops & Experiences</h2>
          <p className="leading-relaxed">
            Experiences with advance material procurement (e.g. coffee cupping beans, Yakshagana costume access, artisanal food tastings) may be cancelled up to 72 hours prior to the session for a full refund.
          </p>
        </section>
      </div>
    </div>
  );
}
