import { Airport } from '../types';

export const flightClasses = [
  { id: 'economy', name: 'Economy', multiplier: 1 },
  { id: 'premium', name: 'Premium Economy', multiplier: 1.5 },
  { id: 'business', name: 'Business Class', multiplier: 2.5 },
  { id: 'first', name: 'First Class', multiplier: 3.5 }
];

export const carRentals = [
  {
    company: 'Hertz',
    basePrice: 49.99,
    categories: {
      economy: 1,
      midsize: 1.3,
      luxury: 2.8,
      suv: 1.9
    }
  },
  {
    company: 'Enterprise',
    basePrice: 44.99,
    categories: {
      economy: 1,
      midsize: 1.35,
      luxury: 2.7,
      suv: 1.85
    }
  },
  {
    company: 'Avis',
    basePrice: 47.99,
    categories: {
      economy: 1,
      midsize: 1.4,
      luxury: 2.9,
      suv: 2.0
    }
  },
  {
    company: 'Budget',
    basePrice: 41.99,
    categories: {
      economy: 1,
      midsize: 1.25,
      luxury: 2.6,
      suv: 1.8
    }
  }
];

export const rideShareTrips = [
  {
    type: 'Standard',
    basePrice: 5.00,
    pricePerMile: 1.50,
    pricePerMinute: 0.25,
    surgeMultipliers: {
      standard: 1,
      peak: 1.5,
      event: 2.0
    }
  },
  {
    type: 'Premium',
    basePrice: 8.00,
    pricePerMile: 2.00,
    pricePerMinute: 0.35,
    surgeMultipliers: {
      standard: 1,
      peak: 1.6,
      event: 2.2
    }
  },
  {
    type: 'XL',
    basePrice: 10.00,
    pricePerMile: 2.50,
    pricePerMinute: 0.40,
    surgeMultipliers: {
      standard: 1,
      peak: 1.7,
      event: 2.4
    }
  }
];

export const diamondBenefits = {
  breakfast: { value: 25 },
  wifi: { value: 15 },
  bottledWater: { value: 5 },
  executiveLounge: { value: 50 },
  roomUpgrade: { value: 75 },
  latecheckout: { value: 50 },
  earlyCheckin: { value: 50 },
  diamondStatus: { value: 100 },
  pointsValue: 0.005,
  pointsBonus: { multiplier: 2 },
  lyftPartnership: { pointsPerDollar: 3 }
};

// Update majorAirports array with comprehensive list
export const majorAirports: Airport[] = [
  // United States
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'USA' },
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'USA' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'USA' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'USA' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'USA' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'USA' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'Newark', country: 'USA' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix', country: 'USA' },
  { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston', country: 'USA' },
  { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'USA' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis', country: 'USA' },
  { code: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit', country: 'USA' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International', city: 'Fort Lauderdale', country: 'USA' },
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', country: 'USA' },
  { code: 'CLT', name: 'Charlotte Douglas International', city: 'Charlotte', country: 'USA' },
  { code: 'BWI', name: 'Baltimore/Washington International', city: 'Baltimore', country: 'USA' },
  { code: 'SAN', name: 'San Diego International', city: 'San Diego', country: 'USA' },
  { code: 'MDW', name: 'Chicago Midway International', city: 'Chicago', country: 'USA' },
  { code: 'TPA', name: 'Tampa International', city: 'Tampa', country: 'USA' },
  { code: 'PDX', name: 'Portland International', city: 'Portland', country: 'USA' },
  { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'USA' },

  // Canada
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  { code: 'YUL', name: 'Montréal-Pierre Elliott Trudeau International', city: 'Montreal', country: 'Canada' },
  { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada' },

  // Europe
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas', city: 'Madrid', country: 'Spain' },
  { code: 'FCO', name: 'Leonardo da Vinci International', city: 'Rome', country: 'Italy' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { code: 'BCN', name: 'Barcelona–El Prat', city: 'Barcelona', country: 'Spain' },

  // Asia
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China' },

  // Middle East
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'UAE' },

  // Australia & New Zealand
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
  { code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia' },
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' }
].sort((a, b) => a.city.localeCompare(b.city));