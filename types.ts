export enum VehicleType {
  CAR = 'Car',
  BIKE = 'Bike',
  EV = 'EV'
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid'
}

export enum Transmission {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automatic',
  CVT = 'CVT',
  DCT = 'DCT'
}

export interface Variant {
  name: string;
  price: number; // In Lakhs
  features: string[];
  isBestValue?: boolean;
}

export interface VehicleSpec {
  engine?: string;
  power: string;
  torque: string;
  mileage: string; // or Range for EVs
  transmission: Transmission;
  seating: number;
  bootSpace?: string;
  chargingTime?: string; // EV only
  warranty?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  distance: string; // e.g. "2.5 km"
  rating: number;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: VehicleType;
  priceRange: string; // Display string e.g., "10.50 - 15.00 Lakh"
  basePrice: number;
  image: string; // Main thumbnail
  images: string[]; // Gallery images
  fuelType: FuelType;
  bodyType: string;
  specs: VehicleSpec;
  variants: Variant[];
  rating: number;
  reviews: number;
  // New fields
  pros: string[];
  cons: string[];
  reviewsList: Review[];
  dealers: Dealer[];
  similarIds: string[];
}