import React, { useState, useEffect, useRef, memo } from "react";
import { HOTELS_BY_LOCATION } from "../data/hotelsData";
import { HotelStayOption } from "../types";
import {
  Home,
  CheckCircle2,
  Sparkles,
  MapPin,
  Flame,
  Wind,
  BedDouble,
  ShieldCheck,
  Utensils,
  Star,
  Building2,
  PhoneCall,
  Info,
  Camera,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  X,
  Check,
  Coffee,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HotelsAccommodationSectionProps {
  onOpenInquiry?: (destination?: string) => void;
  defaultLocationSlug?: string;
  titleOverride?: string;
  subtitleOverride?: string;
}

const DEFAULT_RESTAURANT_PHOTO =
  "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80";

const RESTAURANT_PRESETS = [
  {
    id: "thali",
    label: "Authentic Kumaoni Thali",
    url: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80",
    desc: "Steaming hot Mandua rotis, Gahat dal & fresh local ghee"
  },
  {
    id: "wooden-dining",
    label: "Cozy Wooden Dining Hall",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    desc: "Warm alpine pine dining with traditional Bukhari stove"
  },
  {
    id: "mountain-terrace",
    label: "Mountain View Terrace",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    desc: "Open air dining overlooking snow-capped peaks"
  },
  {
    id: "fresh-kitchen",
    label: "Fresh Sattvik Kitchen",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    desc: "Hygienic pure-vegetarian food preparation"
  }
];

export const HotelsAccommodationSection: React.FC<HotelsAccommodationSectionProps> = memo(({
  onOpenInquiry,
  defaultLocationSlug = "dharchula",
  titleOverride,
  subtitleOverride
}) => {
  const [selectedLocSlug, setSelectedLocSlug] = useState<string>(defaultLocationSlug);
  const [activeTabTier, setActiveTabTier] = useState<"all" | "standard" | "premium" | "restaurant">("all");
  
  // Custom Restaurant Photo State with LocalStorage persistence
  const [restaurantPhoto, setRestaurantPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem("gotrek_custom_restaurant_photo") || DEFAULT_RESTAURANT_PHOTO;
    } catch {
      return DEFAULT_RESTAURANT_PHOTO;
    }
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [customPhotoInput, setCustomPhotoInput] = useState("");
  const [photoSaveSuccess, setPhotoSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeLocation =
    HOTELS_BY_LOCATION.find((loc) => loc.locationSlug === selectedLocSlug) || HOTELS_BY_LOCATION[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        saveRestaurantPhoto(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveRestaurantPhoto = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setRestaurantPhoto(trimmed);
    try {
      localStorage.setItem("gotrek_custom_restaurant_photo", trimmed);
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }
    setPhotoSaveSuccess(true);
    setTimeout(() => {
      setPhotoSaveSuccess(false);
      setIsPhotoModalOpen(false);
    }, 1200);
  };

  const handleResetPhoto = () => {
    setRestaurantPhoto(DEFAULT_RESTAURANT_PHOTO);
    try {
      localStorage.removeItem("gotrek_custom_restaurant_photo");
    } catch (err) {
      console.warn(err);
    }
    setIsPhotoModalOpen(false);
  };

  return (
    <section id="hotels-guide" className="py-16 sm:py-24 bg-[#FAF8F5] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xs">
            <Building2 size={14} className="text-amber-800" />
            <span>GoTrek Verified Stays & Dining Directory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1E293B] tracking-tight">
            {titleOverride || (
              <>
                Where You Will Stay:{" "}
                <span className="italic font-semibold text-[#C91D24]">
                  Standard vs. Premium Hotels
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {subtitleOverride ||
              "Choose between authentic Bhotia village homestays and riverfront luxury suites, complete with our 100% pure-vegetarian local dining experience."}
          </p>

          {/* Quick Dual-Tier / View Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveTabTier("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabTier === "all"
                  ? "bg-[#1E293B] text-white shadow-md scale-102"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Sparkles size={13} className={activeTabTier === "all" ? "text-amber-300" : "text-amber-600"} />
              <span>Compare Side-by-Side</span>
            </button>

            <button
              onClick={() => setActiveTabTier("standard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabTier === "standard"
                  ? "bg-emerald-800 text-white shadow-md scale-102"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Standard Stays (₹28,000)</span>
            </button>

            <button
              onClick={() => setActiveTabTier("premium")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabTier === "premium"
                  ? "bg-[#C91D24] text-white shadow-md scale-102"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Star size={13} className={activeTabTier === "premium" ? "text-amber-300 fill-amber-300" : "text-amber-600"} />
              <span>Premium Stays (₹38,000)</span>
            </button>

            <button
              onClick={() => setActiveTabTier("restaurant")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTabTier === "restaurant"
                  ? "bg-amber-600 text-white shadow-md scale-102"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Utensils size={13} className={activeTabTier === "restaurant" ? "text-white" : "text-amber-700"} />
              <span>Our Local Restaurant</span>
            </button>
          </div>
        </div>

        {/* Location Selector Tabs (Dharchula, Nabi/Gunji, Jolingkong, Pithoragarh) */}
        {activeTabTier !== "restaurant" && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth justify-start md:justify-center border-b border-slate-200">
            {HOTELS_BY_LOCATION.map((loc) => {
              const isActive = loc.locationSlug === activeLocation.locationSlug;
              return (
                <button
                  key={loc.locationSlug}
                  onClick={() => setSelectedLocSlug(loc.locationSlug)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-[#1E293B] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-amber-50 border border-slate-200"
                  }`}
                >
                  <MapPin size={13} className={isActive ? "text-amber-300" : "text-amber-700"} />
                  <span>{loc.locationName.split("(")[0].trim()}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {loc.altitude}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Location Info Strip */}
        {activeTabTier !== "restaurant" && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
                <span>{activeLocation.circuit}</span>
                <span>•</span>
                <span>Altitude: {activeLocation.altitude}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1E293B]">
                {activeLocation.locationName}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {activeLocation.overview}
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry && onOpenInquiry(activeLocation.locationName)}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-[#C91D24] hover:bg-[#A8181E] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall size={14} />
              <span>Inquire Stay Availability</span>
            </button>
          </div>
        )}

        {/* Dual Sections: Standard vs. Premium Stays */}
        {activeTabTier !== "restaurant" && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeLocation.locationSlug}-${activeTabTier}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 ${
                activeTabTier === "all" ? "lg:grid-cols-2" : "max-w-2xl mx-auto"
              } gap-6 sm:gap-8 items-stretch`}
            >
              {/* SECTION 1: STANDARD STAY */}
              {(activeTabTier === "all" || activeTabTier === "standard") && (
                <HotelCard
                  hotel={activeLocation.standardStay}
                  type="standard"
                  onOpenInquiry={onOpenInquiry}
                />
              )}

              {/* SECTION 2: PREMIUM STAY */}
              {(activeTabTier === "all" || activeTabTier === "premium") && (
                <HotelCard
                  hotel={activeLocation.premiumStay}
                  type="premium"
                  onOpenInquiry={onOpenInquiry}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* 🍽️ SECTION: OUR LOCAL RESTAURANT & PURE-VEG MOUNTAIN DINING */}
        <div id="local-restaurant-showcase" className="mt-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Photo Showcase Container with Interactive Upload */}
              <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] bg-slate-900 group overflow-hidden">
                <img
                  src={restaurantPhoto}
                  alt="Our Local Restaurant & Pure-Veg Dining"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/30" />

                {/* Top Tags on Photo */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs flex items-center gap-1 shadow-sm">
                    <CheckCircle2 size={11} />
                    <span>100% Pure Sattvik Kitchen</span>
                  </span>

                  {/* Add / Change Photo Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold tracking-wide backdrop-blur-md border border-white/30 flex items-center gap-1.5 transition-all shadow-md hover:scale-105 cursor-pointer"
                    title="Click to easily upload or change your restaurant photo"
                  >
                    <Camera size={13} className="text-amber-300" />
                    <span>Change Restaurant Photo</span>
                  </button>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Utensils size={12} />
                    <span>GoTrek Mountain Bhojanalaya • Dharchula & Gunji Camp</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    Authentic Mountain Dining & Fresh Pahadi Thali
                  </h4>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    Steaming hot Mandua rotis, Gahat ki Dal, local cow ghee, and herbal Himalayan tea prepared fresh daily for yatris.
                  </p>
                </div>
              </div>

              {/* Restaurant Details & Features */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-linear-to-b from-white to-[#FAF8F5]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C91D24] uppercase tracking-wider">
                      <Coffee size={14} />
                      <span>Dedicated Pilgrim Dining</span>
                    </div>

                    <button
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="text-xs text-amber-800 hover:text-amber-900 font-bold underline flex items-center gap-1 cursor-pointer"
                    >
                      <Upload size={12} />
                      <span>Add Local Photo</span>
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#1E293B]">
                    Hygienic Sattvik Dining at High Altitudes
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    At 3,000 to 14,500 ft, proper nutrition and easily digestible meals are vital for acclimatization. Our in-house and partner kitchens serve freshly cooked, sattvik food prepared strictly under hygienic standards.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <span>🍲</span>
                        <span>Authentic Kumaoni Flavors</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Bhatt ki Churkani, Madua (millet) rotis, Aloo ke Gutke with mountain Jakhya spices.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                        <span>🥛</span>
                        <span>Pure Veg & Jain Friendly</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Strictly vegetarian kitchen with custom no-onion, no-garlic options available on request.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-50/80 border border-cyan-200/70 text-cyan-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-cyan-900">
                        <span>💧</span>
                        <span>RO & Boiled Mineral Water</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Unlimited warm boiled drinking water with cumin & ginger for altitude hydration.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-stone-900">
                        <span>🪵</span>
                        <span>Heated Wooden Dining Hall</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Warm indoor seating with traditional Bukhari wood heaters to keep you cozy during dinners.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Included in both Standard & Premium Yatra Packages</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Camera size={13} className="text-slate-600" />
                      <span>Upload Restaurant Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry && onOpenInquiry("Restaurant Meal Booking & Dietary Special Request")}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#C91D24] hover:bg-[#A8181E] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <HeartHandshake size={14} />
                      <span>Inquire Dining & Meals</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Footnote Assurance */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs flex items-start gap-3 max-w-4xl mx-auto">
          <Info size={18} className="text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold">GoTrek Stay & Food Verification Guarantee:</span>
            <p>
              All listed homestays, hotels, and restaurant dining areas are physically audited by our Dharchula Operations Team prior to every yatra season. Clean bedding, hygienic washrooms, warm heated water, and pure sattvik meals are 100% verified. Custom food requests (Jain food, fasting meals, or light khichdi) are happily accommodated.
            </p>
          </div>
        </div>

      </div>

      {/* EASY RESTAURANT PHOTO UPLOAD / CHANGE MODAL */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Camera size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#1E293B] text-lg">
                      Add Local Restaurant Photo
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Easily upload your restaurant photo or select an authentic mountain dining image
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                
                {/* Current Photo Preview */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Preview:
                  </label>
                  <div className="relative rounded-2xl overflow-hidden h-44 bg-slate-100 border border-slate-200">
                    <img
                      src={restaurantPhoto}
                      alt="Restaurant Preview"
                      className="w-full h-full object-cover"
                    />
                    {photoSaveSuccess && (
                      <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm gap-2">
                        <Check size={18} className="text-emerald-400" />
                        <span>Photo Saved Successfully!</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Option 1: Upload from Device */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload size={13} className="text-[#C91D24]" />
                    <span>Upload From Your Phone / Computer:</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#C91D24] bg-slate-50 hover:bg-red-50/40 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload size={15} className="text-[#C91D24]" />
                    <span>Choose Local Photo File (JPG, PNG, WebP)</span>
                  </button>
                </div>

                {/* Option 2: Image URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon size={13} className="text-amber-700" />
                    <span>Or Paste an Image URL:</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/my-restaurant.jpg"
                      value={customPhotoInput}
                      onChange={(e) => setCustomPhotoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C91D24]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customPhotoInput) {
                          saveRestaurantPhoto(customPhotoInput);
                          setCustomPhotoInput("");
                        }
                      }}
                      className="px-4 py-2 bg-[#1E293B] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Option 3: Presets */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Or Select An Authentic Mountain Dining Preset:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RESTAURANT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => saveRestaurantPhoto(preset.url)}
                        className="text-left p-2 rounded-xl border border-slate-200 hover:border-[#C91D24] hover:bg-red-50/20 transition-all flex items-center gap-2 cursor-pointer group"
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-slate-800 truncate group-hover:text-[#C91D24]">
                            {preset.label}
                          </div>
                          <div className="text-[9px] text-slate-500 truncate">
                            {preset.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="text-xs text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset to Default</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
});

HotelsAccommodationSection.displayName = "HotelsAccommodationSection";

interface HotelCardProps {
  hotel: HotelStayOption;
  type: "standard" | "premium";
  onOpenInquiry?: (destination?: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, type, onOpenInquiry }) => {
  const isPremium = type === "premium";

  return (
    <div
      className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
        isPremium
          ? "bg-[#1E293B] text-white border-slate-700 shadow-xl"
          : "bg-white text-[#1E293B] border-slate-200 shadow-xs"
      }`}
    >
      <div className="space-y-5">
        {/* Card Header Badge */}
        <div className="flex items-center justify-between gap-2 border-b pb-4 border-slate-200/20">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isPremium ? "bg-amber-400 text-slate-950" : "bg-emerald-800 text-white"
              }`}
            >
              {isPremium ? "⭐ Premium Stay Option" : "🌿 Standard Stay Option"}
            </span>

            {hotel.oxygenAvailable && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-900/80 border border-cyan-400/30 text-cyan-200 text-[10px] font-bold flex items-center gap-1">
                <Wind size={11} className="text-cyan-300" />
                <span>Oxygen On-Site</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <Star size={13} className="fill-amber-400" />
            <span>{hotel.rating}</span>
            <span className={`text-[10px] ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
              ({hotel.reviewsCount})
            </span>
          </div>
        </div>

        {/* Image & Title Block */}
        <div className="space-y-2.5">
          <div className="relative rounded-2xl overflow-hidden h-48 w-full group">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="text-[10px] font-bold uppercase text-amber-300 tracking-wider flex items-center gap-1">
                <MapPin size={11} />
                <span>
                  {hotel.location} • {hotel.altitude}
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-white line-clamp-1">
                {hotel.name}
              </h4>
            </div>
          </div>

          <p className={`text-xs italic line-clamp-2 ${isPremium ? "text-amber-200/90" : "text-slate-600"}`}>
            "{hotel.tagline}"
          </p>
        </div>

        {/* Feature Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`p-3 rounded-xl flex items-start gap-2 ${
              isPremium ? "bg-slate-800/80 text-slate-200" : "bg-[#F5F2ED] text-slate-800"
            }`}
          >
            <BedDouble size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider opacity-75">
                Room Layout
              </div>
              <div className="font-semibold text-[11px] line-clamp-1">{hotel.roomTypes.join(", ")}</div>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl flex items-start gap-2 ${
              isPremium ? "bg-slate-800/80 text-slate-200" : "bg-[#F5F2ED] text-slate-800"
            }`}
          >
            <Flame size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider opacity-75">
                Heating & Bath
              </div>
              <div className="font-semibold text-[11px] line-clamp-1">{hotel.heatingFacility}</div>
            </div>
          </div>
        </div>

        {/* Highlights Checklist */}
        <div className="space-y-2">
          <div
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isPremium ? "text-amber-300" : "text-amber-900"
            }`}
          >
            Key Highlights:
          </div>
          <ul className="space-y-1.5 text-xs">
            {hotel.highlights.map((hl, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className={`shrink-0 mt-0.5 ${
                    isPremium ? "text-amber-400" : "text-emerald-700"
                  }`}
                />
                <span className={isPremium ? "text-slate-200" : "text-slate-700"}>
                  {hl}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meals & Washroom Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
          <span
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${
              isPremium ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
            }`}
          >
            <Utensils size={12} className="text-amber-500" />
            <span className="line-clamp-1">{hotel.mealsIncluded}</span>
          </span>
          <span
            className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 ${
              isPremium ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
            }`}
          >
            <Home size={12} className="text-amber-500" />
            <span className="line-clamp-1">{hotel.washroomType}</span>
          </span>
        </div>
      </div>

      {/* Footer Price Note & Booking */}
      <div className="pt-5 border-t border-slate-200/20 mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
            Package Tier:
          </span>
          <span className={`font-bold ${isPremium ? "text-amber-300" : "text-emerald-800"}`}>
            {hotel.standardPriceNote}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenInquiry &&
            onOpenInquiry(`${hotel.name} (${hotel.location}) - ${isPremium ? "Premium" : "Standard"} Stay`)
          }
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isPremium
              ? "bg-[#C91D24] hover:bg-[#A8181E] text-white shadow-md"
              : "bg-[#1E293B] hover:bg-slate-800 text-white shadow-xs"
          }`}
        >
          <Building2 size={14} />
          <span>Choose {isPremium ? "Premium" : "Standard"} Stay</span>
        </button>
      </div>
    </div>
  );
};
