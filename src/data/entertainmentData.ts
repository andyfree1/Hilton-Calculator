import { Entertainment } from '../types';

export const entertainmentCategories = [
  'Show',
  'Concert',
  'Excursion',
  'Sports',
  'Other'
] as const;

export const entertainmentByCity: Record<string, Entertainment[]> = {
  'Las Vegas': [
    {
      id: 'cirque-o',
      name: 'Cirque du Soleil "O"',
      category: 'Show',
      basePrice: 159,
      location: 'Bellagio',
      pointsEligible: true,
      maxPointsDiscount: 0.5,
      description: 'Aquatic masterpiece at the Bellagio',
      bookingUrl: 'https://www.cirquedusoleil.com/o'
    },
    {
      id: 'cirque-mystere',
      name: 'Cirque du Soleil Mystère',
      category: 'Show',
      basePrice: 125,
      location: 'Treasure Island',
      pointsEligible: true,
      maxPointsDiscount: 0.5,
      description: 'Original Cirque show in Las Vegas',
      bookingUrl: 'https://www.cirquedusoleil.com/mystere'
    },
    {
      id: 'carrie-underwood',
      name: 'Carrie Underwood - REFLECTION',
      category: 'Concert',
      basePrice: 150,
      location: 'Resorts World Theatre',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Country music superstar residency',
      bookingUrl: 'https://www.rwlasvegas.com/entertainment/carrie-underwood/'
    },
    {
      id: 'penn-teller',
      name: 'Penn & Teller',
      category: 'Show',
      basePrice: 95,
      location: 'Rio All-Suite Hotel & Casino',
      pointsEligible: true,
      maxPointsDiscount: 0.45,
      description: 'World-famous magic show',
      bookingUrl: 'https://www.caesars.com/rio-las-vegas/shows/penn-and-teller'
    },
    {
      id: 'raiders-game',
      name: 'Las Vegas Raiders NFL Game',
      category: 'Sports',
      basePrice: 150,
      location: 'Allegiant Stadium',
      pointsEligible: true,
      maxPointsDiscount: 0.3,
      description: 'NFL football game',
      bookingUrl: 'https://www.raiders.com/tickets/'
    },
    {
      id: 'hoover-dam',
      name: 'Hoover Dam Tour',
      category: 'Excursion',
      basePrice: 55,
      location: 'Hoover Dam',
      pointsEligible: true,
      maxPointsDiscount: 0.6,
      description: 'Guided tour of the historic Hoover Dam',
      bookingUrl: 'https://www.usbr.gov/lc/hooverdam/service/tours.html'
    }
  ],
  'New York': [
    {
      id: 'broadway-lion-king',
      name: 'The Lion King on Broadway',
      category: 'Show',
      basePrice: 199,
      location: 'Minskoff Theatre',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Award-winning Broadway musical',
      bookingUrl: 'https://www.lionking.com/tickets'
    },
    {
      id: 'msg-concert',
      name: 'Billy Joel - Monthly Residency',
      category: 'Concert',
      basePrice: 150,
      location: 'Madison Square Garden',
      pointsEligible: true,
      maxPointsDiscount: 0.3,
      description: 'Piano Man live at MSG',
      bookingUrl: 'https://www.msg.com/billy-joel'
    },
    {
      id: 'nba-knicks',
      name: 'New York Knicks Basketball',
      category: 'Sports',
      basePrice: 125,
      location: 'Madison Square Garden',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'NBA basketball game',
      bookingUrl: 'https://www.nba.com/knicks/tickets'
    },
    {
      id: 'met-museum',
      name: 'Metropolitan Museum of Art',
      category: 'Excursion',
      basePrice: 25,
      location: 'Upper East Side',
      pointsEligible: true,
      maxPointsDiscount: 0.5,
      description: 'World-renowned art museum',
      bookingUrl: 'https://www.metmuseum.org/visit'
    },
    {
      id: 'top-of-rock',
      name: 'Top of the Rock Observation Deck',
      category: 'Excursion',
      basePrice: 40,
      location: 'Rockefeller Center',
      pointsEligible: true,
      maxPointsDiscount: 0.45,
      description: 'Panoramic views of Manhattan',
      bookingUrl: 'https://www.rockefellercenter.com/tickets'
    }
  ],
  'Orlando': [
    {
      id: 'universal-tickets',
      name: 'Universal Studios Tickets',
      category: 'Excursion',
      basePrice: 109,
      location: 'Universal Orlando Resort',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'One-day park admission',
      bookingUrl: 'https://www.universalorlando.com/tickets'
    },
    {
      id: 'disney-world',
      name: 'Disney World Magic Kingdom',
      category: 'Excursion',
      basePrice: 129,
      location: 'Walt Disney World Resort',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'One-day park admission',
      bookingUrl: 'https://disneyworld.disney.go.com/tickets/'
    },
    {
      id: 'kennedy-space',
      name: 'Kennedy Space Center',
      category: 'Excursion',
      basePrice: 75,
      location: 'Cape Canaveral',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Space exploration center tour',
      bookingUrl: 'https://www.kennedyspacecenter.com/'
    },
    {
      id: 'orlando-magic',
      name: 'Orlando Magic Basketball',
      category: 'Sports',
      basePrice: 85,
      location: 'Amway Center',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'NBA basketball game',
      bookingUrl: 'https://www.nba.com/magic/tickets'
    }
  ],
  'Miami': [
    {
      id: 'heat-game',
      name: 'Miami Heat Basketball',
      category: 'Sports',
      basePrice: 95,
      location: 'FTX Arena',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'NBA basketball game',
      bookingUrl: 'https://www.nba.com/heat/tickets'
    },
    {
      id: 'vizcaya-museum',
      name: 'Vizcaya Museum & Gardens',
      category: 'Excursion',
      basePrice: 25,
      location: 'Coconut Grove',
      pointsEligible: true,
      maxPointsDiscount: 0.5,
      description: 'Historic estate and gardens',
      bookingUrl: 'https://vizcaya.org/visit/'
    },
    {
      id: 'everglades-tour',
      name: 'Everglades Airboat Tour',
      category: 'Excursion',
      basePrice: 65,
      location: 'Everglades National Park',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Guided tour of the Everglades',
      bookingUrl: 'https://www.evergladestours.com'
    },
    {
      id: 'miami-dolphins',
      name: 'Miami Dolphins Football',
      category: 'Sports',
      basePrice: 85,
      location: 'Hard Rock Stadium',
      pointsEligible: true,
      maxPointsDiscount: 0.3,
      description: 'NFL football game',
      bookingUrl: 'https://www.miamidolphins.com/tickets/'
    }
  ],
  'Los Angeles': [
    {
      id: 'universal-hollywood',
      name: 'Universal Studios Hollywood',
      category: 'Excursion',
      basePrice: 109,
      location: 'Universal City',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'Movie-based theme park',
      bookingUrl: 'https://www.universalstudioshollywood.com/'
    },
    {
      id: 'lakers-game',
      name: 'Los Angeles Lakers Basketball',
      category: 'Sports',
      basePrice: 150,
      location: 'Crypto.com Arena',
      pointsEligible: true,
      maxPointsDiscount: 0.3,
      description: 'NBA basketball game',
      bookingUrl: 'https://www.nba.com/lakers/tickets'
    },
    {
      id: 'hollywood-tour',
      name: 'Hollywood Celebrity Homes Tour',
      category: 'Excursion',
      basePrice: 55,
      location: 'Hollywood',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Guided tour of celebrity homes',
      bookingUrl: 'https://www.starlinetours.com/'
    },
    {
      id: 'disney-california',
      name: 'Disneyland California',
      category: 'Excursion',
      basePrice: 104,
      location: 'Anaheim',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'The original Disney theme park',
      bookingUrl: 'https://disneyland.disney.go.com/tickets/'
    },
    {
      id: 'dodgers-game',
      name: 'Los Angeles Dodgers Baseball',
      category: 'Sports',
      basePrice: 65,
      location: 'Dodger Stadium',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'MLB baseball game',
      bookingUrl: 'https://www.mlb.com/dodgers/tickets'
    }
  ],
  'Chicago': [
    {
      id: 'blue-man-chicago',
      name: 'Blue Man Group',
      category: 'Show',
      basePrice: 89,
      location: 'Briar Street Theatre',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Unique theatrical experience',
      bookingUrl: 'https://www.blueman.com/chicago'
    },
    {
      id: 'chicago-symphony',
      name: 'Chicago Symphony Orchestra',
      category: 'Concert',
      basePrice: 95,
      location: 'Symphony Center',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'World-class orchestra performance',
      bookingUrl: 'https://cso.org/'
    },
    {
      id: 'bulls-game',
      name: 'Chicago Bulls Basketball',
      category: 'Sports',
      basePrice: 85,
      location: 'United Center',
      pointsEligible: true,
      maxPointsDiscount: 0.3,
      description: 'NBA basketball game',
      bookingUrl: 'https://www.nba.com/bulls/tickets'
    },
    {
      id: 'architecture-tour',
      name: 'Architecture River Cruise',
      category: 'Excursion',
      basePrice: 45,
      location: 'Chicago River',
      pointsEligible: true,
      maxPointsDiscount: 0.4,
      description: 'Guided architectural boat tour',
      bookingUrl: 'https://www.architecture.org/tours'
    },
    {
      id: 'cubs-game',
      name: 'Chicago Cubs Baseball',
      category: 'Sports',
      basePrice: 65,
      location: 'Wrigley Field',
      pointsEligible: true,
      maxPointsDiscount: 0.35,
      description: 'MLB baseball game at historic Wrigley Field',
      bookingUrl: 'https://www.mlb.com/cubs/tickets'
    }
  ]
};