import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mountain,
  Flame,
  Plane,
  Flower2,
  Sun,
  Compass,
} from "lucide-react";

export type SacredPillar = "all" | "himachal" | "adi-kailash" | "kailash-mansarovar" | "dodham" | "chardham" | "valley-of-flowers";

export interface NavPackageItem {
  id: string;
  pillar: "himachal" | "adi-kailash" | "kailash-mansarovar" | "dodham" | "chardham" | "valley-of-flowers";
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  originalPrice?: string;
  location: string;
  altitude: string;
  badge: string;
  badgeType: "bestseller" | "visa-free" | "unesco" | "vip" | "scenic";
  image: string;
  highlights: string[];
  slug: string;
  type: "package" | "destination";
}

export const NAV_SACRED_PACKAGES: NavPackageItem[] = [
  // --- 0. HIMACHAL PRADESH PACKAGES ---
  {
    id: "nav-hp-1",
    pillar: "himachal",
    title: "Spiti Valley & Chandratal Lake Grand Circuit",
    subtitle: "Shimla → Kinnaur → Kaza → Chandratal → Manali",
    duration: "7D / 6N",
    price: "₹22,500",
    originalPrice: "₹28,000",
    location: "Kaza · Key Gompa · Chandratal Lake",
    altitude: "14,000 ft",
    badge: "Himachal Must-Visit",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=700&q=80",
    highlights: ["1000-Yr Key Gompa & Tabo", "Moon Lake Chandratal Camp", "World's Highest Post Office Hikkim", "Chicham Bridge & Kunzum Pass"],
    slug: "spiti-valley",
    type: "destination",
  },
  {
    id: "nav-hp-2",
    pillar: "himachal",
    title: "Manali, Solang Valley & Atal Tunnel",
    subtitle: "Rohtang Pass View · Lahaul Valley Day Trip",
    duration: "5D / 4N",
    price: "₹14,500",
    originalPrice: "₹19,000",
    location: "Manali · Solang Valley · Sissu Waterfall",
    altitude: "10,000 ft",
    badge: "Snow & Adventure",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80",
    highlights: ["Atal Tunnel Engineering Marvel", "Solang Valley Paragliding & Zipline", "Hadimba Temple & Vashisht Baths", "Old Manali Cafes & Beas River"],
    slug: "manali-solang-lahaul",
    type: "destination",
  },
  {
    id: "nav-hp-3",
    pillar: "himachal",
    title: "Shimla, Kufri & Chail Queen of Hills",
    subtitle: "Mall Road · Jakhoo Temple · Hatu Peak 360°",
    duration: "4D / 3N",
    price: "₹12,500",
    originalPrice: "₹16,000",
    location: "Shimla · Kufri · Chail Palace · Narkanda",
    altitude: "8,600 ft",
    badge: "Colonial Heritage",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=700&q=80",
    highlights: ["Mall Road & Christ Church Heritage Walk", "Jakhoo 108ft Hanuman Temple", "Kufri Himalayan Nature Park", "Hatu Peak 360° Snow Panorama"],
    slug: "shimla-kufri-chail",
    type: "destination",
  },
  {
    id: "nav-hp-4",
    pillar: "himachal",
    title: "Dharamshala, McLeodGanj & Triund Trek",
    subtitle: "Dalai Lama Temple · Tibetan Culture & Snow Wall",
    duration: "5D / 4N",
    price: "₹13,800",
    originalPrice: "₹18,000",
    location: "Dharamshala · McLeodGanj · Triund Base",
    altitude: "9,350 ft",
    badge: "Little Lhasa",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    highlights: ["Dalai Lama Main Temple Complex", "Triund Snow Wall Panoramic Day Trek", "Bhagsunag Waterfall & Shiva Cafe", "Norbulingka Tibetan Art Institute"],
    slug: "dharamshala-mcleodganj",
    type: "destination",
  },
  {
    id: "nav-hp-5",
    pillar: "himachal",
    title: "Kasol, Manikaran Sahib & Jibhi Valley",
    subtitle: "Parvati Valley · Hot Springs · Tirthan Trout Haven",
    duration: "5D / 4N",
    price: "₹14,200",
    originalPrice: "₹18,500",
    location: "Kasol · Manikaran · Tosh · Jibhi",
    altitude: "7,500 ft",
    badge: "Parvati & Tirthan",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Manikaran Hot Springs & Langar Blessing", "Tosh Traditional Wooden Village Walk", "Jibhi Waterfall & Serolsar Lake Trek", "Chalal Riverside Cafes & Pine Trails"],
    slug: "kasol-manikaran-jibhi",
    type: "destination",
  },
  {
    id: "nav-hp-6",
    pillar: "himachal",
    title: "Kinnaur Valley, Kalpa, Sangla & Chitkul",
    subtitle: "Last Indian Village · Kinner Kailash Sacred Rock",
    duration: "6D / 5N",
    price: "₹19,800",
    originalPrice: "₹25,000",
    location: "Shimla → Sarahan → Sangla → Kalpa",
    altitude: "11,300 ft",
    badge: "Last Indian Village",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=700&q=80",
    highlights: ["Chitkul Indo-Tibet Border Village Walk", "Kinner Kailash Sacred Rock Golden Sunrise", "Sangla Baspa River Green Meadows", "Bhimakali 800-Yr Temple Sarahan"],
    slug: "kinnaur-kalpa-sangla",
    type: "destination",
  },
  {
    id: "nav-hp-7",
    pillar: "himachal",
    title: "Dalhousie, Khajjiar & Bir Billing Paragliding",
    subtitle: "Mini Switzerland · World #2 Paragliding Site",
    duration: "5D / 4N",
    price: "₹16,500",
    originalPrice: "₹22,000",
    location: "Dalhousie · Khajjiar · Bir Billing · Baijnath",
    altitude: "8,000 ft",
    badge: "Paragliding Mecca",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80",
    highlights: ["Khajjiar Alpine Cedar Meadows", "Bir Billing World #2 Paragliding Flight", "Dainkund Peak 360° View", "Ancient Baijnath Shiva Temple"],
    slug: "dalhousie-khajjiar-bir",
    type: "destination",
  },
  // --- 1. ADI KAILASH & OM PARVAT PACKAGES ---
  {
    id: "nav-ak-1",
    pillar: "adi-kailash",
    title: "Adi Kailash Standard Yatra (4x4 Bolero)",
    subtitle: "Kathgodam / Dharchula Base · Vyas Valley Circuit",
    duration: "5D / 4N",
    price: "₹28,000",
    originalPrice: "₹38,000",
    location: "Dharchula → Gunji → Jolingkong",
    altitude: "14,500 ft",
    badge: "Bestseller 2027",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    highlights: ["Parvati Sarovar Darshan", "Jolingkong Base Camp", "SDM 48hr Permit", "Sattvik Meals"],
    slug: "adi-kailash-yatra-standard",
    type: "package",
  },
  {
    id: "nav-ak-2",
    pillar: "adi-kailash",
    title: "Premium Spiritual Expedition",
    subtitle: "Luxury 4x4 Isuzu / Scorpio · Deluxe Homestays",
    duration: "7D / 6N",
    price: "₹45,000",
    originalPrice: "₹55,000",
    location: "Kathgodam → Gunji → Nabi Village",
    altitude: "14,500 ft",
    badge: "Luxury 4x4",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Private Heated Rooms", "Dedicated Oxygen Setup", "Vyas Gufa Darshan", "Gauri Kund Trek"],
    slug: "adi-kailash-spiritual-expedition-premium",
    type: "package",
  },
  {
    id: "nav-ak-3",
    pillar: "adi-kailash",
    title: "VIP Luxury Helicopter Darshan",
    subtitle: "Pithoragarh Helipad → Gunji Direct Flight",
    duration: "3D / 2N",
    price: "₹75,000",
    originalPrice: "₹90,000",
    location: "Gunji Mountain Base · Jolingkong",
    altitude: "14,500 ft",
    badge: "VIP Heli",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=700&q=80",
    highlights: ["Same-Day Helicopter Flight", "Senior Citizen Friendly", "VIP Inner Line Pass", "5-Star Tents"],
    slug: "adi-kailash-vip-luxury-helicopter",
    type: "package",
  },
  {
    id: "nav-ak-4",
    pillar: "adi-kailash",
    title: "Adi Kailash from Delhi Direct",
    subtitle: "Capital Direct AC Volvo / Luxury Tempo Traveler",
    duration: "7D / 6N",
    price: "₹35,000",
    originalPrice: "₹42,000",
    location: "Delhi → Kainchi Dham → Dharchula",
    altitude: "14,500 ft",
    badge: "Delhi Pickup",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
    highlights: ["Kainchi Dham Ashram Halt", "Door-to-Door Convoy", "Full Medical Screening", "Local Sherpa Guide"],
    slug: "adi-kailash-from-delhi",
    type: "destination",
  },
  {
    id: "nav-ak-5",
    pillar: "adi-kailash",
    title: "Om Parvat Divine ॐ Sunrise Darshan",
    subtitle: "Nabhidhang High Plateau · Kalapani Springs",
    duration: "5D / 4N",
    price: "₹35,000",
    originalPrice: "₹44,000",
    location: "Dharchula → Nabhidhang · Vyas Valley",
    altitude: "14,000 ft",
    badge: "Sacred ॐ Symbol",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=700&q=80",
    highlights: ["Natural Snow 'ॐ' Carving", "Kali Mandir Kalapani", "Lipulekh Border View", "Nabi Homestay"],
    slug: "om-parvat",
    type: "destination",
  },
  {
    id: "nav-ak-6",
    pillar: "adi-kailash",
    title: "Adi Kailash from Kathgodam/Haldwani",
    subtitle: "Kathgodam Railway Station Pickup & Drop",
    duration: "6D / 5N",
    price: "₹25,000",
    originalPrice: "₹32,000",
    location: "Kathgodam → Jageshwar → Gunji",
    altitude: "14,500 ft",
    badge: "Train Connect",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Jageshwar 124 Temples Halt", "Direct Railway Transfers", "Nabi Heritage Village", "ITBP Clearance"],
    slug: "adi-kailash-yatra-from-haldwani",
    type: "destination",
  },

  // --- 2. KAILASH MANSAROVAR PACKAGES ---
  {
    id: "nav-km-1",
    pillar: "kailash-mansarovar",
    title: "Kailash Mansarovar View from Old Lipulekh",
    subtitle: "Direct Darshan from Indian Territory · No China Visa",
    duration: "5D / 4N",
    price: "₹48,000",
    originalPrice: "₹62,000",
    location: "Dharchula → Gunji → Old Lipulekh Pass",
    altitude: "17,500 ft",
    badge: "No China Visa",
    badgeType: "visa-free",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80",
    highlights: ["Mt. Kailash Indian Viewpoint", "Lake Mansarovar Aerial View", "Inner Line Permit Only", "Zero Tibet Visa Delay"],
    slug: "kailash-mansarovar",
    type: "destination",
  },
  {
    id: "nav-km-2",
    pillar: "kailash-mansarovar",
    title: "Aerial Kailash Mansarovar Flight",
    subtitle: "Chartered Aircraft Darshan from Lucknow Airport",
    duration: "3D / 2N",
    price: "₹70,001",
    originalPrice: "₹85,000",
    location: "Lucknow → Nepal Border (Aerial 25,000 ft)",
    altitude: "25,000 ft (Aircraft)",
    badge: "Senior Friendly",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Zero Physical Trekking", "Panoramic Window Seat", "Holy Lake Mansarovar View", "Pandit-Guided Chants"],
    slug: "aerial-kailash-mansarovar",
    type: "destination",
  },
  {
    id: "nav-km-3",
    pillar: "kailash-mansarovar",
    title: "Kailash Mansarovar Overland via Nepal",
    subtitle: "Kathmandu → Kyirong → Darchen → Parikrama",
    duration: "14D / 13N",
    price: "₹2,50,000",
    originalPrice: "₹2,80,000",
    location: "Kathmandu → Tibet Border → Mt. Kailash",
    altitude: "19,500 ft",
    badge: "Grand Parikrama",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=700&q=80",
    highlights: ["3-Day Holy Parikrama", "Yam Dwar Entrance", "Dolma La Pass Crossing", "Mansarovar Snan Ritual"],
    slug: "kailash-mansarovar",
    type: "destination",
  },
  {
    id: "nav-km-4",
    pillar: "kailash-mansarovar",
    title: "Kailash Helicopter Yatra via Simikot",
    subtitle: "Kathmandu → Nepalgunj → Simikot → Hilsa Heli",
    duration: "11D / 10N",
    price: "₹2,85,000",
    originalPrice: "₹3,20,000",
    location: "Simikot Heli Base → Purang → Lake Mansarovar",
    altitude: "18,600 ft",
    badge: "Heli Circuit",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Twin-Engine Heli Flights", "Tibet Permit & Group Visa", "Sherpa Oxygen Support", "Rakshastal & Mansarovar"],
    slug: "kailash-mansarovar",
    type: "destination",
  },

  // --- 3. VALLEY OF FLOWERS & HEMKUND SAHIB PACKAGES ---
  {
    id: "nav-vof-1",
    pillar: "valley-of-flowers",
    title: "Valley of Flowers & Hemkund Sahib Trek",
    subtitle: "UNESCO Alpine Bloom & Sacred Glacial Gurudwara",
    duration: "6D / 5N",
    price: "₹18,500",
    originalPrice: "₹24,000",
    location: "Rishikesh → Govindghat → Ghangaria",
    altitude: "14,400 ft",
    badge: "UNESCO Heritage",
    badgeType: "unesco",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["500+ Alpine Wildflower Species", "Sri Hemkund Sahib Ardas", "Brahma Kamal Spotting", "Badrinath & Mana Halt"],
    slug: "valley-of-flowers",
    type: "destination",
  },
  {
    id: "nav-vof-2",
    pillar: "valley-of-flowers",
    title: "Valley of Flowers Botanical Special",
    subtitle: "Govindghat → Pushpawati River Gorge · Ghangaria Base",
    duration: "5D / 4N",
    price: "₹16,000",
    originalPrice: "₹21,000",
    location: "Haridwar / Rishikesh → Valley of Flowers",
    altitude: "12,800 ft",
    badge: "Monsoon Bloom",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80",
    highlights: ["Pushpawati River Trail", "Rare Blue Poppy Sightings", "Eco-Certified Trek Guide", "Forest Department Passes"],
    slug: "valley-of-flowers",
    type: "destination",
  },
  {
    id: "nav-vof-3",
    pillar: "valley-of-flowers",
    title: "VIP Valley of Flowers with Badrinath Swarna Aarti",
    subtitle: "Deluxe Resort Stays · Dedicated Innova Crysta Transport",
    duration: "7D / 6N",
    price: "₹26,500",
    originalPrice: "₹34,000",
    location: "Dehradun → Ghangaria → Badrinath Dham",
    altitude: "14,400 ft",
    badge: "Deluxe Combo",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    highlights: ["Badrinath VIP Temple Darshan", "Mana 'Last Indian Village'", "Luxury Ghangaria Stays", "Personal Porter Included"],
    slug: "valley-of-flowers",
    type: "destination",
  },
  {
    id: "nav-vof-4",
    pillar: "valley-of-flowers",
    title: "Heli-Assisted Hemkund & Valley Tour",
    subtitle: "Govindghat to Ghangaria Direct Helicopter Transfers",
    duration: "4D / 3N",
    price: "₹38,000",
    originalPrice: "₹46,000",
    location: "Govindghat Helipad → Ghangaria → Hemkund",
    altitude: "14,400 ft",
    badge: "Helicopter Transfer",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=700&q=80",
    highlights: ["Saves 14 km Steep Trek", "Same Day Helicopter Ride", "Pony / Palki Support", "Senior Citizen Friendly"],
    slug: "valley-of-flowers",
    type: "destination",
  },

  // --- 4. DO DHAM SACRED COMBINATIONS ---
  {
    id: "nav-dd-1",
    pillar: "dodham",
    title: "Do Dham Yatra (Kedarnath & Badrinath)",
    subtitle: "Haridwar → Guptkashi → Kedarnath → Joshimath → Badrinath",
    duration: "6D / 5N",
    price: "₹22,500",
    originalPrice: "₹29,000",
    location: "Sonprayag → Kedarnath Base → Badrinath Dham",
    altitude: "11,755 ft",
    badge: "Most Popular Do Dham",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80",
    highlights: ["Kedarnath Temple Night Stay", "Badri Vishal Swarna Aarti", "Mana Village & Saraswati River", "100% Govt Yatra Pass"],
    slug: "do-dham-kedarnath-badrinath",
    type: "destination",
  },
  {
    id: "nav-dd-2",
    pillar: "dodham",
    title: "Kedarnath & Badrinath VIP Helicopter Do Dham",
    subtitle: "Phata / Sersi / Sahastradhara Helipad Priority Shuttle",
    duration: "4D / 3N",
    price: "₹95,000",
    originalPrice: "₹1,15,000",
    location: "Direct Helipad Transfers · Luxury Stays",
    altitude: "11,755 ft",
    badge: "VIP Heli Shuttle",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=700&q=80",
    highlights: ["Same-Day Helicopter Darshan", "VIP Temple Entry Passes", "Deluxe Mountain Resorts", "Senior Citizen Friendly"],
    slug: "do-dham-kedarnath-badrinath",
    type: "destination",
  },
  {
    id: "nav-dd-3",
    pillar: "dodham",
    title: "Yamunotri & Gangotri Sacred River Do Dham",
    subtitle: "Surya Kund · Kalindi Parvat · Gangotri Temple & Harsil Valley",
    duration: "5D / 4N",
    price: "₹16,500",
    originalPrice: "₹22,000",
    location: "Barkot → Yamunotri → Uttarkashi → Gangotri",
    altitude: "10,800 ft",
    badge: "Holy River Origins",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=700&q=80",
    highlights: ["Surya Kund Thermal Spring Dip", "Bhagirathi River Aarti", "Harsil Valley Apple Orchards", "Private AC Cab"],
    slug: "yamunotri-dham",
    type: "destination",
  },
  {
    id: "nav-dd-4",
    pillar: "dodham",
    title: "Kedarnath Jyotirlinga Darshan & Trek",
    subtitle: "11th Jyotirlinga · Mandakini River Trail · Bhim Shila Night Stay",
    duration: "5D / 4N",
    price: "₹16,000",
    originalPrice: "₹21,000",
    location: "Haridwar → Guptkashi → Gaurikund → Kedarnath",
    altitude: "11,755 ft",
    badge: "11th Jyotirlinga",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    highlights: ["16 km Scenic Trek / Pony Option", "Mandakini Evening Maha Aarti", "Bhim Shila & Bhairav Temple", "Oxygen Backup"],
    slug: "kedarnath-dham",
    type: "destination",
  },
  {
    id: "nav-dd-5",
    pillar: "dodham",
    title: "Badrinath Vishal & Mana First Village",
    subtitle: "Badri Vishal Darshan · Tapt Kund Sulfur Bath · Vyas Gufa",
    duration: "4D / 3N",
    price: "₹14,500",
    originalPrice: "₹18,500",
    location: "Rishikesh → Joshimath → Badrinath → Mana",
    altitude: "10,830 ft",
    badge: "Badri Vishal",
    badgeType: "scenic",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=80",
    highlights: ["Tapt Kund 45°C Thermal Bath", "Mana - India's Last Village", "Saraswati River Origin", "Panch Prayag Views"],
    slug: "badrinath-dham",
    type: "destination",
  },

  // --- 5. CHAR DHAM YATRA PACKAGES ---
  {
    id: "nav-cd-1",
    pillar: "chardham",
    title: "Garhwal Char Dham Yatra (Complete 4 Shrines)",
    subtitle: "Yamunotri · Gangotri · Kedarnath · Badrinath",
    duration: "10D / 9N",
    price: "₹32,000",
    originalPrice: "₹42,000",
    location: "Haridwar / Rishikesh Pickup · 4 Shrines",
    altitude: "11,755 ft",
    badge: "Supreme Pilgrimage",
    badgeType: "bestseller",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    highlights: ["Kedarnath Jyotirlinga Darshan", "Badrinath Temple Swarna Aarti", "Govt e-Pass Clearance", "Deluxe Hotel Stays"],
    slug: "chardham-yatra",
    type: "destination",
  },
  {
    id: "nav-cd-2",
    pillar: "chardham",
    title: "Char Dham VIP Helicopter 4-Shrines Tour",
    subtitle: "Dehradun Sahastradhara Helipad Direct All 4 Dhams",
    duration: "5D / 4N",
    price: "₹1,95,000",
    originalPrice: "₹2,25,000",
    location: "Sahastradhara Helipad → Kharsali → Guptkashi",
    altitude: "11,755 ft",
    badge: "5-Star Heli Tour",
    badgeType: "vip",
    image: "https://images.unsplash.com/photo-1519681393784-d120277933ba?auto=format&fit=crop&w=700&q=80",
    highlights: ["VIP Temple Darshan Passes", "Luxury 5-Star Stays & Dining", "Dedicated Ground Escorts", "Palki & Heli Shuttle"],
    slug: "chardham-yatra",
    type: "destination",
  },
];

const PILLAR_CONFIG: {
  id: SacredPillar;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  tag: string;
  color: string;
}[] = [
  {
    id: "all",
    label: "All Packages",
    shortLabel: "All",
    icon: <Compass size={15} className="text-amber-400" />,
    tag: "25+ Curated Himalayan & Himachal Expeditions",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "himachal",
    label: "Himachal Pradesh Trips",
    shortLabel: "Himachal",
    icon: <Compass size={15} className="text-emerald-400" />,
    tag: "Spiti, Manali, Shimla, Dharamshala, Kasol, Kinnaur & Dalhousie",
    color: "from-emerald-500 to-cyan-600",
  },
  {
    id: "adi-kailash",
    label: "Adi Kailash & Om Parvat",
    shortLabel: "Adi Kailash",
    icon: <Mountain size={15} className="text-amber-400" />,
    tag: "Official Local Operator · Opens May 2027",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "dodham",
    label: "Do Dham Packages",
    shortLabel: "Do Dham",
    icon: <Flame size={15} className="text-amber-400" />,
    tag: "Kedarnath & Badrinath · Yamunotri & Gangotri",
    color: "from-amber-500 to-red-600",
  },
  {
    id: "chardham",
    label: "Char Dham Yatra",
    shortLabel: "Char Dham",
    icon: <Flame size={15} className="text-orange-400" />,
    tag: "Garhwal 4-Shrines Circuit & VIP Helicopter",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "kailash-mansarovar",
    label: "Kailash Mansarovar",
    shortLabel: "Mansarovar",
    icon: <Sun size={15} className="text-sky-400" />,
    tag: "Old Lipulekh View (No China Visa) & Heli",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "valley-of-flowers",
    label: "Valley of Flowers",
    shortLabel: "Flower Valley",
    icon: <Flower2 size={15} className="text-emerald-400" />,
    tag: "UNESCO Alpine Bloom & Hemkund Sahib",
    color: "from-emerald-500 to-teal-600",
  },
];

interface NavbarDraggablePackagesProps {
  onSelectPackage?: (slug?: string) => void;
  onSelectDestination?: (slug: string) => void;
  onOpenInquiry?: (packageName?: string) => void;
  onClose?: () => void;
  initialPillar?: SacredPillar;
  variant?: "mega-menu" | "drawer" | "bar";
}

export const NavbarDraggablePackages: React.FC<NavbarDraggablePackagesProps> = ({
  onSelectPackage,
  onSelectDestination,
  onOpenInquiry,
  onClose,
  initialPillar = "adi-kailash",
  variant = "mega-menu",
}) => {
  const [selectedPillar, setSelectedPillar] = useState<SacredPillar>(initialPillar);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter packages based on active pillar
  const filteredPackages = NAV_SACRED_PACKAGES.filter(
    (pkg) => selectedPillar === "all" || pkg.pillar === selectedPillar
  );

  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    return () => el.removeEventListener("scroll", checkScrollBounds);
  }, [filteredPackages, checkScrollBounds]);

  // Reset scroll on pillar change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedPillar]);

  // Drag to scroll handlers for desktop mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    if (Math.abs(walk) > 5) {
      setDragMoved(true);
    }
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleItemAction = (item: NavPackageItem) => {
    if (dragMoved) return; // ignore click if user was dragging
    if (item.type === "package" && onSelectPackage) {
      onSelectPackage(item.slug);
    } else if (onSelectDestination) {
      onSelectDestination(item.slug);
    }
    if (onClose) onClose();
  };

  const handleBookClick = (e: React.MouseEvent, item: NavPackageItem) => {
    e.stopPropagation();
    if (onOpenInquiry) {
      onOpenInquiry(item.title);
    }
    if (onClose) onClose();
  };

  return (
    <div
      className={`w-full text-slate-800 bg-white font-sans select-none ${
        variant === "mega-menu"
          ? "rounded-2xl border border-amber-400/40 shadow-2xl p-3 sm:p-5"
          : variant === "drawer"
          ? "p-2 rounded-xl"
          : "p-3 border-y border-amber-400/30"
      }`}
    >
      {/* 1. Header & Destination Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        
        {/* Title & Badge */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-100 text-[#C91D24] border border-amber-200">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                Sacred Yatra Packages 2027
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Drag to Explore
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Government Registered · 48-Hour SDM Permit Processing · Native Guides
            </p>
          </div>
        </div>

        {/* Scroll Arrows & Hint */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[10px] font-semibold text-slate-500 hidden md:inline">
            ← Hold & Drag mouse to scroll packages →
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollByAmount(-340)}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                canScrollLeft
                  ? "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 active:scale-95"
                  : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              }`}
              title="Scroll Left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollByAmount(340)}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                canScrollRight
                  ? "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 active:scale-95"
                  : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              }`}
              title="Scroll Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Destination Filter Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
        {PILLAR_CONFIG.map((pill) => {
          const isActive = selectedPillar === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setSelectedPillar(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                isActive
                  ? "bg-[#C91D24] text-white border-[#C91D24] font-extrabold shadow-xs scale-[1.02]"
                  : "bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border-slate-200/80"
              }`}
            >
              {pill.icon}
              <span>{pill.label}</span>
              {pill.id === "adi-kailash" && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? "bg-black/20 text-white" : "bg-amber-100 text-amber-900"}`}>
                  6
                </span>
              )}
              {pill.id === "kailash-mansarovar" && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? "bg-black/20 text-white" : "bg-sky-100 text-sky-900"}`}>
                  4
                </span>
              )}
              {pill.id === "valley-of-flowers" && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? "bg-black/20 text-white" : "bg-emerald-100 text-emerald-900"}`}>
                  4
                </span>
              )}
              {pill.id === "chardham" && (
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? "bg-black/20 text-white" : "bg-orange-100 text-orange-900"}`}>
                  4
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Draggable Horizontal Package Carousel Track */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-amber-400/40 scrollbar-track-slate-100 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          scrollSnapType: isDragging ? "none" : "x proximity",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {filteredPackages.map((pkg) => {
          return (
            <div
              key={pkg.id}
              onClick={() => handleItemAction(pkg)}
              style={{ scrollSnapAlign: "start" }}
              className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl bg-white border border-slate-200 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer"
            >
              {/* Top Image & Badge */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md ${
                      pkg.badgeType === "visa-free"
                        ? "bg-emerald-500 text-white"
                        : pkg.badgeType === "vip"
                        ? "bg-amber-400 text-slate-950"
                        : pkg.badgeType === "unesco"
                        ? "bg-teal-600 text-white"
                        : "bg-amber-400 text-slate-950"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Duration & Altitude Tag */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-white/20">
                    <Clock size={11} className="text-amber-300" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-white/20 text-amber-300">
                    <Mountain size={11} className="text-amber-300" />
                    {pkg.altitude}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C91D24] transition-colors leading-snug line-clamp-2">
                    {pkg.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Route Location */}
                <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                  <MapPin size={12} className="text-[#C91D24] shrink-0" />
                  <span className="truncate">{pkg.location}</span>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-100">
                  {pkg.highlights.slice(0, 4).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1 text-[10px] text-slate-600 truncate">
                      <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="min-w-0">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">From</div>
                    <div className="text-sm sm:text-base font-mono font-black text-slate-900">
                      {pkg.price}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleBookClick(e, pkg)}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Footer Note & Fast Jump Links */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>All packages include SDM Dharchula Permit + Medical Briefing + Local Kumaoni Escort</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onOpenInquiry) onOpenInquiry("Custom 2027 Pilgrimage Itinerary");
              if (onClose) onClose();
            }}
            className="text-[#C91D24] hover:text-red-800 font-bold underline cursor-pointer text-xs"
          >
            Need Custom Itinerary / Group Discount? Talk to Guru →
          </button>
        </div>
      </div>
    </div>
  );
};
