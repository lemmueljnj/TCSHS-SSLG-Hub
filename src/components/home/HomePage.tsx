import React from 'react';
import {
  ArrowRight,
  Award,
  Bell,
  Calendar,
  CheckCircle,
  Eye,
  FileCheck,
  FileText,
  FolderOpen,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Newspaper,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomePage: React.FC = () => {
  const {
    setPage,
    orgDetails,
    officers,
    committees,
    projects,
    announcements,
    transparencyDocs,
    resources,
    setPreviewDoc,
    setSelectedOfficer,
    setIsSuggestionBoxOpen,
  } = useApp();

  const featuredProjects = projects.slice(0, 3);
  const latestAnnouncements = announcements.slice(0, 3);
  const featuredDocs = transparencyDocs.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Welcome / Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>The Official Voice of TCSHS Scholars • {orgDetails.schoolYear}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {orgDetails.schoolName ? orgDetails.schoolName : 'TCSHS'}{' '}
                <span className="text-blue-900">
                  Learner Government
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Empowering learners. Building leaders. Serving the school community with accountability, scientific innovation, and student-centered integrity.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setPage('officers')}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Meet Our Officers</span>
                </button>
                <button
                  onClick={() => setPage('projects')}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Explore Our Accomplishments</span>
                </button>
              </div>
            </div>

            {/* Hero Quick Badge Visual */}
            <div className="lg:col-span-5">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-xl">
                <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                  Live Portal
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Serving Academic Community</p>
                      <h3 className="font-extrabold text-slate-900 text-base">{orgDetails.schoolName || 'Taguig Science High School'}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-slate-500 text-[11px] font-medium">Enrolled Scholars</p>
                      <p className="text-xl font-extrabold text-blue-900">1,520+</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-slate-500 text-[11px] font-medium">Officers & Councilors</p>
                      <p className="text-xl font-extrabold text-slate-900">{officers.length}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-slate-500 text-[11px] font-medium">Standing Committees</p>
                      <p className="text-xl font-extrabold text-slate-900">{committees.length}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-slate-500 text-[11px] font-medium">Audit Status</p>
                      <p className="text-xl font-extrabold text-blue-900">Verified Clear</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setPage('hub')}
                    className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Enter Student Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission and Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission */}
          <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-blue-100">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-900">
              Core Purpose
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 mb-3">
              OUR MISSION
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {orgDetails.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-blue-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-slate-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-900">
              Future Direction
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 mb-3">
              OUR VISION
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {orgDetails.vision}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Primary Organization Details Section (Editable from Admin) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Institutional Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Primary Organization Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Official registration and administrative data for the Supreme Secondary Learner Government, School Year {orgDetails.schoolYear}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Organization Name</span>
              <p className="font-bold text-slate-900 text-sm mt-1">{orgDetails.orgName}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Academic Year</span>
              <p className="font-bold text-blue-900 text-sm mt-1">{orgDetails.schoolYear}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Current SSLG President</span>
              <p className="font-bold text-slate-900 text-sm mt-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>{orgDetails.currentPresident}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Official SSLG Adviser</span>
              <p className="font-bold text-slate-900 text-sm mt-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>{orgDetails.adviser}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Official Email</span>
              <p className="font-bold text-blue-900 text-sm mt-1 truncate">{orgDetails.officialEmail}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Office Location</span>
              <p className="font-bold text-slate-900 text-xs mt-1 leading-snug">{orgDetails.officeLocation}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Elected Officers</span>
              <p className="font-bold text-blue-900 text-base mt-1">{officers.length} Council Officers</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px]">Standing Committees</span>
              <p className="font-bold text-slate-900 text-base mt-1">{committees.length} Specialized Committees</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Access Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
            Student Portals
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Quick Access Center
          </h2>
          <p className="text-xs text-slate-500">
            Fast links to council transparency papers, downloadable templates, student forum, and contact desks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={() => setPage('transparency')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
              Transparency Documents
            </span>
          </button>

          <button
            onClick={() => setPage('resources')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
              Download Resources
            </span>
          </button>

          <button
            onClick={() => setIsSuggestionBoxOpen(true)}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
              Submit a Concern
            </span>
          </button>

          <button
            onClick={() => setPage('updates')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
              View Announcements
            </span>
          </button>

          <button
            onClick={() => setPage('about')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
              Contact the SSLG
            </span>
          </button>
        </div>
      </section>

      {/* 5. Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Impact & Programs
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Featured Flagship Projects
            </h2>
            <p className="text-xs text-slate-500">
              Tangible programs executed for student academic support, campus facilities, and youth formation.
            </p>
          </div>
          <button
            onClick={() => setPage('projects')}
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                    {proj.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      proj.status === 'Completed'
                        ? 'bg-slate-900 text-white'
                        : proj.status === 'Ongoing'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-slate-500 mb-1">
                    {proj.timeline} • {proj.committee}
                  </p>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="w-1/2">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${proj.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setPage('projects')}
                    className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Latest Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Bulletin Board
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Latest Announcements & Circulars
            </h2>
            <p className="text-xs text-slate-500">
              Official circulars, general assembly notices, and academic support advisories.
            </p>
          </div>
          <button
            onClick={() => setPage('updates')}
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100 uppercase tracking-wider">
                    {ann.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{ann.date}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug mb-2">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {ann.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                  By {ann.author}
                </span>
                <button
                  onClick={() => setPage('updates')}
                  className="font-bold text-blue-900 hover:underline cursor-pointer"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Transparency Portal Highlight Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
                Accountability & Open Governance
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Transparency Portal Highlights
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mt-1">
                Public access to our financial balance sheets, quarterly liquidation records, and legislative council resolutions.
              </p>
            </div>
            <button
              onClick={() => setPage('transparency')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 uppercase">
                      {doc.fileType}
                    </span>
                    <span className="text-[11px] text-slate-400">{doc.dateUploaded}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs leading-snug mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-slate-600 text-[11px] line-clamp-2">
                    {doc.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{doc.fileSize}</span>
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="font-bold text-blue-900 hover:underline cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
