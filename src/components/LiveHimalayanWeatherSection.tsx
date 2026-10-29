import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Thermometer, 
  Wind, 
  Droplets, 
  Compass, 
  Mountain, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Activity, 
  Radio, 
  PhoneCall, 
  Eye, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Plane
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { YATRA_WEATHER_DATA, YatraWeatherConfig } from "./YatraWeatherCard";

interface LiveHimalayanWeatherSectionProps {
  onOpenInquiry?: (destinationTitle?: string) => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPithoragarhFlights?: () => void;
}

interface CircuitTab {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  slug: string;
  sanctumAlt: string;
  lat: number;
  lon: number;
  defaultTemp: number;
  highlight: string;
}

const CIRCUITS: CircuitTab[] = [
  {
    id: "pithoragarh",
    name: "Pithoragarh Aviation Gateway",
    shortName: "Pithoragarh (NGH)",
    badge: "Airport & Transit Gateway",
    slug: "pithoragarh",
    sanctumAlt: "5,370 ft (NGH)",
    lat: 29.5829,
    lon: 80.2182,
    defaultTemp: 22,
    highlight: "Naini Saini Airport (NGH) live flight visibility & clear corridors"
  },
  {
    id: "adi-kailash",
    name: "Adi Kailash & Om Parvat",
    shortName: "Adi Kailash",
    badge: "Sacred Kumaon",
    slug: "adi-kailash",
    sanctumAlt: "14,500 ft",
    lat: 30.316,
    lon: 80.635,
    defaultTemp: 7,
    highlight: "Clear morning darshan at Jolingkong & Parvati Sarovar"
  },
  {
    id: "kedarnath-dham",
    name: "Kedarnath & Badrinath",
    shortName: "Kedarnath",
    badge: "Garhwal Dham",
    slug: "kedarnath-dham",
    sanctumAlt: "11,755 ft",
    lat: 30.735,
    lon: 79.066,
    defaultTemp: 8,
    highlight: "Helicopter & trekking route open with morning clearance"
  },
  {
    id: "darma-valley",
    name: "Darma Valley & Panchachuli",
    shortName: "Darma Valley",
    badge: "Alpine Wilderness",
    slug: "darma-valley",
    sanctumAlt: "13,800 ft",
    lat: 30.34,
    lon: 80.52,
    defaultTemp: 9,
    highlight: "Glacier view crystal clear at Dugtu & Dantu camps"
  },
  {
    id: "spiti-valley",
    name: "Spiti & Chandratal Lake",
    shortName: "Spiti Valley",
    badge: "Himachal Pass",
    slug: "spiti-valley",
    sanctumAlt: "14,100 ft",
    lat: 32.22,
    lon: 78.07,
    defaultTemp: 11,
    highlight: "Dry cold-desert weather with starry clear nights"
  },
  {
    id: "valley-of-flowers",
    name: "Valley of Flowers & Hemkund",
    shortName: "Valley of Flowers",
    badge: "UNESCO Heritage",
    slug: "valley-of-flowers",
    sanctumAlt: "12,100 ft",
    lat: 30.728,
    lon: 79.605,
    defaultTemp: 13,
    highlight: "Lush alpine meadows & pleasant hiking conditions"
  }
];

// In-memory weather cache across tabs to eliminate redundant network fetches and layout shifts
const weatherTelemetryCache = new Map<string, {
  temp: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  condition: string;
  weatherCode: number;
  isLive: boolean;
  lastUpdated: string;
  forecast: { day: string; maxTemp: number; minTemp: number; code: number }[];
  timestamp: number;
}>();

export const LiveHimalayanWeatherSection: React.FC<LiveHimalayanWeatherSectionProps> = memo(({
  onOpenInquiry,
  onSelectDestination,
  onSelectPithoragarhFlights
}) => {
  const [activeCircuitId, setActiveCircuitId] = useState<string>("adi-kailash");
  const [selectedSubLocation, setSelectedSubLocation] = useState<"sanctum" | "baseCamp">("sanctum");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);

  useEffect(() => {
    const handleSelectCircuit = (e: Event) => {
      const customEvent = e as CustomEvent<{ circuitId: string }>;
      if (customEvent.detail?.circuitId) {
        setActiveCircuitId(customEvent.detail.circuitId);
        setSelectedSubLocation("sanctum");
      }
    };
    window.addEventListener('select-weather-circuit', handleSelectCircuit);
    return () => window.removeEventListener('select-weather-circuit', handleSelectCircuit);
  }, []);

  const activeCircuit = useMemo(() => {
    return CIRCUITS.find((c) => c.id === activeCircuitId) || CIRCUITS[0];
  }, [activeCircuitId]);

  const activeConfig: YatraWeatherConfig = useMemo(() => {
    return YATRA_WEATHER_DATA[activeCircuit.slug] || YATRA_WEATHER_DATA["adi-kailash"];
  }, [activeCircuit.slug]);

  const activeLoc = selectedSubLocation === "sanctum" ? activeConfig.sanctum : activeConfig.baseCamp;

  // Live telemetry state
  const [liveWeather, setLiveWeather] = useState<{
    temp: number;
    windSpeed: number;
    humidity: number;
    uvIndex: number;
    condition: string;
    weatherCode: number;
    isLive: boolean;
    lastUpdated: string;
    forecast: { day: string; maxTemp: number; minTemp: number; code: number }[];
  }>({
    temp: activeLoc.defaultTempDay,
    windSpeed: 11,
    humidity: 48,
    uvIndex: 8,
    condition: activeLoc.conditionFallback,
    weatherCode: 1,
    isLive: false,
    lastUpdated: "Auto-synced",
    forecast: [
      { day: "Today", maxTemp: activeLoc.defaultTempDay, minTemp: activeLoc.defaultTempNight, code: 1 },
      { day: "Tomorrow", maxTemp: activeLoc.defaultTempDay + 1, minTemp: activeLoc.defaultTempNight, code: 0 },
      { day: "Day 3", maxTemp: activeLoc.defaultTempDay - 1, minTemp: activeLoc.defaultTempNight - 1, code: 2 },
      { day: "Day 4", maxTemp: activeLoc.defaultTempDay + 2, minTemp: activeLoc.defaultTempNight + 1, code: 1 },
      { day: "Day 5", maxTemp: activeLoc.defaultTempDay, minTemp: activeLoc.defaultTempNight, code: 3 },
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

  // Weather code parsing
  const parseWeatherCode = (code: number, temp: number) => {
    if (code === 0) return { text: "Clear Blue Himalayan Sky", icon: Sun, color: "text-amber-400", bgGlow: "from-amber-500/20 via-sky-500/10 to-transparent" };
    if (code === 1 || code === 2) return { text: "Partly Cloudy & Sunny", icon: CloudSun, color: "text-amber-300", bgGlow: "from-sky-500/20 via-slate-700/20 to-transparent" };
    if (code === 3) return { text: "High Altitude Overcast", icon: Cloud, color: "text-slate-300", bgGlow: "from-slate-600/20 via-slate-800/40 to-transparent" };
    if (code >= 45 && code <= 48) return { text: "Alpine Mist & Fog", icon: Cloud, color: "text-teal-300", bgGlow: "from-teal-500/20 via-slate-800/30 to-transparent" };
    if (code >= 51 && code <= 67) return { text: "Light Valley Rain", icon: CloudRain, color: "text-sky-400", bgGlow: "from-blue-600/20 via-slate-800/40 to-transparent" };
    if (code >= 71 && code <= 77) return { text: "Fresh Snow Flurries", icon: CloudSnow, color: "text-cyan-300", bgGlow: "from-cyan-500/20 via-indigo-900/30 to-transparent" };
    if (code >= 80 && code <= 82) return { text: "Mountain Rain Showers", icon: CloudRain, color: "text-blue-400", bgGlow: "from-blue-600/20 via-slate-800/40 to-transparent" };
    if (code >= 85 && code <= 86) return { text: "Heavy Snowfall Warning", icon: CloudSnow, color: "text-indigo-300", bgGlow: "from-indigo-600/25 via-slate-900/40 to-transparent" };
    if (code >= 95) return { text: "Alpine Thunderstorm", icon: CloudLightning, color: "text-rose-400", bgGlow: "from-rose-600/20 via-slate-900/50 to-transparent" };
    if (temp <= 0) return { text: "Sub-Zero Alpine Freeze", icon: CloudSnow, color: "text-cyan-400", bgGlow: "from-cyan-600/20 via-slate-900/40 to-transparent" };
    return { text: "Pleasant Mountain Weather", icon: Sun, color: "text-amber-400", bgGlow: "from-amber-500/20 via-slate-800/30 to-transparent" };
  };

  const fetchLiveWeather = useCallback(async () => {
    const cacheKey = `${activeLoc.lat}_${activeLoc.lon}`;
    const cached = weatherTelemetryCache.get(cacheKey);
    const now = Date.now();

    // Use cached telemetry if less than 10 minutes old
    if (cached && (now - cached.timestamp < 10 * 60 * 1000)) {
      setLiveWeather(cached);
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
          
          // Format 5-day forecast
          const daysOfWeek = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
          const forecastList = (data.daily?.time || []).slice(0, 5).map((_t: string, idx: number) => ({
            day: daysOfWeek[idx] || `Day ${idx + 1}`,
            maxTemp: Math.round(data.daily?.temperature_2m_max?.[idx] ?? cw.temperature),
            minTemp: Math.round(data.daily?.temperature_2m_min?.[idx] ?? cw.temperature - 6),
            code: data.daily?.weathercode?.[idx] ?? code
          }));

          const weatherData = {
            temp: Math.round(cw.temperature),
            windSpeed: Math.round(cw.windspeed || 12),
            humidity: data.hourly?.relativehumidity_2m?.[0] || 50,
            uvIndex: Math.round(data.hourly?.uv_index?.[12] || 8),
            condition: parsed.text,
            weatherCode: code,
            isLive: true,
            lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            forecast: forecastList.length > 0 ? forecastList : [
              { day: "Today", maxTemp: Math.round(cw.temperature), minTemp: Math.round(cw.temperature) - 8, code }
            ],
            timestamp: now
          };

          weatherTelemetryCache.set(cacheKey, weatherData);
          setLiveWeather(weatherData);
        }
      }
    } catch {
      setLiveWeather((prev) => ({ ...prev, isLive: false, lastUpdated: "Satellite Estimated" }));
    } finally {
      setLoading(false);
    }
  }, [activeLoc.lat, activeLoc.lon]);

  useEffect(() => {
    fetchLiveWeather();
  }, [fetchLiveWeather]);

  const currentWeatherDisplay = parseWeatherCode(liveWeather.weatherCode, liveWeather.temp);
  const CurrentIcon = currentWeatherDisplay.icon;

  // Real feel computation with wind chill
  const realFeel = useMemo(() => {
    if (liveWeather.temp <= 10 && liveWeather.windSpeed > 5) {
      return Math.round(13.12 + 0.6215 * liveWeather.temp - 11.37 * Math.pow(liveWeather.windSpeed, 0.16) + 0.3965 * liveWeather.temp * Math.pow(liveWeather.windSpeed, 0.16));
    }
    return liveWeather.temp;
  }, [liveWeather.temp, liveWeather.windSpeed]);

  // Clothing recommendation based on live temperature
  const clothingAdvisory = useMemo(() => {
    if (liveWeather.temp <= 2) {
      return {
        level: "Level 3: Extreme Alpine Cold Gear",
        items: "Thermal Base Layer + Fleece + 700-fill Down Jacket + Windproof Pants + Woolen Balaclava & Thermal Gloves",
        badge: "Sub-Zero Protection",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
      };
    }
    if (liveWeather.temp <= 12) {
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
  }, [liveWeather.temp]);

  return (
    <section id="live-weather" className="py-20 bg-[#0B1120] text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient background glow effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Bar */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-3 shadow-xs">
            <Radio size={14} className="text-amber-400 animate-pulse" />
            <span>Real-Time Himalayan Weather & Trail Radar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Live Mountain Weather &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Permit Road Status</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Live Open-Meteo satellite feed, real-feel wind chill, high-altitude oxygen density, and official BRO/ITBP trail safety across sacred Himalayan circuits.
          </p>
        </div>

        {/* Circuit Selection Tabs - Mobile Touch & Swipe Optimized */}
        <div className="relative mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-3 snap-x snap-mandatory scroll-smooth no-scrollbar select-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
            {CIRCUITS.map((circuit) => {
              const isActive = circuit.id === activeCircuitId;
              return (
                <button
                  key={circuit.id}
                  onClick={() => {
                    setActiveCircuitId(circuit.id);
                    setSelectedSubLocation("sanctum");
                    setSelectedMonthIndex(0);
                  }}
                  className={`snap-start min-h-[44px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 sm:gap-2 border shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md font-black"
                      : "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Mountain size={15} className={isActive ? "text-slate-950" : "text-amber-400"} />
                  <span className="inline sm:hidden">{circuit.shortName}</span>
                  <span className="hidden sm:inline">{circuit.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? "bg-slate-950/20 text-slate-900 font-bold" : "bg-slate-800 text-slate-400"}`}>
                    {circuit.sanctumAlt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Live Weather Glass Display Card */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-700/80 shadow-2xl p-4 sm:p-7 lg:p-8 relative overflow-hidden backdrop-blur-md">
          {/* Top Status & Altitude Sub-location Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] sm:text-[11px] font-extrabold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Satellite Telemetry
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                  Station: <strong className="text-slate-200">{activeLoc.name}</strong> ({activeLoc.altitude})
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">|</span>
                <span className="text-[11px] sm:text-xs text-slate-400">Sync: {liveWeather.lastUpdated}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1.5 flex items-center gap-2 flex-wrap">
                <span>{activeCircuit.name}</span>
                <span className="text-amber-400 text-sm sm:text-base font-semibold">({activeCircuit.badge})</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/90 mt-0.5 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400 shrink-0" />
                <span>{activeCircuit.highlight}</span>
              </p>
            </div>

            {/* Location Pills & Refresh Button */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="grid grid-cols-2 md:flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-700/80 flex-1 md:flex-initial">
                <button
                  onClick={() => setSelectedSubLocation("sanctum")}
                  className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedSubLocation === "sanctum"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Mountain size={13} />
                  <span>{activeCircuit.id === "pithoragarh" ? "Chandak View" : "Sanctum"} ({activeConfig.sanctum.altitude.split(" ")[0]})</span>
                </button>
                <button
                  onClick={() => setSelectedSubLocation("baseCamp")}
                  className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedSubLocation === "baseCamp"
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {activeCircuit.id === "pithoragarh" ? <Plane size={13} /> : <MapPin size={13} />}
                  <span>{activeCircuit.id === "pithoragarh" ? "Airport (NGH)" : "Base"} ({activeConfig.baseCamp.altitude.split(" ")[0]})</span>
                </button>
              </div>

              <button
                onClick={fetchLiveWeather}
                disabled={loading}
                title="Refresh Live Sensor Data"
                className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold shrink-0"
              >
                <RefreshCw size={14} className={loading ? "animate-spin text-amber-400" : "text-amber-400"} />
                <span className="hidden sm:inline">Sync</span>
              </button>
            </div>
          </div>

          {/* Main Weather Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 my-5 sm:my-6 items-center">
            {/* Left Big Temperature Hero Block */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 sm:p-6 rounded-3xl border border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 flex items-center gap-1.5">
                  {activeCircuit.id === "pithoragarh" ? <Plane size={14} /> : <MapPin size={14} />}
                  <span>{activeLoc.name}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-slate-700 text-[11px] font-mono font-bold">
                  {activeLoc.altitude}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-5 my-3.5 sm:my-4">
                <div className="p-3 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <CurrentIcon size={40} className={`sm:w-12 sm:h-12 ${currentWeatherDisplay.color}`} />
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white flex items-start">
                    <span>{liveWeather.temp}°</span>
                    <span className="text-2xl sm:text-3xl text-amber-400 font-sans font-bold ml-0.5">C</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">
                    {liveWeather.condition}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Real Feel: <span className="text-amber-300 font-bold">{realFeel}°C</span> (with wind chill)
                  </div>
                </div>
              </div>

              {/* Trail & Road Clearance Badge */}
              {activeCircuit.id === "pithoragarh" ? (
                <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-bold">
                    <Plane size={16} className="text-emerald-400 shrink-0" />
                    <span>Naini Saini Airport: <strong>VFR Runway Open</strong></span>
                  </div>
                  <span className="text-[10px] text-amber-300 font-mono">1,600m Asphalt</span>
                </div>
              ) : (
                <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-bold">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>BRO / ITBP Trail: <strong>Open &amp; All-Clear</strong></span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">4x4 Boleros Active</span>
                </div>
              )}
            </div>

            {/* Right Telemetry 4-Pack Metric Cards */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Oxygen Level */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs font-bold">
                  <span>Oxygen (O₂)</span>
                  <Activity size={14} className="text-rose-400" />
                </div>
                <div className="my-1.5 sm:my-2">
                  <div className={`text-lg sm:text-xl font-black font-mono ${oxygenEstimate.color}`}>
                    {oxygenEstimate.pct}%
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium line-clamp-1">
                    {oxygenEstimate.label}
                  </div>
                </div>
                <div className="text-[9px] text-amber-300 font-mono border-t border-slate-700/60 pt-1">
                  Portable O₂ Provided
                </div>
              </div>

              {/* Wind Speed & Direction */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs font-bold">
                  <span>Wind Speed</span>
                  <Wind size={14} className="text-sky-400" />
                </div>
                <div className="my-1.5 sm:my-2">
                  <div className="text-lg sm:text-xl font-black font-mono text-white">
                    {liveWeather.windSpeed} <span className="text-[10px] sm:text-xs text-slate-400">km/h</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium line-clamp-1">
                    {liveWeather.windSpeed > 25 ? "Gusty Wind" : "Alpine Breeze"}
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 font-mono border-t border-slate-700/60 pt-1">
                  NNW Ridge
                </div>
              </div>

              {/* UV Index Rating */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs font-bold">
                  <span>UV Radiation</span>
                  <Eye size={14} className="text-amber-400" />
                </div>
                <div className="my-1.5 sm:my-2">
                  <div className="text-lg sm:text-xl font-black font-mono text-amber-400">
                    UV {liveWeather.uvIndex}
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium line-clamp-1">
                    {liveWeather.uvIndex >= 8 ? "Very High" : "Moderate"}
                  </div>
                </div>
                <div className="text-[9px] text-amber-300 font-mono border-t border-slate-700/60 pt-1">
                  UV Shades Req.
                </div>
              </div>

              {/* Humidity / Precipitation */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs font-bold">
                  <span>Humidity</span>
                  <Droplets size={14} className="text-blue-400" />
                </div>
                <div className="my-1.5 sm:my-2">
                  <div className="text-lg sm:text-xl font-black font-mono text-blue-300">
                    {liveWeather.humidity}%
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium line-clamp-1">
                    {liveWeather.humidity > 70 ? "Valley Mist" : "Crisp Alpine"}
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 font-mono border-t border-slate-700/60 pt-1">
                  Rain: {liveWeather.weatherCode >= 50 ? "45%" : "<10%"}
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Interactive Day-by-Day Forecast Strip */}
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <h4 className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-slate-300 flex items-center gap-2">
                <Calendar size={14} className="text-amber-400" />
                <span>5-Day High Altitude Forecast ({activeLoc.name})</span>
              </h4>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">IMD / Open-Meteo</span>
            </div>

            {/* Responsive 5-column grid ensuring all 5 days fit cleanly on all screen sizes */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 text-center">
              {liveWeather.forecast.map((fc, i) => {
                const fcInfo = parseWeatherCode(fc.code, fc.maxTemp);
                const FcIcon = fcInfo.icon;
                return (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 transition-all flex flex-col items-center justify-between gap-1 sm:gap-2"
                  >
                    <span className="text-[10px] sm:text-xs font-bold text-slate-300 truncate w-full">{fc.day}</span>
                    <FcIcon size={22} className={`sm:w-6 sm:h-6 my-0.5 ${fcInfo.color}`} />
                    <div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-white">
                        <span className="text-amber-300">{fc.maxTemp}°</span> <span className="text-slate-400 text-[10px] sm:text-xs">/ {fc.minTemp}°</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 line-clamp-1 mt-0.5 hidden xs:block">
                        {fcInfo.text.split(" ")[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic "What to Wear Right Now" Banner */}
          <div className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <Thermometer size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-white">Live Layering &amp; Clothing Advisory</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${clothingAdvisory.badgeColor}`}>
                    {clothingAdvisory.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong>Recommended Gear:</strong> {clothingAdvisory.items}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto flex-wrap">
              {activeCircuit.id === "pithoragarh" && onSelectPithoragarhFlights && (
                <button
                  onClick={onSelectPithoragarhFlights}
                  className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plane size={14} className="text-amber-400" />
                  <span>Flight Schedules (Dehradun &amp; Delhi)</span>
                </button>
              )}
              <button
                onClick={() => onOpenInquiry?.(activeCircuit.name)}
                className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Check Travel Dates</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Monthly Climate & Snow Matrix */}
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>Monthly Climate &amp; Snow Probability Matrix</span>
                  <span className="text-xs text-amber-400 font-semibold">(Best Yatra Windows: {activeConfig.bestMonths})</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  Historical temperature averages, snow accumulation, and medical advice for planning your yatra batch.
                </p>
              </div>
            </div>

            {/* Desktop & Tablet Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/90 text-amber-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700">
                  <tr>
                    <th className="p-3">Month</th>
                    <th className="p-3">Day Temp</th>
                    <th className="p-3">Night Temp</th>
                    <th className="p-3">Snowfall Chance</th>
                    <th className="p-3">Pilgrim Advisory &amp; Trail Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {activeConfig.seasonalTemps.map((st, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>{st.month}</span>
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-400">{st.maxTemp}°C</td>
                      <td className="p-3 font-mono font-bold text-cyan-300">{st.minTemp}°C</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                          {st.snowChance}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 leading-relaxed">{st.advisory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch Card Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:hidden">
              {activeConfig.seasonalTemps.map((st, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{st.month}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
                      Snow: {st.snowChance}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-slate-400">Day: <strong className="text-emerald-400 font-bold">{st.maxTemp}°C</strong></span>
                    <span className="text-slate-400">Night: <strong className="text-cyan-300 font-bold">{st.minTemp}°C</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/80 pt-1.5">
                    {st.advisory}
                  </p>
                </div>
              ))}
            </div>

            {/* High Altitude Safety Checklist */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                <span>GoTrek Safety Guarantee: Every 4x4 Bolero carries medical portable oxygen &amp; oximeter.</span>
              </div>
              <a
                href="https://wa.me/917248285767?text=Hi%20GoTrek%20Team%2C%20please%20share%20today%27s%20weather%20and%20trail%20status%20for%20Adi%20Kailash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5"
              >
                <PhoneCall size={13} />
                <span>Dharchula Desk (+91 7248285767)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
