"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-[#004bca] hover:bg-[#0061ff] text-white shadow-sm hover:shadow",
    secondary: "bg-[#712ae2] hover:bg-[#853bf7] text-white shadow-sm",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm",
    ghost: "text-slate-700 hover:bg-slate-100/80 bg-transparent",
    danger: "bg-[#ba1a1a] hover:bg-red-700 text-white shadow-sm",
  }[variant];

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-medium gap-1.5 min-h-[34px]",
    md: "px-4 py-2.5 text-sm font-medium gap-2 min-h-[42px]",
    lg: "px-6 py-3.5 text-base font-semibold gap-2.5 min-h-[48px]",
  }[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
