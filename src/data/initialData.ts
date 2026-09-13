import {
  AdminActivityLog,
  Announcement,
  Committee,
  ContactMessage,
  ForumPost,
  Officer,
  OrgDetails,
  ResourceItem,
  SSLGEvent,
  SSLGProject,
  StudentSuggestion,
  TransparencyDoc,
  User,
} from '../types';

export const MASTER_ADMIN_KEY = 'SiSiLogTugSay2627';

export const MASTER_ADMIN_USER: User = {
  id: 'admin-master',
  name: 'SSLG Administrator',
  email: 'admin@sslg.gov.ph',
  role: 'admin',
  adminRole: 'President',
};

export const defaultVisitorUser: User = {
  id: 'visitor-learner',
  name: 'Student Learner',
  email: 'learner@school.edu.ph',
  role: 'student',
};

// Maintained for backward compatibility with existing type contracts
export const demoAccounts: User[] = [
  MASTER_ADMIN_USER,
  defaultVisitorUser,
];

// Clean organization details ready for the council's custom information
export const initialOrgDetails: OrgDetails = {
  orgName: 'Supreme Secondary Learner Government',
  websiteName: 'SSLG Portal',
  schoolName: 'Your School Name',
  logoUrl: '',
  schoolYear: 'SY 2026–2027',
  tagline: 'Your Voice. Our Leadership. Our School.',
  subTagline: 'Empowering learners. Building leaders. Serving the school community with integrity and purpose.',
  currentPresident: '',
  adviser: '',
  officialEmail: '',
  contactNumber: '',
  officeLocation: '',
  officeHours: '',
  mission: '',
  vision: '',
  facebookUrl: '',
  instagramUrl: '',
};

// Blank slate: all records start empty so everything is uploaded from scratch
export const initialOfficers: Officer[] = [];
export const initialCommittees: Committee[] = [];
export const initialProjects: SSLGProject[] = [];
export const initialAnnouncements: Announcement[] = [];
export const initialTransparencyDocs: TransparencyDoc[] = [];
export const initialResources: ResourceItem[] = [];
export const initialEvents: SSLGEvent[] = [];
export const initialForumPosts: ForumPost[] = [];
export const initialSuggestions: StudentSuggestion[] = [];
export const initialContactMessages: ContactMessage[] = [];
export const initialActivityLogs: AdminActivityLog[] = [];
