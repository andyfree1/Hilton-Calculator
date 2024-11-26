import { HiltonBrand, hiltonBrands } from './hiltonBrands';

export interface HiltonProperty {
  id: string;
  brandId: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  region: string;
  basePrice: number;
  pointsPerNight: number;
  amenities: string[];
  rating: number;
  description: string;
  images: string[];
}

interface CityInfo {
  city: string;
  state?: string;
  country: string;
  count: number;
}

interface Cities {
  [key: string]: CityInfo[];
}

const locationQualifiers = {
  downtown: ['Downtown', 'City Center', 'Central', 'Financial District', 'Business District'],
  airport: ['Airport', 'International Airport', 'Airport Terminal', 'Airport Express'],
  resort: ['Resort & Spa', 'Beach Resort', 'Golf Resort', 'Mountain Resort', 'Lake Resort'],
  landmark: ['Times Square', 'Eiffel Tower', 'Marina Bay', 'Palm Jumeirah', 'Hyde Park'],
  area: ['Waterfront', 'Beachfront', 'Riverside', 'Oceanfront', 'Harbor'],
  district: ['Shopping District', 'Entertainment District', 'Cultural District', 'Historic District'],
  direction: ['North', 'South', 'East', 'West', 'Central'],
  specific: ['Convention Center', 'World Trade Center', 'Opera House', 'Stadium', 'University']
};

const baseAmenities = {
  Luxury: [
    'Luxury Spa', 'Fine Dining', 'Concierge Service', 'Valet Parking',
    'Pool', 'Fitness Center', 'Business Center', 'Room Service',
    'Executive Lounge', 'Rooftop Bar', 'Private Beach Access', 'Helicopter Pad',
    'Tennis Courts', 'Golf Course', 'Private Cabanas', 'Wine Cellar'
  ],
  'Full Service': [
    'Restaurant', 'Bar/Lounge', 'Fitness Center', 'Business Center',
    'Pool', 'Meeting Rooms', 'Room Service', 'Parking',
    'Spa Services', 'Conference Center', 'Wedding Venue', 'Airport Shuttle',
    'Gift Shop', 'Concierge Desk', 'Laundry Service', 'Currency Exchange'
  ],
  'Focused Service': [
    'Complimentary Breakfast', 'Fitness Center', 'Business Center',
    'WiFi', 'Parking', 'Meeting Space', 'Grab-and-Go Market',
    'Guest Laundry', 'Pet Friendly', 'Electric Car Charging'
  ]
};

const cities: Cities = {
  'North America': [
    { city: 'Chicago', state: 'IL', country: 'USA', count: 15 },
    { city: 'Miami', state: 'FL', country: 'USA', count: 12 },
    { city: 'Las Vegas', state: 'NV', country: 'USA', count: 10 },
    { city: 'San Francisco', state: 'CA', country: 'USA', count: 12 },
    { city: 'New York', state: 'NY', country: 'USA', count: 20 },
    { city: 'Los Angeles', state: 'CA', country: 'USA', count: 15 },
    { city: 'Orlando', state: 'FL', country: 'USA', count: 12 },
    { city: 'Boston', state: 'MA', country: 'USA', count: 10 },
    { city: 'Toronto', country: 'Canada', count: 8 },
    { city: 'Vancouver', country: 'Canada', count: 6 },
    { city: 'Montreal', country: 'Canada', count: 6 },
    { city: 'Mexico City', country: 'Mexico', count: 8 }
  ],
  'Europe': [
    { city: 'Paris', country: 'France', count: 12 },
    { city: 'London', country: 'UK', count: 15 },
    { city: 'Rome', country: 'Italy', count: 8 },
    { city: 'Barcelona', country: 'Spain', count: 6 },
    { city: 'Amsterdam', country: 'Netherlands', count: 6 },
    { city: 'Berlin', country: 'Germany', count: 8 },
    { city: 'Vienna', country: 'Austria', count: 6 },
    { city: 'Madrid', country: 'Spain', count: 8 },
    { city: 'Munich', country: 'Germany', count: 6 },
    { city: 'Milan', country: 'Italy', count: 6 }
  ],
  'Asia': [
    { city: 'Tokyo', country: 'Japan', count: 12 },
    { city: 'Singapore', country: 'Singapore', count: 8 },
    { city: 'Hong Kong', country: 'China', count: 10 },
    { city: 'Bangkok', country: 'Thailand', count: 8 },
    { city: 'Seoul', country: 'South Korea', count: 8 },
    { city: 'Shanghai', country: 'China', count: 10 },
    { city: 'Beijing', country: 'China', count: 10 },
    { city: 'Osaka', country: 'Japan', count: 6 },
    { city: 'Taipei', country: 'Taiwan', count: 6 }
  ],
  'Middle East': [
    { city: 'Dubai', country: 'UAE', count: 12 },
    { city: 'Abu Dhabi', country: 'UAE', count: 8 },
    { city: 'Doha', country: 'Qatar', count: 6 },
    { city: 'Riyadh', country: 'Saudi Arabia', count: 6 },
    { city: 'Muscat', country: 'Oman', count: 4 }
  ],
  'Oceania': [
    { city: 'Sydney', country: 'Australia', count: 8 },
    { city: 'Melbourne', country: 'Australia', count: 8 },
    { city: 'Brisbane', country: 'Australia', count: 6 },
    { city: 'Auckland', country: 'New Zealand', count: 6 },
    { city: 'Gold Coast', country: 'Australia', count: 6 },
    { city: 'Perth', country: 'Australia', count: 6 }
  ]
};

const generateUniquePropertyId = (brandId: string, city: string, qualifier: string, index: number) => {
  return `${brandId}-${city.toLowerCase().replace(/\s+/g, '-')}-${qualifier.toLowerCase().replace(/\s+/g, '-')}-${index}`;
};

const generateAdditionalProperties = () => {
  const additionalProperties: HiltonProperty[] = [];

  Object.entries(cities).forEach(([region, cityList]) => {
    cityList.forEach((cityInfo) => {
      hiltonBrands.forEach((brand) => {
        const amenityCategory = brand.category === 'Luxury' ? 'Luxury' : 
                              brand.category === 'Full Service' ? 'Full Service' : 'Focused Service';
        const amenities = baseAmenities[amenityCategory];

        const propertyCount = Math.min(
          Math.ceil(cityInfo.count * (brand.category === 'Luxury' ? 0.3 : 
                                    brand.category === 'Full Service' ? 0.5 : 0.7)),
          cityInfo.count
        );

        const locationTypes = Object.keys(locationQualifiers) as (keyof typeof locationQualifiers)[];

        for (let i = 0; i < propertyCount; i++) {
          const locationType = locationTypes[Math.floor(Math.random() * locationTypes.length)];
          const qualifiers = locationQualifiers[locationType];
          const qualifier = qualifiers[Math.floor(Math.random() * qualifiers.length)];
          const propertyName = `${brand.name} ${cityInfo.city} ${qualifier}`;
          const propertyId = generateUniquePropertyId(brand.id, cityInfo.city, qualifier, i);

          const property: HiltonProperty = {
            id: propertyId,
            brandId: brand.id,
            name: propertyName,
            address: `${Math.floor(Math.random() * 999) + 1} ${locationType.charAt(0).toUpperCase() + locationType.slice(1)} Street`,
            city: cityInfo.city,
            state: 'state' in cityInfo ? cityInfo.state : undefined,
            country: cityInfo.country,
            region,
            basePrice: brand.basePrice * (0.9 + Math.random() * 0.4),
            pointsPerNight: Math.round(brand.basePrice * 100),
            amenities: [...amenities].sort(() => Math.random() - 0.5).slice(0, 6),
            rating: Math.min(5, Math.floor(Math.random() * 2) + 4),
            description: `Experience luxury at ${propertyName}, featuring world-class amenities and exceptional service in the heart of ${cityInfo.city}.`,
            images: [
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
              'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
            ]
          };
          additionalProperties.push(property);
        }
      });
    });
  });

  return additionalProperties;
};

export const expandedHiltonProperties = generateAdditionalProperties();