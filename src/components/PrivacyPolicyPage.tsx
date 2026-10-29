import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Database, UserCheck, Phone, Mail, MapPin } from "lucide-react";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onOpenInquiry?: (dest?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, onOpenInquiry }) => {
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
          { label: 'Privacy Policy', active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="Data Protection"
        badgeType="emerald"
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
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-1">
                <Lock size={14} />
                <span>Permit Data Protection & Privacy Notice</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                How GoTrek Travels collects, handles, encrypts, and protects your personal identity documents submitted for Inner Line Permits (SDM Dharchula).
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-xs space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Data Protection Status: <strong className="text-white">Active & Compliant</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FileText size={14} className="text-amber-400" />
                <span>SDM Dharchula Desk: <strong className="text-white">Direct Processing</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Security Commitment Banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <h3 className="font-bold text-slate-900 text-base">Your Identity Documents Are 100% Safe With Us</h3>
            <p className="leading-relaxed">
              We respect your privacy. Identity documents collected (Aadhaar Card, Medical Certificate, Police Clearance) are strictly utilized for filing official Inner Line Permits (ILP) with the Sub-Divisional Magistrate (SDM) Office in Dharchula and ITBP checkposts. We never sell or share your information with commercial third parties.
            </p>
          </div>
        </div>

        {/* Structured Privacy Policy Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-10">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">1</span>
              <h2 className="text-xl font-serif font-bold text-slate-900">Information We Collect</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>To process your pilgrimage permit and manage ground logistics, GoTrek Travels collects:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li><strong>Personal Identity Details:</strong> Full Name, Date of Birth, Gender, Emergency Contact Number, and Permanent Address.</li>
                <li><strong>Government Identity Proofs:</strong> Scanned copy of Aadhaar Card, Voter ID, or Passport (mandatory for border zone security verification).</li>
                <li><strong>Health & Medical Records:</strong> MBBS Medical Fitness Certificate and Blood Group (required for high-altitude medical safety protocols).</li>
                <li><strong>Police Verification Certificate:</strong> Character verification or NOC as stipulated by SDM Dharchula rules for Vyas Valley.</li>
                <li><strong>Booking & Payment Information:</strong> Transaction IDs and payment receipts via encrypted payment gateways (e.g. Razorpay). We do not store full credit/debit card numbers.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">2</span>
              <h2 className="text-xl font-serif font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>Your data is strictly restricted to pilgrimage operational necessities:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase text-emerald-700">Official ILP Filing</div>
                  <p className="text-xs text-slate-600">Submitting permit applications directly to the SDM Dharchula desk & ITBP border checkposts.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase text-emerald-700">Yatra Operations</div>
                  <p className="text-xs text-slate-600">Allocating 4x4 Bolero vehicles, driver rosters, and homestay room rosters in Nabi & Gunji.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase text-emerald-700">Emergency Medical Safety</div>
                  <p className="text-xs text-slate-600">Providing medical details to army bases or hospitals in case of acute mountain sickness (AMS).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase text-emerald-700">WhatsApp Updates</div>
                  <p className="text-xs text-slate-600">Sending real-time batch schedule updates, packing guidelines, and meeting point locations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">3</span>
              <h2 className="text-xl font-serif font-bold text-slate-900">Third-Party Sharing & Government Disclosure</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                3.1. GoTrek Travels <strong>never sells, rents, or monetizes</strong> yatri personal data to third-party advertisers or telemarketers.
              </p>
              <p>
                3.2. Data is shared exclusively with authorized government authorities including the <strong>Sub-Divisional Magistrate (SDM) Office Dharchula, Indo-Tibetan Border Police (ITBP), District Magistrate Pithoragarh, and Border Roads Organisation (BRO)</strong> as mandated by Indian border security law.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">4</span>
              <h2 className="text-xl font-serif font-bold text-slate-900">Data Security & Storage Duration</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                4.1. All digital identity documents are transferred via secure SSL encryption (256-bit) and stored on secure Firebase Firestore servers with restricted access control.
              </p>
              <p>
                4.2. Physical copies of permit forms submitted to SDM Office Dharchula are maintained in government archives as required by law. Digital copies of sensitive ID documents are automatically archived or deleted within 90 days after successful Yatra completion.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">5</span>
              <h2 className="text-xl font-serif font-bold text-slate-900">Your Data Rights & Deletion Requests</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-600 space-y-2.5">
              <p>
                Yatris have the right to inspect, update, or request the deletion of their personal identity records post-trip. To submit a data deletion request, email our Data Protection Officer at <a href="mailto:mailgotrek@gmail.com" className="text-amber-600 font-bold underline">mailgotrek@gmail.com</a> or write to our Pithoragarh HQ office.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Desk */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-serif font-bold text-white">Data Privacy Officer — GoTrek Travels</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Roadways Workshop Road, Opp. Joshi Bhawan, Chandrabhaga, Pithoragarh, Uttarakhand.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="mailto:mailgotrek@gmail.com"
              className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Mail size={14} />
              <span>mailgotrek@gmail.com</span>
            </a>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default PrivacyPolicyPage;

