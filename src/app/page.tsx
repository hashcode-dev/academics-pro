"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  CalendarDays,
  DollarSign,
  Globe2,
  Users2,
  CheckCircle2,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { SaaSNavbar } from "@/components/layout/SaaSNavbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function SaaSProductLandingPage() {
  const modules = [
    {
      icon: Building2,
      name: "Institution & Academics",
      description: "Manage multi-campus structures, academic calendars, terms, grade divisions, sections, and room allocations.",
      db: "PostgreSQL",
    },
    {
      icon: Users2,
      name: "People & Admissions",
      description: "End-to-end student lifecycle from inquiry form to alumni status, complete faculty dossiers, and guardian portals.",
      db: "PostgreSQL",
    },
    {
      icon: CalendarDays,
      name: "Timetable & Scheduling",
      description: "Algorithmic scheduling engine with automated conflict prevention across teachers, sections, and specialized labs.",
      db: "PostgreSQL",
    },
    {
      icon: DollarSign,
      name: "Finance, Fees & Payroll",
      description: "Automated tuition fee plans, multi-channel payment receipts, defaulter tracking, and attendance-linked payroll.",
      db: "PostgreSQL",
    },
    {
      icon: Globe2,
      name: "Tenant Website CMS",
      description: "Document-driven content studio empowering non-technical school coordinators to update programs, news, and events.",
      db: "MongoDB",
    },
    {
      icon: ShieldCheck,
      name: "Identity & Tenancy",
      description: "Enterprise multi-tenant isolation, JWT session tokens, and strict role-based access for 7 institutional roles.",
      db: "PostgreSQL",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <SaaSNavbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-[#eff4ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#004bca] text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise School ERP & Headless Tenant CMS Platform</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            The Unified Operating Platform for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bca] to-[#712ae2]">
              World-Class Schools
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Academics Pro seamlessly unifies academic operations, timetable conflict prevention, fee collections, staff payroll, and conversion-focused school websites into one cohesive cloud suite.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
              <Button variant="primary" size="lg" className="gap-2 shadow-md">
                Launch Authenticated ERP <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/school">
              <Button variant="outline" size="lg" className="gap-2">
                <Globe2 className="w-4 h-4 text-[#004bca]" /> View Tenant School Site (Meta Prompt)
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold font-display text-[#004bca]">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Tenant Data Isolation</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold font-display text-emerald-600">0 ms</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Schedule Double-Booking</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold font-display text-[#712ae2]">WCAG 2.1</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">AA Accessible Standard</div>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold font-display text-amber-600">Dual-Engine</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Postgres + Mongo CMS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Modules Section */}
      <section id="modules" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">Modular Microservices</Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Engineered for Academic & Operational Precision
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Every module addresses a distinct domain responsibility with strict database ownership and zero cross-service contamination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.name} className="hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#004bca]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={m.db === "MongoDB" ? "secondary" : "neutral"}>
                    <Database className="w-3 h-3 mr-1" /> {m.db}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Architecture Topology Section */}
      <section id="architecture" className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-[#60a5fa] text-xs font-semibold mb-4">
                <Layers className="w-3.5 h-3.5" /> Platform Architecture
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white mb-6">
                Separation of Concerns: Operational vs Public CMS
              </h2>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Operational records (students, faculty, class rosters, conflict-free timetables, invoices, receipts, and payroll history) require strict relational integrity and transactional atomicity handled by <strong className="text-white">PostgreSQL</strong>.
                </p>
                <p>
                  Public school marketing content (programs, faculty highlights, testimonials, open day schedules, and news feeds) features evolving document shapes rendered together on the tenant website, managed natively via <strong className="text-[#a7f3d0]">MongoDB</strong>.
                </p>
                <p>
                  The <strong className="text-[#60a5fa]">Spring Cloud Gateway</strong> provides a unified API contract with dynamic tenant resolution via <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 font-mono">X-Tenant-ID</code> headers.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Link href="/app">
                  <Button variant="primary" size="md">Explore ERP Controls</Button>
                </Link>
                <Link href="/school">
                  <Button variant="outline" size="md" className="bg-transparent text-white border-slate-700 hover:bg-slate-800">
                    Visit School Website
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 backdrop-blur shadow-2xl">
              <div className="text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-slate-700 flex items-center justify-between">
                <span>SYSTEM_TOPOLOGY_V1.json</span>
                <span className="text-emerald-400">● LIVE GATEWAY READY</span>
              </div>
              <pre className="text-xs font-mono text-blue-200 overflow-x-auto leading-relaxed">
{`{
  "gateway": "Spring Cloud Gateway (BE-0)",
  "routing": {
    "/api/v1/auth/**": "Identity & JWT Service",
    "/api/v1/academics/**": "PostgreSQL (BE-1)",
    "/api/v1/people/**": "PostgreSQL (BE-2)",
    "/api/v1/scheduling/**": "PostgreSQL (BE-3)",
    "/api/v1/finance/**": "PostgreSQL (BE-4)",
    "/api/v1/cms/**": "MongoDB Document CMS (BE-5)"
  },
  "frontend": {
    "framework": "Next.js 16 (App Router) + React 19",
    "designSystem": "Invoicely DESIGN.md Tokens",
    "accessibility": "WCAG 2.1 AA Compliant"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#004bca]" />
            <span className="font-display font-bold text-slate-900 text-sm">Academics Pro</span>
            <span>— Enterprise SaaS Operating System</span>
          </div>
          <div className="flex items-center gap-6 text-slate-600 font-medium">
            <Link href="/" className="hover:text-[#004bca]">Platform Home</Link>
            <Link href="/school" className="hover:text-[#004bca]">Tenant School Site</Link>
            <Link href="/app" className="hover:text-[#004bca]">ERP Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
