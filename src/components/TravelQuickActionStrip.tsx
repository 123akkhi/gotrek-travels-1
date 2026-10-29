import React from 'react';
import { Phone, MessageSquare, CreditCard, Sparkles, Download, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TravelQuickActionStripProps {
  title?: string;
  price?: string | number;
  priceLabel?: string;
  onBook?: () => void;
  onInquiry?: () => void;
  onDownloadPdf?: () => void;
  whatsappMessage?: string;
  badge?: string;
  className?: string;
}

export const TravelQuickActionStrip: React.FC<TravelQuickActionStripProps> = ({
  title = 'Adi Kailash & Om Parvat Yatra 2027',
  price,
  priceLabel = 'Per Person',
  onBook,
  onInquiry,
  onDownloadPdf,
  whatsappMessage = 'Namaste! I would like to inquire about Adi Kailash & Om Parvat Yatra 2027 packages and permits.',
  badge = '2027 Bookings Open',
  className = '',
}) => {
  const WHATSAPP_NUMBER = '917248285767';

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div className={`w-full bg-white/95 backdrop-blur-md border border-[#E6E0D2] rounded-3xl p-4 sm:p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${className}`}>
      {/* Left: Info & Pricing */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
            <span className="font-serif">ॐ</span>
            <span>{badge}</span>
          </span>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck size={12} />
            <span>100% SDM Permit Guaranteed</span>
          </span>
        </div>

        <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-snug">
          {title}
        </h3>

        {price && (
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-amber-900">
              {typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price}
            </span>
            <span className="text-xs text-slate-500 font-medium">({priceLabel})</span>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        {onDownloadPdf && (
          <button
            onClick={onDownloadPdf}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download Day-Wise PDF Itinerary"
          >
            <Download size={14} className="text-amber-700" />
            <span className="hidden sm:inline">PDF Plan</span>
          </button>
        )}

        <button
          onClick={handleWhatsApp}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp Expert</span>
        </button>

        <a
          href="tel:+917248285767"
          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          title="Call 24/7 Helpline"
        >
          <Phone size={13} className="text-amber-400" />
          <span className="hidden sm:inline">Call Help</span>
        </a>

        {onBook && (
          <button
            onClick={onBook}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>Book Seat</span>
            <ArrowRight size={13} />
          </button>
        )}

        {onInquiry && !onBook && (
          <button
            onClick={onInquiry}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>Instant Inquiry</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
