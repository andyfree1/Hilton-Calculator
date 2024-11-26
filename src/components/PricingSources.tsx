import React from 'react';
import { Link, ExternalLink } from 'lucide-react';

export default function PricingSources() {
  const sources = [
    {
      category: 'Hotel Rates & Availability',
      links: [
        { name: 'Hilton.com Official', url: 'https://www.hilton.com' },
        { name: 'Hilton Honors App', url: 'https://www.hilton.com/en/hilton-honors/mobile-app/' },
        { name: 'Hotels.com', url: 'https://www.hotels.com' },
        { name: 'Booking.com', url: 'https://www.booking.com' },
        { name: 'Expedia', url: 'https://www.expedia.com' }
      ]
    },
    {
      category: 'Flights',
      links: [
        { name: 'Google Flights', url: 'https://www.google.com/flights' },
        { name: 'Hilton Travel Portal', url: 'https://travel.hilton.com' },
        { name: 'Kayak', url: 'https://www.kayak.com' },
        { name: 'Skyscanner', url: 'https://www.skyscanner.com' },
        { name: 'ITA Matrix', url: 'https://matrix.itasoftware.com' }
      ]
    },
    {
      category: 'Car Rentals',
      links: [
        { name: 'Hertz - Hilton Partnership', url: 'https://www.hertz.com/hilton' },
        { name: 'Enterprise', url: 'https://www.enterprise.com' },
        { name: 'Avis', url: 'https://www.avis.com' },
        { name: 'AutoSlash', url: 'https://www.autoslash.com' }
      ]
    },
    {
      category: 'Ride Share',
      links: [
        { name: 'Lyft - Hilton Partnership', url: 'https://www.lyft.com/hilton' },
        { name: 'Uber', url: 'https://www.uber.com' },
        { name: 'RideGuru', url: 'https://ride.guru' },
        { name: 'Fare Estimator', url: 'https://www.uber.com/us/en/price-estimate/' }
      ]
    },
    {
      category: 'Loyalty Programs & Points',
      links: [
        { name: 'Hilton Honors', url: 'https://www.hilton.com/en/hilton-honors/' },
        { name: 'The Points Guy', url: 'https://thepointsguy.com' },
        { name: 'Award Wallet', url: 'https://awardwallet.com' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Link className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Pricing Data Sources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sources.map((source) => (
          <div key={source.category} className="space-y-3">
            <h3 className="font-medium text-gray-700 border-b pb-2">{source.category}</h3>
            <ul className="space-y-2">
              {source.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          All pricing data is updated in real-time through official APIs and partnerships. Ride share estimates include Lyft partnership benefits with Hilton Honors points earning potential.
        </p>
      </div>
    </div>
  );
}