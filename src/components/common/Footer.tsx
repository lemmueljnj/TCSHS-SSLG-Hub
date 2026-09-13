import React from 'react';
import {
  Clock,
  ExternalLink,
  Facebook,
  FileCheck,
  FolderOpen,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Shield,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const Footer: React.FC = () => {
  const { setPage, orgDetails, setIsAdminLoginOpen, resetToDefaultData } = useApp();

  const handleNav = (p: PageView) => {
    setPage(p);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Primary Brand & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1 & 2: Organization Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 border border-slate-700 shadow-xs overflow-hidden">
                {orgDetails.logoUrl ? (
                  <img
                    src={orgDetails.logoUrl}
                    alt={orgDetails.websiteName || orgDetails.schoolName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-blue-900 flex items-center justify-center p-1">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                      <path d="M50 5 L55 25 L45 25 Z M50 22 C62 22 72 15 75 8 C72 25 58 32 50 32 C42 32 28 25 25 8 C28 15 38 22 50 22 Z" fill="#60a5fa" />
                      <path d="M46 32 L54 32 L52 75 L48 75 Z" fill="#ffffff" />
                      <circle cx="50" cy="85" r="7" fill="#60a5fa" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="4 2" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight leading-tight">
                  {orgDetails.websiteName || orgDetails.orgName}
                </h3>
                <p className="text-blue-400 text-xs font-semibold">
                  {orgDetails.schoolYear} • {orgDetails.schoolName}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              The official, constitutionally-mandated student government organization of {orgDetails.schoolName}, advocating learner welfare, transparent administration, and youth empowerment.
            </p>

            <blockquote className="border-l-2 border-blue-600 pl-3 py-1 text-xs italic text-slate-300">
              "{orgDetails.tagline}"
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={orgDetails.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="TCSHS SSLG Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={orgDetails.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="TCSHS SSLG Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
                title="Admin Officer Portal"
                aria-label="Admin Portal"
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('hub')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>The SSLG Hub</span>
                  <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded border border-blue-800">Featured</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('officers')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Officers & Committees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('transparency')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Transparency Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('resources')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Resources & Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('updates')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Updates & Social Feeds
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Student Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Learner Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('forum')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Student Voice Forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Projects & Events Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About the SSLG
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Officer Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data (posts, documents, suggestions) back to original TCSHS defaults?')) {
                      resetToDefaultData();
                    }
                  }}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1 mt-3"
                  title="Reset demo data"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Demo Data</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Secretariat & Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{orgDetails.officeLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${orgDetails.officialEmail}`} className="hover:text-white transition-colors">
                  {orgDetails.officialEmail}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{orgDetails.officeHours}</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-slate-500">Adviser:</p>
                <p className="text-xs font-semibold text-slate-200">{orgDetails.adviser}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {orgDetails.orgName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Republic of the Philippines</span>
            <span>•</span>
            <span>Department of Education</span>
            <span>•</span>
            <span>Division of Taguig City and Pateros</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
