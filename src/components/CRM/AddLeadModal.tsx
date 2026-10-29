import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, User, Phone, Mail, Calendar, MapPin, Users, Car } from "lucide-react";
import { LeadBooking } from "../../types";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lead: any) => Promise<void>;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    destination: "Adi Kailash Yatra Package",
    pickupLocation: "Kathgodam / Haldwani (Railway Station Hub)",
    travellers: 2,
    month: "2027-05-15",
    vehiclePreference: "suv" as const,
    tripStatus: "Upcoming" as const,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        destination: "Adi Kailash Yatra Package",
        pickupLocation: "Kathgodam / Haldwani (Railway Station Hub)",
        travellers: 2,
        month: "2027-05-15",
        vehiclePreference: "suv",
        tripStatus: "Upcoming",
        notes: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 h-[100dvh] z-[160] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-lg bg-white border border-slate-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl overflow-hidden crisp-dialog max-h-[92dvh] flex flex-col min-h-0 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300/60">
                <Plus size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Register New Yatri Inquiry</h3>
                <p className="text-[11px] text-slate-500 font-medium">Add pilgrim to Inner Line Permit and batch manifest</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto smooth-scroll-y overscroll-contain touch-pan-y min-h-0 space-y-3.5 text-xs text-slate-700 pr-1 pb-4">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Pilgrim Full Name (As per Aadhar) *</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-900 block mb-1">WhatsApp Mobile *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="yatri@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Yatra Package</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 cursor-pointer shadow-2xs"
                >
                  <option value="Adi Kailash Yatra Package">Adi Kailash Yatra Package</option>
                  <option value="Adi Kailash From Kathgodam">Adi Kailash From Kathgodam</option>
                  <option value="Om Parvat Darshan">Om Parvat Darshan</option>
                  <option value="Kailash Mansarovar Overland">Kailash Mansarovar Overland</option>
                  <option value="Darma Valley & Panchachuli">Darma Valley & Panchachuli</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Travellers Count</label>
                <div className="relative">
                  <Users size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={formData.travellers}
                    onChange={(e) => setFormData({ ...formData, travellers: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Preferred Date *</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Vehicle Preference</label>
                <select
                  value={formData.vehiclePreference}
                  onChange={(e) => setFormData({ ...formData, vehiclePreference: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 cursor-pointer shadow-2xs"
                >
                  <option value="suv">4x4 Mountain SUV (Scorpio/Bolero)</option>
                  <option value="standard">Standard Mountain Cruiser</option>
                  <option value="luxury">Luxury Force Urbania</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Transit Pickup Hub</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Kathgodam Railway Station / Pantnagar Airport"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Special Notes / Medical Details</label>
              <textarea
                rows={2}
                placeholder="Senior citizen, oxygen assistance needed, dietary preferences..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 text-[16px] sm:text-xs outline-none focus:border-amber-700 resize-none shadow-2xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[48px] py-3 rounded-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <span>+ Save Pilgrim Inquiry to CRM</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
