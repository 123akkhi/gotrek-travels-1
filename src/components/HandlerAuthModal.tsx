import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'motion/react';
import {
  X,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  ArrowRight,
  Sparkles,
  KeyRound,
  AlertCircle,
  BadgeCheck,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { HandlerUser, HandlerRole } from '../types';
import { GoTrekLogo } from './GoTrekLogo';

interface HandlerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: HandlerUser) => void;
}

export const HandlerAuthModal: React.FC<HandlerAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Login State - Always initialized empty
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup State - Always initialized empty
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<HandlerRole>('Ground Trip Lead');
  const [signupStation, setSignupStation] = useState('Pithoragarh Operations HQ');

  // Business Number Authentication / Verification State
  const [pendingAuthData, setPendingAuthData] = useState<{
    identifier: string;
    name: string;
    phone: string;
    role: string;
    whatsappLink: string;
    businessPhone: string;
    verificationCode: string;
  } | null>(null);

  const [verificationInput, setVerificationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Reset fields on modal open and tab change so no pre-filled credentials remain
  useEffect(() => {
    if (isOpen) {
      setLoginId('');
      setLoginPassword('');
      setSignupName('');
      setSignupEmail('');
      setSignupPhone('');
      setSignupPassword('');
      setVerificationInput('');
      setPendingAuthData(null);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId || !loginPassword) {
      setErrorMsg('Please enter both Email/Phone and Password.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setPendingAuthData(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginId, password: loginPassword }),
      });
      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem('gotrek_handler_user', JSON.stringify(data.user));
        localStorage.setItem('gotrek_handler_token', data.token || `gt_token_${data.user.id}`);
        onLoginSuccess(data.user);
        onClose();
      } else if (data.pendingVerification) {
        // Account requires Business Number Message Authentication
        setPendingAuthData({
          identifier: loginId,
          name: data.user?.name || loginId,
          phone: data.user?.phone || loginId,
          role: data.user?.role || 'Staff Member',
          whatsappLink: data.whatsappLink,
          businessPhone: data.businessPhone || '+91 72482 85767',
          verificationCode: data.user?.verificationCode || '9412',
        });
        setErrorMsg('Authentication Required: Your staff account requires Business Number verification to activate.');
      } else {
        setErrorMsg(data.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Server error during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPhone || !signupPassword) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          phone: signupPhone,
          password: signupPassword,
          role: signupRole,
          station: signupStation,
        }),
      });
      const data = await res.json();

      if (data.success && data.pendingVerification) {
        setPendingAuthData({
          identifier: signupEmail,
          name: signupName,
          phone: signupPhone,
          role: signupRole,
          whatsappLink: data.whatsappLink,
          businessPhone: data.businessPhone || '+91 72482 85767',
          verificationCode: data.verificationCode || '9412',
        });
        setSuccessMsg('Staff registration recorded! Send authorization message to Business Number below.');
      } else if (data.success && data.user) {
        localStorage.setItem('gotrek_handler_user', JSON.stringify(data.user));
        localStorage.setItem('gotrek_handler_token', data.token || `gt_token_${data.user.id}`);
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Staff registration failed.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationInput || !pendingAuthData) {
      setErrorMsg('Please enter the 4-digit verification PIN.');
      return;
    }

    setErrorMsg('');
    setVerifying(true);

    try {
      const res = await fetch('/api/auth/verify-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: pendingAuthData.identifier,
          code: verificationInput,
        }),
      });
      const data = await res.json();

      if (data.success && data.user) {
        setSuccessMsg('Account successfully verified & activated! Logging in...');
        localStorage.setItem('gotrek_handler_user', JSON.stringify(data.user));
        localStorage.setItem('gotrek_handler_token', data.token || `gt_token_${data.user.id}`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(data.error || 'Invalid verification PIN.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const diff = e.changedTouches[0].clientY - touchStartY;
      if (diff > 80) {
        onClose();
      }
      setTouchStartY(null);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0F172A]/85 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.7 }}
        onDragEnd={(_e, info: PanInfo) => {
          if (info.offset.y > 80 || info.velocity.y > 300) {
            onClose();
          }
        }}
        className="relative w-full max-w-lg bg-white border border-[#E6E2D3] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[92vh] crisp-dialog"
      >
        {/* Mobile Swipe Handle */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full flex flex-col items-center justify-center pt-2 pb-1 bg-[#1E293B] sm:hidden select-none cursor-grab active:cursor-grabbing border-b border-white/10"
        >
          <div className="w-12 h-1.5 rounded-full bg-slate-500 hover:bg-slate-400 transition-colors" />
          <span className="text-[9px] text-slate-400 font-medium tracking-wide mt-0.5">Swipe down to close</span>
        </div>

        {/* Header */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="p-4 sm:p-6 bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] text-white flex items-center justify-between border-b border-amber-500/20"
        >
          <div className="flex items-center gap-3">
            <GoTrekLogo size="md" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                GoTrek Travels Operations Portal
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Staff Authorization & Sign In
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Staff Only Disclaimer Notice */}
        <div className="bg-amber-950 text-amber-200 px-4 py-2 text-[10px] font-medium border-b border-amber-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-amber-400 shrink-0" />
            <span><strong>Staff Portal Only:</strong> For Operations Guides, Permit Officers & Drivers. (Yatri Pilgrims do not log in here).</span>
          </div>
        </div>

        {/* Tabs Switcher (Sign In vs Staff Sign Up) */}
        {!pendingAuthData && (
          <div className="flex border-b border-[#E6E2D3] bg-[#F5F2ED]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 min-h-[44px] py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-[#1E293B] border-b-2 border-amber-600 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck size={15} />
              <span>Staff Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 min-h-[44px] py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-[#1E293B] border-b-2 border-amber-600 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus size={15} />
              <span>Staff Sign Up</span>
            </button>
          </div>
        )}

        {/* Modal Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain space-y-4 text-xs bg-[#FDFBF7] flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
              <span className="font-medium text-[11px] leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5">
              <BadgeCheck size={16} className="shrink-0 text-emerald-600 mt-0.5" />
              <span className="font-semibold text-[11px] leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* VIEW: Pending Business Number Authentication */}
          {pendingAuthData ? (
            <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-2xs animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-900 shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Business Number Authentication Required
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Staff registration for <strong className="text-slate-800">{pendingAuthData.name}</strong> ({pendingAuthData.role})
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-950 space-y-2">
                <p className="font-medium leading-relaxed">
                  To protect Yatra operations data, all staff signups must send an automated WhatsApp message to the official GoTrek Business Number (<strong className="text-amber-900 font-bold">{pendingAuthData.businessPhone}</strong>) for authorization.
                </p>
                <div className="font-mono text-[10px] bg-white p-2 rounded-lg border border-amber-200 text-slate-700">
                  Staff Auth PIN: <span className="font-bold text-emerald-700 text-xs">{pendingAuthData.verificationCode}</span> (or Business Admin PIN: 9412)
                </div>
              </div>

              {/* Action Button 1: Send WhatsApp Message */}
              <a
                href={pendingAuthData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Send WhatsApp Auth Message (+91 72482 85767)</span>
                <ExternalLink size={14} />
              </a>

              {/* Action Button 2: Verification PIN Form */}
              <form onSubmit={handleVerifyPinSubmit} className="pt-2 border-t border-slate-100 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Enter Verification PIN (Sent via Business WhatsApp or 9412)
                  </label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. 9412 or PIN from WhatsApp"
                      value={verificationInput}
                      onChange={(e) => setVerificationInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPendingAuthData(null)}
                    className="px-4 min-h-[44px] py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] active:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{verifying ? 'Authenticating...' : 'Verify & Activate CRM Access'}</span>
                    <CheckCircle2 size={15} />
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'login' ? (
            /* VIEW: Staff Login Form */
            <div className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-3.5" autoComplete="off">
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1">
                    Official Email / WhatsApp Phone
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                      placeholder="Enter official email or 10-digit mobile"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] uppercase tracking-wider mb-1">
                    Handler Authorization Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] py-3.5 rounded-full bg-[#1E293B] hover:bg-[#334155] active:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In To CRM'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          ) : (
            /* VIEW: Staff Sign Up Form */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                  Staff Full Name (As per Govt ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Singh Dhami"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="e.g. name@gotrektravel.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="Enter 10-digit mobile number"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                    Requested Staff Role
                  </label>
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value as HandlerRole)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="Ground Trip Lead">Ground Trip Lead</option>
                    <option value="SDM Permit Liaison Officer">SDM Permit Liaison</option>
                    <option value="4x4 SUV Fleet Manager">4x4 SUV Fleet Manager</option>
                    <option value="Admin Operations Manager">Admin Operations Manager</option>
                    <option value="Medical & Safety Escort">Medical & Safety Escort</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                    Base Station
                  </label>
                  <select
                    value={signupStation}
                    onChange={(e) => setSignupStation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="Pithoragarh Operations HQ">Pithoragarh Operations HQ</option>
                    <option value="Dharchula Field Base">Dharchula Field Base</option>
                    <option value="Kathgodam Railway Station Hub">Kathgodam Railway Hub</option>
                    <option value="Nabi Village Base Homestay">Nabi Village Base</option>
                    <option value="SDM Office Dharchula">SDM Office Dharchula</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1E293B] mb-1">
                  Access Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create strong account password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2D3] bg-white text-slate-900 text-[16px] sm:text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-2xs"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-600 flex items-center gap-2 shadow-2xs">
                <Building2 size={16} className="text-amber-800 shrink-0" />
                <span>Upon submitting, an automated WhatsApp message will be sent to GoTrek Business (+91 72482 85767) to authorize your account.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? 'Registering Staff Account...' : 'Register & Request Business Auth'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
