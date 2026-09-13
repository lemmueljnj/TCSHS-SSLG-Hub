import React from 'react';
import {
  ArrowDown,
  ChevronDown,
  Compass,
  FileCheck,
  GraduationCap,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CoverPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const { setPage, orgDetails } = useApp();

  const handleExplore = () => {
    onEnter();
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  const handleViewOfficers = () => {
    onEnter();
    setPage('officers');
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Mesh & Subtle Academic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-slate-300/30 blur-3xl pointer-events-none" />

      {/* Top Bar: Official Seal & School Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 text-left">
          {/* School Badge / Uploaded Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-md">
            {orgDetails.logoUrl ? (
              <img
                src={orgDetails.logoUrl}
                alt={orgDetails.schoolName}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
            )}
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-950 uppercase block">
              {orgDetails.schoolName || 'Taguig City Science High School'}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Department of Education • Republic of the Philippines</p>
          </div>
        </div>

        {/* Academic Year Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Official Portal • {orgDetails.schoolYear}</span>
        </div>
      </div>

      {/* Center Cover Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-10 sm:py-12 flex flex-col items-center">
        {/* Main Logo Card */}
        <div className="mb-6 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-2 shadow-xl border border-slate-200 animate-in zoom-in duration-300 flex items-center justify-center">
          {orgDetails.logoUrl ? (
            <img
              src={orgDetails.logoUrl}
              alt={orgDetails.websiteName || orgDetails.orgName}
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 flex flex-col items-center justify-center p-3 border border-blue-400/40">
              <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400 fill-current">
                <path d="M50 5 L55 25 L45 25 Z M50 22 C62 22 72 15 75 8 C72 25 58 32 50 32 C42 32 28 25 25 8 C28 15 38 22 50 22 Z" fill="#2563eb" />
                <path d="M46 32 L54 32 L52 75 L48 75 Z" fill="#ffffff" />
                <circle cx="50" cy="85" r="7" fill="#2563eb" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#2563eb" strokeWidth="4" />
              </svg>
            </div>
          )}
        </div>

        {/* Institution Title */}
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-blue-900 mb-2">
          {orgDetails.schoolName || 'TAGUIG CITY SCIENCE HIGH SCHOOL'}
        </p>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-3">
          {orgDetails.websiteName ? (
            orgDetails.websiteName
          ) : (
            <>
              SUPREME SECONDARY <br className="hidden sm:inline" />
              <span className="text-blue-900">
                LEARNER GOVERNMENT
              </span>
            </>
          )}
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 mb-6 shadow-xs">
          <span>{orgDetails.schoolYear}</span>
          <span>•</span>
          <span className="text-blue-700">Official Student Council Platform</span>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-xl text-slate-700 font-semibold max-w-2xl leading-relaxed mb-6">
          "{orgDetails.tagline}"
        </p>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mb-10 leading-relaxed">
          {orgDetails.subTagline || 'Serving with integrity. Empowering science scholars through transparent governance, academic solidarity, and student-first initiatives.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-900 hover:bg-blue-800 text-white shadow-lg shadow-blue-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Enter SSLG Portal</span>
          </button>
          <button
            onClick={handleViewOfficers}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Users className="w-4 h-4 text-blue-900" />
            <span>View Officers Directory</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll-Down Cue */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-slate-500">
        <button
          onClick={handleExplore}
          className="flex flex-col items-center gap-1.5 text-xs hover:text-blue-900 transition-colors cursor-pointer group"
          aria-label="Scroll down to home page"
        >
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-600 group-hover:text-blue-900">
            Scroll to Enter Homepage
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-400 group-hover:border-blue-900 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-blue-900 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
