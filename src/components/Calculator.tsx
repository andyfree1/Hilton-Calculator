import React, { useState, useCallback } from 'react';
import { expandedHiltonProperties } from '../data/hiltonProperties';
import HotelSelector from './HotelSelector';
import FlightSelector from './FlightSelector';
import CarRentalSelector from './CarRentalSelector';
import EntertainmentSelector from './EntertainmentSelector';
import TotalCostSummary from './TotalCostSummary';
import DiamondBenefits from './DiamondBenefits';
import PricingSources from './PricingSources';

export default function Calculator() {
  const [hotelDetails, setHotelDetails] = useState({
    brand: '',
    property: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    points: ''
  });

  const [flightDetails, setFlightDetails] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    flightClass: 'economy',
    passengers: 1,
    tripType: 'roundTrip' as const,
    flightType: 'nonStop' as const
  });

  const [carRental, setCarRental] = useState({
    company: '',
    category: '',
    days: 0
  });

  const [entertainment, setEntertainment] = useState({
    city: '',
    selectedEvents: [] as string[],
    quantity: {} as Record<string, number>
  });

  const [costs, setCosts] = useState({
    hotel: { cashPrice: 0, pointsSavings: 0 },
    flight: { cashPrice: 0, pointsSavings: 0 },
    carRental: { cashPrice: 0, pointsSavings: 0 },
    entertainment: { cashPrice: 0, pointsSavings: 0 }
  });

  const handleHotelUpdate = useCallback((field: string, value: string | number) => {
    setHotelDetails(prev => ({ ...prev, [field]: value }));
    if (field === 'property') {
      const selectedProperty = expandedHiltonProperties.find(p => p.id === value);
      setEntertainment(prev => ({ ...prev, city: selectedProperty?.city || '' }));
    }
  }, []);

  const handleFlightUpdate = useCallback((field: string, value: string | number) => {
    setFlightDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCarRentalUpdate = useCallback((field: string, value: string | number) => {
    setCarRental(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEntertainmentUpdate = useCallback((field: string, value: any) => {
    setEntertainment(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleHotelCostUpdate = useCallback((newCost: { cashPrice: number; pointsSavings: number }) => {
    setCosts(prev => ({ ...prev, hotel: newCost }));
  }, []);

  const handleFlightCostUpdate = useCallback((newCost: { cashPrice: number; pointsSavings: number }) => {
    setCosts(prev => ({ ...prev, flight: newCost }));
  }, []);

  const handleCarRentalCostUpdate = useCallback((newCost: { cashPrice: number; pointsSavings: number }) => {
    setCosts(prev => ({ ...prev, carRental: newCost }));
  }, []);

  const handleEntertainmentCostUpdate = useCallback((newCost: { cashPrice: number; pointsSavings: number }) => {
    setCosts(prev => ({ ...prev, entertainment: newCost }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <HotelSelector
              details={hotelDetails}
              onUpdate={handleHotelUpdate}
              onCostUpdate={handleHotelCostUpdate}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <FlightSelector
              details={flightDetails}
              onUpdate={handleFlightUpdate}
              onCostUpdate={handleFlightCostUpdate}
              points={Number(hotelDetails.points) || 0}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <CarRentalSelector
              details={carRental}
              onUpdate={handleCarRentalUpdate}
              onCostUpdate={handleCarRentalCostUpdate}
              points={Number(hotelDetails.points) || 0}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <EntertainmentSelector
              details={entertainment}
              onUpdate={handleEntertainmentUpdate}
              onCostUpdate={handleEntertainmentCostUpdate}
              points={Number(hotelDetails.points) || 0}
            />
          </div>

          <TotalCostSummary
            hotelCost={costs.hotel}
            flightCost={costs.flight}
            carRentalCost={costs.carRental}
            entertainmentCost={costs.entertainment}
          />

          <DiamondBenefits
            checkIn={hotelDetails.checkIn}
            checkOut={hotelDetails.checkOut}
            adults={flightDetails.passengers}
            points={Number(hotelDetails.points) || 0}
          />

          <PricingSources />
        </div>
      </div>
    </div>
  );
}