"use client";

import React from "react";
import Link from "next/link";
import {
  Users2,
  GraduationCap,
  DollarSign,
  CalendarCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  UserPlus,
  Receipt,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockStudents } from "@/lib/api";

export default function DashboardOverview() {
  const kpis = [
    {
      title: "Total Enrolled Students",
      value: "1,250",
      change: "+4.2% vs last term",
      trend: "up",
      icon: GraduationCap,
      color: "text-[#004bca]",
      bg: "bg-blue-50",
    },
    {
      title: "Today's Attendance Rate",
      value: "96.4%",
      change: "Above 95% target",
      trend: "up",
      icon: CalendarCheck,
      color: "text-[#007f57]",
      bg: "bg-emerald-50",
    },
    {
      title: "Fee Collections (Term 1)",
      value: "$3,890,250",
      change: "86.4% target met",
      trend: "up",
      icon: DollarSign,
      color: "text-[#712ae2]",
      bg: "bg-purple-50",
    },
    {
      title: "Active Faculty on Duty",
      value: "98 / 98",
      change: "100% schedule coverage",
      trend: "neutral",
      icon: Users2,
      color: "text-[#d97706]",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#004bca] to-[#0061ff] text-white shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AY 2026–27 Academic Active
          </div>
          <h2 className="font-display font-extrabold text-2xl tracking-tight">
            Welcome back, Dr. Arthur Vance
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            All 7 institutional microservices are connected. Timetable conflict engine reports zero double-bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/students">
            <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <UserPlus className="w-3.5 h-3.5 mr-1" /> Add Student
            </Button>
          </Link>
          <Link href="/app/finance">
            <Button variant="outline" size="sm" className="bg-white text-[#004bca] hover:bg-blue-50 border-white">
              <Receipt className="w-3.5 h-3.5 mr-1" /> Issue Invoices
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.title} className="p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {k.title}
                </span>
                <div className={`w-9 h-9 rounded-lg ${k.bg} ${k.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="font-display font-black text-2xl text-slate-900">
                  {k.value}
                </div>
                <div className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{k.change}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Schedule Integrity & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Student Records (UI-4 Mock Preview) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Recent Student Activity & Attendance
                </h3>
                <p className="text-xs text-slate-500">
                  Latest status from People & Admissions service (BE-2)
                </p>
              </div>
              <Link href="/app/students" className="text-xs font-bold text-[#004bca] hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Grade & Section</th>
                    <th className="pb-3">Attendance</th>
                    <th className="pb-3">GPA</th>
                    <th className="pb-3">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockStudents.slice(0, 4).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-semibold text-slate-800">
                        {s.name}
                        <span className="block text-[10px] text-slate-400 font-mono">{s.studentId}</span>
                      </td>
                      <td className="py-3 text-slate-600">{s.grade} • Sec {s.section}</td>
                      <td className="py-3">
                        <span className={`font-semibold ${s.attendanceRate >= 95 ? "text-emerald-600" : "text-amber-600"}`}>
                          {s.attendanceRate}%
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-700">{s.gpa.toFixed(2)}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            s.feeStatus === "PAID"
                              ? "success"
                              : s.feeStatus === "PENDING"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {s.feeStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Module Navigation Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/app/institution" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#004bca] transition-all group">
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#004bca] mb-1">
                Institution Setup →
              </div>
              <p className="text-[11px] text-slate-500">Campuses, academic calendar & term dates</p>
            </Link>
            <Link href="/app/schedule" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#004bca] transition-all group">
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#004bca] mb-1">
                Timetable Matrix →
              </div>
              <p className="text-[11px] text-slate-500">Live conflict detection and room scheduling</p>
            </Link>
            <Link href="/app/finance" className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#004bca] transition-all group">
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#004bca] mb-1">
                Fee & Payroll Desk →
              </div>
              <p className="text-[11px] text-slate-500">Tuition invoices, collections & payroll runs</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Platform Health & Alerts */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-slate-900">
                Platform Verification
              </h3>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Gateway Resolution (BE-0)</div>
                  <div className="text-slate-500">Tenant context bound to thread-local</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">JaCoCo Test Coverage</div>
                  <div className="text-slate-500">92.7% line coverage (&gt; 80% DoD gate)</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Timetable Conflict Engine</div>
                  <div className="text-slate-500">0 room or faculty overlaps detected</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">Tenant Website CMS (BE-5)</div>
                  <div className="text-slate-500">Connected to Meta Prompt school site</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>X-Tenant-ID: apex-high</span>
              <span>v1.0.0</span>
            </div>
          </Card>

          {/* SOP Compliance Quick Card */}
          <Card className="p-6 bg-[#eff4ff] border-blue-200">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#001d4f] mb-2">
              SOP Automated Reminders
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Monthly payroll run for October 2026 is scheduled for disbursement in 12 days. Fee reminder notifications dispatched to 14 defaulters.
            </p>
            <Link href="/app/finance">
              <Button variant="primary" size="sm" className="w-full">
                Review Financial Registry
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
