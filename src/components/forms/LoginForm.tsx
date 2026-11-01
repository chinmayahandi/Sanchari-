"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validateEmail } from "@/lib/validation";

export function LoginForm() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submittedDemo, setSubmittedDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmittedDemo(true);
      addToast({
        type: "info",
        title: "Frontend Sign-In Simulated",
        message: "No live authentication backend is active. Demonstration mode accepted.",
      });
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card">
        {/* Demo banner */}
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Frontend Only:</strong> Authentication forms are built for UI preview and validation.
            No live account creation or credentials are stored.
          </p>
        </div>

        {submittedDemo ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal flex items-center justify-center mx-auto">
              <LogIn className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">
              Sign-In Simulated Successfully
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Welcome back, <strong>{email}</strong>! In this demonstration build, sessions are simulated without connecting to a Supabase or OAuth provider.
            </p>
            <div className="pt-2">
              <Link href="/destinations">
                <Button variant="primary" className="w-full justify-center">
                  Continue Exploring Karnataka
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-surface-muted hover:text-navy transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                autoComplete="current-password"
              />
              <div className="mt-1 text-right">
                <Link
                  href="/forgot-password"
                  className="text-xs text-teal font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center"
              rightIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In (Demo)
            </Button>

            <div className="pt-4 border-t border-surface-border text-center text-xs text-surface-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-teal font-bold hover:underline">
                Register here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
