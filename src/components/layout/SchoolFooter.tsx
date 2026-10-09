import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const SchoolFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: About Institution */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#004bca] flex items-center justify-center text-white font-display font-black text-lg">
                A
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Apex High School
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              A premier independent day and boarding institution dedicated to intellectual curiosity, moral courage, and holistic human flourishing from Kindergarten through Grade 12.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0061ff]" />
                <span>742 Evergreen Crest, Cambridge, MA 02138</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0061ff]" />
                <span>+1 (555) 382-9011 (Admissions Office)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0061ff]" />
                <span>admissions@apexhigh.edu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Pathways */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Academic Pathways
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#programs" className="hover:text-white transition-colors">Primary Years (PYP)</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Middle Years (MYP)</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">IB Diploma Programme</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Advanced Placement (AP)</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Robotics & AI Atelier</a></li>
            </ul>
          </div>

          {/* Col 3: Admissions & Life */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Admissions & Aid
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#enquiry" className="hover:text-white transition-colors">Admissions Inquiry</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Book Open Day</a></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Scholarship Program</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tuition & Financial Aid</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Campus Tour Gallery</span></li>
            </ul>
          </div>

          {/* Col 4: Trust & Safeguarding */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Governance & Safety
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> Safeguarding Certified
              </li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Child Protection Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Accessibility Statement</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Inspection Reports (CIS)</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy & GDPR</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Apex High School. Registered Educational Trust #ED-884920. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400">Powered by Academics Pro SaaS</Link>
            <Link href="/app" className="hover:text-slate-400">Staff & Student Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
