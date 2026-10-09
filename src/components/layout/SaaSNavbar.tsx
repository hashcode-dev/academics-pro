"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

export const SaaSNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#004bca] flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-900">
              Academics<span className="text-[#004bca]">Pro</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#004bca] rounded border border-blue-200/60">
              SaaS Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="#modules" className="hover:text-[#004bca] transition-colors">Platform Modules</Link>
          <Link href="#architecture" className="hover:text-[#004bca] transition-colors">Microservices</Link>
          <Link href="#preview" className="hover:text-[#004bca] transition-colors">ERP Live Preview</Link>
          <Link href="/school" className="text-slate-900 font-semibold hover:text-[#004bca] flex items-center gap-1">
            <span>Tenant School Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/app">
            <Button variant="outline" size="sm">
              Sign In to ERP
            </Button>
          </Link>
          <Link href="/app">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Launch Demo <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
