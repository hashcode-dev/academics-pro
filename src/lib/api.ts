import { TenantInfo, UserProfile, StudentRecord, TeacherRecord, TimetableSlot, FinancialMetric } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const tenantId = typeof window !== "undefined" ? localStorage.getItem("tenantId") || "apex-high" : "apex-high";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Tenant-ID": tenantId,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    // Fallback to local mock data if server isn't running
    console.warn(`Falling back to mock data for ${url}:`, err);
    return getMockFallback<T>(url);
  }
}

// Built-in Mock Provider for offline resilience and fast development
function getMockFallback<T>(url: string): T {
  if (url.includes("/tenants")) {
    return {
      tenantId: "apex-high",
      institutionId: "inst-apex-high",
      name: "Apex High School",
      tagline: "Shaping World-Class Thinkers and Compassionate Global Leaders",
      slug: "apex-high",
      logoUrl: "/logos/apex-high.svg",
      primaryColor: "#004bca",
      contactEmail: "admissions@apexhigh.edu",
      phone: "+1 (555) 382-9011",
      address: "742 Evergreen Crest, Cambridge, MA 02138",
      establishedYear: 1982,
      studentCount: 1250,
      facultyCount: 98,
      passRatePercentage: 98.4,
      accreditations: ["IB World School", "Cambridge Assessment", "CIS Certified", "STEM Alliance"],
      curricula: ["International Baccalaureate (IB)", "Advanced Placement (AP)", "IGCSE / A-Levels"],
    } as unknown as T;
  }

  if (url.includes("/cms/landing")) {
    return {
      hero: {
        headline: "Empowering Tomorrow's Pioneers with Academic Rigor & Character",
        subline: "Providing an exceptional Pre-K through Grade 12 educational journey cultivating curiosity, critical inquiry, and global leadership.",
        primaryCta: { label: "Book an Open Day", href: "#enquiry" },
        secondaryCta: { label: "Explore Programs", href: "#programs" },
        badgeText: "Admissions Open for Academic Year 2026–27",
      },
      trustBar: {
        stats: [
          { label: "University Placement", value: "98.4%" },
          { label: "Established Since", value: "1982" },
          { label: "Student Body", value: "1,250+" },
          { label: "Average Class Size", value: "16:1" },
        ],
        accreditations: ["IB World School", "Cambridge Assessment", "CIS Certified", "STEM Alliance"],
      },
      programs: [
        { id: "prog-primary", category: "Primary", name: "Primary Years Programme (Ages 4–11)", description: "Fostering innate wonder through foundational literacy, discovery math, and playful science.", curriculum: "IB PYP" },
        { id: "prog-middle", category: "Middle", name: "Middle Years Exploration (Ages 11–14)", description: "Rigorous interdisciplinary curriculum designed to stimulate critical thinking and scientific inquiry.", curriculum: "Cambridge Checkpoint" },
        { id: "prog-senior", category: "Senior", name: "Senior Diploma & AP Capstone (Ages 15–18)", description: "Pre-university curriculum with advanced dual-enrollment credits and world-class university counseling.", curriculum: "IB DP & AP Courses" },
        { id: "prog-stem", category: "Extracurricular", name: "Robotics & Applied AI Atelier", description: "Hands-on engineering laboratories mentored by MIT and Caltech research alumni.", curriculum: "STEM Elective" },
      ],
      testimonials: [
        { quote: "Apex transformed my daughter's perspective on STEM. The faculty mentors don't just teach subjects; they inspire students to believe in their unique potential.", author: "Eleanor Vance", role: "Grade 11 Parent", avatar: "EV" },
        { quote: "The collaborative culture and IB Diploma preparation gave me a seamless transition to Oxford University. I felt prepared from day one.", author: "Julian Voss", role: "Alumnus (Class of 2024)", avatar: "JV" },
        { quote: "Every child is known, respected, and championed. As educators, we are supported with world-class facilities and continuous professional development.", author: "Marcus Brody", role: "Lead Physics Faculty", avatar: "MB" },
      ],
      events: [
        { id: "evt-1", title: "Spring Campus Open Day & STEM Showcase", date: "2026-10-24", time: "10:00 AM - 1:00 PM", location: "Main Auditorium & Innovation Lab", spotsAvailable: 24 },
        { id: "evt-2", title: "Virtual Admissions Roundtable with Head of School", date: "2026-11-05", time: "6:00 PM - 7:30 PM", location: "Live Interactive Webcast", spotsAvailable: 50 },
        { id: "evt-3", title: "Annual Performing Arts Gala & Symphony", date: "2026-11-18", time: "5:30 PM - 8:30 PM", location: "Grand Theater Hall", spotsAvailable: 15 },
      ],
      news: [
        { id: "news-1", title: "Apex Robotics Team Clinches First Place in National Science Olympiad", date: "October 2, 2026", category: "Achievements", readTime: "3 min read" },
        { id: "news-2", title: "Introducing Sustainable Energy & Environmental Science Lab for Middle Schoolers", date: "September 24, 2026", category: "Campus Update", readTime: "4 min read" },
      ],
    } as unknown as T;
  }

  if (url.includes("/finance/summary")) {
    return {
      totalFeeTarget: 4500000,
      collectedFees: 3890250,
      pendingFees: 609750,
      collectionRatePercentage: 86.4,
      monthlyPayrollDisbursed: 285400,
      defaultersCount: 14,
    } as unknown as T;
  }

  return {} as T;
}

export const mockStudents: StudentRecord[] = [
  { id: "stu-1", studentId: "APX-2024-001", name: "Julian Voss", grade: "Grade 11", section: "A", rollNumber: "11-A-04", attendanceRate: 96.8, gpa: 3.94, status: "ACTIVE", guardianName: "Thomas Voss", guardianPhone: "+1 (555) 492-8819", feeStatus: "PAID" },
  { id: "stu-2", studentId: "APX-2024-002", name: "Sophia Chen", grade: "Grade 11", section: "A", rollNumber: "11-A-05", attendanceRate: 98.2, gpa: 4.0, status: "ACTIVE", guardianName: "David Chen", guardianPhone: "+1 (555) 492-9901", feeStatus: "PAID" },
  { id: "stu-3", studentId: "APX-2024-003", name: "Liam O'Connor", grade: "Grade 10", section: "B", rollNumber: "10-B-12", attendanceRate: 91.5, gpa: 3.72, status: "ACTIVE", guardianName: "Fiona O'Connor", guardianPhone: "+1 (555) 302-1144", feeStatus: "PENDING" },
  { id: "stu-4", studentId: "APX-2024-004", name: "Amara Patel", grade: "Grade 12", section: "A", rollNumber: "12-A-01", attendanceRate: 99.1, gpa: 3.98, status: "ACTIVE", guardianName: "Rajesh Patel", guardianPhone: "+1 (555) 881-2299", feeStatus: "PAID" },
  { id: "stu-5", studentId: "APX-2024-005", name: "Mateo Alvarez", grade: "Grade 9", section: "C", rollNumber: "09-C-18", attendanceRate: 72.4, gpa: 2.85, status: "ACTIVE", guardianName: "Carmen Alvarez", guardianPhone: "+1 (555) 601-3321", feeStatus: "OVERDUE" },
];

export const mockTeachers: TeacherRecord[] = [
  { id: "tch-1", employeeId: "FAC-101", name: "Dr. Arthur Vance", designation: "Head of School & Senior Faculty", department: "Administration & History", subjects: ["World History AP", "Global Ethics"], qualifications: "Ph.D. Education, Harvard University", assignedClasses: ["Grade 11-A", "Grade 12-A"], status: "ACTIVE" },
  { id: "tch-2", employeeId: "FAC-102", name: "Sarah Lin", designation: "Academic Coordinator & Mathematics Chair", department: "Mathematics", subjects: ["Calculus BC", "Linear Algebra"], qualifications: "M.Sc. Pure Mathematics, Stanford", assignedClasses: ["Grade 11-A", "Grade 12-B"], status: "ACTIVE" },
  { id: "tch-3", employeeId: "FAC-103", name: "Marcus Brody", designation: "Senior Physics Faculty", department: "Physical Sciences", subjects: ["IB Physics HL", "Astronomy Lab"], qualifications: "M.Sc. Physics, Oxford University", assignedClasses: ["Grade 10-A", "Grade 11-A", "Grade 12-A"], status: "ACTIVE" },
  { id: "tch-4", employeeId: "FAC-104", name: "Dr. Elena Rostova", designation: "Director of Financial Operations", department: "Finance & Economics", subjects: ["Microeconomics AP"], qualifications: "CPA, MBA Wharton", assignedClasses: ["Grade 12-A"], status: "ACTIVE" },
];

export const mockTimetable: TimetableSlot[] = [
  { id: "slot-1", day: "Monday", period: 1, time: "08:30 - 09:25", subject: "Mathematics (Calculus)", teacherName: "Sarah Lin", roomNumber: "Lab 301", section: "11-A" },
  { id: "slot-2", day: "Monday", period: 2, time: "09:30 - 10:25", subject: "Physics HL", teacherName: "Marcus Brody", roomNumber: "Physics Lab 1", section: "11-A" },
  { id: "slot-3", day: "Monday", period: 3, time: "10:40 - 11:35", subject: "Literature & Composition", teacherName: "Rachel Hayes", roomNumber: "Hall B", section: "11-A" },
  { id: "slot-4", day: "Monday", period: 4, time: "11:40 - 12:35", subject: "Computer Science & AI", teacherName: "Kenji Sato", roomNumber: "Turing Lab", section: "11-A" },
  { id: "slot-5", day: "Monday", period: 5, time: "01:25 - 02:20", subject: "Chemistry HL", teacherName: "Dr. Alistair Cook", roomNumber: "Chemistry Lab 2", section: "11-A" },
  { id: "slot-6", day: "Monday", period: 6, time: "02:25 - 03:20", subject: "World History AP", teacherName: "Dr. Arthur Vance", roomNumber: "Seminar Room 4", section: "11-A" },
];
