import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MASTER_ADMIN_KEY, MASTER_ADMIN_USER } from '../../data/initialData';
import { User } from '../../types';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    loginUser,
    addToast,
    setPage,
    orgDetails,
  } = useApp();

  const [adminPasskey, setAdminPasskey] = useState('');
  const [adminName, setAdminName] = useState('SSLG Council Administrator');
  const [showPasskey, setShowPasskey] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    if (adminPasskey.trim() !== MASTER_ADMIN_KEY) {
      setAuthError('Incorrect Admin Passkey. Access restricted to the authorized SSLG administrator only.');
      setIsSubmitting(false);
      return;
    }

    // Authenticated as the sole Master Administrator
    const authenticatedAdmin: User = {
      id: 'admin-master',
      name: adminName.trim() || 'SSLG Council Administrator',
      email: orgDetails.officialEmail || 'admin@sslg.gov.ph',
      role: 'admin',
      adminRole: 'President',
    };

    loginUser(authenticatedAdmin);
    setIsAdminLoginOpen(false);
    setPage('admin');
    addToast('Authenticated as Administrator. You have full access to alter all information, dashboard, documents, bulletins, and updates.', 'success');
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">SSLG Master Admin Gateway</h2>
              <p className="text-[11px] text-slate-300">{orgDetails.schoolName || 'Supreme Secondary Learner Government'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAdminLoginOpen(false);
              setAuthError('');
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>Restricted Council Management</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Access is reserved for the designated SSLG administrator to manage personal information, update leadership records, publish circulars, and upload official transparency documents.
            </p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4 text-xs">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Administrator Identifier / Title
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="SSLG Council Administrator"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Master Admin Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type={showPasskey ? 'text' : 'password'}
                  required
                  value={adminPasskey}
                  onChange={(e) => {
                    setAdminPasskey(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter administrator passkey"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPasskey(!showPasskey)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPasskey ? 'Hide passkey' : 'Show passkey'}
                >
                  {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Authorized passkey required for administrative control.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !adminPasskey.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Authorize & Unlock Admin Panel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
