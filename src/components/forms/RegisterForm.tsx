"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validateEmail, validatePassword } from "@/lib/validation";

export function RegisterForm() {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registeredDemo, setRegisteredDemo] = useState(false);

  const pwdValidation = validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!pwdValidation.isValid) {
      newErrors.password = "Password must be at least 8 chars with a number and special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      newErrors.agreed = "You must accept the terms of service and demonstration notice.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setRegisteredDemo(true);
      addToast({
        type: "success",
        title: "Registration Simulated (Demo)",
        message: "Your profile preview was generated without persistent database storage.",
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
            <strong>Prototype Interface:</strong> Create an account for frontend preview.
            Credentials are not stored in any persistent storage or database.
          </p>
        </div>

        {registeredDemo ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy">
              Account Registration Simulated
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Hello, <strong>{fullName}</strong>! You can now test discovery routes and booking inquiry workflows.
            </p>
            <div className="pt-2">
              <Link href="/destinations">
                <Button variant="primary" className="w-full justify-center">
                  Start Discovering Karnataka
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Rohini Deshmukh"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div>
              <Input
                label="Create Password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 chars"
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
              />
              {/* Password criteria indicators */}
              <div className="mt-2 text-[11px] text-surface-muted flex items-center gap-2 flex-wrap">
                <span className={pwdValidation.hasLength ? "text-emerald-600 font-semibold" : ""}>
                  ✓ 8+ Chars
                </span>
                <span className={pwdValidation.hasNumber ? "text-emerald-600 font-semibold" : ""}>
                  ✓ Number
                </span>
                <span className={pwdValidation.hasSpecial ? "text-emerald-600 font-semibold" : ""}>
                  ✓ Symbol
                </span>
              </div>
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="space-y-1">
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reg-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-surface-border text-teal focus:ring-teal"
                />
                <label htmlFor="reg-terms" className="text-xs text-surface-muted leading-tight">
                  I agree to Sanchari&apos;s{" "}
                  <Link href="/terms" className="text-teal underline font-medium">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-teal underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreed && (
                <p className="text-xs text-rose-600 font-medium">{errors.agreed}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="orange"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center"
              rightIcon={<UserPlus className="w-4 h-4" />}
            >
              Create Account (Demo)
            </Button>

            <div className="pt-4 border-t border-surface-border text-center text-xs text-surface-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-teal font-bold hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
