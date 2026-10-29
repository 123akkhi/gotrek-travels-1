import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Mountain,
  Package,
  BookOpen,
  FileText,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Compass,
  CornerDownLeft,
  Calendar,
  Layers,
  Phone,
  Plane,
  HeartPulse,
  History,
  Check
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { SEO_PAGES } from '../data/seoPagesData';
import { DEFAULT_BLOG_ARTICLES } from '../data/blogsData';

export type SearchResultType = 'destination' | 'package' | 'seo' | 'blog' | 'page' | 'utility';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: SearchResultType;
  slug?: string;
  target?: string;
  price?: string;
  duration?: string;
  badge?: string;
  keywords: string[];
  icon?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug: string) => void;
  onSelectSeoPage?: (slug: string) => void;
  onSelectBlog?: (slug: string) => void;
  onOpenClothingGuide?: () => void;
  onOpenTeamPage?: () => void;
  onOpenCareersPage?: () => void;
  onOpenAboutUsPage?: () => void;
  onOpenReelsPage?: () => void;
  onOpenMemoriesPage?: () => void;
  onOpenTermsPage?: () => void;
  onOpenPrivacyPage?: () => void;
  onOpenInquiry?: (subject?: string) => void;
  onGoHome?: () => void;
  onSelectPithoragarhFlights?: () => void;
  onOpenMedicalFitness?: () => void;
}

// Static Master Index for high-speed instant search across all app contents
const MASTER_SEARCH_INDEX: SearchResultItem[] = [
  // 1. Core Destinations
  {
    id: 'dest-adi-kailash',
    title: 'Adi Kailash & Om Parvat Yatra',
    subtitle: 'Chhota Kailash (14,500 ft), Parvati Sarovar, Gauri Kund & natural snow ॐ peak',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'adi-kailash',
    price: 'From ₹28,000',
    duration: '5D / 4N to 7D / 6N',
    badge: 'Most Revered',
    keywords: ['adi kailash', 'om parvat', 'chhota kailash', 'parvati sarovar', 'gaurikund', 'vyas gufa', 'gunji', 'nabhi', 'jolingkong', 'pithoragarh', 'kumaon', 'shiva']
  },
  {
    id: 'dest-kailash-mansarovar',
    title: 'Kailash Mansarovar View (Old Lipulekh Pass)',
    subtitle: 'Sacred darshan of Holy Mt. Kailash from Indian territory • 0% China Visa needed',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'kailash-mansarovar',
    price: 'From ₹42,000',
    duration: '7D / 6N',
    badge: '100% Indian Territory',
    keywords: ['kailash mansarovar', 'old lipulekh', 'lipu lekh', 'tibet view', 'china border', 'kailash darshan', 'holy peak', 'nabhidhang']
  },
  {
    id: 'dest-valley-of-flowers',
    title: 'Valley of Flowers & Hemkund Sahib Trek',
    subtitle: 'UNESCO World Heritage alpine flower valley and the sacred glacial Hemkund Lake',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'valley-of-flowers',
    price: 'From ₹18,500',
    duration: '6D / 5N',
    badge: 'UNESCO Heritage',
    keywords: ['valley of flowers', 'hemkund sahib', 'govindghat', 'ghangaria', 'gurudwara', 'brahmakamal', 'flowers', 'trek']
  },
  {
    id: 'dest-chardham',
    title: 'Char Dham Grand Circuit 2027',
    subtitle: 'Yamunotri, Gangotri, Kedarnath Jyotirlinga & Badrinath Dham complete yatra',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'chardham-yatra',
    price: 'From ₹32,000',
    duration: '10D / 9N',
    badge: 'All 4 Dhams',
    keywords: ['chardham', 'char dham', 'kedarnath', 'badrinath', 'gangotri', 'yamunotri', 'jyotirlinga', 'helicopter kedarnath']
  },
  {
    id: 'dest-do-dham',
    title: 'Kedarnath & Badrinath Do Dham Sacred Yatra',
    subtitle: 'Lord Shiva 11th Jyotirlinga & Lord Badri Vishal • Chopta Valley, Mana Village & VIP passes',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'do-dham-kedarnath-badrinath',
    price: 'From ₹22,500',
    duration: '6D / 5N',
    badge: 'Popular Do Dham',
    keywords: ['do dham', 'dodham', 'kedarnath badrinath', 'two dham', 'kedarnath and badrinath', 'do dham yatra', 'baba kedar', 'badri vishal', 'mana village']
  },
  {
    id: 'dest-yamunotri-gangotri-do-dham',
    title: 'Yamunotri & Gangotri Sacred River Do Dham',
    subtitle: 'Surya Kund, Kalindi Parvat, Bhagirathi Aarti & Harsil Valley apple orchards',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'yamunotri-dham',
    price: 'From ₹16,500',
    duration: '5D / 4N',
    badge: 'River Sources',
    keywords: ['yamunotri', 'gangotri', 'river origins', 'do dham', 'surya kund', 'harsil', 'barkot', 'uttarkashi']
  },
  {
    id: 'dest-kainchi-dham',
    title: 'Neem Karoli Baba Kainchi Dham Ashram',
    subtitle: 'Miraculous spiritual ashram of Maharaj-ji, sacred Hanuman temple & prasad',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'kainchi-dham',
    duration: '2D / 1N En Route',
    badge: 'Divine Blessings',
    keywords: ['kainchi dham', 'neem karoli baba', 'maharaj ji', 'bhowali', 'nainital', 'steve jobs', 'mark zuckerberg', 'hanuman chalisa']
  },
  {
    id: 'dest-chitai-golu-devta',
    title: 'Chitai Golu Devta Mandir',
    subtitle: 'The Supreme God of Justice & Temple of 10,000 Sacred Brass Bells in Almora',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'chitai-golu-devta',
    duration: 'Almora Circuit',
    badge: 'God of Justice',
    keywords: ['chitai golu devta', 'golu devta', 'brass bells', 'justice temple', 'almora', 'kumaon devta', 'nyay ke devta', 'petition temple']
  },
  {
    id: 'dest-jageshwar-dham',
    title: 'Jageshwar Dham Jyotirlinga Complex',
    subtitle: '124 ancient stone temples nestled in dense deodar forest, 8th sacred Jyotirlinga',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'jageshwar-dham',
    duration: 'Spiritual Stopover',
    badge: '8th Jyotirlinga',
    keywords: ['jageshwar dham', 'jageshwar', 'jyotirlinga', 'stone temples', 'maha mrityunjaya', 'deodar forest', 'chand kings', 'archaeological']
  },
  {
    id: 'dest-khaliya-top',
    title: 'Khaliya Top & Munsiyari Alpine Expedition',
    subtitle: 'Khaliya Bugyal (11,500 ft), Zero Point summit (12,200 ft), 360° Panchachuli panorama & Birthi Falls',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'khaliya-top',
    price: 'From ₹16,000',
    duration: '4D / 3N',
    badge: 'Zero Point Summit',
    keywords: ['khaliya top', 'khaliya bugyal', 'munsiyari', 'zero point', 'panchachuli', 'birthi falls', 'darkot', 'maheshwari kund', 'rhododendron', 'buransh', 'pithoragarh', 'trek']
  },
  {
    id: 'dest-kumaon-darshan',
    title: 'Complete Kumaon Darshan Sacred Heritage Circuit',
    subtitle: 'Kainchi Dham Neem Karoli Baba, Jageshwar 124 Jyotirlinga, Chitai Golu Devta, Patal Bhuvaneshwar, Kasar Devi & Baijnath',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'kumaon-darshan',
    price: 'From ₹24,500',
    duration: '6D / 5N',
    badge: 'Heritage Circuit',
    keywords: ['kumaon darshan', 'kumaon tour', 'kainchi dham', 'jageshwar dham', 'golu devta', 'patal bhuvaneshwar', 'kasar devi', 'baijnath', 'katarmal', 'kausani', 'ranikhet', 'almora', 'bageshwar']
  },
  {
    id: 'dest-patal-bhuvaneshwar',
    title: 'Patal Bhuvaneshwar Underground Cave',
    subtitle: 'Mystical subterranean limestone cave shrine housing the presence of 33 crore deities',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'patal-bhuvaneshwar',
    duration: 'Gangolihat Circuit',
    badge: 'Underground Wonder',
    keywords: ['patal bhuvaneshwar', 'cave temple', 'limestone cave', 'gangolihat', 'sheshnag', '33 crore devtas', 'underground', 'pithoragarh']
  },
  {
    id: 'dest-spiti-valley',
    title: 'Spiti Valley & Chandratal Lake Grand Circuit',
    subtitle: '1000-year Key Gompa, Moon Lake Chandratal, Hikkim, Chicham Bridge & Kunzum Pass',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'spiti-valley',
    price: 'From ₹22,500',
    duration: '7D / 6N',
    badge: 'Cold Desert',
    keywords: ['spiti valley', 'chandratal', 'spiti', 'kaza', 'key gompa', 'tabo', 'hikkim', 'chicham bridge', 'kunzum pass', 'himachal', 'cold desert']
  },
  {
    id: 'dest-manali-solang',
    title: 'Manali, Solang Valley & Atal Tunnel',
    subtitle: 'Atal Tunnel engineering marvel, Solang Valley adventure, Rohtang View & Hadimba Temple',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'manali-solang-lahaul',
    price: 'From ₹14,500',
    duration: '5D / 4N',
    badge: 'Snow & Adventure',
    keywords: ['manali', 'solang valley', 'atal tunnel', 'rohtang', 'sissu', 'lahaul', 'hadimba temple', 'vashisht', 'himachal adventure']
  },
  {
    id: 'dest-shimla-kufri',
    title: 'Shimla, Kufri & Chail Queen of Hills',
    subtitle: 'Mall Road, Christ Church, Jakhoo 108ft Hanuman, Kufri Snow View & Hatu Peak',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'shimla-kufri-chail',
    price: 'From ₹12,500',
    duration: '4D / 3N',
    badge: 'Queen of Hills',
    keywords: ['shimla', 'kufri', 'chail', 'narkanda', 'hatu peak', 'mall road', 'jakhoo temple', 'christ church', 'himachal heritage']
  },
  {
    id: 'dest-dharamshala-mcleodganj',
    title: 'Dharamshala, McLeodGanj & Triund Trek',
    subtitle: 'Dalai Lama Temple, Triund Snow Wall Trek (9,350 ft), Bhagsunag & Kangra Valley',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'dharamshala-mcleodganj',
    price: 'From ₹13,800',
    duration: '5D / 4N',
    badge: 'Little Lhasa',
    keywords: ['dharamshala', 'mcleodganj', 'triund', 'dalai lama', 'tibetan', 'bhagsunag', 'kangra', 'himachal trek']
  },
  {
    id: 'dest-kasol-manikaran',
    title: 'Kasol, Manikaran Sahib & Jibhi Valley',
    subtitle: 'Hot Springs, Parvati Valley riverside trails, Tosh wooden village & Serolsar Lake',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'kasol-manikaran-jibhi',
    price: 'From ₹14,200',
    duration: '5D / 4N',
    badge: 'Parvati Valley',
    keywords: ['kasol', 'manikaran', 'jibhi', 'parvati valley', 'tosh', 'chalal', 'serolsar lake', 'tirthan valley', 'himachal']
  },
  {
    id: 'dest-kinnaur-kalpa',
    title: 'Kinnaur Valley, Kalpa, Sangla & Chitkul',
    subtitle: 'Chitkul "Last Indian Village", Kinner Kailash Sacred Rock View & Sangla Valley',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'kinnaur-kalpa-sangla',
    price: 'From ₹19,800',
    duration: '6D / 5N',
    badge: 'Land of Gods',
    keywords: ['kinnaur', 'kalpa', 'sangla', 'chitkul', 'kinner kailash', 'baspa river', 'sarahan', 'himachal']
  },
  {
    id: 'dest-dalhousie-bir',
    title: 'Dalhousie, Khajjiar & Bir Billing Paragliding',
    subtitle: 'Khajjiar Mini Switzerland, World #2 Paragliding site Bir Billing & Baijnath Temple',
    category: 'Himachal Destination',
    type: 'destination',
    slug: 'dalhousie-khajjiar-bir',
    price: 'From ₹16,500',
    duration: '5D / 4N',
    badge: 'Paragliding Mecca',
    keywords: ['dalhousie', 'khajjiar', 'bir billing', 'paragliding', 'mini switzerland', 'baijnath', 'dainkund', 'himachal']
  },
  {
    id: 'dest-darma-valley',
    title: 'Darma Valley & Panchachuli Base Camp Trek',
    subtitle: 'Wild Dhauli Ganga canyon, traditional Bhotia tribal villages & glacier peaks at 13,800 ft',
    category: 'Sacred Destination',
    type: 'destination',
    slug: 'darma-valley',
    price: 'From ₹18,500',
    duration: '5D / 4N',
    badge: 'Panchachuli Glaciers',
    keywords: ['darma valley', 'panchachuli base camp', 'dhauli ganga', 'bhotia villages', 'dugti', 'dantu', 'sipu', 'glacier trek', 'pithoragarh']
  },
  {
    id: 'dest-pithoragarh-flights',
    title: 'Pithoragarh Travel Guide: Flights, Roadways Buses & Mountain Taxis',
    subtitle: 'Alliance Air flights (Delhi & Dehradun), UTC Roadways buses, shared jeeps & private cabs to Pithoragarh',
    category: 'Aviation & Transit',
    type: 'utility',
    target: 'flights',
    badge: 'Flights, Bus & Taxi',
    keywords: ['pithoragarh flights', 'naini saini airport', 'bus to pithoragarh', 'taxi to pithoragarh', 'shared taxi pithoragarh', 'utc roadways bus', 'delhi to pithoragarh bus', 'haldwani to pithoragarh taxi', 'tanakpur to pithoragarh', 'kathgodam taxi to pithoragarh', 'volvo bus', 'bolero cab', 'innova crysta', 'how to reach pithoragarh']
  },
  {
    id: 'payment-success-receipt',
    title: 'Payment Confirmation & Official Receipt Download',
    subtitle: 'View your confirmed Yatra booking, download PDF receipt, and print permit invoice',
    category: 'Billing & Permits',
    type: 'utility',
    target: 'payment-receipt',
    badge: 'Instant PDF',
    keywords: ['payment', 'receipt', 'download receipt', 'payment success', 'invoice', 'booking receipt', 'voucher', 'razorpay receipt', 'print receipt', 'bill', 'confirmation']
  },

  // 2. Verified 2027 Yatra Packages
  {
    id: 'pkg-standard',
    title: 'Adi Kailash Standard Package (4x4 Bolero Fleet)',
    subtitle: '5D/4N from Dharchula/Kathgodam with SDM permits, homestay, & sattvik meals',
    category: 'Yatra Package',
    type: 'package',
    slug: 'adi-kailash-yatra-standard',
    price: '₹28,000 / person',
    duration: '5 Days / 4 Nights',
    badge: 'Most Popular',
    keywords: ['standard package', '4x4 bolero', 'budget yatra', 'dharchula', 'kathgodam', 'nabhi homestay', 'gunji stay', 'permit included']
  },
  {
    id: 'pkg-premium',
    title: 'Premium Spiritual Expedition (VIP Isuzu 4x4)',
    subtitle: '7D/6N luxury expedition with private wooden cottages, oxygen backup & senior guide',
    category: 'Yatra Package',
    type: 'package',
    slug: 'adi-kailash-spiritual-expedition-premium',
    price: '₹45,000 / person',
    duration: '7 Days / 6 Nights',
    badge: 'VIP Luxury',
    keywords: ['premium package', 'vip expedition', 'isuzu 4x4', 'private cottage', 'oxygen cylinder', 'medical backup', 'luxury stay', 'kainchi stopover']
  },
  {
    id: 'pkg-helicopter',
    title: 'VIP Helicopter Darshan (Pithoragarh to Gunji)',
    subtitle: '3D/2N fast helicopter aerial shuttle ideal for senior devotees and families',
    category: 'Yatra Package',
    type: 'package',
    slug: 'adi-kailash-vip-luxury-helicopter',
    price: '₹1,20,000 / person',
    duration: '3 Days / 2 Nights',
    badge: 'Aerial Heli',
    keywords: ['helicopter package', 'heli darshan', 'pithoragarh helipad', 'gunji flight', 'senior citizens', 'fast darshan', 'air shuttle']
  },

  // 3. City-Wise Circuits & Dedicated Route Pages
  {
    id: 'seo-delhi',
    title: 'Adi Kailash Yatra from Delhi Direct',
    subtitle: 'Complete 7-day all-inclusive package with pickup from Delhi NCR, AC bus & 4x4 transit',
    category: 'City Route Circuit',
    type: 'seo',
    slug: 'adi-kailash-from-delhi',
    price: '₹34,000 / person',
    duration: '7 Days / 6 Nights',
    badge: 'Delhi NCR Pickup',
    keywords: ['delhi pickup', 'adi kailash from delhi', 'delhi to kathgodam', 'ncr departure', 'volvo transit', 'delhi yatra']
  },
  {
    id: 'seo-haldwani',
    title: 'Adi Kailash Yatra from Haldwani & Kathgodam',
    subtitle: '6-day direct train connection package from Kathgodam railway station',
    category: 'City Route Circuit',
    type: 'seo',
    slug: 'adi-kailash-yatra-from-haldwani',
    price: '₹29,500 / person',
    duration: '6 Days / 5 Nights',
    badge: 'Railway Connect',
    keywords: ['haldwani', 'kathgodam railway', 'ranikhet express', 'train pickup', 'pantnagar airport', 'direct route']
  },
  {
    id: 'seo-cost',
    title: 'Adi Kailash Yatra Cost & Pricing Breakdown 2027',
    subtitle: 'Transparent budget analysis: permits, 4x4 vehicle rent, homestays, meals & heli costs',
    category: 'Cost & Budget',
    type: 'seo',
    slug: 'adi-kailash-yatra-cost',
    badge: 'Budget Guide',
    keywords: ['cost', 'price', 'pricing', 'budget', 'charges', 'kmvn price', 'permit fees', 'how much cost', 'expense breakdown']
  },
  {
    id: 'seo-homestays',
    title: 'Gunji, Nabhi & Jolingkong Homestays Guide',
    subtitle: 'Warm wooden Kumaoni homestays, heaters, hot water, Wi-Fi & authentic local hospitality',
    category: 'Accommodation',
    type: 'seo',
    slug: 'gunji-nabhi-jolingkong-homestays',
    badge: 'Heritage Stays',
    keywords: ['homestay', 'nabhi cottage', 'gunji stay', 'jolingkong camp', 'kuti village', 'accommodation', 'hot water', 'heaters', 'food']
  },
  {
    id: 'seo-pithoragarh-heli',
    title: 'Pithoragarh Heli Services & Schedules',
    subtitle: 'Pithoragarh Naini Saini airport to Gunji helicopter flight bookings and rules',
    category: 'Aviation & Heli',
    type: 'seo',
    slug: 'pithoragarh-helicopter-services',
    badge: 'Heli Schedules',
    keywords: ['naini saini', 'pithoragarh heli', 'helicopter schedule', 'aviation', 'heli booking', 'gunji air service']
  },
  {
    id: 'seo-b2b',
    title: 'B2B Travel Agent Partner Desk',
    subtitle: 'Wholesale package allocations, SDM permit liaison & commission structures for travel agents',
    category: 'Partner Desk',
    type: 'seo',
    slug: 'b2b-travel-agent-partner-desk',
    badge: 'B2B Wholesale',
    keywords: ['b2b', 'travel agent', 'partner desk', 'wholesale rate', 'agency commission', 'bulk booking', 'dmc kumaon']
  },

  // 4. Essential Guides, Permits & Packing
  {
    id: 'guide-permit',
    title: 'Inner Line Permit (ILP) SDM Dharchula Guidelines',
    subtitle: 'How to obtain official police verification, SDM permits, and medical certificates in 48 hrs',
    category: 'Permits & Govt Rules',
    type: 'blog',
    slug: 'inner-line-permit-rules',
    badge: 'Mandatory Policy',
    keywords: ['inner line permit', 'ilp', 'sdm dharchula', 'police verification', 'notary affidavit', 'medical certificate', 'permit form', 'permit documents']
  },
  {
    id: 'guide-medical-fitness-checklist',
    title: 'Medical Fitness Checklist & Clearance Pass',
    subtitle: 'Interactive self-check: tick required options, verify fitness parameters and generate instant clearance pass or blank doctor form',
    category: 'Medical & Safety',
    type: 'utility',
    target: 'medical-fitness',
    badge: 'Interactive Pass',
    keywords: ['medical fitness', 'fitness checklist', 'medical pass', 'doctor form', 'clearance', 'bp', 'spo2', 'heart rate', 'health test', 'altitude clearance', 'fitness certificate', 'tick options']
  },
  {
    id: 'guide-clothing',
    title: 'What to Wear & High Altitude Packing Checklist',
    subtitle: '3-layer thermal clothing system, waterproof trekking boots, gloves, and medication checklist',
    category: 'Packing & Gear',
    type: 'utility',
    target: 'clothing',
    badge: 'Packing Essentials',
    keywords: ['what to wear', 'clothing', 'packing list', 'jackets', 'shoes', 'gloves', 'thermals', 'medicines', 'sunglasses', 'temperature clothing']
  },
  {
    id: 'guide-medical',
    title: 'High Altitude Medical Fitness & Acclimatization',
    subtitle: 'Preventing AMS (Acute Mountain Sickness), Diamox guidelines, oxygen cylinders & safety',
    category: 'Health & Safety',
    type: 'blog',
    slug: 'high-altitude-medical-oxygen-safety-guide',
    badge: 'Health Guide',
    keywords: ['medical fitness', 'ams', 'mountain sickness', 'altitude sickness', 'acclimatization', 'diamox', 'oxygen cylinder', 'blood pressure', 'heart patients']
  },
  {
    id: 'guide-complete-2027',
    title: 'Complete Guide to Adi Kailash & Om Parvat Yatra 2027',
    subtitle: 'Season dates (May-June & Sept-Oct), daily itineraries, route maps & photo spots',
    category: 'Comprehensive Guide',
    type: 'blog',
    slug: 'adi-kailash-om-parvat-guide-2027',
    badge: 'Official Guide',
    keywords: ['complete guide', 'best time to visit', 'route map', 'may batch', 'june batch', 'september batch', 'october batch', 'weather']
  },
  {
    id: 'guide-kailash-comparison',
    title: 'Adi Kailash vs Mt. Kailash Mansarovar (Tibet) Comparison 2027',
    subtitle: 'Costs (₹45k vs ₹2.5L), zero passport requirement, spiritual parity & 4x4 motorable roads',
    category: 'Pilgrimage Guide',
    type: 'blog',
    slug: 'adi-kailash-vs-mount-kailash-mansarovar-comparison',
    badge: 'Trending Top',
    keywords: ['adi kailash vs mt kailash', 'kailash mansarovar comparison', 'tibet vs india', 'china visa', 'passport', 'cost', 'skanda purana', 'chhota kailash']
  },
  {
    id: 'guide-om-parvat-miracle',
    title: 'The Miracle of Om Parvat & Nabhidhang: Sacred Geology & Legends',
    subtitle: 'Natural snow ॐ carving at 14,000 ft, Skanda Purana 8 Om peaks & Kalapani origin',
    category: 'Culture & Heritage',
    type: 'blog',
    slug: 'om-parvat-miracle-geology-mythology-nabhidhang',
    badge: 'Spiritual Wonder',
    keywords: ['om parvat', 'snow om', 'nabhidhang', 'miracle', 'geology', 'kalapani', 'vyas gufa', 'darshan timing', 'photography']
  },
  {
    id: 'guide-kainchi-jageshwar',
    title: 'Neem Karoli Baba Kainchi Dham & Jageshwar 124 Stone Temples Guide',
    subtitle: 'Maharaj-ji Ashram, Kasar Devi NASA magnetic vortex, Chitai Golu Devta & Almora circuit',
    category: 'Pilgrimage Guide',
    type: 'blog',
    slug: 'kainchi-dham-jageshwar-spiritual-circuit-guide',
    badge: 'Kumaon Circuit',
    keywords: ['kainchi dham', 'neem karoli baba', 'maharaj ji', 'jageshwar dham', 'kasar devi', 'golu devta', 'magnetic field', 'bhandara', 'almora']
  },
  {
    id: 'guide-panch-kedar',
    title: 'Complete Guide to Panch Kedar Yatra 2027: Kedarnath to Tungnath',
    subtitle: 'Trek all five Shiva abodes in Garhwal including highest Shiva temple at 12,073 ft',
    category: 'Trekking Guide',
    type: 'blog',
    slug: 'panch-kedar-yatra-trekking-guide-uttarakhand',
    badge: 'High Altitude Trek',
    keywords: ['panch kedar', 'kedarnath', 'tungnath', 'rudranath', 'madhyamaheshwar', 'kalpeshwar', 'chopta', 'chandrashila', 'shiva temples']
  },
  {
    id: 'guide-packing-checklist',
    title: 'High-Altitude Himalayan Packing List & 3-Layer Clothing Guide',
    subtitle: 'Merino wool thermals, Gore-Tex windproof jackets, boots, power banks & AMS medical kit',
    category: 'Medical & Safety',
    type: 'blog',
    slug: 'high-altitude-packing-list-clothing-guide-himalayas',
    badge: 'Packing Gear',
    keywords: ['packing list', 'clothing guide', '3 layer rule', 'boots', 'down jacket', 'power banks', 'altitude gear', 'gloves', 'socks']
  },
  {
    id: 'guide-rung-tribe',
    title: 'Bhotia & Rung Tribal Heritage of Vyas Valley & Kumaoni Cuisine',
    subtitle: 'Ancient Indo-Tibetan silk route, earthquake-proof wooden architecture, and Mandua/Jambu superfoods',
    category: 'Culture & Heritage',
    type: 'blog',
    slug: 'bhotia-rung-tribe-vyas-valley-heritage-cuisine',
    badge: 'Tribal Culture',
    keywords: ['bhotia', 'rung tribe', 'shauka', 'nabi village', 'wooden houses', 'mandua', 'kumaoni food', 'homestay', 'thulma wool']
  },

  // 5. Company & Trust Pages
  {
    id: 'page-about',
    title: 'About GoTrek Travels (Native Kumaoni Operators)',
    subtitle: 'Uttarakhand Tourism Registered (#UTTR/PITHORAGARH/04-2026/450066) • MSME Regd',
    category: 'Company & Trust',
    type: 'page',
    target: 'about',
    badge: 'Govt Registered',
    keywords: ['about gotrek', 'about us', 'founders', 'vinay gururani', 'dharchula office', 'native team', 'company registration', 'kumaon tourism']
  },
  {
    id: 'page-team',
    title: 'Meet Our Himalayan Expedition Team & Guides',
    subtitle: 'Local mountain captains, high-altitude sherpas, certified first-aid drivers & permit officers',
    category: 'Expedition Team',
    type: 'page',
    target: 'team',
    badge: 'Direct Mountain Staff',
    keywords: ['team', 'guides', 'sherpas', 'drivers', 'mountain captains', 'first aid team', 'local staff']
  },
  {
    id: 'page-careers',
    title: 'Careers & Hiring with GoTrek Travels 2027',
    subtitle: 'Join our high-altitude operations, tour management, 4x4 fleet dispatch, and yatra coordination',
    category: 'Hiring',
    type: 'page',
    target: 'careers',
    badge: 'We Are Hiring',
    keywords: ['careers', 'jobs', 'hiring', 'tour leader', 'guide jobs', 'travel consultant', 'join gotrek']
  },
  {
    id: 'page-terms',
    title: 'Terms, Conditions & Cancellation Policy',
    subtitle: 'Booking confirmation, refund rules, weather delay policies, and permit regulations',
    category: 'Legal Policy',
    type: 'page',
    target: 'terms',
    badge: 'Policy',
    keywords: ['terms and conditions', 'refund policy', 'cancellation', 'rescheduling', 'legal', 'force majeure', 'weather delay']
  },
  {
    id: 'page-reels',
    title: 'Yatra Reels & Real Darshan Videos',
    subtitle: 'High-altitude 9:16 vertical video reels & drone shots from Adi Kailash, Om Parvat & Parvati Sarovar',
    category: 'Sacred Media & Darshan',
    type: 'page',
    target: 'reels',
    badge: 'Trending Reels',
    keywords: ['reels', 'reel', 'video', 'videos', 'darshan video', 'drone shots', 'instagram', 'clips', 'live darshan', 'yatra reels', 'footage', 'youtube short']
  },
  {
    id: 'page-memories',
    title: 'Sacred Memories & HD Photo Gallery',
    subtitle: 'Photographic archive & high-resolution darshan captures up to 15,200 ft by Yatris and Sherpas',
    category: 'Sacred Media & Darshan',
    type: 'page',
    target: 'memories',
    badge: 'HD Gallery',
    keywords: ['memories', 'memory', 'photos', 'photo gallery', 'images', 'pictures', 'wallpaper', 'hd photos', 'gallery', 'camera', 'yatri photos']
  },
  {
    id: 'page-privacy',
    title: 'Privacy Policy & Data Security',
    subtitle: 'How your Aadhaar, police verification, and personal documents are safely handled for SDM permits',
    category: 'Security',
    type: 'page',
    target: 'privacy',
    badge: '100% Encrypted',
    keywords: ['privacy policy', 'data security', 'document safety', 'aadhaar security', 'permit privacy']
  },

  // 6. Interactive Yatra Features & Homepage Sections
  {
    id: 'section-health-guide',
    title: 'Yatra Health, AMS Triage & Altitude Safety Hub',
    subtitle: 'Acclimatization guidelines, SpO2 saturation rules, Diamox dosage & medical checklist',
    category: 'Medical & Safety',
    type: 'utility',
    target: 'section-health',
    badge: 'Altitude Guide',
    keywords: ['yatra health', 'altitude guide', 'ams symptoms', 'acclimatization tips', 'diamox protocol', 'spo2 level', 'medical checklist', 'first aid kit', 'mountain sickness', 'oxygen backup']
  },
  {
    id: 'section-weather-radar',
    title: 'Live Himalayan Weather Radar & Road Trail Status',
    subtitle: 'Real-time temperature, wind speed, snowfall forecast & route conditions from Dharchula to Lipulekh',
    category: 'Live Weather',
    type: 'utility',
    target: 'section-weather',
    badge: 'Real-Time Radar',
    keywords: ['live weather', 'weather radar', 'snowfall forecast', 'temperature', 'trail status', 'dharchula weather', 'gunji weather', 'jolingkong snow', 'road status']
  },
  {
    id: 'section-weather-pithoragarh',
    title: 'Pithoragarh Live Weather & Flight Radar (Naini Saini NGH)',
    subtitle: 'Live temperature, VFR runway visibility, crosswinds & cloud ceilings at Naini Saini Airport',
    category: 'Live Weather',
    type: 'utility',
    target: 'section-weather-pithoragarh',
    badge: 'Airport Radar',
    keywords: ['pithoragarh weather', 'pithoragarh live weather', 'weather in pithoragarh', 'naini saini weather', 'airport weather', 'flight visibility', 'pithoragarh temperature', 'pithoragarh forecast', 'ngh weather', 'aviation weather']
  },
  {
    id: 'section-route-elevation',
    title: 'Circuit Route Map & Altitude Elevation Profile',
    subtitle: 'Day-by-day topological road map from Kathgodam (1,700 ft) to Jolingkong (14,500 ft)',
    category: 'Route Map',
    type: 'utility',
    target: 'section-route',
    badge: 'Topographic Map',
    keywords: ['route map', 'elevation profile', 'day wise itinerary', 'trail map', 'dharchula to gunji', 'jolingkong altitude', 'offline map']
  },
  {
    id: 'section-yatra-countdown',
    title: '2027 Yatra Batches & Date Availability Live Tracker',
    subtitle: 'Check remaining seats and dates for May, June, September & October 2027 batches',
    category: 'Batches & Dates',
    type: 'utility',
    target: 'section-countdown',
    badge: '2027 Slots',
    keywords: ['batch availability', 'dates 2027', 'opening date', 'may batch', 'june batch', 'autumn batch', 'slots left', 'booking calendar', 'seat availability']
  },
  {
    id: 'section-reviews-faq',
    title: 'Verified Yatri Reviews & Pilgrimage FAQ Knowledgebase',
    subtitle: '500+ verified devotee reviews, solo traveler safety, food quality & essential permit FAQs',
    category: 'Reviews & FAQ',
    type: 'utility',
    target: 'section-faq',
    badge: '4.9/5 Rating',
    keywords: ['reviews', 'ratings', 'faq', 'frequently asked questions', 'food quality', 'solo woman safe', 'senior citizen age limit', 'yatri feedback', 'safety']
  }
];

// Synonyms and normalizations for ultra-smooth multi-term search
const SYNONYM_MAP: Record<string, string[]> = {
  heli: ['helicopter', 'air', 'shuttle', 'flight'],
  helicopter: ['heli', 'chopper', 'air', 'shuttle'],
  flights: ['pithoragarh', 'naini saini', 'fly91', 'aviation', 'airport', 'bus', 'taxi'],
  flight: ['pithoragarh', 'naini saini', 'fly91', 'aviation', 'airport'],
  bus: ['roadways', 'utc', 'anand vihar', 'isbt', 'pithoragarh', 'volvo'],
  taxi: ['cab', 'shared taxi', 'bolero', 'innova', 'kathgodam', 'haldwani', 'pithoragarh'],
  cab: ['taxi', 'car', 'bolero', 'scorpio', 'innova', 'kathgodam'],
  cost: ['price', 'pricing', 'budget', 'rate', 'charges', 'expense'],
  price: ['cost', 'pricing', 'budget', 'rate', 'package'],
  rates: ['price', 'cost', 'pricing'],
  stay: ['homestay', 'hotel', 'cottage', 'room', 'accommodation', 'gunji', 'nabi'],
  hotel: ['homestay', 'cottage', 'stay', 'accommodation'],
  homestay: ['hotel', 'cottage', 'stay', 'nabhi', 'gunji'],
  permit: ['ilp', 'inner line permit', 'sdm', 'police verification', 'affidavit'],
  ilp: ['permit', 'inner line permit', 'sdm', 'dharchula'],
  medical: ['fitness', 'doctor', 'certificate', 'ams', 'oxygen', 'altitude', 'diamox', 'health'],
  health: ['medical', 'altitude', 'ams', 'oxygen', 'diamox', 'spo2', 'fitness'],
  oxygen: ['altitude', 'medical', 'spo2', 'ams', 'cylinder', 'health'],
  ams: ['altitude', 'sickness', 'mountain', 'medical', 'diamox', 'oxygen'],
  dates: ['batch', 'schedule', 'opening', 'season', 'calendar'],
  batches: ['batch', 'dates', 'schedule', 'slots'],
  darshan: ['view', 'temple', 'peak', 'shrine', 'sacred'],
  delhi: ['ncr', 'pickup', 'bus', 'route'],
  haldwani: ['kathgodam', 'train', 'railway', 'station'],
  kathgodam: ['haldwani', 'train', 'railway'],
  chhota: ['adi', 'chhota kailash', 'parvati sarovar'],
  aadi: ['adi', 'adi kailash'],
  parwat: ['parvat', 'om parvat'],
  reviews: ['review', 'testimonial', 'feedback', 'yatri', 'rating'],
  weather: ['temperature', 'forecast', 'snow', 'rain', 'climate', 'radar', 'pithoragarh'],
  radar: ['weather', 'snow', 'temperature', 'pithoragarh'],
  pithoragarh: ['naini saini', 'flights', 'flight', 'airport', 'weather', 'heli']
};

const POPULAR_SEARCH_TAGS = [
  'Adi Kailash 2027',
  'Pithoragarh Live Weather',
  'SDM Dharchula Permit',
  'Om Parvat Helicopter',
  'Kailash Mansarovar View',
  'Yatra Health & AMS',
  'Live Weather Radar',
  'Packing List & Thermals',
  'Pithoragarh Flights',
  'Chitai Golu Devta',
  'Jageshwar Dham',
  'Delhi to Kathgodam',
  'Nabi Homestays'
];

const RECENT_SEARCHES_KEY = 'gotrek_recent_searches_v2';

const getStoredRecentSearches = (): string[] => {
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const storeRecentSearch = (term: string) => {
  if (!term || term.trim().length < 2) return;
  try {
    const clean = term.trim();
    const prev = getStoredRecentSearches().filter(s => s.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...prev].slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore quota errors
  }
};

// Safe highlight component for matched keywords
const HighlightMatch: React.FC<{ text: string; tokens: string[] }> = ({ text, tokens }) => {
  if (!text || !tokens.length) return <>{text}</>;

  const cleanTokens = tokens
    .map(t => t.trim().toLowerCase())
    .filter(t => t.length > 1);

  if (!cleanTokens.length) return <>{text}</>;

  const escaped = cleanTokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = cleanTokens.some(t => t === part.toLowerCase());
        return isMatch ? (
          <mark
            key={i}
            className="bg-amber-400/30 text-amber-300 font-extrabold px-0.5 rounded-xs"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
};

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onSelectPackage,
  onSelectSeoPage,
  onSelectBlog,
  onOpenClothingGuide,
  onOpenTeamPage,
  onOpenCareersPage,
  onOpenAboutUsPage,
  onOpenReelsPage,
  onOpenMemoriesPage,
  onOpenTermsPage,
  onOpenPrivacyPage,
  onOpenInquiry,
  onGoHome,
  onSelectPithoragarhFlights,
  onOpenMedicalFitness,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount & modal open
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getStoredRecentSearches());
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 60);
      document.body.classList.add('modal-lock');
    } else {
      document.body.classList.remove('modal-lock');
      setQuery('');
      setActiveIndex(0);
    }
    return () => {
      document.body.classList.remove('modal-lock');
    };
  }, [isOpen]);

  // Keyboard navigation: Escape to close, ArrowDown, ArrowUp, Enter to select
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[activeIndex]) {
          handleSelectResult(filteredResults[activeIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Token extraction and normalization
  const searchTokens = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return clean.split(/\s+/).filter(Boolean);
  }, [query]);

  // Scoring function: computes relevance for each item
  const scoreItem = (item: SearchResultItem, tokens: string[], fullQuery: string): number => {
    if (!tokens.length) return 10;

    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    const catLower = item.category.toLowerCase();
    const keywordsJoined = item.keywords.join(' ').toLowerCase();
    const badgeLower = (item.badge || '').toLowerCase();
    const priceLower = (item.price || '').toLowerCase();
    const durationLower = (item.duration || '').toLowerCase();
    const corpus = `${titleLower} ${subtitleLower} ${catLower} ${keywordsJoined} ${badgeLower} ${priceLower} ${durationLower}`;

    let score = 0;

    // Check if every token matches somewhere in the corpus (either directly or via synonym)
    const allTokensMatch = tokens.every(token => {
      if (corpus.includes(token)) return true;
      const syns = SYNONYM_MAP[token] || [];
      return syns.some(s => corpus.includes(s));
    });

    if (!allTokensMatch) return 0;

    // 1. Exact full query phrase matches
    if (titleLower === fullQuery) score += 500;
    else if (titleLower.startsWith(fullQuery)) score += 300;
    else if (titleLower.includes(fullQuery)) score += 180;
    else if (subtitleLower.includes(fullQuery)) score += 100;
    else if (keywordsJoined.includes(fullQuery)) score += 90;

    // 2. Token-specific matching bonuses
    for (const token of tokens) {
      if (titleLower.includes(token)) {
        score += 60;
        // Whole word bonus
        const wordRegex = new RegExp(`\\b${token}\\b`, 'i');
        if (wordRegex.test(titleLower)) score += 30;
      }
      if (keywordsJoined.includes(token)) score += 40;
      if (subtitleLower.includes(token)) score += 25;
      if (badgeLower.includes(token)) score += 30;
      if (catLower.includes(token)) score += 20;
      if (priceLower.includes(token)) score += 25;
      if (durationLower.includes(token)) score += 15;

      // Check synonyms
      const syns = SYNONYM_MAP[token] || [];
      for (const s of syns) {
        if (titleLower.includes(s)) score += 30;
        if (keywordsJoined.includes(s)) score += 20;
      }
    }

    return score;
  };

  // Compute live match counts for each category filter tab
  const categoryCounts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const tokens = cleanQuery ? cleanQuery.split(/\s+/).filter(Boolean) : [];

    const matchesQuery = (item: SearchResultItem) => {
      if (!cleanQuery) return true;
      return scoreItem(item, tokens, cleanQuery) > 0;
    };

    let all = 0;
    let destinations = 0;
    let packages = 0;
    let guides = 0;
    let about = 0;

    for (const item of MASTER_SEARCH_INDEX) {
      if (matchesQuery(item)) {
        all++;
        if (item.type === 'destination') destinations++;
        else if (item.type === 'package' || item.type === 'seo') packages++;
        else if (item.type === 'blog' || item.target === 'clothing' || (item.type === 'utility' && item.target?.startsWith('section-health'))) guides++;
        else if (item.type === 'page' || item.type === 'utility') about++;
      }
    }

    return { all, destinations, packages, guides, about };
  }, [query]);

  // Filter and Rank results
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const tokens = cleanQuery ? cleanQuery.split(/\s+/).filter(Boolean) : [];

    let items = MASTER_SEARCH_INDEX;

    // Apply category filter tab
    if (selectedFilter === 'destinations') {
      items = items.filter(i => i.type === 'destination');
    } else if (selectedFilter === 'packages') {
      items = items.filter(i => i.type === 'package' || i.type === 'seo');
    } else if (selectedFilter === 'guides') {
      items = items.filter(i => i.type === 'blog' || i.target === 'clothing' || (i.type === 'utility' && i.target?.startsWith('section-health')));
    } else if (selectedFilter === 'about') {
      items = items.filter(i => i.type === 'page' || (i.type === 'utility' && !i.target?.startsWith('section-health')));
    }

    if (!cleanQuery) {
      return items.slice(0, 10);
    }

    // Score and filter matching
    const scored: { item: SearchResultItem; score: number }[] = [];
    for (const item of items) {
      const score = scoreItem(item, tokens, cleanQuery);
      if (score > 0) {
        scored.push({ item, score });
      }
    }

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    return scored.map(s => s.item);
  }, [query, selectedFilter]);

  // Reset active index when query or filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query, selectedFilter]);

  // Smooth scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const handleSelectResult = (item: SearchResultItem) => {
    // Save to recent search history
    if (query.trim()) {
      storeRecentSearch(query.trim());
      setRecentSearches(getStoredRecentSearches());
    } else {
      storeRecentSearch(item.title);
      setRecentSearches(getStoredRecentSearches());
    }

    onClose();

    // Check for utility / interactive sections
    if (item.type === 'utility' && item.target) {
      if (item.target === 'flights' && onSelectPithoragarhFlights) {
        onSelectPithoragarhFlights();
        return;
      }
      if (item.target === 'clothing' && onOpenClothingGuide) {
        onOpenClothingGuide();
        return;
      }
      if (item.target === 'medical-fitness' && onOpenMedicalFitness) {
        onOpenMedicalFitness();
        return;
      }
      if (item.target === 'section-health') {
        if (onOpenMedicalFitness) {
          onOpenMedicalFitness();
        }
        return;
      }
      if (item.target === 'section-weather' || item.target === 'section-weather-pithoragarh') {
        if (onSelectPithoragarhFlights) {
          onSelectPithoragarhFlights();
        }
        return;
      }
      if (item.target === 'section-route') {
        if (onGoHome) onGoHome();
        setTimeout(() => {
          const el = document.getElementById('route');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }
      if (item.target === 'section-countdown') {
        if (onGoHome) onGoHome();
        setTimeout(() => {
          const el = document.getElementById('countdown-section') || document.querySelector('.fast-section section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }
      if (item.target === 'section-faq') {
        if (onGoHome) onGoHome();
        setTimeout(() => {
          const el = document.getElementById('faq');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }
      if (item.target === 'payment-receipt') {
        window.history.pushState({}, '', '/payment-success');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
    }

    // Standard routing
    if (item.type === 'destination' && item.slug) {
      if (onSelectDestination) onSelectDestination(item.slug);
    } else if (item.type === 'package' && item.slug) {
      if (onSelectPackage) onSelectPackage(item.slug);
    } else if (item.type === 'seo' && item.slug) {
      if (onSelectSeoPage) onSelectSeoPage(item.slug);
    } else if (item.type === 'blog' && item.slug) {
      if (onSelectBlog) onSelectBlog(item.slug);
    } else if (item.type === 'page') {
      if (item.target === 'about' && onOpenAboutUsPage) onOpenAboutUsPage();
      if (item.target === 'team' && onOpenTeamPage) onOpenTeamPage();
      if (item.target === 'careers' && onOpenCareersPage) onOpenCareersPage();
      if (item.target === 'terms' && onOpenTermsPage) onOpenTermsPage();
      if (item.target === 'privacy' && onOpenPrivacyPage) onOpenPrivacyPage();
      if (item.target === 'reels' && onOpenReelsPage) onOpenReelsPage();
      if (item.target === 'memories' && onOpenMemoriesPage) onOpenMemoriesPage();
    }
  };

  const handleQuickBook = (e: React.MouseEvent, item: SearchResultItem) => {
    e.stopPropagation();
    onClose();
    if (onOpenInquiry) {
      onOpenInquiry(item.title);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch {
      // Ignore
    }
  };

  const handleWhatsAppHelp = () => {
    const msg = encodeURIComponent(
      query
        ? `Namaste GoTrek! I am searching for "${query}" for Adi Kailash & Om Parvat Yatra 2027. Please assist me with routes, permits, and slots.`
        : `Namaste GoTrek! I would like assistance with Adi Kailash & Om Parvat Yatra 2027 packages and permits.`
    );
    window.open(`https://wa.me/917248285767?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Main Search Dialog Container */}
      <div 
        style={{ backgroundColor: '#090E1A' }}
        className="relative w-full sm:max-w-2xl md:max-w-3xl min-h-screen sm:min-h-0 sm:max-h-[88vh] sm:rounded-3xl border-0 sm:border border-amber-500/40 shadow-2xl text-slate-100 flex flex-col z-10 overflow-hidden ring-1 ring-amber-500/20"
      >
        {/* 1. Header & Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800/90 bg-[#060A14] flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Search size={17} />
              </div>
              <div>
                <h2 id="global-search-title" className="text-sm sm:text-base font-bold text-white leading-none">
                  Instant Himalayan Yatra Search
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                  Sacred shrines, 2027 packages, SDM permits, route maps & medical checklists
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
                <span>ESC</span> to close
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Search Input Box */}
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-amber-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 'Adi Kailash', 'Om Parvat Heli', 'SDM Permit', 'Kathgodam Route', 'AMS'..."
              className="w-full h-12 pl-11 pr-24 rounded-2xl bg-slate-900/95 border border-amber-500/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/25 text-white placeholder:text-slate-500 text-sm sm:text-base transition-all outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="absolute right-3 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Categories with Real-time Count Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'all', label: 'All Results', count: categoryCounts.all },
              { id: 'destinations', label: 'Sacred Shrines', count: categoryCounts.destinations },
              { id: 'packages', label: '2027 Packages', count: categoryCounts.packages },
              { id: 'guides', label: 'Permits & Health', count: categoryCounts.guides },
              { id: 'about', label: 'Routes & Team', count: categoryCounts.about },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedFilter === tab.id
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  selectedFilter === tab.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Search Results List / Suggestions Body */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2 overscroll-contain max-h-[52vh] sm:max-h-[50vh] focus:outline-none"
        >
          {/* Recent Searches (shown when query is empty and recent searches exist) */}
          {!query && recentSearches.length > 0 && (
            <div className="mb-4 pb-3 border-b border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <History size={13} />
                  <span>Recent Searches:</span>
                </span>
                <button
                  onClick={handleClearHistory}
                  className="text-slate-500 hover:text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Clear History
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-amber-500/20 hover:border-amber-400/50 hover:text-amber-300 text-slate-300 text-xs font-medium border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock size={11} className="text-slate-400" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredResults.length > 0 ? (
            <div className="space-y-1.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400/90 px-2 py-1 flex items-center justify-between">
                <span>{query ? `Showing ${filteredResults.length} matching results` : 'Featured Expeditions & Sacred Shrines'}</span>
                <span className="hidden sm:inline text-slate-500 font-normal">Navigate with ↑ ↓ • Press Enter to view</span>
              </div>

              {filteredResults.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 border text-left group select-none ${
                      isActive
                        ? 'bg-slate-800/95 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40'
                        : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Left Icon & Details */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.type === 'destination' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        item.type === 'package' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        item.type === 'seo' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                        item.type === 'blog' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        item.target === 'flights' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        item.target?.startsWith('section-health') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        'bg-slate-700/40 text-slate-300 border border-slate-600/30'
                      }`}>
                        {item.type === 'destination' && <Mountain size={18} />}
                        {item.type === 'package' && <Package size={18} />}
                        {item.type === 'seo' && <Compass size={18} />}
                        {item.type === 'blog' && <BookOpen size={18} />}
                        {item.type === 'page' && <ShieldCheck size={18} />}
                        {item.target === 'flights' && <Plane size={18} />}
                        {item.target?.startsWith('section-health') && <HeartPulse size={18} />}
                        {item.type === 'utility' && item.target !== 'flights' && !item.target?.startsWith('section-health') && <Sparkles size={18} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs sm:text-sm font-bold transition-colors ${
                            isActive ? 'text-amber-300' : 'text-white'
                          }`}>
                            <HighlightMatch text={item.title} tokens={searchTokens} />
                          </span>

                          {item.badge && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                              {item.badge}
                            </span>
                          )}

                          {item.price && (
                            <span className="text-[11px] font-black font-mono text-emerald-400 ml-auto sm:ml-0">
                              {item.price}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 group-hover:text-slate-200 mt-0.5 line-clamp-1">
                          <HighlightMatch text={item.subtitle} tokens={searchTokens} />
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 font-medium flex-wrap">
                          <span className="text-amber-400/90 font-bold uppercase tracking-wider">{item.category}</span>
                          {item.duration && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-slate-300">
                                <Clock size={11} className="text-slate-400" />
                                {item.duration}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="shrink-0 flex items-center gap-2 pl-2">
                      {(item.type === 'package' || item.type === 'destination') && onOpenInquiry && (
                        <button
                          onClick={(e) => handleQuickBook(e, item)}
                          className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-[11px] font-bold transition-colors cursor-pointer"
                          title="Inquire / Book this yatra directly"
                        >
                          <Calendar size={12} />
                          <span>Inquire</span>
                        </button>
                      )}

                      <div className="flex items-center gap-1 text-slate-400 group-hover:text-amber-400">
                        <span className="hidden sm:inline text-xs font-bold">Open</span>
                        <ChevronRight size={16} className={`transition-transform ${isActive ? 'translate-x-1 text-amber-400' : ''}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Empty State with intelligent fallbacks
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
                <Search size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  No direct matches for &ldquo;{query}&rdquo;
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Try searching for &ldquo;Adi Kailash&rdquo;, &ldquo;SDM Permit&rdquo;, &ldquo;Helicopter&rdquo;, &ldquo;Weather&rdquo;, or connect directly with our local Kumaon team.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleWhatsAppHelp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Ask Yatra Expert on WhatsApp</span>
                </button>
                <a
                  href="tel:+917248285767"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Phone size={13} className="text-amber-400" />
                  <span>Call +91 72482 85767</span>
                </a>
              </div>
            </div>
          )}

          {/* Popular Trending Queries when query is empty */}
          {!query && (
            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-2 px-1">
                <TrendingUp size={13} className="text-amber-400" />
                <span>Trending Pilgrimage Searches:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-amber-300 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Footer Bar with 24/7 Helpline & WhatsApp */}
        <div className="p-3.5 sm:p-4 bg-[#050811] border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>Govt Reg: <strong>UTTR/PITHORAGARH/04-2026/450066</strong> • MSME Regd</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleWhatsAppHelp}
              className="hover:text-emerald-400 flex items-center gap-1 text-[11px] font-bold text-slate-300 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
              <span>WhatsApp Us</span>
            </button>
            <span>•</span>
            <a
              href="tel:+917248285767"
              className="hover:text-amber-300 flex items-center gap-1 text-[11px] font-bold text-slate-300 transition-colors cursor-pointer"
            >
              <Phone size={11} className="text-amber-400" />
              <span>24/7 Support</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalSearchModal;
