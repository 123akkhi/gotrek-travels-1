import React, { memo } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  LayoutDashboard,
  Mountain, 
  Sparkles,
  BookOpen, 
  Layers, 
  ChevronRight, 
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { GoTrekLogo } from "./GoTrekLogo";
import { GmailIcon } from "./GmailIcon";
import { 
  InstagramIcon, 
  YouTubeIcon, 
  FacebookIcon, 
  TwitterXIcon, 
  LinkedInIcon, 
} from "./SocialIcons";
import { RecognitionsSection } from "./RecognitionsSection";
import { useLanguage } from "../context/LanguageContext";
import {
  UpiLogo,
  GooglePayLogo,
  PhonePeLogo,
  PaytmLogo,
  VisaLogo,
  MastercardLogo,
  RupayLogo,
  BhimLogo,
  RazorpayBadge,
  NetBankingIcon,
} from "./PaymentLogos";
import { prefetchComponent } from "../utils/lazyWithRetry";

interface FooterProps {
  onToggleCrm: () => void;
  onOpenInquiry: (dest?: string) => void;
  onSelectDestination?: (slug: string) => void;
  onSelectPackage?: (slug?: string) => void;
  onSelectBlog?: (slug: string) => void;
  onSelectSeoPage?: (slug: string) => void;
  onSelectAboutUs?: () => void;
  onSelectTeam?: () => void;
  onSelectCareers?: () => void;
  onSelectWhatToWear?: () => void;
  onSelectMedicalFitness?: () => void;
  onSelectTerms?: () => void;
  onSelectPrivacy?: () => void;
  onSelectReels?: () => void;
  onSelectMemories?: () => void;
  onSelectPithoragarhFlights?: () => void;
}

export const Footer = memo(({
  onToggleCrm,
  onOpenInquiry,
  onSelectDestination,
  onSelectPackage,
  onSelectBlog,
  onSelectSeoPage,
  onSelectAboutUs,
  onSelectTeam,
  onSelectCareers,
  onSelectWhatToWear,
  onSelectMedicalFitness,
  onSelectTerms,
  onSelectPrivacy,
  onSelectReels,
  onSelectMemories,
  onSelectPithoragarhFlights,
}: FooterProps) => {
  const { language, translate, t } = useLanguage();

  const circuitsHeader = 
    language === 'hi' ? 'पावन यात्रा परिपथ' :
    language === 'gu' ? 'પવિત્ર યાત્રા સર્કિટ' :
    language === 'mr' ? 'पावन यात्रा सर्किट्स' :
    language === 'bn' ? 'পবিত্র যাত্রা সার্কিট' : 'Sacred Yatra Circuits';

  const packagesHeader = 
    language === 'hi' ? 'यात्रा पैकेज' :
    language === 'gu' ? 'યાત્રા પેકેજ' :
    language === 'mr' ? 'यात्रा पॅकेजेस' :
    language === 'bn' ? 'ভ্রমণ প্যাকেজ' : 'Yatra Packages';

  const guidesHeader = 
    language === 'hi' ? 'यात्रा गाइड एवं पोर्टल' :
    language === 'gu' ? 'યાત્રા ગાઇડ અને પોર્ટલ' :
    language === 'mr' ? 'यात्रा मार्गदर्शक व पोर्टल्स' :
    language === 'bn' ? 'ভ্রমণ গাইড ও পোর্টাল' : 'Yatra Guides & Portals';

  const popularBadge = 
    language === 'hi' ? 'लोकप्रिय' :
    language === 'gu' ? 'લોકપ્રિય' :
    language === 'mr' ? 'लोकप्रिय' :
    language === 'bn' ? 'জনপ্রিয়' : 'Popular';

  const whatsappDeskText = 
    language === 'hi' ? 'व्हाट्सएप सहायता' :
    language === 'gu' ? 'વ્હોટ્સએપ સહાય' :
    language === 'mr' ? 'व्हॉट्सॲप मदत' :
    language === 'bn' ? 'হোয়াটসঅ্যাপ ডেস্ক' : 'WhatsApp Desk';

  const emailDeskText = 
    language === 'hi' ? 'ईमेल भेजें' :
    language === 'gu' ? 'ઇમેઇલ મોકલો' :
    language === 'mr' ? 'ईमेल पाठवा' :
    language === 'bn' ? 'ইমেল পাঠান' : 'Send Email';

  const helplineText = 
    language === 'hi' ? '24x7 हेल्पलाइन' :
    language === 'gu' ? '24x7 હેલ્પલાઇન' :
    language === 'mr' ? '24x7 हेल्पलाइन' :
    language === 'bn' ? '২৪x৭ হেল্পলাইন' : '24x7 Helpline';

  const allRightsReservedText = 
    language === 'hi' ? '© 2027 गोट्रेक ट्रैवल्स। सर्वाधिकार सुरक्षित।' :
    language === 'gu' ? '© 2027 ગોટ્રેક ટ્રાવેલ્સ. સર્વાધિકાર સુરક્ષિત.' :
    language === 'mr' ? '© 2027 गोट्रेक ट्रॅव्हल्स. सर्व हक्क राखीव.' :
    language === 'bn' ? '© ২০২৭ গোত্রেক ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।' : '© 2027 GoTrek Travels. All Rights Reserved.';

  const aboutUsText = t("nav.about", "About Us");
  const termsText = language === 'hi' ? 'नियम एवं शर्तें' : language === 'gu' ? 'નિયમો અને શરતો' : language === 'mr' ? 'नियम व अटी' : language === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions';
  const privacyText = language === 'hi' ? 'गोपनीयता एवं रद्दीकरण नीति' : language === 'gu' ? 'ગોપનીયતા અને રદ્દીકરણ નીતિ' : language === 'mr' ? 'गोपनीयता व रद्द करण्याचे धोरण' : language === 'bn' ? 'গোপনীয়তা ও বাতিল নীতি' : 'Privacy & Cancellation Policy';

  return (
    <footer className="bg-[#0B1120] text-slate-300 text-xs pt-12 pb-12 border-t border-slate-800">
      {/* 1. Official Recognitions & Partners Section */}
      <div className="border-b border-slate-800/80 pb-12 mb-12">
        <RecognitionsSection isDark={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Navigation & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1: Brand Identity & Contact Desk (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <GoTrekLogo className="w-11 h-11" />
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xl font-black text-white tracking-tight uppercase">
                    GOTREK
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm">
                    2027
                  </span>
                </div>
                <span className="text-[11px] font-black tracking-[0.24em] text-amber-400 uppercase block mt-1 leading-none">
                  TRAVELS
                </span>
                <span className="text-[10px] text-amber-300/90 font-bold uppercase tracking-wider block mt-1">
                  Pithoragarh • Dharchula • Kumaon Himalayas
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Govt.-authorized local operator for <strong className="text-white">Adi Kailash & Om Parvat</strong>, <strong className="text-white">Kailash Mansarovar (Lipulekh)</strong>, <strong className="text-white">Valley of Flowers</strong>, and <strong className="text-white">Char Dham</strong> with 100% direct SDM Dharchula permit clearance.
            </p>

            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 text-[11px]">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span className="font-semibold text-xs text-white">Lic: UTTR/PITHORAGARH/04-2026/450066</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-medium">MSME: UDYAM-UK-09-0011014</span>
            </div>

            {/* Structured Contact Details */}
            <div className="pt-3 space-y-2.5 text-xs text-slate-300 border-t border-slate-800">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Roadways Workshop Road, Opp. Joshi Bhawan, Chandrabhaga, Pithoragarh, Uttarakhand 262501
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <a href="tel:+917248285767" className="hover:text-amber-300 font-bold font-mono text-white transition-colors">
                    +91 72482 85767
                  </a>
                  <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40">
                    24x7 Helpline
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <a href="mailto:mailgotrek@gmail.com" className="hover:text-amber-300 text-slate-300 transition-colors">
                  mailgotrek@gmail.com
                </a>
              </div>
            </div>

            {/* Direct Communication Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-w-sm">
              <a
                href="https://wa.me/917248285767?text=Hello%20GoTrek%20Team%2C%20I%20want%20to%20inquire%20about%20Adi%20Kailash%2C%20Kailash%20Mansarovar%20%26%20Valley%20of%20Flowers%20Yatra%202027."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all cursor-pointer group active:scale-98"
              >
                <WhatsAppIcon size={15} className="text-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>{whatsappDeskText}</span>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mailgotrek@gmail.com&su=Adi%20Kailash%20%26%20Om%20Parvat%20Yatra%20Inquiry%202027"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100 hover:text-white font-semibold text-xs transition-all cursor-pointer group active:scale-98"
              >
                <GmailIcon size={15} className="shrink-0 group-hover:scale-110 transition-transform" />
                <span>{emailDeskText}</span>
              </a>
            </div>

            {/* Social Media Channels in Brand Column */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Follow Our Yatras</span>
                </span>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  @gotrektravels
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/gotrektravels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow GoTrek Travels on Instagram"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-rose-600 to-purple-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-rose-500/25 transition-all cursor-pointer"
                  title="Instagram: Daily 4K Yatra Reels & Darshan"
                >
                  <InstagramIcon size={16} />
                </a>

                <a
                  href="https://www.youtube.com/@GoTrekTravels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to GoTrek Travels YouTube Channel"
                  className="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 transition-all cursor-pointer"
                  title="YouTube: Official Yatra Documentaries & Aarti"
                >
                  <YouTubeIcon size={16} />
                </a>

                <a
                  href="https://www.facebook.com/gotrektravels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with GoTrek Travels on Facebook"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
                  title="Facebook: Verified Pilgrim Community & Photos"
                >
                  <FacebookIcon size={16} />
                </a>

                <a
                  href="https://chat.whatsapp.com/gotrektravels-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join GoTrek Travels WhatsApp Community"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
                  title="WhatsApp Community: Daily Darshan & Permit Alerts"
                >
                  <WhatsAppIcon size={16} />
                </a>

                <a
                  href="https://twitter.com/gotrektravels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow GoTrek Travels on X (Twitter)"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-white flex items-center justify-center hover:bg-black hover:border-slate-500 hover:scale-110 transition-all cursor-pointer"
                  title="X (Twitter): Official Road & Border Bulletins"
                >
                  <TwitterXIcon size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/company/gotrektravels"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with GoTrek Travels on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-600/25 transition-all cursor-pointer"
                  title="LinkedIn: Corporate & B2B Partner Desk"
                >
                  <LinkedInIcon size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Sacred Yatra Circuits (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5" onMouseEnter={() => prefetchComponent(() => import("./DestinationDetailPage"), "DestinationDetailPage", true)}>
            <div className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <Mountain size={14} className="text-amber-400" />
              <span>{circuitsHeader}</span>
            </div>
            
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('adi-kailash')}
                  className="w-full text-left text-white hover:text-amber-300 font-semibold flex items-center justify-between group cursor-pointer transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{translate("Adi Kailash & Om Parvat")}</span>
                  </span>
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">{popularBadge}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('kailash-mansarovar')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Kailash Mansarovar (Lipulekh)")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('valley-of-flowers')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Valley of Flowers & Hemkund")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('darma-valley')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Darma Valley & Panchachuli")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('munsyari')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Khaliya Top & Munsiyari Alpine")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('chardham-yatra')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Char Dham Grand Yatra (10 Days)")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('do-dham-kedarnath-badrinath')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Kedarnath & Badrinath Do Dham")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('yamunotri-dham')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Yamunotri & Gangotri Dham")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('chitai-golu-devta')}
                  className="w-full text-left text-amber-200/90 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Chitai Golu Devta Mandir")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('jageshwar-dham')}
                  className="w-full text-left text-amber-200/90 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Jageshwar Dham (8th Jyotirlinga)")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination('patal-bhuvaneshwar')}
                  className="w-full text-left text-amber-200/90 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Patal Bhuvaneshwar Cave")}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Fixed Departure Packages (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5" onMouseEnter={() => prefetchComponent(() => import("./PackageDetailPage"), "PackageDetailPage", true)}>
            <div className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <Layers size={14} className="text-amber-400" />
              <span>{packagesHeader}</span>
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('adi-kailash-yatra-standard')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Adi Kailash 6D/5N")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('adi-kailash-luxury-vip')}
                  className="w-full text-left text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("VIP Luxury Homestay")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('kailash-mansarovar-lipulekh-view')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Lipulekh Kailash 7D/6N")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('valley-of-flowers-hemkund-group')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Valley of Flowers 6D")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('darma-valley-panchachuli-explorer')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Darma Valley 5D/4N")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPackage && onSelectPackage('chardham-grand-pilgrimage')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Char Dham 10D Yatra")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry && onOpenInquiry('Custom Family / Senior Citizen Group')}
                  className="w-full text-left text-amber-400 hover:text-amber-300 font-bold flex items-center gap-2 group cursor-pointer transition-colors pt-1"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{translate("Custom Family Group")}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Guides, Permitting & Portals (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5" onMouseEnter={() => { prefetchComponent(() => import("./WhatToWearPage"), "WhatToWearPage", true); prefetchComponent(() => import("./MedicalFitnessPage"), "MedicalFitnessPage", true); prefetchComponent(() => import("./AboutUsPage"), "AboutUsPage", true); }}>
            <div className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2 pb-1 border-b border-slate-800">
              <BookOpen size={14} className="text-amber-400" />
              <span>{guidesHeader}</span>
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPithoragarhFlights) onSelectPithoragarhFlights();
                  }}
                  className="w-full text-left text-amber-300 hover:text-amber-200 font-bold flex items-center justify-between group cursor-pointer transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>Delhi & Dehradun Flights (NGH)</span>
                  </span>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    FLIGHTS
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectReels) onSelectReels();
                  }}
                  className="w-full text-left text-amber-300 hover:text-amber-200 font-bold flex items-center justify-between group cursor-pointer transition-colors py-0.5"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>{t("nav.reels", "Yatra Reels & Darshan")}</span>
                  </span>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-red-900/80 text-amber-300 border border-red-700/60">
                    HOT
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectMemories) onSelectMemories();
                  }}
                  className="w-full text-left text-slate-200 hover:text-amber-200 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t("nav.memories", "Sacred Photo Memories (HD)")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectAboutUs) onSelectAboutUs();
                  }}
                  className="w-full text-left text-amber-300 hover:text-amber-200 font-bold flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t("nav.about", "About GoTrek Travels")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectWhatToWear) onSelectWhatToWear();
                  }}
                  className="w-full text-left text-slate-200 hover:text-amber-200 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t("nav.attireGuide", "What to Wear & Packing Guide")}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectMedicalFitness) onSelectMedicalFitness();
                  }}
                  className="w-full text-left text-slate-200 hover:text-amber-200 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Medical Fitness Checklist & Clearance Pass</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectBlog && onSelectBlog('all')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>All Official Yatra Blogs</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSeoPage && onSelectSeoPage('inner-line-permit-dharchula')}
                  className="w-full text-left text-slate-200 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>SDM Dharchula Permit Desk</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSeoPage && onSelectSeoPage('gunji-nabhi-jolingkong-homestays')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Homestays & Accommodation</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSeoPage && onSelectSeoPage('pithoragarh-helicopter-services')}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Pithoragarh Heli Services</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSeoPage && onSelectSeoPage('b2b-travel-agent-partner-desk')}
                  className="w-full text-left text-amber-300 hover:text-amber-200 font-bold flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>B2B Wholesale Agent Desk</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTeam) onSelectTeam();
                  }}
                  className="w-full text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors py-0.5"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Ground Team & Guides</span>
                </button>
              </li>
              <li className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCareers) onSelectCareers();
                  }}
                  className="text-left text-slate-300 hover:text-amber-300 font-medium flex items-center gap-2 group cursor-pointer transition-colors"
                >
                  <ChevronRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Careers & Hiring</span>
                </button>
                <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-full">
                  We're Hiring
                </span>
              </li>
              <li className="pt-1.5">
                <button
                  type="button"
                  onClick={onToggleCrm}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-[11px] font-bold border border-slate-700 cursor-pointer transition-colors"
                >
                  <LayoutDashboard size={12} />
                  <span>Staff CRM Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Accepted Payment Gateways & Banking Trust Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  100% Verified Yatra Payment Gateway
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase tracking-wider">
                  256-Bit SSL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Govt. GST Registered Yatra Billing • Instant SDM Permit Slot Booking • Bank Verified
              </p>
            </div>
          </div>

          {/* Payment Gateway Apps & Cards */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="Google Pay">
              <GooglePayLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-[#5F259F] flex items-center justify-center shadow-xs" title="PhonePe">
              <PhonePeLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="Paytm">
              <PaytmLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="BHIM UPI">
              <BhimLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center shadow-xs" title="Unified Payments Interface">
              <UpiLogo className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="Visa">
              <VisaLogo className="h-3.5 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="Mastercard">
              <MastercardLogo className="h-3.5 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="RuPay">
              <RupayLogo className="h-3.5 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-white flex items-center justify-center shadow-xs" title="Net Banking">
              <NetBankingIcon className="h-4 w-auto" />
            </div>
            <div className="h-7 px-2 rounded-md bg-[#0C2340] border border-blue-500/30 flex items-center justify-center shadow-xs" title="Razorpay Secure Checkout">
              <RazorpayBadge className="h-4 w-auto" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>{allRightsReservedText}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onSelectAboutUs && onSelectAboutUs()}
              className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {aboutUsText}
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onSelectTerms && onSelectTerms()}
              className="text-slate-300 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {termsText}
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => onSelectPrivacy && onSelectPrivacy()}
              className="text-slate-300 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {privacyText}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/gotrektravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-rose-400 transition-colors"
                title="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://www.youtube.com/@GoTrekTravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-slate-400 hover:text-red-400 transition-colors"
                title="YouTube"
              >
                <YouTubeIcon size={14} />
              </a>
              <a
                href="https://www.facebook.com/gotrektravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                title="Facebook"
              >
                <FacebookIcon size={14} />
              </a>
              <a
                href="https://chat.whatsapp.com/gotrektravels-community"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Community"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon size={14} />
              </a>
              <a
                href="https://twitter.com/gotrektravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-slate-400 hover:text-white transition-colors"
                title="X (Twitter)"
              >
                <TwitterXIcon size={12} />
              </a>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{language === 'hi' ? 'श्रद्धा व प्रेम से निर्मित' : language === 'gu' ? 'શ્રદ્ધા અને પ્રેમથી નિર્મિત' : language === 'mr' ? 'भक्ती व प्रेमाने निर्मित' : language === 'bn' ? 'শ্রদ্ধা ও ভালোবাসায় নির্মিত' : 'Crafted with'}</span>
              <Heart size={13} className="text-amber-400 fill-amber-400" />
              <span>{language === 'hi' ? 'धारचूला एवं पिथौरागढ़, उत्तराखंड' : language === 'gu' ? 'ધારચૂલા અને પિથોરાગઢ, ઉત્તરાખંડ' : language === 'mr' ? 'धारचुला व पिथौरागढ, उत्तराखंड' : language === 'bn' ? 'ধারচুলা ও পিথোরাগড়, উত্তরাখণ্ড' : 'in Dharchula & Pithoragarh, Uttarakhand'}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
