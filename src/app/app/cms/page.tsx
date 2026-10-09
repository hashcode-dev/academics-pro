"use client";

import React, { useState, useEffect } from "react";
import {
  Globe2,
  FileText,
  CheckCircle2,
  Eye,
  Sparkles,
  Layers,
  Calendar,
  Quote,
  Building,
  ArrowRight,
  Save,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetchJson } from "@/lib/api";
import {
  TenantWebsiteFeed,
  CmsHeroSection,
  CmsAcademicProgram,
  CmsTestimonial,
  CmsSchoolEvent,
} from "@/lib/types";

export default function CMSStudioPage() {
  const [feed, setFeed] = useState<TenantWebsiteFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "programs" | "testimonials" | "events">("hero");

  // Editable Hero state
  const [heroForm, setHeroForm] = useState<CmsHeroSection>({
    headline: "",
    subhead: "",
    primaryCtaText: "",
    primaryCtaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
    badgeText: "",
    badgeHighlight: "",
    statsHighlights: [],
  });

  // New Event Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Open Day",
    eventDate: "2026-11-20",
    time: "10:00 AM – 01:00 PM EST",
    location: "Main Cambridge Campus",
    description: "Personal campus walkthrough with Academic Dean and department leads.",
    rsvpUrl: "/school#enquiry",
    featured: true,
  });

  const [notification, setNotification] = useState<{ type: "success" | "info"; message: string } | null>(null);

  useEffect(() => {
    async function loadCmsData() {
      try {
        setLoading(true);
        const data = await fetchJson<TenantWebsiteFeed>("/cms/tenant/apex-high");
        if (data) {
          setFeed(data);
          if (data.hero) {
            setHeroForm(data.hero);
          }
        }
      } catch (err) {
        console.error("Error fetching CMS feed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCmsData();
  }, []);

  const handleHeroSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feed) return;
    setFeed({
      ...feed,
      hero: { ...heroForm },
    });
    setNotification({
      type: "info",
      message: "Hero section staged locally. Click 'Publish Website Feed' to commit live to the school portal.",
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feed) return;
    const createdEvent: CmsSchoolEvent = {
      ...newEvent,
      id: `evt-${Date.now().toString().slice(-4)}`,
    };
    setFeed({
      ...feed,
      events: [...(feed.events || []), createdEvent],
    });
    setIsEventModalOpen(false);
    setNotification({
      type: "info",
      message: `Event "${newEvent.title}" staged. Ready for publishing.`,
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePublishAll = async () => {
    setPublishing(true);
    try {
      const res = await fetchJson<any>("/cms/publish?tenantId=apex-high", {
        method: "POST",
        body: JSON.stringify({
          hero: heroForm,
          programs: feed?.programs,
          testimonials: feed?.testimonials,
          facilities: feed?.facilities,
          admissionSteps: feed?.admissionSteps,
          events: feed?.events,
          news: feed?.news,
        }),
      });

      if (feed) {
        setFeed({
          ...feed,
          hero: heroForm,
          version: (feed.version || 1) + 1,
          publishedAt: new Date().toISOString(),
          publishedBy: "admin@apexhigh.edu",
        });
      }

      setNotification({
        type: "success",
        message: `Version ${res?.version || (feed?.version || 1) + 1} published live to apexhigh.edu!`,
      });
      setTimeout(() => setNotification(null), 6000);
    } catch (err) {
      console.error("Publishing error:", err);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
              Tenant Website CMS Content Studio
            </h2>
            <Badge variant="primary">BE-5 MongoDB Document Store</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Headless content management and live website feed compiler compliant with the School Meta Prompt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/school" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Preview Live School Website
            </Button>
          </a>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePublishAll}
            disabled={publishing}
            className="gap-1.5 bg-[#007f57] hover:bg-[#006a48] text-white"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {publishing ? "Compiling & Publishing..." : "Publish Website Feed"}
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`px-4 py-3 rounded-lg text-xs flex items-center justify-between animate-in fade-in ${
            notification.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-[#004bca]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Target Domain
          </span>
          <div className="font-display font-bold text-slate-900 text-base mt-1">apexhigh.edu</div>
          <span className="text-[11px] text-slate-400">Tenant Slug: apex-high</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#007f57]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Feed Compilation Status
          </span>
          <div className="font-display font-bold text-emerald-700 text-base mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live & Synced
          </div>
          <span className="text-[11px] text-emerald-600">Revision #{feed?.version ?? 1}</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-600">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Managed Collections
          </span>
          <div className="font-display font-bold text-slate-900 text-base mt-1">
            4 Core Schemas
          </div>
          <span className="text-[11px] text-purple-600">Hero, Programs, Testimonials, Events</span>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Last Published
          </span>
          <div className="font-display font-bold text-slate-900 text-sm mt-1 truncate">
            {feed?.publishedAt ? new Date(feed.publishedAt).toLocaleTimeString() : "Just now"}
          </div>
          <span className="text-[11px] text-slate-400">By {feed?.publishedBy ?? "system-init"}</span>
        </Card>
      </div>

      {/* Editor Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSection("hero")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSection === "hero"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" /> Hero & Brand Proposition
          </button>
          <button
            onClick={() => setActiveSection("programs")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSection === "programs"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Academic Programs ({feed?.programs?.length ?? 3})
          </button>
          <button
            onClick={() => setActiveSection("testimonials")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSection === "testimonials"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Quote className="w-3.5 h-3.5" /> Testimonials & Outomes ({feed?.testimonials?.length ?? 3})
          </button>
          <button
            onClick={() => setActiveSection("events")}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeSection === "events"
                ? "border-[#004bca] text-[#004bca]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Open Days & School Events ({feed?.events?.length ?? 2})
          </button>
        </nav>
      </div>

      {/* Section 1: Hero Section Editor */}
      {activeSection === "hero" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Hero Section Content Editor
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary above-the-fold value proposition seen by prospective families visiting the school website.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleHeroSave} className="gap-1.5">
              <Save className="w-4 h-4" /> Save Hero Section
            </Button>
          </div>

          <form onSubmit={handleHeroSave} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Main Headline (Hero Title)
              </label>
              <Input
                value={heroForm.headline || ""}
                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                placeholder="Empowering Tomorrow's Pioneers, Thinkers & Leaders"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subheading / Value Narrative
              </label>
              <textarea
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004bca] text-slate-800 leading-relaxed"
                rows={3}
                value={heroForm.subhead || ""}
                onChange={(e) => setHeroForm({ ...heroForm, subhead: e.target.value })}
                placeholder="An elite K-12 preparatory academy offering International Baccalaureate (IB) Diploma and AP Capstone pathways..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary CTA Button Label
                </label>
                <Input
                  value={heroForm.primaryCtaText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                  placeholder="Book a Campus Tour"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary CTA Link
                </label>
                <Input
                  value={heroForm.primaryCtaLink || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                  placeholder="/school#admissions"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary CTA Button Label
                </label>
                <Input
                  value={heroForm.secondaryCtaText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                  placeholder="Explore Academic Curricula"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary CTA Link
                </label>
                <Input
                  value={heroForm.secondaryCtaLink || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                  placeholder="/school#academics"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Top Trust Badge Text
                </label>
                <Input
                  value={heroForm.badgeText || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                  placeholder="Top 1% Global STEM & Humanities Ranking"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badge Highlight Metric
                </label>
                <Input
                  value={heroForm.badgeHighlight || ""}
                  onChange={(e) => setHeroForm({ ...heroForm, badgeHighlight: e.target.value })}
                  placeholder="100% IB Diploma Pass Rate"
                />
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Section 2: Academic Programs */}
      {activeSection === "programs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">
              Academic Program Pathways (School Website Collection)
            </h3>
            <Badge variant="primary">{feed?.programs?.length ?? 3} Active Programs</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feed?.programs?.map((prog) => (
              <Card key={prog.id} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="neutral">{prog.level}</Badge>
                    <span className="text-[11px] font-semibold text-slate-400">{prog.ageGroup}</span>
                  </div>
                  <h4 className="font-display font-bold text-slate-900 text-sm mb-2">{prog.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{prog.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Accreditation</span>
                  <div className="text-xs font-bold text-[#004bca]">{prog.accreditation}</div>
                  <span className="text-[11px] text-slate-400 block mt-1">Lead: {prog.coordinatorName}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Testimonials */}
      {activeSection === "testimonials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">
              Named Social Proof & Student Outcomes
            </h3>
            <Badge variant="success">Verified Matriculations</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feed?.testimonials?.map((t) => (
              <Card key={t.id} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-3">
                    {"★".repeat(5)} <span className="text-slate-400 font-bold ml-1">5.0</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="font-bold text-xs text-slate-900">{t.authorName}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-[#004bca] font-mono text-[10px] font-bold">
                    🎓 {t.universityBadge}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Events */}
      {activeSection === "events" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                School Open Days & Academic Events
              </h3>
              <p className="text-xs text-slate-500">Live booking slots surfaced directly on the school portal.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsEventModalOpen(true)} className="gap-1.5">
              <Plus className="w-4 h-4" /> Add Event Slot
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feed?.events?.map((evt) => (
              <Card key={evt.id} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary">{evt.category}</Badge>
                  {evt.featured && <Badge variant="success">Featured</Badge>}
                </div>
                <h4 className="font-display font-bold text-slate-900 text-sm mb-1">{evt.title}</h4>
                <p className="text-xs text-slate-500 mb-3">{evt.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium">Date & Time</span>
                    <span className="font-bold text-slate-800">{evt.eventDate} ({evt.time})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Location</span>
                    <span className="font-bold text-slate-800">{evt.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#004bca]" />
                <h3 className="font-display font-bold text-lg text-slate-900">Add School Event Slot</h3>
              </div>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                <Input
                  required
                  placeholder="e.g. Winter Open House & Campus Tour"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <Input
                    required
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Date</label>
                  <Input
                    type="date"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Window</label>
                  <Input
                    required
                    placeholder="10:00 AM – 01:00 PM EST"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Location</label>
                  <Input
                    required
                    placeholder="Main Cambridge Campus"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Description</label>
                <textarea
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004bca] text-slate-800"
                  rows={2}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEventModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Stage Event Slot
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
