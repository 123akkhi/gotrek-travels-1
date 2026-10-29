import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users, Shield, Plus, Building2, Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import { HandlerUser } from "../../types";

interface HandlersRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlers: HandlerUser[];
  onOpenAddHandler: () => void;
}

export const HandlersRosterModal: React.FC<HandlersRosterModalProps> = ({
  isOpen,
  onClose,
  handlers,
  onOpenAddHandler,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 h-[100dvh] z-[160] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-2xl bg-white border border-slate-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl overflow-hidden crisp-dialog max-h-[88dvh] flex flex-col min-h-0 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Shield size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Dharchula & Pithoragarh Operations Staff
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Active expedition officers, SDM liaisons & fleet dispatchers
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Roster List */}
          <div className="flex-1 overflow-y-auto smooth-scroll-y overscroll-contain touch-pan-y min-h-0 space-y-2.5 pr-1 text-xs pb-4">
            {handlers.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                    {h.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{h.name}</span>
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                        {h.badgeId || "GT-STAFF"}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600">{h.role}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Building2 size={11} />
                        {h.station}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={11} />
                        {h.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {h.status || "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">
              Total Authorized Officers: <strong className="text-slate-800">{handlers.length}</strong>
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenAddHandler();
              }}
              className="py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>+ Issue Staff Credentials</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
