interface HotelProperty {
  id: string;
  name: string;
  brandId: string;
  location: string;
  address: string;
  basePrice: number;
  pointsPerNight: number;
}

// This is a simplified version. In a real application, this would be fetched from an API
const hotelProperties: HotelProperty[] = [
  {
    id: 'waldorf-nyc',
    name: 'Waldorf Astoria New York',
    brandId: 'waldorf',
    location: 'northeast-us',
    address: '301 Park Avenue, New York, NY 10022',
    basePrice: 799,
    pointsPerNight: 95000
  },
  // Add more properties here...
];

export function getHotelsByBrandAndLocation(brandId: string, location: string): HotelProperty[] {
  return hotelProperties.filter(
    property => property.brandId === brandId && property.location === location
  );
}