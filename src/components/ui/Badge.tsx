import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral" | "secondary";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", className = "" }) => {
  const variantStyles = {
    primary: "bg-[#eff4ff] text-[#004bca] border-[#bfdbfe]",
    success: "bg-[#e6f7f2] text-[#007f57] border-[#a7f3d0]",
    warning: "bg-amber-50 text-[#d97706] border-amber-200",
    danger: "bg-red-50 text-[#ba1a1a] border-red-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    secondary: "bg-[#f3e8ff] text-[#712ae2] border-purple-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
