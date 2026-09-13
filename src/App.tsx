import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CoverPage } from './components/cover/CoverPage';
import { HomePage } from './components/home/HomePage';
import { SSLGHub } from './components/hub/SSLGHub';
import { OfficersPage } from './components/officers/OfficersPage';
import { TransparencyPage } from './components/transparency/TransparencyPage';
import { ResourcesPage } from './components/resources/ResourcesPage';
import { UpdatesPage } from './components/updates/UpdatesPage';
import { ForumPage } from './components/forum/ForumPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { AboutPage } from './components/about/AboutPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DocumentPreviewModal } from './components/common/DocumentPreviewModal';
import { OfficerProfileModal } from './components/common/OfficerProfileModal';
import { SuggestionBoxModal } from './components/common/SuggestionBoxModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainLayout: React.FC = () => {
  const { page, setPage } = useApp();
  const [showCover, setShowCover] = useState(true);

  // If on initial cover state, display the full-screen cover experience
  if (showCover) {
    return (
      <main className="min-h-screen bg-slate-50 font-sans">
        <CoverPage
          onEnter={() => {
            setShowCover(false);
          }}
        />
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans transition-colors duration-200">
      {/* Pinned Top Navigation */}
      <Header onOpenCover={() => setShowCover(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full animate-in fade-in duration-200">
        {page === 'home' && <HomePage />}
        {page === 'hub' && <SSLGHub />}
        {page === 'officers' && <OfficersPage />}
        {page === 'transparency' && <TransparencyPage />}
        {page === 'resources' && <ResourcesPage />}
        {page === 'updates' && <UpdatesPage />}
        {page === 'forum' && <ForumPage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'admin' && <AdminDashboard />}
      </main>

      {/* Official Footer */}
      <Footer onOpenCover={() => setShowCover(true)} />

      {/* Modals & Overlays */}
      <DocumentPreviewModal />
      <OfficerProfileModal />
      <SuggestionBoxModal />
      <AdminLoginModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
