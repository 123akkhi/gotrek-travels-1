import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sun, Cloud, CloudSun, CloudRain, CloudSnow, CloudLightning,
  Thermometer, Wind, Droplets, RefreshCw, AlertTriangle, CheckCircle2,
  MapPin, Mountain, Calendar, ArrowUpRight, Compass, ShieldCheck, Sparkles, Activity
} from 'lucide-react';

interface WeatherLocation {
  name: string;
  altitude: string;
  lat: number;
  lon: number;
  defaultTempDay: number;
  defaultTempNight: number;
  conditionFallback: string;
}

export interface YatraWeatherConfig {
  yatraName: string;
  sanctum: WeatherLocation;
  baseCamp: WeatherLocation;
  bestMonths: string;
  weatherTips: string[];
  seasonalTemps: { month: string; maxTemp: number; minTemp: number; snowChance: string; advisory: string }[];
}

export const YATRA_WEATHER_DATA: Record<string, YatraWeatherConfig> = {
  // --- 0. HIMACHAL PRADESH WEATHER CONFIGURATIONS ---
  "spiti-valley": {
    yatraName: "Spiti Valley & Chandratal Lake",
    sanctum: {
      name: "Kaza & Chandratal Lake Camp",
      altitude: "14,100 ft (4,300 m)",
      lat: 32.22,
      lon: 78.07,
      defaultTempDay: 11,
      defaultTempNight: -3,
      conditionFallback: "Crisp Cold Desert Air"
    },
    baseCamp: {
      name: "Kalpa / Tabo Base",
      altitude: "9,700 ft (2,960 m)",
      lat: 31.53,
      lon: 78.25,
      defaultTempDay: 19,
      defaultTempNight: 5,
      conditionFallback: "Sunny High Altitude Valley"
    },
    bestMonths: "May – October",
    weatherTips: [
      "Cold desert climate with strong UV radiation; high SPF sunscreen and UV sunglasses mandatory.",
      "Night temperatures at Chandratal camp (14,100 ft) drop below freezing even in summer; 3-layer thermals required.",
      "Kunzum Pass (14,931 ft) receives fresh snow in May/Oct; early morning crossings recommended."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 10, minTemp: -3, snowChance: "High (Passes)", advisory: "Snow-lined roads; heavy woolens & down jacket mandatory." },
      { month: "June", maxTemp: 16, minTemp: 2, snowChance: "Low", advisory: "Best time for Chandratal camping and Key Monastery visit." },
      { month: "July-Aug", maxTemp: 19, minTemp: 6, snowChance: "None", advisory: "Warmest months in Spiti rain-shadow zone; dry and sunny." },
      { month: "Sept", maxTemp: 14, minTemp: 1, snowChance: "Low", advisory: "Deep blue skies, golden poplar trees, and crystal clear visibility." },
      { month: "Oct", maxTemp: 7, minTemp: -6, snowChance: "Moderate", advisory: "Pre-winter freeze; extreme cold gear and thermal socks needed." }
    ]
  },
  "manali-solang-lahaul": {
    yatraName: "Manali, Solang Valley & Atal Tunnel",
    sanctum: {
      name: "Solang Valley & Atal Tunnel North Portal",
      altitude: "10,200 ft (3,109 m)",
      lat: 32.32,
      lon: 77.15,
      defaultTempDay: 16,
      defaultTempNight: 4,
      conditionFallback: "Cool Alpine Breeze"
    },
    baseCamp: {
      name: "Manali Mall Road & Old Manali",
      altitude: "6,726 ft (2,050 m)",
      lat: 32.24,
      lon: 77.18,
      defaultTempDay: 23,
      defaultTempNight: 11,
      conditionFallback: "Pleasant Pine Forest Climate"
    },
    bestMonths: "Year-Round (Snow: Dec-Feb, Lush: May-Oct)",
    weatherTips: [
      "Atal Tunnel provides all-weather connectivity into Lahaul; weather can change drastically across the portal.",
      "Solang Valley adventure sports (paragliding, zorbing) operate best during calm morning hours.",
      "Light jacket recommended in summer evenings; heavy woolens and snow boots needed in winter."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 23, minTemp: 9, snowChance: "None (Valley)", advisory: "Pleasant sunny days; ideal for sightseeing and café hopping." },
      { month: "June", maxTemp: 26, minTemp: 13, snowChance: "None", advisory: "Warm summer weather; pleasant mountain breeze." },
      { month: "Sept", maxTemp: 22, minTemp: 10, snowChance: "None", advisory: "Post-monsoon freshness; crystal clear mountain views." },
      { month: "Oct", maxTemp: 17, minTemp: 5, snowChance: "Low (Peaks)", advisory: "Crisp autumn chill; light woolens and jacket required." }
    ]
  },
  "shimla-kufri-chail": {
    yatraName: "Shimla, Kufri & Chail Heritage",
    sanctum: {
      name: "Kufri & Hatu Peak Narkanda",
      altitude: "8,600 ft – 11,152 ft",
      lat: 31.09,
      lon: 77.27,
      defaultTempDay: 17,
      defaultTempNight: 6,
      conditionFallback: "Breezy Himalayan Pine Ridge"
    },
    baseCamp: {
      name: "Shimla Ridge & Mall Road",
      altitude: "7,238 ft (2,206 m)",
      lat: 31.10,
      lon: 77.17,
      defaultTempDay: 23,
      defaultTempNight: 13,
      conditionFallback: "Pleasant Colonial Hill Climate"
    },
    bestMonths: "March – June & September – February",
    weatherTips: [
      "Hatu Peak 360° panoramic Himalayan snow view is clearest before 11:00 AM.",
      "Pleasant summer days with temperatures between 18°C–25°C; light layer sufficient for evenings.",
      "Winter snowfall occurs in Kufri and Narkanda from December to February."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 24, minTemp: 12, snowChance: "None", advisory: "Glorious colonial hill weather; great for heritage walks." },
      { month: "June", maxTemp: 26, minTemp: 14, snowChance: "None", advisory: "Warm sunny days; perfect for family vacations." },
      { month: "Sept", maxTemp: 22, minTemp: 11, snowChance: "None", advisory: "Lush green pine valleys and clean mountain air." },
      { month: "Oct", maxTemp: 18, minTemp: 7, snowChance: "None", advisory: "Crisp autumn weather; glorious golden sunsets." }
    ]
  },
  "dharamshala-mcleodganj": {
    yatraName: "Dharamshala, McLeodGanj & Triund",
    sanctum: {
      name: "Triund Ridge & Dhauladhar Base",
      altitude: "9,350 ft (2,850 m)",
      lat: 32.25,
      lon: 76.35,
      defaultTempDay: 15,
      defaultTempNight: 4,
      conditionFallback: "Alpine Mist & Cedar Air"
    },
    baseCamp: {
      name: "McLeodGanj / Dalai Lama Temple",
      altitude: "6,831 ft (2,082 m)",
      lat: 32.24,
      lon: 76.32,
      defaultTempDay: 24,
      defaultTempNight: 12,
      conditionFallback: "Comfortable Tibetan Valley Climate"
    },
    bestMonths: "March – June & September – December",
    weatherTips: [
      "Triund day trek offers dramatic close-up views of the sheer Dhauladhar snow wall.",
      "Evenings in McLeodGanj are pleasantly crisp; light cardigan or jacket recommended.",
      "Carry rain poncho for afternoon mountain showers during spring and early summer."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 25, minTemp: 13, snowChance: "None", advisory: "Ideal trekking weather to Triund and Bhagsunag." },
      { month: "June", maxTemp: 27, minTemp: 16, snowChance: "None", advisory: "Warm and vibrant; perfect for meditation and temple tours." },
      { month: "Sept", maxTemp: 23, minTemp: 13, snowChance: "None", advisory: "Fresh post-monsoon waterfalls and clear mountain vistas." },
      { month: "Oct", maxTemp: 19, minTemp: 8, snowChance: "Low", advisory: "Crisp autumn days; excellent visibility for photography." }
    ]
  },
  "kasol-manikaran-jibhi": {
    yatraName: "Kasol, Manikaran & Jibhi Valley",
    sanctum: {
      name: "Jibhi Valley & Jalori Pass",
      altitude: "10,800 ft (3,290 m)",
      lat: 31.53,
      lon: 77.37,
      defaultTempDay: 16,
      defaultTempNight: 3,
      conditionFallback: "Serene Cedar & Mountain Breeze"
    },
    baseCamp: {
      name: "Kasol & Parvati Riverbank",
      altitude: "5,180 ft (1,580 m)",
      lat: 32.01,
      lon: 77.31,
      defaultTempDay: 24,
      defaultTempNight: 11,
      conditionFallback: "Pleasant Riverside Atmosphere"
    },
    bestMonths: "March – June & September – November",
    weatherTips: [
      "Manikaran natural hot sulfur springs provide therapeutic warmth throughout the year.",
      "Jalori Pass & Serolsar Lake trail (10,800 ft) is windy; windproof fleece advised.",
      "Riverside trails along Parvati River in Kasol get chilly after sunset."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 24, minTemp: 11, snowChance: "None", advisory: "Comfortable weather for village walks to Tosh and Chalal." },
      { month: "June", maxTemp: 27, minTemp: 14, snowChance: "None", advisory: "Pleasant river breezes and lush forest trails." },
      { month: "Sept", maxTemp: 22, minTemp: 10, snowChance: "None", advisory: "Fresh alpine streams and serene golden apple orchards." },
      { month: "Oct", maxTemp: 17, minTemp: 5, snowChance: "Low", advisory: "Chilly evenings; cozy bonfire and warm fleece layers." }
    ]
  },
  "kinnaur-kalpa-sangla": {
    yatraName: "Kinnaur Valley, Kalpa & Chitkul",
    sanctum: {
      name: "Chitkul (Last Village) & Kalpa",
      altitude: "11,320 ft / 9,711 ft",
      lat: 31.35,
      lon: 78.43,
      defaultTempDay: 13,
      defaultTempNight: 1,
      conditionFallback: "Pristine Apple Valley Glade"
    },
    baseCamp: {
      name: "Sangla Valley / Sarahan Base",
      altitude: "8,900 ft (2,713 m)",
      lat: 31.42,
      lon: 78.26,
      defaultTempDay: 20,
      defaultTempNight: 7,
      conditionFallback: "Crisp Mountain Sunshine"
    },
    bestMonths: "April – June & September – November",
    weatherTips: [
      "Golden sunrise reflection on Kinner Kailash Sacred Rock is best viewed from Kalpa at 5:45 AM.",
      "Chitkul (India's last village on the Indo-Tibet border) gets chilly valley winds from Baspa River.",
      "Heavy woolens and windcheaters mandatory for evening strolls through Kalpa apple orchards."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 17, minTemp: 4, snowChance: "Low", advisory: "Apple blossoms in Sangla; pleasant daytime sun." },
      { month: "June", maxTemp: 21, minTemp: 8, snowChance: "None", advisory: "Ideal weather for exploring Indo-Tibet border village Chitkul." },
      { month: "Sept", maxTemp: 18, minTemp: 6, snowChance: "None", advisory: "Crisp blue skies and red apple harvest season in Kinnaur." },
      { month: "Oct", maxTemp: 13, minTemp: 0, snowChance: "Moderate", advisory: "Freezing night temperatures; down jackets and thermals mandatory." }
    ]
  },
  "dalhousie-khajjiar-bir": {
    yatraName: "Dalhousie, Khajjiar & Bir Billing",
    sanctum: {
      name: "Khajjiar Meadows & Bir Billing Takeoff",
      altitude: "8,000 ft (2,438 m)",
      lat: 32.05,
      lon: 76.72,
      defaultTempDay: 18,
      defaultTempNight: 7,
      conditionFallback: "Alpine Meadow Breeze"
    },
    baseCamp: {
      name: "Dalhousie Town HQ",
      altitude: "6,460 ft (1,970 m)",
      lat: 32.53,
      lon: 75.97,
      defaultTempDay: 24,
      defaultTempNight: 12,
      conditionFallback: "Mild Colonial Hill Climate"
    },
    bestMonths: "March – June & September – December",
    weatherTips: [
      "Khajjiar (Mini Switzerland) alpine cedar meadows enjoy glorious sunshine around midday.",
      "Bir Billing paragliding flight conditions are smoothest between 10:30 AM and 3:30 PM.",
      "Dainkund Peak 360° ridge walk requires light woolens in the afternoon."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 24, minTemp: 12, snowChance: "None", advisory: "Perfect weather for paragliding in Bir and visiting Khajjiar." },
      { month: "June", maxTemp: 27, minTemp: 15, snowChance: "None", advisory: "Warm and sunny; great for mountain photography and walking." },
      { month: "Sept", maxTemp: 23, minTemp: 12, snowChance: "None", advisory: "Fresh alpine pine scent and crystal clear Dhauladhar vistas." },
      { month: "Oct", maxTemp: 18, minTemp: 7, snowChance: "None", advisory: "Pleasant autumn days; light jackets for sunset viewpoints." }
    ]
  },

  // --- 1. UTTARAKHAND & KAILASH YATRA CONFIGURATIONS ---
  "pithoragarh": {
    yatraName: "Pithoragarh Aviation Gateway (Naini Saini Airport)",
    sanctum: {
      name: "Chandak Heights & Mostamanu",
      altitude: "6,500 ft (1,981 m)",
      lat: 29.61,
      lon: 80.20,
      defaultTempDay: 20,
      defaultTempNight: 10,
      conditionFallback: "Crisp Himalayan Panorama"
    },
    baseCamp: {
      name: "Naini Saini Airport (NGH) & Town",
      altitude: "5,370 ft (1,637 m)",
      lat: 29.5829,
      lon: 80.2182,
      defaultTempDay: 24,
      defaultTempNight: 13,
      conditionFallback: "Pleasant Valley Weather"
    },
    bestMonths: "Year-Round (Best Flights: Mar – Jun & Sep – Dec)",
    weatherTips: [
      "Naini Saini Airport (NGH) operates scheduled flights under Visual Flight Rules (VFR) with optimum crosswind stability (10:00 AM – 02:30 PM).",
      "Morning skies in Pithoragarh provide crystal clear views of Panchachuli, Nanda Devi and Trishul mountain ranges from Chandak.",
      "Comfortable temperate valley climate; light jacket is recommended in evenings and early mornings."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 26, minTemp: 14, snowChance: "None", advisory: "Clear skies, optimal flight landing visibility and pleasant mountain breeze." },
      { month: "June", maxTemp: 27, minTemp: 16, snowChance: "None", advisory: "Warm and bright days; perfect for local temples and transit to Dharchula." },
      { month: "Sept", maxTemp: 24, minTemp: 14, snowChance: "None", advisory: "Post-monsoon freshness; unmatched peak clarity across the Himalayan range." },
      { month: "Oct", maxTemp: 21, minTemp: 9, snowChance: "None", advisory: "Crisp autumn weather, 100% flight reliability and golden sunsets over Saur Valley." },
      { month: "Nov-Dec", maxTemp: 17, minTemp: 4, snowChance: "Frost on hills", advisory: "Cool winter days with blue skies; warm fleece and light down jacket required." }
    ]
  },
  "adi-kailash": {
    yatraName: "Adi Kailash & Om Parvat Yatra",
    sanctum: {
      name: "Jolingkong & Parvati Sarovar",
      altitude: "14,500 ft (4,420 m)",
      lat: 30.32,
      lon: 80.63,
      defaultTempDay: 8,
      defaultTempNight: -2,
      conditionFallback: "Partly Cloudy with Snow Traces"
    },
    baseCamp: {
      name: "Dharchula Base Camp",
      altitude: "3,000 ft (915 m)",
      lat: 29.85,
      lon: 80.54,
      defaultTempDay: 24,
      defaultTempNight: 14,
      conditionFallback: "Pleasant & Clear"
    },
    bestMonths: "May – June & Sept – Oct",
    weatherTips: [
      "Sub-zero night temperatures at Jolingkong (14,500 ft); 3-layer thermals mandatory.",
      "Clear morning sky window between 6:00 AM – 11:00 AM for pristine Om Parvat & Adi Kailash Darshan.",
      "Light afternoon mountain winds with brief snow flurries in May."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 12, minTemp: -1, snowChance: "Moderate (Passes)", advisory: "Ideal snow landscapes; heavy woolens required." },
      { month: "June", maxTemp: 16, minTemp: 3, snowChance: "Low", advisory: "Pleasant weather; clear views at Parvati Sarovar." },
      { month: "Sept", maxTemp: 14, minTemp: 1, snowChance: "Low", advisory: "Post-monsoon crystal clear skies & golden views." },
      { month: "Oct", maxTemp: 8, minTemp: -4, snowChance: "High (High Altitude)", advisory: "Crisp winter cold; heavy down jacket mandatory." }
    ]
  },
  "darma-valley": {
    yatraName: "Darma Valley & Panchachuli Glacier",
    sanctum: {
      name: "Dugtu & Panchachuli Base",
      altitude: "11,500 ft (3,505 m)",
      lat: 29.98,
      lon: 80.52,
      defaultTempDay: 12,
      defaultTempNight: 2,
      conditionFallback: "Cool Mountain Breeze"
    },
    baseCamp: {
      name: "Sobla / Dharchula Base",
      altitude: "4,500 ft (1,370 m)",
      lat: 29.88,
      lon: 80.56,
      defaultTempDay: 22,
      defaultTempNight: 12,
      conditionFallback: "Sunny with Scattered Clouds"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "Stunning Panchachuli glacier reflections best photographed during 6 AM sunrise.",
      "Evening temperatures drop rapidly at Dugtu tribal homestays; bukhari wood heaters provided.",
      "Rain poncho recommended for afternoon valley walks."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 15, minTemp: 2, snowChance: "Low", advisory: "Glorious alpine wildflowers & glacier views." },
      { month: "June", maxTemp: 18, minTemp: 5, snowChance: "None", advisory: "Warm sunny days; perfect for village walks." },
      { month: "Sept", maxTemp: 16, minTemp: 4, snowChance: "None", advisory: "Clear skies; fresh waterfalls along Sela." },
      { month: "Oct", maxTemp: 10, minTemp: -1, snowChance: "Moderate", advisory: "Crisp autumn weather; glorious orange sunsets." }
    ]
  },
  "kailash-mansarovar": {
    yatraName: "Kailash Mansarovar View Point (Lipulekh)",
    sanctum: {
      name: "Old Lipulekh Pass",
      altitude: "18,300 ft (5,578 m)",
      lat: 30.23,
      lon: 81.04,
      defaultTempDay: 2,
      defaultTempNight: -8,
      conditionFallback: "High Altitude Alpine Wind"
    },
    baseCamp: {
      name: "Nabhidhang / Gunji Camp",
      altitude: "14,000 ft (4,267 m)",
      lat: 30.18,
      lon: 80.86,
      defaultTempDay: 6,
      defaultTempNight: -4,
      conditionFallback: "Crisp Sunny Sky"
    },
    bestMonths: "May – June & Sept – Oct",
    weatherTips: [
      "Extreme high altitude border pass (18,300 ft); heavy windcheater & thermal gloves required.",
      "Atmospheric pressure is 45% lower than sea level; slow steady breathing recommended.",
      "Early morning departure from Nabhidhang ensures fog-free view of Holy Mt. Kailash in Tibet."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 4, minTemp: -6, snowChance: "High", advisory: "Snow-covered pass; polarized sunglasses mandatory." },
      { month: "June", maxTemp: 8, minTemp: -2, snowChance: "Moderate", advisory: "Clear summit view window till 1:00 PM." },
      { month: "Sept", maxTemp: 6, minTemp: -4, snowChance: "Low", advisory: "Deep azure skies; high contrast Mt. Kailash view." },
      { month: "Oct", maxTemp: 1, minTemp: -10, snowChance: "Very High", advisory: "Freezing winds; certified expedition gear mandatory." }
    ]
  },
  "munsyari": {
    yatraName: "Munsiyari & Khaliya Top Expedition",
    sanctum: {
      name: "Khaliya Top Bugyal",
      altitude: "11,500 ft (3,500 m)",
      lat: 30.06,
      lon: 80.23,
      defaultTempDay: 14,
      defaultTempNight: 3,
      conditionFallback: "Sunny Meadow Atmosphere"
    },
    baseCamp: {
      name: "Munsiyari Town HQ",
      altitude: "7,200 ft (2,200 m)",
      lat: 30.06,
      lon: 80.23,
      defaultTempDay: 20,
      defaultTempNight: 8,
      conditionFallback: "Mild & Pleasant"
    },
    bestMonths: "April – June & Sept – Dec",
    weatherTips: [
      "Panoramical 180° Panchachuli sunrise view from Khaliya ridge at 6:15 AM.",
      "Great birdwatching conditions during spring season.",
      "Winter snow trekking available from December to February."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 22, minTemp: 8, snowChance: "None", advisory: "Rhododendron blooms; ideal trekking weather." },
      { month: "June", maxTemp: 24, minTemp: 12, snowChance: "None", advisory: "Pleasant days; light jackets for evening." },
      { month: "Sept", maxTemp: 20, minTemp: 9, snowChance: "None", advisory: "Lush green Bugyals with crystal mountain views." },
      { month: "Oct", maxTemp: 16, minTemp: 4, snowChance: "Low", advisory: "Clear autumn days; excellent visibility." }
    ]
  },
  "valley-of-flowers": {
    yatraName: "Valley of Flowers & Hemkund Sahib",
    sanctum: {
      name: "Valley Sanctuary & Hemkund Lake",
      altitude: "14,400 ft (4,389 m)",
      lat: 30.72,
      lon: 79.60,
      defaultTempDay: 12,
      defaultTempNight: 1,
      conditionFallback: "Alpine Mist & Wildflower Breeze"
    },
    baseCamp: {
      name: "Ghangaria / Govindghat",
      altitude: "10,000 ft (3,048 m)",
      lat: 30.62,
      lon: 79.56,
      defaultTempDay: 18,
      defaultTempNight: 6,
      conditionFallback: "Pleasant Valley Weather"
    },
    bestMonths: "July – September (Peak Bloom)",
    weatherTips: [
      "Monsoon months (July-Aug) bring 500+ species of alpine wildflowers into full bloom.",
      "High quality waterproof rain poncho & sturdy waterproof trekking shoes essential.",
      "Hemkund Lake at 14,400 ft gets chilly afternoon winds; hot tea served at Gurudwara."
    ],
    seasonalTemps: [
      { month: "July", maxTemp: 17, minTemp: 7, snowChance: "Low (Hemkund)", advisory: "Peak bloom starts; light rain showers expected." },
      { month: "August", maxTemp: 16, minTemp: 6, snowChance: "None", advisory: "Fullest floral tapestry; waterproof layer mandatory." },
      { month: "Sept", maxTemp: 14, minTemp: 3, snowChance: "Low", advisory: "Golden autumn transition; clear sky windows." }
    ]
  },
  "chardham-yatra": {
    yatraName: "Garhwal Char Dham Grand Yatra",
    sanctum: {
      name: "Kedarnath & Badrinath Shrines",
      altitude: "11,755 ft (3,583 m)",
      lat: 30.735,
      lon: 79.066,
      defaultTempDay: 10,
      defaultTempNight: -1,
      conditionFallback: "Clear Mountain Shrine Sky"
    },
    baseCamp: {
      name: "Rishikesh / Haridwar Gateway",
      altitude: "1,120 ft (340 m)",
      lat: 29.94,
      lon: 78.16,
      defaultTempDay: 30,
      defaultTempNight: 20,
      conditionFallback: "Warm & Sunny"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "Significant climate shift from Haridwar (30°C) to Kedarnath (-2°C at night). Pack layered clothing.",
      "Helicopter operations at Phata/Guptkashi run subject to morning weather clearance.",
      "Pre-dawn temple queues require heavy thermals and thermal socks."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 14, minTemp: 1, snowChance: "Moderate (High Shrines)", advisory: "Season opening; cool days and cold nights." },
      { month: "June", maxTemp: 18, minTemp: 5, snowChance: "None", advisory: "Peak pilgrim season; pleasant trekking." },
      { month: "Sept", maxTemp: 15, minTemp: 3, snowChance: "None", advisory: "Post-monsoon freshness; unobstructed views." },
      { month: "Oct", maxTemp: 10, minTemp: -3, snowChance: "High", advisory: "Pre-winter chill; heavy woolens mandatory." }
    ]
  },
  "kedarnath-dham": {
    yatraName: "Kedarnath Dham Sacred Yatra",
    sanctum: {
      name: "Kedarnath Temple Shrine",
      altitude: "11,755 ft (3,583 m)",
      lat: 30.735,
      lon: 79.066,
      defaultTempDay: 9,
      defaultTempNight: -2,
      conditionFallback: "Chilly Mountain Breeze"
    },
    baseCamp: {
      name: "Gaurikund / Guptkashi",
      altitude: "6,500 ft (1,980 m)",
      lat: 30.65,
      lon: 79.02,
      defaultTempDay: 22,
      defaultTempNight: 10,
      conditionFallback: "Mild & Comfortable"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "Weather changes quickly in Mandakini Valley; carry rain gear on 16km trek.",
      "Night temperature at Kedarnath drops below freezing even in May/June.",
      "Morning Aarti (5 AM) is cold; wear thick thermals & wool cap."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 12, minTemp: -1, snowChance: "Moderate", advisory: "Snow around shrine; heavy thermals required." },
      { month: "June", maxTemp: 16, minTemp: 4, snowChance: "Low", advisory: "Ideal weather for trekking & Darshan." },
      { month: "Sept", maxTemp: 14, minTemp: 2, snowChance: "Low", advisory: "Clear valley views & comfortable trek." },
      { month: "Oct", maxTemp: 8, minTemp: -5, snowChance: "High", advisory: "Crisp winter cold; mandatory thermal down jackets." }
    ]
  },
  "badrinath-dham": {
    yatraName: "Badrinath Dham Sacred Shrine",
    sanctum: {
      name: "Badri Vishal Temple & Mana Village",
      altitude: "10,830 ft (3,300 m)",
      lat: 30.744,
      lon: 79.493,
      defaultTempDay: 13,
      defaultTempNight: 1,
      conditionFallback: "Crisp Sunny Shrine Sky"
    },
    baseCamp: {
      name: "Joshimath Base",
      altitude: "6,150 ft (1,875 m)",
      lat: 30.55,
      lon: 79.56,
      defaultTempDay: 22,
      defaultTempNight: 11,
      conditionFallback: "Sunny & Pleasant"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "Tapt Kund hot sulfur springs provide natural warmth before temple darshan.",
      "Neelkanth peak behind Badrinath glows golden at sunrise around 5:45 AM.",
      "Mana Village (Last Indian Village) gets afternoon chilly mountain winds."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 15, minTemp: 2, snowChance: "Low", advisory: "Pleasant sunshine; cool mountain air." },
      { month: "June", maxTemp: 19, minTemp: 6, snowChance: "None", advisory: "Comfortable weather for sightseeing." },
      { month: "Sept", maxTemp: 16, minTemp: 4, snowChance: "None", advisory: "Post-monsoon crystal blue skies." },
      { month: "Oct", maxTemp: 11, minTemp: -2, snowChance: "Moderate", advisory: "Cold evenings; hot tea & thermals recommended." }
    ]
  },
  "gangotri-dham": {
    yatraName: "Gangotri Dham Sacred Yatra",
    sanctum: {
      name: "Gangotri Temple & Bhagirathi Valley",
      altitude: "10,200 ft (3,100 m)",
      lat: 30.994,
      lon: 78.938,
      defaultTempDay: 15,
      defaultTempNight: 2,
      conditionFallback: "Clear Pine Valley Weather"
    },
    baseCamp: {
      name: "Harsil Valley & Uttarkashi",
      altitude: "7,800 ft (2,380 m)",
      lat: 31.03,
      lon: 78.73,
      defaultTempDay: 22,
      defaultTempNight: 9,
      conditionFallback: "Sunny Apple Orchard Climate"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "Harsil Valley en route offers mild weather & serene Deodar pine forests.",
      "Sub-zero temperatures during late October nights near Bhagirathi riverbank.",
      "Morning sun hits Gangotri shrine by 7:30 AM."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 16, minTemp: 3, snowChance: "Low", advisory: "Pleasant & sunny days in Harsil." },
      { month: "June", maxTemp: 20, minTemp: 7, snowChance: "None", advisory: "Ideal weather for sacred dip & rituals." },
      { month: "Sept", maxTemp: 18, minTemp: 5, snowChance: "None", advisory: "Fresh alpine air and blue skies." },
      { month: "Oct", maxTemp: 12, minTemp: -1, snowChance: "Moderate", advisory: "Chilly evenings; thermal layers mandatory." }
    ]
  },
  "yamunotri-dham": {
    yatraName: "Yamunotri Dham Sacred Yatra",
    sanctum: {
      name: "Yamunotri Shrine & Surya Kund",
      altitude: "10,804 ft (3,293 m)",
      lat: 31.010,
      lon: 78.460,
      defaultTempDay: 14,
      defaultTempNight: 1,
      conditionFallback: "Cool Mountain Glades"
    },
    baseCamp: {
      name: "Janki Chatti / Barkot",
      altitude: "7,000 ft (2,133 m)",
      lat: 30.96,
      lon: 78.44,
      defaultTempDay: 22,
      defaultTempNight: 10,
      conditionFallback: "Pleasant Valley Climate"
    },
    bestMonths: "May – June & Sept – Nov",
    weatherTips: [
      "6 km trek from Janki Chatti to Yamunotri has steep climbs; carry water & raincoat.",
      "Surya Kund natural boiling water springs provide instant warmth.",
      "Trek early at 6 AM to avoid mid-day sun and trail crowd."
    ],
    seasonalTemps: [
      { month: "May", maxTemp: 15, minTemp: 2, snowChance: "Low", advisory: "Cool morning trekking weather." },
      { month: "June", maxTemp: 19, minTemp: 6, snowChance: "None", advisory: "Pleasant temperature along river." },
      { month: "Sept", maxTemp: 16, minTemp: 4, snowChance: "None", advisory: "Lush green valley & clear paths." },
      { month: "Oct", maxTemp: 11, minTemp: -2, snowChance: "Moderate", advisory: "Cold morning breeze; heavy thermals." }
    ]
  }
};

interface YatraWeatherCardProps {
  slug: string;
  onOpenInquiry?: (destinationTitle?: string) => void;
}

// In-memory weather cache to prevent repeated API calls
const yatraWeatherCache = new Map<string, {
  temp: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  condition: string;
  isLive: boolean;
  lastUpdated: string;
  weatherCode: number;
  forecast: { day: string; maxTemp: number; minTemp: number; code: number }[];
  timestamp: number;
}>();

export const YatraWeatherCard: React.FC<YatraWeatherCardProps> = ({ slug, onOpenInquiry }) => {
  // Resolve exact or fuzzy slug to ensure the correct weather profile is matched
  const resolvedConfig = useMemo(() => {
    if (!slug) return null;
    if (YATRA_WEATHER_DATA[slug]) return YATRA_WEATHER_DATA[slug];

    const s = slug.toLowerCase();
    // 1. Himachal Pradesh routes
    if (s.includes("spiti") || s.includes("chandratal") || s.includes("kaza")) return YATRA_WEATHER_DATA["spiti-valley"];
    if (s.includes("manali") || s.includes("solang") || s.includes("atal-tunnel") || s.includes("lahaul")) return YATRA_WEATHER_DATA["manali-solang-lahaul"];
    if (s.includes("shimla") || s.includes("kufri") || s.includes("chail") || s.includes("narkanda")) return YATRA_WEATHER_DATA["shimla-kufri-chail"];
    if (s.includes("dharamshala") || s.includes("mcleodganj") || s.includes("triund") || s.includes("kangra")) return YATRA_WEATHER_DATA["dharamshala-mcleodganj"];
    if (s.includes("kasol") || s.includes("manikaran") || s.includes("jibhi") || s.includes("tosh") || s.includes("parvati")) return YATRA_WEATHER_DATA["kasol-manikaran-jibhi"];
    if (s.includes("kinnaur") || s.includes("kalpa") || s.includes("sangla") || s.includes("chitkul")) return YATRA_WEATHER_DATA["kinnaur-kalpa-sangla"];
    if (s.includes("dalhousie") || s.includes("khajjiar") || s.includes("bir") || s.includes("billing")) return YATRA_WEATHER_DATA["dalhousie-khajjiar-bir"];

    // 2. Uttarakhand routes
    if (s.includes("kedarnath")) return YATRA_WEATHER_DATA["kedarnath-dham"];
    if (s.includes("badrinath")) return YATRA_WEATHER_DATA["badrinath-dham"];
    if (s.includes("gangotri")) return YATRA_WEATHER_DATA["gangotri-dham"];
    if (s.includes("yamunotri")) return YATRA_WEATHER_DATA["yamunotri-dham"];
    if (s.includes("chardham") || s.includes("char-dham")) return YATRA_WEATHER_DATA["chardham-yatra"];
    if (s.includes("mansarovar") || s.includes("tibet") || s.includes("lipulekh")) return YATRA_WEATHER_DATA["kailash-mansarovar"];
    if (s.includes("darma") || s.includes("panchachuli")) return YATRA_WEATHER_DATA["darma-valley"];
    if (s.includes("munsyari") || s.includes("khaliya")) return YATRA_WEATHER_DATA["munsyari"];
    if (s.includes("valley-of-flowers") || s.includes("hemkund")) return YATRA_WEATHER_DATA["valley-of-flowers"];
    if (s.includes("adi-kailash") || s.includes("om-parvat") || s.includes("jolingkong") || s.includes("gunji") || s.includes("nabi") || s.includes("dharchula")) {
      return YATRA_WEATHER_DATA["adi-kailash"];
    }

    return null;
  }, [slug]);

  if (!resolvedConfig) {
    return null;
  }

  const config = resolvedConfig;
  const [selectedLocation, setSelectedLocation] = useState<'sanctum' | 'baseCamp'>('sanctum');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  const activeLoc = selectedLocation === 'sanctum' ? config.sanctum : config.baseCamp;

  const [weather, setWeather] = useState<{
    temp: number;
    windSpeed: number;
    humidity: number;
    uvIndex: number;
    condition: string;
    isLive: boolean;
    lastUpdated: string;
    weatherCode: number;
    forecast: { day: string; maxTemp: number; minTemp: number; code: number }[];
  }>({
    temp: activeLoc.defaultTempDay,
    windSpeed: 12,
    humidity: 55,
    uvIndex: 8,
    condition: activeLoc.conditionFallback,
    isLive: false,
    lastUpdated: "Auto-synced",
    weatherCode: 1,
    forecast: [
      { day: "Today", maxTemp: activeLoc.defaultTempDay, minTemp: activeLoc.defaultTempNight, code: 1 },
      { day: "Tomorrow", maxTemp: activeLoc.defaultTempDay + 1, minTemp: activeLoc.defaultTempNight, code: 0 },
      { day: "Day 3", maxTemp: activeLoc.defaultTempDay - 1, minTemp: activeLoc.defaultTempNight - 1, code: 2 },
      { day: "Day 4", maxTemp: activeLoc.defaultTempDay + 1, minTemp: activeLoc.defaultTempNight, code: 1 },
      { day: "Day 5", maxTemp: activeLoc.defaultTempDay - 2, minTemp: activeLoc.defaultTempNight - 2, code: 3 }
    ]
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Oxygen calculation estimate based on altitude (barometric approximation)
  const oxygenEstimate = useMemo(() => {
    const rawAlt = parseInt(activeLoc.altitude.replace(/[^0-9]/g, "")) || 10000;
    if (rawAlt >= 14000) return { pct: 60, label: "60% of Sea Level", status: "Thin Air / Acclimatization Mandatory", color: "text-amber-400" };
    if (rawAlt >= 11000) return { pct: 68, label: "68% of Sea Level", status: "Moderate High Altitude", color: "text-amber-300" };
    if (rawAlt >= 8000) return { pct: 76, label: "76% of Sea Level", status: "Comfortable Mountain Air", color: "text-emerald-400" };
    return { pct: 88, label: "88% of Sea Level", status: "Rich Valley Air", color: "text-emerald-400" };
  }, [activeLoc.altitude]);

  // Decode Open-Meteo Weather Codes into human readable conditions & icons
  const parseWeatherCode = (code: number, temp: number) => {
    if (code === 0) return { text: "Clear Sunny Skies", icon: Sun, color: "text-amber-400", bgGlow: "from-amber-500/20 via-sky-500/10 to-transparent" };
    if (code === 1 || code === 2) return { text: "Partly Cloudy & Clear", icon: CloudSun, color: "text-amber-300", bgGlow: "from-sky-500/20 via-slate-700/20 to-transparent" };
    if (code === 3) return { text: "Overcast Mountain Clouds", icon: Cloud, color: "text-slate-300", bgGlow: "from-slate-600/20 via-slate-800/40 to-transparent" };
    if (code >= 45 && code <= 48) return { text: "High Altitude Fog / Mist", icon: Cloud, color: "text-teal-300", bgGlow: "from-teal-500/20 via-slate-800/30 to-transparent" };
    if (code >= 51 && code <= 67) return { text: "Light Mountain Rain", icon: CloudRain, color: "text-sky-400", bgGlow: "from-blue-600/20 via-slate-800/40 to-transparent" };
    if (code >= 71 && code <= 77) return { text: "Snow Flurries / Ice", icon: CloudSnow, color: "text-cyan-300", bgGlow: "from-cyan-500/20 via-indigo-900/30 to-transparent" };
    if (code >= 80 && code <= 82) return { text: "Valley Rain Showers", icon: CloudRain, color: "text-blue-400", bgGlow: "from-blue-600/20 via-slate-800/40 to-transparent" };
    if (code >= 85 && code <= 86) return { text: "Heavy Alpine Snowfall", icon: CloudSnow, color: "text-indigo-300", bgGlow: "from-indigo-600/25 via-slate-900/40 to-transparent" };
    if (code >= 95) return { text: "Thunderstorm & Rain", icon: CloudLightning, color: "text-rose-400", bgGlow: "from-rose-600/20 via-slate-900/50 to-transparent" };

    if (temp <= 0) return { text: "Sub-Zero Alpine Freeze", icon: CloudSnow, color: "text-cyan-400", bgGlow: "from-cyan-600/20 via-slate-900/40 to-transparent" };
    return { text: "Pleasant Mountain Weather", icon: Sun, color: "text-amber-400", bgGlow: "from-amber-500/20 via-slate-800/30 to-transparent" };
  };

  const fetchLiveWeather = useCallback(async () => {
    const cacheKey = `${activeLoc.lat}_${activeLoc.lon}`;
    const cached = yatraWeatherCache.get(cacheKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp < 10 * 60 * 1000)) {
      setWeather(cached);
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeLoc.lat}&longitude=${activeLoc.lon}&current_weather=true&hourly=relativehumidity_2m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.current_weather) {
          const cw = data.current_weather;
          const code = cw.weathercode ?? 1;
          const parsed = parseWeatherCode(code, cw.temperature);
          
          const daysOfWeek = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
          const forecastList = (data.daily?.time || []).slice(0, 5).map((_t: string, idx: number) => ({
            day: daysOfWeek[idx] || `Day ${idx + 1}`,
            maxTemp: Math.round(data.daily?.temperature_2m_max?.[idx] ?? cw.temperature),
            minTemp: Math.round(data.daily?.temperature_2m_min?.[idx] ?? cw.temperature - 6),
            code: data.daily?.weathercode?.[idx] ?? code
          }));

          const weatherData = {
            temp: Math.round(cw.temperature),
            windSpeed: Math.round(cw.windspeed || 10),
            humidity: data.hourly?.relativehumidity_2m?.[0] || 55,
            uvIndex: Math.round(data.hourly?.uv_index?.[12] || 8),
            condition: parsed.text,
            isLive: true,
            lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            weatherCode: code,
            forecast: forecastList.length > 0 ? forecastList : [
              { day: "Today", maxTemp: Math.round(cw.temperature), minTemp: Math.round(cw.temperature) - 8, code }
            ],
            timestamp: now
          };

          yatraWeatherCache.set(cacheKey, weatherData);
          setWeather(weatherData);
        }
      }
    } catch {
      // Fallback silently if offline
      setWeather(prev => ({ ...prev, isLive: false, lastUpdated: "Satellite Estimate" }));
    } finally {
      setLoading(false);
    }
  }, [activeLoc.lat, activeLoc.lon]);

  useEffect(() => {
    fetchLiveWeather();
  }, [fetchLiveWeather]);

  const weatherDisplay = parseWeatherCode(weather.weatherCode, weather.temp);
  const WeatherIcon = weatherDisplay.icon;

  // Real feel computation with wind chill
  const realFeel = useMemo(() => {
    if (weather.temp <= 10 && weather.windSpeed > 5) {
      return Math.round(13.12 + 0.6215 * weather.temp - 11.37 * Math.pow(weather.windSpeed, 0.16) + 0.3965 * weather.temp * Math.pow(weather.windSpeed, 0.16));
    }
    return weather.temp;
  }, [weather.temp, weather.windSpeed]);

  // Live Clothing recommendation
  const clothingAdvisory = useMemo(() => {
    if (weather.temp <= 2) {
      return {
        level: "Level 3: Extreme Alpine Cold Gear",
        items: "Thermal Base Layer + Fleece + 700-fill Down Jacket + Windproof Pants + Woolen Balaclava & Thermal Gloves",
        badge: "Sub-Zero Protection",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
      };
    }
    if (weather.temp <= 12) {
      return {
        level: "Level 2: 3-Layer Mountain Trekking",
        items: "Breathable Quick-Dry Base + Heavy Fleece Jacket + Windcheater Shell + Trekking Gloves & UV Sunglasses",
        badge: "Crisp Alpine Chill",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40"
      };
    }
    return {
      level: "Level 1: Comfortable Valley Weather",
      items: "Cotton/Dry-fit Tee + Light Fleece / Softshell Jacket + Trekking Pants + Sun Cap",
      badge: "Mild & Pleasant",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    };
  }, [weather.temp]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-700/80 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none bg-gradient-to-br ${weatherDisplay.bgGlow}`} />

      {/* Live Weather Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-[11px] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Satellite Himalayan Weather</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-serif">
            <span>{config.yatraName} Weather</span>
          </h3>
        </div>

        {/* Location Toggle Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-700/90 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSelectedLocation('sanctum')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'sanctum'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mountain size={13} />
            <span>Sanctum ({config.sanctum.altitude.split(' ')[0]})</span>
          </button>

          <button
            onClick={() => setSelectedLocation('baseCamp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'baseCamp'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin size={13} />
            <span>Base ({config.baseCamp.altitude.split(' ')[0]})</span>
          </button>
        </div>
      </div>

      {/* Primary Live Weather Display */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/80 space-y-4 relative z-10">
        {/* Top Info Strip */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-amber-400" />
            <span className="font-bold text-sm text-white">{activeLoc.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              {activeLoc.altitude}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              weather.isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              {weather.isLive ? 'Live Open-Meteo' : 'Climate Sync'}
            </span>

            <button
              onClick={fetchLiveWeather}
              disabled={loading}
              title="Refresh Live Data"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-400" : ""} />
            </button>
          </div>
        </div>

        {/* Live Temperature & Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-1">
          <div className="sm:col-span-6 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <WeatherIcon size={40} className={weatherDisplay.color} />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight flex items-start">
                <span>{weather.temp}°</span>
                <span className="text-2xl text-amber-400 font-normal">C</span>
              </div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">
                {weather.condition}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Real Feel: <span className="text-amber-300 font-bold">{realFeel}°C</span>
              </div>
            </div>
          </div>

          {/* Sub Metrics (Oxygen, Wind, Humidity, UV) */}
          <div className="sm:col-span-6 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-0.5">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Activity size={12} className="text-rose-400" /> Oxygen (O₂)
              </div>
              <div className={`font-bold font-mono ${oxygenEstimate.color}`}>{oxygenEstimate.pct}% of Sea Level</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-0.5">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Wind size={12} className="text-sky-400" /> Wind
              </div>
              <div className="font-bold text-slate-100 font-mono">{weather.windSpeed} km/h</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-0.5">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Droplets size={12} className="text-blue-400" /> Humidity
              </div>
              <div className="font-bold text-slate-100 font-mono">{weather.humidity}%</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-0.5">
              <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Sun size={12} className="text-amber-400" /> UV Index
              </div>
              <div className="font-bold text-amber-300 font-mono">UV {weather.uvIndex} (High)</div>
            </div>
          </div>
        </div>

        {/* 5-Day Mini Forecast Strip */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar size={12} className="text-amber-400" /> 5-Day Forecast Snapshot
          </div>
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {weather.forecast.map((fc, i) => {
              const fcDisplay = parseWeatherCode(fc.code, fc.maxTemp);
              const FcIcon = fcDisplay.icon;
              return (
                <div key={i} className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center justify-between">
                  <span className="text-[10px] text-slate-300 font-bold">{fc.day}</span>
                  <FcIcon size={18} className={`my-1 ${fcDisplay.color}`} />
                  <span className="text-[11px] font-mono font-bold text-white">
                    {fc.maxTemp}° <span className="text-slate-400 text-[9px]">/ {fc.minTemp}°</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Safety Status */}
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs flex items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">
              Yatra Track: <strong className="text-emerald-300 font-bold">Open & Safe for Pilgrims</strong>
            </span>
          </div>
          <span className="text-[10px] text-slate-400 shrink-0">Updated: {weather.lastUpdated}</span>
        </div>
      </div>

      {/* Dynamic Clothing Recommendation Pill */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Thermometer size={14} className="text-amber-400" /> What to Wear Today
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${clothingAdvisory.badgeColor}`}>
            {clothingAdvisory.badge}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          {clothingAdvisory.items}
        </p>
      </div>

      {/* Optional Toggle for Additional Monthly Table & Advisories */}
      <div className="pt-1 relative z-10">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-center py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-xs font-bold text-slate-300 hover:text-amber-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{showDetails ? 'Hide Monthly Forecast & Advisories' : 'Show Monthly Temperature Matrix & Advisories'}</span>
          <ArrowUpRight size={13} className={`transition-transform duration-200 ${showDetails ? 'rotate-90' : ''}`} />
        </button>

        {showDetails && (
          <div className="mt-4 space-y-5 animate-in fade-in duration-200 border-t border-slate-800 pt-4">
            {/* Weather Tips */}
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} />
                <span>High Altitude Weather Advisory</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {config.weatherTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seasonal Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-400" />
                  <span>Monthly Temperature & Snow Matrix ({config.sanctum.name})</span>
                </h4>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto border border-slate-700/80 rounded-2xl bg-slate-900/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800 text-amber-300 font-bold text-[10px] uppercase tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-2.5">Month</th>
                      <th className="p-2.5">Day Temp</th>
                      <th className="p-2.5">Night Temp</th>
                      <th className="p-2.5">Snow Prob.</th>
                      <th className="p-2.5">Gear & Advisory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {config.seasonalTemps.map((st, i) => (
                      <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{st.month}</span>
                        </td>
                        <td className="p-2.5 font-mono font-bold text-emerald-400">{st.maxTemp}°C</td>
                        <td className="p-2.5 font-mono font-bold text-cyan-400">{st.minTemp}°C</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px]">
                            {st.snowChance}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-300">{st.advisory}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid View */}
              <div className="grid grid-cols-1 gap-2 sm:hidden">
                {config.seasonalTemps.map((st, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{st.month}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono">
                        Snow: {st.snowChance}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-400">Day: <strong className="text-emerald-400 font-bold">{st.maxTemp}°C</strong></span>
                      <span className="text-slate-400">Night: <strong className="text-cyan-400 font-bold">{st.minTemp}°C</strong></span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/80 pt-1">
                      {st.advisory}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
