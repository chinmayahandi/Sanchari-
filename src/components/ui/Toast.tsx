"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { ToastMessage } from "@/types";
import { cn } from "@/lib/utils";

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-teal-600 shrink-0" />,
  };

  const borders = {
    success: "border-l-emerald-500",
    error: "border-l-rose-500",
    warning: "border-l-orange-500",
    info: "border-l-teal-500",
  };

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3 w-80 sm:w-96 rounded-xl bg-white p-4 shadow-xl border border-surface-border border-l-4 transition-all duration-300 pointer-events-auto",
        borders[toast.type]
      )}
    >
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-navy">{toast.title}</h4>
        <p className="mt-0.5 text-xs text-surface-muted leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-surface-muted hover:text-navy p-1 rounded-md transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
