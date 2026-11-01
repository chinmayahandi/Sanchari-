import React from "react";
import { Metadata } from "next";
import { HeartHandshake, Home, Users, Sparkles, Building, CheckCircle2, ShieldCheck } from "lucide-react";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { DemoNotice } from "@/components/feedback/DemoNotice";

export const metadata: Metadata = {
  title: "Become a Partner — List Your Homestay, Guide or Experience",
  description:
    "Partner with Sanchari to present your Karnataka homestay, licensed guiding service, or local cultural workshop to responsible travelers.",
};

export default function PartnersPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Local Tourism Partnership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
          Share Your Place With the World.
        </h1>
        <p className="text-sm sm:text-base text-surface-muted leading-relaxed max-w-2xl mx-auto">
          Sanchari is built to elevate genuine Karnataka tourism enterprises.
          Whether you manage an ancestral coffee homestay, lead epigraphy walks in Hampi,
          or teach traditional folk theatre in coastal towns—connect with travelers who value authenticity.
        </p>
      </div>

      <DemoNotice message="This page demonstrates the partner onboarding process. Submitted applications are processed in demonstration mode on the frontend." />

      {/* Benefits for Different Categories */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy">Who Can List on Sanchari?</h2>
          <p className="text-xs sm:text-sm text-surface-muted mt-1">
            Tailored capabilities for every sector of Karnataka&apos;s tourism ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-navy">Homestay Owners</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Showcase your ancestral property, estate plantation, and authentic regional meals to travelers seeking genuine hospitality.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-navy">Licensed Local Guides</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Present your historical credentials, languages, and specialized walking trails directly without third-party commission middle layers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-nature-50 text-nature flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-navy">Cultural Experience Providers</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Offer pottery workshops, culinary masterclasses, and photography tours directly to curious explorers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-navy">Local Tourism Operators</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Promote ethical wildlife safaris, Sharavathi kayaking trails, and heritage circuit transport.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="pt-6 border-t border-surface-border space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="text-2xl font-bold text-navy">
            Submit a Partner Demonstration Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-surface-muted">
            Complete the fields below to preview the host onboarding process.
          </p>
        </div>

        <PartnerForm />
      </div>
    </div>
  );
}
