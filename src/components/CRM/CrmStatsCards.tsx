import React, { memo } from "react";
import { Users, CheckCircle2, Clock, DollarSign, ShieldCheck, Car, TrendingUp } from "lucide-react";
import { LeadBooking } from "../../types";

interface CrmStatsCardsProps {
  leads: LeadBooking[];
}

export const CrmStatsCards: React.FC<CrmStatsCardsProps> = memo(({ leads }) => {
  const totalLeadsCount = leads.length;
  const totalPilgrimsCount = leads.reduce((acc, curr) => acc + (curr.travellers || 1), 0);
  
  const confirmedLeads = leads.filter(
    (l) => l.tripStatus === "Confirmed" || l.status === "Approved & Booked"
  );
  const confirmedPilgrims = confirmedLeads.reduce((acc, curr) => acc + (curr.travellers || 1), 0);

  const ilpProcessingCount = leads.filter(
    (l) => l.status === "ILP Processing" || l.ilpStatus.sdmApproval === "In Progress" || l.ilpStatus.sdmApproval === "Pending"
  ).length;

  const sdmIssuedCount = leads.filter(
    (l) => l.ilpStatus.sdmApproval === "Issued"
  ).length;

  const totalRevenue = leads.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalAdvance = leads.reduce((acc, curr) => acc + (curr.advancePaid || 0), 0);
  const totalBalanceDue = Math.max(0, totalRevenue - totalAdvance);

  const vehiclesAssignedCount = leads.filter(
    (l) => l.assignedVehicle && l.assignedVehicle !== "Unassigned"
  ).length;

  return (
    <div className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-visible gap-2.5 sm:gap-4 shrink-0 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none smooth-scroll-x snap-x">
      {/* 1. Total Inquiries */}
      <div className="w-[200px] sm:w-[220px] lg:w-auto shrink-0 snap-start p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Inquiries
          </span>
          <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60">
            <Users size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900">{totalLeadsCount}</span>
          <span className="text-xs font-semibold text-slate-500">
            ({totalPilgrimsCount} Yatris)
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-amber-800">
          <TrendingUp size={12} />
          <span>Active 2027 Yatra Season</span>
        </div>
      </div>

      {/* 2. Confirmed Trips */}
      <div className="w-[200px] sm:w-[220px] lg:w-auto shrink-0 snap-start p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Confirmed Yatris
          </span>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-900">
            {confirmedLeads.length}
          </span>
          <span className="text-xs font-semibold text-emerald-700">
            ({confirmedPilgrims} Booked)
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Advance Received & Slot Locked</span>
        </div>
      </div>

      {/* 3. SDM Dharchula ILP Permits */}
      <div className="w-[200px] sm:w-[220px] lg:w-auto shrink-0 snap-start p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-sky-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            SDM ILP Permits
          </span>
          <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/60">
            <ShieldCheck size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-sky-950">
            {sdmIssuedCount}
          </span>
          <span className="text-xs font-semibold text-sky-700">
            Issued · {ilpProcessingCount} In Review
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-sky-800">
          <Clock size={12} />
          <span>Dharchula SDM Office Liaison</span>
        </div>
      </div>

      {/* 4. Fleet & Guides Allocated */}
      <div className="w-[200px] sm:w-[220px] lg:w-auto shrink-0 snap-start p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            4x4 SUV & Guides
          </span>
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Car size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-indigo-950">
            {vehiclesAssignedCount}
          </span>
          <span className="text-xs font-semibold text-indigo-700">
            Batches Assigned
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-indigo-800">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span>Local Kumaon Mountain Leads</span>
        </div>
      </div>

      {/* 5. Advance Collected */}
      <div className="w-[220px] sm:w-[240px] lg:w-auto shrink-0 snap-start p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Advance Received
          </span>
          <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60">
            <DollarSign size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-950">
            ₹{totalAdvance.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-slate-500 truncate">
          ₹{totalBalanceDue.toLocaleString("en-IN")} Pending at Kathgodam
        </div>
      </div>
    </div>
  );
});

CrmStatsCards.displayName = "CrmStatsCards";
