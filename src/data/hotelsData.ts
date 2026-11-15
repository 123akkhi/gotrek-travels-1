import { HotelStayOption, LocationHotels } from "../types";

export interface AccommodationStay {
  id: string;
  name: string;
  hindiName?: string;
  tier: 'premium' | 'standard';
  tierBadge: string;
  location: string;
  altitude: string;
  image: string;
  rating: number;
  reviewsCount: number;
  packageInclusion: string;
  roomType: string;
  sharingType: string;
  amenities: string[];
  keyHighlights: string[];
  description: string;
}

export const ADI_KAILASH_HOTELS: AccommodationStay[] = [
  {
    id: "gunji-alpine-cottage",
    name: "Gunji Alpine Deluxe Wooden Cottages",
    hindiName: "गुंजी अल्पाइन डीलक्स वुडन कॉटेज",
    tier: "premium",
    tierBadge: "Premium Deluxe Stay",
    location: "Gunji Valley",
    altitude: "10,500 FT",
    image: "/hotels/Homestay/wooden-homestay-1.webp",
    rating: 4.9,
    reviewsCount: 148,
    packageInclusion: "Included in Premium 4x4 Package",
    roomType: "Insulated Pine-Wood Private Cottage",
    sharingType: "Double Sharing (Twin / King)",
    amenities: [
      "Electric Bed Warmers",
      "Attached Western Washroom",
      "24/7 Geyser Hot Water",
      "Oxygen Cylinder on Site",
      "24/7 Generator Power Backup",
      "Pure Sattvik Buffet Dining"
    ],
    keyHighlights: [
      "Heavy thermal insulation against sub-zero mountain night cold",
      "Private ensuite western bathroom with hot water",
      "Dedicated pulse-oximeter and high-altitude emergency oxygen station"
    ],
    description: "Handcrafted alpine pine-wood cottages nestled in the heart of Gunji valley, engineered with insulated double-walls, electric blankets, and attached western toilets for peak pilgrim comfort."
  },
  {
    id: "Gunji Dharchula",
    name: "Athithi Homestay",
    hindiName: "धारचूला रिवरसाइड ग्रैंड रिसॉर्ट",
    tier: "premium",
    tierBadge: "Premium Deluxe Hotel",
    location: "Dharchula Base",
    altitude: "3,000 FT",
    image: "/hotels/atithi homestay/atithi-homestay1.webp",
    rating: 4.9,
    reviewsCount: 210,
    packageInclusion: "Included in Premium 4x4 Package",
    roomType: "Deluxe River-Facing AC Room",
    sharingType: "Double Sharing",
    amenities: [
      "Air Conditioning & Heating",
      "Attached Luxury Bath",
      "Elevator Access",
      "Multi-Cuisine Vegetarian Dining",
      "Secure High-Speed WiFi"
    ],
    keyHighlights: [
      "Elevator access for senior citizens and luxury spring mattresses",
      "Dedicated permit documentation lounge and 24-hr room service"
    ],
    description: "A welcoming  high-altitude homestay in gunji- the last major halt before adi kaialsh and om parvat."
  },
  {
    id: "nabi-heritage-rung-cottage",
    name: "Nabi Heritage Rung Deluxe Wooden Stay",
    hindiName: "नाबी हेरिटेज रंग वुडन कॉटेज",
    tier: "premium",
    tierBadge: "Premium Deluxe Cottage",
    location: "Nabi Heritage Village",
    altitude: "10,200 FT",
    image: "/hotels/cp residency/cp-residency1.webp",
    rating: 4.8,
    reviewsCount: 165,
    packageInclusion: "Included in Premium Package",
    roomType: "Carved Deodar Wood Suite",
    sharingType: "Double Sharing",
    amenities: [
      "Electric Fleece Blankets",
      "Attached Western Toilet",
      "Instant Hot Geyser",
      "Organic Rung Community Kitchen",
      "Traditional Bukhari Fireplace",
      "Mountain Valley Balcony"
    ],
    keyHighlights: [
      "Master wood carvings following 200-year-old Rung tribal architecture",
      "Cozy heated beds with triple-quilt fleece protection",
      "Authentic farm-fresh Kumaoni meals: Madua roti, Pahadi Rajma, Gahat Dal"
    ],
    description: "A boutique wooden sanctuary in heritage Nabi village blending authentic high-Himalayan culture with modern western amenities and heating."
  },
  {
    id: "pithoragarh-valley-lodge",
    name: "Green Hills Hotel",
    tier: "premium",
    tierBadge: "Premium Deluxe Hotel",
    location: "Pithoragarh City",
    altitude: "5,350 FT",
    image: "/hotels/gold petals/gold-petal-1.webp",
    rating: 4.9,
    reviewsCount: 190,
    packageInclusion: "Included in Premium Package (Kathgodam/Pithoragarh)",
    roomType: "Panoramic Peak View Suite",
    sharingType: "Double Sharing",
    amenities: [
      "Plush Spring Mattresses",
      "Designer Rain Shower",
      "Electric Tea/Coffee Kettle",
      "24/7 Power Backup",
      "Pure Veg Buffet Breakfast"
    ],
    keyHighlights: [
      "Premium linens and hygienic sanitized bathrooms",
      "Convenient access to Naini Saini Airport and Chandak Hill"
    ],
    description: "Sweeping  views over the kumaon hills with spacious doublle rooms and  a peacefull stay for premium yatris."
  },
  {
    id: "Gunji homestay",
    name: "Kuber Homestay",
    tier: "standard",
    tierBadge: "Standard Village Homestay",
    location: "Nabi Heritage Village",
    altitude: "10,200 FT",
    image: "/hotels/ishwar/ishwar-1.webp",
    rating: 4.8,
    reviewsCount: 240,
    packageInclusion: "Included in Standard Yatra Package",
    roomType: "Clean & Cozy Homestay Room",
    sharingType: "Triple / Quad Sharing",
    amenities: [
      "Thick Himalayan Quilts",
      "Sanitized Western Toilet",
      "Bucket Hot Water Service",
      "Home-Cooked Sattvik Meals",
      "Herbal Mountain Ginger Tea",
      "Cultural Community Fire"
    ],
    keyHighlights: [
      "Live with indigenous Rung mountain families and experience genuine warmth",
      "Piping hot Sattvik thali made with high-altitude organic valley grains",
      "Clean sanitized bedding and clean western washrooms checked by GoTrek leads"
    ],
    description: "The authentic heart of high-altitude yatra hospitality. Sleep in spotless, traditional stone-and-timber village homes where local families welcome yatris like sacred guests."
  },
  {
    id: "khotel-shresth",
    name: "Hotel Shresth",
    tier: "standard",
    tierBadge: "Standard Verified TRH",
    location: "Pithoragarh",
    altitude: "2500 – 3000 FT",
    image: "/hotels/hotel shresth/hotel-shresth1.webp",
    rating: 4.7,
    reviewsCount: 180,
    packageInclusion: "Included in Standard Package",
    roomType: "Spacious Yatri Bedded Rooms",
    sharingType: "Triple / Quad Sharing",
    amenities: [
      "Government Verified Facility",
      "Clean Cotton Bedding",
      "Attached Sanitized Bath",
      "Hot Water Buckets",
      "Spacious Dining Hall",
      "Doctor-on-Call Desk"
    ],
    keyHighlights: [
      "Close proximity to ITBP transit medical station and Helipad",
      "Wholesome North-Indian & Kumaoni vegetarian buffet"
    ],
    description: "Reliable, government-authorized tourist rest house providing sturdy infrastructure, clean rooms, and immediate medical coordination across Gunji and Dharchula."
  },
  {
    id: "Pithoragarh",
    name: "Pithoragarh Valley",
    tier: "standard",
    tierBadge: "city base",
    location: "Pithoragarh(Head Quarter)",
    altitude: "14,500 FT",
    image: "/hotels/maa bhagwati/maa-bhagwati-1.webp",
    rating: 4.8,
    reviewsCount: 135,
    packageInclusion: "Included in All Adi Kailash Batches",
    roomType: "Insulated Alpine Huts / Swiss Tents",
    sharingType: "Dorm / Multi-Bed Alpine Sharing",
    amenities: [
      "Thermal Weatherproof Insulation",
      "Sub-Zero Sleeping Bags & Quilts",
      "Emergency Oxygen Stations",
      "24/7 Hot Herbal Ginger Tea",
      "Enclosed Bio-Toilets",
      "ITBP Border Post Security"
    ],
    keyHighlights: [
      "Closest stay point to sacred Adi Kailash mountain and Parvati Sarovar",
      "Equipped with portable medical oxygen concentrators for altitude relief",
      "Unforgettable star-gazing and crystal clear morning view of Chhota Kailash"
    ],
    description: "The highest outpost on the Adi Kailash circuit. Specially engineered multi-layered weather shelter positioned just 2.5 km from the base of Lord Shiva's holy peak."
  },
  {
    id: "kuti-village-stone-homestay",
    name: "Kuti Village Ancient Heritage Homestay",
    hindiName: "कुटी ग्राम प्राचीन हेरिटेज होमस्टे",
    tier: "standard",
    tierBadge: "Standard Authentic Stay",
    location: "Kuti Valley",
    altitude: "12,300 FT",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.8,
    reviewsCount: 110,
    packageInclusion: "Included in Extended Circuit Packages",
    roomType: "Centuries-Old Stone & Wood Home",
    sharingType: "Triple Sharing",
    amenities: [
      "Wood-Fired Bukhari Room Heating",
      "Warm Woolen Mattresses",
      "Clean Western Toilet",
      "Organic Village Food",
      "High-Altitude Solar Hot Water",
      "Kunti Temple Darshan Access"
    ],
    keyHighlights: [
      "Stay in the legendary village named after Mata Kunti from the Mahabharata",
      "Traditional Himalayan wood stoves keeping rooms comfortably warm",
      "Direct views of Nama and Kuti glacial peaks"
    ],
    description: "Step back in time in the last inhabited Indian village before the Indo-Tibetan border, sheltered by ancient stone walls, warm wood-fire stoves, and peerless serenity."
  },
  {
    id: "vyas-valley-swiss-camps",
    name: "Vyas Valley Alpine Swiss Glamping Resort",
    hindiName: "व्यास वैली अल्पाइन स्विस ग्लैम्पिंग रिसॉर्ट",
    tier: "premium",
    tierBadge: "Premium Luxury Glamping",
    location: "Upper Gunji Helipad",
    altitude: "10,600 FT",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.9,
    reviewsCount: 132,
    packageInclusion: "Included in VIP Helicopter / Luxury 4x4",
    roomType: "Heated Luxury Swiss Alpine Tent",
    sharingType: "Double Sharing",
    amenities: [
      "Electric Heated Mattresses",
      "Attached Western Tiled Bath",
      "Instant 25L Hot Water Geyser",
      "Dedicated Medical Oxygen Point",
      "Panoramic Himalayan Glass Dining",
      "Carpeted Weatherproof Flooring"
    ],
    keyHighlights: [
      "Luxurious insulated Swiss weather tents with 360-degree high-Himalayan skyline",
      "Private attached western bathroom with high-pressure hot shower",
      "Close proximity to Gunji VIP helipad and ITBP medical dispensary"
    ],
    description: "State-of-the-art alpine glamping tents constructed with heavy multi-layer wind insulation, private en-suite tiled bathrooms, and panoramic glass dining facing the Vyas peaks."
  },
  {
    id: "kathgodam-gateway-heritage",
    name: "Kathgodam Gateway Heritage Hotel",
    hindiName: "काठगोदाम गेटवे हेरिटेज होटल",
    tier: "premium",
    tierBadge: "Premium Gateway Hotel",
    location: "Kathgodam Hub",
    altitude: "1,800 FT",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.8,
    reviewsCount: 220,
    packageInclusion: "Included in All Premium Ex-Kathgodam Batches",
    roomType: "Grand Deluxe Executive Suite",
    sharingType: "Double Sharing",
    amenities: [
      "Central AC & Temperature Control",
      "Express Railway Transfer",
      "High-Speed Wi-Fi",
      "Buffet Breakfast & Dinner",
      "Elevator & Valet Parking",
      "Luggage Cloakroom Facility"
    ],
    keyHighlights: [
      "Located just 3 minutes from Kathgodam Railway Station for effortless arrival",
      "Express check-in and secure luggage locker room for extra city bags",
      "Lavish vegetarian dining preparing yatris for the sacred journey ahead"
    ],
    description: "The premier staging hotel in Kathgodam foothills. Unwind after your train journey in plush air-conditioned rooms before meeting your GoTrek 4x4 convoy."
  },
  {
    id: "chaukori-panchachuli-retreat",
    name: "Chaukori Himalayan Snow-View Retreat",
    hindiName: "चौकोड़ी हिमालयन स्नो-व्यू रिट्रीट",
    tier: "premium",
    tierBadge: "Premium Mountain Retreat",
    location: "Chaukori Pine Ridge",
    altitude: "6,600 FT",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.9,
    reviewsCount: 175,
    packageInclusion: "Included in Extended Kumaon Heritage Package",
    roomType: "Pine Valley Chalet",
    sharingType: "Double Sharing",
    amenities: [
      "Panchachuli Sunrise Balcony",
      "Room Heating & Tea Kettle",
      "Attached Western Washroom",
      "Organic Tea Garden Stroll",
      "Bonfire Lounge",
      "Pure Sattvik Kumaoni Kitchen"
    ],
    keyHighlights: [
      "Witness gold-tinted sunrise over the 5 sacred peaks of Panchachuli from your bed",
      "Surrounded by emerald virgin deodar and pine forests with tranquil air",
      "Ideal intermediate acclimatization stop between Kathgodam and Dharchula"
    ],
    description: "Nestled amidst tea gardens and fragrant pine ridges in Chaukori, offering jaw-dropping unobstructed panoramas of Nanda Devi and Panchachuli."
  },
  {
    id: "garbyang-heritage-lodge",
    name: "Garbyang Heritage Travelers Lodge",
    hindiName: "गर्ब्यांग हेरिटेज ट्रेवलर्स लॉज",
    tier: "standard",
    tierBadge: "Standard Mountain Lodge",
    location: "Garbyang Village",
    altitude: "7,800 FT",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.7,
    reviewsCount: 95,
    packageInclusion: "Included in Standard Yatra Package",
    roomType: "Traditional Pine Bedded Rooms",
    sharingType: "Triple / Quad Sharing",
    amenities: [
      "Heavy Woolen Blankets",
      "Attached Clean Bathroom",
      "Warm Herbal Ginger Tea",
      "Home-Style Thali Service",
      "Solar Lighting Backup",
      "Medical First-Aid Kit"
    ],
    keyHighlights: [
      "Historic halt in the legendary 'Sinking Village' of Kumaon with unique geology",
      "Warm wooden interior panels shielding against mountain winds",
      "Piping hot fresh dinner cooked by local family hosts"
    ],
    description: "An authentic alpine stopover steeped in Indo-Tibetan trade history. Offers sturdy timber architecture, clean beds, and nourishing hot meals."
  },
  {
    id: "budhi-pine-yatri-camp",
    name: "Budhi High-Pine Homestay & Yatri Halt",
    hindiName: "बूढ़ी हाई-पाइन होमस्टे एवं यात्री पड़ाव",
    tier: "standard",
    tierBadge: "Standard Transit Stay",
    location: "Budhi Ascent Halt",
    altitude: "8,900 FT",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.6,
    reviewsCount: 88,
    packageInclusion: "Included in Standard Yatra Package",
    roomType: "Cozy Wooden Bunk & Family Rooms",
    sharingType: "Triple / Multi Sharing",
    amenities: [
      "Quilted Thermal Bedding",
      "Clean Western Toilet",
      "Hot Bucket Water",
      "Wood Fire Dining Area",
      "Mineral Spring Water",
      "ITBP Coordination Desk"
    ],
    keyHighlights: [
      "Vital acclimatization stop located right before the steep Chhialekh climb",
      "Calming sounds of gushing glacial stream and towering pine canopies",
      "Nourishing hot Dal, Rice, Subzi, and Phulkas served continuously"
    ],
    description: "Peaceful alpine haven positioned at the base of the thrilling Chhialekh zig-zag pass, providing crucial rest and hydration before climbing past 10,000 feet."
  },
  {
    id: "dharchula-kailash-yatri-bhawan",
    name: "Dharchula Kailash Yatri Bhawan",
    hindiName: "धारचूला कैलाश यात्री भवन",
    tier: "standard",
    tierBadge: "Standard Pilgrim Bhawan",
    location: "Dharchula Market",
    altitude: "3,000 FT",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.7,
    reviewsCount: 160,
    packageInclusion: "Included in Standard Yatra Package",
    roomType: "Clean Double & Triple Sharing Rooms",
    sharingType: "Triple Sharing",
    amenities: [
      "Western Clean Bathrooms",
      "24/7 Running Water & Geyser",
      "Large Satsang / Prayer Hall",
      "Sattvik Pure Veg Kitchen",
      "Permit Verification Counter",
      "Luggage Storage"
    ],
    keyHighlights: [
      "Walkable distance to SDM Dharchula permit office and local market",
      "Specialized prayer hall for Morning Shiv Aarti before departures",
      "Sanitized rooms with dedicated locker storage for non-trekking gear"
    ],
    description: "Clean, purpose-built pilgrim accommodation in Dharchula town offering comfortable beds, dependable hot water, and a peaceful prayer hall for yatris."
  },
  {
    id: "kalapani-border-view-rest",
    name: "Kalapani Kali Mandir Pilgrim Rest",
    hindiName: "कालापानी काली मंदिर विश्राम गृह",
    tier: "standard",
    tierBadge: "High-Altitude Sacred Stay",
    location: "Kalapani Kali Temple",
    altitude: "11,800 FT",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.8,
    reviewsCount: 115,
    packageInclusion: "Included in All Adi Kailash & Om Parvat Yatras",
    roomType: "Alpine Insulated Yatri Dormitory",
    sharingType: "Multi-Bed Heated Dorm",
    amenities: [
      "Thick Feather Quilts",
      "24/7 ITBP Medical Post Nearby",
      "Hot Kali Spring Darshan Access",
      "Fresh Khichdi & Halwa Prasad",
      "Oxygen Concentrators on Standby",
      "Sacred Temple Aarti Entry"
    ],
    keyHighlights: [
      "Located adjacent to the divine origin shrine of the sacred Kali River",
      "Immediate assistance from ITBP high-altitude paramedical staff",
      "Magnificent vistas of Mount Vyas and the historic ancient pine groves"
    ],
    description: "A deeply spiritual high-altitude transit stay next to the sacred Kali Temple origin spring at 11,800 ft, featuring warm thermal quilts and emergency oxygen readiness."
  }
];

export const HOTELS_BY_LOCATION: LocationHotels[] = [
  {
    locationSlug: "dharchula",
    locationName: "Dharchula Staging Base",
    circuit: "Adi Kailash & Om Parvat Gateway",
    altitude: "3,000 FT",
    overview: "Sub-tropical valley base on Kali River bank before entering high altitude Inner Line Permit zone.",
    standardStay: {
      id: "std-dharchula",
      name: "KMVN Tourist Rest House Dharchula",
      tier: "standard",
      location: "Dharchula Market",
      altitude: "3,000 FT",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.7,
      reviewsCount: 165,
      tagline: "Government Verified Yatri Rest House",
      roomTypes: ["Twin Sharing", "Triple Sharing Room"],
      amenities: ["Clean Linen", "Attached Bathroom", "Geyser Hot Water", "In-House Canteen", "Parking"],
      mealsIncluded: "Wholesome Pure Veg Sattvik Buffet",
      heatingFacility: "Comfortable Cotton Quilts",
      washroomType: "Attached Western Toilet",
      oxygenAvailable: true,
      idealFor: "Budget & Standard Pilgrims",
      standardPriceNote: "Included in Standard Yatra",
      address: "Near SDM Office, Main Market, Dharchula",
      highlights: ["Central location", "Immediate permit filing access", "Doctor on call"]
    },
    premiumStay: {
      id: "prem-dharchula",
      name: "Dharchula Riverside Grand Resort & Palace",
      tier: "premium",
      location: "Riverside Road, Dharchula",
      altitude: "3,000 FT",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.9,
      reviewsCount: 210,
      tagline: "Luxury Kali River Balcony Hotel",
      roomTypes: ["Deluxe River View AC Room", "Executive Suite"],
      amenities: ["River Balcony", "Air Conditioning & Room Heater", "Elevator", "24/7 Hot Water", "WiFi", "Multi-Cuisine Veg Dining"],
      mealsIncluded: "Lavish Buffet Breakfast & Dinner",
      heatingFacility: "Electric Room Heaters & Heated Blankets",
      washroomType: "Luxury Ensuite Western Bath with Geyser",
      oxygenAvailable: true,
      idealFor: "Family Groups & Senior Citizens",
      standardPriceNote: "Included in Premium Package",
      address: "Kali Riverfront Road, Dharchula",
      highlights: ["Unobstructed Kali river view into Nepal", "Elevator access", "Luxury spring beds"]
    }
  },
  {
    locationSlug: "gunji",
    locationName: "Gunji Alpine Valley",
    circuit: "High Altitude Acclimatization Hub",
    altitude: "10,500 FT",
    overview: "Strategic Himalayan junction where Vyas Valley meets Kuti Valley, equipped with ITBP hospital and helipad.",
    standardStay: {
      id: "std-gunji",
      name: "Gunji Village Homestay & Yatri Niwas",
      tier: "standard",
      location: "Gunji Village",
      altitude: "10,500 FT",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.8,
      reviewsCount: 140,
      tagline: "Warm Kumaoni Community Homestay",
      roomTypes: ["Triple Sharing", "Four-Bed Family Dorm"],
      amenities: ["Thick Heavy Quilts", "Sanitized Bio-Toilet", "Hot Water Buckets", "Wood-Fired Bukhari", "Herbal Tea"],
      mealsIncluded: "Hot Organic Pahadi Thali",
      heatingFacility: "Wood-Fired Room Stove & Heavy Quilts",
      washroomType: "Enclosed Western Bio-Toilet",
      oxygenAvailable: true,
      idealFor: "Cultural Immersion Yatris",
      standardPriceNote: "Included in Standard Yatra",
      address: "Main Village Square, Gunji",
      highlights: ["Authentic Rung family hospitality", "Homegrown organic meals", "Close to ITBP dispensary"]
    },
    premiumStay: {
      id: "prem-gunji",
      name: "Gunji Alpine Deluxe Wooden Cottages",
      tier: "premium",
      location: "Upper Gunji Alpine Meadow",
      altitude: "10,500 FT",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.9,
      reviewsCount: 175,
      tagline: "Insulated Pine-Wood Heated Cottages",
      roomTypes: ["Private Pine Cottage", "Deluxe Twin Suite"],
      amenities: ["Electric Bed Warmers", "Attached Western Washroom", "24/7 Power Backup", "Instant Hot Geyser", "Emergency Oxygen Cylinder"],
      mealsIncluded: "Gourmet Sattvik Dining",
      heatingFacility: "Electric Thermal Bed Warmers + Heavy Insulation",
      washroomType: "Private Attached Western Bathroom",
      oxygenAvailable: true,
      idealFor: "Maximum Comfort & Warmth",
      standardPriceNote: "Included in Premium Package",
      address: "Gunji Meadow Heights, Vyas Valley",
      highlights: ["Sub-zero night thermal insulation", "Private hot water ensuite bathroom", "Dedicated medical oxygen on site"]
    }
  },
  {
    locationSlug: "nabi",
    locationName: "Nabi Heritage Village",
    circuit: "Rung Cultural Epicenter",
    altitude: "10,200 FT",
    overview: "Fairy-tale alpine village famous for intricately carved deodar wooden homes and view of Mount Annapurna peaks.",
    standardStay: {
      id: "std-nabi",
      name: "Nabi Traditional Rung Homestay",
      tier: "standard",
      location: "Nabi Village",
      altitude: "10,200 FT",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.8,
      reviewsCount: 220,
      tagline: "Heart of Kumaoni Heritage",
      roomTypes: ["Traditional Wooden Room", "Triple Sharing"],
      amenities: ["Organic Food", "Hot Herbal Water", "Thick Quilts", "Sanitized Washrooms", "Night Bonfire"],
      mealsIncluded: "Traditional 5-Course Sattvik Meals",
      heatingFacility: "Traditional Bukhari Stove",
      washroomType: "Clean Western Washroom",
      oxygenAvailable: true,
      idealFor: "All Devotees",
      standardPriceNote: "Included in Standard Yatra",
      address: "Heritage Lane, Nabi Village",
      highlights: ["Direct interaction with village elders", "Freshly baked mandua rotis", "Warm community spirit"]
    },
    premiumStay: {
      id: "prem-nabi",
      name: "Nabi Heritage Rung Deluxe Wooden Stay",
      tier: "premium",
      location: "Nabi Viewpoint",
      altitude: "10,200 FT",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.9,
      reviewsCount: 165,
      tagline: "Boutique Deodar Wood Cottage",
      roomTypes: ["Heated Wooden Suite", "King Mountain View"],
      amenities: ["Electric Fleece Blankets", "Private Ensuite Bath", "Geyser Hot Water", "Balcony View", "Doctor Support"],
      mealsIncluded: "Sattvik Buffet with pahadi specialties",
      heatingFacility: "Electric Thermal Blankets",
      washroomType: "Ensuite Western Toilet with Geyser",
      oxygenAvailable: true,
      idealFor: "Premium Pilgrims & Couples",
      standardPriceNote: "Included in Premium Package",
      address: "Upper Nabi Village, Vyas Valley",
      highlights: ["Deodar wood aroma and insulation", "Private ensuite washroom", "Magnificent mountain valley balcony"]
    }
  },
  {
    locationSlug: "jolingkong",
    locationName: "Jolingkong Alpine Base",
    circuit: "Adi Kailash & Parvati Sarovar Sanctum",
    altitude: "14,500 FT",
    overview: "Closest base to holy Adi Kailash mountain and sacred Parvati Sarovar, beneath towering glaciated moraines.",
    standardStay: {
      id: "std-jolingkong",
      name: "Jolingkong Alpine High-Altitude Haven",
      tier: "standard",
      location: "Jolingkong Base",
      altitude: "14,500 FT",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.8,
      reviewsCount: 135,
      tagline: "Base Camp Next to Mount Adi Kailash",
      roomTypes: ["Insulated Alpine Huts", "Multi-Bed Dorm"],
      amenities: ["Sub-Zero Sleeping Bags", "Hot Ginger Water", "Enclosed Bio-Toilets", "Emergency Oxygen", "ITBP Checkpoint"],
      mealsIncluded: "Hot Khichdi, Soups & Sattvik Meals",
      heatingFacility: "Sub-Zero Thermal Sleeping Bags & Quilts",
      washroomType: "Enclosed Western Bio-Toilets",
      oxygenAvailable: true,
      idealFor: "Darshan at Parvati Sarovar",
      standardPriceNote: "Included in All Packages",
      address: "Parvati Sarovar Approach, Jolingkong",
      highlights: ["Only 2.5 km from Adi Kailash base", "Medical oxygen concentrators on site", "Priceless sunrise view of holy peak"]
    },
    premiumStay: {
      id: "prem-jolingkong",
      name: "Jolingkong Deluxe Weatherproof Alpine Camp",
      tier: "premium",
      location: "Jolingkong Plateau",
      altitude: "14,500 FT",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=75&fm=webp",
      rating: 4.9,
      reviewsCount: 150,
      tagline: "Insulated Swiss Dome Alpine Tents",
      roomTypes: ["Double Insulated Swiss Tent", "Private Cottage Bed"],
      amenities: ["Heavy Thermal Insulation", "Private Thermal Bedding", "Hot Water Bottles", "Oxygen Concentrator", "Hot Sattvik Meals"],
      mealsIncluded: "Nutritious High-Altitude Hot Cuisine",
      heatingFacility: "Double-Layer Windproof Thermal Insulation",
      washroomType: "Private Sanitized Camp Toilet Tent",
      oxygenAvailable: true,
      idealFor: "Maximum Comfort at Extreme Altitude",
      standardPriceNote: "Included in Premium Package",
      address: "Jolingkong Plateau, Vyas Valley",
      highlights: ["Unobstructed night sky & Adi Kailash vistas", "Personal oxygen assistance", "Thermal bed liners"]
    }
  }
];
