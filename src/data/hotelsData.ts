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
    image: "/public/hotels/Homestay/wooden-homestay-1.webp",
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
    id: "Nabi Homests",
    name: "Dharchula Riverside Grand Resort & Hotel",
    hindiName: "धारचूला रिवरसाइड ग्रैंड रिसॉर्ट",
    tier: "premium",
    tierBadge: "Premium Deluxe Hotel",
    location: "Dharchula Base",
    altitude: "3,000 FT",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.9,
    reviewsCount: 210,
    packageInclusion: "Included in Premium 4x4 Package",
    roomType: "Deluxe River-Facing AC Room",
    sharingType: "Double Sharing",
    amenities: [
      "Kali River View Balcony",
      "Air Conditioning & Heating",
      "Attached Luxury Bath",
      "Elevator Access",
      "Multi-Cuisine Vegetarian Dining",
      "Secure High-Speed WiFi"
    ],
    keyHighlights: [
      "Spectacular balcony view across the roaring Kali river towards Nepal hills",
      "Elevator access for senior citizens and luxury spring mattresses",
      "Dedicated permit documentation lounge and 24-hr room service"
    ],
    description: "The premier luxury riverfront property in Dharchula, serving as the relaxing staging gateway before the high-altitude ascent into Vyas Valley."
  },
  {
    id: "nabi-heritage-rung-cottage",
    name: "Nabi Heritage Rung Deluxe Wooden Stay",
    hindiName: "नाबी हेरिटेज रंग वुडन कॉटेज",
    tier: "premium",
    tierBadge: "Premium Deluxe Cottage",
    location: "Nabi Heritage Village",
    altitude: "10,200 FT",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=720&q=75&fm=webp",
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
    name: "Kumaon Valley Boutique Lodge",
    hindiName: "कुमाऊं वैली बुटीक लॉज पिथौरागढ़",
    tier: "premium",
    tierBadge: "Premium Deluxe Hotel",
    location: "Pithoragarh City",
    altitude: "5,350 FT",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=720&q=75&fm=webp",
    rating: 4.9,
    reviewsCount: 190,
    packageInclusion: "Included in Premium Package (Kathgodam/Pithoragarh)",
    roomType: "Panoramic Peak View Suite",
    sharingType: "Double Sharing",
    amenities: [
      "Panchachuli Peak Views",
      "Plush Spring Mattresses",
      "Designer Rain Shower",
      "Electric Tea/Coffee Kettle",
      "24/7 Power Backup",
      "Pure Veg Buffet Breakfast"
    ],
    keyHighlights: [
      "Unobstructed views of the five sacred Panchachuli snow summits at dawn",
      "Premium linens and hygienic sanitized bathrooms",
      "Convenient access to Naini Saini Airport and Chandak Hill"
    ],
    description: "Upscale boutique hospitality in Pithoragarh offering serene Himalayan vistas and restorative sleep before the off-road expedition begins."
  },
  {
    id: "nabi-village-traditional-homestay",
    name: "Nabi Village Traditional Rung Homestay",
    hindiName: "नाबी ग्राम पारंपरिक रंग होमस्टे",
    tier: "standard",
    tierBadge: "Standard Village Homestay",
    location: "Nabi Heritage Village",
    altitude: "10,200 FT",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=720&q=75&fm=webp",
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
    id: "kmvn-tourist-rest-house-gunji",
    name: "KMVN Tourist Rest House & Yatri Niwas",
    hindiName: "केएमवीएन पर्यटक विश्राम गृह (गुंजी/धारचूला)",
    tier: "standard",
    tierBadge: "Standard Verified TRH",
    location: "Gunji & Dharchula",
    altitude: "3,000 – 10,500 FT",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=720&q=75&fm=webp",
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
      "Official Kumaon Mandal Vikas Nigam (KMVN) yatri premises",
      "Close proximity to ITBP transit medical station and Helipad",
      "Wholesome North-Indian & Kumaoni vegetarian buffet"
    ],
    description: "Reliable, government-authorized tourist rest house providing sturdy infrastructure, clean rooms, and immediate medical coordination across Gunji and Dharchula."
  },
  {
    id: "jolingkong-alpine-haven",
    name: "Jolingkong High-Altitude Alpine Base Haven",
    hindiName: "जोलींगकोंग अल्पाइन बेस शेल्टर (14,500 फीट)",
    tier: "standard",
    tierBadge: "Alpine Base Stay",
    location: "Jolingkong (Near Parvati Sarovar)",
    altitude: "14,500 FT",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=75&fm=webp",
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
