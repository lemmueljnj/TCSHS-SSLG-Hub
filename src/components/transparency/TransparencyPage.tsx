import React, { useMemo, useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Download,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Filter,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DocumentCategory, TransparencyDoc } from '../../types';

export const TransparencyPage: React.FC = () => {
  const { transparencyDocs, orgDetails, setPreviewDoc, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const categories: string[] = [
    'All',
    'Accomplishment Reports',
    'Financial Transparency',
    'Official Statements',
    'Resolutions',
    'Memoranda',
  ];

  const filteredDocs = useMemo(() => {
    return transparencyDocs
      .filter((doc) => {
        const matchesSearch =
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.signatory.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat =
          selectedCategory === 'All' || doc.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesYear =
          selectedSchoolYear === 'All' || doc.schoolYear === selectedSchoolYear;

        return matchesSearch && matchesCat && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime();
        } else {
          return new Date(a.dateUploaded).getTime() - new Date(b.dateUploaded).getTime();
        }
      });
  }, [transparencyDocs, searchQuery, selectedCategory, selectedSchoolYear, sortBy]);

  const handleDownload = (doc: TransparencyDoc) => {
    if (doc.fileData) {
      const link = document.createElement('a');
      link.href = doc.fileData;
      const ext = doc.fileType?.toLowerCase() || 'pdf';
      link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast(`Downloaded official record: "${doc.title}"`, 'success');
      return;
    }

    const fileContent = `${orgDetails.schoolName.toUpperCase()} - ${orgDetails.orgName.toUpperCase()}
OFFICIAL TRANSPARENCY DOCUMENT ARCHIVE
Title: ${doc.title}
Reference: SSLG-${doc.id}
Category: ${doc.category}
School Year: ${doc.schoolYear}
Date Uploaded: ${doc.dateUploaded}
Signatories: ${doc.signatory}

${doc.description}

Verified authentic electronic copy issued by the Documentation and Secretariat Committee.`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast(`Downloaded official record: "${doc.title}"`, 'success');
  };

  // Timeline events
  const timelineMilestones = [
    {
      date: 'August 2026',
      title: 'Resolution No. 01-2026: Open Transparency Mandate',
      desc: 'Formally institutionalized open electronic access to student finances and resolutions.',
      category: 'Governance',
    },
    {
      date: 'August 2026',
      title: 'Approved Operational Budget & Fund Allocations',
      desc: 'Line-item distribution approved by the student assembly & school administration.',
      category: 'Budget',
    },
    {
      date: 'September 2026',
      title: 'First Quarter Itemized Financial Liquidation',
      desc: 'Validated receipts, vouchers, and cash disbursements audited with zero audit flags.',
      category: 'Audit',
    },
    {
      date: 'October 2026 (Scheduled)',
      title: 'Mid-Term Program Accomplishment & Volunteer Turnout',
      desc: 'Comprehensive review of Project Lapis at Dunong and Eco-Scientia initiatives.',
      category: 'Report',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Main Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
          <span>Institutional Open Governance & Accountability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          TRANSPARENCY PORTAL
        </h1>
        <blockquote className="text-sm sm:text-base italic text-slate-600 font-medium max-w-2xl mx-auto">
          "Access the SSLG's official accomplishment reports, audited financial balance sheets, liquidation vouchers, and legislative resolutions."
        </blockquote>
      </div>

      {/* Fiscal Integrity Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Operational Allocation (SY 2026–2027)
          </span>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">
            ₱125,000.00
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Approved by Student Conclave</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Q1 Liquidated Disbursements
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            ₱48,320.00
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Supported by 100% Validated Vouchers</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Unencumbered Cash Reserves
          </span>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">
            ₱76,680.00
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Audited by Ethan Kyle David (Auditor)</p>
        </div>
      </div>

      {/* Filters and Search Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, resolutions, budgets, or signatories..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* School year filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedSchoolYear}
              onChange={(e) => setSelectedSchoolYear(e.target.value)}
              className="w-full md:w-auto px-3 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden"
            >
              <option value="All">All School Years</option>
              <option value="SY 2026–2027">SY 2026–2027 (Current)</option>
              <option value="SY 2025–2026">SY 2025–2026</option>
            </select>

            {/* Sort order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full md:w-auto px-3 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900">
            No transparency documents match your query
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedSchoolYear('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-900 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {doc.fileType} • {doc.fileSize}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>

                <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                  <p>
                    <strong>School Year:</strong> {doc.schoolYear}
                  </p>
                  <p>
                    <strong>Uploaded:</strong> {doc.dateUploaded}
                  </p>
                  <p className="truncate">
                    <strong>Signatories:</strong> {doc.signatory}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Preview and Download */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-900" />
                  <span>Preview PDF</span>
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Out-of-the-box Feature: Transparency Timeline */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Chronological Accountability
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            SSLG Transparency Timeline
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Tracking key releases, budget disclosures, and audit approvals across SY 2026–2027.
          </p>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-500/50 space-y-6">
          {timelineMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-slate-950" />
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-blue-300 font-bold text-[11px]">{m.date}</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    {m.category}
                  </span>
                </div>
                <h4 className="font-extrabold text-white text-xs sm:text-sm">{m.title}</h4>
                <p className="text-slate-300 text-xs">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
