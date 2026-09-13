import React, { useEffect, useState } from 'react';
import {
  Download,
  FileCheck,
  FileText,
  Printer,
  ShieldCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DocumentPreviewModal: React.FC = () => {
  const { previewDoc, setPreviewDoc, addToast, orgDetails } = useApp();
  const [viewMode, setViewMode] = useState<'sheet' | 'embed'>('sheet');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPreviewDoc]);

  if (!previewDoc) return null;

  const isPdf =
    previewDoc.fileType?.toUpperCase() === 'PDF' ||
    (previewDoc.fileData && previewDoc.fileData.includes('application/pdf'));

  const handleDownload = () => {
    // If a real uploaded file exists in fileData, download it directly
    if (previewDoc.fileData) {
      const link = document.createElement('a');
      link.href = previewDoc.fileData;
      const ext = previewDoc.fileType?.toLowerCase() || 'pdf';
      const filename = `${previewDoc.title.replace(/[^a-zA-Z0-9]/g, '_')}.${ext}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast(`Downloaded official copy: "${filename}"`, 'success');
      return;
    }

    // Generate a downloadable text representation of the document
    const fileContent = `================================================================================
REPUBLIC OF THE PHILIPPINES
DEPARTMENT OF EDUCATION - NATIONAL CAPITAL REGION
${(orgDetails.schoolName || 'TAGUIG CITY SCIENCE HIGH SCHOOL').toUpperCase()}
${(orgDetails.websiteName || orgDetails.orgName || 'SUPREME SECONDARY LEARNER GOVERNMENT').toUpperCase()}
================================================================================

DOCUMENT TITLE: ${previewDoc.title.toUpperCase()}
DOCUMENT REF ID: SSLG-${previewDoc.id.toUpperCase()}-2026
CATEGORY: ${previewDoc.category}
SCHOOL YEAR: ${previewDoc.schoolYear}
DATE UPLOADED: ${previewDoc.dateUploaded}
AUTHENTICATED SIGNATORIES: ${previewDoc.signatory}

SUMMARY & PROVISIONS:
--------------------------------------------------------------------------------
${previewDoc.description}

OFFICIAL EXCERPT / RESOLUTORY PROVISIONS:
--------------------------------------------------------------------------------
${previewDoc.contentSnippet || `Full verified text on file with the Documentation and Secretariat Committee, ${orgDetails.schoolName}.`}

--------------------------------------------------------------------------------
CERTIFICATION:
This document is an authenticated public electronic record issued under the authority of the ${orgDetails.schoolName} Supreme Secondary Learner Government in accordance with DepEd Order No. 47, s. 2014 and the SSLG Open Transparency Initiative.
================================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${previewDoc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Downloaded official copy: "${previewDoc.title}"`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold uppercase text-[10px]">
              {previewDoc.fileType} • {previewDoc.fileSize}
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="truncate max-w-xs sm:max-w-md">{previewDoc.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {previewDoc.fileData && isPdf && (
              <div className="flex items-center bg-slate-200 rounded-lg p-0.5 text-[11px] font-semibold">
                <button
                  onClick={() => setViewMode('sheet')}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'sheet' ? 'bg-white shadow-xs text-blue-900' : 'text-slate-600'
                  }`}
                >
                  Official Sheet
                </button>
                <button
                  onClick={() => setViewMode('embed')}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'embed' ? 'bg-white shadow-xs text-blue-900' : 'text-slate-600'
                  }`}
                >
                  PDF Viewer
                </button>
              </div>
            )}

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Print Document"
              aria-label="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-900 hover:bg-blue-800 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setPreviewDoc(null)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          {viewMode === 'embed' && previewDoc.fileData ? (
            <div className="w-full h-[65vh] bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
              <iframe
                src={previewDoc.fileData}
                title={previewDoc.title}
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-md border border-slate-200 font-sans text-slate-800 relative">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="text-6xl sm:text-7xl font-black rotate-[-30deg] tracking-widest text-slate-900 text-center">
                  {orgDetails.schoolName}
                </span>
              </div>

              {/* Official Letterhead Header */}
              <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  {orgDetails.logoUrl ? (
                    <div className="w-12 h-12 rounded-xl p-1 flex items-center justify-center">
                      <img
                        src={orgDetails.logoUrl}
                        alt={orgDetails.schoolName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      SSLG
                    </div>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Republic of the Philippines • Department of Education
                </p>
                <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                  National Capital Region • Division of Schools
                </p>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-wide uppercase mt-1">
                  {orgDetails.schoolName || 'TAGUIG CITY SCIENCE HIGH SCHOOL'}
                </h2>
                <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mt-0.5">
                  {orgDetails.websiteName || orgDetails.orgName || 'SUPREME SECONDARY LEARNER GOVERNMENT'}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {orgDetails.officeLocation || 'Student Government Headquarters'} • {orgDetails.officialEmail || 'sslg@tcshs.edu.ph'}
                </p>
              </div>

              {/* Document Metadata Box */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 mb-6 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 font-medium">Document ID:</span>{' '}
                  <span className="font-mono font-bold text-slate-900">
                    SSLG-2026-{previewDoc.id.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Classification:</span>{' '}
                  <span className="font-semibold text-blue-900">
                    {previewDoc.category}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Academic Year:</span>{' '}
                  <span className="font-semibold">{previewDoc.schoolYear}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Promulgated:</span>{' '}
                  <span className="font-semibold">{previewDoc.dateUploaded}</span>
                </div>
              </div>

              {/* Document Title & Content */}
              <div className="space-y-4 text-xs leading-relaxed">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 text-center mb-4">
                  {previewDoc.title}
                </h1>

                <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100">
                  <p className="font-semibold text-slate-900 mb-1">Executive Summary:</p>
                  <p className="text-slate-700">{previewDoc.description}</p>
                </div>

                {previewDoc.contentSnippet && (
                  <div className="border-l-2 border-blue-600 pl-4 py-1 text-slate-800 italic bg-slate-50 rounded-r-md">
                    "{previewDoc.contentSnippet}"
                  </div>
                )}

                <p className="text-slate-700">
                  This document constitutes an official legislative and administrative release of the Supreme Secondary Learner Government of {orgDetails.schoolName} for {orgDetails.schoolYear}. All allocations, project approvals, and council resolutions contained herein are certified as conforming with DepEd regulations and student body mandates.
                </p>
              </div>

              {/* Authentication & Signatures Stamp Block */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-[11px] text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
                  <span>Verified Authentic Electronic Public Record</span>
                </div>

                <div className="text-right text-xs">
                  <p className="text-[11px] text-slate-500">Certified by:</p>
                  <p className="font-bold text-slate-900">{previewDoc.signatory}</p>
                  <p className="text-[10px] text-slate-500">SSLG Secretariat</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
