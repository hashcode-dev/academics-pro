import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", glass = false }) => {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 ${
        glass ? "glass-panel" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
