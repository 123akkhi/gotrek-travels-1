import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Printer,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Navigation,
  Building2,
  Users,
  Check,
  AlertCircle,
  Edit3,
  Download,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { GmailIcon } from './GmailIcon';
import { YATRA_DESTINATIONS, PICKUP_LOCATIONS } from '../data/mockData';
import { BookingReceiptData, downloadPdfReceipt } from '../utils/receiptGenerator';

export type BookingStep = 'personal' | 'destination' | 'payment';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationTitle: string;
  defaultAmount?: number;
  onSuccessBooking?: (bookingId: string) => void;
  onViewSuccessPage?: (booking: BookingReceiptData) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof (window as any).Razorpay !== 'undefined') {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

export const RazorpayCheckoutModal: React.FC<RazorpayCheckoutModalProps> = ({
  isOpen,
  onClose,
  destinationTitle,
  defaultAmount = 5000,
  onSuccessBooking,
  onViewSuccessPage,
}) => {
  // Booking Stepper State
  const [currentStep, setCurrentStep] = useState<BookingStep>('personal');
  const [stepError, setStepError] = useState<string | null>(null);

  // Form State
  const [selectedDestination, setSelectedDestination] = useState(
    destinationTitle || "Adi Kailash & Om Parvat (Dharchula Base)"
  );
  const [pickupLocation, setPickupLocation] = useState(
    "Kathgodam / Haldwani (Railway Station Hub)"
  );
  const [customPickupCity, setCustomPickupCity] = useState("");
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travellers, setTravellers] = useState(1);
  const [travelDate, setTravelDate] = useState('2027-05-10');
  const [customAmount, setCustomAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Pre-load script when modal is displayed
  useEffect(() => {
    if (isOpen) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  // Pre-fill from local pilgrim user session if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gotrek_pilgrim_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name && !fullName) setFullName(parsed.name);
        if (parsed.phone && !phone) setPhone(parsed.phone);
        if (parsed.email && !email) setEmail(parsed.email);
      }
    } catch {}
  }, []);

  // Sync destination if prop updates
  useEffect(() => {
    if (destinationTitle) {
      setSelectedDestination(destinationTitle);
    }
  }, [destinationTitle]);

  if (!isOpen) return null;

  const resolvedPickup =
    pickupLocation === "other" && customPickupCity.trim()
      ? `Custom: ${customPickupCity.trim()}`
      : pickupLocation;

  // Real-time completion evaluations
  const isPersonalComplete =
    fullName.trim().length >= 2 && phone.trim().replace(/\D/g, '').length >= 10;
  const isDestinationComplete =
    Boolean(selectedDestination) &&
    (pickupLocation !== "other" || customPickupCity.trim().length > 0) &&
    Boolean(travelDate);
  const isPaymentComplete = customAmount > 0 && Boolean(paymentMethod);

  // Calculate step progress percentage
  const stepNumber =
    currentStep === 'personal' ? 1 : currentStep === 'destination' ? 2 : 3;
  const progressPercent =
    currentStep === 'personal' ? 33 : currentStep === 'destination' ? 66 : 100;

  // Format date for readable label and payload
  const formattedTravelDate = (() => {
    try {
      const d = new Date(travelDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch {}
    return travelDate || 'May 2027';
  })();

  // Step transition handlers with validation
  const handleProceedToDestination = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setStepError('Please enter your Full Name before proceeding.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanPhone.length < 10) {
      setStepError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }
    setStepError(null);
    setCurrentStep('destination');
  };

  const handleProceedToPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pickupLocation === 'other' && !customPickupCity.trim()) {
      setStepError('Please specify your custom pickup city / location.');
      return;
    }
    setStepError(null);
    setCurrentStep('payment');
  };

  const handleStepClick = (target: BookingStep) => {
    if (target === 'destination' || target === 'payment') {
      if (!isPersonalComplete) {
        setStepError('Please complete your name and WhatsApp contact number first.');
        setCurrentStep('personal');
        return;
      }
    }
    if (target === 'payment') {
      if (pickupLocation === 'other' && !customPickupCity.trim()) {
        setStepError('Please specify your custom pickup city.');
        setCurrentStep('destination');
        return;
      }
    }
    setStepError(null);
    setCurrentStep(target);
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setStepError('Please fill in your Full Name and WhatsApp phone number.');
      setCurrentStep('personal');
      return;
    }

    setLoading(true);
    setStepError(null);

    try {
      // 1. Request Order Creation from Backend API
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: customAmount,
          currency: 'INR',
          packageName: selectedDestination,
          fullName,
          phone,
          email,
          pickupLocation: resolvedPickup,
          travellers,
          month: `${formattedTravelDate} (${travelDate})`,
          travelDate,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment');
      }

      // Check if real Razorpay script is available in window
      if (typeof (window as any).Razorpay !== 'undefined' && orderData.isLiveKey) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'GoTrek Travels Pithoragarh',
          description: `Yatra Deposit: ${selectedDestination}`,
          order_id: orderData.orderId,
          handler: async (response: any) => {
            await verifyPaymentOnServer(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: fullName,
            email: email,
            contact: phone,
          },
          theme: {
            color: '#5A5A40',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setLoading(false);
      } else {
        // Simulated Interactive Razorpay Sandbox Mode (works smoothly in preview)
        setTimeout(async () => {
          const demoPayId = `pay_rzp_${Date.now()}_${Math.floor(
            Math.random() * 8999 + 1000
          )}`;
          await verifyPaymentOnServer(
            orderData.orderId,
            demoPayId,
            'simulated_sig_ok'
          );
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      setStepError(err?.message || 'Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  const verifyPaymentOnServer = async (
    orderId: string,
    paymentId: string,
    signature: string
  ) => {
    try {
      const verifyRes = await fetch('/api/payment/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
          fullName,
          phone,
          email,
          destination: selectedDestination,
          pickupLocation: resolvedPickup,
          travellers,
          month: `${formattedTravelDate} (${travelDate})`,
          travelDate,
          amountPaid: customAmount,
          notes: `Paid via Razorpay (${paymentMethod.toUpperCase()}) online gateway for departure date ${formattedTravelDate}. Pickup: ${resolvedPickup}`,
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        const confirmedBookingData: BookingReceiptData = {
          bookingId: verifyData.bookingId,
          paymentId: verifyData.paymentId,
          orderId: orderId,
          fullName,
          phone,
          email,
          destination: selectedDestination,
          pickupLocation: resolvedPickup,
          travelDate: formattedTravelDate,
          month: `${formattedTravelDate} (${travelDate})`,
          travellers,
          amountPaid: customAmount,
          paymentStatus: 'CONFIRMED',
          paymentMethod: `Razorpay (${paymentMethod.toUpperCase()})`,
          date: new Date().toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        try {
          localStorage.setItem('gotrek_latest_booking', JSON.stringify(confirmedBookingData));
        } catch {}

        setPaymentSuccess({
          bookingId: verifyData.bookingId,
          paymentId: verifyData.paymentId,
          amount: customAmount,
          lead: verifyData.lead,
          notifications: verifyData.notifications,
          fullBooking: confirmedBookingData,
        });

        if (onSuccessBooking) {
          onSuccessBooking(verifyData.bookingId);
        }
      } else {
        setStepError('Payment verification failed: ' + verifyData.error);
      }
    } catch (err: any) {
      setStepError('Error verifying payment: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl my-auto bg-white border border-[#E6E2D3] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] crisp-dialog"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-b border-[#E6E2D3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#5A5A40] text-white shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-amber-800">
                <Lock size={10} />
                <span>256-Bit Razorpay Secure SSL</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">
                Online Yatra Seat Reservation
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#E6E2D3] text-[#1E293B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* REAL-TIME PROGRESS INDICATOR (Highlighting active step & conversion progress) */}
        {!paymentSuccess && (
          <div className="bg-[#FAF8F5] border-b border-[#E6E2D3] px-4 py-3 sm:px-6 shrink-0">
            {/* Real-time Status Badge & Step Title */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#1E293B] text-white text-[10px] font-bold tracking-wider">
                  Step {stepNumber} of 3
                </span>
                <span className="text-xs font-bold text-[#1E293B]">
                  {currentStep === 'personal' && 'Personal Details'}
                  {currentStep === 'destination' && 'Destination & Route'}
                  {currentStep === 'payment' && 'Secure Payment'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                    progressPercent === 100
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {progressPercent}% Completed
                </span>
              </div>
            </div>

            {/* Real-time Animated Progress Bar */}
            <div className="relative w-full h-2 bg-slate-200/80 rounded-full overflow-hidden mb-2.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-600 rounded-full"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Interactive Step Nodes / Breadcrumbs */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {/* Step 1: Personal Details */}
              <button
                type="button"
                onClick={() => handleStepClick('personal')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'personal'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : isPersonalComplete
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'personal'
                      ? 'bg-white/20 text-white'
                      : isPersonalComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isPersonalComplete && currentStep !== 'personal' ? (
                    <Check size={12} />
                  ) : (
                    <User size={12} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    1. Personal
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'personal' ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {fullName ? fullName.split(' ')[0] : 'Name & Phone'}
                  </div>
                </div>
              </button>

              {/* Step 2: Destination */}
              <button
                type="button"
                onClick={() => handleStepClick('destination')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'destination'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : isDestinationComplete
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'destination'
                      ? 'bg-white/20 text-white'
                      : isDestinationComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDestinationComplete && currentStep !== 'destination' ? (
                    <Check size={12} />
                  ) : (
                    <MapPin size={12} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    2. Destination
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'destination'
                        ? 'text-amber-100'
                        : 'text-slate-500'
                    }`}
                  >
                    {formattedTravelDate}
                  </div>
                </div>
              </button>

              {/* Step 3: Payment */}
              <button
                type="button"
                onClick={() => handleStepClick('payment')}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                  currentStep === 'payment'
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                    : isPaymentComplete
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    currentStep === 'payment'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <CreditCard size={12} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    3. Payment
                  </div>
                  <div
                    className={`text-[9px] truncate hidden sm:block ${
                      currentStep === 'payment' ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    ₹{(customAmount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto space-y-4 bg-[#FDFBF7] smooth-scroll-y">
          {paymentSuccess ? (
            /* Successful Payment Confirmation View */
            <div className="py-4 text-center space-y-4 animate-in fade-in duration-300">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shadow-xs">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider">
                  ✓ All 3 Steps Completed · Payment Confirmed
                </span>
                <h4 className="text-2xl font-bold text-[#1E293B] pt-1">
                  Jai Baba Adi Kailash!
                </h4>
                <p className="text-xs text-[#5A5A40] italic">
                  Your Yatra seat reservation deposit has been received & verified by GoTrek Operations Pithoragarh.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 rounded-xl bg-white border border-[#E6E2D3] text-left text-xs space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#E6E2D3] pb-2 font-bold text-[#1E293B]">
                  <span>Booking ID:</span>
                  <span className="text-amber-800 font-mono">
                    {paymentSuccess.bookingId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Razorpay Txn ID:</span>
                  <span className="font-mono text-[#1E293B] font-bold">
                    {paymentSuccess.paymentId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Pilgrim Name:</span>
                  <span className="font-bold text-[#1E293B]">{fullName}</span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>WhatsApp Mobile:</span>
                  <span className="font-bold text-[#1E293B]">{phone}</span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Selected Yatra:</span>
                  <span className="font-bold text-[#1E293B] text-right truncate max-w-[200px]">
                    {selectedDestination}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Pick-up Rendezvous:</span>
                  <span className="font-bold text-[#1E293B]">{resolvedPickup}</span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Departure Date:</span>
                  <span className="font-bold text-[#1E293B]">
                    {formattedTravelDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5A5A40]">
                  <span>Travellers:</span>
                  <span className="font-bold text-[#1E293B]">{travellers} Pax</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E6E2D3] pt-2 text-sm font-bold text-[#1E293B]">
                  <span>Advance Deposit Paid:</span>
                  <span className="text-emerald-700">
                    ₹{(paymentSuccess.amount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const dataToDownload: BookingReceiptData = paymentSuccess.fullBooking || {
                      bookingId: paymentSuccess.bookingId,
                      paymentId: paymentSuccess.paymentId,
                      fullName,
                      phone,
                      email,
                      destination: selectedDestination,
                      pickupLocation: resolvedPickup,
                      travelDate: formattedTravelDate,
                      month: `${formattedTravelDate} (${travelDate})`,
                      travellers,
                      amountPaid: paymentSuccess.amount || customAmount,
                      paymentStatus: 'CONFIRMED',
                    };
                    downloadPdfReceipt(dataToDownload);
                  }}
                  className="px-4 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF Receipt</span>
                </button>

                {onViewSuccessPage && (
                  <button
                    type="button"
                    onClick={() => {
                      const dataToPass: BookingReceiptData = paymentSuccess.fullBooking || {
                        bookingId: paymentSuccess.bookingId,
                        paymentId: paymentSuccess.paymentId,
                        fullName,
                        phone,
                        email,
                        destination: selectedDestination,
                        pickupLocation: resolvedPickup,
                        travelDate: formattedTravelDate,
                        month: `${formattedTravelDate} (${travelDate})`,
                        travellers,
                        amountPaid: paymentSuccess.amount || customAmount,
                        paymentStatus: 'CONFIRMED',
                      };
                      onViewSuccessPage(dataToPass);
                    }}
                    className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <ArrowRight size={14} />
                    <span>View Full Confirmation Page</span>
                  </button>
                )}

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=mailgotrek@gmail.com&su=Yatra%20Seat%20Reservation%20Confirmed%20-%20${encodeURIComponent(
                    paymentSuccess.bookingId
                  )}&body=Hello%20GoTrek%20Operations,%0A%0AMy%20booking%20deposit%20is%20completed.%0A%0ABooking%20ID:%20${encodeURIComponent(
                    paymentSuccess.bookingId
                  )}%0APilgrim%20Name:%20${encodeURIComponent(
                    fullName
                  )}%0APhone:%20${encodeURIComponent(
                    phone
                  )}%0APackage:%20${encodeURIComponent(
                    selectedDestination
                  )}%0APickup:%20${encodeURIComponent(
                    resolvedPickup
                  )}%0APaid:%20INR%20${encodeURIComponent(
                    paymentSuccess.amount
                  )}%0A%0APlease%20issue%20the%20official%20Inner%20Line%20Permit%20voucher.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-white border border-[#E6E2D3] text-slate-800 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-all shadow-2xs"
                >
                  <GmailIcon size={15} />
                  <span>Send to Email</span>
                </a>

                <button
                  onClick={() => {
                    const cleanDevoteeDigits = (phone || '').replace(/\D/g, '');
                    const targetWhatsAppPhone =
                      cleanDevoteeDigits.length === 10
                        ? `91${cleanDevoteeDigits}`
                        : cleanDevoteeDigits.length === 12 && cleanDevoteeDigits.startsWith('91')
                        ? cleanDevoteeDigits
                        : cleanDevoteeDigits || '917248285767';

                    const travelBatchLabel = formattedTravelDate || travelDate || 'May 2027';
                    const devoteeMsg = `🕉️ *GoTrek Travels — Yatra Seat Reservation Confirmed*\n\nJai Baba Adi Kailash! 🙏\nDear *${fullName}*,\nYour advance deposit of *₹${(paymentSuccess.amount || 0).toLocaleString('en-IN')}* has been received & verified.\n\n📋 *Booking ID:* ${paymentSuccess.bookingId}\n💳 *Payment Txn ID:* ${paymentSuccess.paymentId}\n🏔️ *Circuit:* ${selectedDestination}\n👥 *Yatris:* ${travellers} Pax\n📅 *Departure Batch:* ${travelBatchLabel}\n📍 *Pickup:* ${resolvedPickup}\n✅ *Status:* SEAT CONFIRMED\n\n🎟️ *View Digital Check-in Pass:*\n${window.location.origin}/payment-success?bookingId=${encodeURIComponent(paymentSuccess.bookingId)}&paymentId=${encodeURIComponent(paymentSuccess.paymentId)}\n\n📞 24x7 Base Camp Helpline: +91 72482 85767`;

                    // Call backend automated trigger
                    fetch('/api/whatsapp/trigger-devotee-message', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        bookingId: paymentSuccess.bookingId,
                        phone: targetWhatsAppPhone,
                        fullName,
                        destination: selectedDestination,
                        travelDate: travelBatchLabel,
                        amountPaid: paymentSuccess.amount,
                        paymentId: paymentSuccess.paymentId,
                      }),
                    }).catch(() => {});

                    window.open(
                      `https://api.whatsapp.com/send?phone=${targetWhatsAppPhone}&text=${encodeURIComponent(devoteeMsg)}`,
                      '_blank'
                    );
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Trigger confirmation directly to devotee's WhatsApp"
                >
                  <WhatsAppIcon size={14} />
                  <span>Send to Devotee's WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    const msg = `*Yatra Seat Deposit Payment Receipt — GoTrek Travels*%0A%0A*Booking ID:* ${paymentSuccess.bookingId}%0A*Razorpay Txn ID:* ${paymentSuccess.paymentId}%0A*Pilgrim Name:* ${encodeURIComponent(
                      fullName
                    )}%0A*Phone:* ${encodeURIComponent(
                      phone
                    )}%0A*Package:* ${encodeURIComponent(
                      selectedDestination
                    )}%0A*Pick-up Location:* ${encodeURIComponent(
                      resolvedPickup
                    )}%0A*Advance Deposit Paid:* ₹${(
                      paymentSuccess.amount || 0
                    ).toLocaleString(
                      'en-IN'
                    )}%0A%0A_My payment deposit is confirmed! Please acknowledge and send ILP permit instructions._`;
                    window.open(
                      `https://wa.me/917248285767?text=${msg}`,
                      '_blank'
                    );
                  }}
                  className="px-3.5 py-2.5 rounded-full bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  title="Forward copy to GoTrek base station"
                >
                  <WhatsAppIcon size={14} />
                  <span>Copy to Base Camp</span>
                </button>


                <button
                  onClick={handlePrintPass}
                  className="px-4 py-2.5 rounded-full bg-white border border-[#E6E2D3] text-[#1E293B] font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition-all shadow-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Booking Form */
            <form onSubmit={handlePayNow} className="space-y-4 text-xs">
              {/* Validation Error Banner */}
              {stepError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2 animate-in fade-in">
                  <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">{stepError}</div>
                  <button
                    type="button"
                    onClick={() => setStepError(null)}
                    className="text-rose-600 hover:text-rose-900 text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* STEP 1: PERSONAL DETAILS */}
              {currentStep === 'personal' && (
                <motion.div
                  key="step-personal"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5">
                    <User size={16} className="text-amber-800 shrink-0" />
                    <p className="text-[11px] text-amber-900 leading-snug">
                      Please enter your contact details. These are used directly to generate your mandatory Uttarakhand Inner Line Permit (ILP).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-amber-800" />
                          <span>Full Name (Yatri) *</span>
                        </span>
                        {fullName.trim().length >= 2 && (
                          <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                            <Check size={11} /> Verified
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Phone size={13} className="text-amber-800" />
                          <span>WhatsApp Mobile *</span>
                        </span>
                        {phone.trim().replace(/\D/g, '').length >= 10 && (
                          <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                            <Check size={11} /> 10-Digit
                          </span>
                        )}
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-[11px] font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (stepError) setStepError(null);
                          }}
                          placeholder="9876543210"
                          className="w-full bg-white border border-[#E6E2D3] rounded-xl pl-11 pr-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all font-mono shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Mail size={13} className="text-amber-800" />
                          <span>Email Address (Optional)</span>
                        </span>
                        <span className="text-[10px] text-slate-400">For Voucher</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@gmail.com"
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#1E293B] flex items-center gap-1">
                        <Users size={13} className="text-amber-800" />
                        <span>Total Travelers</span>
                      </label>
                      <select
                        value={travellers}
                        onChange={(e) => setTravellers(Number(e.target.value))}
                        className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[#1E293B] font-semibold text-[16px] sm:text-xs focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                      >
                        <option value={1}>1 Person (Solo Yatri)</option>
                        <option value={2}>2 Persons (Couple / Pair)</option>
                        <option value={4}>4 Persons (Family Group)</option>
                        <option value={6}>6 Persons (Full Dedicated Bolero/Scorpio)</option>
                        <option value={8}>8+ Persons (VIP Group Batch)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 1 Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleProceedToDestination}
                      className="w-full min-h-[44px] py-3.5 rounded-xl bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Continue to Destination & Dates</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DESTINATION & DATES */}
              {currentStep === 'destination' && (
                <motion.div
                  key="step-destination"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  {/* Destination Selector */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1E293B] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-amber-800" />
                        <span>Sacred Yatra Destination Circuit *</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px]">
                        2027 Season Batches
                      </span>
                    </label>
                    <select
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] font-medium focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                    >
                      <optgroup label="Adi Kailash & Om Parvat Circuits">
                        {YATRA_DESTINATIONS.filter(
                          (d) =>
                            d.category.includes("Adi Kailash") ||
                            d.category.includes("Sacred")
                        ).map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Garhwal & Alpine Shrines">
                        {YATRA_DESTINATIONS.filter(
                          (d) =>
                            d.category.includes("Garhwal") ||
                            d.category.includes("Nature")
                        ).map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Himachal Pradesh Expeditions">
                        {YATRA_DESTINATIONS.filter((d) =>
                          d.category.includes("Himachal")
                        ).map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Temple Circuits & VIP Expeditions">
                        {YATRA_DESTINATIONS.filter(
                          (d) =>
                            d.category.includes("Temple") ||
                            d.category.includes("VIP")
                        ).map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Pick-up Location Selector */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1E293B] flex items-center gap-1">
                      <Navigation size={13} className="text-amber-800" />
                      <span>Pick-up Location (Major City / Station) *</span>
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] font-medium focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                    >
                      <optgroup label="Uttarakhand Gateway Hubs">
                        {PICKUP_LOCATIONS.filter(
                          (p) => p.state === "Uttarakhand"
                        ).map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Metro & Capital Cities">
                        {PICKUP_LOCATIONS.filter(
                          (p) => p.state !== "Uttarakhand" && p.id !== "other"
                        ).map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Locations">
                        <option value="other">Other City (Specify Below)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Custom pickup if other selected */}
                  {pickupLocation === "other" && (
                    <div className="space-y-1 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 shadow-2xs">
                      <label className="text-[10px] font-bold text-slate-800 flex items-center gap-1">
                        <Building2 size={11} className="text-amber-800" />
                        <span>Enter Your Pick-up City / Location</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customPickupCity}
                        onChange={(e) => setCustomPickupCity(e.target.value)}
                        placeholder="e.g. Surat, Varanasi, Bhopal, Nagpur..."
                        className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-[16px] sm:text-xs text-slate-900 bg-white outline-none focus:border-amber-800"
                      />
                    </div>
                  )}

                  {/* Travel Date */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1E293B] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-amber-800" />
                        <span>Preferred Batch Departure Date *</span>
                      </span>
                      <span className="text-[10px] text-amber-800 font-bold">
                        {formattedTravelDate}
                      </span>
                    </label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      min="2027-05-01"
                      max="2027-11-30"
                      className="w-full bg-white border border-[#E6E2D3] rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-[#1E293B] font-semibold focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20 outline-none transition-all cursor-pointer shadow-2xs"
                    />

                    {/* Quick batch chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        { label: "10 May (Opening)", date: "2027-05-10" },
                        { label: "25 May", date: "2027-05-25" },
                        { label: "10 Jun", date: "2027-06-10" },
                        { label: "15 Sep (Autumn)", date: "2027-09-15" },
                        { label: "05 Oct (Diwali)", date: "2027-10-05" },
                      ].map((chip) => (
                        <button
                          key={chip.date}
                          type="button"
                          onClick={() => setTravelDate(chip.date)}
                          className={`text-[10px] min-h-[30px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                            travelDate === chip.date
                              ? 'bg-amber-800 text-white border-amber-800 font-bold shadow-2xs'
                              : 'bg-white border-[#E6E2D3] text-slate-600 hover:bg-amber-50'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2 Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('personal')}
                      className="min-h-[44px] px-4 py-3.5 rounded-xl bg-white border border-[#E6E2D3] hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="min-h-[44px] flex-1 py-3.5 rounded-xl bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Proceed to Payment & Review</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT & CONFIRMATION */}
              {currentStep === 'payment' && (
                <motion.div
                  key="step-payment"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Summary Review Card for High Conversion Clarity */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-amber-200/80 pb-1.5">
                      <span className="font-bold text-[#1E293B] flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                        <span>Booking Details Review</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep('personal')}
                        className="text-[10px] font-bold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 size={11} />
                        <span>Edit Details</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Pilgrim Yatri
                        </span>
                        <span className="font-bold text-slate-900">{fullName}</span>
                        <span className="block text-[10px] text-slate-600">
                          {phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Travel Date & Pax
                        </span>
                        <span className="font-bold text-slate-900">
                          {formattedTravelDate}
                        </span>
                        <span className="block text-[10px] text-slate-600">
                          {travellers} Traveler{travellers > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-amber-200/60">
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
                          Circuit & Pickup
                        </span>
                        <span className="font-bold text-slate-900 block truncate">
                          {selectedDestination}
                        </span>
                        <span className="text-[10px] text-slate-600 block truncate">
                          Pickup: {resolvedPickup}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Amount Picker */}
                  <div className="space-y-2">
                    <label className="font-bold text-[#1E293B] flex items-center justify-between">
                      <span>Select Advance Deposit Amount</span>
                      <span className="text-[10px] text-[#5A5A40]">
                        Remaining balance paid at Dharchula base
                      </span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomAmount(5000)}
                        className={`min-h-[44px] py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          customAmount === 5000
                            ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                            : 'bg-white border-[#E6E2D3] text-[#1E293B] hover:bg-slate-50'
                        }`}
                      >
                        <div>₹5,000</div>
                        <div className="text-[9px] font-normal opacity-90">
                          Seat Lock (Recommended)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomAmount(10000)}
                        className={`min-h-[44px] py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          customAmount === 10000
                            ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                            : 'bg-white border-[#E6E2D3] text-[#1E293B] hover:bg-slate-50'
                        }`}
                      >
                        <div>₹10,000</div>
                        <div className="text-[9px] font-normal opacity-90">
                          Token Deposit
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomAmount(28000)}
                        className={`min-h-[44px] py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          customAmount === 28000
                            ? 'bg-amber-800 text-white border-amber-800 shadow-xs ring-2 ring-amber-800/20'
                            : 'bg-white border-[#E6E2D3] text-[#1E293B] hover:bg-slate-50'
                        }`}
                      >
                        <div>₹28,000</div>
                        <div className="text-[9px] font-normal opacity-90">
                          Full 1 Pax
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#1E293B]">
                      Select Payment Gateway Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`min-h-[44px] py-2 px-1 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs font-extrabold'
                            : 'bg-white border-[#E6E2D3] text-[#5A5A40] hover:bg-slate-50'
                        }`}
                      >
                        <Sparkles size={12} />
                        <span>UPI (GPay/PhonePe)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`min-h-[44px] py-2 px-1 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs font-extrabold'
                            : 'bg-white border-[#E6E2D3] text-[#5A5A40] hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard size={12} />
                        <span>Debit / Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`min-h-[44px] py-2 px-1 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'netbanking'
                            ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs font-extrabold'
                            : 'bg-white border-[#E6E2D3] text-[#5A5A40] hover:bg-slate-50'
                        }`}
                      >
                        <Lock size={12} />
                        <span>NetBanking</span>
                      </button>
                    </div>
                  </div>

                  {/* Submit Pay Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[48px] py-3.5 rounded-xl bg-[#1E293B] hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-amber-400" />
                          <span>Connecting Razorpay Gateway...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} className="text-amber-300" />
                          <span>
                            Pay ₹{(customAmount || 0).toLocaleString('en-IN')} via Razorpay Online
                          </span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        if (!fullName || !phone) {
                          setStepError('Please enter your Full Name and WhatsApp phone number.');
                          setCurrentStep('personal');
                          return;
                        }

                        try {
                          await fetch('/api/leads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              fullName,
                              phone,
                              email,
                              destination: selectedDestination,
                              pickupLocation: resolvedPickup,
                              travellers,
                              month: `${formattedTravelDate} (${travelDate})`,
                              travelDate,
                              notes: `WhatsApp Payment Request for ₹${customAmount} advance deposit for departure date ${formattedTravelDate}. Pickup: ${resolvedPickup}`,
                            }),
                          });
                          window.dispatchEvent(
                            new CustomEvent("gotrek:lead-created", {
                              detail: {
                                fullName,
                                phone,
                                destination: selectedDestination,
                                pickupLocation: resolvedPickup,
                              },
                            })
                          );
                        } catch (e) {
                          console.error('Failed logging payment lead', e);
                        }

                        const msg = `*Yatra Booking Consultation — GoTrek Travels 2027*%0A%0A*Pilgrim Name:* ${encodeURIComponent(
                          fullName
                        )}%0A*WhatsApp Mobile:* ${encodeURIComponent(
                          phone
                        )}%0A*Email:* ${encodeURIComponent(
                          email || 'N/A'
                        )}%0A*Yatra Package:* ${encodeURIComponent(
                          selectedDestination
                        )}%0A*Pick-up Location:* ${encodeURIComponent(
                          resolvedPickup
                        )}%0A*Travellers:* ${travellers} Pax%0A*Preferred Travel Date:* ${encodeURIComponent(
                          formattedTravelDate
                        )} (${encodeURIComponent(
                          travelDate
                        )})%0A*Estimated Advance:* ₹${(
                          customAmount || 0
                        ).toLocaleString(
                          'en-IN'
                        )}%0A%0A_Hello GoTrek Team, I would like to consult with your team regarding my booking details, inner line permits, batch availability, pickup at ${encodeURIComponent(
                          resolvedPickup
                        )}, and payment details._`;
                        window.open(
                          `https://wa.me/917248285767?text=${msg}`,
                          '_blank'
                        );
                      }}
                      className="w-full min-h-[48px] py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Consult with Team on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep('destination')}
                      className="w-full min-h-[40px] py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Back to Destination & Dates</span>
                    </button>
                  </div>

                  <div className="text-center text-[10px] text-[#5A5A40] pt-1">
                    🔒 100% Refundable in case of government border closure or adverse weather cancellations.
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RazorpayCheckoutModal;
