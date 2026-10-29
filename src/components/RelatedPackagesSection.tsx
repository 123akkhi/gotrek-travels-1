import React, { memo, useState, useMemo, useEffect } from "react";
import { Sparkles, Clock, Mountain, ArrowRight, MapPin, CheckCircle2, ShieldCheck, Compass, Landmark, Flower2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface RelatedPackagesSectionProps {
  currentSlug?: string;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug: string) => void;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

export type CircuitCategory = "all" | "himachal" | "adi-kailash" | "chardham" | "mansarovar" | "kumaon-alpine";

interface CircuitPackage {
  id: string;
  category: "himachal" | "adi-kailash" | "chardham" | "mansarovar" | "kumaon-alpine";
  title: string;
  location: string;
  duration: string;
  price: string;
  slug: string;
  type: "destination" | "package";
  image: string;
  badge: string;
  badgeColor?: string;
  altitude: string;
  highlights: string[];
  description: string;
}

// Master collection of curated pilgrimage circuits and packages
const ALL_CIRCUIT_PACKAGES: CircuitPackage[] = [
  // 0. Himachal Pradesh Expeditions & Hill Stations
  {
    id: "hp-1",
    category: "himachal",
    title: "Spiti Valley & Chandratal Lake Circuit",
    location: "Shimla → Kinnaur → Kaza → Chandratal → Manali",
    duration: "7D / 6N",
    price: "₹22,500",
    slug: "spiti-valley",
    type: "destination",
    image: "/images/destinations/spit-valley.webp",
    badge: "Himachal Must-Visit",
    badgeColor: "bg-emerald-600 text-white",
    altitude: "14,100 ft",
    highlights: ["1000-Yr Key Gompa & Tabo", "Moon Lake Chandratal Camp", "World Highest Post Office Hikkim", "Kunzum Pass 14,931 ft"],
    description: "Grand circular road trip through the mystical cold desert of Spiti Valley, high-altitude monasteries, and turquoise Chandratal Lake.",
  },
  {
    id: "hp-2",
    category: "himachal",
    title: "Manali, Solang Valley & Atal Tunnel",
    location: "Manali → Solang Valley → Sissu Waterfall → Rohtang",
    duration: "5D / 4N",
    price: "₹14,500",
    slug: "manali-solang-lahaul",
    type: "destination",
    image: "/images/destinations/manali-solang.webp",
    badge: "Snow & Adventure",
    badgeColor: "bg-cyan-600 text-white",
    altitude: "10,200 ft",
    highlights: ["Atal Tunnel Engineering Marvel", "Solang Valley Paragliding & Zipline", "Hadimba Temple & Vashisht Baths", "Old Manali Riverside Cafes"],
    description: "The ultimate snow and alpine getaway combining Manali's pine-shaded heritage with high-altitude Lahaul valley crossings.",
  },
  {
    id: "hp-3",
    category: "himachal",
    title: "Shimla, Kufri & Chail Heritage Tour",
    location: "Shimla Mall Road → Kufri → Chail Palace → Narkanda",
    duration: "4D / 3N",
    price: "₹12,500",
    slug: "shimla-kufri-chail",
    type: "destination",
    image: "/images/destinations/shimla-kufri-chail.webp",
    badge: "Queen of Hills",
    badgeColor: "bg-amber-600 text-white",
    altitude: "8,600 ft",
    highlights: ["Mall Road & Christ Church Walk", "Jakhoo 108ft Hanuman Temple", "Kufri Himalayan Nature Park", "Hatu Peak 360° Panorama"],
    description: "Classic colonial hill station experience with heritage British architecture, dense deodar forests, and panoramic Himalayan vistas.",
  },
  {
    id: "hp-4",
    category: "himachal",
    title: "Dharamshala, McLeodGanj & Triund",
    location: "Dharamshala → McLeodGanj → Triund Peak → Kangra",
    duration: "5D / 4N",
    price: "₹13,800",
    slug: "dharamshala-mcleodganj",
    type: "destination",
    image: "/images/destinations/triund-trek-mcleodganjh.webp",
    badge: "Little Lhasa",
    badgeColor: "bg-indigo-600 text-white",
    altitude: "9,350 ft",
    highlights: ["Dalai Lama Main Temple Complex", "Triund Snow Wall Panoramic Trek", "Bhagsunag Waterfall & Shiva Cafe", "Norbulingka Tibetan Art Institute"],
    description: "Immerse in serene Tibetan Buddhist culture, colorful monasteries, and the exhilarating day trek up the Dhauladhar snow wall.",
  },
  {
    id: "hp-5",
    category: "himachal",
    title: "Kasol, Manikaran Sahib & Jibhi Valley",
    location: "Kasol → Manikaran Hot Springs → Tosh → Jibhi",
    duration: "5D / 4N",
    price: "₹14,200",
    slug: "kasol-manikaran-jibhi",
    type: "destination",
    image: "/image/destinations/kasol.webp",
    badge: "Parvati & Tirthan",
    badgeColor: "bg-emerald-700 text-white",
    altitude: "7,500 ft",
    highlights: ["Manikaran Hot Springs & Langar", "Tosh Traditional Wooden Village", "Jibhi Waterfall & Serolsar Lake", "Chalal Riverside Cafes"],
    description: "Relax amidst cedar-lined river trails in Parvati Valley, holy thermal hot springs of Manikaran, and the hidden trout paradise of Jibhi.",
  },
  {
    id: "hp-6",
    category: "himachal",
    title: "Kinnaur Valley, Kalpa & Chitkul",
    location: "Sarahan → Sangla Valley → Chitkul → Kalpa",
    duration: "6D / 5N",
    price: "₹19,800",
    slug: "kinnaur-kalpa-sangla",
    type: "destination",
    image: "/images/destinations/kinnaur-valley.webp",
    badge: "Last Indian Village",
    badgeColor: "bg-purple-700 text-white",
    altitude: "11,320 ft",
    highlights: ["Chitkul Indo-Tibet Border Walk", "Kinner Kailash Golden Sunrise", "Sangla Baspa River Green Meadows", "Bhimakali 800-Yr Temple"],
    description: "Discover the breathtaking valleys of Kinnaur, apple orchards of Sangla, and India's final border village of Chitkul.",
  },
  {
    id: "hp-7",
    category: "himachal",
    title: "Dalhousie, Khajjiar & Bir Billing",
    location: "Dalhousie → Khajjiar Meadows → Bir Billing → Baijnath",
    duration: "5D / 4N",
    price: "₹16,500",
    slug: "dalhousie-khajjiar-bir",
    type: "destination",
    image: "/images/memories/khajjar.webp",
    badge: "Mini Switzerland",
    badgeColor: "bg-teal-600 text-white",
    altitude: "8,000 ft",
    highlights: ["Khajjiar Alpine Cedar Meadows", "Bir Billing World #2 Paragliding", "Dainkund Peak 360° View", "Ancient Baijnath Shiva Temple"],
    description: "Glide through the world's second-highest paragliding takeoff site at Bir Billing and stroll across the lush green bowl of Khajjiar.",
  },

  // 1. Adi Kailash & Om Parvat Circuits
  {
    id: "ak-1",
    category: "adi-kailash",
    title: "Adi Kailash Yatra Base",
    location: "Dharchula → Jolingkong → Parvati Sarovar",
    duration: "5D / 4N",
    price: "₹28,000",
    slug: "adi-kailash",
    type: "destination",
    image: "/images/destinations/adi-kailash5.webp",
    badge: "Direct Dharchula HQ",
    badgeColor: "bg-amber-500 text-slate-950",
    altitude: "14,500 ft",
    highlights: ["Jolingkong Darshan", "Parvati Sarovar & Gauri Kund", "Vyas Cave & Kuti Village", "100% Inner Line Permit"],
    description: "Our core Bestseller package starting directly from Dharchula. Includes 4x4 Bolero, Kumaoni homestay, meals & permits.",
  },
  {
    id: "ak-2",
    category: "adi-kailash",
    title: "Adi Kailash from Kathgodam",
    location: "Kathgodam Station → Dharchula → Gunji",
    duration: "6D / 5N",
    price: "₹25,000",
    slug: "adi-kailash-yatra-from-haldwani",
    type: "destination",
    image: "/images/destinations/adi-kailash4.webp",
    badge: "Kathgodam Rail Pickup",
    badgeColor: "bg-rose-500 text-white",
    altitude: "14,500 ft",
    highlights: ["Pickup at Kathgodam Station", "Jageshwar Dham En Route", "Gunji & Nabi Homestays", "ITBP Clearance Included"],
    description: "Hassle-free rail transfer package from Kathgodam/Haldwani station with roundtrip transport, meals, and permit.",
  },
  {
    id: "ak-3",
    category: "adi-kailash",
    title: "Adi Kailash from Delhi NCR",
    location: "Delhi → Kainchi Dham → Pithoragarh → Gunji",
    duration: "7D / 6N",
    price: "₹35,000",
    slug: "adi-kailash-from-delhi",
    type: "destination",
    image: "/images/destinations/adi-kailash7.webp",
    badge: "Delhi Direct Connect",
    badgeColor: "bg-sky-500 text-white",
    altitude: "14,500 ft",
    highlights: ["Tempo Traveler from Delhi", "Kainchi Dham Neem Karoli Ashram", "Pithoragarh Night Stay", "Complete Vyas Valley Tour"],
    description: "All-inclusive tour starting from New Delhi capital. Seamless highway transfer, Kainchi Dham visit, and Vyas Valley circuit.",
  },
  {
    id: "ak-4",
    category: "adi-kailash",
    title: "Om Parvat Darshan Special",
    location: "Dharchula → Nabhidhang → Om Parvat",
    duration: "5D / 4N",
    price: "₹35,000",
    slug: "om-parvat",
    type: "destination",
    image: "/images/destinations/adi-kailash2.webp",
    badge: "Sacred OM Darshan",
    badgeColor: "bg-amber-400 text-slate-950",
    altitude: "14,000 ft",
    highlights: ["Sunrise OM Darshan at Nabhidhang", "Kali Temple Visit at Kalapani", "Lipulekh View Point", "Nabi Heritage Village"],
    description: "Witness the miraculous snow-carved 'ॐ' on Om Parvat peak from Nabhidhang with full medical & guide escort.",
  },
  {
    id: "ak-5",
    category: "adi-kailash",
    title: "Adi Kailash Premium SUV & Cottage",
    location: "Dharchula → Gunji → Jolingkong",
    duration: "6D / 5N",
    price: "₹45,000",
    slug: "adi-kailash-spiritual-expedition-premium",
    type: "package",
    image: "/images/destinations/adi-kailash3.webp",
    badge: "Premium Luxury SUV",
    badgeColor: "bg-emerald-500 text-white",
    altitude: "14,500 ft",
    highlights: ["Scorpio / Bolero Neo SUV", "Wooden Cottage Stay", "Doctor-certified Oxygen Support", "VIP Fast-track Permit"],
    description: "Maximum comfort for senior pilgrims and families. Features premium 4x4 vehicles, luxury wooden cottages, and oxygen cylinder support.",
  },
  {
    id: "ak-6",
    category: "adi-kailash",
    title: "Adi Kailash VIP Helicopter Expedition",
    location: "Pithoragarh Naini Saini → Gunji Helipad",
    duration: "4D / 3N",
    price: "₹52,000",
    slug: "adi-kailash-vip-luxury-helicopter",
    type: "destination",
    image: "/images/destinations/adi-kailash6.webp",
    badge: "VIP Helicopter",
    badgeColor: "bg-purple-600 text-white",
    altitude: "14,500 ft",
    highlights: ["25-Minute Scenic Flight", "VIP Fast Track Darshan", "Luxury Accommodation", "Doctor on Board"],
    description: "Fast-track VIP helicopter package avoiding long mountain drives for prompt, spiritual darshan of Adi Kailash and Om Parvat.",
  },

  // 2. Char Dham & Sacred Garhwal Circuits
  {
    id: "cd-1",
    category: "chardham",
    title: "Complete Char Dham Yatra (4 Shrines)",
    location: "Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath",
    duration: "10D / 9N",
    price: "₹32,000",
    slug: "chardham-yatra",
    type: "destination",
    image: "/images/destinations/char-dham.webp",
    badge: "Full 4 Dham Circuit",
    badgeColor: "bg-rose-600 text-white",
    altitude: "11,755 ft",
    highlights: ["Yamunotri & Gangotri Holy Shrines", "Kedarnath Jyotirlinga Darshan", "Badrinath Temple Swarna Aarti", "Guaranteed Uttarakhand e-Pass"],
    description: "The complete 4-Shrine sacred pilgrimage across the Garhwal Himalayas with dedicated mountain transport, hotels & VIP registration.",
  },
  {
    id: "cd-2",
    category: "chardham",
    title: "Kedarnath Dham Darshan & Trek",
    location: "Rishikesh → Sonprayag → Kedarnath Mandir",
    duration: "5D / 4N",
    price: "₹16,000",
    slug: "kedarnath-dham",
    type: "destination",
    image: "/images/temples/kedarnath.webp",
    badge: "11th Jyotirlinga",
    badgeColor: "bg-rose-500 text-white",
    altitude: "11,755 ft",
    highlights: ["Gaurikund to Kedarnath Mandir Trek", "Evening Mandakini Aarti", "Bhairon Nath Ghati Visit", "Pony / Palki / Heli Assistance"],
    description: "Spiritual pilgrimage to the highest of the 12 Jyotirlingas in the lap of Mandakini valley and Kedar Dome glaciers.",
  },
  {
    id: "cd-3",
    category: "chardham",
    title: "Badrinath Dham & Mana First Village",
    location: "Haridwar → Joshimath → Badrinath → Mana",
    duration: "4D / 3N",
    price: "₹14,500",
    slug: "badrinath-dham",
    type: "destination",
    image: "/images/destinations/badrinath.webp",
    badge: "Lord Badri Vishal",
    badgeColor: "bg-amber-600 text-white",
    altitude: "10,279 ft",
    highlights: ["Maha Abhishek & Tapt Kund Bath", "India's First Village Mana", "Bhim Pul & Saraswati River Origin", "Joshimath Shankaracharya Math"],
    description: "Abode of Lord Vishnu on the banks of Alaknanda. Includes Mana border village excursion and hot thermal springs visit.",
  },
  {
    id: "cd-4",
    category: "chardham",
    title: "Do Dham: Kedarnath & Badrinath",
    location: "Haridwar → Guptkashi → Kedarnath → Badrinath",
    duration: "6D / 5N",
    price: "₹22,500",
    slug: "do-dham-kedarnath-badrinath",
    type: "destination",
    image: "/images/temples/badrinath.webp",
    badge: "Do Dham Popular",
    badgeColor: "bg-emerald-600 text-white",
    altitude: "11,755 ft",
    highlights: ["Both Supreme Shiva & Vishnu Shrines", "Chopta Tungnath Route", "VIP Darshan Coordination", "Deluxe Hotel & Transport"],
    description: "The most popular two-shrine combination covering Kedarnath Jyotirlinga and Badrinath Dham with scenic mountain stays.",
  },
  {
    id: "cd-5",
    category: "chardham",
    title: "Gangotri & Yamunotri River Sources",
    location: "Rishikesh → Barkot → Yamunotri → Uttarkashi → Gangotri",
    duration: "5D / 4N",
    price: "₹16,500",
    slug: "yamunotri-dham",
    type: "destination",
    image: "/images/temples/yamunotri.webp",
    badge: "Sacred River Origins",
    badgeColor: "bg-sky-600 text-white",
    altitude: "10,200 ft",
    highlights: ["Yamunotri Divya Shila & Surya Kund", "Gangotri Bhagirathi Shila", "Kashi Vishwanath Mandir Uttarkashi", "Gangnani Natural Sulphur Springs"],
    description: "Pilgrimage to the holy origins of Mother Ganga and Yamuna with serene Himalayan valley stays and natural hot spring dips.",
  },

  // 3. Kailash Mansarovar & Divine Border Expeditions
  {
    id: "km-1",
    category: "mansarovar",
    title: "Kailash Mansarovar (View from India)",
    location: "Dharchula → Gunji → Old Lipulekh Pass 18,300 ft",
    duration: "5D / 4N",
    price: "₹45,000",
    slug: "kailash-mansarovar",
    type: "destination",
    image: "/images/destinations/kailash-mansarovar.webp",
    badge: "Zero China Visa Needed",
    badgeColor: "bg-amber-600 text-white",
    altitude: "18,300 ft",
    highlights: ["Clear View of Mt. Kailash Peak from India", "Old Lipulekh Pass Ascent", "No China Visa or Passport Needed", "ITBP Escorted Route"],
    description: "A landmark yatra path opened from Indian soil at Old Lipulekh Pass, offering direct sacred darshan of Mount Kailash without crossing into Tibet.",
  },
  {
    id: "km-2",
    category: "mansarovar",
    title: "Aerial Kailash Mansarovar Charter Flight",
    location: "Lucknow Airport → Nepalgunj Aerial Circuit",
    duration: "3D / 2N",
    price: "₹70,001",
    slug: "aerial-kailash-mansarovar",
    type: "destination",
    image: "/images/destinations/aerial-kailash-mansarovar.webp",
    badge: "Charter Mountain Flight",
    badgeColor: "bg-purple-600 text-white",
    altitude: "27,000 ft Aerial",
    highlights: ["Window Seat Aerial Darshan", "Zero Trekking / No Age Limit", "Senior Citizen Friendly", "5-Star Hotel Stay in Lucknow"],
    description: "Exclusive chartered aircraft mountain flight providing crystal-clear darshan of Mt. Kailash and Lake Mansarovar in utmost comfort.",
  },
  {
    id: "km-3",
    category: "mansarovar",
    title: "Kailash Mansarovar Overland Parikrama",
    location: "Kathmandu / Lipulekh → Mansarovar Lake → Mt. Kailash",
    duration: "14D / 13N",
    price: "₹2,50,000",
    slug: "kailash-mansarovar",
    type: "destination",
    image: "/images/destinations/kailash-mansarovar-1.webp",
    badge: "Supreme Shiva Parikrama",
    badgeColor: "bg-slate-800 text-white",
    altitude: "19,500 ft",
    highlights: ["Lake Mansarovar Holy Snan", "Yam Dwar Entrance", "Dirapuk & Zuthulpuk Monasteries", "Dolma La Pass 18,600 ft"],
    description: "The ultimate spiritual pilgrimage. Complete Tibet permit management, Sherpa guides, high-altitude medical oxygen, and full support.",
  },

  // 4. Kumaon Alpine Treks & Wilderness Valleys
  {
    id: "ka-1",
    category: "kumaon-alpine",
    title: "Darma Valley & Panchachuli Peaks Base",
    location: "Dharchula → Sobla → Dugtu → Dantu Base",
    duration: "4D / 3N",
    price: "₹24,000",
    slug: "darma-valley",
    type: "destination",
    image: "/images/destinations/darma-valley1.webp",
    badge: "Panchachuli Base",
    badgeColor: "bg-emerald-600 text-white",
    altitude: "11,500 ft",
    highlights: ["Close View of 5 Panchachuli Peaks", "Traditional Rung Homestays", "Darma River Gorges & Waterfalls", "Tidang & Marchha Villages"],
    description: "Explore the untouched wilderness of Darma Valley right in front of the massive five peaks of Panchachuli with warm Bhotiya hospitality.",
  },
  {
    id: "ka-2",
    category: "kumaon-alpine",
    title: "Munsyari, Khaliya Top & Johar Valley",
    location: "Kathgodam → Munsyari → Khaliya Top Ridge",
    duration: "4D / 3N",
    price: "₹18,500",
    slug: "munsyari",
    type: "destination",
    image: "/images/destinations/khaliya-top.webp",
    badge: "Little Kashmir",
    badgeColor: "bg-stone-700 text-white",
    altitude: "11,500 ft",
    highlights: ["360° Panchachuli Mountain Vistas", "Khaliya Top Alpine Meadow", "Birthi Waterfalls 400 ft Drop", "Tribal Heritage Museum"],
    description: "The crown jewel of Kumaon. Breathtaking views of snow peaks, rhododendron forests, and peaceful Himalayan village life.",
  },
  {
    id: "ka-3",
    category: "kumaon-alpine",
    title: "Valley of Flowers & Hemkund Sahib",
    location: "Rishikesh → Govindghat → Ghangaria → Valley of Flowers",
    duration: "6D / 5N",
    price: "₹19,500",
    slug: "valley-of-flowers",
    type: "destination",
    image: "/images/destinations/valley-of-flowers.webp",
    badge: "UNESCO World Heritage",
    badgeColor: "bg-emerald-600 text-white",
    altitude: "14,400 ft",
    highlights: ["500+ Alpine Wildflower Species", "Sri Hemkund Sahib Glacial Lake", "Brahma Kamal & Blue Poppy", "Pushpawati River Canyon"],
    description: "Trek through a vibrant UNESCO floral sanctuary and take blessings at the world's highest Gurudwara nestled by a crystal-clear lake.",
  },
];

export const RelatedPackagesSection = memo(({
  currentSlug = "",
  onSelectDestination,
  onSelectPackage,
  onOpenInquiry,
}: RelatedPackagesSectionProps) => {
  const { language } = useLanguage();

  // Detect appropriate initial category based on the current page's slug
  const defaultCategory = useMemo<CircuitCategory>(() => {
    const slug = (currentSlug || "").toLowerCase();
    if (
      slug.includes("spiti") ||
      slug.includes("manali") ||
      slug.includes("shimla") ||
      slug.includes("dharamshala") ||
      slug.includes("mcleodganj") ||
      slug.includes("kasol") ||
      slug.includes("manikaran") ||
      slug.includes("jibhi") ||
      slug.includes("kinnaur") ||
      slug.includes("kalpa") ||
      slug.includes("chitkul") ||
      slug.includes("dalhousie") ||
      slug.includes("khajjiar") ||
      slug.includes("bir") ||
      slug.includes("solang") ||
      slug.includes("kufri")
    ) {
      return "himachal";
    }
    if (
      slug.includes("chardham") ||
      slug.includes("kedarnath") ||
      slug.includes("badrinath") ||
      slug.includes("gangotri") ||
      slug.includes("yamunotri")
    ) {
      return "chardham";
    }
    if (slug.includes("mansarovar") || slug.includes("aerial-kailash")) {
      return "mansarovar";
    }
    if (
      slug.includes("darma") ||
      slug.includes("munsyari") ||
      slug.includes("valley-of-flowers") ||
      slug.includes("khaliya")
    ) {
      return "kumaon-alpine";
    }
    return "adi-kailash";
  }, [currentSlug]);

  const [activeCategory, setActiveCategory] = useState<CircuitCategory>(defaultCategory);

  // Sync category whenever currentSlug changes
  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory, currentSlug]);

  // Contextual Header Titles based on selected/active category
  const headerContent = useMemo(() => {
    switch (activeCategory) {
      case "himachal":
        return {
          tag: language === "hi" ? "हिमाचल प्रदेश सर्किट व टूर पैकेज" : "Himachal Pradesh Scenic Circuits & Treks",
          heading: language === "hi" ? "हिमाचल प्रदेश" : "Himachal Pradesh",
          highlight: language === "hi" ? "टूर व रोमांचक पैकेज" : "Circuits & Hill Stations",
          sub:
            language === "hi"
              ? "स्पीति वैली 4x4, मनाली सोलंग एडवेंचर, शिमला हेरिटेज वॉक, धर्मशाला दलाई लामा मंदिर, कसोल व जिभी, किन्नौर एवं बीड़ बिलिंग।"
              : "Choose from Spiti 4x4 road trips, Manali snow passes, Shimla heritage strolls, Dharamshala Tibetan culture, Kasol & Jibhi, Kinnaur, and Bir Billing paragliding.",
        };
      case "chardham":
        return {
          tag: language === "hi" ? "पवित्र चार धाम व गढ़वाल सर्किट" : "Char Dham & Sacred Garhwal Circuits",
          heading: language === "hi" ? "चार धाम व केदारनाथ" : "Char Dham & Sacred",
          highlight: language === "hi" ? "यात्रा विकल्प" : "Garhwal Packages",
          sub:
            language === "hi"
              ? "संपूर्ण 4 धाम यात्रा, केदारनाथ ज्योतिर्लिंग ट्रेक, बद्रीनाथ महा अभिषेक, दो धाम एवं हेलीकॉप्टर दर्शन पैकेज।"
              : "Choose from Complete 4 Dham circuit, Kedarnath Jyotirlinga trek, Badrinath VIP Darshan, Do Dham combos, and Heli services.",
        };
      case "mansarovar":
        return {
          tag: language === "hi" ? "कैलाश मानसरोवर व सीमांत दर्शन" : "Kailash Mansarovar & Border Expeditions",
          heading: language === "hi" ? "कैलाश मानसरोवर" : "Kailash Mansarovar",
          highlight: language === "hi" ? "दर्शन व यात्राएं" : "Divine Expeditions",
          sub:
            language === "hi"
              ? "भारतीय क्षेत्र ओल्ड लिपुलेख दर्रे से दर्शन (बिना पासपोर्ट/वीजा), लखनऊ चार्टर फ्लाइट एवं तिब्बत ओवरलैंड परिक्रमा।"
              : "Explore Indian View from Old Lipulekh Pass (No China Visa), Lucknow Chartered aerial flights, and Tibet Overland parikrama.",
        };
      case "kumaon-alpine":
        return {
          tag: language === "hi" ? "कुमाऊं अल्पाइन ट्रेक व घाटियां" : "Kumaon Alpine Treks & Wilderness Valleys",
          heading: language === "hi" ? "कुमाऊं व गढ़वाल" : "Kumaon Alpine &",
          highlight: language === "hi" ? "रोमांचक वैली ट्रेक" : "Wilderness Treks",
          sub:
            language === "hi"
              ? "दारमा वैली पंचाचूली बेस, मुनस्यारी खलिया टॉप, यूनेस्को फूलों की घाटी एवं हेमकुंड साहिब पवित्र सरोवर ट्रेक।"
              : "Explore Darma Valley Panchachuli Base, Munsyari Khaliya Top ridge trek, UNESCO Valley of Flowers, and Hemkund Sahib.",
        };
      case "all":
        return {
          tag: language === "hi" ? "समस्त हिमालयी यात्रा व ट्रेक" : "All Himalayan Pilgrimage & Trek Circuits",
          heading: language === "hi" ? "समस्त हिमालयी" : "Explore All Sacred",
          highlight: language === "hi" ? "यात्रा पैकेज" : "Himalayan Circuits",
          sub:
            language === "hi"
              ? "आदि कैलाश, ॐ पर्वत, चार धाम, कैलाश मानसरोवर, हिमाचल प्रदेश एवं कुमाऊं अल्पाइन ट्रेक के सभी प्रमाणित 2027 यात्रा पैकेज।"
              : "Browse verified 2027 departure circuits across Adi Kailash, Om Parvat, Char Dham, Mansarovar, Himachal Pradesh, and Kumaon valleys.",
        };
      default:
        return {
          tag: language === "hi" ? "आदि कैलाश व ॐ पर्वत प्रस्थान विकल्प" : "Adi Kailash & Om Parvat Departure Circuits",
          heading: language === "hi" ? "आदि कैलाश व ॐ पर्वत" : "Adi Kailash & Om Parvat",
          highlight: language === "hi" ? "यात्रा विकल्प" : "Alternate Circuits",
          sub:
            language === "hi"
              ? "धारचूला डायरेक्ट, काठगोदाम रेलवे कनेक्ट, दिल्ली पिकअप, ॐ पर्वत दर्शन एवं प्रीमियम लग्जरी 4x4 कॉटेज पैकेज।"
              : "Choose from direct Dharchula departures, Kathgodam railway connections, Delhi pickups, and premium luxury SUV stays.",
        };
    }
  }, [activeCategory, language]);

  // Filter packages: filter by category AND filter out current page's slug
  const filteredPackages = useMemo(() => {
    let list = ALL_CIRCUIT_PACKAGES.filter((p) => {
      // Exclude exact matches with currentSlug
      if (currentSlug && p.slug === currentSlug) return false;
      return true;
    });

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Fallback: if category filter yields less than 2 items (e.g. current item was in that category), append other top packages
    if (list.length === 0) {
      list = ALL_CIRCUIT_PACKAGES.filter((p) => p.slug !== currentSlug);
    }

    return list;
  }, [activeCategory, currentSlug]);

  const handleCardClick = (pkg: CircuitPackage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (pkg.type === "package" && onSelectPackage) {
      onSelectPackage(pkg.slug);
    } else if (onSelectDestination) {
      onSelectDestination(pkg.slug);
    } else if (onSelectPackage) {
      onSelectPackage(pkg.slug);
    }
  };

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E2D3] bg-gradient-to-b from-[#FAF8F5] to-[#F5F2ED] rounded-3xl p-5 sm:p-8 md:p-10 shadow-xs">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E6E2D3] pb-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
              <Sparkles size={13} className="text-amber-700" />
              <span>{headerContent.tag}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1E293B] tracking-tight">
              {headerContent.heading}{" "}
              <span className="italic text-amber-800">
                {headerContent.highlight}
              </span>
            </h3>
            
            <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed max-w-2xl">
              {headerContent.sub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 bg-amber-50/80 px-3.5 py-2 rounded-xl border border-amber-200 shadow-xs">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span>100% SDM Inner Line Permits Managed</span>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2 shrink-0">
            <Filter size={14} className="text-amber-800" />
            <span>Filter Circuits:</span>
          </div>

          <button
            onClick={() => setActiveCategory("himachal")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "himachal"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-amber-50 border border-[#E6E2D3]"
            }`}
          >
            <Compass size={13} />
            <span>Himachal Circuits</span>
          </button>

          <button
            onClick={() => setActiveCategory("adi-kailash")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "adi-kailash"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-amber-50 border border-[#E6E2D3]"
            }`}
          >
            <Mountain size={13} />
            <span>Adi Kailash & Om Parvat</span>
          </button>

          <button
            onClick={() => setActiveCategory("chardham")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "chardham"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-amber-50 border border-[#E6E2D3]"
            }`}
          >
            <Landmark size={13} />
            <span>Char Dham & Kedarnath</span>
          </button>

          <button
            onClick={() => setActiveCategory("mansarovar")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "mansarovar"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-amber-50 border border-[#E6E2D3]"
            }`}
          >
            <Compass size={13} />
            <span>Kailash Mansarovar</span>
          </button>

          <button
            onClick={() => setActiveCategory("kumaon-alpine")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === "kumaon-alpine"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-amber-50 border border-[#E6E2D3]"
            }`}
          >
            <Flower2 size={13} />
            <span>Darma & Alpine Treks</span>
          </button>

          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-[#E6E2D3]"
            }`}
          >
            All ({ALL_CIRCUIT_PACKAGES.filter((p) => p.slug !== currentSlug).length})
          </button>
        </div>

        {/* Dynamic & Responsive Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[#E6E2D3] hover:border-amber-500/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group h-full"
              >
                {/* 1. Top Image Box */}
                <div
                  onClick={() => handleCardClick(pkg)}
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-800 cursor-pointer"
                >
                  <BlurUpImage
                    src={pkg.image}
                    blurDataURL={getDestinationBlurPlaceholder(pkg.slug || pkg.id)}
                    alt={pkg.title}
                    loading="lazy"
                    preset="card"
                    fallbackSrc="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1280&q=80"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Left Category/Origin Badge */}
                  {pkg.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md ${
                        pkg.badgeColor || "bg-amber-500 text-slate-950"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  {/* Top-Right Duration Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Bottom Route Path snippet */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium flex items-center gap-1.5 drop-shadow-md truncate">
                    <MapPin size={13} className="text-amber-400 shrink-0" />
                    <span className="truncate">{pkg.location}</span>
                  </div>
                </div>

                {/* 2. Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Altitude & Batch Availability */}
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-[#5A5A40]">
                      <span className="flex items-center gap-1 bg-[#F5F2ED] px-2 py-0.5 rounded-full border border-[#E6E2D3]">
                        <Mountain size={11} className="text-amber-800" /> {pkg.altitude}
                      </span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                        <CheckCircle2 size={11} /> 2027 Batch Ready
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      onClick={() => handleCardClick(pkg)}
                      className="text-base sm:text-lg font-serif font-bold text-[#1E293B] group-hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                    >
                      {pkg.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Highlights bullets */}
                    <div className="pt-1.5 space-y-1">
                      {pkg.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Card Pricing & Action Buttons */}
                  <div className="pt-3 border-t border-[#F5F2ED] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">All Inclusive</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-serif font-black text-slate-900">{pkg.price}</span>
                        <span className="text-[10px] text-slate-500 font-medium">/ yatri</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id={`view-related-btn-${pkg.id}`}
                        onClick={() => handleCardClick(pkg)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-900 focus-visible:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 border border-slate-800 hover:border-amber-700"
                        aria-label={`View itinerary and package details for ${pkg.title}`}
                      >
                        <span>View</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>

                      {onOpenInquiry && (
                        <button
                          type="button"
                          id={`inquire-related-btn-${pkg.id}`}
                          onClick={() => onOpenInquiry(pkg.title)}
                          className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 focus-visible:bg-amber-200 text-amber-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border border-amber-300/90 hover:border-amber-400 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 active:scale-95 shadow-2xs"
                          aria-label={`Inquire about ${pkg.title}`}
                        >
                          Inquire
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Guarantee Banner */}
        <div className="bg-white border border-[#E6E2D3] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Compass size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Need a Custom or Family Himalayan Itinerary?
              </p>
              <p className="text-[11px] text-slate-500">
                Direct local liaison from Dharchula HQ with custom pickups from Delhi, Dehradun, Pantnagar or Kathgodam.
              </p>
            </div>
          </div>

          {onOpenInquiry && (
            <button
              onClick={() => onOpenInquiry("Custom Himalayan Itinerary")}
              className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-xs"
            >
              Request Custom Route
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

RelatedPackagesSection.displayName = "RelatedPackagesSection";
