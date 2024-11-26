import React, { useEffect, useMemo } from 'react';
import { Car } from 'lucide-react';
import { carRentals } from '../data/travelData';

interface CarRentalSelectorProps {
  details: {
    company: string;
    category: string;
    days: number;
  };
  onUpdate: (field: string, value: string | number) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
  points: number;
}

export default function CarRentalSelector({ details, onUpdate, onCostUpdate, points }: CarRentalSelectorProps) {
  const costs = useMemo(() => {
    if (!details.company || details.days <= 0) return { cashPrice: 0, pointsSavings: 0 };

    const rental = carRentals.find(r => r.company === details.company);
    if (!rental) return { cashPrice: 0, pointsSavings: 0 };

    const categoryMultiplier = rental.categories[details.category as keyof typeof rental.categories] || 1;
    const dailyRate = rental.basePrice * categoryMultiplier;
    const baseRental = dailyRate * details.days;

    // Calculate fees and taxes
    const insuranceFee = 15 * details.days; // Daily insurance fee
    const airportFee = 25; // One-time airport fee
    const vehicleLicenseFee = 8.50;
    const facilityFee = 12;
    const totalFees = insuranceFee + airportFee + vehicleLicenseFee + facilityFee;

    // Apply length discounts
    let discount = 0;
    if (details.days >= 7) {
      discount = 0.15; // 15% off for weekly rentals
    } else if (details.days >= 3) {
      discount = 0.10; // 10% off for 3+ days
    }

    const discountedBase = baseRental * (1 - discount);
    const subtotal = discountedBase + totalFees;

    // Calculate taxes
    const salesTax = subtotal * 0.0825; // 8.25% sales tax
    const rentalTax = baseRental * 0.115; // 11.5% rental tax
    const totalTaxes = salesTax + rentalTax;

    const cashPrice = subtotal + totalTaxes;
    const pointsSavings = Math.min(points * 0.008, cashPrice * 0.5); // Max 50% of rental cost with points

    return {
      cashPrice: Math.round(cashPrice * 100) / 100,
      pointsSavings: Math.round(pointsSavings * 100) / 100,
      details: {
        baseRate: dailyRate,
        discount,
        fees: totalFees,
        taxes: totalTaxes
      }
    };
  }, [details, points]);

  useEffect(() => {
    onCostUpdate(costs);
  }, [costs, onCostUpdate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Car Rental</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Rental Company
          </label>
          <select
            className="hilton-select w-full"
            value={details.company}
            onChange={(e) => onUpdate('company', e.target.value)}
          >
            <option value="">Select Company</option>
            {carRentals.map((rental) => (
              <option key={rental.company} value={rental.company}>
                {rental.company}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Car Category
          </label>
          <select
            className="hilton-select w-full"
            value={details.category}
            onChange={(e) => onUpdate('category', e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="economy">Economy</option>
            <option value="midsize">Midsize</option>
            <option value="luxury">Luxury</option>
            <option value="suv">SUV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-hilton-gray-700 mb-2">
            Rental Days
          </label>
          <input
            type="number"
            min="0"
            className="hilton-input w-full"
            value={details.days}
            onChange={(e) => onUpdate('days', Number(e.target.value))}
          />
        </div>
      </div>

      {details.company && details.category && details.days > 0 && (
        <div className="mt-6 bg-hilton-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-hilton-gray-700">Rate Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-hilton-gray-600">Base Rate (per day):</span>
                  <span className="font-medium">${costs.details?.baseRate.toFixed(2)}</span>
                </div>

                {costs.details?.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Length Discount:</span>
                    <span className="font-medium">-{(costs.details.discount * 100)}%</span>
                  </div>
                )}

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