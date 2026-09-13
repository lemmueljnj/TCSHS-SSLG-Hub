import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Newspaper,
  Pin,
  Search,
  Share2,
  Sparkles,
  Twitter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';

export const UpdatesPage: React.FC = () => {
  const { announcements, events, socialPosts, toggleSocialLike, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'circulars' | 'social' | 'events'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Academic', 'Assembly', 'General', 'Community'];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      categoryFilter === 'All' || ann.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(window.location.href);
    addToast(`Link to "${title}" copied to clipboard!`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <Newspaper className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Public Information Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          UPDATES & SOCIAL MEDIA DISPATCHES
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Stay informed on campus advisories, assembly resolutions, project milestones, and live social feed broadcasts from the TCSHS SSLG.
        </p>
      </div>

      {/* Main Mode Switcher */}
      <div className="flex justify-center border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setActiveTab('circulars')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'circulars'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Council Circulars & Bulletins
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'social'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Social Media Feed (FB & IG)
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Event Calendar Countdowns
          </button>
        </div>
      </div>

      {/* SECTION 1: Council Circulars & Announcements */}
      {(activeTab === 'all' || activeTab === 'circulars') && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Official Announcements & Advisories
              </h2>
              <p className="text-xs text-slate-500">
                Authorized publications released through the Secretariat and Office of the President.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter announcements..."
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 uppercase tracking-wider">
                        {ann.category}
                      </span>
                      {ann.isPinned && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          <Pin className="w-3 h-3 fill-current text-blue-600" /> Pinned
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{ann.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ann.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">
                    By <strong>{ann.author}</strong> ({ann.authorRole})
                  </span>

                  <button
                    onClick={() => handleShare(ann.title)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Share circular"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: Social Media Previews */}
      {(activeTab === 'all' || activeTab === 'social') && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
                Direct From Feeds
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Social Media Feed Broadcasts
              </h2>
              <p className="text-xs text-slate-500">
                Live simulated social posts from the official @TCSHSSSLG accounts with interactive likes and shares.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Follow us on:</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialPosts.map((post) => {
              const isLiked = post.isLikedByUser;

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  {/* Post Header */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-black text-xs">
                        SSLG
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-xs text-slate-900">
                            {post.author}
                          </h4>
                          <span className="w-1 h-1 rounded-full bg-slate-400" />
                          <span className="text-[10px] text-blue-900 font-semibold">
                            {post.handle}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">{post.timestamp}</p>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                      {post.platform === 'facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                      {post.platform === 'instagram' && <Instagram className="w-4 h-4 text-slate-700" />}
                      {post.platform === 'twitter' && <Twitter className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt="Social post"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                      {post.caption}
                    </p>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-blue-900">
                      {post.hashtags.map((tag, i) => (
                        <span key={i}>#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Post Interactions */}
                  <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleSocialLike(post.id)}
                        className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                          isLiked ? 'text-blue-900' : 'hover:text-blue-900'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <div className="flex items-center gap-1.5 font-semibold">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleShare('TCSHS SSLG Post')}
                      className="hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 3: Event Calendar Countdowns */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <section className="space-y-6 pt-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              Campus Schedules
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Events & Activity Countdowns
            </h2>
            <p className="text-xs text-slate-500">
              Never miss a general student assembly, revision clinic, or youth forum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 uppercase">
                      {evt.category}
                    </span>
                    <span className="text-[11px] font-bold text-blue-900">
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="text-[11px] text-slate-500 space-y-1 pt-2">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{evt.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{evt.venue}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => addToast(`Reminder set for: ${evt.title}`, 'success')}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                  >
                    + Add to My Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
