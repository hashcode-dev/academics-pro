"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Calendar, ChevronRight } from "lucide-react";

interface AppNavbarProps {
  title?: string;
  subtitle?: string;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  title = "Dashboard",
  subtitle = "Executive Management Overview",
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shrink-0">
      <div>
        <h1 className="font-display font-bold text-lg text-slate-900 leading-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Academic Calendar Term Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#eff4ff] border border-blue-200/70 rounded-full text-xs font-semibold text-[#004bca]">
          <Calendar className="w-3.5 h-3.5" />
          <span>AY 2026–27 • Fall Term 1</span>
        </div>

        {/* Global Search */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, faculty, invoices..."
            className="w-64 pl-9 pr-3.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004bca]/30 focus:border-[#004bca] transition-colors"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};
