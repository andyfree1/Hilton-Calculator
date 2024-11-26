import React from 'react';
import { DollarSign } from 'lucide-react';

interface TotalCostSummaryProps {
  hotelCost: {
    cashPrice: number;
    pointsSavings: number;
  };
  flightCost: {
    cashPrice: number;
    pointsSavings: number;
  };
  carRentalCost: {
    cashPrice: number;
    pointsSavings: number;
  };
  entertainmentCost: {
    cashPrice: number;
    pointsSavings: number;
  };
}

export default function TotalCostSummary({ 
  hotelCost, 
  flightCost, 
  carRentalCost,
  entertainmentCost 
}: TotalCostSummaryProps) {
  const totalCashPrice = hotelCost.cashPrice + 
                        flightCost.cashPrice + 
                        carRentalCost.cashPrice +
                        entertainmentCost.cashPrice;
                        
  const totalPointsSavings = hotelCost.pointsSavings + 
                            flightCost.pointsSavings + 
                            carRentalCost.pointsSavings +
                            entertainmentCost.pointsSavings;
                            
  const finalCost = totalCashPrice - totalPointsSavings;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Total Trip Cost Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Hotel Stay</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Cash Price:</span>
              <span className="font-semibold">${hotelCost.cashPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-300">
              <span>Points Savings:</span>
              <span className="font-semibold">-${hotelCost.pointsSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Flights</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Cash Price:</span>
              <span className="font-semibold">${flightCost.cashPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-300">
              <span>Points Savings:</span>
              <span className="font-semibold">-${flightCost.pointsSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Car Rental</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Cash Price:</span>
              <span className="font-semibold">${carRentalCost.cashPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-300">
              <span>Points Savings:</span>
              <span className="font-semibold">-${carRentalCost.pointsSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Entertainment</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Cash Price:</span>
              <span className="font-semibold">${entertainmentCost.cashPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-300">
              <span>Points Savings:</span>
              <span className="font-semibold">-${entertainmentCost.pointsSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
          <div className="text-center">
            <p className="text-white/80 mb-1">Total Cash Price</p>
            <p className="text-3xl font-bold">${totalCashPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 mb-1">Total Points Value</p>
            <p className="text-3xl font-bold text-green-300">${totalPointsSavings.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 mb-1">Final Cost</p>
            <p className="text-3xl font-bold text-yellow-300">${finalCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-white/70">
          <p>* Points values are calculated based on current Hilton Honors redemption rates</p>
          <p>* Entertainment discounts vary by venue and event type</p>
        </div>
      </div>
    </div>
  );
}