"use client";

import React, { useState, useEffect } from "react";
import { Users2, Award, BookOpen, Mail, Phone, Search, Filter, Plus, X, CheckCircle2, Briefcase, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetchJson, mockTeachers } from "@/lib/api";
import { TeacherRecord } from "@/lib/types";

export default function TeachersDirectoryPage() {
  const [teachers, setTeachers] = useState<TeacherRecord[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(null);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    employeeId: `FAC-${Math.floor(Math.random() * 900 + 105)}`,
    designation: "Senior Subject Instructor",
    department: "Mathematics",
    subjects: "Advanced Calculus, Statistics",
    qualifications: "M.Sc. Applied Mathematics",
    assignedClasses: "Grade 11-A, Grade 12-A",
  });

  useEffect(() => {
    fetchJson<TeacherRecord[]>("/people/teachers")
      .then((data) => {
        if (data && data.length > 0) {
          setTeachers(data);
        }
      })
      .catch((err) => console.warn("Using fallback teachers:", err));
  }, []);

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newTeacher.name,
        employeeId: newTeacher.employeeId,
        designation: newTeacher.designation,
        department: newTeacher.department,
        subjects: newTeacher.subjects.split(",").map((s) => s.trim()),
        qualifications: newTeacher.qualifications,
        assignedClasses: newTeacher.assignedClasses.split(",").map((c) => c.trim()),
        status: "ACTIVE" as const,
      };

      const created = await fetchJson<TeacherRecord>("/people/teachers", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const onboarded: TeacherRecord = created?.id
        ? created
        : {
            id: `tch-${Date.now().toString().slice(-4)}`,
            employeeId: payload.employeeId,
            name: payload.name,
            designation: payload.designation,
            department: payload.department,
            subjects: payload.subjects,
            qualifications: payload.qualifications,
            assignedClasses: payload.assignedClasses,
            status: "ACTIVE",
          };

      setTeachers((prev) => [onboarded, ...prev]);
      setIsOnboardModalOpen(false);
      setNotification(`Faculty member ${newTeacher.name} successfully onboarded with Employee ID ${onboarded.employeeId}`);
      setTimeout(() => setNotification(null), 5000);
      setNewTeacher({
        name: "",
        employeeId: `FAC-${Math.floor(Math.random() * 900 + 105)}`,
        designation: "Senior Subject Instructor",
        department: "Mathematics",
        subjects: "Advanced Calculus, Statistics",
        qualifications: "M.Sc. Applied Mathematics",
        assignedClasses: "Grade 11-A, Grade 12-A",
      });
    } catch (err) {
      console.error("Failed to onboard teacher:", err);
    }
  };

  const departments = ["ALL", ...Array.from(new Set(teachers.map((t) => t.department)))];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = selectedDepartment === "ALL" || t.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Faculty & Academic Staff Dossiers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Teacher qualifications, subject assignments, department chairs, and schedule commitments (BE-2).
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsOnboardModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Onboard New Faculty Member
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Faculty Roster
          </span>
          <div className="text-2xl font-black font-display text-slate-900">{teachers.length}</div>
          <span className="text-xs text-slate-500 font-medium">98 Total Campus Staff</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Classroom Instructors
          </span>
          <div className="text-2xl font-black font-display text-[#004bca]">
            {teachers.filter((t) => t.status === "ACTIVE").length}
          </div>
          <span className="text-xs text-emerald-600 font-semibold">100% Active Allocation</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Department Chairs
          </span>
          <div className="text-2xl font-black font-display text-[#712ae2]">
            {departments.length - 1}
          </div>
          <span className="text-xs text-slate-500 font-medium">Academic Disciplines</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Student-to-Faculty Ratio
          </span>
          <div className="text-2xl font-black font-display text-[#007f57]">12:1</div>
          <span className="text-xs text-emerald-600 font-semibold">Exceeds CIS Benchmark</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by faculty name, employee ID, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Department:</span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedDepartment === dept
                  ? "bg-[#004bca] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeachers.map((t) => (
          <Card
            key={t.id}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer border-slate-200"
            onClick={() => setSelectedTeacher(t)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004bca] to-blue-400 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                  {t.name
                    .split(" ")
                    .filter((n) => !n.startsWith("Dr."))
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">{t.name}</h3>
                  <p className="text-xs text-[#004bca] font-semibold">{t.designation}</p>
                </div>
              </div>
              <Badge variant={t.status === "ACTIVE" ? "success" : "warning"}>{t.status}</Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#712ae2] shrink-0" />
                <span className="font-medium text-slate-800">{t.qualifications}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#004bca] shrink-0" />
                <span>Department: {t.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subjects: {t.subjects.join(", ")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Assigned: {t.assignedClasses.join(", ")}</span>
              <span className="font-mono text-slate-400 font-bold">{t.employeeId}</span>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-400 text-xs">
          No faculty members found matching your search or filter criteria.
        </div>
      )}

      {/* Onboard New Faculty Modal */}
      {isOnboardModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Onboard New Faculty Member
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Academic credentials, department assignment, and schedule workload.
                </p>
              </div>
              <button
                onClick={() => setIsOnboardModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <Input
                  required
                  placeholder="e.g. Dr. Catherine Ross"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employee ID</label>
                  <Input
                    required
                    value={newTeacher.employeeId}
                    onChange={(e) => setNewTeacher({ ...newTeacher, employeeId: e.target.value })}
                    className="text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physical Sciences">Physical Sciences</option>
                    <option value="Computer Science & AI">Computer Science & AI</option>
                    <option value="Administration & History">Administration & History</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                    <option value="Finance & Economics">Finance & Economics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Designation</label>
                <Input
                  required
                  placeholder="e.g. Chair of Robotics & AI Atelier"
                  value={newTeacher.designation}
                  onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highest Qualifications</label>
                <Input
                  required
                  placeholder="e.g. Ph.D. Mechanical Engineering, MIT"
                  value={newTeacher.qualifications}
                  onChange={(e) => setNewTeacher({ ...newTeacher, qualifications: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subjects (Comma separated)</label>
                  <Input
                    required
                    placeholder="Robotics HL, Applied Physics"
                    value={newTeacher.subjects}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Classes</label>
                  <Input
                    required
                    placeholder="Grade 11-A, Grade 12-A"
                    value={newTeacher.assignedClasses}
                    onChange={(e) => setNewTeacher({ ...newTeacher, assignedClasses: e.target.value })}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOnboardModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Complete Faculty Onboarding
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Faculty Dossier 360 Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004bca] to-blue-400 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                  {selectedTeacher.name
                    .split(" ")
                    .filter((n) => !n.startsWith("Dr."))
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">{selectedTeacher.name}</h3>
                  <p className="text-xs text-[#004bca] font-semibold">{selectedTeacher.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Employee ID</span>
                  <span className="font-mono font-bold text-slate-800">{selectedTeacher.employeeId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Department</span>
                  <span className="font-bold text-slate-800">{selectedTeacher.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Academic Status</span>
                  <Badge variant="success">{selectedTeacher.status}</Badge>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Class Load</span>
                  <span className="font-bold text-slate-800">{selectedTeacher.assignedClasses.join(", ")}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Academic Credentials & University</span>
                <p className="text-slate-700 bg-purple-50/50 p-3 rounded-lg border border-purple-100 font-medium">
                  {selectedTeacher.qualifications}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-1">Approved Curriculum Subjects</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTeacher.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-[#004bca] rounded-md font-semibold text-[11px]"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedTeacher(null)}>
                Close Dossier
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setNotification(`Timetable allocation scheduled for ${selectedTeacher.name}`);
                  setSelectedTeacher(null);
                  setTimeout(() => setNotification(null), 4000);
                }}
              >
                Inspect Schedule Allocation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
