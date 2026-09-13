import React, { useEffect } from 'react';
import {
  Award,
  CheckCircle,
  Facebook,
  FolderKanban,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Quote,
  Shield,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfficerProfileModal: React.FC = () => {
  const { selectedOfficer, setSelectedOfficer } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedOfficer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedOfficer]);

  if (!selectedOfficer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="relative h-28 bg-blue-900 p-4 flex items-start justify-end">
          <button
            onClick={() => setSelectedOfficer(null)}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close officer profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 overflow-y-auto flex-1">
          {/* Avatar and Primary Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-14 mb-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-200 shrink-0">
              <img
                src={selectedOfficer.photoUrl}
                alt={selectedOfficer.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  {selectedOfficer.position}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 fill-current" /> Verified Officer
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedOfficer.name}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedOfficer.gradeSection}</span>
                <span>•</span>
                <span>{selectedOfficer.committee}</span>
              </p>
            </div>
          </div>

          {/* Quote */}
          {selectedOfficer.quote && (
            <div className="relative p-4 rounded-xl bg-slate-50 border border-slate-200 my-4 text-xs italic text-slate-700 flex items-start gap-3">
              <Quote className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
              <p className="leading-relaxed">"{selectedOfficer.quote}"</p>
            </div>
          )}

          {/* Bio */}
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-900" />
                Leadership Background & Bio
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {selectedOfficer.bio}
              </p>
            </div>

            {/* Key Flagship Projects */}
            {selectedOfficer.keyProjects && selectedOfficer.keyProjects.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <FolderKanban className="w-3.5 h-3.5 text-blue-900" />
                  Key Projects & Portfolios
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOfficer.keyProjects.map((proj, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-medium border border-blue-200"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Contact Details */}
            <div className="pt-3 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Official Contact & Communication
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                  <a
                    href={`mailto:${selectedOfficer.email}`}
                    className="truncate text-blue-600 hover:underline font-medium"
                  >
                    {selectedOfficer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Phone className="w-4 h-4 text-blue-900 shrink-0" />
                  <span className="text-slate-700 font-medium">
                    {selectedOfficer.contactNumber}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              {selectedOfficer.socials && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[11px] text-slate-500">Socials:</span>
                  {selectedOfficer.socials.facebook && (
                    <a
                      href={selectedOfficer.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded bg-slate-100 hover:bg-blue-900 hover:text-white transition-colors"
                      title="Facebook Profile"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedOfficer.socials.instagram && (
                    <a
                      href={selectedOfficer.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded bg-slate-100 hover:bg-blue-900 hover:text-white transition-colors"
                      title="Instagram Profile"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedOfficer.socials.linkedin && (
                    <a
                      href={selectedOfficer.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded bg-slate-100 hover:bg-blue-900 hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
