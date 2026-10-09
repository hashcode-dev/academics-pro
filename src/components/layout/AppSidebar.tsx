"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users2,
  CalendarDays,
  DollarSign,
  Globe2,
  ChevronDown,
  ShieldAlert,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { UserRole } from "@/lib/types";

interface AppSidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  tenantName: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRole,
  onRoleChange,
  tenantName,
}) => {
  const pathname = usePathname();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navigation = [
    { name: "Executive Overview", href: "/app", icon: LayoutDashboard },
    { name: "Institution & Campus", href: "/app/institution", icon: Building2 },
    { name: "Student Directory", href: "/app/students", icon: GraduationCap },
    { name: "Teachers & Faculty", href: "/app/teachers", icon: Users2 },
    { name: "Timetable & Schedule", href: "/app/schedule", icon: CalendarDays },
    { name: "Finance & Payroll", href: "/app/finance", icon: DollarSign },
    { name: "Website CMS Studio", href: "/app/cms", icon: Globe2 },
  ];

  const roles: UserRole[] = [
    "SCHOOL_ADMIN",
    "ACADEMIC_COORDINATOR",
    "TEACHER",
    "FINANCE_OFFICER",
    "STUDENT",
  ];

  return (
    <aside className="w-64 bg-[#213145] text-slate-200 flex flex-col shrink-0 min-h-screen border-r border-slate-700/50">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#004bca] flex items-center justify-center text-white font-black text-lg shadow-sm">
            AP
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white tracking-tight leading-none">
              Academics Pro
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate mt-1 max-w-[140px]">
              {tenantName}
            </div>
          </div>
        </Link>
      </div>

      {/* Role Impersonation / Selector Bar (for testing and quick demo) */}
      <div className="px-4 py-3 bg-[#192636] border-b border-slate-700/40">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Active Role</span>
          <span className="text-[#60a5fa] font-mono">RBAC</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#25374e] hover:bg-[#2c405b] rounded text-xs font-semibold text-white border border-slate-600/50 transition-colors"
          >
            <span className="truncate">{currentRole.replace("_", " ")}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c2a3d] border border-slate-600 rounded shadow-xl z-50 py-1">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRoleChange(r);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#25374e] transition-colors flex items-center justify-between ${
                    currentRole === r ? "text-[#60a5fa] font-bold bg-[#23354b]" : "text-slate-300"
                  }`}
                >
                  <span>{r.replace("_", " ")}</span>
                  {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core ERP Modules
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#004bca] text-white shadow-sm font-semibold"
                  : "text-slate-300 hover:bg-[#2a3d56] hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          External Surfaces
        </div>
        <Link
          href="/school"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#2a3d56] hover:text-white transition-all"
        >
          <span className="flex items-center gap-2.5">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>Public School Portal</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#2a3d56] hover:text-white transition-all"
        >
          <span className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>SaaS Product Page</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-700/60 bg-[#1a2737]">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#004bca] to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            AV
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">Dr. Arthur Vance</div>
            <div className="text-[10px] text-slate-400 truncate">Principal / Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
