import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'gu' | 'mr' | 'bn';

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'Global / Pan-India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'उत्तर एवं मध्य भारत' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'ગુજરાત' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'महाराष्ट्र' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'পশ্চিমবঙ্গ ও ত্রিপুরা' },
];

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  translate: (text: string) => string;
  supportedLanguages: LanguageMeta[];
  currentLanguageMeta: LanguageMeta;
}

// 1. Key-based translations for structured UI elements
export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Brand
  'brand.name': {
    en: 'GOTREK TRAVELS',
    hi: 'गोट्रेक ट्रैवल्स',
    gu: 'ગોટ્રેક ટ્રાવેલ્સ',
    mr: 'गोट्रेक ट्रॅव्हल्स',
    bn: 'গোত্রেক ট্রাভেলস',
  },
  'brand.subtitle': {
    en: 'Pithoragarh HQ • Official Pilgrimages & Treks',
    hi: 'पिथौरागढ़ मुख्यालय • आधिकारिक तीर्थ यात्राएं',
    gu: 'પિથોરાગઢ મુખ્યમથક • અધિકૃત તીર્થ યાત્રાઓ',
    mr: 'पिथोरागड मुख्यालय • अधिकृत तीर्थयात्रा',
    bn: 'পিথোরাগড় সদর দপ্তর • অফিসিয়াল তীর্থযাত্রা',
  },

  // Navigation
  'nav.emergency': {
    en: 'Emergency',
    hi: 'आपातकाल',
    gu: 'કટોકટી',
    mr: 'आणीबाणी',
    bn: 'জরুরি',
  },
  'nav.emergencySos': {
    en: 'One-Click Emergency SOS',
    hi: 'वन-क्लिक आपातकालीन सहायता',
    gu: 'વન-ક્લિક ઇમરજન્સી SOS',
    mr: 'वन-क्लिक आणीबाणी SOS',
    bn: 'ওয়ান-ক্লিক জরুরি এসওএস',
  },
  'nav.home': {
    en: 'Home',
    hi: 'मुख्य पृष्ठ',
    gu: 'મુખ્ય પૃષ્ઠ',
    mr: 'मुख्य पृष्ठ',
    bn: 'মূল পাতা',
  },
  'nav.destinations': {
    en: 'Destinations',
    hi: 'गंतव्य',
    gu: 'સ્થળો',
    mr: 'गंतव्य स्थाने',
    bn: 'গন্তব্য',
  },
  'nav.allDestinations': {
    en: 'All Destinations',
    hi: 'सभी पवित्र गंतव्य',
    gu: 'બધા પવિત્ર સ્થળો',
    mr: 'सर्व पवित्र स्थाने',
    bn: 'সমস্ত পবিত্র গন্তব্য',
  },
  'nav.b2b': {
    en: 'B2B Portal',
    hi: 'बी2बी पोर्टल',
    gu: 'બી2બી પોર્ટલ',
    mr: 'बी2बी पोर्टल',
    bn: 'বি২বি পোর্টাল',
  },
  'nav.guides': {
    en: 'Guides',
    hi: 'मार्गदर्शिका',
    gu: 'માર્ગદર્શિકા',
    mr: 'मार्गदर्शक',
    bn: 'নির্দেশিকা',
  },
  'nav.ourTeam': {
    en: 'Ground Team',
    hi: 'स्थानीय टीम',
    gu: 'ગ્રાઉન્ડ ટીમ',
    mr: 'स्थानिक टीम',
    bn: 'মাঠ পর্যায়ের টিম',
  },
  'nav.aboutUs': {
    en: 'About Us',
    hi: 'हमारे बारे में',
    gu: 'અમારા વિશે',
    mr: 'आमच्याबद्दल',
    bn: 'আমাদের সম্পর্কে',
  },
  'nav.careers': {
    en: 'Careers',
    hi: 'करियर',
    gu: 'કારકિર્દી',
    mr: 'करिअर',
    bn: 'ক্যারিয়ার',
  },
  'nav.contact': {
    en: 'Contact',
    hi: 'संपर्क करें',
    gu: 'સંપર્ક કરો',
    mr: 'संपर्क साधा',
    bn: 'যোগাযোগ করুন',
  },
  'nav.attire': {
    en: 'Attire Guide',
    hi: 'पहनावा निर्देश',
    gu: 'પોશાક માર્ગદર્શિકા',
    mr: 'पोशाख मार्गदर्शक',
    bn: 'পোশাক গাইড',
  },
  'nav.aiConcierge': {
    en: 'AI Concierge',
    hi: 'एआई यात्रा सहायक',
    gu: 'એઆઈ યાત્રા સહાયક',
    mr: 'एआय यात्रा सहाय्यक',
    bn: 'এআই তীর্থ সহকারী',
  },
  'nav.staffPortal': {
    en: 'Staff Portal',
    hi: 'स्टाफ पोर्टल',
    gu: 'સ્ટાફ પોર્ટલ',
    mr: 'स्टाफ पोर्टल',
    bn: 'স্টাফ পোর্টাল',
  },
  'nav.exitPortal': {
    en: 'Exit Portal',
    hi: 'पोर्टल बंद करें',
    gu: 'પોર્ટલ બંધ કરો',
    mr: 'पोर्टल बंद करा',
    bn: 'পোর্টাল বন্ধ করুন',
  },
  'nav.bookYatra': {
    en: 'Book Yatra',
    hi: 'यात्रा बुक करें',
    gu: 'યાત્રા બુક કરો',
    mr: 'यात्रा बुक करा',
    bn: 'যাত্রা বুক করুন',
  },
  'nav.sacredPilgrimages': {
    en: 'Sacred Pilgrimages 2027',
    hi: 'पवित्र यात्राएं 2027',
    gu: 'પવિત્ર યાત્રાઓ 2027',
    mr: 'पवित्र यात्रा 2027',
    bn: 'পবিত্র তীর্থযাত্রা ২০২৭',
  },
  'nav.costCalculator': {
    en: 'Cost Calculator',
    hi: 'लागत गणक',
    gu: 'ખર્ચ કેલ્ક્યુલેટર',
    mr: 'खर्च गणक',
    bn: 'খরচ ক্যালকুলেটর',
  },
  'nav.yatraReels': {
    en: 'Yatra Reels',
    hi: 'यात्रा रील्स',
    gu: 'યાત્રા રીલ્સ',
    mr: 'यात्रा रील्स',
    bn: 'যাত্রা রিলস',
  },
  'nav.newsBlogs': {
    en: 'News & Blogs',
    hi: 'समाचार व ब्लॉग',
    gu: 'સમાચાર અને બ્લોગ',
    mr: 'बातम्या आणि ब्लॉग',
    bn: 'খবর ও ব্লগ',
  },
  'nav.memories': {
    en: 'Memories',
    hi: 'पावन स्मृतियां',
    gu: 'પવિત્ર યાદો',
    mr: 'पावन आठवणी',
    bn: 'পবিত্র স্মৃতি',
  },
  'nav.login': {
    en: 'Log In',
    hi: 'लॉग इन',
    gu: 'લૉગ ઇન',
    mr: 'लॉग इन',
    bn: 'লগ ইন',
  },
  'nav.searchPlaceholder': {
    en: 'Search Adi Kailash, Om Parvat, Permits, Dates...',
    hi: 'आदि कैलाश, ॐ पर्वत, परमिट, तारीखें खोजें...',
    gu: 'આદિ કૈલાશ, ૐ પર્વત, પરમિટ, તારીખો શોધો...',
    mr: 'आदि कैलास, ॐ पर्वत, परमिट, तारखा शोधा...',
    bn: 'আদি কৈলাশ, ওঁ পর্বত, পারমিট, তারিখ খুঁজুন...',
  },

  // Live Ticker
  'ticker.permits': {
    en: 'Official Govt Inner Line Permit Desk Open for 2027 Batches',
    hi: '2027 बैच के लिए आधिकारिक सरकारी इनर लाइन परमिट चालू है',
    gu: '2027 બેચ માટે સરકારી ઇનર લાઇન પરમિટ ડેસ્ક શરૂ છે',
    mr: '2027 बॅचसाठी अधिकृत सरकारी इनर लाइन परमिट डेस्क सुरू आहे',
    bn: '২০২৭ ব্যাচের জন্য অফিসিয়াল সরকারি ইনার লাইন পারমিট খোলা রয়েছে',
  },
  'ticker.contact': {
    en: 'Call Pithoragarh HQ:',
    hi: 'पिथौरागढ़ मुख्यालय कॉल करें:',
    gu: 'પિથોરાગઢ મુખ્યમથક કૉલ કરો:',
    mr: 'पिथोरागड मुख्यालयाशी संपर्क साधा:',
    bn: 'পিথোরাগড় সদর দপ্তরে কল করুন:',
  },
  'ticker.offer': {
    en: 'Special Mahashivratri & 2027 Yatra Offer! Seats limited — Book now',
    hi: 'विशेष महाशिवरात्रि व 2027 यात्रा ऑफर! सीटें सीमित हैं — अभी बुक करें',
    gu: 'વિશેષ મહાશિવરાત્રી અને 2027 યાત્રા ઑફર! સીટો મર્યાદિત છે — હમણાં બુક કરો',
    mr: 'विशेष महाशिवरात्री आणि 2027 यात्रा ऑफर! जागा मर्यादित — आत्ताच बुक करा',
    bn: 'বিশেষ মহাশিবরাত্রি ও ২০২৭ যাত্রা অফার! আসন সীমিত — এখনই বুক করুন',
  },
  'ticker.govtReg': {
    en: 'Govt Registered:',
    hi: 'सरकार पंजीकृत:',
    gu: 'સરકાર નોંધાયેલ:',
    mr: 'शासन नोंदणीकृत:',
    bn: 'সরকারি নিবন্ধিত:',
  },

  // Hero Section
  'hero.badge': {
    en: 'Govt. Approved Official Permit Agency #UTTR/PITHORAGARH/04-2026/450066',
    hi: 'उत्तराखंड सरकार द्वारा मान्यता प्राप्त आधिकारिक परमिट एजेंसी',
    gu: 'ઉત્તરાખંડ સરકાર માન્ય અધિકૃત પરમિટ એજન્સી',
    mr: 'उत्तराखंड शासन मान्यताप्राप्त अधिकृत परमिट संस्था',
    bn: 'উত্তরাখণ্ড সরকার অনুমোদিত অফিসিয়াল পারমিট এজেন্সি',
  },
  'hero.title1': {
    en: 'Sacred Adi Kailash',
    hi: 'पवित्र आदि कैलाश',
    gu: 'પવિત્ર આદિ કૈલાશ',
    mr: 'पवित्र आदि कैलास',
    bn: 'পবিত্র আদি কৈলাশ',
  },
  'hero.title2': {
    en: '& Om Parvat Yatra 2027',
    hi: 'एवं ॐ पर्वत यात्रा 2027',
    gu: 'અને ૐ પર્વત યાત્રા 2027',
    mr: 'आणि ॐ पर्वत यात्रा 2027',
    bn: 'ও ওঁ পর্বত যাত্রা ২০২৭',
  },
  'hero.subtitle': {
    en: 'Experience the mystical Vyas Valley, Parvati Sarovar, and Panchachuli Peaks with Pithoragarh’s #1 local ground operations team.',
    hi: 'पिथौरागढ़ की सर्वश्रेष्ठ स्थानीय गाइड टीम के साथ व्यास घाटी, पार्वती सरोवर और पंचाचूली की पावन यात्रा करें।',
    gu: 'પિથોરાગઢની સર્વશ્રેષ્ઠ સ્થાનિક ટીમ સાથે વ્યાસ ઘાટી, પાર્વતી સરોવર અને પંચાચૂલીની પવિત્ર યાત્રા કરો.',
    mr: 'पिथोरागडच्या अव्वल स्थानिक टीमसोबत व्यास व्हॅली, पार्वती सरोवर आणि पंचाचुली शिखरांची पावन यात्रा करा.',
    bn: 'পিথোরাগড়ের সেরা স্থানীয় টিমের সাথে ব্যাস উপত্যকা, পার্বতী সরোবর এবং পঞ্চচুলীর পবিত্র যাত্রা করুন।',
  },
  'hero.inquireBtn': {
    en: 'Inquire For Seats & Permit',
    hi: 'सीट व परमिट की जानकारी लें',
    gu: 'સીટ અને પરમિટ માહિતી મેળવો',
    mr: 'जागा व परमिटची माहिती घ्या',
    bn: 'আসন ও পারমিটের তথ্য জানুন',
  },
  'hero.consultantBtn': {
    en: 'AI Yatra Assistant',
    hi: 'एआई यात्रा सहायक',
    gu: 'એઆઈ યાત્રા સહાયક',
    mr: 'एआय यात्रा सहाय्यक',
    bn: 'এআই তীর্থ সহকারী',
  },
  'hero.permitGuarantee': {
    en: '100% Inner Line Permit Support',
    hi: '100% इनर लाइन परमिट सुविधा',
    gu: '100% ઇનર લાઇન પરમિટ સુવિધા',
    mr: '100% इनर लाइन परमिट सुविधा',
    bn: '১০০% ইনার লাইন পারমিট সহায়তা',
  },
  'hero.localTeam': {
    en: 'Native Kumaoni Ground Team',
    hi: 'पिथौरागढ़ स्थानीय टीम',
    gu: 'પિથોરાગઢ સ્થાનિક ટીમ',
    mr: 'पिथोरागड स्थानिक टीम',
    bn: 'স্থানীয় পিথোরাগড় টিম',
  },
  'hero.rating': {
    en: '4.9/5 Rating (1,200+ Yatris)',
    hi: '4.9/5 रेटिंग (1,200+ यात्री)',
    gu: '4.9/5 રેટિંગ (1,200+ યાત્રીઓ)',
    mr: '4.9/5 रेटिंग (1,200+ भाविक)',
    bn: '৪.৯/৫ রেটিং (১২০০+ যাত্রী)',
  },

  // Sections
  'section.expeditionsTitle': {
    en: 'Sacred Pilgrimage Destinations',
    hi: 'पवित्र धाम व तीर्थ स्थल',
    gu: 'પવિત્ર ધામ અને તીર્થ સ્થાનો',
    mr: 'पवित्र तीर्थक्षेत्रे व गंतव्ये',
    bn: 'পবিত্র ধাম ও তীর্থস্থান',
  },
  'section.expeditionsSub': {
    en: 'All-inclusive packages covering Inner Line Permits, 4x4 Bolero, Rung Homestays, and Doctor-certified Oxygen Support.',
    hi: 'इनर लाइन परमिट, 4x4 बोलेरो, स्थानीय होमस्टे व मेडिकल ऑक्सीजन युक्त संपूर्ण यात्रा पैकेज।',
    gu: 'ઇનર લાઇન પરમિટ, 4x4 બોલેરો, સ્થાનિક હોમસ્ટે અને મેડિકલ ઓક્સિજન સહિત સંપૂર્ણ યાત્રા પેકેજ.',
    mr: 'इनर लाइन परमिट, 4x4 बोलेरो, स्थानिक होमस्टे व वैद्यकीय ऑक्सिजनसह सर्वसमावेशक यात्रा पॅकेज.',
    bn: 'ইনার লাইন পারমিট, ৪x৪ বোলেরো, স্থানীয় হোমস্টে এবং মেডিকেল অক্সিজেন সহ সম্পূর্ণ প্যাকেজ।',
  },
  'section.downloadPdf': {
    en: 'Download Full Itinerary PDF',
    hi: 'पूर्ण यात्रा विवरण पीडीएफ डाउनलोड करें',
    gu: 'સંપૂર્ણ યાત્રા માહિતી પીડીએફ ડાઉનલોડ કરો',
    mr: 'संपूर्ण यात्रा माहिती पीडीएफ डाउनलोड करा',
    bn: 'সম্পূর্ণ ভ্রমণসূচি পিডিএফ ডাউনলোড করুন',
  },
  'section.bookRazorpay': {
    en: 'Pay Advance ₹3,000 / Seat',
    hi: 'अग्रिम राशि ₹3,000 जमा करें',
    gu: 'એડવાન્સ ₹3,000 જમા કરો',
    mr: 'आगाऊ रक्कम ₹3,000 भरा',
    bn: 'অগ্রিম ₹৩,০০০ জমা দিন',
  },
  'section.seatsRemaining': {
    en: 'Seats Left for May 2027 Batch',
    hi: 'मई 2027 बैच हेतु बची सीटें',
    gu: 'મે 2027 બેચ માટે બાકી રહેલી સીટો',
    mr: 'मे 2027 बॅचसाठी शिल्लक जागा',
    bn: 'মে ২০২৭ ব্যাচের জন্য অবশিষ্ট আসন',
  },

  // Tiers / Packages
  'tiers.title': {
    en: '2027 Yatra Packages & Pricing',
    hi: '2027 यात्रा पैकेज एवं शुल्क',
    gu: '2027 યાત્રા પેકેજ અને ભાડાં',
    mr: '2027 यात्रा पॅकेजेस आणि दर',
    bn: '২০২৭ যাত্রা প্যাকেজ ও খরচ',
  },
  'tiers.sub': {
    en: 'Direct from Pithoragarh Ground Operator - No Middlemen, Best Local Service',
    hi: 'पिथौरागढ़ के मूल ऑपरेटर द्वारा - सीधे बुकिंग, श्रेष्ठ स्थानीय सेवा',
    gu: 'પિથોરાગઢના મૂળ ઑપરેટર દ્વારા - સીધી બુકિંગ, શ્રેષ્ઠ સ્થાનિક સેવા',
    mr: 'पिथोरागडच्या मूळ ऑपरेटरकडून - थेट बुकिंग, सर्वोत्तम स्थानिक सेवा',
    bn: 'পিথোরাগড়ের মূল অপারেটর দ্বারা - সরাসরি বুকিং, সেরা স্থানীয় সেবা',
  },
  'tiers.chooseComfort': {
    en: 'Choose Your Yatra Comfort',
    hi: 'अपनी सुविधा अनुसार पैकेज चुनें',
    gu: 'તમારી અનુકૂળતા મુજબ પેકેજ પસંદ કરો',
    mr: 'आपल्या सोयीनुसार पॅकेज निवडा',
    bn: 'আপনার পছন্দমতো প্যাকেজ নির্বাচন করুন',
  },

  // Reviews
  'reviews.title': {
    en: 'Verified Pilgrim Reviews',
    hi: 'श्रद्धालुओं की प्रामाणिक समीक्षाएं',
    gu: 'યાત્રાળુઓની પ્રમાણિત સમીક્ષાઓ',
    mr: 'भाविकांची प्रामाणिक मते',
    bn: 'তীর্থযাত্রীদের প্রামাণিক পর্যালোচনা',
  },
  'reviews.googleBadge': {
    en: 'Google Reviews 4.9 ★★★★★ (1,248+ Reviews)',
    hi: 'गूगल समीक्षाएं 4.9 ★★★★★ (1,248+ रेटिंग)',
    gu: 'ગુગલ રિવ્યૂ 4.9 ★★★★★ (1,248+ રેટિંગ)',
    mr: 'गुगल रिव्ह्यू 4.9 ★★★★★ (1,248+ मते)',
    bn: 'গুগল রিভিউ ৪.৯ ★★★★★ (১,২৪৮+ রেটিং)',
  },

  // Common
  'common.bookNow': {
    en: 'Book Now',
    hi: 'अभी बुक करें',
    gu: 'હમણાં બુક કરો',
    mr: 'आत्ताच बुक करा',
    bn: 'এখনই বুক করুন',
  },
  'common.viewDetails': {
    en: 'View Details',
    hi: 'विवरण देखें',
    gu: 'વિગત જુઓ',
    mr: 'तपशील पहा',
    bn: 'বিস্তারিত দেখুন',
  },
  'common.selectLanguage': {
    en: 'Select Language',
    hi: 'भाषा चुनें',
    gu: 'ભાષા પસંદ કરો',
    mr: 'भाषा निवडा',
    bn: 'ভাষা নির্বাচন করুন',
  },
  'common.inquireNow': {
    en: 'Inquire Now',
    hi: 'पूछताछ करें',
    gu: 'પૂછપરછ કરો',
    mr: 'चौकशी करा',
    bn: 'অনুসন্ধান করুন',
  },
  'common.callUs': {
    en: 'Call Ground Desk',
    hi: 'स्थानीय डेस्क पर कॉल करें',
    gu: 'સ્થાનિક ડેસ્ક પર કૉલ કરો',
    mr: 'स्थानिक डेस्कवर संपर्क साधा',
    bn: 'গ্রাউন্ড ডেস্কে কল করুন',
  },
  'common.whatsappUs': {
    en: 'WhatsApp Support',
    hi: 'व्हाट्सएप सहायता',
    gu: 'વોટ્સએપ સહાય',
    mr: 'व्हॉट्सॲप मदत',
    bn: 'হোয়াটসঅ্যাপ সহায়তা',
  },
  'common.viewAll': {
    en: 'View All',
    hi: 'सभी देखें',
    gu: 'બધા જુઓ',
    mr: 'सर्व पहा',
    bn: 'সব দেখুন',
  },
  'common.readMore': {
    en: 'Read More',
    hi: 'और पढ़ें',
    gu: 'વધુ વાંચો',
    mr: 'अधिक वाचा',
    bn: 'আরও পড়ুন',
  },
  'common.explore': {
    en: 'Explore',
    hi: 'खोजें',
    gu: 'અન્વેષણ કરો',
    mr: 'एक्सप्लोर करा',
    bn: 'ঘুরে দেখুন',
  },
  'common.profile': {
    en: 'Profile',
    hi: 'प्रोफाइल',
    gu: 'પ્રોફાઇલ',
    mr: 'प्रोफाइल',
    bn: 'প্রোফাইল',
  },
};

// 2. Comprehensive Phrasebook for automatic text & string translation across components
const PHRASEBOOK: Record<string, Record<Language, string>> = {
  // Navigation & Common Action Buttons
  "Home": { en: "Home", hi: "मुख्य पृष्ठ", gu: "મુખ્ય પૃષ્ઠ", mr: "मुख्य पृष्ठ", bn: "মূল পাতা" },
  "Explore": { en: "Explore", hi: "खोजें", gu: "અન્વેષણ કરો", mr: "शोधा", bn: "ঘুরে দেখুন" },
  "Destinations": { en: "Destinations", hi: "तीर्थ गंतव्य", gu: "તીર્થ સ્થળો", mr: "तीर्थक्षेत्रे", bn: "তীর্থ গন্তব্য" },
  "All Destinations": { en: "All Destinations", hi: "सभी पवित्र गंतव्य", gu: "બધા પવિત્ર સ્થળો", mr: "सर्व पवित्र स्थाने", bn: "সমস্ত পবিত্র গন্তব্য" },
  "Packages": { en: "Packages", hi: "यात्रा पैकेज", gu: "યાત્રા પેકેજ", mr: "यात्रा पॅकेज", bn: "ভ্রমণ প্যাকেজ" },
  "Guides": { en: "Guides", hi: "मार्गदर्शिका", gu: "માર્ગદર્શિકા", mr: "मार्गदर्शक", bn: "নির্দেশিকা" },
  "Reels": { en: "Reels", hi: "रील्स", gu: "રીલ્સ", mr: "रील्स", bn: "রিলস" },
  "Memories": { en: "Memories", hi: "पावन स्मृतियां", gu: "પવિત્ર યાદો", mr: "पावन आठवणी", bn: "পবিত্র স্মৃতি" },
  "Cost Calculator": { en: "Cost Calculator", hi: "लागत गणक", gu: "ખર્ચ કેલ્ક્યુલેટર", mr: "खर्च गणक", bn: "খরচ ক্যালকুলেটর" },
  "What to Wear": { en: "What to Wear", hi: "पहनावा निर्देश", gu: "પોશાક માર્ગદર્શિકા", mr: "पोशाख मार्गदर्शक", bn: "পোশাক নির্দেশিকা" },
  "About Us": { en: "About Us", hi: "हमारे बारे में", gu: "અમારા વિશે", mr: "आमच्याबद्दल", bn: "আমাদের সম্পর্কে" },
  "Our Team": { en: "Our Team", hi: "स्थानीय टीम", gu: "ગ્રાઉન્ડ ટીમ", mr: "स्थानिक टीम", bn: "আমাদের টিম" },
  "Careers": { en: "Careers", hi: "करियर", gu: "કારકિર્દી", mr: "करिअर", bn: "ক্যারিয়ার" },
  "Terms & Conditions": { en: "Terms & Conditions", hi: "नियम व शर्तें", gu: "નિયમો અને શરતો", mr: "नियम आणि अटी", bn: "শর্তাবলী" },
  "Privacy Policy": { en: "Privacy Policy", hi: "गोपनीयता नीति", gu: "ગોપનીયતા નીતિ", mr: "गोपनीयता धोरण", bn: "গোপনীয়তা নীতি" },
  "Book Now": { en: "Book Now", hi: "अभी बुक करें", gu: "હમણાં બુક કરો", mr: "आत्ताच बुक करा", bn: "এখনই বুক করুন" },
  "Inquire Now": { en: "Inquire Now", hi: "पूछताछ करें", gu: "પૂછપરછ કરો", mr: "चौकशी करा", bn: "অনুসন্ধান করুন" },
  "View Details": { en: "View Details", hi: "विवरण देखें", gu: "વિગત જુઓ", mr: "तपशील पहा", bn: "বিস্তারিত দেখুন" },
  "Book Yatra 2027": { en: "Book Yatra 2027", hi: "2027 यात्रा बुक करें", gu: "2027 યાત્રા બુક કરો", mr: "2027 यात्रा बुक करा", bn: "২০২৭ যাত্রা বুক করুন" },
  "Book Adi Kailash 2027": { en: "Book Adi Kailash 2027", hi: "आदि कैलाश 2027 बुक करें", gu: "આદિ કૈલાશ 2027 બુક કરો", mr: "आदि कैलास 2027 बुक करा", bn: "আদি কৈলাশ ২০২৭ বুক করুন" },
  "Book Mansarovar View": { en: "Book Mansarovar View", hi: "मानसरोवर दर्शन बुक करें", gu: "માનસરોવર દર્શન બુક કરો", mr: "मानसरोवर दर्शन बुक करा", bn: "মানস সরোবর দর্শন বুক করুন" },
  "Book Char Dham 2027": { en: "Book Char Dham 2027", hi: "चार धाम 2027 बुक करें", gu: "ચાર ધામ 2027 બુક કરો", mr: "चार धाम 2027 बुक करा", bn: "চার ধাম ২০২৭ বুক করুন" },
  "Download PDF": { en: "Download PDF", hi: "पीडीएफ डाउनलोड करें", gu: "પીડીએફ ડાઉનલોડ કરો", mr: "पीडीएफ डाउनलोड करा", bn: "পিডিএফ ডাউনলোড করুন" },
  "Read Article": { en: "Read Article", hi: "लेख पढ़ें", gu: "લેખ વાંચો", mr: "लेख वाचा", bn: "নিবন্ধ পড়ুন" },
  "Search": { en: "Search", hi: "खोजें", gu: "શોધો", mr: "शोधा", bn: "অনুসন্ধান" },
  "Close": { en: "Close", hi: "बंद करें", gu: "બંધ કરો", mr: "बंद करा", bn: "বন্ধ করুন" },
  "Back": { en: "Back", hi: "वापस", gu: "પાછા", mr: "मागे", bn: "ফিরে যান" },

  // Hero Slider Taglines & Subtitles
  "PROMISE THAT": { en: "PROMISE THAT", hi: "हमारा पवित्र संकल्प", gu: "અમારો પવિત્ર સંકલ્પ", mr: "आमचा पावन संकल्प", bn: "আমাদের পবিত্র সংকল্প" },
  "SETS US APART!": { en: "SETS US APART!", hi: "जो हमें सर्वश्रेष्ठ बनाता है!", gu: "જે અમને શ્રેષ્ઠ બનાવે છે!", mr: "जे आम्हाला अव्वल बनवते!", bn: "যা আমাদের সেরা করে তোলে!" },
  "India's Most Trusted Sacred Himalayan Pilgrimage Network": {
    en: "India's Most Trusted Sacred Himalayan Pilgrimage Network",
    hi: "भारत का सर्वाधिक विश्वसनीय पावन हिमालयी तीर्थ नेटवर्क",
    gu: "ભારતનું સૌથી વિશ્વસનીય પવિત્ર હિમાલયી તીર્થ નેટવર્ક",
    mr: "भारताचे सर्वाधिक विश्वासार्ह पवित्र हिमालयीन तीर्थ नेटवर्क",
    bn: "ভারতের সবচেয়ে বিশ্বস্ত পবিত্র হিমালয় তীর্থ নেটওয়ার্ক",
  },
  "SACRED DHAM 2027": { en: "SACRED DHAM 2027", hi: "पावन धाम 2027", gu: "પવિત્ર ધામ 2027", mr: "पवित्र धाम 2027", bn: "পবিত্র ধাম ২০২৭" },
  "ADI KAILASH & OM PARVAT": { en: "ADI KAILASH & OM PARVAT", hi: "आदि कैलाश एवं ॐ पर्वत", gu: "આદિ કૈલાશ અને ૐ પર્વત", mr: "आदि कैलास आणि ॐ पर्वत", bn: "আদি কৈলাশ ও ওঁ পর্বত" },
  "Chhota Kailash & Parvati Sarovar Darshan in Pristine Vyas Valley": {
    en: "Chhota Kailash & Parvati Sarovar Darshan in Pristine Vyas Valley",
    hi: "व्यास घाटी में पावन छोटा कैलाश एवं पार्वती सरोवर दर्शन",
    gu: "વ્યાસ ઘાટીમાં પવિત્ર છોટા કૈલાશ અને પાર્વતી સરોવર દર્શન",
    mr: "व्यास खोऱ्यात पावन छोटा कैलास आणि पार्वती सरोवर दर्शन",
    bn: "ব্যাস উপত্যকায় পবিত্র ছোট কৈলাশ ও পার্বতী সরোবর দর্শন",
  },
  "HISTORIC INDIAN VANTAGE": { en: "HISTORIC INDIAN VANTAGE", hi: "ऐतिहासिक भारतीय दृष्टिकोण", gu: "ઐતિહાસિક ભારતીય દર્શન", mr: "ऐतिहासिक भारतीय दर्शन", bn: "ঐতিহাসিক ভারতীয় দর্শন" },
  "KAILASH MANSAROVAR": { en: "KAILASH MANSAROVAR", hi: "कैलाश मानसरोवर", gu: "કૈલાશ માનસરોવર", mr: "कैलास मानसरोवर", bn: "কৈলাশ মানস সরোবর" },
  "Holy Darshan from Old Lipulekh Pass (18,300 FT) Without Entering Tibet": {
    en: "Holy Darshan from Old Lipulekh Pass (18,300 FT) Without Entering Tibet",
    hi: "तिब्बत जाए बिना पुराने लिपुलेख दर्रे (18,300 फीट) से दिव्य दर्शन",
    gu: "તિબેટ ગયા વિના જૂના લિપુલેખ પાસ (18,300 ફૂટ) થી દિવ્ય દર્શન",
    mr: "तिबेटमध्ये न जाता जुन्या लिपुलेख खिंडीतून (18,300 फूट) दिव्य दर्शन",
    bn: "তিব্বত না গিয়ে ওল্ড লিপুলেখ পাস (১৮,৩০০ ফুট) থেকে পবিত্র দর্শন",
  },
  "DIVINE CIRCUIT 2027": { en: "DIVINE CIRCUIT 2027", hi: "दिव्य तीर्थ परिक्रमा 2027", gu: "દિવ્ય તીર્થ પરિક્રમા 2027", mr: "दिव्य तीर्थ परिक्रमा 2027", bn: "দিব্য তীর্থ পরিক্রমা ২০২৭" },
  "CHAR DHAM MAHAYATRA": { en: "CHAR DHAM MAHAYATRA", hi: "चार धाम महायात्रा", gu: "ચાર ધામ મહાયાત્રા", mr: "चार धाम महायात्रा", bn: "চার ধাম মহাযাত্রা" },
  "Yamunotri • Gangotri • Kedarnath • Badrinath with VIP Darshan": {
    en: "Yamunotri • Gangotri • Kedarnath • Badrinath with VIP Darshan",
    hi: "यमुनोत्री • गंगोत्री • केदारनाथ • बद्रीनाथ वीआईपी दर्शन सहित",
    gu: "યમુનોત્રી • ગંગોત્રી • કેદારનાથ • બદ્રીનાથ વીઆઈપી દર્શન સાથે",
    mr: "यमुनोत्री • गंगोत्री • केदारनाथ • बद्रीनाथ व्हीआयपी दर्शनासह",
    bn: "যমুনোত্রী • গঙ্গোত্রী • কেদারনাথ • বদ্রীনাথ ভিআইপি দর্শন সহ",
  },

  // Categories & Filters
  "All Sacred Expeditions": { en: "All Sacred Expeditions", hi: "सभी पवित्र यात्राएं", gu: "બધા પવિત્ર પ્રવાસો", mr: "सर्व पवित्र यात्रा", bn: "সমস্ত পবিত্র যাত্রা" },
  "Adi Kailash & Om Parvat": { en: "Adi Kailash & Om Parvat", hi: "आदि कैलाश व ॐ पर्वत", gu: "આદિ કૈલાશ અને ૐ પર્વત", mr: "आदि कैलास आणि ॐ पर्वत", bn: "আদি কৈলাশ ও ওঁ পর্বত" },
  "Char Dham Yatra": { en: "Char Dham Yatra", hi: "चार धाम यात्रा", gu: "ચાર ધામ યાત્રા", mr: "चार धाम यात्रा", bn: "চার ধাম যাত্রা" },
  "Darma & Valley Treks": { en: "Darma & Valley Treks", hi: "दारमा व अन्य ट्रेक", gu: "દારમા અને ખીણ ટ્રેક", mr: "दारमा आणि व्हॅली ट्रेक", bn: "দারমা ও ভ্যালি ট্রেক" },
  "Sacred Pilgrimage Circuits 2027": { en: "Sacred Pilgrimage Circuits 2027", hi: "पावन तीर्थ परिक्रमा परिपथ 2027", gu: "પવિત્ર તીર્થ પરિક્રમા સર્કિટ 2027", mr: "पावन तीर्थ परिक्रमा सर्किट 2027", bn: "পবিত্র তীর্থ পরিক্রমা সার্কিট ২০২৭" },
  "Verified Govt Registered & KMVN Partner": { en: "Verified Govt Registered & KMVN Partner", hi: "सरकारी पंजीकृत एवं केएमवीएन अधिकृत पार्टनर", gu: "સરકારી નોંધાયેલ અને કેએમવીએન અધિકૃત પાર્ટનર", mr: "शासन नोंदणीकृत आणि केएमव्हीएन अधिकृत भागीदार", bn: "সরকারি নিবন্ধিত ও কেএমভিএন অনুমোদিত অংশীদার" },

  // Famous Spots & Temples
  "Sacred Spots of Vyas Valley": { en: "Sacred Spots of Vyas Valley", hi: "व्यास घाटी के पावन तीर्थ स्थल", gu: "વ્યાસ ઘાટીના પવિત્ર તીર્થ સ્થળો", mr: "व्यास खोऱ्यातील पावन तीर्थक्षेत्रे", bn: "ব্যাস উপত্যকার পবিত্র তীর্থস্থান" },
  "Ancient Temples & Shrines of Kumaon": { en: "Ancient Temples & Shrines of Kumaon", hi: "कुमाऊं के प्राचीन मंदिर व शक्तिपीठ", gu: "કુમાઉના પ્રાચીન મંદિરો અને શક્તિપીઠો", mr: "कुमाऊंमधील प्राचीन मंदिरे व शक्तीपीठे", bn: "কুমাউনের প্রাচীন মন্দির ও শক্তিপীঠ" },
  "Om Parvat ॐ": { en: "Om Parvat ॐ", hi: "ॐ पर्वत", gu: "ૐ પર્વત", mr: "ॐ पर्वत", bn: "ওঁ পর্বত" },
  "Parvati Sarovar": { en: "Parvati Sarovar", hi: "पार्वती सरोवर", gu: "પાર્વતી સરોવર", mr: "पार्वती सरोवर", bn: "পার্বতী সরোবর" },
  "Gauri Kund": { en: "Gauri Kund", hi: "गौरी कुंड", gu: "ગૌરી કુંડ", mr: "गौरी कुंड", bn: "গৌরী কুণ্ড" },
  "Brahma Kamal": { en: "Brahma Kamal", hi: "ब्रह्म कमल", gu: "બ્રહ્મ કમળ", mr: "ब्रह्म कमळ", bn: "ব্রহ্ম কমল" },
  "Maharishi Vyas Cave": { en: "Maharishi Vyas Cave", hi: "महर्षि व्यास गुफा", gu: "મહર્ષિ વ્યાસ ગુફા", mr: "महर्षी व्यास गुहा", bn: "মহর্ষি ব্যাস গুহা" },
  "Sheshnag Parvat": { en: "Sheshnag Parvat", hi: "शेषनाग पर्वत", gu: "શેષનાગ પર્વત", mr: "शेषनाग पर्वत", bn: "শেষনাগ পর্বত" },
  "Kali Temple Kalapani": { en: "Kali Temple Kalapani", hi: "काली मंदिर कालापानी", gu: "કાલી મંદિર કાલાપાની", mr: "काळी मंदिर कालापानी", bn: "কালী মন্দির কালাপানী" },
  "Kainchi Dham (Neem Karoli Baba)": { en: "Kainchi Dham (Neem Karoli Baba)", hi: "कैंची धाम (नीम करोली बाबा)", gu: "કૈંચી ધામ (નીમ કરોલી બાબા)", mr: "कैंची धाम (नीम करोली बाबा)", bn: "কৈঁচী ধাম (নিম করোলি বাবা)" },
  "Jageshwar 124 Jyotirlinga Dham": { en: "Jageshwar 124 Jyotirlinga Dham", hi: "जागेश्वर 124 ज्योतिर्लिंग धाम", gu: "જાગેશ્વર 124 જ્યોતિર્લિંગ ધામ", mr: "जागेश्वर 124 ज्योतिर्लिंग धाम", bn: "জাগেশ্বর ১২৪ জ্যোতির্লিঙ্গ ধাম" },
  "Chitai Golu Devta Temple": { en: "Chitai Golu Devta Temple", hi: "चितई गोलू देवता मंदिर (न्याय के देवता)", gu: "ચિતઈ ગોલૂ દેવતા મંદિર (ન્યાયના દેવ)", mr: "चितई गोलू देवता मंदिर (न्यायाचे देव)", bn: "চিতই গোলু দেবতা মন্দির (ন্যায়ের দেবতা)" },
  "Patal Bhuvaneshwar Cave": { en: "Patal Bhuvaneshwar Cave", hi: "पाताल भुवनेश्वर गुफा मंदिर", gu: "પાતાળ ભુવનેશ્વર ગુફા મંદિર", mr: "पाताळ भुवनेश्वर गुहा मंदिर", bn: "পাতাল ভুবনেশ্বর গুহা মন্দির" },
  "Kasar Devi Temple": { en: "Kasar Devi Temple", hi: "कसार देवी मंदिर (चुंबकीय ऊर्जा केंद्र)", gu: "કસાર દેવી મંદિર (ચુંબકીય ઊર્જા કેન્દ્ર)", mr: "कसार देवी मंदिर (चुंबकीय ऊर्जा केंद्र)", bn: "কাসার দেবী মন্দির (চৌম্বকীয় শক্তি কেন্দ্র)" },

  // Badges & Metrics
  "Bestseller 2027": { en: "Bestseller 2027", hi: "सर्वाधिक लोकप्रिय 2027", gu: "સૌથી વધુ લોકપ્રિય 2027", mr: "सर्वाधिक पसंती 2027", bn: "সর্বাধিক জনপ্রিয় ২০২৭" },
  "Popular Rail Connect": { en: "Popular Rail Connect", hi: "रेलवे स्टेशन पिकअप", gu: "રેલવે સ્ટેશન પિકઅપ", mr: "रेल्वे स्टेशन पिकअप", bn: "রেল স্টেশন পিকআপ" },
  "All-Inclusive Deluxe": { en: "All-Inclusive Deluxe", hi: "संपूर्ण डीलक्स पैकेज", gu: "સંપૂર્ણ ડીલક્સ પેકેજ", mr: "सर्वसमावेशक डिलक्स पॅकेज", bn: "সম্পূর্ণ ডিলাক্স প্যাকেজ" },
  "VIP Direct 4x4": { en: "VIP Direct 4x4", hi: "वीआईपी 4x4 बोलेरो", gu: "વીઆઈપી 4x4 બોલેરો", mr: "व्हीआयपी 4x4 बोलेरो", bn: "ভিআইপি ৪x৪ বোলেরো" },
  "Helicopter Option": { en: "Helicopter Option", hi: "हेलीकॉप्टर सुविधा", gu: "હેલિકોપ્ટર સુવિધા", mr: "हेलिकॉप्टर सुविधा", bn: "হেলিকপ্টার সুবিধা" },
  "Moderate": { en: "Moderate", hi: "मध्यम", gu: "મધ્યમ", mr: "मध्यम", bn: "মাঝারি" },
  "Easy": { en: "Easy", hi: "सरल", gu: "સરળ", mr: "सोपे", bn: "সহজ" },
  "Challenging": { en: "Challenging", hi: "कठिन", gu: "પડકારજનક", mr: "आव्हान देणारे", bn: "কঠিন" },

  // Cost Calculator
  "Adi Kailash & Om Parvat Cost Calculator": {
    en: "Adi Kailash & Om Parvat Cost Calculator",
    hi: "आदि कैलाश व ॐ पर्वत यात्रा लागत गणक",
    gu: "આદિ કૈલાશ અને ૐ પર્વત યાત્રા ખર્ચ કેલ્ક્યુલેટર",
    mr: "आदि कैलास आणि ॐ पर्वत यात्रा खर्च गणक",
    bn: "আদি কৈলাশ ও ওঁ পর্বত ভ্রমণ খরচ ক্যালকুলেটর",
  },
  "Calculate exact package costs, customized for your starting city, group size, and vehicle choice.": {
    en: "Calculate exact package costs, customized for your starting city, group size, and vehicle choice.",
    hi: "अपने प्रस्थान शहर, यात्री संख्या और वाहन विकल्प के अनुसार सटीक यात्रा खर्च की गणना करें।",
    gu: "તમારા પ્રસ્થાન શહેર, યાત્રીઓની સંખ્યા અને વાહન વિકલ્પ અનુસાર ચોક્કસ ખર્ચ ગણો.",
    mr: "आपल्या सुरुवातीचे शहर, प्रवासी संख्या आणि वाहन निवडीनुसार अचूक खर्चाची गणना करा.",
    bn: "আপনার শুরুর শহর, যাত্রী সংখ্যা এবং গাড়ির ধরন অনুযায়ী সঠিক ভ্রমণ খরচ গণনা করুন।",
  },
  "Step 1: Starting City": { en: "Step 1: Starting City", hi: "चरण 1: प्रस्थान शहर", gu: "પગલું 1: પ્રસ્થાન શહેર", mr: "टप्पा 1: सुरुवातीचे शहर", bn: "ধাপ ১: শুরুর শহর" },
  "Step 2: Group Size (Pilgrims)": { en: "Step 2: Group Size (Pilgrims)", hi: "चरण 2: यात्रियों की संख्या", gu: "પગલું 2: યાત્રીઓની સંખ્યા", mr: "टप्पा 2: भाविकांची संख्या", bn: "ধাপ ২: যাত্রী সংখ্যা" },
  "Step 3: Comfort & Accommodation Tier": { en: "Step 3: Comfort & Accommodation Tier", hi: "चरण 3: आवास एवं सुविधा श्रेणी", gu: "પગલું 3: રહેઠાણ અને સુવિધા શ્રેણી", mr: "टप्पा 3: निवास व सुविधा श्रेणी", bn: "ধাপ ৩: বাসস্থান ও সুবিধার স্তর" },
  "Estimated Total Yatra Cost": { en: "Estimated Total Yatra Cost", hi: "अनुमानित कुल यात्रा खर्च", gu: "અંદાજિત કુલ યાત્રા ખર્ચ", mr: "अंदाजे एकूण यात्रा खर्च", bn: "আনুমানিক মোট ভ্রমণ খরচ" },
  "Per Person Cost:": { en: "Per Person Cost:", hi: "प्रति व्यक्ति लागत:", gu: "પ્રતિ વ્યક્તિ ખર્ચ:", mr: "प्रति व्यक्ती खर्च:", bn: "জনপ্রতি খরচ:" },
  "Advance Booking Amount:": { en: "Advance Booking Amount:", hi: "अग्रिम बुकिंग राशि:", gu: "એડવાન્સ બુકિંગ રકમ:", mr: "आगाऊ बुकिंग रक्कम:", bn: "অগ্রিম বুকিং পরিমাণ:" },

  // Trust Indicators & Guarantees
  "100% Inner Line Permit Guarantee": { en: "100% Inner Line Permit Guarantee", hi: "100% इनर लाइन परमिट गारंटी", gu: "100% ઇનર લાઇન પરમિટ ગેરંટી", mr: "100% इनर लाइन परमिट हमी", bn: "১০০% ইনার লাইন পারমিট নিশ্চয়তা" },
  "Native Local Kumaoni Guides & Sherpas": { en: "Native Local Kumaoni Guides & Sherpas", hi: "पिथौरागढ़ के स्थानीय कुमाऊंनी गाइड व शेरपा", gu: "પિથોરાગઢના સ્થાનિક કુમાઉની ગાઇડ અને શેરપા", mr: "पिथोरागडचे स्थानिक कुमाऊंनी मार्गदर्शक व शेर्पा", bn: "পিথোরাগড়ের স্থানীয় কুমাওনী গাইড ও শেরপা" },
  "24/7 Medical Oxygen & High-Altitude Support": { en: "24/7 Medical Oxygen & High-Altitude Support", hi: "24/7 मेडिकल ऑक्सीजन एवं उच्च-तुंगता सहायता", gu: "24/7 મેડિકલ ઓક્સિજન અને હાઇ-ઓલ્ટિટ્યુડ સહાય", mr: "24/7 वैद्यकीय ऑक्सिजन आणि उच्च-उंची मदत", bn: "২৪/৭ মেডিকেল অক্সিজেন ও উচ্চতা সহায়তা" },
  "Homestays with Authentic Sattvik Mountain Meals": { en: "Homestays with Authentic Sattvik Mountain Meals", hi: "शुद्ध सात्विक पहाड़ी भोजन सहित प्रामाणिक होमस्टे", gu: "શુદ્ધ સાત્વિક પહાડી ભોજન સાથે પ્રામાણિક હોમસ્ટે", mr: "शुद्ध सात्विक डोंगराळ भोजनासह अस्सल होमस्टे", bn: "বিশুদ্ধ সাত্বিক পাহাড়ি খাবার সহ খাঁটি হোমস্টে" },
  "Custom 4x4 Bolero Fleet for Extreme Terrains": { en: "Custom 4x4 Bolero Fleet for Extreme Terrains", hi: "कठिन रास्तों के लिए विशेष 4x4 बोलेरो फ्लीट", gu: "મુશ્કેલ રસ્તાઓ માટે ખાસ 4x4 બોલેરો ફ્લીટ", mr: "कठीण रस्त्यांसाठी खास 4x4 बोलेरो ताफा", bn: "দুর্গম পথের জন্য বিশেষ ৪x৪ বোলেরো বহর" },
  "Zero Sub-Contracting • Direct Local Operations": { en: "Zero Sub-Contracting • Direct Local Operations", hi: "शून्य बिचौलिया • प्रत्यक्ष स्थानीय ग्राउंड ऑपरेशंस", gu: "કોઈ વચેટીયા નહીં • સીધું સ્થાનિક સંચાલન", mr: "मध्यस्थ नाही • थेट स्थानिक संचलन", bn: "কোনো মধ্যস্থতাকারী নেই • সরাসরি স্থানীয় পরিচালনা" },

  // Reviews & FAQs
  "What Our Devotees Say": { en: "What Our Devotees Say", hi: "हमारे तीर्थयात्रियों के अनुभव", gu: "અમારા યાત્રીઓના અનુભવો", mr: "आमच्या भाविकांचे अनुभव", bn: "আমাদের তীর্থযাত্রীদের অভিজ্ঞতা" },
  "Frequently Asked Questions": { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न (FAQ)", gu: "વારંવાર પૂછાતા પ્રશ્નો (FAQ)", mr: "नेहमी विचारले जाणारे प्रश्न (FAQ)", bn: "সাধারণ জিজ্ঞাসা (FAQ)" },
  "Have Questions? We Are Here to Guide You": { en: "Have Questions? We Are Here to Guide You", hi: "कोई प्रश्न है? हम आपके मार्गदर्शन हेतु सदैव तत्पर हैं", gu: "કોઈ પ્રશ્ન છે? અમે તમારા માર્ગદર્શન માટે તૈયાર છીએ", mr: "काही प्रश्न आहेत? आम्ही आपल्या मार्गदर्शनासाठी सज्ज आहोत", bn: "কোনো প্রশ্ন আছে? আমরা আপনার নির্দেশনায় প্রস্তুত" },

  // Contact Form
  "Connect With Pithoragarh Ground Operations Desk": {
    en: "Connect With Pithoragarh Ground Operations Desk",
    hi: "पिथौरागढ़ स्थानीय ग्राउंड ऑपरेशंस डेस्क से संपर्क करें",
    gu: "પિથોરાગઢ સ્થાનિક ગ્રાઉન્ડ ઑપરેશન્સ ડેસ્ક સાથે સંપર્ક કરો",
    mr: "पिथोरागड स्थानिक ग्राउंड ऑपरेशन्स डेस्कशी संपर्क साधा",
    bn: "পিথোরাগড় স্থানীয় গ্রাউন্ড অপারেশনস ডেস্কে যোগাযোগ করুন",
  },
  "Full Name": { en: "Full Name", hi: "पूरा नाम", gu: "પૂરું નામ", mr: "पूर्ण नाव", bn: "পুরো নাম" },
  "WhatsApp Mobile Number": { en: "WhatsApp Mobile Number", hi: "व्हाट्सएप मोबाइल नंबर", gu: "વોટ્સએપ મોબાઇલ નંબર", mr: "व्हॉट्सॲप मोबाईल नंबर", bn: "হোয়াটসঅ্যাপ মোবাইল নম্বর" },
  "Email Address": { en: "Email Address", hi: "ईमेल पता", gu: "ઇમેઇલ સરનામું", mr: "ईमेल पत्ता", bn: "ইমেল ঠিকানা" },
  "Preferred Starting City": { en: "Preferred Starting City", hi: "प्रस्थान शहर", gu: "પ્રસ્થાન શહેર", mr: "सुरुवातीचे शहर", bn: "শুরুর শহর" },
  "Pick-up Location": { en: "Pick-up Location", hi: "पिकअप स्थान", gu: "પિકઅપ સ્થળ", mr: "पिकअप ठिकाण", bn: "পিকআপের স্থান" },
  "Select Destination / Yatra": { en: "Select Destination / Yatra", hi: "गंतव्य / यात्रा चुनें", gu: "તીર્થ / યાત્રા પસંદ કરો", mr: "तीर्थ / यात्रा निवडा", bn: "গন্তব্য / তীর্থযাত্রা নির্বাচন করুন" },
  "Choose Pick-up Location": { en: "Choose Pick-up Location", hi: "पिकअप स्थान चुनें", gu: "પિકઅપ સ્થળ પસંદ કરો", mr: "પિકઅપ સ્થળ निवडा", bn: "পিকআপের স্থান নির্বাচন করুন" },
  "Enter your specific city / pick-up point...": { en: "Enter your specific city / pick-up point...", hi: "अपना विशिष्ट शहर या पिकअप स्थान दर्ज करें...", gu: "તમારું ચોક્કસ શહેર અથવા પિકઅપ સ્થળ દાખલ કરો...", mr: "आपले विशिष्ट शहर किंवा पिकअप ठिकाण प्रविष्ट करा...", bn: "আপনার নির্দিষ্ট শহর বা পিকআপের স্থান লিখুন..." },
  "Select Departure Batch": { en: "Select Departure Batch", hi: "प्रस्थान बैच चुनें", gu: "પ્રસ્થાન બેચ પસંદ કરો", mr: "प्रस्थान बॅच निवडा", bn: "যাত্রার ব্যাচ নির্বাচন করুন" },
  "Advance Deposit": { en: "Advance Deposit", hi: "अग्रिम टोकन राशि", gu: "એડવાન્સ ટોકન રકમ", mr: "आगाऊ टोकन रक्कम", bn: "অগ্রিম টোকেন পরিমাণ" },
  "Complete Booking & Pay Token": { en: "Complete Booking & Pay Token", hi: "बुकिंग पूर्ण करें व टोकन जमा करें", gu: "બુકિંગ પૂર્ણ કરો અને ટોકન જમા કરો", mr: "बुकिंग पूर्ण करा व टोकन भरा", bn: "বুকিং সম্পন্ন করুন ও টোকেন জমা দিন" },
  "Number of Pilgrims": { en: "Number of Pilgrims", hi: "यात्रियों की संख्या", gu: "યાત્રીઓની સંખ્યા", mr: "प्रवाशांची संख्या", bn: "যাত্রী সংখ্যা" },
  "Tentative Travel Month": { en: "Tentative Travel Month", hi: "संभावित यात्रा माह", gu: "સંભવિત યાત્રા મહિનો", mr: "अंदाजे प्रवासाचा महिना", bn: "সম্ভাব্য ভ্রমণের মাস" },
  "Special Requirements or Questions": { en: "Special Requirements or Questions", hi: "विशेष आवश्यकता अथवा प्रश्न", gu: "વિશેષ જરૂરિયાતો અથવા પ્રશ્નો", mr: "विशेष आवश्यकता किंवा प्रश्न", bn: "বিশেষ প্রয়োজন বা প্রশ্ন" },
  "Submit Inquiry": { en: "Submit Inquiry", hi: "पूछताछ फॉर्म भेजें", gu: "પૂછપરછ ફોર્મ મોકલો", mr: "चौकशी अर्ज पाठवा", bn: "অনুসন্ধান পাঠান" },
  "Thank You! Our Team Will Contact You Shortly.": {
    en: "Thank You! Our Team Will Contact You Shortly.",
    hi: "धन्यवाद! हमारी स्थानीय टीम शीघ्र ही आपसे संपर्क करेगी।",
    gu: "આભાર! અમારી સ્થાનિક ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે.",
    mr: "धन्यवाद! आमची स्थानिक टीम लवकरच आपल्याशी संपर्क साधेल.",
    bn: "ধন্যবাদ! আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
  },

  // Footer & Legal
  "Official Permit Agency": { en: "Official Permit Agency", hi: "आधिकारिक परमिट एजेंसी", gu: "અધિકૃત પરમિટ એજન્સી", mr: "अधिकृत परमिट एजन्सी", bn: "অফিসিয়াল পারমিট এজেন্সি" },
  "Uttarakhand Tourism Registered": { en: "Uttarakhand Tourism Registered", hi: "उत्तराखंड पर्यटन विभाग द्वारा पंजीकृत", gu: "ઉત્તરાખંડ પર્યટન વિભાગ દ્વારા નોંધાયેલ", mr: "उत्तराखंड पर्यटन विभागाकडे नोंदणीकृत", bn: "উত্তরাখণ্ড পর্যটন বিভাগ দ্বারা নিবন্ধিত" },
  "24/7 Ground Helpline": { en: "24/7 Ground Helpline", hi: "24/7 स्थानीय हेल्पलाइन", gu: "24/7 સ્થાનિક હેલ્પલાઇન", mr: "24/7 स्थानिक हेल्पलाइन", bn: "২৪/৭ স্থানীয় হেল্পলাইন" },
  "All Rights Reserved.": { en: "All Rights Reserved.", hi: "सर्वाधिकार सुरक्षित।", gu: "તમામ હકો અનામત.", mr: "सर्व हक्क राखीव.", bn: "সর্বস্বত্ব সংরক্ষিত।" },
};

const STORAGE_KEY = 'gotrek_yatra_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = () => {
    const currentIndex = SUPPORTED_LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    setLanguage(SUPPORTED_LANGUAGES[nextIndex].code);
  };

  // 1. Structured key lookup
  const t = (key: string, fallback?: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    if (PHRASEBOOK[key] && PHRASEBOOK[key][language]) {
      return PHRASEBOOK[key][language];
    }
    if (TRANSLATIONS[key] && TRANSLATIONS[key].en) {
      return TRANSLATIONS[key].en;
    }
    return fallback || key;
  };

  // 2. Direct string/phrase translation helper
  const translate = (text: string): string => {
    if (!text || language === 'en') return text;

    // Check direct phrasebook match
    const trimmed = text.trim();
    if (PHRASEBOOK[trimmed] && PHRASEBOOK[trimmed][language]) {
      return PHRASEBOOK[trimmed][language];
    }

    // Check TRANSLATIONS direct match
    if (TRANSLATIONS[trimmed] && TRANSLATIONS[trimmed][language]) {
      return TRANSLATIONS[trimmed][language];
    }

    // Try common phrase lookups (case-insensitive)
    const lower = trimmed.toLowerCase();
    for (const [k, translations] of Object.entries(PHRASEBOOK)) {
      if (k.toLowerCase() === lower && translations[language]) {
        return translations[language];
      }
    }

    return text;
  };

  const currentLanguageMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translate,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageMeta,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (k, fb) => TRANSLATIONS[k]?.en || fb || k,
      translate: (t) => t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguageMeta: SUPPORTED_LANGUAGES[0],
    };
  }
  return context;
};
