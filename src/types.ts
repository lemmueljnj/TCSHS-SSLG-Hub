export type PageView =
  | 'home'
  | 'hub'
  | 'officers'
  | 'transparency'
  | 'resources'
  | 'updates'
  | 'forum'
  | 'projects'
  | 'about'
  | 'admin';

export type AdminRole =
  | 'President'
  | 'Vice President'
  | 'Secretary'
  | 'Treasurer'
  | 'Auditor'
  | 'Public Information Officer'
  | 'Protocol Officer'
  | 'Adviser';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  gradeLevel?: string;
  role: 'student' | 'admin';
  adminRole?: AdminRole;
  avatarUrl?: string;
}

export interface Officer {
  id: string;
  name: string;
  position: string;
  hierarchyLevel: 1 | 2 | 3 | 4; // 1: Pres, 2: VP, 3: Exec Officers, 4: Councilors/Reps
  committee: string;
  email: string;
  contactNumber: string;
  bio: string;
  quote: string;
  gradeSection: string;
  photoUrl: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  keyProjects: string[];
}

export interface Committee {
  id: string;
  name: string;
  chairperson: string;
  coChairperson?: string;
  membersCount: number;
  responsibilities: string[];
  projectsHandled: string[];
  color: string;
}

export type DocumentCategory =
  | 'Accomplishment Reports'
  | 'Financial Transparency'
  | 'Official Statements'
  | 'Resolutions'
  | 'Memoranda';

export interface TransparencyDoc {
  id: string;
  title: string;
  category: DocumentCategory;
  schoolYear: string;
  dateUploaded: string;
  fileType: 'PDF' | 'XLSX' | 'DOCX' | string;
  fileSize: string;
  description: string;
  signatory: string;
  featured?: boolean;
  contentSnippet?: string;
  downloadUrl?: string;
  fileData?: string;
}

export type ResourceCategory =
  | 'Templates'
  | 'Memoranda'
  | 'Resolutions'
  | 'Forms'
  | 'Student Welfare'
  | 'Student Council Documents'
  | 'Club & Organization Toolkits'
  | 'Student Guides & Handbooks'
  | 'Design Assets & Templates';

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP' | string;
  fileSize: string;
  dateAdded: string;
  downloadsCount: number;
  description: string;
  featured?: boolean;
  contentSnippet?: string;
  downloadUrl?: string;
  fileData?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  author: string;
  authorRole?: string;
  category: 'General' | 'Activity' | 'Meeting' | 'Urgent' | 'Academic' | 'Assembly' | 'Community';
  coverImage?: string;
  summary: string;
  content: string;
  isPinned?: boolean;
  tags?: string[];
}

export type ForumCategory =
  | 'Student Concerns'
  | 'Suggestions'
  | 'School Activities'
  | 'Questions'
  | 'General Discussion'
  | 'Student Welfare'
  | 'Campus Concerns'
  | 'Suggestions & Proposals'
  | 'Academic Support'
  | 'Extracurriculars';

export interface ForumComment {
  id: string;
  authorName: string;
  isOfficer?: boolean;
  date: string;
  text: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  authorName: string;
  authorRole: 'student' | 'admin' | 'officer';
  officerTitle?: string;
  isAnonymous: boolean;
  actualUserId: string;
  actualUserName: string;
  timestamp: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: ForumCategory;
  authorName: string; // "Anonymous Student" if isAnonymous === true
  actualUserId: string; // Kept private to admins for moderation and safety
  actualUserName: string; // Kept private to admins
  actualUserGrade?: string;
  authorEmail?: string;
  isAnonymous: boolean;
  timestamp: string;
  date?: string;
  likes: number;
  likedByMe?: boolean;
  replies: ForumReply[];
  comments: ForumComment[];
  isLocked?: boolean;
  isPinned?: boolean;
  isReported?: boolean;
  status: 'active' | 'hidden' | 'resolved' | 'Open' | 'Under Review' | 'Resolved';
  officialResponse?: {
    date: string;
    text: string;
    officerName: string;
    officerRole: string;
  };
}

export type ProjectStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface SSLGProject {
  id: string;
  title: string;
  category: string;
  description: string;
  status: ProjectStatus;
  timeline: string;
  committee: string;
  progressPercent: number;
  leadOfficer: string;
  targetDate: string;
  imageUrl: string;
  beneficiaries?: string;
  accomplishmentReportSummary?: string;
}

export interface SSLGEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Meeting' | 'Assembly' | 'Activity' | 'Advocacy';
  description: string;
}

export interface StudentSuggestion {
  id: string;
  category: 'Concern' | 'Suggestion' | 'Idea' | 'Student Welfare' | string;
  subject: string;
  message: string;
  submittedAt: string;
  submittedBy?: string;
  submittedEmail?: string;
  date?: string;
  isAnonymous: boolean;
  actualSenderName: string;
  actualSenderEmail: string;
  status: 'Pending' | 'Under Review' | 'Addressed' | 'Resolved';
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  dateSent: string;
  isRead: boolean;
}

export interface AdminActivityLog {
  id: string;
  officerName: string;
  officerRole: string;
  role?: string;
  action: string;
  details: string;
  target?: string;
  timestamp: string;
}

export interface SocialMediaPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter';
  author: string;
  handle: string;
  timestamp: string;
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  likes: number;
  comments: number;
  isLikedByUser?: boolean;
}

export interface OrgDetails {
  orgName: string;
  websiteName?: string;
  schoolName: string;
  logoUrl?: string;
  schoolYear: string;
  tagline: string;
  subTagline: string;
  currentPresident: string;
  adviser: string;
  officialEmail: string;
  contactNumber: string;
  officeLocation: string;
  officeHours: string;
  mission: string;
  vision: string;
  facebookUrl: string;
  instagramUrl: string;
}
