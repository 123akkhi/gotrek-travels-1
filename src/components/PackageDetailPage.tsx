import React, { useState, useEffect, memo } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  Car,
  Home,
  HeartPulse,
  Award,
  PhoneCall,
  Sparkles,
  FileText,
  Clock,
  Compass,
  CreditCard,
  ChevronRight,
  Info,
  Check,
  Download,
  CloudSun,
  X,
  Lightbulb,
  Droplets,
  Mountain,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateItineraryPdf } from "../utils/pdfGenerator";
import { HotelsAccommodationSection } from "./HotelsAccommodationSection";
import { RelatedPackagesSection } from "./RelatedPackagesSection";
import { CostCalculator } from "./CostCalculator";
import { YatraWeatherCard } from "./YatraWeatherCard";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { OmLightSymbol, SmoothStoneCard, FloatingOmBackground } from "./OmLightMotif";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";


interface PackageDetailPageProps {
  packageSlug: string;
  onBack: () => void;
  onOpenInquiry: (destination?: string) => void;
  onOpenRazorpay: (options: { amount: number; title: string; packageType?: string }) => void;
  onSelectPackage: (slug: string) => void;
  onSelectDestination?: (slug: string) => void;
}

interface PackageData {
  slug: string;
  key: "standard" | "premium";
  title: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  priceNote: string;
  heroImage: string;
  vehicleType: string;
  vehicleDesc: string;
  stayType: string;
  stayDesc: string;
  foodType: string;
  circuitType: string;
  groupSize: string;
  medicalSupport: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    route: string;
    stay: string;
    desc: string;
    activities: string[];
  }[];
  ilpRequirements: string[];
  batches2027: {
    date: string;
    seatsLeft: number;
    status: "Filling Fast" | "Available" | "Almost Full";
  }[];
}

const PACKAGES_DATA: Record<string, PackageData> = {
  "adi-kailash-yatra-standard": {
    slug: "adi-kailash-yatra-standard",
    key: "standard",
    title: "Standard Yatra Package",
    subtitle: "The Authentic Himalayan Sacred Circuit (Budget-Friendly)",
    price: 28000,
    priceFormatted: "₹28,000",
    priceNote: "Per Person · Inclusive of All Taxes & Permits",
    heroImage: "/images/destinations/adi-kailash6.webp",
    vehicleType: "Shared 4x4 Bolero / Tempo Traveller",
    vehicleDesc: "6-7 Yatris per vehicle with experienced Kumaoni mountain drivers trained in high-altitude terrain.",
    stayType: "Clean & Hygienic Village Homestays",
    stayDesc: "Traditional family-run Bhotia homestays in Nabi & Gunji villages with warm fleece bedding and clean toilets.",
    foodType: "100% Pure Sattvik Pure-Veg Meals",
    circuitType: "Core Circuit: Adi Kailash, Om Parvat & Parvati Sarovar",
    groupSize: "12 - 15 Yatris per Batch",
    medicalSupport: "Basic First Aid Kit, Pulse Oximeter & Portable Oxygen Canister",
    highlights: [
      "Darshan of sacred Om Parvat naturally carved snow-Om symbol",
      "Holy dip & Parikrama at Parvati Sarovar & Gauri Kund (14,500 ft)",
      "Inner Line Permit (ILP) complete hassle-free SDM Dharchula management",
      "Traditional Kumaoni warmth & indigenous Bhotia village homestays",
      "Pithoragarh HQ logistics support with 24/7 helpline",
    ],
    inclusions: [
      "Accommodation for 5 Nights / 6 Days in clean village homestays & hotels",
      "Daily Sattvik Breakfast & Dinner (Pure Vegetarian)",
      "Inner Line Permit (ILP) processing & SDM Dharchula liaison",
      "Transportation in 4x4 Mahindra Bolero / Tempo Traveller (Kathgodam / Dharchula)",
      "All driver charges, toll tax, parking & high-altitude fuel surcharges",
      "Basic medical kit, pulse oximeter monitoring & portable oxygen canister",
      "Experienced local Kumaoni trip coordinator throughout the circuit",
    ],
    exclusions: [
      "Personal expenses such as laundry, phone calls, or tips",
      "Pony / Mule or Porter charges if requested individually at Adi Kailash base",
      "Lunch on transit days during Delhi/Kathgodam road travel",
      "Medical emergency evacuation charges beyond basic ground assistance",
      "Anything not specifically mentioned in the inclusions list",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Delhi to Dharchula Transit",
        route: "Kathgodam → Almora → Pithoragarh → Dharchula (280 km)",
        stay: "Hotel in Dharchula (Twin / Triple Sharing)",
        desc: "Meet your GoTrek representative at Kathgodam railway station early morning. Scenic drive along the Kali River through Almora and Pithoragarh, arriving at the border town of Dharchula by evening.",
        activities: [
          "Welcome briefing & document submission for Inner Line Permit (ILP)",
          "Overnight stay and dinner in Dharchula hotel",
        ],
      },
      {
        day: 2,
        title: "SDM Verification & Drive to Nabi / Gunji Village",
        route: "Dharchula → Chialekh → Garbyang → Nabi Village (75 km 4x4 Drive)",
        stay: "Traditional Bhotia Homestay in Nabi",
        desc: "Morning medical fitness check & SDM Dharchula ILP approval. Cross the Chialekh pass and enter the picturesque Vyas Valley.",
        activities: [
          "Pass through ITBP verification checkpost at Chialekh",
          "Witness the famous sinking village of Garbyang",
          "Traditional welcome at Nabi homestay with hot herbal Kumaoni tea",
        ],
      },
      {
        day: 3,
        title: "Sacred Adi Kailash, Parvati Sarovar & Gauri Kund Darshan",
        route: "Nabi → Jolingkong → Parvati Sarovar → Adi Kailash Base → Nabi (45 km)",
        stay: "Traditional Bhotia Homestay in Nabi",
        desc: "Early morning drive to Jolingkong (14,000 ft). Easy 1.5 km trek to Parvati Sarovar and Shiva Temple directly facing the majestic peak of Adi Kailash.",
        activities: [
          "Divine Swarna Aarti & Puja at Shiva Temple",
          "Trek to Gauri Kund at the foot of Adi Kailash",
          "Return to Nabi village homestay for evening folklore and hot dinner",
        ],
      },
      {
        day: 4,
        title: "Om Parvat Darshan & Kali Mata Temple at Nabidhang",
        route: "Nabi → Gunji → Kalapani → Nabidhang → Nabi (50 km)",
        stay: "Traditional Bhotia Homestay in Nabi",
        desc: "Drive to Nabidhang (14,200 ft) for divine darshan of Om Parvat, where snow naturally forms the sacred Sanskrit 'ॐ' syllable.",
        activities: [
          "Darshan of Om Parvat from Nabidhang vantage point",
          "Visit Kali Mata Temple at Kalapani & origin point of Kali River",
          "Inspect Indo-China border trade post relics at Gunji",
        ],
      },
      {
        day: 5,
        title: "Return Drive from Nabi to Pithoragarh / Didihat",
        route: "Nabi → Chialekh → Dharchula → Pithoragarh (120 km)",
        stay: "Clean Hotel in Pithoragarh",
        desc: "Bid farewell to Nabi village hosts and descend through the Vyas Valley to Dharchula, continuing onward to Pithoragarh.",
        activities: [
          "Visit Mostamanu Temple or Pithoragarh Fort in the evening",
          "Celebration dinner & sharing of Yatra completion certificates",
        ],
      },
      {
        day: 6,
        title: "Pithoragarh to Kathgodam / Delhi Departure",
        route: "Pithoragarh → Champawat → Tanakpur → Kathgodam (190 km)",
        stay: "N/A (Departure Day)",
        desc: "Morning drive from Pithoragarh to Kathgodam railway station / bus stand with sweet memories and divine blessings.",
        activities: [
          "En-route visit to Jageshwar Dham or Champawat Tea Gardens",
          "Drop at Kathgodam railway station by 5:00 PM for onward train",
        ],
      },
    ],
    ilpRequirements: [
      "Copy of Aadhaar Card (Front & Back)",
      "Police Verification Certificate (PVC) from home district police station",
      "Medical Fitness Certificate from registered MBBS doctor",
      "4 Recent Passport-size Photographs",
    ],
    batches2027: [
      { date: "May 10 - May 15, 2027", seatsLeft: 4, status: "Filling Fast" },
      { date: "May 20 - May 25, 2027", seatsLeft: 2, status: "Almost Full" },
      { date: "June 02 - June 07, 2027", seatsLeft: 6, status: "Available" },
      { date: "June 15 - June 20, 2027", seatsLeft: 5, status: "Filling Fast" },
      { date: "Sept 10 - Sept 15, 2027", seatsLeft: 8, status: "Available" },
      { date: "Oct 05 - Oct 10, 2027", seatsLeft: 7, status: "Available" },
    ],
  },

  "adi-kailash-spiritual-expedition-premium": {
    slug: "adi-kailash-spiritual-expedition-premium",
    key: "premium",
    title: "Premium Spiritual Expedition",
    subtitle: "The Ultimate VIP Comfort & Extended Kumaon Temple Tour",
    price: 38000,
    priceFormatted: "₹38,000",
    priceNote: "Per Person · Kathgodam Pickup · All-Inclusive Luxury SUV",
    heroImage: "/images/destinations/adi-kailash5.webp",
    vehicleType: "Luxury 4x4 SUV (Scorpio / Isuzu D-Max)",
    vehicleDesc: "Max 4 Yatris per SUV ensuring window seats, plush leather interiors, and veteran Himalayan rally drivers.",
    stayType: "Premium Hotels + Authentic Wooden Cottages",
    stayDesc: "Deluxe hotel stays in Pithoragarh & handcrafted wooden cottages in Nabi with electric heated blankets & attached Western toilets.",
    foodType: "Extended Sattvik Gourmet & Mountain Snacks",
    circuitType: "Extended Circuit: Core Shrines + Kainchi Dham, Jageshwar Dham & Patal Bhuvaneshwar",
    groupSize: "Small VIP Batches (Max 8 - 10 Yatris)",
    medicalSupport: "Priority Medical Oxygen Cylinder, Oximeter & Ex-Army Medical Advisor Escort",
    highlights: [
      "Extended sacred circuit including Neem Karoli Baba Kainchi Dham, 124 Jyotirlinga Jageshwar & Patal Bhuvaneshwar cave temple",
      "Luxury 4x4 SUV (Scorpio/Isuzu) guaranteed 4 passengers per vehicle",
      "Private wooden cottages in Nabi with electric heated fleece blankets",
      "Female Trek Leader + Dedicated Photography Assistant for high-altitude shots",
      "Express priority Inner Line Permit (ILP) clearance via GoTrek VIP desk",
      "Complimentary Yatra kit: Puffer jacket, rain poncho & stainless steel hot flask",
    ],
    inclusions: [
      "5 Nights / 6 Days premium hotel & wooden cottage accommodation",
      "Daily Sattvik Gourmet Breakfast, Dinner & Evening Hot Tea / Local Bhotia Snacks",
      "Comfortable 4x4 SUV (Mahindra Scorpio / Isuzu) with only 4 Yatris per vehicle",
      "Express Inner Line Permit (ILP) processing & ITBP clearance assistance",
      "Female Trek Leader & Ex-Army Medical Advisor on group standby",
      "Dedicated photography assistant for personal yatra memories",
      "Priority medical oxygen cylinder in vehicle + pulse oximeter monitoring",
      "Complimentary GoTrek Yatra kit (Puffer Jacket, Rain Poncho, Hot Water Flask)",
      "All driver fees, fuel charges, parking, toll tax & luxury stay taxes included",
    ],
    exclusions: [
      "Personal items, shopping, or personal telephone calls",
      "Individual helicopter joyrides if requested separately",
      "Lunch during transit road travel",
      "Any costs due to unexpected landslides or road closures beyond planned itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam → Kainchi Dham → Pithoragarh",
        route: "Kathgodam → Kainchi Dham (Neem Karoli Ashram) → Almora → Pithoragarh",
        stay: "Deluxe Hotel in Pithoragarh",
        desc: "Morning pickup in private 4x4 SUV from Kathgodam. Visit Neem Karoli Baba Ashram at Kainchi Dham for divine darshan before proceeding to Pithoragarh.",
        activities: [
          "Special Swarna Aarti at Kainchi Dham Ashram",
          "Welcome dinner at Pithoragarh hotel & briefing by Female Trek Leader",
        ],
      },
      {
        day: 2,
        title: "Pithoragarh to Nabi Village via Chialekh Pass",
        route: "Pithoragarh → Dharchula → Chialekh → Garbyang → Nabi Village",
        stay: "Handcrafted Luxury Wooden Cottage in Nabi (Attached Western Toilet)",
        desc: "Priority ILP permit verification at Dharchula SDM office. Ascent through the majestic Kali Valley, crossing Chialekh wildflower meadows.",
        activities: [
          "Express clearance at ITBP Chialekh checkpost",
          "Welcome drink & electric blanket allocation at Nabi wooden cottages",
        ],
      },
      {
        day: 3,
        title: "Adi Kailash, Parvati Sarovar & Gauri Kund Divine Darshan",
        route: "Nabi → Jolingkong → Parvati Sarovar → Adi Kailash Base → Nabi",
        stay: "Handcrafted Luxury Wooden Cottage in Nabi",
        desc: "Drive to Jolingkong in comfortable 4x4 SUV. Perform Rudrabhishek Puja at Parvati Sarovar Shiva Temple with female trek leader and photographer.",
        activities: [
          "Special Shiva Puja & Parikrama at Parvati Sarovar (14,500 ft)",
          "Professional high-altitude photography session facing Adi Kailash peak",
          "Hot lunch served at Jolingkong tea house",
        ],
      },
      {
        day: 4,
        title: "Om Parvat, Kalapani & Kuti Indigenous Village",
        route: "Nabi → Nabidhang (Om Parvat) → Kalapani → Kuti Village → Nabi",
        stay: "Handcrafted Luxury Wooden Cottage in Nabi",
        desc: "View the snow-carved sacred 'Om' symbol at Om Parvat from Nabidhang. Visit the ancient stone village of Kuti, named after Kunti Devi of Mahabharata.",
        activities: [
          "Om Parvat Meditation & Chanting session at Nabidhang",
          "Visit Kali Temple at Kalapani & Mahabharata Era Kuti Fort ruins",
          "Evening Bhotia cultural campfire at Nabi cottage",
        ],
      },
      {
        day: 5,
        title: "Nabi to Patal Bhuvaneshwar Underground Cave Temple",
        route: "Nabi → Dharchula → Patal Bhuvaneshwar Cave Temple",
        stay: "Resort Stay at Patal Bhuvaneshwar",
        desc: "Descend from Vyas Valley and travel to the miraculous underground limestone cave temple of Patal Bhuvaneshwar, holding 33 crore Hindu deities.",
        activities: [
          "Guided descent into the sacred subterranean limestone cave",
          "Evening relaxation & dinner at mountain view resort",
        ],
      },
      {
        day: 6,
        title: "Jageshwar Dham Jyotirlinga to Kathgodam Departure",
        route: "Patal Bhuvaneshwar → Jageshwar Dham → Kathgodam",
        stay: "N/A (Departure Day)",
        desc: "Morning drive to Jageshwar Dham, home to 124 ancient stone temples nestled in deodar forests. Conclude yatra with drop-off at Kathgodam.",
        activities: [
          "Special Darshan at Maha Mritunjaya Temple in Jageshwar",
          "Distribution of blessed Prasad & Yatra souvenir kit",
          "Drop-off at Kathgodam Railway Station by 6:00 PM",
        ],
      },
    ],
    ilpRequirements: [
      "Copy of Aadhaar Card (Front & Back)",
      "Police Verification Certificate (PVC) or Passport Copy",
      "Medical Fitness Certificate from registered doctor",
      "4 Recent Passport-size Photographs",
    ],
    batches2027: [
      { date: "May 12 - May 17, 2027", seatsLeft: 2, status: "Almost Full" },
      { date: "May 22 - May 27, 2027", seatsLeft: 4, status: "Filling Fast" },
      { date: "June 05 - June 10, 2027", seatsLeft: 5, status: "Available" },
      { date: "June 18 - June 23, 2027", seatsLeft: 3, status: "Filling Fast" },
      { date: "Sept 12 - Sept 17, 2027", seatsLeft: 6, status: "Available" },
      { date: "Oct 08 - Oct 13, 2027", seatsLeft: 4, status: "Available" },
    ],
  },

  "adi-kailash-vip-luxury-helicopter": {
    slug: "adi-kailash-vip-luxury-helicopter",
    key: "premium",
    title: "VIP Luxury Helicopter Package",
    subtitle: "Pithoragarh Helipad to Gunji Direct Flight · 3-Day Express Darshan",
    price: 95000,
    priceFormatted: "₹95,000",
    priceNote: "Per Person · Includes Roundtrip Helicopter Flights & VIP Permits",
    heroImage: "/images/destinations/adi-kailash6.webp",
    vehicleType: "Helicopter Flight + Dedicated Private 4x4 SUV",
    vehicleDesc: "25-minute direct helicopter flight bypassing 200+ km mountain roads, followed by private SUV in Vyas Valley.",
    stayType: "Luxury Heated Wooden Cottages",
    stayDesc: "Private heated wooden cottages in Nabi with electric blankets, en-suite western bathrooms, and high-altitude oxygen concentrators.",
    foodType: "VIP Sattvik Gourmet & Mountain Delicacies",
    circuitType: "Express VIP Circuit: Adi Kailash, Om Parvat & Kalapani",
    groupSize: "Exclusive VIP Small Batches (Max 6 Yatris)",
    medicalSupport: "Dedicated Medical Oxygen Concentrator & Personal Medic Escort",
    highlights: [
      "25-minute scenic helicopter flight from Pithoragarh to Gunji helipad",
      "Zero strenuous road fatigue — ideal for elderly pilgrims and busy executives",
      "VIP priority Inner Line Permit (ILP) expedited clearance desk",
      "Private luxury heated cottage stay in Nabi with personal attendant",
      "Dedicated tour lead & personal photographer for high-altitude memories",
    ],
    inclusions: [
      "Roundtrip Pithoragarh to Gunji helicopter flight tickets",
      "2 Nights stay in private heated luxury wooden cottages",
      "All gourmet Sattvik meals & high-altitude beverages",
      "VIP expedited Inner Line Permit (ILP) processing",
      "Private 4x4 SUV for Jolingkong and Om Parvat viewpoints",
      "Personal photographer & high-altitude medical support",
    ],
    exclusions: [
      "GST 5%",
      "Personal items, shopping, or personal telephone calls",
      "Flights to Pithoragarh from home city",
    ],
    itinerary: [
      {
        day: 1,
        title: "Pithoragarh to Gunji Helipad & Nabi Luxury Cottages",
        route: "Pithoragarh Naini Saini Airport → Gunji Helipad (25-min flight) → Nabi",
        stay: "Luxury Heated Wooden Cottage in Nabi",
        desc: "Morning boarding at Pithoragarh Airport. Scenic helicopter flight over snow peaks to Gunji. Private SUV transfer to Nabi cottages.",
        activities: ["VIP Helipad Reception", "Scenic Flight over Kali Valley", "Nabi Cottage Welcome"],
      },
      {
        day: 2,
        title: "Adi Kailash & Om Parvat Twin Sacred Darshan",
        route: "Nabi → Jolingkong (Adi Kailash) → Nabidhang (Om Parvat) → Nabi",
        stay: "Luxury Heated Wooden Cottage in Nabi",
        desc: "Private 4x4 drive to Jolingkong for Adi Kailash puja. Afternoon drive to Nabidhang for sacred Om Parvat sunrise/darshan and Kalapani Temple.",
        activities: ["Adi Kailash Rudrabhishek Puja", "Om Parvat Meditation", "Kalapani Temple Worship"],
      },
      {
        day: 3,
        title: "Gunji to Pithoragarh Heli Return & Departure",
        route: "Gunji Helipad → Pithoragarh Airport (25-min flight)",
        stay: "N/A (Departure Day)",
        desc: "Morning helicopter transfer back to Pithoragarh with divine blessings and sacred yatra mementos.",
        activities: ["Return Helicopter Flight", "Airport Drop"],
      },
    ],
    ilpRequirements: [
      "Copy of Aadhaar Card",
      "Medical Fitness Certificate",
      "4 Passport-size Photographs",
    ],
    batches2027: [
      { date: "May 15 - May 17, 2027", seatsLeft: 2, status: "Almost Full" },
      { date: "May 25 - May 27, 2027", seatsLeft: 3, status: "Filling Fast" },
      { date: "June 08 - June 10, 2027", seatsLeft: 4, status: "Available" },
      { date: "Sept 15 - Sept 17, 2027", seatsLeft: 4, status: "Available" },
    ],
  },
};

interface ProTipInfo {
  tag: string;
  tip: string;
  altitude?: string;
  category: "hydration" | "altitude" | "permit" | "darshan" | "weather" | "gear";
}

const getPilgrimageProTip = (slug: string, title: string, subtitle: string): ProTipInfo => {
  const text = `${slug} ${title} ${subtitle}`.toLowerCase();

  if (text.includes("helicopter") || text.includes("heli")) {
    return {
      tag: "Rapid Ascent Protocol",
      altitude: "10,500 ft (Gunji Helipad)",
      tip: "Rapid elevation gain alert — rest for at least 2 hours with warm water or herbal tea upon landing before undertaking physical movement.",
      category: "altitude",
    };
  }

  if (text.includes("adi-kailash") || text.includes("jolingkong") || text.includes("parvati")) {
    return {
      tag: "Altitude & Hydration",
      altitude: "14,500 ft (Jolingkong & Parvati Sarovar)",
      tip: "Hydration is key at 14,500 ft (Jolingkong) — sip 3–4 liters of warm water daily to keep oxygen saturation high and prevent mountain sickness during Parikrama.",
      category: "hydration",
    };
  }

  if (text.includes("om-parvat") || text.includes("nabidhang")) {
    return {
      tag: "Optimal Darshan Window",
      altitude: "14,200 ft (Nabidhang)",
      tip: "Clear sunrise darshan of the natural snow 'ॐ' is best between 6:30 AM and 8:30 AM before morning cloud mist gathers over the peak.",
      category: "darshan",
    };
  }

  if (text.includes("mansarovar") || text.includes("kailash") || text.includes("lipulekh")) {
    return {
      tag: "Optical Darshan Tip",
      altitude: "17,060 ft (Old Lipulekh Pass)",
      tip: "Carry 8x or 10x binoculars for the Lipulekh vantage point for high-definition views of Mount Kailash and Lake Mansarovar across the Tibetan border.",
      category: "darshan",
    };
  }

  if (text.includes("flower") || text.includes("hemkund")) {
    return {
      tag: "Alpine Trekking Gear",
      altitude: "11,500 – 15,200 ft (Valley / Hemkund)",
      tip: "Wear waterproof ankle-grip trekking shoes and carry a light rain poncho — alpine showers occur unexpectedly during peak flower bloom (July–August).",
      category: "gear",
    };
  }

  if (text.includes("chardham") || text.includes("kedarnath") || text.includes("badrinath")) {
    return {
      tag: "Biometric e-Pass Check",
      altitude: "11,755 ft (Kedarnath Dham)",
      tip: "Save your Uttarakhand Tourism Biometric Yatra QR pass offline on your phone; network coverage is limited near Sonprayag and Gaurikund.",
      category: "permit",
    };
  }

  if (text.includes("khaliya") || text.includes("munsyari") || text.includes("munsiyari")) {
    return {
      tag: "Sunrise & Rhododendron Trail",
      altitude: "12,200 ft (Zero Point Summit)",
      tip: "Pre-dawn start (5:00 AM) is recommended for Zero Point to witness the golden alpenglow ignition across the 5 peaks of Panchachuli before morning mist rises.",
      category: "darshan",
    };
  }

  if (text.includes("kumaon") || text.includes("kainchi") || text.includes("jageshwar")) {
    return {
      tag: "Temple Rituals & Ashram Decorum",
      altitude: "4,600 – 6,500 ft (Kumaon Shrines)",
      tip: "Carry traditional modest Indian clothing for Jageshwar Maha Mrityunjaya Abhishek puja and check Kainchi Dham evening Aarti timings (6:00 PM).",
      category: "darshan",
    };
  }

  if (text.includes("darma") || text.includes("panchachuli")) {
    return {
      tag: "Thermal Layering",
      altitude: "11,200 ft (Darma Valley)",
      tip: "Night temperatures drop sharply near glaciers — wear three breathable thermal layers rather than one bulky single jacket.",
      category: "weather",
    };
  }

  return {
    tag: "High-Altitude Preparedness",
    altitude: "14,000+ ft",
    tip: "Hydration is key at 14k ft — sip 3–4L warm water daily, keep original government ID & medical certificates in a waterproof pouch.",
    category: "hydration",
  };
};

export const PackageDetailPage = memo(({
  packageSlug,
  onBack,
  onOpenInquiry,
  onOpenRazorpay,
  onSelectPackage,
  onSelectDestination,
}: PackageDetailPageProps) => {
  // Determine active package or default to matched key
  const pkg = PACKAGES_DATA[packageSlug] || 
    (packageSlug.includes("premium") 
      ? PACKAGES_DATA["adi-kailash-spiritual-expedition-premium"] 
      : PACKAGES_DATA["adi-kailash-yatra-standard"]);

  const [selectedBatch, setSelectedBatch] = useState(pkg.batches2027[0].date);
  const [paxCount, setPaxCount] = useState(2);
  const [activeTab, setActiveTab] = useState<"overview" | "calendar" | "itinerary" | "weather" | "inclusions" | "documents" | "accommodations">("overview");
  const [isTipDismissed, setIsTipDismissed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsTipDismissed(false);
  }, [packageSlug]);

  const proTip = getPilgrimageProTip(pkg.slug, pkg.title, pkg.subtitle);

  const otherPkgKey = pkg.key === "standard" ? "adi-kailash-spiritual-expedition-premium" : "adi-kailash-yatra-standard";
  const otherPkg = PACKAGES_DATA[otherPkgKey];

  const isAdiKailashPackage = pkg.slug.includes("adi-kailash");
  const totalAdvanceAmount = 5000 * paxCount; // ₹5,000 per person booking advance

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pt-[104px] sm:pt-[116px] lg:pt-[124px] pb-24 relative overflow-hidden"
    >
      {/* Smooth Floating Om Light Motifs in Background */}
      <FloatingOmBackground density="rich" className="opacity-75" />

      {/* 2. Hero Section */}
      <div className="relative bg-[#0F172A] text-white overflow-hidden py-12 sm:py-16">
        {/* Floating Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-30">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Packages</span>
          </button>
        </div>

        <div className="absolute inset-0 z-0 opacity-35">
          <BlurUpImage 
            src={pkg.heroImage}
            blurDataURL={getDestinationBlurPlaceholder(pkg.slug)}
            alt={pkg.title} 
            referrerPolicy="no-referrer"
            priority={true}
            preset="detailBanner"
            fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover brightness-90" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-transparent z-0"></div>

        {/* Luminous Om Symbol Light Motif Floating in Sky */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-16 pointer-events-none z-10">
          <OmLightSymbol size="hero" glowColor="gold" animated={true} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border flex items-center gap-1.5 ${
                pkg.key === "premium"
                  ? "bg-amber-500 text-amber-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "bg-amber-500/20 text-amber-200 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
              }`}
            >
              <span className="font-serif font-black text-amber-300">ॐ</span>
              <span>{pkg.key === "premium" ? "⭐ VIP All-Inclusive Comfort" : "🌱 Authentic Sacred Circuit"}</span>
            </span>

            <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-xs">
              <Clock size={14} className="text-amber-400" />
              <span>6 Days / 5 Nights</span>
            </span>

            <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-xs">
              <MapPin size={14} className="text-amber-400" />
              <span>Pithoragarh & Vyas Valley, Uttarakhand</span>
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
                {pkg.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base italic max-w-2xl">
                {pkg.subtitle}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Official GoTrek Fixed Price
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>4 Seats Left</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">{pkg.priceFormatted}</span>
                <span className="text-xs text-slate-300">/ Yatri</span>
              </div>
              <p className="text-[11px] text-slate-300 italic border-t border-white/10 pt-2">
                {pkg.priceNote}
              </p>

              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenInquiry(pkg.title)}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center border border-white/20"
                  >
                    Ask Inquiry
                  </button>
                  <button
                    onClick={() =>
                      onOpenRazorpay({
                        amount: 3000,
                        title: `Advance Booking — ${pkg.title}`,
                        packageType: pkg.title,
                      })
                    }
                    className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-md flex items-center justify-center gap-1"
                  >
                    <CreditCard size={12} />
                    <span>Pay Advance ₹3k</span>
                  </button>
                </div>

                <button
                  onClick={() =>
                    generateItineraryPdf({
                      title: `${pkg.title} · Adi Kailash & Om Parvat`,
                      subtitle: `${pkg.subtitle} · ${pkg.priceFormatted} per person`,
                      duration: "6 Days / 5 Nights",
                      altitude: "14,500 ft (Jolingkong Base)",
                      startingPoint: "Kathgodam / Dharchula Base",
                      endingPoint: "Kathgodam / Dharchula Base",
                      bestSeason: "May – June & September – October 2027",
                      difficulty: "Moderate (4x4 Expedition)",
                      price: pkg.priceFormatted,
                      highlights: pkg.highlights,
                      itinerary: pkg.itinerary.map((it) => ({
                        day: it.day,
                        title: it.title,
                        description: it.desc,
                        stay: it.stay,
                        activities: it.activities,
                        meals: pkg.foodType,
                      })),
                      inclusions: pkg.inclusions,
                      exclusions: pkg.exclusions,
                      permitsRequired: pkg.ilpRequirements || [
                        "Inner Line Permit (SDM Dharchula)",
                        "Aadhar Card Photocopy",
                        "Medical Fitness Certificate (MBBS Doctor)",
                      ],
                    })
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider transition-all text-center border border-white/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} className="text-amber-300" />
                  <span>Download Full Itinerary PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Package Specification Cards & Context-Aware Pro Yatra Tip Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-4">
        {/* Dismissible Context-Aware Pro Yatra Tip Banner */}
        <AnimatePresence>
          {!isTipDismissed && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98, height: 0, marginTop: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                id="pro-yatra-tip-banner"
                className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-400/40 p-3 sm:p-3.5 shadow-md backdrop-blur-md flex items-center justify-between gap-3 text-slate-800"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 border border-amber-400/50 shadow-xs">
                    {proTip.category === "hydration" && <Droplets size={16} className="text-amber-700 animate-pulse" />}
                    {proTip.category === "altitude" && <HeartPulse size={16} className="text-amber-700" />}
                    {proTip.category === "darshan" && <Sparkles size={16} className="text-amber-700" />}
                    {proTip.category === "gear" && <Mountain size={16} className="text-emerald-700" />}
                    {proTip.category === "permit" && <ShieldCheck size={16} className="text-blue-700" />}
                    {proTip.category === "weather" && <CloudSun size={16} className="text-amber-700" />}
                  </div>

                  <div className="text-xs sm:text-sm min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 leading-none mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/25 text-amber-950 font-black text-[10px] uppercase tracking-wider border border-amber-500/40">
                        Pro Yatra Tip
                      </span>
                      <span className="text-[11px] font-bold text-amber-800">
                        • {proTip.tag}
                      </span>
                      {proTip.altitude && (
                        <span className="text-[10px] font-medium text-slate-500 hidden md:inline-block">
                          ({proTip.altitude})
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 text-xs sm:text-[13px] font-medium leading-relaxed">
                      {proTip.tip}
                    </p>
                  </div>
                </div>

                <button
                  id="btn-dismiss-pro-yatra-tip"
                  onClick={() => setIsTipDismissed(true)}
                  className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Dismiss Pro Yatra Tip"
                  title="Dismiss tip"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E6E2D3] rounded-2xl p-4 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Car size={16} />
              <span>Vehicle Specs</span>
            </div>
            <div className="text-xs font-bold text-slate-900">{pkg.vehicleType}</div>
            <p className="text-[11px] text-slate-500 leading-tight">{pkg.vehicleDesc}</p>
          </div>

          <div className="bg-white border border-[#E6E2D3] rounded-2xl p-4 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Home size={16} />
              <span>Stay Comfort</span>
            </div>
            <div className="text-xs font-bold text-slate-900">{pkg.stayType}</div>
            <p className="text-[11px] text-slate-500 leading-tight">{pkg.stayDesc}</p>
          </div>

          <div className="bg-white border border-[#E6E2D3] rounded-2xl p-4 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <HeartPulse size={16} />
              <span>Medical Safety</span>
            </div>
            <div className="text-xs font-bold text-slate-900">High-Altitude Protocol</div>
            <p className="text-[11px] text-slate-500 leading-tight">{pkg.medicalSupport}</p>
          </div>

          <div className="bg-white border border-[#E6E2D3] rounded-2xl p-4 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Compass size={16} />
              <span>Shrines Circuit</span>
            </div>
            <div className="text-xs font-bold text-slate-900">Circuit Inclusions</div>
            <p className="text-[11px] text-slate-500 leading-tight">{pkg.circuitType}</p>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation for Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex border-b border-[#E6E2D3] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Overview & Highlights
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "calendar"
                ? "border-[#C91D24] text-[#C91D24] bg-red-50/50 rounded-t-xl font-black"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Calendar size={14} className={activeTab === "calendar" ? "text-[#C91D24]" : "text-amber-700"} />
            <span>2027 Availability Calendar</span>
            <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-[#C91D24] text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5">
              <Flame size={10} className="fill-[#C91D24]" />
              <span>Peak Months</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === "itinerary"
                ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            6-Day Detailed Itinerary
          </button>
          <button
            onClick={() => setActiveTab("weather")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "weather"
                ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <CloudSun size={15} className="text-amber-600" />
            <span>Live Weather & Conditions</span>
          </button>
          <button
            onClick={() => setActiveTab("inclusions")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === "inclusions"
                ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === "documents"
                ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Permits & Documents (ILP)
          </button>
          {isAdiKailashPackage && (
            <button
              onClick={() => setActiveTab("accommodations")}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                activeTab === "accommodations"
                  ? "border-amber-800 text-amber-900 bg-amber-50/50 rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Hotels & Stays (Standard vs Premium)
            </button>
          )}
        </div>
      </div>

      {/* 5. Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tab Views */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 space-y-5 shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-[#1E293B]">
                  Key Highlights of {pkg.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-[#F8F6F0] border border-[#E6E2D3]">
                      <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 leading-relaxed font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2027 Peak Season Spotlight Banner */}
              <div className="bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border border-[#C91D24]/30 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C91D24]/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2.5 rounded-2xl bg-[#C91D24] text-white shadow-xs">
                      <Flame size={20} />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">
                        2027 Adi Kailash Peak Booking Windows
                      </h4>
                      <p className="text-xs text-slate-600">
                        SDM Dharchula Inner Line Permit (ILP) quotas are allocated on a strictly first-come basis.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab("calendar");
                      const calElem = document.getElementById("availability-calendar-section");
                      if (calElem) calElem.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-full bg-[#C91D24] hover:bg-[#A8181E] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <span>Open 2027 Calendar</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E6E2D3] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Flame size={13} className="text-[#C91D24]" />
                        <span>May & June (Opening & Prime Peak)</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-[#C91D24]">
                        88% Quota Claimed
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Pristine snow on peaks, holy temple opening, mildest high-altitude weather. Ideal for families and seniors.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E6E2D3] space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Sparkles size={13} className="text-amber-700" />
                        <span>September & October (Autumn Golden Peak)</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        78% Quota Claimed
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      100% azure blue skies, zero clouds, sharpest visibility of the snow-carved 'Om' symbol on Om Parvat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Full 2027 Availability Calendar in Overview */}
              <AvailabilityCalendar
                packageTitle={pkg.title}
                selectedBatchDate={selectedBatch}
                onSelectBatchDate={(batchDate) => setSelectedBatch(batchDate)}
                onOpenInquiry={onOpenInquiry}
                onOpenRazorpay={onOpenRazorpay}
              />

              {/* Real-Time Live Weather Card */}
              <YatraWeatherCard slug="adi-kailash" onOpenInquiry={onOpenInquiry} />

              {/* Package Comparison Switch Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[28px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Want to see the alternative package?
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">
                    Compare with {otherPkg.title} ({otherPkg.priceFormatted})
                  </h4>
                  <p className="text-xs text-slate-600">
                    {pkg.key === "standard"
                      ? "Upgrade to Premium for luxury Scorpio SUVs, wooden cottage stays, and extended temple circuit."
                      : "Switch to Standard for budget-friendly 4x4 Bolero trips and authentic homestay circuit."}
                  </p>
                </div>

                <button
                  onClick={() => onSelectPackage(otherPkg.slug)}
                  className="px-5 py-2.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
                >
                  View {otherPkg.key === "premium" ? "Premium" : "Standard"} Details
                </button>
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <AvailabilityCalendar
                packageTitle={pkg.title}
                selectedBatchDate={selectedBatch}
                onSelectBatchDate={(batchDate) => setSelectedBatch(batchDate)}
                onOpenInquiry={onOpenInquiry}
                onOpenRazorpay={onOpenRazorpay}
              />
            </div>
          )}

          {activeTab === "itinerary" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white border border-[#E6E2D3] rounded-[24px] p-6 shadow-sm space-y-3 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[#F5F2ED] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          0{day.day}
                        </span>
                        <div>
                          <h4 className="text-base font-serif font-bold text-slate-900">{day.title}</h4>
                          <span className="text-[11px] text-amber-800 font-semibold">{day.route}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-200">
                        Stay: {day.stay}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{day.desc}</p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Day Highlights & Activities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {day.activities.map((act, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 bg-[#F8F6F0] p-2 rounded-xl border border-[#E6E2D3]">
                            <Sparkles size={12} className="text-amber-700 shrink-0" />
                            <span className="truncate">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "inclusions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              {/* Inclusions Box */}
              <div className="bg-white border border-emerald-200 rounded-[28px] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider border-b border-emerald-100 pb-3">
                  <CheckCircle2 size={18} />
                  <span>Package Inclusions ({pkg.inclusions.length})</span>
                </div>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions Box */}
              <div className="bg-white border border-rose-200 rounded-[28px] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider border-b border-rose-100 pb-3">
                  <XCircle size={18} />
                  <span>Package Exclusions</span>
                </div>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <XCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "weather" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <YatraWeatherCard slug="adi-kailash" onOpenInquiry={onOpenInquiry} />
            </div>
          )}

          {activeTab === "documents" && (
            <div className="bg-white border border-[#E6E2D3] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-300">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-amber-800" />
                  <span>Mandatory SDM Dharchula Permit Requirements</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Inner Line Permit (ILP) Verification Checklist
                </h3>
                <p className="text-xs text-slate-600">
                  GoTrek manages 100% of your permit submission with SDM Dharchula and ITBP checkposts. Simply WhatsApp these 4 documents upon booking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.ilpRequirements.map((req, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E6E2D3] flex items-center gap-3">
                    <FileText size={20} className="text-amber-800 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{req}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                <span className="font-bold block">Need help getting your Police Verification Certificate (PVC)?</span>
                <span className="text-slate-700">
                  Our Dharchula liaison team can guide you on obtaining standard online PVC through your home state police portal.
                </span>
              </div>
            </div>
          )}

          {activeTab === "accommodations" && isAdiKailashPackage && (
            <div className="animate-in fade-in duration-300">
              <HotelsAccommodationSection onOpenInquiry={onOpenInquiry} />
            </div>
          )}
        </div>

        {/* Right Column: Booking Box & Batch Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E6E2D3] rounded-[32px] p-6 shadow-md space-y-6 sticky top-20">
            <div className="space-y-2 border-b border-[#F5F2ED] pb-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Fixed 2027 Batch Dates
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Select Your Yatra Date
              </h3>
              <p className="text-xs text-slate-500">
                Choose your batch and pay ₹5,000 per seat to lock your Inner Line Permit seat.
              </p>

              {/* Quick Link to 2027 Availability Calendar */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("calendar");
                  const calElem = document.getElementById("availability-calendar-section");
                  if (calElem) calElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-red-500/10 via-amber-500/15 to-orange-500/10 border border-[#C91D24]/30 hover:border-[#C91D24] text-[#C91D24] text-[11px] font-bold flex items-center justify-between transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-1.5">
                  <Flame size={13} className="text-[#C91D24] fill-[#C91D24]" />
                  <span>View 2027 Peak Months Calendar</span>
                </div>
                <ChevronRight size={14} className="text-[#C91D24] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Batch List Radio Selector */}
            <div className="space-y-2.5">
              {/* Selected batch from full calendar if not in default short list */}
              {selectedBatch && !pkg.batches2027.some((b) => b.date === selectedBatch) && (
                <label
                  onClick={() => setSelectedBatch(selectedBatch)}
                  className="p-3.5 rounded-2xl border border-[#C91D24] bg-amber-50/90 shadow-xs transition-all cursor-pointer flex items-center justify-between ring-1 ring-[#C91D24]"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="yatraBatch"
                      checked={true}
                      onChange={() => {}}
                      className="accent-[#C91D24]"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{selectedBatch}</div>
                      <div className="text-[10px] text-amber-900 font-semibold">Chosen from 2027 Calendar</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#C91D24]">
                    Reserved Date
                  </span>
                </label>
              )}

              {pkg.batches2027.map((batch) => (
                <label
                  key={batch.date}
                  onClick={() => setSelectedBatch(batch.date)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedBatch === batch.date
                      ? "border-amber-800 bg-amber-50/70 shadow-sm"
                      : "border-[#E6E2D3] hover:bg-[#F8F6F0]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="yatraBatch"
                      checked={selectedBatch === batch.date}
                      onChange={() => setSelectedBatch(batch.date)}
                      className="accent-amber-800"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{batch.date}</div>
                      <div className="text-[10px] text-slate-500">{batch.seatsLeft} Seats Remaining</div>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      batch.status === "Almost Full"
                        ? "bg-rose-100 text-rose-800"
                        : batch.status === "Filling Fast"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {batch.status}
                  </span>
                </label>
              ))}
            </div>

            {/* Passenger Counter */}
            <div className="space-y-1.5 pt-2 border-t border-[#F5F2ED]">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Number of Yatris</label>
              <div className="flex items-center justify-between bg-[#F8F6F0] p-2 rounded-2xl border border-[#E6E2D3]">
                <button
                  onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                  className="h-8 w-8 rounded-xl bg-white border border-[#E6E2D3] font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                >
                  -
                </button>
                <span className="text-sm font-bold text-slate-900">{paxCount} {paxCount === 1 ? "Person" : "Persons"}</span>
                <button
                  onClick={() => setPaxCount(paxCount + 1)}
                  className="h-8 w-8 rounded-xl bg-white border border-[#E6E2D3] font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary Calculation */}
            <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#E6E2D3] space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{pkg.title} ({paxCount}x)</span>
                <span className="font-semibold text-slate-900">₹{((pkg.price || 0) * paxCount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-amber-900 font-bold border-t border-[#E6E2D3] pt-2">
                <span>Seat Booking Advance Due Now</span>
                <span>₹{(totalAdvanceAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                * Pay remaining balance upon arrival in Dharchula after ILP verification.
              </p>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() =>
                onOpenRazorpay({
                  amount: totalAdvanceAmount,
                  title: `${pkg.title} — ${selectedBatch} (${paxCount} Pax)`,
                  packageType: pkg.title,
                })
              }
              className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <CreditCard size={16} />
              <span>Book Now with Razorpay (₹{(totalAdvanceAmount || 0).toLocaleString('en-IN')})</span>
            </button>

            <button
              onClick={() => {
                const msg = `*Yatra Booking Consultation — GoTrek Travels 2027*%0A%0A*Package:* ${encodeURIComponent(pkg.title)}%0A*Batch Date:* ${encodeURIComponent(selectedBatch)}%0A*Yatris Count:* ${paxCount} Pax%0A*Advance Due:* ₹${(totalAdvanceAmount || 0).toLocaleString('en-IN')}%0A%0A_Hello GoTrek Team, I would like to consult with your team regarding my booking, inner line permit requirements, and payment details for this batch._`;
                window.open(`https://wa.me/917248285767?text=${msg}`, '_blank');
              }}
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
            >
              <WhatsAppIcon size={16} />
              <span>Consult with Team on WhatsApp</span>
            </button>

            <button
              onClick={() => onOpenInquiry(`${pkg.title} (${selectedBatch})`)}
              className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-[#E6E2D3] transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall size={14} className="text-amber-800" />
              <span>Speak to Dharchula Permit Officer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Cost Calculator & Related Packages Section for Tablet & Large Screen Optimization */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-12">
        {/* Yatra Cost Estimator Inner Calculator */}
        <div className="pt-6">
          <CostCalculator
            onOpenInquiry={onOpenInquiry}
            defaultTier={pkg.key === "premium" ? "premium" : "standard"}
          />
        </div>

        {/* All Related Packages Section */}
        <RelatedPackagesSection
          currentSlug={pkg.slug}
          onSelectPackage={onSelectPackage}
          onSelectDestination={onSelectDestination}
          onOpenInquiry={onOpenInquiry}
        />
      </div>
    </motion.div>
  );
});


PackageDetailPage.displayName = "PackageDetailPage";

export default PackageDetailPage;
