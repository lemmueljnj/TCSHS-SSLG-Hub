import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  FolderKanban,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SSLGProject } from '../../types';

export const ProjectsPage: React.FC = () => {
  const { projects } = useApp();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Ongoing' | 'Upcoming'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Student Welfare', 'Facilities', 'Environmental', 'Academic Support', 'Leadership'];

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.leadOfficer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const ongoingCount = projects.filter((p) => p.status === 'Ongoing').length;
  const upcomingCount = projects.filter((p) => p.status === 'Upcoming').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
          <span>Accomplishments & Initiatives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          FLAGSHIP PROJECTS & ACCOMPLISHMENTS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tangible student-centered programs delivering research facilities, academic aid, mental health initiatives, and eco-friendly campus upgrades.
        </p>
      </div>

      {/* Progress Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Council Programs</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{projects.length}</p>
          <p className="text-[11px] text-slate-400">Initiatives Approved by SSLG</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Completed Deliverables</span>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">{completedCount}</p>
          <p className="text-[11px] text-slate-400">100% Verified Outcomes</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Ongoing Operations</span>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">{ongoingCount}</p>
          <p className="text-[11px] text-slate-400">Active Council Tracking</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Upcoming Launches</span>
          <p className="text-2xl font-extrabold text-slate-700 mt-1">{upcomingCount}</p>
          <p className="text-[11px] text-slate-400">Q2-Q4 Pipeline</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, committee, or lead officer..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full md:w-auto">
            {(['All', 'Completed', 'Ongoing', 'Upcoming'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-blue-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Image Banner */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-xs">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/90 text-white backdrop-blur-xs">
                  {project.committee}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    project.status === 'Completed'
                      ? 'bg-blue-900 text-white'
                      : project.status === 'Ongoing'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Timeline: {project.timeline}</span>
                  <span>Target: {project.targetDate}</span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Execution Milestones</span>
                    <span className="font-bold text-slate-900">
                      {project.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-blue-900"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Specs Grid */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400">Lead Officer</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">
                    {project.leadOfficer}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400">Primary Beneficiaries</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">
                    {project.beneficiaries}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
