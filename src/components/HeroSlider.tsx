import React, { useState, useEffect, useRef, memo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage, Language } from "../context/LanguageContext";
import { BlurUpImage } from "./BlurUpImage";
import { getDestinationBlurPlaceholder } from "../utils/blurPlaceholders";

interface HeroSliderProps {
  onOpenInquiry: (destination?: string) => void;
  onOpenAiConsultant: () => void;
  onSelectDestination?: (slug: string) => void;
}

interface BannerSlide {
  id: string;
  tagline: Record<Language, string>;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  bullets: Record<Language, string[]>;
  mountainBg: string;
  blurDataURL?: string;
  buttonText: Record<Language, string>;
  destinationSlug: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "adi-kailash-2027",
    tagline: {
      en: "OFFICIAL YATRA 2027 • ₹32,500/- ONWARDS",
      hi: "पावन यात्रा 2027 • ₹32,500/- से प्रारंभ",
      gu: "પવિત્ર યાત્રા 2027 • ₹32,500/- થી શરૂ",
      mr: "पावन यात्रा 2027 • ₹32,500/- पासून",
      bn: "পবিত্র যাত্রা ২০২৭ • ₹৩২,৫০০/- থেকে শুরু"
    },
    title: {
      en: "ADI KAILASH & OM PARVAT",
      hi: "आदि कैलाश एवं ॐ पर्वत",
      gu: "આદિ કૈલાશ અને ૐ પર્વત",
      mr: "आदि कैलास आणि ॐ पर्वत",
      bn: "আদি কৈলাশ ও ওঁ পর্বত"
    },
    subtitle: {
      en: "Chhota Kailash & Parvati Sarovar Darshan in Pristine Vyas Valley • 100% Indian Route",
      hi: "व्यास घाटी में पावन छोटा कैलाश एवं पार्वती सरोवर दर्शन • 100% भारतीय क्षेत्र",
      gu: "વ્યાસ ઘાટીમાં પવિત્ર છોટા કૈલાશ અને પાર્વતી સરોવર દર્શન • 100% ભારતીય માર્ગ",
      mr: "व्यास खोऱ्यात पावन छोटा कैलास आणि पार्वती सरोवर दर्शन • 100% भारतीय मार्ग",
      bn: "ব্যাস উপত্যকায় পবিত্র ছোট কৈলাশ ও পার্বতী সরোবর দর্শন • ১০০% ভারতীয় ভূখণ্ড"
    },
    bullets: {
      en: [
        "Direct darshan of natural sacred ॐ snow formation at 14,500 FT",
        "Holy snan & rituals at pristine Parvati Sarovar & Gauri Kund",
        "Inner Line Permit (ILP) clearance from SDM Dharchula within 48 hrs",
        "Authentic warm wooden homestays in Nabi & Gunji with sattvik meals",
        "Experienced local Kumaoni mountain drivers & 24/7 high-altitude medic",
        "100% Indian Territory route — No passport or China visa required"
      ],
      hi: [
        "14,500 फीट पर प्राकृतिक बर्फ निर्मित पवित्र ॐ के साक्षात दर्शन",
        "पवित्र पार्वती सरोवर व गौरी कुंड में पावन स्नान एवं शिव पूजा",
        "धारचूला प्रशासन से 48 घंटे में इनर लाइन परमिट (ILP) स्वीकृति",
        "नाबी व गुंजी में शुद्ध सात्विक भोजन सहित पारंपरिक काष्ठ होमस्टे",
        "अनुभवी कुमाऊंनी चालक एवं 24/7 उच्च-तुंगता मेडिकल टीम",
        "100% भारतीय सीमा मार्ग — किसी पासपोर्ट या वीजा की आवश्यकता नहीं"
      ],
      gu: [
        "14,500 ફૂટે કુદરતી બરફ દ્વારા બનેલા પવિત્ર ૐ ના સાક્ષાત દર્શન",
        "પવિત્ર પાર્વતી સરોવર અને ગૌરી કુંડમાં પાવન સ્નાન અને શિવ પૂજા",
        "ધારચૂલા વહીવટીતંત્ર તરફથી 48 કલાકમાં ઇનર લાઇન પરમિટ (ILP)",
        "નાબી અને ગુંજીમાં શુદ્ધ સાત્વિક ભોજન સાથે પરંપરાગત હોમસ્ટે",
        "અનુભવી કુમાઉની ડ્રાઇવરો અને 24/7 હાઇ-ઓલ્ટિટ્યુડ મેડિકલ ટીમ",
        "100% ભારતીય ક્ષેત્ર માર્ગ — પાસપોર્ટ કે વિઝાની જરૂર નથી"
      ],
      mr: [
        "14,500 फुटांवर नैसर्गिक बर्फाने कोरलेल्या पवित्र ॐ चे साक्षात दर्शन",
        "पवित्र पार्वती सरोवर आणि गौरी कुंडात पावन स्नान व शिव पूजा",
        "धारचुला प्रशासनाकडून 48 तासांत इनर लाइन परमिट (ILP) मंजुरी",
        "नाबी आणि गुंजी येथे शुद्ध सात्विक भोजनासह पारंपरिक होमस्टे",
        "अनुभवी कुमाऊंनी चालक आणि 24/7 उच्च-उंची वैद्यकीय पथक",
        "100% भारतीय सीमा मार्ग — पासपोर्ट किंवा व्हिसाची आवश्यकता नाही"
      ],
      bn: [
        "১৪,৫০০ ফুটে প্রাকৃতিকভাবে বরফে গঠিত পবিত্র ওঁ-এর প্রত্যক্ষ দর্শন",
        "পবিত্র পার্বতী সরোবর ও গৌরী কুণ্ডে পুণ্যস্নান ও শিব আরাধনা",
        "ধারচুলা প্রশাসন থেকে ৪৮ ঘণ্টার মধ্যে ইনার লাইন পারমিট (ILP)",
        "নাবী ও গুঞ্জিতে খাঁটি সাত্বিক খাবার সহ ঐতিহ্যবাহী কাঠের হোমস্টে",
        "অভিজ্ঞ স্থানীয় কুমাওনী চালক ও ২৪/৭ উচ্চতা মেডিকেল টিম",
        "১০০% ভারতীয় ভূখণ্ডের পথ — পাসপোর্ট বা ভিসার প্রয়োজন নেই"
      ]
    },
    mountainBg: "/images/destinations/adi-kailash3.webp",
    blurDataURL: getDestinationBlurPlaceholder("adi-kailash"),
    buttonText: {
      en: "Book Adi Kailash 2027",
      hi: "आदि कैलाश 2027 बुक करें",
      gu: "આદિ કૈલાશ 2027 બુક કરો",
      mr: "आदि कैलास 2027 बुक करा",
      bn: "আদি কৈলাশ ২০২৭ বুক করুন"
    },
    destinationSlug: "adi-kailash"
  },
  {
    id: "promise-apart",
    tagline: {
      en: "PROMISE THAT SETS US APART",
      hi: "हमारा पावन संकल्प",
      gu: "અમારો પવિત્ર સંકલ્પ",
      mr: "आमचा पावन संकल्प",
      bn: "আমাদের পবিত্র সংকল্প"
    },
    title: {
      en: "WHY PILGRIMS CHOOSE US",
      hi: "तीर्थयात्री हमें क्यों चुनते हैं",
      gu: "યાત્રિકો અમને કેમ પસંદ કરે છે",
      mr: "यात्रेकरू आम्हाला का निवडतात",
      bn: "কেন তীর্থযাত্রীরা আমাদের বেছে নেন"
    },
    subtitle: {
      en: "Uttarakhand Tourism Registered Direct Local Ground Operator #UTTR/PITHORAGARH/04-2026/450066",
      hi: "उत्तराखंड पर्यटन पंजीकृत स्थानीय ग्राउंड ऑपरेटर #UTTR/PITHORAGARH/04-2026/450066",
      gu: "ઉત્તરાખંડ પર્યટન નોંધાયેલ સ્થાનિક ગ્રાઉન્ડ ઓપરેટર",
      mr: "उत्तराखंड पर्यटन नोंदणीकृत स्थानिक ग्राउंड ऑपरेटर",
      bn: "উত্তরাখণ্ড পর্যটন নিবন্ধিত স্থানীয় গ্রাউন্ড অপারেটর"
    },
    bullets: {
      en: [
        "Panchang based sacred yatra dates & shubh muhurat departures",
        "GoTrek exclusive small groups (custom 4x4 Bolero fleet with 5-6 yatris)",
        "Verified mountain homestays & deluxe hotels with heated rooms",
        "Emergency medical oxygen cylinders & daily pulse-oximeter checkups",
        "Native Kumaoni support staff with 15+ yrs high-altitude expertise",
        "Transparent pricing with zero hidden charges & zero sub-contracting"
      ],
      hi: [
        "पंचांग आधारित पावन यात्रा तिथियां एवं शुभ मुहूर्त",
        "गोट्रेक विशेष छोटे समूह (कस्टम 4x4 बोलेरो फ्लीट)",
        "प्रमाणित पर्वतीय होमस्टे एवं डीलक्स होटल",
        "मेडिकल ऑक्सीजन सिलिंडर एवं प्रतिदिन स्वास्थ्य जांच",
        "15+ वर्ष अनुभवी स्थानीय कुमाऊंनी ग्राउंड स्टाफ",
        "पारदर्शी दरें • शून्य छिपे शुल्क • शून्य बिचौलिया"
      ],
      gu: [
        "પંચાંગ આધારિત પવિત્ર યાત્રા તારીખો અને શુભ મુહૂર્ત",
        "ગોટ્રેક સ્પેશિયલ નાના જૂથો (કસ્ટમ 4x4 બોલેરો કાફલો)",
        "પ્રમાણિત પહાડી હોમસ્ટે અને ડીલક્સ હોટેલ",
        "મેડિકલ ઓક્સિજન સિલિન્ડર અને દૈનિક સ્વાસ્થ્ય તપાસ",
        "15+ વર્ષના અનુભવી સ્થાનિક કુમાઉની ગ્રાઉન્ડ સ્ટાફ",
        "પારદર્શક ભાડું • શૂન્ય છુપાયેલા ચાર્જ • સીધું સંચાલન"
      ],
      mr: [
        "पंचांग आधारित पावन यात्रा तारखा आणि शुभ मुहूर्त",
        "गोट्रेक विशेष लहान गट (कस्टम 4x4 बोलेरो ताफा)",
        "प्रमाणित पर्वतीय होमस्टे आणि डिलक्स हॉटेल्स",
        "वैद्यकीय ऑक्सिजन सिलिंडर आणि दैनंदिन आरोग्य तपासणी",
        "15+ वर्षे अनुभवी स्थानिक कुमाऊंनी ग्राउंड कर्मचारी",
        "पारदर्शक दर • शून्य लपलेले शुल्क • थेट ऑपरेशन्स"
      ],
      bn: [
        "পঞ্জিকা ভিত্তিক পবিত্র যাত্রার তারিখ ও শুভ মুহূর্ত",
        "গোত্রেক বিশেষ ছোট দল (কাস্টম ৪x৪ বোলেরো বহর)",
        "যাচাইকৃত পাহাড়ি হোমস্টে ও ডিলাক্স হোটেল",
        "মেডিকেল অক্সিজেন সিলিন্ডার ও প্রতিদিন স্বাস্থ্য পরীক্ষা",
        "১৫+ বছরের অভিজ্ঞ স্থানীয় কুমাওনী গ্রাউন্ড স্টাফ",
        "স্বচ্ছ মূল্য • শূন্য লুকানো চার্জ • সরাসরি পরিচালনা"
      ]
    },
    mountainBg: "/images/destinations/kailash-mansarovar.webp",
    blurDataURL: getDestinationBlurPlaceholder("mansarovar"),
    buttonText: {
      en: "Book Yatra 2027",
      hi: "2027 यात्रा बुक करें",
      gu: "2027 યાત્રા બુક કરો",
      mr: "2027 यात्रा बुक करा",
      bn: "২০২৭ যাত্রা বুক করুন"
    },
    destinationSlug: "adi-kailash"
  },
  {
    id: "kailash-lipulekh",
    tagline: {
      en: "HISTORIC INDIAN VANTAGE",
      hi: "ऐतिहासिक भारतीय दृष्टिकोण",
      gu: "ઐતિહાસિક ભારતીય દર્શન",
      mr: "ऐतिहासिक भारतीय दर्शन",
      bn: "ঐতিহাসিক ভারতীয় দর্শন"
    },
    title: {
      en: "KAILASH MANSAROVAR",
      hi: "कैलाश मानसरोवर दर्शन",
      gu: "કૈલાશ માનસરોવર દર્શન",
      mr: "कैलास मानसरोवर दर्शन",
      bn: "কৈলাশ মানস সরোবর দর্শন"
    },
    subtitle: {
      en: "Holy Darshan from Old Lipulekh Pass (18,300 FT) Without Entering Tibet",
      hi: "तिब्बत जाए बिना पुराने लिपुलेख दर्रे (18,300 फीट) से दिव्य दर्शन",
      gu: "તિબેટ ગયા વિના જૂના લિપુલેખ પાસ (18,300 ફૂટ) થી દિવ્ય દર્શન",
      mr: "तिबेटमध्ये न जाता जुन्या लिपुलेख खिंडीतून (18,300 फूट) दिव्य दर्शन",
      bn: "তিব্বত না গিয়ে ওল্ড লিপুলেখ পাস (১৮,৩০০ ফুট) থেকে পবিত্র দর্শন"
    },
    bullets: {
      en: [
        "Close-up divine view of Mount Kailash peak & Lake Mansarovar",
        "Operated fully in Indian territory via the newly cleared border road",
        "ITBP and Uttarakhand Tourism certified safety protocols",
        "Comfortable scenic mountain halts at Dharchula, Gunji & Nabhi",
        "Dedicated pulse-oximeter, emergency oxygen & SAT-phone backup",
        "Special discounts for senior citizens and family pilgrim groups"
      ],
      hi: [
        "माउंट कैलाश शिखर एवं मानसरोवर झील के आलौकिक निकट दर्शन",
        "नवीन सीमा मार्ग द्वारा 100% भारतीय क्षेत्र में सुगम यात्रा",
        "आईटीबीपी एवं उत्तराखंड पर्यटन प्रमाणित सुरक्षा मानक",
        "धारचूला, गुंजी एवं नाबी में आरामदायक प्राकृतिक विश्राम",
        "ऑक्सीजन सिलिंडर, पल्स-ऑक्सीमीटर व सेटेलाइट संचार बैकअप",
        "वरिष्ठ नागरिकों एवं पारिवारिक तीर्थ समूहों हेतु विशेष छूट"
      ],
      gu: [
        "માઉન્ટ કૈલાશ શિખર અને માનસરોવર તળાવના અલૌકિક દર્શન",
        "નવા સીમા માર્ગ દ્વારા 100% ભારતીય વિસ્તારમાં સુગમ પ્રવાસ",
        "આઈટીબીપી અને ઉત્તરાખંડ પ્રવાસન પ્રમાણિત સુરક્ષા નિયમો",
        "ધારચૂલા, ગુંજી અને નાબી ખાતે આરામદાયક પહાડી રોકાણ",
        "ઓક્સિજન સિલિન્ડર અને પલ્સ-ઓક્સિમીટર સહિત સંપૂર્ણ તબીબી બેકઅપ",
        "વરિષ્ઠ નાગરિકો અને પરિવાર માટે વિશેષ રાહત"
      ],
      mr: [
        "माऊंट कैलास शिखर आणि मानसरोवर तलावाचे विहंगम दर्शन",
        "नवीन सीमा मार्गाने 100% भारतीय हद्दीत सुरक्षित प्रवास",
        "आयटीबीपी आणि उत्तराखंड पर्यटन प्रमाणित सुरक्षा मानके",
        "धारचुला, गुंजी आणि नाबी येथे आरामदायी निसर्गरम्य मुक्काम",
        "ऑक्सिजन सिलिंडर आणि पल्स-ऑक्सिमीटरसह तत्काळ वैद्यकीय मदत",
        "ज्येष्ठ नागरिक आणि कौटुंबिक गटांसाठी विशेष सवलत"
      ],
      bn: [
        "মাউন্ট কৈলাশ শৃঙ্গ এবং মানস সরোবরের দিব্য দর্শন",
        "নতুন সীমান্ত সড়ক দিয়ে সম্পূর্ণ ভারতীয় ভূখণ্ডে নিরাপদ যাত্রা",
        "আইটিবিপি এবং উত্তরাখণ্ড পর্যটন প্রত্যয়িত নিরাপত্তা প্রোটোকল",
        "ধারচুলা, গুঞ্জি এবং নাবী গ্রামে আরামদায়ক পাহাড়ি বিরতি",
        "অক্সিজেন সিলিন্ডার ও পালস-অক্সিমিটার সহ সার্বক্ষণিক ব্যাকআপ",
        "বয়োজ্যেষ্ঠ নাগরিক ও পারিবারিক তীর্থযাত্রী দলের জন্য বিশেষ ছাড়"
      ]
    },
    mountainBg: "/images/destinations/adi-kailash2.webp",
    blurDataURL: getDestinationBlurPlaceholder("kailash-lipulekh"),
    buttonText: {
      en: "Book Mansarovar View",
      hi: "मानसरोवर दर्शन बुक करें",
      gu: "માનસરોવર દર્શન બુક કરો",
      mr: "मानसरोवर दर्शन बुक करा",
      bn: "মানস সরোবর দর্শন বুক করুন"
    },
    destinationSlug: "kailash-mansarovar"
  },
  {
    id: "chardham-grand",
    tagline: {
      en: "DIVINE CIRCUIT 2027",
      hi: "दिव्य तीर्थ परिक्रमा 2027",
      gu: "દિવ્ય તીર્થ પરિક્રમા 2027",
      mr: "दिव्य तीर्थ परिक्रमा 2027",
      bn: "দিব্য তীর্থ পরিক্রমা ২০২৭"
    },
    title: {
      en: "CHAR DHAM MAHAYATRA",
      hi: "चार धाम महायात्रा",
      gu: "ચાર ધામ મહાયાત્રા",
      mr: "चार धाम महायात्रा",
      bn: "চার ধাম মহাযাত্রা"
    },
    subtitle: {
      en: "Yamunotri • Gangotri • Kedarnath • Badrinath with VIP Darshan",
      hi: "यमुनोत्री • गंगोत्री • केदारनाथ • बद्रीनाथ वीआईपी दर्शन सहित",
      gu: "યમુનોત્રી • ગંગોત્રી • કેદારનાથ • બદ્રીનાથ વીઆઈપી દર્શન સાથે",
      mr: "यमुनोत्री • गंगोत्री • केदारनाथ • बद्रीनाथ व्हीआयपी दर्शनासह",
      bn: "যমুনোত্রী • গঙ্গোত্রী • কেদারনাথ • বদ্রীনাথ ভিআইপি দর্শন সহ"
    },
    bullets: {
      en: [
        "All 4 sacred shrines covered in comfortable AC coaches / 4x4 SUVs",
        "Priority VIP darshan slip coordination & temple entry passes",
        "Helicopter shuttle assistance for Kedarnath Dham from Phata / Guptkashi",
        "Best river-touch riverside hotels & pure vegetarian sattvik dining",
        "Complimentary puja thali, Rudraksha mala & Ganga Jal brass container"
      ],
      hi: [
        "आरामदायक एसी वाहन / 4x4 एसयूवी द्वारा चारों पावन धामों के दर्शन",
        "प्राथमिकता वीआईपी दर्शन पर्ची एवं मंदिर प्रवेश सुविधा",
        "फाटा / गुप्तकाशी से केदारनाथ धाम हेतु हेलीकॉप्टर सेवा समन्वय",
        "नदी तट स्थित श्रेष्ठ होटल एवं शुद्ध वैष्णव सात्विक भोजन",
        "निःशुल्क विशेष पूजा थाली, रुद्राक्ष माला व पीतल गंगाजल पात्र"
      ],
      gu: [
        "આરામદાયક એસી વાહન / 4x4 એસયુવી દ્વારા ચારેય પવિત્ર ધામોના દર્શન",
        "વીઆઈપી દર્શન વ્યવસ્થા અને મંદિર પ્રવેશ પાસ સહાય",
        "ફાટા / ગુપ્તકાશીથી કેદારનાથ ધામ માટે હેલિકોપ્ટર સેવા સહાય",
        "શ્રેષ્ઠ રિવરસાઇડ હોટેલ્સ અને શુદ્ધ શાકાહારી સાત્વિક ભોજન",
        "વિશેષ પૂજા થાળી, રુદ્રાક્ષ માળા અને પિત્તળ ગંગાજળ કળશ ભેટ"
      ],
      mr: [
        "आरामदायी एसी वाहने / 4x4 एसयूव्ही द्वारे चारही पवित्र मंदिरांचे दर्शन",
        "व्हीआयपी दर्शन पावती समन्वय आणि मंदिर प्रवेश पास",
        "फाटा / गुप्तकाशी येथून केदारनाथसाठी हेलिकॉप्टर सेवा सहाय्य",
        "उत्कृष्ट नदीकाठची हॉटेल्स आणि शुद्ध सात्विक शाकाहारी जेवण",
        "विशेष पूजा थाळी, रुद्राक्ष माळ आणि पितळी गंगाजल पात्र मोफत"
      ],
      bn: [
        "আরামদায়ক এসি বাস / ৪x৪ এসইউভি যোগে চারটি পবিত্র ধাম ভ্রমণ",
        "ভিআইপি দর্শন স্লিপ এবং মন্দির প্রবেশ পাশের বিশেষ সমন্বয়",
        "ফাটা / গুপ্তকাশী থেকে কেদারনাথ ধামের জন্য হেলিকপ্টার শাটল সহায়তা",
        "নদীর তীরে সেরা হোটেল এবং খাঁটি নিরামিষ সাত্বিক আহার",
        "উপহারস্বরূপ পূজা থালি, রুদ্রাক্ষ মালা এবং পিতলের গঙ্গাজল পাত্র"
      ]
    },
    mountainBg: "/images/destinations/char-dham.webp",
    blurDataURL: getDestinationBlurPlaceholder("char-dham"),
    buttonText: {
      en: "Book Char Dham 2027",
      hi: "चार धाम 2027 बुक करें",
      gu: "ચાર ધામ 2027 બુક કરો",
      mr: "चार धाम 2027 बुक करा",
      bn: "চার ধাম ২০২৭ বুক করুন"
    },
    destinationSlug: "chardham-yatra"
  }
];

const SILKY_EASE = [0.16, 1, 0.3, 1] as const;
const BRISK_EXIT_EASE = [0.32, 0, 0.67, 0] as const;

// Master container orchestrates smooth exit and incoming stagger
const textContainerVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 16 : -16,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: SILKY_EASE,
      staggerChildren: 0.05,
      delayChildren: 0.03,
    }
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -12 : 12,
    transition: {
      duration: 0.25,
      ease: BRISK_EXIT_EASE,
    }
  })
};

const textItemVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 12 : -12,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: SILKY_EASE,
    }
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -10 : 10,
    transition: {
      duration: 0.2,
      ease: BRISK_EXIT_EASE,
    }
  })
};

const bulletItemVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 12 : -12,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: SILKY_EASE,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: BRISK_EXIT_EASE,
    }
  }
};

const visualVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    scale: 0.96,
    x: dir > 0 ? 20 : -20,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: SILKY_EASE,
    }
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.97,
    x: dir > 0 ? -15 : 15,
    transition: {
      duration: 0.2,
      ease: BRISK_EXIT_EASE,
    }
  })
};

export const HeroSlider = memo(({ onOpenInquiry, onOpenAiConsultant, onSelectDestination }: HeroSliderProps) => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  // Pause slider completely when scrolled out of view to save CPU and reduce background refresh
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Intelligent Sequential Slide Preloader with Async GPU Decoding
  useEffect(() => {
    const preloadSlides = () => {
      // Prioritize the immediate next slide, then remaining slides
      const nextSlide = BANNER_SLIDES[(currentIndex + 1) % BANNER_SLIDES.length];
      if (nextSlide?.mountainBg) {
        const nextImg = new Image();
        nextImg.decoding = "async";
        nextImg.src = nextSlide.mountainBg;
        nextImg.decode?.().catch(() => {});
      }

      // Preload all remaining slides into browser memory cache
      BANNER_SLIDES.forEach((slide, idx) => {
        if (idx === currentIndex) return;
        const img = new Image();
        img.decoding = "async";
        img.src = slide.mountainBg;
        img.decode?.().catch(() => {});
      });
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(preloadSlides, { timeout: 1200 });
      return () => (window as any).cancelIdleCallback?.(handle);
    } else {
      const timer = setTimeout(preloadSlides, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Keyboard navigation for desktop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto slide timer (relaxed to 9.5s to reduce refresh rate and pause when off-screen or tab hidden)
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % BANNER_SLIDES.length);
    }, 9500);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  const currentSlide = BANNER_SLIDES[currentIndex];
  const langKey = (['en', 'hi', 'gu', 'mr', 'bn'].includes(language) ? language : 'en') as Language;

  const currentTagline = currentSlide.tagline[langKey] || currentSlide.tagline.en;
  const currentTitle = currentSlide.title[langKey] || currentSlide.title.en;
  const currentSubtitle = currentSlide.subtitle[langKey] || currentSlide.subtitle.en;
  const currentBullets = currentSlide.bullets[langKey] || currentSlide.bullets.en;
  const currentButtonText = currentSlide.buttonText[langKey] || currentSlide.buttonText.en;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % BANNER_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section 
      id="hero"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full pt-36 sm:pt-40 lg:pt-44 pb-8 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EF] to-[#F5ECE0] select-none"
    >
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* Main Curved Hero Banner Card - Sacred Himalayan Sunrise & Starry Midnight */}
        <div 
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_22px_65px_-12px_rgba(7,14,28,0.5),0_0_40px_rgba(245,158,11,0.18)] border-2 border-amber-400/40 text-white min-h-[490px] sm:min-h-[550px] flex flex-col justify-between p-5 sm:p-8 lg:p-10"
          style={{
            backgroundColor: '#071120',
            backgroundImage: 'radial-gradient(circle at 82% 18%, rgba(245, 158, 11, 0.32) 0%, rgba(220, 38, 38, 0.22) 36%, transparent 72%), radial-gradient(circle at 12% 84%, rgba(217, 119, 6, 0.24) 0%, transparent 60%), linear-gradient(135deg, #050d1a 0%, #0d1e38 42%, #182e54 100%)'
          }}
        >
          
          {/* Subtle Background Mountain Texture Layer with Crossfade */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatePresence mode="sync">
              <motion.div 
                key={currentSlide.mountainBg}
                initial={isFirstMount.current ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 0.38, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={currentSlide.mountainBg}
                  alt=""
                  aria-hidden="true"
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  // @ts-ignore
                  fetchPriority={currentIndex === 0 ? "high" : "low"}
                  decoding="async"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Contrast Protection Gradient Layer with warm golden undertone */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(4, 9, 18, 0.92) 0%, rgba(7, 15, 29, 0.78) 55%, rgba(12, 23, 44, 0.35) 100%)'
            }}
          />

          {/* Left Arrow Nav Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/70 hover:bg-[#DC2626] text-amber-300 hover:text-white border border-amber-400/40 backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer focus:outline-none"
            aria-label="Previous Slide (Left Arrow)"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={22} className="stroke-[2.5]" />
          </button>

          {/* Right Arrow Nav Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/70 hover:bg-[#DC2626] text-amber-300 hover:text-white border border-amber-400/40 backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer focus:outline-none"
            aria-label="Next Slide (Right Arrow)"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={22} className="stroke-[2.5]" />
          </button>

          {/* Content Grid: Left Bullet Checklist + Right Devotee & Peak Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 my-auto pl-7 pr-7 sm:pl-10 sm:pr-10">
            
            {/* Left Column: Headline & Bullet Points with Silky Staggered Transition */}
            <div className="lg:col-span-7 min-h-[310px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={`${currentSlide.id}-${language}`}
                  custom={direction}
                  variants={textContainerVariants}
                  initial={isFirstMount.current ? false : "initial"}
                  animate="animate"
                  exit="exit"
                  className="space-y-4 text-left will-change-transform"
                >
                  
                  {/* Tagline & Headline */}
                  <motion.div 
                    variants={textItemVariants}
                    custom={direction}
                    className="space-y-2.5"
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-600/20 to-red-600/15 border border-amber-400/60 text-amber-300 text-[11px] font-black uppercase tracking-wider shadow-[0_2px_12px_rgba(245,158,11,0.25)] backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>{currentTagline}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {currentTitle.includes("&") ? (
                        <>
                          <span className="text-white">{currentTitle.split("&")[0]}</span>
                          <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                            & {currentTitle.split("&")[1]}
                          </span>
                        </>
                      ) : (
                        <span className="text-white">{currentTitle}</span>
                      )}
                    </h1>
                  </motion.div>

                  {/* Subtitle with Golden highlight */}
                  {currentSubtitle && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30">
                      <p className="text-xs sm:text-sm lg:text-[15px] font-extrabold text-amber-200 tracking-wide">
                        {currentSubtitle}
                      </p>
                    </div>
                  )}

                  {/* Clean Bullets List with Vibrant Emerald Badges */}
                  <ul className="space-y-2.5 text-xs sm:text-sm font-normal leading-relaxed pt-1">
                    {currentBullets.map((bullet, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-300/40 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black shadow-[0_2px_8px_rgba(16,185,129,0.45)]">
                          ✓
                        </div>
                        <span className="font-semibold text-white/95 text-[13px] sm:text-[14px] drop-shadow-xs">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons: Vermilion Crimson Primary + Radiant Amber Helpline */}
                  <motion.div 
                    variants={textItemVariants}
                    custom={direction}
                    className="flex flex-wrap items-center gap-3 pt-3"
                  >
                    <button
                      onClick={() => onOpenInquiry(currentSlide.title.en)}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] hover:from-[#EF4444] hover:to-[#B91C1C] text-white font-black text-xs uppercase tracking-wider shadow-[0_8px_25px_rgba(220,38,38,0.5)] border border-red-300/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>{currentButtonText}</span>
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </button>

                    <a
                      href="tel:+917248285767"
                      className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.35)] flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      title="Direct Dharchula Office Helpline"
                    >
                      <PhoneCall size={13} className="text-slate-950 fill-slate-950" />
                      <span>+91 7248285767</span>
                    </a>

                    {onSelectDestination && (
                      <button
                        onClick={() => onSelectDestination(currentSlide.destinationSlug)}
                        className="px-4 py-3.5 rounded-xl bg-white/12 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-amber-300/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <MapPin size={13} className="text-amber-300" />
                        <span>{t("common.viewDetails", "View Itinerary")}</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenAiConsultant}
                      className="px-4 py-3.5 rounded-xl bg-white/12 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles size={13} className="text-amber-300" />
                      <span>{t("nav.aiConcierge", "AI Concierge")}</span>
                    </button>
                  </motion.div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: High-Res Peak & Visual Frame with Radiant Golden Border */}
            <div className="lg:col-span-5 flex justify-center items-center relative min-h-[240px] sm:min-h-[300px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={`${currentSlide.id}-visual`}
                  custom={direction}
                  variants={visualVariants}
                  initial={isFirstMount.current ? false : "initial"}
                  animate="animate"
                  exit="exit"
                  className="w-full max-w-sm"
                >
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.22)] border-2 border-amber-400/50 bg-slate-950/40 group">
                    <BlurUpImage
                      src={currentSlide.mountainBg}
                      blurDataURL={currentSlide.blurDataURL || getDestinationBlurPlaceholder(currentSlide.destinationSlug || currentSlide.id)}
                      alt={currentTitle}
                      referrerPolicy="no-referrer"
                      loading={currentIndex === 0 ? "eager" : "lazy"}
                      priority={currentIndex === 0}
                      decoding="async"
                      preset="hero"
                      width={640}
                      height={360}
                      fallbackSrc={
                        currentSlide.id === "promise-apart"
                          ? "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=720&q=75&fm=webp"
                          : currentSlide.id === "adi-kailash-2027"
                          ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&q=75&fm=webp"
                          : currentSlide.id === "kailash-lipulekh"
                          ? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&q=75&fm=webp"
                          : "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=720&q=75&fm=webp"
                      }
                      containerClassName="w-full h-56 sm:h-72"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Right Floating Badge - Auspicious Red & Gold */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#DC2626] to-amber-600 border border-amber-300/60 text-white text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>2027 Batches Open</span>
                      </span>
                    </div>

                    {/* Gradient Scrim & Captions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-4 text-left pointer-events-none z-10">
                      <span className="text-[11px] uppercase font-black tracking-widest text-amber-300 drop-shadow-sm">
                        {language === 'hi' ? 'पावन दर्शन 2027' : language === 'gu' ? 'પવિત્ર દર્શન 2027' : language === 'mr' ? 'पावन दर्शन 2027' : language === 'bn' ? 'পবিত্র দর্শন ২০২৭' : 'Holy Darshan 2027'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-white leading-tight mt-0.5 drop-shadow-sm">
                        {currentSubtitle}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Slide Indicators with Animated Amber Glowing Progress */}
          <div className="flex items-center justify-center gap-2 pt-3 relative z-10">
            {BANNER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                  idx === currentIndex 
                    ? "w-10 sm:w-12 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] ring-1 ring-amber-300" 
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.id}`}
                aria-current={idx === currentIndex ? "true" : "false"}
              >
                {idx === currentIndex && (
                  <motion.div
                    key={`progress-pill-${currentIndex}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: isPaused ? 0 : 9.5, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
});

HeroSlider.displayName = "HeroSlider";
