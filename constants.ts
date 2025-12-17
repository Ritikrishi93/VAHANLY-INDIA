import { Vehicle, VehicleType, FuelType, Transmission } from './types';

const MOCK_REVIEWS = [
  { id: 'r1', user: 'Rahul S.', rating: 5, comment: 'Absolutely loving the performance and comfort. Value for money!', date: '2 days ago', verified: true },
  { id: 'r2', user: 'Priya M.', rating: 4, comment: 'Great mileage but the service center is a bit far.', date: '1 week ago', verified: true },
  { id: 'r3', user: 'Amit K.', rating: 5, comment: 'Best in segment features. The touch screen is buttery smooth.', date: '3 weeks ago', verified: true }
];

const MOCK_DEALERS = [
  { id: 'd1', name: 'AutoWorld Premium', address: 'Patia, Bhubaneswar', distance: '2.5 km', rating: 4.8 },
  { id: 'd2', name: 'City Motors', address: 'Rasulgarh, Bhubaneswar', distance: '5.2 km', rating: 4.5 },
  { id: 'd3', name: 'Highway Wheels', address: 'Khandagiri, Bhubaneswar', distance: '8.1 km', rating: 4.2 }
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'tata-nexon-ev',
    name: 'Tata Nexon.ev',
    brand: 'Tata Motors',
    type: VehicleType.EV,
    priceRange: '14.74 - 19.94 Lakh',
    basePrice: 14.74,
    image: 'https://picsum.photos/id/111/800/500',
    images: [
      'https://picsum.photos/id/111/800/500',
      'https://picsum.photos/id/184/800/500',
      'https://picsum.photos/id/133/800/500'
    ],
    fuelType: FuelType.ELECTRIC,
    bodyType: 'SUV',
    rating: 4.5,
    reviews: 850,
    specs: {
      power: '143 bhp',
      torque: '250 Nm',
      mileage: '465 km (ARAI)',
      transmission: Transmission.AUTOMATIC,
      seating: 5,
      chargingTime: '56 min (10-80%)',
      warranty: '8 Years/1.6L km'
    },
    variants: [
      { name: 'Creative +', price: 14.74, features: ['6 Airbags', 'Touchscreen'] },
      { name: 'Fearless', price: 16.50, features: ['360 Camera', 'Ventilated Seats'], isBestValue: true },
      { name: 'Empowered +', price: 19.94, features: ['Sunroof', 'JBL Audio', 'V2L'] }
    ],
    pros: ['Excellent Range', '5-Star Safety Rating', 'Feature Loaded Cabin', 'Low Running Cost'],
    cons: ['Rear Seat Space', 'Charging Infrastructure', 'Pricey Top Model'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['mahindra-xuv700', 'hyundai-creta']
  },
  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    type: VehicleType.CAR,
    priceRange: '11.00 - 20.15 Lakh',
    basePrice: 11.00,
    image: 'https://picsum.photos/id/183/800/500',
    images: [
      'https://picsum.photos/id/183/800/500',
      'https://picsum.photos/id/107/800/500',
      'https://picsum.photos/id/296/800/500'
    ],
    fuelType: FuelType.PETROL,
    bodyType: 'SUV',
    rating: 4.6,
    reviews: 1200,
    specs: {
      engine: '1.5L MPi',
      power: '113 bhp',
      torque: '144 Nm',
      mileage: '17 kmpl',
      transmission: Transmission.MANUAL,
      seating: 5,
      bootSpace: '433 L'
    },
    variants: [
      { name: 'E', price: 11.00, features: ['ABS', 'Dual Airbags'] },
      { name: 'S (O)', price: 14.32, features: ['Sunroof', 'Alloys'], isBestValue: true },
      { name: 'SX (O) Turbo', price: 20.15, features: ['ADAS L2', 'Bose Audio'] }
    ],
    pros: ['Premium Interiors', 'Smooth Engine', 'Resale Value', 'Wide Service Network'],
    cons: ['Safety Rating Concern', 'Common Design', 'Waiting Period'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['mahindra-xuv700', 'tata-nexon-ev']
  },
  {
    id: 'ola-s1-pro',
    name: 'Ola S1 Pro',
    brand: 'Ola Electric',
    type: VehicleType.EV, 
    priceRange: '1.30 - 1.47 Lakh',
    basePrice: 1.30,
    image: 'https://picsum.photos/id/146/800/500',
    images: [
      'https://picsum.photos/id/146/800/500',
      'https://picsum.photos/id/196/800/500',
      'https://picsum.photos/id/191/800/500'
    ],
    fuelType: FuelType.ELECTRIC,
    bodyType: 'Scooter',
    rating: 4.2,
    reviews: 3000,
    specs: {
      power: '11 kW',
      torque: '58 Nm',
      mileage: '195 km',
      transmission: Transmission.AUTOMATIC,
      seating: 2,
      chargingTime: '6.5 Hours',
      warranty: '3 Years'
    },
    variants: [
      { name: 'S1 Pro Gen 2', price: 1.30, features: ['MoveOS 4', 'Cruise Control'], isBestValue: true }
    ],
    pros: ['Best in Class Range', 'Quick Acceleration', 'Huge Boot Space', 'Smart Features'],
    cons: ['Suspension Stiffness', 'Service Quality', 'Software Glitches'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['ultraviolette-f77', 'royal-enfield-himalayan']
  },
  {
    id: 'royal-enfield-himalayan',
    name: 'Himalayan 450',
    brand: 'Royal Enfield',
    type: VehicleType.BIKE,
    priceRange: '2.85 - 3.10 Lakh',
    basePrice: 2.85,
    image: 'https://picsum.photos/id/191/800/500',
    images: [
      'https://picsum.photos/id/191/800/500',
      'https://picsum.photos/id/157/800/500',
      'https://picsum.photos/id/450/800/500'
    ],
    fuelType: FuelType.PETROL,
    bodyType: 'Adventure',
    rating: 4.8,
    reviews: 500,
    specs: {
      engine: '452cc Sherpa',
      power: '40 bhp',
      torque: '40 Nm',
      mileage: '30 kmpl',
      transmission: Transmission.MANUAL,
      seating: 2
    },
    variants: [
      { name: 'Base', price: 2.85, features: ['Switchable ABS'] },
      { name: 'Summit', price: 3.10, features: ['Tubeless Spokes', 'TFT Dash'], isBestValue: true }
    ],
    pros: ['Great Suspension', 'Torquey Engine', 'Google Maps Navigation', 'Off-road Capability'],
    cons: ['Heavy Weight', 'Tube Tyres (Base)', 'Seat Height'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['ultraviolette-f77', 'ola-s1-pro']
  },
  {
    id: 'mahindra-xuv700',
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    type: VehicleType.CAR,
    priceRange: '13.99 - 26.99 Lakh',
    basePrice: 13.99,
    image: 'https://picsum.photos/id/296/800/500',
    images: [
      'https://picsum.photos/id/296/800/500',
      'https://picsum.photos/id/257/800/500',
      'https://picsum.photos/id/171/800/500'
    ],
    fuelType: FuelType.DIESEL,
    bodyType: 'SUV',
    rating: 4.7,
    reviews: 950,
    specs: {
      engine: '2.2L mHawk',
      power: '182 bhp',
      torque: '420 Nm',
      mileage: '15 kmpl',
      transmission: Transmission.AUTOMATIC,
      seating: 7,
      bootSpace: 'Smart Fold'
    },
    variants: [
      { name: 'MX', price: 13.99, features: ['8" Screen', 'Android Auto'] },
      { name: 'AX5', price: 17.00, features: ['Skyroof', 'LED Lights'] },
      { name: 'AX7 L', price: 26.99, features: ['Sony 3D', 'AWD', 'ADAS'], isBestValue: true }
    ],
    pros: ['Powerful Engine', 'ADAS Level 2', 'Luxurious Cabin', 'Road Presence'],
    cons: ['Fuel Efficiency', 'Electronics Niggles', 'High Waiting Period'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['hyundai-creta', 'tata-nexon-ev']
  },
  {
    id: 'ultraviolette-f77',
    name: 'Ultraviolette F77',
    brand: 'Ultraviolette',
    type: VehicleType.EV,
    priceRange: '3.80 - 4.55 Lakh',
    basePrice: 3.80,
    image: 'https://picsum.photos/id/400/800/500',
    images: [
      'https://picsum.photos/id/400/800/500',
      'https://picsum.photos/id/402/800/500',
      'https://picsum.photos/id/452/800/500'
    ],
    fuelType: FuelType.ELECTRIC,
    bodyType: 'Sports Bike',
    rating: 4.9,
    reviews: 120,
    specs: {
      power: '30 kW',
      torque: '100 Nm',
      mileage: '307 km',
      transmission: Transmission.AUTOMATIC,
      seating: 2,
      chargingTime: '4 Hours'
    },
    variants: [
      { name: 'Mach 2 Original', price: 3.80, features: ['SRB Tech'] },
      { name: 'Mach 2 Recon', price: 4.55, features: ['Fast Charge', 'Boost Mode'], isBestValue: true }
    ],
    pros: ['Instant Torque', 'Futuristic Design', 'Longest EV Bike Range', 'Build Quality'],
    cons: ['Aggressive Posture', 'Expensive', 'Limited Network'],
    reviewsList: MOCK_REVIEWS,
    dealers: MOCK_DEALERS,
    similarIds: ['royal-enfield-himalayan', 'ola-s1-pro']
  }
];