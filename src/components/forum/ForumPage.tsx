import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Clock,
  Heart,
  Info,
  Lock,
  MessageCircle,
  MessageSquare,
  PlusCircle,
  Search,
  Send,
  Shield,
  Sparkles,
  ThumbsUp,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ForumPost } from '../../types';

export const ForumPage: React.FC = () => {
  const {
    forumPosts,
    addForumPost,
    togglePostLike,
    addForumComment,
    currentUser,
    addToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New post form state
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<ForumPost['category']>('Campus Concerns');
  const [postContent, setPostContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Active reply thread modal or drawer
  const [activeThreadPost, setActiveThreadPost] = useState<ForumPost | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplyAnonymous, setIsReplyAnonymous] = useState(false);

  const categories = [
    'All',
    'Campus Concerns',
    'Suggestions & Proposals',
    'Academic Support',
    'General Discussion',
    'Extracurriculars',
  ];

  const filteredPosts = forumPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addForumPost({
      title: postTitle.trim(),
      category: postCategory,
      content: postContent.trim(),
      isAnonymous,
    });

    setPostTitle('');
    setPostContent('');
    setIsAnonymous(false);
    setIsCreateModalOpen(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadPost || !replyText.trim()) return;

    addForumComment(activeThreadPost.id, replyText.trim(), isReplyAnonymous);
    setReplyText('');

    // Keep active post updated with latest comment
    const updated = forumPosts.find((p) => p.id === activeThreadPost.id);
    if (updated) {
      setActiveThreadPost(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>Democratic Student Deliberation Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          STUDENT VOICE FORUM
        </h1>
        <blockquote className="text-sm sm:text-base italic text-slate-600 font-medium max-w-2xl mx-auto">
          "A safe space for TCSHS learners to voice ideas, raise concerns, and engage in school-building."
        </blockquote>
      </div>

      {/* Safety & Anti-Harassment Policy Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">
              Student Voice Protocol & Safe Space Guarantee
            </h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              When posting anonymously, your public username is hidden as <em>"Anonymous Learner"</em>. In accordance with DepEd child protection policies, authenticated learner identities remain logged for council moderators to prevent harassment and abuse.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Search & Categories */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussion topics, concerns, or proposals..."
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

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isLiked = post.likedByMe;

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      post.isAnonymous
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-blue-50 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {post.isAnonymous ? <Lock className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">
                        {post.isAnonymous ? 'Anonymous Learner' : post.authorName}
                      </span>
                      {post.isAnonymous && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded border border-slate-200">
                          Privacy Guarded
                        </span>
                      )}
                      {currentUser.role === 'admin' && post.isAnonymous && (
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-semibold border border-slate-200">
                          Admin Audit: {post.authorName} ({post.authorEmail})
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{post.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 uppercase">
                    {post.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      post.status === 'Resolved'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : post.status === 'Under Review'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* SSLG Official Response Badge (if present) */}
              {post.officialResponse && (
                <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-900 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Official Council Action Taken
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {post.officialResponse.date}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {post.officialResponse.text}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    — <strong>{post.officialResponse.officerName}</strong> ({post.officialResponse.officerRole})
                  </p>
                </div>
              )}

              {/* Actions & Thread Expand */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => togglePostLike(post.id)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                      isLiked
                        ? 'text-blue-900'
                        : 'text-slate-500 hover:text-blue-900'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes} Endorsements</span>
                  </button>

                  <button
                    onClick={() => setActiveThreadPost(post)}
                    className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveThreadPost(post)}
                  className="font-bold text-blue-900 hover:underline cursor-pointer"
                >
                  Join Conversation →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE POST MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900">
                Initiate New Student Discussion
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Discussion Category
                </label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                >
                  <option value="Campus Concerns">Campus Concerns</option>
                  <option value="Suggestions & Proposals">Suggestions & Proposals</option>
                  <option value="Academic Support">Academic Support</option>
                  <option value="General Discussion">General Discussion</option>
                  <option value="Extracurriculars">Extracurriculars</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Topic Title
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Summarize your observation or idea clearly..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">
                  Elaboration / Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share details, context, or suggested solutions for the council to review..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 resize-none"
                />
              </div>

              {/* Anonymous Checkbox with Policy Disclosure */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    Post as Anonymous Learner
                  </span>
                </label>
                <p className="text-[10px] text-slate-500 pl-6 leading-relaxed">
                  Your identity is hidden from students. SSLG Council leadership retains identity verification to uphold anti-bullying standards.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* THREAD REPLIES MODAL */}
      {activeThreadPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-slate-200 shadow-2xl max-h-[85vh] flex flex-col text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900 truncate pr-4">
                {activeThreadPost.title}
              </h3>
              <button
                onClick={() => setActiveThreadPost(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Thread */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Original Post */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-semibold text-slate-900 mb-1">
                  {activeThreadPost.isAnonymous ? 'Anonymous Learner' : activeThreadPost.authorName}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {activeThreadPost.content}
                </p>
              </div>

              {/* Replies */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                  Responses ({activeThreadPost.comments.length})
                </h4>

                {activeThreadPost.comments.length === 0 ? (
                  <p className="text-slate-400 text-center py-6">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  activeThreadPost.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3.5 rounded-xl border ${
                        comment.isOfficer
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">
                            {comment.authorName}
                          </span>
                          {comment.isOfficer && (
                            <span className="text-[10px] font-bold bg-blue-900 text-white px-2 py-0.5 rounded">
                              SSLG Officer
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{comment.date}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a respectful comment or question..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isReplyAnonymous}
                  onChange={(e) => setIsReplyAnonymous(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-blue-600"
                />
                <span>Reply anonymously to other learners</span>
              </label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
