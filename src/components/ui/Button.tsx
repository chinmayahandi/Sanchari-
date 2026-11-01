"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "orange"
    | "forest"
    | "terracotta"
    | "sunshine"
    | "emerald"
    | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-teal text-white hover:bg-teal-600 focus:ring-teal-500 shadow-sm hover:shadow",
      forest:
        "bg-forest text-white hover:bg-forest-800 focus:ring-forest-600 shadow-sm hover:shadow",
      secondary:
        "bg-navy text-white hover:bg-navy-800 focus:ring-navy-600 shadow-sm",
      orange:
        "bg-orange text-white hover:bg-orange-600 focus:ring-orange-500 shadow-sm",
      terracotta:
        "bg-terracotta text-white hover:bg-terracotta-600 focus:ring-terracotta-500 shadow-sm",
      sunshine:
        "bg-sunshine text-charcoal hover:bg-sunshine-500 focus:ring-sunshine-400 font-bold shadow-sm",
      emerald:
        "bg-emerald text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-sm",
      outline:
        "border border-surface-border bg-white text-navy hover:bg-navy-50 focus:ring-teal-500",
      ghost:
        "bg-transparent text-navy hover:bg-navy-50 focus:ring-navy-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
