import React, { useState, memo } from "react";
import { Calculator, Users, Car, MapPin, Calendar, Check, Send } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface CostCalculatorProps {
  onOpenInquiry: (details: string) => void;
  defaultTier?: "standard" | "premium";
}

export const CostCalculator = memo(({ onOpenInquiry, defaultTier = "standard" }: CostCalculatorProps) => {
  const [travellers, setTravellers] = useState<number>(2);
  const [tier, setTier] = useState<"standard" | "premium">(defaultTier);
  const [pickup, setPickup] = useState<"kathgodam" | "delhi" | "dharchula">("kathgodam");
  const [travelDate, setTravelDate] = useState<string>("2027-05-10");

  // Price calculations
  const baseRate = tier === "premium" ? 38000 : 28000;
  const pickupSurcharge = pickup === "delhi" ? 4000 : pickup === "kathgodam" ? 2000 : 0;
  const perPersonPrice = baseRate + pickupSurcharge;
  const totalPrice = perPersonPrice * travellers;
  const advanceAmount = Math.round(totalPrice * 0.3); // 30% advance for permit submission

  const handleBookEstimate = () => {
    const summary = `Estimated Yatra (${travellers} Pax, ${tier.toUpperCase()} Tier, Ex-${pickup.toUpperCase()}, Date: ${travelDate}) - Total ₹${(totalPrice || 0).toLocaleString('en-IN')}`;
    onOpenInquiry(summary);
  };

  return (
    <section id="calculator" className="py-20 bg-[#FDFBF7] relative border-t border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Calculator size={14} className="text-amber-700" />
            <span>Instant Price Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            2027 Yatra <span className="italic text-amber-800">Cost Estimator</span>
          </h2>
          <p className="text-[#5A5A40] text-sm sm:text-base italic">
            Customize your group size, pickup point, and package tier to get a clear transparent cost breakdown.
          </p>
        </div>

        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-[32px] bg-white border border-[#E6E2D3] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="md:col-span-7 space-y-5">
            {/* Number of Travellers */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest flex items-center gap-1.5">
                <Users size={14} className="text-amber-800" />
                <span>Number of Pilgrims (Yatris)</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full accent-[#5A5A40] bg-[#F5F2ED] h-2 rounded-lg cursor-pointer"
                />
                <span className="px-3 py-1.5 rounded-full bg-[#F5F2ED] border border-[#E6E2D3] text-[#1E293B] font-bold text-xs shrink-0">
                  {travellers} {travellers === 1 ? "Yatri" : "Yatris"}
                </span>
              </div>
            </div>

            {/* Package Tier */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest flex items-center gap-1.5">
                <Car size={14} className="text-amber-800" />
                <span>Package Experience Tier</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTier("standard")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    tier === "standard"
                      ? "bg-amber-100/80 border-amber-300 text-amber-900 font-bold"
                      : "bg-[#F5F2ED] border-[#E6E2D3] text-[#1E293B]"
                  }`}
                >
                  <div className="text-xs font-bold">Standard Package</div>
                  <div className="text-[10px] text-[#5A5A40]">₹28,000 · Homestays & Shared Bolero</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier("premium")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    tier === "premium"
                      ? "bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs"
                      : "bg-[#F5F2ED] border-[#E6E2D3] text-[#1E293B]"
                  }`}
                >
                  <div className="text-xs font-bold">Premium Expedition</div>
                  <div className={`text-[10px] ${tier === "premium" ? "text-amber-100/80" : "text-[#5A5A40]"}`}>₹38,000 · 4x4 SUV & Cottages</div>
                </button>
              </div>
            </div>

            {/* Pickup Point */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-800" />
                <span>Pickup / Departure Location</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "kathgodam", label: "Kathgodam Rail" },
                  { key: "delhi", label: "New Delhi" },
                  { key: "dharchula", label: "Dharchula" },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPickup(p.key as any)}
                    className={`py-2 px-3 rounded-full border text-xs font-bold transition-all ${
                      pickup === p.key
                        ? "bg-amber-800 text-white border-amber-800"
                        : "bg-[#F5F2ED] border-[#E6E2D3] text-[#1E293B]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-800" />
                <span>Preferred Departure Date</span>
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min="2027-05-01"
                max="2027-11-30"
                className="w-full bg-[#F5F2ED] border border-[#E6E2D3] rounded-2xl px-3.5 py-2.5 text-xs text-[#1E293B] font-bold focus:border-[#5A5A40] outline-none"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="md:col-span-5 p-7 rounded-[28px] bg-[#5A5A40] text-white flex flex-col justify-between space-y-6 shadow-xl shadow-[#5A5A40]/20">
            <div className="space-y-4">
              <div className="text-[10px] font-bold text-amber-200 uppercase tracking-widest border-b border-white/20 pb-2">
                Estimate Summary
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="opacity-80">Rate per pilgrim:</span>
                  <span className="font-bold text-white">₹{(perPersonPrice || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Inner Line Permit (ILP):</span>
                  <span className="font-bold text-amber-200">100% Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Meals & Accommodations:</span>
                  <span className="font-bold text-amber-200">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">4x4 Mountain Transport:</span>
                  <span className="font-bold text-amber-200">Included</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20">
                <div className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Total Estimated Cost</div>
                <div className="text-3xl font-serif font-black text-white mt-0.5">
                  ₹{(totalPrice || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  Initial Advance for Permit Submission: <span className="font-bold text-amber-200">₹{(advanceAmount || 0).toLocaleString('en-IN')}</span> (30%)
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  const msg = `*Yatra Price Estimate Inquiry — GoTrek Travels 2027*%0A%0A*Pilgrims:* ${travellers} Yatris%0A*Package Tier:* ${tier.toUpperCase()}%0A*Pickup Point:* ${pickup.toUpperCase()}%0A*Travel Date:* ${travelDate}%0A*Rate per Pilgrim:* ₹${(perPersonPrice || 0).toLocaleString('en-IN')}%0A*Total Estimated Cost:* ₹${(totalPrice || 0).toLocaleString('en-IN')}%0A*Advance (30%):* ₹${(advanceAmount || 0).toLocaleString('en-IN')}%0A%0A_Please confirm availability and share the formal quotation PDF._`;
                  window.open(`https://wa.me/917248285767?text=${msg}`, "_blank");
                }}
                className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>Send WhatsApp Estimate</span>
              </button>

              <button
                onClick={handleBookEstimate}
                className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>Request Formal Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CostCalculator.displayName = "CostCalculator";
