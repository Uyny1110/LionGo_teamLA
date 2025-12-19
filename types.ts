export enum ItineraryStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED'
}

export type MembershipLevel = 'Classic' | 'Silver' | 'Gold' | 'Diamond';

export type Category = 'STAY' | 'FOOD' | 'EXPERIENCE' | 'TRANSPORT' | 'SHOP';

export type CurrencyCode = 'TWD' | 'USD' | 'JPY' | 'KRW' | 'EUR';

export interface TravelItem {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  price: number; // TWD Base
  image: string;
  description: string;
  rating: number;
  lat: number;
  lng: number;
}

export interface ItineraryItem extends TravelItem {
  instanceId: string; // Unique ID for the itinerary (allows duplicates of same item)
  day: number;
  startTime: string; // Added for time slot management
  order: number;
}

export interface PackageItem {
  itemId: string;
  day: number;
  startTime: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  subTitle: string;
  pricePerPerson: number;
  tags: string[];
  image: string;
  description: string;
  items: PackageItem[]; // List of item IDs and their schedule
}

export interface UserProfile {
  name: string;
  authCode: string;
  headcount: number;
  membershipLevel: MembershipLevel;
  points: number;
}

export interface TripContext {
  destination: string;
  startDate: string;
  endDate: string;
  status: ItineraryStatus;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
