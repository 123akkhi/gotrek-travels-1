import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, User, Phone, Mail, Building2, KeyRound } from "lucide-react";
import { HandlerRole } from "../../types";

interface AddHandlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (handlerData: any) => Promise<void>;
}

export const AddHandlerModal: React.FC<AddHandlerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Ground Trip Lead" as HandlerRole,
    station: "Pithoragarh Operations HQ",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Ground Trip Lead",
        station: "Pithoragarh Operations HQ",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 h-[100dvh] z-[165] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-md bg-white border border-slate-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-4 shadow-2xl overflow-hidden crisp-dialog max-h-[92dvh] flex flex-col min-h-0 my-auto"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                <Shield size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Issue Officer Credentials
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto smooth-scroll-y overscroll-contain touch-pan-y min-h-0 space-y-3 text-xs text-slate-700 pb-3">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Full Officer Name *</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Singh Dhami"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="9412000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Official Email *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="ops@gotrektravels.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Assign Operational Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as HandlerRole })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 cursor-pointer shadow-2xs"
              >
                <option value="Admin Operations Manager">Admin Operations Manager</option>
                <option value="Ground Trip Lead">Ground Trip Lead</option>
                <option value="SDM Permit Liaison Officer">SDM Permit Liaison Officer</option>
                <option value="4x4 SUV Fleet Manager">4x4 SUV Fleet Manager</option>
                <option value="Medical & Safety Escort">Medical & Safety Escort</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Deployment Station</label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Dharchula 4x4 Base / Nabi Homestay Base"
                  value={formData.station}
                  onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Initial Password *</label>
              <div className="relative">
                <KeyRound size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[48px] py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? "Issuing Credentials..." : "Create Officer Account"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
