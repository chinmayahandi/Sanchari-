import React from "react";
import { Metadata } from "next";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { DemoNotice } from "@/components/feedback/DemoNotice";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft for Review) — Sanchari",
  description: "Draft privacy policy and data governance practices for Sanchari Karnataka tourism platform.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Legal & Data Governance (Draft)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-surface-muted">
          Draft Version 1.0 &bull; Last updated: October 2026 &bull; Marked for Legal Counsel Review
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Review Note:</strong> The following text is structured draft policy for the Sanchari platform.
          It must be reviewed by qualified legal counsel prior to formal commercial operations under Indian IT Act and Digital Personal Data Protection Act (DPDPA) rules.
        </p>
      </div>

      <div className="prose prose-navy max-w-none text-xs sm:text-sm text-surface-muted space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">1. Information Collected (Intended Scope)</h2>
          <p className="leading-relaxed">
            When operational, Sanchari will collect basic account identifiers (name, verified mobile number, email address) to facilitate booking enquiries and coordinate communications between travelers and registered Karnataka tourism partners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">2. Current Prototype / Demonstration State</h2>
          <p className="leading-relaxed">
            In the current frontend development version, all form submissions (booking enquiries, partner applications, contact messages) are processed client-side. No personal data, tracking cookies, or payment card records are stored in a persistent external database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">3. Future Partner & Host Information Sharing</h2>
          <p className="leading-relaxed">
            Contact information provided during stay or guide requests will be shared solely with the specific provider whose service is being requested, strictly for logistical trip confirmation. Sanchari does not sell traveler data to third-party advertising brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">4. Security Standards</h2>
          <p className="leading-relaxed">
            Future backend architectures will employ industry-standard encryption in transit (HTTPS / TLS 1.3) and at rest, alongside role-based access control protecting customer and partner records.
          </p>
        </section>
      </div>
    </div>
  );
}
