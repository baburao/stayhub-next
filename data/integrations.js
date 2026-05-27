import { integrationsAr } from './integrations.ar.js';

const integrationsList = [
  {
    slug: 'airbnb',
    name: 'Airbnb',
    tagline: "World's Largest Vacation Rental Platform",
    seoTitle: 'Airbnb Integration for Property Managers in Saudi Arabia | StayHub',
    metaDescription:
      "Connect your properties to Airbnb and manage listings, calendar, pricing, and reservations from one dashboard. StayHub's Airbnb integration keeps you in sync 24/7.",
    badge: 'OTA Integration',
    h1: 'Seamless Airbnb Integration',
    arabicH1: 'تكامل سلس مع Airbnb',
    subtitle:
      'Sync your Airbnb listings, manage bookings, and automate guest communication — all from StayHub.',
    color: '#FF5A5F',
    stats: [
      { value: '4M+', label: 'Active listings on Airbnb' },
      { value: '150+', label: 'Countries supported' },
      { value: '2-way', label: 'Real-time calendar sync' },
    ],
    painPoints: [
      {
        title: 'Double Bookings Nightmare',
        desc: 'Managing Airbnb manually alongside other channels leads to costly double bookings and angry guests.',
      },
      {
        title: 'Scattered Inbox',
        desc: 'Airbnb messages, Booking.com messages, WhatsApp — juggling multiple inboxes burns hours every day.',
      },
      {
        title: 'Manual Pricing Updates',
        desc: 'Updating rates across Airbnb and other platforms manually is error-prone and time-consuming.',
      },
    ],
    benefits: [
      {
        title: '2-Way Calendar Sync',
        desc: 'Real-time availability sync prevents double bookings across all your channels.',
      },
      {
        title: 'Unified Inbox',
        desc: 'All Airbnb guest messages in one place alongside messages from other platforms.',
      },
      {
        title: 'Dynamic Pricing',
        desc: 'Push optimized pricing to Airbnb automatically based on demand, seasonality, and events.',
      },
      {
        title: 'Automated Messaging',
        desc: 'Send pre-booking, check-in, and check-out messages to Airbnb guests automatically.',
      },
      {
        title: 'Review Management',
        desc: 'Get notified of new reviews and respond quickly to maintain your Airbnb rating.',
      },
      {
        title: 'Reservation Sync',
        desc: 'All Airbnb reservations appear instantly in your StayHub dashboard with guest details.',
      },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Your Account', desc: 'Link your Airbnb account to StayHub in 60 seconds.' },
      { step: 2, title: 'Sync Listings', desc: 'All your Airbnb listings are imported automatically.' },
      { step: 3, title: 'Real-Time Updates', desc: 'Calendar, pricing, and availability sync 24/7.' },
      {
        step: 4,
        title: 'Manage from One Place',
        desc: 'Handle Airbnb bookings alongside all other channels from StayHub.',
      },
    ],
    relatedIntegrations: ['booking-com', 'agoda', 'gathern'],
    faq: [
      {
        q: "How does StayHub's Airbnb integration work?",
        a: "StayHub connects to Airbnb via the official Channel Manager API. Once connected, your calendar, pricing, availability, and reservations sync in real-time, eliminating manual updates.",
      },
      {
        q: 'Will StayHub prevent double bookings with Airbnb?',
        a: 'Yes. StayHub syncs your calendar across all connected channels within seconds, making double bookings virtually impossible.',
      },
      {
        q: 'Can I manage Airbnb messages from StayHub?',
        a: "Yes. All Airbnb guest messages appear in StayHub's unified inbox alongside messages from Booking.com, Gathern, and other platforms.",
      },
      {
        q: 'Does StayHub support Airbnb dynamic pricing?',
        a: "Yes. StayHub's Revenue Engine can push dynamic pricing recommendations to your Airbnb listings automatically.",
      },
    ],
  },
  {
    slug: 'booking-com',
    name: 'Booking.com',
    tagline: "Europe's Largest Online Travel Agency",
    seoTitle: 'Booking.com Integration for Property Managers | StayHub Saudi Arabia',
    metaDescription:
      'Integrate your properties with Booking.com via StayHub. Manage reservations, sync calendars, handle damage protection, and automate guest communication from one platform.',
    badge: 'OTA Integration',
    h1: 'Powerful Booking.com Integration',
    arabicH1: 'تكامل قوي مع Booking.com',
    subtitle:
      "Connect to Booking.com's massive guest base while managing everything seamlessly through StayHub.",
    color: '#003580',
    stats: [
      { value: '28M+', label: 'Listings worldwide' },
      { value: '500M+', label: 'Monthly visitors' },
      { value: 'Instant', label: 'Reservation updates' },
    ],
    painPoints: [
      {
        title: 'Booking.com Damage Claims',
        desc: 'Handling damage claims on Booking.com without proper documentation is a painful, often losing battle.',
      },
      {
        title: 'Payment Collection Issues',
        desc: 'Collecting payments from Booking.com reservations can be complex and delayed.',
      },
      {
        title: 'No-Show Management',
        desc: 'No-shows on Booking.com can cost you revenue if not handled with the right policies.',
      },
    ],
    benefits: [
      {
        title: 'Damage Protection Integration',
        desc: "StayHub's guest verification and security deposit system integrates with Booking.com to protect your property.",
      },
      {
        title: 'Smooth Payment Collection',
        desc: 'Handle payment collection for Booking.com reservations seamlessly through StayHub.',
      },
      {
        title: 'No-Show Policies',
        desc: 'Set and enforce no-show policies automatically via StayHub for Booking.com bookings.',
      },
      {
        title: 'Real-Time Sync',
        desc: 'Calendar and availability sync instantly between Booking.com and all your other channels.',
      },
      {
        title: 'Smart Messaging',
        desc: 'Automated pre-arrival, welcome, and post-stay messages for Booking.com guests.',
      },
      {
        title: 'Rate Parity',
        desc: 'Maintain consistent pricing across Booking.com and all your other channels effortlessly.',
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Connect Booking.com',
        desc: 'Link your Booking.com property manager account via the official connectivity API.',
      },
      {
        step: 2,
        title: 'Import Properties',
        desc: 'All your Booking.com properties sync automatically with full details.',
      },
      {
        step: 3,
        title: 'Configure Policies',
        desc: 'Set damage protection, no-show, and payment policies specific to Booking.com.',
      },
      {
        step: 4,
        title: 'Automate Operations',
        desc: 'Let StayHub handle guest communication, payments, and calendar sync automatically.',
      },
    ],
    relatedIntegrations: ['airbnb', 'agoda', 'expedia'],
    faq: [
      {
        q: 'How does StayHub handle Booking.com payments?',
        a: "StayHub can collect payments for Booking.com reservations through integrated payment gateways, giving you control over when and how you collect from guests.",
      },
      {
        q: 'Can StayHub help with Booking.com damage claims?',
        a: "Yes. StayHub's guest verification collects security deposits and signed contracts before check-in, giving you documentation to support damage claims.",
      },
      {
        q: 'How fast does the Booking.com calendar sync?',
        a: 'Calendar updates sync in real-time (within seconds) to prevent double bookings.',
      },
      {
        q: "Does StayHub support Booking.com's damage protection program?",
        a: "StayHub works alongside Booking.com's native damage protection and adds an additional layer through our own security deposit collection system.",
      },
    ],
  },
  {
    slug: 'agoda',
    name: 'Agoda',
    tagline: "Asia-Pacific's Premier Travel Platform",
    seoTitle: 'Agoda Integration for Short-Term Rentals | StayHub Saudi Arabia',
    metaDescription:
      "Connect your properties to Agoda and tap into millions of Asian travelers. StayHub syncs your Agoda calendar, pricing, and reservations automatically.",
    badge: 'OTA Integration',
    h1: 'Agoda Integration That Works',
    arabicH1: 'تكامل فعّال مع أجودا',
    subtitle:
      'Reach millions of Asian travelers by connecting your properties to Agoda through StayHub.',
    color: '#E31837',
    stats: [
      { value: '4.5M+', label: 'Properties on Agoda' },
      { value: '2M+', label: 'Daily searches' },
      { value: 'APAC', label: 'Primary market focus' },
    ],
    painPoints: [
      {
        title: 'Managing Multiple Logins',
        desc: 'Logging into Agoda, Airbnb, and Booking.com separately to update calendars wastes hours daily.',
      },
      {
        title: 'Asia Market Access',
        desc: 'Reaching Asian travelers visiting Saudi Arabia without being listed on Agoda means missing a valuable market segment.',
      },
      {
        title: 'Pricing Inconsistency',
        desc: 'Keeping Agoda rates consistent with other platforms without automation leads to rate parity violations.',
      },
    ],
    benefits: [
      {
        title: 'One Dashboard',
        desc: 'Manage your Agoda listings alongside Airbnb, Booking.com, and others from a single dashboard.',
      },
      {
        title: 'APAC Market Reach',
        desc: "Tap into Agoda's massive Asian traveler base with properties in Saudi Arabia.",
      },
      {
        title: 'Instant Calendar Sync',
        desc: 'Your Agoda calendar stays in sync with all other channels automatically.',
      },
      {
        title: 'Rate Management',
        desc: "Push consistent pricing to Agoda automatically from StayHub's Revenue Engine.",
      },
      {
        title: 'Automated Messaging',
        desc: 'Welcome, check-in, and check-out messages sent automatically to Agoda guests.',
      },
      {
        title: 'Reservation Import',
        desc: 'All Agoda reservations appear in your StayHub dashboard with complete guest details.',
      },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Agoda Account', desc: 'Link your Agoda YCS account to StayHub in a few clicks.' },
      { step: 2, title: 'Sync Listings', desc: 'Your Agoda properties are imported with all details.' },
      { step: 3, title: 'Enable Auto-Sync', desc: 'Calendar, rates, and availability sync automatically 24/7.' },
      {
        step: 4,
        title: 'Unified Management',
        desc: 'Handle Agoda bookings from your StayHub dashboard alongside all other platforms.',
      },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'expedia'],
    faq: [
      {
        q: 'Does StayHub support Agoda connectivity?',
        a: "Yes. StayHub connects to Agoda via official channel manager connectivity, enabling full 2-way sync for calendar, pricing, and reservations.",
      },
      {
        q: 'Why should I list on Agoda in Saudi Arabia?',
        a: "Agoda is the leading OTA for Asian travelers. With growing tourism to Saudi Arabia, Agoda gives you access to millions of potential guests from APAC markets.",
      },
      {
        q: 'How long does it take to connect Agoda?',
        a: "Connecting your Agoda account typically takes under 5 minutes through StayHub's integration wizard.",
      },
    ],
  },
  {
    slug: 'expedia',
    name: 'Expedia',
    tagline: "North America's Leading Travel Platform",
    seoTitle: 'Expedia Integration for Vacation Rental Managers | StayHub',
    metaDescription:
      "List your properties on Expedia's global network (VRBO, Hotels.com, and more) and manage everything from StayHub. Real-time sync, automated messaging, and unified reservations.",
    badge: 'OTA Integration',
    h1: 'Expedia Group Integration',
    arabicH1: 'تكامل مع مجموعة Expedia',
    subtitle:
      "Access Expedia's global network of travelers and manage all bookings from one place.",
    color: '#0066B2',
    stats: [
      { value: '200+', label: 'Countries served' },
      { value: 'VRBO+', label: 'Hotels.com included' },
      { value: '150M+', label: 'Monthly visitors' },
    ],
    painPoints: [
      {
        title: 'VRBO & Expedia Separately',
        desc: 'Managing both VRBO and Expedia.com as separate platforms doubles your workload.',
      },
      {
        title: 'North American Market Gap',
        desc: 'Without Expedia, you miss a huge segment of North American and European travelers visiting Saudi Arabia.',
      },
      {
        title: 'Listing Optimization',
        desc: 'Keeping Expedia listings optimized without dedicated tools is time-consuming.',
      },
    ],
    benefits: [
      {
        title: 'Full Expedia Group Access',
        desc: 'One connection gives you presence on Expedia.com, VRBO, Hotels.com, and more.',
      },
      {
        title: 'Real-Time Sync',
        desc: 'Calendar and pricing sync instantly across the entire Expedia Group network.',
      },
      {
        title: 'Unified Reservations',
        desc: 'All Expedia Group bookings centralized in your StayHub dashboard.',
      },
      {
        title: 'Automated Guest Communication',
        desc: 'Pre-arrival and post-stay messages sent automatically to Expedia guests.',
      },
      {
        title: 'Dynamic Pricing',
        desc: 'Push revenue-optimized rates to Expedia automatically.',
      },
      {
        title: 'Rate Parity Compliance',
        desc: 'Maintain consistent pricing across Expedia and all other channels.',
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Connect Expedia',
        desc: 'Link your Expedia Partner Central account to StayHub.',
      },
      { step: 2, title: 'Import Properties', desc: 'Your Expedia listings are imported automatically.' },
      {
        step: 3,
        title: 'Configure Sync',
        desc: 'Set your pricing rules and availability sync preferences.',
      },
      {
        step: 4,
        title: 'Go Live',
        desc: 'Your properties are now live across the Expedia Group network, managed from StayHub.',
      },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'agoda'],
    faq: [
      {
        q: 'Does Expedia integration include VRBO?',
        a: "Yes. StayHub's Expedia integration gives you access to the full Expedia Group portfolio including Expedia.com, VRBO, Hotels.com, and Orbitz.",
      },
      {
        q: 'How does pricing sync work with Expedia?',
        a: "StayHub pushes your pricing rules to Expedia in real-time. You can set base rates, seasonal adjustments, and length-of-stay discounts from one place.",
      },
      {
        q: 'Can I manage Expedia reviews from StayHub?',
        a: "Currently, StayHub aggregates Expedia review notifications. Direct response from within StayHub is on our roadmap.",
      },
    ],
  },
  {
    slug: 'google-vacation-rentals',
    name: 'Google Vacation Rentals',
    tagline: 'Be Found Where Travelers Search First',
    seoTitle: 'Google Vacation Rentals Integration | StayHub Saudi Arabia',
    metaDescription:
      "List your properties on Google Vacation Rentals and appear directly in Google search results. StayHub connects your listings to Google's travel booking experience.",
    badge: 'Search Integration',
    h1: 'Google Vacation Rentals Integration',
    arabicH1: 'تكامل مع إيجارات العطلات على Google',
    subtitle:
      'Appear directly in Google Search and Google Maps when travelers look for properties in your area.',
    color: '#4285F4',
    stats: [
      { value: '8.5B+', label: 'Daily Google searches' },
      { value: '#1', label: 'Where travelers search' },
      { value: 'Direct', label: 'Booking capability' },
    ],
    painPoints: [
      {
        title: 'Invisible to Google Searchers',
        desc: "Travelers who search 'vacation rentals in Riyadh' on Google won't find you unless you're on Google Vacation Rentals.",
      },
      {
        title: 'OTA Dependency',
        desc: 'Relying solely on Airbnb and Booking.com means paying commission on every booking.',
      },
      {
        title: 'Direct Booking Gap',
        desc: 'Without Google presence, you miss travelers who prefer to book directly rather than through OTAs.',
      },
    ],
    benefits: [
      {
        title: 'Google Search Visibility',
        desc: 'Your properties appear directly in Google Search results and Google Maps for travel queries.',
      },
      {
        title: 'Reduce OTA Dependency',
        desc: 'Drive more direct and commission-free bookings by capturing Google search traffic.',
      },
      {
        title: 'Real-Time Availability',
        desc: 'Google displays your live availability and pricing pulled directly from StayHub.',
      },
      {
        title: 'Price Comparison',
        desc: 'Travelers see your direct booking price alongside OTA prices on Google.',
      },
      {
        title: 'Photos & Reviews',
        desc: 'Your property photos and reviews are showcased prominently in Google travel results.',
      },
      {
        title: 'Automatic Sync',
        desc: 'StayHub keeps your Google Vacation Rentals listing in sync with no manual updates needed.',
      },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Google', desc: 'Link StayHub to Google Vacation Rentals through our integration.' },
      {
        step: 2,
        title: 'Sync Listings',
        desc: 'Your property details, photos, and pricing are pushed to Google.',
      },
      {
        step: 3,
        title: 'Go Live on Google',
        desc: 'Your properties appear in Google Search and Maps for relevant travel queries.',
      },
      {
        step: 4,
        title: 'Track Performance',
        desc: 'Monitor Google impressions, clicks, and bookings from your StayHub analytics dashboard.',
      },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'gathern'],
    faq: [
      {
        q: 'How does Google Vacation Rentals work?',
        a: "Google Vacation Rentals allows property managers to list directly in Google Search and Maps results. When travelers search for rentals, your property appears with real-time pricing and availability.",
      },
      {
        q: 'Is Google Vacation Rentals free?',
        a: "Listing on Google Vacation Rentals is free. You only pay when a traveler books through the Google interface. StayHub's integration makes the technical setup seamless.",
      },
      {
        q: "How does StayHub sync with Google Vacation Rentals?",
        a: "StayHub pushes your property data, pricing, and availability to Google in real-time via the official Google connectivity partnership.",
      },
    ],
  },
  {
    slug: 'gathern',
    name: 'Gathern (غثرن)',
    tagline: "Saudi Arabia's Leading Local Rental Platform",
    seoTitle: 'Gathern Integration for Property Managers in Saudi Arabia | StayHub',
    metaDescription:
      "Connect your properties to Gathern, Saudi Arabia's top local vacation rental platform. StayHub syncs your Gathern calendar, manages reservations, and automates Arabic guest communication.",
    badge: 'Local Platform',
    h1: 'Gathern Integration for Saudi Properties',
    arabicH1: 'تكامل مع غثرن للعقارات السعودية',
    subtitle:
      "Reach Saudi travelers on their preferred local platform while managing everything from StayHub.",
    color: '#00A651',
    stats: [
      { value: '#1', label: 'Vacation rental platform in KSA' },
      { value: 'Arabic', label: 'Full language support' },
      { value: 'SAR', label: 'Saudi Riyal payments' },
    ],
    painPoints: [
      {
        title: 'Local Traveler Market',
        desc: "Saudi domestic travelers prefer Gathern — without it, you're invisible to a massive local market.",
      },
      {
        title: 'Arabic Communication',
        desc: 'Saudi guests expect Arabic language communication. Juggling Arabic on Gathern and English elsewhere is exhausting.',
      },
      {
        title: 'SAR Payment Complexity',
        desc: 'Managing SAR payments from Gathern alongside foreign currency OTA payments creates accounting headaches.',
      },
    ],
    benefits: [
      {
        title: 'Reach Saudi Travelers',
        desc: "List on Gathern to capture Saudi Arabia's huge domestic tourism market.",
      },
      {
        title: 'Arabic Guest Communication',
        desc: "StayHub sends automated Arabic messages to Gathern guests — in the right language, tone, and format.",
      },
      {
        title: 'SAR Payment Integration',
        desc: "Gathern payments in SAR are tracked and reconciled within StayHub's financial module.",
      },
      {
        title: 'Unified Calendar',
        desc: 'Gathern availability syncs instantly with Airbnb, Booking.com, and all other channels.',
      },
      {
        title: 'Local Compliance',
        desc: 'StayHub supports Ejar contracts and Absher verification for Gathern bookings.',
      },
      {
        title: 'National Holiday Pricing',
        desc: 'Automatically raise prices for Saudi national holidays and events across Gathern and other platforms.',
      },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Gathern', desc: 'Link your Gathern host account to StayHub in minutes.' },
      {
        step: 2,
        title: 'Sync Listings',
        desc: 'Your Gathern properties are imported with all Arabic content intact.',
      },
      {
        step: 3,
        title: 'Configure Arabic Messaging',
        desc: 'Set up automated Arabic guest communication templates for Gathern guests.',
      },
      {
        step: 4,
        title: 'Full Sync Active',
        desc: 'Calendar, pricing, and reservations sync automatically between Gathern and all your other channels.',
      },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'google-vacation-rentals'],
    faq: [
      {
        q: 'What is Gathern?',
        a: "Gathern (غثرن) is Saudi Arabia's largest local vacation rental platform, connecting Saudi property owners with domestic and regional travelers. It's the local equivalent of Airbnb for the Saudi market.",
      },
      {
        q: 'Does StayHub support Arabic for Gathern guests?',
        a: "Yes. StayHub supports Arabic language automated messaging specifically for Gathern guests, ensuring culturally appropriate and linguistically correct communication.",
      },
      {
        q: "How does StayHub handle Gathern's SAR payments?",
        a: "Gathern payments in SAR are tracked in StayHub's financial module alongside payments from international OTAs, giving you a complete financial picture in one dashboard.",
      },
      {
        q: 'Does StayHub support Ejar and Absher for Gathern bookings?',
        a: "Yes. StayHub's guest verification module supports Ejar contract generation and Absher ID verification, which may be required for Gathern bookings under Saudi regulations.",
      },
    ],
  },
];

// Merge Arabic translations into each integration and export
export const allIntegrations = integrationsList.map(i => ({
  ...i,
  ...(integrationsAr[i.slug] || {}),
}));

export function getIntegrationBySlug(slug) {
  return allIntegrations.find((i) => i.slug === slug);
}
