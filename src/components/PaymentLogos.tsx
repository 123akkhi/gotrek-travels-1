import React from "react";

export const UpiLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="120" height="40" rx="6" fill="#097939" fillOpacity="0.12" />
    {/* UPI Arrows Icon */}
    <path d="M22 10L32 20L22 30H14L24 20L14 10H22Z" fill="#008000" />
    <path d="M28 10L38 20L28 30H32L42 20L32 10H28Z" fill="#F47B20" />
    {/* UPI Text */}
    <text x="50" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#008000" letterSpacing="0.5">
      UPI
    </text>
  </svg>
);

export const GooglePayLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="40" rx="6" fill="#FFFFFF" />
    {/* G Logo */}
    <path d="M22 20.2c0-.6-.05-1.2-.15-1.7H13v3.3h5.1c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-6.9z" fill="#4285F4" />
    <path d="M13 29.5c2.6 0 4.7-.8 6.3-2.4l-3.1-2.4c-.9.6-2 1-3.2 1-2.5 0-4.6-1.7-5.3-4H4.5v2.5C6.1 27.4 9.3 29.5 13 29.5z" fill="#34A853" />
    <path d="M7.7 22.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1v-2.5H4.5C3.8 16.8 3.5 18.4 3.5 20s.3 3.2 1 4.6l3.2-2.5z" fill="#FBBC05" />
    <path d="M13 14.5c1.4 0 2.7.5 3.7 1.4l2.8-2.8C17.7 11.5 15.6 11 13 11c-3.7 0-6.9 2.1-8.5 5.3l3.2 2.5c.7-2.3 2.8-4.3 5.3-4.3z" fill="#EA4335" />
    {/* Pay Text */}
    <text x="30" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="20" fill="#5F6368" letterSpacing="-0.5">
      Pay
    </text>
  </svg>
);

export const PhonePeLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="110" height="40" rx="6" fill="#5F259F" />
    {/* PhonePe 'पे' Symbol */}
    <circle cx="20" cy="20" r="13" fill="#FFFFFF" />
    <path d="M18.5 13H24.5V16.5H22C24.5 17 25.5 19 25.5 21C25.5 24 23 26 19.5 26H15.5V13H18.5ZM18.5 19H20.5C21.8 19 22.5 18.2 22.5 17.2C22.5 16.2 21.8 15.5 20.5 15.5H18.5V19Z" fill="#5F259F" />
    <path d="M15.5 22L24.5 31H20.5L13.5 24V22H15.5Z" fill="#5F259F" />
    {/* PhonePe Text */}
    <text x="38" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" fill="#FFFFFF">
      PhonePe
    </text>
  </svg>
);

export const PaytmLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="40" rx="6" fill="#FFFFFF" />
    <text x="8" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#002970" letterSpacing="-0.5">
      pay
    </text>
    <text x="46" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#00BAF2" letterSpacing="-0.5">
      tm
    </text>
  </svg>
);

export const VisaLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="80" height="40" rx="6" fill="#FFFFFF" />
    <path d="M31.2 26.5L34.5 13.5H38.5L35.2 26.5H31.2Z" fill="#1A1F71" />
    <path d="M49.2 13.8C48.4 13.5 47.1 13.2 45.6 13.2C41.7 13.2 39 15.3 39 18.2C39 20.4 41 21.6 42.5 22.3C44.1 23.1 44.6 23.6 44.6 24.3C44.6 25.4 43.3 25.8 42.1 25.8C40.4 25.8 39.4 25.5 38.3 25L37.8 24.8L37.2 27.6C38.2 28.1 40 28.5 41.8 28.5C46 28.5 48.7 26.4 48.7 23.4C48.7 21.1 47.2 19.9 45.3 19C43.9 18.3 43.1 17.8 43.1 17.1C43.1 16.3 44 15.7 45.4 15.7C46.6 15.7 47.6 16 48.4 16.4L48.8 16.6L49.2 13.8Z" fill="#1A1F71" />
    <path d="M56.8 21.9C57 21.3 57.8 18.9 57.8 18.9C57.8 18.9 58 18.3 58.2 17.6L58.5 19.3C58.8 21.1 59.5 24.8 59.7 26.5H56.3L56.8 21.9ZM61.4 13.5H58.3C57.3 13.5 56.6 13.8 56.2 14.8L50.8 26.5H55L55.8 24.3H61L61.5 26.5H65.2L61.4 13.5Z" fill="#1A1F71" />
    <path d="M26.2 13.5L22.4 22.7L22 20.7C21.3 18.3 19.2 15.6 16.8 14.3L20.5 26.5H24.8L31.2 13.5H26.2Z" fill="#1A1F71" />
    <path d="M18.8 13.5H12.2L12 13.7C15.8 14.6 19.5 17.6 20.9 20.7L19.6 14.5C19.4 13.7 18.8 13.5 18.8 13.5Z" fill="#F7B600" />
  </svg>
);

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="70" height="40" rx="6" fill="#222222" />
    <circle cx="27" cy="20" r="12" fill="#EB001B" />
    <circle cx="43" cy="20" r="12" fill="#F79E1B" fillOpacity="0.92" />
    <path d="M35 11.5C37.8 13.8 39.5 16.8 39.5 20C39.5 23.2 37.8 26.2 35 28.5C32.2 26.2 30.5 23.2 30.5 20C30.5 16.8 32.2 13.8 35 11.5Z" fill="#FF5F00" />
  </svg>
);

export const RupayLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 95 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="95" height="40" rx="6" fill="#FFFFFF" />
    {/* RuPay Arrows */}
    <path d="M72 10L84 20L72 30H66L78 20L66 10H72Z" fill="#00843D" />
    <path d="M78 10L90 20L78 30H82L94 20L82 10H78Z" fill="#EA7600" />
    {/* RuPay Text */}
    <text x="8" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#005B94" letterSpacing="0.2">
      RuPay
    </text>
  </svg>
);

export const AmexLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 75 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="75" height="40" rx="6" fill="#006FCF" />
    <text x="37" y="19" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" letterSpacing="1">
      AMERICAN
    </text>
    <text x="37" y="30" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" letterSpacing="1.5">
      EXPRESS
    </text>
  </svg>
);

export const BhimLogo: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="90" height="40" rx="6" fill="#FFFFFF" />
    <path d="M12 12H20C24 12 26 14 26 17C26 19 24.5 20.2 23 20.8C25 21.4 27 23 27 26C27 29 24.5 31 20.5 31H12V12Z" fill="#0079C1" />
    <text x="32" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#0079C1">
      BHIM
    </text>
    <path d="M74 12L84 21.5L74 31H78L88 21.5L78 12H74Z" fill="#008000" />
  </svg>
);

export const RazorpayBadge: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="110" height="40" rx="6" fill="#0C2340" />
    {/* Razorpay Lightning Bolt */}
    <path d="M18 10L12 25H20L17 32L28 17H20L23 10H18Z" fill="#3395FF" />
    <text x="34" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" fill="#FFFFFF">
      Razorpay
    </text>
  </svg>
);

export const NetBankingIcon: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="90" height="40" rx="6" fill="#1E293B" />
    {/* Bank Building */}
    <path d="M18 13L27 8L36 13V15H18V13Z" fill="#FBBF24" />
    <rect x="20" y="17" width="2.5" height="9" fill="#E2E8F0" />
    <rect x="25.5" y="17" width="2.5" height="9" fill="#E2E8F0" />
    <rect x="31" y="17" width="2.5" height="9" fill="#E2E8F0" />
    <rect x="17" y="27" width="20" height="3" rx="0.5" fill="#FBBF24" />
    <text x="42" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="11" fill="#FFFFFF">
      NET BANK
    </text>
  </svg>
);
