import React, { useState } from 'react';
import {
  AlertCircle,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  Eye,
  FileCheck,
  FileText,
  FileUp,
  FolderKanban,
  FolderOpen,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Lock,
  MessageSquare,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Shield,
  Trash2,
  Upload,
  User,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { demoAccounts } from '../../data/initialData';
import {
  AdminRole,
  DocumentCategory,
  ResourceCategory,
  ResourceItem,
  SSLGProject,
  TransparencyDoc,
  User as UserType,
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    loginUser,
    orgDetails,
    updateOrgDetails,
    projects,
    updateProjectStatus,
    transparencyDocs,
    addTransparencyDoc,
    deleteTransparencyDoc,
    resources,
    addResource,
    deleteResource,
    setPreviewDoc,
    announcements,
    addAnnouncement,
    suggestions,
    resolveSuggestion,
    forumPosts,
    auditLogs,
    addToast,
    setPage,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'org' | 'transparency' | 'resources' | 'projects' | 'announcements' | 'concerns' | 'audit' | 'roles'
  >('overview');

  // Org details state form
  const [orgForm, setOrgForm] = useState(orgDetails);

  // New Doc Form
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCat, setNewDocCat] = useState<DocumentCategory>('Financial Transparency');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [newDocSignatory, setNewDocSignatory] = useState('Kassandra Jane D. Lim (Treasurer)');
  const [uploadedDocFile, setUploadedDocFile] = useState<{
    name: string;
    size: string;
    type: string;
    dataUrl: string;
  } | null>(null);

  // New Resource Form
  const [newResTitle, setNewResTitle] = useState('');
  const [newResCategory, setNewResCategory] = useState<string>('Student Council Documents');
  const [newResDesc, setNewResDesc] = useState('');
  const [uploadedResFile, setUploadedResFile] = useState<{
    name: string;
    size: string;
    type: string;
    dataUrl: string;
  } | null>(null);

  // New Announcement Form
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCat, setNewAnnCat] = useState<'Academic' | 'Assembly' | 'General' | 'Community'>('Assembly');
  const [newAnnContent, setNewAnnContent] = useState('');

  // Handle Logo file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, SVG, WebP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setOrgForm((prev) => ({ ...prev, logoUrl: dataUrl }));
      addToast('Logo uploaded! Click "Save Profile Updates" to apply.', 'info');
    };
    reader.readAsDataURL(file);
  };

  // Handle Transparency Document file upload
  const handleDocFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize =
      sizeInMB >= 1 ? `${sizeInMB.toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`;

    const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF';

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedDocFile({
        name: file.name,
        size: formattedSize,
        type: extension,
        dataUrl,
      });

      // Auto-populate title if empty
      if (!newDocTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setNewDocTitle(cleanName);
      }

      addToast(`Attached document: "${file.name}"`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // Handle Resource file upload
  const handleResourceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize =
      sizeInMB >= 1 ? `${sizeInMB.toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`;

    const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF';

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedResFile({
        name: file.name,
        size: formattedSize,
        type: extension,
        dataUrl,
      });

      if (!newResTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setNewResTitle(cleanName);
      }

      addToast(`Attached file: "${file.name}"`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // Handle Org Save
  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgDetails(orgForm);
    addToast('Organization profile and branding updated successfully!', 'success');
  };

  // Handle Doc Save
  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    addTransparencyDoc({
      title: newDocTitle.trim(),
      category: newDocCat,
      schoolYear: orgDetails.schoolYear,
      dateUploaded: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      fileType: uploadedDocFile?.type || 'PDF',
      fileSize: uploadedDocFile?.size || '1.2 MB',
      description: newDocDesc.trim() || 'Official electronic publication validated by council session.',
      signatory: newDocSignatory,
      contentSnippet: `Verified and authenticated on ${new Date().toLocaleDateString()}. Enacted for open student inspection.`,
      fileData: uploadedDocFile?.dataUrl,
    });

    setNewDocTitle('');
    setNewDocDesc('');
    setUploadedDocFile(null);
    addToast('Transparency record published to live student portal!', 'success');
  };

  // Handle Resource Save
  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim()) return;

    addResource({
      title: newResTitle.trim(),
      category: newResCategory as any,
      fileType: uploadedResFile?.type || 'PDF',
      fileSize: uploadedResFile?.size || '1.5 MB',
      downloadsCount: 0,
      description: newResDesc.trim() || 'Official student leadership template and guide provided by the SSLG.',
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileData: uploadedResFile?.dataUrl,
      contentSnippet: `Official resource authorized by ${orgDetails.schoolName} Supreme Secondary Learner Government.`,
    });

    setNewResTitle('');
    setNewResDesc('');
    setUploadedResFile(null);
    addToast('New resource successfully published to Resource Center!', 'success');
  };

  // Handle Ann Save
  const handleAddAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    addAnnouncement({
      title: newAnnTitle.trim(),
      category: newAnnCat,
      summary: newAnnContent.slice(0, 90) + '...',
      content: newAnnContent.trim(),
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      tags: [newAnnCat, 'TCSHS SSLG'],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: currentUser.name,
      authorRole: currentUser.adminRole || 'Executive Officer',
      isPinned: false,
    });

    setNewAnnTitle('');
    setNewAnnContent('');
    addToast('Official circular broadcasted to website!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner with Officer Details & Quick Role Switcher */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
            {currentUser.adminRole ? currentUser.adminRole.slice(0, 2).toUpperCase() : 'AD'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                SSLG Executive Control Panel
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-900 text-blue-200 border border-blue-700">
                {currentUser.adminRole ? `SSLG ${currentUser.adminRole}` : 'Administrator'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Active Session: <strong>{currentUser.name}</strong> • Institutional ID: {currentUser.email}
            </p>
          </div>
        </div>

        {/* Quick Role Switcher Select inside Admin Bar */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-2xl border border-slate-700 text-xs">
          <span className="text-slate-400 text-[11px] pl-2 hidden sm:inline">Role Switcher:</span>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const selected = demoAccounts.find((d) => d.id === e.target.value);
              if (selected) loginUser(selected);
            }}
            className="bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-1.5 text-xs focus:outline-hidden font-semibold cursor-pointer"
          >
            {demoAccounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.adminRole ? `SSLG ${acc.adminRole}` : 'Student'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Admin Sub-navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: Layers },
          { id: 'org', label: 'Org Profile & Branding', icon: Award },
          { id: 'transparency', label: 'Transparency & Finance', icon: FileCheck },
          { id: 'resources', label: 'Resources & Toolkits', icon: FolderOpen },
          { id: 'projects', label: 'Projects & Progress', icon: FolderKanban },
          { id: 'announcements', label: 'Circulars & Bulletins', icon: Newspaper },
          { id: 'concerns', label: `Student Grievances (${suggestions.filter((s) => s.status === 'Pending').length})`, icon: MessageSquare },
          { id: 'roles', label: 'Role Permissions', icon: Users },
          { id: 'audit', label: 'Audit Trail', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Transparency Documents</span>
              <p className="text-2xl font-extrabold text-blue-900 mt-1">{transparencyDocs.length}</p>
              <p className="text-[11px] text-slate-400">All publicly verified</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Flagship Projects</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{projects.length}</p>
              <p className="text-[11px] text-slate-400">Across 6 Standing Committees</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Student Inquiries & Concerns</span>
              <p className="text-2xl font-extrabold text-blue-800 mt-1">{suggestions.length}</p>
              <p className="text-[11px] text-slate-400">Direct council feedback channel</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Discussion Forum Topics</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{forumPosts.length}</p>
              <p className="text-[11px] text-slate-400">Active student discourse</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900">
                Council Executive Shortcuts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveAdminTab('transparency')}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 text-left cursor-pointer transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-blue-900 mb-1" />
                  <p className="font-bold text-slate-900">Upload New Doc</p>
                  <p className="text-[10px] text-slate-500">Post resolution or voucher</p>
                </button>
                <button
                  onClick={() => setActiveAdminTab('announcements')}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 text-left cursor-pointer transition-colors"
                >
                  <Newspaper className="w-4 h-4 text-blue-900 mb-1" />
                  <p className="font-bold text-slate-900">Broadcast Circular</p>
                  <p className="text-[10px] text-slate-500">Post notice to bulletin</p>
                </button>
                <button
                  onClick={() => setActiveAdminTab('projects')}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 text-left cursor-pointer transition-colors"
                >
                  <FolderKanban className="w-4 h-4 text-blue-900 mb-1" />
                  <p className="font-bold text-slate-900">Update Milestones</p>
                  <p className="text-[10px] text-slate-500">Adjust project % bar</p>
                </button>
                <button
                  onClick={() => setActiveAdminTab('concerns')}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 text-left cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-900 mb-1" />
                  <p className="font-bold text-slate-900">Review Concerns</p>
                  <p className="text-[10px] text-slate-500">Address student grievances</p>
                </button>
              </div>
            </div>

            {/* Recent Audit Log Excerpt */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900">
                  Live Audit Activity
                </h3>
                <button
                  onClick={() => setActiveAdminTab('audit')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View All Logs →
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {auditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {log.officerName} ({log.role})
                      </p>
                      <p className="text-slate-500">{log.action}: {log.target}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ORG PROFILE & BRANDING MANAGEMENT TAB */}
      {activeAdminTab === 'org' && (
        <form onSubmit={handleSaveOrg} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Edit Organization Profile, School Branding & Official Logo
            </h3>
            <p className="text-slate-500 mt-0.5">
              Customize your council branding. Upload your official school logo and edit the website name, school name, and council identity. Changes immediately take effect across the Cover Page, Header, Document Letterheads, and Footer.
            </p>
          </div>

          {/* Official Logo & Visual Identity Box */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-900" />
              <h4 className="font-bold text-slate-900 text-sm">Official Council Logo & Emblem</h4>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Live Logo Preview Box */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-slate-200 p-2 flex items-center justify-center shadow-xs overflow-hidden">
                  {orgForm.logoUrl ? (
                    <img
                      src={orgForm.logoUrl}
                      alt="Council Logo Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-blue-900 text-white flex flex-col items-center justify-center font-bold text-xs shadow-inner">
                      <span>SSLG</span>
                      <span className="text-[9px] opacity-75">SEAL</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">Live Preview</span>
              </div>

              {/* Upload & URL Controls */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    Upload Official Logo File (PNG, JPG, SVG, WebP)
                  </label>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-4 h-4 text-blue-900" />
                    <span>Choose Logo File from Computer</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Directly select your high-resolution council seal or school crest.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700">
                    Or Provide Image URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={orgForm.logoUrl || ''}
                      onChange={(e) => setOrgForm({ ...orgForm, logoUrl: e.target.value })}
                      placeholder="https://example.com/official-logo.png"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                    />
                    {orgForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setOrgForm({ ...orgForm, logoUrl: '' })}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School and Portal Name Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Official School Name
              </label>
              <input
                type="text"
                required
                value={orgForm.schoolName}
                onChange={(e) => setOrgForm({ ...orgForm, schoolName: e.target.value })}
                placeholder="e.g. Taguig City Science High School"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Website / Portal Display Name
              </label>
              <input
                type="text"
                required
                value={orgForm.websiteName}
                onChange={(e) => setOrgForm({ ...orgForm, websiteName: e.target.value })}
                placeholder="e.g. TCSHS Supreme Secondary Learner Government"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Official Organization Name
              </label>
              <input
                type="text"
                value={orgForm.orgName}
                onChange={(e) => setOrgForm({ ...orgForm, orgName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                School Year
              </label>
              <input
                type="text"
                value={orgForm.schoolYear}
                onChange={(e) => setOrgForm({ ...orgForm, schoolYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Current SSLG President
              </label>
              <input
                type="text"
                value={orgForm.currentPresident}
                onChange={(e) => setOrgForm({ ...orgForm, currentPresident: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                SSLG Faculty Adviser
              </label>
              <input
                type="text"
                value={orgForm.adviser}
                onChange={(e) => setOrgForm({ ...orgForm, adviser: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Official Contact Email
              </label>
              <input
                type="email"
                value={orgForm.officialEmail}
                onChange={(e) => setOrgForm({ ...orgForm, officialEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Council Office Location
              </label>
              <input
                type="text"
                value={orgForm.officeLocation}
                onChange={(e) => setOrgForm({ ...orgForm, officeLocation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700">
              Official Tagline / Slogan
            </label>
            <input
              type="text"
              value={orgForm.tagline}
              onChange={(e) => setOrgForm({ ...orgForm, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Mission Statement
              </label>
              <textarea
                rows={4}
                value={orgForm.mission}
                onChange={(e) => setOrgForm({ ...orgForm, mission: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">
                Vision Statement
              </label>
              <textarea
                rows={4}
                value={orgForm.vision}
                onChange={(e) => setOrgForm({ ...orgForm, vision: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Branding Updates</span>
          </button>
        </form>
      )}

      {/* 3. TRANSPARENCY & FINANCIAL MANAGEMENT TAB */}
      {activeAdminTab === 'transparency' && (
        <div className="space-y-8">
          {/* Upload New Document Form */}
          <form onSubmit={handleAddDoc} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Publish New Transparency Record or Financial Report
              </h3>
              <p className="text-slate-500 mt-0.5">
                Upload your official council resolutions, financial audits, receipts, or accomplishment reports. Students can preview or download the uploaded document directly.
              </p>
            </div>

            {/* Document File Uploader */}
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors">
              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-2">
                <FileUp className="w-8 h-8 text-blue-900" />
                <span className="font-bold text-slate-800 text-sm">
                  {uploadedDocFile ? 'Replace Attached File' : 'Click to Upload Official Document'}
                </span>
                <span className="text-slate-500 text-[11px]">
                  Supports PDF, DOCX, XLSX, TXT (Up to 25MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.txt"
                  onChange={handleDocFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedDocFile && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-[10px]">
                      {uploadedDocFile.type}
                    </span>
                    <span className="font-semibold text-slate-900 truncate">
                      {uploadedDocFile.name}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      ({uploadedDocFile.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedDocFile(null)}
                    className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Resolution No. 04-2026: Campus Greening Allotment"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Document Category
                </label>
                <select
                  value={newDocCat}
                  onChange={(e) => setNewDocCat(e.target.value as DocumentCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="Accomplishment Reports">Accomplishment Reports</option>
                  <option value="Financial Transparency">Financial Transparency</option>
                  <option value="Official Statements">Official Statements</option>
                  <option value="Resolutions">Resolutions</option>
                  <option value="Memoranda">Memoranda</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-700">
                  Authorized Signatories & Auditors
                </label>
                <input
                  type="text"
                  value={newDocSignatory}
                  onChange={(e) => setNewDocSignatory(e.target.value)}
                  placeholder="e.g. Gabriel Luis Reyes (President) & Kassandra Lim (Treasurer)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-700">
                  Executive Summary / Provisions
                </label>
                <textarea
                  rows={3}
                  value={newDocDesc}
                  onChange={(e) => setNewDocDesc(e.target.value)}
                  placeholder="Summary of amounts disbursed, approved motions, or committee outcomes..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Document to Transparency Portal</span>
            </button>
          </form>

          {/* Existing Docs Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">
                Published Transparency Archive ({transparencyDocs.length})
              </h3>
              <span className="text-[11px] text-slate-500">
                Click Preview or Delete to manage public records
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {transparencyDocs.map((doc) => (
                <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                      {doc.fileData && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Custom Uploaded File
                        </span>
                      )}
                    </div>
                    <strong className="text-slate-900 text-sm block truncate">{doc.title}</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {doc.dateUploaded} • Signed by: {doc.signatory}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-900" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete official record: "${doc.title}"?`)) {
                          deleteTransparencyDoc(doc.id);
                          addToast(`Deleted transparency record: "${doc.title}"`, 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. RESOURCES & TOOLKITS MANAGEMENT TAB */}
      {activeAdminTab === 'resources' && (
        <div className="space-y-8">
          {/* Upload New Resource Form */}
          <form onSubmit={handleAddResource} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Upload New Student Resource, Form, or Toolkit
              </h3>
              <p className="text-slate-500 mt-0.5">
                Provide downloadable documents, constitution drafts, activity proposal forms, liquidations, and toolkits for student leaders and clubs.
              </p>
            </div>

            {/* Resource File Uploader */}
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors">
              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-2">
                <FileUp className="w-8 h-8 text-blue-900" />
                <span className="font-bold text-slate-800 text-sm">
                  {uploadedResFile ? 'Replace Attached File' : 'Click to Upload Resource File'}
                </span>
                <span className="text-slate-500 text-[11px]">
                  Supports PDF, DOCX, XLSX, PPTX, ZIP, TXT (Up to 25MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.pptx,.zip,.txt"
                  onChange={handleResourceFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedResFile && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-[10px]">
                      {uploadedResFile.type}
                    </span>
                    <span className="font-semibold text-slate-900 truncate">
                      {uploadedResFile.name}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      ({uploadedResFile.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedResFile(null)}
                    className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  value={newResTitle}
                  onChange={(e) => setNewResTitle(e.target.value)}
                  placeholder="e.g. Activity Proposal Form & Financial Liquidation Pack"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Resource Category
                </label>
                <select
                  value={newResCategory}
                  onChange={(e) => setNewResCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="Student Council Documents">Student Council Documents</option>
                  <option value="Club & Organization Toolkits">Club & Organization Toolkits</option>
                  <option value="Student Guides & Handbooks">Student Guides & Handbooks</option>
                  <option value="Design Assets & Templates">Design Assets & Templates</option>
                  <option value="Templates">Templates</option>
                  <option value="Forms">Forms</option>
                  <option value="Memoranda">Memoranda</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-700">
                  Description & Instructions for Students
                </label>
                <textarea
                  rows={3}
                  value={newResDesc}
                  onChange={(e) => setNewResDesc(e.target.value)}
                  placeholder="Usage guidelines, deadlines, and committee contact details..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Resource to Hub</span>
            </button>
          </form>

          {/* Existing Resources Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">
                Published Resources & Templates Archive ({resources.length})
              </h3>
              <span className="text-[11px] text-slate-500">
                Live files accessible in the Student Resource Center
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {resources.map((res) => (
                <div key={res.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                        {res.category}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {res.fileType} • {res.fileSize}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {res.downloadsCount} downloads
                      </span>
                      {res.fileData && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Custom Uploaded File
                        </span>
                      )}
                    </div>
                    <strong className="text-slate-900 text-sm block truncate">{res.title}</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setPreviewDoc({
                          id: res.id,
                          title: res.title,
                          category: res.category as any,
                          schoolYear: orgDetails.schoolYear,
                          dateUploaded: res.dateAdded,
                          fileType: res.fileType,
                          fileSize: res.fileSize,
                          description: res.description,
                          signatory: 'SSLG Committee on Secretariat & Resources',
                          fileData: res.fileData,
                          contentSnippet: res.contentSnippet,
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-900" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete resource: "${res.title}"?`)) {
                          deleteResource(res.id);
                          addToast(`Deleted resource: "${res.title}"`, 'info');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete resource"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PROJECTS & PROGRESS TAB (Mandated: Status update & % progress meters) */}
      {activeAdminTab === 'projects' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Manage Council Projects & Progress Trackers
            </h3>
            <p className="text-slate-500">
              Adjust live percentage completions and executive program statuses.
            </p>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {proj.category} • Lead: {proj.leadOfficer}
                    </p>
                  </div>

                  {/* Status buttons */}
                  <div className="flex items-center gap-1.5">
                    {(['Upcoming', 'Ongoing', 'Completed'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateProjectStatus(proj.id, st, proj.progressPercent)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                          proj.status === st
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress bar and slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-[11px]">
                    <span>Execution Completion:</span>
                    <span className="font-bold text-blue-900">
                      {proj.progressPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proj.progressPercent}
                    onChange={(e) =>
                      updateProjectStatus(
                        proj.id,
                        Number(e.target.value) === 100 ? 'Completed' : proj.status,
                        Number(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ANNOUNCEMENTS & BULLETINS TAB */}
      {activeAdminTab === 'announcements' && (
        <div className="space-y-8">
          <form onSubmit={handleAddAnn} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">
              Broadcast Official Bulletin or Circular
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Bulletin Title
                </label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="e.g. Schedule of Grade 10 Science Research Defense"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Classification
                </label>
                <select
                  value={newAnnCat}
                  onChange={(e) => setNewAnnCat(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="Academic">Academic Advisory</option>
                  <option value="Assembly">General Assembly</option>
                  <option value="General">General Notice</option>
                  <option value="Community">Community & Outreach</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-slate-700">
                  Full Circular Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  placeholder="Official statement, directives, and guidelines for students..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Bulletin</span>
            </button>
          </form>

          {/* Existing Circulars */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-slate-900">
              Published Circulars ({announcements.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{ann.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{ann.content}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {ann.date} • Issued by {ann.author}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                    {ann.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. STUDENT GRIEVANCES & CONCERNS TAB (Mandated: Anonymous post identity audit & review) */}
      {activeAdminTab === 'concerns' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Student Suggestion & Concern Triage
              </h3>
              <p className="text-slate-500">
                In compliance with the SSLG Charter, anonymous posts expose identity to authorized council officers for anti-bullying and moderation.
              </p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-800 border border-slate-200 font-bold px-3 py-1 rounded-full">
              {suggestions.filter((s) => s.status === 'Resolved').length} Resolved
            </span>
          </div>

          <div className="space-y-4">
            {suggestions.map((sug) => (
              <div
                key={sug.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {sug.subject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                      {sug.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sug.status === 'Resolved'
                        ? 'bg-slate-100 text-slate-800 border border-slate-300'
                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {sug.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sug.message}
                </p>

                {/* Identity reveal box for admin review */}
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-blue-900" />
                    <span>
                      Sender Status:{' '}
                      <strong className="text-slate-900">
                        {sug.isAnonymous ? 'Posted Anonymously by Scholar' : 'Identified Post'}
                      </strong>
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600">
                      Learner Account: <strong>{sug.submittedBy}</strong> ({sug.submittedEmail})
                    </span>
                  </div>
                  <span className="text-slate-400">{sug.date}</span>
                </div>

                {sug.status === 'Pending' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => resolveSuggestion(sug.id, 'Investigated and resolved by council committee.')}
                      className="px-4 py-1.5 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white transition-colors cursor-pointer"
                    >
                      ✓ Mark as Addressed & Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. ROLE PERMISSIONS TAB */}
      {activeAdminTab === 'roles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className="text-slate-500">
              Constitutional distribution of editorial privileges across SSLG council officers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-900 uppercase">
                SSLG President
              </span>
              <p className="font-extrabold text-slate-900 text-sm">Full Administrative Access</p>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>✓ Full system settings & org metadata</li>
                <li>✓ Document publication & archival</li>
                <li>✓ Review anonymous grievance identities</li>
                <li>✓ Emergency bulletins & broadcast</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase">
                Treasurer & Auditor
              </span>
              <p className="font-extrabold text-slate-900 text-sm">Fiscal Transparency Desk</p>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>✓ Upload balance sheets & liquidations</li>
                <li>✓ Update fund utilization gauges</li>
                <li>✓ Itemized receipts audit verification</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">
                Public Information Officer (P.I.O.)
              </span>
              <p className="font-extrabold text-slate-900 text-sm">Media & Dispatches Desk</p>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>✓ Post announcements & assembly advisories</li>
                <li>✓ Manage social media preview broadcasts</li>
                <li>✓ Upload design assets and photography</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 8. AUDIT TRAIL TAB */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Permanent Administrative Activity Log
            </h3>
            <p className="text-slate-500">
              Immutable audit record of all updates, uploads, and status changes made in this session.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">
                    {log.officerName}{' '}
                    <span className="font-normal text-slate-500">({log.role})</span>
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-blue-900">{log.action}:</strong>{' '}
                    {log.target}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
