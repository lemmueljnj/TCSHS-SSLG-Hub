import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  FolderOpen,
  HelpCircle,
  MapPin,
  MessageSquare,
  Newspaper,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceItem, SSLGEvent, SSLGProject, TransparencyDoc } from '../../types';

export const SSLGHub: React.FC = () => {
  const {
    setPage,
    announcements,
    events,
    resources,
    transparencyDocs,
    projects,
    setPreviewDoc,
    incrementDownload,
    setIsSuggestionBoxOpen,
    addToast,
  } = useApp();

  const [activeHubTab, setActiveHubTab] = useState<'all' | 'activities' | 'downloads' | 'transparency'>('all');

  const upcomingEvents = events.slice(0, 4);
  const quickDownloads = resources.slice(0, 4);
  const activeProjects = projects.filter((p) => p.status === 'Ongoing' || p.status === 'Upcoming');

  const handleDownloadResource = (res: ResourceItem) => {
    incrementDownload(res.id);
    const content = `TAGUIG CITY SCIENCE HIGH SCHOOL
SUPREME SECONDARY LEARNER GOVERNMENT
OFFICIAL RESOURCE ITEM: ${res.title}
CATEGORY: ${res.category}
FILE FORMAT: ${res.fileType}
DATE PUBLISHED: ${res.dateAdded}

DESCRIPTION:
${res.description}

This resource is an official downloadable form/template provided by the TCSHS SSLG for the academic community.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}.${res.fileType.toLowerCase() === 'pdf' ? 'txt' : 'doc'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast(`Downloaded resource: "${res.title}"`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white text-slate-900 p-6 sm:p-10 shadow-sm border border-slate-200">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5 fill-current text-blue-600" />
              <span>THE SSLG HUB • SIGNATURE STUDENT DESK</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Your Daily Digital Campus Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-2 leading-relaxed">
              Consolidated real-time access to announcements, schedule countdowns, official templates, project progress, and direct council grievance hotlines.
            </p>
          </div>

          {/* Action pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSuggestionBoxOpen(true)}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Suggestion / Concern</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Core Hub Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Circulars & Events Calendar (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Activities & Events Countdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-100">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Upcoming Activities & Convocations
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Official calendar of assemblies, seminars & campaigns
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPage('projects')}
                className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
              >
                Full Calendar →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200 uppercase">
                        {evt.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-600" /> {evt.date} • {evt.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {evt.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {evt.venue}
                    </p>
                  </div>

                  <button
                    onClick={() => addToast(`Calendar reminder noted for: ${evt.title}`, 'success')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-[11px] shrink-0 cursor-pointer"
                  >
                    + Add Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects Pulse & Milestones */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center border border-slate-200">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Ongoing Council Projects
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Live tracking of executive mandates & student welfare campaigns
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPage('projects')}
                className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
              >
                View Tracker →
              </button>
            </div>

            <div className="space-y-4">
              {activeProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {proj.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                      {proj.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target Date: {proj.targetDate}</span>
                    <span>Lead: {proj.leadOfficer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Instant Downloads & Transparency Pulse (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Download Center */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center border border-slate-200">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Quick Downloads Center
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Official templates, requisition slips & intake kits
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPage('resources')}
                className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
              >
                All Resources →
              </button>
            </div>

            <div className="space-y-3">
              {quickDownloads.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 uppercase">
                        {res.fileType}
                      </span>
                      <span className="text-[10px] text-slate-400">{res.fileSize}</span>
                    </div>
                    <p className="font-bold text-slate-900 truncate">
                      {res.title}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {res.downloadsCount} total downloads
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownloadResource(res)}
                    className="p-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition-colors cursor-pointer shrink-0"
                    title="Download Template"
                    aria-label={`Download ${res.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Transparency & Financial Snapshot */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 text-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Fiscal Transparency
                </span>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200 font-bold">
                Audited Q1
              </span>
            </div>

            <div>
              <p className="text-[11px] text-slate-500">SY 2026–2027 Disbursed Fund Utilization</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">₱48,320.00</span>
                <span className="text-xs text-slate-500">of ₱125,000.00 operational allocation</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Utilization Rate</span>
                <span className="text-blue-900 font-bold">38.6%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '38.6%' }} />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500">Auditor-Verified Statement</span>
              <button
                onClick={() => {
                  const q1 = transparencyDocs.find((d) => d.id === 'doc-3') || transparencyDocs[0];
                  setPreviewDoc(q1);
                }}
                className="font-bold text-blue-900 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Inspect Liquidation
              </button>
            </div>
          </div>

          {/* Student Voice Quick Forum Prompt */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Student Voice Forum Discussion</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Have a suggestion on study hall hours, classroom facilities, or research mentors? Share your voice with fellow science scholars or post anonymously.
            </p>
            <button
              onClick={() => setPage('forum')}
              className="w-full py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Go to Forum Discussions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
