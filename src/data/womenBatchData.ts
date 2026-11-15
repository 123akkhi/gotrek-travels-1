export interface WomenBatchDate {
  id: string;
  startDate: string;
  endDate: string;
  formattedRange: string;
  theme: string;
  themeHindi: string;
  seasonBadge: string;
  totalSeats: number;
  availableSeats: number;
  status: 'Filling Fast' | 'Few Seats Left' | 'Available';
  specialHighlight: string;
}

export interface WomenBatchItineraryDay {
  day: number;
  title: string;
  hindiTitle: string;
  altitude: string;
  distance: string;
  stay: string;
  meals: string;
  highlights: string[];
  description: string;
}

export interface WomenPillar {
  icon: string;
  title: string;
  hindiTitle: string;
  desc: string;
  perks: string[];
}

export interface WomenYatriReview {
  name: string;
  city: string;
  category: 'Solo Woman Traveler' | 'Mother & Daughter' | 'Women Friends Group';
  travelDate: string;
  review: string;
  rating: number;
  avatarText: string;
}

export const WOMEN_BATCH_DATES: WomenBatchDate[] = [
  {
    id: "batch-1",
    startDate: "2027-05-15",
    endDate: "2027-05-20",
    formattedRange: "15 May – 20 May 2027",
    theme: "Rhododendron Bloom & High Snow Yatra",
    themeHindi: "बुरांश पुष्प बहार एवं हिम दर्शन यात्रा",
    seasonBadge: "Opening Season",
    totalSeats: 14,
    availableSeats: 5,
    status: "Few Seats Left",
    specialHighlight: "Vibrant pink Buransh flowers blooming across Vyas Valley trails & crisp snow views."
  },
  {
    id: "batch-2",
    startDate: "2027-06-05",
    endDate: "2027-06-10",
    formattedRange: "05 June – 10 June 2027",
    theme: "Summer Solstice & Clear Sun Darshan",
    themeHindi: "ग्रीष्मकालीन पावन आदि कैलाश दर्शन",
    seasonBadge: "Best Weather",
    totalSeats: 14,
    availableSeats: 8,
    status: "Filling Fast",
    specialHighlight: "Pleasant daytime temperatures (12°C–18°C), crystal clear views of Om Parvat snow glyph."
  },
  {
    id: "batch-3",
    startDate: "2027-07-12",
    endDate: "2027-07-17",
    formattedRange: "12 July – 17 July 2027",
    theme: "Devshayani Ekadashi Auspicious Yatra",
    themeHindi: "देवशयनी एकादशी पावन संकल्प यात्रा",
    seasonBadge: "Sacred Tithi",
    totalSeats: 14,
    availableSeats: 10,
    status: "Available",
    specialHighlight: "Special Parvati Sarovar deep daan & Shiv-Parvati puja ceremony with native priests."
  },
  {
    id: "batch-4",
    startDate: "2027-08-21",
    endDate: "2027-08-26",
    formattedRange: "21 August – 26 August 2027",
    theme: "Shravan Purnima & Himalayan Sisterhood",
    themeHindi: "श्रावण पूर्णिमा एवं हिमालयी भगिनी यात्रा",
    seasonBadge: "Holy Shravan",
    totalSeats: 14,
    availableSeats: 6,
    status: "Few Seats Left",
    specialHighlight: "Lush green alpine meadows of Kuti & Vyas Valley with roaring Himalayan waterfalls."
  },
  {
    id: "batch-5",
    startDate: "2027-09-14",
    endDate: "2027-09-19",
    formattedRange: "14 Sept – 19 Sept 2027",
    theme: "Autumn Azure Skies & Parvati Reflection",
    themeHindi: "शरद ऋतु निर्मल आकाश एवं पार्वती सरोवर",
    seasonBadge: "100% Darshan",
    totalSeats: 14,
    availableSeats: 9,
    status: "Filling Fast",
    specialHighlight: "Zero cloud cover, mirror-like lake reflection of Mount Adi Kailash peak."
  },
  {
    id: "batch-6",
    startDate: "2027-10-02",
    endDate: "2027-10-07",
    formattedRange: "02 Oct – 07 Oct 2027",
    theme: "Navratri Shakti & Divine Blessings Batch",
    themeHindi: "शारदीय नवरात्रि शक्ति आराधना यात्रा",
    seasonBadge: "Shakti Special",
    totalSeats: 14,
    availableSeats: 4,
    status: "Few Seats Left",
    specialHighlight: "Nine days of divine cosmic energy at the mythical tapasya spot of Goddess Parvati."
  }
];

export const WOMEN_SAFETY_PILLARS: WomenPillar[] = [
  {
    icon: "UserCheck",
    title: "100% Women-Led Mountain Team",
    hindiTitle: "प्रमाणित महिला माउंटेन लीडर",
    desc: "Every batch is accompanied from start to finish by a certified female mountain leader (NIM Uttarkashi certified) who understands feminine pacing, altitude acclimatization, and high-altitude emotional ease.",
    perks: ["NIM Uttarkashi Certified", "Fluent in Hindi, English & Kumaoni", "Trained in High-Altitude Wilderness First Aid"]
  },
  {
    icon: "HeartPulse",
    title: "Dedicated Female Paramedic on Board",
    hindiTitle: "यात्रा में समर्पित महिला पैरामेडिक",
    desc: "A qualified lady paramedic travels in the convoy carrying medical oxygen cylinders, fingertip pulse oximeters, digital BP monitors, Diamox, and mountain sickness care.",
    perks: ["Twice-daily SpO2 & BP vitals monitoring", "Portable Medical O2 in all 4x4 vehicles", "Menstrual cramp & AMS relief protocols"]
  },
  {
    icon: "Flower2",
    title: "Curated Women Comfort & Hygiene Kit",
    hindiTitle: "विशेष महिला स्वच्छता एवं कम्फर्ट किट",
    desc: "Every yatri receives a complimentary GoTrek Himalayan Comfort Kit containing organic sanitary pads, herbal heating pads for sub-zero cramps, intimate hygiene wipes, biodegradable disposal bags, and SPF 50+ cold mountain sunscreen.",
    perks: ["Organic sanitary pads & heat patches", "Gentle intimate wipes & eco disposal bags", "Sub-zero cold lip balm & SPF 50 sun defense"]
  },
  {
    icon: "Home",
    title: "Private Attached-Washroom Stays",
    hindiTitle: "सुरक्षित निजी कमरे एवं अटैच्ड वॉशरूम",
    desc: "Carefully vetted traditional homestays and hotels at Dharchula, Gunji, Nabi, and Kuti. We allocate private twin/triple sharing rooms with clean indoor western/indian attached washrooms and guaranteed hot water buckets.",
    perks: ["Guaranteed indoor attached washrooms", "Freshly washed heavy thermal quilts & hot water bottles", "Pure Sattvik vegetarian fresh mountain meals"]
  },
  {
    icon: "ShieldCheck",
    title: "4x4 Convoys with Verified Chauffeurs",
    hindiTitle: "विश्वसनीय ४x४ वाहन एवं सुरक्षित काफिला",
    desc: "Navigate the rugged Vyas Valley in high-clearance 4x4 Mahindra Boleros/Scorpios driven by verified, non-smoking native Kumaoni mountain drivers with GPS tracking and local ITBP post liaison.",
    perks: ["Max 4–5 yatris per 4x4 for relaxed comfort", "Pre-cleared SDM Dharchula Inner Line Permits", "Continuous satellite/radio communication backup"]
  },
  {
    icon: "Sparkles",
    title: "Intimate Cohort & Sacred Sisterhood",
    hindiTitle: "१४ महिलाओं का आत्मीय दल एवं सत्संग",
    desc: "Capped strictly at 12 to 14 women per batch. Enjoy soulful evening kirtan by Parvati Sarovar, morning meditation facing Om Parvat, Kumaoni folk stories, and life-changing camaraderie with like-minded women.",
    perks: ["Small group sisterhood (no rushing)", "Parvati Sarovar sacred deep daan & aarti", "Complimentary high-res group photo memory album"]
  }
];

export const WOMEN_BATCH_ITINERARY: WomenBatchItineraryDay[] = [
  {
    day: 1,
    title: "Kathgodam to Dharchula Base via Scenic Kumaon",
    hindiTitle: "काठगोदाम से धारचूला बेस कैंप",
    altitude: "3,100 ft (945 m)",
    distance: "280 km (Approx 8–9 hrs)",
    stay: "Hotel Himalayan Orchard / Milan Regency (Private Room)",
    meals: "Breakfast, Lunch en route, Dinner at Hotel",
    highlights: ["Scenic Himalayan river valley drive", "Kainchi Dham stopover blessing", "Dharchula orientation with Lady Trek Leader", "Inner Line Permit documentation check"],
    description: "Meet your female expedition leader and fellow sisters at Kathgodam Railway Station at 6:30 AM. Embark on a comfortable SUV journey through Almora and Pithoragarh with mountain viewpoints. Check into our verified Dharchula hotel, meet your female paramedic for initial health vitals, and receive your GoTrek Himalayan Comfort Kit."
  },
  {
    day: 2,
    title: "Dharchula to Nabi / Gunji Village via Chialekh Pass",
    hindiTitle: "धारचूला से नाबी / गुंजी गाँव (व्यास घाटी)",
    altitude: "10,500 ft (3,200 m)",
    distance: "75 km (Approx 4–5 hrs via 4x4)",
    stay: "Heritage Wooden Homestay at Nabi / Gunji (Attached Bath)",
    meals: "Breakfast, Hot Lunch at Malpa/Budhi, Traditional Kumaoni Dinner",
    highlights: ["Kali River gorge frontier drive", "Dramatic ascent to Chialekh Alpine Meadow", "Warm welcome by native Bhotiya village women", "Evening acclimatization stroll & herbal Buransh tea"],
    description: "Board our dedicated 4x4 convoy as we climb past Budhi and Chialekh pass into the sacred Vyas Valley. Marvel at the dramatic contrast from rocky gorges to rolling alpine meadows. Arrive in the scenic heritage hamlet of Nabi. Enjoy hot herbal Rhododendron tea, cozy up with heavy Himalayan quilts, and rest well."
  },
  {
    day: 3,
    title: "Darshan of Om Parvat at Nabhidhang & Kalapani",
    hindiTitle: "ॐ पर्वत दर्शन (नाभिढांग) एवं पावन काली मंदिर",
    altitude: "14,000 ft (4,267 m)",
    distance: "55 km round trip (4x4 SUV)",
    stay: "Heritage Wooden Homestay at Nabi / Gunji",
    meals: "Breakfast, Hot Packed Lunch, Wholesome Sattvik Dinner",
    highlights: ["Early morning sunrise illumination on Om Parvat", "Witness miraculous snow-etched 'ॐ' glyph", "Holy Kali Mata Mandir darshan at Kalapani", "Vyas Gufa legendary meditation cave view"],
    description: "An early morning drive takes us to Nabhidhang. As the sun rises over the snow-bound Himalayan wall, the divine Om Parvat reveals its eternal snow-carved 'ॐ' glyph in pure golden radiance. Later, offer prayers at the sacred origin of Kali River at Kalapani temple. Return to our homestay for warm ginger tea and shared stories."
  },
  {
    day: 4,
    title: "Sacred Jolingkong, Parvati Sarovar & Adi Kailash Peak",
    hindiTitle: "पावन जोलिंगकोंग, पार्वती सरोवर एवं आदि कैलाश",
    altitude: "14,500 ft (4,420 m)",
    distance: "40 km round trip (4x4 SUV + gentle 1.5 km sacred walk)",
    stay: "Heritage Wooden Homestay at Nabi / Kuti",
    meals: "Early Breakfast, Warm Refreshments at Jolingkong, Celebration Dinner",
    highlights: ["Full majestic darshan of Adi Kailash peak", "Holy water rituals at crystal clear Parvati Sarovar", "Special Sisterhood Aarti & brass lamp offering", "Optional gentle walk to Gauri Kund (15,000 ft)"],
    description: "The crown jewel of our journey! Drive past ancient Kuti village to Jolingkong base at 14,500 ft. A gentle, unhurried walk brings us to the sacred turquoise waters of Parvati Sarovar Lake beneath the towering throne of Adi Kailash. We hold our special Women Sisterhood Aarti, offer sacred brass lamps, and absorb the serene divine energy."
  },
  {
    day: 5,
    title: "Vyas Valley to Dharchula Base Descent",
    hindiTitle: "व्यास घाटी से धारचूला वापसी",
    altitude: "3,100 ft (945 m)",
    distance: "75 km (4x4 descent)",
    stay: "Hotel Himalayan Orchard / Milan Regency (Private Room)",
    meals: "Breakfast, Lunch, Farewell Dinner with Kumaoni Delicacies",
    highlights: ["Scenic descent through Garbyang village", "Photography stop at cascading mountain waterfalls", "Local souvenir shopping at Dharchula (Pashmina, Pahari Rajma)", "GoTrek Yatra Completion Certificate & sisterhood celebration"],
    description: "After a hearty breakfast of Pahari millet puris and fresh tea, begin the scenic return drive to Dharchula. Check into your hotel, enjoy a refreshing hot shower, and explore the Indo-Nepal suspension bridge market. In the evening, gather for a warm celebration dinner where every yatri receives her official GoTrek Yatra Completion Certificate."
  },
  {
    day: 6,
    title: "Dharchula to Kathgodam Drop-off",
    hindiTitle: "धारचूला से काठगोदाम प्रस्थान",
    altitude: "1,700 ft (520 m)",
    distance: "280 km (Approx 8–9 hrs)",
    stay: "Departure / Return Home",
    meals: "Breakfast at Dharchula, Lunch en route, High Tea",
    highlights: ["Scenic return drive through Almora pine forests", "Drop-off at Kathgodam Railway Station by 6:00 PM", "Sacred Adi Kailash holy water & prasad gift box"],
    description: "Depart Dharchula after early morning breakfast. Enjoy scenic views of Kumaon's oak and pine valleys with lunch en route. Reach Kathgodam Railway Station by 6:00 PM in time for the evening New Delhi Shatabdi Express or Ranikhet Express, carrying lifelong memories, divine blessings, and enduring sisterhood friendships."
  }
];

export const WOMEN_YATRI_REVIEWS: WomenYatriReview[] = [
  {
    name: "Dr. Suniti Deshmukh",
    city: "Pune, Maharashtra",
    category: "Solo Woman Traveler",
    travelDate: "September 2026 Batch",
    review: "As a 52-year-old doctor traveling solo, my primary worry was high altitude safety and hygiene. GoTrek's all-women batch was a blessing. Our trek leader Anjali was like a younger sister and our paramedic checked our SpO2 twice daily. Having clean attached washrooms and the hygiene kit made 14,500 ft feel completely comfortable. Parvati Sarovar darshan will remain in my heart forever.",
    rating: 5,
    avatarText: "SD"
  },
  {
    name: "Meenakshi & Radhika Sharma",
    city: "Jaipur, Rajasthan",
    category: "Mother & Daughter",
    travelDate: "June 2026 Batch",
    review: "I took my 64-year-old mother for Adi Kailash. Being an all-women group made my mother instantly relaxed. Nobody rushed her, the 4x4 seats were spacious, and the hot water bottles in bed at Nabi village were such a thoughtful touch. When we saw Om Parvat together at sunrise, tears rolled down our cheeks. 100% recommend GoTrek Women Special!",
    rating: 5,
    avatarText: "MR"
  },
  {
    name: "Pooja Varma & 3 Friends",
    city: "Bengaluru, Karnataka",
    category: "Women Friends Group",
    travelDate: "May 2026 Batch",
    review: "Four college friends reconnecting on a sacred Himalayan journey. The rhododendrons along the trail were blooming in radiant pinks, matching the warmth of our hosts. The food was so fresh and Sattvik, the drivers were courteous gentlemen, and the sisterhood evening kirtan under the stars was pure magic.",
    rating: 5,
    avatarText: "PV"
  }
];

export const WOMEN_BATCH_FAQS = [
  {
    q: "Can I join this batch as a solo female traveler?",
    a: "Absolutely! More than 65% of yatris in our Women Special batches are solo women travelers. You will be paired with a fellow female traveler in a comfortable twin-sharing private room with attached washroom, or you can opt for a single-occupancy room. Our female trek leader ensures everyone feels welcomed, safe, and part of the sisterhood from day one."
  },
  {
    q: "How are menstrual hygiene and washrooms managed at high altitudes?",
    a: "We understand that periods don't stop for the mountains. All our homestays and hotels in Dharchula, Nabi, and Gunji have verified indoor attached washrooms with hot running or bucket water. Additionally, every yatri receives a complimentary GoTrek Himalayan Comfort Kit with herbal heat patches for cramps, organic pads, intimate wipes, and sealed disposal bags. Our female medic is always equipped to assist with comfort and care."
  },
  {
    q: "What is the age limit and fitness required for women yatris?",
    a: "Women between the ages of 16 and 72 in reasonably healthy condition can undertake this yatra. Since 95% of the route is covered in our high-clearance 4x4 SUVs, there is very little strenuous trekking (only about 1 to 1.5 km of gentle walking from Jolingkong base to Parvati Sarovar). Pony and local Doli/Palki options are also readily available for anyone who prefers not to walk."
  },
  {
    q: "Who is accompanying the batch throughout the 6 days?",
    a: "Each women's batch is led by a certified female mountain leader (trained at NIM Uttarkashi) alongside a dedicated female paramedic equipped with medical oxygen, oximeters, and mountain medicine. Our 4x4 drivers are carefully vetted, background-verified native Kumaoni gentlemen with over 8 years of accident-free mountain driving."
  },
  {
    q: "How do we get our Inner Line Permits (ILP)?",
    a: "GoTrek manages 100% of the government liaison. You simply submit your Aadhaar card copy, passport-size photo, and police clearance/doctor fitness form through our simple WhatsApp portal. Our Dharchula office submits and clears your official SDM Inner Line Permit with zero hassle for you."
  },
  {
    q: "What is the booking advance and cancellation policy?",
    a: "You can reserve your seat in the 2027 Women Special Batch with an advance slot deposit of just ₹5,000 via Razorpay or direct bank transfer. The remaining balance is payable upon your arrival at Dharchula base. If cancelled up to 30 days before departure, 100% of your advance is transferable to any other 2027 batch or refundable."
  }
];
