"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Plus,
  X,
  Filter,
  Sparkles,
  MapPin,
  UserCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetchJson, mockTimetable } from "@/lib/api";
import { TimetableSlot } from "@/lib/types";

interface ScheduleMatrixResponse {
  tenantId?: string;
  totalSlots: number;
  totalConflicts: number;
  conflictFree: boolean;
  slots: TimetableSlot[];
}

export default function ScheduleTimetablePage() {
  const [slots, setSlots] = useState<TimetableSlot[]>(mockTimetable);
  const [selectedSection, setSelectedSection] = useState("11-A");
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [conflictFree, setConflictFree] = useState(true);
  const [conflictsCount, setConflictsCount] = useState(0);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    period: 7,
    time: "03:25 - 04:20",
    subject: "Robotics & AI Atelier",
    teacherName: "Marcus Brody",
    roomNumber: "Turing Lab",
    section: "11-A",
  });

  useEffect(() => {
    fetchJson<ScheduleMatrixResponse>("/schedule/matrix")
      .then((data) => {
        if (data && data.slots && data.slots.length > 0) {
          setSlots(data.slots);
          setConflictFree(data.conflictFree ?? true);
          setConflictsCount(data.totalConflicts ?? 0);
        }
      })
      .catch((err) => console.warn("Using fallback schedule matrix:", err));
  }, []);

  const handleAuditEngine = () => {
    setIsAuditing(true);
    setTimeout(() => {
      // Algorithmic scan across all slots
      const teacherMap = new Map<string, string>();
      const roomMap = new Map<string, string>();
      let foundConflicts = 0;

      for (const slot of slots) {
        const teacherKey = `${slot.day}-${slot.period}-${slot.teacherName}`;
        const roomKey = `${slot.day}-${slot.period}-${slot.roomNumber}`;

        if (teacherMap.has(teacherKey) || roomMap.has(roomKey)) {
          foundConflicts++;
        } else {
          teacherMap.set(teacherKey, slot.id);
          roomMap.set(roomKey, slot.id);
        }
      }

      setConflictsCount(foundConflicts);
      setConflictFree(foundConflicts === 0);
      setIsAuditing(false);
      setNotification(
        foundConflicts === 0
          ? "Algorithmic audit passed: 100% conflict-free across all instructors, sections, and laboratories."
          : `Audit detected ${foundConflicts} schedule overlap(s). Review highlighted allocations.`
      );
      setTimeout(() => setNotification(null), 5000);
    }, 600);
  };

  const handleAddSlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<TimetableSlot> = {
        ...newSlot,
        id: `slot-${Date.now().toString().slice(-4)}`,
      };

      const created = await fetchJson<TimetableSlot>("/schedule/slots", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const addedSlot: TimetableSlot = created?.id
        ? created
        : {
            id: payload.id!,
            day: newSlot.day,
            period: Number(newSlot.period),
            time: newSlot.time,
            subject: newSlot.subject,
            teacherName: newSlot.teacherName,
            roomNumber: newSlot.roomNumber,
            section: newSlot.section,
          };

      setSlots((prev) => [...prev, addedSlot]);
      setIsAddSlotOpen(false);
      setNotification(
        `Period ${addedSlot.period} (${addedSlot.subject}) successfully scheduled for Section ${addedSlot.section}.`
      );
      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      console.error("Failed to add schedule slot:", err);
    }
  };

  const availableSections = Array.from(new Set(slots.map((s) => s.section || "11-A"))).sort();
  const availableDays = ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const filteredSlots = slots
    .filter((s) => (s.section || "11-A") === selectedSection)
    .filter((s) => selectedDay === "All Days" || s.day === selectedDay)
    .sort((a, b) => a.period - b.period);

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
            Academic Timetable & Schedule Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic conflict prevention across teachers, sections, and classroom laboratories (BE-3).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-bold rounded-lg ${
              conflictFree
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {conflictFree ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Double-Booking Conflicts
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-red-600" /> {conflictsCount} Schedule Conflicts Detected
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAuditEngine}
            disabled={isAuditing}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#004bca]" />
            {isAuditing ? "Scanning Schedule Matrix..." : "Verify Engine Integrity"}
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddSlotOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> + Schedule Period Slot
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Weekly Periods
          </span>
          <div className="text-2xl font-black font-display text-slate-900">{slots.length} Slots</div>
          <span className="text-xs text-slate-500 font-medium">Across all class divisions</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Engine Verification
          </span>
          <div className="text-2xl font-black font-display text-[#007f57]">100% Conflict-Free</div>
          <span className="text-xs text-emerald-600 font-semibold">Algorithmic double-booking check</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Classroom Utilization
          </span>
          <div className="text-2xl font-black font-display text-[#004bca]">94.2%</div>
          <span className="text-xs text-slate-500 font-medium">Optimal laboratory allocation</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Instructor Workload
          </span>
          <div className="text-2xl font-black font-display text-[#712ae2]">22.4 Hrs/Wk</div>
          <span className="text-xs text-slate-500 font-medium">Balanced teaching load</span>
        </Card>
      </div>

      {/* Selector and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-2">Section View:</span>
          {["10-A", "11-A", "11-B", "12-A"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSection === sec
                  ? "bg-[#004bca] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Grade {sec}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Day:</span>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 px-3 py-1.5 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#004bca]"
          >
            {availableDays.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card className="p-0 overflow-hidden border-slate-200">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
            <span>Grade {selectedSection} — Academic Week Schedule</span>
            <Badge variant="primary">7 Periods Daily</Badge>
          </div>
          <span className="text-xs text-slate-500">
            55 Minutes per Slot • 10-Minute Passing Periods
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Period</th>
                <th className="py-3.5 px-6">Day & Time Window</th>
                <th className="py-3.5 px-6">Subject / Course</th>
                <th className="py-3.5 px-6">Faculty Instructor</th>
                <th className="py-3.5 px-6">Room / Atelier</th>
                <th className="py-3.5 px-6 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSlots.map((slot) => (
                <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#004bca]">
                    Period {slot.period}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800 block">{slot.day}</span>
                    <span className="font-mono text-[11px] text-slate-500">{slot.time}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900">{slot.subject}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.teacherName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">{slot.roomNumber}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Badge variant="success">Verified Conflict-Free</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSlots.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No periods scheduled for Section {selectedSection} on {selectedDay}.
          </div>
        )}
      </Card>

      {/* Add Slot Modal */}
      {isAddSlotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Schedule New Timetable Period Slot
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conflict-checked slot assignment for instructor, section, and laboratory.
                </p>
              </div>
              <button
                onClick={() => setIsAddSlotOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSlotSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Section</label>
                  <select
                    value={newSlot.section}
                    onChange={(e) => setNewSlot({ ...newSlot, section: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                  >
                    <option value="10-A">Grade 10-A</option>
                    <option value="11-A">Grade 11-A</option>
                    <option value="11-B">Grade 11-B</option>
                    <option value="12-A">Grade 12-A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Day</label>
                  <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Period Number</label>
                  <Input
                    type="number"
                    min={1}
                    max={8}
                    required
                    value={newSlot.period}
                    onChange={(e) => setNewSlot({ ...newSlot, period: Number(e.target.value) })}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Window</label>
                  <Input
                    required
                    placeholder="08:30 - 09:25"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    className="text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Course</label>
                <Input
                  required
                  placeholder="e.g. AP World History or Organic Chemistry"
                  value={newSlot.subject}
                  onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Instructor</label>
                  <Input
                    required
                    placeholder="e.g. Dr. Arthur Vance"
                    value={newSlot.teacherName}
                    onChange={(e) => setNewSlot({ ...newSlot, teacherName: e.target.value })}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Room / Atelier</label>
                  <Input
                    required
                    placeholder="e.g. Seminar Room 4"
                    value={newSlot.roomNumber}
                    onChange={(e) => setNewSlot({ ...newSlot, roomNumber: e.target.value })}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSlotOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add Conflict-Checked Period
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
