import React, { useMemo, useState } from 'react';
import {
  Archive,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  FileCode,
  FolderDown,
  FolderOpen,
  Package,
  PlusCircle,
  Search,
  Send,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCategory, ResourceItem } from '../../types';

export const ResourcesPage: React.FC = () => {
  const {
    resources,
    incrementDownload,
    setPreviewDoc,
    addToast,
    requestResource,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState<ResourceCategory>('Club & Organization Toolkits');
  const [reqDetails, setReqDetails] = useState('');

  const categories: string[] = [
    'All',
    'Student Council Documents',
    'Club & Organization Toolkits',
    'Student Guides & Handbooks',
    'Design Assets & Templates',
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === 'All' || res.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [resources, searchQuery, selectedCategory]);

  const handleDownload = (res: ResourceItem) => {
    incrementDownload(res.id);

    const fileContent = `================================================================================
TAGUIG CITY SCIENCE HIGH SCHOOL
SUPREME SECONDARY LEARNER GOVERNMENT (SSLG)
OFFICIAL RESOURCE CENTER ARCHIVE
================================================================================

TITLE: ${res.title}
CATEGORY: ${res.category}
FORMAT: ${res.fileType}
SIZE: ${res.fileSize}
DATE ADDED: ${res.dateAdded}

DESCRIPTION & USAGE NOTES:
${res.description}

================================================================================
DISTRIBUTION POLICY:
This material is cleared for academic, co-curricular, and organizational use by recognized Taguig Science clubs, student organizations, and enrolled scholars. Unauthorized commercial use is prohibited.
================================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}.${res.fileType.toLowerCase() === 'pdf' ? 'txt' : 'doc'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast(`Downloaded: "${res.title}"`, 'success');
  };

  const handleDownloadStarterPack = (packName: string) => {
    // Download bundle
    const bundleContent = `================================================================================
TAGUIG CITY SCIENCE HIGH SCHOOL - SUPREME SECONDARY LEARNER GOVERNMENT
STUDENT LEADER STARTER PACK: ${packName.toUpperCase()}
================================================================================

PACK INCLUDES:
1. SSLG Activity & Project Proposal Template (DepEd Compliant)
2. Club Liquidation & Cash Voucher Spreadsheet Format
3. Parliamentary Procedure & Motion Cheat Sheet (Robert's Rules of Order)
4. Certificate of Recognition & Appreciation Official PSD / PPTX Layout
5. TCSHS Official Vector Brand Mark & DepEd Seal Guidelines

GUIDE:
Fill out all green-coded cells prior to submitting to the SSLG Secretariat at sslg@tcshs.edu.ph.
================================================================================`;

    const blob = new Blob([bundleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${packName.replace(/\s+/g, '_')}_SSLG_Bundle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast(`Downloaded Starter Bundle: "${packName}"`, 'success');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim() || !reqDetails.trim()) return;

    requestResource({
      title: reqTitle.trim(),
      category: reqCategory,
      details: reqDetails.trim(),
    });

    setReqTitle('');
    setReqDetails('');
    setIsRequestModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <FolderDown className="w-3.5 h-3.5 text-blue-600" />
          <span>SSLG Open Resource Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          RESOURCE CENTER
        </h1>
        <blockquote className="text-sm sm:text-base italic text-slate-600 font-medium max-w-2xl mx-auto">
          "Free templates, forms, and guides for TCSHS students and student leaders."
        </blockquote>
      </div>

      {/* Out-of-the-Box Feature: Student Leader Starter Packs */}
      <section className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>OUT-OF-THE-BOX CURATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Student Leader Starter Packs
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              One-click bundled packages containing everything a newly appointed club officer, class president, or event lead needs.
            </p>
          </div>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Request a Custom Form</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                Pack #1 • Clubs & Orgs
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                Club President & Secretariat Pack
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Includes Accreditation Packet, Project Proposal forms, Room Reservation slips, and Minutes templates.
              </p>
            </div>
            <button
              onClick={() => handleDownloadStarterPack('Club President & Secretariat Pack')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Package className="w-3.5 h-3.5" /> Download Bundle
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                Pack #2 • Treasury & Audit
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                Treasurer Fiscal Compliance Kit
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Itemized liquidation spreadsheets, DepEd official receipt templates, cash disbursement vouchers.
              </p>
            </div>
            <button
              onClick={() => handleDownloadStarterPack('Treasurer Fiscal Compliance Kit')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Package className="w-3.5 h-3.5" /> Download Bundle
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                Pack #3 • Media & P.I.O.
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                Campus Press & Design Asset Pack
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Official high-res TCSHS logo vector files, DepEd typography guides, Certificate of Merit templates.
              </p>
            </div>
            <button
              onClick={() => handleDownloadStarterPack('Campus Press & Design Asset Pack')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Package className="w-3.5 h-3.5" /> Download Bundle
            </button>
          </div>
        </div>
      </section>

      {/* Search & Category Filter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, constitutions, codes, or assets..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
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

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  {res.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {res.fileType} • {res.fileSize}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                {res.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {res.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Added: {res.dateAdded}</span>
                <span className="font-semibold text-blue-900 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                  {res.downloadsCount} downloads
                </span>
              </div>
            </div>

            {/* Actions: Direct Download & Simulated Preview */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setPreviewDoc({
                    id: res.id,
                    title: res.title,
                    category: res.category,
                    schoolYear: 'SY 2026–2027',
                    dateUploaded: res.dateAdded,
                    fileType: res.fileType,
                    fileSize: res.fileSize,
                    description: res.description,
                    signatory: 'SSLG Committee on Secretariat & Resources',
                  });
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => handleDownload(res)}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request a Resource Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">
              Request a New Form or Guide
            </h3>
            <p className="text-slate-500">
              Need a specialized authorization template, rubric, or certificate? Tell the SSLG Documentation committee what you need.
            </p>

            <form onSubmit={handleRequestSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Resource Name / Subject
                </label>
                <input
                  type="text"
                  required
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  placeholder="e.g. Science Fair Exhibit Waiver Form"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Target Category
                </label>
                <select
                  value={reqCategory}
                  onChange={(e) => setReqCategory(e.target.value as ResourceCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                >
                  <option value="Club & Organization Toolkits">Club & Organization Toolkits</option>
                  <option value="Student Council Documents">Student Council Documents</option>
                  <option value="Student Guides & Handbooks">Student Guides & Handbooks</option>
                  <option value="Design Assets & Templates">Design Assets & Templates</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Explanation / Purpose
                </label>
                <textarea
                  required
                  rows={3}
                  value={reqDetails}
                  onChange={(e) => setReqDetails(e.target.value)}
                  placeholder="Specify which club or student activity this is for..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
