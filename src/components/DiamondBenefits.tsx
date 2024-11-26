import React from 'react';
import { Diamond } from 'lucide-react';
import { diamondBenefits } from '../data/travelData';

interface DiamondBenefitsProps {
  checkIn?: string;
  checkOut?: string;
  adults: number;
  points: number;
}

export default function DiamondBenefits({ checkIn, checkOut, adults, points }: DiamondBenefitsProps) {
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const calculateBenefitsValue = () => {
    // Daily Benefits
    const breakfastValue = diamondBenefits.breakfast.value * Math.min(2, adults) * nights;
    const wifiValue = diamondBenefits.wifi.value * nights;
    const waterValue = diamondBenefits.bottledWater.value * nights;
    const loungeValue = diamondBenefits.executiveLounge.value * nights;
    
    // Per Stay Benefits
    const roomUpgradeValue = diamondBenefits.roomUpgrade.value * nights;
    const lateCheckoutValue = nights > 0 ? diamondBenefits.latecheckout.value : 0;
    const earlyCheckinValue = nights > 0 ? diamondBenefits.earlyCheckin.value : 0;
    const statusValue = nights > 0 ? diamondBenefits.diamondStatus.value : 0;
    
    // Points Benefits
    const basePointsValue = points * diamondBenefits.pointsValue;
    const bonusPointsValue = points * diamondBenefits.pointsValue * (diamondBenefits.pointsBonus.multiplier - 1);

    // Calculate totals by category
    const dailyBenefits = breakfastValue + wifiValue + waterValue + loungeValue;
    const stayBenefits = roomUpgradeValue + lateCheckoutValue + earlyCheckinValue + statusValue;
    const pointsBenefits = basePointsValue + bonusPointsValue;

    return {
      daily: {
        breakfast: breakfastValue,
        wifi: wifiValue,
        water: waterValue,
        lounge: loungeValue,
        total: dailyBenefits
      },
      stay: {
        upgrade: roomUpgradeValue,
        lateCheckout: lateCheckoutValue,
        earlyCheckin: earlyCheckinValue,
        status: statusValue,
        total: stayBenefits
      },
      points: {
        base: basePointsValue,
        bonus: bonusPointsValue,
        total: pointsBenefits
      },
      total: dailyBenefits + stayBenefits + pointsBenefits
    };
  };

  const benefits = calculateBenefitsValue();

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Diamond className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Hilton Honors Benefits Value</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-3">Daily Benefits</h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Breakfast ({Math.min(2, adults)} guests)</span>
              <span className="font-semibold text-purple-600">${benefits.daily.breakfast.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Premium WiFi</span>
              <span className="font-semibold text-purple-600">${benefits.daily.wifi.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Bottled Water</span>
              <span className="font-semibold text-purple-600">${benefits.daily.water.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Executive Lounge</span>
              <span className="font-semibold text-purple-600">${benefits.daily.lounge.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm font-medium pt-2 border-t">
              <span className="text-gray-700">Daily Total</span>
              <span className="text-purple-600">${benefits.daily.total.toFixed(2)}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-3">Stay Benefits</h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Room Upgrade</span>
              <span className="font-semibold text-purple-600">${benefits.stay.upgrade.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Late Checkout</span>
              <span className="font-semibold text-purple-600">${benefits.stay.lateCheckout.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Early Check-in</span>
              <span className="font-semibold text-purple-600">${benefits.stay.earlyCheckin.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Elite Status</span>
              <span className="font-semibold text-purple-600">${benefits.stay.status.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm font-medium pt-2 border-t">
              <span className="text-gray-700">Stay Total</span>
              <span className="text-purple-600">${benefits.stay.total.toFixed(2)}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-3">Points Benefits</h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Base Points Value</span>
              <span className="font-semibold text-purple-600">${benefits.points.base.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">Bonus Points (100%)</span>
              <span className="font-semibold text-purple-600">${benefits.points.bonus.toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-sm font-medium pt-2 border-t">
              <span className="text-gray-700">Points Total</span>
              <span className="text-purple-600">${benefits.points.total.toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-6 bg-purple-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Total Benefits Value</h3>
            <p className="text-3xl font-bold text-purple-600">${benefits.total.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Combined value of all Diamond benefits
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>* Benefits values are estimates based on average market rates and may vary by location</p>
        <p>* Space-available upgrades and lounge access are subject to availability</p>
      </div>
    </div>
  );
}