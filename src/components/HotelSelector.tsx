import React, { useMemo, useEffect } from 'react';
import { Building2, Star, ExternalLink, Wifi, UtensilsCrossed, Car, Waves, Dumbbell } from 'lucide-react';
import { hiltonBrands } from '../data/hiltonBrands';
import { expandedHiltonProperties } from '../data/hiltonProperties';

interface HotelSelectorProps {
  details: {
    brand: string;
    property: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    points: string;
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
}

const HOTEL_FEES = {
  resortFee: 35,
  parkingFee: 25,
  serviceFee: 10,
  amenityFee: 15,
  destinationFee: 20,
};

const TAX_RATES = {
  roomTax: 0.145,
  occupancyTax: 0.035,
  cityTax: 0.02,
  tourismLevy: 0.01,
};

const SEASONAL_RATES = {
  peak: 1.4,    // 40% premium for peak season
  shoulder: 1.2, // 20% premium for shoulder season
  offPeak: 0.8,  // 20% discount for off-peak
};

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-5 h-5" />,
  'Restaurant': <UtensilsCrossed className="w-5 h-5" />,
  'Valet Parking': <Car className="w-5 h-5" />,
  'Pool': <Waves className="w-5 h-5" />,
  'Fitness Center': <Dumbbell className="w-5 h-5" />
};

export default function HotelSelector({ details, onUpdate, onCostUpdate }: HotelSelectorProps) {
  const selectedProperty = details.property ? 
    expandedHiltonProperties.find(p => p.id === details.property) : null;

  const filteredProperties = details.brand ? 
    expandedHiltonProperties.filter(p => p.brandId === details.brand) : 
    expandedHiltonProperties;

  const calculateCashPrice = (basePrice: number, checkIn: string, checkOut: string, rooms: number) => {
    if (!checkIn || !checkOut) return 0;
    
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;

    const month = new Date(checkIn).getMonth();
    let seasonalRate = 1;
    if (month >= 5 && month <= 7) {
      seasonalRate = SEASONAL_RATES.peak;
    } else if (month >= 2 && month <= 4) {
      seasonalRate = SEASONAL_RATES.shoulder;
    } else if (month >= 11 || month <= 1) {
      seasonalRate = SEASONAL_RATES.offPeak;
    }

    const lengthDiscount = nights >= 7 ? 0.85 : 
                          nights >= 4 ? 0.9 : 
                          nights >= 2 ? 0.95 : 1;

    const roomCost = basePrice * seasonalRate * lengthDiscount * nights * rooms;

    const isMajorCity = selectedProperty?.city && 
      ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'].includes(selectedProperty.city);
    
    const hasResortFee = selectedProperty?.amenities.includes('Pool') || 
                        selectedProperty?.amenities.includes('Spa Services');

    const fees = (
      (hasResortFee ? HOTEL_FEES.resortFee : 0) +
      HOTEL_FEES.serviceFee +
      HOTEL_FEES.amenityFee +
      (isMajorCity ? HOTEL_FEES.destinationFee : 0)
    ) * nights * rooms;

    const roomTax = roomCost * TAX_RATES.roomTax;
    const occupancyTax = roomCost * TAX_RATES.occupancyTax;
    const cityTax = isMajorCity ? roomCost * TAX_RATES.cityTax : 0;
    const tourismLevy = roomCost * TAX_RATES.tourismLevy;

    return roomCost + fees + roomTax + occupancyTax + cityTax + tourismLevy;
  };

  const calculatePointsSavings = (points: string, cashPrice: number) => {
    const pointsNum = Number(points) || 0;
    return Math.min(pointsNum * 0.005, cashPrice * 0.8);
  };

  useEffect(() => {
    if (selectedProperty) {
      const cashPrice = calculateCashPrice(
        selectedProperty.basePrice,
        details.checkIn,
        details.checkOut,
        details.rooms
      );
      const pointsSavings = calculatePointsSavings(details.points, cashPrice);
      onCostUpdate({ cashPrice, pointsSavings });
    } else {
      onCostUpdate({ cashPrice: 0, pointsSavings: 0 });
    }
  }, [selectedProperty, details.checkIn, details.checkOut, details.rooms, details.points]);

  const getHotelUrl = (property: typeof selectedProperty) => {
    if (!property) return '#';
    const brand = hiltonBrands.find(b => b.id === property.brandId);
    if (!brand) return '#';
    
    const brandSlug = brand.name.toLowerCase().replace(/\s+/g, '-');
    const locationSlug = `${property.city.toLowerCase()}-${property.state ? property.state.toLowerCase() + '-' : ''}${property.country.toLowerCase()}`;
    const propertySlug = property.id.toLowerCase();
    
    return `https://www.hilton.com/en/hotels/${brandSlug}/${locationSlug}/${propertySlug}/`;
  };

  const getAmenityUrl = (property: typeof selectedProperty, amenity: string) => {
    if (!property) return '#';
    const baseUrl = getHotelUrl(property);
    if (baseUrl === '#') return '#';
    const amenitySlug = amenity.toLowerCase().replace(/\s+/g, '-');
    return `${baseUrl}amenities/#${amenitySlug}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Hotel Selection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Hilton Brand
          </label>
          <select
            className="hilton-select w-full"
            value={details.brand}
            onChange={(e) => onUpdate('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {Object.entries(
              hiltonBrands.reduce((acc, brand) => {
                if (!acc[brand.category]) acc[brand.category] = [];
                acc[brand.category].push(brand);
                return acc;
              }, {} as Record<string, typeof hiltonBrands>)
            ).map(([category, brands]) => (
              <optgroup key={category} label={category}>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Select Property
          </label>
          <select
            className="hilton-select w-full"
            value={details.property}
            onChange={(e) => onUpdate('property', e.target.value)}
          >
            <option value="">Select a Property</option>
            {Object.entries(
              filteredProperties.reduce((acc, property) => {
                if (!acc[property.region]) acc[property.region] = [];
                acc[property.region].push(property);
                return acc;
              }, {} as Record<string, typeof filteredProperties>)
            ).map(([region, properties]) => (
              <optgroup key={region} label={region}>
                {properties.map((property) => (
                  <option key={`${property.id}-${property.city}`} value={property.id}>
                    {property.name} - {property.city}, {property.state || property.country}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            className="hilton-input w-full"
            value={details.checkIn}
            onChange={(e) => onUpdate('checkIn', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            className="hilton-input w-full"
            value={details.checkOut}
            min={details.checkIn}
            onChange={(e) => onUpdate('checkOut', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Number of Rooms
          </label>
          <input
            type="number"
            min="1"
            className="hilton-input w-full"
            value={details.rooms}
            onChange={(e) => onUpdate('rooms', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Hilton Honors Points
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            className="hilton-input w-full"
            value={details.points}
            onChange={(e) => onUpdate('points', e.target.value)}
            placeholder="Enter points (optional)"
          />
        </div>
      </div>

      {selectedProperty && (
        <div className="mt-6 bg-gradient-to-br from-hilton-blue/5 to-hilton-blue/10 rounded-xl p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-hilton-blue" />
                    <h3 className="text-xl font-walbaum text-hilton-blue">
                      {selectedProperty.name}
                    </h3>
                  </div>
                  <p className="text-sm text-hilton-gray-600 mt-2">
                    {selectedProperty.address}, {selectedProperty.city}
                    {selectedProperty.state ? `, ${selectedProperty.state}` : ''}, {selectedProperty.country}
                  </p>
                </div>
              </div>
              <a
                href={getHotelUrl(selectedProperty)}
                target="_blank"
                rel="noopener noreferrer"
                className="hilton-button inline-flex items-center gap-2"
              >
                Visit Hotel Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-hilton-gray-700">Rate Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-hilton-gray-600">Base Rate (per night):</span>
                      <span className="font-medium">${selectedProperty.basePrice.toFixed(2)}</span>
                    </div>
                    
                    {(() => {
                      const month = details.checkIn ? new Date(details.checkIn).getMonth() : -1;
                      let seasonalRate = 1;
                      let seasonName = '';
                      
                      if (month >= 5 && month <= 7) {
                        seasonalRate = SEASONAL_RATES.peak;
                        seasonName = 'Peak Season';
                      } else if (month >= 2 && month <= 4) {
                        seasonalRate = SEASONAL_RATES.shoulder;
                        seasonName = 'Shoulder Season';
                      } else if (month >= 11 || month <= 1) {
                        seasonalRate = SEASONAL_RATES.offPeak;
                        seasonName = 'Off-Peak Season';
                      }

                      return month !== -1 && (
                        <div className="flex justify-between">
                          <span className="text-hilton-gray-600">{seasonName} Adjustment:</span>
                          <span className={`font-medium ${seasonalRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {seasonalRate > 1 ? '+' : '-'}{Math.abs((1 - seasonalRate) * 100).toFixed(0)}%
                          </span>
                        </div>
                      );
                    })()}

                    {(() => {
                      if (!details.checkIn || !details.checkOut) return null;
                      const nights = Math.ceil((new Date(details.checkOut).getTime() - new Date(details.checkIn).getTime()) / (1000 * 60 * 60 * 24));
                      let discount = 0;
                      
                      if (nights >= 7) discount = 0.15;
                      else if (nights >= 4) discount = 0.10;
                      else if (nights >= 2) discount = 0.05;

                      return discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{nights}+ Nights Discount:</span>
                          <span className="font-medium">-{(discount * 100).toFixed(0)}%</span>
                        </div>
                      );
                    })()}

                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-hilton-gray-600">Resort Fee:</span>
                        <span className="font-medium">${HOTEL_FEES.resortFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hilton-gray-600">Parking:</span>
                        <span className="font-medium">${HOTEL_FEES.parkingFee.toFixed(2)}</span>
                      </div>
                      {selectedProperty.city && ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'].includes(selectedProperty.city) && (
                        <div className="flex justify-between">
                          <span className="text-hilton-gray-600">Destination Fee:</span>
                          <span className="font-medium">${HOTEL_FEES.destinationFee.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-hilton-gray-600">Room Tax:</span>
                        <span className="font-medium">{(TAX_RATES.roomTax * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hilton-gray-600">Occupancy Tax:</span>
                        <span className="font-medium">{(TAX_RATES.occupancyTax * 100).toFixed(1)}%</span>
                      </div>
                      {selectedProperty.city && ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'].includes(selectedProperty.city) && (
                        <div className="flex justify-between">
                          <span className="text-hilton-gray-600">City Tax:</span>
                          <span className="font-medium">{(TAX_RATES.cityTax * 100).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Total Cost</p>
                    <p className="text-2xl font-bold text-hilton-gray-900">
                      ${calculateCashPrice(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms).toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      All taxes & fees included
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Points Value</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${calculatePointsSavings(details.points, calculateCashPrice(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms)).toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      Using Hilton Points
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-hilton-gray-600 mb-1">Final Cost</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(calculateCashPrice(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms) - 
                         calculatePointsSavings(details.points, calculateCashPrice(selectedProperty.basePrice, details.checkIn, details.checkOut, details.rooms))).toFixed(2)}
                    </p>
                    <p className="text-xs text-hilton-gray-500 mt-1">
                      After points savings
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-hilton-gray-700 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <a
                      key={`${selectedProperty.id}-${amenity}-${index}`}
                      href={getAmenityUrl(selectedProperty, amenity)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-hilton-gray-50 hover:bg-hilton-gray-100 transition-colors group"
                    >
                      <span className="text-hilton-blue">
                        {amenityIcons[amenity] || <Star className="w-5 h-5" />}
                      </span>
                      <span className="text-hilton-gray-700 font-medium group-hover:text-hilton-blue transition-colors">
                        {amenity}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}