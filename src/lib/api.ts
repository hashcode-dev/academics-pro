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

  if (url.includes("/institution/overview")) {
    return {
      tenantId: "apex-high",
      totalCampuses: 2,
      totalStudentCapacity: 1750,
      currentAcademicYear: "Academic Year 2026–2027",
      currentTerm: "Fall Term 1",
      totalClasses: 3,
      totalSections: 5,
      totalSubjects: 5,
      totalClassrooms: 4,
    } as unknown as T;
  }

  if (url.includes("/institution/campuses")) {
    return [
      {
        id: "cmp-apex-main",
        tenantId: "apex-high",
        name: "Main Cambridge Campus",
        code: "CAM-MAIN",
        address: "742 Evergreen Crest, Cambridge, MA 02138",
        contactPhone: "+1 (555) 382-9011",
        contactEmail: "cambridge@apexhigh.edu",
        studentCapacity: 1400,
        gradesOffered: "Pre-K through Grade 12",
        active: true,
      },
      {
        id: "cmp-apex-annex",
        tenantId: "apex-high",
        name: "Apex Innovation Annex & STEM Lab",
        code: "CAM-ANNEX",
        address: "18 Tech Commons, Cambridge, MA 02139",
        contactPhone: "+1 (555) 382-9015",
        contactEmail: "innovation@apexhigh.edu",
        studentCapacity: 350,
        gradesOffered: "Grade 9–12 (Robotics & AI Atelier)",
        active: true,
      },
    ] as unknown as T;
  }

  if (url.includes("/institution/academic-years")) {
    return [
      {
        id: "ay-2026-2027",
        tenantId: "apex-high",
        name: "Academic Year 2026–2027",
        code: "AY2627",
        startDate: "2026-08-25",
        endDate: "2027-05-28",
        status: "CURRENT",
        terms: [
          { id: "trm-1", termName: "Fall Term 1", termNumber: 1, startDate: "2026-08-25", endDate: "2026-12-18", examStartDate: "2026-12-10", examEndDate: "2026-12-17", status: "CURRENT" },
          { id: "trm-2", termName: "Spring Term 2", termNumber: 2, startDate: "2027-01-12", endDate: "2027-05-28", examStartDate: "2027-05-18", examEndDate: "2027-05-26", status: "UPCOMING" },
        ],
      },
    ] as unknown as T;
  }

  if (url.includes("/institution/classes")) {
    return [
      {
        id: "cls-g10",
        name: "Grade 10",
        stage: "Middle/Upper",
        displayOrder: 10,
        sections: [
          { id: "sec-10a", name: "A", roomNumber: "Room 201", maxCapacity: 25, currentEnrollment: 24, classTeacherName: "Marcus Brody" },
          { id: "sec-10b", name: "B", roomNumber: "Room 202", maxCapacity: 25, currentEnrollment: 23, classTeacherName: "Liam O'Connor" },
        ],
      },
      {
        id: "cls-g11",
        name: "Grade 11",
        stage: "Senior (IB DP / AP)",
        displayOrder: 11,
        sections: [
          { id: "sec-11a", name: "A", roomNumber: "Room 301", maxCapacity: 25, currentEnrollment: 25, classTeacherName: "Sarah Lin" },
          { id: "sec-11b", name: "B", roomNumber: "Room 302", maxCapacity: 25, currentEnrollment: 24, classTeacherName: "Dr. Alistair Cook" },
        ],
      },
      {
        id: "cls-g12",
        name: "Grade 12",
        stage: "Senior (IB DP / AP)",
        displayOrder: 12,
        sections: [
          { id: "sec-12a", name: "A", roomNumber: "Room 401", maxCapacity: 25, currentEnrollment: 22, classTeacherName: "Dr. Arthur Vance" },
        ],
      },
    ] as unknown as T;
  }

  if (url.includes("/institution/subjects")) {
    return [
      { id: "sbj-1", code: "MATH-BC", name: "Calculus BC (AP)", department: "Mathematics", curriculum: "AP", credits: 4, weeklyHours: 5 },
      { id: "sbj-2", code: "IB-PHYS-HL", name: "Physics Higher Level", department: "Physical Sciences", curriculum: "IB DP", credits: 4, weeklyHours: 6 },
      { id: "sbj-3", code: "IB-CHEM-HL", name: "Chemistry Higher Level", department: "Physical Sciences", curriculum: "IB DP", credits: 4, weeklyHours: 5 },
      { id: "sbj-4", code: "ENG-LIT-AP", name: "English Literature & Composition", department: "Humanities", curriculum: "AP", credits: 3, weeklyHours: 4 },
      { id: "sbj-5", code: "STEM-AI", name: "Applied Robotics & Machine Intelligence", department: "Computer Science", curriculum: "STEM Atelier", credits: 4, weeklyHours: 5 },
    ] as unknown as T;
  }

  if (url.includes("/institution/classrooms")) {
    return [
      { id: "rm-1", campusId: "cmp-apex-main", roomNumber: "Lab 301", name: "Calculus & Advanced Analytics Lab", roomType: "LABORATORY", capacity: 28 },
      { id: "rm-2", campusId: "cmp-apex-main", roomNumber: "Phys Lab 1", name: "Newtonian & Quantum Mechanics Atelier", roomType: "LABORATORY", capacity: 26 },
      { id: "rm-3", campusId: "cmp-apex-main", roomNumber: "Hall B", name: "Humanities Lecture Hall B", roomType: "LECTURE_HALL", capacity: 60 },
      { id: "rm-4", campusId: "cmp-apex-annex", roomNumber: "Turing Lab", name: "Turing AI & Prototyping Workshop", roomType: "LABORATORY", capacity: 32 },
    ] as unknown as T;
  }

  if (url.includes("/cms/tenant") || url.includes("/cms/feed")) {
    return {
      id: "feed-apex-high",
      tenantId: "apex-high",
      tenantSlug: "apex-high",
      institutionName: "Apex High School",
      tagline: "Shaping World-Class Thinkers and Compassionate Global Leaders",
      logoUrl: "/logos/apex-high.svg",
      primaryColor: "#004bca",
      contactEmail: "admissions@apexhigh.edu",
      contactPhone: "+1 (555) 382-9011",
      campusAddress: "742 Evergreen Crest, Cambridge, MA 02138",
      hero: {
        headline: "Empowering Tomorrow's Pioneers, Thinkers & Leaders",
        subhead: "An elite K-12 preparatory academy offering International Baccalaureate (IB) Diploma and AP Capstone pathways in Cambridge, MA.",
        primaryCtaText: "Book a Campus Tour",
        primaryCtaLink: "/school#admissions",
        secondaryCtaText: "Explore Academic Curricula",
        secondaryCtaLink: "/school#academics",
        badgeText: "Top 1% Global STEM & Humanities Ranking",
        badgeHighlight: "100% IB Diploma Pass Rate",
        statsHighlights: [
          "98.4% Placement to Top 30 Global Universities",
          "1:8 Faculty-to-Student Mentorship Ratio",
          "45+ Advanced Research Labs & Creative Studios",
        ],
      },
      programs: [
        { id: "prog-early", name: "Early Learning & Discovery Atelier", code: "PROG-EY", level: "Early Childhood", ageGroup: "Ages 3–5", description: "Play-based inquiry grounded in Reggio Emilia and Montessori philosophies fostering curiosity.", highlights: ["Bilingual Immersion", "Nature Exploratorium"], accreditation: "NAEYC Certified", coordinatorName: "Elena Rostova", badgeColor: "#007f57" },
        { id: "prog-my", name: "Middle Years IB Exploration", code: "PROG-MYP", level: "Middle School", ageGroup: "Grades 6–8", description: "Rigorous interdisciplinary curriculum designed to cultivate global mindedness and analytical thought.", highlights: ["Design Thinking Labs", "Community Action Projects"], accreditation: "IB World School MYP", coordinatorName: "Dr. Marcus Brody", badgeColor: "#004bca" },
        { id: "prog-diploma", name: "Senior IB Diploma & AP Capstone", code: "PROG-IBDP", level: "Senior Secondary", ageGroup: "Grades 9–12", description: "Pre-university standard emphasizing deep research, Theory of Knowledge, and extended essays.", highlights: ["100% Pass Rate", "Average Score 38.6 / 45"], accreditation: "IB World School DP & AP College Board", coordinatorName: "Dr. Arthur Vance", badgeColor: "#5b21b6" },
      ],
      testimonials: [
        { id: "tst-1", authorName: "Julian Voss", role: "Alumnus, Class of 2024", cohortYear: "2024", quote: "Apex High's robotics atelier and faculty mentorship gave me the confidence to publish independent AI research before college.", universityBadge: "MIT '28 - EECS", rating: 5.0 },
        { id: "tst-2", authorName: "Dr. Catherine Sterling", role: "Parent of 11th Grader", cohortYear: "2026", quote: "The individual attention each scholar receives is unparalleled. The balance of academic rigor and compassionate care is extraordinary.", universityBadge: "Parent Association Co-Chair", rating: 5.0 },
        { id: "tst-3", authorName: "Maya Chen", role: "Senior Scholar", cohortYear: "2025", quote: "Between competitive debate, chamber orchestra, and AP Calculus, every day challenges me to grow beyond my expectations.", universityBadge: "Stanford '29 Admit", rating: 5.0 },
      ],
      facilities: [
        { id: "fac-stem", name: "Turing Quantum & Robotics Atelier", category: "STEM", description: "State-of-the-art makerspace equipped with laser cutters, 6-axis robotic arms, and NVIDIA RTX clusters.", features: ["Rapid Prototyping", "Autonomous Drones Bay"] },
        { id: "fac-aquatics", name: "Olympic Aquatics & Athletic Pavilion", category: "Athletics", description: "50-meter indoor heated competition pool, dual hardwood basketball courts, and sports science performance gym.", features: ["FINA Compliant", "Hydrotherapy Suite"] },
        { id: "fac-theater", name: "Blackbox & Symphony Auditorium", category: "Arts", description: "550-seat acoustically engineered theater designed for musical theater, orchestra recitals, and public debates.", features: ["Steinway Grand Pianos", "DMX Lighting Grid"] },
      ],
      admissionSteps: [
        { stepNumber: 1, title: "Submit Online Application", deadline: "Rolling until Dec 15", description: "Complete parent questionnaire and upload previous two academic transcripts via our secure portal.", requirements: ["Transcripts", "Birth Certificate"] },
        { stepNumber: 2, title: "Scholar Assessment & Inquiry Day", deadline: "January 10–25", description: "Prospective students participate in collaborative classroom sessions and cognitive problem-solving ateliers.", requirements: ["On-site Assessment", "Creative Essay"] },
        { stepNumber: 3, title: "Family Leadership Interview", deadline: "February 1–15", description: "Personal 30-minute conversation with our Academic Dean to align educational values and passions.", requirements: ["Family Dialogue", "Student Passions Pitch"] },
        { stepNumber: 4, title: "Decision & Enrollment", deadline: "March 10", description: "Formal admission offers issued with merit scholarship notifications and comprehensive onboarding guide.", requirements: ["Deposit", "Course Selection"] },
      ],
      events: [
        { id: "evt-1", title: "Fall Open Campus & Innovation Showcase", category: "Open Day", eventDate: "2026-10-24", time: "09:00 AM – 01:00 PM EST", location: "Main Cambridge Campus, Auditorium A", description: "Tour campus facilities, attend live lab demos, and meet Academic Heads of Department.", rsvpUrl: "/school/rsvp/open-day", featured: true },
        { id: "evt-2", title: "New England Regional Robotics Invitational", category: "Academic Olympiad", eventDate: "2026-11-14", time: "10:00 AM – 05:00 PM EST", location: "Apex Innovation Annex", description: "Hosting 28 regional schools competing in autonomous robotics challenges.", rsvpUrl: "/school/rsvp/robotics", featured: false },
      ],
      news: [
        { id: "news-1", title: "Apex High Students Win 1st Place at Harvard Model Congress", slug: "apex-high-harvard-model-congress-win", publishedDate: "2026-09-28", summary: "Our debate delegation swept gavel awards across Senate, Supreme Court, and National Security Council committees.", body: "Over the past weekend...", author: "Communications Office", tags: ["Debate", "Excellence"] },
      ],
      version: 1,
      publishedAt: new Date().toISOString(),
      publishedBy: "system-init",
    } as unknown as T;
  }

  if (url.includes("/cms/publish")) {
    return {
      tenantId: "apex-high",
      tenantSlug: "apex-high",
      version: 2,
      publishedAt: new Date().toISOString(),
      status: "PUBLISHED",
      message: "Website feed successfully compiled and published for Apex High School",
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
