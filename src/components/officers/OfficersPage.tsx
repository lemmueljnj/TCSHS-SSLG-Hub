import React, { useState } from 'react';
import {
  ArrowDown,
  ChevronRight,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Quote,
  Shield,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Officer } from '../../types';

export const OfficersPage: React.FC = () => {
  const { officers, committees, setSelectedOfficer } = useApp();

  const [selectedCommitteeTab, setSelectedCommitteeTab] = useState<string>('all');

  // Hierarchy
  const president = officers.find((o) => o.hierarchyLevel === 1) || officers[0];
  const vicePresident = officers.find((o) => o.hierarchyLevel === 2) || officers[1];
  const executiveOfficers = officers.filter((o) => o.hierarchyLevel === 3);

  const filteredOfficers =
    selectedCommitteeTab === 'all'
      ? officers
      : officers.filter((o) => o.committee.toLowerCase().includes(selectedCommitteeTab.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <Users className="w-3.5 h-3.5 text-blue-600" />
          <span>SSLG Executive Council & Officers • SY 2026–2027</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          The Council of Servant Leaders
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Elected and appointed learner-representatives sworn to champion student rights, ensure fiscal accountability, and foster holistic development at Taguig City Science High School.
        </p>
      </div>

      {/* 1. Visual Organizational Chart */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Governance Hierarchy
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            SSLG Organizational Chart
          </h2>
          <p className="text-xs text-slate-500">
            Structured leadership flow ensuring parliamentary order and distributed accountability
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6 max-w-5xl mx-auto">
          {/* Level 1: President */}
          {president && (
            <div
              onClick={() => setSelectedOfficer(president)}
              className="relative p-5 rounded-2xl bg-white text-slate-900 border-2 border-blue-600 shadow-md max-w-sm w-full cursor-pointer hover:scale-105 transition-transform text-center group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-900 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                SSLG President
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 mx-auto mt-2 mb-2">
                <img
                  src={president.photoUrl}
                  alt={president.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                {president.name}
              </h3>
              <p className="text-[11px] text-slate-500">{president.gradeSection}</p>
              <p className="text-[10px] text-blue-700 mt-1 font-medium">{president.email}</p>
            </div>
          )}

          {/* Flow Down Indicator */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 2: Vice President */}
          {vicePresident && (
            <div
              onClick={() => setSelectedOfficer(vicePresident)}
              className="relative p-5 rounded-2xl bg-white text-slate-900 border border-slate-300 hover:border-blue-600 shadow-sm max-w-sm w-full cursor-pointer hover:scale-105 transition-transform text-center group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-800 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                SSLG Vice President
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400 mx-auto mt-2 mb-2">
                <img
                  src={vicePresident.photoUrl}
                  alt={vicePresident.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                {vicePresident.name}
              </h3>
              <p className="text-[11px] text-slate-500">{vicePresident.gradeSection}</p>
              <p className="text-[10px] text-blue-700 mt-1 font-medium">{vicePresident.email}</p>
            </div>
          )}

          {/* Flow Down Indicator */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 3: Executive Officers Line */}
          <div className="w-full">
            <div className="text-center mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Secretariat • Treasury • Auditing • Public Information • Protocol
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {executiveOfficers.map((officer) => (
                <div
                  key={officer.id}
                  onClick={() => setSelectedOfficer(officer)}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-600 text-center cursor-pointer transition-all hover:-translate-y-1 shadow-xs group"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-300 mx-auto mb-2">
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="inline-block text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded mb-1">
                    {officer.position}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-900">
                    {officer.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{officer.gradeSection}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Officers Directory */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Profiles & Contacts
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Officers Directory
            </h2>
            <p className="text-xs text-slate-500">
              Hover over cards on desktop or tap on mobile to reveal direct officer contacts and profile briefs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['all', 'Executive', 'Finance', 'Documentation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCommitteeTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedCommitteeTab === tab
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'all' ? 'All Officers' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid with Interactive Hover Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOfficers.map((officer) => (
            <div
              key={officer.id}
              className="relative group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={officer.photoUrl}
                  alt={officer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Permanent badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/85 text-white backdrop-blur-xs">
                    {officer.position}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white text-xs">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Contact Information
                    </p>
                    <div className="space-y-1.5 text-[11px]">
                      <p>
                        <strong className="text-slate-400">Name:</strong> {officer.name}
                      </p>
                      <p>
                        <strong className="text-slate-400">Position:</strong> {officer.position}
                      </p>
                      <p className="truncate">
                        <strong className="text-slate-400">Email:</strong>{' '}
                        <a
                          href={`mailto:${officer.email}`}
                          className="text-blue-300 hover:underline"
                        >
                          {officer.email}
                        </a>
                      </p>
                      <p>
                        <strong className="text-slate-400">Contact:</strong>{' '}
                        {officer.contactNumber}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOfficer(officer)}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>

              {/* Base Card Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {officer.name}
                  </h3>
                  <p className="text-xs text-blue-900 font-semibold mt-0.5">
                    {officer.position}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {officer.committee} • {officer.gradeSection}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {officer.bio}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{officer.email}</span>
                  <button
                    onClick={() => setSelectedOfficer(officer)}
                    className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                  >
                    Profile →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. "The People Behind the Service" */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-slate-900">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Leadership Convictions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            "The People Behind the Service"
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            A deeper look at the core convictions, personal leadership philosophies, and advocacies driving the SY 2026–2027 Supreme Council.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officers.slice(0, 3).map((off) => (
            <div
              key={off.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
            >
              <div>
                <Quote className="w-6 h-6 text-blue-600 mb-3" />
                <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
                  "{off.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
                  <img
                    src={off.photoUrl}
                    alt={off.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{off.name}</h4>
                  <p className="text-[11px] text-blue-900 font-semibold">{off.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Standing Committees Section */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Operational Units
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            SSLG Standing Committees
          </h2>
          <p className="text-xs text-slate-500">
            Dedicated committees executing programs in student rights, financial integrity, media, and logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((comm) => (
            <div
              key={comm.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                    {comm.membersCount} Volunteers
                  </span>
                  <span className="text-[10px] text-slate-400">Active Committee</span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {comm.name}
                </h3>

                <p className="text-xs text-slate-500">
                  <strong className="text-slate-700">Chairperson:</strong>{' '}
                  {comm.chairperson}
                </p>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Key Responsibilities:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {comm.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  <strong>Projects Handled:</strong> {comm.projectsHandled.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
