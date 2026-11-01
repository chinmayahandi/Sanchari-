"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, KeyRound, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validateEmail } from "@/lib/validation";

export function ForgotPasswordForm() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedSent, setSimulatedSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSimulatedSent(true);
      addToast({
        type: "info",
        title: "Reset Request Simulated",
        message: "No email dispatch service is active in demonstration mode.",
      });
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card">
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Frontend Simulation:</strong> Password recovery workflow demonstration only.
            No live emails are sent.
          </p>
        </div>

        {simulatedSent ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">
              Reset Link Simulated
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              If an account with <strong>{email}</strong> existed, a recovery email would be generated here.
              In this frontend environment, no emails are dispatched.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full justify-center" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-surface-muted leading-relaxed mb-4">
              Enter your registered email address and we will simulate sending a password reset verification link.
            </p>

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center"
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              Send Reset Link (Demo)
            </Button>

            <div className="pt-4 border-t border-surface-border text-center">
              <Link
                href="/login"
                className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
