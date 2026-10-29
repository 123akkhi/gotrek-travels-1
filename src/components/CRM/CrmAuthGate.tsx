import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Lock,
  ShieldCheck,
  UserCheck,
  Mail,
  Phone,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  X
} from "lucide-react";
import { HandlerUser, HandlerRole } from "../../types";
import { GoTrekLogo } from "../GoTrekLogo";

interface CrmAuthGateProps {
  onLoginSuccess: (user: HandlerUser, token?: string) => void;
  onClose: () => void;
}

export const CrmAuthGate: React.FC<CrmAuthGateProps> = ({ onLoginSuccess, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState<HandlerRole>("Ground Trip Lead");
  const [signupStation, setSignupStation] = useState("Pithoragarh Operations HQ");

  // PIN Verification State
  const [pendingVerificationData, setPendingVerificationData] = useState<{
    identifier: string;
    name: string;
    phone: string;
    role: string;
    whatsappLink: string;
    businessPhone: string;
    verificationCode: string;
  } | null>(null);
  const [verificationPin, setVerificationPin] = useState("");

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg("Please provide your Email/Phone and Password.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginIdentifier.trim(),
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem("gotrek_handler_user", JSON.stringify(data.user));
        localStorage.setItem("gotrek_handler_token", data.token || `gt_token_${data.user.id}`);
        onLoginSuccess(data.user, data.token);
      } else if (data.pendingVerification) {
        setPendingVerificationData({
          identifier: loginIdentifier.trim(),
          name: data.user?.name || loginIdentifier,
          phone: data.user?.phone || loginIdentifier,
          role: data.user?.role || "Staff Member",
          whatsappLink: data.whatsappLink,
          businessPhone: data.businessPhone || "+91 72482 85767",
          verificationCode: data.user?.verificationCode || "9412",
        });
        setErrorMsg("Your staff account requires PIN activation.");
      } else {
        setErrorMsg(data.error || "Invalid staff credentials.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup Submit
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim() || !signupPassword.trim()) {
      setErrorMsg("Please fill in all registration fields.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName.trim(),
          email: signupEmail.trim(),
          phone: signupPhone.trim(),
          password: signupPassword.trim(),
          role: signupRole,
          station: signupStation,
        }),
      });

      const data = await res.json();

      if (data.success && data.pendingVerification) {
        setPendingVerificationData({
          identifier: signupEmail.trim(),
          name: signupName.trim(),
          phone: signupPhone.trim(),
          role: signupRole,
          whatsappLink: data.whatsappLink,
          businessPhone: data.businessPhone || "+91 72482 85767",
          verificationCode: data.verificationCode || "9412",
        });
        setSuccessMsg("Registration submitted! Enter your staff PIN to unlock access.");
      } else if (data.success && data.user) {
        localStorage.setItem("gotrek_handler_user", JSON.stringify(data.user));
        localStorage.setItem("gotrek_handler_token", data.token || `gt_token_${data.user.id}`);
        onLoginSuccess(data.user, data.token);
      } else {
        setErrorMsg(data.error || "Staff registration failed.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Server error during registration.");
    } finally {
      setLoading(false);
    }
  };

  // Handle PIN Verification Submit
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationPin.trim() || !pendingVerificationData) {
      setErrorMsg("Please enter the 4-digit verification PIN.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: pendingVerificationData.identifier,
          code: verificationPin.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        setSuccessMsg("Staff account verified! Unlocking CRM...");
        localStorage.setItem("gotrek_handler_user", JSON.stringify(data.user));
        localStorage.setItem("gotrek_handler_token", data.token || `gt_token_${data.user.id}`);
        setTimeout(() => {
          onLoginSuccess(data.user, data.token);
        }, 500);
      } else {
        setErrorMsg(data.error || "Invalid PIN. (Staff verification PIN is 9412)");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const fillQuickLogin = (id: string, pass: string) => {
    setLoginIdentifier(id);
    setLoginPassword(pass);
    setErrorMsg("");
  };

  const handleDirectQuickLogin = async (id: string, pass: string) => {
    setLoginIdentifier(id);
    setLoginPassword(pass);
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id, password: pass }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem("gotrek_handler_user", JSON.stringify(data.user));
        localStorage.setItem("gotrek_handler_token", data.token || `gt_token_${data.user.id}`);
        onLoginSuccess(data.user, data.token);
      } else {
        setErrorMsg(data.error || "Quick login failed.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950 overflow-y-auto min-h-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative my-auto"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Staff Authentication Required
              </h2>
              <p className="text-xs text-slate-400">
                GoTrek Operations & Pilgrim Manifest Gate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Return to Public Website"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security Warning Box */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 mb-6">
          <ShieldCheck size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Without signup and login, CRM data, pilgrim manifests, and SDM permits remain strictly locked. Please sign in or register with staff credentials.
          </p>
        </div>

        {/* Verification View If Active */}
        {pendingVerificationData ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Account Created: {pendingVerificationData.name}</span>
              </div>
              <p className="text-xs text-slate-300">
                Enter your 4-digit Staff Authorization PIN (Default PIN: <strong className="text-amber-400">9412</strong>) to activate this terminal:
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  4-Digit Verification PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationPin}
                  onChange={(e) => setVerificationPin(e.target.value)}
                  placeholder="e.g. 9412"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg tracking-widest font-mono text-white focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPendingVerificationData(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Unlock"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "login"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Staff Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("signup");
                  setErrorMsg("");
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "signup"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Register New Staff
              </button>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2 mb-4">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2 mb-4">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN TAB */}
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Official Email or Mobile Number
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. operations@gotrektravels.com or 7248285767"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Staff Account Password
                  </label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Quick 1-Tap Sign-In Buttons for Mobile & Desktop */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-amber-400">⚡ 1-Tap Instant Access:</span>
                    <span className="text-[10px] text-slate-500">Tap to log in instantly</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDirectQuickLogin("mailgotrek@gmail.com", "admin")}
                      className="text-xs py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-pointer flex items-center justify-between font-bold transition-all disabled:opacity-50"
                    >
                      <span className="truncate">Admin (HQ Dispatch)</span>
                      <span className="text-[10px] bg-amber-500/30 px-1.5 py-0.5 rounded text-amber-200">1-Tap ➔</span>
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDirectQuickLogin("operations@gotrektravels.com", "admin")}
                      className="text-xs py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer flex items-center justify-between font-bold transition-all disabled:opacity-50"
                    >
                      <span className="truncate">Dharchula Field Lead</span>
                      <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">1-Tap ➔</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-2"
                >
                  <Lock size={14} />
                  <span>{loading ? "Authenticating..." : "Sign In & Unlock CRM"}</span>
                </button>
              </form>
            ) : (
              /* SIGNUP TAB */
              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Ramesh Joshi"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="name@gotrektravels.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Assigned Role
                    </label>
                    <select
                      value={signupRole}
                      onChange={(e) => setSignupRole(e.target.value as HandlerRole)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Admin Operations Manager">Admin Operations Manager</option>
                      <option value="Ground Trip Lead">Ground Trip Lead</option>
                      <option value="4x4 Fleet Director">4x4 Fleet Director</option>
                      <option value="SDM Permit Liaison Officer">SDM Permit Liaison Officer</option>
                      <option value="Lead High-Altitude Guide">Lead High-Altitude Guide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Base Station
                    </label>
                    <select
                      value={signupStation}
                      onChange={(e) => setSignupStation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Pithoragarh Operations HQ">Pithoragarh Operations HQ</option>
                      <option value="SDM Office Dharchula Desk">SDM Office Dharchula Desk</option>
                      <option value="Nabi Village Base Homestay">Nabi Village Base Homestay</option>
                      <option value="Kathgodam Transit Hub">Kathgodam Transit Hub</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Set Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-3"
                >
                  <UserCheck size={14} />
                  <span>{loading ? "Registering..." : "Register Staff & Request Access"}</span>
                </button>
              </form>
            )}

            <div className="pt-5 mt-5 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                ← Return to GoTrek Travels Public Site
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
