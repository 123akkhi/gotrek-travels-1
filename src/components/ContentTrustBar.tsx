import React, { memo } from "react";
import { 
  FileCheck2, 
  MapPin, 
  ShieldCheck, 
  HeartPulse, 
  PhoneCall, 
  CheckCircle2,
  Calendar,
  Compass
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const ContentTrustBar = memo(() => {
  const { language } = useLanguage();

  const trustItems = [
    {
      icon: FileCheck2,
      title: language === 'hi' ? 'धारचूला एसडीएम परमिट' :
             language === 'gu' ? 'ધારચૂલા એસડીએમ પરમિટ' :
             language === 'mr' ? 'धारचुला एसडीएम परमिट' :
             language === 'bn' ? 'ধারচুলা এসডিএম পারমিট' : 'SDM Dharchula ILP',
      subtitle: language === 'hi' ? '48 घंटे में इनर लाइन परमिट स्वीकृति' :
                language === 'gu' ? '48 કલાકમાં ઇનર લાઇન પરમિટ મંજૂરી' :
                language === 'mr' ? '48 तासांत इनर लाइन परमिट मंजुरी' :
                language === 'bn' ? '৪৮ ঘণ্টার মধ্যে ইনার লাইন পারমিট' : '48-Hr Inner Line Permit Clearance',
      desc: language === 'hi' ? 'आधार कार्ड व मेडिकल फिटनेस द्वारा शत-प्रतिशत स्थानीय सहायता' :
            language === 'gu' ? 'આધાર કાર્ડ અને મેડિકલ ફિટનેસ દ્વારા સંપૂર્ણ સ્થાનિક સહાય' :
            language === 'mr' ? 'आधार कार्ड व मेडिकल फिटनेसद्वारे संपूर्ण स्थानिक मदत' :
            language === 'bn' ? 'আধার কার্ড ও মেডিকেল সার্টিফিকেট সহ স্থানীয় সহায়তা' : 'Complete filing assistance with Aadhar & Medical Certificate',
      badge: '100% Hassle-Free'
    },
    {
      icon: MapPin,
      title: language === 'hi' ? '100% भारतीय सीमा मार्ग' :
             language === 'gu' ? '100% ભારતીય સરહદ માર્ગ' :
             language === 'mr' ? '100% भारतीय सीमा मार्ग' :
             language === 'bn' ? '১০০% ভারতীয় সীমান্ত পথ' : '100% Indian Territory',
      subtitle: language === 'hi' ? 'शून्य पासपोर्ट • शून्य चीन वीजा' :
                language === 'gu' ? 'પાસપોર્ટ કે ચીન વિઝા વગર' :
                language === 'mr' ? 'पासपोर्ट किंवा चीन व्हिसा नाही' :
                language === 'bn' ? 'পাসপোর্ট বা চীন ভিসা ছাড়াই' : 'Zero Passport • Zero China Visa',
      desc: language === 'hi' ? 'धारचूला से नाबी-गुंजी नवीन भारतीय सीमा सड़क द्वारा सुगम यात्रा' :
            language === 'gu' ? 'ધારચૂલાથી નાબી-ગુંજી નવા ભારતીય રસ્તા દ્વારા સુગમ પ્રવાસ' :
            language === 'mr' ? 'धारचुला ते नाबी-गुंजी नवीन भारतीय रस्त्याने सुरक्षित प्रवास' :
            language === 'bn' ? 'ধারচুলা থেকে নাবী-গুঞ্জি নতুন ভারতীয় সীমান্ত সড়কে ভ্রমণ' : 'Direct travel via newly cleared border road to Vyas Valley',
      badge: 'No Visa Needed'
    },
    {
      icon: HeartPulse,
      title: language === 'hi' ? 'उच्च-तुंगता मेडिकल सुरक्षा' :
             language === 'gu' ? 'હાઇ-ઓલ્ટિટ્યુડ મેડિકલ સુરક્ષા' :
             language === 'mr' ? 'उच्च-उंची वैद्यकीय सुरक्षा' :
             language === 'bn' ? 'উচ্চতা মেডিকেল সুরক্ষা' : 'High-Altitude Medical Safety',
      subtitle: language === 'hi' ? 'गुंजी व जोलींगकोंग में ऑक्सीजन' :
                language === 'gu' ? 'ગુંજી અને જોલિંગકોંગમાં ઓક્સિજન' :
                language === 'mr' ? 'गुंजी व जोलींगकोंग येथे ऑक्सिजन' :
                language === 'bn' ? 'গুঞ্জি ও জোলিংকংয়ে অক্সিজেন' : 'Oxygen Cylinders on Site',
      desc: language === 'hi' ? 'प्रतिदिन पल्स-ऑक्सीमीटर जांच एवं अनुभवी चिकित्सक समन्वय' :
            language === 'gu' ? 'રોજિંદા પલ્સ-ઓક્સિમીટર તપાસ અને તબીબી માર્ગદર્શન' :
            language === 'mr' ? 'रोज पल्स-ऑक्सिमीटर तपासणी व वैद्यकीय मदत' :
            language === 'bn' ? 'নিয়মিত পালস-অক্সিমিটার পরীক্ষা ও ডাক্তার সহায়তা' : 'Daily health checkups & emergency medical backup at 14,500 FT',
      badge: 'Doctor on Call'
    },
    {
      icon: ShieldCheck,
      title: language === 'hi' ? 'विशेष 4x4 बोलेरो फ्लीट' :
             language === 'gu' ? 'વિશેષ 4x4 બોલેરો કાફલો' :
             language === 'mr' ? 'विशेष 4x4 बोलेरो ताफा' :
             language === 'bn' ? 'বিশেষ ৪x৪ বোলেরো বহর' : 'Custom 4x4 Bolero Fleet',
      subtitle: language === 'hi' ? '15+ वर्ष अनुभवी कुमाऊंनी चालक' :
                language === 'gu' ? '15+ વર્ષના અનુભવી સ્થાનિક ડ્રાઈવર' :
                language === 'mr' ? '15+ वर्षे अनुभवी स्थानिक चालक' :
                language === 'bn' ? '১৫+ বছরের অভিজ্ঞ পাহাড়ি চালক' : 'Local Kumaoni Mountain Drivers',
      desc: language === 'hi' ? 'प्रति वाहन केवल 5-6 यात्री • सुरक्षित पर्वतीय ड्राइविंग' :
            language === 'gu' ? 'વાહન દીઠ માત્ર 5-6 યાત્રીઓ • સલામત ડ્રાઇવિંગ' :
            language === 'mr' ? 'प्रत्येक वाहनात फक्त 5-6 यात्रेकरू • सुरक्षित प्रवास' :
            language === 'bn' ? 'গাড়িতে মাত্র ৫-৬ জন যাত্রী • নিরাপদ পাহাড়ি ভ্রমণ' : 'Small groups of 5-6 pilgrims per vehicle for maximum safety',
      badge: 'Native Drivers'
    }
  ];

  const cardStyles = [
    {
      topBorder: "border-t-[#DC2626]",
      iconBg: "bg-red-50 text-[#DC2626] border-red-200/80",
      accentText: "text-[#DC2626]",
      badgeClass: "bg-red-100 text-red-800 border-red-200"
    },
    {
      topBorder: "border-t-amber-500",
      iconBg: "bg-amber-50 text-amber-700 border-amber-200/80",
      accentText: "text-amber-700",
      badgeClass: "bg-amber-100 text-amber-900 border-amber-200"
    },
    {
      topBorder: "border-t-emerald-600",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      accentText: "text-emerald-700",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      topBorder: "border-t-blue-600",
      iconBg: "bg-blue-50 text-blue-700 border-blue-200/80",
      accentText: "text-blue-700",
      badgeClass: "bg-blue-100 text-blue-800 border-blue-200"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF9] to-[#FAF7F0] border-b border-amber-100/80 py-8 sm:py-10 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Trust Grid - Content First with Vibrant Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            const style = cardStyles[idx % cardStyles.length];
            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 border-t-4 ${style.topBorder} hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-0.5 transition-all space-y-2 flex flex-col justify-between shadow-xs`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${style.iconBg} border flex items-center justify-center font-bold shadow-2xs`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className={`text-xs font-bold ${style.accentText} mt-0.5`}>
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>GoTrek Verified Direct Operator</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact & Gov Registration Banner - Royal Navy with Golden Accents */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#060E1D] via-[#0E1F3D] to-[#162B50] border border-amber-400/30 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 hidden sm:inline-block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-slate-200 font-medium leading-relaxed">
              Uttarakhand Tourism Reg: <strong className="text-amber-300 font-mono font-bold">#UTTR/PITHORAGARH/04-2026/450066</strong> | MSME: <strong className="text-amber-300 font-mono font-bold">#UDYAM-UK-09-0011014</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 font-bold text-xs shrink-0">
            <span className="text-amber-200/80 hidden md:inline font-semibold">24/7 Dharchula Helpline:</span>
            <a 
              href="tel:+917248285767" 
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-red-300/30"
            >
              <PhoneCall size={13} className="text-white fill-white" />
              <span>+91 7248285767</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

ContentTrustBar.displayName = "ContentTrustBar";
export default ContentTrustBar;
