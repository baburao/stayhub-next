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
    tagline: "The world's leading online travel marketplace",
    arTagline: 'منصة السفر الرائدة عالمياً عبر الإنترنت',
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
    tagline: "Saudi Arabia's leading local short-term rental platform",
    arTagline: 'منصة الإيجار المحلية الرائدة في السعودية للإيجارات قصيرة الأجل',
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
  {
    slug: 'aqar',
    name: 'AQAR',
    tagline: "Saudi Arabia's Leading Real Estate Marketplace",
    seoTitle: 'Aqar Integration for Property Managers in Saudi Arabia',
    metaDescription:
      'Connect Aqar to StayHub to publish your units across Saudi Arabia, with automatic sync for availability, pricing, and inquiries from one dashboard.',
    arMetaDescription:
      'اربط عقار بـ StayHub لنشر وحداتك في جميع أنحاء المملكة العربية السعودية، مع مزامنة تلقائية للتوفر والأسعار والاستفسارات من لوحة تحكم واحدة.',
    badge: 'OTA Integration',
    h1: 'Publish your units on Aqar directly from StayHub',
    arabicH1: 'انشر وحداتك على عقار مباشرة من StayHub',
    subtitle:
      "Put your properties in front of renters across 40+ Saudi cities on the Kingdom's leading real-estate marketplace, with availability, pricing, and inquiries syncing automatically — no manual updates, no double bookings.",
    seoContent:
      "Aqar is Saudi Arabia's leading real estate marketplace, connecting property managers with renters across the Kingdom's major cities. For short-term rental operators, Aqar's dedicated Bookings section is a key local channel alongside international platforms like Airbnb and Booking.com. StayHub's Aqar integration works as a Saudi short-term rental channel manager built for this market — keeping your Aqar listings, calendar, and pricing in sync with every other channel you manage, without manual double-entry. Whether you run a handful of units or a full multi-property portfolio, connecting Aqar to StayHub means every inquiry lands in one inbox, every booking updates your calendar in real time, and your team spends less time on admin and more time growing occupancy.",
    trustBadge: "Aqar App Company is licensed by Saudi Arabia's Ministry of Tourism — License No. 73106505",
    logo: '/logos/aqar.webp',
    logoAlt: 'Aqar',
    benefitsHeading: 'Everything runs automatically from one dashboard',
    arBenefitsHeading: 'كل شيء يعمل تلقائيًا من لوحة تحكم واحدة',
    color: '#1B5E93',
    stats: [
      { value: '145K+', label: 'active listings in major Saudi cities' },
      { value: '40+', label: 'Saudi cities covered' },
      { value: 'MoT-licensed', label: 'for hospitality unit bookings' },
    ],
    painPoints: [
      { title: 'Endless manual updates', desc: 'Every price, photo, or detail change means logging in and editing by hand. Listings go stale fast.' },
      { title: 'Lost inquiries', desc: 'Interested renters message you outside your workflow, and a slow reply means a lost booking.' },
      { title: 'Out-of-sync calendars', desc: "Availability on Aqar doesn't match your other channels, leading to double bookings and awkward cancellations." },
    ],
    benefits: [
      { title: 'Auto-published listings', desc: 'Send your unit details, photos, and rates to Aqar straight from StayHub.' },
      { title: 'Unified inbox', desc: 'Every Aqar inquiry lands in your StayHub inbox alongside your other channels, so you reply from one place.' },
      { title: 'Real-time availability', desc: 'Any booking or calendar block reflects on Aqar instantly. Double bookings become a thing of the past.' },
      { title: 'Dynamic pricing', desc: 'Apply your seasonal and demand-based rates to Aqar listings automatically.' },
      { title: 'Centralized reporting', desc: "Compare Aqar's performance against every other channel in a single analytics view." },
    ],
    workflowSteps: [
      { step: 1, title: 'Link your account', desc: 'Connect your Aqar account to StayHub in a few simple steps.' },
      { step: 2, title: 'Publish your units', desc: 'Send your properties to Aqar with full details and photos.' },
      { step: 3, title: 'Always in sync', desc: 'Calendars and rates update automatically, around the clock.' },
      { step: 4, title: 'Manage everything from StayHub', desc: 'All Aqar inquiries and bookings in one place.' },
    ],
    relatedIntegrations: ['gathern', 'airbnb', 'booking-com'],
    faq: [
      { q: 'How does StayHub connect to Aqar?', a: 'StayHub connects to Aqar through a direct integration. Once your account is linked, your unit data — details, photos, rates, and availability — flows automatically from StayHub to Aqar, and inquiries arrive in your unified StayHub inbox.' },
      { q: 'Does my Aqar calendar stay in sync with my other channels?', a: 'Yes. Any booking from any channel — Airbnb, Booking.com, or your direct booking site — updates your Aqar availability in real time, and vice versa. That eliminates double bookings entirely.' },
      { q: 'Can I reply to Aqar inquiries from inside StayHub?', a: 'Yes. All Aqar inquiries land in your unified inbox alongside your other channels. Reply directly without switching platforms — and you can enable automated responses too.' },
    ],
  },
  {
    slug: 'ejar-ota',
    name: 'Ejar',
    tagline: "Saudi Arabia's Official Rental Network",
    seoTitle: 'Ejar Integration for Rentals in Saudi Arabia | StayHub',
    metaDescription:
      'Connect Ejar with StayHub to streamline rental listings and contracts. Manage availability and tenant flow in compliance with Saudi rental regulations.',
    badge: 'OTA Integration',
    h1: 'Ejar Integration',
    arabicH1: 'تكامل مع إيجار',
    subtitle: 'Streamline Ejar listings and rental flow while keeping your calendar and bookings centralized in StayHub.',
    color: '#1C7C54',
    stats: [
      { value: 'Official', label: 'Saudi rental network' },
      { value: 'Compliant', label: 'Regulated contracts' },
      { value: 'Synced', label: 'Listings & availability' },
    ],
    painPoints: [
      { title: 'Disconnected Listings', desc: 'Managing Ejar separately from your OTA channels duplicates work.' },
      { title: 'Manual Contract Steps', desc: 'Handling rental documentation outside your PMS adds friction.' },
      { title: 'Availability Gaps', desc: 'Ejar availability easily drifts from your live calendar.' },
    ],
    benefits: [
      { title: 'Centralized Listings', desc: 'Manage Ejar properties alongside every other channel in StayHub.' },
      { title: 'Calendar Sync', desc: 'Availability stays aligned across Ejar and your OTAs.' },
      { title: 'Compliant Workflow', desc: 'Keep rental processes aligned with Saudi regulatory requirements.' },
      { title: 'Unified Reporting', desc: 'Track Ejar performance with the rest of your portfolio.' },
      { title: 'Tenant Communication', desc: 'Automate messaging for Ejar tenants from one inbox.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Ejar', desc: 'Link your Ejar account to StayHub.' },
      { step: 2, title: 'Import Listings', desc: 'Bring your Ejar properties into StayHub.' },
      { step: 3, title: 'Stay in Sync', desc: 'Availability updates flow automatically.' },
      { step: 4, title: 'Manage Centrally', desc: 'Handle the full rental flow from StayHub.' },
    ],
    relatedIntegrations: ['ejar-gov', 'aqar', 'gathern'],
    faq: [
      { q: 'Is this the same as the Ejar government integration?', a: 'This listing integration focuses on managing rental listings and availability. StayHub also offers an Ejar government integration for registering and verifying rental contracts.' },
      { q: 'Does StayHub keep Ejar availability in sync?', a: 'Yes. Your calendar syncs to Ejar in real time alongside your other channels.' },
      { q: 'Can I automate tenant messaging?', a: "Yes. StayHub's automated messaging works for Ejar tenants in Arabic and English." },
    ],
  },
  {
    slug: 'qotoon',
    name: 'Qotoon',
    tagline: 'Saudi Vacation Rental Platform',
    seoTitle: 'Qotoon Integration for Vacation Rentals | StayHub Saudi Arabia',
    metaDescription:
      'Connect Qotoon to StayHub and manage your Saudi vacation rental listings, calendar, and guest messaging from a single dashboard.',
    badge: 'OTA Integration',
    h1: 'Qotoon Integration',
    arabicH1: 'تكامل مع قطون',
    subtitle: 'Sync your Qotoon listings and manage bookings, pricing, and guest messaging alongside all your channels.',
    color: '#7C4DFF',
    stats: [
      { value: 'Local', label: 'Saudi vacation rentals' },
      { value: 'Arabic', label: 'Guest messaging' },
      { value: '2-way', label: 'Calendar sync' },
    ],
    painPoints: [
      { title: 'Channel Silos', desc: 'Managing Qotoon on its own keeps your data fragmented.' },
      { title: 'Double Bookings', desc: 'Without sync, Qotoon bookings can clash with other channels.' },
      { title: 'Manual Messaging', desc: 'Answering Qotoon guests by hand eats into your day.' },
    ],
    benefits: [
      { title: '2-Way Calendar Sync', desc: 'Availability syncs both directions to prevent double bookings.' },
      { title: 'Unified Inbox', desc: 'Qotoon guest messages join your other channels in one inbox.' },
      { title: 'Arabic Automation', desc: 'Send culturally appropriate Arabic messages to Qotoon guests automatically.' },
      { title: 'Dynamic Pricing', desc: 'Push optimized rates to Qotoon based on demand.' },
      { title: 'Reservation Sync', desc: 'Qotoon bookings appear instantly in StayHub with guest details.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Qotoon', desc: 'Link your Qotoon account to StayHub.' },
      { step: 2, title: 'Sync Listings', desc: 'Import your Qotoon properties automatically.' },
      { step: 3, title: 'Real-Time Updates', desc: 'Calendar and pricing sync around the clock.' },
      { step: 4, title: 'Manage in One Place', desc: 'Handle Qotoon bookings with every other channel.' },
    ],
    relatedIntegrations: ['gathern', 'aqar', 'airbnb'],
    faq: [
      { q: 'Does StayHub support Arabic for Qotoon guests?', a: 'Yes. StayHub sends automated Arabic messaging tailored to Qotoon guests.' },
      { q: 'Will Qotoon stay in sync with my other channels?', a: 'Yes. Calendar and pricing sync in real time to prevent double bookings.' },
      { q: 'Can I see Qotoon performance in reports?', a: 'Yes. Qotoon revenue and occupancy appear in your unified analytics.' },
    ],
  },
  {
    slug: 'attiude',
    name: 'Attiude',
    tagline: 'Hospitality Booking Platform',
    seoTitle: 'Attiude Integration for Property Managers | StayHub',
    metaDescription:
      'Integrate Attiude with StayHub to sync listings, calendars, and reservations and manage guest communication from one platform.',
    badge: 'OTA Integration',
    h1: 'Attiude Integration',
    arabicH1: 'تكامل مع Attiude',
    subtitle: 'Connect Attiude and keep your listings, calendar, and reservations synced through StayHub.',
    color: '#00897B',
    stats: [
      { value: 'Connected', label: 'Listings & calendar' },
      { value: 'Instant', label: 'Reservation updates' },
      { value: 'Unified', label: 'Guest inbox' },
    ],
    painPoints: [
      { title: 'Extra Channel to Watch', desc: 'Another platform to log into means more work and more risk.' },
      { title: 'Sync Errors', desc: 'Manual updates to Attiude lead to mismatched availability.' },
      { title: 'Fragmented Guest Chat', desc: 'Attiude messages live apart from your other conversations.' },
    ],
    benefits: [
      { title: 'Calendar Sync', desc: 'Availability stays aligned across Attiude and your channels.' },
      { title: 'Unified Inbox', desc: 'Attiude guest messages flow into one place.' },
      { title: 'Automated Messaging', desc: 'Send check-in and check-out messages to Attiude guests automatically.' },
      { title: 'Reservation Sync', desc: 'New Attiude bookings appear instantly in StayHub.' },
      { title: 'Centralized Reporting', desc: 'Track Attiude alongside all other channels.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Attiude', desc: 'Link your Attiude account to StayHub.' },
      { step: 2, title: 'Import Listings', desc: 'Bring your Attiude properties into StayHub.' },
      { step: 3, title: 'Sync 24/7', desc: 'Calendar and pricing stay current automatically.' },
      { step: 4, title: 'Manage Centrally', desc: 'Handle Attiude bookings from StayHub.' },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'gathern'],
    faq: [
      { q: 'How does the Attiude integration work?', a: 'StayHub syncs your Attiude listings, calendar, and reservations and centralizes guest messaging in one dashboard.' },
      { q: 'Will it prevent double bookings?', a: 'Yes. Availability syncs in real time across Attiude and your other channels.' },
      { q: 'Can I automate Attiude guest messages?', a: 'Yes. Automated messaging works across Attiude in Arabic and English.' },
    ],
  },
  {
    slug: 'almosafer',
    name: 'Almosafer',
    tagline: "Saudi Arabia's Leading Travel Brand",
    seoTitle: 'Almosafer Integration for Property Managers | StayHub',
    metaDescription:
      'Almosafer integration is coming soon to StayHub. Reach Almosafer travelers and sync listings, calendar, and reservations from one dashboard.',
    badge: 'OTA Integration',
    h1: 'Almosafer Integration',
    arabicH1: 'تكامل مع المسافر',
    subtitle: 'Reach Almosafer travelers and manage listings, calendar, and reservations from StayHub — coming soon.',
    color: '#0D47A1',
    stats: [
      { value: 'Top', label: 'Saudi travel brand' },
      { value: 'Regional', label: 'Traveler reach' },
      { value: 'Soon', label: 'Calendar sync' },
    ],
    painPoints: [
      { title: 'Untapped Audience', desc: 'Missing Almosafer means missing a large pool of Saudi and regional travelers.' },
      { title: 'Manual Channel Work', desc: 'Adding a channel without sync multiplies your daily workload.' },
      { title: 'Availability Risk', desc: 'Each new channel raises the risk of double bookings without automation.' },
    ],
    benefits: [
      { title: 'Wider Reach', desc: 'Tap into Almosafer’s large traveler base when the integration launches.' },
      { title: 'Calendar Sync', desc: 'Availability will stay aligned across Almosafer and your channels.' },
      { title: 'Unified Inbox', desc: 'Almosafer guest messages will join your single inbox.' },
      { title: 'Automated Messaging', desc: 'Automate guest communication for Almosafer bookings.' },
      { title: 'Central Reporting', desc: 'Track Almosafer performance with the rest of your portfolio.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Join the Waitlist', desc: 'Register interest so you’re first to connect.' },
      { step: 2, title: 'Connect at Launch', desc: 'Link Almosafer to StayHub when it goes live.' },
      { step: 3, title: 'Sync Listings', desc: 'Import your properties automatically.' },
      { step: 4, title: 'Manage Centrally', desc: 'Handle Almosafer bookings from StayHub.' },
    ],
    relatedIntegrations: ['gathern', 'darent', 'airbnb'],
    faq: [
      { q: 'Is the Almosafer integration available now?', a: 'It’s coming soon. Book a demo to join the waitlist and be notified the moment it launches.' },
      { q: 'Will Almosafer sync with my other channels?', a: 'Yes. At launch, calendar and pricing will sync in real time to prevent double bookings.' },
      { q: 'Can I automate messaging for Almosafer guests?', a: 'Yes. StayHub’s automated messaging will support Almosafer bookings in Arabic and English.' },
    ],
  },
  {
    slug: 'darent',
    name: 'Darent',
    tagline: 'Saudi Vacation Rental Marketplace',
    seoTitle: 'Darent Integration for Vacation Rentals | StayHub Saudi Arabia',
    metaDescription:
      'Darent integration is coming soon to StayHub. Sync your Saudi vacation rental listings, calendar, and guest messaging from one dashboard.',
    badge: 'OTA Integration',
    h1: 'Darent Integration',
    arabicH1: 'تكامل مع دارنت',
    subtitle: 'List on Darent and manage bookings, pricing, and guest messaging from StayHub — coming soon.',
    color: '#546E7A',
    stats: [
      { value: 'Local', label: 'Saudi marketplace' },
      { value: 'Arabic', label: 'Guest messaging' },
      { value: 'Soon', label: 'Calendar sync' },
    ],
    painPoints: [
      { title: 'Another Silo', desc: 'Managing Darent separately keeps your operations fragmented.' },
      { title: 'Double Booking Risk', desc: 'Without sync, Darent bookings can clash with other channels.' },
      { title: 'Manual Messaging', desc: 'Replying to Darent guests by hand costs time.' },
    ],
    benefits: [
      { title: 'Calendar Sync', desc: 'Availability will sync across Darent and your channels at launch.' },
      { title: 'Unified Inbox', desc: 'Darent guest messages will join your single inbox.' },
      { title: 'Arabic Automation', desc: 'Send automated Arabic messages to Darent guests.' },
      { title: 'Dynamic Pricing', desc: 'Push optimized rates to Darent based on demand.' },
      { title: 'Central Reporting', desc: 'Track Darent performance with your full portfolio.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Join the Waitlist', desc: 'Register interest to connect first.' },
      { step: 2, title: 'Connect at Launch', desc: 'Link Darent to StayHub when available.' },
      { step: 3, title: 'Sync Listings', desc: 'Import your Darent properties automatically.' },
      { step: 4, title: 'Manage Centrally', desc: 'Handle Darent bookings from StayHub.' },
    ],
    relatedIntegrations: ['gathern', 'almosafer', 'qotoon'],
    faq: [
      { q: 'Is the Darent integration live yet?', a: 'It’s coming soon. Book a demo to join the waitlist and get notified at launch.' },
      { q: 'Will Darent sync with my other channels?', a: 'Yes. Calendar and pricing will sync in real time once it launches.' },
      { q: 'Does StayHub support Arabic for Darent guests?', a: 'Yes. Automated Arabic messaging will be available for Darent bookings.' },
    ],
  },
  {
    slug: 'absher',
    name: 'Absher',
    tagline: "Saudi Arabia's National Digital Identity Platform",
    seoTitle: 'Absher Guest ID Verification Integration | StayHub Saudi Arabia',
    metaDescription:
      'Verify guest identities through Absher with StayHub. Stay compliant with Saudi regulations using secure, automated ID verification before check-in.',
    badge: 'Government Integration',
    h1: 'Absher Identity Verification',
    arabicH1: 'التحقق من الهوية عبر أبشر',
    subtitle: 'Verify guest identities through Absher automatically and stay compliant with Saudi check-in regulations.',
    color: '#00695C',
    stats: [
      { value: 'National', label: 'Saudi e-gov identity' },
      { value: 'Secure', label: 'Verified check-ins' },
      { value: 'Compliant', label: 'Regulatory ready' },
    ],
    painPoints: [
      { title: 'Manual ID Checks', desc: 'Collecting and verifying guest IDs by hand is slow and error-prone.' },
      { title: 'Compliance Risk', desc: 'Missing proper verification exposes you to regulatory penalties.' },
      { title: 'Check-in Friction', desc: 'Paper-based identity steps frustrate guests at arrival.' },
    ],
    benefits: [
      { title: 'Automated Verification', desc: 'Guests verify their identity via Absher before check-in.' },
      { title: 'Regulatory Compliance', desc: 'Meet Saudi guest registration and identity requirements.' },
      { title: 'Secure Records', desc: 'Verification records are stored securely against each booking.' },
      { title: 'Faster Check-in', desc: 'Verified guests move through arrival with no paperwork.' },
      { title: 'Fraud Reduction', desc: 'Confirmed identities reduce chargebacks and fraudulent bookings.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Enable Absher', desc: 'Turn on Absher verification in StayHub.' },
      { step: 2, title: 'Guest Verifies', desc: 'Guests confirm their identity through Absher.' },
      { step: 3, title: 'Auto-Record', desc: 'Verification is logged against the reservation.' },
      { step: 4, title: 'Compliant Check-in', desc: 'Guests check in with identity confirmed.' },
    ],
    relatedIntegrations: ['shmoos', 'ejar-gov', 'mot'],
    faq: [
      { q: 'How does Absher verification work in StayHub?', a: 'StayHub prompts guests to verify their identity through Absher before check-in, then records the verification against the booking for compliance.' },
      { q: 'Is Absher verification required in Saudi Arabia?', a: 'Identity verification is part of Saudi hospitality compliance. StayHub’s Absher integration helps you meet these requirements automatically.' },
      { q: 'Is guest data handled securely?', a: 'Yes. Verification records are stored securely and used only for compliance purposes.' },
    ],
  },
  {
    slug: 'shmoos',
    name: 'Shomoos',
    tagline: 'Saudi Guest Registration System',
    seoTitle: 'Shomoos Guest Registration Integration | StayHub Saudi Arabia',
    metaDescription:
      'Automate guest registration with Shomoos through StayHub. Report guest stays to Saudi authorities and stay fully compliant with hospitality regulations.',
    badge: 'Government Integration',
    h1: 'Shomoos Guest Registration',
    arabicH1: 'تسجيل الضيوف عبر شموس',
    subtitle: 'Automatically register guest stays with Shomoos and stay compliant with Saudi hospitality reporting rules.',
    color: '#1565C0',
    stats: [
      { value: 'Official', label: 'Guest registration' },
      { value: 'Automated', label: 'Authority reporting' },
      { value: 'Compliant', label: 'Hospitality rules' },
    ],
    painPoints: [
      { title: 'Manual Reporting', desc: 'Registering each guest stay with authorities by hand is tedious and easy to forget.' },
      { title: 'Compliance Gaps', desc: 'Missed or late registrations risk fines and license issues.' },
      { title: 'Duplicate Data Entry', desc: 'Re-typing guest details into Shomoos wastes time.' },
    ],
    benefits: [
      { title: 'Automated Registration', desc: 'Guest stays are reported to Shomoos automatically.' },
      { title: 'Regulatory Compliance', desc: 'Meet Saudi guest reporting requirements without manual work.' },
      { title: 'No Duplicate Entry', desc: 'Guest details flow from your booking straight to Shomoos.' },
      { title: 'Audit Trail', desc: 'Every registration is logged for inspection readiness.' },
      { title: 'Peace of Mind', desc: 'Never miss a reporting deadline again.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Enable Shomoos', desc: 'Connect Shomoos in StayHub.' },
      { step: 2, title: 'Guest Books', desc: 'A reservation is created in StayHub.' },
      { step: 3, title: 'Auto-Register', desc: 'Guest details are reported to Shomoos automatically.' },
      { step: 4, title: 'Stay Compliant', desc: 'Registration records are kept for audits.' },
    ],
    relatedIntegrations: ['absher', 'mot', 'ejar-gov'],
    faq: [
      { q: 'What is Shomoos?', a: 'Shomoos is the Saudi guest registration system used to report hospitality stays to authorities. StayHub automates this reporting from your bookings.' },
      { q: 'Does StayHub register guests automatically?', a: 'Yes. When a booking is created, StayHub can submit the required guest details to Shomoos automatically.' },
      { q: 'Will I have records for inspections?', a: 'Yes. Every registration is logged in StayHub for audit readiness.' },
    ],
  },
  {
    slug: 'mot',
    name: 'Ministry of Tourism',
    tagline: 'Saudi Tourism Licensing & Compliance',
    seoTitle: 'Ministry of Tourism Integration & Licensing | StayHub Saudi Arabia',
    metaDescription:
      'Stay aligned with Saudi Ministry of Tourism licensing and compliance through StayHub. Manage classifications and reporting from one dashboard.',
    badge: 'Government Integration',
    h1: 'Ministry of Tourism Integration',
    arabicH1: 'تكامل مع وزارة السياحة',
    subtitle: 'Keep your properties aligned with Ministry of Tourism licensing and compliance requirements.',
    color: '#6A1B9A',
    stats: [
      { value: 'Licensed', label: 'Tourism compliance' },
      { value: 'Classified', label: 'Property standards' },
      { value: 'Aligned', label: 'Regulatory reporting' },
    ],
    painPoints: [
      { title: 'Licensing Complexity', desc: 'Tracking tourism licenses and classifications across properties is hard to manage manually.' },
      { title: 'Compliance Deadlines', desc: 'Missing reporting or renewal dates risks penalties.' },
      { title: 'Scattered Records', desc: 'License documents spread across spreadsheets and drives are hard to find.' },
    ],
    benefits: [
      { title: 'License Tracking', desc: 'Keep tourism licenses and classifications organized per property.' },
      { title: 'Compliance Reminders', desc: 'Stay ahead of renewal and reporting deadlines.' },
      { title: 'Centralized Documents', desc: 'Store licensing records against each property in StayHub.' },
      { title: 'Standards Alignment', desc: 'Align your listings with Ministry classification standards.' },
      { title: 'Inspection Ready', desc: 'Keep documentation organized for audits.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Add Licenses', desc: 'Record tourism licenses in StayHub.' },
      { step: 2, title: 'Track Status', desc: 'Monitor classification and renewal dates.' },
      { step: 3, title: 'Get Reminders', desc: 'Receive alerts before deadlines.' },
      { step: 4, title: 'Stay Compliant', desc: 'Keep records ready for inspection.' },
    ],
    relatedIntegrations: ['shmoos', 'absher', 'ejar-gov'],
    faq: [
      { q: 'How does StayHub help with Ministry of Tourism compliance?', a: 'StayHub helps you track licenses, classifications, and reporting deadlines per property so you stay aligned with Ministry requirements.' },
      { q: 'Can I store my licensing documents?', a: 'Yes. License records can be stored against each property for quick access during inspections.' },
      { q: 'Will I be reminded of renewals?', a: 'Yes. StayHub can alert you ahead of renewal and reporting deadlines.' },
    ],
  },
  {
    slug: 'ejar-gov',
    name: 'Ejar',
    tagline: 'Saudi Official Rental Contract Network',
    seoTitle: 'Ejar Contract Registration Integration | StayHub Saudi Arabia',
    metaDescription:
      'Register and verify rental contracts through Ejar with StayHub. Stay compliant with Saudi rental regulations and automate documentation.',
    badge: 'Government Integration',
    h1: 'Ejar Contract Integration',
    arabicH1: 'تكامل عقود إيجار',
    subtitle: 'Generate and register compliant rental contracts through Ejar directly from StayHub.',
    color: '#1C7C54',
    stats: [
      { value: 'Official', label: 'Rental network' },
      { value: 'Registered', label: 'Compliant contracts' },
      { value: 'Automated', label: 'Documentation' },
    ],
    painPoints: [
      { title: 'Manual Contracts', desc: 'Drafting and registering rental contracts by hand is slow and error-prone.' },
      { title: 'Compliance Risk', desc: 'Unregistered contracts can create legal and regulatory exposure.' },
      { title: 'Document Chaos', desc: 'Contracts scattered across systems are hard to retrieve.' },
    ],
    benefits: [
      { title: 'Contract Registration', desc: 'Register rental contracts through Ejar from StayHub.' },
      { title: 'Regulatory Compliance', desc: 'Keep contracts aligned with Saudi rental law.' },
      { title: 'Centralized Records', desc: 'Store registered contracts against each booking.' },
      { title: 'Faster Onboarding', desc: 'Speed up tenant onboarding with automated documents.' },
      { title: 'Audit Ready', desc: 'Keep a clean trail of every registered contract.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Ejar', desc: 'Link Ejar to StayHub.' },
      { step: 2, title: 'Generate Contract', desc: 'Create a compliant rental contract.' },
      { step: 3, title: 'Register', desc: 'Submit the contract through Ejar.' },
      { step: 4, title: 'Store Records', desc: 'Keep registered contracts on file.' },
    ],
    relatedIntegrations: ['absher', 'shmoos', 'ejar-ota'],
    faq: [
      { q: 'How does the Ejar contract integration work?', a: 'StayHub helps you generate and register compliant rental contracts through Ejar, then stores them against the booking for compliance.' },
      { q: 'Is Ejar registration required?', a: 'Registering rental contracts through Ejar is part of Saudi rental compliance. StayHub streamlines the process.' },
      { q: 'Where are my contracts stored?', a: 'Registered contracts are stored securely in StayHub against each booking.' },
    ],
  },
  {
    slug: 'pricelabs',
    name: 'PriceLabs',
    tagline: 'Dynamic Pricing & Revenue Management',
    seoTitle: 'PriceLabs Dynamic Pricing Integration | StayHub Saudi Arabia',
    metaDescription:
      'Connect PriceLabs to StayHub for automated dynamic pricing. Optimize rates by demand, seasonality, and events across all your channels.',
    badge: 'Pricing Integration',
    h1: 'PriceLabs Dynamic Pricing',
    arabicH1: 'تسعير ديناميكي مع PriceLabs',
    subtitle: 'Automatically optimize your rates with PriceLabs and push them to every channel through StayHub.',
    color: '#E65100',
    stats: [
      { value: 'Daily', label: 'Rate optimization' },
      { value: 'Data-driven', label: 'Demand pricing' },
      { value: 'All channels', label: 'Synced rates' },
    ],
    painPoints: [
      { title: 'Flat Pricing', desc: 'Static rates leave revenue on the table during high demand.' },
      { title: 'Manual Rate Updates', desc: 'Adjusting prices by hand across channels is slow and inconsistent.' },
      { title: 'Missed Events', desc: 'Failing to price for local events and seasons costs bookings and revenue.' },
    ],
    benefits: [
      { title: 'Automated Dynamic Pricing', desc: 'PriceLabs sets optimal rates based on real demand data.' },
      { title: 'Event & Season Aware', desc: 'Rates adjust for local events, holidays, and seasonality.' },
      { title: 'All-Channel Sync', desc: 'Optimized prices push to every connected channel automatically.' },
      { title: 'Occupancy Optimization', desc: 'Balance occupancy and rate to maximize revenue.' },
      { title: 'Custom Rules', desc: 'Set min/max prices and pricing strategies per property.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect PriceLabs', desc: 'Link your PriceLabs account to StayHub.' },
      { step: 2, title: 'Set Strategy', desc: 'Define min/max rates and pricing rules.' },
      { step: 3, title: 'Auto-Optimize', desc: 'PriceLabs updates rates daily by demand.' },
      { step: 4, title: 'Sync Everywhere', desc: 'Optimized prices push to all channels.' },
    ],
    relatedIntegrations: ['airbnb', 'booking-com', 'agoda'],
    faq: [
      { q: 'How does PriceLabs work with StayHub?', a: 'PriceLabs calculates optimal daily rates from demand data, and StayHub pushes those rates to all your connected channels automatically.' },
      { q: 'Can I keep control over my pricing?', a: 'Yes. You set minimum and maximum prices and custom rules per property; PriceLabs optimizes within those bounds.' },
      { q: 'Does it price for local Saudi events?', a: 'Yes. PriceLabs factors in local events, holidays, and seasonality when setting rates.' },
    ],
  },
  {
    slug: 'tuya',
    name: 'Tuya',
    tagline: 'Smart Home & IoT Platform',
    seoTitle: 'Tuya Smart Home Integration | StayHub Saudi Arabia',
    metaDescription:
      'Connect Tuya smart devices to StayHub. Automate smart locks, lighting, and climate control around guest check-in and check-out.',
    badge: 'Smart Home Integration',
    h1: 'Tuya Smart Home Integration',
    arabicH1: 'تكامل المنزل الذكي مع Tuya',
    subtitle: 'Automate Tuya smart devices around the guest journey — locks, lighting, and climate — from StayHub.',
    color: '#FF6F00',
    stats: [
      { value: 'IoT', label: 'Smart device control' },
      { value: 'Automated', label: 'Check-in actions' },
      { value: 'Remote', label: 'Property control' },
    ],
    painPoints: [
      { title: 'Manual Device Setup', desc: 'Configuring smart devices per guest by hand is tedious.' },
      { title: 'Energy Waste', desc: 'Lights and AC left running between stays drive up costs.' },
      { title: 'Access Headaches', desc: 'Coordinating access codes manually creates check-in friction.' },
    ],
    benefits: [
      { title: 'Automated Access', desc: 'Smart locks generate guest codes automatically at check-in.' },
      { title: 'Energy Savings', desc: 'Climate and lighting power down automatically between stays.' },
      { title: 'Remote Control', desc: 'Manage all Tuya devices remotely from StayHub.' },
      { title: 'Guest Comfort', desc: 'Pre-set lighting and climate for guest arrival.' },
      { title: 'Multi-Device Support', desc: 'Control locks, lights, thermostats, and more.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Tuya', desc: 'Link your Tuya account and devices to StayHub.' },
      { step: 2, title: 'Set Automations', desc: 'Define check-in and check-out actions.' },
      { step: 3, title: 'Trigger on Booking', desc: 'Devices respond automatically to the guest journey.' },
      { step: 4, title: 'Control Remotely', desc: 'Manage everything from StayHub.' },
    ],
    relatedIntegrations: ['ttlock', 'airbnb', 'booking-com'],
    faq: [
      { q: 'Which Tuya devices does StayHub support?', a: 'StayHub works with Tuya smart locks, lighting, thermostats, and other compatible IoT devices.' },
      { q: 'Can access codes be generated automatically?', a: 'Yes. Smart locks can issue unique guest codes automatically at check-in and revoke them at check-out.' },
      { q: 'Does this help reduce energy costs?', a: 'Yes. Lighting and climate can power down automatically between stays to save energy.' },
    ],
  },
  {
    slug: 'ttlock',
    name: 'TTLock',
    tagline: 'Smart Lock & Keyless Access',
    seoTitle: 'TTLock Smart Lock Integration | StayHub Saudi Arabia',
    metaDescription:
      'Integrate TTLock smart locks with StayHub for automated keyless check-in. Generate and revoke guest access codes automatically per booking.',
    badge: 'Smart Home Integration',
    h1: 'TTLock Smart Lock Integration',
    arabicH1: 'تكامل الأقفال الذكية مع TTLock',
    subtitle: 'Automate keyless check-in with TTLock — unique guest codes generated and revoked automatically per booking.',
    color: '#37474F',
    stats: [
      { value: 'Keyless', label: 'Guest check-in' },
      { value: 'Auto', label: 'Code generation' },
      { value: 'Secure', label: 'Access control' },
    ],
    painPoints: [
      { title: 'Key Handovers', desc: 'Meeting guests to hand over keys wastes time and limits flexibility.' },
      { title: 'Lost Keys', desc: 'Physical keys get lost, copied, and create security risks.' },
      { title: 'Manual Codes', desc: 'Creating and sharing access codes by hand is error-prone.' },
    ],
    benefits: [
      { title: 'Automated Codes', desc: 'Unique access codes are generated per booking automatically.' },
      { title: 'Auto-Expiry', desc: 'Codes revoke automatically at check-out for security.' },
      { title: 'Self Check-in', desc: 'Guests let themselves in with no key handover.' },
      { title: 'Remote Management', desc: 'Lock and unlock or audit access from StayHub.' },
      { title: 'Access Logs', desc: 'See exactly when codes were used for each stay.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect TTLock', desc: 'Link your TTLock devices to StayHub.' },
      { step: 2, title: 'Auto-Generate Code', desc: 'A unique code is created when a guest books.' },
      { step: 3, title: 'Share with Guest', desc: 'The code is sent automatically before arrival.' },
      { step: 4, title: 'Auto-Revoke', desc: 'The code expires at check-out.' },
    ],
    relatedIntegrations: ['tuya', 'airbnb', 'booking-com'],
    faq: [
      { q: 'How does TTLock keyless check-in work?', a: 'StayHub generates a unique TTLock access code for each booking, sends it to the guest before arrival, and revokes it automatically at check-out.' },
      { q: 'Is keyless access secure?', a: 'Yes. Each code is unique to the stay, time-bound, and auto-expires, with access logs for every entry.' },
      { q: 'Can I open the lock remotely?', a: 'Yes. You can manage and audit TTLock access remotely from StayHub.' },
    ],
  },
  {
    slug: 'odoo',
    name: 'Odoo',
    tagline: 'All-in-One Business & ERP Suite',
    seoTitle: 'Odoo Accounting Integration | StayHub Saudi Arabia',
    metaDescription:
      'Sync StayHub bookings and revenue with Odoo. Automate invoicing, accounting, and financial reporting for your property business.',
    badge: 'Accounting Integration',
    h1: 'Odoo Accounting Integration',
    arabicH1: 'تكامل المحاسبة مع Odoo',
    subtitle: 'Sync bookings, revenue, and invoices to Odoo automatically and keep your books always up to date.',
    color: '#714B67',
    stats: [
      { value: 'ERP', label: 'Full business suite' },
      { value: 'Automated', label: 'Invoicing & books' },
      { value: 'Synced', label: 'Revenue data' },
    ],
    painPoints: [
      { title: 'Manual Bookkeeping', desc: 'Re-entering booking revenue into Odoo by hand wastes hours.' },
      { title: 'Reconciliation Pain', desc: 'Matching payouts to bookings manually is tedious and error-prone.' },
      { title: 'Delayed Reporting', desc: 'Without sync, financial reports are always behind.' },
    ],
    benefits: [
      { title: 'Automated Invoicing', desc: 'Invoices are created in Odoo from StayHub bookings.' },
      { title: 'Revenue Sync', desc: 'Booking revenue flows into Odoo automatically.' },
      { title: 'Easy Reconciliation', desc: 'Match payouts to bookings with synced records.' },
      { title: 'Real-Time Reports', desc: 'Keep financial reporting always current.' },
      { title: 'ZATCA Ready', desc: 'Support compliant e-invoicing workflows.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Odoo', desc: 'Link your Odoo instance to StayHub.' },
      { step: 2, title: 'Map Accounts', desc: 'Match revenue categories to Odoo accounts.' },
      { step: 3, title: 'Auto-Sync', desc: 'Bookings and invoices flow into Odoo.' },
      { step: 4, title: 'Report', desc: 'Run accurate, up-to-date financials.' },
    ],
    relatedIntegrations: ['quyood', 'daftra', 'anb'],
    faq: [
      { q: 'What syncs between StayHub and Odoo?', a: 'Bookings, revenue, and invoices sync into Odoo automatically so your books stay current without manual entry.' },
      { q: 'Does it support ZATCA e-invoicing?', a: 'Yes. The integration supports compliant e-invoicing workflows for the Saudi market.' },
      { q: 'Can I reconcile payouts easily?', a: 'Yes. Synced records make it simple to match channel payouts to bookings.' },
    ],
  },
  {
    slug: 'quyood',
    name: 'Qoyod',
    tagline: 'Saudi Cloud Accounting Software',
    seoTitle: 'Qoyod Accounting Integration | StayHub Saudi Arabia',
    metaDescription:
      'Connect Qoyod with StayHub for automated, ZATCA-compliant invoicing and accounting. Sync booking revenue to your Saudi accounting software.',
    badge: 'Accounting Integration',
    h1: 'Qoyod Accounting Integration',
    arabicH1: 'تكامل المحاسبة مع قيود',
    subtitle: 'Sync your bookings to Qoyod for automated, ZATCA-compliant invoicing built for the Saudi market.',
    color: '#1A73E8',
    stats: [
      { value: 'Saudi', label: 'Cloud accounting' },
      { value: 'ZATCA', label: 'Compliant invoicing' },
      { value: 'Automated', label: 'Revenue sync' },
    ],
    painPoints: [
      { title: 'Manual Invoicing', desc: 'Creating ZATCA-compliant invoices by hand is slow and risky.' },
      { title: 'Data Re-entry', desc: 'Copying booking revenue into Qoyod wastes time.' },
      { title: 'Compliance Worry', desc: 'Keeping invoices ZATCA-compliant manually is stressful.' },
    ],
    benefits: [
      { title: 'ZATCA-Compliant Invoices', desc: 'Generate compliant e-invoices automatically in Qoyod.' },
      { title: 'Revenue Sync', desc: 'Booking revenue flows into Qoyod with no re-entry.' },
      { title: 'Arabic Accounting', desc: 'Built for the Saudi market with Arabic support.' },
      { title: 'Real-Time Books', desc: 'Keep your accounts always up to date.' },
      { title: 'Tax Ready', desc: 'Simplify VAT reporting with synced records.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Qoyod', desc: 'Link your Qoyod account to StayHub.' },
      { step: 2, title: 'Configure', desc: 'Map revenue and tax categories.' },
      { step: 3, title: 'Auto-Invoice', desc: 'Compliant invoices are generated automatically.' },
      { step: 4, title: 'Report', desc: 'Run VAT-ready financial reports.' },
    ],
    relatedIntegrations: ['daftra', 'odoo', 'anb'],
    faq: [
      { q: 'Is Qoyod invoicing ZATCA-compliant?', a: 'Yes. StayHub generates ZATCA-compliant e-invoices in Qoyod automatically from your bookings.' },
      { q: 'Does Qoyod support Arabic?', a: 'Yes. Qoyod is built for the Saudi market with full Arabic accounting support.' },
      { q: 'Will my revenue sync automatically?', a: 'Yes. Booking revenue flows into Qoyod with no manual re-entry.' },
    ],
  },
  {
    slug: 'daftra',
    name: 'Daftra',
    tagline: 'Cloud Accounting & ERP for MENA',
    seoTitle: 'Daftra Accounting Integration | StayHub Saudi Arabia',
    metaDescription:
      'Integrate Daftra with StayHub for automated invoicing and accounting. Sync booking revenue and stay ZATCA-compliant across your portfolio.',
    badge: 'Accounting Integration',
    h1: 'Daftra Accounting Integration',
    arabicH1: 'تكامل المحاسبة مع دفترة',
    subtitle: 'Automate invoicing and accounting by syncing your StayHub bookings into Daftra.',
    color: '#00796B',
    stats: [
      { value: 'MENA', label: 'Cloud accounting' },
      { value: 'ZATCA', label: 'Compliant invoicing' },
      { value: 'Synced', label: 'Booking revenue' },
    ],
    painPoints: [
      { title: 'Manual Entry', desc: 'Typing booking data into Daftra by hand is repetitive and error-prone.' },
      { title: 'Invoice Delays', desc: 'Slow invoicing delays payment and reporting.' },
      { title: 'Compliance Effort', desc: 'Staying ZATCA-compliant manually takes constant attention.' },
    ],
    benefits: [
      { title: 'Automated Invoicing', desc: 'Invoices are created in Daftra from your bookings.' },
      { title: 'Revenue Sync', desc: 'Booking revenue flows into Daftra automatically.' },
      { title: 'ZATCA Compliance', desc: 'Generate compliant e-invoices for the Saudi market.' },
      { title: 'Arabic Support', desc: 'Full Arabic accounting for local operations.' },
      { title: 'Current Reports', desc: 'Keep financial reporting always up to date.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect Daftra', desc: 'Link your Daftra account to StayHub.' },
      { step: 2, title: 'Map Accounts', desc: 'Match revenue and tax categories.' },
      { step: 3, title: 'Auto-Sync', desc: 'Bookings and invoices flow into Daftra.' },
      { step: 4, title: 'Report', desc: 'Run accurate, compliant financials.' },
    ],
    relatedIntegrations: ['quyood', 'odoo', 'anb'],
    faq: [
      { q: 'What does the Daftra integration sync?', a: 'Bookings, revenue, and invoices sync into Daftra automatically so your accounting stays current.' },
      { q: 'Is invoicing ZATCA-compliant?', a: 'Yes. Daftra generates ZATCA-compliant e-invoices for the Saudi market.' },
      { q: 'Does Daftra support Arabic?', a: 'Yes. Daftra offers full Arabic accounting support.' },
    ],
  },
  {
    slug: 'anb',
    name: 'ANB',
    tagline: 'Arab National Bank',
    seoTitle: 'ANB Bank Payment Integration | StayHub Saudi Arabia',
    metaDescription:
      'Connect Arab National Bank (ANB) with StayHub for secure payment collection and reconciliation. Streamline payouts and financial tracking.',
    badge: 'Bank Integration',
    h1: 'ANB Bank Integration',
    arabicH1: 'تكامل مع البنك العربي الوطني',
    subtitle: 'Collect payments and reconcile payouts securely through Arab National Bank, tracked in StayHub.',
    color: '#B71C1C',
    stats: [
      { value: 'Secure', label: 'Payment collection' },
      { value: 'SAR', label: 'Local settlement' },
      { value: 'Auto', label: 'Reconciliation' },
    ],
    painPoints: [
      { title: 'Payment Friction', desc: 'Collecting guest payments without a local bank link is clunky.' },
      { title: 'Manual Reconciliation', desc: 'Matching bank settlements to bookings by hand is tedious.' },
      { title: 'Cash Flow Blind Spots', desc: 'Without sync, you lack a clear view of incoming funds.' },
    ],
    benefits: [
      { title: 'Secure Collection', desc: 'Collect guest payments securely through ANB.' },
      { title: 'Local SAR Settlement', desc: 'Settle funds in SAR with a trusted Saudi bank.' },
      { title: 'Auto Reconciliation', desc: 'Match settlements to bookings automatically.' },
      { title: 'Cash Flow Clarity', desc: 'Track incoming payments in StayHub in real time.' },
      { title: 'Financial Reporting', desc: 'Bank data feeds your unified financial reports.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect ANB', desc: 'Link your ANB account to StayHub.' },
      { step: 2, title: 'Collect Payments', desc: 'Guest payments process through ANB.' },
      { step: 3, title: 'Auto-Reconcile', desc: 'Settlements match to bookings automatically.' },
      { step: 4, title: 'Report', desc: 'Track cash flow and run reports.' },
    ],
    relatedIntegrations: ['odoo', 'quyood', 'daftra'],
    faq: [
      { q: 'How does the ANB integration help?', a: 'StayHub collects guest payments through ANB, settles in SAR, and reconciles settlements to bookings automatically.' },
      { q: 'Is payment collection secure?', a: 'Yes. Payments are processed securely through Arab National Bank’s infrastructure.' },
      { q: 'Will settlements reconcile automatically?', a: 'Yes. ANB settlements are matched to bookings in StayHub for clean financial records.' },
    ],
  },
  {
    slug: 'whatsapp',
    name: 'WhatsApp',
    tagline: "The World's Most Popular Messaging App",
    seoTitle: 'WhatsApp Integration for Guest Messaging | StayHub Saudi Arabia',
    metaDescription:
      'Automate guest communication on WhatsApp with StayHub. Send booking confirmations, check-in details, and review requests in Arabic and English.',
    badge: 'Messaging Integration',
    h1: 'WhatsApp Integration',
    arabicH1: 'تكامل مع واتساب',
    subtitle: 'Automate guest messaging on WhatsApp — confirmations, check-in details, and review requests — in Arabic and English.',
    color: '#25D366',
    stats: [
      { value: '#1', label: 'Messaging app in KSA' },
      { value: 'Automated', label: 'Guest journey messages' },
      { value: 'AR/EN', label: 'Bilingual templates' },
    ],
    painPoints: [
      { title: 'Endless Manual Replies', desc: 'Answering every guest on WhatsApp by hand consumes your whole day.' },
      { title: 'Missed Messages', desc: 'Guest messages get lost between team members and channels.' },
      { title: 'Slow Responses', desc: 'Late replies hurt reviews and guest satisfaction.' },
    ],
    benefits: [
      { title: 'Automated Journey Messages', desc: 'Send booking, check-in, and check-out messages on WhatsApp automatically.' },
      { title: 'Bilingual Templates', desc: 'Ready-made Arabic and English message templates.' },
      { title: 'Unified Inbox', desc: 'All WhatsApp chats join your other channels in one inbox.' },
      { title: 'Review Requests', desc: 'Automatically ask happy guests for reviews via WhatsApp.' },
      { title: 'Team Collaboration', desc: 'Assign and track WhatsApp conversations across your team.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect WhatsApp', desc: 'Link your WhatsApp Business number to StayHub.' },
      { step: 2, title: 'Set Templates', desc: 'Choose Arabic/English message templates.' },
      { step: 3, title: 'Automate', desc: 'Messages send at key moments automatically.' },
      { step: 4, title: 'Manage Centrally', desc: 'Handle all WhatsApp chats from one inbox.' },
    ],
    relatedIntegrations: ['vfirst-sms', 'airbnb', 'booking-com'],
    faq: [
      { q: 'How does StayHub automate WhatsApp messaging?', a: 'StayHub sends booking, check-in, check-out, and review-request messages on WhatsApp automatically using bilingual templates triggered by the guest journey.' },
      { q: 'Does it support Arabic?', a: 'Yes. StayHub includes Arabic and English WhatsApp templates for culturally appropriate communication.' },
      { q: 'Can my team manage WhatsApp chats together?', a: 'Yes. All WhatsApp conversations live in a unified inbox where you can assign and track them across your team.' },
    ],
  },
  {
    slug: 'vfirst-sms',
    name: 'VFirst SMS',
    tagline: 'Enterprise SMS & Messaging Gateway',
    seoTitle: 'VFirst SMS Integration for Guest Messaging | StayHub',
    metaDescription:
      'Send automated SMS notifications to guests with VFirst through StayHub. Deliver booking confirmations, access codes, and reminders reliably.',
    badge: 'Messaging Integration',
    h1: 'VFirst SMS Integration',
    arabicH1: 'تكامل الرسائل النصية مع VFirst',
    subtitle: 'Send reliable, automated SMS to guests — confirmations, access codes, and reminders — through VFirst.',
    color: '#5C6BC0',
    stats: [
      { value: 'Reliable', label: 'SMS delivery' },
      { value: 'Automated', label: 'Guest notifications' },
      { value: 'AR/EN', label: 'Bilingual messages' },
    ],
    painPoints: [
      { title: 'Unread App Messages', desc: 'Not every guest uses messaging apps — important updates get missed.' },
      { title: 'Manual Reminders', desc: 'Sending reminders and codes by hand is slow and inconsistent.' },
      { title: 'Delivery Uncertainty', desc: 'Without a reliable gateway, critical messages may not arrive.' },
    ],
    benefits: [
      { title: 'Reliable SMS Delivery', desc: 'Reach every guest with a dependable enterprise gateway.' },
      { title: 'Automated Notifications', desc: 'Send confirmations, access codes, and reminders automatically.' },
      { title: 'Bilingual Messages', desc: 'Deliver SMS in Arabic and English.' },
      { title: 'Fallback Channel', desc: 'Use SMS when guests don’t respond on messaging apps.' },
      { title: 'Delivery Tracking', desc: 'See message delivery status inside StayHub.' },
    ],
    workflowSteps: [
      { step: 1, title: 'Connect VFirst', desc: 'Link your VFirst SMS account to StayHub.' },
      { step: 2, title: 'Set Templates', desc: 'Configure Arabic/English SMS templates.' },
      { step: 3, title: 'Automate', desc: 'SMS sends at key moments automatically.' },
      { step: 4, title: 'Track Delivery', desc: 'Monitor delivery status in StayHub.' },
    ],
    relatedIntegrations: ['whatsapp', 'airbnb', 'booking-com'],
    faq: [
      { q: 'When should I use SMS instead of WhatsApp?', a: 'SMS is a reliable fallback for guests who don’t use messaging apps or don’t respond, ensuring critical updates like access codes always arrive.' },
      { q: 'Does VFirst support Arabic SMS?', a: 'Yes. StayHub sends bilingual Arabic and English SMS through VFirst.' },
      { q: 'Can I track whether messages were delivered?', a: 'Yes. Delivery status is visible inside StayHub.' },
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
