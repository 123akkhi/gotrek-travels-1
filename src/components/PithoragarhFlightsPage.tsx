import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane,
  Clock,
  Calendar,
  MapPin,
  ShieldCheck,
  Luggage,
  Compass,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Download,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Info,
  Car,
  Train,
  Mountain,
  Sparkles,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  FileText,
  Sun,
  Radio,
  Bus,
  Globe
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { PithoragarhLiveWeatherCard } from "./PithoragarhLiveWeatherCard";

interface PithoragarhFlightsPageProps {
  onBackToHome?: () => void;
  onOpenInquiry?: (destination?: string) => void;
  onSelectPackage?: (slug?: string) => void;
  onSelectDestination?: (slug: string) => void;
}

interface FlightRoute {
  id: "delhi" | "dehradun" | "bus" | "taxi" | "weather" | "matrix" | "airport" | "transfer";
  label: string;
  badge?: string;
  icon: any;
}

const ROUTES: FlightRoute[] = [
  { id: "delhi", label: "Delhi ↔ Pithoragarh", badge: "80 Mins", icon: Plane },
  { id: "dehradun", label: "Dehradun ↔ Pithoragarh", badge: "45 Mins", icon: Plane },
  { id: "bus", label: "By Bus (UTC & Volvo)", badge: "ISBT & KMOU", icon: Bus },
  { id: "taxi", label: "By Taxi (Shared & Private)", badge: "Bolero / Innova", icon: Car },
  { id: "weather", label: "Live Airport Weather & Radar", badge: "Live Radar", icon: Sun },
  { id: "matrix", label: "Weekly Flight Matrix", badge: "Mon-Sat", icon: Calendar },
  { id: "airport", label: "Naini Saini Airport (NGH)", badge: "4,970 ft", icon: Compass },
  { id: "transfer", label: "4x4 Dharchula Transfer", badge: "92 km", icon: Mountain },
];

const WEEKLY_SCHEDULE_DATA = [
  {
    day: "Monday",
    legs: [
      {
        flightNo: "9I 863",
        route: "Delhi (DEL) → Pithoragarh (NGH)",
        dep: "11:00 AM",
        arr: "12:20 PM",
        dur: "1h 20m",
        operator: "Alliance Air (ATR-42)",
        status: "Active Shuttle"
      },
      {
        flightNo: "9I 864",
        route: "Pithoragarh (NGH) → Delhi (DEL)",
        dep: "02:10 PM",
        arr: "03:20 PM",
        dur: "1h 10m",
        operator: "Alliance Air (ATR-42)",
        status: "Active Shuttle"
      }
    ],
    note: "Dedicated direct round-trip shuttle between Delhi and Pithoragarh."
  },
  {
    day: "Tuesday",
    legs: [
      {
        flightNo: "9I 863",
        route: "Delhi (DEL) → Pithoragarh (NGH)",
        dep: "11:00 AM",
        arr: "12:20 PM",
        dur: "1h 20m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 1"
      },
      {
        flightNo: "9I 865",
        route: "Pithoragarh (NGH) → Dehradun (DED)",
        dep: "12:45 PM",
        arr: "01:30 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 2"
      },
      {
        flightNo: "9I 866",
        route: "Dehradun (DED) → Pithoragarh (NGH)",
        dep: "01:55 PM",
        arr: "02:40 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 3"
      },
      {
        flightNo: "9I 864",
        route: "Pithoragarh (NGH) → Delhi (DEL)",
        dep: "03:05 PM",
        arr: "04:20 PM",
        dur: "1h 15m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 4"
      }
    ],
    note: "Triangular Loop: Delhi → Pithoragarh → Dehradun → Pithoragarh → Delhi."
  },
  {
    day: "Wednesday",
    legs: [
      {
        flightNo: "9I 867",
        route: "Delhi (DEL) → Dehradun (DED)",
        dep: "10:30 AM",
        arr: "11:30 AM",
        dur: "1h 00m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 1"
      },
      {
        flightNo: "9I 866",
        route: "Dehradun (DED) → Pithoragarh (NGH)",
        dep: "01:55 PM",
        arr: "02:40 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 2"
      },
      {
        flightNo: "9I 865",
        route: "Pithoragarh (NGH) → Dehradun (DED)",
        dep: "12:45 PM",
        arr: "01:30 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 3"
      }
    ],
    note: "Garhwal-Kumaon inter-valley linkage rotation."
  },
  {
    day: "Thursday",
    legs: [
      {
        flightNo: "9I 863",
        route: "Delhi (DEL) → Pithoragarh (NGH)",
        dep: "11:00 AM",
        arr: "12:20 PM",
        dur: "1h 20m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 1"
      },
      {
        flightNo: "9I 865",
        route: "Pithoragarh (NGH) → Dehradun (DED)",
        dep: "12:45 PM",
        arr: "01:30 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 2"
      },
      {
        flightNo: "9I 866",
        route: "Dehradun (DED) → Pithoragarh (NGH)",
        dep: "01:55 PM",
        arr: "02:40 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 3"
      },
      {
        flightNo: "9I 864",
        route: "Pithoragarh (NGH) → Delhi (DEL)",
        dep: "03:05 PM",
        arr: "04:20 PM",
        dur: "1h 15m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 4"
      }
    ],
    note: "Full triangular loop operational."
  },
  {
    day: "Friday",
    legs: [
      {
        flightNo: "9I 863",
        route: "Delhi (DEL) → Pithoragarh (NGH)",
        dep: "11:00 AM",
        arr: "12:20 PM",
        dur: "1h 20m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 1"
      },
      {
        flightNo: "9I 865",
        route: "Pithoragarh (NGH) → Dehradun (DED)",
        dep: "12:45 PM",
        arr: "01:30 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 2"
      },
      {
        flightNo: "9I 866",
        route: "Dehradun (DED) → Pithoragarh (NGH)",
        dep: "01:55 PM",
        arr: "02:40 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 3"
      },
      {
        flightNo: "9I 864",
        route: "Pithoragarh (NGH) → Delhi (DEL)",
        dep: "03:05 PM",
        arr: "04:20 PM",
        dur: "1h 15m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 4"
      }
    ],
    note: "Weekend rush sector: Prime connectivity for Friday departures."
  },
  {
    day: "Saturday",
    legs: [
      {
        flightNo: "9I 863",
        route: "Delhi (DEL) → Pithoragarh (NGH)",
        dep: "11:00 AM",
        arr: "12:20 PM",
        dur: "1h 20m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 1"
      },
      {
        flightNo: "9I 865",
        route: "Pithoragarh (NGH) → Dehradun (DED)",
        dep: "12:45 PM",
        arr: "01:30 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 2"
      },
      {
        flightNo: "9I 866",
        route: "Dehradun (DED) → Pithoragarh (NGH)",
        dep: "01:55 PM",
        arr: "02:40 PM",
        dur: "45m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 3"
      },
      {
        flightNo: "9I 864",
        route: "Pithoragarh (NGH) → Delhi (DEL)",
        dep: "03:05 PM",
        arr: "04:20 PM",
        dur: "1h 15m",
        operator: "Alliance Air (ATR-42)",
        status: "Loop Leg 4"
      }
    ],
    note: "Optimal weekend batch arrival for Monday Inner Line Permit filing in Dharchula."
  },
  {
    day: "Sunday",
    legs: [],
    note: "No Commercial Flights Scheduled: Dedicated to civil aviation technical maintenance, DGCA safety audits, and aircrew rest."
  }
];

const FAQS = [
  {
    question: "Which airline operates flights to Pithoragarh and with which aircraft?",
    answer: "Alliance Air (former regional subsidiary of Air India) is the primary commercial carrier operating regular scheduled services using a modern 42-seater ATR-42-600 twin-turboprop aircraft. Additionally, FlyBig operates seasonal 18-seater Twin Otter aircraft on feeder routes. The ATR-42-600 is globally renowned for Short Takeoff and Landing (STOL) operations and high-altitude mountain valley performance."
  },
  {
    question: "What is the exact flight duration from Delhi and Dehradun?",
    answer: "From New Delhi (DEL) to Pithoragarh (NGH), the flight takes exactly 1 hour 20 minutes (80 mins). From Dehradun (DED) to Pithoragarh (NGH), the scenic ridge crossing takes only 45 minutes. Compared to 14 to 16 hours of exhausting mountain road travel, this aerial route saves over 13 hours."
  },
  {
    question: "What are the baggage allowances on these mountain flights?",
    answer: "Passengers are permitted 15 kg of check-in baggage plus 5 kg of cabin hand luggage per passenger ticket. Because Naini Saini Airport is at 4,970 ft elevation, flights strictly enforce high-altitude density limits. Excess baggage is subject to payload clearance and nominal airline fees (₹400 to ₹500 per additional kg). We strongly advise packing in soft rucksacks or duffel bags rather than hard trolley suitcases."
  },
  {
    question: "Where and how can I book tickets for Pithoragarh flights?",
    answer: "Tickets are bookable online directly on the Alliance Air official portal (allianceair.in), Air India partner booking pages, IRCTC Air (air.irctc.co.in), and major Online Travel Agents (OTAs) including MakeMyTrip, EaseMyTrip, and Ixigo. When searching, use IATA airport codes: New Delhi (DEL), Dehradun (DED), and Pithoragarh (NGH)."
  },
  {
    question: "How do I reach Dharchula basecamp from Naini Saini Airport?",
    answer: "Naini Saini Airport is located just 5 km from Pithoragarh city centre. Dharchula basecamp (where SDM Inner Line Permits and medical biometrics take place) is 92 km north along National Highway 09 (NH-09) following the picturesque Kali River valley. GoTrek Travels provides pre-arranged 4x4 Bolero / Scorpio tarmac pickups outside the terminal, ensuring comfortable same-day transit in 3 to 3.5 hours."
  },
  {
    question: "What happens if a flight is delayed or cancelled due to bad weather?",
    answer: "Himalayan valley flights operate under Visual Flight Rules (VFR) and mid-day weather windows (11:00 AM to 02:30 PM). In the rare event of inclement mountain weather or fog causing a flight cancellation, GoTrek Travels operates a standby overland fleet. Our backup 4x4 escort team stationed at Pantnagar / Kathgodam can seamlessly pick you up and ensure your Adi Kailash yatra batch schedule proceeds without missing permit milestones."
  },
  {
    question: "What is the airfare under the UDAN Regional Connectivity Scheme?",
    answer: "Because Pithoragarh NGH operates under the Ministry of Civil Aviation's UDAN (Ude Desh Ka Aam Nagrik) regional subsidy scheme, standard base fares are capped. Dehradun-Pithoragarh tickets typically range from ₹2,500 to ₹3,800 one-way. Delhi-Pithoragarh tickets typically range between ₹3,000 and ₹4,800 one-way depending on advance booking windows."
  },
  {
    question: "How do I reach Pithoragarh by bus from Delhi (Anand Vihar ISBT)?",
    answer: "Direct UTC (Uttarakhand Transport Corporation) Roadways buses depart Anand Vihar ISBT Platform 21/22 every evening between 04:30 PM and 08:45 PM. The total journey is approximately 495 km and takes 14 to 16 hours via Moradabad, Haldwani, Bhowali, Almora, and Ghat. Fares range from ₹680 for Ordinary 2x2 Hill Express to ₹850 for Semi-Deluxe and ₹1,150 for AC buses. Online tickets can be reserved at utc.uk.gov.in."
  },
  {
    question: "How can I travel by shared taxi from Haldwani or Kathgodam to Pithoragarh?",
    answer: "Shared mountain taxis (Mahindra Bolero, Maxx, and Sumo) operate from the KMOU Stand (Tikonia, Haldwani) and Kathgodam Railway Station Taxi Union stand. First cabs start as early as 05:00 AM and depart continuously until 02:00 PM as seats fill up (8 to 9 passengers per jeep). The journey takes 6.5 to 7.5 hours (~210 km via Almora or ~240 km via Tanakpur NH-09). The shared taxi fare is ₹600 to ₹750 per seat."
  },
  {
    question: "What are the private taxi hire rates to Pithoragarh and which route is fastest?",
    answer: "From Kathgodam / Haldwani, a private sedan (Dzire) costs ₹5,500 to ₹6,500; a rugged SUV (Mahindra Bolero/Scorpio) costs ₹6,500 to ₹7,800; and a premium Toyota Innova Crysta costs ₹8,500 to ₹11,000. For direct pickup from Delhi NCR, private cabs range from ₹14,000 to ₹22,000. The two main highway routes are: (1) Via Bhimtal, Bhowali, Almora, Ghat (210 km, ~7.5 hrs); and (2) Via Tanakpur, Champawat, Lohaghat on all-weather NH-09 (240 km, ~7.5 hrs, wider double-lane roads)."
  },
  {
    question: "How do I reach Pithoragarh from Tanakpur railway station?",
    answer: "Tanakpur is the southern railhead in Champawat district (connected to Delhi, Bareilly, and Lucknow). From Tanakpur, UTC roadways buses leave hourly (05:00 AM to 02:00 PM; fare ~₹270-₹340). Shared Bolero/Maxx jeeps leave every 30 minutes from Tanakpur station taxi stand (fare ~₹450-₹550/seat). Private cabs cost ₹4,500 to ₹6,000. The 150 km drive takes only 5 hours on NH-09 via Champawat and Lohaghat."
  }
];

export const PithoragarhFlightsPage: React.FC<PithoragarhFlightsPageProps> = memo(({
  onBackToHome,
  onOpenInquiry,
  onSelectPackage,
  onSelectDestination
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"delhi" | "dehradun" | "bus" | "taxi" | "weather" | "matrix" | "airport" | "transfer">("delhi");
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://gotrek.in/pithoragarh-flights";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      "Direct Flights to Pithoragarh (NGH) from Delhi & Dehradun: Alliance Air 42-seater schedules, departure timings, operating days & airport guide: " +
      pageUrl
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-24 selection:bg-amber-200 selection:text-amber-900">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/", onClick: onBackToHome },
            { label: "Yatra Guides & Logistics", href: "/blogs" },
            { label: "Pithoragarh Flight Timings & Airport Guide" },
          ]}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-2">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E2D3] text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#E6E2D3] text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              title="Print or Save Schedule PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Save Schedule PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              title="Share on WhatsApp"
            >
              <WhatsAppIcon size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#E6E2D3] text-xs font-bold text-slate-700 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              title="Copy Link"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white p-6 sm:p-10 md:p-12 shadow-xl border border-slate-700/60">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-12 bottom-6 opacity-10 hidden lg:block pointer-events-none">
            <Plane size={240} className="transform -rotate-12" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                <Plane size={13} className="text-amber-400" />
                <span>COMMERCIAL REGIONAL FLIGHT OPERATIONS ACTIVE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] sm:text-xs font-bold">
                IATA: NGH • ICAO: VIPG
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] sm:text-xs font-bold">
                UDAN RCS Subsidized
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight text-white">
              Flights to Pithoragarh: <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                Delhi & Dehradun Schedules, Timings & Guide
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transform a grueling 16-hour mountain road drive into an effortless 45 to 80-minute aerial flight. Complete 2026-2027 flight schedules, operating days, Alliance Air ATR-42 aircraft specs, baggage policies, Naini Saini Airport amenities, and seamless GoTrek 4x4 tarmac pickups to Dharchula.
            </p>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Delhi (DEL)</div>
                <div className="text-xl sm:text-2xl font-black text-white">80 Mins</div>
                <div className="text-[11px] text-slate-300 font-medium">11:00 AM • 6 Days/Wk</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Dehradun (DED)</div>
                <div className="text-xl sm:text-2xl font-black text-white">45 Mins</div>
                <div className="text-[11px] text-slate-300 font-medium">01:55 PM • 5 Days/Wk</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Aircraft Type</div>
                <div className="text-xl sm:text-2xl font-black text-white">ATR-42</div>
                <div className="text-[11px] text-slate-300 font-medium">42 Seats • Alliance Air</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Ground Pickup</div>
                <div className="text-xl sm:text-2xl font-black text-white">92 KM</div>
                <div className="text-[11px] text-slate-300 font-medium">3.5 hrs to Dharchula</div>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.allianceair.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Book Flight on Alliance Air</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setActiveTab("bus")}
                className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors cursor-pointer flex items-center gap-2"
              >
                <Bus size={15} className="text-amber-300" />
                <span>Bus Timetable & Fares</span>
              </button>

              <button
                onClick={() => setActiveTab("taxi")}
                className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors cursor-pointer flex items-center gap-2"
              >
                <Car size={15} className="text-amber-300" />
                <span>Taxi Stands & Cabs</span>
              </button>

              <button
                onClick={() => onOpenInquiry && onOpenInquiry("Pithoragarh Airport Pickup + 4x4 Transfer to Dharchula")}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs sm:text-sm border border-white/15 transition-colors cursor-pointer flex items-center gap-2"
              >
                <Car size={15} className="text-amber-400" />
                <span>Reserve 4x4 Pickup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Weather Quick Bar for Flight Operations */}
        <div className="space-y-2">
          <PithoragarhLiveWeatherCard 
            compact={true} 
            onOpenInquiry={onOpenInquiry} 
          />
        </div>

        {/* Interactive Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E6E2D3] shadow-xs overflow-x-auto scrollbar-none">
          {ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = activeTab === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setActiveTab(route.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={14} className={isActive ? "text-amber-400" : "text-slate-400"} />
                <span>{route.label}</span>
                {route.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                      isActive ? "bg-amber-400/20 text-amber-300" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {route.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Delhi ↔ Pithoragarh Dedicated Section */}
        {activeTab === "delhi" && (
          <motion.div
            key="tab-delhi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Outbound & Inbound Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Outbound Card: Delhi -> Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                      1
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">Outbound Service</span>
                      <h3 className="text-lg font-serif font-bold text-slate-900">Delhi (DEL) → Pithoragarh (NGH)</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                    6 Days/Wk (Mon-Sat)
                  </span>
                </div>

                {/* Timeline Path Illustration */}
                <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E6E2D3] flex items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <div className="text-2xl font-black text-slate-900">11:00 AM</div>
                    <div className="text-xs font-bold text-slate-700">Delhi (DEL)</div>
                    <div className="text-[10px] text-slate-500">IGI Airport T3/T2</div>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock size={11} />
                      <span>1 hr 20 min non-stop</span>
                    </span>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-300 border-dashed border-t" />
                      <Plane size={18} className="text-amber-800 absolute transform rotate-90" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold mt-1">Alliance Air 9I 863</span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-2xl font-black text-amber-900">12:20 PM</div>
                    <div className="text-xs font-bold text-slate-700">Pithoragarh (NGH)</div>
                    <div className="text-[10px] text-slate-500">Naini Saini Airport</div>
                  </div>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Operating Days</span>
                    <span className="font-bold text-slate-800">Monday to Saturday</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Estimated Base Fare</span>
                    <span className="font-bold text-amber-900">₹3,000 – ₹4,800 (UDAN)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Luggage Allowance</span>
                    <span className="font-bold text-slate-800">15 kg Check-in + 5 kg Cabin</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Onward Dharchula Cab</span>
                    <span className="font-bold text-emerald-800">Same-Day 3.5 hrs Drive</span>
                  </div>
                </div>
              </div>

              {/* Inbound Card: Pithoragarh -> Delhi */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                      2
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">Inbound Return Service</span>
                      <h3 className="text-lg font-serif font-bold text-slate-900">Pithoragarh (NGH) → Delhi (DEL)</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                    6 Days/Wk (Mon-Sat)
                  </span>
                </div>

                {/* Timeline Path Illustration */}
                <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E6E2D3] flex items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <div className="text-2xl font-black text-slate-900">02:10 PM</div>
                    <div className="text-xs font-bold text-slate-700">Pithoragarh (NGH)</div>
                    <div className="text-[10px] text-slate-500">Naini Saini Airport</div>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock size={11} />
                      <span>1 hr 10 min return</span>
                    </span>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-300 border-dashed border-t" />
                      <Plane size={18} className="text-amber-800 absolute transform rotate-90" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold mt-1">Alliance Air 9I 864</span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-2xl font-black text-amber-900">03:20 PM</div>
                    <div className="text-xs font-bold text-slate-700">Delhi (DEL)</div>
                    <div className="text-[10px] text-slate-500">IGI Terminal 3/2</div>
                  </div>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Operating Days</span>
                    <span className="font-bold text-slate-800">Monday to Saturday</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Departure Window</span>
                    <span className="font-bold text-amber-900">Midday (Clear VFR Sky)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Connecting Flights</span>
                    <span className="font-bold text-slate-800">Post 05:30 PM Feeder Slots</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Dharchula Departure</span>
                    <span className="font-bold text-emerald-800">Start 08:30 AM from Dharchula</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Pro-Tip Callout Box */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
                <Sparkles size={16} className="text-amber-700" />
                <span>Strategic Yatra Planning: Why the Delhi Flight is Ideal for Adi Kailash</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                By departing Delhi at <strong>11:00 AM</strong> and touching down in Pithoragarh at <strong>12:20 PM</strong>, you bypass the brutal 14-hour hairpin bends of the Kathgodam-Almora-Didihat highway. You arrive refreshed in Saur Valley, meet your GoTrek private 4x4 captain right outside the terminal gate, enjoy a scenic riverside lunch along the Kali River, and reach Dharchula by <strong>04:30 PM</strong>—leaving plenty of daylight to complete biometric registration and Inner Line Permit verification before dinner.
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Dehradun ↔ Pithoragarh Dedicated Section */}
        {activeTab === "dehradun" && (
          <motion.div
            key="tab-dehradun"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Outbound & Inbound Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dehradun to Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                      1
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">Outbound Service</span>
                      <h3 className="text-lg font-serif font-bold text-slate-900">Dehradun (DED) → Pithoragarh (NGH)</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                    5 Days/Wk (Tue-Sat)
                  </span>
                </div>

                {/* Timeline Path Illustration */}
                <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E6E2D3] flex items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <div className="text-2xl font-black text-slate-900">01:55 PM</div>
                    <div className="text-xs font-bold text-slate-700">Dehradun (DED)</div>
                    <div className="text-[10px] text-slate-500">Jolly Grant Airport</div>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock size={11} />
                      <span>Only 45 minutes</span>
                    </span>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-300 border-dashed border-t" />
                      <Plane size={18} className="text-amber-800 absolute transform rotate-90" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold mt-1">Alliance Air 9I 866</span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-2xl font-black text-amber-900">02:40 PM</div>
                    <div className="text-xs font-bold text-slate-700">Pithoragarh (NGH)</div>
                    <div className="text-[10px] text-slate-500">Naini Saini Airport</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Operating Days</span>
                    <span className="font-bold text-slate-800">Tue, Wed, Thu, Fri, Sat</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Fare Band</span>
                    <span className="font-bold text-amber-900">₹2,500 – ₹3,800 (Capped)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Aerial Panorama</span>
                    <span className="font-bold text-slate-800">Trishul & Nanda Devi Peaks</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Char Dham Connect</span>
                    <span className="font-bold text-emerald-800">Same-Day Transition</span>
                  </div>
                </div>
              </div>

              {/* Pithoragarh to Dehradun */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                      2
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">Inbound Service</span>
                      <h3 className="text-lg font-serif font-bold text-slate-900">Pithoragarh (NGH) → Dehradun (DED)</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                    5 Days/Wk (Tue-Sat)
                  </span>
                </div>

                {/* Timeline Path Illustration */}
                <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E6E2D3] flex items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <div className="text-2xl font-black text-slate-900">12:45 PM</div>
                    <div className="text-xs font-bold text-slate-700">Pithoragarh (NGH)</div>
                    <div className="text-[10px] text-slate-500">Naini Saini Airport</div>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock size={11} />
                      <span>Only 45 minutes</span>
                    </span>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-300 border-dashed border-t" />
                      <Plane size={18} className="text-amber-800 absolute transform rotate-90" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold mt-1">Alliance Air 9I 865</span>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-2xl font-black text-amber-900">01:30 PM</div>
                    <div className="text-xs font-bold text-slate-700">Dehradun (DED)</div>
                    <div className="text-[10px] text-slate-500">Jolly Grant Airport</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Operating Days</span>
                    <span className="font-bold text-slate-800">Tue, Wed, Thu, Fri, Sat</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Aircraft</span>
                    <span className="font-bold text-amber-900">ATR-42-600 Turboprop</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Next Stop Connectivity</span>
                    <span className="font-bold text-slate-800">Rishikesh & Haridwar in 35m</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">National Flights</span>
                    <span className="font-bold text-emerald-800">Easy DEL/BOM/BLR transfers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seamless Circuit Callout */}
            <div className="p-6 rounded-3xl bg-sky-50 border border-sky-200 text-sky-950 space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-2">
                <Compass size={16} className="text-sky-700" />
                <span>Combine Char Dham Yatra (Garhwal) with Adi Kailash (Kumaon)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Before this 45-minute flight operated, traveling from Badrinath or Kedarnath across to Dharchula required 2 full days of exhausting, winding mountain drives over Gwaldam and Karnaprayag. Now, pilgrims can complete their Char Dham yatra in Dehradun / Rishikesh, board the 01:55 PM flight at Jolly Grant Airport, and land in Pithoragarh at 02:40 PM on the same afternoon!
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Weekly Flight Rotation & Loop Matrix */}
        {activeTab === "matrix" && (
          <motion.div
            key="tab-matrix"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Weekly Aircraft Operations & Turnaround Matrix
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Because Alliance Air positions its ATR-42-600 aircraft in a high-efficiency triangular loop, flights operate seamlessly between Delhi, Pithoragarh, and Dehradun.
                </p>
              </div>

              <div className="space-y-4">
                {WEEKLY_SCHEDULE_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-[#E6E2D3] bg-[#FDFBF7] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="font-bold text-sm text-slate-900">{item.day}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium italic">
                        {item.note}
                      </span>
                    </div>

                    {item.legs.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {item.legs.map((leg, lIdx) => (
                          <div
                            key={lIdx}
                            className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-amber-900">{leg.flightNo}</span>
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-extrabold text-[9px]">
                                {leg.dur}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 leading-tight">
                              {leg.route}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                              <span>Dep: {leg.dep}</span>
                              <span className="font-bold text-slate-900">Arr: {leg.arr}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
                        <AlertCircle size={15} className="text-rose-600 shrink-0" />
                        <span>Sunday: No commercial flights scheduled. Ground 4x4 Bolero transport is available 24x7.</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: Live Airport Weather & Runway Status */}
        {activeTab === "weather" && (
          <motion.div
            key="tab-weather"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <PithoragarhLiveWeatherCard 
              onOpenInquiry={onOpenInquiry} 
            />
          </motion.div>
        )}

        {/* Tab 4: Naini Saini Airport (NGH) Terminal Guide */}
        {activeTab === "airport" && (
          <motion.div
            key="tab-airport"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <PithoragarhLiveWeatherCard 
              onOpenInquiry={onOpenInquiry} 
            />

            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Himalayan Tabletop Terminal</span>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Naini Saini Airport (IATA: NGH, ICAO: VIPG) Guide
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Constructed in 1991 and extensively upgraded under the Airports Authority of India (AAI) with a modern 1,600-meter asphalt runway.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-1.5">
                  <div className="text-amber-800 font-bold text-xs uppercase flex items-center gap-1.5">
                    <Mountain size={15} />
                    <span>Altitude & Geography</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">4,970 ft (1,515 m)</div>
                  <p className="text-[11px] text-slate-600">
                    Located in Saur Valley, offering immediate panoramic views of the Panchachuli snow peaks on final approach.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-1.5">
                  <div className="text-amber-800 font-bold text-xs uppercase flex items-center gap-1.5">
                    <Compass size={15} />
                    <span>Runway Dimensions</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">1,600 m x 30 m</div>
                  <p className="text-[11px] text-slate-600">
                    Oriented 14/32, optimized for STOL turboprop aircraft (ATR-42, Bombardier Q400, Twin Otter).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-1.5">
                  <div className="text-amber-800 font-bold text-xs uppercase flex items-center gap-1.5">
                    <MapPin size={15} />
                    <span>Proximity to City</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">5 km (15 mins)</div>
                  <p className="text-[11px] text-slate-600">
                    Convenient access to Pithoragarh town, Chandak hill view, and direct exit towards Dharchula on NH-09.
                  </p>
                </div>
              </div>

              {/* Terminal Amenities */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Terminal Amenities & Facilities for Pilgrims</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                    <span>Comfortable Passenger Lounge</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                    <span>Security Screening & Baggage Claim</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                    <span>Medical First Aid Post</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                    <span>Dedicated Pre-Paid Taxi Desk</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 5: 4x4 Ground Transfer to Dharchula Basecamp */}
        {activeTab === "transfer" && (
          <motion.div
            key="tab-transfer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Seamless Onward Connection</span>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  GoTrek 4x4 Private Airport Transfer: Pithoragarh to Dharchula (92 km)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Don't worry about finding local taxis or bargaining at the gate. GoTrek Travels stations a dedicated 4x4 Bolero/Scorpio right outside Naini Saini Airport for our registered yatris.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Gate Meet & Greet</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our native Kumaoni driver greets you with a GoTrek placard at the terminal exit, assists with luggage transfer, and provides complimentary bottled water.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Scenic NH-09 Riverside Drive</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enjoy a smooth, breathtaking 92 km drive through Ogla, Askot, and Jauljibi where the sacred Gori Ganga merges into the tranquil Kali River valley.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Same-Day Permit Clearance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Arrive in Dharchula by 04:00 – 04:30 PM, allowing our team to complete SDM Inner Line Permit formalities on the very same day.
                  </p>
                </div>
              </div>

              {/* Booking CTA for 4x4 */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900 to-amber-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif font-bold text-lg text-amber-200">Pre-Book Your Airport 4x4 Transfer</h4>
                  <p className="text-xs text-slate-300">
                    Private Bolero / Scorpio allocation with certified local mountain drivers.
                  </p>
                </div>

                <button
                  onClick={() => onOpenInquiry && onOpenInquiry("Airport 4x4 Pickup Service (Pithoragarh to Dharchula)")}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  Request 4x4 Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB: BY BUS (UTC ROADWAYS & VOLVO) ──────────────────── */}
        {activeTab === "bus" && (
          <motion.div
            key="tab-bus"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Bus Overview Header Card */}
            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Bus size={20} />
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">
                      Overland Public Transit
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    How to Reach Pithoragarh by Bus (UTC Roadways & Volvo)
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Daily Regular Services</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    Govt Capped Fares (₹270 – ₹1,150)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pithoragarh is well-connected by Uttarakhand Transport Corporation (UTC) roadways buses and KMOU (Kumaon Motor Owners Union) fleet. For budget travelers and pilgrims preferring overnight journeys, direct buses depart daily from Delhi (Anand Vihar ISBT), Haldwani/Kathgodam transit hub, Dehradun ISBT, and Tanakpur railhead.
              </p>
            </div>

            {/* 4 Major Bus Route Hubs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route 1: Delhi Anand Vihar to Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/60 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                      1
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                        Capital Gateway
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                        Delhi (Anand Vihar ISBT) → Pithoragarh
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                    ~495 KM • 14 – 16 Hrs
                  </span>
                </div>

                <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E2D3]/70 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Daily Departure Timings:</span>
                    <span className="font-bold text-slate-900">04:30 PM, 06:15 PM, 07:30 PM, 08:45 PM (Evening)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Boarding Terminal:</span>
                    <span className="font-bold text-slate-900">Anand Vihar ISBT (Platform 21 / 22 - UTC Counter)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Bus Categories & Fares:</span>
                    <span className="font-bold text-amber-900">Ordinary 2x2: ₹680 | Semi-Deluxe: ₹850 | AC Janrath: ₹1,150</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Highway Route:</span>
                    <span className="font-medium text-slate-700 text-right">Delhi → Moradabad → Rampur → Haldwani → Almora → Ghat → Pithoragarh</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                  <strong className="text-amber-900 font-semibold">Pro Yatri Tip:</strong> We recommend taking the <strong>06:15 PM or 07:30 PM</strong> bus so you cross the plains at night, witness the sunrise near Bhowali / Almora, and arrive in Pithoragarh by 10:00 – 11:30 AM in daylight.
                </div>
              </div>

              {/* Route 2: Haldwani & Kathgodam to Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/60 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                      2
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Primary Railhead Hub
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                        Haldwani & Kathgodam → Pithoragarh
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                    ~210 KM • 7.5 – 8.5 Hrs
                  </span>
                </div>

                <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E2D3]/70 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Frequency & Timings:</span>
                    <span className="font-bold text-slate-900">Every 45–60 mins from 04:30 AM to 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Boarding Stands:</span>
                    <span className="font-bold text-slate-900">Haldwani Roadways Stand & KMOU Tikonia Stand</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Bus Operators & Fare:</span>
                    <span className="font-bold text-emerald-900">UTC Hill Express & KMOU: ₹360 – ₹440 per seat</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Scenic Stops:</span>
                    <span className="font-medium text-slate-700 text-right">Kathgodam → Bhimtal → Bhowali (Kainchi Dham) → Almora → Danya → Ghat</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                  <strong className="text-emerald-900 font-semibold">Morning Rail Sync:</strong> If taking the overnight <em>Ranikhet Express</em> or <em>Kathgodam Shatabdi</em> from Delhi, alight at Kathgodam / Haldwani by 05:05 AM and board the early 05:30 AM or 06:15 AM bus to reach Pithoragarh by 02:00 PM.
                </div>
              </div>

              {/* Route 3: Dehradun to Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xs">
                      3
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                        State Capital Link
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                        Dehradun (ISBT) → Pithoragarh
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                    ~520 KM • 15 – 17 Hrs
                  </span>
                </div>

                <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E2D3]/70 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Daily Departures:</span>
                    <span className="font-bold text-slate-900">04:00 PM and 06:30 PM (Evening Express)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Boarding Terminal:</span>
                    <span className="font-bold text-slate-900">Dehradun ISBT (Haridwar Bypass Road)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Bus Fare:</span>
                    <span className="font-bold text-blue-900">₹780 – ₹920 per seat (UTC Hill Express 2x2)</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Route Path:</span>
                    <span className="font-medium text-slate-700 text-right">Rishikesh → Haridwar → Najibabad → Kashipur → Haldwani → Almora → Pithoragarh</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-blue-50/70 p-3 rounded-xl border border-blue-200/60">
                  <strong className="text-blue-900 font-semibold">Alternative:</strong> For faster transit, consider taking the 45-minute morning Alliance Air flight from Dehradun (DED) to Pithoragarh (NGH) instead of the 16-hour bus!
                </div>
              </div>

              {/* Route 4: Tanakpur to Pithoragarh */}
              <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 shadow-sm space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-black text-xs">
                      4
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block">
                        Southern Rail Gateway
                      </span>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">
                        Tanakpur Bus Stand → Pithoragarh
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-[10px] font-extrabold border border-purple-200">
                    ~150 KM • 5 – 6 Hrs
                  </span>
                </div>

                <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E2D3]/70 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Frequency & Timings:</span>
                    <span className="font-bold text-slate-900">Hourly departures from 05:00 AM to 02:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Highway:</span>
                    <span className="font-bold text-slate-900">NH-09 (All-Weather Double Lane Highway)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Bus Fare:</span>
                    <span className="font-bold text-purple-900">₹270 – ₹340 per passenger</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Key Towns Passed:</span>
                    <span className="font-medium text-slate-700 text-right">Sukhidhang → Champawat → Lohaghat → Ghat → Pithoragarh</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-purple-50/70 p-3 rounded-xl border border-purple-200/60">
                  <strong className="text-purple-900 font-semibold">Smoothest Ghat Road:</strong> The Tanakpur-Pithoragarh stretch via NH-09 is newly widened and engineered with gentler curves, making it significantly less prone to motion sickness.
                </div>
              </div>
            </div>

            {/* Online Bus Booking & Practical Travel Guide */}
            <div className="bg-[#FDFBF7] rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 space-y-4">
              <h4 className="text-lg font-serif font-bold text-slate-900">
                Official UTC Bus Booking Portal & Guidelines
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-[#E6E2D3] space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Globe className="text-amber-700" size={15} />
                    <span>Online UTC Web Booking</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Book online directly at <a href="https://utc.uk.gov.in" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-bold underline">utc.uk.gov.in</a> or download the official UTC Android App. Select origin 'DELHI ISBT ANAND VIHAR' and destination 'PITHORAGARH'.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6E2D3] space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Luggage className="text-amber-700" size={15} />
                    <span>Luggage Policy</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Passengers are permitted up to 25 kg of baggage free in the rear luggage boot or rooftop carrier. Keep valuables, warm jackets, and medicines in your personal daypack inside the cabin.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6E2D3] space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="text-amber-700" size={15} />
                    <span>Motion Sickness Caution</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Reserve seats in rows 3 to 6 (middle cabin) away from the wheels. Avoid back seats where mountain bouncing is pronounced. Take Avomine or ginger candy 30 minutes before entering hill roads.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB: BY TAXI (SHARED & PRIVATE CABS) ────────────────── */}
        {activeTab === "taxi" && (
          <motion.div
            key="tab-taxi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Taxi Overview Header Card */}
            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Car size={20} />
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">
                      Flexible Mountain Transit
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    How to Reach Pithoragarh by Taxi (Shared Jeeps & Private Cabs)
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Fastest Road Mode (6.5 – 7.5 Hrs)</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    Bolero, Scorpio & Innova Crysta
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Taxis are the most preferred overland travel mode across Uttarakhand's Kumaon hills. Choose between cost-effective <strong>Shared Mountain Jeeps</strong> (Maxx/Bolero at ₹600–₹750/seat) or hire a <strong>Dedicated Private Cab</strong> with seasoned hill chauffeurs for personalized departures, photography halts at Kainchi Dham, and luggage flexibility.
              </p>
            </div>

            {/* Section 1: Shared Taxi System (Maxx / Bolero / Sumo) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-600" />
                <h4 className="text-lg font-serif font-bold text-slate-900">
                  Shared Mountain Jeeps (Per-Seat Shuttle System)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stand 1: Haldwani / Kathgodam */}
                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-sm">Haldwani & Kathgodam Stand</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                      ₹600 – ₹750 / Seat
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p><strong>Boarding Stand:</strong> KMOU Taxi Stand (Tikonia, Haldwani) & Kathgodam Railway Exit Booth.</p>
                    <p><strong>Departure Window:</strong> 05:00 AM to 02:00 PM (cabs leave as soon as 8-9 seats fill).</p>
                    <p><strong>Transit Time:</strong> 6.5 to 7.5 Hours (saves ~2 hours compared to roadways buses).</p>
                    <p><strong>Vehicle Types:</strong> Mahindra Bolero, Maxx, and Tata Sumo Gold.</p>
                  </div>
                  <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
                    Tip: Pay ₹50-₹100 extra to reserve the front passenger seat next to the driver for maximum comfort and views.
                  </div>
                </div>

                {/* Stand 2: Tanakpur */}
                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-sm">Tanakpur Taxi Union Stand</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold">
                      ₹450 – ₹550 / Seat
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p><strong>Boarding Stand:</strong> Right outside Tanakpur Railway Station parking area.</p>
                    <p><strong>Departure Window:</strong> 05:30 AM to 03:00 PM (departures every 30 to 45 mins).</p>
                    <p><strong>Transit Time:</strong> 4.5 to 5.5 Hours via NH-09 all-weather highway.</p>
                    <p><strong>Route Path:</strong> Sukhidhang → Champawat → Lohaghat → Ghat → Pithoragarh.</p>
                  </div>
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium">
                    Best southern rail connection from Bareilly, Lucknow, Gorakhpur, and eastern Uttar Pradesh.
                  </div>
                </div>

                {/* Stand 3: Almora */}
                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D3] shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-sm">Almora Dharanaula Stand</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-extrabold">
                      ₹350 – ₹450 / Seat
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p><strong>Boarding Stand:</strong> Dharanaula Bus & Taxi Stand, lower Almora.</p>
                    <p><strong>Departure Window:</strong> 06:00 AM to 04:00 PM continuously.</p>
                    <p><strong>Transit Time:</strong> 3.5 to 4.5 Hours (~120 KM).</p>
                    <p><strong>Ideal for:</strong> Yatris taking a spiritual detour to Kainchi Dham or Jageshwar Dham.</p>
                  </div>
                  <div className="text-[11px] text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-200 font-medium">
                    Famous food break: Pick up authentic fresh Bal Mithai at Kheem Singh Mohan Singh in Almora.
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Private Dedicated Taxi Rates Card */}
            <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">
                    Transparent Rate Card 2026-2027
                  </span>
                  <h4 className="text-lg font-serif font-bold text-slate-900">
                    Private Dedicated Mountain Taxi Fares (Full Vehicle Hire)
                  </h4>
                </div>
                <span className="text-xs text-slate-500">
                  Includes fuel, driver allowance, hill toll taxes & vehicle permits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#E6E2D3] bg-[#FDFBF7]">
                      <th className="p-3 font-bold text-slate-700">Vehicle Category</th>
                      <th className="p-3 font-bold text-slate-700">Capacity & Luggage</th>
                      <th className="p-3 font-bold text-amber-900 bg-amber-50">From Kathgodam / Haldwani</th>
                      <th className="p-3 font-bold text-slate-700">From Tanakpur Railhead</th>
                      <th className="p-3 font-bold text-slate-700">From Delhi NCR (Direct)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2D3]">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Maruti Dzire / Etios (Sedan)</td>
                      <td className="p-3 text-slate-600">3–4 Guests • 2 Med Bags</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/50">₹5,500 – ₹6,500</td>
                      <td className="p-3 text-slate-700">₹4,200 – ₹5,000</td>
                      <td className="p-3 text-slate-700">₹14,000 – ₹17,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Mahindra Bolero / Scorpio (4x4/SUV)</td>
                      <td className="p-3 text-emerald-700 font-bold">5–6 Guests • 5 Heavy Rucksacks ★ Best for Yatra</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/50">₹6,500 – ₹7,800</td>
                      <td className="p-3 text-slate-700">₹5,000 – ₹6,200</td>
                      <td className="p-3 text-slate-700">₹16,000 – ₹19,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Toyota Innova Crysta (Premium SUV)</td>
                      <td className="p-3 text-slate-600">5–6 Guests • Maximum Legroom & AC</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/50">₹8,500 – ₹11,000</td>
                      <td className="p-3 text-slate-700">₹7,500 – ₹9,000</td>
                      <td className="p-3 text-slate-700">₹19,000 – ₹24,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Force Urbania / Tempo Traveller</td>
                      <td className="p-3 text-slate-600">12–16 Devotees • Dedicated Family Group</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/50">₹16,000 – ₹20,000</td>
                      <td className="p-3 text-slate-700">₹14,000 – ₹17,000</td>
                      <td className="p-3 text-slate-700">₹32,000 – ₹38,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Highway Road Routes Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E6E2D3] space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                  Route Option A: Via Almora (Classic Scenic Route)
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Kathgodam → Bhimtal → Bhowali → Almora → Danya → Ghat → Pithoragarh</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Distance:</strong> 210 KM | <strong>Duration:</strong> 7 to 8 hours.<br />
                  <strong>Highlights:</strong> Passes through pine-forested ridges, provides access to Neem Karoli Baba Ashram at Kainchi Dham, offers panoramic views of Himalayan peaks from Almora, and crosses the scenic Sarju river confluence at Ghat.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E6E2D3] space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  Route Option B: Via Tanakpur NH-09 (All-Weather Highway)
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Tanakpur → Sukhidhang → Champawat → Lohaghat → Ghat → Pithoragarh</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Distance:</strong> 150 KM (from Tanakpur) / 240 KM (from Haldwani) | <strong>Duration:</strong> 5 to 7.5 hours.<br />
                  <strong>Highlights:</strong> Fully modernized all-weather double-lane NH-09 highway. Smoother gradients, fewer steep hairpin turns, least motion sickness, and faster clearance by BRO during monsoon periods.
                </p>
              </div>
            </div>

            {/* Booking Call-to-Action for Private Cab Escort */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <span>🚗 Verified GoTrek Mountain Fleet</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-white">Need a Dedicated Private Taxi to Pithoragarh?</h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Reserve a hill-certified Bolero, Scorpio, or Innova Crysta with experienced Kumaon drivers. Timely pickup directly at Kathgodam railway platform, Pantnagar Airport, or Delhi NCR.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onOpenInquiry && onOpenInquiry("Private Mountain Taxi Hire to Pithoragarh")}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-md"
                >
                  Book Private Taxi
                </button>
                <a
                  href="https://wa.me/917248285767?text=Namaste!%20I%20would%20like%20to%20book%20a%20taxi%20to%20Pithoragarh."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Visual Journey Comparison: Flight vs Bus vs Shared Taxi vs Private Cab */}
        <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Transit Comparison Matrix</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Comparing How to Reach Pithoragarh: Flight vs Bus vs Shared Taxi vs Private Cab
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare transit duration, physical strain, costs, and arrival times across different modes to choose the best option for your pilgrimage.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E6E2D3] bg-[#FDFBF7]">
                  <th className="p-3.5 font-bold text-slate-700">Travel Factor</th>
                  <th className="p-3.5 font-bold text-amber-900 bg-amber-100/60 rounded-t-xl">
                    ✈️ Alliance Air Flight
                  </th>
                  <th className="p-3.5 font-bold text-slate-700">
                    🚌 UTC Roadways Bus
                  </th>
                  <th className="p-3.5 font-bold text-slate-700">
                    🚕 Shared Mountain Taxi
                  </th>
                  <th className="p-3.5 font-bold text-slate-700">
                    🚗 Private Mountain Cab
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2D3]">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Total Transit Time</td>
                  <td className="p-3.5 font-black text-amber-900 bg-amber-50/50">80 Mins (DEL) / 45 Mins (DED)</td>
                  <td className="p-3.5 text-slate-700">14 – 16 Hrs (Delhi) | 8 Hrs (Haldwani)</td>
                  <td className="p-3.5 text-slate-700">6.5 – 7.5 Hrs (from Haldwani)</td>
                  <td className="p-3.5 font-bold text-emerald-800">6.5 Hrs (from Haldwani) | 12 Hrs (Delhi)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Mountain Hairpin Bends</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-amber-50/50">Zero (Smooth Air Cruise)</td>
                  <td className="p-3.5 text-slate-700">220 km winding mountain ghats</td>
                  <td className="p-3.5 text-slate-700">210–240 km mountain curves</td>
                  <td className="p-3.5 text-slate-700">Custom stops at scenic view breaks</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Fatigue for Elderly Devotees</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-amber-50/50">Very Low (Arrive fresh & ready)</td>
                  <td className="p-3.5 text-rose-700 font-medium">High (Overnight bumpy road travel)</td>
                  <td className="p-3.5 text-amber-700 font-medium">Moderate (Shared seating)</td>
                  <td className="p-3.5 text-emerald-700 font-medium">Low to Moderate (Rest breaks as needed)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Arrival in Pithoragarh</td>
                  <td className="p-3.5 font-bold text-slate-900 bg-amber-50/50">12:20 PM (Daylight)</td>
                  <td className="p-3.5 text-slate-700">10:00 AM – 02:00 PM (Depending on departure)</td>
                  <td className="p-3.5 text-slate-700">01:00 PM – 03:00 PM</td>
                  <td className="p-3.5 text-slate-700">Flexible as per customer start time</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Dharchula Reachability</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-amber-50/50">Same Day by 04:30 PM</td>
                  <td className="p-3.5 text-slate-700">Often requires night halt in Pithoragarh</td>
                  <td className="p-3.5 text-slate-700">Connecting shared jeep to Dharchula available</td>
                  <td className="p-3.5 font-bold text-emerald-700">Can proceed directly to Dharchula basecamp</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Cost per Passenger / Vehicle</td>
                  <td className="p-3.5 font-bold text-amber-900 bg-amber-50/50">₹3,000 – ₹4,800 / Seat (UDAN)</td>
                  <td className="p-3.5 text-emerald-700 font-bold">₹360 – ₹850 / Seat (Most economical)</td>
                  <td className="p-3.5 text-slate-700">₹600 – ₹750 / Seat</td>
                  <td className="p-3.5 text-slate-700">₹6,500 – ₹7,800 / Vehicle (Bolero/Scorpio)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step-by-Step Ticket Booking Guide */}
        <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Booking Instructions</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              How to Book Your Pithoragarh Flight Tickets Online
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Follow these simple steps to secure your seats on Alliance Air at government-capped fares.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-black text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Visit Official Portal</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Go to <a href="https://www.allianceair.in" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-bold">allianceair.in</a> or open IRCTC Air / MakeMyTrip app.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-black text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Enter Airport Codes</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Origin: <strong>DEL</strong> (Delhi) or <strong>DED</strong> (Dehradun). Destination: <strong>NGH</strong> (Pithoragarh).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-black text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Select Active Day</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pick a flight date: Monday through Saturday for Delhi, or Tuesday through Saturday for Dehradun.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E2D3] space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-black text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Instant E-Ticket</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fill passenger details, confirm 15 kg check-in baggage, and download your boarding pass.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.allianceair.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-300 hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              <span>Alliance Air Portal</span>
              <ExternalLink size={13} />
            </a>

            <a
              href="https://air.irctc.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              <span>IRCTC Air Portal</span>
              <ExternalLink size={13} />
            </a>

            <button
              onClick={() => onOpenInquiry && onOpenInquiry("Flight Ticket Booking Assistance for Pithoragarh NGH")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold text-xs transition-colors cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Need GoTrek Concierge Assistance?</span>
            </button>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl border border-[#E6E2D3] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Frequently Asked Questions</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Pithoragarh Flight Operations Q&A
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E6E2D3] rounded-2xl overflow-hidden bg-[#FDFBF7]"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform shrink-0 ${openFaqIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E6E2D3] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-6 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-amber-200 text-[10px] font-bold uppercase tracking-wider">
              <span>✈️ + 🚙 Complete Yatra Integration</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Ready to Fly to Pithoragarh for Your 2027 Yatra?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              Let GoTrek Travels synchronize your flight arrival with dedicated 4x4 Bolero transport, SDM Inner Line Permit approvals, and handpicked Nabi/Gunji homestay reservations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onOpenInquiry && onOpenInquiry("Adi Kailash Yatra with Pithoragarh Flight Integration")}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-amber-50 text-amber-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Plan My Yatra with Flights
            </button>

            <a
              href="https://wa.me/917248285767?text=Namaste!%20I%20would%20like%20details%20about%20flights%20to%20Pithoragarh%20and%204x4%20transfers%20to%20Dharchula."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp Flight Desk</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
});

PithoragarhFlightsPage.displayName = "PithoragarhFlightsPage";
export default PithoragarhFlightsPage;
