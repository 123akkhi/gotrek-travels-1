/**
 * GoTrek Offline Trek Storage & Elevation Cache
 * 
 * Provides local storage persistence and offline cache management for:
 * 1. Route Map waypoints & Day-by-Day coordinates
 * 2. Altitude charts & oxygen level profiles
 * 3. Emergency SOS contacts & ITBP checkpost directories
 * 4. Acclimatization guidelines for high altitude (10,000 ft - 15,000 ft)
 */

export interface TrekCheckpoint {
  id: string;
  name: string;
  altitudeFt: number;
  altitudeM: number;
  distanceFromStartKm: number;
  day: number;
  latitude: number;
  longitude: number;
  oxygenLevelPercent: number;
  networkStatus: 'Strong 4G (Airtel/Jio)' | 'Intermittent BSNL/Jio' | 'Satellite / SOS Only' | 'No Signal (Blackout Zone)';
  acclimatizationZone: 'Green (Low)' | 'Yellow (Moderate)' | 'Orange (High Altitude)' | 'Red (Alpine Alert)';
  permitRequired: boolean;
  medicalFacility: string;
  highlights: string[];
  tips: string;
}

export interface OfflineTrekData {
  version: string;
  cachedAt: string;
  title: string;
  totalDistanceKm: number;
  maxAltitudeFt: number;
  startingPoint: string;
  highestPoint: string;
  checkpoints: TrekCheckpoint[];
  itinerarySummary: {
    day: number;
    title: string;
    route: string;
    altitude: string;
    distance: string;
    stay: string;
    keySafetyNote: string;
  }[];
  emergencyDirectory: {
    title: string;
    contact: string;
    location: string;
    notes: string;
  }[];
  amsSafetyGuidelines: {
    rule: string;
    detail: string;
  }[];
}

const STORAGE_KEY = 'gotrek_offline_trek_pack_v1';
const CACHE_STATUS_KEY = 'gotrek_trek_cache_status';

export const DEFAULT_OFFLINE_TREK_DATA: OfflineTrekData = {
  version: '1.2',
  cachedAt: new Date().toISOString(),
  title: 'Adi Kailash & Om Parvat Sacred Vyas Valley Circuit',
  totalDistanceKm: 420,
  maxAltitudeFt: 14900,
  startingPoint: 'Kathgodam / Haldwani (1,700 ft)',
  highestPoint: 'Parvati Sarovar & Gauri Kund (14,900 ft)',
  checkpoints: [
    {
      id: 'cp-kathgodam',
      name: 'Kathgodam / Haldwani Railhead',
      altitudeFt: 1700,
      altitudeM: 518,
      distanceFromStartKm: 0,
      day: 1,
      latitude: 29.2731,
      longitude: 79.5312,
      oxygenLevelPercent: 96,
      networkStatus: 'Strong 4G (Airtel/Jio)',
      acclimatizationZone: 'Green (Low)',
      permitRequired: false,
      medicalFacility: 'Base Multispeciality Hospitals (Haldwani / Kathgodam)',
      highlights: ['Foothills of Kumaon', 'Railhead and Gateway', 'Vehicle assembly point'],
      tips: 'Drink 2-3 liters of water before driving up the winding mountain roads.'
    },
    {
      id: 'cp-kainchi',
      name: 'Kainchi Dham (Neem Karoli Baba)',
      altitudeFt: 4600,
      altitudeM: 1402,
      distanceFromStartKm: 45,
      day: 1,
      latitude: 29.4265,
      longitude: 79.5165,
      oxygenLevelPercent: 91,
      networkStatus: 'Strong 4G (Airtel/Jio)',
      acclimatizationZone: 'Green (Low)',
      permitRequired: false,
      medicalFacility: 'Bhowali CHC Clinic',
      highlights: ['World-famous Neem Karoli Baba Ashram', 'Hanuman Chalisa recitation', 'Spiritual grounding'],
      tips: 'Mandatory peaceful halt for spiritual blessing before entering high Himalayas.'
    },
    {
      id: 'cp-dharchula',
      name: 'Dharchula Base Camp (Kali River Border)',
      altitudeFt: 3000,
      altitudeM: 914,
      distanceFromStartKm: 275,
      day: 1,
      latitude: 29.8491,
      longitude: 80.5367,
      oxygenLevelPercent: 92,
      networkStatus: 'Strong 4G (Airtel/Jio)',
      acclimatizationZone: 'Green (Low)',
      permitRequired: true,
      medicalFacility: 'Dharchula Sub-District Hospital & GoTrek Oxygen Center',
      highlights: ['SDM Inner Line Permit Verification', 'Dharchula suspension bridge', '4x4 Bolero convoy assembly'],
      tips: 'Keep 4 passport photos and physical Aadhar copies ready for SDM endorsement.'
    },
    {
      id: 'cp-pangla',
      name: 'Pangla & Garbyang (ITBP First Post)',
      altitudeFt: 7200,
      altitudeM: 2194,
      distanceFromStartKm: 320,
      day: 2,
      latitude: 30.0125,
      longitude: 80.6841,
      oxygenLevelPercent: 82,
      networkStatus: 'Intermittent BSNL/Jio',
      acclimatizationZone: 'Yellow (Moderate)',
      permitRequired: true,
      medicalFacility: 'ITBP First Aid Post Pangla',
      highlights: ['Beginning of deep Kali gorge', 'Garbyang "sinking village" geological wonder', 'ITBP verification'],
      tips: 'Begin Diamox (if prescribed by your physician) after passing 7,000 ft.'
    },
    {
      id: 'cp-chialekh',
      name: 'Chialekh Pass (Alpine Gateway)',
      altitudeFt: 9800,
      altitudeM: 2987,
      distanceFromStartKm: 338,
      day: 2,
      latitude: 30.1245,
      longitude: 80.7512,
      oxygenLevelPercent: 74,
      networkStatus: 'Satellite / SOS Only',
      acclimatizationZone: 'Orange (High Altitude)',
      permitRequired: true,
      medicalFacility: 'ITBP Checkpost Chialekh Post',
      highlights: ['Dramatic alpine flower meadows', 'Gateway to the sacred Vyas Valley', 'Stunning peak vistas'],
      tips: 'Wear a windbreaker jacket as sudden icy gusts blow across the pass ridge.'
    },
    {
      id: 'cp-gunji',
      name: 'Gunji Village & Military Headquarters',
      altitudeFt: 10500,
      altitudeM: 3200,
      distanceFromStartKm: 350,
      day: 2,
      latitude: 30.1772,
      longitude: 80.8415,
      oxygenLevelPercent: 70,
      networkStatus: 'Intermittent BSNL/Jio',
      acclimatizationZone: 'Orange (High Altitude)',
      permitRequired: true,
      medicalFacility: 'ITBP 7th Battalion Base Hospital (Oxygen & Hyperbaric Bag)',
      highlights: ['Convergence of Kuthi & Kali rivers', 'Ancient trading junction on Kailash route', 'Acclimatization halt'],
      tips: 'Walk at half your normal pace. Keep pulse oximeter handy; normal SpO2 at Gunji is 85-92%.'
    },
    {
      id: 'cp-nabi',
      name: 'Nabi Heritage Homestay Village',
      altitudeFt: 10800,
      altitudeM: 3291,
      distanceFromStartKm: 355,
      day: 2,
      latitude: 30.1912,
      longitude: 80.8654,
      oxygenLevelPercent: 68,
      networkStatus: 'Intermittent BSNL/Jio',
      acclimatizationZone: 'Orange (High Altitude)',
      permitRequired: true,
      medicalFacility: 'GoTrek Mobile Medical Kit & Nabi Rung Health Post',
      highlights: ['Rung tribal architecture with intricate woodwork', 'Sattvik homestay food', 'Local folk lore evening'],
      tips: 'Drink hot ginger-tulsi water provided at the homestay. Avoid heavy or oily dinners.'
    },
    {
      id: 'cp-jolingkong',
      name: 'Jolingkong Base Camp (Adi Kailash Base)',
      altitudeFt: 14500,
      altitudeM: 4420,
      distanceFromStartKm: 385,
      day: 3,
      latitude: 30.3156,
      longitude: 80.6421,
      oxygenLevelPercent: 58,
      networkStatus: 'No Signal (Blackout Zone)',
      acclimatizationZone: 'Red (Alpine Alert)',
      permitRequired: true,
      medicalFacility: 'ITBP Jolingkong Forward Medical Shelter',
      highlights: ['Frontal view of Chhota Kailash (Adi Kailash)', 'Shiva-Parvati Temple', 'Kunti Parvat & Pandav Fort'],
      tips: 'Strictly maintain warm layered clothing: thermal inner + fleece + down feather jacket + balaclava.'
    },
    {
      id: 'cp-parvati-sarovar',
      name: 'Parvati Sarovar & Gauri Kund',
      altitudeFt: 14900,
      altitudeM: 4541,
      distanceFromStartKm: 388,
      day: 3,
      latitude: 30.3245,
      longitude: 80.6385,
      oxygenLevelPercent: 57,
      networkStatus: 'No Signal (Blackout Zone)',
      acclimatizationZone: 'Red (Alpine Alert)',
      permitRequired: true,
      medicalFacility: 'GoTrek Lead Guide Portable O2 Canister',
      highlights: ['Sacred mirror-reflection of Adi Kailash in turquoise waters', 'Gauri Kund glacier', 'Holy jal collection'],
      tips: 'Do not rush uphill. Take 3 deep breaths every 15 steps during the walk around the lake.'
    },
    {
      id: 'cp-nabhidhang',
      name: 'Nabhidhang (Om Parvat Viewpoint)',
      altitudeFt: 14000,
      altitudeM: 4267,
      distanceFromStartKm: 383,
      day: 4,
      latitude: 30.2289,
      longitude: 80.9982,
      oxygenLevelPercent: 60,
      networkStatus: 'No Signal (Blackout Zone)',
      acclimatizationZone: 'Red (Alpine Alert)',
      permitRequired: true,
      medicalFacility: 'ITBP Nabhidhang Checkpost Camp',
      highlights: ['Sunrise viewing of natural snow ॐ symbol on Om Parvat', 'Kali Mandir Kalapani', 'Vyas Cave (Vyas Gufa)'],
      tips: 'Arrive by 5:30 AM before clouds drift in to catch the crystal golden sunrise on the OM rockface.'
    }
  ],
  itinerarySummary: [
    {
      day: 1,
      title: 'Arrival & Scenic Drive to Dharchula',
      route: 'Kathgodam → Kainchi Dham → Almora → Dharchula',
      altitude: '1,700 ft → 3,000 ft',
      distance: '275 km',
      stay: 'Hotel / Guesthouse in Dharchula',
      keySafetyNote: 'Physical verification of ILP documents & medical fitness certificates at SDM camp.'
    },
    {
      day: 2,
      title: '4x4 Ascent through Vyas Valley',
      route: 'Dharchula → Pangla → Chialekh Pass → Gunji / Nabi',
      altitude: '3,000 ft → 10,800 ft (Rapid Ascent)',
      distance: '75 km',
      stay: 'Traditional Rung Homestay in Nabi / Gunji',
      keySafetyNote: 'Major altitude gain. Stay well hydrated, avoid sudden sprints, and rest early.'
    },
    {
      day: 3,
      title: 'Sacred Adi Kailash & Parvati Sarovar Darshan',
      route: 'Nabi → Kuthi Village → Jolingkong → Parvati Sarovar',
      altitude: '10,800 ft → 14,900 ft',
      distance: '35 km drive + 2 km walk',
      stay: 'Homestay in Nabi / Gunji',
      keySafetyNote: 'Wear minimum 3 thermal layers + windproof gloves. Oxygen drops to 57%.'
    },
    {
      day: 4,
      title: 'Sunrise Om Parvat Darshan & Kalapani',
      route: 'Nabi → Kalapani Kali Temple → Nabhidhang → Dharchula',
      altitude: '10,800 ft → 14,000 ft → 3,000 ft',
      distance: '100 km',
      stay: 'Hotel in Dharchula',
      keySafetyNote: 'Early 4:30 AM departure for best sunrise view. Descent relieves altitude stress.'
    },
    {
      day: 5,
      title: 'En Route Spiritual Wonders to Kathgodam',
      route: 'Dharchula → Patal Bhuvaneshwar → Jageshwar Dham → Kathgodam',
      altitude: '3,000 ft → 1,700 ft',
      distance: '280 km',
      stay: 'Drop at Kathgodam Railway Station / Delhi Volvo',
      keySafetyNote: 'Concluding holy yatra with darshan at 124 Jyotirlinga temples in Jageshwar.'
    }
  ],
  emergencyDirectory: [
    {
      title: 'ITBP Medical Headquarters Gunji',
      contact: 'HF Radio / VHF Channel 4 (via GoTrek Guide)',
      location: 'Gunji Military Camp (Vyas Valley)',
      notes: 'Hyperbaric oxygen bag, high altitude emergency doctors, and helipad evacuation point.'
    },
    {
      title: 'Sub-Divisional Magistrate (SDM) Dharchula',
      contact: '05967-222223 / +91-5967-222044',
      location: 'SDM Office Complex, Dharchula',
      notes: 'Civil administrative clearance, disaster monitoring & Inner Line Permit authority.'
    },
    {
      title: 'Uttarakhand 108 Emergency Ambulance Helpline',
      contact: '108 / 112 (National Emergency)',
      location: 'Pithoragarh District Command Center',
      notes: 'Dispatches high-terrain 4x4 life-support ambulances on Pithoragarh–Dharchula road.'
    },
    {
      title: 'GoTrek 24/7 Operations Base Control',
      contact: '+91 94111 02888 / +91 89795 24000',
      location: 'GoTrek Base Office, Main Market Dharchula',
      notes: 'Direct liaison with all vehicle drivers, satellite radios, and homestay coordinators.'
    }
  ],
  amsSafetyGuidelines: [
    {
      rule: 'Hydration Protocol',
      detail: 'Drink 4-5 liters of fluids daily (warm water, ginger tea, or ORS). High altitude causes rapid respiratory water loss.'
    },
    {
      rule: 'Ascent Rate & Rest',
      detail: 'Do not rush uphill. Follow the golden rule: "Climb high, sleep low". Never run or jog above 10,000 ft.'
    },
    {
      rule: 'Warning Symptoms (AMS)',
      detail: 'Persistent throbbing headache, nausea, dizziness, insomnia, or loss of appetite. Notify your GoTrek trek leader immediately.'
    },
    {
      rule: 'Emergency Protocol',
      detail: 'If symptoms do not subside within 2 hours or if shortness of breath persists at rest: immediate descent by 2,000-3,000 ft with supplementary oxygen.'
    }
  ]
};

/**
 * Saves or updates offline trek data in localStorage and cache
 */
export function saveTrekDataOffline(data: OfflineTrekData = DEFAULT_OFFLINE_TREK_DATA): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(CACHE_STATUS_KEY, JSON.stringify({
      isCached: true,
      timestamp: new Date().toISOString(),
      itemCount: data.checkpoints.length,
      version: data.version
    }));
    return true;
  } catch (error) {
    console.error('[GoTrek Offline Storage] Failed to write cache:', error);
    return false;
  }
}

/**
 * Reads offline trek data from localStorage with fallback to default
 */
export function getOfflineTrekData(): OfflineTrekData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Auto-populate on first read
      saveTrekDataOffline(DEFAULT_OFFLINE_TREK_DATA);
      return DEFAULT_OFFLINE_TREK_DATA;
    }
    return JSON.parse(raw) as OfflineTrekData;
  } catch (error) {
    console.warn('[GoTrek Offline Storage] Failed to parse cached data, using default:', error);
    return DEFAULT_OFFLINE_TREK_DATA;
  }
}

/**
 * Returns cache status metadata
 */
export function getOfflineCacheStatus(): { isCached: boolean; timestamp?: string; version?: string } {
  try {
    const raw = localStorage.getItem(CACHE_STATUS_KEY);
    if (!raw) {
      return { isCached: false };
    }
    return JSON.parse(raw);
  } catch {
    return { isCached: false };
  }
}

/**
 * Clears the offline trek pack cache
 */
export function clearOfflineTrekData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CACHE_STATUS_KEY);
    return true;
  } catch {
    return false;
  }
}
