import React, { useState, memo } from "react";
import { UserCheck, ShieldCheck, Award, PhoneCall, MapPin, Sparkles, CheckCircle2, Megaphone, TrendingUp, Users, MessageSquare } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  category: "operations" | "guides" | "marketing-sales";
  location: string;
  experience: string;
  avatar: string;
  specialty: string;
  badge: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Vinay Gururani",
    role: "Co-Founder & SDM Permit Operations Director",
    category: "operations",
    location: "Pithoragarh HQ & Dharchula Base",
    experience: "14+ Years",
    avatar: "/images/team/team3.webp",
    specialty: "Inner Line Permits (ILP), Army & ITBP Clearances",
    badge: "Government Liaison Lead",
    bio: "Born in Kumaon, Vinay Gururani has facilitated over 15,000 Inner Line Permits for Adi Kailash and Om Parvat yatris with 100% approval rate.",
  },
  {
    name: "Pawan Singh Bisht",
    role: "Co-Founder & Mountain Fleet Director",
    category: "operations",
    location: "Pithoragarh & Dharchula Base",
    experience: "12+ Years",
    avatar: "/images/team/team.1webp",
    specialty: "4x4 Himalayan Fleet Safety & All-Weather Drivers",
    badge: "Safety Fleet Lead",
    bio: "Manages our fleet of 4x4 Mahindra Scorpios and Boleros with seasoned Kumaoni drivers trained in high-altitude mountain navigation.",
  },
  {
    name: "Priyanka",
    role: "Head of Pilgrim Relations & Yatra Sales Director",
    category: "marketing-sales",
    location: "Dehradun, Rishikesh & Pithoragarh HQ",
    experience: "8+ Years",
    avatar: "/images/team/team7.webp",
    specialty: "Senior Citizen Guidance, Custom Batches & Advisory",
    badge: "Sales & Pilgrim Relations Lead",
    bio: "Leads our direct yatra consultation desk. Has assisted over 6,000 pilgrims with custom itineraries, altitude acclimation plans, and family batch bookings.",
  },
  {
    name: "Neelam",
    role: "Head of Digital Marketing & Himalayan Media Outreach",
    category: "marketing-sales",
    location: "Pithoragarh HQ & Delhi NCR",
    experience: "6+ Years",
    avatar: "/images/team/team3.webp",
    specialty: "Live Route Broadcasts, Docuseries & Digital Campaigns",
    badge: "Growth & Brand Strategy Lead",
    bio: "Spearheads pan-India awareness for the sacred Adi Kailash & Om Parvat pilgrimage. Directs ground video broadcasts, weather alerts, and pilgrim docuseries.",
  },
  {
    name: "Priyanka",
    role: "Senior Corporate & Group Sales Specialist",
    category: "marketing-sales",
    location: "Rishikesh, Haridwar & Pithoragarh",
    experience: "5+ Years",
    avatar: "/images/team/team7.webp",
    specialty: "Ashram Trusts, Corporate Retreats & B2B Alliances",
    badge: "Group Sales Specialist",
    bio: "Dedicated to organizing customized group pilgrimages for spiritual trusts and corporate groups with dedicated 4x4 convoys and private catering.",
  },
  {
    name: "Deepak Singh Mehta",
    role: "Lead High-Altitude Guide & Alpine Safety Manager",
    category: "guides",
    location: "Vyas Valley & Jolingkong",
    experience: "10+ Years",
    avatar: "/images/team/team2.webp",
    specialty: "High-Altitude Acclimatization & Parvati Sarovar Escort",
    badge: "Certified Rescue Lead",
    bio: "Certified high-altitude guide who has led over 250 expeditions to Adi Kailash, Om Parvat, and Parvati Sarovar with complete medical safety protocols.",
  },
  {
    name: "Akshay kumar",
    role: "Chief Technology Officer & Yatri Experience Lead",
    category: "operations",
    location: "Pithoragarh HQ & Rishikesh",
    experience: "8+ Years",
    avatar: "/images/team/team4.webp",
    specialty: "AI Permit Consultant & Digital Booking Experience",
    badge: "Tech & Experience Lead",
    bio: "Oversees digital booking systems, instant WhatsApp permit tracking, and 24/7 guest consultation for seamless high-altitude yatra experience.",
  },
];

interface TeamSectionProps {
  onOpenInquiry?: (dept?: string) => void;
}

export const TeamSection = memo(({ onOpenInquiry }: TeamSectionProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const filteredMembers = selectedTab === "all"
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.category === selectedTab);

  return (
    <section id="team" className="py-20 bg-[#FDFBF7] relative border-t border-[#E6E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold uppercase tracking-[0.2em]">
            <UserCheck size={14} className="text-amber-800" />
            <span>Dharchula Operations, Sales & Ground Crew</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            Meet Your <span className="italic text-amber-800">Yatra Guardians & Advisory Team</span>
          </h2>
          <p className="text-[#5A5A40] text-sm sm:text-base italic">
            Native Kumaoni guides, SDM permit liaison officers, pilgrim relationship advisors, and digital marketing leaders dedicated to your sacred journey.
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[
            { id: "all", label: "All Team Members", count: TEAM_MEMBERS.length },
            { id: "marketing-sales", label: "Marketing & Yatra Sales", count: TEAM_MEMBERS.filter(m => m.category === "marketing-sales").length },
            { id: "operations", label: "Operations & Fleet", count: TEAM_MEMBERS.filter(m => m.category === "operations").length },
            { id: "guides", label: "Mountain Guides", count: TEAM_MEMBERS.filter(m => m.category === "guides").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedTab === tab.id
                  ? "bg-[#1E293B] text-amber-300 shadow-sm scale-105"
                  : "bg-white text-slate-700 hover:bg-[#F5F2ED] border border-[#E6E2D3]"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedTab === tab.id ? "bg-amber-400/20 text-amber-300" : "bg-slate-100 text-slate-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E6E2D3] rounded-[28px] overflow-hidden p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Avatar & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-300 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1 rounded-full border-2 border-white">
                      <CheckCircle2 size={12} />
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 uppercase tracking-wider text-right">
                    {member.badge}
                  </span>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1E293B] group-hover:text-amber-900 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-800">{member.role}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-slate-400" />
                    <span>{member.location}</span>
                    <span className="mx-1">•</span>
                    <span className="font-semibold text-slate-700">{member.experience}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed border-t border-[#F5F2ED] pt-3">
                  {member.bio}
                </p>
              </div>

              {/* Specialty Tag & Action */}
              <div className="space-y-3 pt-1">
                <div className="bg-[#F8F6F0] p-3 rounded-2xl border border-[#E6E2D3] text-[11px] text-slate-800 font-medium flex items-center gap-2">
                  <Award size={14} className="text-amber-800 shrink-0" />
                  <span className="truncate">{member.specialty}</span>
                </div>

                {member.category === "marketing-sales" ? (
                  <button
                    onClick={() => onOpenInquiry && onOpenInquiry(`Consultation with ${member.name} (${member.role})`)}
                    className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare size={13} className="text-amber-800" />
                    <span>Consult with {member.name.split(" ")[0]}</span>
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          {/* Call to Action Box in Team Grid */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-[28px] p-6 text-white space-y-4 flex flex-col justify-between shadow-lg border border-amber-500/20">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={12} />
                <span>100% Ground Safety Guarantee</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Need Custom Assistance for Senior Citizens or Medical Permits?
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Our Dharchula and Sales advisory teams are available 24/7 to assist with custom itineraries, senior citizen permits, and group discounts.
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry && onOpenInquiry("Custom Yatra Assistance")}
              className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <PhoneCall size={14} />
              <span>Connect with Advisory Team</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

TeamSection.displayName = "TeamSection";
