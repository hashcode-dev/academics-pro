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
