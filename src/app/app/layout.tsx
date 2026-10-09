"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { UserRole } from "@/lib/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("SCHOOL_ADMIN");
  const [tenantName] = useState<string>("Apex High School");

  return (
    <div className="flex min-h-screen bg-[#f8f9ff]">
      {/* Executive Sidebar */}
      <AppSidebar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        tenantName={tenantName}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppNavbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
