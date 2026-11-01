import React from "react";
import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — Sanchari",
  description: "Reset your Sanchari account password preview.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      <div className="text-center space-y-2 mb-8 max-w-sm">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Account Assistance
        </span>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
          Simulate password recovery for your Sanchari prototype profile.
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
