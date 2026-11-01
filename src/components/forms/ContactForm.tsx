"use client";

import React, { useState } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validateContactForm } from "@/lib/validation";

export function ContactForm() {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({
      fullName,
      email,
      subject,
      message,
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      addToast({
        type: "info",
        title: "Message Processed (Demo)",
        message: "Your message was simulated in demonstration mode. No live email server is attached.",
      });
    }, 700);
  };

  if (isSent) {
    return (
      <div className="rounded-2xl bg-white border border-surface-border p-8 shadow-card text-center max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-teal-50 text-teal flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-navy mb-2">Message Sent (Demo Mode)</h3>
        <p className="text-sm text-surface-muted leading-relaxed mb-6">
          Thank you, <strong>{fullName}</strong>. Because Sanchari is currently functioning as a frontend application without live API mailers, your message was not dispatched to an external inbox.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSent(false);
            setFullName("");
            setEmail("");
            setSubject("");
            setMessage("");
          }}
        >
          Send Another Note
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card space-y-4 text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          placeholder="e.g. Priyadarshini"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="priya@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
        />
      </div>

      <Input
        label="Subject"
        placeholder="e.g. Planning a heritage trip to Hampi & Badami"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        error={errors.subject}
        leftIcon={<MessageSquare className="w-4 h-4" />}
      />

      <div>
        <label className="block text-xs font-semibold text-surface-text mb-1.5">
          Your Message
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we assist your Karnataka journey or provider questions?..."
          className="w-full rounded-lg border border-surface-border p-3 text-sm text-surface-text focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-rose-600 font-medium">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        className="w-full justify-center"
        rightIcon={<Send className="w-4 h-4" />}
      >
        Send Enquiry (Demo)
      </Button>
    </form>
  );
}
