"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, Calendar, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface SchoolNavbarProps {
  tenantName?: string;
  tenantTagline?: string;
}

export const SchoolNavbar: React.FC<SchoolNavbarProps> = ({
  tenantName = "Apex High School",
  tenantTagline = "Cambridge & IB World School",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Trust Notice Bar */}
      <div className="bg-[#eff4ff] border-b border-blue-100 py-1.5 px-4 text-xs font-medium text-[#001d4f] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-[#004bca]">
              <Award className="w-3.5 h-3.5" /> IB World School #0421
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-600">Cambridge International Assessment Centre</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#004bca] font-medium text-slate-500">
              ← Academics Pro Home
            </Link>
            <Link href="/app" className="text-[#004bca] font-semibold hover:underline">
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/school" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004bca] to-[#0061ff] flex items-center justify-center text-white shadow-md font-display font-black text-xl">
            A
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              {tenantName}
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">
              {tenantTagline}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="#programs" className="hover:text-[#004bca] transition-colors">Programs & Curricula</Link>
          <Link href="#why-us" className="hover:text-[#004bca] transition-colors">Why Apex</Link>
          <Link href="#outcomes" className="hover:text-[#004bca] transition-colors">Outcomes & Testimonials</Link>
          <Link href="#events" className="hover:text-[#004bca] transition-colors">Open Days & Events</Link>
          <Link href="#news" className="hover:text-[#004bca] transition-colors">News</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#events">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#004bca]" /> Book Open Day
            </Button>
          </a>
          <a href="#enquiry">
            <Button variant="primary" size="sm" className="gap-1.5">
              Apply Now <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-800">Programs</Link>
          <Link href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-800">Why Apex</Link>
          <Link href="#outcomes" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-800">Outcomes</Link>
          <Link href="#events" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-800">Open Days</Link>
          <Link href="#enquiry" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-[#004bca]">Enquiry Form</Link>
          <div className="pt-2 flex flex-col gap-2">
            <a href="#enquiry" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">Apply Now</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
