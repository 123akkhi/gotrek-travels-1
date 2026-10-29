import React, { useState, useEffect, memo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass, Sparkles, LayoutDashboard, Send, MapPin, Menu, X, Shirt,
  PhoneCall, ChevronDown, Mountain, Flower2, Landmark, ShieldCheck, ArrowRight, Globe,
  Home, Newspaper, Mail, Phone, Package, BookOpen, ChevronRight, Users, Briefcase,
  Search, Heart, User, UserCheck, Bell, BellRing, CheckCheck, FileText, CheckCircle2,
  Calculator, Check, Info, Calendar, Sparkle, ExternalLink, Sun, Flame, ChevronLeft,
  Clock, Award, ArrowUpRight, ShoppingBag, Film, Camera, HeartPulse, Building2
} from "lucide-react";
import { useLanguage, SUPPORTED_LANGUAGES, Language } from "../context/LanguageContext";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { GoTrekLogo } from "./GoTrekLogo";
import { PilgrimUser } from "../types";
import { prefetchComponent } from "../utils/lazyWithRetry";

export interface NavbarProps {
  onOpenInquiry: (destination?: string) => void;
  onOpenAiConsultant: () => void;
  onToggleCrm: () => void;
  isCrmActive: boolean;
  currentUser?: PilgrimUser | null;
  onOpenUserAuth?: (tab?: 'login' | 'signup') => void;
  onLogoutUser?: () => void;
  onOpenClothingGuide?: () => void;
  onSelectDestination?: (slug: string) => void;
  onSelectBlog?: (slug?: string) => void;
  onSelectPackage?: (slug: string) => void;
  onSelectSeoPage?: (slug: string) => void;
  onOpenTeamPage?: () => void;
  onOpenCareersPage?: () => void;
  onOpenAboutUsPage?: () => void;
  onOpenReelsPage?: () => void;
  onOpenMemoriesPage?: () => void;
  onSelectPithoragarhFlights?: () => void;
  onOpenMedicalFitness?: () => void;
  onGoHome?: () => void;
  onOpenSearch?: () => void;
  activePage?: string;
}

interface DropdownItem {
  title: string;
  desc?: string;
  slug: string;
  type: 'destination' | 'package' | 'seo' | 'blog' | 'blog-all' | 'clothing' | 'faq' | 'about' | 'team' | 'careers' | 'reels' | 'memories' | 'flights' | 'medical-fitness';
  badge?: string;
}

interface PackageShowcaseCard {
  title: string;
  duration: string;
  price: string;
  badge: string;
  destSlug: string;
  packageSlug?: string;
  category: 'all' | 'adi-kailash' | 'mansarovar' | 'flowers' | 'chardham' | 'dodham' | 'himachal';
  image: string;
  highlights: string[];
  type: 'destination' | 'package';
}

const DESTINATION_ITEMS: DropdownItem[] = [
  {
    title: "Adi Kailash & Om Parvat",
    desc: "Chhota Kailash & eternal snow Om at 14,500 ft",
    slug: "adi-kailash",
    type: "destination",
    badge: "Most Sacred",
  },
  {
    title: "Kailash Mansarovar View",
    desc: "Direct darshan from Old Lipulekh (No China Visa)",
    slug: "kailash-mansarovar",
    type: "destination",
    badge: "New Route",
  },
  {
    title: "Spiti Valley & Chandratal",
    desc: "Key Gompa, Hikkim, Chicham Bridge & Moon Lake",
    slug: "spiti-valley",
    type: "destination",
    badge: "Cold Desert",
  },
  {
    title: "Manali & Solang Valley",
    desc: "Atal Tunnel, Rohtang Pass & Hadimba Temple",
    slug: "manali-solang-lahaul",
    type: "destination",
    badge: "Snow Gateway",
  },
  {
    title: "Shimla, Kufri & Chail",
    desc: "Mall Road, Jakhoo Temple & Hatu Peak 360°",
    slug: "shimla-kufri-chail",
    type: "destination",
    badge: "Queen of Hills",
  },
  {
    title: "Dharamshala & McLeodGanj",
    desc: "Dalai Lama Temple, Triund Trek & Kangra Valley",
    slug: "dharamshala-mcleodganj",
    type: "destination",
    badge: "Little Lhasa",
  },
  {
    title: "Kasol, Manikaran & Jibhi",
    desc: "Hot springs, Parvati Valley & Serolsar Lake",
    slug: "kasol-manikaran-jibhi",
    type: "destination",
    badge: "Parvati Valley",
  },
  {
    title: "Kinnaur, Kalpa & Chitkul",
    desc: "India's Last Village & Kinner Kailash view",
    slug: "kinnaur-kalpa-sangla",
    type: "destination",
    badge: "Land of Gods",
  },
  {
    title: "Dalhousie & Bir Billing",
    desc: "Khajjiar Mini Switzerland & World #2 Paragliding",
    slug: "dalhousie-khajjiar-bir",
    type: "destination",
    badge: "Paragliding",
  },
  {
    title: "Kedarnath & Badrinath Do Dham",
    desc: "6D/5N Shiva Jyotirlinga & Vishnu Abode with VIP Darshan",
    slug: "do-dham-kedarnath-badrinath",
    type: "destination",
    badge: "Popular Do Dham",
  },
  {
    title: "Char Dham Grand Circuit 2027",
    desc: "10D/9N Kedarnath, Badrinath, Gangotri & Yamunotri",
    slug: "chardham-yatra",
    type: "destination",
    badge: "10-Day Yatra",
  },
  {
    title: "Yamunotri & Gangotri Do Dham",
    desc: "5D/4N Sacred origins of Ganga & Yamuna rivers",
    slug: "yamunotri-dham",
    type: "destination",
    badge: "River Sources",
  },
  {
    title: "Kedarnath Jyotirlinga Dham",
    desc: "11th Jyotirlinga at 11,755 ft & Bhim Shila Darshan",
    slug: "kedarnath-dham",
    type: "destination",
    badge: "11th Jyotirlinga",
  },
  {
    title: "Badrinath Vishal & Mana Village",
    desc: "Lord Badri Vishal & India's Last Village at Indo-Tibet Border",
    slug: "badrinath-dham",
    type: "destination",
    badge: "Badri Vishal",
  },
  {
    title: "Gangotri Bhagirathi Dham",
    desc: "Holy shrine of Goddess Ganga & pristine Harsil Valley",
    slug: "gangotri-dham",
    type: "destination",
    badge: "Ganga Origin",
  },
  {
    title: "Valley of Flowers & Hemkund",
    desc: "UNESCO alpine bloom & sacred high lake at 15,200 ft",
    slug: "valley-of-flowers",
    type: "destination",
    badge: "Monsoon Special",
  },
  {
    title: "Darma Valley & Panchachuli",
    desc: "Untouched tribal villages & 5 snow peaks",
    slug: "darma-valley",
    type: "destination",
  },
  {
    title: "Khaliya Top & Munsiyari",
    desc: "Alpine meadows & 360° Panchachuli Zero Point (11,500 ft)",
    slug: "khaliya-top",
    type: "destination",
    badge: "Zero Point",
  },
  {
    title: "Complete Kumaon Darshan",
    desc: "Kainchi Dham, Jageshwar, Golu Devta & Patal Bhuvaneshwar",
    slug: "kumaon-darshan",
    type: "destination",
    badge: "Complete Tour",
  },
  {
    title: "Munsiyari & Khaliya Bugyal",
    desc: "Little Kashmir & ancient Indo-Tibet route",
    slug: "munsyari",
    type: "destination",
  },
  {
    title: "Chitai Golu Devta Mandir",
    desc: "God of Justice & 10,000 Holy Brass Bells",
    slug: "chitai-golu-devta",
    type: "destination",
    badge: "Sacred Shrine",
  },
  {
    title: "Jageshwar Dham Jyotirlinga",
    desc: "124 ancient stone temples in Deodar forest",
    slug: "jageshwar-dham",
    type: "destination",
    badge: "8th Jyotirlinga",
  },
  {
    title: "Patal Bhuvaneshwar Cave",
    desc: "Subterranean limestone cave with 33 crore deities",
    slug: "patal-bhuvaneshwar",
    type: "destination",
    badge: "Underground Cave",
  }
];

const PACKAGES_SHOWCASE: PackageShowcaseCard[] = [
  {
    title: "Spiti Valley & Chandratal Lake Grand Circuit",
    duration: "7D / 6N",
    price: "₹22,500",
    badge: "Himachal Must-Visit",
    destSlug: "spiti-valley",
    category: "himachal",
    image: "/images/destinations/spiti-valley.webp",
    highlights: ["1000-Yr Key Gompa & Tabo", "Moon Lake Chandratal Camp", "World's Highest Post Office Hikkim"],
    type: "destination",
  },
  {
    title: "Manali, Solang Valley & Atal Tunnel",
    duration: "5D / 4N",
    price: "₹14,500",
    badge: "Snow & Adventure",
    destSlug: "manali-solang-lahaul",
    category: "himachal",
    image: "/images/destinations/manali-snowfall.webp",
    highlights: ["Atal Tunnel Engineering Marvel", "Solang Valley Paragliding", "Hadimba Temple & Vashisht Baths"],
    type: "destination",
  },
  {
    title: "Shimla, Kufri & Chail Queen of Hills",
    duration: "4D / 3N",
    price: "₹12,500",
    badge: "Colonial Heritage",
    destSlug: "shimla-kufri-chail",
    category: "himachal",
    image: "/images/destinations/shimla-kufri-chail.webp",
    highlights: ["Mall Road & Christ Church", "Jakhoo 108ft Hanuman Temple", "Hatu Peak 360° Panorama"],
    type: "destination",
  },
  {
    title: "Dharamshala, McLeodGanj & Triund Trek",
    duration: "5D / 4N",
    price: "₹13,800",
    badge: "Little Lhasa",
    destSlug: "dharamshala-mcleodganj",
    category: "himachal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    highlights: ["Dalai Lama Main Temple Complex", "Triund Snow Wall Trek (9,350 ft)", "Bhagsunag Waterfall & Shiva Cafe"],
    type: "destination",
  },
  {
    title: "Kasol, Manikaran Sahib & Jibhi Valley",
    duration: "5D / 4N",
    price: "₹14,200",
    badge: "Parvati & Tirthan",
    destSlug: "kasol-manikaran-jibhi",
    category: "himachal",
    image: "/images/memories/manikaran",
    highlights: ["Manikaran Hot Springs & Langar", "Tosh Traditional Wooden Village", "Jibhi Waterfall & Serolsar Lake"],
    type: "destination",
  },
  {
    title: "Kinnaur Valley, Kalpa, Sangla & Chitkul",
    duration: "6D / 5N",
    price: "₹19,800",
    badge: "Last Indian Village",
    destSlug: "kinnaur-kalpa-sangla",
    category: "himachal",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=600&q=80",
    highlights: ["Chitkul Indo-Tibet Border Village", "Kinner Kailash Sacred Rock View", "Sangla Baspa River Green Meadows"],
    type: "destination",
  },
  {
    title: "Dalhousie, Khajjiar & Bir Billing Paragliding",
    duration: "5D / 4N",
    price: "₹16,500",
    badge: "Mini Switzerland & Paragliding",
    destSlug: "dalhousie-khajjiar-bir",
    category: "himachal",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    highlights: ["Khajjiar Alpine Cedar Meadows", "Bir Billing World #2 Paragliding", "Dainkund Peak 360° View & Baijnath"],
    type: "destination",
  },
  {
    title: "Do Dham: Kedarnath & Badrinath Yatra",
    duration: "6D / 5N",
    price: "₹22,500",
    badge: "Popular Do Dham",
    destSlug: "do-dham-kedarnath-badrinath",
    category: "dodham",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    highlights: ["Kedarnath Night Stay", "Badrinath Swarna Aarti", "Mana Village & Saraswati River"],
    type: "destination",
  },
  {
    title: "Kedarnath & Badrinath VIP Helicopter Do Dham",
    duration: "4D / 3N",
    price: "₹95,000",
    badge: "VIP Heli Shuttle",
    destSlug: "do-dham-kedarnath-badrinath",
    category: "dodham",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=600&q=80",
    highlights: ["Direct Helipad Priority Darshan", "VIP Temple Fast-Track Pass", "4-Star Mountain Stays"],
    type: "destination",
  },
  {
    title: "Yamunotri & Gangotri Sacred River Do Dham",
    duration: "5D / 4N",
    price: "₹16,500",
    badge: "Holy River Sources",
    destSlug: "yamunotri-dham",
    category: "dodham",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80",
    highlights: ["Surya Kund Thermal Spring Dip", "Gangotri Aarti", "Harsil Valley Apple Stays"],
    type: "destination",
  },
  {
    title: "Char Dham Grand Circuit 2027",
    duration: "10D / 9N",
    price: "₹32,000",
    badge: "All 4 Dhams",
    destSlug: "chardham-yatra",
    category: "chardham",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    highlights: ["Yamunotri & Gangotri Darshan", "Kedarnath Jyotirlinga Trek", "Badrinath Temple Swarna Aarti"],
    type: "destination",
  },
  {
    title: "Char Dham VIP Helicopter (All 4 Shrines)",
    duration: "5D / 4N",
    price: "₹1,95,000",
    badge: "5-Star Heli Tour",
    destSlug: "chardham-yatra",
    category: "chardham",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=600&q=80",
    highlights: ["Sahastradhara Helipad Direct", "VIP Darshan Passes", "Luxury 5-Star Accommodations"],
    type: "destination",
  },
  {
    title: "Adi Kailash Standard (4x4 Bolero)",
    duration: "5D / 4N",
    price: "₹28,000",
    badge: "Most Popular",
    destSlug: "adi-kailash",
    packageSlug: "adi-kailash-yatra-standard",
    category: "adi-kailash",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    highlights: ["4x4 Bolero Fleet", "SDM Permits in 48h", "Homestay & Sattvik Meals"],
    type: "package",
  },
  {
    title: "Premium Spiritual Expedition",
    duration: "7D / 6N",
    price: "₹45,000",
    badge: "VIP Comfort",
    destSlug: "adi-kailash",
    packageSlug: "adi-kailash-spiritual-expedition-premium",
    category: "adi-kailash",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    highlights: ["Luxury Isuzu 4x4", "Private Cottages Nabi", "Medical Oxygen Backup"],
    type: "package",
  },
  {
    title: "VIP Helicopter Darshan",
    duration: "3D / 2N",
    price: "₹1,20,000",
    badge: "Aerial Flight",
    destSlug: "adi-kailash",
    packageSlug: "adi-kailash-vip-luxury-helicopter",
    category: "adi-kailash",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    highlights: ["Pithoragarh Helipad", "Gunji Direct Fly", "Senior Devotee Friendly"],
    type: "package",
  },
  {
    title: "Kailash Mansarovar (Old Lipulekh)",
    duration: "7D / 6N",
    price: "₹42,000",
    badge: "No China Visa",
    destSlug: "kailash-mansarovar",
    category: "mansarovar",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    highlights: ["Direct Peak Darshan", "Om Parvat Included", "100% Indian Territory"],
    type: "destination",
  },
  {
    title: "Valley of Flowers & Hemkund Trek",
    duration: "6D / 5N",
    price: "₹18,500",
    badge: "UNESCO Heritage",
    destSlug: "valley-of-flowers",
    category: "flowers",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    highlights: ["500+ Alpine Flowers", "Holy Hemkund Sahib", "Govindghat Logistics"],
    type: "destination",
  },
  {
    title: "Adi Kailash from Delhi Direct",
    duration: "7D / 6N",
    price: "₹34,000",
    badge: "Delhi Pickup",
    destSlug: "adi-kailash-from-delhi",
    category: "adi-kailash",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80",
    highlights: ["AC Pushback Transit", "Kathgodam Escort", "All Meals & Permits"],
    type: "destination",
  },
  {
    title: "Adi Kailash from Haldwani",
    duration: "6D / 5N",
    price: "₹29,500",
    badge: "Train Connect",
    destSlug: "adi-kailash-yatra-from-haldwani",
    category: "adi-kailash",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    highlights: ["Kathgodam Railway Join", "Direct 4x4 Transfer", "Local Kumaoni Host"],
    type: "destination",
  }
];

const GUIDE_ITEMS: DropdownItem[] = [
  {
    title: "Adi Kailash Complete Guide 2027",
    desc: "Route maps, best seasons, permits & costs",
    slug: "adi-kailash-complete-guide-2027",
    type: "blog",
    badge: "Comprehensive",
  },
  {
    title: "Inner Line Permit (ILP) Rules",
    desc: "Step-by-step SDM Dharchula permit liaison",
    slug: "inner-line-permit-rules",
    type: "blog",
    badge: "Essential",
  },
  {
    title: "Medical Fitness Checklist & Pass",
    desc: "Interactive self-check, tick required options & get clearance pass",
    slug: "medical-fitness",
    type: "medical-fitness",
    badge: "Instant Pass",
  },
  {
    title: "High Altitude Medical Fitness",
    desc: "Medical fitness pass and clearance certificates",
    slug: "high-altitude-medical-oxygen-safety-guide",
    type: "blog",
    badge: "Fitness Pass",
  },
  {
    title: "Nabi & Gunji Homestays Guide",
    desc: "Warm wooden cottages, sattvik food & facilities",
    slug: "gunji-nabhi-jolingkong-homestays",
    type: "seo",
    badge: "Stays",
  },
  {
    title: "Flights to Pithoragarh (DEL & DED)",
    desc: "Alliance Air 42-seater schedules, timings & airport guide",
    slug: "pithoragarh-flights",
    type: "flights",
    badge: "Direct Flights",
  },
  {
    title: "Pithoragarh Helicopter Services",
    desc: "Heli schedules, helipads & booking slots",
    slug: "pithoragarh-helicopter-services",
    type: "seo",
  },
  {
    title: "What to Wear & Packing List",
    desc: "Thermal layering, shoes, gloves & gear checklist",
    slug: "clothing-guide",
    type: "clothing",
    badge: "Packing",
  },
  {
    title: "View All Himalayan Articles",
    desc: "Travel stories, temple histories & tips",
    slug: "all",
    type: "blog-all",
  }
];

const ABOUT_ITEMS: DropdownItem[] = [
  {
    title: "About GoTrek Travels",
    desc: "Native Kumaoni pilgrimage operators since 2010",
    slug: "about-us",
    type: "about",
    badge: "Registered",
  },
  {
    title: "Meet Our Team & Sherpas",
    desc: "Local mountain captains, coordinators & guides",
    slug: "team",
    type: "team",
    badge: "Native Guides",
  },
  {
    title: "Careers with GoTrek",
    desc: "Join our high-altitude Himalayan operations",
    slug: "careers",
    type: "careers",
  },
  {
    title: "B2B Agent Partner Desk",
    desc: "Wholesale allocations for travel agencies",
    slug: "b2b-travel-agent-partner-desk",
    type: "seo",
    badge: "B2B Portal",
  },
  {
    title: "Yatra Reels & Real Darshan",
    desc: "Watch high-altitude vertical video reels & drone shots",
    slug: "reels",
    type: "reels",
  },
  {
    title: "Sacred Memories & Photo Gallery",
    desc: "HD photographic archive & high-altitude moments",
    slug: "memories",
    type: "memories",
  }
];

const TICKER_TEXT: Record<Language, {
  regPrefix: string;
  offer: string;
  permit: string;
  fleet: string;
  itbp: string;
}> = {
  en: {
    regPrefix: 'Govt Registered:',
    offer: 'Special 2027 Yatra Bookings Open! Seats limited',
    permit: 'Inner Line Permits Issued via SDM Dharchula in 48 Hrs',
    fleet: '4x4 SUV Fleet & Local Kumaoni Escort Guaranteed',
    itbp: 'ITBP Route Cleared',
  },
  hi: {
    regPrefix: 'केएमवीएन व सरकार पंजीकृत:',
    offer: '2027 यात्रा बुकिंग खुली! सीटें सीमित हैं',
    permit: 'उप-जिलाधिकारी धारचूला द्वारा 48 घंटे में इनर लाइन परमिट जारी',
    fleet: '4x4 बोलेरो/स्कॉर्पियो गाड़ियां व स्थानीय सुरक्षा व्यवस्था',
    itbp: 'ITBP क्लीयरेंस सक्रिय',
  },
  gu: {
    regPrefix: 'સરકાર નોંધાયેલ:',
    offer: '2027 યાત્રા બુકિંગ શરૂ! સીટો મર્યાદિત છે',
    permit: 'ધારચૂલા એસડીએમ દ્વારા 48 કલાકમાં ઇનર લાઇન પરમિટ મંજૂર',
    fleet: '4x4 બોલેરો કાફલો અને સ્થાનિક કુમાઉની ગાઇડ સુવિધા',
    itbp: 'ITBP સુરક્ષા મંજૂર',
  },
  mr: {
    regPrefix: 'शासन नोंदणीकृत:',
    offer: '२०२७ यात्रा बुकिंग सुरू! जागा मर्यादित',
    permit: 'धारचुला एसडीएम कडून ४८ तासांत इनर लाईन परमिट मंजुरी',
    fleet: '४x४ वाहने आणि स्थानिक कुमाऊंनी मार्गदर्शक उपलब्ध',
    itbp: 'ITBP मार्ग सुरक्षित',
  },
  bn: {
    regPrefix: 'সরকারি নিবন্ধিত:',
    offer: '২০২৭ যাত্রা বুকিং শুরু! আসন সীমিত',
    permit: 'ধারচুলা এসডিএম মারফত ৪৮ ঘণ্টায় ইনার লাইন পারমিট মঞ্জুর',
    fleet: '৪x৪ বোলেরো গাড়ি ও স্থানীয় কুমায়ুনি গাইড পরিষেবা',
    itbp: 'ITBP রুট ক্লিয়ার',
  },
};

export const Navbar = memo(function Navbar({
  onOpenInquiry,
  onOpenAiConsultant,
  onToggleCrm,
  isCrmActive,
  currentUser,
  onOpenUserAuth,
  onLogoutUser,
  onOpenClothingGuide,
  onSelectDestination,
  onSelectBlog,
  onSelectPackage,
  onSelectSeoPage,
  onOpenTeamPage,
  onOpenCareersPage,
  onOpenAboutUsPage,
  onOpenReelsPage,
  onOpenMemoriesPage,
  onSelectPithoragarhFlights,
  onOpenMedicalFitness,
  onGoHome,
  onOpenSearch,
  activePage,
}: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>("packages");
  const [activePackageFilter, setActivePackageFilter] = useState<'all' | 'adi-kailash' | 'dodham' | 'chardham' | 'mansarovar' | 'flowers' | 'himachal'>('all');

  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const packagesSliderRef = useRef<HTMLDivElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);

  // Scroll state for secondary category navigation bar
  const [canScrollCatLeft, setCanScrollCatLeft] = useState(false);
  const [canScrollCatRight, setCanScrollCatRight] = useState(false);
  const [isCatDragging, setIsCatDragging] = useState(false);
  const [catStartX, setCatStartX] = useState(0);
  const [catScrollLeft, setCatScrollLeft] = useState(0);

  // Mouse Drag state for packages showcase slider
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const ticker = TICKER_TEXT[language] || TICKER_TEXT.en;

  const checkCategoryNavScroll = useCallback(() => {
    if (!categoryNavRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryNavRef.current;
    setCanScrollCatLeft(scrollLeft > 6);
    setCanScrollCatRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = categoryNavRef.current;
    if (!el) return;
    checkCategoryNavScroll();
    el.addEventListener('scroll', checkCategoryNavScroll, { passive: true });
    window.addEventListener('resize', checkCategoryNavScroll);
    return () => {
      el.removeEventListener('scroll', checkCategoryNavScroll);
      window.removeEventListener('resize', checkCategoryNavScroll);
    };
  }, [checkCategoryNavScroll]);

  // Global keyboard shortcut to open instant search: Cmd+K, Ctrl+K or '/'
  useEffect(() => {
    const handleGlobalSearchKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onOpenSearch) onOpenSearch();
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        if (onOpenSearch) onOpenSearch();
      }
    };

    window.addEventListener('keydown', handleGlobalSearchKey);
    return () => window.removeEventListener('keydown', handleGlobalSearchKey);
  }, [onOpenSearch]);

  const scrollCategoryNav = (direction: 'left' | 'right') => {
    if (!categoryNavRef.current) return;
    const offset = direction === 'left' ? -280 : 280;
    categoryNavRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleCategoryWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!categoryNavRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      categoryNavRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleCatMouseDown = (e: React.MouseEvent) => {
    if (!categoryNavRef.current) return;
    setIsCatDragging(true);
    setCatStartX(e.pageX - categoryNavRef.current.offsetLeft);
    setCatScrollLeft(categoryNavRef.current.scrollLeft);
  };

  const handleCatMouseMove = (e: React.MouseEvent) => {
    if (!isCatDragging || !categoryNavRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryNavRef.current.offsetLeft;
    const walk = (x - catStartX) * 1.5;
    categoryNavRef.current.scrollLeft = catScrollLeft - walk;
  };

  const handleCatMouseUp = () => {
    setIsCatDragging(false);
  };

  useEffect(() => {
    let ticking = false;
    let lastScrolled = window.scrollY > 30;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nowScrolled = window.scrollY > 30;
          if (nowScrolled !== lastScrolled) {
            lastScrolled = nowScrolled;
            setScrolled(nowScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on outside click and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(key);

    // Speculative instant prefetch on hover: loads chunk before user clicks
    if (key === "destinations") {
      prefetchComponent(() => import("./DestinationDetailPage"), "DestinationDetailPage", true);
    } else if (key === "packages") {
      prefetchComponent(() => import("./PackageDetailPage"), "PackageDetailPage", true);
      prefetchComponent(() => import("./InquiryModal"), "InquiryModal", true);
    } else if (key === "guides") {
      prefetchComponent(() => import("./WhatToWearPage"), "WhatToWearPage", true);
      prefetchComponent(() => import("./MedicalFitnessPage"), "MedicalFitnessPage", true);
      prefetchComponent(() => import("./PithoragarhFlightsPage"), "PithoragarhFlightsPage", true);
    } else if (key === "about") {
      prefetchComponent(() => import("./AboutUsPage"), "AboutUsPage", true);
      prefetchComponent(() => import("./TeamPage"), "TeamPage", true);
      prefetchComponent(() => import("./CareersPage"), "CareersPage", true);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown(prev => (prev === key ? null : key));
  };

  const handleItemClick = (item: DropdownItem) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (item.type === 'destination') {
      if (onSelectDestination) onSelectDestination(item.slug);
    } else if (item.type === 'package') {
      if (onSelectPackage) onSelectPackage(item.slug);
    } else if (item.type === 'seo') {
      if (onSelectSeoPage) onSelectSeoPage(item.slug);
    } else if (item.type === 'blog') {
      if (onSelectBlog) onSelectBlog(item.slug);
    } else if (item.type === 'blog-all') {
      if (onSelectBlog) onSelectBlog('all');
    } else if (item.type === 'clothing') {
      if (onOpenClothingGuide) onOpenClothingGuide();
    } else if (item.type === 'medical-fitness') {
      if (onOpenMedicalFitness) onOpenMedicalFitness();
    } else if (item.type === 'about') {
      if (onOpenAboutUsPage) onOpenAboutUsPage();
    } else if (item.type === 'team') {
      if (onOpenTeamPage) onOpenTeamPage();
    } else if (item.type === 'careers') {
      if (onOpenCareersPage) onOpenCareersPage();
    } else if (item.type === 'reels') {
      if (onOpenReelsPage) onOpenReelsPage();
    } else if (item.type === 'memories') {
      if (onOpenMemoriesPage) onOpenMemoriesPage();
    } else if (item.type === 'flights') {
      if (onSelectPithoragarhFlights) onSelectPithoragarhFlights();
    }
  };

  const handlePackageCardClick = (card: PackageShowcaseCard) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (card.type === 'package' && card.packageSlug) {
      if (onSelectPackage) onSelectPackage(card.packageSlug);
    } else {
      if (onSelectDestination) onSelectDestination(card.destSlug);
    }
  };

  const scrollPackagesSlider = (direction: 'left' | 'right') => {
    if (!packagesSliderRef.current) return;
    const offset = direction === 'left' ? -340 : 340;
    packagesSliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!packagesSliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - packagesSliderRef.current.offsetLeft);
    setScrollLeftPos(packagesSliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !packagesSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - packagesSliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    packagesSliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMobileSection = (key: string) => {
    setExpandedMobileSection(expandedMobileSection === key ? null : key);
  };

  // Filtered packages
  const filteredPackages = PACKAGES_SHOWCASE.filter(pkg => 
    activePackageFilter === 'all' ? true : pkg.category === activePackageFilter
  );

  // 1. Enhanced Clean Light Destinations Mega Menu
  const renderDestinationsMegaMenu = () => {
    if (activeDropdown !== "destinations") return null;

    const himachalCircuits = DESTINATION_ITEMS.filter(i => 
      ['spiti-valley', 'manali-solang-lahaul', 'shimla-kufri-chail', 'dharamshala-mcleodganj', 'kasol-manikaran-jibhi', 'kinnaur-kalpa-sangla', 'dalhousie-khajjiar-bir'].includes(i.slug)
    );
    const kailashCircuits = DESTINATION_ITEMS.filter(i => 
      ['adi-kailash', 'kailash-mansarovar', 'darma-valley', 'khaliya-top', 'munsyari'].includes(i.slug)
    );
    const chardhamCircuits = DESTINATION_ITEMS.filter(i => 
      ['do-dham-kedarnath-badrinath', 'chardham-yatra', 'yamunotri-dham', 'kedarnath-dham', 'badrinath-dham', 'gangotri-dham', 'valley-of-flowers'].includes(i.slug)
    );
    const ancientMandirs = DESTINATION_ITEMS.filter(i => 
      ['kumaon-darshan', 'jageshwar-dham', 'patal-bhuvaneshwar', 'chitai-golu-devta'].includes(i.slug)
    );

    return (
      <AnimatePresence>
        <motion.div
          key="destinations-dropdown"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => handleMouseEnter("destinations")}
          onMouseLeave={handleMouseLeave}
          className="fixed top-[84px] sm:top-[92px] left-2 right-2 sm:left-4 sm:right-auto lg:left-8 mt-2 w-auto sm:w-[680px] lg:w-[1080px] max-w-[calc(100vw-16px)] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl bg-white border border-amber-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-3.5 sm:p-5 z-[400] text-slate-800 ring-1 ring-black/5 overscroll-contain smooth-scroll-y"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 sm:mb-4 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[#C91D24] shrink-0">
                <Mountain size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 truncate">Himalayan Circuits, Himachal & Sacred Dhams</h4>
                <p className="text-[10px] text-slate-500 truncate hidden sm:block">Uttarakhand Tourism Reg: UTTR/PITHORAGARH/04-2026/450066 • Himachal Operations Active</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                SDM Permits & Fast Passes
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(null);
                }}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Column 1: Himachal Pradesh Trips */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#C91D24] px-2 pb-1 border-b border-slate-100 sm:border-transparent">
                <Compass size={12} className="text-[#C91D24]" />
                <span>Himachal Pradesh Trips</span>
              </div>
              {himachalCircuits.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex flex-col group cursor-pointer border border-transparent hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-700 line-clamp-1 mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Column 2: Kailash & Border Circuits */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#C91D24] px-2 pb-1 border-b border-slate-100 sm:border-transparent">
                <span>ॐ</span>
                <span>Kailash & Border Yatras</span>
              </div>
              {kailashCircuits.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex flex-col group cursor-pointer border border-transparent hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-700 line-clamp-1 mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Column 3: Char Dham & Alpine Treks */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#C91D24] px-2 pb-1 border-b border-slate-100 sm:border-transparent">
                <Flower2 size={12} className="text-[#C91D24]" />
                <span>Char Dham & Treks</span>
              </div>
              {chardhamCircuits.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex flex-col group cursor-pointer border border-transparent hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-700 line-clamp-1 mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Column 4: Ancient Mandirs & Highlight Banner */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#C91D24] px-2 pb-1 border-b border-slate-100 sm:border-transparent">
                <Landmark size={12} className="text-[#C91D24]" />
                <span>Ancient Kumaon Shrines</span>
              </div>
              {ancientMandirs.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex flex-col group cursor-pointer border border-transparent hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-700 line-clamp-1 mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </button>
              ))}

              {/* Side CTA Card */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-[11px] space-y-2 mt-2">
                <div className="font-extrabold text-[#C91D24] flex items-center justify-between">
                  <span>2027 Batch Allotment</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">ACTIVE</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-snug">
                  May, June, Sept & Oct departures filling. Reserve slots with 20% advance token.
                </p>
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenInquiry("2027 Pilgrimage Registration");
                  }}
                  className="w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Inquire Now</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // 2. Enhanced Clean Light Guides & Permits Dropdown
  const renderGuidesDropdown = () => {
    if (activeDropdown !== "guides") return null;

    return (
      <AnimatePresence>
        <motion.div
          key="guides-dropdown"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => handleMouseEnter("guides")}
          onMouseLeave={handleMouseLeave}
          className="fixed top-[84px] sm:top-[92px] left-2 right-2 sm:left-auto sm:right-28 lg:left-[460px] lg:right-auto mt-2 w-auto sm:w-[420px] max-w-[calc(100vw-16px)] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl bg-white border border-amber-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-3.5 z-[400] text-slate-800 ring-1 ring-black/5 overscroll-contain smooth-scroll-y"
        >
          <div className="flex items-center justify-between px-1 pb-2.5 mb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C91D24]">
              <BookOpen size={14} />
              <span>Yatra Guidelines & Policies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500 font-mono">SDM Dharchula</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(null);
                }}
                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {GUIDE_ITEMS.map((item, idx) => (
              <button
                key={`${item.slug}-${idx}`}
                onClick={() => handleItemClick(item)}
                className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-amber-300/40"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors flex items-center gap-1.5">
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-[10px] text-slate-500 group-hover:text-slate-700 truncate mt-0.5">
                      {item.desc}
                    </p>
                  )}
                </div>
                <ChevronRight size={13} className="text-slate-400 group-hover:text-[#C91D24] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // 3. Enhanced Clean Light About Us & Trust Dropdown
  const renderAboutDropdown = () => {
    if (activeDropdown !== "about") return null;

    return (
      <AnimatePresence>
        <motion.div
          key="about-dropdown"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={handleMouseLeave}
          className="fixed top-[84px] sm:top-[92px] left-2 right-2 sm:left-auto sm:right-12 lg:right-24 mt-2 w-auto sm:w-[340px] max-w-[calc(100vw-16px)] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl bg-white border border-amber-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-3.5 z-[400] text-slate-800 ring-1 ring-black/5 overscroll-contain smooth-scroll-y"
        >
          <div className="flex items-center justify-between px-1 pb-2.5 mb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C91D24]">
              <Users size={14} />
              <span>GoTrek Travels Heritage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-emerald-700 font-mono">Since 2010</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(null);
                }}
                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {ABOUT_ITEMS.map((item, idx) => (
              <button
                key={`${item.slug}-${idx}`}
                onClick={() => handleItemClick(item)}
                className="w-full text-left p-2 sm:p-2.5 rounded-xl hover:bg-amber-50/70 transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-amber-300/40"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors flex items-center gap-1.5">
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-[10px] text-slate-500 group-hover:text-slate-700 truncate mt-0.5">
                      {item.desc}
                    </p>
                  )}
                </div>
                <ChevronRight size={13} className="text-slate-400 group-hover:text-[#C91D24] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // 4. Render Clean Light Dropdown for Packages (No Grid / No Fullscreen Slider)
  const renderPackagesDropdown = () => {
    if (activeDropdown !== "packages") return null;

    return (
      <AnimatePresence>
        <motion.div
          key="packages-dropdown"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => handleMouseEnter("packages")}
          onMouseLeave={handleMouseLeave}
          className="fixed top-[84px] sm:top-[92px] left-2 right-2 sm:left-16 sm:right-auto lg:left-36 mt-2 w-auto sm:w-[660px] max-w-[calc(100vw-16px)] max-h-[82vh] overflow-y-auto rounded-2xl bg-white border border-amber-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-3.5 sm:p-4 z-[400] text-slate-800 ring-1 ring-black/5 no-scrollbar overscroll-contain smooth-scroll-y"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[#C91D24] shrink-0">
                <Package size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 truncate">
                  Sacred Yatra Packages (2027 Season)
                </h4>
                <p className="text-[10px] text-slate-500 truncate hidden sm:block">
                  Fixed Departure Batches • Native Mountain Captains & Permits
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                Direct Operator Rates
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(null);
                }}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Destination Filter Tabs (Normal Flow Row) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'himachal', label: 'Himachal Trips' },
              { id: 'dodham', label: 'Do Dham Packages' },
              { id: 'chardham', label: 'Char Dham Circuit' },
              { id: 'adi-kailash', label: 'Adi Kailash & Om' },
              { id: 'mansarovar', label: 'Mansarovar View' },
              { id: 'flowers', label: 'Valley of Flowers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePackageFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                  activePackageFilter === tab.id
                    ? 'bg-[#C91D24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Normal Flow Packages List */}
          <div className="space-y-2">
            {filteredPackages.map((pkg, idx) => (
              <div
                key={`${pkg.destSlug}-${idx}`}
                onClick={() => handlePackageCardClick(pkg)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/90 hover:border-amber-400/60 transition-all flex items-center justify-between gap-2.5 sm:gap-3 group cursor-pointer"
              >
                {/* Left Thumbnail + Info */}
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="relative w-14 h-13 sm:w-16 sm:h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-0.5 left-0.5 right-0.5 text-[8px] font-black bg-black/80 text-amber-300 text-center rounded-xs py-0.2">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors truncate">
                        {pkg.title}
                      </span>
                      {pkg.badge && (
                        <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      {pkg.highlights.slice(0, 2).map((hl, hIdx) => (
                        <span key={hIdx} className="flex items-center gap-1 truncate">
                          <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Price & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right min-w-[70px]">
                    <div className="text-xs font-black text-slate-900 font-mono">
                      {pkg.price}
                    </div>
                    <span className="text-[9px] text-slate-500">/ person</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(null);
                      onOpenInquiry(pkg.title);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-2 text-emerald-700 font-medium text-[10px] sm:text-xs">
              <ShieldCheck size={13} className="shrink-0 text-emerald-600" />
              <span className="truncate">100% Native Kumaoni Team • SDM Permits Guaranteed</span>
            </div>

            <button
              onClick={() => {
                setActiveDropdown(null);
                onOpenInquiry("Custom Yatra Itinerary 2027");
              }}
              className="text-[#C91D24] hover:text-red-800 font-bold flex items-center gap-0.5 cursor-pointer text-[10px] sm:text-[11px] shrink-0"
            >
              <span>Custom?</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <header
        ref={navRef}
      style={{ backgroundColor: scrolled ? "#8B0000" : "#C91D24" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-slate-100 ${
        scrolled
          ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] border-b border-amber-400/40 backdrop-blur-md"
          : "shadow-xl border-b border-amber-400/20 backdrop-blur-sm"
      }`}
    >
      {/* 1. Top Live Running Marquee Ticker */}
      <div 
        id="top-live-yatra-ticker"
        className="bg-[#7F1D1D] text-white text-[11px] sm:text-xs py-1.5 px-2 sm:px-4 shadow-inner overflow-hidden flex items-center justify-between border-b border-amber-400/30 select-none relative z-10"
      >
        {/* Left Live Badge */}
        <div className="flex items-center gap-1.5 shrink-0 pr-2.5 sm:pr-4 border-r border-red-800 mr-2 z-10 bg-[#7F1D1D]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
          </span>
          <span className="font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300 whitespace-nowrap">
            LIVE 2027 DESK
          </span>
        </div>

        {/* Continuous Infinite Scrolling Ticker Track */}
        <div className="flex-1 overflow-hidden whitespace-nowrap relative mask-marquee">
          <div className="animate-ticker-marquee flex items-center">
            {/* Primary Track Items */}
            <div className="flex items-center gap-6 pr-6">
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
                <span>🕉️</span>
                <span>2027 Yatra Bookings Active:</span>
                <span className="text-white font-normal">May, June, Sept & Oct batches filling fast — reserve with 20% advance token</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <ShieldCheck size={13} className="text-amber-300 inline shrink-0" />
                <span>Inner Line Permits (ILP):</span>
                <span className="text-white font-normal">100% SDM Dharchula official permit liaison within 48 hours</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <Mountain size={13} className="text-amber-300 inline shrink-0" />
                <span>Kailash Mansarovar View:</span>
                <span className="text-white font-normal">Direct sacred darshan from Old Lipulekh Pass (100% Indian Territory • Zero China Visa required)</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <span>🚙</span>
                <span>Fleet & Mountain Safety:</span>
                <span className="text-white font-normal">Dedicated 4x4 Bolero/Scorpio fleet • Certified native Kumaoni guides • Medical Oxygen cylinders on board</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <Landmark size={13} className="text-amber-300 inline shrink-0" />
                <span>Sacred Shrines En Route:</span>
                <span className="text-white font-normal">Special darshan stopovers at Kainchi Dham, Chitai Golu Devta, Jageshwar Dham & Patal Bhuvaneshwar</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <button
                type="button"
                onClick={() => onSelectPithoragarhFlights && onSelectPithoragarhFlights()}
                className="inline-flex items-center gap-1.5 font-bold text-amber-200 hover:text-amber-100 hover:underline cursor-pointer"
              >
                <span>✈️</span>
                <span>Direct Flights to Pithoragarh:</span>
                <span className="text-white font-normal">Delhi (80m) & Dehradun (45m) Alliance Air flights to NGH • Full timetable & airport pickups</span>
              </button>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <span>🚁</span>
                <span>Helicopter Transit:</span>
                <span className="text-white font-normal">Pithoragarh to Gunji helicopter shuttle booking coordination available</span>
              </span>
            </div>

            {/* Seamless Duplicate Track for Continuous Loop */}
            <div className="flex items-center gap-6 pr-6" aria-hidden="true">
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
                <span>🕉️</span>
                <span>2027 Yatra Bookings Active:</span>
                <span className="text-white font-normal">May, June, Sept & Oct batches filling fast — reserve with 20% advance token</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <button
                type="button"
                onClick={() => onSelectPithoragarhFlights && onSelectPithoragarhFlights()}
                className="inline-flex items-center gap-1.5 font-bold text-amber-200 hover:text-amber-100 hover:underline cursor-pointer"
              >
                <span>✈️</span>
                <span>Direct Flights to Pithoragarh:</span>
                <span className="text-white font-normal">Delhi (80m) & Dehradun (45m) Alliance Air flights to NGH • Full timetable & airport pickups</span>
              </button>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <ShieldCheck size={13} className="text-amber-300 inline shrink-0" />
                <span>Inner Line Permits (ILP):</span>
                <span className="text-white font-normal">100% SDM Dharchula official permit liaison within 48 hours</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <Mountain size={13} className="text-amber-300 inline shrink-0" />
                <span>Kailash Mansarovar View:</span>
                <span className="text-white font-normal">Direct sacred darshan from Old Lipulekh Pass (100% Indian Territory • Zero China Visa required)</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <span>🚙</span>
                <span>Fleet & Mountain Safety:</span>
                <span className="text-white font-normal">Dedicated 4x4 Bolero/Scorpio fleet • Certified native Kumaoni guides • Medical Oxygen cylinders on board</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <Landmark size={13} className="text-amber-300 inline shrink-0" />
                <span>Sacred Shrines En Route:</span>
                <span className="text-white font-normal">Special darshan stopovers at Kainchi Dham, Chitai Golu Devta, Jageshwar Dham & Patal Bhuvaneshwar</span>
              </span>

              <span className="text-amber-300/80 text-xs font-bold">•</span>

              <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
                <span>🚁</span>
                <span>Helicopter Transit:</span>
                <span className="text-white font-normal">Pithoragarh to Gunji helicopter shuttle booking coordination available</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Contact Quick Access */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2 sm:pl-3 border-l border-red-800 ml-2 z-10 bg-[#7F1D1D]">
          <a
            href="tel:+917248285767"
            className="hover:text-amber-300 flex items-center gap-1 font-bold text-white transition-colors cursor-pointer"
            title="Call 24x7 Dharchula Yatra Helpline"
          >
            <Phone size={11} className="text-amber-400 shrink-0" />
            <span className="hidden md:inline font-mono text-[11px]">+91 72482 85767</span>
            <span className="md:hidden font-mono text-[10px]">Call Help</span>
          </a>
          <button
            onClick={() => onOpenInquiry("2027 Live Yatra Registration")}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400 hover:bg-amber-500 text-slate-950 text-[10px] font-black cursor-pointer transition-all shadow-xs"
          >
            <span>Book 2027</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* 2. Main Red Navigation Bar */}
      <div className="bg-[#C91D24] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            
            {/* Left: Brand Logo & Title (+ Mobile Menu Toggle on Mobile/Tablet) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 rounded-lg hover:bg-white/15 flex items-center justify-center text-white cursor-pointer transition-colors shrink-0"
                aria-label="Toggle navigation menu"
              >
                <Menu size={22} className="text-white" />
              </button>

              <div
                onClick={() => {
                  if (onGoHome) onGoHome();
                }}
                className="flex items-center gap-2 cursor-pointer group shrink-0"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* Official Brand Logo Emblem */}
                  <GoTrekLogo className="w-9 h-9 sm:w-10 sm:h-10 ring-2 ring-amber-400/90 shadow-md transition-transform group-hover:scale-105 shrink-0" />
                  
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="text-lg sm:text-xl font-black text-white tracking-tight uppercase">
                        GoTrek
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase">
                        TRAVELS
                      </span>
                    </div>
                    <span className="text-[8px] sm:text-[8.5px] text-amber-200/95 font-bold tracking-wider leading-none uppercase mt-1 whitespace-nowrap">
                      OFFICIAL ADI KAILASH &amp; OM PARVAT YATRA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Search, Heart Wishlist, Cart & Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Quick Search Trigger Pill for Tablet & Desktop */}
              <button
                onClick={() => {
                  if (onOpenSearch) {
                    onOpenSearch();
                  } else {
                    const elem = document.getElementById("packages") || document.getElementById("hero");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 hover:border-amber-300/50 text-slate-200 hover:text-white transition-all cursor-pointer shadow-inner text-xs group"
                title="Search Yatras & Permits (Ctrl + K or /)"
              >
                <Search size={14} className="text-amber-300 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium text-white/90">Search yatras...</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/15 text-amber-200 border border-white/10 font-bold ml-0.5">
                  ⌘K
                </span>
              </button>

              {/* Search Icon Trigger for Mobile Screens */}
              <button
                onClick={() => {
                  if (onOpenSearch) {
                    onOpenSearch();
                  } else {
                    const elem = document.getElementById("packages") || document.getElementById("hero");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="md:hidden h-9 w-9 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Search Yatras & Permits"
                aria-label="Search Yatras"
              >
                <Search size={19} />
              </button>

              {/* Wishlist / Heart Button */}
              <button
                onClick={() => onOpenInquiry("Adi Kailash & Om Parvat 2027")}
                className="h-9 w-9 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Saved Yatras"
              >
                <Heart size={19} />
              </button>

              {/* Booking Bag / Cart Button with Badge */}
              <button
                onClick={() => onOpenInquiry("Adi Kailash Yatra 2027")}
                className="relative h-9 w-9 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Bookings & Cart"
              >
                <ShoppingBag size={19} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                  1
                </span>
              </button>

              {/* Language Selector */}
              <div className="relative hidden md:block" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="h-8 px-2.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 hover:border-amber-300/50 flex items-center gap-1.5 text-xs font-bold text-white transition-all cursor-pointer shadow-inner"
                  title="Select Language"
                >
                  <Globe size={13} className="text-amber-300 shrink-0" />
                  <span className="uppercase text-[11px] font-bold tracking-wider">{language}</span>
                  <ChevronDown size={11} className={`text-white/80 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white border border-amber-400/40 shadow-[0_20px_40px_rgba(0,0,0,0.2)] p-2 z-[300] space-y-1 text-slate-800 ring-1 ring-black/5"
                    >
                      <div className="text-[10px] font-black text-[#C91D24] px-2.5 py-1 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>Select Language</span>
                        <Globe size={11} className="text-[#C91D24]" />
                      </div>
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? "bg-amber-100 text-[#C91D24] font-bold border border-amber-300 shadow-xs"
                                : "text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="text-xs">{lang.nativeName}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-400 uppercase font-mono">{lang.code}</span>
                              {isSelected && <Check size={12} className="text-[#C91D24]" />}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Yatra CTA Button */}
              <button
                onClick={() => onOpenInquiry("Adi Kailash Yatra 2027")}
                className="hidden sm:flex h-8 px-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer items-center gap-1 shrink-0"
              >
                <span>Book 2027</span>
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* 3. Deep Maroon Secondary Horizontal Category Navigation Bar */}
      <div className="bg-[#A3161C] text-white border-t border-red-800/60 shadow-sm relative group/catnav">
        
        {/* Left Scroll Navigation Button (Desktop & Tablet) */}
        {canScrollCatLeft && (
          <button
            onClick={() => scrollCategoryNav('left')}
            className="absolute left-0 top-0 bottom-0 z-30 w-8 bg-gradient-to-r from-[#A3161C] via-[#A3161C]/95 to-transparent flex items-center justify-start pl-1 text-white hover:text-amber-300 transition-all cursor-pointer drop-shadow-md"
            aria-label="Scroll menu left"
            title="Scroll categories left"
          >
            <div className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center border border-white/20">
              <ChevronLeft size={14} className="text-amber-300 -translate-x-0.5" />
            </div>
          </button>
        )}

        {/* Right Scroll Navigation Button (Desktop & Tablet) */}
        {canScrollCatRight && (
          <button
            onClick={() => scrollCategoryNav('right')}
            className="absolute right-0 top-0 bottom-0 z-30 w-8 bg-gradient-to-l from-[#A3161C] via-[#A3161C]/95 to-transparent flex items-center justify-end pr-1 text-white hover:text-amber-300 transition-all cursor-pointer drop-shadow-md"
            aria-label="Scroll menu right"
            title="Scroll categories right"
          >
            <div className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center border border-white/20">
              <ChevronRight size={14} className="text-amber-300 translate-x-0.5" />
            </div>
          </button>
        )}

        {/* Scrollable Container */}
        <div 
          ref={categoryNavRef}
          onWheel={handleCategoryWheel}
          onMouseDown={handleCatMouseDown}
          onMouseMove={handleCatMouseMove}
          onMouseUp={handleCatMouseUp}
          onMouseLeave={handleCatMouseUp}
          className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 sm:gap-1.5 py-1.5 whitespace-nowrap text-xs font-bold overflow-x-auto no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing"
        >
          
          {/* Home */}
          <button
            onClick={() => {
              if (onGoHome) onGoHome();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer text-white flex items-center gap-1 shrink-0"
          >
            <Home size={13} className="text-amber-300" />
            <span>Home</span>
          </button>

          {/* Destinations Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => handleMouseEnter("destinations")}
              onClick={() => toggleDropdown("destinations")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold shrink-0 text-xs ${
                activeDropdown === "destinations" 
                  ? "bg-black/30 text-amber-300 shadow-inner border border-amber-400/40" 
                  : "text-white/95 hover:bg-white/15 hover:text-amber-200"
              }`}
            >
              <Mountain size={13} className="text-amber-300" />
              <span>Destinations</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "destinations" ? "rotate-180 text-amber-300" : "text-white/70"}`} />
            </button>
            {renderDestinationsMegaMenu()}
          </div>

          {/* Yatra Packages Dropdown (Normal Flow Dropdown) */}
          <div className="relative">
            <button
              onMouseEnter={() => handleMouseEnter("packages")}
              onClick={() => toggleDropdown("packages")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold shrink-0 text-xs ${
                activeDropdown === "packages" 
                  ? "bg-black/30 text-amber-300 shadow-inner border border-amber-400/40" 
                  : "text-white/95 hover:bg-white/15 hover:text-amber-200"
              }`}
            >
              <Package size={13} className="text-amber-300" />
              <span>Packages</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full shadow-xs">
                2027
              </span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "packages" ? "rotate-180 text-amber-300" : "text-white/70"}`} />
            </button>
            {renderPackagesDropdown()}
          </div>

          {/* Direct Quick Destination Links */}
          <button
            onClick={() => {
              if (onSelectDestination) onSelectDestination("kailash-mansarovar");
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white shrink-0"
          >
            Kailash Mansarovar
          </button>

          <button
            onClick={() => {
              if (onSelectDestination) onSelectDestination("adi-kailash");
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white shrink-0"
          >
            Adi Kailash
          </button>

          <button
            onClick={() => {
              if (onSelectDestination) onSelectDestination("chardham-yatra");
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white shrink-0"
          >
            Char Dham
          </button>

          <button
            onClick={() => {
              if (onSelectDestination) onSelectDestination("valley-of-flowers");
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white shrink-0"
          >
            Valley of Flowers
          </button>

          {/* Guides & Permits Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => handleMouseEnter("guides")}
              onClick={() => toggleDropdown("guides")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold shrink-0 text-xs ${
                activeDropdown === "guides" 
                  ? "bg-black/30 text-amber-300 shadow-inner border border-amber-400/40" 
                  : "text-white/95 hover:bg-white/15 hover:text-amber-200"
              }`}
            >
              <BookOpen size={13} className="text-amber-300" />
              <span>Guides & Permits</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "guides" ? "rotate-180 text-amber-300" : "text-white/70"}`} />
            </button>
            {renderGuidesDropdown()}
          </div>

          {/* What to Wear Modal Trigger */}
          <button
            onClick={() => {
              if (onOpenClothingGuide) onOpenClothingGuide();
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-amber-200 flex items-center gap-1 shrink-0"
            title="Interactive Layering & Packing Guide"
          >
            <Shirt size={13} className="text-amber-300" />
            <span>What to Wear</span>
          </button>

          {/* Medical Fitness Checklist & Clearance Pass */}
          <button
            onClick={() => {
              if (onOpenMedicalFitness) onOpenMedicalFitness();
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-amber-200 flex items-center gap-1.5 shrink-0"
            title="Interactive High Altitude Medical Fitness Checklist & Clearance Pass"
          >
            <HeartPulse size={13} className="text-amber-300 animate-pulse" />
            <span>Medical Fitness</span>
            <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded-full shadow-xs">
              Pass
            </span>
          </button>

          {/* Cost Calculator Link */}
          <a
            href="#calculator"
            onClick={(e) => {
              e.preventDefault();
              if (onGoHome) onGoHome();
              const elem = document.getElementById("calculator");
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white flex items-center gap-1 shrink-0"
          >
            <Calculator size={13} className="text-amber-300" />
            <span>Cost Calculator</span>
          </a>

          {/* Our Team Direct Link */}
          <button
            onClick={() => {
              if (onOpenTeamPage) onOpenTeamPage();
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white flex items-center gap-1 shrink-0"
            title="Meet Native Kumaoni Expedition Leads & Guides"
          >
            <Users size={13} className="text-amber-300" />
            <span>Our Team</span>
          </button>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => handleMouseEnter("about")}
              onClick={() => toggleDropdown("about")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold shrink-0 text-xs ${
                activeDropdown === "about" 
                  ? "bg-black/30 text-amber-300 shadow-inner border border-amber-400/40" 
                  : "text-white/95 hover:bg-white/15 hover:text-amber-200"
              }`}
            >
              <Users size={13} className="text-amber-300" />
              <span>About</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180 text-amber-300" : "text-white/70"}`} />
            </button>
            {renderAboutDropdown()}
          </div>

          {/* Reels Direct Page Link */}
          <button
            onClick={() => {
              if (onOpenReelsPage) onOpenReelsPage();
            }}
            className={`px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white flex items-center gap-1 shrink-0 ${
              activePage === 'reels' ? 'bg-black/30 text-amber-300 shadow-inner border border-amber-400/40 font-bold' : ''
            }`}
            title="Watch Sacred Yatra Reels & Darshan Videos"
          >
            <Film size={13} className="text-amber-300" />
            <span>Reels</span>
          </button>

          {/* Memories Direct Page Link */}
          <button
            onClick={() => {
              if (onOpenMemoriesPage) onOpenMemoriesPage();
            }}
            className={`px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:text-amber-200 transition-colors cursor-pointer text-white flex items-center gap-1 shrink-0 ${
              activePage === 'memories' ? 'bg-black/30 text-amber-300 shadow-inner border border-amber-400/40 font-bold' : ''
            }`}
            title="Sacred Photo Memories & High-Altitude Gallery"
          >
            <Camera size={13} className="text-amber-300" />
            <span>Memories</span>
          </button>

        </div>
      </div>
    </header>

    {/* Backdrop for active mega-menu / dropdown */}
    <AnimatePresence>
      {activeDropdown && (
        <motion.div
          key="dropdown-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setActiveDropdown(null)}
          className="fixed inset-0 z-40 bg-black/35"
        />
      )}
    </AnimatePresence>

    {/* 3. Mobile & Tablet Left Sliding Drawer Menu (Rendered outside header so it spans full 100vh) */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
          />

          {/* Left Sliding Drawer Content matching requested card design */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-[88vw] sm:w-[380px] max-w-[420px] h-[100dvh] shadow-2xl flex flex-col bg-[#F8F9FA] overflow-hidden text-slate-800 z-10 border-r border-slate-200"
          >
            {/* Top Drawer Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-start justify-between shrink-0 shadow-xs">
              <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onGoHome) onGoHome();
                }}
                className="cursor-pointer group flex items-center gap-3"
              >
                <GoTrekLogo className="w-11 h-11 ring-2 ring-amber-400/80 shadow-sm shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-xl sm:text-2xl font-black text-[#E8590C] tracking-tight uppercase">
                      GoTrek
                    </div>
                    <div className="text-[10px] font-black tracking-widest text-slate-800 uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200/60">
                      TRAVELS
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-snug">
                    Official Himalayan Yatra DMC
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors shadow-xs shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2.2} />
              </button>
            </div>

            {/* Scrollable Drawer Body with Clean Rounded Card Pills */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3">
              
              {/* Quick Search Bar inside Mobile Menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-400/40 text-left transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#E8590C] flex items-center justify-center shrink-0">
                    <Search size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Search Yatras & Permits</div>
                    <div className="text-[10px] text-slate-500">Adi Kailash, Om Parvat, Char Dham...</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shrink-0">
                  Search
                </span>
              </button>

              {/* 1. Home Card */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onGoHome) onGoHome();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#E8590C]/50 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-md text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <Home size={20} className="text-[#E03A3A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[15px] font-bold text-slate-900">Home</span>
                </div>
              </button>

              {/* 2. Himachal Pradesh Trips Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("himachal")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Compass size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">Himachal Pradesh Trips</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "himachal" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "himachal" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    {[
                      { title: "Spiti Valley & Chandratal", subtitle: "Key Gompa, Hikkim & Moon Lake", duration: "7D / 6N", price: "₹22,500", slug: "spiti-valley" },
                      { title: "Manali, Solang & Rohtang", subtitle: "Atal Tunnel & Hadimba Temple", duration: "5D / 4N", price: "₹14,500", slug: "manali-solang-lahaul" },
                      { title: "Shimla, Kufri & Chail", subtitle: "Queen of Hills & Jakhoo Temple", duration: "4D / 3N", price: "₹12,500", slug: "shimla-kufri-chail" },
                      { title: "Dharamshala & McLeodGanj", subtitle: "Dalai Lama Temple & Triund Trek", duration: "5D / 4N", price: "₹13,800", slug: "dharamshala-mcleodganj" },
                      { title: "Kasol, Manikaran & Jibhi", subtitle: "Parvati Valley & Serolsar Lake", duration: "5D / 4N", price: "₹14,200", slug: "kasol-manikaran-jibhi" },
                      { title: "Kinnaur, Kalpa & Chitkul", subtitle: "India's Last Village & Kinner Kailash", duration: "6D / 5N", price: "₹19,800", slug: "kinnaur-kalpa-sangla" },
                      { title: "Dalhousie & Bir Billing", subtitle: "Mini Switzerland & Paragliding", duration: "5D / 4N", price: "₹16,500", slug: "dalhousie-khajjiar-bir" },
                    ].map((hTrip) => (
                      <button
                        key={hTrip.slug}
                        onClick={() => handleItemClick({ title: hTrip.title, slug: hTrip.slug, type: "destination" })}
                        className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C] truncate">{hTrip.title}</div>
                          <div className="text-[10px] text-slate-500 truncate">{hTrip.subtitle} · {hTrip.duration}</div>
                        </div>
                        <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">{hTrip.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2.5 Chardham Yatra Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("chardham")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Landmark size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">Chardham Yatra</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "chardham" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "chardham" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Char Dham Grand Circuit 2027", slug: "chardham-yatra", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Char Dham Grand Circuit (10D / 9N)</div>
                        <div className="text-[10px] text-slate-500">Kedarnath, Badrinath, Gangotri & Yamunotri</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700 shrink-0">All 4 Dhams</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Kedarnath & Badrinath Do Dham", slug: "do-dham-kedarnath-badrinath", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Kedarnath & Badrinath (Do Dham)</div>
                        <div className="text-[10px] text-slate-500">Luxury road or charter helicopter option</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Popular</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Yamunotri & Gangotri Dham", slug: "yamunotri-dham", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Yamunotri & Gangotri Dham</div>
                        <div className="text-[10px] text-slate-500">Sacred origins of Ganga & Yamuna rivers</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 shrink-0">5D / 4N</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Inner Line Permit (ILP) Rules", slug: "inner-line-permit-rules", type: "blog" })}
                      className="w-full text-left p-2 rounded-lg text-slate-600 hover:text-[#E8590C] text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer px-2"
                    >
                      <span>Char Dham Biometric Registration Guide</span>
                      <ChevronRight size={13} className="text-slate-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Kailash Mansarovar Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("mansarovar")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Mountain size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">Kailash Mansarovar</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "mansarovar" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "mansarovar" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Kailash Mansarovar View", slug: "kailash-mansarovar", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Kailash Mansarovar (Old Lipulekh)</div>
                        <div className="text-[10px] text-slate-500">Direct peak darshan · 100% Indian Territory</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">No China Visa</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Pithoragarh Helicopter Services", slug: "pithoragarh-helicopter-services", type: "seo" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Aerial Kailash Mansarovar Darshan</div>
                        <div className="text-[10px] text-slate-500">Charter flight from Pithoragarh Naini-Saini</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 shrink-0">Scenic Heli</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Adi Kailash & Om Parvat", slug: "adi-kailash", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Mansarovar & Om Parvat Grand Darshan</div>
                        <div className="text-[10px] text-slate-500">Eternal snow Om, Parvati Sarovar & Gauri Kund</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Sacred ॐ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Adi Kailash Packages Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("adikailash")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Mountain size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">Adi Kailash Packages</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "adikailash" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "adikailash" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Adi Kailash Standard", slug: "adi-kailash-yatra-standard", type: "package" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Adi Kailash Standard (4x4 Bolero)</div>
                        <div className="text-[10px] text-slate-500">5D / 4N · Homestay, Sattvik Meals & SDM Permits</div>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">₹28,000</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Premium Spiritual Expedition", slug: "adi-kailash-spiritual-expedition-premium", type: "package" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Premium Spiritual Expedition (Luxury 4x4)</div>
                        <div className="text-[10px] text-slate-500">7D / 6N · Private Cottages & Oxygen Backup</div>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">₹45,000</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "VIP Helicopter Darshan", slug: "adi-kailash-vip-luxury-helicopter", type: "package" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">VIP Helicopter Darshan (3D / 2N)</div>
                        <div className="text-[10px] text-slate-500">Pithoragarh Helipad direct to Gunji</div>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">₹1,20,000</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Adi Kailash from Haldwani", slug: "adi-kailash-yatra-from-haldwani", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Adi Kailash from Kathgodam / Haldwani</div>
                        <div className="text-[10px] text-slate-500">6D / 5N · Train connection pickup</div>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">₹29,500</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Adi Kailash from Delhi", slug: "adi-kailash-from-delhi", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Adi Kailash Direct from Delhi (7D / 6N)</div>
                        <div className="text-[10px] text-slate-500">AC Pushback transit & complete escort</div>
                      </div>
                      <span className="text-[11px] font-mono font-black text-[#E8590C] shrink-0">₹34,000</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 5. NRI & Foreigners Packages Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("nri")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Globe size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">NRI & Foreigners Packages</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "nri" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "nri" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Inner Line Permit Rules", slug: "inner-line-permit-rules", type: "blog" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">NRI & OCI Inner Line Permit Protocols</div>
                        <div className="text-[10px] text-slate-500">SDM Dharchula & Ministry clearances handled</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Govt Liaison</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Premium Spiritual Expedition", slug: "adi-kailash-spiritual-expedition-premium", type: "package" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Private 4x4 Fleet & English Guide</div>
                        <div className="text-[10px] text-slate-500">Dedicated chauffeur & custom departure dates</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">VIP Comfort</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Medical Fitness Guide", slug: "medical-fitness-altitude-guide", type: "blog" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">High Altitude Medical & Oxygen Protocol</div>
                        <div className="text-[10px] text-slate-500">Continuous pulse oximetry, Gamow bag & MD on call</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 shrink-0">Safety</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Tour Packages Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("tours")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Globe size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">Tour Packages</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "tours" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "tours" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Valley of Flowers & Hemkund", slug: "valley-of-flowers", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Valley of Flowers & Hemkund Sahib</div>
                        <div className="text-[10px] text-slate-500">UNESCO alpine bloom & sacred high lake (6D/5N)</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Monsoon</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Darma Valley & Panchachuli", slug: "darma-valley", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Darma Valley & Panchachuli Peaks</div>
                        <div className="text-[10px] text-slate-500">Tribal Rung culture & 5 snow peaks</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 shrink-0">Unexplored</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Khaliya Top & Munsiyari", slug: "khaliya-top", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Khaliya Top & Zero Point Summit (12,200 ft)</div>
                        <div className="text-[10px] text-slate-500">Alpine meadows & 360° Panchachuli panorama (4D/3N)</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Zero Point</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Complete Kumaon Darshan", slug: "kumaon-darshan", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Complete Kumaon Darshan Circuit (6D/5N)</div>
                        <div className="text-[10px] text-slate-500">Kainchi Dham, Jageshwar, Golu Devta & Patal Bhuvaneshwar</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Circuit</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Munsiyari & Khaliya Bugyal", slug: "munsyari", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Munsiyari & Khaliya Bugyal Trek</div>
                        <div className="text-[10px] text-slate-500">Little Kashmir & panoramic Himalayan views</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Alpine</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Jageshwar Dham Jyotirlinga", slug: "jageshwar-dham", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Jageshwar Dham (124 Temples)</div>
                        <div className="text-[10px] text-slate-500">8th Jyotirlinga in ancient Deodar forest</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 shrink-0">Jyotirlinga</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Chitai Golu Devta Mandir", slug: "chitai-golu-devta", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Chitai Golu Devta Mandir</div>
                        <div className="text-[10px] text-slate-500">God of Justice with 10,000 brass bells</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 shrink-0">Sacred</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Patal Bhuvaneshwar Cave", slug: "patal-bhuvaneshwar", type: "destination" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Patal Bhuvaneshwar Subterranean Cave</div>
                        <div className="text-[10px] text-slate-500">Limestone underground cave with 33 crore deities</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">Cave</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 7. News & Blogs Card Dropdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E8590C]/50 transition-all">
                <button
                  onClick={() => toggleMobileSection("blogs")}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Newspaper size={20} className="text-[#E03A3A] shrink-0" />
                    <span className="text-[15px] font-bold text-slate-900">News & Blogs</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-200 ${expandedMobileSection === "blogs" ? "rotate-180 text-[#E8590C]" : ""}`} 
                  />
                </button>
                {expandedMobileSection === "blogs" && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-slate-100 pt-2.5 bg-slate-50/80">
                    <button
                      onClick={() => handleItemClick({ title: "Adi Kailash Complete Guide 2027", slug: "adi-kailash-complete-guide-2027", type: "blog" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Adi Kailash Complete Guide 2027</div>
                        <div className="text-[10px] text-slate-500">Route maps, best seasons, permits & costs</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">Guide</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Inner Line Permit (ILP) Rules", slug: "inner-line-permit-rules", type: "blog" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Inner Line Permit (ILP) Rules</div>
                        <div className="text-[10px] text-slate-500">Step-by-step SDM Dharchula permit liaison</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">Essential</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "High Altitude Medical Fitness", slug: "medical-fitness-altitude-guide", type: "blog" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">High Altitude Medical Fitness</div>
                        <div className="text-[10px] text-slate-500">Medical fitness pass and clearance certificates</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Pass</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "Nabi & Gunji Homestays Guide", slug: "gunji-nabhi-jolingkong-homestays", type: "seo" })}
                      className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200/70 hover:border-[#E8590C]/50 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#E8590C]">Nabi & Gunji Homestays Guide</div>
                        <div className="text-[10px] text-slate-500">Warm wooden cottages, sattvik food & facilities</div>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 shrink-0">Stays</span>
                    </button>

                    <button
                      onClick={() => handleItemClick({ title: "View All Himalayan Articles", slug: "all", type: "blog-all" })}
                      className="w-full text-center p-2 rounded-lg bg-orange-50 text-[#E8590C] hover:bg-orange-100 text-xs font-bold transition-colors cursor-pointer block mt-1"
                    >
                      View All Articles & Travel Guides →
                    </button>
                  </div>
                )}
              </div>

              {/* 8. Extra Quick Utility Tools */}
              <div className="pt-2 space-y-2.5 border-t border-slate-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenClothingGuide) onOpenClothingGuide();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Shirt size={18} className="text-[#E03A3A] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">What to Wear (Layering Guide)</span>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-[#E8590C]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenMedicalFitness) onOpenMedicalFitness();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <HeartPulse size={18} className="text-emerald-600 shrink-0" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">Medical Fitness Checklist</span>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 uppercase">Pass</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">Tick required parameters & unlock clearance</span>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-emerald-600" />
                </button>

                <a
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onGoHome) onGoHome();
                    const elem = document.getElementById("calculator");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group block"
                >
                  <div className="flex items-center gap-3">
                    <Calculator size={18} className="text-[#E03A3A] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Instant Price Calculator</span>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-[#E8590C]" />
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTeamPage) onOpenTeamPage();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-[#E03A3A] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Meet Our Team & Sherpas</span>
                      <span className="text-[10px] text-slate-500 font-normal">Native Kumaoni Expedition Leads & Drivers</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200/60 shrink-0">
                    Local Team
                  </span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAboutUsPage) onOpenAboutUsPage();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Landmark size={18} className="text-[#E03A3A] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">About GoTrek Heritage</span>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-[#E8590C]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenReelsPage) onOpenReelsPage();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Film size={18} className="text-[#E03A3A] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Reels</span>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-[#E8590C]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenMemoriesPage) onOpenMemoriesPage();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#E8590C]/40 text-left font-bold text-slate-800 flex items-center justify-between shadow-2xs cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Camera size={18} className="text-[#E03A3A] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Memories</span>
                  </div>
                  <ChevronRight size={15} className="text-slate-400 group-hover:text-[#E8590C]" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiConsultant();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-400/50 flex items-center justify-between text-[#E8590C] text-xs font-bold shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={18} className="text-amber-500 animate-pulse" />
                    <div className="text-left">
                      <div className="font-extrabold text-slate-900 text-xs">Ask AI Yatra Guru</div>
                      <div className="text-[10px] text-slate-500 font-normal">24/7 instant permits & cost answers</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-amber-600" />
                </button>
              </div>

              {/* Pilgrim Account & CRM Login */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenUserAuth) onOpenUserAuth('login');
                  }}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-left font-bold text-slate-800 flex items-center gap-2 text-xs shadow-2xs cursor-pointer"
                >
                  <User size={15} className="text-[#E03A3A] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">{currentUser ? currentUser.name.split(' ')[0] : "Pilgrim Login"}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleCrm();
                  }}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-left font-bold text-slate-800 flex items-center gap-2 text-xs shadow-2xs cursor-pointer"
                >
                  <LayoutDashboard size={15} className="text-[#E03A3A] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">{isCrmActive ? "Exit CRM" : "CRM Portal"}</span>
                </button>
              </div>

            </div>

            {/* Drawer Bottom Contact & Book CTA */}
            <div className="p-4 bg-white border-t border-slate-200 space-y-2.5 shrink-0 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <MapPin size={13} className="text-[#E03A3A]" />
                  <span>Pithoragarh • Dharchula</span>
                </span>
                <a
                  href="tel:+917248285767"
                  className="text-[#E8590C] font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall size={12} />
                  <span>+91 72482 85767</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry("Mobile Drawer Instant Booking");
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8590C] via-[#F76707] to-[#D9480F] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <Calendar size={15} className="text-white" />
                <span>Book 2027 Yatra Now</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
