import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  defaultVisitorUser,
  demoAccounts,
  initialActivityLogs,
  initialAnnouncements,
  initialCommittees,
  initialContactMessages,
  initialEvents,
  initialForumPosts,
  initialOfficers,
  initialOrgDetails,
  initialProjects,
  initialResources,
  initialSuggestions,
  initialTransparencyDocs,
  MASTER_ADMIN_KEY,
  MASTER_ADMIN_USER,
} from '../data/initialData';
import {
  AdminActivityLog,
  AdminRole,
  Announcement,
  Committee,
  ContactMessage,
  ForumCategory,
  ForumPost,
  ForumReply,
  Officer,
  OrgDetails,
  PageView,
  ProjectStatus,
  ResourceCategory,
  ResourceItem,
  SocialMediaPost,
  SSLGEvent,
  SSLGProject,
  StudentSuggestion,
  TransparencyDoc,
  User,
} from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

// Clear legacy demo cache so everything starts 100% blank from scratch
const SCRATCH_STORAGE_KEY = 'sslg_scratch_v2_initialized';
if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem(SCRATCH_STORAGE_KEY) !== 'true') {
      localStorage.removeItem('tcshs_current_user');
      localStorage.removeItem('tcshs_org_details');
      localStorage.removeItem('tcshs_officers');
      localStorage.removeItem('tcshs_committees');
      localStorage.removeItem('tcshs_projects');
      localStorage.removeItem('tcshs_announcements');
      localStorage.removeItem('tcshs_docs');
      localStorage.removeItem('tcshs_resources');
      localStorage.removeItem('tcshs_events');
      localStorage.removeItem('tcshs_forum');
      localStorage.removeItem('tcshs_suggestions');
      localStorage.removeItem('tcshs_messages');
      localStorage.removeItem('tcshs_logs');
      localStorage.removeItem('tcshs_social_posts');
      localStorage.setItem(SCRATCH_STORAGE_KEY, 'true');
    }
  } catch (e) {
    console.error('Storage clear error:', e);
  }
}

interface AppContextType {
  // Navigation
  page: PageView;
  setPage: (page: PageView) => void;
  hasScrolledCover: boolean;
  setHasScrolledCover: (val: boolean) => void;
  scrollToTop: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // User & Auth
  currentUser: User;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  isAdmin: boolean;
  userRoleTitle: string;

  // Data
  orgDetails: OrgDetails;
  updateOrgDetails: (details: Partial<OrgDetails>) => void;
  officers: Officer[];
  updateOfficer: (officer: Officer) => void;
  addOfficer: (officer: Omit<Officer, 'id'>) => void;
  deleteOfficer: (id: string) => void;
  committees: Committee[];
  updateCommittee: (committee: Committee) => void;

  projects: SSLGProject[];
  addProject: (project: Omit<SSLGProject, 'id'>) => void;
  updateProject: (project: SSLGProject) => void;
  updateProjectStatus: (id: string, status: ProjectStatus, progressPercent: number) => void;
  deleteProject: (id: string) => void;

  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;

  transparencyDocs: TransparencyDoc[];
  addTransparencyDoc: (doc: Omit<TransparencyDoc, 'id'>) => void;
  updateTransparencyDoc: (doc: TransparencyDoc) => void;
  deleteTransparencyDoc: (id: string) => void;

  resources: ResourceItem[];
  addResource: (res: Omit<ResourceItem, 'id'>) => void;
  updateResource: (res: ResourceItem) => void;
  deleteResource: (id: string) => void;
  incrementDownload: (id: string) => void;
  requestResource: (data: { title: string; category: ResourceCategory; details: string }) => void;

  events: SSLGEvent[];
  addEvent: (evt: Omit<SSLGEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;

  forumPosts: ForumPost[];
  addForumPost: (post: { title: string; content: string; category: ForumCategory; isAnonymous: boolean }) => void;
  addForumReply: (postId: string, content: string, isAnonymous: boolean) => void;
  addForumComment: (postId: string, text: string, isAnonymous: boolean) => void;
  likeForumPost: (postId: string) => void;
  likeForumReply: (postId: string, replyId: string) => void;
  togglePostLike: (postId: string) => void;
  deleteForumPost: (postId: string) => void;
  toggleLockForumPost: (postId: string) => void;
  reportForumPost: (postId: string) => void;

  suggestions: StudentSuggestion[];
  addSuggestion: (sug: { category: 'Concern' | 'Suggestion' | 'Idea' | 'Student Welfare' | string; subject: string; message: string; isAnonymous: boolean }) => void;
  updateSuggestionStatus: (id: string, status: 'Pending' | 'Under Review' | 'Addressed' | 'Resolved', notes?: string) => void;
  resolveSuggestion: (id: string, notes?: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;

  activityLogs: AdminActivityLog[];
  auditLogs: AdminActivityLog[];
  logAction: (action: string, details: string) => void;

  socialPosts: SocialMediaPost[];
  toggleSocialLike: (id: string) => void;

  // Modals & Overlays
  previewDoc: TransparencyDoc | null;
  setPreviewDoc: (doc: TransparencyDoc | null) => void;
  selectedOfficer: Officer | null;
  setSelectedOfficer: (officer: Officer | null) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isSuggestionBoxOpen: boolean;
  setIsSuggestionBoxOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Utilities
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [page, setPageState] = useState<PageView>('home');
  const [hasScrolledCover, setHasScrolledCover] = useState<boolean>(() => {
    return sessionStorage.getItem('tcshs_scrolled_cover') === 'true';
  });

  const setPage = (newPage: PageView) => {
    setPageState(newPage);
    if (newPage !== 'home') {
      setHasScrolledCover(true);
      sessionStorage.setItem('tcshs_scrolled_cover', 'true');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme State - Default and enforced Light Mode per user requirement
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    localStorage.setItem('tcshs_sslg_theme', 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    // Keep in light mode
    setTheme('light');
    document.documentElement.classList.remove('dark');
  };

  // Auth User State (defaults to student visitor learner)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('tcshs_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultVisitorUser;
  });

  const loginUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('tcshs_current_user', JSON.stringify(user));
    addToast(`Signed in as ${user.name} (${user.role === 'admin' ? 'Master Administrator' : 'Student'})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(defaultVisitorUser);
    localStorage.setItem('tcshs_current_user', JSON.stringify(defaultVisitorUser));
    addToast('Signed out from administrative session.', 'info');
  };

  const isAdmin = currentUser.role === 'admin';
  const userRoleTitle = isAdmin ? 'Council Administrator' : 'Student Scholar';

  // Persistent Collections with LocalStorage
  const [orgDetails, setOrgDetails] = useState<OrgDetails>(() => {
    const saved = localStorage.getItem('tcshs_org_details');
    return saved ? JSON.parse(saved) : initialOrgDetails;
  });

  const [officers, setOfficers] = useState<Officer[]>(() => {
    const saved = localStorage.getItem('tcshs_officers');
    return saved ? JSON.parse(saved) : initialOfficers;
  });

  const [committees, setCommittees] = useState<Committee[]>(() => {
    const saved = localStorage.getItem('tcshs_committees');
    return saved ? JSON.parse(saved) : initialCommittees;
  });

  const [projects, setProjects] = useState<SSLGProject[]>(() => {
    const saved = localStorage.getItem('tcshs_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('tcshs_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [transparencyDocs, setTransparencyDocs] = useState<TransparencyDoc[]>(() => {
    const saved = localStorage.getItem('tcshs_docs');
    return saved ? JSON.parse(saved) : initialTransparencyDocs;
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('tcshs_resources');
    return saved ? JSON.parse(saved) : initialResources;
  });

  const [events, setEvents] = useState<SSLGEvent[]>(() => {
    const saved = localStorage.getItem('tcshs_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('tcshs_forum');
    return saved ? JSON.parse(saved) : initialForumPosts;
  });

  const [suggestions, setSuggestions] = useState<StudentSuggestion[]>(() => {
    const saved = localStorage.getItem('tcshs_suggestions');
    return saved ? JSON.parse(saved) : initialSuggestions;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('tcshs_messages');
    return saved ? JSON.parse(saved) : initialContactMessages;
  });

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    const saved = localStorage.getItem('tcshs_logs');
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>(() => {
    const saved = localStorage.getItem('tcshs_social_posts');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('tcshs_social_posts', JSON.stringify(socialPosts));
  }, [socialPosts]);
  useEffect(() => {
    localStorage.setItem('tcshs_org_details', JSON.stringify(orgDetails));
  }, [orgDetails]);

  useEffect(() => {
    localStorage.setItem('tcshs_officers', JSON.stringify(officers));
  }, [officers]);

  useEffect(() => {
    localStorage.setItem('tcshs_committees', JSON.stringify(committees));
  }, [committees]);

  useEffect(() => {
    localStorage.setItem('tcshs_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tcshs_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('tcshs_docs', JSON.stringify(transparencyDocs));
  }, [transparencyDocs]);

  useEffect(() => {
    localStorage.setItem('tcshs_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('tcshs_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('tcshs_forum', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('tcshs_suggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem('tcshs_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('tcshs_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Log Action Helper
  const logAction = (action: string, details: string) => {
    const newLog: AdminActivityLog = {
      id: 'log-' + Date.now(),
      officerName: currentUser.name,
      officerRole: currentUser.adminRole || 'Admin',
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals
  const [previewDoc, setPreviewDoc] = useState<TransparencyDoc | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState<boolean>(false);

  // Mutators
  const updateOrgDetails = (details: Partial<OrgDetails>) => {
    setOrgDetails((prev) => {
      const next = { ...prev, ...details };
      logAction('Updated Org Details', 'Updated basic SSLG organizational profile & mission statements.');
      return next;
    });
    addToast('Organization details updated successfully.', 'success');
  };

  const updateOfficer = (officer: Officer) => {
    setOfficers((prev) => prev.map((o) => (o.id === officer.id ? officer : o)));
    logAction('Updated Officer', `Updated profile of ${officer.name} (${officer.position}).`);
    addToast(`Officer profile for ${officer.name} saved.`, 'success');
  };

  const addOfficer = (officerData: Omit<Officer, 'id'>) => {
    const newOfficer: Officer = {
      ...officerData,
      id: 'off-' + Date.now(),
    };
    setOfficers((prev) => [...prev, newOfficer]);
    logAction('Added Officer', `Added new officer: ${newOfficer.name} as ${newOfficer.position}.`);
    addToast(`Added officer: ${newOfficer.name}`, 'success');
  };

  const deleteOfficer = (id: string) => {
    const target = officers.find((o) => o.id === id);
    setOfficers((prev) => prev.filter((o) => o.id !== id));
    if (target) {
      logAction('Deleted Officer', `Removed officer record: ${target.name}.`);
      addToast(`Removed officer: ${target.name}`, 'info');
    }
  };

  const updateCommittee = (committee: Committee) => {
    setCommittees((prev) => prev.map((c) => (c.id === committee.id ? committee : c)));
    logAction('Updated Committee', `Updated committee details for ${committee.name}.`);
    addToast(`Committee ${committee.name} updated.`, 'success');
  };

  const addProject = (projectData: Omit<SSLGProject, 'id'>) => {
    const newProj: SSLGProject = {
      ...projectData,
      id: 'proj-' + Date.now(),
    };
    setProjects((prev) => [newProj, ...prev]);
    logAction('Created Project', `Created new project entry: "${newProj.title}".`);
    addToast(`Project "${newProj.title}" created.`, 'success');
  };

  const updateProject = (project: SSLGProject) => {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
    logAction('Updated Project', `Updated status or details of project "${project.title}".`);
    addToast(`Project "${project.title}" updated.`, 'success');
  };

  const updateProjectStatus = (id: string, status: ProjectStatus, progressPercent: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, progressPercent } : p))
    );
    logAction('Updated Project Status', `Updated project progress to ${status} (${progressPercent}%).`);
    addToast(`Project status updated to ${status} (${progressPercent}%).`, 'success');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (target) {
      logAction('Deleted Project', `Deleted project entry "${target.title}".`);
      addToast(`Deleted project: ${target.title}`, 'info');
    }
  };

  const addAnnouncement = (data: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...data,
      id: 'ann-' + Date.now(),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logAction('Published Announcement', `Published "${newAnn.title}".`);
    addToast(`Announcement published: "${newAnn.title}"`, 'success');
  };

  const updateAnnouncement = (ann: Announcement) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === ann.id ? ann : a)));
    logAction('Updated Announcement', `Updated announcement "${ann.title}".`);
    addToast('Announcement updated.', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    const target = announcements.find((a) => a.id === id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      logAction('Deleted Announcement', `Removed announcement "${target.title}".`);
      addToast('Announcement removed.', 'info');
    }
  };

  const togglePinAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    );
    const target = announcements.find((a) => a.id === id);
    if (target) {
      logAction('Toggled Pin Announcement', `Toggled pin status for "${target.title}".`);
      addToast(target.isPinned ? 'Announcement unpinned.' : 'Announcement pinned to top!', 'success');
    }
  };

  const addTransparencyDoc = (data: Omit<TransparencyDoc, 'id'>) => {
    const newDoc: TransparencyDoc = {
      ...data,
      id: 'doc-' + Date.now(),
    };
    setTransparencyDocs((prev) => [newDoc, ...prev]);
    logAction('Uploaded Transparency Document', `Uploaded "${newDoc.title}" (${newDoc.category}).`);
    addToast(`Document "${newDoc.title}" added to Transparency Portal.`, 'success');
  };

  const updateTransparencyDoc = (doc: TransparencyDoc) => {
    setTransparencyDocs((prev) => prev.map((d) => (d.id === doc.id ? doc : d)));
    logAction('Updated Document Details', `Updated "${doc.title}".`);
    addToast('Document details updated.', 'success');
  };

  const deleteTransparencyDoc = (id: string) => {
    const target = transparencyDocs.find((d) => d.id === id);
    setTransparencyDocs((prev) => prev.filter((d) => d.id !== id));
    if (target) {
      logAction('Deleted Document', `Removed transparency document "${target.title}".`);
      addToast('Document removed.', 'info');
    }
  };

  const addResource = (data: Omit<ResourceItem, 'id'>) => {
    const newRes: ResourceItem = {
      ...data,
      id: 'res-' + Date.now(),
    };
    setResources((prev) => [newRes, ...prev]);
    logAction('Added Resource Item', `Added "${newRes.title}".`);
    addToast(`Resource "${newRes.title}" published.`, 'success');
  };

  const updateResource = (res: ResourceItem) => {
    setResources((prev) => prev.map((r) => (r.id === res.id ? res : r)));
    logAction('Updated Resource', `Updated "${res.title}".`);
    addToast('Resource updated.', 'success');
  };

  const deleteResource = (id: string) => {
    const target = resources.find((r) => r.id === id);
    setResources((prev) => prev.filter((r) => r.id !== id));
    if (target) {
      logAction('Deleted Resource', `Deleted resource "${target.title}".`);
      addToast('Resource removed.', 'info');
    }
  };

  const incrementDownload = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r))
    );
  };

  const requestResource = (data: { title: string; category: ResourceCategory; details: string }) => {
    logAction('Student Requested Resource', `Requested: ${data.title} (${data.category})`);
    addToast(`Request for "${data.title}" submitted to the SSLG Secretariat.`, 'success');
  };

  const addEvent = (data: Omit<SSLGEvent, 'id'>) => {
    const newEvt: SSLGEvent = {
      ...data,
      id: 'evt-' + Date.now(),
    };
    setEvents((prev) => [newEvt, ...prev]);
    logAction('Added Event', `Scheduled event "${newEvt.title}" for ${newEvt.date}.`);
    addToast(`Event "${newEvt.title}" added to calendar.`, 'success');
  };

  const deleteEvent = (id: string) => {
    const target = events.find((e) => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (target) {
      logAction('Cancelled Event', `Removed event "${target.title}".`);
      addToast('Event removed.', 'info');
    }
  };

  // Student Forum with Anonymous Safety Mechanism
  const addForumPost = ({
    title,
    content,
    category,
    isAnonymous,
  }: {
    title: string;
    content: string;
    category: ForumCategory;
    isAnonymous: boolean;
  }) => {
    const newPost: ForumPost = {
      id: 'post-' + Date.now(),
      title,
      content,
      category,
      authorName: isAnonymous ? 'Anonymous Student' : currentUser.name,
      actualUserId: currentUser.id,
      actualUserName: currentUser.name,
      actualUserGrade: currentUser.gradeLevel || 'Grade 10',
      isAnonymous,
      timestamp: 'Just now',
      likes: 1,
      status: 'active',
      comments: [],
      replies: [],
    };
    setForumPosts((prev) => [newPost, ...prev]);
    addToast(
      isAnonymous
        ? 'Discussion posted anonymously to students. (Verified for safety).'
        : 'Discussion posted to Student Voice.',
      'success'
    );
  };

  const addForumReply = (postId: string, content: string, isAnonymous: boolean) => {
    const reply: ForumReply = {
      id: 'rep-' + Date.now(),
      postId,
      content,
      authorName: isAnonymous ? 'Anonymous Student' : currentUser.name,
      authorRole: currentUser.role === 'admin' ? 'admin' : 'student',
      officerTitle: currentUser.adminRole,
      isAnonymous,
      actualUserId: currentUser.id,
      actualUserName: currentUser.name,
      timestamp: 'Just now',
      likes: 0,
    };
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, replies: [...post.replies, reply] } : post
      )
    );
    addToast('Your response was posted.', 'success');
  };

  const likeForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const togglePostLike = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByMe ? post.likes - 1 : post.likes + 1,
              likedByMe: !post.likedByMe,
            }
          : post
      )
    );
  };

  const addForumComment = (postId: string, text: string, isAnonymous: boolean) => {
    const newComment = {
      id: 'com-' + Date.now(),
      authorName: isAnonymous ? 'Anonymous Learner' : currentUser.name,
      isOfficer: currentUser.role === 'admin',
      date: 'Just now',
      text,
    };
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), newComment],
            }
          : post
      )
    );
    addToast('Response added to discussion thread.', 'success');
  };

  const toggleSocialLike = (id: string) => {
    setSocialPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLikedByUser ? post.likes - 1 : post.likes + 1,
              isLikedByUser: !post.isLikedByUser,
            }
          : post
      )
    );
  };

  const likeForumReply = (postId: string, replyId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map((r) =>
                r.id === replyId ? { ...r, likes: r.likes + 1 } : r
              ),
            }
          : post
      )
    );
  };

  const deleteForumPost = (postId: string) => {
    setForumPosts((prev) => prev.filter((p) => p.id !== postId));
    logAction('Moderated Forum', `Removed forum post ID: ${postId}.`);
    addToast('Forum discussion removed.', 'info');
  };

  const toggleLockForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isLocked: !p.isLocked } : p))
    );
    addToast('Discussion lock status updated.', 'info');
  };

  const reportForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isReported: true } : p))
    );
    addToast('Report submitted. SSLG moderators will review this discussion.', 'warning');
  };

  // Student Suggestion Box
  const addSuggestion = ({
    category,
    subject,
    message,
    isAnonymous,
  }: {
    category: 'Concern' | 'Suggestion' | 'Idea' | 'Student Welfare';
    subject: string;
    message: string;
    isAnonymous: boolean;
  }) => {
    const newSug: StudentSuggestion = {
      id: 'sug-' + Date.now(),
      category,
      subject,
      message,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isAnonymous,
      actualSenderName: currentUser.name,
      actualSenderEmail: currentUser.email,
      status: 'Pending',
    };
    setSuggestions((prev) => [newSug, ...prev]);
    addToast('Thank you! Your suggestion has been submitted to the SSLG Council.', 'success');
  };

  const updateSuggestionStatus = (
    id: string,
    status: 'Pending' | 'Under Review' | 'Addressed' | 'Resolved',
    notes?: string
  ) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, adminNotes: notes ?? s.adminNotes } : s))
    );
    logAction('Updated Suggestion', `Marked suggestion #${id.slice(-4)} as "${status}".`);
    addToast(`Suggestion status updated to ${status}.`, 'success');
  };

  const resolveSuggestion = (id: string, notes?: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Resolved', adminNotes: notes || 'Resolved by SSLG' } : s))
    );
    logAction('Resolved Suggestion', `Marked suggestion #${id.slice(-4)} as Resolved.`);
    addToast('Suggestion marked as Resolved.', 'success');
  };

  // Contact Messages
  const addContactMessage = ({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      subject,
      message,
      dateSent: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false,
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    addToast('Your message has been dispatched to the SSLG Secretariat.', 'success');
  };

  const markMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  // Reset demo data helper
  const resetToDefaultData = () => {
    localStorage.removeItem('tcshs_org_details');
    localStorage.removeItem('tcshs_officers');
    localStorage.removeItem('tcshs_committees');
    localStorage.removeItem('tcshs_projects');
    localStorage.removeItem('tcshs_announcements');
    localStorage.removeItem('tcshs_docs');
    localStorage.removeItem('tcshs_resources');
    localStorage.removeItem('tcshs_events');
    localStorage.removeItem('tcshs_forum');
    localStorage.removeItem('tcshs_suggestions');
    localStorage.removeItem('tcshs_messages');
    localStorage.removeItem('tcshs_logs');

    setOrgDetails(initialOrgDetails);
    setOfficers(initialOfficers);
    setCommittees(initialCommittees);
    setProjects(initialProjects);
    setAnnouncements(initialAnnouncements);
    setTransparencyDocs(initialTransparencyDocs);
    setResources(initialResources);
    setEvents(initialEvents);
    setForumPosts(initialForumPosts);
    setSuggestions(initialSuggestions);
    setContactMessages(initialContactMessages);
    setActivityLogs(initialActivityLogs);

    addToast('System database reset to initial TCSHS SSLG configuration.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        hasScrolledCover,
        setHasScrolledCover,
        scrollToTop,

        theme,
        toggleTheme,

        currentUser,
        loginUser,
        logoutUser,
        isAdmin,
        userRoleTitle,

        orgDetails,
        updateOrgDetails,
        officers,
        updateOfficer,
        addOfficer,
        deleteOfficer,
        committees,
        updateCommittee,

        projects,
        addProject,
        updateProject,
        updateProjectStatus,
        deleteProject,

        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,

        transparencyDocs,
        addTransparencyDoc,
        updateTransparencyDoc,
        deleteTransparencyDoc,

        resources,
        addResource,
        updateResource,
        deleteResource,
        incrementDownload,
        requestResource,

        events,
        addEvent,
        deleteEvent,

        forumPosts,
        addForumPost,
        addForumReply,
        addForumComment,
        likeForumPost,
        likeForumReply,
        togglePostLike,
        deleteForumPost,
        toggleLockForumPost,
        reportForumPost,

        suggestions,
        addSuggestion,
        updateSuggestionStatus,
        resolveSuggestion,

        contactMessages,
        addContactMessage,
        markMessageRead,

        activityLogs,
        auditLogs: activityLogs,
        logAction,

        socialPosts,
        toggleSocialLike,

        previewDoc,
        setPreviewDoc,
        selectedOfficer,
        setSelectedOfficer,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isSuggestionBoxOpen,
        setIsSuggestionBoxOpen,

        toasts,
        addToast,
        removeToast,

        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
