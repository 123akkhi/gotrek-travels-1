import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Mountain,
  Users,
  HeartHandshake,
  Award,
  Compass,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Activity,
  Car,
  Home,
  Clock,
  Star,
  Quote,
  Eye,
  ArrowLeft,
  Calendar,
  Building2,
  FileText,
  Flame,
  Coffee,
  Heart,
  Globe2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { GoTrekLogo } from "./GoTrekLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FloatingOmBackground, OmLightSymbol } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { RecognitionsSection } from "./RecognitionsSection";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface AboutUsPageProps {
  onBack?: () => void;
  onOpenInquiry: (subject?: string) => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug?: string) => void;
  onSelectTeam?: () => void;
  onSelectCareers?: () => void;
}

interface BaseStation {
  id: string;
  name: string;
  altitude: string;
  role: string;
  location: string;
  description: string;
  badge: string;
  facilities: string[];
  image: string;
}

const BASE_STATIONS: BaseStation[] = [
  {
    id: "kathgodam",
    name: "Kathgodam / Haldwani Transit Hub",
    altitude: "1,750 ft (533 m)",
    role: "Gateway & Railhead Dispatch",
    location: "Railway Station Road, Kathgodam",
    badge: "Yatri Welcome Desk",
    description: "Our southern transit base where yatris are received from Delhi/Dehradun trains, briefed with high-altitude kits, and boarded into sanitized 4x4 Boleros.",
    facilities: ["24/7 Train Station Reception", "Secure Luggage Cloakroom", "Pre-Trek Medical Briefing", "Pushback AC Transit Fleet"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pithoragarh",
    name: "Pithoragarh District HQ & Command Center",
    altitude: "5,300 ft (1,615 m)",
    role: "Operational Nerve Center",
    location: "Roadways Workshop Road, Opp. Joshi Bhawan, Chandrabhaga, Pithoragarh",
    badge: "Administrative HQ",
    description: "The main administrative headquarters managing government liaison with the District Magistrate, emergency reserves, backup 4x4 vehicles, and medical supply caches.",
    facilities: ["District Magistrate Liaison Desk", "24/7 High-Altitude Radio Desk", "Automotive Maintenance Yard", "Medical Oxygen Reserve Stock"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dharchula",
    name: "Dharchula Border & Permit Command Office",
    altitude: "3,100 ft (945 m)",
    role: "SDM & ITBP Inner Line Permit Hub",
    location: "Near SDM Court & ITBP Post, Dharchula",
    badge: "Permit Desk",
    description: "Located right next to the SDM Office, this station manages biometric registrations, police verification clearances, physical medical fitness tests, and ITBP checkpoint tokens.",
    facilities: ["100% Direct SDM ILP Processing", "On-Spot Medical Fitness Desk", "Border Police Clearance", "Local Mountain Driver Briefing"],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "nabhi",
    name: "Nabi Heritage Village Acclimatization Camp",
    altitude: "10,500 ft (3,200 m)",
    role: "Primary Yatri Homestay Base",
    location: "Vyas Valley, Nabi Village, Pithoragarh District",
    badge: "Heritage Stay",
    description: "Traditional wooden homestays operated in direct partnership with native Rung Bhotiya families. Yatris acclimatize comfortably with solar-heated water, thermal beds, and sattvik meals.",
    facilities: ["Insulated Wooden Cottages", "Attached Western Washrooms", "Solar Heated Running Water", "Oxygen Concentrator Station"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gunji",
    name: "Gunji High-Altitude Logistics Camp",
    altitude: "10,500 ft (3,200 m)",
    role: "Bifurcation Hub for Adi Kailash & Lipulekh",
    location: "Gunji Border Junction, Indo-Tibet Road",
    badge: "High-Altitude Base",
    description: "The strategic junction where the road splits toward Jolingkong (Adi Kailash / Parvati Sarovar) and Lipulekh Pass (Old Lipulekh Kailash Mansarovar View).",
    facilities: ["ITBP Coordination Post", "Emergency Medical First-Aid Post", "Hot Sattvik Mountain Kitchen", "4x4 High-Clearance Standby Fleet"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
  }
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Direct SDM & ITBP Permit Authority",
    tagline: "Zero Middleman Delays",
    color: "emerald",
    desc: "We are physically based in Dharchula. Our liaison team processes your Inner Line Permits (ILP), medical fitness certificates, and police clearances directly at the SDM Dharchula office with a 100% approval rate."
  },
  {
    icon: Car,
    title: "Custom 4x4 Heavy-Duty Mountain Fleet",
    tagline: "45+ Dedicated 4WD Vehicles",
    color: "blue",
    desc: "We never sub-contract or use city cabs. We own and operate exclusively 4WD Mahindra Boleros and Scorpios driven by seasoned native mountain drivers with 10+ years on Lipulekh & Darma roads."
  },
  {
    icon: Activity,
    title: "Senior Devotee Medical & Oxygen Safety",
    tagline: "Daily Oximeter & SpO2 Monitoring",
    color: "rose",
    desc: "High altitude (14,500+ ft) requires vigilance. Every vehicle and homestay is equipped with portable medical oxygen cylinders, pulse oximeters, Diamox acclimatization charts, and certified first responders."
  },
  {
    icon: Home,
    title: "Authentic Rung Homestays in Nabi & Gunji",
    tagline: "Warm Wooden Cottages at 10,500 ft",
    color: "amber",
    desc: "Experience authentic Kumaoni & Bhotiya culture. Stay in traditional wooden homes with solar heated water, thermal electric blankets, clean attached western toilets, and genuine Himalayan hospitality."
  },
  {
    icon: Coffee,
    title: "Pure Sattvik Mountain Kitchens",
    tagline: "Fresh, Hot, Hygienic Meals",
    color: "orange",
    desc: "Prepared using pure Himalayan mountain spring water, our food is 100% pure vegetarian, satvik, fresh, and easily digestible. We provide hot tea, ginger-lemon herbal infusions, and fresh rotis en route."
  },
  {
    icon: Award,
    title: "Direct Native Operator Rates",
    tagline: "No Agency Commissions or Markups",
    color: "purple",
    desc: "When you book with GoTrek, you book directly with the native ground operators. No Delhi or Mumbai middleman markups, hidden permit fees, or surprise surcharges. 100% transparent GST billing."
  }
];

const FAQS = [
  {
    q: "How is GoTrek Travels different from booking with travel agencies in Delhi or Mumbai?",
    a: "Most metropolitan travel portals are aggregators who sub-contract your booking to multiple third parties, leaving you stranded if roadblocks or permit delays happen. GoTrek is a native, registered ground operator based in Dharchula and Pithoragarh. We own our 4x4 fleet, run our own homestay camps in Nabi, and have direct daily liaison with SDM Dharchula and the ITBP."
  },
  {
    q: "Can senior citizens aged 60–80 safely undertake the Adi Kailash & Om Parvat Yatra with GoTrek?",
    a: "Yes! Over 60% of our pilgrims are senior citizens. With our gradual acclimatization schedule (Kathgodam -> Pithoragarh -> Dharchula -> Nabi), 4x4 vehicle access directly up to Jolingkong temple base, dedicated medical oxygen cylinders, and personal local escorts, senior citizens complete the yatra comfortably."
  },
  {
    q: "How does GoTrek obtain the Inner Line Permit (ILP) for border areas?",
    a: "You simply submit your Aadhaar card, a passport-sized photograph, and a basic medical self-declaration to our team. Our Dharchula office physically handles the paperwork, police verification, and SDM approval 48 hours prior to your batch arrival, ensuring zero delay at checkposts."
  },
  {
    q: "What happens if there are weather disruptions or landslides on the route?",
    a: "Because we have 5 operational base stations across the route (Kathgodam, Pithoragarh, Dharchula, Nabi, and Gunji) and radio/mobile communications with Border Roads Organisation (BRO), our team can dynamically adjust lodging, supply hot food, and reroute batches without compromising safety."
  },
  {
    q: "Is GoTrek Travels an authorized government-registered operator?",
    a: "Yes. GoTrek Travels is registered with Uttarakhand Tourism (Reg #UTTR/PITHORAGARH/04-2026/450066), holds a valid GSTIN (05CEQPB8319P1ZX), is MSME registered (UDYAM-UK-09-0011014), Nidhi Portal verified (EUK000366), Tripadvisor Traveller's Choice recipient, and is an authorized KMVN local booking partner."
  }
];

export const AboutUsPage = memo(({
  onBack,
  onOpenInquiry,
  onSelectDestination,
  onSelectPackage,
  onSelectTeam,
  onSelectCareers
}: AboutUsPageProps) => {
  const [activeTab, setActiveTab] = useState<"story" | "pillars" | "hubs" | "legal" | "faq">("story");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-24 pt-[104px] sm:pt-[116px] lg:pt-[124px] relative overflow-hidden"
    >
      {/* Sticky Breadcrumbs Navigation */}
      <PageBreadcrumbs
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'About GoTrek Travels', active: true }
        ]}
        onBack={onBack}
        backLabel="Home"
        badge="Uttarakhand Regd"
        badgeType="emerald"
      />

      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      {/* Main Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0E17] via-[#0F172A] to-[#1E293B] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20 shadow-2xl">
        {/* Floating Back Button */}
        {onBack && (
          <div className="max-w-5xl mx-auto mb-6 flex justify-start relative z-20">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* Luminous Glowing Om Symbol in Sky */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-12 pointer-events-none z-10">
          <OmLightSymbol size="hero" glowColor="gold" animated={true} />
        </div>

        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider shadow-inner"
          >
            <ShieldCheck size={15} className="text-amber-400" />
            <span>Govt. Regd UK-KMVN 2027 • Native Ground Authority</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-tight"
          >
            Born in Dharchula. <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-orange-400 bg-clip-text text-transparent">
              Rooted in High-Altitude Devotion.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            GoTrek Travels is the pioneer native pilgrimage authority of Uttarakhand. For over 15 years, we have guided thousands of devotees across the sacred heights of <strong>Adi Kailash, Om Parvat, Kailash Mansarovar Viewpoint (Lipulekh), Valley of Flowers, and Char Dham</strong> with direct SDM permit clearance, high-altitude medical safety, and authentic Kumaoni warmth.
          </motion.p>

          {/* Quick Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <button
              onClick={() => onOpenInquiry("About Us - Book 2027 Yatra")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <Calendar size={16} />
              <span>Book 2027 Yatra Batch</span>
            </button>

            <a
              href="tel:+917248285767"
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Phone size={15} className="text-emerald-400" />
              <span>Call Founders (+91 72482 85767)</span>
            </a>

            <a
              href="https://wa.me/917248285767?text=Hello%20GoTrek%20Team%2C%20I%20want%20to%20know%20more%20about%20your%20company%20and%202027%20Yatra%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <WhatsAppIcon size={15} />
              <span>WhatsApp Desk</span>
            </a>
          </motion.div>

          {/* Core Trust Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">10,000+</div>
              <div className="text-xs font-bold text-slate-300 mt-1">Pilgrims Guided</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Across high Himalayas</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-300 mt-1">SDM Permit Clearance</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Inner Line (ILP) guarantee</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">15+ Yrs</div>
              <div className="text-xs font-bold text-slate-300 mt-1">Native Kumaoni Team</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Est. 2010 in Dharchula</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">4.9 / 5</div>
              <div className="text-xs font-bold text-slate-300 mt-1">Devotee Rating</div>
              <div className="text-[10px] text-slate-400 mt-0.5">1,200+ verified yatris</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Pills Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E6E2D3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "story", label: "Our Story & Calling", icon: Mountain },
              { id: "pillars", label: "The 6-Pillar Standard", icon: ShieldCheck },
              { id: "hubs", label: "5 Himalayan Base Hubs", icon: Building2 },
              { id: "legal", label: "Govt. Licenses & Trust", icon: Award },
              { id: "faq", label: "Yatri FAQs", icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#800020] text-white shadow-md shadow-red-900/20"
                      : "bg-[#F5F2ED] text-slate-700 hover:bg-[#EBE7DF] hover:text-slate-900 border border-[#E6E2D3]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-amber-300" : "text-slate-500"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">

        {/* TAB 1: STORY & CALLING */}
        {(activeTab === "story" || activeTab === "pillars") && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B111E]">
                Devbhoomi Pilgrimage Heritage
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                Why GoTrek Travels Was Born
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                A story born out of devotion to Mount Kailash, pride in Kumaoni mountains, and a mission to replace commercial middleman chaos with genuine safety.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Until recently, sacred pilgrimages to the Indo-Tibet frontier—such as <strong>Adi Kailash (Chhota Kailash at 14,500 ft)</strong>, the eternal natural snow Om on <strong>Om Parvat</strong>, and the ancient trade passes of the <strong>Vyas and Darma Valleys</strong>—were remote, arduous, and fraught with logistical uncertainty.
                </p>
                <p>
                  Commercial city agencies in Delhi, Ahmedabad, or Mumbai would advertise packages at inflated prices, only to sub-contract the entire journey to inexperienced third parties who lacked high-altitude medical protocols, local SDM Dharchula relationships, or reliable 4x4 vehicles.
                </p>
                <p>
                  In 2010, native mountaineers, local expedition coordinators, and Kumaoni community leaders in <strong>Dharchula and Pithoragarh</strong> came together to establish <strong>GoTrek Travels</strong>. Our philosophy is simple:
                </p>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                  <div className="font-serif font-black text-slate-900 text-sm flex items-center gap-2">
                    <Quote size={18} className="text-amber-600" />
                    <span>The GoTrek Pilgrimage Creed</span>
                  </div>
                  <p className="text-xs text-slate-800 italic leading-relaxed">
                    "A yatra to Adi Kailash is not commercial tourism; it is a sacred tapasya. Every devotee who steps into our 4x4 vehicles is an honored guest of Shiva, and our sacred duty as native children of the Himalayas is to ensure their journey is safe, spiritually profound, and completely devoid of anxiety."
                  </p>
                </div>

                <p>
                  Today, GoTrek operates full-time year-round field bases spanning from the Kathgodam railhead all the way to <strong>Gunji and Nabi at 10,500 ft</strong>. We handle everything in-house: SDM Inner Line Permits, 45+ 4WD Bolero vehicles, sattvik kitchens, and warm homestay accommodations.
                </p>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-80">
                  <BlurUpImage
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                    blurDataURL={getDestinationBlurPlaceholder("adi-kailash")}
                    alt="Adi Kailash Sacred Mountain"
                    loading="lazy"
                    decoding="async"
                    preset="card"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Indo-Tibet Border Route</span>
                    <div className="font-serif font-bold text-lg">Adi Kailash & Om Parvat Sanctuary</div>
                    <p className="text-xs text-slate-200 mt-1">100% Direct Native Operator Logistics</p>
                  </div>
                </div>

                {/* Quick Native Team Link */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-amber-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Meet Our Ground Team</div>
                      <div className="text-[11px] text-slate-500">Guides, drivers, and founders</div>
                    </div>
                  </div>
                  {onSelectTeam && (
                    <button
                      onClick={onSelectTeam}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Team</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: THE 6-PILLAR STANDARD */}
        {(activeTab === "pillars" || activeTab === "story") && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B111E]">
                Operational Excellence
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">
                The 6-Pillar GoTrek Standard
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Why seasoned devotees, spiritual ashrams, and families choose GoTrek over conventional travel portals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#9B111E] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                          {pillar.tagline}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Verified GoTrek Guarantee</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 3: 5 HIMALAYAN BASE HUBS */}
        {(activeTab === "hubs" || activeTab === "story") && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B111E]">
                Infrastructure & Network
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Our 5 Ground Operations Hubs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Continuous physical presence from the Uttarakhand railhead at Kathgodam to the highest border passes.
              </p>
            </div>

            <div className="space-y-6">
              {BASE_STATIONS.map((station, idx) => (
                <div
                  key={station.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md hover:border-amber-400/80 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner">
                    <BlurUpImage
                      src={station.image}
                      blurDataURL={getDestinationBlurPlaceholder(station.id)}
                      alt={station.name}
                      loading="lazy"
                      decoding="async"
                      preset="card"
                      containerClassName="w-full h-full"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                      {station.badge}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-mono flex items-center justify-between">
                      <span>{station.altitude}</span>
                      <span className="text-amber-400 font-bold">Hub 0{idx + 1}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          {station.role}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} className="text-slate-400" />
                          <span>{station.location}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                        {station.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {station.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-800 mb-1.5">Station Highlights & Capabilities:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {station.facilities.map((fac, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: LEGAL & GOVERNMENT ACCREDITATION */}
        {(activeTab === "legal" || activeTab === "story") && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B111E]">
                Compliance & Transparency
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Government Registrations & Licenses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                100% compliant with Ministry of Tourism, Uttarakhand State Government, and Border Administration guidelines.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1120] text-white border border-slate-800 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <GoTrekLogo className="w-12 h-12 ring-2 ring-amber-400/50 rounded-full" />
                  <div>
                    <div className="text-base sm:text-lg font-black text-white">
                      GoTrek Travels Private Limited
                    </div>
                    <div className="text-xs text-amber-300">
                      Uttarakhand Tourism & District Administration Registered Operator
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Verified 2027 Active License</span>
                </div>
              </div>

              {/* Grid of Legal Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">UK Tourism Regd</div>
                  <div className="font-bold text-amber-300 text-xs break-all">UTTR/PITHORAGARH/04-2026/450066</div>
                  <div className="text-[10px] text-emerald-400 font-sans">✓ Recognized Operator</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">MSME India Regd</div>
                  <div className="font-bold text-blue-300 text-xs">UDYAM-UK-09-0011014</div>
                  <div className="text-[10px] text-emerald-400 font-sans">✓ Govt. Regd Enterprise</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Nidhi Portal</div>
                  <div className="font-bold text-amber-200 text-sm">EUK000366</div>
                  <div className="text-[10px] text-emerald-400 font-sans">✓ Ministry Verified</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">GSTIN Registration</div>
                  <div className="font-bold text-emerald-300 text-xs">05CEQPB8319P1ZX</div>
                  <div className="text-[10px] text-emerald-400 font-sans">✓ Active Tax Billing</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Tripadvisor</div>
                  <div className="font-bold text-amber-400 text-xs">Traveller's Choice</div>
                  <div className="text-[10px] text-slate-300 font-sans">Top Rated Himalayan DMC</div>
                </div>
              </div>

              {/* Full Interactive Recognitions Section */}
              <div className="pt-4 border-t border-slate-800/80">
                <RecognitionsSection isDark={true} />
              </div>

              {/* Community & Devbhoomi Seva Accordion/Box */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Heart size={16} className="text-amber-400" />
                  <span>Devbhoomi Seva & Community Impact</span>
                </div>
                <p className="leading-relaxed">
                  We believe in sustainable, reverent pilgrimage. More than <strong>85% of your yatra spend</strong> stays directly in the border villages of Nabi, Gunji, Kuti, and Napalchu, providing direct livelihood to local Bhotiya families, porters, and organic farmers. We also maintain a strict <em>Zero Single-Use Plastic</em> policy along the Parvati Sarovar and Jolingkong trails.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: FAQ & QUESTIONS */}
        {(activeTab === "faq" || activeTab === "story") && (
          <section className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-[#9B111E]">
                Devotee Inquiries
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Frequently Asked Questions About GoTrek
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Clear, transparent answers to help you plan your high-altitude yatra with total peace of mind.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#9B111E] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle size={17} className="text-amber-600 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-amber-600" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact Founders & Direct HQ Consultation Card */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#800020] via-[#9B111E] to-[#680017] text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                24/7 Dedicated Yatri Helpline
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Speak Directly with Our Native Yatra Coordinators
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                Have questions about senior citizen safety, 2027 batch dates, helicopter slots, or SDM Inner Line Permits? Our native coordinators in Dharchula and Pithoragarh are ready to guide you.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <a
                  href="tel:+917248285767"
                  className="flex items-center gap-2 font-mono font-bold text-white hover:text-amber-300"
                >
                  <Phone size={15} className="text-emerald-400" />
                  <span>+91 72482 85767</span>
                </a>
                <span>•</span>
                <a
                  href="mailto:mailgotrek@gmail.com"
                  className="flex items-center gap-2 font-mono font-bold text-white hover:text-amber-300"
                >
                  <Mail size={15} className="text-amber-300" />
                  <span>mailgotrek@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onOpenInquiry("About Us Final CTA")}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <Calendar size={15} />
                <span>Reserve 2027 Batch</span>
              </button>

              <a
                href="https://wa.me/917248285767?text=Hello%20GoTrek%20Team%2C%20I%20am%20inquiring%20after%20reading%20About%20GoTrek%20Travels."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-amber-400/40 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <WhatsAppIcon size={15} />
                <span>WhatsApp Yatra Desk</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
});

AboutUsPage.displayName = "AboutUsPage";

export default AboutUsPage;
