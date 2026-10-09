"use client";

import React, { useState } from "react";
import { GraduationCap, Search, Filter, UserCheck, Eye, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockStudents } from "@/lib/api";
import { StudentRecord } from "@/lib/types";

export default function StudentsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filtered = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Student Lifecycle Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Operational pupil dossiers managed via People & Admissions service (BE-2)
          </p>
        </div>
        <Button variant="primary" size="sm">
          + Enroll New Student
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, ID or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#004bca]/30"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {mockStudents.length} students
        </div>
      </div>

      {/* Students Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr className="text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Student Dossier</th>
                <th className="py-3.5 px-6">Class Division</th>
                <th className="py-3.5 px-6">Attendance</th>
                <th className="py-3.5 px-6">Cumulative GPA</th>
                <th className="py-3.5 px-6">Guardian Contact</th>
                <th className="py-3.5 px-6">Tuition Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#004bca] font-bold flex items-center justify-center text-xs">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span>{s.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">
                          {s.studentId}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {s.grade} • Sec {s.section}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${s.attendanceRate >= 95 ? "text-emerald-600" : "text-amber-600"}`}>
                      {s.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-800">
                    {s.gpa.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div>{s.guardianName}</div>
                    <div className="text-[10px] text-slate-400">{s.guardianPhone}</div>
                  </td>
                  <td className="py-4 px-6">
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
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStudent(s)}
                      className="gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> 360° Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Julian Voss / Student 360 Modal Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 bg-white shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#004bca] to-purple-600 text-white font-display font-bold text-xl flex items-center justify-center shadow-md">
                {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-slate-900">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  ID: {selectedStudent.studentId} • {selectedStudent.grade} Section {selectedStudent.section}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-medium">Attendance Rate</span>
                <span className="text-sm font-bold text-emerald-600">{selectedStudent.attendanceRate}%</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Cumulative GPA</span>
                <span className="text-sm font-bold text-slate-900">{selectedStudent.gpa.toFixed(2)} / 4.0</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Guardian</span>
                <span className="font-semibold text-slate-800">{selectedStudent.guardianName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Fee Standing</span>
                <Badge variant={selectedStudent.feeStatus === "PAID" ? "success" : "danger"}>
                  {selectedStudent.feeStatus}
                </Badge>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedStudent(null)}>
                Edit Academic Records
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
