import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Lock,
  MessageSquare,
  Send,
  Shield,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuggestionBoxModal: React.FC = () => {
  const { isSuggestionBoxOpen, setIsSuggestionBoxOpen, addSuggestion, currentUser } = useApp();

  const [category, setCategory] = useState<'Concern' | 'Suggestion' | 'Idea' | 'Student Welfare'>('Suggestion');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSuggestionBoxOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addSuggestion({
        category,
        subject: subject.trim(),
        message: message.trim(),
        isAnonymous,
      });
      setIsSubmitting(false);
      setSubject('');
      setMessage('');
      setIsSuggestionBoxOpen(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 text-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900">Student Suggestion & Concern Box</h2>
              <p className="text-[11px] text-slate-500">SSLG Direct Feedback Channel</p>
            </div>
          </div>
          <button
            onClick={() => setIsSuggestionBoxOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Category selection pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Suggestion', 'Concern', 'Idea', 'Student Welfare'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject / Topic <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Request for study tables in Science Library..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-xs"
            />
          </div>

          {/* Detailed Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain the background, location, affected grade levels, or suggested action..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-xs resize-none"
            />
          </div>

          {/* Anonymous Tracking & Safety Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                Submit Anonymously to the Public
              </span>
            </label>
            <div className="text-[11px] text-slate-600 leading-relaxed pl-6 flex items-start gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy & Safety Protocol:</strong> Your name will be hidden from the student body. In adherence to school safety and anti-bullying policies, your verified learner account (<strong>{currentUser.name}</strong>) is securely logged and visible only to authorized SSLG council officers.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsSuggestionBoxOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !subject.trim() || !message.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit to Council'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
