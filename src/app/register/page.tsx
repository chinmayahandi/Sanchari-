import React from "react";
import { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — Sanchari",
  description: "Join Sanchari to discover Karnataka's authentic stays and experiences.",
};

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      <div className="text-center space-y-2 mb-8 max-w-sm">
        <span className="text-xs font-bold text-orange uppercase tracking-wider">
          New Traveler Profile
        </span>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight">
          Join Sanchari
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
          Create an account to experience our discovery interface and preview local booking features.
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
