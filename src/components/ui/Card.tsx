import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", glass = false, ...props }) => {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 ${
        glass ? "glass-panel" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
