import React, { useEffect, useMemo } from 'react';
import { Plane } from 'lucide-react';
import { majorAirports, flightClasses } from '../data/travelData';

interface FlightSelectorProps {
  details: {
    origin: string;
    destination: string;
    departDate: string;
    returnDate: string;
    flightClass: string;
    passengers: number;
    tripType: 'oneWay' | 'roundTrip';
    flightType: 'nonStop' | 'layover';
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
  points: number;
}

const BASE_FLIGHT_COST = {
  domestic: 250,
  international: 800
};

const FEES = {
  segment: 4.50,          // Per flight segment
  security: 5.60,         // TSA fee per passenger per direction
  facilityCharge: 4.50,   // Passenger facility charge per airport
  immigration: 7.00,      // Immigration fee (international only)
  customs: 6.75,          // Customs fee (international only)
  carrierSurcharge: 5.50, // Carrier-imposed surcharge per direction
  fuelSurcharge: 25.00,   // Fuel surcharge per direction
  serviceFee: 12.50,      // Service fee per ticket
};

const TAX_RATES = {
  domestic: 0.075,        // 7.5% domestic ticket tax
  international: 0.18,    // International taxes and fees percentage
  airport: 0.045,        // Airport tax
  segment: 0.025,        // Segment tax
};

const PEAK_DATES = {
  summer: { start: 5, end: 7 },     // June-August
  winter: { start: 11, end: 0 },    // December-January
  spring: { start: 2, end: 3 }      // March-April
};

function FlightSelector({ details, onUpdate, onCostUpdate, points }: FlightSelectorProps) {
  const costs = useMemo(() => {
    if (!details?.origin || !details?.destination) return { cashPrice: 0, pointsSavings: 0 };

    const originAirport = majorAirports.find(a => a.code === details.origin);
    const destAirport = majorAirports.find(a => a.code === details.destination);
    
    if (!originAirport || !destAirport) return { cashPrice: 0, pointsSavings: 0 };

    const isInternational = originAirport.country !== destAirport.country;
    const basePrice = isInternational ? BASE_FLIGHT_COST.international : BASE_FLIGHT_COST.domestic;
    
    const selectedClass = flightClasses.find(fc => fc.id === details.flightClass);
    const classMultiplier = selectedClass?.multiplier || 1;
    
    const tripMultiplier = details.tripType === 'roundTrip' ? 2 : 1;
    const layoverDiscount = details.flightType === 'layover' ? 0.8 : 1;
    
    // Base fare calculation
    const baseFare = basePrice * classMultiplier * details.passengers * tripMultiplier * layoverDiscount;

    // Peak season multiplier
    const departDate = details.departDate ? new Date(details.departDate) : new Date();
    const month = departDate.getMonth();
    let seasonalMultiplier = 1;

    if ((month >= PEAK_DATES.summer.start && month <= PEAK_DATES.summer.end) ||
        (month >= PEAK_DATES.winter.start || month <= PEAK_DATES.winter.end)) {
      seasonalMultiplier = 1.3; // 30% premium for peak seasons
    } else if (month >= PEAK_DATES.spring.start && month <= PEAK_DATES.spring.end) {
      seasonalMultiplier = 1.2; // 20% premium for spring break
    }

    const seasonalFare = baseFare * seasonalMultiplier;

    // Advance purchase discount
    const daysUntilFlight = Math.ceil((departDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const advancePurchaseDiscount = daysUntilFlight > 21 ? 0.85 : 
                                   daysUntilFlight > 14 ? 0.9 : 
                                   daysUntilFlight > 7 ? 0.95 : 1;

    const discountedFare = seasonalFare * advancePurchaseDiscount;

    // Fees calculation
    const segmentFees = FEES.segment * (details.flightType === 'layover' ? 2 : 1) * tripMultiplier;
    const securityFees = FEES.security * details.passengers * tripMultiplier;
    const facilityFees = FEES.facilityCharge * 2 * tripMultiplier; // Both airports
    const carrierFees = FEES.carrierSurcharge * tripMultiplier;
    const fuelSurcharge = FEES.fuelSurcharge * tripMultiplier;
    const serviceFee = FEES.serviceFee * details.passengers;

    // International specific fees
    const internationalFees = isInternational ? 
      (FEES.immigration + FEES.customs) * details.passengers * tripMultiplier : 0;

    const totalFees = segmentFees + securityFees + facilityFees + carrierFees + 
                     fuelSurcharge + serviceFee + internationalFees;

    // Tax calculations
    const taxRate = isInternational ? TAX_RATES.international : TAX_RATES.domestic;
    const airportTax = discountedFare * TAX_RATES.airport;
    const segmentTax = discountedFare * TAX_RATES.segment;
    const ticketTax = discountedFare * taxRate;

    const totalTaxes = airportTax + segmentTax + ticketTax;

    // Total calculation
    const cashPrice = discountedFare + totalFees + totalTaxes;

    // Points calculation (max 70% of flight cost can be covered by points)
    const pointsSavings = Math.min(points * 0.01, cashPrice * 0.7);

    return { 
      cashPrice: Math.round(cashPrice * 100) / 100,
      pointsSavings: Math.round(pointsSavings * 100) / 100,
      details: {
        baseFare: discountedFare,
        fees: totalFees,
        taxes: totalTaxes,
        seasonal: seasonalMultiplier,
        advance: advancePurchaseDiscount
      }
    };
  }, [details, points]);

  useEffect(() => {
    onCostUpdate(costs);
  }, [costs, onCostUpdate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Flight Selection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Departing Airport
          </label>
          <select
            className="hilton-select w-full"
            value={details.origin}
            onChange={(e) => onUpdate('origin', e.target.value)}
          >
            <option value="">Select Airport</option>
            {majorAirports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Destination Airport
          </label>
          <select
            className="hilton-select w-full"
            value={details.destination}
            onChange={(e) => onUpdate('destination', e.target.value)}
          >
            <option value="">Select Airport</option>
            {majorAirports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code}) - {airport.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Departure Date
          </label>
          <input
            type="date"
            className="hilton-input w-full"
            value={details.departDate}
            onChange={(e) => onUpdate('departDate', e.target.value)}
          />
        </div>

        {details.tripType === 'roundTrip' && (
          <div>
            <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
              Return Date
            </label>
            <input
              type="date"
              className="hilton-input w-full"
              value={details.returnDate}
              min={details.departDate}
              onChange={(e) => onUpdate('returnDate', e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Class
          </label>
          <select
            className="hilton-select w-full"
            value={details.flightClass}
            onChange={(e) => onUpdate('flightClass', e.target.value)}
          >
            {flightClasses.map((fc) => (
              <option key={fc.id} value={fc.id}>
                {fc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Passengers
          </label>
          <input
            type="number"
            min="1"
            className="hilton-input w-full"
            value={details.passengers}
            onChange={(e) => onUpdate('passengers', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Trip Type
          </label>
          <select
            className="hilton-select w-full"
            value={details.tripType}
            onChange={(e) => onUpdate('tripType', e.target.value as 'oneWay' | 'roundTrip')}
          >
            <option value="roundTrip">Round Trip</option>
            <option value="oneWay">One Way</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Flight Type
          </label>
          <select
            className="hilton-select w-full"
            value={details.flightType}
            onChange={(e) => onUpdate('flightType', e.target.value as 'nonStop' | 'layover')}
          >
            <option value="nonStop">Non-Stop</option>
            <option value="layover">Including Layovers</option>
          </select>
        </div>
      </div>

      {(details.origin && details.destination) && (
        <div className="mt-6 bg-hilton-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-hilton-gray-700">Flight Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-hilton-gray-600">Base Fare:</span>
                  <span className="font-medium">${costs.details?.baseFare.toFixed(2)}</span>
                </div>

                {/* Seasonal and Advance Purchase Adjustments */}
                {costs.details?.seasonal !== 1 && (
                  <div className="flex justify-between text-red-600">
                    <span>Peak Season Adjustment:</span>
                    <span className="font-medium">
                      +{((costs.details.seasonal - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}

                {costs.details?.advance !== 1 && (
                  <div className="flex justify-between text-green-600">
                    <span>Advance Purchase Discount:</span>
                    <span className="font-medium">
                      -{((1 - costs.details.advance) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}

                {/* Fees Breakdown */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-hilton-gray-600">Fees & Surcharges:</span>
                    <span className="font-medium">${costs.details?.fees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-hilton-gray-600">Taxes:</span>
                    <span className="font-medium">${costs.details?.taxes.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-hilton-gray-600 mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-hilton-gray-900">
                  ${costs.cashPrice.toFixed(2)}
                </p>
                <p className="text-xs text-hilton-gray-500 mt-1">
                  All taxes & fees included
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-hilton-gray-600 mb-1">Points Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${costs.pointsSavings.toFixed(2)}
                </p>
                <p className="text-xs text-hilton-gray-500 mt-1">
                  Using Hilton Points
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-hilton-gray-600 mb-1">Final Cost</p>
                <p className="text-2xl font-bold text-green-600">
                  ${(costs.cashPrice - costs.pointsSavings).toFixed(2)}
                </p>
                <p className="text-xs text-hilton-gray-500 mt-1">
                  After points savings
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightSelector;