"use client";

import React from "react";
import { Building2, Calendar, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function InstitutionPage() {
  const campuses = [
    { name: "Main Cambridge Campus", address: "742 Evergreen Crest, Cambridge, MA", studentCapacity: 1400, grades: "Pre-K to Grade 12", active: true },
    { name: "Apex Innovation Annex", address: "18 Tech Commons, Cambridge, MA", studentCapacity: 350, grades: "Grade 9 to 12 (STEM Atelier)", active: true },
  ];

  const academicTerms = [
    { name: "Fall Term 1", start: "Aug 25, 2026", end: "Dec 18, 2026", status: "CURRENT", exams: "Dec 10–17, 2026" },
    { name: "Spring Term 2", start: "Jan 12, 2027", end: "May 28, 2027", status: "UPCOMING", exams: "May 18–26, 2027" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Institution & Academic Infrastructure
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure campuses, academic terms, and class organizations according to institutional SOP.
          </p>
        </div>
        <Button variant="primary" size="sm">
          + Add New Campus Facility
        </Button>
      </div>

      {/* Campuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campuses.map((c) => (
          <Card key={c.name} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#004bca] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">{c.name}</h3>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">{c.address}</p>
            <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block font-medium">Capacity</span>
                <span className="font-bold text-slate-800">{c.studentCapacity} Students</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Cohort Scope</span>
                <span className="font-bold text-slate-800">{c.grades}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Academic Calendar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#004bca]" />
            <h3 className="font-display font-bold text-base text-slate-900">
              Academic Calendar & Term Boundaries
            </h3>
          </div>
          <Badge variant="primary">AY 2026–2027</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3">Academic Term</th>
                <th className="pb-3">Start Date</th>
                <th className="pb-3">End Date</th>
                <th className="pb-3">Examination Window</th>
                <th className="pb-3">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {academicTerms.map((t) => (
                <tr key={t.name}>
                  <td className="py-3 font-semibold text-slate-800">{t.name}</td>
                  <td className="py-3 text-slate-600">{t.start}</td>
                  <td className="py-3 text-slate-600">{t.end}</td>
                  <td className="py-3 text-slate-600">{t.exams}</td>
                  <td className="py-3">
                    <Badge variant={t.status === "CURRENT" ? "success" : "neutral"}>
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
