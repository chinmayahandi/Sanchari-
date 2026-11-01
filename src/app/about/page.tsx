import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Compass, Landmark, Heart, ShieldCheck, TreePine, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Sanchari — Explore Karnataka. Your Way.",
  description:
    "Learn about Sanchari's mission to highlight Karnataka's authentic heritage, Western Ghats ecology, and community-led tourism.",
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "About Sanchari" }]} />

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Our Story & Purpose
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
          Connecting Travelers to the Real Karnataka.
        </h1>
        <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
          Sanchari is a modern tourism discovery concept created to celebrate Karnataka&apos;s
          extraordinary diversity—from the red stone caves of Badami to the misty coffee ridges of Kodagu.
        </p>
      </div>

      <DemoNotice message="Sanchari is currently presented as a frontend product demonstration showcasing user experience and design standards." />

      {/* Core Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-navy text-center">
          Guiding Pillars of Our Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy">Heritage Reverence</h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              We focus on accurate, respectful historical context—spotlighting the epigraphs, temple architecture, and living crafts that define Karnataka.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-nature-50 text-nature flex items-center justify-center">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy">Ecological Responsibility</h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Advocating low-impact travel through the Western Ghats biodiversity hotspots, supporting homestays that practice sustainable agriculture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy">Community Directness</h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Ensuring value stays with homestay hosts, local naturalists, and certified guides rather than extractive intermediaries.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Technical Note */}
      <div className="p-8 rounded-2xl bg-white border border-surface-border shadow-card space-y-4">
        <h2 className="text-xl font-bold text-navy">Frontend Prototype Notice</h2>
        <p className="text-sm text-surface-muted leading-relaxed">
          The present build of Sanchari is an advanced, fully typed Next.js frontend demonstration.
          Its purpose is to establish the design tokens, responsive typography, search architectures,
          and booking inquiry user interfaces.
        </p>
        <p className="text-sm text-surface-muted leading-relaxed">
          In this preview stage, no real transactions, user database queries, or server-side booking engines are active.
          The code is engineered with strict TypeScript typing and modular component boundaries to enable straightforward future integration with PostgreSQL / Supabase, authentication providers, and SMS notifications.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/destinations">
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Destinations
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">
              Contact Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
