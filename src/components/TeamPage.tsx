import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  Award,
  PhoneCall,
  MapPin,
  Sparkles,
  CheckCircle2,
  Users,
  Car,
  HeartPulse,
  Compass,
  Building2,
  ChevronRight,
  FileText
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "operations" | "guides" | "fleet" | "hospitality" | "medical" | "marketing-sales";
  location: string;
  experience: string;
  avatar: string;
  specialty: string;
  badge: string;
  bio: string;
  phone?: string;
  highlights: string[];
}

const ALL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "vinay-gururani",
    name: "Vinay Gururani",
    role: "Co-Founder & SDM Permit Operations Director",
    category: "operations",
    location: "Pithoragarh HQ & Dharchula Base",
    experience: "7+ Years",
    avatar: "/images/team/team3.webp",
    specialty: "Inner Line Permits (ILP), Army & ITBP Clearances",
    badge: "Government Liaison Lead",
    bio: "Born in Kumaon, Vinay Gururani has facilitated over 15,000 Inner Line Permits for Adi Kailash and Om Parvat yatris with 100% approval rate. He coordinates directly with SDM offices and ITBP border checkposts.",
    highlights: ["100% Single-Day Permit Guarantee", "Direct SDM Office Desk Liaison", "VIP & Group Batch Permits"]
  },
  {
    id: "pawan-singh-bisht",
    name: "Pawan Singh Bisht",
    role: "Co-Founder & Mountain Fleet Director",
    category: "fleet",
    location: "Pithoragarh, Dharchula & Kathgodam",
    experience: "8+ Years",
    avatar: "/images/team/team1.webp",
    specialty: "4x4 Himalayan Fleet Safety & All-Weather Drivers",
    badge: "Safety Fleet Lead",
    bio: "Manages our dedicated fleet of 45+ 4x4 Mahindra Scorpios and Boleros with seasoned Kumaoni drivers trained in high-altitude mountain navigation, snow chains, and emergency repair.",
    highlights: ["45+ Dedicated 4x4 Bolero Vehicles", "Snow & Landslide Rescue Certified", "Daily Vehicle Safety Audits"]
  },
  {
    id: "Priyanka",
    name: "Priyanka",
    role: "Head of Pilgrim Relations & Yatra Sales Director",
    category: "marketing-sales",
    location: "Dehradun, Rishikesh & Pithoragarh HQ",
    experience: "4+ Years",
    avatar: "/images/team/team7.webp",
    specialty: "Senior Citizen Guidance, Custom Batches & Advisory",
    badge: "Sales & Pilgrim Relations Lead",
    bio: "Leads our direct yatra consultation desk. Has assisted over 6,000 pilgrims with custom itineraries, altitude acclimation plans, senior citizen clearance forms, and seamless booking consultations.",
    highlights: ["Senior Citizen Yatra Consultations", "Customized Family & Ashram Batches", "Direct WhatsApp Itinerary Quotations"]
  },
  {
    id: "Akshay Kumar",
    name: "Rohit Verma",
    role: "Head of Digital Marketing & Himalayan Media Outreach",
    category: "marketing-sales",
    location: "Pithoragarh HQ & Delhi NCR",
    experience: "6+ Years",
    avatar: "/images/team/team4.webp",
    specialty: "Live Route Broadcasts, Docuseries & Digital Campaigns",
    badge: "Growth & Brand Strategy Lead",
    bio: "Spearheads pan-India awareness for the sacred Adi Kailash & Om Parvat pilgrimage. Directs ground video broadcasts from Dharchula and Gunji, weather alerts, and authentic pilgrim storytelling docuseries.",
    highlights: ["Live Route Broadcasts & Weather Alerts", "Pilgrim Testimonials & Docuseries", "Pan-India Travel Expo Alliances"]
  },
  {
    id: "Neelam",
    name: "Neelam",
    role: "Senior Corporate & Group Sales Specialist",
    category: "marketing-sales",
    location: "Rishikesh, Haridwar & Pithoragarh",
    experience: "3+ Years",
    avatar: "/images/team/team6.webp",
    specialty: "Ashram Trusts, Corporate Retreats & B2B Alliances",
    badge: "Group Sales Specialist",
    bio: "Dedicated to organizing customized group pilgrimages for spiritual trusts, yoga ashrams, and corporate teams with dedicated 4x4 convoys, group permits, and private catering in Vyas Valley.",
    highlights: ["Corporate Spiritual Expeditions", "Ashram Trusts & Sangha Group Convoys", "B2B Travel Partner Programs"]
  },
  {
    id: "deepak-singh-mehta",
    name: "Deepak Singh Mehta",
    role: "Lead High-Altitude Guide & Safety Rescue Manager",
    category: "guides",
    location: "Vyas Valley & Jolingkong",
    experience: "7+ Years",
    avatar: "/images/team/team2.webp",
    specialty: "High-Altitude Acclimatization & Parvati Sarovar Escort",
    badge: "Certified First Responder",
    bio: "Certified high-altitude guide who has led over 250 expeditions to Adi Kailash, Om Parvat, Parvati Sarovar, and Valley of Flowers with complete doctor-certified oxygen support.",
    highlights: ["High Altitude Oxygen Protocol", "Parvati Sarovar & Om Parvat Guide", "Wilderness Rescue Certified"]
  },
  {
    id: "akshay-raj",
    name: "Akshay Raj",
    role: "Chief Technology Officer & Yatri Experience Lead",
    category: "operations",
    location: "Pithoragarh HQ & Rishikesh",
    experience: "8+ Years",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    specialty: "AI Permit Consultant & Digital Booking Experience",
    badge: "Tech & Experience Lead",
    bio: "Oversees digital booking systems, instant WhatsApp permit tracking, AI travel consultants, and 24/7 guest consultation for seamless high-altitude yatra experiences.",
    highlights: ["Instant AI Permit Assistant", "Live WhatsApp Permit Tracker", "24/7 Guest Desk Support"]
  }
];

interface TeamPageProps {
  onBack: () => void;
  onOpenInquiry: (topic?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onBack, onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredMembers = selectedCategory === "all"
    ? ALL_TEAM_MEMBERS
    : ALL_TEAM_MEMBERS.filter(m => m.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Our Team & Guides', active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="Native Expedition Leaders"
        badgeType="gold"
      />

      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12 relative z-10">
        {/* Hero Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#1E293B] via-[#2A384C] to-[#1E293B] rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-amber-500/20"
        >
          {/* Floating Back Button */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Luminous Om Symbol in Sky */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
            <OmLightSymbol size="hero" glowColor="gold" animated={true} />
          </div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <UserCheck size={14} className="text-amber-400" />
              <span>Pithoragarh HQ Operations & Group Expedition Team</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl font-serif font-light tracking-tight leading-tight"
            >
              Meet Your <span className="italic text-amber-400">Yatra Guardians</span> & Group Escorts
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              We are a dedicated team of native Kumaoni mountain experts, ex-military medical advisers, SDM permit liaison officers, and seasoned 4x4 drivers stationed permanently in Pithoragarh, Dharchula, and Vyas Valley.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/80"
            >
              <div>
                <div className="text-2xl font-serif font-bold text-amber-400">15,000+</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">Permits Processed</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-amber-400">45+</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">4x4 Mountain Fleet</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-amber-400">100%</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">Safety Record</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-amber-400">24 / 7</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">Dharchula Desk Support</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Group & Team Capabilities Overview Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#E6E2D3] rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 shrink-0">
              <Users size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Group & Family Yatra Specialists</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Special batch handling for 10 to 120+ pilgrims. Dedicated escort guide, private 4x4 convoy, and custom dining arrangements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#1E293B]">SDM Permit Clearance Crew</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-ground desk at Dharchula SDM office ensuring fast-track Inner Line Permit (ILP) verification, medical fitness check, and ITBP clearance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 shrink-0">
              <HeartPulse size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Ex-Army Medical Safety Crew</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-altitude portable hyperbaric kits, medical oxygen cylinders, pulse-oximetry protocols, and military trained paramedics.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E2D3] pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Team Members" },
              { id: "marketing-sales", label: "Marketing & Yatra Sales" },
              { id: "operations", label: "Operations & Permit Desk" },
              { id: "fleet", label: "4x4 Drivers & Logistics" },
              { id: "guides", label: "Mountain Trek Guides" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-[#1E293B] text-amber-300 shadow-sm"
                    : "bg-white text-slate-700 hover:bg-[#F5F2ED] border border-[#E6E2D3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredMembers.length}</span> key team leads
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E6E2D3] rounded-[28px] overflow-hidden p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Avatar & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-300 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1 rounded-full border-2 border-white">
                      <CheckCircle2 size={12} />
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-200 uppercase tracking-wider text-right">
                    {member.badge}
                  </span>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-800">{member.role}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-amber-700 shrink-0" />
                    <span>{member.location}</span>
                    <span className="mx-1">•</span>
                    <span className="font-bold text-slate-800">{member.experience}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed border-t border-[#F5F2ED] pt-3">
                  {member.bio}
                </p>

                {/* Key Highlights Bullets */}
                <div className="space-y-1.5 pt-1">
                  {member.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700">
                      <Sparkles size={11} className="text-amber-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialty Tag & Contact CTA */}
              <div className="space-y-2 pt-2 border-t border-[#F5F2ED]">
                <div className="bg-[#F8F6F0] p-2.5 rounded-xl border border-[#E6E2D3] text-[11px] text-slate-800 font-semibold flex items-center gap-2">
                  <Award size={14} className="text-amber-800 shrink-0" />
                  <span className="truncate">{member.specialty}</span>
                </div>

                <button
                  onClick={() => onOpenInquiry(`Inquiry for ${member.name} (${member.role})`)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-900 text-white font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall size={13} />
                  <span>Request Callback from {member.name.split(" ")[0]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Group Yatra Customization CTA Section */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-200 rounded-[32px] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 font-bold text-[10px] uppercase tracking-wider">
              <Users size={12} className="text-amber-900" />
              <span>Planning a Group, Family, or Ashram Yatra?</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B]">
              Organize a Dedicated 2027 Batch with Our Dharchula Ops Team
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Whether you are organizing a family group of 6, a corporate retreat of 25, or an ashram sangh of 80+ pilgrims, our Pithoragarh team manages custom 4x4 convoys, dedicated medical escorts, bulk permit clearances, and private homestay bookings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                const msg = `*Group & Team Yatra Inquiry 2027 — GoTrek Travels*%0A%0A*Interested In:* Customized Group Expedition Batch%0A*HQ Team Desk:* Pithoragarh Operations%0A%0A_Please share group discounts, bulk Inner Line Permit requirements, and dedicated 4x4 convoy options._`;
                window.open(`https://wa.me/917248285767?text=${msg}`, '_blank');
              }}
              className="py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp Group Lead</span>
            </button>

            <button
              onClick={() => onOpenInquiry("Custom Group & Team Yatra 2027")}
              className="py-3.5 px-6 rounded-full bg-[#1E293B] hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
            >
              <FileText size={14} />
              <span>Get Group Custom Quote</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamPage;
