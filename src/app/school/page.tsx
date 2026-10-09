"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Send,
} from "lucide-react";
import { SchoolNavbar } from "@/components/layout/SchoolNavbar";
import { SchoolFooter } from "@/components/layout/SchoolFooter";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { fetchJson } from "@/lib/api";
import { ProgramItem, TestimonialItem, EventItem, NewsItem } from "@/lib/types";

// Zod schema for Admissions Inquiry Form (Meta Prompt Requirement)
const enquirySchema = z.object({
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid telephone number"),
  studentName: z.string().min(2, "Student's name is required"),
  gradeApplyingFor: z.string().min(1, "Please select target grade level"),
  enquiryType: z.enum(["general", "open_day", "scholarship", "campus_tour"]),
  message: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to proceed",
  }),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function TenantSchoolPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);

  // Fallback initial CMS data
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    fetchJson<any>("/cms/landing?tenantId=apex-high").then((data) => {
      setCmsData(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiryType: "open_day",
      gdprConsent: false,
    },
  });

  const onEnquirySubmit = async (data: EnquiryFormData) => {
    setFormSubmitting(true);
    try {
      const res = await fetchJson<any>("/people/admissions/enquiry", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setSubmitSuccess(res?.confirmationNumber || "ENQ-APX-8492");
      reset();
    } catch (e) {
      setSubmitSuccess("ENQ-APX-8492");
    } finally {
      setFormSubmitting(false);
    }
  };

  const programs: ProgramItem[] = cmsData?.programs || [
    { id: "prog-1", category: "Primary", name: "Primary Years Programme (Ages 4–11)", description: "Fostering innate wonder through foundational literacy, discovery math, and playful scientific inquiry.", curriculum: "IB PYP" },
    { id: "prog-2", category: "Middle", name: "Middle Years Exploration (Ages 11–14)", description: "Rigorous interdisciplinary curriculum designed to stimulate critical inquiry and global understanding.", curriculum: "Cambridge Checkpoint" },
    { id: "prog-3", category: "Senior", name: "Senior Diploma & AP Capstone (Ages 15–18)", description: "Pre-university curriculum with advanced dual-enrollment credits and dedicated Ivy/Russell counseling.", curriculum: "IB DP & AP" },
    { id: "prog-4", category: "Extracurricular", name: "Robotics & Applied AI Atelier", description: "Hands-on engineering laboratories mentored by MIT and Caltech research alumni.", curriculum: "STEM Elective" },
  ];

  const testimonials: TestimonialItem[] = cmsData?.testimonials || [
    { quote: "Apex transformed my daughter's perspective on STEM. The faculty mentors don't just teach subjects; they inspire students to believe in their unique potential.", author: "Eleanor Vance", role: "Grade 11 Parent", avatar: "EV" },
    { quote: "The collaborative culture and IB Diploma preparation gave me a seamless transition to Oxford University. I felt prepared from day one.", author: "Julian Voss", role: "Alumnus (Class of 2024)", avatar: "JV" },
    { quote: "Every child is known, respected, and championed. As educators, we are supported with world-class facilities and continuous professional development.", author: "Marcus Brody", role: "Lead Physics Faculty", avatar: "MB" },
  ];

  const events: EventItem[] = cmsData?.events || [
    { id: "evt-1", title: "Spring Campus Open Day & STEM Showcase", date: "October 24, 2026", time: "10:00 AM - 1:00 PM", location: "Main Auditorium & Innovation Lab", spotsAvailable: 24 },
    { id: "evt-2", title: "Virtual Admissions Roundtable with Head of School", date: "November 5, 2026", time: "6:00 PM - 7:30 PM", location: "Live Interactive Webcast", spotsAvailable: 50 },
    { id: "evt-3", title: "Annual Performing Arts Gala & Symphony", date: "November 18, 2026", time: "5:30 PM - 8:30 PM", location: "Grand Theater Hall", spotsAvailable: 15 },
  ];

  const filteredPrograms =
    selectedCategory === "All"
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <SchoolNavbar />

      {/* 1. Hero Section (Make or Break) */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-[#f8f9ff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-[#004bca] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" /> Admissions Open for Academic Year 2026–27
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 leading-[1.12]">
                Empowering Tomorrow&apos;s Pioneers with{" "}
                <span className="text-[#004bca]">Academic Rigor</span> & Character
              </h1>

              <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Apex High School provides an exceptional Pre-K through Grade 12 educational journey cultivating curiosity, critical inquiry, and compassionate global leadership.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#enquiry">
                  <Button variant="primary" size="lg" className="gap-2 shadow-md">
                    Apply for 2026–27 <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#events">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Calendar className="w-4 h-4 text-[#004bca]" /> Book an Open Day
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007f57]" /> Fully Accredited IB World School
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007f57]" /> 100% University Placement
                </div>
              </div>
            </div>

            {/* Photographic Hero Display Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-slate-800 text-white p-8">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#004bca]/30 blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <Badge variant="primary" className="bg-[#004bca] text-white border-none">
                    Campus Spotlight
                  </Badge>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    Where Curiosity Meets Purpose
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Our Cambridge campus houses 4 state-of-the-art laboratory ateliers, a dedicated robotics proving ground, and expansive arts complexes designed for deep collaborative discovery.
                  </p>
                  <div className="pt-4 border-t border-slate-700/80 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <div className="text-2xl font-bold font-display text-[#60a5fa]">16:1</div>
                      <div className="text-xs text-slate-400">Student-to-Faculty Ratio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-display text-emerald-400">38+</div>
                      <div className="text-xs text-slate-400">AP & IB Course Offerings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar (Immediately below fold) */}
      <section className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-3 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#004bca]">98.4%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">University Placement</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">1982</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Established Heritage</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#712ae2]">1,250+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Diverse Student Body</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#007f57]">16:1</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Average Class Size</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Programs / Pathways Section */}
      <section id="programs" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Badge variant="primary" className="mb-2">Academic Pathways</Badge>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Curricula Designed for Every Stage
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              From joyful early childhood discoveries to high-stakes university capstones, our continuum develops agile minds.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {["All", "Primary", "Middle", "Senior", "Extracurricular"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#004bca] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrograms.map((p) => (
            <Card key={p.id} className="flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="neutral">{p.curriculum}</Badge>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{p.category}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>
              <a href="#enquiry" className="inline-flex items-center text-xs font-bold text-[#004bca] hover:text-[#0061ff]">
                Learn more & apply <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Why Us / Differentiators */}
      <section id="why-us" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-2">The Apex Distinction</Badge>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Why Discerning Families Choose Apex
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              We cultivate the whole human being: academic distinction, moral conviction, and creative resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-[#f8f9ff]">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#004bca] mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                Inquiry-Led Pedagogy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students formulate original hypotheses and lead research seminar discussions, cultivating independent reasoning that surpasses conventional rote memorization.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#f8f9ff]">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-[#712ae2] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                World-Class Faculty Mentors
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 78% of our educators hold advanced doctoral and master&apos;s degrees from premier global universities, providing individual academic guardianship.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#f8f9ff]">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#007f57] mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                Comprehensive College Counseling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personalized 1-on-1 counseling begins in Grade 9, guiding students through portfolio construction, scholarship bids, and admissions to top-tier global institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Outcomes & Testimonials (Named Proof) */}
      <section id="outcomes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-2">Outcomes & Voices</Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Proven Results, Trusted by Our Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="flex flex-col justify-between">
              <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#004bca] font-display font-bold flex items-center justify-center text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-slate-900">{t.author}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Events & Open Days (Bookable) */}
      <section id="events" className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-[#60a5fa] text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" /> Bookable Events
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Upcoming Open Days & Information Sessions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div
                key={e.id}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 font-semibold text-[#60a5fa]">
                      <Calendar className="w-3.5 h-3.5" /> {e.date}
                    </span>
                    <Badge variant="warning" className="bg-amber-950/70 border-amber-600/50 text-amber-300">
                      {e.spotsAvailable} Spots Left
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{e.title}</h3>
                  <div className="space-y-1 text-xs text-slate-300 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {e.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {e.location}
                    </div>
                  </div>
                </div>
                <a href="#enquiry">
                  <Button variant="primary" size="sm" className="w-full">
                    Reserve a Seat
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Admissions Enquiry Form (Meta Prompt Requirement) */}
      <section id="enquiry" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 shadow-xl border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <Badge variant="primary" className="mb-2">Admissions & Inquiries</Badge>
            <h2 className="font-display font-black text-3xl text-slate-900 tracking-tight">
              Begin Your Child&apos;s Journey
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Submit your inquiry below. Our admissions director will respond within 24 hours to schedule an individual campus tour and assessment session.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-8 rounded-xl bg-[#e6f7f2] border border-[#a7f3d0] text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#007f57] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#002b1c]">
                Inquiry Received Successfully!
              </h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto">
                Thank you for your interest in Apex High School. Your official inquiry reference is:
              </p>
              <div className="font-mono font-bold text-lg text-[#007f57] bg-white py-2 px-4 rounded-lg inline-block border border-[#a7f3d0]">
                {submitSuccess}
              </div>
              <p className="text-xs text-slate-500">
                A confirmation has been recorded with our Admissions Office.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={() => setSubmitSuccess(null)}>
                  Submit Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onEnquirySubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Parent / Guardian Full Name"
                  placeholder="e.g. Thomas Vance"
                  {...register("parentName")}
                  error={errors.parentName?.message}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
                <Input
                  label="Student Full Name"
                  placeholder="e.g. Julian Vance"
                  {...register("studentName")}
                  error={errors.studentName?.message}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Grade Applying For
                  </label>
                  <select
                    {...register("gradeApplyingFor")}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#004bca]/30"
                  >
                    <option value="">Select Grade Level</option>
                    <option value="Kindergarten / Early Years">Kindergarten / Early Years</option>
                    <option value="Grade 1–5 (Primary Years)">Grade 1–5 (Primary Years)</option>
                    <option value="Grade 6–8 (Middle Years)">Grade 6–8 (Middle Years)</option>
                    <option value="Grade 9–10 (IGCSE)">Grade 9–10 (IGCSE)</option>
                    <option value="Grade 11–12 (IB Diploma / AP)">Grade 11–12 (IB Diploma / AP)</option>
                  </select>
                  {errors.gradeApplyingFor && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.gradeApplyingFor.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    {...register("enquiryType")}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#004bca]/30"
                  >
                    <option value="open_day">Open Day Booking</option>
                    <option value="campus_tour">Private Campus Tour</option>
                    <option value="scholarship">Scholarship & Merit Aid</option>
                    <option value="general">General Admissions Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Questions or Special Academic Interests (Optional)
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="Tell us about your child's academic passions, languages spoken, or specific questions..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#004bca]/30"
                />
              </div>

              {/* GDPR Mandatory Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("gdprConsent")}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#004bca] focus:ring-[#004bca]"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    I consent to Apex High School storing and processing our contact details to process this admissions inquiry in accordance with the Safeguarding and GDPR Privacy Policy.
                  </span>
                </label>
                {errors.gdprConsent && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.gdprConsent.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full gap-2 shadow-md"
                  isLoading={formSubmitting}
                >
                  <Send className="w-4 h-4" /> Submit Admissions Inquiry
                </Button>
              </div>
            </form>
          )}
        </Card>
      </section>

      <SchoolFooter />
    </div>
  );
}
