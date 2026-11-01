// ==========================================
// Sanchari Core Type Definitions
// ==========================================

export type KarnatakaRegion =
  | "Coastal Karnataka"
  | "Malnad & Western Ghats"
  | "North Karnataka (Heritage)"
  | "Central Karnataka"
  | "South Karnataka & Mysore Region"
  | "Bengaluru & Surrounds";

export type DestinationCategory =
  | "Heritage and monuments"
  | "Nature and waterfalls"
  | "Hill stations"
  | "Beaches and coastal escapes"
  | "Temples and cultural heritage"
  | "Adventure and outdoor activities"
  | "Local food and crafts"
  | "Family-friendly destinations";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  district: string;
  region: KarnatakaRegion;
  categories: DestinationCategory[];
  heroImage: string;
  gallery: string[];
  tagline: string;
  description: string;
  highlights: string[];
  thingsToDo: {
    title: string;
    description: string;
    duration?: string;
  }[];
  suggestedDuration: string;
  bestTimeToVisit: {
    months: string;
    reason: string;
    weatherNote: string;
  };
  travelTips: string[];
  nearbyDestinations: {
    name: string;
    slug: string;
    distanceKm: number;
  }[];
  featured?: boolean;
}

export type AccommodationType =
  | "Heritage Homestay"
  | "Coffee Plantation Estate"
  | "Eco-Resort"
  | "Coastal Beach Villa"
  | "Traditional Tharavadu / Mane"
  | "Riverside Cottage"
  | "Boutique Hotel";

export interface Stay {
  id: string;
  slug: string;
  name: string;
  destinationSlug: string;
  destinationName: string;
  district: string;
  region: KarnatakaRegion;
  type: AccommodationType;
  heroImage: string;
  gallery: string[];
  description: string;
  indicativePricePerNight: number; // In INR (Demonstration data)
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds?: number;
  highlights?: string[];
  sleepingArrangements?: { roomName: string; bedType: string; ensuite?: boolean }[];
  amenities: string[];
  houseRules: string[];
  cancellationPolicy: string;
  checkInTime: string;
  checkOutTime: string;
  hostName: string;
  hostBio?: string;
  nearbyAttractions?: { name: string; distance: string }[];
  demoRating?: number;
  demoReviewsCount?: number;
  featured?: boolean;
}

export interface Guide {
  id: string;
  slug: string;
  name: string;
  location: string;
  district: string;
  languages: string[];
  expertise: string[];
  avatar: string;
  bio: string;
  yearsExperience: number;
  sampleTours: {
    title: string;
    duration: string;
    indicativeRate: number; // In INR (Demonstration data)
    description: string;
    meetingPoint?: string;
    inclusions?: string[];
  }[];
  indicativeDayRate: number; // In INR (Demonstration data)
  meetingPoint?: string;
  cancellationPolicy?: string;
  included?: string[];
  excluded?: string[];
  demoRating?: number;
  demoReviewsCount?: number;
  featured?: boolean;
}

export type ExperienceCategory =
  | "Heritage Walks"
  | "Regional Food & Culinary"
  | "Local Craft Workshops"
  | "Guided Nature Walks"
  | "Village & Cultural Tours"
  | "Photography Outings";

export interface Experience {
  id: string;
  slug: string;
  title: string;
  destinationSlug: string;
  destinationName: string;
  district: string;
  category: ExperienceCategory;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  duration: string;
  maxGroupSize: number;
  indicativePricePerPerson: number; // In INR (Demonstration data)
  difficulty?: "Easy" | "Moderate" | "Challenging";
  ageRestriction?: string;
  importantInstructions?: string[];
  cancellationPolicy?: string;
  hostName?: string;
  hostBio?: string;
  demoRating?: number;
  demoReviewsCount?: number;
  featured?: boolean;
}

export interface TravelArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTimeMinutes: number;
  heroImage: string;
  destinationSlug?: string;
  tags: string[];
}

export interface BookingSubmission {
  id?: string;
  serviceType: "stay" | "guide" | "experience";
  serviceId: string;
  serviceTitle: string;
  destinationName: string;
  startDate: string;
  endDate?: string;
  guestsCount: number;
  indicativeTotal: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface PartnerApplication {
  fullName: string;
  businessName: string;
  category: "Homestay Owner" | "Local Guide" | "Tour Operator" | "Cultural Experience Provider" | "Local Tourism Business";
  email: string;
  phone: string;
  district: string;
  description: string;
  agreedToTerms: boolean;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ToastMessage {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  durationMs?: number;
}
