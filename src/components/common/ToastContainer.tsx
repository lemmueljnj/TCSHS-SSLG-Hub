import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border border-slate-200 bg-white text-slate-900 transition-all animate-in slide-in-from-bottom-3"
          >
            <div className="mt-0.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 text-xs font-medium leading-relaxed text-slate-800">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
