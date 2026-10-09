"use client";

import React, { useState } from "react";
import { CalendarDays, Clock, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockTimetable } from "@/lib/api";

export default function ScheduleTimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Grade 11-A");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Academic Timetable & Schedule Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic conflict prevention across teachers, sections, and classroom laboratories (BE-3).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg">
            <CheckCircle2 className="w-4 h-4" /> Zero Double-Booking Conflicts
          </div>
          <Button variant="primary" size="sm">
            Auto-Generate Schedule
          </Button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
        <span className="font-semibold text-slate-600">Active Timetable View:</span>
        {["Grade 10-A", "Grade 11-A", "Grade 12-A"].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedClass(c)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedClass === c
                ? "bg-[#004bca] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="font-display font-bold text-sm text-slate-800">
            {selectedClass} — Standard Academic Week Matrix
          </div>
          <span className="text-xs text-slate-500">7 Periods Daily • 55 Minutes per Slot</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Period</th>
                <th className="py-3 px-6">Time Window</th>
                <th className="py-3 px-6">Subject / Course</th>
                <th className="py-3 px-6">Faculty Instructor</th>
                <th className="py-3 px-6">Room / Atelier</th>
                <th className="py-3 px-6 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTimetable.map((slot) => (
                <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-[#004bca]">Period {slot.period}</td>
                  <td className="py-3.5 px-6 font-mono text-slate-600">{slot.time}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{slot.subject}</td>
                  <td className="py-3.5 px-6 text-slate-700">{slot.teacherName}</td>
                  <td className="py-3.5 px-6 font-medium text-slate-600">{slot.roomNumber}</td>
                  <td className="py-3.5 px-6 text-right">
                    <Badge variant="success">Verified Conflict-Free</Badge>
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
