"use client";

import React from "react";
import { Users2, Award, BookOpen, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockTeachers } from "@/lib/api";

export default function TeachersDirectoryPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Faculty & Academic Staff Dossiers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Teacher qualifications, subject assignments, and schedule commitments.
          </p>
        </div>
        <Button variant="primary" size="sm">
          + Onboard New Faculty Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeachers.map((t) => (
          <Card key={t.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004bca] to-blue-400 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">{t.name}</h3>
                  <p className="text-xs text-[#004bca] font-semibold">{t.designation}</p>
                </div>
              </div>
              <Badge variant="success">{t.status}</Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#712ae2]" />
                <span className="font-medium">{t.qualifications}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#004bca]" />
                <span>Department: {t.department}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Assigned: {t.assignedClasses.join(", ")}</span>
              <span className="font-mono text-slate-400">{t.employeeId}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
