"use client";

import React, { useState } from "react";
import { Globe2, FileText, CheckCircle2, Eye, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function CMSStudioPage() {
  const [published, setPublished] = useState(true);

  const sections = [
    { title: "Hero Section & Value Proposition", type: "Document", lastModified: "2 hours ago", status: "PUBLISHED" },
    { title: "Programs & Curriculum Pathways (4 Cards)", type: "Collection", lastModified: "Yesterday", status: "PUBLISHED" },
    { title: "Trust Bar Statistics & Accreditations", type: "Document", lastModified: "3 days ago", status: "PUBLISHED" },
    { title: "Social Proof & Named Testimonials", type: "Collection", lastModified: "Oct 2, 2026", status: "PUBLISHED" },
    { title: "Upcoming Open Day Events (3 Bookable Sessions)", type: "Collection", lastModified: "Oct 5, 2026", status: "PUBLISHED" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Tenant Website CMS Content Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Headless content management powered by MongoDB document store (BE-5).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/school" target="_blank">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Preview Live School Website
            </Button>
          </a>
          <Button variant="primary" size="sm" onClick={() => setPublished(!published)}>
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Publish Content Updates
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-l-4 border-l-[#004bca]">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Website Domain Target
          </span>
          <div className="font-display font-bold text-slate-900 text-base">apexhigh.edu</div>
          <span className="text-xs text-slate-400">Tenant: apex-high</span>
        </Card>

        <Card className="p-5 border-l-4 border-l-[#007f57]">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            CMS Document Store
          </span>
          <div className="font-display font-bold text-slate-900 text-base">MongoDB Atlas Cluster</div>
          <span className="text-xs text-emerald-600 font-semibold">Schema: Content CMS (BE-5)</span>
        </Card>

        <Card className="p-5 border-l-4 border-l-[#712ae2]">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Published Deployment Status
          </span>
          <div className="font-display font-bold text-[#007f57] text-base flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Live & Synced
          </div>
          <span className="text-xs text-slate-400">Meta Prompt Compliant</span>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="font-display font-bold text-sm text-slate-800">
            Managed Content Documents & Schemas
          </div>
          <Badge variant="primary">5 Active Models</Badge>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {sections.map((s) => (
            <div key={s.title} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#004bca]" />
                <div>
                  <div className="font-semibold text-slate-900">{s.title}</div>
                  <div className="text-[11px] text-slate-400">Type: {s.type} • Modified: {s.lastModified}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="success">{s.status}</Badge>
                <Button variant="outline" size="sm">
                  Edit Content
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
