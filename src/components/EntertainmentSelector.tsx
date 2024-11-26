import React, { useEffect, useMemo } from 'react';
import { Ticket, ExternalLink } from 'lucide-react';
import { entertainmentByCity } from '../data/entertainmentData';

interface EntertainmentSelectorProps {
  details: {
    city: string;
    selectedEvents: string[];
    quantity: Record<string, number>;
  };
  onUpdate: (field: string, value: any) => void;
  onCostUpdate: (cost: { cashPrice: number; pointsSavings: number }) => void;
  points: number;
}

export default function EntertainmentSelector({
  details,
  onUpdate,
  onCostUpdate,
  points
}: EntertainmentSelectorProps) {
  const availableEvents = useMemo(() => {
    return details.city ? entertainmentByCity[details.city] || [] : [];
  }, [details.city]);

  const eventsByCategory = useMemo(() => {
    return availableEvents.reduce((acc, event) => {
      if (!acc[event.category]) {
        acc[event.category] = [];
      }
      acc[event.category].push(event);
      return acc;
    }, {} as Record<string, typeof availableEvents>);
  }, [availableEvents]);

  const costs = useMemo(() => {
    if (!details.selectedEvents.length) return { cashPrice: 0, pointsSavings: 0 };

    let totalCash = 0;
    let totalSavings = 0;

    details.selectedEvents.forEach(eventId => {
      const event = availableEvents.find(e => e.id === eventId);
      if (!event) return;

      const quantity = details.quantity[eventId] || 1;
      const eventTotal = event.basePrice * quantity;
      totalCash += eventTotal;

      if (event.pointsEligible && points > 0) {
        const maxDiscount = eventTotal * event.maxPointsDiscount;
        const pointsValue = points * 0.005;
        totalSavings += Math.min(maxDiscount, pointsValue);
      }
    });

    return {
      cashPrice: Math.round(totalCash * 100) / 100,
      pointsSavings: Math.round(totalSavings * 100) / 100
    };
  }, [details.selectedEvents, details.quantity, availableEvents, points]);

  useEffect(() => {
    onCostUpdate(costs);
  }, [costs, onCostUpdate]);

  const handleEventToggle = (eventId: string) => {
    const newEvents = details.selectedEvents.includes(eventId)
      ? details.selectedEvents.filter(id => id !== eventId)
      : [...details.selectedEvents, eventId];
    
    onUpdate('selectedEvents', newEvents);
  };

  const handleQuantityChange = (eventId: string, quantity: number) => {
    onUpdate('quantity', {
      ...details.quantity,
      [eventId]: quantity
    });
  };

  if (!details.city) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a hotel to view available entertainment options for that location.
      </div>
    );
  }

  if (!availableEvents.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No entertainment options are currently available for this location.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="w-5 h-5 text-hilton-blue" />
        <h2 className="text-xl font-semibold text-hilton-blue">Entertainment & Activities in {details.city}</h2>
      </div>

      {Object.entries(eventsByCategory).map(([category, events]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium text-hilton-gray-700 border-b pb-2">{category}</h3>
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border transition-colors ${
                  details.selectedEvents.includes(event.id)
                    ? 'border-hilton-blue bg-hilton-blue/5'
                    : 'border-gray-200 hover:border-hilton-blue'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={details.selectedEvents.includes(event.id)}
                        onChange={() => handleEventToggle(event.id)}
                        className="rounded border-gray-300 text-hilton-blue focus:ring-hilton-blue"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{event.name}</h3>
                          <a
                            href={event.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-hilton-blue hover:text-hilton-blue/80"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-sm text-gray-500">{event.description}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hilton-blue/10 text-hilton-blue">
                            {event.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            at {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${event.basePrice}/person</p>
                      {event.pointsEligible && (
                        <p className="text-sm text-green-600">
                          Up to {(event.maxPointsDiscount * 100)}% with points
                        </p>
                      )}
                    </div>
                    
                    {details.selectedEvents.includes(event.id) && (
                      <div className="w-24">
                        <label className="sr-only">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={details.quantity[event.id] || 1}
                          onChange={(e) => handleQuantityChange(event.id, Number(e.target.value))}
                          className="hilton-input w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {details.selectedEvents.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-hilton-gray-50 p-4 rounded-lg">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Cost</p>
            <p className="text-2xl font-bold text-gray-900">
              ${costs.cashPrice.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Points Savings</p>
            <p className="text-2xl font-bold text-purple-600">
              ${costs.pointsSavings.toFixed(2)}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Final Cost</p>
            <p className="text-2xl font-bold text-green-600">
              ${(costs.cashPrice - costs.pointsSavings).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}