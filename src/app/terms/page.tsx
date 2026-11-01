import React from "react";
import { Metadata } from "next";
import { AlertCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service (Draft for Review) — Sanchari",
  description: "Terms and conditions draft governing the use of Sanchari platform.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Platform Governance (Draft)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-surface-muted">
          Draft Version 1.0 &bull; Last updated: October 2026 &bull; Marked for Review
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Review Note:</strong> These draft terms represent operational guidelines for the Sanchari marketplace and require formal review before legal execution.
        </p>
      </div>

      <div className="prose prose-navy max-w-none text-xs sm:text-sm text-surface-muted space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">1. Platform Nature & Role</h2>
          <p className="leading-relaxed">
            Sanchari acts as a discovery and intermediary technology platform connecting independent travelers with registered homestays, licensed local tour guides, and experience organizers across Karnataka. Sanchari does not own or operate hotel chains, transport vehicles, or homestay premises.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">2. Content & Listing Accuracy</h2>
          <p className="leading-relaxed">
            Listing descriptions, photos, and house rules are maintained in cooperation with verified local operators. While Sanchari conducts due diligence, travelers are encouraged to review specific room rules and regional guidelines directly with hosts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">3. Code of Conduct for Travelers</h2>
          <p className="leading-relaxed">
            Travelers utilizing Sanchari commit to respecting local cultural traditions, religious dress requirements at sacred shrines, quiet hours in ecological zones, and waste segregation principles throughout Karnataka.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-navy">4. Limitation of Liability</h2>
          <p className="leading-relaxed">
            During the demonstration preview, all services and inquiries are simulated. Sanchari assumes no liability for external travel arrangements undertaken outside verified production booking contracts.
          </p>
        </section>
      </div>
    </div>
  );
}
