export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface FlightClass {
  id: string;
  name: string;
  multiplier: number;
}

export interface CarRental {
  company: string;
  basePrice: number;
  categories: {
    economy: number;
    midsize: number;
    luxury: number;
    suv: number;
  };
}

export interface Entertainment {
  id: string;
  name: string;
  category: 'Show' | 'Concert' | 'Excursion' | 'Sports' | 'Other';
  basePrice: number;
  location: string;
  pointsEligible: boolean;
  maxPointsDiscount: number;
  description: string;
  bookingUrl?: string;
}

export interface HiltonBrand {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  pointsPerDollar: number;
}