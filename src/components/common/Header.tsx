import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  CheckCircle,
  Compass,
  FileCheck,
  FileText,
  FolderOpen,
  Home,
  Info,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Newspaper,
  Shield,
  Sun,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

interface HeaderProps {
  onOpenCover?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCover }) => {
  const {
    page,
    setPage,
    currentUser,
    isAdmin,
    userRoleTitle,
    logoutUser,
    setIsAdminLoginOpen,
    setIsSuggestionBoxOpen,
    announcements,
    orgDetails,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Find any pinned announcement for the top banner
  const pinnedAnnouncement = announcements.find((a) => a.isPinned);

  const navItems: { id: PageView; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'hub', label: 'SSLG Hub', icon: <Zap className="w-4 h-4" />, isSpecial: true },
    { id: 'officers', label: 'Officers', icon: <Users className="w-4 h-4" /> },
    { id: 'transparency', label: 'Transparency', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'updates', label: 'Updates', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'forum', label: 'Forum', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: PageView) => {
    setPage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-slate-200 transition-colors shadow-xs">
      {/* Top Urgent Pinned Announcement Ticker (if available) */}
      {pinnedAnnouncement && (
        <div className="bg-blue-900 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-blue-800 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 border border-blue-700">
                <Bell className="w-3 h-3 text-blue-300" /> Pinned
              </span>
              <span className="font-medium truncate">{pinnedAnnouncement.title}</span>
            </div>
            <button
              onClick={() => {
                setPage('updates');
              }}
              className="text-blue-200 hover:text-white underline text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              Read Bulletin →
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Custom Uploaded Logo or Official Emblem */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-xs border border-slate-200 group-hover:scale-105 transition-transform overflow-hidden">
              {orgDetails.logoUrl ? (
                <img
                  src={orgDetails.logoUrl}
                  alt={orgDetails.websiteName || orgDetails.schoolName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-blue-900 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                    <path d="M50 5 L55 25 L45 25 Z M50 22 C62 22 72 15 75 8 C72 25 58 32 50 32 C42 32 28 25 25 8 C28 15 38 22 50 22 Z" fill="#60a5fa" />
                    <path d="M46 32 L54 32 L52 75 L48 75 Z" fill="#ffffff" />
                    <circle cx="50" cy="85" r="7" fill="#60a5fa" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="4 2" />
                    <path d="M22 65 C18 50 22 35 32 25 M78 65 C82 50 78 35 68 25" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-slate-900 group-hover:text-blue-900 transition-colors">
                  {orgDetails.websiteName || 'SSLG Portal'}
                </span>
                <span className="hidden md:inline-block bg-blue-50 text-blue-900 font-semibold text-[10px] px-2 py-0.5 rounded-full border border-blue-200">
                  {orgDetails.schoolYear}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide truncate max-w-[180px] sm:max-w-xs">
                {orgDetails.schoolName || 'Taguig City Science High School'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : item.isSpecial
                      ? 'text-blue-900 hover:bg-blue-50 font-bold'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.isSpecial && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Suggestion Box, Cover Screen, Admin / User Profile */}
          <div className="flex items-center gap-2">
            {/* Quick Student Suggestion Box Button */}
            <button
              onClick={() => setIsSuggestionBoxOpen(true)}
              title="Open Student Suggestion & Concern Box"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden md:inline">Suggestion Box</span>
            </button>

            {/* View Cover Screen Button */}
            {onOpenCover && (
              <button
                onClick={onOpenCover}
                title="View Portal Cover Screen"
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              >
                <Compass className="w-3.5 h-3.5 text-blue-800" />
                <span>Cover</span>
              </button>
            )}

            {/* User Profile / Admin Quick Switcher */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    page === 'admin'
                      ? 'bg-blue-900 text-white border-blue-900 font-bold shadow-xs'
                      : 'bg-slate-900 text-white border-slate-800 hover:bg-blue-950'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-blue-300" />
                  <span className="hidden lg:inline">{userRoleTitle}</span>
                  <span className="lg:hidden">Admin</span>
                </button>
                <button
                  onClick={logoutUser}
                  title="Switch to Student View"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Admin Login</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-lg">
          {/* User status card */}
          <div className="mb-4 p-3 rounded-lg bg-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isAdmin ? `SSLG ${currentUser.adminRole}` : 'Learner (Grade 10)'}
                </p>
              </div>
            </div>
            {isAdmin ? (
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-700 hover:text-slate-950 font-semibold underline"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAdminLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-blue-900 font-semibold underline"
              >
                Officer Login
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                  page === 'admin'
                    ? 'bg-blue-900 text-white font-bold'
                    : 'bg-blue-50 text-blue-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsSuggestionBoxOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left bg-blue-50 text-blue-900"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Suggestion / Concern</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
