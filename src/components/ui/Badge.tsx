import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "teal"
    | "orange"
    | "nature"
    | "navy"
    | "forest"
    | "terracotta"
    | "sunshine"
    | "emerald"
    | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    default: "bg-navy-50 text-navy-800 border border-navy-100",
    teal: "bg-teal-50 text-teal-800 border border-teal-200",
    orange: "bg-orange-50 text-orange-800 border border-orange-200",
    nature: "bg-nature-50 text-nature-800 border border-nature-200",
    forest: "bg-forest-50 text-forest-800 border border-forest-200",
    terracotta: "bg-terracotta-50 text-terracotta-800 border border-terracotta-200",
    sunshine: "bg-sunshine-100 text-sunshine-900 border border-sunshine-300 font-semibold",
    emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    navy: "bg-navy text-white",
    outline: "border border-surface-border text-surface-muted bg-white",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
