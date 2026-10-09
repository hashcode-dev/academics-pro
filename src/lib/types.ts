export type UserRole =
  | "SUPER_ADMIN"
  | "SCHOOL_ADMIN"
  | "ACADEMIC_COORDINATOR"
  | "TEACHER"
  | "FINANCE_OFFICER"
  | "STUDENT"
  | "PARENT";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  institutionId: string;
  institutionName: string;
  roles: UserRole[];
}

export interface TenantInfo {
  tenantId: string;
  institutionId: string;
  name: string;
  tagline: string;
  slug: string;
  logoUrl: string;
  primaryColor: string;
  contactEmail: string;
  phone: string;
  address: string;
  establishedYear: number;
  studentCount: number;
  facultyCount: number;
  passRatePercentage: number;
  accreditations: string[];
  curricula: string[];
}

export interface ProgramItem {
  id: string;
  category: "Primary" | "Middle" | "Senior" | "Extracurricular";
  name: string;
  description: string;
  curriculum: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  spotsAvailable: number;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  attendanceRate: number;
  gpa: number;
  status: "ACTIVE" | "PENDING" | "ALUMNI";
  guardianName: string;
  guardianPhone: string;
  feeStatus: "PAID" | "PENDING" | "OVERDUE";
}

export interface TeacherRecord {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  subjects: string[];
  qualifications: string;
  assignedClasses: string[];
  status: "ACTIVE" | "ON_LEAVE";
}

export interface TimetableSlot {
  id: string;
  day: string;
  period: number;
  time: string;
  subject: string;
  teacherName: string;
  roomNumber: string;
  section: string;
  hasConflict?: boolean;
}

export interface FinancialMetric {
  totalFeeTarget: number;
  collectedFees: number;
  pendingFees: number;
  collectionRatePercentage: number;
  monthlyPayrollDisbursed: number;
  defaultersCount: number;
}

export interface CampusItem {
  id: string;
  name: string;
  code: string;
  address: string;
  contactPhone?: string;
  contactEmail?: string;
  studentCapacity: number;
  gradesOffered: string;
  active: boolean;
}

export interface AcademicTermItem {
  id: string;
  termName: string;
  termNumber: number;
  startDate: string;
  endDate: string;
  examStartDate?: string;
  examEndDate?: string;
  status: "CURRENT" | "UPCOMING" | "COMPLETED";
}

export interface AcademicYearItem {
  id: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  status: "CURRENT" | "UPCOMING" | "PAST";
  terms: AcademicTermItem[];
}

export interface SectionItem {
  id: string;
  name: string;
  roomNumber: string;
  maxCapacity: number;
  currentEnrollment: number;
  classTeacherName: string;
}

export interface ClassGradeItem {
  id: string;
  name: string;
  stage: string;
  displayOrder: number;
  sections: SectionItem[];
}

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  department: string;
  curriculum: string;
  credits: number;
  weeklyHours: number;
}

export interface ClassroomItem {
  id: string;
  campusId: string;
  roomNumber: string;
  name: string;
  roomType: string;
  capacity: number;
}

export interface InstitutionOverview {
  tenantId: string;
  totalCampuses: number;
  totalStudentCapacity: number;
  currentAcademicYear: string;
  currentTerm: string;
  totalClasses: number;
  totalSections: number;
  totalSubjects: number;
  totalClassrooms: number;
}

export interface CmsHeroSection {
  headline: string;
  subhead: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badgeText?: string;
  badgeHighlight?: string;
  backgroundImageUrl?: string;
  statsHighlights?: string[];
}

export interface CmsAcademicProgram {
  id: string;
  name: string;
  code: string;
  level: string;
  ageGroup: string;
  description: string;
  highlights: string[];
  accreditation: string;
  coordinatorName: string;
  badgeColor?: string;
}

export interface CmsTestimonial {
  id: string;
  authorName: string;
  role: string;
  cohortYear: string;
  quote: string;
  universityBadge: string;
  avatarUrl?: string;
  rating: number;
}

export interface CmsFacility {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  features: string[];
}

export interface CmsAdmissionStep {
  stepNumber: number;
  title: string;
  deadline: string;
  description: string;
  requirements: string[];
}

export interface CmsSchoolEvent {
  id: string;
  title: string;
  category: string;
  eventDate: string;
  time: string;
  location: string;
  description: string;
  rsvpUrl?: string;
  featured: boolean;
}

export interface CmsSchoolNews {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  summary: string;
  body: string;
  author: string;
  tags: string[];
  imageUrl?: string;
}

export interface TenantWebsiteFeed {
  id: string;
  tenantId: string;
  tenantSlug: string;
  institutionName: string;
  tagline: string;
  logoUrl?: string;
  primaryColor?: string;
  contactEmail?: string;
  contactPhone?: string;
  campusAddress?: string;
  hero: CmsHeroSection;
  programs: CmsAcademicProgram[];
  testimonials: CmsTestimonial[];
  facilities: CmsFacility[];
  admissionSteps: CmsAdmissionStep[];
  events: CmsSchoolEvent[];
  news: CmsSchoolNews[];
  version: number;
  publishedAt: string;
  publishedBy: string;
}
