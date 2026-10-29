import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, FileText, AlertTriangle, Scale, Calendar, Clock, Lock, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { GoTrekLogo } from "./GoTrekLogo";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface TermsPageProps {
  onBack: () => void;
  onOpenInquiry?: (dest?: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack, onOpenInquiry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-slate-800 pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-20 relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Terms & Conditions', active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="Legal & Policy"
        badgeType="gold"
      />

      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      {/* Top Banner Header */}
      <div className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-md relative overflow-hidden">
        {/* Floating Back Button */}
        <div className="max-w-5xl mx-auto mb-6 relative z-20">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Luminous Om Symbol in Sky */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
          <OmLightSymbol size="hero" glowColor="gold" animated={true} />
        </div>

        <div className="max-w-5xl mx-auto space-y-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-1">
                <Scale size={14} />
                <span>Legal & Pilgrimage Agreement</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Terms & Conditions
              </h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Official terms of service, cancellation policy, Inner Line Permit rules, and yatri code of conduct for GoTrek Travels (Pithoragarh HQ).
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-xs space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={14} className="text-amber-400" />
                <span>Last Updated: <strong className="text-white">May 1, 2027</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>UK Tourism Regd: <strong className="text-white">UTTR/PITHORAGARH/04-2026/450066</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick Highlights Alert Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <h3 className="font-bold text-slate-900 text-base">Key Pilgrimage Advisory</h3>
            <p className="leading-relaxed">
              Adi Kailash, Om Parvat, and Vyas Valley lie in restricted border zones requiring valid Inner Line Permits (ILP) from SDM Dharchula and medical clearance. By booking with GoTrek Travels, you agree to strictly comply with border security guidelines issued by ITBP, Indian Army, and District Magistrate Pithoragarh.
            </p>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-10">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">1</span>
              <h2 className="text-xl font-bold text-slate-900">Booking Registration & Inner Line Permit (ILP)</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                1.1. All yatris must submit valid government-issued photo ID proof (Aadhaar Card or Passport) and a certified Medical Fitness Certificate signed by a registered MBBS medical practitioner at least 15 days prior to the departure date.
              </p>
              <p>
                1.2. Inner Line Permits are granted at the sole discretion of the Sub-Divisional Magistrate (SDM) Office, Dharchula, and ITBP border authorities. While GoTrek Travels handles 100% of the permit filing paperwork, we hold no liability for permit rejections due to false documentation or sudden government border restrictions.
              </p>
              <p>
                1.3. Foreign nationals and NRIs must inform GoTrek at the time of booking to facilitate required MHA (Ministry of Home Affairs) special border clearances.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">2</span>
              <h2 className="text-xl font-bold text-slate-900">Payment Terms & Cancellation Policy</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-3">
              <p>
                2.1. A minimum advance deposit of <strong>₹3,000 to ₹10,000 per yatri</strong> (depending on package tier) is required to confirm seat allocation, vehicle reservation, and homestay blockings in Vyas Valley.
              </p>
              <p>
                2.2. Remaining balance must be cleared prior to or upon arrival at Pithoragarh HQ / base camp before the Inner Line Permit briefing.
              </p>

              {/* Cancellation Matrix Table */}
              <div className="overflow-x-auto my-3 border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3">Cancellation Request Time</th>
                      <th className="p-3">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">30+ Days Before Departure</td>
                      <td className="p-3 text-emerald-600 font-bold">90% Refund (10% admin fee deducted)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">15 to 29 Days Before Departure</td>
                      <td className="p-3 text-amber-600 font-bold">50% Refund</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">7 to 14 Days Before Departure</td>
                      <td className="p-3 text-amber-700 font-bold">25% Refund</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold">Less than 7 Days / No-Show</td>
                      <td className="p-3 text-rose-600 font-bold">No Refund (100% Retained for Vehicle/Stay Blocking)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">3</span>
              <h2 className="text-xl font-bold text-slate-900">High Altitude, Weather & Force Majeure Clause</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                3.1. High-altitude Himalayan terrains (14,000+ ft) are susceptible to unpredictable weather, landslides, heavy snowfall, and road blockages near Lipulekh Pass, Kuti, or Malpa.
              </p>
              <p>
                3.2. If a Yatra batch is delayed, halted, or rerouted due to natural calamities, landslides, military movements, or government orders, extra hotel, food, or vehicle expenses incurred shall be borne directly by the yatris on an actual basis.
              </p>
              <p>
                3.3. GoTrek Travels reserves the right to modify or adjust the day-wise itinerary in real time to ensure maximum safety for all pilgrims.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">4</span>
              <h2 className="text-xl font-bold text-slate-900">Yatri Code of Conduct & Sacred Eco-Policy</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                4.1. <strong>Sacred Sanctity:</strong> Adi Kailash and Om Parvat are holy spiritual sites. Consumption of alcohol, non-vegetarian food, or smoking is strictly prohibited during the entire pilgrimage.
              </p>
              <p>
                4.2. <strong>Zero Plastic & Eco-Policy:</strong> Yatris are requested not to litter plastic bottles or wrappers in the fragile Vyas & Darma valleys. GoTrek supports sustainable ecotourism.
              </p>
              <p>
                4.3. <strong>Respect Local Rung Culture:</strong> Yatris must honor the heritage, homestay traditions, and customs of the indigenous Rung tribe in Nabi, Gunji, Kuti, and Napalchu.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">5</span>
              <h2 className="text-xl font-bold text-slate-900">Medical Fitness & AMS Advisory</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                5.1. Yatris with chronic cardiac, severe respiratory, or uncontrolled blood pressure conditions must consult their physician before undertaking this high-altitude journey.
              </p>
              <p>
                5.2. GoTrek provides portable medical oxygen cylinders in all primary 4x4 Bolero vehicles and trained tour leaders equipped with pulse oximeters. However, in emergency acute mountain sickness (AMS) cases requiring helicopter evacuation, costs will be facilitated via insurance or paid by the yatri.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">6</span>
              <h2 className="text-xl font-bold text-slate-900">Jurisdiction</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600">
              <p>
                Any legal disputes, claims, or arbitration arising out of or in connection with GoTrek Travels shall be subject exclusively to the jurisdiction of the courts at <strong>Dharchula / Pithoragarh, Uttarakhand</strong>.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Help Box */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Have questions regarding booking terms?</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Our legal & compliance team at Pithoragarh HQ is available to clarify any queries.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+917248285767"
              className="px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Phone size={14} />
              <span>+91 72482 85767</span>
            </a>
            <button
              onClick={() => onOpenInquiry && onOpenInquiry('Terms & Conditions Inquiry')}
              className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Request Call Back
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default TermsPage;

