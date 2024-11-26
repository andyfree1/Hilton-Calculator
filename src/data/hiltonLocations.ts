export interface Location {
  city: string;
  state?: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Oceania';
}

export const hiltonLocations: Record<string, Location[]> = {
  // Luxury Brands
  waldorf: [
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' },
    { city: 'Beverly Hills', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'Boca Raton', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'Paris', country: 'France', region: 'Europe' },
    { city: 'Berlin', country: 'Germany', region: 'Europe' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' },
    { city: 'Shanghai', country: 'China', region: 'Asia' },
    { city: 'Tokyo', country: 'Japan', region: 'Asia' }
  ],
  
  lxr: [
    { city: 'Santa Monica', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'London', country: 'UK', region: 'Europe' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' }
  ],
  
  conrad: [
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' },
    { city: 'Miami', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'London', country: 'UK', region: 'Europe' },
    { city: 'Algarve', country: 'Portugal', region: 'Europe' },
    { city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' }
  ],

  // Upper Upscale Brands
  hilton: [
    { city: 'Chicago', state: 'IL', country: 'USA', region: 'North America' },
    { city: 'San Francisco', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'London', country: 'UK', region: 'Europe' },
    { city: 'Paris', country: 'France', region: 'Europe' },
    { city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' },
    { city: 'Cairo', country: 'Egypt', region: 'Africa' }
  ],

  curio: [
    { city: 'San Diego', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'Austin', state: 'TX', country: 'USA', region: 'North America' },
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' },
    { city: 'London', country: 'UK', region: 'Europe' },
    { city: 'Berlin', country: 'Germany', region: 'Europe' },
    { city: 'Beijing', country: 'China', region: 'Asia' }
  ],

  doubletree: [
    { city: 'Boston', state: 'MA', country: 'USA', region: 'North America' },
    { city: 'Portland', state: 'OR', country: 'USA', region: 'North America' },
    { city: 'Amsterdam', country: 'Netherlands', region: 'Europe' },
    { city: 'Melbourne', country: 'Australia', region: 'Oceania' },
    { city: 'Bangkok', country: 'Thailand', region: 'Asia' }
  ],

  embassy: [
    { city: 'Houston', state: 'TX', country: 'USA', region: 'North America' },
    { city: 'Denver', state: 'CO', country: 'USA', region: 'North America' },
    { city: 'Toronto', country: 'Canada', region: 'North America' },
    { city: 'Mexico City', country: 'Mexico', region: 'North America' }
  ],

  // Upscale Brands
  canopy: [
    { city: 'Portland', state: 'OR', country: 'USA', region: 'North America' },
    { city: 'Austin', state: 'TX', country: 'USA', region: 'North America' },
    { city: 'Washington', state: 'DC', country: 'USA', region: 'North America' },
    { city: 'Reykjavik', country: 'Iceland', region: 'Europe' },
    { city: 'Zagreb', country: 'Croatia', region: 'Europe' },
    { city: 'Chengdu', country: 'China', region: 'Asia' }
  ],

  signia: [
    { city: 'Orlando', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'Atlanta', state: 'GA', country: 'USA', region: 'North America' }
  ],

  'hilton-garden-inn': [
    { city: 'Seattle', state: 'WA', country: 'USA', region: 'North America' },
    { city: 'Miami', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'London', country: 'UK', region: 'Europe' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' },
    { city: 'Hong Kong', country: 'China', region: 'Asia' }
  ],

  homewood: [
    { city: 'Phoenix', state: 'AZ', country: 'USA', region: 'North America' },
    { city: 'Chicago', state: 'IL', country: 'USA', region: 'North America' },
    { city: 'Vancouver', country: 'Canada', region: 'North America' }
  ],

  tempo: [
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' },
    { city: 'Los Angeles', state: 'CA', country: 'USA', region: 'North America' }
  ],

  // Upper Midscale Brands
  hampton: [
    { city: 'Las Vegas', state: 'NV', country: 'USA', region: 'North America' },
    { city: 'Orlando', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'Paris', country: 'France', region: 'Europe' },
    { city: 'Warsaw', country: 'Poland', region: 'Europe' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' }
  ],

  tru: [
    { city: 'Dallas', state: 'TX', country: 'USA', region: 'North America' },
    { city: 'Oklahoma City', state: 'OK', country: 'USA', region: 'North America' },
    { city: 'Las Vegas', state: 'NV', country: 'USA', region: 'North America' }
  ],

  home2: [
    { city: 'San Jose', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'Nashville', state: 'TN', country: 'USA', region: 'North America' },
    { city: 'Calgary', country: 'Canada', region: 'North America' }
  ],

  // Lifestyle and Collection Brands
  motto: [
    { city: 'Washington', state: 'DC', country: 'USA', region: 'North America' },
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' }
  ],

  tapestry: [
    { city: 'San Diego', state: 'CA', country: 'USA', region: 'North America' },
    { city: 'Miami', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'Paris', country: 'France', region: 'Europe' },
    { city: 'Madrid', country: 'Spain', region: 'Europe' }
  ],

  // Timeshare Brands
  hgv: [
    { city: 'Honolulu', state: 'HI', country: 'USA', region: 'North America' },
    { city: 'Orlando', state: 'FL', country: 'USA', region: 'North America' },
    { city: 'Las Vegas', state: 'NV', country: 'USA', region: 'North America' }
  ],

  hgvmax: [
    { city: 'New York', state: 'NY', country: 'USA', region: 'North America' },
    { city: 'Washington', state: 'DC', country: 'USA', region: 'North America' }
  ]
};