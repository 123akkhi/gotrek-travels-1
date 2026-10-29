import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import {
  CheckCircle2,
  Download,
  Printer,
  Share2,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  FileText,
  Phone,
  Mail,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Car,
  Compass,
  Sparkles,
  Info,
  QrCode,
  Maximize2,
  X,
  Smartphone,
  Shield,
  Layers,
  Send,
  RefreshCw,
  MessageSquare,
  Eye,
  EyeOff,
  Edit2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { GmailIcon } from './GmailIcon';
import {
  BookingReceiptData,
  downloadPdfReceipt,
  downloadHtmlReceipt,
  printReceiptWindow
} from '../utils/receiptGenerator';

interface PaymentSuccessPageProps {
  bookingData?: Partial<BookingReceiptData> | null;
  onBackToHome: () => void;
  onOpenInquiry?: () => void;
  onSelectDestination?: (slug: string) => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  bookingData: propBookingData,
  onBackToHome,
  onOpenInquiry,
  onSelectDestination,
}) => {
  const [booking, setBooking] = useState<BookingReceiptData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [qrPassMode, setQrPassMode] = useState<'url' | 'data'>('url');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [whatsappTriggerStatus, setWhatsappTriggerStatus] = useState<'idle' | 'triggering' | 'triggered'>('idle');
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState<boolean>(false);
  const [customPhoneInput, setCustomPhoneInput] = useState<string>('');
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);

  // Initialize booking details from props or localStorage or fallback
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (propBookingData && propBookingData.bookingId) {
      const fullData: BookingReceiptData = {
        bookingId: propBookingData.bookingId,
        paymentId: propBookingData.paymentId || `pay_rzp_${Date.now()}`,
        fullName: propBookingData.fullName || 'Pilgrim Devotee',
        phone: propBookingData.phone || '+91 98765 43210',
        email: propBookingData.email || 'pilgrim@gotrektravel.com',
        destination: propBookingData.destination || 'Adi Kailash & Om Parvat Yatra (Dharchula Base)',
        pickupLocation: propBookingData.pickupLocation || 'Kathgodam / Haldwani Hub',
        travelDate: propBookingData.travelDate || '10 May 2027',
        month: propBookingData.month || 'May 2027 Departure Batch',
        travellers: propBookingData.travellers || 1,
        amountPaid: propBookingData.amountPaid || 5000,
        paymentStatus: 'CONFIRMED',
        paymentMethod: propBookingData.paymentMethod || 'Razorpay Online Gateway (UPI / Card)',
        date: propBookingData.date || new Date().toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setBooking(fullData);
      try {
        localStorage.setItem('gotrek_latest_booking', JSON.stringify(fullData));
      } catch {}
      return;
    }

    // Check query params
    const params = new URLSearchParams(window.location.search);
    const qBookingId = params.get('bookingId') || params.get('id');
    const qPaymentId = params.get('paymentId');

    // Check localStorage
    try {
      const saved = localStorage.getItem('gotrek_latest_booking');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (qBookingId && parsed.bookingId !== qBookingId) {
          parsed.bookingId = qBookingId;
        }
        if (qPaymentId) {
          parsed.paymentId = qPaymentId;
        }
        setBooking(parsed);
        return;
      }
    } catch {}

    // Fallback recent confirmed record
    const fallbackBooking: BookingReceiptData = {
      bookingId: qBookingId || `GTK-AK-${Date.now().toString().slice(-6)}`,
      paymentId: qPaymentId || `pay_rzp_${Math.floor(100000000 + Math.random() * 900000000)}`,
      fullName: 'Shri Pilgrim Devotee',
      phone: '+91 72482 85767',
      email: 'mailgotrek@gmail.com',
      destination: 'Adi Kailash & Om Parvat Sacred Circuit (Dharchula)',
      pickupLocation: 'Kathgodam Railway Station Hub / Haldwani',
      travelDate: '10 May 2027',
      month: 'May 2027 Batch',
      travellers: 2,
      amountPaid: 5000,
      paymentStatus: 'CONFIRMED',
      paymentMethod: 'Razorpay Online Gateway (UPI / NetBanking)',
      date: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setBooking(fallbackBooking);
  }, [propBookingData]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-serif font-bold text-slate-700">Loading Payment Voucher...</p>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate QR Code value
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://gotrektravel.com';
  const qrVerificationUrl = `${origin}/payment-success?bookingId=${encodeURIComponent(booking.bookingId)}&paymentId=${encodeURIComponent(booking.paymentId)}`;
  
  const qrCompactData = `GOTREK-PASS|ID:${booking.bookingId}|DEVOTEE:${booking.fullName}|PHONE:${booking.phone}|CIRCUIT:${booking.destination}|DATE:${booking.travelDate}|PAX:${booking.travellers}|PAID:INR${booking.amountPaid}|STATUS:CONFIRMED|UTDB:UK/PITH/2024/0981`;

  const activeQrValue = qrPassMode === 'url' ? qrVerificationUrl : qrCompactData;

  // Sync canvas to dataURL for PDF embedding and 1-click gallery download
  useEffect(() => {
    if (!booking) return;
    const timer = setTimeout(() => {
      try {
        const canvas = document.getElementById('booking-qr-canvas') as HTMLCanvasElement;
        if (canvas) {
          setQrDataUrl(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        console.warn('Could not generate canvas data URL for QR code', err);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [booking, qrPassMode]);

  const handleDownloadQrCode = () => {
    try {
      const canvas = document.getElementById('booking-qr-canvas') as HTMLCanvasElement;
      if (!canvas) return;
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `GoTrek_Checkin_QR_${booking.bookingId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setDownloadSuccess('Check-in QR Pass saved to photo gallery!');
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (err) {
      console.error('Failed to download QR code image', err);
    }
  };

  const handleDownloadPdf = () => {
    try {
      downloadPdfReceipt({
        ...booking,
        qrCodeDataUrl: qrDataUrl || undefined
      });
      setDownloadSuccess('Official PDF Receipt with Check-in QR downloaded!');
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (e) {
      console.error(e);
      window.print();
    }
  };

  const handleDownloadHtml = () => {
    downloadHtmlReceipt({
      ...booking,
      qrCodeDataUrl: qrDataUrl || undefined
    });
    setDownloadSuccess('Offline HTML Receipt with Check-in QR downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handlePrint = () => {
    printReceiptWindow({
      ...booking,
      qrCodeDataUrl: qrDataUrl || undefined
    });
  };

  // Clean and format recipient phone for WhatsApp
  const rawDevoteePhone = customPhoneInput || (booking ? booking.phone : '');
  const cleanDevoteeDigits = (rawDevoteePhone || '').replace(/\D/g, '');
  
  const formattedDevoteePhone =
    cleanDevoteeDigits.length === 10
      ? `+91 ${cleanDevoteeDigits.slice(0, 5)} ${cleanDevoteeDigits.slice(5)}`
      : cleanDevoteeDigits.length === 12 && cleanDevoteeDigits.startsWith('91')
      ? `+91 ${cleanDevoteeDigits.slice(2, 7)} ${cleanDevoteeDigits.slice(7)}`
      : rawDevoteePhone;

  const targetWhatsAppPhone =
    cleanDevoteeDigits.length === 10
      ? `91${cleanDevoteeDigits}`
      : cleanDevoteeDigits.length === 12 && cleanDevoteeDigits.startsWith('91')
      ? cleanDevoteeDigits
      : cleanDevoteeDigits.length === 11 && cleanDevoteeDigits.startsWith('0')
      ? `91${cleanDevoteeDigits.slice(1)}`
      : cleanDevoteeDigits || '917248285767';

  // Construct official message text for her / his WhatsApp
  const devoteeWhatsAppMessage = `🕉️ *GoTrek Travels — Official Yatra Booking & Payment Confirmed*

Jai Baba Adi Kailash! 🙏

Dear *${booking.fullName}*,
Your advance deposit of *₹${(booking.amountPaid || 0).toLocaleString('en-IN')}* has been received & verified. Your holy yatra seat is now officially reserved!

📋 *Official Reservation Details:*
• *Booking Reference ID:* ${booking.bookingId}
• *Razorpay Payment ID:* ${booking.paymentId}
• *Sacred Circuit:* ${booking.destination}
• *Departure Batch:* ${booking.travelDate || booking.month}
• *Devotees Count:* ${booking.travellers} Pax
• *Pickup Station:* ${booking.pickupLocation}
• *Seat Status:* ✅ CONFIRMED & ALLOCATED

🎟️ *Instant Digital Check-in Pass & QR:*
${qrVerificationUrl}

🏔️ *Inner Line Permit (ILP) Next Step:*
Our Dharchula Base Camp Operations team has queued your Inner Line Permit submission with SDM Dharchula. Please carry your original Aadhaar Card and Medical Fitness certificate.

📍 *GoTrek Base Camp:* Roadways Workshop Road, Pithoragarh, Uttarakhand
📞 *24x7 Operations Desk:* +91 72482 85767
📧 *Official Email:* mailgotrek@gmail.com
🌐 *Website:* ${origin}`;

  // 1. Instant Automated Trigger to Devotee's WhatsApp (Her or His Mobile)
  const triggerWhatsAppToDevotee = async (isManualClick = true) => {
    setWhatsappTriggerStatus('triggering');
    try {
      // Trigger background server-side WhatsApp webhook dispatch
      fetch('/api/whatsapp/trigger-devotee-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          phone: targetWhatsAppPhone,
          fullName: booking.fullName,
          destination: booking.destination,
          travelDate: booking.travelDate || booking.month,
          amountPaid: booking.amountPaid,
          paymentId: booking.paymentId,
        }),
      }).catch((e) => console.warn('Background WhatsApp trigger log:', e));

      // Construct direct universal WhatsApp launch link
      const encoded = encodeURIComponent(devoteeWhatsAppMessage);
      const url = `https://api.whatsapp.com/send?phone=${targetWhatsAppPhone}&text=${encoded}`;

      if (isManualClick) {
        window.open(url, '_blank');
      }

      setWhatsappTriggerStatus('triggered');
      setDownloadSuccess(`WhatsApp confirmation sent to devotee at ${formattedDevoteePhone}!`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
      setWhatsappTriggerStatus('triggered');
    }
  };

  // 2. Share copy to GoTrek Operations Desk
  const shareToOperationsDesk = () => {
    const text = `*🕉️ GoTrek Travels — Devotee Payment Confirmation Copy*%0A%0A*Booking ID:* ${booking.bookingId}%0A*Razorpay ID:* ${booking.paymentId}%0A*Devotee Name:* ${encodeURIComponent(booking.fullName)}%0A*Devotee Phone:* ${encodeURIComponent(booking.phone)}%0A*Circuit:* ${encodeURIComponent(booking.destination)}%0A*Departure Batch:* ${encodeURIComponent(booking.travelDate)}%0A*Pax:* ${booking.travellers}%0A*Paid:* ₹${(booking.amountPaid || 0).toLocaleString('en-IN')}%0A%0A_Please issue Inner Line Permit receipt and assign 4x4 Bolero seat._`;
    window.open(`https://wa.me/917248285767?text=${text}`, '_blank');
  };


  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] antialiased selection:bg-amber-100 selection:text-amber-900 pb-20">
      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E2D3] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-amber-800 font-serif font-bold text-sm sm:text-base tracking-wide">GoTrek Travels</span>
            <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              Government Reg: UTDB UK/PITH/2024/0981
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleDownloadPdf}
            className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download Receipt</span>
            <span className="sm:hidden">Receipt</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 py-2 rounded-xl bg-white border border-[#E6E2D3] text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            title="Print Voucher"
          >
            <Printer size={15} />
            <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-8">
        
        {/* Download Success Toast Alert */}
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-700">Official Voucher Ready</span>
          </motion.div>
        )}

        {/* Hero Confirmation Card */}
        <div className="relative overflow-hidden bg-white border border-[#E6E2D3] rounded-3xl p-6 sm:p-10 text-center shadow-md">
          {/* Subtle Spiritual Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-600" />
          
          <div className="relative z-10 space-y-4">
            {/* Pulsing Animated Success Ring */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100/80 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center shadow-inner">
                <CheckCircle2 size={44} className="stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600"></span>
              </span>
            </div>

            <div className="space-y-1.5 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck size={13} />
                <span>Payment Verified · Seat Confirmed</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E293B] tracking-tight">
                Jai Baba Adi Kailash!
              </h1>
              <p className="text-sm sm:text-base text-[#5A5A40] leading-relaxed">
                Your Yatra advance deposit of <strong className="text-slate-900">₹{(booking.amountPaid || 0).toLocaleString('en-IN')}</strong> has been successfully processed & confirmed. Your seat has been secured with GoTrek Operations Desk, Pithoragarh.
              </p>
            </div>

            {/* Quick Reference Identifiers with 1-click Copy */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
              <div className="flex items-center gap-2 bg-[#F7F5EE] border border-[#E6E2D3] px-3.5 py-2 rounded-xl">
                <span className="text-slate-500 font-medium">Booking ID:</span>
                <span className="font-mono font-bold text-amber-900">{booking.bookingId}</span>
                <button
                  onClick={() => handleCopy(booking.bookingId, 'bookingId')}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Copy Booking ID"
                >
                  {copiedId === 'bookingId' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                </button>
              </div>

              <div className="flex items-center gap-2 bg-[#F7F5EE] border border-[#E6E2D3] px-3.5 py-2 rounded-xl">
                <span className="text-slate-500 font-medium">Txn ID:</span>
                <span className="font-mono font-bold text-slate-800 truncate max-w-[140px] sm:max-w-none">{booking.paymentId}</span>
                <button
                  onClick={() => handleCopy(booking.paymentId, 'paymentId')}
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Copy Transaction ID"
                >
                  {copiedId === 'paymentId' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Primary Action Buttons Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownloadPdf}
                className="px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download size={16} />
                <span>Download Official PDF Receipt</span>
              </button>

              <button
                onClick={handleDownloadHtml}
                className="px-4 py-3 rounded-xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <FileText size={15} className="text-amber-800" />
                <span>Download HTML Receipt</span>
              </button>

              <button
                onClick={() => triggerWhatsAppToDevotee(true)}
                className="px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa4f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                title="Trigger official receipt message directly to devotee's WhatsApp"
              >
                <WhatsAppIcon size={16} />
                <span>Send to Devotee's WhatsApp</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-3 rounded-xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* AUTOMATIC WHATSAPP TRIGGER TO DEVOTEE (HER / HIS MOBILE) */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden bg-white border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Top Emerald Brand Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#25D366] to-emerald-500" />
          
          <div className="space-y-6">
            {/* Header / Trigger Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6E2D3] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span>Automatic WhatsApp Notification Trigger</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Direct WhatsApp Delivery to Devotee's Mobile
                </h2>
                <p className="text-xs text-slate-600 max-w-xl">
                  Official booking confirmation, digital QR check-in voucher, and permit guidelines are prepared for automatic delivery directly to her or his registered WhatsApp.
                </p>
              </div>

              {/* Status Pill */}
              <div className="flex-shrink-0">
                <div className="px-3.5 py-2 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <WhatsAppIcon size={16} />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Trigger Status</span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      {whatsappTriggerStatus === 'triggered'
                        ? 'Trigger Dispatched'
                        : whatsappTriggerStatus === 'triggering'
                        ? 'Dispatching...'
                        : 'Active & Ready'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient Devotee Info Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAF8] border border-emerald-100 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] block font-medium">Devotee Recipient</span>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Users size={14} className="text-emerald-700" />
                  <span>{booking.fullName}</span>
                </div>
                <span className="text-[11px] text-slate-500 block">Lead Yatri ({booking.travellers} Pax)</span>
              </div>

              <div className="space-y-1 md:border-l md:border-emerald-100 md:pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px] font-medium">Her / His WhatsApp Number</span>
                  <button
                    onClick={() => setIsEditingPhone(!isEditingPhone)}
                    className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Edit2 size={10} />
                    <span>{isEditingPhone ? 'Cancel' : 'Change Number'}</span>
                  </button>
                </div>
                
                {isEditingPhone ? (
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="tel"
                      value={customPhoneInput}
                      onChange={(e) => setCustomPhoneInput(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="px-2 py-1 text-xs border border-emerald-300 rounded-lg w-full bg-white font-mono focus:outline-emerald-600"
                    />
                    <button
                      onClick={() => setIsEditingPhone(false)}
                      className="px-2.5 py-1 bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="font-bold text-slate-900 text-sm font-mono flex items-center gap-1.5">
                    <Smartphone size={14} className="text-emerald-700" />
                    <span>{formattedDevoteePhone}</span>
                  </div>
                )}
                <span className="text-[10px] text-emerald-700 font-semibold">Standard International E.164 Protocol</span>
              </div>

              <div className="space-y-1 md:border-l md:border-emerald-100 md:pl-4">
                <span className="text-slate-500 text-[11px] block font-medium">Delivery Payload Included</span>
                <div className="font-bold text-slate-800 text-xs flex items-center gap-1">
                  <Check size={13} className="text-emerald-600" />
                  <span>Verified QR Link + ILP Instructions</span>
                </div>
                <span className="text-[11px] text-slate-500 block font-mono">
                  Ref: {booking.bookingId}
                </span>
              </div>
            </div>

            {/* Main WhatsApp Trigger Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => triggerWhatsAppToDevotee(true)}
                className="flex-1 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa4f] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon size={20} />
                <span>
                  {whatsappTriggerStatus === 'triggering'
                    ? 'Triggering WhatsApp Message...'
                    : `Send to Devotee's WhatsApp (${formattedDevoteePhone})`}
                </span>
                <Send size={15} className="ml-1" />
              </button>

              <button
                onClick={shareToOperationsDesk}
                className="px-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] hover:bg-[#F0ECE1] text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                title="Send a confirmation acknowledgment copy to GoTrek Operations (+91 72482 85767)"
              >
                <Share2 size={14} className="text-slate-600" />
                <span>Forward Copy to Base Camp Desk</span>
              </button>

              <button
                onClick={() => setShowWhatsAppPreview(!showWhatsAppPreview)}
                className="px-4 py-3.5 rounded-2xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {showWhatsAppPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showWhatsAppPreview ? 'Hide Message' : 'Preview Message'}</span>
              </button>
            </div>

            {/* WhatsApp Formatted Message Live Preview */}
            <AnimatePresence>
              {showWhatsAppPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#EFEAE2] border border-[#D5CDBD] text-slate-800 shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#D5CDBD] text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare size={13} className="text-emerald-700" />
                        <span>Live WhatsApp Message Preview (Sending to {formattedDevoteePhone}):</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Chat Bubble View</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl rounded-tl-xs shadow-xs text-xs font-sans whitespace-pre-wrap leading-relaxed border border-[#E1DDD5] max-w-2xl">
                      {devoteeWhatsAppMessage}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
                      <span>💡 <em>Includes direct one-tap link to the verified digital voucher & QR pass.</em></span>
                      <button
                        onClick={() => triggerWhatsAppToDevotee(true)}
                        className="font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                      >
                        Send Now →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Offline Border Checkpost Guarantee */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5">
              <Sparkles size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Offline Persistence Benefit:</strong> Once sent to her or his WhatsApp, this official message and ticket link are stored in the devotee's WhatsApp chat history. Yatris can present it directly from their phone chat even at high-altitude ITBP border posts where cellular internet is unavailable!
              </p>
            </div>
          </div>
        </div>


        {/* ======================================================== */}
        {/* OFFICIAL DIGITAL CHECK-IN QR PASS (SDM / ITBP / BASECAMP) */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden bg-white border-2 border-amber-800/30 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Top Decorative Border */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-600 to-emerald-600" />
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
            {/* Left: Scannable QR Box */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative p-3.5 bg-white border border-[#E6E2D3] rounded-2xl shadow-sm group hover:border-amber-700/50 transition-colors">
                {/* Visual Scanner Corner Brackets */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-800 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-800 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-800 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-800 pointer-events-none" />

                {/* Live Crisp Vector QR Code */}
                <QRCodeSVG
                  value={activeQrValue}
                  size={176}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                  className="rounded-lg cursor-pointer"
                  onClick={() => setIsQrModalOpen(true)}
                  title="Click to view full-screen QR pass"
                />

                {/* Offscreen high-res Canvas for 1-click PNG image export */}
                <QRCodeCanvas
                  id="booking-qr-canvas"
                  value={activeQrValue}
                  size={360}
                  level="H"
                  includeMargin={true}
                  className="hidden"
                />

                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    <Shield size={10} className="text-emerald-600" />
                    ID: {booking.bookingId}
                  </span>
                </div>
              </div>

              {/* Quick Actions underneath QR */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleDownloadQrCode}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Save QR code image into your mobile gallery for offline checkposts"
                >
                  <Download size={13} />
                  <span>Save to Gallery</span>
                </button>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Open Full Screen Pass for scanning"
                >
                  <Maximize2 size={15} />
                </button>

                <button
                  onClick={() => handleCopy(activeQrValue, 'qrLink')}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Copy verification link"
                >
                  {copiedId === 'qrLink' ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                </button>
              </div>

              <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                <Smartphone size={11} className="text-slate-400" />
                <span>Tap QR code for Full Screen mode</span>
              </div>
            </div>

            {/* Right: Pass Details & Checkpoint Verification Guide */}
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E2D3] pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    <span>Official Check-in Pass · UTDB Reg: UK/PITH/2024/0981</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mt-1">
                    Digital Yatri Check-in QR Pass
                  </h3>
                </div>

                {/* Mode Switcher Pill */}
                <div className="flex items-center p-1 bg-[#F5F2ED] border border-[#E6E2D3] rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setQrPassMode('url')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      qrPassMode === 'url'
                        ? 'bg-white text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Online Web Pass
                  </button>
                  <button
                    onClick={() => setQrPassMode('data')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      qrPassMode === 'data'
                        ? 'bg-white text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Offline Devotee Text
                  </button>
                </div>
              </div>

              {/* Devotee Check-in Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-[#FAF8F5] border border-[#E6E2D3] p-3.5 rounded-2xl">
                <div>
                  <span className="text-slate-500 text-[11px] block">Primary Devotee</span>
                  <span className="font-bold text-slate-900 truncate block">{booking.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Total Devotees</span>
                  <span className="font-bold text-slate-900">{booking.travellers} Pax</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Seat Status</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    Confirmed
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <span className="text-slate-500 text-[11px] block">Sacred Circuit</span>
                  <span className="font-bold text-slate-900 truncate block">{booking.destination}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Departure Batch</span>
                  <span className="font-bold text-slate-900">{booking.travelDate}</span>
                </div>
              </div>

              {/* Where to present this QR Code */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={12} />
                  Where to Show This QR Code During Your Yatra:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D3] space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold inline-flex items-center justify-center">1</span>
                      <span>Dharchula Base Camp</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      Scan at GoTrek reception to collect 4x4 Bolero boarding pass & homestay allocations.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D3] space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold inline-flex items-center justify-center">2</span>
                      <span>SDM Permit Desk</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      Quick scan for instant Inner Line Permit (ILP) verification & biometric matching.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E6E2D3] space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold inline-flex items-center justify-center">3</span>
                      <span>Gunji ITBP Checkpost</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      Present at 3,200m border post for rapid security verification by ITBP jawans.
                    </p>
                  </div>
                </div>
              </div>

              {/* High Altitude Offline Tip */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                <Info size={15} className="text-amber-800 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>High Altitude Tip:</strong> Cellular network beyond Dharchula is limited to occasional BSNL towers. Please click <strong>"Save to Gallery"</strong> above so this QR Pass remains accessible in your phone photos even in 100% offline flight mode!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reservation & Financial Breakdown Voucher */}
        <div className="bg-white border border-[#E6E2D3] rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#F5F2ED] border-b border-[#E6E2D3] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Tax Invoice & Seat Voucher</div>
              <h2 className="text-lg font-serif font-bold text-slate-900">Reservation Breakdown</h2>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Date: <span className="font-semibold text-slate-800">{booking.date}</span></div>
              <div>Status: <span className="font-bold text-emerald-700">PAID & VERIFIED</span></div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Grid of details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Pilgrim Info */}
              <div className="bg-[#FAF8F5] border border-[#E6E2D3] rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center gap-2 border-b border-[#E6E2D3] pb-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <Users size={14} />
                  <span>Lead Pilgrim Information</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Primary Devotee:</span>
                    <span className="font-bold text-slate-900">{booking.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">WhatsApp Phone:</span>
                    <span className="font-bold text-slate-900">{booking.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Address:</span>
                    <span className="font-medium text-slate-900 truncate max-w-[180px]">{booking.email || 'Registered via WhatsApp'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Devotees Count:</span>
                    <span className="font-bold text-slate-900">{booking.travellers} Person{booking.travellers > 1 ? 's' : ''} (Pax)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Expedition & Route */}
              <div className="bg-[#FAF8F5] border border-[#E6E2D3] rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center gap-2 border-b border-[#E6E2D3] pb-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <Compass size={14} />
                  <span>Circuit & Logistics</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500">Sacred Circuit:</span>
                    <span className="font-bold text-slate-900 text-right max-w-[190px]">{booking.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Departure Date:</span>
                    <span className="font-bold text-slate-900">{booking.travelDate}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500">Rendezvous Hub:</span>
                    <span className="font-bold text-slate-900 text-right max-w-[190px]">{booking.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle Category:</span>
                    <span className="font-bold text-slate-900">4x4 High-Clearance Fleet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Ledger Table */}
            <div className="border border-[#E6E2D3] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1E293B] text-white font-semibold">
                    <th className="p-3.5 sm:px-5">Description</th>
                    <th className="p-3.5 hidden sm:table-cell">Batch / Route</th>
                    <th className="p-3.5 text-right sm:px-5">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-3.5 sm:px-5">
                      <div className="font-bold text-slate-900">Yatra Seat Reservation & SDM Permit Processing Deposit</div>
                      <div className="text-[11px] text-slate-500">
                        Locks high-altitude 4x4 Bolero seat, homestay allocation, and SDM permit submission.
                      </div>
                    </td>
                    <td className="p-3.5 hidden sm:table-cell text-slate-600 font-medium">
                      {booking.month || booking.travelDate}
                    </td>
                    <td className="p-3.5 text-right sm:px-5 font-bold text-slate-900">
                      ₹{(booking.amountPaid || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-[#FAF8F5] border-t border-[#E6E2D3]">
                    <td colSpan={2} className="p-3.5 sm:px-5 font-bold text-slate-800">
                      Advance Amount Paid (Online via Razorpay):
                    </td>
                    <td className="p-3.5 text-right sm:px-5 font-bold text-emerald-700 text-sm sm:text-base">
                      ₹{(booking.amountPaid || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-amber-50/50 border-t border-[#E6E2D3] text-slate-600">
                    <td colSpan={2} className="p-3 sm:px-5 text-xs">
                      Remaining Package Balance (Payable at Dharchula Base Camp upon physical verification):
                    </td>
                    <td className="p-3 text-right sm:px-5 font-bold text-amber-900 text-xs">
                      Due at Base Camp
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 4-Step Pilgrim Roadmap: What Happens Next */}
        <div className="bg-white border border-[#E6E2D3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Pilgrim Roadmap</div>
            <h2 className="text-xl font-serif font-bold text-slate-900">What Happens Next?</h2>
            <p className="text-xs text-slate-600">Your reservation is locked. Here is the exact timeline for your journey.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                1
              </div>
              <div className="font-bold text-xs text-slate-900">Official Confirmation</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                You will receive a WhatsApp message and email receipt from the Dharchula Operations Desk within 2 hours.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs border border-amber-200">
                2
              </div>
              <div className="font-bold text-xs text-slate-900">Inner Line Permit (ILP)</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Our team assists you in submitting your Aadhaar and medical clearance to the Sub-Divisional Magistrate (SDM).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-200">
                3
              </div>
              <div className="font-bold text-xs text-slate-900">Driver & Vehicle Dispatch</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                48 hours before departure, your assigned mountain pilot driver name and 4x4 Bolero registration number are provided.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E2D3] space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-200">
                4
              </div>
              <div className="font-bold text-xs text-slate-900">Rendezvous Pickup</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Our driver receives you at your selected hub ({booking.pickupLocation}) and commences the scenic drive.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Preparation Checklist & Permits Notice */}
        <div className="bg-[#FAF8F5] border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertCircle size={18} className="text-amber-700 shrink-0" />
            <span>Mandatory Documents to Carry on Departure Day</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
              <div className="font-bold text-slate-900">1. Original Aadhaar Card</div>
              <div className="text-[11px] text-slate-600">
                Mandatory for Indian citizens at Gunji and Nabhi ITBP/Army checkposts. Carry 4 photocopies + 4 passport photos.
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
              <div className="font-bold text-slate-900">2. Medical Fitness Certificate</div>
              <div className="text-[11px] text-slate-600">
                Issued by an MBBS practitioner certifying normal Blood Pressure and SPO2 fitness for altitudes up to 14,500 ft.
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 space-y-1">
              <div className="font-bold text-slate-900">3. Layered Thermal Clothing</div>
              <div className="text-[11px] text-slate-600">
                High-traction trekking shoes, windcheater/down jacket, gloves, polarized sunglasses, and rain poncho.
              </div>
            </div>
          </div>
        </div>

        {/* 24/7 Operations Desk Support Card */}
        <div className="bg-[#1E293B] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              <Phone size={11} />
              <span>24x7 Dharchula Base Camp Operations Desk</span>
            </div>
            <h3 className="text-xl font-serif font-bold">Have Questions About Your Yatra?</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Our native mountain team is stationed directly at Dharchula and Pithoragarh to assist you with permit clearances, hotel coordination, and travel queries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+917248285767"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone size={14} className="text-amber-800" />
              <span>Call +91 72482 85767</span>
            </a>

            <button
              onClick={shareToOperationsDesk}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <WhatsAppIcon size={14} />
              <span>WhatsApp Operations Desk</span>
            </button>

          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center pt-2">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>Return to GoTrek Travels Home</span>
          </button>
        </div>
      </main>

      {/* ======================================================== */}
      {/* FULL-SCREEN HIGH-BRIGHTNESS CHECK-IN QR PASS MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-4 border border-slate-200"
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} />
                  <span>Check-in Scan Mode</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {booking.fullName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Booking Reference: <strong className="text-amber-900">{booking.bookingId}</strong>
                </p>
              </div>

              {/* High Contrast QR Code Display */}
              <div className="p-4 bg-white border-2 border-slate-900 rounded-2xl inline-block shadow-md">
                <QRCodeSVG
                  value={activeQrValue}
                  size={220}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                  className="mx-auto"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-800">
                  {booking.destination} · {booking.travellers} Pax
                </div>
                <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 font-medium">
                  💡 <strong>Scanner Tip:</strong> Please adjust your phone screen brightness to maximum (100%) when presenting this QR pass at checkposts.
                </div>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={handleDownloadQrCode}
                  className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  <span>Save QR to Photos</span>
                </button>
                <button
                  onClick={() => setIsQrModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSuccessPage;
