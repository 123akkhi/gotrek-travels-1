export interface PackingCategory {
  category: string;
  iconName: string;
  description: string;
  items: {
    name: string;
    importance: 'Mandatory' | 'Recommended' | 'Optional';
    notes: string;
  }[];
}

export interface FamousSpot {
  name: string;
  hindiName?: string;
  altitude?: string;
  location?: string;
  category: 'Spiritual' | 'Mythological' | 'Scenic Viewpoint' | 'Heritage Village' | 'Glacial Lake';
  significance: string;
  description: string;
  image: string;
  mythologicalLore?: string;
  keyHighlights: string[];
}

export interface DestinationDetail {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  location: string;
  duration: string;
  altitude: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'High Altitude Expedition';
  bestMonths: string;
  startingPoint: string;
  endingPoint: string;
  priceStandard: number;
  pricePremium: number;
  bannerImage: string;
  galleryImages: string[];
  overview: string;
  spiritualSignificance: string;
  highlights: string[];
  famousSpots?: FamousSpot[];
  itinerary: {
    day: number;
    title: string;
    altitude: string;
    distance: string;
    stay: string;
    meals: string;
    desc: string;
    activities: string[];
  }[];
  whatToWear: PackingCategory[];
  permitDetails: {
    requiredDocs: string[];
    processingDays: string;
    checkposts: string[];
    medicalRequirements: string;
    guidelines: string[];
  };
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string }[];
}

export const DESTINATIONS_DATA: Record<string, DestinationDetail> = {
  "adi-kailash": {
    slug: "adi-kailash",
    title: "Adi Kailash & Om Parvat Sacred Yatra 2027",
    subtitle: "Vyas Valley · Jolingkong · Nabhidhang · Parvati Sarovar",
    tagline: "The Holy Chhota Kailash — Abode of Lord Shiva & Goddess Parvati",
    location: "Dharchula, Pithoragarh District, Kumaon Himalayas",
    duration: "6 Days / 5 Nights",
    altitude: "14,500 ft (4,420 m)",
    difficulty: "Moderate",
    bestMonths: "May to June (Snow) & September to October (Clear Sky)",
    startingPoint: "Kathgodam Railway Station / Dharchula",
    endingPoint: "Kathgodam Railway Station / Dharchula",
    priceStandard: 28000,
    pricePremium: 38000,
    bannerImage: "/images/destinations/adi-kailash3.webp",
    galleryImages: [
      "/images/destinations/group-memory-03.webp",
      "/images/destinations/group-memory-01.webp",
      "/images/destinations/group-memory-02.webp",
      "/images/destinations/group-memory-04.webp"
    ],
    overview: "Adi Kailash, also known as Chhota Kailash, stands majestically at 14,500 ft in Vyas Valley, Pithoragarh, Uttarakhand. Revered as the replica of Mt. Kailash in Tibet, it is nestled near the sacred Parvati Sarovar Lake where Goddess Parvati is believed to have performed her tapasya. Nearby lies Om Parvat, where snow naturally deposits on the dark mountain face to form the divine 'ॐ' symbol.",
    spiritualSignificance: "According to Hindu Puranas, Maharishi Vyas meditated in these caves (Vyas Gufa) while compiling the Mahabharata. It is one of the five Kailash peaks in Hindu mythology and bestows immense spiritual bliss upon pilgrims.",
    highlights: [
      "Darshan of Adi Kailash peak towering over Parvati Sarovar Lake",
      "Witness natural snow forming 'ॐ' at sunrise from Nabhidhang",
      "Holy water ritual at Parvati Sarovar & optional Gauri Kund trek",
      "Visit legendary Bheem Ki Kheti, ancient Vyas Gufa, and Kuti Pandav Fort",
      "Stay in heritage Kumaoni wooden homestays at Nabi & Gunji villages",
      "Explore holy Kali Mandir & cold springs at Kalapani frontier",
      "100% Inner Line Permit (ILP) managed directly via SDM Dharchula"
    ],
    famousSpots: [
      {
        name: "Nabhidhang (Om Parvat Base & Viewpoint)",
        hindiName: "नाभिढांग (ॐ पर्वत दर्शन स्थल)",
        altitude: "14,000 ft (4,267 m)",
        location: "Upper Vyas Valley, 28 km from Gunji, near Lipulekh Pass",
        category: "Spiritual",
        image: "/images/destinations/Om-parvat.webp",
        significance: "Sacred viewpoint for witnessing the miraculous Om Parvat where snow naturally crystallizes into the holy 'ॐ' (AUM) glyph.",
        mythologicalLore: "Regarded as one of the ultimate cosmic wonders on Earth where nature pays eternal homage to Lord Shiva. Nabhidhang lies along the ancient Kailash-Mansarovar pilgrim route.",
        description: "Situated at 14,000 ft along the high Himalayan frontier of Vyas Valley, Nabhidhang offers an unobstructed, majestic view of Om Parvat. As the early morning sunrise rays illuminate the peak, the snow-etched Om shines with divine golden brilliance against dark granite.",
        keyHighlights: ["Direct Sunrise Om Parvat Darshan", "Lipulekh Border Ridge View", "Sacred Kali Temple & Springs", "High-Altitude ITBP Frontier Base"]
      },
      {
        name: "Gunji Village (Heart of Vyas Valley)",
        hindiName: "गुंजी गाँव (व्यास घाटी का प्रवेश द्वार)",
        altitude: "10,500 ft (3,200 m)",
        location: "Confluence of Kali River & Kuti Yangti River, Vyas Valley",
        category: "Heritage Village",
        image: "/images/destinations/gunji-village.webp",
        significance: "The central administrative, cultural, and transit hub for all pilgrims journeying to Adi Kailash and Om Parvat.",
        mythologicalLore: "Gunji is the ancient meeting ground of Himalayan rishis and traders on the historic Trans-Himalayan salt and silk trade route between India and Tibet.",
        description: "Gunji sits magnificently at the sacred confluence of the Kali and Kuti Yangti rivers. It serves as the primary base camp for yatris with traditional Rung wooden homestays, an active ITBP checkpost, a medical aid center, and the newly established Gunji Helipad for VIP helicopter transfers.",
        keyHighlights: ["Kali & Kuti River Sangam", "Traditional Rung Wooden Architecture", "Gunji Helipad Base for Fast Transfers", "Local Kumaoni Homestay Experience"]
      },
      {
        name: "Bheem Ki Kheti (Bhim's Mythological Agricultural Fields)",
        hindiName: "भीम की खेती (पांडव युगीन सीढ़ीदार खेत)",
        altitude: "11,200 ft (3,413 m)",
        location: "En route between Gunji and Kuti Village, Kuti Valley",
        category: "Mythological",
        image: "/images/destinations/bheem-ki-kheti.webp",
        significance: "Massive natural terraced stone steps on the steep mountain slopes believed to be farmlands ploughed by the mighty Pandava brother Bheem.",
        mythologicalLore: "According to local Himalayan folklore from the Mahabharata period, during the Pandavas' 12-year exile in the Himalayas, Bheem ploughed these towering mountain terraces in a single night to cultivate barley and food for Mata Kunti and his brothers.",
        description: "Visible along the road towards Jolingkong, Bheem Ki Kheti features giant geometric stone ridge lines etched across the cliffside that resemble ancient stepped farmlands. Yatris stop here to marvel at this legendary Mahabharata landmark surrounded by snow-capped peaks.",
        keyHighlights: ["Legendary Mahabharata Pandava Site", "Ancient Giant Terrace Formations", "Panoramic Kuti Valley Views", "Photographic Himalayan Landmark"]
      },
      {
        name: "Jolingkong (Adi Kailash Base Camp)",
        hindiName: "जोलिंगकोंग (आदि कैलाश बेस कैंप)",
        altitude: "14,500 ft (4,420 m)",
        location: "Upper Kuti Valley, directly at the foot of Mt. Adi Kailash",
        category: "Spiritual",
        image: "/images/destinations/jyolikong.webp",
        significance: "The highest motorable base camp directly facing the towering 5,945 m holy peak of Adi Kailash (Chhota Kailash).",
        mythologicalLore: "Revered as the sacred mirror and Indian abode of Lord Shiva, radiating divine peace and transcendental cosmic vibrations.",
        description: "Standing at Jolingkong, pilgrims are surrounded by towering glaciated peaks. It is the starting ground for holy Parvati Sarovar circumambulation and the gentle trek towards Gauri Kund.",
        keyHighlights: ["Closest Base to Adi Kailash Peak", "Starting Point for Parvati Sarovar Walk", "Breathtaking 360° Alpine Glaciers", "ITBP Alpine Support Camp"]
      },
      {
        name: "Parvati Sarovar Lake & Shiva Temple",
        hindiName: "पार्वती सरोवर एवं शिव-पार्वती मंदिर",
        altitude: "14,500 ft (4,420 m)",
        location: "Jolingkong, Vyas/Kuti Valley",
        category: "Glacial Lake",
        image: "/images/destinations/parvati-sarovar.webp",
        significance: "Sacred high-altitude alpine lake where Goddess Parvati performed severe penance (tapasya) to wed Lord Shiva.",
        mythologicalLore: "The tranquil crystal water reflects the pyramid pinnacle of Adi Kailash. Performing a sacred snan or Jal Abhishek here is considered equivalent to Kailash Mansarovar Parikrama.",
        description: "A shimmering alpine lake surrounded by colorful prayer flags and ancient stone lingams. Yatris perform Rudrabhishek puja and water rituals at the lakeside Shiva-Parvati Mandir.",
        keyHighlights: ["Mirror Reflection of Adi Kailash", "Shiva-Parvati Mandir Holy Puja", "Sacred Jal Collection & Snan", "Peaceful Meditation Shore"]
      },
      {
        name: "Gauri Kund (Adi Kailash Glacial Tarn)",
        hindiName: "गौरी कुंड (आदि कैलाश ग्लेशियर ताल)",
        altitude: "15,000 ft (4,572 m)",
        location: "2.5 km gentle trek above Parvati Sarovar Lake",
        category: "Glacial Lake",
        image: "/images/destinations/gaurikund.webp",
        significance: "Pristine jade-green glacial tarn situated right at the foot of the Adi Kailash ice-wall, associated with Mata Parvati.",
        mythologicalLore: "Mata Parvati's private bathing pond created by Lord Shiva amidst the pristine upper glaciated reaches of Chhota Kailash.",
        description: "A scenic 2.5 km trek from Parvati Sarovar leads to this secluded emerald-hued glacial lake with floating ice sheets and unhindered proximity to the sacred summit ridge.",
        keyHighlights: ["Turquoise Glacial Water", "Touch the Snowfield of Adi Kailash", "High-Altitude Glacial Lake", "Sacred Holy Water Source"]
      },
          
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Haldwani to Dharchula via Kainchi Dham",
        altitude: "3,000 ft",
        distance: "275 km (8-9 hrs scenic drive)",
        stay: "Hotel / KMVN Guest House at Dharchula",
        meals: "Lunch at Almora & Dinner at Dharchula (Pure Veg)",
        desc: "Pick up from Kathgodam Railway Station in morning. Drive through pine-clad Kumaoni hills with a holy stop at Kainchi Dham Neem Karoli Baba Ashram. Pass Almora and Pithoragarh, descending to Dharchula on the banks of Kali River. Document check for Inner Line Permit.",
        activities: ["Kainchi Dham Ashram Darshan", "Dharchula Suspension Bridge View", "ILP Document Verification & Briefing"]
      },
      {
        day: 2,
        title: "Dharchula to Gunji / Nabi Village via Chialekh Pass & Garbyang",
        altitude: "10,500 ft",
        distance: "75 km (4x4 Scorpio / Bolero Drive)",
        stay: "Traditional Kumaoni Homestay in Nabi / Gunji Village",
        meals: "Breakfast at Dharchula, Hot Lunch at Budhi, Dinner at Nabi",
        desc: "Pass through ITBP checkpoints at Pangla and historic Garbyang village. Ascend through dramatic mountain gorges to Chialekh Pass, where lush alpine meadows welcome you into Vyas Valley. Arrive at Gunji & Nabi village with traditional carved wooden houses.",
        activities: ["Chialekh Alpine Meadow Walk", "Gunji Village Frontier Hub Exploration", "ITBP Checkpoint Clearance", "Cultural Kumaoni Dinner"]
      },
      {
        day: 3,
        title: "Gunji/Nabi to Jolingkong · Bheem Ki Kheti, Kuti Village & Adi Kailash",
        altitude: "14,500 ft",
        distance: "35 km drive + 2 km gentle walk",
        stay: "Heritage Homestay at Nabi / Gunji",
        meals: "Breakfast at Nabi, Packed/Hot Lunch at Jolingkong, Dinner at Nabi",
        desc: "Drive early through the scenic Kuti Valley. Stop at the legendary Bheem Ki Kheti terraces, marvel at ancient Kuti village and Pandav Fort, and reach Jolingkong base camp. Stand in awe before the majestic Chhota Kailash peak rising directly above Parvati Sarovar Lake. Perform Shiv Puja, chant Har Har Mahadev, and take holy water reflections. Optional gentle 2.5 km trek to Gauri Kund.",
        activities: ["Bheem Ki Kheti Terrace View", "Kuti Village & Pandav Fort Darshan", "Adi Kailash Holy Darshan", "Parvati Sarovar Water Dip & Puja", "Gauri Kund Trek"]
      },
      {
        day: 4,
        title: "Gunji/Nabi to Nabhidhang (Om Parvat) · Kalapani & Vyas Gufa to Dharchula",
        altitude: "14,000 ft",
        distance: "28 km drive to Nabhidhang + return to Dharchula",
        stay: "Hotel in Dharchula",
        meals: "Breakfast at Nabhidhang, Lunch at Gunji, Dinner at Dharchula",
        desc: "Pre-dawn departure for Nabhidhang base. As the first rays of golden sunlight hit Om Parvat, witness the pristine snow-formed 'ॐ' symbol clearly carved against the dark rock face. On return, visit the sacred Kalapani Kali Temple, origin springs of Kali River, and the historic Vyas Gufa (cave) before descending back to Dharchula.",
        activities: ["Nabhidhang Om Parvat Golden Sunrise Darshan", "Kalapani Kali Temple & Springs", "Vyas Gufa Rock Cave Visit", "Gunji Hub Lunch & Return Drive to Dharchula"]
      },
      {
        day: 5,
        title: "Dharchula to Jageshwar Dham / Almora",
        altitude: "6,200 ft",
        distance: "190 km drive",
        stay: "Spiritual Resort / Hotel in Jageshwar",
        meals: "Breakfast at Dharchula, Lunch at Didihat, Dinner at Jageshwar",
        desc: "Drive through Kumaoni forest reserves towards Jageshwar Dham, home to 124 ancient stone Shiva temples nestled amid tall Deodar cedars. Evening Aarti at Mahamrityunjaya Shrine.",
        activities: ["Jageshwar 124 Temple Complex Tour", "Evening Deodar Forest Aarti"]
      },
      {
        day: 6,
        title: "Jageshwar Dham to Kathgodam Drop",
        altitude: "1,700 ft",
        distance: "85 km drive",
        stay: "Departure",
        meals: "Breakfast at Jageshwar",
        desc: "Visit Chitai Golu Devta Temple (Temple of 10,000 Bells) in Almora before smooth drop at Kathgodam Railway Station for return train / Volvo bus connection.",
        activities: ["Chitai Golu Devta Temple Visit", "Souvenir Shopping", "Kathgodam Drop"]
      }
    ],
    whatToWear: [
      {
        category: "High Altitude Layering (3-Layer System)",
        iconName: "Shirt",
        description: "Temperatures at Jolingkong & Nabhidhang drop to -2°C to 5°C. Layering is crucial.",
        items: [
          { name: "Thermal Base Layers (Top & Bottom)", importance: "Mandatory", notes: "2 sets of high-grade merino wool or synthetic heat-tech thermals." },
          { name: "Fleece Jacket or Heavy Sweater", importance: "Mandatory", notes: "1 mid-layer fleece jacket for wind and insulation during daytime drives." },
          { name: "Feather Down Puffer Jacket (-10°C rated)", importance: "Mandatory", notes: "Heavy windproof hooded down jacket for early morning Om Parvat darshan." },
          { name: "Windproof & Waterproof Outer Shell Pants", importance: "Mandatory", notes: "Quick-dry or fleece-lined trekking trousers." }
        ]
      },
      {
        category: "Footwear & Warm Socks",
        iconName: "Footprints",
        description: "Terrain includes loose gravel, cold mountain streams, and light snow.",
        items: [
          { name: "High-Ankle Waterproof Trekking Shoes", importance: "Mandatory", notes: "Trek shoes with good rubber grip (Quechua / Wildcraft / Columbia)." },
          { name: "Heavy Woolen / Thermal Socks", importance: "Mandatory", notes: "4-5 pairs of heavy woolen socks for nights and early morning." },
          { name: "Camp Slippers / Sandals", importance: "Recommended", notes: "For relaxing inside homestays in evening." }
        ]
      },
      {
        category: "Extreme Cold Accessories",
        iconName: "Sparkles",
        description: "Protect extremities (head, ears, hands) from high-altitude chilling winds.",
        items: [
          { name: "Thermal Balaclava & Woolen Cap", importance: "Mandatory", notes: "Covers head, neck, and ears completely." },
          { name: "Waterproof Fleece Gloves", importance: "Mandatory", notes: "1 pair inner fleece + 1 pair outer windproof gloves." },
          { name: "UV Polarized Sunglasses (Category 3/4)", importance: "Mandatory", notes: "Essential to prevent snow blindness and UV exposure above 14,000 ft." },
          { name: "Sun Cap & Neck Gaiter / Buff", importance: "Recommended", notes: "Protects face from harsh high-altitude sun during noon." }
        ]
      },
      {
        category: "Gear, Power & Toiletries",
        iconName: "Zap",
        description: "Electricity is limited to solar generators beyond Gunji. Power banks are vital.",
        items: [
          { name: "20,000 mAh Power Bank", importance: "Mandatory", notes: "Mobile batteries drain quickly in sub-zero cold." },
          { name: "1-Litre Insulated Stainless Steel Flask", importance: "Mandatory", notes: "Keep warm drinking water accessible at all times." },
          { name: "Headlamp / LED Torch with Extra Batteries", importance: "Mandatory", notes: "Needed for pre-dawn departures at Nabhidhang." },
          { name: "Sunscreen SPF 50+ & Lip Balm", importance: "Mandatory", notes: "High UV index at 14,000 ft requires frequent sunblock." },
          { name: "Wet Wipes & Biodegradable Toiletries", importance: "Mandatory", notes: "Water can freeze in mornings at Gunji." }
        ]
      },
      {
        category: "Mandatory ILP Documents & Medical Kit",
        iconName: "ShieldCheck",
        description: "Must be presented at Pangla & Gunji ITBP Checkposts.",
        items: [
          { name: "Original Aadhar Card + 5 Photocopies", importance: "Mandatory", notes: "Required for SDM Dharchula permit stamp & ITBP entry." },
          { name: "6 Passport-Size Color Photographs", importance: "Mandatory", notes: "Attached to ILP forms & medical fitness record." },
          { name: "Police Verification Certificate (PVC)", importance: "Mandatory", notes: "Issued by local police station or valid Passport copy." },
          { name: "MBBS Doctor Medical Fitness Certificate", importance: "Mandatory", notes: "Stating BP, pulse, O2 saturation, and high-altitude fitness." },
          { name: "Personal Medication & Diamox (AMS)", importance: "Mandatory", notes: "Consult doctor for altitude acclimatization medication." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: [
        "Aadhar Card (Original + 5 Photocopies)",
        "6 Passport-size Photographs",
        "Police Verification Certificate (PVC) from home district police OR valid Passport copy",
        "Medical Fitness Certificate from registered MBBS Doctor (stating BP & high-altitude clearance)"
      ],
      processingDays: "7 to 10 Days in advance via GoTrek SDM Dharchula Liaison Office",
      checkposts: ["Dharchula SDM Office", "Pangla ITBP Checkpost", "Garbyang Post", "Gunji Base Command", "Napalchu ITBP Post"],
      medicalRequirements: "Mandatory blood pressure check and high-altitude medical fitness declaration by MBBS doctor.",
      guidelines: [
        "GoTrek manages 100% of ILP filing with SDM Dharchula.",
        "Foreign nationals require special MHA clearances; currently open for Indian citizens.",
        "Keep photocopies of documents easily accessible in daypack for ITBP checking."
      ]
    },
    inclusions: [
      "Kathgodam / Dharchula roundtrip transfers in high-clearance 4x4 Bolero / Scorpio",
      "5 Nights accommodation in clean local homestays (Nabi/Gunji) & guest houses",
      "All meals: Sattvik vegetarian breakfast, hot lunch, and dinner with tea/snacks",
      "100% Inner Line Permit (ILP) application & liaison fees with SDM Dharchula",
      "Certified local Kumaoni Tour Guide + Experienced Mountain Drivers",
      "Emergency Portable Medical Oxygen Cylinder & Pulse Oximeter",
      "ITBP checkpost clearance coordination"
    ],
    exclusions: [
      "Train / Airfare to Kathgodam Railway Station",
      "Personal clothing, trekking gear, and sleeping bags",
      "Emergency evacuation expenses or personal insurance",
      "GST 5% & personal tips to drivers/guides"
    ],
    faqs: [
      {
        question: "Is there any walking or trekking involved for Adi Kailash & Om Parvat?",
        answer: "Thanks to recent BRO road construction, 4x4 vehicles reach directly up to Jolingkong base (Adi Kailash) and Nabhidhang (Om Parvat). Walking is minimal — around 1-2 km on flat/gentle terrain around Parvati Sarovar."
      },
      {
        question: "What is the network connectivity in Vyas Valley?",
        answer: "BSNL operates up to Gunji and Nabi. Most homestays now feature BSNL satellite Wi-Fi setup for basic WhatsApp text messages."
      },
      {
        question: "How does GoTrek handle Acute Mountain Sickness (AMS)?",
        answer: "All our vehicles carry medical-grade oxygen cylinders, oximeters, and first-aid kits. Guides are trained in AMS protocols and rapid descent options."
      }
    ]
  },

  "darma-valley": {
    slug: "darma-valley",
    title: "Darma Valley & Panchachuli Glacier Trek 2027",
    subtitle: "Dugtu · Dantu · Panchachuli Base Camp · Tribal Kumaon",
    tagline: "Unspoiled Alpine Beauty under the Shadow of Panchachuli Five Peaks",
    location: "Darma Valley, Dharchula, Pithoragarh District",
    duration: "5 Days / 4 Nights",
    altitude: "11,200 ft (3,410 m)",
    difficulty: "Easy",
    bestMonths: "May to June & September to November",
    startingPoint: "Kathgodam / Dharchula",
    endingPoint: "Kathgodam / Dharchula",
    priceStandard: 22000,
    pricePremium: 30000,
    bannerImage: "/images/destinations/darma-valley.webp",
    galleryImages: [
      "/images/destinations/darma-valley-1.webp",
      
    ],
    overview: "Darma Valley is one of Uttarakhand's most enchanted hidden valleys, carved by the raging Darma River. Flanked by majestic deodar forests, wooden Bhotiya tribal homes, and dominated by the five snow-capped peaks of Panchachuli rising up to 22,600 ft.",
    spiritualSignificance: "Legend holds that the five Pandava brothers cooked their last meal on earth on the five peaks of Panchachuli before ascending to heaven (Panch Chuli = Five Cooking Stoves).",
    highlights: [
      "Panoramic front-row view of Panchachuli Glacier & 5 Peaks from Dugtu",
      "Stay in centuries-old carved wooden Bhotiya heritage homestays at Dantu",
      "Gentle walk along Darma river rapids to Panchachuli Base Camp",
      "Traditional Kumaoni culinary experience with local herbs & Madua roti",
      "Sela village waterfalls & alpine birch forest trails"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Dharchula to Sobla & Darma Gate",
        altitude: "5,500 ft",
        distance: "240 km drive",
        stay: "Riverside Homestay in Sobla / Tawaghat",
        meals: "Lunch & Dinner included",
        desc: "Drive along Kali and Dhauliganga rivers into Darma Valley entry gate. Enjoy pristine mountain air and roaring waterfalls.",
        activities: ["Dhauliganga River Viewpoint", "Evening Campfire & Kumaoni Tea"]
      },
      {
        day: 2,
        title: "Sobla to Dugtu & Dantu Village via Sela Waterfalls",
        altitude: "10,500 ft",
        distance: "55 km 4x4 Mountain Drive",
        stay: "Traditional Wooden Homestay in Dantu Village",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Ascend through dramatic gorges passing Sela, Baling, and Nagling villages. Reach Dantu village, perched directly across from the giant Panchachuli mountain range.",
        activities: ["Sela Waterfall Stop", "Traditional Bhotiya Architecture Walk"]
      },
      {
        day: 3,
        title: "Dugtu to Panchachuli Glacier Base Camp Exploration",
        altitude: "11,200 ft",
        distance: "4 km gentle walk each way",
        stay: "Heritage Homestay at Dantu",
        meals: "Breakfast, Picnic Lunch at Glacier Viewpoint, Dinner",
        desc: "Walk across alpine meadows to the snout of Panchachuli Glacier. Touch mountain streams flowing directly from the five snow peaks.",
        activities: ["Glacier Snout Walk", "Panchachuli Five Peaks Photography", "Stargazing at Night"]
      },
      {
        day: 4,
        title: "Dantu to Dharchula via Tribal Craft Villages",
        altitude: "3,000 ft",
        distance: "70 km drive",
        stay: "Hotel in Dharchula",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Return drive visiting local carpet weaving artisans and herbal farms in Baling village.",
        activities: ["Bhotiya Carpet Weaving Demonstration", "Return to Dharchula"]
      },
      {
        day: 5,
        title: "Dharchula to Kathgodam Drop",
        altitude: "1,700 ft",
        distance: "275 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Return drive to Kathgodam railway station with lifelong memories of Darma Valley.",
        activities: ["Kathgodam Railway Station Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Clothing & Outerwear",
        iconName: "Shirt",
        description: "Moderate high altitude (11,000 ft). Daytime temperature 10°C to 18°C, night 2°C.",
        items: [
          { name: "Fleece Jacket + Light Down Jacket", importance: "Mandatory", notes: "Comfortable for evenings in Dantu." },
          { name: "2 Sets Thermal Wear", importance: "Mandatory", notes: "Keeps warm during cold village nights." },
          { name: "Comfortable Trekking Trousers", importance: "Mandatory", notes: "Stretchable quick-dry pants." }
        ]
      },
      {
        category: "Footwear & Extras",
        iconName: "Footprints",
        description: "Easy walking paths and meadow strolls.",
        items: [
          { name: "Lightweight Trekking Shoes / Sports Shoes", importance: "Mandatory", notes: "Sturdy rubber sole." },
          { name: "Woolen Socks & Beanie Cap", importance: "Mandatory", notes: "Needed after sunset." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original + 2 copies", "2 Passport Photos"],
      processingDays: "2 Days (GoTrek handles entry pass at Tawaghat)",
      checkposts: ["Sobla Checkpost", "Dantu Post"],
      medicalRequirements: "Basic medical declaration.",
      guidelines: ["Easier permit process compared to Vyas Valley."]
    },
    inclusions: [
      "4x4 Transport from Dharchula / Kathgodam",
      "Homestay lodging in Dantu & Sobla",
      "All meals & evening tea",
      "Local Bhotiya guide"
    ],
    exclusions: ["Personal expenses, GST"],
    faqs: [
      {
        question: "Is Darma Valley suitable for families with kids?",
        answer: "Yes! Altitude is manageable (11,000 ft) and walking is minimal. Highly recommended for families and photographers."
      }
    ]
  },

  "kailash-mansarovar": {
    slug: "kailash-mansarovar",
    title: "Kailash Mansarovar View Point Yatra 2027 (Lipulekh)",
    subtitle: "Old Lipulekh Pass · 18,300 ft · Witness Holy Mt. Kailash from India",
    tagline: "Sacred Vision of Holy Mt. Kailash & Lake Mansarovar from Indian Territory",
    location: "Old Lipulekh Pass, Pithoragarh, India-Tibet Border",
    duration: "7 Days / 6 Nights",
    altitude: "18,300 ft (5,577 m)",
    difficulty: "High Altitude Expedition",
    bestMonths: "May to June & September to October",
    startingPoint: "Kathgodam / Dharchula",
    endingPoint: "Kathgodam / Dharchula",
    priceStandard: 45000,
    pricePremium: 65000,
    bannerImage: "/images/destinations/kailash-mansarovar-1.webp",
    galleryImages: [
      "/images/destinations/kailash-mansarovar.webp",
      
    ],
    overview: "A groundbreaking spiritual discovery by BRO and Government of India! Indian pilgrims can now stand at Old Lipulekh Pass (18,300 ft) in Pithoragarh district and behold the direct holy darshan of Mount Kailash and Lake Mansarovar situated inside Tibet, without requiring a Chinese visa or passport passport stamps.",
    spiritualSignificance: "Being able to see Mount Kailash from Indian soil fulfills the lifelong dream of millions of devout Shiv bhakts.",
    highlights: [
      "Direct unobstructed Darshan of Holy Mt. Kailash Peak from Old Lipulekh Pass",
      "Glimpse of sacred Lake Mansarovar shining in the Tibetan plateau",
      "Journey along ancient Silk Route and Kali river origin",
      "Acclimatization halts at Gunji & Nabhidhang with medical oxygen support"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam to Dharchula Base",
        altitude: "3,000 ft",
        distance: "275 km drive",
        stay: "Hotel in Dharchula",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Arrive in Dharchula. Submit medical test certificates at Government Hospital Dharchula.",
        activities: ["Medical Health Checkup", "ILP Processing"]
      },
      {
        day: 2,
        title: "Dharchula to Gunji Acclimatization Camp",
        altitude: "10,500 ft",
        distance: "75 km 4x4 drive",
        stay: "Specialized High-Altitude Wooden Lodge",
        meals: "All meals",
        desc: "Ascend to Gunji. Mandatory 24-hour acclimatization and blood pressure monitoring.",
        activities: ["Acclimatization Walk", "Pulse Oximeter Monitoring"]
      },
      {
        day: 3,
        title: "Gunji to Nabhidhang Base Camp",
        altitude: "14,000 ft",
        distance: "28 km drive",
        stay: "High-Altitude Camp at Nabhidhang",
        meals: "All meals",
        desc: "Drive to Nabhidhang. View Om Parvat in evening light.",
        activities: ["Om Parvat Sunset View"]
      },
      {
        day: 4,
        title: "Nabhidhang to Old Lipulekh Pass (18,300 ft) · Mt. Kailash Darshan",
        altitude: "18,300 ft",
        distance: "15 km high pass road drive",
        stay: "Gunji Lodge",
        meals: "All meals",
        desc: "Early morning drive up to Old Lipulekh Pass. Stand on the crest and behold Mount Kailash in Tibet with binoculars & telescopes.",
        activities: ["Holy Mt. Kailash Darshan from India", "Prayer Chanting & Parikrama Spirit"]
      },
      {
        day: 5,
        title: "Gunji to Adi Kailash & Parvati Sarovar to Dharchula",
        altitude: "14,500 ft to 3,000 ft",
        distance: "110 km drive",
        stay: "Hotel in Dharchula",
        meals: "All meals",
        desc: "Visit Adi Kailash before descending back to Dharchula.",
        activities: ["Adi Kailash Visit", "Descent to Dharchula"]
      },
      {
        day: 6,
        title: "Dharchula to Pithoragarh / Almora",
        altitude: "5,000 ft",
        distance: "180 km drive",
        stay: "Hotel in Almora",
        meals: "All meals",
        desc: "Relaxing drive back toward lower hills.",
        activities: ["Relaxation"]
      },
      {
        day: 7,
        title: "Almora to Kathgodam Railway Station Drop",
        altitude: "1,700 ft",
        distance: "90 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Drop at Kathgodam railway station.",
        activities: ["Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Extreme High-Altitude Expedition Clothing (18,000 ft)",
        iconName: "Shirt",
        description: "Extreme cold and wind at Lipulekh (-10°C to -5°C). Waterproof down suit or heavy down jacket is required.",
        items: [
          { name: "Heavy Down Jacket (-15°C rated)", importance: "Mandatory", notes: "GoTrek provides rental down suits if needed." },
          { name: "Double Base Thermal Layer", importance: "Mandatory", notes: "Heavy merino wool thermals." },
          { name: "Windproof Mountain Pants", importance: "Mandatory", notes: "Fleece lined." },
          { name: "Heavy High-Altitude Gloves + Inner Liners", importance: "Mandatory", notes: "Essential for 18,300 ft." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card", "Medical Fitness Certificate from District Medical Board", "Police Clearance Certificate", "6 Photos"],
      processingDays: "10-14 Days Advance Application via GoTrek",
      checkposts: ["SDM Dharchula", "ITBP Lipulekh Command"],
      medicalRequirements: "Strict medical checkup including ECG, Blood Pressure, and Chest X-ray at Dharchula.",
      guidelines: ["For Indian Passport / Aadhar holders only."]
    },
    inclusions: [
      "Specialized High-Altitude 4x4 Vehicle",
      "Medical Oxygen Cylinders + Hyperbaric Bag Backup",
      "High Altitude Expedition Leader",
      "All Permits & Homestay / Lodge Accommodations"
    ],
    exclusions: ["Personal medical tests, GST"],
    faqs: [
      {
        question: "Do I need a Chinese Visa or Passport for Lipulekh Mt. Kailash View?",
        answer: "NO! The viewing point is situated entirely within Indian territory at Old Lipulekh Pass. No Chinese visa, passport stamps, or Tibet permits are required."
      }
    ]
  },

  "munsyari": {
    slug: "munsyari",
    title: "Khaliya Top & Munsiyari Alpine Expedition 2027",
    subtitle: "Munsiyari · Khaliya Bugyal Meadow · Panchachuli Panorama · Maheshwari Kund",
    tagline: "Paradise of Kumaon — High Ridge Trekking Overlooking Panchachuli Peaks",
    location: "Munsiyari, Pithoragarh District, Kumaon",
    duration: "4 Days / 3 Nights",
    altitude: "11,500 ft (3,500 m)",
    difficulty: "Easy",
    bestMonths: "March to June (Rhododendron Blossom) & October to December (Snow)",
    startingPoint: "Kathgodam / Almora",
    endingPoint: "Kathgodam / Almora",
    priceStandard: 16000,
    pricePremium: 22000,
    bannerImage: "/images/destinations/khaliya-top.webp",
    galleryImages: [
      "/images/destinations/khaliy-trek.webp",
      
    ],
    overview: "Munsiyari, meaning 'Place with Snow', is a breathtaking hill station in Pithoragarh district perched at 7,200 ft directly facing the five peaks of Panchachuli. Khaliya Top is an expansive alpine meadow (bugyal) situated above Munsiyari at 11,500 ft offering 360-degree views of Nanda Devi, Hardeol, Nandakot, and Panchachuli.",
    spiritualSignificance: "Maheshwari Kund near Munsiyari is tied to ancient Yaksha legends and sacred Himalayan ponds.",
    highlights: [
      "Unmatched 360-degree panorama of Panchachuli, Nanda Devi & Hardeol peaks",
      "Trek through thick red & pink Rhododendron (Buransh) forest trails",
      "Overnight camping under star-filled night sky at Khaliya Bugyal",
      "Visit Darkot handloom heritage village and Tribal Heritage Museum"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Almora to Munsiyari via Birthi Falls",
        altitude: "7,200 ft",
        distance: "280 km drive",
        stay: "Himalayan View Hotel in Munsiyari",
        meals: "Lunch & Dinner",
        desc: "Drive past Almora, Chaukori, and Thal. Stop at majestic 126m Birthi Waterfall. Reach Munsiyari by evening with orange sunset glowing on Panchachuli peaks.",
        activities: ["Birthi Waterfall Visit", "Panchachuli Sunset View"]
      },
      {
        day: 2,
        title: "Munsiyari to Khaliya Top Meadow Trek",
        altitude: "11,500 ft",
        distance: "6 km trek (3-4 hrs uphill)",
        stay: "KMVN Alpine Huts / Dome Tents at Khaliya Top",
        meals: "Breakfast, Packed Lunch, Hot Camp Dinner",
        desc: "Begin trek from Balati bend. Walk through dense oak and rhododendron forest opening into vast alpine meadows.",
        activities: ["Rhododendron Trail Walk", "Sunset Photography over Nanda Devi range"]
      },
      {
        day: 3,
        title: "Khaliya Summit Exploration & Descent to Munsiyari",
        altitude: "11,500 ft to 7,200 ft",
        distance: "6 km downhill trek",
        stay: "Hotel in Munsiyari",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Pre-dawn walk to Zero Point for 360-degree sunrise. Descend to Munsiyari. Visit Darkot Handloom Village.",
        activities: ["Zero Point Sunrise View", "Darkot Pashmina Shawl Village Visit"]
      },
      {
        day: 4,
        title: "Munsiyari to Kathgodam Railway Station Drop",
        altitude: "1,700 ft",
        distance: "280 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic drive back to Kathgodam railway station.",
        activities: ["Kathgodam Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Trekking Wear",
        iconName: "Shirt",
        description: "Daytime trekking temperature 12°C to 20°C.",
        items: [
          { name: "Quick-Dry T-Shirts & Trek Pants", importance: "Mandatory", notes: "Breathable fabric." },
          { name: "Fleece Jacket + Windcheater", importance: "Mandatory", notes: "For ridge winds." },
          { name: "Trekking Shoes with Good Grip", importance: "Mandatory", notes: "Ankle support." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original"],
      processingDays: "No Inner Line Permit required for Munsiyari & Khaliya Top!",
      checkposts: ["Forest Entry Gate"],
      medicalRequirements: "General physical fitness.",
      guidelines: ["Open to all Indian and Foreign tourists without special border permits."]
    },
    inclusions: [
      "Kathgodam transfers",
      "Munsiyari hotel & Khaliya tent stay",
      "All meals & trekking guide",
      "Camping equipment & sleeping bags"
    ],
    exclusions: ["GST 5%", "Personal porter charges"],
    faqs: [
      {
        question: "Does Khaliya Top require an Inner Line Permit?",
        answer: "No! Munsiyari and Khaliya Top are outside the restricted inner line zone, so NO special permits or police clearances are needed."
      }
    ]
  },

  "valley-of-flowers": {
    slug: "valley-of-flowers",
    title: "Valley of Flowers & Hemkund Sahib Sacred Trek 2027",
    subtitle: "UNESCO World Heritage Site · Govindghat · Ghangaria · Hemkund Sahib",
    tagline: "Step into an Alpine Floral Wonderland & Sacred High-Altitude Shrine",
    location: "Chamoli District, Garhwal Himalayas, Uttarakhand",
    duration: "6 Days / 5 Nights",
    altitude: "14,400 ft (4,390 m at Hemkund Sahib) / 11,500 ft (Valley)",
    difficulty: "Moderate",
    bestMonths: "July to September (Peak Floral Blooming Season)",
    startingPoint: "Rishikesh / Haridwar / Dehradun",
    endingPoint: "Rishikesh / Haridwar / Dehradun",
    priceStandard: 18500,
    pricePremium: 26500,
    bannerImage: "/images/destinations/valley-of-flowers.webp",
    galleryImages: [
      "/images/destinations/valley-of-flowers-1.webp",
      
    ],
    overview: "The Valley of Flowers is a world-renowned UNESCO World Heritage Biosphere Reserve tucked in the Western Himalayas of Chamoli, Uttarakhand. Discovered by Frank Smythe in 1931, this high-altitude valley blooms with over 500 species of rare alpine wildflowers, including the legendary Brahma Kamal, Blue Poppy, and Cobra Lily. Nearby lies Sri Hemkund Sahib, the world's highest Gurudwara situated beside a crystal-clear glacial lake at 14,400 ft.",
    spiritualSignificance: "Sri Hemkund Sahib is venerated in Guru Gobind Singh Ji's Dasam Granth as the site where the Tenth Sikh Guru meditated in his previous incarnation (Dust Daman). The adjacent Lakshman Temple marks the site where Lord Lakshman meditated.",
    highlights: [
      "Walk among 500+ species of rare alpine wildflowers in full bloom",
      "Holy Darshan at Sri Hemkund Sahib (14,400 ft) & sacred Sarovar dip",
      "Spot Brahma Kamal — the divine flower of Lord Brahma & Shiva",
      "Badrinath Temple Darshan & Mana Village (First Village of India) visit",
      "Confluence views at Devprayag (Alaknanda + Bhagirathi) & Karnaprayag",
      "Experienced mountain guides, forest permits & complete safety escort"
    ],
    itinerary: [
      {
        day: 1,
        title: "Rishikesh / Haridwar to Govindghat via Devprayag & Joshimath",
        altitude: "6,000 ft",
        distance: "290 km (9-10 hrs scenic drive)",
        stay: "Hotel / Deluxe Lodge at Govindghat",
        meals: "Lunch & Dinner",
        desc: "Morning pickup from Rishikesh/Haridwar. Drive along the holy Alaknanda River stopping at Devprayag (confluence of Bhagirathi and Alaknanda forming Mother Ganga), Rudraprayag, and Karnaprayag. Reach Govindghat by evening.",
        activities: ["Devprayag Sangam Darshan", "Rudraprayag View", "Govindghat Evening Orientation"]
      },
      {
        day: 2,
        title: "Govindghat to Ghangaria Trek via Pulna Village",
        altitude: "10,200 ft",
        distance: "10 km trek / Pony / Helicopter option",
        stay: "Hotel / Deluxe Alpine Lodge in Ghangaria",
        meals: "Breakfast, Packed Lunch, Hot Dinner",
        desc: "Short drive to Pulna. Begin gradual scenic trek along the rushing Lakshman Ganga river. Pass cascading waterfalls and lush coniferous forests to reach Ghangaria base camp.",
        activities: ["Riverside Trek", "Ghangaria Gurudwara & Information Center Center Visit"]
      },
      {
        day: 3,
        title: "Ghangaria to Valley of Flowers Exploration & Return",
        altitude: "11,500 ft",
        distance: "4 km trek each way (8 km total)",
        stay: "Hotel / Lodge in Ghangaria",
        meals: "Breakfast, Packed Lunch, Hot Dinner",
        desc: "Early morning entry through Forest Checkpost into the Valley of Flowers. Cross wooden bridge over Pushpawati river. Walk through carpets of pink, yellow, blue, and purple blossoms with snow-clad peaks looming overhead.",
        activities: ["Brahma Kamal & Blue Poppy Spotting", "Pushpawati River Trail Walk", "Alpine Botanical Photography"]
      },
      {
        day: 4,
        title: "Ghangaria to Sri Hemkund Sahib (14,400 ft) & Return",
        altitude: "14,400 ft",
        distance: "6 km steep uphill trek each way",
        stay: "Hotel / Lodge in Ghangaria",
        meals: "Breakfast, Hot Langar at Gurudwara, Dinner",
        desc: "Ascend steep stone pathway amidst clouds to reach the golden-domed Sri Hemkund Sahib Gurudwara and holy lake. Take holy Sarovar dip, offer Ardas, and partake in hot Langar before descending to Ghangaria.",
        activities: ["Sri Hemkund Sahib Darshan", "Holy Sarovar Parikrama", "Lakshman Temple Visit"]
      },
      {
        day: 5,
        title: "Ghangaria to Govindghat & Side Trip to Badrinath Dham & Mana",
        altitude: "10,830 ft (Badrinath)",
        distance: "10 km downhill trek + 25 km drive",
        stay: "Deluxe Hotel in Joshimath / Govindghat",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Trek down from Ghangaria to Govindghat. Board vehicle for Badrinath Dham for evening Aarti and Mahavishnu Darshan. Visit Mana village, Vyas Gufa, and Saraswati River Origin point.",
        activities: ["Badrinath Temple Darshan", "Mana Village & Vyas Gufa", "Saraswati River Origin"]
      },
      {
        day: 6,
        title: "Joshimath / Govindghat to Rishikesh / Haridwar Drop",
        altitude: "1,100 ft",
        distance: "290 km drive",
        stay: "Departure",
        meals: "Breakfast & En-route Lunch",
        desc: "Drive down from Joshimath past Dhari Devi temple to Rishikesh/Haridwar railway station for evening onward journeys.",
        activities: ["Dhari Devi Temple Blessing", "Rishikesh Railway Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Trekking & Rain Layering",
        iconName: "Shirt",
        description: "Monsoon trek with temperatures ranging from 8°C to 18°C.",
        items: [
          { name: "Heavy Waterproof Poncho or Rain Jacket", importance: "Mandatory", notes: "Monsoon rain protection." },
          { name: "Waterproof Trekking Shoes with Ankle Support", importance: "Mandatory", notes: "Essential for slippery stone trails." },
          { name: "Quick-Dry Synthetic Pants & Tops", importance: "Mandatory", notes: "Cotton takes too long to dry." },
          { name: "Thermals & Fleece Jacket", importance: "Mandatory", notes: "Cold winds at Hemkund Sahib." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Photo ID (Aadhar / Driving License / Passport)"],
      processingDays: "Forest Permits issued instantly at Ghangaria Entry Gate",
      checkposts: ["Govindghat Checkpoint", "Ghangaria Forest Checkpost"],
      medicalRequirements: "Good cardiovascular endurance for 6 km steep ascent to Hemkund Sahib.",
      guidelines: ["Valley of Flowers entry is strictly open from 7:00 AM to 5:00 PM. No overnight camping allowed inside valley."]
    },
    inclusions: [
      "Rishikesh / Haridwar roundtrip transfers in Tempo Traveler / SUV",
      "All hotel & lodge accommodations at Govindghat and Ghangaria",
      "Forest entry permits & eco-development fees",
      "Certified local trek guide & medical oxygen support",
      "All meals (Breakfast, Lunch, Dinner)"
    ],
    exclusions: ["GST 5%", "Pony / Porter / Helicopter charges"],
    faqs: [
      {
        question: "When is the best time to see flowers in bloom?",
        answer: "The flowers begin blooming in late June and peak between mid-July and mid-August. By September, seeds form and colors shift to golden autumn tones."
      },
      {
        question: "Is helicopter service available for Ghangaria and Hemkund Sahib?",
        answer: "Helicopter service operates between Govindghat and Ghangaria (weather permitting). From Ghangaria to Hemkund Sahib, trekking, ponies, or palanquins (palki) are available."
      }
    ]
  },

  "chardham-yatra": {
    slug: "chardham-yatra",
    title: "Garhwal Char Dham Grand Pilgrimage Yatra 2027",
    subtitle: "Yamunotri · Gangotri · Kedarnath Dham · Badrinath Dham",
    tagline: "The Supreme Four Shrines Circuit in the Holy Garhwal Himalayas",
    location: "Uttarkashi, Rudraprayag & Chamoli Districts, Uttarakhand",
    duration: "10 Days / 9 Nights",
    altitude: "11,755 ft (Kedarnath Dham) / 10,830 ft (Badrinath Dham)",
    difficulty: "High Altitude Expedition",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 32000,
    pricePremium: 48000,
    bannerImage: "/images/destinations/chardham-yatra.webp",
    galleryImages: [
      "/images/temples/badrinath.webp",
      "/images/temples/kedarnath.webp",
      "/images/temples/yamunotri.webp",
      "/images/temples/gangotri.webp"
    ],
    overview: "The Char Dham Yatra of Uttarakhand is India's most revered spiritual circuit, visiting Yamunotri (origin of River Yamuna), Gangotri (origin of River Ganga at Gaumukh), Kedarnath Dham (one of the 12 sacred Jyotirlingas of Lord Shiva), and Badrinath Dham (abode of Lord Vishnu). Spanning the glorious heights of Garhwal Himalayas, this 10-day pilgrimage promises spiritual rebirth, divine blessings, and awe-inspiring Himalayan landscapes.",
    spiritualSignificance: "Completing the Char Dham Yatra in the sequence of West to East (Yamunotri → Gangotri → Kedarnath → Badrinath) is believed to cleanse a soul of all karmic sins and grant Moksha (liberation from the cycle of rebirth).",
    highlights: [
      "Darshan of all 4 sacred Shrines: Yamunotri, Gangotri, Kedarnath & Badrinath",
      "16 km trek to Kedarnath Jyotirlinga or optional Helicopter transfer",
      "Surya Kund thermal bath & Divya Shila worship at Yamunotri",
      "Gangotri Temple Darshan & holy Ganga Snan at Bhagirathi river",
      "VIP Pass assistance & guaranteed e-Registration Yatra Pass handling",
      "Luxury SUV / Innova options with seasoned high-altitude drivers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Barkot via Mussoorie & Kempty Falls",
        altitude: "4,200 ft",
        distance: "210 km (7-8 hrs drive)",
        stay: "Deluxe Hotel / Resort in Barkot",
        meals: "Lunch & Dinner",
        desc: "Morning reception at Haridwar / Rishikesh. Scenic drive via Mussoorie and Kempty Falls to Barkot. Biometric verification check and rest before Yamunotri trek.",
        activities: ["Mussoorie Views", "Barkot Evening Yatra Briefing"]
      },
      {
        day: 2,
        title: "Barkot to Yamunotri Dham Darshan & Return to Barkot",
        altitude: "10,800 ft",
        distance: "36 km drive + 6 km trek each way",
        stay: "Hotel in Barkot",
        meals: "Breakfast, Packed Snacks, Dinner",
        desc: "Drive to Janki Chatti. Begin 6 km trek along Yamuna river to Yamunotri. Dip Prasad in boiling Surya Kund thermal springs, perform Yamuna Devi Puja at temple, worship Divya Shila, and return to Barkot.",
        activities: ["Yamunotri Temple Darshan", "Surya Kund Thermal Spring Rice Prasadam"]
      },
      {
        day: 3,
        title: "Barkot to Uttarkashi via Kashi Vishwanath Temple",
        altitude: "3,800 ft",
        distance: "100 km (4 hrs drive)",
        stay: "Hotel on Ganges bank in Uttarkashi",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Drive along Yamuna to Bhagirathi valley. Visit ancient Kashi Vishwanath Temple and Shakti Trishul in Uttarkashi.",
        activities: ["Uttarkashi Kashi Vishwanath Temple", "Ganga Aarti"]
      },
      {
        day: 4,
        title: "Uttarkashi to Gangotri Dham Darshan & Return to Uttarkashi",
        altitude: "10,200 ft",
        distance: "100 km drive each way",
        stay: "Hotel in Uttarkashi",
        meals: "Breakfast, Lunch at Harsil, Dinner",
        desc: "Drive through majestic Harsil Valley along Bhagirathi river. Holy dip at Gangotri Ghat and Darshan of Goddess Ganga temple. Return to Uttarkashi.",
        activities: ["Gangotri Temple Darshan", "Harsil Valley Apple Orchards Stop"]
      },
      {
        day: 5,
        title: "Uttarkashi to Guptkashi / Phata via Tehri Dam View",
        altitude: "4,300 ft",
        distance: "220 km (8 hrs drive)",
        stay: "Deluxe Hotel / Camp in Guptkashi / Phata",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Drive via Tehri Dam reservoir and Mandakini valley to Guptkashi. Medical fitness check for Kedarnath trek.",
        activities: ["Tehri Lake View", "Guptkashi Vishwanath Temple"]
      },
      {
        day: 6,
        title: "Guptkashi to Gaurikund & Trek to Kedarnath Dham",
        altitude: "11,755 ft",
        distance: "30 km drive + 16 km trek / Heli Option",
        stay: "Hotel / KMVN Guest House near Kedarnath Temple",
        meals: "Breakfast & Hot Dinner at Kedarnath",
        desc: "Early morning transfer to Sonprayag/Gaurikund. Trek 16 km along rushing Mandakini River to Kedarnath Dham. Evening grand Aarti at Kedarnath Temple under majestic snow-capped peaks.",
        activities: ["Kedarnath Temple Evening Aarti", "Holy Bhairav Nath Darshan"]
      },
      {
        day: 7,
        title: "Kedarnath Temple Morning Puja & Trek Down to Guptkashi",
        altitude: "4,300 ft",
        distance: "16 km downhill trek + 30 km drive",
        stay: "Hotel in Guptkashi",
        meals: "Breakfast & Dinner",
        desc: "Pre-dawn Abhishek Puja at Kedarnath Jyotirlinga. Descend down to Gaurikund and drive back to Guptkashi for well-deserved rest.",
        activities: ["Kedarnath Sunrise Abhishek", "Return Trek to Gaurikund"]
      },
      {
        day: 8,
        title: "Guptkashi to Badrinath Dham via Chopta & Joshimath",
        altitude: "10,830 ft",
        distance: "190 km (7-8 hrs drive)",
        stay: "Deluxe Hotel near Badrinath Temple",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Drive through Chopta (Mini Switzerland of India) and Joshimath. Arrive at Badrinath Dham. Dip in Tapt Kund hot springs and attend evening Swarna Aarti.",
        activities: ["Tapt Kund Hot Dip", "Badrinath Temple Swarna Aarti"]
      },
      {
        day: 9,
        title: "Badrinath Morning Darshan, Mana Village Visit & Drive to Rudraprayag",
        altitude: "2,900 ft",
        distance: "160 km drive",
        stay: "Riverside Resort in Rudraprayag / Srinagar",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Morning Darshan of Lord Badri Vishal. Visit Mana Village, Saraswati river origin, and Vyas Gufa. Drive down to Rudraprayag.",
        activities: ["Badri Vishal Darshan", "Mana Village & Vyas Gufa", "Rudraprayag Sangam View"]
      },
      {
        day: 10,
        title: "Rudraprayag to Rishikesh / Haridwar Drop via Devprayag",
        altitude: "1,100 ft",
        distance: "165 km drive",
        stay: "Departure",
        meals: "Breakfast & En-route Lunch",
        desc: "Drive via Rishikesh (Laxman Jhula / Ram Jhula) and drop at Haridwar / Rishikesh Railway Station or Dehradun Airport.",
        activities: ["Rishikesh Ganga Aarti", "Railway Station / Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "10-Day Layering & Footwear",
        iconName: "Shirt",
        description: "Temperatures fluctuate from 25°C in valleys to sub-zero (-2°C) at Kedarnath.",
        items: [
          { name: "Heavy Down Jacket / Puffer Coat (-5°C rated)", importance: "Mandatory", notes: "Crucial for Kedarnath night & morning." },
          { name: "Sturdy Trekking Boots with Thick Socks", importance: "Mandatory", notes: "For 16 km Kedarnath & 6 km Yamunotri treks." },
          { name: "Thermals (2-3 Sets) & Woolen Caps / Gloves", importance: "Mandatory", notes: "High altitude warmth." },
          { name: "Rain Poncho & Small Daypack", importance: "Mandatory", notes: "Unpredictable mountain weather." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original", "Mandatory Uttarakhand Char Dham Yatra e-Registration Pass"],
      processingDays: "E-Registration Pass managed 100% in advance by GoTrek team",
      checkposts: ["Sonprayag Checkpoint", "Janki Chatti Checkpoint", "Uttarkashi Verification Gate"],
      medicalRequirements: "Mandatory health self-declaration and medical check for Kedarnath high altitude trek.",
      guidelines: ["VIP darshan slips and token numbers coordinated by GoTrek yatra leads at all four temples."]
    },
    inclusions: [
      "Haridwar / Rishikesh roundtrip transfers in AC Tempo Traveler / SUV",
      "All 9 nights hotel & resort accommodations with attached bathrooms",
      "Uttarakhand Char Dham Yatra e-Pass & Biometric registration",
      "Pure vegetarian meals (Breakfast & Dinner) throughout yatra",
      "Dedicated Yatra Manager & emergency medical oxygen assistance"
    ],
    exclusions: ["GST 5%", "Kedarnath Helicopter Tickets", "Pony / Palki charges"],
    faqs: [
      {
        question: "Can I book helicopter tickets for Kedarnath through GoTrek?",
        answer: "Yes! We assist pilgrims with official IRCTC HeliYatra slot booking from Phata / Sirsi / Sersi helipads to Kedarnath Dham."
      },
      {
        question: "Is Char Dham Yatra suitable for senior citizens?",
        answer: "Yes! Over 60% of our pilgrims are senior citizens. We offer customized luxury SUV options, ground-floor hotel rooms, horse/palki arrangements, and medical oxygen support throughout the trip."
      }
    ]
  },

  "do-dham-kedarnath-badrinath": {
    slug: "do-dham-kedarnath-badrinath",
    title: "Kedarnath & Badrinath Do Dham Sacred Yatra 2027",
    subtitle: "Lord Shiva Jyotirlinga & Lord Vishnu Abode · Guptkashi · Chopta · Mana Village",
    tagline: "The Supreme Two-Shrine Pilgrimage of Salvation in Garhwal Himalayas",
    location: "Rudraprayag & Chamoli Districts, Uttarakhand",
    duration: "6 Days / 5 Nights",
    altitude: "11,755 ft (Kedarnath) · 10,830 ft (Badrinath)",
    difficulty: "Moderate",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 22500,
    pricePremium: 34500,
    bannerImage: "/images/temples/badrinath.webp",
    galleryImages: [
      
    ],
    overview: "The Kedarnath and Badrinath Do Dham Yatra is India's most celebrated sacred combination pilgrimage, uniting the supreme cosmic energies of Lord Shiva (as the 11th Jyotirlinga at 11,755 ft) and Lord Vishnu (Badri Vishal at 10,830 ft). This 6-day journey winds through the majestic Garhwal river confluences (Prayags), the scenic alpine valleys of Chopta, and concludes with the pristine Indo-Tibet frontier at Mana Village.",
    spiritualSignificance: "Scriptures state that worshiping Lord Shiva at Kedarnath followed by seeking liberation (Moksha) at Badrinath completes the highest spiritual triad of human existence. It balances intense self-realization (Shiva) with cosmic preservation and grace (Vishnu).",
    highlights: [
      "Holy Darshan & Abhishek at Kedarnath Jyotirlinga (11,755 ft)",
      "Lord Badri Vishal Darshan & Grand Swarna Evening Aarti at Badrinath",
      "Holy dip in natural 45°C sulfur hot spring at Tapt Kund",
      "Scenic mountain drive through Chopta ('Mini Switzerland of India')",
      "Visit Mana Village — India's Last Village, Vyas Gufa, Ganesh Gufa & Bhim Pul",
      "View Panch Prayag confluences: Devprayag, Rudraprayag, Karnaprayag & Nandaprayag",
      "Optional Helicopter transfer coordination from Phata / Sersi helipads",
      "100% Guaranteed Uttarakhand Char Dham Yatra e-Pass & VIP assistance"
    ],
    famousSpots: [
      {
        name: "Kedarnath Jyotirlinga Mandir",
        altitude: "11,755 ft (3,583 m)",
        category: "Spiritual",
        significance: "The supreme 11th Jyotirlinga of Lord Shiva amidst the snow-clad Kedar Dome massif.",
        description: "1,000-year-old stone temple housing the triangular Shiva Linga against the towering Kedar Massif.",
        image: "/images/temples/kedarnath.webp",
        mythologicalLore: "Built by the Pandavas to seek redemption from Lord Shiva after the Mahabharata battle.",
        keyHighlights: ["11th Shiva Jyotirlinga", "Evening Mandakini Aarti", "Bhim Shila Rock"]
      },
      {
        name: "Badrinath Dham & Tapt Kund",
        altitude: "10,830 ft (3,300 m)",
        category: "Spiritual",
        significance: "Supreme abode of Lord Vishnu on the banks of holy Alaknanda River.",
        description: "Supreme abode of Lord Vishnu situated between Nar and Narayana mountain ranges under Neelkanth peak.",
        image: "/images/temples/badrinath.webp",
        mythologicalLore: "Lord Vishnu performed penance here while Goddess Lakshmi sheltered him as a Badri (jujube) tree.",
        keyHighlights: ["Badri Vishal Darshan", "45°C Sulfur Tapt Kund Snan", "Swarna Maha Aarti"]
      },
      {
        name: "Mana Village & Saraswati River",
        altitude: "10,500 ft (3,200 m)",
        category: "Heritage Village",
        significance: "The last inhabited Indian village before the Indo-Tibet frontier.",
        description: "The Last Indian Village before Tibet border, housing Vyas Gufa and the ferocious roaring Saraswati river gorge.",
        image: "/images/temples/mana-village.webp",
        mythologicalLore: "Maharishi Vyas dictated the Mahabharata epic to Lord Ganesha in this sacred rock cave.",
        keyHighlights: ["Vyas Gufa", "Ganesha Cave", "Bhim Pul Giant Rock Bridge", "Origin of Saraswati River"]
      },
      {
        name: "Chopta Valley Meadows",
        altitude: "8,790 ft (2,680 m)",
        category: "Scenic Viewpoint",
        significance: "High alpine Bugyal known as the Switzerland of Uttarakhand.",
        description: "Known as the Mini Switzerland of Uttarakhand, blanketed by dense Rhododendron and Deodar forests.",
        image: "/images/temples/chopta-valley.webp",
        mythologicalLore: "Gateway to Tungnath, the highest Shiva temple in the world (12,073 ft).",
        keyHighlights: ["Pristine Bugyals", "360° Chaukhamba Peak Vistas", "Refreshing Alpine Breeze"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Guptkashi via Devprayag & Rudraprayag",
        altitude: "4,300 ft",
        distance: "210 km (7-8 hrs drive)",
        stay: "Deluxe Hotel / Resort in Guptkashi / Phata",
        meals: "Lunch & Dinner",
        desc: "Morning pickup from Haridwar / Rishikesh. Journey along the sacred Ganges and Alaknanda rivers. Witness the divine confluence of Bhagirathi and Alaknanda at Devprayag. Continue through Rudraprayag to Guptkashi. Evening briefing and yatra kit verification.",
        activities: ["Devprayag Sangam View", "Rudraprayag Alaknanda Mandakini Confluence", "Guptkashi Vishwanath Temple"]
      },
      {
        day: 2,
        title: "Guptkashi to Gaurikund & Trek / Heli to Kedarnath Dham Darshan",
        altitude: "11,755 ft",
        distance: "30 km drive + 16 km trek / Heli transfer",
        stay: "Hotel / KMVN Guest House near Kedarnath Temple",
        meals: "Breakfast, Hot Mountain Dinner at Kedarnath",
        desc: "Early morning transfer to Gaurikund base or Phata Helipad. Trek 16 km along the Mandakini River with horse/palki support or board the scenic helicopter shuttle. Reach Kedarnath by afternoon, check-in, visit Bhim Shila, and attend the grand evening Shiva Aarti.",
        activities: ["Kedarnath Temple Evening Aarti", "Bhim Shila Darshan", "Night Stay in Holy Dham Valley"]
      },
      {
        day: 3,
        title: "Pre-Dawn Kedarnath Abhishek, Bhairavnath & Trek Down to Pipalkoti",
        altitude: "4,100 ft",
        distance: "16 km downhill trek + 110 km drive",
        stay: "Deluxe Riverside Hotel in Pipalkoti / Joshimath",
        meals: "Breakfast & Dinner",
        desc: "Participate in pre-dawn Nirmalaya Darshan / Rudra Abhishek. Short scenic hike to Bhairavnath Temple for panoramic valley views. Trek down to Gaurikund and board our private vehicle for a comfortable drive to Pipalkoti / Joshimath base.",
        activities: ["Pre-Dawn Temple Darshan", "Bhairavnath Mandir Trek", "Pipalkoti Scenic Stay"]
      },
      {
        day: 4,
        title: "Pipalkoti to Badrinath Dham, Tapt Kund Snan & Swarna Aarti",
        altitude: "10,830 ft",
        distance: "75 km (3.5 hrs drive)",
        stay: "Deluxe Hotel near Badrinath Temple",
        meals: "Breakfast, Lunch & Dinner",
        desc: "Scenic morning drive past Govindghat and Joshimath ascending to Badrinath Dham. Take a purifying bath in the natural hot sulfur waters of Tapt Kund, perform afternoon Badri Vishal Darshan, explore the temple complex, and participate in the evening Swarna Aarti.",
        activities: ["Tapt Kund Thermal Bath", "Badri Vishal Darshan", "Evening Swarna Aarti", "Neelkanth Peak Views"]
      },
      {
        day: 5,
        title: "Mana Village & Saraswati Exploration, Drive to Rudraprayag / Srinagar",
        altitude: "2,950 ft",
        distance: "160 km (5-6 hrs drive)",
        stay: "Riverside Resort in Rudraprayag / Srinagar Garhwal",
        meals: "Breakfast & Dinner",
        desc: "Morning excursion to Mana (India's Last Village). Visit Vyas Gufa, Ganesha Cave, and the roaring Saraswati River beneath the natural stone bridge of Bhim Pul. Begin return drive through Karnaprayag and Nandaprayag to Rudraprayag.",
        activities: ["Mana Village Cultural Tour", "Vyas Gufa & Bhim Pul", "Karnaprayag Confluence View"]
      },
      {
        day: 6,
        title: "Rudraprayag to Rishikesh / Haridwar Departure",
        altitude: "1,100 ft",
        distance: "165 km (5 hrs drive)",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic morning drive along the Ganga valley. Visit Ram Jhula and Lakshman Jhula in Rishikesh. Drop at Haridwar Railway Station / Dehradun Jolly Grant Airport for onward journey with divine blessings of Baba Kedar & Badri Vishal.",
        activities: ["Rishikesh Riverside Stop", "Drop at Station / Airport"]
      }
    ],
    whatToWear: [
      {
        category: "Sub-Zero Mountain Wear",
        iconName: "Shirt",
        description: "Kedarnath drops to -2°C at night, while Badrinath averages 6°C to 14°C.",
        items: [
          { name: "Heavy Windproof & Waterproof Hooded Jacket", importance: "Mandatory", notes: "Essential for Kedarnath night stay and high wind." },
          { name: "Thermal Base Layers (2 Upper + 2 Lower)", importance: "Mandatory", notes: "Pure merino wool or fleece lined." },
          { name: "Sturdy Waterproof Trekking Shoes with Grip", importance: "Mandatory", notes: "For 16 km Gaurikund to Kedarnath trail." },
          { name: "Woolen Gloves, Woolen Cap & Neck Muffler", importance: "Mandatory", notes: "Protection against alpine evening chill." },
          { name: "Lightweight Rain Poncho & Quick-Dry Towel", importance: "Mandatory", notes: "For Tapt Kund bath and rain protection." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card / Government Photo ID", "Uttarakhand Char Dham e-Registration Pass", "Passport-size photographs"],
      processingDays: "Processed instantly in advance by GoTrek liaison team",
      checkposts: ["Sonprayag Police Checkpost", "Gaurikund Gate", "Govindghat Checkpost"],
      medicalRequirements: "General health declaration for Kedarnath 11,755 ft altitude.",
      guidelines: [
        "GoTrek team manages all government biometric verifications at Sonprayag.",
        "Helicopter slot coordination from Phata, Sersi, or Guptkashi available on request.",
        "Ponies, dolis, and palanquins readily available at Gaurikund base."
      ]
    },
    inclusions: [
      "Haridwar / Rishikesh pickup and drop in private AC vehicle (Innova / Crysta / Tempo Traveller)",
      "5 nights deluxe accommodation (Guptkashi, Kedarnath Dham, Pipalkoti, Badrinath, Rudraprayag)",
      "Pure vegetarian Sattvik meals (Daily Breakfast & Dinner)",
      "Official Uttarakhand Government Char Dham Yatra e-Pass processing",
      "VIP Darshan queue assistance at Badrinath and Kedarnath",
      "Mana Village excursion & sightseeing transfers",
      "Dedicated high-altitude mountain driver, fuel, tolls, parking and driver allowances",
      "Emergency oxygen cylinder and first-aid medical support in vehicle"
    ],
    exclusions: [
      "5% GST",
      "Helicopter ticket fare (if opting for Heli transfer to Kedarnath)",
      "Pony / Horse / Palki / Doli charges on the trek route",
      "Personal expenses, laundry, telephone calls, and temple special puja donation fees"
    ],
    faqs: [
      {
        question: "How difficult is the Do Dham Yatra (Kedarnath & Badrinath)?",
        answer: "The Badrinath portion is entirely motorable with vehicle parking right next to the temple. The Kedarnath portion involves a 16 km trek from Gaurikund, which can easily be completed on foot (6-7 hrs), pony/horse (3-4 hrs), or via a 7-minute helicopter ride from Phata/Sersi."
      },
      {
        question: "Can senior citizens comfortably do this Do Dham Yatra?",
        answer: "Yes! Over 60% of our pilgrims on this circuit are senior citizens. We arrange ground-floor rooms, priority vehicle access, pony/palki bookings, or helicopter transfers, with oxygen cylinders available in our vehicles."
      },
      {
        question: "What is the best time for Kedarnath & Badrinath Do Dham Yatra?",
        answer: "The ideal months are May to June (pleasant summer weather and open roads) and September to November (crisp autumn skies and panoramic snow peak views). Shrines open on Akshaya Tritiya (early May) and close after Diwali / Bhai Dooj (early November)."
      },
      {
        question: "Does GoTrek assist with Kedarnath Helicopter tickets?",
        answer: "Yes! As an authorized local operator, we assist our booked pilgrims with the official IRCTC HeliYatra ticket reservation and transfer logistics from Phata, Sersi, and Guptkashi helipads."
      }
    ]
  },

  "yamunotri-dham": {
    slug: "yamunotri-dham",
    title: "Yamunotri Dham Sacred Yatra 2027",
    subtitle: "First Shrine of Char Dham · Origin of Goddess Yamuna · Kalindi Parvat",
    tagline: "Holy Dip in Surya Kund & Blessings at the Source of River Yamuna",
    location: "Uttarkashi District, Garhwal Himalayas, Uttarakhand",
    duration: "3 Days / 2 Nights",
    altitude: "10,800 ft (3,293 m)",
    difficulty: "Moderate",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 12500,
    pricePremium: 18500,
    bannerImage: "/images/temples/yamunotri.webp",
    galleryImages: [
      "/images/temples/yamunotri.webp",
      "/images/temples/yamunotri-2.webp",
      "/images/temples/yamunotri-3.webp"
    ],
    overview: "Yamunotri Dham, situated at 10,800 ft atop Kalindi Parvat in Uttarkashi district, is the revered origin shrine of River Yamuna and the traditionally prescribed first stop of the sacred Char Dham Yatra. Surrounded by majestic snow-clad peaks of Bandarpoonch (20,722 ft), Yamunotri features the black marble idol of Yamuna Devi and natural boiling thermal springs like Surya Kund where pilgrims cook rice prasad as divine blessings.",
    spiritualSignificance: "Goddess Yamuna is the daughter of Surya Dev (Sun God) and sister of Yama Dev (God of Death). According to scriptures, taking a holy bath in Yamuna River grants freedom from fear of death and cleanses worldly sins.",
    highlights: [
      "Darshan of Yamuna Devi idol & Puja at Divya Shila",
      "Cook rice & potatoes wrapped in cloth in the 88°C boiling waters of Surya Kund",
      "Breathe invigorating air during 6 km scenic trek from Janki Chatti",
      "Warm thermal bath at Gauri Kund hot springs",
      "Spectacular view of Bandarpoonch peak and Kalindi mountain",
      "Complete e-Pass assistance & ground-floor Barkot hotel stays"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Dehradun to Barkot via Mussoorie & Kempty Falls",
        altitude: "4,200 ft",
        distance: "210 km (7 hrs drive)",
        stay: "Deluxe Hotel / Resort in Barkot",
        meals: "Lunch & Dinner",
        desc: "Morning pickup from Haridwar / Dehradun. Drive through Mussoorie, stop at Kempty Falls, and reach Barkot nestled along the Yamuna valley.",
        activities: ["Mussoorie Drive", "Barkot Yatra Briefing"]
      },
      {
        day: 2,
        title: "Barkot to Janki Chatti & 6 km Trek to Yamunotri Dham Darshan",
        altitude: "10,800 ft",
        distance: "36 km drive + 6 km trek each way",
        stay: "Hotel in Barkot",
        meals: "Breakfast, Packed Lunch, Dinner",
        desc: "Early morning drive to Janki Chatti. Trek 6 km along Yamuna river stream to Yamunotri Temple. Offer worship at Divya Shila, cook rice at Surya Kund, perform Yamuna Ji Aarti, and return to Barkot.",
        activities: ["Yamunotri Temple Darshan", "Surya Kund Boiling Spring Prasad", "Return Trek"]
      },
      {
        day: 3,
        title: "Barkot to Haridwar / Rishikesh Drop",
        altitude: "1,100 ft",
        distance: "210 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic return drive to Haridwar / Dehradun Railway Station.",
        activities: ["Drop at Station / Airport"]
      }
    ],
    whatToWear: [
      {
        category: "Trekking Wear & Warm Outerwear",
        iconName: "Shirt",
        description: "Daytime 12°C to 18°C, morning/evening 4°C.",
        items: [
          { name: "Heavy Fleece Jacket & Thermal Base Layer", importance: "Mandatory", notes: "Needed for early morning trek." },
          { name: "Waterproof Trekking Shoes", importance: "Mandatory", notes: "Proper grip for 6 km stone pathway." },
          { name: "Rain Poncho & Small Rucksack", importance: "Mandatory", notes: "Unpredictable mountain weather." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original", "Uttarakhand Char Dham e-Registration Pass"],
      processingDays: "Processed in advance by GoTrek team",
      checkposts: ["Janki Chatti Checkpoint"],
      medicalRequirements: "Self-declaration form.",
      guidelines: ["Horses, palkis, and doli services available at Janki Chatti."]
    },
    inclusions: [
      "Haridwar transfers in Tempo Traveler / SUV",
      "Hotel stay in Barkot with attached bath",
      "Pure veg meals (Breakfast & Dinner)",
      "Yatra e-Pass processing"
    ],
    exclusions: ["GST 5%", "Pony / Palki charges"],
    faqs: [
      {
        question: "How long is the trek to Yamunotri?",
        answer: "The trek is 6 km each way starting from Janki Chatti. It takes approximately 2.5 to 3.5 hours depending on fitness."
      }
    ]
  },

  "gangotri-dham": {
    slug: "gangotri-dham",
    title: "Gangotri Dham Sacred Yatra 2027",
    subtitle: "Second Shrine of Char Dham · Origin of Bhagirathi (Ganga) River",
    tagline: "Holy Ganga Snan & Divine Temple Blessings in Uttarkashi Valley",
    location: "Uttarkashi District, Garhwal Himalayas, Uttarakhand",
    duration: "3 Days / 2 Nights",
    altitude: "10,200 ft (3,100 m)",
    difficulty: "Easy",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 11500,
    pricePremium: 17500,
    bannerImage: "/images/temples/gangotri.webp",
    galleryImages: [
      "/images/temples/gangotri-2.webp",
      "/images/temples/gangotri-3.webp",
      "/images/temples/gangotri-4.webp"
    ],
    overview: "Gangotri Dham is the holy seat of Goddess Ganga located on the banks of Bhagirathi River at 10,200 ft in Uttarkashi district. The white granite temple was constructed in the 18th century by Gorkha commander Amar Singh Thapa. Surrounded by towering Deodar trees and majestic snow peaks, Gangotri marks the spot where Mother Ganga descended from Lord Shiva's hair to cleanse humanity.",
    spiritualSignificance: "King Bhagirath meditated on a sacred rock (Bhagirath Shila) near Gangotri for thousands of years to bring River Ganga down from heaven. A holy bath in Bhagirathi River here washes away all karmic sins.",
    highlights: [
      "Holy Darshan of Goddess Ganga inside white granite Gangotri Temple",
      "Sacred Ganga Snan (bath) at Gangotri Ghat",
      "Visit Submerged Shivling where Shiva trapped Ganga in his locks",
      "Drive through breathtaking Harsil Valley apple orchards & Dharali",
      "Visit Bhagirath Shila & Pandav Gufa cave trail",
      "Zero trekking required — motorable right up to temple parking!"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Uttarkashi via Kashi Vishwanath Temple",
        altitude: "3,800 ft",
        distance: "175 km (6 hrs drive)",
        stay: "Riverside Hotel in Uttarkashi",
        meals: "Lunch & Dinner",
        desc: "Drive along Bhagirathi river to Uttarkashi. Visit ancient Kashi Vishwanath Temple and Shakti Trishul in evening.",
        activities: ["Kashi Vishwanath Temple Darshan", "Ganga Riverside Walk"]
      },
      {
        day: 2,
        title: "Uttarkashi to Gangotri Dham via Harsil Valley & Return",
        altitude: "10,200 ft",
        distance: "100 km drive each way",
        stay: "Hotel in Uttarkashi",
        meals: "Breakfast, Lunch at Harsil, Dinner",
        desc: "Drive through Harsil Valley apple country. Arrive at Gangotri Dham. Take holy dip at Ganga Ghat, offer prayers at main temple, visit Bhagirath Shila, and return to Uttarkashi.",
        activities: ["Gangotri Temple Darshan", "Bhagirathi Ganga Aarti", "Harsil Stopover"]
      },
      {
        day: 3,
        title: "Uttarkashi to Haridwar / Rishikesh Drop",
        altitude: "1,100 ft",
        distance: "175 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic return drive to Haridwar / Rishikesh.",
        activities: ["Drop at Station / Airport"]
      }
    ],
    whatToWear: [
      {
        category: "Clothing & Warm Layering",
        iconName: "Shirt",
        description: "Cool mountain breezes at 10,200 ft (8°C to 16°C).",
        items: [
          { name: "Fleece Jacket + Woolen Cap", importance: "Mandatory", notes: "Chilly river winds at Gangotri Ghat." },
          { name: "Thermal Underwear Set", importance: "Mandatory", notes: "Comfortable for morning drive." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "500m flat walk from parking to temple." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original", "Char Dham e-Pass"],
      processingDays: "Processed in advance by GoTrek team",
      checkposts: ["Uttarkashi Checkpost"],
      medicalRequirements: "General health declaration.",
      guidelines: ["No trek required. Suitable for elderly & families."]
    },
    inclusions: [
      "AC Vehicle / Tempo Traveller transfers",
      "Hotel stays in Uttarkashi",
      "All vegetarian meals",
      "e-Pass assistance"
    ],
    exclusions: ["GST 5%", "Gaumukh trekking permits"],
    faqs: [
      {
        question: "Is trekking required to reach Gangotri Temple?",
        answer: "No! Vehicles park within 500 meters of the temple gate. It is a smooth, paved walk."
      }
    ]
  },

  "kedarnath-dham": {
    slug: "kedarnath-dham",
    title: "Kedarnath Dham Sacred Jyotirlinga Yatra 2027",
    subtitle: "Third Shrine of Char Dham · 11th Jyotirlinga of Lord Shiva · Mandakini Valley",
    tagline: "Eternal Abode of Lord Shiva in the High Himalayas at 11,755 ft",
    location: "Rudraprayag District, Garhwal Himalayas, Uttarakhand",
    duration: "4 Days / 3 Nights",
    altitude: "11,755 ft (3,583 m)",
    difficulty: "Challenging",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 16500,
    pricePremium: 26500,
    bannerImage: "/images/temples/kedarnath.webp",
    galleryImages: [
      "/images/temples/kedarnath-2.webp",
      "/images/temples/kedarnath-3.webp",
      "/images/temples/kedarnath-4.webp"
    ],
    overview: "Kedarnath Dham is one of the 12 sacred Jyotirlingas of Lord Shiva and the most revered shrine in the Panch Kedar circuit. Situated at 11,755 ft near Chorabari Glacier and the towering Kedar Massif, the 1,000-year-old stone temple built by Adi Shankaracharya houses the divine triangular Shiva Linga. It famously survived the 2013 Himalayan deluge untouched, protected by the giant Bhim Shila rock.",
    spiritualSignificance: "Built by the Pandavas to seek forgiveness after the Kurukshetra war, Lord Shiva took the form of a bull and dove into the ground at Kedarnath. Touching the sacred stone hump during Abhishek bestows spiritual liberation.",
    highlights: [
      "Holy Darshan & Shiva Abhishek at 11th Jyotirlinga Kedarnath Temple",
      "Attend emotional Evening & Morning Aarti under snow-capped peaks",
      "Worship Bhairavnath Temple overlooking Kedarnath Valley",
      "See the miraculous Bhim Shila boulder that protected the temple",
      "16 km trek from Gaurikund or fast Helicopter transfer from Phata/Sersi",
      "Guaranteed e-Pass registration & VIP Darshan assistance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Guptkashi / Phata via Devprayag & Rudraprayag",
        altitude: "4,300 ft",
        distance: "210 km (7-8 hrs drive)",
        stay: "Deluxe Hotel / Camp in Guptkashi / Phata",
        meals: "Lunch & Dinner",
        desc: "Drive past Devprayag Sangam and Rudraprayag along Mandakini River to Guptkashi base camp.",
        activities: ["Devprayag View", "Guptkashi Vishwanath Temple Visit"]
      },
      {
        day: 2,
        title: "Guptkashi to Gaurikund & 16 km Trek / Helicopter to Kedarnath Dham",
        altitude: "11,755 ft",
        distance: "30 km drive + 16 km trek or Heli transfer",
        stay: "Hotel / KMVN Guest House near Kedarnath Temple",
        meals: "Breakfast, Hot Dinner at Kedarnath",
        desc: "Early transfer to Gaurikund. Trek 16 km along rushing Mandakini river to Kedarnath. Arrive at temple, check-in, and attend spectacular evening Shiva Aarti.",
        activities: ["Kedarnath Temple Evening Aarti", "Bhim Shila Worship", "Night Stay in Dham"]
      },
      {
        day: 3,
        title: "Pre-Dawn Abhishek, Bhairavnath Visit & Trek Down to Guptkashi",
        altitude: "4,300 ft",
        distance: "16 km downhill trek + 30 km drive",
        stay: "Hotel in Guptkashi",
        meals: "Breakfast & Dinner",
        desc: "Early morning Darshan and Abhishek Puja. Short hike to Bhairavnath Temple. Trek down to Gaurikund and drive back to Guptkashi for rest.",
        activities: ["Pre-dawn Temple Abhishek", "Bhairavnath Hike", "Return to Guptkashi"]
      },
      {
        day: 4,
        title: "Guptkashi to Haridwar / Rishikesh Drop",
        altitude: "1,100 ft",
        distance: "210 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Return drive to Haridwar / Rishikesh / Dehradun.",
        activities: ["Drop at Station / Airport"]
      }
    ],
    whatToWear: [
      {
        category: "Extreme Cold & High Altitude Layering",
        iconName: "Shirt",
        description: "Temperatures drop to -2°C to 5°C at night at Kedarnath.",
        items: [
          { name: "Heavy Hooded Down Jacket (-10°C rated)", importance: "Mandatory", notes: "Essential for night stay at Kedarnath." },
          { name: "2 Sets Thermal Base Layers", importance: "Mandatory", notes: "Keeps warm during 16 km trek." },
          { name: "Waterproof Ankle-High Trekking Boots", importance: "Mandatory", notes: "Sturdy grip for steep stone stairs." },
          { name: "Heavy Raincoat / Poncho & Gloves", importance: "Mandatory", notes: "Unpredictable mountain rain." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original", "Mandatory Uttarakhand Char Dham e-Pass"],
      processingDays: "Processed in advance by GoTrek team",
      checkposts: ["Sonprayag Checkpoint", "Gaurikund Gate"],
      medicalRequirements: "Mandatory health self-declaration for 11,755 ft trek.",
      guidelines: ["Helicopter seats booked via official IRCTC portal. Horses & palkis available at Gaurikund."]
    },
    inclusions: [
      "Haridwar transfers in Tempo Traveler / SUV",
      "Guptkashi hotel stay + Kedarnath temple accommodation",
      "All vegetarian meals",
      "e-Pass & VIP assistance"
    ],
    exclusions: ["GST 5%", "Helicopter ticket fare", "Pony / Palki charges"],
    faqs: [
      {
        question: "How do I book a helicopter to Kedarnath?",
        answer: "GoTrek assists pilgrims with official IRCTC HeliYatra booking from Phata, Sersi, or Guptkashi helipads directly to Kedarnath helipad."
      }
    ]
  },

  "badrinath-dham": {
    slug: "badrinath-dham",
    title: "Badrinath Dham Sacred Vishnu Shrine Yatra 2027",
    subtitle: "Final Shrine of Char Dham · Badri Vishal · Neelkanth Peak · Mana Village",
    tagline: "Supreme Abode of Lord Vishnu Between Nar & Narayana Mountains",
    location: "Chamoli District, Garhwal Himalayas, Uttarakhand",
    duration: "3 Days / 2 Nights",
    altitude: "10,830 ft (3,300 m)",
    difficulty: "Easy",
    bestMonths: "May to June & September to November",
    startingPoint: "Haridwar / Rishikesh / Dehradun",
    endingPoint: "Haridwar / Rishikesh / Dehradun",
    priceStandard: 13500,
    pricePremium: 20500,
    bannerImage: "/images/temples/badrinath.webp",
    galleryImages: [
      "/images/temples/badrinath-2.webp",
      "/images/temples/badrinath-3.webp",
      "/images/temples/badrinath-4.webp"
    ],
    overview: "Badrinath Dham, situated at 10,830 ft between the Nar and Narayana mountain ranges with the majestic Neelkanth Peak towering in the background, is the supreme abode of Lord Vishnu (Badri Vishal). Re-established by Adi Shankaracharya in the 8th century, the brightly painted temple houses a self-manifested black stone idol of Lord Vishnu in meditative posture alongside natural hot sulfur springs (Tapt Kund).",
    spiritualSignificance: "One of the 108 Divya Desams of Lord Vishnu and part of both the All-India Char Dham and Garhwal Char Dham circuits. It is believed Lord Vishnu meditated here while Goddess Lakshmi turned into a Badri (berry) tree to shade him from harsh weather.",
    highlights: [
      "Holy Darshan of Lord Badri Vishal & attend grand Swarna Evening Aarti",
      "Take a holy dip in the natural 45°C sulfur hot spring of Tapt Kund",
      "Visit Mana Village — the Last Indian Village on the Tibet Border",
      "Explore Vyas Gufa where Sage Vyas composed Mahabharata & Ganesha Cave",
      "Witness origin of sacred Saraswati River rushing under Bhim Pul rock bridge",
      "Stunning view of snow-clad Neelkanth Peak (21,644 ft)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Joshimath / Badrinath via Prayags",
        altitude: "6,100 ft",
        distance: "280 km (9 hrs drive)",
        stay: "Deluxe Hotel in Joshimath / Badrinath",
        meals: "Lunch & Dinner",
        desc: "Drive along Alaknanda river passing Devprayag, Rudraprayag, and Karnaprayag to Joshimath / Badrinath.",
        activities: ["Prayag Sangam Views", "Joshimath Narsingh Temple Visit"]
      },
      {
        day: 2,
        title: "Tapt Kund Snan, Badri Vishal Darshan, Mana Village Tour & Aarti",
        altitude: "10,830 ft",
        distance: "Local 15 km drive",
        stay: "Hotel near Badrinath Temple",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Dip in Tapt Kund thermal spring, offer prayers at Badrinath Temple, visit Mana Village (Vyas Gufa, Ganesha Cave, Saraswati River & Bhim Pul), and attend evening Swarna Aarti.",
        activities: ["Tapt Kund Thermal Bath", "Badri Vishal Darshan", "Mana Village Tour", "Swarna Aarti"]
      },
      {
        day: 3,
        title: "Badrinath / Joshimath to Haridwar / Rishikesh Drop",
        altitude: "1,100 ft",
        distance: "280 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic return drive down to Haridwar / Rishikesh / Dehradun.",
        activities: ["Drop at Station / Airport"]
      }
    ],
    whatToWear: [
      {
        category: "Warm Outerwear & Essentials",
        iconName: "Shirt",
        description: "Temperatures range from 5°C to 15°C at Badrinath.",
        items: [
          { name: "Warm Heavy Jacket & Sweater", importance: "Mandatory", notes: "Chilly winds in evening." },
          { name: "Thermal Tops & Bottoms", importance: "Mandatory", notes: "Ideal for night stay." },
          { name: "Towel & Extra Clothes", importance: "Mandatory", notes: "For Tapt Kund hot spring bath." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhar Card original", "Char Dham e-Pass"],
      processingDays: "Processed in advance by GoTrek team",
      checkposts: ["Govindghat / Badrinath Gate"],
      medicalRequirements: "General health self-declaration.",
      guidelines: ["Motorable road right up to temple area. Very accessible."]
    },
    inclusions: [
      "AC Vehicle transfers",
      "Hotel stays near temple",
      "All pure veg meals",
      "e-Pass assistance"
    ],
    exclusions: ["GST 5%", "Special VIP Puja ticket fee"],
    faqs: [
      {
        question: "How far is Mana Village from Badrinath Temple?",
        answer: "Mana Village is located just 3 km from Badrinath Temple and is easily accessible by vehicle."
      }
    ]
  },

  "om-parvat": {
    slug: "om-parvat",
    title: "Om Parvat Divine ॐ Sacred Darshan Yatra 2027",
    subtitle: "Nabidhang · Kalapani · Lipulekh Pass · Vyas Valley",
    tagline: "Behold the Natural Miraculous Snow-Carved 'ॐ' Syllable in the High Himalayas",
    location: "Pithoragarh District, Kumaon Himalayas, Uttarakhand",
    duration: "5 Days / 4 Nights",
    altitude: "14,000 ft (4,267 m at Nabidhang)",
    difficulty: "Easy",
    bestMonths: "May to June & September to November",
    startingPoint: "Dharchula / Kathgodam / Delhi",
    endingPoint: "Dharchula / Kathgodam / Delhi",
    priceStandard: 28000,
    pricePremium: 38000,
    bannerImage: "/images/destinations/om-parvat1.webp",
    galleryImages: [
      "/images/destinations/om-parvat.webp",
      "/images/destinations/om-parvat-2.webp",
      "/images/destinations/om-parvat-3.webp"
    ],
    overview: "Om Parvat, soaring at 18,340 ft along the high Himalayan crest in the Vyas Valley of Pithoragarh, is an extraordinary natural miracle. The black rock face of this sacred mountain gathers snow in an unmistakable, perfect pattern of the holy Sanskrit syllable 'ॐ' (AUM). Viewed from the serene alpine meadow of Nabidhang (14,000 ft), Om Parvat is one of the eight sacred peaks in the Kailash Mandala.",
    spiritualSignificance: "In Vedic cosmology, 'Om' is the primordial vibration of creation. Om Parvat is revered as the natural embodiment of Lord Shiva's divine voice, where meditation and chanting produce immense spiritual resonance and peace.",
    highlights: [
      "Divine Sunrise Darshan of natural snow-carved 'ॐ' from Nabidhang viewpoint",
      "Worship at the sacred Kali Temple & Holy Source of Kali River at Kalapani",
      "View of ancient Sage Vyas Gufa & Lipulekh Pass trading route",
      "Stay in warm, traditional Bhotiya homestays in Nabi & Gunji villages",
      "100% Motorable 4x4 road route — zero strenuous trekking required!",
      "Complete Inner Line Permit (ILP) & SDM Dharchula official pass handling"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Pithoragarh to Dharchula Transit",
        altitude: "3,000 ft",
        distance: "280 km drive",
        stay: "Hotel in Dharchula",
        meals: "Lunch & Dinner",
        desc: "Meet at Kathgodam railway station. Scenic drive along Kali River past Almora and Pithoragarh to Dharchula. Document verification for Inner Line Permit.",
        activities: ["Kali River Valley Drive", "Dharchula Orientation & ILP Verification"]
      },
      {
        day: 2,
        title: "Dharchula to Nabi / Gunji Village via Chialekh Pass",
        altitude: "10,500 ft",
        distance: "75 km 4x4 Mountain Drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Packed Lunch, Hot Dinner",
        desc: "SDM verification check. Ascend the dramatic Chialekh pass with panoramic views into the high-altitude Vyas Valley. Arrive at Nabi village.",
        activities: ["Chialekh ITBP Checkpost", "Garbyang Sinking Village View", "Welcome Herbal Tea in Nabi"]
      },
      {
        day: 3,
        title: "Nabi to Nabidhang for Divine Om Parvat Darshan & Kalapani",
        altitude: "14,000 ft",
        distance: "50 km roundtrip drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Hot Snacks at Kalapani, Dinner",
        desc: "Pre-dawn drive to Nabidhang for the breathtaking sunrise golden glow on the sacred snow 'ॐ' of Om Parvat. Chanting and meditation session. Visit sacred Kali Temple at Kalapani.",
        activities: ["Om Parvat Sunrise Darshan", "Kalapani Temple Puja", "Kali River Origin Spotting"]
      },
      {
        day: 4,
        title: "Nabi Village Heritage, Kuti Visit & Return to Dharchula",
        altitude: "3,000 ft",
        distance: "75 km drive",
        stay: "Hotel in Dharchula",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Explore historic Kuti village named after Kunti Mata. Descend through Chialekh back to Dharchula.",
        activities: ["Kuti Ancient Village Walk", "Return Drive to Dharchula"]
      },
      {
        day: 5,
        title: "Dharchula to Kathgodam / Delhi Departure",
        altitude: "1,100 ft",
        distance: "280 km drive",
        stay: "Departure",
        meals: "Breakfast & En-route Lunch",
        desc: "Drive down to Kathgodam Railway Station for onward journey with divine memories of Om Parvat.",
        activities: ["Drop at Kathgodam / Pantnagar"]
      }
    ],
    whatToWear: [
      {
        category: "Cold Mountain Wear",
        iconName: "Shirt",
        description: "Morning temperatures at Nabidhang can drop to 0°C to 5°C.",
        items: [
          { name: "Heavy Down Jacket & Windcheater", importance: "Mandatory", notes: "For early morning Nabidhang sunrise." },
          { name: "Thermals & Woolen Gloves / Beanie", importance: "Mandatory", notes: "Essential for 14,000 ft winds." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "For viewpoints and temple visits." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar Card Copy", "Police Verification Certificate (PVC)", "Medical Fitness Certificate", "4 Photos"],
      processingDays: "7 to 10 days in advance via GoTrek Dharchula desk",
      checkposts: ["Dharchula SDM Office", "Chialekh ITBP Checkpost", "Gunji Checkpost"],
      medicalRequirements: "Basic medical certificate from registered MBBS doctor.",
      guidelines: ["100% motorable route suitable for senior citizens and families."]
    },
    inclusions: [
      "Kathgodam / Dharchula roundtrip 4x4 Bolero transport",
      "Clean village homestay accommodation with warm bedding",
      "Pure vegetarian Sattvik meals (Breakfast & Dinner)",
      "Inner Line Permit (ILP) & SDM Dharchula clearances",
      "First aid kit, oximeter & portable medical oxygen cylinder"
    ],
    exclusions: ["GST 5%", "Personal shopping & pony charges"],
    faqs: [
      {
        question: "Is there any trekking required to see Om Parvat?",
        answer: "No! The road is 100% motorable by 4x4 vehicles right up to the Nabidhang viewpoint overlooking Om Parvat."
      },
      {
        question: "What is the best month to clearly view the 'Om' symbol?",
        answer: "May, June, September, and October offer the clearest morning skies and prominent snow patterns on the rock face."
      }
    ]
  },

  "aerial-kailash-mansarovar": {
    slug: "aerial-kailash-mansarovar",
    title: "Aerial Kailash Mansarovar Chartered Flight Darshan 2027",
    subtitle: "Lucknow / Nepalgunj Chartered Jet · Close Mountain Flyby · Mansarovar Lake",
    tagline: "Exclusive Mountain View Flight Pilgrimage — Zero Physical Trekking Required",
    location: "Tibet Autonomous Region / Indo-Nepal Aerial Corridor",
    duration: "3 Days / 2 Nights",
    altitude: "Cruising at 25,000 ft (Pressurized Aircraft Cabin)",
    difficulty: "Easy",
    bestMonths: "January to December (Year-Round Operations)",
    startingPoint: "Lucknow International Airport / Nepalgunj",
    endingPoint: "Lucknow International Airport / Nepalgunj",
    priceStandard: 70001,
    pricePremium: 95000,
    bannerImage: "/images/destinations/aerial-kailash-mansarovar.webp",
    galleryImages: [
      "/images/destinations/aerial-kailash-mansarovar-2.webp",
      "/images/destinations/aerial-kailash-mansarovar-3.webp",
      "/images/destinations/aerial-kailash-mansarovar-4.webp"
    ],
    overview: "The Aerial Kailash Mansarovar Darshan is an exclusive chartered flight pilgrimage designed especially for elderly devotees, busy professionals, and families who wish to receive the divine blessings of Mount Kailash and Holy Mansarovar Lake without enduring high-altitude trekking, Chinese visa restrictions, or harsh physical conditions. Flying at 25,000 ft in a pressurized ATR aircraft, yatris get guaranteed window seats for close-up darshan of Mt. Kailash's four faces, Lake Mansarovar, and Rakshas Tal.",
    spiritualSignificance: "Mount Kailash is revered in Hinduism, Buddhism, Jainism, and Bon as the cosmic axis of the universe and eternal abode of Lord Shiva and Goddess Parvati. Even catching a glimpse (Darshan) of Kailash from the heavens is regarded as one of the highest spiritual blessings.",
    highlights: [
      "Exclusive 75-minute scenic chartered flight facing Mount Kailash",
      "Guaranteed window seat for every single pilgrim on the flight",
      "Crystal-clear aerial view of turquoise Lake Mansarovar & Rakshas Tal",
      "Zero Chinese visa required & zero high-altitude altitude sickness risk",
      "Luxury 4-star hotel stays in Lucknow / Nepalgunj with all meals",
      "Special Rudrabhishek Puja & Hawan kit included for all Yatris"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Lucknow & Luxury Hotel Check-in",
        altitude: "400 ft",
        distance: "Local transfer",
        stay: "4-Star Deluxe Hotel in Lucknow",
        meals: "Dinner",
        desc: "Arrive at Lucknow Airport. Private VIP transfer to 4-star luxury hotel. Evening orientation session, boarding pass collection, and special group Shiva Aarti.",
        activities: ["VIP Airport Welcome", "Yatra Briefing & Boarding Pass Collection", "Group Shiva Aarti"]
      },
      {
        day: 2,
        title: "Charter Flight Mt. Kailash & Mansarovar Aerial Darshan",
        altitude: "25,000 ft (Pressurized Aircraft Cabin)",
        distance: "75-Minute Scenic Flight",
        stay: "4-Star Deluxe Hotel in Lucknow",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Early morning transfer to airport for chartered flight. Fly over the mighty Himalayan peaks into the holy Kailash airspace. Behold Mt. Kailash rising majestic and Lake Mansarovar gleaming turquoise below. Perform Aarti inside aircraft.",
        activities: ["Chartered Flight Darshan", "Window-Seat Aerial Photography", "Mansarovar Water Blessing Ceremony"]
      },
      {
        day: 3,
        title: "Morning Rudrabhishek & Onward Departure",
        altitude: "400 ft",
        distance: "Local transfer",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Morning Shiva Rudrabhishek Hawan. Distribution of Yatra Completion Certificates and sacred Mansarovar Holy Jal. Transfer to Lucknow Airport.",
        activities: ["Rudrabhishek Hawan", "Certificate Distribution", "Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Comfortable Travel Clothing",
        iconName: "Shirt",
        description: "Climate-controlled aircraft cabin (no extreme winter gear required).",
        items: [
          { name: "Comfortable Cotton / Smart Casuals", importance: "Recommended", notes: "For flight and hotel." },
          { name: "Light Cardigan / Shawl", importance: "Recommended", notes: "For air-conditioned cabin." },
          { name: "Camera or Smartphone with Good Zoom", importance: "Mandatory", notes: "For crystal-clear aerial photography." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Valid Government Photo ID (Aadhaar Card / Passport)"],
      processingDays: "Instant flight ticketing confirmation",
      checkposts: ["Lucknow Airport Security Check"],
      medicalRequirements: "No high-altitude medical fitness certificates required.",
      guidelines: ["Suitable for all age groups from 5 to 90+ years."]
    },
    inclusions: [
      "Scenic chartered flight ticket with guaranteed window seat",
      "2 Nights stay in 4-Star luxury hotel in Lucknow",
      "All meals (Breakfast, Lunch & Dinner)",
      "VIP airport transfers in private AC vehicle",
      "Mansarovar holy Jal & Yatra Completion Certificate"
    ],
    exclusions: ["GST 5%", "Airfare to/from Lucknow from home city"],
    faqs: [
      {
        question: "Do I need a passport or China visa for Aerial Kailash Darshan?",
        answer: "No passport or China visa is required for Indian citizens taking the chartered flight from Lucknow. An Aadhaar card or driving license is sufficient."
      },
      {
        question: "Is every passenger guaranteed a window seat?",
        answer: "Yes! The aircraft seating is configured so that 100% of yatris have direct, unobstructed window seats to view and photograph Mt. Kailash and Lake Mansarovar."
      }
    ]
  },

  "adi-kailash-yatra-from-haldwani": {
    slug: "adi-kailash-yatra-from-haldwani",
    title: "Adi Kailash & Om Parvat Yatra from Kathgodam / Haldwani 2027",
    subtitle: "Direct Train Connect · Kathgodam Pickup · Jageshwar Dham · Vyas Valley",
    tagline: "Convenient Railhead Starting Point with Full Mountain 4x4 Support",
    location: "Kathgodam to Pithoragarh & Vyas Valley, Uttarakhand",
    duration: "6 Days / 5 Nights",
    altitude: "14,500 ft (4,420 m at Parvati Sarovar)",
    difficulty: "Moderate",
    bestMonths: "May to June & September to November",
    startingPoint: "Kathgodam / Haldwani Railway Station",
    endingPoint: "Kathgodam / Haldwani Railway Station",
    priceStandard: 25000,
    pricePremium: 35000,
    bannerImage: "/images/destinations/group-memory-01.webp",
    galleryImages: [
      "/images/destinations/group-memory-03.webp",
      "/images/destinations/group-memory-05.webp",
      "/images/destinations/group-memory-09.webp"
    ],
    overview: "Our most popular train-connect package starting directly at Kathgodam / Haldwani railway station (the gateway to Kumaon). Pilgrims arriving via overnight trains (Ranikhet Express, Kathgodam Shatabdi) board our dedicated 4x4 vehicles and travel through scenic Almora, Jageshwar Dham (124 ancient temples), and Pithoragarh before reaching Dharchula and the sacred heights of Adi Kailash and Om Parvat.",
    spiritualSignificance: "Combines the sacred darshan of Adi Kailash and Om Parvat with the ancient energy vortex of Jageshwar Jyotirlinga Dham and Neem Karoli Baba Kainchi Dham.",
    highlights: [
      "Hassle-free Kathgodam Railway Station morning pickup & evening drop",
      "Darshan of Adi Kailash, Parvati Sarovar, Gauri Kund & Om Parvat",
      "En-route visit to Jageshwar Dham (124 historic stone Shiva temples)",
      "Traditional warm Bhotia homestays in Nabi & Gunji villages",
      "Complete Inner Line Permit (ILP) management by Pithoragarh HQ",
      "Experienced local Kumaoni mountain drivers and trip escorts"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam to Pithoragarh via Jageshwar Dham",
        altitude: "5,300 ft",
        distance: "185 km drive",
        stay: "Hotel in Pithoragarh",
        meals: "Lunch & Dinner",
        desc: "Morning pickup at Kathgodam Railway Station. Visit sacred Jageshwar Dham Shiva complex en route. Arrive in Pithoragarh by evening.",
        activities: ["Kathgodam Pickup", "Jageshwar Dham Darshan", "Pithoragarh Stay"]
      },
      {
        day: 2,
        title: "Pithoragarh to Dharchula & Nabi Village",
        altitude: "10,500 ft",
        distance: "165 km 4x4 drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Lunch, Dinner",
        desc: "SDM Dharchula ILP biometric clearance. Ascend past Chialekh and Garbyang into the scenic Vyas Valley to Nabi village.",
        activities: ["SDM Permit Verification", "Chialekh ITBP Gate", "Nabi Village Arrival"]
      },
      {
        day: 3,
        title: "Adi Kailash, Parvati Sarovar & Gauri Kund Darshan",
        altitude: "14,500 ft",
        distance: "45 km local drive + 1.5 km walk",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Packed Lunch, Hot Dinner",
        desc: "Drive to Jolingkong. Walk to the emerald waters of Parvati Sarovar and Shiva Temple directly facing Adi Kailash peak.",
        activities: ["Adi Kailash Darshan", "Parvati Sarovar Parikrama", "Gauri Kund View"]
      },
      {
        day: 4,
        title: "Om Parvat Sunrise Darshan & Kalapani Kali Mata Temple",
        altitude: "14,000 ft",
        distance: "50 km drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Sunrise darshan of the natural snow-carved 'ॐ' at Om Parvat from Nabidhang. Visit Kali Temple at Kalapani.",
        activities: ["Om Parvat Meditation", "Kalapani Temple Worship", "Kuti Heritage Village"]
      },
      {
        day: 5,
        title: "Nabi to Dharchula & Pithoragarh Return",
        altitude: "5,300 ft",
        distance: "165 km drive",
        stay: "Hotel in Pithoragarh",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Descend from Vyas Valley through Dharchula to Pithoragarh for evening rest and celebration dinner.",
        activities: ["Return Mountain Drive", "Yatra Certificate Distribution"]
      },
      {
        day: 6,
        title: "Pithoragarh to Kathgodam Railway Drop",
        altitude: "1,700 ft",
        distance: "185 km drive",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Scenic return drive to Kathgodam railway station by 4:30 PM for onward train journeys.",
        activities: ["Drop at Kathgodam Station"]
      }
    ],
    whatToWear: [
      {
        category: "High Altitude Layering",
        iconName: "Shirt",
        description: "Temperatures range from 5°C to 15°C in day, 0°C at night.",
        items: [
          { name: "Heavy Fleece & Puffer Jacket", importance: "Mandatory", notes: "For Jolingkong and Nabidhang." },
          { name: "Thermals & Woolen Socks", importance: "Mandatory", notes: "For night stay in homestays." },
          { name: "Trekking Shoes with Good Grip", importance: "Mandatory", notes: "For Parvati Sarovar walk." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar Card", "Police Verification", "Medical Certificate", "4 Photos"],
      processingDays: "Handled seamlessly by GoTrek team prior to arrival",
      checkposts: ["Dharchula Gate", "Chialekh ITBP Checkpoint"],
      medicalRequirements: "Basic medical certificate.",
      guidelines: ["All 4x4 Bolero transport included."]
    },
    inclusions: [
      "Kathgodam to Kathgodam complete 4x4 transport",
      "5 nights accommodation (Hotels + Homestays)",
      "Daily Sattvik pure veg meals (Breakfast & Dinner)",
      "Inner Line Permit (ILP) processing",
      "Medical kit, oxygen canister & Kumaoni guide"
    ],
    exclusions: ["GST 5%", "Train tickets to Kathgodam", "Pony charges"],
    faqs: [
      {
        question: "Which trains reach Kathgodam in the morning?",
        answer: "The Kathgodam Shatabdi (from New Delhi) and Ranikhet Express (from Old Delhi/Jaipur) arrive in Kathgodam early morning, making this package timing perfect."
      }
    ]
  },

  "adi-kailash-from-delhi": {
    slug: "adi-kailash-from-delhi",
    title: "Adi Kailash & Om Parvat Yatra from Delhi NCR 2027",
    subtitle: "Delhi Pickup & Drop · Volvo / AC Tempo Traveller · Kainchi Dham · Vyas Valley",
    tagline: "Direct Capital Connect — All-Inclusive Pilgrimage from Your Doorstep in Delhi",
    location: "New Delhi to Vyas Valley, Uttarakhand",
    duration: "7 Days / 6 Nights",
    altitude: "14,500 ft (4,420 m)",
    difficulty: "Moderate",
    bestMonths: "May to June & September to November",
    startingPoint: "New Delhi (Akshardham / Majnu Ka Tilla / Aerocity)",
    endingPoint: "New Delhi (Akshardham / Majnu Ka Tilla / Aerocity)",
    priceStandard: 35000,
    pricePremium: 48000,
    bannerImage: "/images/destinations/adi-kailash4.webp",
    galleryImages: [
      "/images/destinations/adi-kailash5.webp",
      "/images/destinations/adi-kailash6.webp",
      "/images/destinations/adi-kailash7.webp"
    ],
    overview: "Our flagship Delhi NCR all-inclusive package designed for pilgrims traveling directly from the capital. Board our luxury AC pushback vehicle in Delhi, take blessings at Neem Karoli Baba Kainchi Dham ashram en route, stay in comfortable hotels across Kumaon, and transfer into robust 4x4 mountain vehicles at Dharchula for the sacred Adi Kailash and Om Parvat circuit.",
    spiritualSignificance: "Offers a complete pilgrimage combining Neem Karoli Baba Kainchi Dham blessings with the darshan of Lord Shiva's abode at Adi Kailash and Om Parvat.",
    highlights: [
      "Roundtrip Delhi pickup & drop in comfortable AC Tempo Traveller / Luxury Coach",
      "Special Darshan & Aarti at Neem Karoli Baba Ashram (Kainchi Dham)",
      "Darshan of Adi Kailash, Parvati Sarovar, Gauri Kund & Om Parvat",
      "Traditional Bhotiya homestays with electric heating and warm Kumaoni cuisine",
      "Complete Inner Line Permit (ILP) liaison handled prior to travel",
      "24/7 dedicated Tour Manager & medical safety escort"
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Kainchi Dham & Almora / Binsar",
        altitude: "5,400 ft",
        distance: "360 km (8-9 hrs drive)",
        stay: "Deluxe Resort in Almora / Binsar",
        meals: "Lunch & Dinner",
        desc: "Early morning pickup in Delhi. Drive through Moradabad and Kathgodam. Stop at sacred Kainchi Dham for Baba Neem Karoli Darshan. Reach Almora by evening.",
        activities: ["Delhi Morning Departure", "Kainchi Dham Ashram Darshan", "Evening Orientation"]
      },
      {
        day: 2,
        title: "Almora to Dharchula via Pithoragarh",
        altitude: "3,000 ft",
        distance: "185 km drive",
        stay: "Hotel in Dharchula",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Drive through Pithoragarh along the Kali River to Dharchula. Complete ILP paperwork and prepare for high-altitude 4x4 switch.",
        activities: ["Kali River Scenic Drive", "Dharchula ILP Desk Verification"]
      },
      {
        day: 3,
        title: "Dharchula to Nabi Village in 4x4 Mountain Vehicle",
        altitude: "10,500 ft",
        distance: "75 km 4x4 drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Packed Lunch, Hot Dinner",
        desc: "Board 4x4 vehicles. Cross Chialekh pass and Garbyang to arrive at picturesque Nabi village in Vyas Valley.",
        activities: ["Chialekh Checkpost", "Nabi Village Traditional Welcome"]
      },
      {
        day: 4,
        title: "Adi Kailash, Parvati Sarovar & Gauri Kund Darshan",
        altitude: "14,500 ft",
        distance: "45 km drive + easy walk",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Packed Lunch, Dinner",
        desc: "Drive to Jolingkong. Holy Darshan of Adi Kailash and Parvati Sarovar Shiva Temple with sacred Parikrama.",
        activities: ["Adi Kailash Darshan", "Parvati Sarovar Puja", "Evening Bhotia Folklore"]
      },
      {
        day: 5,
        title: "Om Parvat Sunrise Darshan & Kalapani Temple",
        altitude: "14,000 ft",
        distance: "50 km drive",
        stay: "Traditional Bhotia Homestay in Nabi",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Sunrise darshan of the natural snow-carved 'ॐ' at Om Parvat from Nabidhang. Kali Mata Temple worship at Kalapani.",
        activities: ["Om Parvat Sunrise Darshan", "Kalapani Temple Worship", "Kuti Ancient Village Walk"]
      },
      {
        day: 6,
        title: "Nabi to Dharchula & Pithoragarh Return",
        altitude: "5,300 ft",
        distance: "165 km drive",
        stay: "Hotel in Pithoragarh",
        meals: "Breakfast, Lunch, Dinner",
        desc: "Descend from Vyas Valley back to Pithoragarh. Celebration farewell dinner.",
        activities: ["Return Mountain Drive", "Yatra Certificates"]
      },
      {
        day: 7,
        title: "Pithoragarh to New Delhi Drop",
        altitude: "700 ft",
        distance: "480 km drive",
        stay: "Departure",
        meals: "Breakfast & En-route Lunch",
        desc: "Scenic highway return drive back to Delhi NCR, dropping at major transit hubs by 9:00 PM.",
        activities: ["Delhi Drop at Akshardham / Aerocity"]
      }
    ],
    whatToWear: [
      {
        category: "7-Day Full Mountain Layering",
        iconName: "Shirt",
        description: "From warm plains to sub-zero high-altitude Vyas Valley nights.",
        items: [
          { name: "Down Puffer Jacket (-5°C rated)", importance: "Mandatory", notes: "For high altitudes." },
          { name: "2 Sets Thermal Inners", importance: "Mandatory", notes: "For night stay in Nabi." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "For temple visits and Parvati Sarovar." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar Card", "Police Verification", "Medical Certificate", "4 Photos"],
      processingDays: "Processed 100% in advance prior to Delhi departure",
      checkposts: ["Dharchula Checkpost", "Chialekh ITBP Checkpoint"],
      medicalRequirements: "Standard medical fitness certificate.",
      guidelines: ["Includes all Delhi road tolls, state permits, and fuel surcharges."]
    },
    inclusions: [
      "Delhi to Delhi AC transport + 4x4 Bolero in Vyas Valley",
      "All 6 nights hotel and village homestay accommodations",
      "Pure vegetarian meals (Breakfast & Dinner)",
      "Inner Line Permit (ILP) processing",
      "Tour escort, first aid kit, and emergency oxygen"
    ],
    exclusions: ["GST 5%", "Personal shopping & pony charges"],
    faqs: [
      {
        question: "Where are the pickup points in Delhi?",
        answer: "We offer convenient central pickup points in Delhi including Akshardham Temple, Kashmere Gate / Majnu Ka Tilla, and Aerocity (near IGI Airport)."
      }
    ]
  },

  "adi-kailash-vip-helicopter": {
    slug: "adi-kailash-vip-helicopter",
    title: "Adi Kailash & Om Parvat VIP Helicopter Yatra 2027",
    subtitle: "Pithoragarh Helipad · Direct Flight to Gunji · Fast-Track 3-Day VIP Pilgrimage",
    tagline: "The Ultimate Time-Saving Luxury Helicopter Pilgrimage with Zero Mountain Road Fatigue",
    location: "Pithoragarh to Gunji & Jolingkong, Uttarakhand",
    duration: "3 Days / 2 Nights",
    altitude: "14,500 ft (4,420 m)",
    difficulty: "Easy",
    bestMonths: "May to June & September to November",
    startingPoint: "Pithoragarh Naini Saini Airport / Dehradun",
    endingPoint: "Pithoragarh Naini Saini Airport / Dehradun",
    priceStandard: 95000,
    pricePremium: 145000,
    bannerImage: "/images/destinations/adi-kailash5.webp",
    galleryImages: [
      
    ],
    overview: "Experience the supreme divine presence of Adi Kailash and Om Parvat with maximum comfort and zero long-distance road fatigue. Our exclusive VIP Helicopter package flies yatris directly from Pithoragarh Naini Saini Airport to Gunji Helipad in just 25 minutes, bypassing 12 hours of rugged mountain roads. Enjoy VIP priority permit clearance, luxury heated cottage stays, and private dedicated 4x4 SUVs.",
    spiritualSignificance: "Designed for elderly pilgrims and busy executives seeking profound spiritual darshan without the physical strain of multi-day road travel.",
    highlights: [
      "25-minute scenic helicopter flight from Pithoragarh to Gunji helipad",
      "Bypasses 200+ km of winding mountain roads completely",
      "VIP priority Inner Line Permit (ILP) expedited clearance",
      "Private luxury 4x4 SUV with dedicated female tour lead & photographer",
      "Handcrafted wooden cottage stay in Nabi with electric heated blankets",
      "Complimentary high-altitude oxygen concentrator support throughout"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pithoragarh to Gunji Helipad Flight & Nabi Luxury Cottages",
        altitude: "10,500 ft",
        distance: "25-Minute Helicopter Flight",
        stay: "Handcrafted Luxury Wooden Cottage in Nabi",
        meals: "Lunch & Dinner",
        desc: "Morning boarding at Pithoragarh Naini Saini Airport. Scenic helicopter flight over snow peaks to Gunji helipad. Private SUV transfer to luxury Nabi wooden cottages.",
        activities: ["VIP Helipad Reception", "Helicopter Flight over Kali Valley", "Nabi Cottage Welcome"]
      },
      {
        day: 2,
        title: "Adi Kailash & Om Parvat Twin Sacred Darshan",
        altitude: "14,500 ft",
        distance: "Private 4x4 local circuit",
        stay: "Handcrafted Luxury Wooden Cottage in Nabi",
        meals: "Breakfast, Hot Gourmet Lunch, Dinner",
        desc: "Private 4x4 drive to Jolingkong for Adi Kailash & Parvati Sarovar Puja. Afternoon drive to Nabidhang for sacred Om Parvat darshan and Kalapani Temple.",
        activities: ["Adi Kailash Rudrabhishek Puja", "Om Parvat Meditation", "Kalapani Temple Worship"]
      },
      {
        day: 3,
        title: "Gunji to Pithoragarh Heli Return & Departure",
        altitude: "5,300 ft",
        distance: "25-Minute Helicopter Flight",
        stay: "Departure",
        meals: "Breakfast",
        desc: "Morning helicopter transfer from Gunji back to Pithoragarh Airport with divine blessings and sacred yatra mementos.",
        activities: ["Return Helicopter Flight", "Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "VIP Warm Outerwear",
        iconName: "Shirt",
        description: "Crisp mountain air at 10,500 ft to 14,500 ft.",
        items: [
          { name: "Warm Down Jacket & Cashmere Shawl", importance: "Recommended", notes: "Provided complimentary in VIP kit." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "For viewpoints." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar Card", "Medical Certificate", "4 Photos"],
      processingDays: "VIP expedited clearance in 48 hours",
      checkposts: ["Gunji Helipad Checkpoint"],
      medicalRequirements: "Basic medical certificate.",
      guidelines: ["Guaranteed weight limits apply for helicopter operations."]
    },
    inclusions: [
      "Roundtrip Pithoragarh-Gunji helicopter flight tickets",
      "2 Nights stay in private heated luxury wooden cottages",
      "All gourmet Sattvik meals & high-altitude hot beverages",
      "VIP expedited Inner Line Permit (ILP) processing",
      "Dedicated tour lead, personal photographer & oxygen concentrator"
    ],
    exclusions: ["GST 5%", "Dehradun to Pithoragarh connecting flight if opted separately"],
    faqs: [
      {
        question: "How much road travel is avoided by taking the helicopter?",
        answer: "The helicopter flight takes just 25 minutes, saving more than 10 to 12 hours of rugged mountain road driving each way."
      }
    ]
  },

  "chitai-golu-devta": {
    slug: "chitai-golu-devta",
    title: "Chitai Golu Devta Temple Sacred Darshan & Blessing Guide",
    subtitle: "The Supreme God of Justice · Temple of Ten Thousand Brass Bells · Almora, Kumaon",
    tagline: "Seek Divine Justice, Petition on Stamp Paper, & Ring the Holy Bells of Fulfilment",
    location: "Chitai, 8 km from Almora City, Kumaon Hills, Uttarakhand",
    duration: "2 Days / 1 Night (Seamless En Route Stop to Vyas Valley & Dharchula)",
    altitude: "5,600 ft (1,707 m)",
    difficulty: "Easy",
    bestMonths: "Round the Year (Best: March to June & September to December)",
    startingPoint: "Kathgodam / Almora / Pantnagar Airport",
    endingPoint: "Dharchula / Almora / Kathgodam",
    priceStandard: 4500,
    pricePremium: 8500,
    bannerImage: "/images/temples/golu-devta.webp",
    galleryImages: [
      "/images/temples/golu-devta-almora.webp",
      "/images/temples/golu-devta-bells.webp",
     
    ],
    overview: "Chitai Golu Devta Temple, located 8 km outside Almora amidst dense, fragrant chir pine forests, is the most sacred court of divine justice in Kumaon. Golu Devta, revered as an incarnation of Lord Shiva (Gaur Bhairav), is celebrated across Uttarakhand as the 'Nyay Ke Devta' (God of Justice). The temple is famous worldwide for its mesmerizing canopy of tens of thousands of consecrated brass bells hanging from every ceiling, arch, and tree trunk, accompanied by thousands of handwritten letters and judicial stamp paper petitions left by devotees seeking justice, peace, and wish fulfillment.",
    spiritualSignificance: "Local lore holds that any devotee who has faced injustice or carries a heartfelt plea can present a written petition to Golu Devta. Once the divine decree is granted and the prayer fulfilled, devotees return to offer a brass bell as a token of gratitude. No pilgrim journeying to Adi Kailash or Om Parvat passes Almora without seeking Golu Devta's divine protection and road safety.",
    highlights: [
      "Darshan of Lord Golu Devta riding his divine white steed with bow and arrow",
      "The awe-inspiring Sacred Bell Walkway with over 10,000 chiming brass bells",
      "Traditional petition writing ritual on holy stamp paper for swift divine justice",
      "Panoramic views of lush Kumaon pine valleys and distant snow-dusted ridges",
      "Consecrated prasad of traditional Pahadi halwa, puri, and dry dry-fruits",
      "Perfect sacred stopover on the pilgrimage route between Kathgodam and Dharchula"
    ],
    famousSpots: [
      {
        name: "Main Sanctum & Golu Devta Idol",
        hindiName: "चितई गोलू देवता मुख्य गर्भगृह",
        category: "Spiritual",
        location: "Central Courtyard, Chitai Temple",
        significance: "Primary consecrated deity showing Lord Golu as the ruler of justice on horseback",
        description: "The sanctum sanctorum where daily traditional Kumaoni pujas, aarti, and bell ringing ceremonies take place amidst Vedic mantras.",
        image: "/images/temples/golu-devta.webp",
        keyHighlights: ["Auspicious morning & evening aarti", "Direct priest blessings & teeka", "Special coconut and sweet offerings"]
      },
      {
        name: "The Grand Canopy of 10,000 Bells",
        hindiName: "हजारों घंटियों का दिव्य वितान",
        category: "Spiritual",
        location: "Temple Walkways & Arches",
        significance: "Bells tied by millions of devotees across centuries in gratitude for answered prayers",
        description: "A breathtaking ocean of brass bells ranging from tiny hand bells to massive 250 kg temple bells that resonate with deep harmonic tones in the mountain wind.",
        image: "/images/temples/golu-devta-bells.webp",
        keyHighlights: ["Bells dating back generations", "Harmonic mountain acoustics", "Sacred bell tying ceremony"]
      },
      {
        name: "Devotee Petition & Letter Arch",
        hindiName: "न्याय प्रार्थना पत्र दीर्घा",
        category: "Mythological",
        location: "Courtyard Walls",
        significance: "Direct petitions to God of Justice written on judicial stamp papers",
        description: "Devotees from across India and the globe affix letters describing legal struggles, family well-being, health, and spiritual wishes to the deity.",
        image: "/images/temples/golu-devta-almora.webp",
        keyHighlights: ["Unique spiritual legal tradition", "Symbol of unwavering faith", "Historic petitions preserved"]
      },
      {
        name: "Chitai Pine & Himalayan Ridge Walk",
        hindiName: "चितई देवदार व चीड़ वन क्षेत्र",
        category: "Scenic Viewpoint",
        location: "Surrounding Forest Trail",
        significance: "Tranquil meditation walk under pine canopies overlooking the Kumaon Himalayas",
        description: "A peaceful forest trail right outside the temple perimeter offering crisp mountain air, birdsong, and vistas of the Almora hills.",
        image: "/images/temples/golu-devta.webp",
        keyHighlights: ["Aromatic pine breezes", "Himalayan photography spot", "Quiet meditation zones"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Pantnagar to Almora & Chitai Golu Devta Darshan",
        altitude: "5,600 ft",
        distance: "90 km (3.5 hrs drive)",
        stay: "Heritage Himalayan Hotel / Resort in Almora",
        meals: "Lunch & Kumaoni Dinner",
        desc: "Morning pickup from Kathgodam Railway Station or Pantnagar Airport. Drive through the scenic Kumaon hills, stopping at Neem Karoli Baba Kainchi Dham ashram en route. Arrive in Almora and visit Chitai Golu Devta Temple for afternoon prayers, bell ringing, and petition writing. Evening relaxation overlooking the sunset.",
        activities: ["Scenic Kumaon Hills Drive", "Kainchi Dham En Route Stop", "Chitai Golu Devta Special Darshan", "Bell Tying Ritual"]
      },
      {
        day: 2,
        title: "Almora Sunrise, Bright End Corner & Onward Journey to Dharchula / Kathgodam",
        altitude: "5,600 ft",
        distance: "185 km to Dharchula or 90 km to Kathgodam",
        stay: "Onward Destination / Departure",
        meals: "Breakfast",
        desc: "Witness sunrise over the Trishul and Nanda Devi peaks from Bright End Corner. Enjoy fresh Almora Bal Mithai and singhauri sweets before departing onwards towards Pithoragarh/Dharchula for Adi Kailash or returning to Kathgodam.",
        activities: ["Himalayan Sunrise Viewing", "Almora Heritage Market Walk", "Traditional Sweet Tasting", "Onward Transit"]
      }
    ],
    whatToWear: [
      {
        category: "Temple Attire & Gentle Mountain Wear",
        iconName: "Shirt",
        description: "Pleasant days (18°C to 24°C), cool mornings and evenings (8°C to 14°C).",
        items: [
          { name: "Modest Temple Attire (Kurta / Salwar / Full Pants)", importance: "Mandatory", notes: "Respectful dress code for sanctum entry." },
          { name: "Light Jacket or Shawl", importance: "Recommended", notes: "For cool forest shade and morning aarti." },
          { name: "Easy Slip-On Shoes / Sandals", importance: "Mandatory", notes: "Convenient for frequent shoe removal at temple steps." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Valid Government ID (Aadhaar / Voter ID / Passport)"],
      processingDays: "No inner-line permit required (Open to all visitors)",
      checkposts: ["None for Chitai Temple zone"],
      medicalRequirements: "Basic walking mobility. Paved steps lead from parking to temple.",
      guidelines: ["Devotees can bring brass bells of any size to offer.", "Cameras allowed in courtyard; respect sanctum photography rules."]
    },
    inclusions: [
      "Private AC / 4x4 vehicle transfers from Kathgodam / Almora",
      "Deluxe hotel stay in Almora with valley views",
      "Traditional Kumaoni pure vegetarian meals",
      "Temple VIP priest coordination & consecrated prasad box",
      "Chitai Golu Devta official brass bell for offering"
    ],
    exclusions: ["GST 5%", "Personal shopping & sweet boxes"],
    faqs: [
      {
        question: "Why do devotees offer bells at Chitai Golu Devta Temple?",
        answer: "Devotees offer brass bells as a thanksgiving ritual when their prayers or legal petitions are fulfilled by Golu Devta. Over centuries, this has created a spectacular canopy of over 10,000 bells."
      },
      {
        question: "Can we write a petition to Golu Devta on plain paper?",
        answer: "Yes! While many devotees write on non-judicial stamp papers for symbolic legal gravity, petitions on plain white paper with sincere prayer are equally accepted and tied in the temple."
      },
      {
        question: "Is Chitai Golu Devta temple on the way to Adi Kailash?",
        answer: "Yes, Chitai Golu Devta lies directly on the Kathgodam-Almora-Pithoragarh highway route, making it an essential traditional stopover before ascending into Vyas Valley."
      }
    ]
  },

  "jageshwar-dham": {
    slug: "jageshwar-dham",
    title: "Jageshwar Dham Sacred Jyotirlinga & 124 Ancient Shrines Guide",
    subtitle: "8th to 12th Century Nagara Architecture · Ancient Maha Mrityunjaya & Tarun Jageshwar",
    tagline: "Lord Shiva's Ancient Forest Sanctuary in the Heart of Towering Himalayan Deodars",
    location: "Jageshwar Valley, 36 km from Almora, Kumaon Himalayas, Uttarakhand",
    duration: "2 Days / 1 Night (Comprehensive Heritage & Spiritual Circuit)",
    altitude: "6,135 ft (1,870 m)",
    difficulty: "Easy",
    bestMonths: "Round the Year (Peak: April to June, Shravan Monsoon, & Sept to Nov)",
    startingPoint: "Kathgodam / Almora / Pithoragarh",
    endingPoint: "Dharchula / Almora / Kathgodam",
    priceStandard: 5500,
    pricePremium: 9500,
    bannerImage: "/images/temples/jageshwar-dham.webp",
    galleryImages: [
      
    ],
    overview: "Jageshwar Dham, nestled in a quiet, secluded mountain glen 36 km from Almora, is one of the most sacred and architecturally magnificent temple clusters in India. Comprising 124 impeccably carved stone shrines constructed between the 7th and 14th centuries CE by the Katyuri and Chand kings, Jageshwar is venerated as the 8th Jyotirlinga (Nagesh Jyotirlinga) in the Shiva Purana. Towering Deodar cedar trees over 500 years old surround the temple complex along the whispering Jataganga holy stream, creating an atmosphere of deep meditative stillness and divine sanctity.",
    spiritualSignificance: "According to Hindu lore, Lord Shiva arrived at Jageshwar to perform rigorous penance in his Digambara ascetic form following the sacrifice of Sati. The Maha Mrityunjaya Temple here is celebrated as one of the oldest Shiva shrines in India, where chanting the sacred Maha Mrityunjaya mantra dispels all fear of premature death, ailments, and karmic burdens.",
    highlights: [
      "Sacred Darshan of Maha Mrityunjaya Temple — the ancient eye-shaped Jyotirlinga",
      "Worship at the sanctum of Tarun Jageshwar, Pushti Devi, and Kuber Mandir",
      "Walk among 124 pristine Nagara-style stone temples preserved under ASI heritage",
      "Holy dip & prayer at Brahma Kund and the serene banks of Jataganga stream",
      "Hike to Vridh Jageshwar (Old Jageshwar) for panoramic views of Nanda Devi & Trishul",
      "Explore the Archaeological Museum showcasing exquisite 9th-century granite sculptures",
      "Attend the deeply moving evening Deepdaan and butter-lamp Aarti under the Deodars"
    ],
    // famousSpots: [
    //   {
    //     name: "Maha Mrityunjaya Temple",
    //     hindiName: "महामृत्युंजय महादेव मंदिर",
    //     category: "Spiritual",
    //     location: "Central Complex, Jageshwar",
    //     significance: "Oldest temple in the cluster dating to the 8th century, famous for its unique linga with third eye",
    //     description: "The most powerful shrine for health, longevity, and liberation. Priests perform specialized Mrityunjaya Jap and Rudrabhishek pujas here.",
    //     image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1280&q=80",
    //     keyHighlights: ["Maha Mrityunjaya chanting", "Ancient eye linga form", "Continuous holy akhand jyot"]
    //   },
    //   {
    //     name: "Tarun Jageshwar Sanctum",
    //     hindiName: "तरुण जागेश्वर मंदिर",
    //     category: "Spiritual",
    //     location: "Main Courtyard, Jageshwar",
    //     significance: "Principal deity of the complex representing youthful Lord Shiva",
    //     description: "Guarded by statues of Nandi and Chandika, this majestic stone tower temple houses the dual-faced Shiva-Parvati representation on a single stone base.",
    //     image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1280&q=80",
    //     keyHighlights: ["Shiva-Parvati unified linga", "Elaborately carved stone doorway", "Evening Mangala Aarti"]
    //   },
    //   {
    //     name: "Vridh Jageshwar Hilltop Shrine",
    //     hindiName: "वृद्ध जागेश्वर महादेव",
    //     category: "Scenic Viewpoint",
    //     location: "3 km uphill from Jageshwar (7,500 ft)",
    //     significance: "The original spot where Shiva meditated before descending into the valley",
    //     description: "Perched high above the cedar forest, offering one of the finest 180-degree Himalayan snow-peak panoramas including Trishul, Nanda Devi, and Panchachuli.",
    //     image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1280&q=80",
    //     keyHighlights: ["Himalayan snow peak views", "Ancient stone shrine", "Tranquil meditation grove"]
    //   },
    //   {
    //     name: "Dandeshwar Temple Complex",
    //     hindiName: "दण्डेश्वर मंदिर परिसर",
    //     category: "Heritage Village",
    //     location: "1.5 km before main Jageshwar gate",
    //     significance: "Largest single stone shikhara temple in the entire valley",
    //     description: "Dedicated to Lord Shiva as the staff-bearer (Dandadhar), this imposing stone tower rises above the Jataganga river amid untouched nature.",
    //     image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1280&q=80",
    //     keyHighlights: ["Colossal natural Shiva rock", "Grand Nagara architecture", "Peaceful riverside ambiance"]
    //   }
    // ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Almora to Jageshwar Dham via Chitai Golu Devta",
        altitude: "6,135 ft",
        distance: "115 km (4 hrs drive)",
        stay: "Cozy Deodar Forest Resort / Heritage Homestay in Jageshwar",
        meals: "Lunch & Pure Veg Dinner",
        desc: "Scenic drive from Kathgodam via Almora. Stop at Chitai Golu Devta Temple for bell offering. Arrive in Jageshwar Valley surrounded by giant Deodars. Check in to your resort, freshen up, and participate in evening Deepdaan and Ganga-style Aarti at Tarun Jageshwar.",
        activities: ["Scenic Forest Drive", "Chitai En Route Darshan", "Evening Jageshwar Aarti", "Night Temple Illumination Walk"]
      },
      {
        day: 2,
        title: "Maha Mrityunjaya Abhishek, Vridh Jageshwar & Onward Journey",
        altitude: "6,135 ft to 7,500 ft",
        distance: "30 km local + onward transit",
        stay: "Departure / Onward Stay",
        meals: "Breakfast & Sattvik Lunch",
        desc: "Attend morning Rudrabhishek puja at Maha Mrityunjaya Temple. Visit the ASI Archaeological Museum. Take a short scenic drive up to Vridh Jageshwar for panoramic Himalayan peak photography before proceeding onwards to Pithoragarh/Dharchula for Adi Kailash or returning to Kathgodam.",
        activities: ["Morning Rudrabhishek Puja", "Archaeological Museum Visit", "Vridh Jageshwar Himalayan View", "Onward Mountain Journey"]
      }
    ],
    whatToWear: [
      {
        category: "Forest Layering & Temple Attire",
        iconName: "Shirt",
        description: "Sheltered inside dense pine & deodar forest (12°C to 20°C in summer, 0°C to 10°C in winter).",
        items: [
          { name: "Traditional Pure Cotton / Silk Puja Attire (Dhoti/Kurta/Saree)", importance: "Recommended", notes: "For participating in Abhishek pujas." },
          { name: "Fleece Jacket or Warm Shawl", importance: "Mandatory", notes: "The deodar valley remains cool even in peak summer." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "For stone courtyard and forest trail walks." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government ID Card (Aadhaar / Passport)"],
      processingDays: "No inner-line permit needed (Open 365 days)",
      checkposts: ["None in Jageshwar Valley"],
      medicalRequirements: "Flat, easily walkable temple grounds suitable for elderly pilgrims.",
      guidelines: ["Special Rudrabhishek pujas can be booked in advance via GoTrek.", "Temple opens from 6:00 AM to 8:30 PM."]
    },
    inclusions: [
      "Roundtrip transport in private comfortable vehicle",
      "Deluxe resort / cottage stay in Jageshwar Deodar forest",
      "All Sattvik vegetarian meals (Breakfast & Dinner)",
      "VIP Priest assistance for Maha Mrityunjaya Puja & Rudrabhishek",
      "ASI Museum entry tickets and local knowledgeable guide"
    ],
    exclusions: ["GST 5%", "Personal dakshina to priests"],
    faqs: [
      {
        question: "Is Jageshwar Dham one of the 12 Jyotirlingas?",
        answer: "Yes, in the Shiva Purana (Koti Rudra Samhita), 'Nagesham Darukavane' refers to the Nagesh Jyotirlinga located in Darukavana (the ancient Deodar forest of Jageshwar)."
      },
      {
        question: "Can we perform special Rudrabhishek or Maha Mrityunjaya Puja at Jageshwar?",
        answer: "Yes! GoTrek arranges certified local priests to conduct personalized Vedic Rudrabhishek and Maha Mrityunjaya Jap pujas with all puja samagri provided."
      },
      {
        question: "How far is Jageshwar Dham from Almora and Dharchula?",
        answer: "Jageshwar is located 36 km (1 hour) from Almora and approximately 175 km (5.5 hours) from Dharchula, making it an ideal overnight stopover before your Adi Kailash yatra."
      }
    ]
  },

  "patal-bhuvaneshwar": {
    slug: "patal-bhuvaneshwar",
    title: "Patal Bhuvaneshwar Subterranean Cave Temple Sacred Guide",
    subtitle: "Ancient Underground Limestone Cave · 33 Crore Deities · Gangolihat, Pithoragarh",
    tagline: "Journey into the Womb of the Earth Where Vedic Secrets are Carved in Living Limestone",
    location: "Bhuvaneshwar Village, near Gangolihat, Pithoragarh District, Uttarakhand",
    duration: "2 Days / 1 Night (Perfect Synergy with Adi Kailash & Munsiyari Circuits)",
    altitude: "4,430 ft (1,350 m)",
    difficulty: "Moderate",
    bestMonths: "March to June & September to December",
    startingPoint: "Kathgodam / Almora / Pithoragarh / Dharchula",
    endingPoint: "Dharchula / Pithoragarh / Kathgodam",
    priceStandard: 6500,
    pricePremium: 11000,
    bannerImage: "/images/temples/patal-bhuvaneshwar.webp",
    galleryImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1280&q=80",
      "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=1280&q=80"
    ],
    overview: "Patal Bhuvaneshwar is an awe-inspiring subterranean limestone cave temple located 160 meters underground and stretching over 240 meters into the womb of the earth in the tranquil hills of Gangolihat, Pithoragarh. Mentioned in detail in the 103rd Chapter of the Manaskhand of Skanda Purana, this sacred cave is revered as the divine abode where all 33 crore (330 million) deities of Sanatana Dharma reside in consecrated limestone formations. Descending through a narrow 80-foot rock crevice supported by heavy iron chains, pilgrims enter vast illuminated chambers with natural stalactites and stalagmites depicting the entire Hindu mythological cosmos.",
    spiritualSignificance: "The Skanda Purana proclaims that the spiritual fruit gained by worshipping at Patal Bhuvaneshwar exceeds the combined merit of pilgrimage to Badrinath, Kedarnath, and Amarnath. First discovered by King Ritupurna in Treta Yuga and visited by the Pandavas in Dvapara Yuga, it was re-opened for humanity in Kali Yuga by Jagadguru Adi Shankaracharya in 1191 AD.",
    highlights: [
      "Thrilling descent into a 160-meter deep underground limestone labyrinth assisted by chains",
      "Behold the 1000-hooded Sheshnag holding the weight of the Earth upon his stony back",
      "Darshan of the Ganesha Shila receiving holy nectar drops directly from natural Brahma Kamal stalactites",
      "Witness the four mythical Gates of Time: Paap Dwaar, Rann Dwaar, Dharm Dwaar, and Moksha Dwaar",
      "Natural limestone formations of Shiva's Matted Locks (Jata) continuously bathing the Shiva Linga",
      "See the Kalpavriksha, Kamadhenu's udders, and the mythological Swan with twisted neck",
      "Visit the famous Hat Kalika Temple nearby in Gangolihat (Revered Shakti Peeth & Indian Army Kumaon Regiment deity)"
    ],
    famousSpots: [
      {
        name: "The Subterranean Descent Passage",
        hindiName: "पाताल प्रवेश द्वार एवं लौह श्रृंखला",
        category: "Mythological",
        location: "Cave Entrance, Patal Bhuvaneshwar",
        significance: "The narrow 80-foot rock chimney descending into the earth",
        description: "An exhilarating descent holding heavy iron guide chains down a smooth, cool limestone tunnel, transporting pilgrims into an ancient underground sanctuary.",
        image: "/images/temples/patal-bhuvaneshwar-1.webp",
        keyHighlights: ["Iron chain assisted descent", "Natural rock friction stairs", "Electric illuminated passage"]
      },
      
      {
        name: "Hat Kalika Shakti Peeth (Gangolihat)",
        hindiName: "हाट कालिका माता शक्तिपीठ",
        category: "Spiritual",
        location: "14 km from Patal Bhuvaneshwar in Gangolihat",
        significance: "Revered Kali Shakti Peeth and the patron goddess of Kumaon Regiment soldiers",
        description: "A deeply charged spiritual shrine amidst dense cedar forest established by Adi Shankaracharya to channel the fierce grace of Goddess Mahakali.",
        image: "/images/temples/haat-kalika.webp",
        keyHighlights: ["Akhand Dhooni holy fire", "Indian Army war cry shrine", "Sacred red Chunari offerings"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Almora / Kathgodam to Gangolihat & Patal Bhuvaneshwar Arrival",
        altitude: "4,430 ft",
        distance: "115 km from Almora (4 hrs drive)",
        stay: "Deluxe KMVN / Himalayan Valley Resort in Patal Bhuvaneshwar",
        meals: "Lunch & Dinner",
        desc: "Drive through picturesque Kumaon terraced valleys past Berinag. Stop at sacred Hat Kalika Temple in Gangolihat for divine Shakti blessings. Arrive at Patal Bhuvaneshwar ridge. Evening briefing on cave descent protocols and Skanda Purana legends.",
        activities: ["Berinag Tea Garden Scenic Drive", "Hat Kalika Temple Darshan", "Cave Orientation Briefing", "Starlit Himalayan Evening"]
      },
      {
        day: 2,
        title: "Patal Bhuvaneshwar Cave Exploration & Onward Transit to Dharchula / Pithoragarh",
        altitude: "4,430 ft",
        distance: "90 km to Dharchula or 140 km to Kathgodam",
        stay: "Onward Destination / Departure",
        meals: "Breakfast & Hot Lunch",
        desc: "Early morning entry into Patal Bhuvaneshwar Cave under guidance of certified priest-guides. Explore the holy underground chambers, Sheshnag, Ganesha Shila, and Shiva's Matted Hair. Emerge rejuvenated and proceed onward to Dharchula for Adi Kailash or return to Kathgodam.",
        activities: ["Chain Assisted Cave Descent", "Complete 33 Crore Deities Guided Darshan", "Cave Photography Outside Gate", "Onward Mountain Journey"]
      }
    ],
    whatToWear: [
      {
        category: "Cave Exploring Attire & Footwear",
        iconName: "Shirt",
        description: "Underground temperature remains constant at 18°C with moderate humidity.",
        items: [
          { name: "Comfortable Flexible Stretch Pants / Trousers", importance: "Mandatory", notes: "Avoid tight formal clothing for easy chain climbing." },
          { name: "Rubber-Soled Grippy Shoes + Cotton Socks", importance: "Mandatory", notes: "Shoes are removed before entering; socks recommended on cold rock." },
          { name: "Small Hand Towel & Water Bottle", importance: "Recommended", notes: "For refreshing after emerging from cave." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government ID Card (Aadhaar / Passport)"],
      processingDays: "Cave entry tickets purchased on spot (Managed by ASI & Temple Committee)",
      checkposts: ["Patal Bhuvaneshwar ASI Entry Gate"],
      medicalRequirements: "Not recommended for persons with severe claustrophobia, acute asthma, or advanced mobility restrictions.",
      guidelines: ["Descent is assisted by sturdy iron chains and non-slip rubber mats.", "Priest guides carry backup emergency lighting."]
    },
    inclusions: [
      "Roundtrip transport in private 4x4 / SUV vehicle",
      "Deluxe hotel / resort stay with panoramic mountain views",
      "All pure vegetarian meals (Breakfast & Dinner)",
      "Official ASI Cave entry fees & certified temple priest guide charges",
      "Hat Kalika Shakti Peeth darshan in Gangolihat"
    ],
    exclusions: ["GST 5%", "Personal offering items"],
    faqs: [
      {
        question: "Is the descent inside Patal Bhuvaneshwar cave safe?",
        answer: "Yes! The descent is equipped with heavy stainless-steel iron chains, anti-skid rubber mats, and bright LED electric lighting installed by the Archaeological Survey of India (ASI)."
      },
      {
        question: "Can senior citizens visit Patal Bhuvaneshwar Cave?",
        answer: "Senior citizens with reasonable physical mobility and knee strength regularly complete the cave darshan. Priest guides provide gentle, step-by-step assistance throughout the 45-minute tour."
      },
      {
        question: "How does Patal Bhuvaneshwar fit into the Adi Kailash Yatra?",
        answer: "Patal Bhuvaneshwar is located near Gangolihat and Berinag, perfectly positioned on the route between Kathgodam/Almora and Dharchula, making it the most celebrated en route spiritual wonder."
      }
    ]
  },

  "kainchi-dham": {
    slug: "kainchi-dham",
    title: "Kainchi Dham Neem Karoli Baba Ashram Sacred Darshan Guide",
    subtitle: "World-Famous Miracle Ashram · Bhowali, Nainital · Spiritual Gateway to Kumaon",
    tagline: "The Global Sanctuary of Unconditional Love, Hanuman Bhakti & Divine Transformation",
    location: "Kainchi, Bhowali-Almora National Highway, Nainital District, Uttarakhand",
    duration: "1-2 Days Spiritual Gateway (Mandatory En Route Stop for All Kumaon Yatras)",
    altitude: "4,600 ft (1,402 m)",
    difficulty: "Easy",
    bestMonths: "Round the Year (June 15 Foundation Day Bhandara attracts lakhs of devotees)",
    startingPoint: "Kathgodam / Pantnagar Airport / New Delhi",
    endingPoint: "Almora / Dharchula / Kathgodam",
    priceStandard: 4000,
    pricePremium: 7500,
    bannerImage: "/images/destinations/kainchi-dham.webp",
    galleryImages: [
      
    ],
    overview: "Kainchi Dham is the internationally renowned spiritual ashram established in 1962 by the saint of modern times, Sri Neem Karoli Baba (affectionately known as Maharaj-ji). Situated in a picturesque green valley between two scissor-shaped hills ('Kainchi') alongside the rushing Kshipra river, the ashram is dedicated to Lord Hanuman. It gained worldwide prominence after transformative visits by global visionaries including Steve Jobs, Mark Zuckerberg, Julia Roberts, and millions of devotees seeking inner peace, purpose, and unconditional divine love.",
    spiritualSignificance: "Maharaj-ji taught the timeless path of 'Sub Ek' (All is One), 'Love Everyone, Feed Everyone, Remember God'. Devotees experience profound spiritual solace, spontaneous clarity of life direction, and divine protection simply by sitting in meditation inside the ashram courtyard and offering prayers at Maharaj-ji's Samadhi and Hanuman Mandir.",
    highlights: [
      "Holy Darshan at Sri Neem Karoli Baba Samadhi Temple & sacred Kutia",
      "Prayers at the consecrated Hanuman Mandir, Shiva Temple, and Vaishno Devi shrine",
      "Meditation in the serene ashram courtyard to the sound of continuous Hanuman Chalisa",
      "Receive the miraculous consecrated prasad of roasted chana, jaggery, and holy blanket blessings",
      "Sit by the tranquil Kshipra mountain river flowing gently past the ashram boundary",
      "Essential first spiritual blessing point on the highway from Kathgodam into high Kumaon"
    ],
    famousSpots: [
      {
        name: "Maharaj-ji Samadhi Temple",
        hindiName: "महाराज जी समाधि मंदिर",
        category: "Spiritual",
        location: "Central Ashram Complex",
        significance: "Sacred resting sanctuary of Sri Neem Karoli Baba",
        description: "The tranquil sanctum housing the marble murti of Maharaj-ji wrapped in his iconic woolen blanket, radiating boundless peace and compassion.",
        image: "/images/temples/kainchi-dham1.webp",
        keyHighlights: ["Marble murti of Baba Neem Karoli", "Continuous silent meditation", "Special prasad distribution"]
      },
      {
        name: "Shri Hanuman Mandir",
        hindiName: "श्री हनुमान जी मंदिर",
        category: "Spiritual",
        location: "Ashram Riverfront",
        significance: "Consecrated by Neem Karoli Baba in 1964",
        description: "A deeply vibrant temple where thousands of devotees gather daily to chant Hanuman Chalisa and participate in morning and evening aartis.",
        image: "/images/temples/kainchi-dham-2.webp",
        keyHighlights: ["Akhand Hanuman Chalisa recitations", "Divine morning & evening aarti", "Kshipra river views"]
      },
      {
        name: "Maharaj-ji's Holy Kutia & Personal Room",
        hindiName: "महाराज जी की पावन कुटिया",
        category: "Mythological",
        location: "Inner Ashram Grounds",
        significance: "The preserved living quarters where Maharaj-ji rested and met devotees",
        description: "A sacred wooden chamber preserving Baba's original wooden takhat (bed), blankets, and personal items, infused with palpable spiritual energy.",
        image: "/images/temples/kainchi-dham-3.webp",
        keyHighlights: ["Preserved holy artifacts", "Sacred wooden bed", "Silent darshan queue"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Pantnagar to Kainchi Dham & Almora Transit",
        altitude: "4,600 ft",
        distance: "42 km from Kathgodam (1.5 hrs drive)",
        stay: "Deluxe Resort in Bhowali / Almora",
        meals: "Lunch & Dinner",
        desc: "Morning pickup from Kathgodam railway station or Pantnagar Airport. Scenic drive up the hills to Kainchi Dham. Attend noon Aarti, meditate in the ashram courtyard, seek Baba's blessings, and partake in sacred prasad. Continue drive to Almora for evening rest.",
        activities: ["Scenic Bhowali Valley Drive", "Kainchi Dham Darshan & Aarti", "Ashram Meditation", "Himalayan Sunset View"]
      },
      {
        day: 2,
        title: "Bhowali / Almora Morning Prayers & Onward Mountain Journey",
        altitude: "5,600 ft",
        distance: "Onward journey to Dharchula (185 km) or Kathgodam return",
        stay: "Onward Stay / Departure",
        meals: "Breakfast",
        desc: "Enjoy fresh mountain air and breakfast before proceeding onwards to Pithoragarh and Dharchula for the sacred Adi Kailash & Om Parvat circuit.",
        activities: ["Morning Mountain Walk", "Onward Yatra Transit"]
      }
    ],
    whatToWear: [
      {
        category: "Modest Ashram Attire",
        iconName: "Shirt",
        description: "Comfortable weather (15°C to 25°C in summer, 5°C to 15°C in winter).",
        items: [
          { name: "Modest Indian / Decent Clothing (Kurta/Salwar/Pants)", importance: "Mandatory", notes: "Ashram maintains strict modest dress decorum." },
          { name: "Light Cardigan / Shawl", importance: "Recommended", notes: "For cool riverside breeze." },
          { name: "Slip-On Footwear", importance: "Mandatory", notes: "For easy removal at ashram gates." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Valid Photo ID Card"],
      processingDays: "No permits required (Open to all pilgrims year-round)",
      checkposts: ["None on highway"],
      medicalRequirements: "Paved flat walking access across the bridge from highway.",
      guidelines: ["Photography prohibited inside the main sanctum.", "Ashram opens 6:30 AM to 6:30 PM."]
    },
    inclusions: [
      "Private AC / 4x4 vehicle transfers from Kathgodam",
      "Deluxe hotel / resort stay nearby",
      "Pure vegetarian meals",
      "Ashram darshan assistance and VIP timing coordination",
      "Consecrated prasad kit"
    ],
    exclusions: ["GST 5%", "Personal ashram donations"],
    faqs: [
      {
        question: "What are the ashram timings at Kainchi Dham?",
        answer: "Kainchi Dham is open daily from 6:30 AM to 6:30 PM. Morning Aarti is held at 7:00 AM and Evening Aarti at 6:00 PM."
      },
      {
        question: "Can we stay inside Kainchi Dham ashram?",
        answer: "Staying inside the ashram requires formal prior written permission from the ashram trust. GoTrek arranges comfortable boutique resorts and hotels in nearby Bhowali (8 km away)."
      },
      {
        question: "Is Kainchi Dham open during the Adi Kailash Yatra season?",
        answer: "Yes, Kainchi Dham is open 365 days a year and is located directly on the Kathgodam-Almora pilgrimage route, making it the customary opening darshan for all GoTrek yatris."
      }
    ]
  },

  "khaliya-top": {
    slug: "khaliya-top",
    title: "Khaliya Top & Munsiyari Alpine Expedition 2027",
    subtitle: "Munsiyari · Khaliya Bugyal (11,500 ft) · Zero Point Summit (12,200 ft) · 360° Panchachuli Panorama",
    tagline: "The Alpine Meadow Jewel of Kumaon — Golden Sunrise Over Panchachuli, Nanda Devi & Trishul",
    location: "Munsiyari, Pithoragarh District, Kumaon Himalayas, Uttarakhand",
    duration: "4 Days / 3 Nights (Extendable to 5 Days with Birthi Falls & Darkot)",
    altitude: "11,500 ft (Bugyal Camp) / 12,200 ft (Zero Point Summit)",
    difficulty: "Moderate",
    bestMonths: "March to June (Rhododendron Blossom & Wildflowers) & October to February (Pristine Snow & Winter Trekking)",
    startingPoint: "Kathgodam / Haldwani / Pantnagar Airport / Almora",
    endingPoint: "Kathgodam Railway Station / Haldwani",
    priceStandard: 16000,
    pricePremium: 24000,
    bannerImage: "/images/destinations/khaliya-top.webp",
    galleryImages: [
     
    ],
    overview: "Perched at 7,200 ft in Pithoragarh district, Munsiyari (literally meaning 'Place with Snow') is often hailed as the 'Little Kashmir of Uttarakhand'. Towering directly above this historic Johar Valley gateway is Khaliya Top, a high-altitude velvet alpine meadow (bugyal) situated at 11,500 ft and ascending to Zero Point summit at 12,200 ft. Khaliya Top offers one of the most sublime 360-degree amphitheater panoramas of the Greater Himalayas in India — showcasing the five formidable peaks of Panchachuli (Panch-Chula), Nanda Devi East, Nanda Devi Main, Hardeol, Nandakot, Trishul, and Rajrambha.",
    spiritualSignificance: "According to the Mahabharata, the Panchachuli peaks are the five celestial hearths ('Panch Chulhas') where the Pandavas cooked their final meal before ascending to heaven via Swargarohini. The nearby sacred mountain lake, Maheshwari Kund (Mehsar Kund), holds centuries-old Yaksha legends where local villagers pray for bountiful rain and mountain safety.",
    highlights: [
      "Unrivaled 360-degree panoramic views of Panchachuli I–V, Nanda Devi & Hardeol peaks",
      "Trek through enchanting dense forests of scarlet red and pink Rhododendron (Buransh)",
      "Zero Point Summit ascent (12,200 ft) for breathtaking golden Himalayan sunrise & alpenglow",
      "Overnight alpine camping under brilliant zero-light-pollution Milky Way star fields",
      "Visit the 126-meter thundering Birthi Waterfall en route from Thal / Almora",
      "Explore Darkot Heritage Handloom Village, renowned for hand-spun Angora & Pashmina shawls",
      "Discover the Tribal Heritage Museum curated by Master Surendra Singh Pangti with ancient Johar artefacts",
      "Peaceful pilgrimage walk to sacred Maheshwari Kund & Nanda Devi Temple at Betulidhar",
      "Zero Inner Line Permit (ILP) required — completely open for both Indian and international trekkers"
    ],
    famousSpots: [
      {
        name: "Khaliya Bugyal & Zero Point Summit",
        hindiName: "खलिया बुग्याल एवं ज़ीरो पॉइंट शिखर",
        altitude: "11,500 ft – 12,200 ft (3,718 m)",
        location: "6 km uphill trek from Balati Bend, Munsiyari",
        category: "Scenic Viewpoint",
        image: "/images/destinations/khaliya-trek.webp",
        significance: "Highest vantage ridge overlooking the entire Central & Eastern Kumaon Himalayan ranges.",
        mythologicalLore: "Known as the ridge of heavenly visions where ancient rishis and mountain nomads offered prayers to Goddess Nanda Devi.",
        description: "An expansive rolling alpine meadow carpeted with snow in winter and lush emerald grasses with colorful wild primulas, anemones, and gentians in spring and summer. The trail passes through dense oak and rhododendron canopies before breaking into expansive bugyals with unimpeded views of the Panchachuli massif.",
        keyHighlights: ["360° Great Himalayan view", "Zero Point sunrise ridge", "Alpine meadow stargazing", "Buransh flower trails"]
      },
      {
        name: "Panchachuli Peaks Viewpoint (Betulidhar)",
        hindiName: "पंचाचूली दर्शन स्थल (बेतूलीधार)",
        altitude: "7,200 ft (2,200 m)",
        location: "Munsiyari town edge overlooking Gori River valley",
        category: "Scenic Viewpoint",
        image: "/images/memories/panchachuli-peaks.webp",
        significance: "Closest motorable panoramic viewpoint of the five snow-capped Panchachuli spires.",
        mythologicalLore: "The sacred five peaks where Yudhisthira, Bhima, Arjuna, Nakula, and Sahadeva cooked their last earthly meal before Swargarohini.",
        description: "Betulidhar offers a front-row seat to the colossal 6,904m Panchachuli peaks. In the evening, the snowy crests turn from dazzling platinum to radiant amber and deep crimson during the famous Himalayan sunset.",
        keyHighlights: ["Panchachuli I to V frontal view", "Spectacular sunset photography", "Snowline observation point", "Gori Ganga river gorge backdrop"]
      },

      {
        name: "Birthi Waterfalls (126m Cascade)",
        hindiName: "बिरथी जलप्रपात",
        altitude: "6,000 ft (1,828 m)",
        location: "35 km before Munsiyari on Thal-Munsiyari Road",
        category: "Scenic Viewpoint",
        image: "/images/memories/birthi-waterfall.webp",
        significance: "One of the tallest and most thunderous perennial waterfalls in Uttarakhand.",
        mythologicalLore: "Fed by high-altitude glacial springs from the Panchachuli mountain meltwaters.",
        description: "A colossal 126-meter white plume cascading dramatically down a sheer granite cliff wall amid emerald ferns and wild foliage. A well-paved 200m walking trail leads up to the plunge pool where cool spray refreshes weary travelers.",
        keyHighlights: ["126-meter vertical water drop", "Short 10-minute paved trail", "KMVN wayside cafeteria & viewpoint", "Pristine mountain photography"]
      },
      {
        name: "Darkot Handloom Heritage Village",
        hindiName: "दारकोट पारंपरिक बुनकर गाँव",
        altitude: "6,500 ft (1,980 m)",
        location: "6 km from Munsiyari along Gori Ganga valley",
        category: "Heritage Village",
        image: "/images/memories/darkot.webp",
        significance: "Traditional Bhotia village renowned worldwide for hand-woven Pashmina and Angora wool shawls.",
        mythologicalLore: "Century-old artisan lineage preserving trans-Himalayan weaving traditions and Tibetan lamb-wool spinning.",
        description: "Picturesque stone houses adorned with hand-carved deodar wood windows where local women skillfully weave pashmina stoles, sheep wool carpets (Dan), and warm mufflers on pit looms right outside their doorsteps.",
        keyHighlights: ["Authentic Pashmina & Angora weaving", "Direct artisan-to-traveler purchase", "Traditional slate-roof Kumaoni homes", "Warm local tea and hospitality"]
      },
   
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Almora to Munsiyari via Birthi Falls",
        altitude: "7,200 ft (Munsiyari Base)",
        distance: "280 km (8-9 hrs scenic hill drive)",
        stay: "Panoramic Himalayan View Resort / Hotel in Munsiyari",
        meals: "Breakfast at Bhowali, Lunch at Thal/Chaukori, Dinner at Munsiyari",
        desc: "Morning pickup from Kathgodam Railway Station. Drive through the scenic Kumaon mountains passing Kainchi Dham, Almora, and the tea gardens of Chaukori. Stop for photography and chai at the majestic 126m Birthi Waterfall. Climb up to Kalamuni Top (9,600 ft) for your first breathtaking darshan of the Panchachuli peaks before descending into Munsiyari bowl by sunset.",
        activities: ["Kalamuni Kali Temple Darshan", "Birthi Waterfall Exploration", "Panchachuli Sunset Alpenglow View", "Trek Briefing & Gear Check"]
      },
      {
        day: 2,
        title: "Munsiyari to Khaliya Top Alpine Bugyal Trek & Sunset Ridge",
        altitude: "11,500 ft (Khaliya Bugyal Camp)",
        distance: "6 km uphill trek (3-4 hrs gradual climb)",
        stay: "KMVN Alpine Wooden Huts / Deluxe High-Altitude Dome Tents at Khaliya Top",
        meals: "Breakfast at Munsiyari, Hot Lunch at Bugyal Camp, Hot Camp Dinner with Soup",
        desc: "After a healthy mountain breakfast, short 10-minute drive to Balati Bend (Trek starting point). Begin gentle hike under dense oak, pine, and crimson Rhododendron (Buransh) trees. As you break above the tree line at 10,000 ft, vast alpine meadows open up with jaw-dropping views of Panchachuli. Arrive at Khaliya campsite, unpack, and hike to the sunset vantage ridge.",
        activities: ["Rhododendron Forest Trail Walk", "Acclimatization Walk on Alpine Meadow", "Grand Panchachuli Sunset View", "Milky Way Astrophotography & Stargazing"]
      },
      {
        day: 3,
        title: "Zero Point Summit Ascent (12,200 ft) & Descent to Munsiyari",
        altitude: "12,200 ft Summit -> 7,200 ft Munsiyari",
        distance: "2 km summit ascent + 6 km descent trek",
        stay: "Deluxe Himalayan Hotel in Munsiyari",
        meals: "Early morning tea at Summit, Hot Breakfast at Camp, Lunch & Dinner in Munsiyari",
        desc: "Pre-dawn start (5:00 AM) for Zero Point Summit (12,200 ft). Witness one of the most magnificent golden sunrises in Asia as the first rays ignite Nanda Devi, Hardeol, Nandakot, Trishul, and Panchachuli peaks in dazzling gold. Return to camp for hot breakfast, then descend smoothly to Munsiyari. Afternoon visit to Darkot Handloom Village and Tribal Heritage Museum.",
        activities: ["Zero Point 360° Golden Sunrise", "Himalayan Ridge Photography", "Descent to Base", "Darkot Handloom Shopping", "Master Pangti Museum Tour"]
      },
      {
        day: 4,
        title: "Munsiyari to Kathgodam Railway Station via Bageshwar / Almora",
        altitude: "1,700 ft (Kathgodam)",
        distance: "280 km (8 hrs scenic drive)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Munsiyari, Lunch en route at Almora",
        desc: "Early morning final sunrise over Panchachuli from your hotel balcony. Depart for Kathgodam via Bageshwar Bagnath Temple or Almora. Arrive at Kathgodam Railway Station by 6:00 PM for onward train connections (Ranikhet Express / Shatabdi) or overnight Volvo bus to New Delhi.",
        activities: ["Morning Panchachuli Photography", "Bagnath Temple / Almora Souvenir Stop", "Smooth Kathgodam Station Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Trekking & Alpine Layering System",
        iconName: "Shirt",
        description: "Daytime trekking temperatures range from 12°C to 20°C in summer, while night bugyal temperatures drop to 2°C to 6°C (sub-zero in winter).",
        items: [
          { name: "Quick-Dry Moisture Wicking T-Shirts (2-3)", importance: "Mandatory", notes: "Prevents sweat chilling during uphill walk." },
          { name: "Fleece Jacket or Softshell Windcheater", importance: "Mandatory", notes: "Essential for ridge wind at Khaliya Top." },
          { name: "Heavy Down Jacket / Puffer Jacket (-5°C rated)", importance: "Mandatory", notes: "For evening campsite and Zero Point sunrise." },
          { name: "Ankle-Support Trekking Shoes with Deep Lugs", importance: "Mandatory", notes: "Ensure shoes are well broken in." },
          { name: "Woolen Beanie & Thermal Inner Wear (1 set)", importance: "Mandatory", notes: "For night camp warmth." },
          { name: "UV400 Sunglasses & Sun Hat", importance: "Mandatory", notes: "Protects against high-altitude alpine glare." },
          { name: "Trekking Pole (Adjustable)", importance: "Recommended", notes: "Eases knee strain during the descent." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Original Government ID (Aadhaar / Voter ID / Passport)"],
      processingDays: "No Inner Line Permit (ILP) required! Open 365 days for Indian & Foreign nationals",
      checkposts: ["Kalamuni Forest Gate (Nominal entry token managed by GoTrek)"],
      medicalRequirements: "General physical fitness and ability to walk 6 km uphill at your own gentle pace.",
      guidelines: [
        "Khaliya Top trek is beginner-friendly and ideal for families, solo trekkers, and photography enthusiasts.",
        "Porter / mule support for backpack transfer is available upon advance request."
      ]
    },
    inclusions: [
      "Kathgodam to Munsiyari and return surface transfers in comfortable private SUV / Tempo Traveler",
      "2 Nights deluxe hotel accommodation in Munsiyari (Himalayan view rooms)",
      "1 Night alpine camping / KMVN hut stay at Khaliya Top with sleeping bags, foam mats & heating",
      "All nutritious meals (Breakfast, Lunch, Evening Tea & Snacks, Dinner)",
      "Certified local mountaineering trek guide & safety escort",
      "Forest entry fees and camping permits",
      "Darkot Village and Tribal Heritage Museum excursion"
    ],
    exclusions: [
      "Personal porter / pony expenses",
      "GST 5%",
      "Personal insurance and mineral water bottles"
    ],
    faqs: [
      {
        question: "Is Khaliya Top trek suitable for beginners and families?",
        answer: "Yes! Khaliya Top is one of the most accessible high-altitude meadow treks in Uttarakhand. The 6 km trail from Balati Bend has a gentle gradient, and hikers of all fitness levels can complete it comfortably in 3 to 4 hours."
      },
      {
        question: "Do we need an Inner Line Permit (ILP) for Munsiyari and Khaliya Top?",
        answer: "No! Unlike the upper Vyas Valley (Adi Kailash & Om Parvat), Munsiyari and Khaliya Top do not fall within the restricted border zone. No SDM permit or police clearances are required for either Indian citizens or foreign nationals."
      },
      {
        question: "What is the best season to witness snow at Khaliya Top?",
        answer: "For pristine snow trekking and winter camping, December to February is ideal. For blooming red and pink Rhododendron forests and crystal-clear mountain visibility, March to May is the prime window."
      },
      {
        question: "Can Khaliya Top be combined with the Adi Kailash or Patal Bhuvaneshwar Yatra?",
        answer: "Absolutely! Munsiyari is just 95 km (3.5 hours) from Patal Bhuvaneshwar and 130 km from Dharchula, making it a very popular 2-3 day extension before or after the Adi Kailash pilgrimage."
      }
    ]
  },

  "kumaon-darshan": {
    slug: "kumaon-darshan",
    title: "Complete Kumaon Darshan Sacred Heritage Circuit 2027",
    subtitle: "Kainchi Dham · Jageshwar 124 Jyotirlinga · Chitai Golu Devta · Patal Bhuvaneshwar · Kasar Devi · Baijnath",
    tagline: "The Ultimate Spiritual Pilgrimage Through the Divine Abodes, Mystic Caves & Energy Centers of Devbhoomi Kumaon",
    location: "Nainital · Almora · Pithoragarh · Bageshwar Districts, Kumaon Himalayas, Uttarakhand",
    duration: "6 Days / 5 Nights",
    altitude: "4,400 ft to 7,500 ft (Pleasant, senior-citizen friendly hill altitudes)",
    difficulty: "Easy",
    bestMonths: "Round the Year (Best: March to June & September to December)",
    startingPoint: "Kathgodam Railway Station / Pantnagar Airport / New Delhi",
    endingPoint: "Kathgodam Railway Station / Pantnagar Airport",
    priceStandard: 24500,
    pricePremium: 36000,
    bannerImage: "/images/memories/group-memory-05.webp",
    galleryImages: [
      
    ],
    overview: "The Manaskhand of Skanda Purana glorifies the sacred geography of Kumaon as the supreme sanctuary of cosmic meditation, divine temples, and miraculous rishis. The Complete Kumaon Darshan circuit weaves together the most revered and spiritually potent shrines of Uttarakhand: Sri Neem Karoli Baba's world-famous Kainchi Dham Ashram; the sacred 8th Jyotirlinga cluster of 124 Nagara stone temples at Jageshwar Dham nestled inside dense 500-year-old Deodar cedars; the unique justice shrine of Chitai Golu Devta adorned with 10,000 sacred brass bells; the subterranean underground limestone marvel of Patal Bhuvaneshwar housing all 33 crore Vedic deities; the world-renowned geomagnetic energy vortex at Kasar Devi Temple (Crank's Ridge); the 9th-century Sun Temple at Katarmal; and the 12th-century Katyuri stone shrines of Baijnath along the holy Gomti river.",
    spiritualSignificance: "This holistic pilgrimage brings profound blessings of longevity (Maha Mrityunjaya at Jageshwar), karmic justice & wish fulfillment (Golu Devta), deep meditation and cosmic alignment (Kainchi Dham & Kasar Devi), and liberation from fear (Patal Bhuvaneshwar & Hat Kalika).",
    highlights: [
      "Holy Darshan & silent meditation at Sri Neem Karoli Baba's miraculous Kainchi Dham Ashram",
      "Special VIP Maha Mrityunjaya Jap & Rudrabhishek Puja at Jageshwar Dham's 124 temple cluster",
      "Tie a bell and written petition for justice at the revered Chitai Golu Devta Temple",
      "Descend into Patal Bhuvaneshwar's underground limestone cave with 33 crore sacred deities",
      "Meditate at Kasar Devi Temple — located on the Earth's rare Van Allen geomagnetic radiation belt",
      "Witness sunset over the 300 km snow-peak Himalayan crest from Kausani ('Switzerland of India')",
      "Visit ancient 12th-century stone shrines of Baijnath & the sacred confluence at Bageshwar Bagnath",
      "Seek divine warrior blessings at Hat Kalika Mata Shakti Peeth (patron deity of Indian Army Kumaon Regiment)",
      "100% senior-citizen friendly with private sanitized vehicles, deluxe boutique stays & sattvik cuisine"
    ],
    famousSpots: [
      {
        name: "Kainchi Dham (Neem Karoli Baba Ashram)",
        hindiName: "कैंची धाम (नीब करौरी बाबा आश्रम)",
        altitude: "4,600 ft (1,402 m)",
        location: "Bhowali-Almora Highway, Nainital District",
        category: "Spiritual",
        image: "/images/temples/kainchi-dham.webp",
        significance: "Globally venerated sanctuary of unconditional love, Hanuman bhakti, and inner transformation.",
        mythologicalLore: "Consecrated by saint Sri Neem Karoli Baba (Maharaj-ji) who taught 'Love Everyone, Feed Everyone, Remember God'. Visited by global leaders, scholars, and millions of devotees.",
        description: "A tranquil riverside ashram situated between two scissor-shaped hills along the Kshipra river. Devotees participate in continuous Hanuman Chalisa chanting, meditate before Maharaj-ji's Samadhi, and receive sacred prasad.",
        keyHighlights: ["Neem Karoli Baba Samadhi Darshan", "Akhand Hanuman Chalisa & Aarti", "Sacred Kutia & wooden takhat", "Peaceful Kshipra riverfront"]
      },
      {
        name: "Jageshwar Dham (124 Stone Temples Cluster)",
        hindiName: "जागेश्वर धाम (124 प्राचीन शिव मंदिर)",
        altitude: "6,135 ft (1,870 m)",
        location: "36 km from Almora, nestled in holy Darukavana deodar glen",
        category: "Spiritual",
        image: "/images/temples/jageshwar-dham.webp",
        significance: "Venerated as the 8th Jyotirlinga (Nagesh Darukavane) in the Shiva Purana and ASI heritage wonder.",
        mythologicalLore: "Lord Shiva arrived here in his ascetic Digambara form after Sati's sacrifice. Chanting the Maha Mrityunjaya mantra here dispels all ailments, fears, and premature death.",
        description: "A breathtaking cluster of 124 stone shikhara shrines built between the 7th and 14th centuries CE by Katyuri and Chand kings. Giant 500-year-old Deodars tower over the temples while the Jataganga stream whispers alongside.",
        keyHighlights: ["Maha Mrityunjaya eye-shaped Jyotirlinga", "Tarun Jageshwar & Pushti Devi sanctums", "ASI Archaeological Museum", "Evening butter-lamp Deepdaan Aarti"]
      },
      {
        name: "Patal Bhuvaneshwar Subterranean Cave",
        hindiName: "पाताल भुवनेश्वर गुफा मंदिर",
        altitude: "4,430 ft (1,350 m)",
        location: "Gangolihat, Pithoragarh District",
        category: "Spiritual",
        image: "/images/temples/patal-bhuvaneshwar.webp",
        significance: "160-meter underground limestone cave temple described in the 103rd Chapter of Skanda Purana.",
        mythologicalLore: "Houses consecrated natural stalactite formations representing all 33 crore Hindu deities, Sheshnag supporting the earth, Ganesha Shila bathed by celestial Brahma Kamal drops, and the 4 Yuga Dwaars.",
        description: "Pilgrims descend via a narrow iron-chain-assisted chimney into expansive electrified limestone chambers, beholding an ancient mythological universe carved entirely in living stone.",
        keyHighlights: ["Chain assisted cave descent", "Sheshnag 1,000 hood limestone bed", "Ganesha Shila celestial nectar water", "Four cosmic Yuga Gates"]
      },
      {
        name: "Chitai Golu Devta Temple (Temple of 10,000 Bells)",
        hindiName: "चितई गोलू देवता मंदिर (न्याय के देवता)",
        altitude: "5,800 ft (1,768 m)",
        location: "9 km from Almora on Pithoragarh Road",
        category: "Spiritual",
        image: "/images/temples/golu-devta.webp",
        significance: "The Supreme Court of Divine Justice where millions of devotees hang brass bells and written stamp petitions.",
        mythologicalLore: "Lord Golu Devta is worshipped as the incarnation of Lord Shiva who delivers prompt and absolute justice to the innocent and downtrodden.",
        description: "A resonant sanctuary filled with the melodious chime of tens of thousands of brass bells of all sizes. Devotees tie stamped letters requesting divine intervention, returning with grateful bell offerings once their prayers are answered.",
        keyHighlights: ["10,000+ consecrated brass bells", "Written legal petition pillar", "Vibrant Kumaoni cultural aura", "Chitai pine forest setting"]
      },
      {
        name: "Kasar Devi Temple & Crank's Ridge",
        hindiName: "कसार देवी मंदिर एवं क्रैंक्स रिज",
        altitude: "6,920 ft (2,110 m)",
        location: "8 km from Almora town ridge",
        category: "Spiritual",
        image: "/images/temples/kasar-devi.webp",
        significance: "One of only three spots on Earth (along with Stonehenge and Machu Picchu) positioned on the high-intensity geomagnetic Van Allen radiation belt.",
        mythologicalLore: "Ancient rock-cut cave where Goddess Durga vanquished the demons Shumbha and Nishumbha. Revered as an epicenter of heightened meditative consciousness visited by Swami Vivekananda, Rabindranath Tagore, and Lama Govinda.",
        description: "Perched high on a scenic pine-fringed ridge, Kasar Devi offers deep silent meditation spaces and an astounding 180-degree view of the snow-clad peaks of Trishul, Nanda Devi, and Panchachuli.",
        keyHighlights: ["Van Allen Geomagnetic field", "Swami Vivekananda meditation cave", "Silent Himalayan sunset ridge", "Ancient Katyuri Durga sanctum"]
      },
      {
        name: "Baijnath Ancient Temple Complex",
        hindiName: "बैजनाथ प्राचीन शिव मंदिर (गोमती तट)",
        altitude: "3,690 ft (1,125 m)",
        location: "Baijnath, Garur Valley, Bageshwar District",
        category: "Spiritual",
        image: "/images/temples/baijnath-temple.webp",
        significance: "12th-century stone temple cluster constructed on the banks of holy Gomti river by Katyuri rulers.",
        mythologicalLore: "Where Lord Shiva and Goddess Parvati were married at the confluence of Gomti and Sarayu rivers in Kumaon lore.",
        description: "Exquisite stone shrines featuring the rare monolithic black stone idol of Goddess Parvati and an artificial lake filled with sacred Golden Mahseer fish that pilgrims lovingly feed.",
        keyHighlights: ["Monolithic black-stone Parvati idol", "Sacred Gomti river reflection", "Feeding sacred Mahseer fish", "12th-century Katyuri architecture"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam / Pantnagar to Kainchi Dham & Almora Ridge",
        altitude: "5,600 ft (Almora)",
        distance: "90 km (3.5 hrs scenic drive)",
        stay: "Deluxe Himalayan View Resort / Hotel in Almora / Bhowali",
        meals: "Lunch at Bhowali, Pure Veg Dinner at Resort",
        desc: "Morning pickup from Kathgodam Railway Station or Pantnagar Airport. Ascend into the pine-fragrant Kumaon hills. Arrive at Kainchi Dham Neem Karoli Baba Ashram. Participate in noon Aarti, meditate in the peaceful courtyard, seek Maharaj-ji's blessings, and receive consecrated prasad. Drive past Bhowali apple orchards to Almora for check-in and evening mountain sunset.",
        activities: ["Kainchi Dham Darshan & Meditation", "Maharaj-ji Samadhi Puja", "Bhowali Valley View", "Almora Sunset & Rest"]
      },
      {
        day: 2,
        title: "Kasar Devi Geomagnetic Vortex, Katarmal Sun Temple & Jageshwar Dham",
        altitude: "6,135 ft (Jageshwar Valley)",
        distance: "65 km local sightseeing drive",
        stay: "Deodar Forest Retreat / Resort in Jageshwar Valley",
        meals: "Breakfast at Almora, Lunch en route, Dinner at Jageshwar",
        desc: "Early morning meditation at Kasar Devi Temple on the geomagnetic Van Allen belt. Visit the 9th-century Katarmal Sun Temple and offer prayers at Chitai Golu Devta Temple with its thousands of bells. Proceed through thick cedar forests to Jageshwar Dham. Freshen up and participate in the evocative evening Deepdaan and butter-lamp Aarti at Tarun Jageshwar under 500-year-old Deodars.",
        activities: ["Kasar Devi Van Allen Meditation", "Chitai Golu Devta Bell Offering", "Katarmal Surya Mandir Tour", "Evening Jageshwar Deodar Aarti"]
      },
      {
        day: 3,
        title: "Jageshwar Maha Mrityunjaya Puja, Vridh Jageshwar & Patal Bhuvaneshwar",
        altitude: "4,430 ft (Patal Bhuvaneshwar)",
        distance: "115 km (4 hrs scenic mountain drive)",
        stay: "Panoramic Hill Resort / KMVN in Patal Bhuvaneshwar",
        meals: "Breakfast at Jageshwar, Lunch at Gangolihat, Dinner at Patal Bhuvaneshwar",
        desc: "Participate in morning Rudrabhishek and Maha Mrityunjaya Jap puja with local Vedic priests at Jageshwar. Visit the ASI Museum and take a short drive up to Vridh Jageshwar for panoramic views of Trishul and Nanda Devi. Drive towards Gangolihat to seek blessings at Hat Kalika Mata Shakti Peeth before reaching Patal Bhuvaneshwar ridge.",
        activities: ["Maha Mrityunjaya Special Puja", "Vridh Jageshwar Snow Peak View", "Hat Kalika Shakti Peeth Darshan", "Evening Cave Briefing"]
      },
      {
        day: 4,
        title: "Patal Bhuvaneshwar 33-Crore Cave Darshan & Chaukori Himalayan Sunset",
        altitude: "6,500 ft (Chaukori)",
        distance: "40 km scenic drive",
        stay: "Chaukori Tea Estate Resort with direct Panchachuli views",
        meals: "Breakfast at Patal Bhuvaneshwar, Lunch at Berinag, Dinner at Chaukori",
        desc: "Early morning guided descent into Patal Bhuvaneshwar cave. Witness the 1,000-hooded Sheshnag, Ganesha Shila, and cosmic Yuga Dwaars. Emerge feeling spiritually energized. Drive past the sprawling Berinag tea gardens to Chaukori. Enjoy a breathtaking uninterrupted sunset over the Panchachuli and Nanda Devi mountain ranges right from your resort garden.",
        activities: ["Complete Patal Bhuvaneshwar Cave Darshan", "Berinag Tea Garden Drive", "Chaukori 300 km Snow Peak Sunset", "Starlit Himalayan Evening"]
      },
      {
        day: 5,
        title: "Chaukori to Baijnath Temple, Bageshwar Bagnath & Kausani",
        altitude: "6,200 ft (Kausani)",
        distance: "95 km (3.5 hrs drive)",
        stay: "Deluxe Resort in Kausani ('Switzerland of India')",
        meals: "Breakfast at Chaukori, Lunch at Kausani, Dinner at Resort",
        desc: "Sunrise over Panchachuli from Chaukori. Drive down to the historic Baijnath temple complex on the banks of Gomti river. Feed the sacred Golden Mahseer fish and visit Bageshwar Bagnath Temple at the Sarayu confluence. Ascend to Kausani where Mahatma Gandhi wrote his treatise on Anasakti Yoga. Witness spectacular alpenglow sunset over Trishul and Nanda Devi.",
        activities: ["Baijnath 12th Century Temple Darshan", "Feeding Sacred Gomti Fish", "Bageshwar Bagnath Darshan", "Anasakti Ashram Sunset at Kausani"]
      },
      {
        day: 6,
        title: "Kausani Himalayan Sunrise, Ranikhet & Kathgodam Drop",
        altitude: "1,700 ft (Kathgodam)",
        distance: "140 km (4.5 hrs scenic drive)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Kausani, Lunch en route at Ranikhet / Bhimtal",
        desc: "Behold the famous golden sunrise lighting up the 300-km Himalayan snow crest from Kausani. Enjoy breakfast and drive via Ranikhet (visiting Jhula Devi Temple of bells and Chaubatia apple orchards) or Bhimtal lake before a smooth drop at Kathgodam Railway Station by 5:30 PM.",
        activities: ["Golden Himalayan Panorama Sunrise", "Ranikhet Jhula Devi Temple Stop", "Bhimtal Lakeside Chai", "Kathgodam Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Temple Pilgrimage & Modest Hill Attire",
        iconName: "Shirt",
        description: "Pleasant mountain weather (15°C to 25°C in summer, 5°C to 15°C in spring/autumn).",
        items: [
          { name: "Traditional Pure Cotton / Silk Puja Attire (Kurta-Pyjama / Saree / Salwar)", importance: "Recommended", notes: "For Jageshwar Abhishek & temple rituals." },
          { name: "Comfortable Flexible Trousers / Stretch Pants", importance: "Mandatory", notes: "Essential for Patal Bhuvaneshwar cave descent." },
          { name: "Fleece Jacket & Warm Shawl", importance: "Mandatory", notes: "Evenings in Jageshwar deodar valley and Kausani are cool." },
          { name: "Slip-On Walking Shoes & Cotton Socks", importance: "Mandatory", notes: "Easy removal at temple entrances." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Issued Photo ID Card (Aadhaar / Voter ID / Passport)"],
      processingDays: "No Inner Line Permits required — completely open 365 days a year",
      checkposts: ["None on highway (Direct motorable paved roads throughout)"],
      medicalRequirements: "Suitable for all age groups including senior citizens and children. Cave descent has iron chains and gentle assistance.",
      guidelines: [
        "Special Rudrabhishek pujas at Jageshwar Dham are pre-coordinated with temple trust priests.",
        "Modest dress decorum is maintained at all ashrams and sacred sanctums."
      ]
    },
    inclusions: [
      "Pick up and drop at Kathgodam / Pantnagar in sanitized private AC vehicle (Innova / Ertiga / Tempo Traveler)",
      "5 Nights accommodation in handpicked boutique mountain resorts & KMVN heritage properties",
      "All pure vegetarian Sattvik meals (Breakfast & Dinner daily)",
      "VIP Priest assistance for Maha Mrityunjaya Rudrabhishek Puja at Jageshwar Dham",
      "Official ASI entry passes & certified cave priest guide at Patal Bhuvaneshwar",
      "Dedicated knowledgeable local driver-guide throughout the circuit"
    ],
    exclusions: [
      "Personal dakshina / puja samagri offerings",
      "GST 5%",
      "Personal laundry, telephone, or tips"
    ],
    faqs: [
      {
        question: "Is this Kumaon Darshan circuit suitable for senior citizens?",
        answer: "Yes, exceptionally so! All destinations on this circuit are accessible by smooth motorable roads. Stays are arranged in premium resorts with ground-floor rooms, hot water, and fresh Sattvik food."
      },
      {
        question: "How far is Kainchi Dham from Kathgodam Railway Station?",
        answer: "Kainchi Dham is located just 42 km (approx. 1.5 hours scenic drive) from Kathgodam, making it an effortless opening stop on the first day."
      },
      {
        question: "Can this tour be customized to include Adi Kailash or Munsiyari?",
        answer: "Yes! GoTrek specializes in custom extensions. You can effortlessly extend this circuit from Patal Bhuvaneshwar to Munsiyari / Khaliya Top (3.5 hours) or Dharchula for the sacred Adi Kailash & Om Parvat Yatra."
      },
      {
        question: "What is special about the Kasar Devi geomagnetic energy field?",
        answer: "NASA and geomagnetic studies have documented that Kasar Devi is situated on the Earth's unique Van Allen radiation belt, creating an intensely peaceful, naturally meditative electromagnetic aura."
      }
    ]
  },

  "spiti-valley": {
    slug: "spiti-valley",
    title: "Spiti Valley & Chandratal Lake Grand Expedition 2027",
    subtitle: "Kaza · Key Monastery · Tabo · Hikkim · Kibber · Chicham Bridge · Chandratal · Kunzum Pass",
    tagline: "The Middle Land — Ancient 1000-Yr Monasteries, Glacial Moon Lake & World's Highest Villages",
    location: "Lahaul & Spiti District, Himachal Pradesh",
    duration: "7 Days / 6 Nights",
    altitude: "15,000 ft (4,590 m) / Kunzum Pass",
    difficulty: "Moderate",
    bestMonths: "May to October (Roads open through Kunzum Pass & Atal Tunnel)",
    startingPoint: "Chandigarh / Shimla / Manali",
    endingPoint: "Manali / Chandigarh",
    priceStandard: 22500,
    pricePremium: 32500,
    bannerImage: "/images/destinations/spiti-valley.webp",
    galleryImages: [
      
    ],
    overview: "Spiti Valley, known as 'The Middle Land' between India and Tibet, is a breathtaking cold desert mountain wonderland perched in the high Himalayas of Himachal Pradesh. Surrounded by dramatic barren peaks, ancient 1000-year-old cliffside Buddhist gompas, whitewashed Himalayan villages, and the surreal turquoise waters of Chandratal (The Moon Lake), Spiti offers an unforgettable trans-Himalayan journey.",
    spiritualSignificance: "Spiti is the sacred cradle of Tibetan Buddhism in India. Tabo Monastery, founded in 996 AD, is revered as the 'Ajanta of the Himalayas' and is a favorite meditation retreat of His Holiness the Dalai Lama. Key Gompa has stood for over a millennium as a beacon of Vajrayana peace.",
    highlights: [
      "Visit 11th-century Key Gompa fortress monastery perched at 13,668 ft",
      "Camp beside the mystical crescent-shaped turquoise Chandratal Glacial Lake",
      "Send a postcard from Hikkim — the World's Highest Post Office at 14,567 ft",
      "Cross Asia's highest suspension bridge — Chicham Bridge at 13,596 ft",
      "Marvel at 1000-year-old ancient fresco murals at UNESCO heritage Tabo Gompa",
      "Drive across legendary Kunzum Pass (14,931 ft) & Atal Highway Tunnel",
      "Spot Himalayan wildlife like Blue Sheep, Ibex, and the elusive Snow Leopard"
    ],
    famousSpots: [
      {
        name: "Key Monastery (Kye Gompa)",
        hindiName: "की गोम्पा (1000 वर्ष प्राचीन बौद्ध मठ)",
        altitude: "13,668 ft (4,166 m)",
        location: "12 km north of Kaza, Spiti Valley",
        category: "Spiritual",
        image: "/images/memories/key-monasty.webp",
        significance: "The largest and most iconic monastic training center for lamas in Spiti Valley, housing rare thangka paintings and ancient weapons.",
        mythologicalLore: "Founded in the 11th century by Dromtön, a chief disciple of renowned master Atisha. It has survived Mongol and Dogra sieges across 1,000 years.",
        description: "Built in multi-tiered Pasada style resembling a fortress atop a pyramid hill, Key Gompa commands jaw-dropping panoramic views of the Spiti River basin. Inside, monks chant ancient mantras with butter lamps glowing.",
        keyHighlights: ["Iconic Hilltop Fortress Architecture", "Ancient Thangkas & Murals", "Lama Chanting Sanctuary", "High-Altitude Tea with Monks"]
      },
      {
        name: "Chandratal Lake (Lake of the Moon)",
        hindiName: "चंद्रताल झील (पवित्र चंद्र सरोवर)",
        altitude: "14,100 ft (4,300 m)",
        location: "Samudra Tapu plateau, Spiti Valley",
        category: "Glacial Lake",
        image: "/images/memories/chandratal-lake.webp",
        significance: "A high-altitude glacial lake shaped like a crescent moon, revered by shepherds and pilgrims for its divine purity.",
        mythologicalLore: "According to the Mahabharata, it is from the shores of Chandratal that Lord Indra's celestial chariot picked up eldest Pandava brother Yudhishthira to ascend to heaven.",
        description: "Surrounded by snow-capped peaks and vibrant wildflowers, Chandratal's crystal waters shift color through the day from aquamarine to emerald green and deep sapphire. Stargazing and Milky Way astrophotography here are world-class.",
        keyHighlights: ["Crescent Moon Glacial Waters", "Spectacular Milky Way Stargazing", "Mahabharata Mythological Lore", "Pristine High Himalayan Meadows"]
      },
      
      {
        name: "Chicham Bridge & Kibber Village",
        hindiName: "चिचम सस्पेंशन ब्रिज (एशिया का सबसे ऊंचा पुल)",
        altitude: "13,596 ft (4,144 m)",
        location: "Across Samba Lamba Nallah gorge, Spiti",
        category: "Scenic Viewpoint",
        image: "/images/memories/chicham-bridge.webp",
        significance: "Asia's highest suspension bridge hanging 500 feet over a terrifyingly deep canyon gorge, connecting Kibber to Chicham village.",
        mythologicalLore: "Before this engineering marvel was completed in 2017, villagers relied on a precarious manual rope pulley basket to cross the 1,000-ft deep rocky canyon.",
        description: "Walking across the thrilling suspension bridge gives a dizzying view of the sheer drop below. Kibber village is world-famous among wildlife photographers as a premier habitat of snow leopards.",
        keyHighlights: ["500-Foot Deep Canyon Vista", "Engineering Triumph of Himalayas", "Snow Leopard Habitat Base", "Kibber High-Altitude Wildlife Sanctuary"]
      },
      
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh / Shimla to Kalpa via Kinnaur Valley",
        altitude: "9,711 ft (Kalpa)",
        distance: "230 km (7.5 hrs drive)",
        stay: "Deluxe Mountain Hotel, Kalpa",
        meals: "Dinner included",
        desc: "Morning pickup from Chandigarh / Shimla. Drive along the scenic Sutlej River gorge passing Rampur Bushahr and entering the dramatic Kinnaur highway. Arrive in Kalpa in the evening. Catch your first glimpse of the sacred Kinner Kailash peak.",
        activities: ["Sutlej River Gorge Drive", "Kinnaur Gate Crossing", "Kalpa Apple Orchard Walk", "Kinner Kailash Sunset View"]
      },
      {
        day: 2,
        title: "Kalpa to Tabo via Nako Lake & Spiti Confluence",
        altitude: "10,007 ft (Tabo)",
        distance: "150 km (5.5 hrs drive)",
        stay: "Heritage Homestay / Hotel, Tabo",
        meals: "Breakfast & Dinner",
        desc: "Watch the golden sunrise rays ignite Kinner Kailash. Drive through Khab (the sacred confluence of Spiti and Sutlej rivers) to pristine high-altitude Nako Lake and monastery. Enter Spiti Valley at Sumdo and arrive in historic Tabo.",
        activities: ["Khab Sangam Viewpoint", "Nako Sacred Lake Walk", "Gue 500-Yr Old Lama Mummy Detour", "Tabo Village Evening Stroll"]
      },
      {
        day: 3,
        title: "Tabo 1000-Yr Gompa, Dhankar Monastery to Kaza",
        altitude: "12,470 ft (Kaza)",
        distance: "70 km (3.5 hrs drive)",
        stay: "Premium Spiti Hotel / Resort, Kaza",
        meals: "Breakfast & Dinner",
        desc: "Morning exploration of the 996 AD Tabo Monastery murals and cliff meditation caves. Drive to dramatic Dhankar Monastery perched cliffside over the Spiti-Pin confluence. Ascend to Kaza, the cultural capital of Spiti.",
        activities: ["Tabo Temple Fresco Tour", "Dhankar Cliffside Monastery Visit", "Dhankar Lake Optional Hike", "Kaza Local Market Walk"]
      },
      {
        day: 4,
        title: "High Village Circuit: Key Gompa, Kibber, Chicham, Hikkim & Komic",
        altitude: "14,567 ft (Hikkim)",
        distance: "85 km (Full Day Exploration)",
        stay: "Premium Spiti Hotel / Resort, Kaza",
        meals: "Breakfast & Dinner",
        desc: "Spectacular full-day excursion across Spiti's highest wonders. Visit Key Gompa, cross dizzying Chicham Bridge to Kibber, drive to Komic (the highest motorable village), and post letters from Hikkim Post Office. Admire the giant Langza Buddha Statue.",
        activities: ["Key Gompa Lama Blessing", "Chicham Bridge Walk", "Hikkim World's Highest Post Office", "Langza Golden Buddha View"]
      },
      {
        day: 5,
        title: "Kaza to Chandratal Lake via Losar & Kunzum Pass",
        altitude: "14,100 ft (Chandratal)",
        distance: "95 km (4.5 hrs mountain drive)",
        stay: "Luxury Glamping Dome / Swiss Tents, Chandratal",
        meals: "Breakfast & Camp Dinner",
        desc: "Depart Kaza through Losar valley and ascend the mighty Kunzum Pass (14,931 ft). Offer prayers at the Kunzum Mata Temple and circumambulate the stupa. Drive down to the Samudra Tapu plateau and hike to the mesmerizing turquoise shores of Chandratal Lake.",
        activities: ["Kunzum Pass (14,931 ft) Darshan", "Chandratal Holy Parikrama Walk", "Sunset Reflection on Water", "Unobstructed Astrophotography"]
      },
      {
        day: 6,
        title: "Chandratal to Manali via Batal, Gramphu & Atal Tunnel",
        altitude: "6,725 ft (Manali)",
        distance: "115 km (5 hrs drive)",
        stay: "Deluxe Resort, Manali",
        meals: "Breakfast & Dinner",
        desc: "Morning photography at Chandratal camp. Drive through the rugged Chandra River valley via Batal and Gramphu. Pass under the iconic 9.02 km Atal Tunnel to enter the lush green Kullu Valley. Relax at a luxury resort in Manali.",
        activities: ["Batal Chandra Valley Drive", "Atal Tunnel Highway Transit", "Solang Valley Photo Stop", "Old Manali Cafe Evening"]
      },
      {
        day: 7,
        title: "Manali to Chandigarh Drop",
        altitude: "1,050 ft (Chandigarh)",
        distance: "270 km (7 hrs via 4-lane expressway)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Manali",
        desc: "Enjoy a scenic drive along Beas River and Mandi tunnel expressway back to Chandigarh Airport or Railway Station with unforgettable memories of the Spiti Himalayas.",
        activities: ["Beas River Scenic Drive", "Sundernagar Lake View", "Chandigarh Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Cold Desert Thermal & High Wind Gear",
        iconName: "Shirt",
        description: "Spiti experiences rapid temperature drops (15°C day down to -2°C at night at Chandratal).",
        items: [
          { name: "Heavy Down Jacket / Windproof Parka (-5°C rated)", importance: "Mandatory", notes: "Essential for Chandratal, Kunzum Pass & Hikkim." },
          { name: "Merino Wool Thermal Inners (Top & Bottom)", importance: "Mandatory", notes: "Keep 2-3 pairs for cold desert nights." },
          { name: "UV400 Polarized Sunglasses", importance: "Mandatory", notes: "Intense high-altitude UV rays and glacier glare." },
          { name: "SPF 50+ Sunscreen & Cold Cream", importance: "Mandatory", notes: "Dry cold mountain winds dehydrate skin quickly." },
          { name: "Sturdy Hiking Boots with Ankle Support", importance: "Mandatory", notes: "For Chandratal trail and rocky monastery steps." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar Card / Passport for Indian Nationals", "Valid Passport + Visa + PAP for Foreign Nationals"],
      processingDays: "No inner line permit needed for Indian Yatris; Protected Area Permit (PAP) arranged on-spot at Kaza for foreign nationals",
      checkposts: ["Sumdo Border Checkpost", "Losar Checkpost", "Kaza Police Registration"],
      medicalRequirements: "Gradual acclimatization built into our route via Kalpa to prevent Acute Mountain Sickness (AMS). Portable oxygen cylinders in all 4x4 SUVs.",
      guidelines: [
        "Stay hydrated with warm water, garlic soup, and avoid over-exertion on Day 1-2.",
        "Respect sacred Buddhist monasteries by dressing modestly and walking clockwise around stupas."
      ]
    },
    inclusions: [
      "Dedicated 4x4 SUV (Innova Crysta / Mahindra Scorpio / 4x4 Bolero) with experienced mountain driver",
      "6 Nights accommodation in handpicked boutique hotels, Spiti homestays & luxury Chandratal Swiss tents",
      "All Breakfasts & Dinners (Hot, nutritious vegetarian meals)",
      "Dedicated high-altitude medical kit with portable Oxygen Cylinder & Oximeter",
      "All toll taxes, parking fees, fuel, driver allowances & green environmental cess",
      "Expert local Himalayan guide throughout the expedition"
    ],
    exclusions: [
      "Lunch, snacks, and personal beverages",
      "Monument and monastery entry tickets (Nominal ₹20-50 where applicable)",
      "GST 5%",
      "Personal tips or emergency evacuation costs"
    ],
    faqs: [
      {
        question: "Why is the Shimla-to-Spiti-to-Manali route the best way to travel?",
        answer: "This circuit offers gradual, gentle altitude ascent (Shimla 7,000 ft → Kalpa 9,700 ft → Tabo 10,000 ft → Kaza 12,400 ft), practically eliminating altitude sickness and allowing seamless acclimatization before reaching high passes."
      },
      {
        question: "Is Chandratal Lake open for camping?",
        answer: "Yes! High-end luxury Swiss camps operate from late May through early October on the designated camp meadows 3 km from the lake, safeguarding the pristine ecology."
      },
      {
        question: "Can senior citizens and children undertake the Spiti Valley tour?",
        answer: "Yes, travelers of all age groups with average fitness can comfortably enjoy Spiti. Our vehicles are equipped with oxygen cylinders and comfortable stops throughout."
      }
    ]
  },

  "manali-solang-lahaul": {
    slug: "manali-solang-lahaul",
    title: "Manali, Solang Valley, Rohtang & Atal Tunnel Tour",
    subtitle: "Hadimba Temple · Solang Snow Arena · Atal Tunnel · Sissu Lahaul · Rohtang Pass · Jogini Falls",
    tagline: "Queen of Hill Stations — Alpine Meadows, Snow Sports, Glacial Waterfalls & Historic Temples",
    location: "Kullu & Lahaul Valley, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    altitude: "13,058 ft (3,980 m) / Rohtang Pass",
    difficulty: "Easy",
    bestMonths: "Year-Round (Snow sports Dec-Apr, Lush alpine greenery May-Oct)",
    startingPoint: "Chandigarh / Delhi / Bhuntar Airport",
    endingPoint: "Chandigarh / Delhi / Manali",
    priceStandard: 14500,
    pricePremium: 22000,
    bannerImage: "/images/destinations/manali-solang.webp",
    galleryImages: [
      
    ],
    overview: "Nestled along the roaring Beas River in the Kullu Valley, Manali is India's most beloved Himalayan holiday destination. From ancient cedar-shaded wooden temples and natural sulphur hot springs to world-class snow sports in Solang Valley, the engineering wonder of Atal Tunnel, and the untamed landscapes of Lahaul Valley at Sissu, this circuit combines spiritual heritage with thrilling alpine beauty.",
    spiritualSignificance: "Manali derives its sacred name from Sage Manu ('Manu-Alaya' or Abode of Manu), who stepped off his ark here to repopulate the world after the Great Deluge. Hadimba Temple honors Goddess Hadimba from the Mahabharata, while Vashisht Village is blessed with hot geothermal healing springs created by Sage Lakshmana.",
    highlights: [
      "Visit 1553 AD pagoda-style Hadimba Devi Temple amid giant Deodar forest",
      "Drive through the world's longest high-altitude highway tunnel — Atal Tunnel (9.02 km)",
      "Explore Sissu waterfall, willow groves & suspension bridge in Lahaul Valley",
      "Enjoy paragliding, zorbing, skiing, and snowmobiles at Solang Adventure Valley",
      "Take a rejuvenating dip in natural sulphur geothermal pools at Vashisht Temple",
      "Hike to the scenic 150-ft Jogini Waterfalls with panoramic valley vistas",
      "Stroll the vibrant Mall Road, Tibetan Monastery, and charming Old Manali cafes"
    ],
    famousSpots: [
      {
        name: "Hadimba Devi Temple & Dhungri Forest",
        hindiName: "हिडिम्बा देवी मंदिर (1553 ई. पैगोडा शैली)",
        altitude: "6,700 ft (2,042 m)",
        location: "Dhungri Van Vihar, Manali",
        category: "Spiritual",
        image: "/images/destinations/hidimba-devi-temple.webp",
        significance: "Ancient 4-tier wooden pagoda shrine dedicated to Hadimba Devi, patron deity of Kullu royal family and wife of Pandava Bheem.",
        mythologicalLore: "Built by Maharaja Bahadur Singh in 1553 AD, the temple is constructed around a sacred rock cave where Hadimba performed severe penance.",
        description: "Encircled by towering deodar cedar trees, the temple features intricate timber carvings of mythological beasts, floral motifs, and a 24-meter wooden spire.",
        keyHighlights: ["4-Tier Wooden Pagoda Architecture", "Centuries-Old Cedar Deodar Groves", "Sacred Footprint Stone Sanctum", "Dhungri Mela Cultural Heritage"]
      },
      {
        name: "Atal Tunnel & Sissu (Lahaul Valley)",
        hindiName: "अटल टनल (9.02 किमी) एवं सिस्सू जलप्रपात",
        altitude: "10,171 ft (3,100 m)",
        location: "Pir Panjal Mountain Range, Rohtang",
        category: "Scenic Viewpoint",
        image: "/images/destinations/atal-tunnel.webp",
        significance: "World's longest highway tunnel above 10,000 ft connecting Kullu Valley to the trans-Himalayan Lahaul Valley in just 15 minutes.",
        mythologicalLore: "Exiting the tunnel into Lahaul reveals an instant shift from lush green pine mountains to dramatic snow-covered trans-Himalayan crags and weeping waterfalls.",
        description: "Sissu features a majestic high waterfall tumbling down granite cliffs into the Chandra River, framed by golden poplar trees, wooden bridges, and Lahauli monasteries.",
        keyHighlights: ["9.02 km World-Record Engineering Marvel", "Instant Dramatic Landscape Shift", "Sissu 100-Ft Glacial Waterfall", "Chandra River Suspension Footbridge"]
      },
      {
        name: "Solang Valley & Rohtang Snow Point",
        hindiName: "सोलंग वैली एवं रोहतांग दर्रा",
        altitude: "8,400 ft - 13,058 ft",
        location: "14 km northwest of Manali",
        category: "Scenic Viewpoint",
        image: "/images/destinations/spiti-valley.webp",
        significance: "The premier adventure capital of Himachal Pradesh offering world-class skiing, quad biking, paragliding, and year-round snow.",
        mythologicalLore: "Rohtang Pass (literally 'Pile of Corpses') was the historic trade pass connecting India to Central Asia across the Pir Panjal.",
        description: "Solang Valley is a vast open alpine meadow flanked by snow-capped peaks. During winter, it turns into a winter sports wonderland with ski slopes and cable cars.",
        keyHighlights: ["Tandem Paragliding & Snowmobiles", "Solang Ropeway Cable Car Ride", "360° Glacial Mountain Arena", "Year-Round Snow Activities"]
      },
      {
        name: "Vashisht Hot Springs & Temple",
        hindiName: "वशिष्ठ ऋषि मंदिर एवं प्राकृतिक गर्म जल कुंड",
        altitude: "6,900 ft (2,103 m)",
        location: "3 km from Manali town across Beas River",
        category: "Spiritual",
        image: "/images/destinations/vashisht-kund.webp",
        significance: "Ancient temple of Sage Vashisht, Guru of Lord Rama, featuring natural mineral-rich geothermal sulphur hot water baths.",
        mythologicalLore: "Legend holds that Lakshmana shot a fire arrow into the ground here to create hot medicinal springs for Sage Vashisht's morning bath.",
        description: "The temple has beautiful stone and wooden carvings with separate enclosed stone bath enclosures for men and women where hot medicinal spring water flows continuously.",
        keyHighlights: ["Natural Sulphur Medicinal Springs", "4000-Yr Vedic Temple Heritage", "Ornate Pahadi Wood Carvings", "Panoramic Beas Valley Views"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh / Delhi to Manali Scenic Drive",
        altitude: "6,725 ft (Manali)",
        distance: "270 km from Chandigarh (7 hrs) / 540 km from Delhi",
        stay: "Deluxe Himalayan Resort, Manali",
        meals: "Dinner included",
        desc: "Morning pickup in sanitized private AC vehicle. Drive along the scenic Beas River valley passing Bilaspur, Sundernagar Lake, Pandoh Dam, and Kullu. Check in at your luxury resort in Manali. Evening at leisure.",
        activities: ["Pandoh Dam Viewpoint", "Kullu Shawl Weaving Center", "Beas Riverfront Welcome", "Mall Road Evening Walk"]
      },
      {
        day: 2,
        title: "Local Heritage: Hadimba Temple, Vashisht Hot Springs & Jogini Falls",
        altitude: "6,900 ft",
        distance: "25 km local sightseeing",
        stay: "Deluxe Himalayan Resort, Manali",
        meals: "Breakfast & Dinner",
        desc: "Visit the 1553 AD wooden Hadimba Devi Temple in Dhungri cedar forest. Pay homage at Sage Manu Temple in Old Manali. Dip in the natural sulphur hot springs at Vashisht Temple and take a gentle scenic hike to Jogini Waterfall.",
        activities: ["Hadimba Temple & Van Vihar", "Manu Temple Old Manali", "Vashisht Sulphur Spring Dip", "Jogini Waterfall Forest Hike"]
      },
      {
        day: 3,
        title: "Solang Adventure Valley, Atal Tunnel & Sissu Lahaul",
        altitude: "10,171 ft (Sissu)",
        distance: "75 km roundtrip",
        stay: "Deluxe Himalayan Resort, Manali",
        meals: "Breakfast & Dinner",
        desc: "Head to Solang Valley for thrilling paragliding, cable car rides, and snow activities. Drive through the famous 9.02 km Atal Tunnel to enter Lahaul Valley. Explore the majestic Sissu waterfall, suspension bridge, and enjoy Tibetan Thukpa.",
        activities: ["Solang Valley Adventure Arena", "Atal Tunnel Highway Transit", "Sissu Glacial Waterfall Exploration", "Chandra River Photo Walk"]
      },
      {
        day: 4,
        title: "Naggar Castle Heritage, Roerich Art Gallery & Jana Waterfall",
        altitude: "6,800 ft (Naggar)",
        distance: "45 km roundtrip",
        stay: "Deluxe Himalayan Resort, Manali",
        meals: "Breakfast & Dinner",
        desc: "Drive to the historic medieval Naggar Castle built in 1460 AD with timber-bonded earthquake-proof architecture. Visit the Nicholas Roerich Russian Art Gallery, Tripura Sundari Temple, and savor authentic Himachali Siddu at Jana Waterfall.",
        activities: ["Naggar Castle Medieval Tour", "Roerich Himalayan Paintings", "Tripura Sundari Wooden Temple", "Authentic Himachali Food Experience"]
      },
      {
        day: 5,
        title: "Manali to Chandigarh / Delhi Departure",
        altitude: "1,050 ft (Chandigarh)",
        distance: "270 km (7 hrs)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Resort",
        desc: "After a leisurely breakfast, drive back along the new 4-lane expressway with a drop at Chandigarh Airport or Railway Station.",
        activities: ["River Rafting Stop at Kullu", "Souvenir Shopping", "Chandigarh Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "All-Season Alpine Leisure & Snow Gear",
        iconName: "Shirt",
        description: "Manali is pleasant in summer (15°C to 28°C) and cold in winter/spring (0°C to 12°C).",
        items: [
          { name: "Warm Woolen Jacket / Windcheater", importance: "Mandatory", notes: "For Atal Tunnel, Sissu, and Solang Valley." },
          { name: "Comfortable Walking Shoes with Grip", importance: "Mandatory", notes: "For Jogini waterfall trail and temple walks." },
          { name: "Sunglasses & Sunscreen SPF 40+", importance: "Recommended", notes: "For bright alpine UV reflection." },
          { name: "Swimwear / Towel", importance: "Optional", notes: "For Vashisht sulphur hot spring bath." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Valid Government Photo ID Card (Aadhaar / Voter ID / Passport)"],
      processingDays: "No permits required for Manali, Solang, or Atal Tunnel / Sissu",
      checkposts: ["Green Tax Barrier Manali", "Atal Tunnel North & South Portals"],
      medicalRequirements: "Suitable for all age groups from toddlers to senior citizens.",
      guidelines: [
        "Rohtang Pass excursion requires NGT online permits which our team arranges seamlessly in advance.",
        "Eco-friendly guidelines: Do not litter plastic bottles in Lahaul or Solang valleys."
      ]
    },
    inclusions: [
      "Private AC vehicle (Innova / Swift Dzire / Tempo Traveler) with expert mountain driver",
      "4 Nights accommodation in 4-star mountain view resorts with private balcony",
      "Daily Breakfast & Dinner with live buffet spread",
      "Complete sightseeing to Hadimba, Solang Valley, Atal Tunnel, Sissu & Naggar Castle",
      "All driver allowances, fuel, toll taxes, and parking fees"
    ],
    exclusions: [
      "Adventure activities (Paragliding, skiing, zorbing, ATV quad bikes)",
      "Rohtang Pass NGT vehicle permit fee (if opted)",
      "GST 5%",
      "Personal tips and shopping expenses"
    ],
    faqs: [
      {
        question: "Is Atal Tunnel open throughout the year?",
        answer: "Yes! Atal Tunnel remains open 365 days a year (except during extraordinary blizzard maintenance), making Lahaul and Sissu accessible even in mid-winter."
      },
      {
        question: "Can we find snow in Manali during summer months (May & June)?",
        answer: "Yes, snow is easily found at Rohtang Pass (13,058 ft) and higher reaches of Sissu and Baralacha Pass throughout May and June."
      },
      {
        question: "Is this package suitable for families with elderly parents?",
        answer: "Extremely suitable! All attractions feature direct vehicular access, smooth roads, and our resorts offer ground-floor deluxe rooms with central heating."
      }
    ]
  },

  "shimla-kufri-chail": {
    slug: "shimla-kufri-chail",
    title: "Shimla, Kufri, Narkanda & Chail Royal Tour",
    subtitle: "The Ridge · Mall Road · Jakhoo 108ft Hanuman Temple · Kufri Nature Park · Hatu Peak · Chail Palace",
    tagline: "Summer Capital of the Raj — Colonial Elegance, Pine-Clad Ridges & Royal Himalayan Heritage",
    location: "Shimla District, Himachal Pradesh",
    duration: "4 Days / 3 Nights",
    altitude: "9,000 ft (Kufri) / 11,152 ft (Hatu Peak)",
    difficulty: "Easy",
    bestMonths: "Year-Round (Snow in Dec-Feb, Pleasant Summer in Mar-Jun)",
    startingPoint: "Chandigarh / Kalka Railway Station / Delhi",
    endingPoint: "Chandigarh / Kalka / Delhi",
    priceStandard: 12500,
    pricePremium: 18500,
    bannerImage: "/images/destinations/shimla-kufri-chail.webp",
    galleryImages: [
      
    ],
    overview: "Perched along a crescent-shaped mountain ridge at 7,200 ft, Shimla was the glorious Summer Capital of British India. Surrounded by dense rhododendron and oak forests, this royal tour encompasses the iconic Ridge and Christ Church, the 108-foot Hanuman idol on Jakhoo Hill, the snow trails of Kufri, the ancient Apple kingdom of Narkanda with Hatu Peak, and the maharaja palaces of Chail.",
    spiritualSignificance: "Jakhoo Hill is the highest point in Shimla where Lord Hanuman is believed to have rested while flying to the Himalayas to fetch the Sanjeevani herb for Lakshmana. The 108-ft vermilion statue of Hanuman stands as a protective beacon. Narkanda's Hatu Mata Temple on the 11,152 ft summit honors Goddess Kali.",
    highlights: [
      "Walk the iconic Ridge, Scandal Point & Neo-Gothic Christ Church (1857)",
      "Ascend Jakhoo Ropeway to the giant 108-ft Lord Hanuman Temple on Shimla's highest peak",
      "Experience snow activities, yak rides, and Himalayan Nature Park at Kufri",
      "Tour the Viceregal Lodge (Indian Institute of Advanced Study) and botanical lawns",
      "Visit the Maharaja of Patiala's Chail Palace & World's Highest Cricket Ground",
      "Drive to Narkanda for panoramic snow views from Hatu Peak (11,152 ft)",
      "Shop handcrafted wooden souvenirs at historic Lakkar Bazaar and Mall Road"
    ],
    famousSpots: [
      {
        name: "The Ridge & Christ Church",
        hindiName: "द रिज एवं क्राइस्ट चर्च शिमला",
        altitude: "7,238 ft (2,206 m)",
        location: "Center of Shimla Town",
        category: "Scenic Viewpoint",
        image: "/images/memories/christ-church.webp",
        significance: "The cultural and social epicenter of Shimla offering unobstructed views of the snow-capped Pir Panjal ranges.",
        mythologicalLore: "Christ Church, built in 1857 in Elizabethan Neo-Gothic style, features five stained-glass windows representing Faith, Hope, Charity, Fortitude, and Patience.",
        description: "A sprawling pedestrian-only open esplanade where visitors enjoy horse rides, vibrant sunsets, and views of British colonial architecture.",
        keyHighlights: ["1857 Stained Glass Neo-Gothic Church", "Tudor-Style Town Hall & Gaiety Theatre", "Scandal Point Sunset Panorama", "Zero-Traffic Pedestrian Promenade"]
      },
      {
        name: "Jakhoo Temple & 108ft Lord Hanuman Statue",
        hindiName: "जाखू मंदिर (108 फीट विशाल हनुमान प्रतिमा)",
        altitude: "8,054 ft (2,455 m)",
        location: "Highest point in Shimla, Jakhoo Hill",
        category: "Spiritual",
        image: "/images/memories/jakhoo-temple.webp",
        significance: "Ancient temple honoring Lord Hanuman with a monumental 108-foot idol visible from across all hills of Shimla.",
        mythologicalLore: "According to the Ramayana, Hanuman rested on this hill and met Sage Yaaku before proceeding to the Dronagiri mountain for Sanjeevani.",
        description: "Accessible via a scenic 6-minute ropeway cable car from the Ridge, the temple is surrounded by dense pine groves and friendly mountain macaques.",
        keyHighlights: ["108-Foot Sky-High Hanuman Idol", "Shimla Highest Peak (8,054 ft)", "Jakhoo Aerial Ropeway Ride", "Holy Footprint Shrine of Hanuman"]
      },
      {
        name: "Kufri Snow World & Himalayan Nature Park",
        hindiName: "कुफरी एवं हिमालयन नेचर पार्क",
        altitude: "9,000 ft (2,743 m)",
        location: "16 km east of Shimla",
        category: "Scenic Viewpoint",
        image: "/images/memories/kufri-snow-world.webp",
        significance: "Renowned high-altitude snow playground and nature park home to rare Himalayan Monal, Snow Leopards, and Musk Deer.",
        mythologicalLore: "Derived from the local word 'Kufr' meaning lake, Kufri transforms into a winter skiing haven during snowfall months.",
        description: "Visitors enjoy horse rides up to Mahasu Peak, thrilling go-karting tracks at Kufri Fun World, and panoramic views of the Badrinath and Kedarnath ranges.",
        keyHighlights: ["Mahasu Peak Horse Trek", "Himalayan Monal & Musk Deer Zoo", "Kufri Fun World Adventure Rides", "Winter Skiing Slopes"]
      },
      {
        name: "Chail Palace & Highest Cricket Ground",
        hindiName: "चैल पैलेस एवं विश्व का सर्वोच्च क्रिकेट मैदान",
        altitude: "7,500 ft (2,286 m)",
        location: "Chail, Solan District",
        category: "Heritage Village",
        image: "/images/memories/highest-cricket-ground.webp",
        significance: "Royal summer capital of Maharaja Bhupinder Singh of Patiala featuring the world's highest cricket pitch at 7,500 ft.",
        mythologicalLore: "Built in 1891 after the Maharaja was banned from entering Shimla, he vowed to build a summer retreat higher and grander than British Shimla.",
        description: "Set amidst sprawling cedar forests, Chail Palace features ornate royal suites, antique chandeliers, king-size lawns, and tranquil Deodar trails.",
        keyHighlights: ["World's Highest Cricket Pitch (7,500 ft)", "1891 Maharaja of Patiala Palace", "Kalka-Shimla Toy Train Viewpoint", "Pristine Pine Forest Retreat"]
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh / Kalka to Shimla Arrival & Heritage Walk",
        altitude: "7,200 ft (Shimla)",
        distance: "115 km (3.5 hrs via Himalayan Expressway)",
        stay: "Heritage Resort / Hotel, Shimla",
        meals: "Dinner included",
        desc: "Morning pickup from Chandigarh Airport / Kalka Railway Station. Ascend through the scenic Shivalik mountain ranges. Check in at hotel. Evening walking tour of Mall Road, The Ridge, Gaiety Theatre, and Lakkar Bazaar.",
        activities: ["Himalayan Expressway Drive", "The Ridge & Christ Church", "Mall Road Evening Stroll", "Scandal Point Sunset"]
      },
      {
        day: 2,
        title: "Jakhoo Ropeway, Kufri Snow Park & Indian Institute of Advanced Study",
        altitude: "9,000 ft (Kufri)",
        distance: "40 km local exploration",
        stay: "Heritage Resort / Hotel, Shimla",
        meals: "Breakfast & Dinner",
        desc: "Ride the aerial ropeway to Jakhoo Temple and receive blessings at the 108-ft Hanuman statue. Drive to Kufri for horse rides to Mahasu Peak and Himalayan wildlife spotting. Return to explore the grand Viceregal Lodge (IIAS).",
        activities: ["Jakhoo Aerial Ropeway", "108ft Hanuman Temple Darshan", "Kufri Mahasu Peak Activity", "Viceregal Lodge Colonial Tour"]
      },
      {
        day: 3,
        title: "Excursion to Narkanda & Hatu Peak / Chail Royal Palace",
        altitude: "11,152 ft (Hatu Peak)",
        distance: "65 km one-way",
        stay: "Heritage Resort / Hotel, Shimla",
        meals: "Breakfast & Dinner",
        desc: "Drive through fragrant apple orchards to Narkanda. Ascend through oak forests to Hatu Peak (11,152 ft) for a 360-degree snow peak panorama and Hatu Mata Temple. In the afternoon, visit Chail Palace and the world's highest cricket ground.",
        activities: ["Narkanda Apple Valley Drive", "Hatu Peak (11,152 ft) Summit View", "Hatu Mata Mandir Darshan", "Chail Royal Palace Walk"]
      },
      {
        day: 4,
        title: "Shimla to Chandigarh / Kalka Departure",
        altitude: "1,050 ft (Chandigarh)",
        distance: "115 km (3.5 hrs)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Hotel",
        desc: "After breakfast, enjoy a brief stop at Sankat Mochan Temple and Pinjore Mughal Gardens en route to Chandigarh Airport or Railway Station.",
        activities: ["Sankat Mochan Temple Stop", "Timber Trail Cable Car View", "Chandigarh Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Hill Station Comfort & Smart Casuals",
        iconName: "Shirt",
        description: "Shimla weather is pleasantly cool in summer (15°C to 24°C) and crisp in winter (2°C to 10°C).",
        items: [
          { name: "Light Sweater / Cardigan for Summer, Heavy Woolen Coat for Winter", importance: "Mandatory", notes: "Evenings are always breezy on the Ridge." },
          { name: "Comfortable Walking Shoes", importance: "Mandatory", notes: "The Mall Road and Ridge are pedestrian-only zones." },
          { name: "Umbrella / Windcheater", importance: "Recommended", notes: "For passing mountain showers." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Photo ID Card"],
      processingDays: "No permits needed — completely open year-round",
      checkposts: ["None (Smooth national highway)"],
      medicalRequirements: "Zero altitude stress — perfect for elderly yatris and family vacations.",
      guidelines: [
        "Shimla Mall Road is completely vehicle-free; luggage is smoothly assisted by hotel porters.",
        "Kalka-Shimla UNESCO Toy Train bookings can be integrated upon request."
      ]
    },
    inclusions: [
      "Private sanitized AC sedan / SUV (Dzire / Innova) for the entire duration",
      "3 Nights stay in 4-star mountain view hotels / colonial heritage resorts",
      "Daily Breakfast & Dinner",
      "All toll taxes, parking, driver charges, and green cess",
      "Complete sightseeing to Ridge, Kufri, Jakhoo, and Chail / Narkanda"
    ],
    exclusions: [
      "Kufri horse riding or adventure park tickets",
      "Jakhoo ropeway cable car ticket (approx. ₹500 roundtrip)",
      "GST 5%",
      "Personal shopping and beverages"
    ],
    faqs: [
      {
        question: "When is the best time to see snowfall in Shimla and Kufri?",
        answer: "Snowfall typically occurs between late December and mid-February, transforming Kufri and Narkanda into a dazzling white winter wonderland."
      },
      {
        question: "Can we experience the famous Kalka-Shimla Toy Train?",
        answer: "Yes! We can arrange your pickup or drop directly connected to the UNESCO World Heritage Kalka-Shimla Himalayan Toy Train ride."
      }
    ]
  },

  "dharamshala-mcleodganj-triund": {
    slug: "dharamshala-mcleodganj-triund",
    title: "Dharamshala, McLeodGanj & Triund Top Tour",
    subtitle: "Dalai Lama Temple · Triund Ridge (9,350 ft) · Bhagsu Waterfall · HPCA Cricket Stadium · Kangra Fort",
    tagline: "Little Lhasa — Tibetan Spiritual Wisdom & Majestic Dhauladhar Snow Mountains",
    location: "Kangra District, Himachal Pradesh",
    duration: "4 Days / 3 Nights",
    altitude: "9,350 ft (Triund Peak)",
    difficulty: "Moderate",
    bestMonths: "March to June & September to December",
    startingPoint: "Gaggal Airport / Pathankot / Chandigarh",
    endingPoint: "Gaggal / Pathankot / Chandigarh",
    priceStandard: 13500,
    pricePremium: 19500,
    bannerImage: "/images/destinations/triund-trek-mcleodganjh.webp",
    galleryImages: [
      
    ],
    overview: "Set against the dramatic backdrop of the towering Dhauladhar snow wall, Dharamshala and McLeodGanj are the spiritual home of Tibetan Buddhism in India and the residence of His Holiness the 14th Dalai Lama. This tour blends monastic serenity with the exciting Triund ridge trek, historic deodar churches, tea gardens, and the world's most scenic international cricket stadium.",
    spiritualSignificance: "The Tsuglagkhang Complex houses the main Tibetan temple, Namgyal Monastery, and Kalachakra Temple where thousands come to meditate. Ancient Hindu shrines like Bhagsu Nag (dedicated to Lord Shiva and the Snake God) and the 51 Shaktipeeths of Kangra (Brajeshwari Devi, Chamunda Devi, and Jwala Ji) make this a potent divine circuit.",
    highlights: [
      "Receive peaceful vibrations at the Tsuglagkhang Complex (Dalai Lama Main Temple)",
      "Trek to Triund Top (9,350 ft) for a breathtaking close-up view of the Dhauladhar snowline",
      "Visit Bhagsu Nag Temple & swim at the crystal cold Bhagsu Waterfall",
      "Tour the serene St. John in the Wilderness Church (1852) amid ancient Deodars",
      "Admire the world-renowned HPCA International Cricket Stadium at the foot of snow mountains",
      "Experience Tibetan silk thangka painting and woodcraft at Norbulingka Institute",
      "Explore 1000-year-old Kangra Fort and sacred Brajeshwari Devi Shaktipeeth"
    ],
    famousSpots: [
     
      {
        name: "Triund Top Ridge (9,350 ft)",
        hindiName: "त्रियुंड टॉप (9,350 फीट धौलाधार शिखर)",
        altitude: "9,350 ft (2,850 m)",
        location: "Dhauladhar Mountain Range above McLeodGanj",
        category: "Scenic Viewpoint",
        image: "/images/destinations/triund-trek-mcleodganjh.webp",
        significance: "The jewel of Dharamshala — a tranquil alpine ridge offering an astonishing amphitheater view of the Dhauladhar peaks on one side and Kangra Valley on the other.",
        mythologicalLore: "The ridge trail passes through forests of oak, deodar, and scarlet rhododendron where Himalayan hermits have meditated for centuries.",
        description: "A popular 9 km scenic day-trek from Gallu Devi Temple, Triund rewards trekkers with breathtaking golden sunsets, camping under stars, and panoramic vistas.",
        keyHighlights: ["Close-Up Dhauladhar Snow Wall Panorama", "Magnificent Kangra Valley Sunset", "Oak & Rhododendron Forest Trail", "Night Sky Stargazing Camp"]
      },
      {
        name: "HPCA International Cricket Stadium",
        hindiName: "एचपीसीए क्रिकेट स्टेडियम धर्मशाला",
        altitude: "4,780 ft (1,457 m)",
        location: "Lower Dharamshala",
        category: "Scenic Viewpoint",
        image: "/images/memories/highest-cricket-ground.webp",
        significance: "Acclaimed as the most visually stunning cricket ground on Earth, with Tibet-style pavilion roofs set directly against snow peaks.",
        mythologicalLore: "Built in 2003, its open pavilion design allows natural mountain breezes and offers spectators an uninterrupted view of the 16,000-ft Dhauladhar wall.",
        description: "A must-visit modern landmark where visitors take commemorative photographs against the lush green pitch and towering snow background.",
        keyHighlights: ["World's Most Beautiful Cricket Stadium", "Tibetan Architectural Pavilion", "Towering Snow Peak Backdrop", "Lush Manicured Outfield"]
      },
      
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dharamshala / McLeodGanj & Local Monastic Walk",
        altitude: "6,831 ft (McLeodGanj)",
        distance: "Pickup from Gaggal Airport (15 km) / Pathankot (85 km)",
        stay: "Boutique Mountain Resort, McLeodGanj",
        meals: "Dinner included",
        desc: "Pickup and scenic ascent into the pine-covered hills of Upper Dharamshala. Check in at hotel. Visit the Tsuglagkhang Dalai Lama Temple, spin prayer wheels along the Kora path, and explore the Tibetan handicraft markets.",
        activities: ["Tsuglagkhang Temple Darshan", "Tibetan Kora Meditation Walk", "Prayer Wheels Spinning", "McLeodGanj Handicrafts Market"]
      },
      {
        day: 2,
        title: "Bhagsu Waterfall, St. John Church & Triund Ridge Excursion",
        altitude: "9,350 ft (Triund Peak)",
        distance: "9 km scenic trail",
        stay: "Boutique Mountain Resort / Alpine Tents",
        meals: "Breakfast & Dinner",
        desc: "Morning visit to ancient Bhagsu Nag Temple and waterfall. Proceed to Gallu Devi for the celebrated Triund trek (or relaxed vehicle tour to Naddi Sunset Point and Dal Lake for non-trekkers). Enjoy sunset over Kangra Valley.",
        activities: ["Bhagsu Nag Shiva Temple", "Bhagsu Waterfall Walk", "Triund Alpine Ridge Trek", "Naddi Sunset Viewpoint"]
      },
      {
        day: 3,
        title: "HPCA Stadium, Norbulingka Institute, Tea Gardens & Kangra Fort",
        altitude: "4,780 ft",
        distance: "45 km exploration",
        stay: "Boutique Mountain Resort, McLeodGanj",
        meals: "Breakfast & Dinner",
        desc: "Descend to Lower Dharamshala to tour the world-famous HPCA Cricket Stadium. Walk through lush Kangra Tea Gardens. Experience Japanese gardens and Tibetan master workshops at Norbulingka Institute. Visit the historic 1000-yr Kangra Fort.",
        activities: ["HPCA Cricket Stadium Tour", "Dharamshala Tea Estate Walk", "Norbulingka Arts Institute", "Kangra Fort Heritage Tour"]
      },
      {
        day: 4,
        title: "Dharamshala Departure / Pathankot / Gaggal Drop",
        altitude: "800 ft (Pathankot)",
        distance: "85 km (2.5 hrs)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Resort",
        desc: "Enjoy a relaxed breakfast with mountain views. Drop at Gaggal Airport (DHM) or Pathankot Railway Station for your onward journey.",
        activities: ["St. John in the Wilderness Church Stop", "Souvenir Tibetan Tea Shopping", "Airport / Railway Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Mountain Walking & Monastic Attire",
        iconName: "Shirt",
        description: "Pleasant mountain days (18°C to 28°C) and cool evenings (10°C to 16°C).",
        items: [
          { name: "Comfortable Trekking Shoes with Good Traction", importance: "Mandatory", notes: "For Triund trail and waterfall paths." },
          { name: "Light Fleece Jacket / Windbreaker", importance: "Mandatory", notes: "For Triund top and evening ridge breezes." },
          { name: "Modest Clothing (Covered Shoulders & Knees)", importance: "Mandatory", notes: "For monastery and temple entries." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Photo ID (Aadhaar / Voter ID / Passport)"],
      processingDays: "No permits needed for Indian or Foreign tourists",
      checkposts: ["Gallu Devi Forest Checkpoint (Triund registration)"],
      medicalRequirements: "Triund trek is easy-to-moderate; mule and pony support available on-site.",
      guidelines: [
        "Please maintain silence and decorum inside the Dalai Lama temple sanctum.",
        "Plastics are banned on the Triund ridge trail."
      ]
    },
    inclusions: [
      "Private AC vehicle (Innova / Ertiga / Dzire) with professional mountain driver",
      "3 Nights stay in handpicked 4-star mountain view resorts",
      "Daily Breakfast & Dinner",
      "Certified local trek guide for Triund excursion",
      "All driver allowances, fuel, toll taxes, and parking fees"
    ],
    exclusions: [
      "HPCA stadium entry ticket (approx. ₹30)",
      "Kangra Fort audio guide ticket",
      "GST 5%",
      "Personal paragliding or shopping expenses"
    ],
    faqs: [
      {
        question: "Can we see His Holiness the Dalai Lama in person?",
        answer: "His Holiness grants public teachings and audiences during scheduled visits. Our team coordinates your dates with the official office calendar of His Holiness."
      },
      {
        question: "How difficult is the Triund trek?",
        answer: "Triund is considered a beginner-friendly trek with well-defined trails taking approximately 3.5 to 4 hours to reach the summit ridge."
      }
    ]
  },

  "kasol-manikaran-jibhi": {
    slug: "kasol-manikaran-jibhi",
    title: "Kasol, Manikaran Sahib, Kheerganga & Jibhi Tirthan Tour",
    subtitle: "Parvati River Trail · Manikaran Hot Springs Gurudwara · Tosh · Jalori Pass · Serolsar Lake · Jibhi",
    tagline: "Mystic Himalayan Valleys — Healing Geothermal Waters, Pine Treehouses & Untouched High Glades",
    location: "Kullu & Mandi Districts, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    altitude: "10,800 ft (Jalori Pass & Serolsar Lake)",
    difficulty: "Moderate",
    bestMonths: "March to June & September to November",
    startingPoint: "Chandigarh / Bhuntar / Delhi",
    endingPoint: "Chandigarh / Delhi",
    priceStandard: 15500,
    pricePremium: 23500,
    bannerImage: "/images/destinations/kasol.webp",
    galleryImages: [
      
    ],
    overview: "This enchanting expedition takes you through two of Himachal's most magical river valleys — the vibrant Parvati Valley and the tranquil, untouched Tirthan/Banjar Valley. Discover the legendary hot springs and Gurudwara at Manikaran Sahib, riverside pine cafes of Kasol, traditional apple villages of Tosh, and cross the scenic 10,800 ft Jalori Pass to the mystical Serolsar Lake and cedar treehouses of Jibhi.",
    spiritualSignificance: "Manikaran Sahib is blessed by both Guru Nanak Dev Ji and Lord Shiva. According to legend, Goddess Parvati lost her jewel (Mani) in the waters, and Lord Shiva's wrath produced bubbling geothermal springs across the riverbank. Serolsar Lake is the sacred abode of Budhi Nagin (Goddess of Snakes), where birds are said to instantly clean any fallen leaf from the holy water.",
    highlights: [
      "Dip in natural boiling sulphur healing pools at historic Gurudwara Manikaran Sahib",
      "Walk the emerald Parvati River pine trail between Kasol and Chalal",
      "Explore cliffside traditional wooden houses and apple orchards in Tosh Village",
      "Drive across the dramatic Jalori Pass (10,800 ft) connecting Kullu and Shimla",
      "Trek through ancient oak forests to the sacred crystal waters of Serolsar Lake",
      "Stay in handcrafted wooden pine cottages and treehouses in peaceful Jibhi",
      "Marvel at the 1500-year-old multi-tier timber and stone tower of Chehni Kothi"
    ],
    famousSpots: [
      {
        name: "Manikaran Sahib Gurudwara & Hot Springs",
        hindiName: "मणिकरण साहिब गुरुद्वारा एवं गर्म कुंड",
        altitude: "5,774 ft (1,760 m)",
        location: "Parvati River Gorge, Manikaran",
        category: "Spiritual",
        image: "/images/memories/manikaran-sahib.webp",
        significance: "Sacred pilgrimage site where natural geothermal spring water boils at 94°C, cooking langar rice and dal in cloth bundles.",
        mythologicalLore: "Guru Nanak Dev Ji visited here with Bhai Mardana in 1574. Lord Shiva and Goddess Parvati also resided here for 1,100 years.",
        description: "Surrounded by steep mountain cliffs, the gurudwara offers holy Langar 24/7, separate enclosed hot thermal bathing tanks with proven medicinal benefits for arthritis and joint ailments.",
        keyHighlights: ["24/7 Sacred Guru Ka Langar", "Natural Boiling Sulphur Healing Waters", "Ancient Shiva & Rama Mandir Complex", "Roaring Parvati River Suspension Bridges"]
      },
      {
        name: "Jalori Pass & Serolsar Sacred Lake",
        hindiName: "जलोड़ी दर्रा (10,800 फीट) एवं सेरोलसर झील",
        altitude: "10,800 ft (3,292 m)",
        location: "Kullu-Mandi Ridge, Banjar Valley",
        category: "Glacial Lake",
        image: "/images/memories/jalori-pass.webp",
        significance: "A pristine high-altitude mountain lake surrounded by dense Kharshu oak forests and dedicated to Budhi Nagin Mata.",
        mythologicalLore: "Local villagers hold that the sacred bird 'Aabi' keeps the holy lake spotless by removing any twig or leaf that touches the water surface.",
        description: "The 5 km gentle walk from Jalori Pass through moss-draped forest glades opens up into the mirror-like Serolsar Lake, with the stone temple of Budhi Nagin on its bank.",
        keyHighlights: ["360° Great Himalayan Snow Panorama", "5 km Ancient Oak Forest Walk", "Budhi Nagin Mata Temple Sanctum", "Pure Mirror Glacial Water Reflections"]
      },
      
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Kasol Parvati Valley Arrival",
        altitude: "5,180 ft (Kasol)",
        distance: "260 km (6.5 hrs drive)",
        stay: "Riverside Boutique Camp / Resort, Kasol",
        meals: "Dinner included",
        desc: "Morning pickup from Chandigarh. Scenic drive past Mandi and along the roaring turquoise Parvati River. Check in at your riverside resort in Kasol. Evening walk along the pine trails of Chalal village.",
        activities: ["Parvati Riverfront Welcome", "Chalal Suspension Bridge Walk", "Kasol Pine Cafe Exploration", "Bonfire Evening"]
      },
      {
        day: 2,
        title: "Manikaran Sahib Thermal Springs & Tosh Village Trek",
        altitude: "7,874 ft (Tosh)",
        distance: "40 km exploration",
        stay: "Riverside Boutique Camp / Resort, Kasol",
        meals: "Breakfast & Dinner",
        desc: "Visit the holy Gurudwara Manikaran Sahib, bathe in the healing geothermal sulphur springs, and partake in Langar. Drive up to the last motorable point of Tosh Village for a scenic walk through traditional wooden homes and waterfalls.",
        activities: ["Manikaran Hot Spring Holy Dip", "Guru Ka Langar Seva", "Tosh Village Apple Orchard Hike", "Parvati Valley Sunset"]
      },
      {
        day: 3,
        title: "Kasol to Jibhi via Aut Tunnel & Banjar Valley",
        altitude: "5,250 ft (Jibhi)",
        distance: "75 km (3 hrs scenic drive)",
        stay: "Handcrafted Cedar Treehouse / Resort, Jibhi",
        meals: "Breakfast & Dinner",
        desc: "Drive through the Aut tunnel into the pristine Banjar Valley. Check in at your cozy wooden cottage in Jibhi. Take a gentle nature walk across wooden bridges to the hidden Jibhi Waterfall and relax by the babbling trout stream.",
        activities: ["Banjar Valley Scenic Transit", "Jibhi Waterfall Nature Trail", "Wooden Bridge Forest Walk", "Traditional Himachali Dinner"]
      },
      {
        day: 4,
        title: "Jalori Pass (10,800 ft), Serolsar Lake & Chehni Kothi",
        altitude: "10,800 ft (Jalori Pass)",
        distance: "30 km roundtrip",
        stay: "Handcrafted Cedar Treehouse / Resort, Jibhi",
        meals: "Breakfast & Dinner",
        desc: "Ascend to Jalori Pass for breathtaking 360-degree views of Himalayan snow peaks. Embark on the 5 km oak forest walk to sacred Serolsar Lake and Budhi Nagin Temple. In the afternoon, hike to the 1500-year-old multi-tier timber fort of Chehni Kothi.",
        activities: ["Jalori Pass 360° Summit View", "Serolsar Sacred Lake Forest Walk", "Budhi Nagin Mata Temple", "Chehni Kothi Ancient Tower Hike"]
      },
      {
        day: 5,
        title: "Jibhi to Chandigarh / Delhi Departure",
        altitude: "1,050 ft (Chandigarh)",
        distance: "250 km (6.5 hrs)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Resort",
        desc: "Enjoy your morning coffee by the pine trees. Scenic drive back along the Beas River expressway with a drop at Chandigarh Airport or Railway Station.",
        activities: ["Tirthan Riverfront Chai", "Kullu Craft Market Stop", "Chandigarh Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Valley Leisure & Trekking Wear",
        iconName: "Shirt",
        description: "Day temperatures are pleasant (16°C to 26°C), while Jalori Pass and evenings are cool (8°C to 14°C).",
        items: [
          { name: "Light Fleece / Softshell Jacket", importance: "Mandatory", notes: "For Jalori Pass (10,800 ft) and evening riverside breeze." },
          { name: "Good Grip Trekking / Walking Shoes", importance: "Mandatory", notes: "For Serolsar Lake trail and Chehni Kothi stone steps." },
          { name: "Headscarf / Bandana", importance: "Mandatory", notes: "Required to cover head inside Gurudwara Manikaran Sahib." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Photo ID Card"],
      processingDays: "No permits needed — open year-round",
      checkposts: ["None"],
      medicalRequirements: "Serolsar Lake trail is flat and gentle; suitable for all age groups.",
      guidelines: [
        "Please maintain sacred respect at Gurudwara Manikaran and Serolsar Lake.",
        "Dress modestly in traditional village areas."
      ]
    },
    inclusions: [
      "Private AC vehicle (Innova / Ertiga / Dzire) with expert mountain driver",
      "4 Nights accommodation (2 Nights Kasol riverside + 2 Nights Jibhi cedar cottage)",
      "Daily Breakfast & Dinner",
      "Complete sightseeing to Manikaran, Tosh, Jibhi Waterfall, Jalori Pass & Serolsar Lake",
      "All driver allowances, fuel, toll taxes, and parking fees"
    ],
    exclusions: [
      "Personal café bills in Kasol/Tosh",
      "GST 5%",
      "Personal laundry and tips"
    ],
    faqs: [
      {
        question: "Can we take a bath in the hot springs at Manikaran Sahib?",
        answer: "Yes! Gurudwara Manikaran Sahib maintains clean, large separate indoor geothermal bathing tanks for men and women with natural mineral water that rejuvenates body and mind."
      },
      {
        question: "Is Jibhi suitable for a quiet, non-commercial holiday?",
        answer: "Jibhi is the quintessential untouched Himalayan retreat with lush pine treehouses, babbling streams, and zero commercial noise."
      }
    ]
  },

  "kinnaur-kalpa-sangla": {
    slug: "kinnaur-kalpa-sangla",
    title: "Kinnaur Valley, Kalpa, Sangla & Chitkul Yatra",
    subtitle: "Kinner Kailash 79ft Shivalinga Darshan · India's Last Village Chitkul · Kamru Fort · Baspa River",
    tagline: "Land of Gods — Sacred Kinner Kailash Peaks, Golden Apple Orchards & Frontier Hamlet",
    location: "Kinnaur District, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    altitude: "11,320 ft (Chitkul) / 9,711 ft (Kalpa)",
    difficulty: "Moderate",
    bestMonths: "April to October (Spring Blossoms & Autumn Apple Harvest)",
    startingPoint: "Chandigarh / Shimla",
    endingPoint: "Chandigarh / Shimla",
    priceStandard: 21000,
    pricePremium: 29500,
    bannerImage: "/images/memories/kinnaur.webp",
    galleryImages: [
      
    ],
    overview: "Kinnaur, known in Hindu scriptures as the mystical 'Land of the Kinnaras' (celestial musicians), is a breathtaking Himalayan territory bordering Tibet. Home to the sacred Kinner Kailash peak (21,320 ft) where a 79-foot natural rock Shivalinga naturally changes colors throughout the day, this journey explores the fairy-tale Sangla Valley, the historic 15th-century Kamru Fort, the golden apple orchards of Kalpa, and Chitkul — India's last inhabited village before Tibet.",
    spiritualSignificance: "Kinner Kailash is one of the five cosmic Kailashes in Sanatan Dharma and the sacred winter abode of Lord Shiva and Goddess Parvati. The 79-ft monolithic Shivalinga at its summit changes hues from golden-yellow at sunrise to emerald-copper at noon and deep violet at dusk. The confluence of Hinduism and Vajrayana Buddhism is visible in every ancient wooden temple.",
    highlights: [
      "Witness the golden sunrise lighting up the sacred 79-foot Kinner Kailash Shivalinga from Kalpa",
      "Visit Chitkul (11,320 ft) — the last inhabited village on the Indo-Tibet frontier & Baspa riverbanks",
      "Explore 15th-century multi-storey Kamru Fort and the ancient Badrinath Sanctum",
      "Drive through the world-famous 'Taranda Dhank' cliff-hanging Kinnaur Highway",
      "Walk the apple and apricot orchards of Sangla Valley along the turquoise Baspa River",
      "Marvel at Roghi Village's sheer cliff drop known as Suicide Point",
      "Visit Hu-Bu-Lan-Kar Monastery (founded 1025 AD) and Chandika Devi Temple"
    ],
    famousSpots: [
      {
        name: "Kalpa & Kinner Kailash Viewpoint",
        hindiName: "कल्पा (किन्नर कैलाश 79 फीट शिवलिंग दर्शन)",
        altitude: "9,711 ft (2,960 m)",
        location: "Opposite Kinner Kailash Range, Kalpa",
        category: "Spiritual",
        image: "/images/memories/kinnaur.webp",
        significance: "Direct sacred darshan point of the 79-foot natural rock Shivalinga perched atop the 21,320-ft Kinner Kailash peak.",
        mythologicalLore: "Scriptures state Lord Shiva convened meetings of devas here during the winter. The monolithic Shivalinga changes color throughout the day.",
        description: "Surrounded by deodar and apple orchards, Kalpa offers an amphitheater view of the entire Kinner Kailash and Jorkanden massif glowing golden at dawn.",
        keyHighlights: ["Direct Sunrise Kinner Kailash Darshan", "79-Ft Natural Color-Changing Shivalinga", "Centuries-Old Apple & Pine Groves", "Hu-Bu-Lan-Kar 1025 AD Gompa"]
      },
      {
        name: "Chitkul (India's Last Inhabited Village)",
        hindiName: "चितकुल (भारत का अंतिम आबाद गाँव - 11,320 फीट)",
        altitude: "11,320 ft (3,450 m)",
        location: "Baspa River Valley, Indo-Tibet Border",
        category: "Heritage Village",
        image: "/images/memories/chitkul.webp",
        significance: "The last village on the ancient Indo-Tibet trade route, renowned for having the cleanest air in India and crystal Baspa waters.",
        mythologicalLore: "Protected by Mathi Devi, whose 500-year-old wooden pagoda temple is adorned with horns of wild mountain sheep.",
        description: "Whitewashed slate-roofed wooden houses, pristine potato and buckwheat farmlands, and the famous 'Hindustan Ka Aakhri Dhabha' on the banks of the roaring Baspa River.",
        keyHighlights: ["Hindustan Ka Aakhri Dhabha Landmark", "Pristine Baspa Glacial River Beach", "500-Yr Mathi Devi Wooden Temple", "Indo-Tibet Border ITBP Checkpost"]
      },
      {
        name: "Kamru Fort & Sangla Valley",
        hindiName: "कामरू किला एवं सांगला सेब घाटी",
        altitude: "8,900 ft (2,713 m)",
        location: "Kamru Village, Sangla Valley",
        category: "Heritage Village",
        image: "/images/memories/kalpa.webp",
        significance: "Ancient 15th-century fortified tower where rulers of Bushahr dynasty were traditionally crowned before moving to Rampur.",
        mythologicalLore: "Houses an ancient 15th-century image of Lord Badrinath and a sanctum of Goddess Kamakhya Devi brought from Assam.",
        description: "Entered through a series of ornamental wooden gates, visitors wear traditional Kinnauri green caps and fabric sashes to enter the sacred wooden fort complex.",
        keyHighlights: ["15th-Century Multi-Storey Wooden Fort", "Sacred Badrinath Sanctum", "Kamakhya Devi Idol", "Traditional Kinnauri Cap Ceremony"]
      },
      
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla to Sarahan via Narkanda (Gateway to Kinnaur)",
        altitude: "7,050 ft (Sarahan)",
        distance: "165 km (6 hrs drive)",
        stay: "Deluxe Mountain Resort / Temple Guest House, Sarahan",
        meals: "Dinner included",
        desc: "Morning pickup from Shimla. Drive along the Sutlej River valley passing Rampur Bushahr to the historic village of Sarahan. Visit the 800-year-old Bhimakali Temple (51 Shaktipeeth) with unique Kathkuni architecture. Evening aarti.",
        activities: ["Sutlej Gorge Drive", "Bhimakali 800-Yr Wooden Temple Darshan", "Evening Aarti & Cultural Walk", "Shrikhand Mahadev Peak View"]
      },
      {
        day: 2,
        title: "Sarahan to Sangla Valley & Kamru Fort",
        altitude: "8,900 ft (Sangla)",
        distance: "90 km (4 hrs drive)",
        stay: "Riverside Apple Orchard Camp / Resort, Sangla",
        meals: "Breakfast & Dinner",
        desc: "Drive through the thrilling Taranda Dhank cliff-carved highway into the fairy-tale Sangla Valley. Check in by the turquoise Baspa River. Ascend to the historic 15th-century Kamru Fort and offer prayers at the Badrinath temple.",
        activities: ["Taranda Dhank Cliff Highway Experience", "Kamru Fort Tour with Kinnauri Caps", "Baspa Riverfront Stroll", "Apple Orchard Farm Walk"]
      },
      {
        day: 3,
        title: "Excursion to Chitkul (India's Last Inhabited Village)",
        altitude: "11,320 ft (Chitkul)",
        distance: "45 km roundtrip",
        stay: "Riverside Apple Orchard Camp / Resort, Sangla",
        meals: "Breakfast & Dinner",
        desc: "Drive through pine groves to Chitkul, the last inhabited Indian village before the Tibet border. Walk along the crystal clear Baspa river beach, visit the 500-year-old Mathi Devi temple, and enjoy hot chai at 'Hindustan Ka Aakhri Dhabha'.",
        activities: ["Chitkul Last Village Exploration", "Mathi Devi 500-Yr Pagoda Temple", "Baspa River Crystal Water Stroll", "Hindustan Ka Aakhri Dhabha Lunch"]
      },
      {
        day: 4,
        title: "Sangla to Kalpa (Kinner Kailash Golden Sunrise Base)",
        altitude: "9,711 ft (Kalpa)",
        distance: "50 km (2.5 hrs scenic drive)",
        stay: "Deluxe Mountain View Hotel, Kalpa",
        meals: "Breakfast & Dinner",
        desc: "Scenic drive from Sangla to Reckong Peo (district headquarters) and ascend to Kalpa. Behold the direct, awe-inspiring panoramic view of the sacred 79-ft Kinner Kailash Shivalinga peak. Visit Hu-Bu-Lan-Kar monastery and Roghi village cliff.",
        activities: ["Kinner Kailash Majestic Panorama", "Roghi Village & Suicide Point Walk", "Hu-Bu-Lan-Kar 1025 AD Gompa", "Kalpa Alpenglow Sunset"]
      },
      {
        day: 5,
        title: "Kalpa Himalayan Sunrise & Return to Narkanda / Rampur",
        altitude: "8,800 ft (Narkanda)",
        distance: "155 km (5.5 hrs)",
        stay: "Deluxe Mountain Resort, Narkanda",
        meals: "Breakfast & Dinner",
        desc: "Watch the golden sunrise rays illuminate the sacred Kinner Kailash Shivalinga. Enjoy breakfast among apple orchards. Scenic return drive along the Sutlej gorge to the apple country of Narkanda.",
        activities: ["Golden Kinner Kailash Sunrise Photography", "Kinnauri Apple & Apricot Shopping", "Narkanda Evening Relaxation"]
      },
      {
        day: 6,
        title: "Narkanda to Shimla / Chandigarh Drop",
        altitude: "1,050 ft (Chandigarh)",
        distance: "175 km (5.5 hrs)",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Resort",
        desc: "Drive back with pleasant memories of Devbhoomi Kinnaur and drop at Chandigarh Airport or Railway Station.",
        activities: ["Himalayan Panorama Drive", "Chandigarh Airport Drop"]
      }
    ],
    whatToWear: [
      {
        category: "High Valley Warm Layers",
        iconName: "Shirt",
        description: "Kinnaur weather is crisp and cool (12°C to 22°C day, 4°C to 10°C night).",
        items: [
          { name: "Windproof Fleece Jacket & Thermal Underwear", importance: "Mandatory", notes: "Chitkul (11,320 ft) and Kalpa evenings are cold." },
          { name: "Sturdy Walking Shoes", importance: "Mandatory", notes: "For Kamru Fort stone steps and Baspa riverbank." },
          { name: "UV Polarized Sunglasses & Sunscreen", importance: "Mandatory", notes: "High altitude mountain glare." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Aadhaar / Passport for Indian Yatris", "Inner Line Permit (ILP) required ONLY for foreign tourists beyond Jangi to Spiti"],
      processingDays: "No permits needed for Indian nationals to visit Kalpa, Sangla, or Chitkul",
      checkposts: ["Akpa Checkpost", "Pooh Checkpost (if extending)"],
      medicalRequirements: "Gradual drive allows effortless acclimatization.",
      guidelines: [
        "Traditional dress etiquette (wearing Kinnauri cap and cloth belt) is respected at Kamru Fort.",
        "Photography is restricted inside the innermost Bhimakali sanctum."
      ]
    },
    inclusions: [
      "Dedicated private AC vehicle (Innova Crysta / Scorpio / Tempo Traveler) with expert hill driver",
      "5 Nights accommodation in scenic 4-star mountain view resorts and riverside camps",
      "Daily Breakfast & Dinner with fresh local ingredients",
      "Sightseeing in Sarahan, Sangla, Chitkul, Kalpa & Roghi Village",
      "All driver allowances, fuel, toll taxes, and parking fees"
    ],
    exclusions: [
      "Lunch and personal snacks",
      "GST 5%",
      "Personal tips and Kinnauri shawls / dry fruit shopping"
    ],
    faqs: [
      {
        question: "Is Chitkul accessible by road for standard vehicles?",
        answer: "Yes, Chitkul is connected by a scenic paved motorable road along the Baspa River. Our Innova and SUV fleet navigates it smoothly."
      },
      {
        question: "What makes the Kinner Kailash Shivalinga view so miraculous?",
        answer: "The 79-foot natural rock monolith stands independently on the mountain crest. As the sun traverses the sky, the rock face changes hue dramatically from gold to copper and deep purple."
      }
    ]
  },

  "dalhousie-khajjiar-birbilling": {
    slug: "dalhousie-khajjiar-birbilling",
    title: "Dalhousie, Khajjiar & Bir Billing Paragliding Expedition",
    subtitle: "Mini Switzerland Khajjiar · Dainkund Peak · World's 2nd Highest Paragliding Bir · Baijnath Jyotirlinga",
    tagline: "Alpine Meadows & Soaring Skies — Deodar Forests, Colonial Romance & Ancient Shiva Temples",
    location: "Chamba & Kangra Districts, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    altitude: "8,000 ft (Bir Billing Takeoff) / 9,000 ft (Dainkund)",
    difficulty: "Easy",
    bestMonths: "March to June & September to November",
    startingPoint: "Pathankot / Amritsar / Chandigarh",
    endingPoint: "Pathankot / Chandigarh / Gaggal",
    priceStandard: 16500,
    pricePremium: 24000,
    bannerImage: "/images/destinations/paragliding.webp",
    galleryImages: [
      
    ],
    overview: "This diverse Himachal holiday seamlessly combines the colonial charm and lush deodar glades of Dalhousie and Khajjiar ('Mini Switzerland of India') with the high-flying adrenaline and spiritual grace of Bir Billing (the world's 2nd highest paragliding takeoff point) and the sacred 1204 AD Baijnath Shiva Jyotirlinga.",
    spiritualSignificance: "Baijnath Temple, constructed in 1204 AD in classical Nagara temple architecture, is one of the most revered Shiva shrines in Himachal where Ravana is believed to have performed severe penance to propitiate Lord Shiva. The Tibetan monasteries at Bir and the ancient Pholani Devi temple atop Dainkund Peak add deep sacred aura.",
    highlights: [
      "Experience the rolling green saucer meadow of Khajjiar ('Mini Switzerland of India') and floating island lake",
      "Take off from Billing (8,000 ft) for a 20-30 minute tandem paragliding flight over the Kangra Valley",
      "Ascend Dainkund Peak (9,000 ft) — the 'Singing Hill' with 360° views of Chenab and Ravi rivers",
      "Offer prayers at the 1204 AD ancient stone Baijnath Vaidyanath Shiva Temple",
      "Walk the heritage colonial trails of Subhash Baoli, Panchpula, and St. John's Church in Dalhousie",
      "Stroll the serene Tibetan colony, stupas, and Chokling Monastery in Bir",
      "Explore the pristine trout streams and hydel water channels of Barot Valley"
    ],
    famousSpots: [
      {
        name: "Khajjiar (Mini Switzerland of India)",
        hindiName: "खज्जियार (भारत का मिनी स्विट्जरलैंड)",
        altitude: "6,500 ft (1,920 m)",
        location: "24 km from Dalhousie, Chamba District",
        category: "Scenic Viewpoint",
        image: "/images/memories/khajjar.webp",
        significance: "Officially christened as 'Mini Switzerland' by the Swiss Envoy in 1992, featuring a saucer-shaped meadow and floating island lake.",
        mythologicalLore: "Dedicated to Khajjinag (Lord of Serpents), whose 12th-century wooden temple with carved Pandava statues stands near the lake.",
        description: "Surrounded by a dense amphitheater of giant deodar cedars, Khajjiar offers horse riding, zorbing, peaceful walks, and panoramic views of Mt. Kailash Pir Panjal.",
        keyHighlights: ["Official Swiss Certified 'Mini Switzerland'", "12th-Century Khajjinag Wooden Temple", "Floating Island Glacial Lake", "Dense Pine Cedar Amphitheater"]
      },
      {
        name: "Bir Billing Paragliding Arena",
        hindiName: "बीर बिलिंग (विश्व का दूसरा सर्वोच्च पैराग्लाइडिंग स्थल)",
        altitude: "8,000 ft (2,438 m) Takeoff",
        location: "Billing Takeoff / Bir Tibetan Colony",
        category: "Scenic Viewpoint",
        image: "/images/destinations/paragliding.webp",
        significance: "World's 2nd highest paragliding takeoff site and host of the Paragliding World Cup, offering ideal thermal air currents.",
        mythologicalLore: "Surrounded by Tibetan Buddhist monasteries where lamas chant peace stotrams for high-flying sojourners.",
        description: "Launch off the smooth green ridge of Billing with an experienced certified pilot to soar above tea gardens and monasteries before landing gently at Bir.",
        keyHighlights: ["20-30 Minute World-Class Paragliding Flight", "Smooth Thermal Ridge Lift", "Chokling Tibetan Monastery Visit", "Sunset Landing Arena Cafe Vibes"]
      },
      {
        name: "Dainkund Peak (The Singing Hill)",
        hindiName: "दैनिकुंड पीक (9,000 फीट सिंगिंग हिल)",
        altitude: "9,000 ft (2,745 m)",
        location: "10 km from Dalhousie",
        category: "Scenic Viewpoint",
        image: "/images/memories/dainkund-peak.webp",
        significance: "Highest point in the Dalhousie region offering a 360-degree panorama of snow peaks and the emerald curves of Chenab and Ravi rivers.",
        mythologicalLore: "Known as the 'Singing Hill' because mountain breezes whistling through pine needles create a melodious musical hum.",
        description: "A scenic 1.5 km ridge walk leads to the colorful Pholani Devi Temple, where local folklore says the Goddess protects the valley from evil spirits.",
        keyHighlights: ["Highest Peak in Dalhousie (9,000 ft)", "Pholani Devi Ancient Ridge Temple", "Singing Wind Pine Ridge Walk", "360° Ravi & Chenab River Panorama"]
      },
      
    ],
    itinerary: [
      {
        day: 1,
        title: "Pathankot / Amritsar to Dalhousie Arrival",
        altitude: "6,460 ft (Dalhousie)",
        distance: "80 km from Pathankot (2.5 hrs) / 190 km from Amritsar",
        stay: "Heritage 4-Star Resort, Dalhousie",
        meals: "Dinner included",
        desc: "Pickup and scenic drive through the pine-covered Dhauladhar foothills to the colonial hill retreat of Dalhousie. Check in. Evening stroll through Gandhi Chowk and Subhash Baoli.",
        activities: ["Colonial Hill Station Drive", "Gandhi Chowk & Mall Walk", "Subhash Baoli Pine View", "Heritage Resort Welcome"]
      },
      {
        day: 2,
        title: "Dainkund Peak, Kalatop Wildlife Sanctuary & Khajjiar ('Mini Switzerland')",
        altitude: "6,500 ft (Khajjiar)",
        distance: "45 km roundtrip",
        stay: "Heritage 4-Star Resort, Dalhousie",
        meals: "Breakfast & Dinner",
        desc: "Ascend to Dainkund Peak (9,000 ft) for the Singing Hill ridge walk and Pholani Devi temple. Drive through dense Kalatop wildlife deodar sanctuary to the lush green meadow and floating island lake of Khajjiar.",
        activities: ["Dainkund Peak (9,000 ft) Summit Hike", "Kalatop Deodar Wildlife Trail", "Khajjiar Mini Switzerland Exploration", "Khajjinag Temple & Horse Rides"]
      },
      {
        day: 3,
        title: "Dalhousie to Bir Billing via Kangra Valley",
        altitude: "5,000 ft (Bir)",
        distance: "145 km (4.5 hrs scenic drive)",
        stay: "Eco Boutique Resort / Luxury Tents, Bir",
        meals: "Breakfast & Dinner",
        desc: "Drive through the tea-scented hills of Palampur and Kangra Valley to Bir Billing. Tour the peaceful Chokling Monastery, explore Tibetan art stupas, and watch paragliders descend into the golden sunset landing field.",
        activities: ["Palampur Tea Gardens Scenic Stop", "Chokling Monastery Tibetan Stupa", "Sunset Landing Arena Gathering", "Café Culture Experience"]
      },
      {
        day: 4,
        title: "Tandem Paragliding Flight from Billing & Baijnath Temple",
        altitude: "8,000 ft Takeoff",
        distance: "30 km local excursion",
        stay: "Eco Boutique Resort / Luxury Tents, Bir",
        meals: "Breakfast & Dinner",
        desc: "Drive up to Billing takeoff point (8,000 ft). Strap in with your certified tandem pilot for an exhilarating 20-30 minute paragliding flight over the pine valleys. In the afternoon, visit the 1204 AD ancient stone Baijnath Shiva Temple.",
        activities: ["Billing (8,000 ft) Tandem Paragliding Flight", "GoPro Aerial Video Recording", "Baijnath 1204 AD Shiva Temple Darshan", "Binwa River Ghat Walk"]
      },
      {
        day: 5,
        title: "Bir Billing to Pathankot / Chandigarh Departure",
        altitude: "1,050 ft (Chandigarh)",
        distance: "140 km to Pathankot (3.5 hrs) / 240 km to Chandigarh",
        stay: "Departure / Return Connection",
        meals: "Breakfast at Resort",
        desc: "Enjoy a relaxed breakfast surrounded by prayer flags. Drive down to Pathankot Railway Station or Chandigarh / Gaggal Airport for your onward journey.",
        activities: ["Tibetan Souvenir Shopping", "Kangra Valley Highway Return", "Airport / Railway Drop"]
      }
    ],
    whatToWear: [
      {
        category: "Adventure & Leisure Hill Attire",
        iconName: "Shirt",
        description: "Pleasant days (18°C to 27°C) and cool mountain winds at takeoff (10°C to 15°C).",
        items: [
          { name: "Windbreaker / Warm Jacket", importance: "Mandatory", notes: "Essential for paragliding high-altitude wind resistance." },
          { name: "Laced Sports / Trekking Shoes", importance: "Mandatory", notes: "Crucial for takeoff running and landing safely." },
          { name: "Sunglasses with Strap", importance: "Recommended", notes: "For bright high-altitude flight clarity." }
        ]
      }
    ],
    permitDetails: {
      requiredDocs: ["Government Photo ID Card"],
      processingDays: "No permits required; paragliding registration handled seamlessly on-site",
      checkposts: ["Billing Takeoff Forest Gate"],
      medicalRequirements: "Paragliding weight limit: 30 kg to 95 kg. Certified tandem pilots handle all flight controls.",
      guidelines: [
        "Wear securely tied footwear during flight.",
        "Maintain temple sanctity at 1204 AD Baijnath sanctum."
      ]
    },
    inclusions: [
      "Private AC vehicle (Innova / Ertiga / Dzire) with experienced hill driver",
      "4 Nights stay in 4-star boutique resorts (2 Nights Dalhousie + 2 Nights Bir)",
      "Daily Breakfast & Dinner",
      "Sightseeing in Dalhousie, Khajjiar, Dainkund, Bir, and Baijnath",
      "All driver allowances, toll taxes, and parking fees"
    ],
    exclusions: [
      "Tandem paragliding flight fee & GoPro recording (approx. ₹2,500 - ₹3,000)",
      "Horse riding and zorbing in Khajjiar",
      "GST 5%",
      "Personal laundry and beverages"
    ],
    faqs: [
      {
        question: "Is paragliding at Bir Billing safe for first-time flyers?",
        answer: "Yes, 100%! You fly in tandem with state-licensed, highly experienced pilots who have thousands of logged flight hours and modern safety reserve parachutes."
      },
      {
        question: "Why is Khajjiar called the 'Mini Switzerland of India'?",
        answer: "In 1992, Swiss Ambassador Willy P. Blazer officially designated Khajjiar due to its striking topographical resemblance to Switzerland's alpine meadows and placed a signpost showing the exact distance to Berne."
      }
    ]
  }
};

// Aliases and slug mappings for Himachal Pradesh and Adi Kailash destinations
if (DESTINATIONS_DATA["dharamshala-mcleodganj-triund"]) {
  DESTINATIONS_DATA["dharamshala-mcleodganj"] = DESTINATIONS_DATA["dharamshala-mcleodganj-triund"];
  DESTINATIONS_DATA["mcleodganj"] = DESTINATIONS_DATA["dharamshala-mcleodganj-triund"];
  DESTINATIONS_DATA["dharamshala"] = DESTINATIONS_DATA["dharamshala-mcleodganj-triund"];
}

if (DESTINATIONS_DATA["dalhousie-khajjiar-birbilling"]) {
  DESTINATIONS_DATA["dalhousie-khajjiar-bir"] = DESTINATIONS_DATA["dalhousie-khajjiar-birbilling"];
  DESTINATIONS_DATA["dalhousie"] = DESTINATIONS_DATA["dalhousie-khajjiar-birbilling"];
  DESTINATIONS_DATA["khajjiar"] = DESTINATIONS_DATA["dalhousie-khajjiar-birbilling"];
}

if (DESTINATIONS_DATA["adi-kailash"]) {
  DESTINATIONS_DATA["adi-kailash-yatra"] = DESTINATIONS_DATA["adi-kailash"];
  DESTINATIONS_DATA["adi-kailash-yatra-package"] = DESTINATIONS_DATA["adi-kailash"];
}




