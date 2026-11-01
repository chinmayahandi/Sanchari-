"use client";

import React, { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  Check,
  X,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Star,
  MapPinned,
  Compass,
  FileText,
} from "lucide-react";
import { EXPERIENCES_DATA } from "@/data/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ImageGallery } from "@/components/common/ImageGallery";
import { TimeSlotPicker, TimeSlot } from "@/components/booking/TimeSlotPicker";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { MobileStickyBookingBar } from "@/components/booking/MobileStickyBookingBar";
import { calculateExperiencePricing } from "@/lib/pricing";
import { formatCurrency, cn } from "@/lib/utils";

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const experience = EXPERIENCES_DATA.find((e) => e.slug === slug);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [participantsCount, setParticipantsCount] = useState(2);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>("exp-slot-1");

  if (!experience) {
    notFound();
  }

  const related = EXPERIENCES_DATA.filter((e) => e.slug !== experience.slug).slice(0, 2);

  // Time slots for this activity
  const sampleSlots: TimeSlot[] = useMemo(() => {
    return [
      {
        id: "exp-slot-1",
        timeRange: "08:30 AM – 11:30 AM",
        slotTitle: "Morning Workshop & Interactive Session",
        duration: experience.duration,
        rate: experience.indicativePricePerPerson,
        isAvailable: true,
        remainingCapacity: Math.max(2, experience.maxGroupSize - 3),
      },
      {
        id: "exp-slot-2",
        timeRange: "03:30 PM – 06:30 PM",
        slotTitle: "Afternoon / Golden Hour Session",
        duration: experience.duration,
        rate: experience.indicativePricePerPerson,
        isAvailable: true,
        remainingCapacity: experience.maxGroupSize,
      },
    ];
  }, [experience.duration, experience.indicativePricePerPerson, experience.maxGroupSize]);

  const activeSlot = sampleSlots.find((s) => s.id === selectedSlotId) ?? sampleSlots[0];

  // Shared price calculation
  const pricing = calculateExperiencePricing(
    experience.indicativePricePerPerson,
    participantsCount
  );

  const priceBreakdownItems = [
    {
      label: `${formatCurrency(experience.indicativePricePerPerson)} × ${participantsCount} ${
        participantsCount === 1 ? "participant" : "participants"
      }`,
      amount: pricing.subtotal,
    },
    {
      label: "Materials & facilitation fee",
      amount: pricing.serviceFee,
      subtext: "Includes workshop tasting/equipment access",
    },
    {
      label: "Estimated GST (5%)",
      amount: pricing.taxAmount,
      subtext: "Statutory cultural activity tax preview",
    },
  ];

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="pb-24 lg:pb-16 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Cultural Experiences", href: "/experiences" },
          { label: experience.title },
        ]}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="orange" size="sm">
              {experience.category}
            </Badge>
            <Badge variant="default" size="sm">
              {experience.district} District
            </Badge>
            {experience.demoRating && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{experience.demoRating.toFixed(2)}</span>
                <span className="text-surface-muted font-normal">
                  ({experience.demoReviewsCount} demo reviews)
                </span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            {experience.title}
          </h1>

          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-surface-muted">
            <MapPin className="w-4 h-4 text-teal shrink-0" />
            <span>
              {experience.destinationName}, Karnataka
            </span>
          </p>
        </div>

        {/* Quick Rate & Action */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-surface-muted block">Indicative Rate (Demo)</span>
            <span className="text-2xl font-black text-navy">
              {formatCurrency(experience.indicativePricePerPerson)}
            </span>
            <span className="text-xs text-surface-muted ml-1">/ person</span>
          </div>
          <Button
            size="lg"
            variant="orange"
            onClick={() => setIsBookingOpen(true)}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Enquire Experience
          </Button>
        </div>
      </div>

      {/* Image Gallery with Lightbox */}
      <ImageGallery
        images={experience.gallery}
        title={experience.title}
        badgeText={`${experience.category} • ${experience.duration}`}
      />

      <DemoNotice message="Activity schedules, participant counts and demo rates are presented for frontend evaluation. No real payment or inventory reservation is conducted." />

      {/* Main Grid: Details & Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-surface-border text-center shadow-sm">
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Duration
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-teal" />
                {experience.duration}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Max Group Size
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-teal" />
                Up to {experience.maxGroupSize}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Difficulty
              </span>
              <span className="text-sm sm:text-base font-bold text-forest flex items-center justify-center gap-1.5 mt-0.5">
                <Compass className="w-4 h-4 text-forest" />
                {experience.difficulty || "Easy"}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Audience
              </span>
              <span className="text-xs sm:text-sm font-bold text-navy mt-1 truncate block px-1">
                {experience.ageRestriction || "All Ages"}
              </span>
            </div>
          </div>

          {/* Overview */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-navy">About This Experience</h2>
            <p className="text-sm text-surface-muted leading-relaxed">
              {experience.overview}
            </p>
          </section>

          {/* Highlights */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange" />
              <h2 className="text-lg font-bold text-navy">Experience Highlights</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experience.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-light border border-surface-border text-xs sm:text-sm text-navy"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What's Included & Not Included */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-5">
            <h2 className="text-lg font-bold text-navy">What&apos;s Included & Excluded</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Included */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5">
                  What is Included
                </h3>
                <ul className="space-y-2 text-xs text-surface-muted">
                  {experience.included.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2.5">
                  What is Not Included
                </h3>
                <ul className="space-y-2 text-xs text-surface-muted">
                  {experience.notIncluded.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Meeting Point & Important Instructions */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-navy">Logistics & Preparation</h2>

            <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border space-y-1 text-xs">
              <span className="font-bold text-navy flex items-center gap-1.5">
                <MapPinned className="w-4 h-4 text-forest" />
                Meeting Point:
              </span>
              <p className="text-surface-muted pl-5 font-medium">
                {experience.meetingPoint}
              </p>
            </div>

            {experience.importantInstructions && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                  Important Traveler Notes:
                </span>
                <ul className="space-y-1.5 text-xs text-surface-muted">
                  {experience.importantInstructions.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-surface-border text-xs text-surface-muted space-y-1">
              <span className="font-bold text-navy flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest" />
                Cancellation Terms:
              </span>
              <p className="pl-5 leading-relaxed">
                {experience.cancellationPolicy ||
                  "Free cancellation up to 48 hours prior to start time for demonstration previews."}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Interactive Booking Sidebar */}
        <aside className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-5">
            <div className="flex items-baseline justify-between border-b border-surface-border pb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-navy">
                  {formatCurrency(experience.indicativePricePerPerson)}
                </span>
                <span className="text-xs text-surface-muted ml-1">/ person</span>
              </div>
              <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Sample Rate
              </span>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
                Select Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest text-navy cursor-pointer transition-all"
                aria-label="Experience date"
              />
            </div>

            {/* Time Slot Picker */}
            <TimeSlotPicker
              slots={sampleSlots}
              selectedSlotId={selectedSlotId}
              onSelectSlot={(slot) => setSelectedSlotId(slot.id)}
              selectedDateText={selectedDate}
            />

            {/* Participant Selector */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                  Participants
                </label>
                <span className="text-[10px] text-surface-muted">
                  Max {experience.maxGroupSize}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-surface-border bg-surface-light">
                <span className="text-xs font-semibold text-navy">
                  {participantsCount} {participantsCount === 1 ? "Guest" : "Guests"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((prev) => Math.max(1, prev - 1))}
                    disabled={participantsCount <= 1}
                    className="w-6 h-6 rounded-md bg-white border border-surface-border flex items-center justify-center text-xs font-bold text-navy disabled:opacity-40"
                    aria-label="Decrease participants"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((prev) => Math.min(experience.maxGroupSize, prev + 1))}
                    disabled={participantsCount >= experience.maxGroupSize}
                    className="w-6 h-6 rounded-md bg-white border border-surface-border flex items-center justify-center text-xs font-bold text-navy disabled:opacity-40"
                    aria-label="Increase participants"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Price Breakdown */}
            <PriceBreakdown
              items={priceBreakdownItems}
              total={pricing.totalEstimated}
              totalLabel="Estimated Total (Demo)"
            />

            {/* Continue to Booking CTA */}
            <Button
              variant="orange"
              size="lg"
              className="w-full justify-center shadow-md font-bold text-sm"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Continue with Experience
            </Button>

            <p className="text-[11px] text-surface-muted text-center leading-tight">
              * Phase 3 demonstration interface. Submissions create simulated itinerary previews without financial charges.
            </p>
          </div>

          {/* Host / Organizer Card */}
          <div className="rounded-2xl bg-white border border-surface-border p-5 shadow-sm space-y-3">
            <span className="text-[11px] font-bold text-orange uppercase tracking-wider block">
              Experience Organiser
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {(experience.hostName || experience.title)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-navy truncate">
                  {experience.hostName || "Local Community Organiser"}
                </h4>
                <p className="text-xs text-surface-muted truncate">Verified Local Host</p>
              </div>
            </div>
            <p className="text-xs text-surface-muted leading-relaxed">
              {experience.hostBio ||
                "Deeply rooted in Karnataka's arts, culinary crafts, and conservation practices."}
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBookingBar
        price={experience.indicativePricePerPerson}
        unitLabel="/ person"
        onBookClick={() => setIsBookingOpen(true)}
        subtitle={`${selectedDate} • ${participantsCount} ${
          participantsCount === 1 ? "participant" : "participants"
        }`}
        ctaText="Enquire Experience"
      />

      {/* Related Cultural Experiences */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-surface-border space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy">
              Other Cultural Experiences in Karnataka
            </h2>
            <Link
              href="/experiences"
              className="text-xs font-bold text-teal hover:underline flex items-center gap-1"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>
      )}

      {/* Booking Enquiry Drawer */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="experience"
        serviceId={experience.id}
        serviceTitle={experience.title}
        destinationName={experience.destinationName}
        basePrice={experience.indicativePricePerPerson}
        priceUnitLabel="per person"
        maxCapacity={experience.maxGroupSize}
      />
    </div>
  );
}
