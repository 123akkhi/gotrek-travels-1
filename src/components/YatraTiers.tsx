import React, { memo } from "react";
import { YATRA_TIERS } from "../data/mockData";
import { Check, Sparkles, ShieldCheck, Car, Home, HeartPulse, Send, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { prefetchComponent } from "../utils/lazyWithRetry";

interface YatraTiersProps {
  onOpenInquiry: (destination: string) => void;
  onSelectPackage?: (slug: string) => void;
  onSelectSeoPage?: (slug: string) => void;
}

export const YatraTiers = memo(({ onOpenInquiry, onSelectPackage, onSelectSeoPage }: YatraTiersProps) => {
  const { language, translate, t } = useLanguage();

  const getTierTagline = (tagline: string) => {
    if (tagline.includes("BUDGET")) {
      return language === 'hi' ? 'बजट एवं प्रामाणिक ग्राम प्रवास' :
             language === 'gu' ? 'બજેટ અને પરંપરાગત ગ્રામીણ રોકાણ' :
             language === 'mr' ? 'बजेट आणि अस्सल ग्रामीण निवास' :
             language === 'bn' ? 'বাজেট ও খাঁটি গ্রামীণ হোমস্টে' : tagline;
    }
    if (tagline.includes("ALL-INCLUSIVE")) {
      return language === 'hi' ? 'सर्वाधिक लोकप्रिय • डीलक्स कॉटेज' :
             language === 'gu' ? 'સૌથી લોકપ્રિય • ડીલક્સ કોટેજ' :
             language === 'mr' ? 'सर्वाधिक लोकप्रिय • डिलक्स कॉटेज' :
             language === 'bn' ? 'সবচেয়ে জনপ্রিয় • ডিলাক্স কটেজ' : tagline;
    }
    return translate(tagline);
  };

  const getTierLabel = (label: string) => {
    if (label.includes("Standard")) {
      return language === 'hi' ? 'मानक होमस्टे यात्रा' :
             language === 'gu' ? 'સ્ટાન્ડર્ડ હોમસ્ટે યાત્રા' :
             language === 'mr' ? 'स्टँડર્ડ होमस्टे यात्रा' :
             language === 'bn' ? 'স্ট্যান্ডার্ড হোমস্টে যাত্রা' : label;
    }
    if (label.includes("Premium")) {
      return language === 'hi' ? 'प्रीमियम कॉटेज 4x4 अभियान' :
             language === 'gu' ? 'પ્રીમિયમ કોટેજ 4x4 અભિયાન' :
             language === 'mr' ? 'प्रीमियम कॉटेज 4x4 मोहीम' :
             language === 'bn' ? 'প্রিমিয়াম কটেজ ৪x৪ অভিযান' : label;
    }
    return translate(label);
  };

  const getVehicleType = (v: string) => {
    if (v.includes("Bolero")) {
      return language === 'hi' ? 'शेयरिंग 4x4 बोलेरो / विंगर' :
             language === 'gu' ? 'શેરિંગ 4x4 બોલેરો / વિંગર' :
             language === 'mr' ? 'शेअरिंग 4x4 बोलेरो / विंगर' :
             language === 'bn' ? 'শেয়ারিং ৪x৪ বোলেরো / উইঙ্গার' : v;
    }
    if (v.includes("Scorpio")) {
      return language === 'hi' ? 'प्रीमियम 4x4 एसयूवी (स्कॉर्पियो/इंविक्टो)' :
             language === 'gu' ? 'પ્રીમિયમ 4x4 એસયુવી (સ્કોર્પિયો)' :
             language === 'mr' ? 'प्रीमियम 4x4 एसयूव्ही (स्कॉर्पिओ)' :
             language === 'bn' ? 'প্রিমিয়াম ৪x৪ এসইউভি (স্করপিও)' : v;
    }
    return translate(v);
  };

  const getStayType = (s: string) => {
    if (s.includes("Homestay")) {
      return language === 'hi' ? 'पारंपरिक स्थानीय होमस्टे' :
             language === 'gu' ? 'પરંપરાગત સ્થાનિક હોમસ્ટે' :
             language === 'mr' ? 'पारंपरिक स्थानिक होमस्टे' :
             language === 'bn' ? 'ঐতিহ্যবাহী স্থানীয় হোমস্টে' : s;
    }
    if (s.includes("Cottages")) {
      return language === 'hi' ? 'प्रीमियम लकड़ी के कॉटेज व होटल' :
             language === 'gu' ? 'પ્રીમિયમ લાકડાના કોટેજ અને હોટેલ' :
             language === 'mr' ? 'प्रीमियम लाकडी कॉटेज आणि हॉटेल्स' :
             language === 'bn' ? 'প্রিমিয়াম কাঠের কটেজ ও হোটেল' : s;
    }
    return translate(s);
  };

  return (
    <section id="tiers" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/90 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-300 text-xs font-black uppercase tracking-widest shadow-xs"
          >
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>{t("Official 2027 Yatra Packages")}</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Standard vs.")}{" "}
            <span className="text-[#C91D24] font-extrabold">
              {t("Premium Yatra Packages")}
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {t("Choose between our authentic traditional homestay yatra or the all-inclusive luxury SUV expedition with wooden cottages, dedicated medical oxygen, and priority permit clearance.")}
          </p>
        </motion.div>

        {/* Tiers Grid with stagger scroll reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {YATRA_TIERS.map((tier, idx) => {
            const isFeatured = tier.featured;

            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: idx * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                onMouseEnter={() => prefetchComponent(() => import("./PackageDetailPage"), "PackageDetailPage", true)}
                className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 will-change-transform ${
                  isFeatured
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-2 border-amber-400/50 shadow-2xl ring-1 ring-amber-400/30"
                    : "bg-white text-slate-900 border-2 border-stone-200/90 hover:border-stone-300 shadow-md"
                }`}
              >
                {/* Top Badge */}
                {isFeatured && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute -top-3.5 right-6 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-amber-300"
                  >
                    <Star size={12} className="fill-slate-950 text-slate-950" />
                    <span>{t("Most Preferred by Yatris")}</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className={`text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                      isFeatured ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-stone-100 text-stone-700"
                    }`}>
                      {getTierTagline(tier.tagline)}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-2.5">
                      {getTierLabel(tier.label)}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-2 pb-4 border-b border-slate-700/50">
                      <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${isFeatured ? "text-amber-400" : "text-slate-900"}`}>
                        {tier.price}
                      </span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-semibold ${isFeatured ? "text-slate-300" : "text-slate-600"}`}>
                          {language === 'hi' ? '/ प्रति व्यक्ति' : language === 'gu' ? '/ વ્યક્તિ દીઠ' : language === 'mr' ? '/ प्रति व्यक्ती' : language === 'bn' ? '/ প্রতি জন' : '/ Person'}
                        </span>
                        <span className={`text-[10px] ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                          {translate(tier.priceNote)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Vehicle & Stay Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={`p-3.5 rounded-2xl flex items-center gap-3 ${
                      isFeatured ? "bg-slate-800/80 border border-slate-700 text-white" : "bg-stone-50 border border-stone-200/90 text-slate-900"
                    }`}>
                      <Car size={20} className={isFeatured ? "text-amber-400 shrink-0" : "text-[#C91D24] shrink-0"} />
                      <div>
                        <div className={`text-[9px] uppercase font-bold tracking-widest ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                          {t("Transport")}
                        </div>
                        <div className="text-xs font-bold leading-snug">{getVehicleType(tier.vehicleType)}</div>
                      </div>
                    </div>

                    <div className={`p-3.5 rounded-2xl flex items-center gap-3 ${
                      isFeatured ? "bg-slate-800/80 border border-slate-700 text-white" : "bg-stone-50 border border-stone-200/90 text-slate-900"
                    }`}>
                      <Home size={20} className={isFeatured ? "text-amber-400 shrink-0" : "text-[#C91D24] shrink-0"} />
                      <div>
                        <div className={`text-[9px] uppercase font-bold tracking-widest ${isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                          {t("Stay Type")}
                        </div>
                        <div className="text-xs font-bold leading-snug">{getStayType(tier.stayType)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 pt-1">
                    <div className={`text-[11px] font-black uppercase tracking-wider ${isFeatured ? "text-amber-400" : "text-slate-900"}`}>
                      {t("Package Inclusions:")}
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className={`flex items-start gap-2.5 text-xs font-medium ${isFeatured ? "text-slate-200" : "text-slate-700"}`}>
                          <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                            isFeatured ? "bg-amber-400 text-slate-950" : "bg-emerald-600 text-white"
                          }`}>
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span className="leading-snug">{translate(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-8 grid grid-cols-2 gap-3 mt-4 border-t border-slate-700/50">
                  <button
                    onClick={() => onSelectPackage && onSelectPackage(tier.slug)}
                    className={`py-3 px-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      isFeatured
                        ? "bg-slate-800 hover:bg-slate-700 text-white border-slate-600 hover:border-amber-400"
                        : "bg-white hover:bg-slate-50 text-slate-900 border-stone-300"
                    }`}
                  >
                    <span>{t("Itinerary")}</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => onOpenInquiry(tier.label)}
                    className={`py-3 px-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                      isFeatured
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-950/20"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-stone-900/20"
                    }`}
                  >
                    <Send size={13} />
                    <span>{t("Book 2027")}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Side-by-Side Comparison Check Table with smooth reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 bg-[#F8F6F0] border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-amber-300 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck size={14} className="text-amber-400" />
              <span>{t("Official GoTrek Travels Package Comparison Check")}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {t("Side-by-Side Inclusions Matrix")}
            </h3>
            <p className="text-xs text-slate-600">
              {language === 'hi' ? 'वाहन आराम, होमस्टे बनाम कॉटेज, मेडिकल ऑक्सीजन एवं दर्शन का पारदर्शी विवरण।' :
               language === 'gu' ? 'વાહન સુવિધા, હોમસ્ટે વિરુદ્ધ કોટેજ, મેડિકલ ઓક્સિજન અને દર્શનની સ્પષ્ટ તુલના.' :
               language === 'mr' ? 'वाहतूक सोय, होमस्टे विरुद्ध कॉटेज, वैद्यकीय ऑक्सिजन आणि दर्शनाची पारदर्शक तुलना.' :
               language === 'bn' ? 'যানবাহন সুবিধা, হোমস্টে বনাম কটেজ, মেডিকেল অক্সিজেন ও দর্শনের স্পষ্ট তুলনা।' :
               'Transparent comparison of vehicle comfort, homestay vs wooden cottage accommodation, medical oxygen, and en-route temples.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-900 text-white">
                  <th className="py-3.5 px-4 font-black uppercase tracking-wider w-1/4">{t("Feature / Service")}</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider w-3/8 border-l border-slate-700 text-slate-200">
                    {t("Standard Yatra")} (₹28,000)
                  </th>
                  <th className="py-3.5 px-4 font-black bg-amber-400 text-slate-950 uppercase tracking-wider w-3/8 border-l border-amber-300">
                    {t("Premium Expedition")} (₹38,000) ⭐
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-slate-700">
                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Sacred Shrines Covered")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">
                    {language === 'hi' ? 'आदि कैलाश, ॐ पर्वत एवं पार्वती सरोवर (मुख्य परिपथ)' :
                     language === 'gu' ? 'આદિ કૈલાશ, ૐ પર્વત અને પાર્વતી સરોવર (મુખ્ય સર્કિટ)' :
                     language === 'mr' ? 'आदि कैलास, ॐ पर्वत आणि पार्वती सरोवर (मुख्य सर्किट)' :
                     language === 'bn' ? 'আদি কৈলাশ, ওঁ পর্বত ও পার্বতী সরোবর (মূল সার্কিট)' :
                     'Adi Kailash, Om Parvat & Parvati Sarovar (Core Circuit)'}
                  </td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {language === 'hi' ? 'मुख्य परिपथ + पाताल भुवनेश्वर, जागेश्वर धाम व कैंची धाम (विस्तारित)' :
                     language === 'gu' ? 'મુખ્ય સર્કિટ + પાતાળ ભુવનેશ્વર, જાગેશ્વર ધામ અને કૈંચી ધામ (વિસ્તૃત)' :
                     language === 'mr' ? 'मुख्य सर्किट + पाताळ भुवनेश्वर, जागेश्वर धाम आणि कैंची धाम (विस्तारित)' :
                     language === 'bn' ? 'মূল সার্কিট + পাতাল ভুবনেশ্বর, জাগেশ্বর ধাম ও ক্যাঁচি ধাম (বর্ধিত)' :
                     'Core Circuit + Patal Bhuvaneshwar, Jageshwar Dham & Kainchi Dham (Extended)'}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Vehicle & Transportation")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Shared Bolero 4x4 / Tempo Traveller")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Comfortable 4x4 SUV (Scorpio / Isuzu) — Max 4 Yatris per SUV")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900 flex flex-col items-start gap-1">
                    <span>{t("Accommodation Type")}</span>
                    <button
                      onClick={() => onSelectSeoPage && onSelectSeoPage('gunji-nabhi-jolingkong-homestays')}
                      className="text-[10px] text-[#C91D24] font-bold underline flex items-center gap-0.5 hover:text-red-900 cursor-pointer"
                    >
                      <span>{language === 'hi' ? 'होटल सूची देखें →' : language === 'gu' ? 'હોટેલ યાદી જુઓ →' : language === 'mr' ? 'हॉटेल यादी पहा →' : language === 'bn' ? 'হোটেল তালিকা দেখুন →' : 'View Hotel Directory →'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Clean & Hygienic Traditional Village Homestays")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Premium Hotels in Pithoragarh + Authentic Wooden Cottages in Nabi")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Room Occupancy & Bedding")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Triple / Quad Sharing Rooms")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Double / Twin Sharing Rooms with Heated Fleece Blankets")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Daily Meals & Beverages")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Daily Sattvik Breakfast & Dinner")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Daily Sattvik Breakfast, Dinner & Hot Evening Tea / Mountain Snacks")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Dedicated Tour Leads")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Group Tour Coordinator Support")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Dedicated Coordinator + Female Trek Leader + Photography Assistant")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("High-Altitude Oxygen Support")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Basic Oxygen Canister Availability")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Priority Medical Oxygen Cylinder + Pulse Oximeter Monitoring")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Inner Line Permit (ILP)")}</td>
                  <td className="py-3 px-4 border-l border-slate-200">{t("Full SDM & ITBP Permit Management")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 font-medium text-slate-900 bg-amber-50/40">
                    {t("Priority Express ILP Clearance Assistance")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-100/60">
                  <td className="py-3 px-4 font-bold text-slate-900">{t("Best Suited Traveler Profile")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 text-slate-700">{t("Budget travelers, solo yatris & youth pilgrims")}</td>
                  <td className="py-3 px-4 border-l border-slate-200 text-amber-900 font-bold bg-amber-50/40">
                    {t("Families, couples, senior citizens & comfort seekers")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-300">
            <p className="text-[11px] text-slate-500 italic">
              {language === 'hi' ? '* नोट: दोनों पैकेजों में टोल टैक्स, पार्किंग, ड्राइवर भत्ता एवं ईंधन शामिल है। गोट्रेक ट्रेवल्स केएमवीएन एवं सरकारी मान्यता प्राप्त ऑपरेटर है।' :
               language === 'gu' ? '* નોંધ: બંને પેકેજમાં ટોલ, પાર્કિંગ, ડ્રાઇવર ભથ્થું અને ઇંધણ શામેલ છે. ગોટ્રેક સરકાર માન્ય અને કેએમવીએન ઓપરેટર છે.' :
               language === 'mr' ? '* नोंद: दोन्ही पॅकेजेसमध्ये टोल, पार्किंग आणि ड्रायव्हर भत्ता समाविष्ट आहे. गोट्रेक शासन मान्यताप्राप्त ऑपरेटर आहे.' :
               language === 'bn' ? '* দ্রষ্টব্য: উভয় প্যাকেজেই টোল, পার্কিং ও চালকের ভাতা অন্তর্ভুক্ত। গোত্রেক ট্রাভেলস একটি সরকার নিবন্ধিত ট্যুর অপারেটর।' :
               '* Note: Both packages include toll tax, parking, driver allowance, and fuel charges. GoTrek Travels is a KMVN Approved and Govt Licensed Operator.'}
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => onSelectPackage && onSelectPackage("adi-kailash-yatra-standard")}
                className="px-4 py-2 rounded-full border border-slate-400 hover:border-slate-900 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                {t("Standard Details (₹28,000)")}
              </button>
              <button
                onClick={() => onSelectPackage && onSelectPackage("adi-kailash-spiritual-expedition-premium")}
                className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-black text-amber-400 transition-colors cursor-pointer"
              >
                {t("Premium Details (₹38,000) ⭐")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

YatraTiers.displayName = "YatraTiers";
