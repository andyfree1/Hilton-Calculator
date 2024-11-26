import React from 'react';
import { hiltonLocations } from '../data/hiltonLocations';

interface LocationSelectorProps {
  brandId: string;
  value: string;
  onChange: (value: string) => void;
}

export default function LocationSelector({ brandId, value, onChange }: LocationSelectorProps) {
  const locations = hiltonLocations[brandId] || [];
  const groupedLocations = locations.reduce((acc, loc) => {
    const region = loc.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(loc);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Location
      </label>
      <select
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Location</option>
        {Object.entries(groupedLocations).map(([region, locs]) => (
          <optgroup key={region} label={region}>
            {locs.map((loc, idx) => (
              <option
                key={`${loc.city}-${idx}`}
                value={`${loc.city}${loc.state ? `, ${loc.state}` : ''}, ${loc.country}`}
              >
                {loc.city}{loc.state ? `, ${loc.state}` : ''}, {loc.country}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}