export interface Expedition {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  originalPrice?: string;
  slug: string;
  image: string;
  badge?: string;
  altitude?: string;
  difficulty?: string;
  highlights: string[];
  description: string;
}

export interface YatraTier {
  key: string;
  slug: string;
  label: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured: boolean;
  vehicleType: string;
  stayType: string;
  features: string[];
}

export interface SacredTemple {
  id: string;
  name: string;
  deity: string;
  image: string;
  desc: string;
  location: string;
  slug: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  date: string;
  initial: string;
  rating: number;
  yatraPackage: string;
  location?: string;
  avatar?: string;
  highlightTag?: string;
  verifiedType?: string;
  batchDate?: string;
  memoryImage?: string;
  isLocalGuide?: boolean;
  localGuideLevel?: number;
  reviewCount?: number;
  photosCount?: number;
  relativeTime?: string;
  likesCount?: number;
  positives?: string[];
  ownerResponse?: {
    text: string;
    date: string;
    author: string;
  };
}

export interface FaqItem {
  id: number;
  q: string;
  a: string;
  category?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  altitude: string;
  distance: string;
  desc: string;
  highlights: string[];
}

export interface LeadBooking {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  destination: string;
  pickupLocation?: string;
  travellers: number;
  month: string;
  vehiclePreference: 'standard' | 'suv' | 'luxury';
  status: 'New Inquiry' | 'Contacted' | 'Docs Received' | 'ILP Processing' | 'Approved & Booked' | 'Cancelled' | 'Completed';
  tripStatus?: 'Upcoming' | 'Confirmed' | 'Processing' | 'Completed' | 'On Hold';
  ilpStatus: {
    aadharProvided: boolean;
    policeVerification: boolean;
    medicalCertificate: boolean;
    sdmApproval: 'Pending' | 'In Progress' | 'Issued' | 'Rejected';
    itbpClearance: 'Pending' | 'Cleared';
  };
  assignedVehicle?: string;
  assignedGuide?: string;
  totalAmount: number;
  advancePaid: number;
  amountPaid?: number;
  travelDate?: string;
  paymentId?: string;
  orderId?: string;
  notes?: string;
  updatedAt?: string;
  detailsFilled?: boolean;
}

export interface CrmStats {
  totalLeads: number;
  pendingIlp: number;
  approvedYatris: number;
  totalRevenue: number;
  upcomingBatchesCount: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  destination: string;
  category: 'adi-kailash' | 'om-parvat' | 'char-dham' | 'valley-of-flowers' | 'darma-valley' | 'lakes-and-rivers';
  categoryLabel: string;
  image: string;
  altitude?: string;
  location: string;
  caption: string;
  photographer?: string;
  bestTime?: string;
}

export type HandlerRole = 
  | 'Admin Operations Manager'
  | 'Ground Trip Lead'
  | 'SDM Permit Liaison Officer'
  | '4x4 SUV Fleet Manager'
  | 'Medical & Safety Escort';

export interface HandlerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: HandlerRole;
  badgeId: string;
  station: string;
  status: 'Active' | 'On Duty' | 'Off Duty';
  createdAt: string;
}

export interface PilgrimUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  age?: string | number;
  city?: string;
  state?: string;
  preferredYatra?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  yatriBadgeId?: string;
  registeredAt?: string;
  createdAt?: string;
  verified?: boolean;
  bookingCount?: number;
}

export interface HotelStayOption {
  id: string;
  name: string;
  tier: 'standard' | 'premium';
  location: string;
  altitude: string;
  image: string;
  rating: number;
  reviewsCount: number;
  tagline: string;
  roomTypes: string[];
  amenities: string[];
  mealsIncluded: string;
  heatingFacility: string;
  washroomType: string;
  oxygenAvailable: boolean;
  idealFor: string;
  standardPriceNote: string;
  address: string;
  highlights: string[];
}

export interface LocationHotels {
  locationSlug: string;
  locationName: string;
  circuit: string;
  altitude: string;
  overview: string;
  standardStay: HotelStayOption;
  premiumStay: HotelStayOption;
}

export interface ReelItem {
  id: string;
  title: string;
  destination: string;
  location: string;
  videoUrl?: string;
  posterImage: string;
  likesCount: number;
  viewsCount: string;
  sharesCount: number;
  duration: string;
  category: 'adi-kailash' | 'om-parvat' | 'parvati-sarovar' | 'offroad' | 'helicopter' | 'yatri-experience';
  categoryLabel: string;
  creatorName: string;
  creatorAvatar?: string;
  audioTrack: string;
  caption: string;
  packageSlug?: string;
  isVerified?: boolean;
  createdAt?: string;
}
