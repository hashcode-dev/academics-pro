"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Calendar,
  BookOpen,
  Layers,
  CheckCircle2,
  Plus,
  Users,
  DoorOpen,
  GraduationCap,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetchJson } from "@/lib/api";
import {
  CampusItem,
  AcademicYearItem,
  ClassGradeItem,
  SubjectItem,
  ClassroomItem,
  InstitutionOverview,
} from "@/lib/types";

export default function InstitutionPage() {
  const [activeTab, setActiveTab] = useState<"campuses" | "calendar" | "classes" | "subjects" | "rooms">("campuses");
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<InstitutionOverview | null>(null);
  const [campuses, setCampuses] = useState<CampusItem[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYearItem[]>([]);
  const [classGrades, setClassGrades] = useState<ClassGradeItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [classrooms, setClassrooms] = useState<ClassroomItem[]>([]);

  // Add Campus Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampus, setNewCampus] = useState({
    name: "",
    code: "",
    address: "",
    contactPhone: "",
    contactEmail: "",
    studentCapacity: 300,
    gradesOffered: "Grade 9–12",
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [ovData, cmpData, ayData, clsData, sbjData, rmData] = await Promise.all([
          fetchJson<InstitutionOverview>("/institution/overview"),
          fetchJson<CampusItem[]>("/institution/campuses"),
          fetchJson<AcademicYearItem[]>("/institution/academic-years"),
          fetchJson<ClassGradeItem[]>("/institution/classes"),
          fetchJson<SubjectItem[]>("/institution/subjects"),
          fetchJson<ClassroomItem[]>("/institution/classrooms"),
        ]);
        setOverview(ovData);
        setCampuses(cmpData);
        setAcademicYears(ayData);
        setClassGrades(clsData);
        setSubjects(sbjData);
        setClassrooms(rmData);
      } catch (err) {
        console.error("Error loading institution data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddCampus = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    try {
      const created = await fetchJson<CampusItem>("/institution/campuses", {
        method: "POST",
        body: JSON.stringify(newCampus),
      });

      const campusToAdd = created?.id
        ? created
        : {
            ...newCampus,
            id: `cmp-${Date.now().toString().slice(-4)}`,
            active: true,
          };

      setCampuses((prev) => [...prev, campusToAdd]);
      setIsModalOpen(false);
      setSuccessToast(`Facility "${newCampus.name}" provisioned successfully`);
      setNewCampus({
        name: "",
        code: "",
        address: "",
        contactPhone: "",
        contactEmail: "",
        studentCapacity: 300,
        gradesOffered: "Grade 9–12",
      });
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      console.error("Failed to add campus:", err);
    } finally {
      setModalSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
              Institution & Academic Infrastructure
            </h2>
            <Badge variant="primary">BE-1 PostgreSQL</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Multi-campus hierarchy, academic year calendars, class cohorts, subjects, and physical spaces.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5">
            <Plus className="w-4 h-4" /> Add Campus Facility
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 border-l-4 border-l-[#004bca]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Campuses
          </span>
          <div className="font-display font-black text-2xl text-slate-900 mt-1">
            {overview?.totalCampuses ?? campuses.length}
          </div>
          <span className="text-[11px] text-blue-600 font-medium">Cambridge & Annex</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#007f57]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Student Capacity
          </span>
          <div className="font-display font-black text-2xl text-slate-900 mt-1">
            {(overview?.totalStudentCapacity ?? 1750).toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">94.2% Allocated</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-indigo-600">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Current Year
          </span>
          <div className="font-display font-black text-xl text-slate-900 mt-1 truncate">
            {overview?.currentAcademicYear ?? "AY 2026–2027"}
          </div>
          <span className="text-[11px] text-indigo-600 font-medium">{overview?.currentTerm ?? "Fall Term 1"}</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Classes & Sections
          </span>
          <div className="font-display font-black text-2xl text-slate-900 mt-1">
            {overview?.totalClasses ?? 3} <span className="text-sm font-normal text-slate-400">/ {overview?.totalSections ?? 5} sec</span>
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Grades 10–12 IB/AP</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Rooms & Labs
          </span>
          <div className="font-display font-black text-2xl text-slate-900 mt-1">
            {overview?.totalClassrooms ?? classrooms.length}
          </div>
          <span className="text-[11px] text-purple-600 font-medium">100% Zero Conflict</span>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("campuses")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "campuses"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Campuses & Facilities ({campuses.length})
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "calendar"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Academic Calendar & Terms
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "classes"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Class Cohorts & Sections ({classGrades.length})
          </button>
          <button
            onClick={() => setActiveTab("subjects")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "subjects"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Subject Catalog ({subjects.length})
          </button>
          <button
            onClick={() => setActiveTab("rooms")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "rooms"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" /> Classrooms & Labs ({classrooms.length})
          </button>
        </nav>
      </div>

      {/* Tab 1: Campuses */}
      {activeTab === "campuses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campuses.map((c) => (
            <Card key={c.id || c.name} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004bca] flex items-center justify-center font-bold font-display text-sm">
                    {c.code || "CMP"}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900">{c.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" /> {c.address}
                    </div>
                  </div>
                </div>
                <Badge variant={c.active ? "success" : "neutral"}>
                  {c.active ? "Operational" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs pt-4 mt-2 border-t border-slate-100 bg-slate-50/60 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block font-medium text-[11px]">Capacity</span>
                  <span className="font-bold text-slate-800">{c.studentCapacity} Students</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium text-[11px]">Grades</span>
                  <span className="font-bold text-slate-800">{c.gradesOffered}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium text-[11px]">Phone</span>
                  <span className="font-bold text-slate-800 truncate block">
                    {c.contactPhone || "+1 (555) 382-9011"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 2: Calendar & Terms */}
      {activeTab === "calendar" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#004bca]" />
              <h3 className="font-display font-bold text-base text-slate-900">
                Academic Calendar & Term Boundaries
              </h3>
            </div>
            <Badge variant="primary">{academicYears[0]?.name || "AY 2026–2027"}</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Term Code</th>
                  <th className="pb-3">Academic Term</th>
                  <th className="pb-3">Start Date</th>
                  <th className="pb-3">End Date</th>
                  <th className="pb-3">Examination Window</th>
                  <th className="pb-3">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {academicYears.flatMap((ay) => ay.terms || []).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70">
                    <td className="py-3 font-mono font-medium text-slate-500">{t.id}</td>
                    <td className="py-3 font-semibold text-slate-900">{t.termName}</td>
                    <td className="py-3 text-slate-600">{t.startDate}</td>
                    <td className="py-3 text-slate-600">{t.endDate}</td>
                    <td className="py-3 text-slate-600">
                      {t.examStartDate ? `${t.examStartDate} – ${t.examEndDate}` : "Dec 10–17, 2026"}
                    </td>
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
      )}

      {/* Tab 3: Classes & Sections */}
      {activeTab === "classes" && (
        <div className="space-y-4">
          {classGrades.map((grade) => (
            <Card key={grade.id} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    G{grade.displayOrder}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">{grade.name}</h4>
                    <span className="text-[11px] text-slate-400">{grade.stage}</span>
                  </div>
                </div>
                <Badge variant="primary">{grade.sections.length} Sections</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {grade.sections.map((sec) => (
                  <div key={sec.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900">Section {sec.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{sec.roomNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Teacher: <span className="font-semibold text-slate-700">{sec.classTeacherName}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Enrollment</span>
                      <span className="font-bold text-slate-800">
                        {sec.currentEnrollment} / {sec.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-[#004bca] h-1.5 rounded-full"
                        style={{ width: `${(sec.currentEnrollment / sec.maxCapacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 4: Subjects */}
      {activeTab === "subjects" && (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Subject Code</th>
                  <th className="pb-3">Subject Title</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Curriculum</th>
                  <th className="pb-3">Credits</th>
                  <th className="pb-3">Weekly Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70">
                    <td className="py-3 font-mono font-bold text-[#004bca]">{s.code}</td>
                    <td className="py-3 font-semibold text-slate-900">{s.name}</td>
                    <td className="py-3 text-slate-600">{s.department}</td>
                    <td className="py-3">
                      <Badge variant="neutral">{s.curriculum}</Badge>
                    </td>
                    <td className="py-3 font-bold text-slate-800">{s.credits} Credits</td>
                    <td className="py-3 text-slate-600">{s.weeklyHours} hrs/wk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 5: Classrooms & Labs */}
      {activeTab === "rooms" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classrooms.map((rm) => (
            <Card key={rm.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                  <DoorOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-700">{rm.roomNumber}</span>
                    <Badge variant="neutral">{rm.roomType}</Badge>
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm mt-0.5">{rm.name}</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Capacity</span>
                <span className="font-bold text-slate-800 text-sm">{rm.capacity} Seats</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Campus Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#004bca]" />
                <h3 className="font-display font-bold text-lg text-slate-900">Provision Campus Facility</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCampus} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Name</label>
                <Input
                  required
                  placeholder="e.g. Apex Science & Arts Pavilion"
                  value={newCampus.name}
                  onChange={(e) => setNewCampus({ ...newCampus, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Code</label>
                  <Input
                    required
                    placeholder="e.g. CAM-PAV"
                    value={newCampus.code}
                    onChange={(e) => setNewCampus({ ...newCampus, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Capacity</label>
                  <Input
                    type="number"
                    required
                    min={1}
                    value={newCampus.studentCapacity}
                    onChange={(e) => setNewCampus({ ...newCampus, studentCapacity: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Address</label>
                <Input
                  required
                  placeholder="e.g. 750 Technology Square, Cambridge, MA"
                  value={newCampus.address}
                  onChange={(e) => setNewCampus({ ...newCampus, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <Input
                    placeholder="+1 (555) 382-9018"
                    value={newCampus.contactPhone}
                    onChange={(e) => setNewCampus({ ...newCampus, contactPhone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                  <Input
                    type="email"
                    placeholder="pavilion@apexhigh.edu"
                    value={newCampus.contactEmail}
                    onChange={(e) => setNewCampus({ ...newCampus, contactEmail: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cohort Scope / Grades</label>
                <Input
                  placeholder="e.g. Grade 9–12 (STEM & Arts Atelier)"
                  value={newCampus.gradesOffered}
                  onChange={(e) => setNewCampus({ ...newCampus, gradesOffered: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={modalSubmitting}>
                  {modalSubmitting ? "Provisioning..." : "Provision Facility"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
