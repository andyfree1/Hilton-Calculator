import React, { useEffect, useMemo, useCallback } from 'react';
import { Car } from 'lucide-react';
import { rideShareTrips, diamondBenefits } from '../data/travelData';

interface RideShareSelectorProps {
  details: {
    type: string;
    estimatedMiles: number;
    estimatedMinutes: number;
    numberOfRides: number;
    timeOfDay: 'standard' | 'peak' | 'event';
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
  points: number;
}

export default function RideShareSelector({ details, onUpdate, onCostUpdate, points }: RideShareSelectorProps) {
  const costs = useMemo(() => {
    if (!details?.type || details.estimatedMiles <= 0) return { cashPrice: 0, pointsSavings: 0 };

    const service = rideShareTrips.find(r => r.type === details.type);
    if (!service) return { cashPrice: 0, pointsSavings: 0 };

    // Calculate base ride cost
    const baseCost = service.basePrice +
                    (service.pricePerMile * details.estimatedMiles) +
                    (service.pricePerMinute * details.estimatedMinutes);

    // Apply surge pricing
    const surgeMultiplier = service.surgeMultipliers[details.timeOfDay];
    const surgedCost = baseCost * surgeMultiplier;

    // Calculate total for all rides
    const totalCost = surgedCost * details.numberOfRides;

    // Calculate Hilton Honors points earned (3 points per $1 spent on Lyft)
    const pointsEarned = totalCost * diamondBenefits.lyftPartnership.pointsPerDollar;
    
    // Convert points to dollar value (standard Hilton points value)
    const pointsSavings = pointsEarned * 0.005;

    return {
      cashPrice: Math.round(totalCost * 100) / 100,
      pointsSavings: Math.round(pointsSavings * 100) / 100
    };
  }, [details]);

  const handleUpdate = useCallback((field: string, value: string | number) => {
    onUpdate(field, value);
  }, [onUpdate]);

  useEffect(() => {
    onCostUpdate(costs);
  }, [costs, onCostUpdate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Ride Share</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={details.type}
            onChange={(e) => handleUpdate('type', e.target.value)}
          >
            {rideShareTrips.map((service) => (
              <option key={service.type} value={service.type}>
                {service.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Miles
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={details.estimatedMiles}
            onChange={(e) => handleUpdate('estimatedMiles', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Minutes
          </label>
          <input
            type="number"
            min="0"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={details.estimatedMinutes}
            onChange={(e) => handleUpdate('estimatedMinutes', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rides
          </label>
          <input
            type="number"
            min="1"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={details.numberOfRides}
            onChange={(e) => handleUpdate('numberOfRides', Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time of Day
          </label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={details.timeOfDay}
            onChange={(e) => handleUpdate('timeOfDay', e.target.value as 'standard' | 'peak' | 'event')}
          >
            <option value="standard">Standard</option>
            <option value="peak">Peak Hours</option>
            <option value="event">Special Event</option>
          </select>
        </div>
      </div>

      {details.estimatedMiles > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Cost</p>
            <p className="text-2xl font-bold text-gray-900">
              ${costs.cashPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              For {details.numberOfRides} ride{details.numberOfRides !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Points Earned Value</p>
            <p className="text-2xl font-bold text-purple-600">
              ${costs.pointsSavings.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(costs.cashPrice * diamondBenefits.lyftPartnership.pointsPerDollar)} Hilton Points
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Net Cost</p>
            <p className="text-2xl font-bold text-green-600">
              ${(costs.cashPrice - costs.pointsSavings).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              After points value
            </p>
          </div>
        </div>
      )}
    </div>
  );
}