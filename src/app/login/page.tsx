import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Sanchari",
  description: "Sign in to your Sanchari account to explore Karnataka homestays and journeys.",
};

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      <div className="text-center space-y-2 mb-8 max-w-sm">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Traveler & Partner Access
        </span>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight">
          Welcome to Sanchari
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
          Sign in to test trip planning, save favorite homestays, and manage demonstration inquiries.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
