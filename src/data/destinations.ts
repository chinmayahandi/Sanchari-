import { Destination } from "@/types";

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "dest-hampi",
    slug: "hampi",
    name: "Hampi",
    district: "Vijayanagara",
    region: "North Karnataka (Heritage)",
    categories: [
      "Heritage and monuments",
      "Temples and cultural heritage",
      "Adventure and outdoor activities",
    ],
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f443b350?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f443b350?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "The open-air museum of Vijayanagara's golden empire",
    description:
      "A UNESCO World Heritage Site along the banks of the Tungabhadra River, Hampi is surrounded by dramatic granite boulder-strewn hills and evocative 14th-century temple ruins. Once the vibrant capital of the Vijayanagara Empire, it is one of the world's greatest archaeological treasures.",
    highlights: [
      "Virupaksha Temple — Active pilgrimage shrine with a 50m gopuram",
      "Vijaya Vittala Temple — Iconic Stone Chariot and musical pillars",
      "Lotus Mahal and Royal Enclosure ruins",
      "Matanga Hill sunrise panorama across boulder valleys",
      "Tungabhadra coracle (parisal) boat river crossings",
    ],
    thingsToDo: [
      {
        title: "Sunset from Matanga Hill",
        description: "Hike early evening for 360-degree views over Achyutaraya temple and rocky horizons.",
        duration: "2 hours",
      },
      {
        title: "Explore the Vittala Complex with a Heritage Guide",
        description: "Discover acoustic stone pillars, market street colonnades, and the world-famous Stone Chariot.",
        duration: "3 hours",
      },
      {
        title: "Coracle Ride on the Tungabhadra",
        description: "Glide in a traditional circular wicker boat beneath rock formations and riverside shrines.",
        duration: "1 hour",
      },
      {
        title: "Cycle through the Sacred and Royal Centers",
        description: "Rent a bicycle to navigate between the Queen's Bath, Elephant Stables, and Hazara Rama Temple.",
        duration: "Half day",
      },
    ],
    suggestedDuration: "2 to 3 days",
    bestTimeToVisit: {
      months: "October to March",
      reason: "Pleasant winter weather ideal for outdoor walking and boulder explorations.",
      weatherNote: "Summer (April–June) temperatures can reach 40°C with intense daytime sun.",
    },
    travelTips: [
      "Wear comfortable walking shoes with good grip on sun-warmed rocks.",
      "Carry ample water, sun protection, and a wide-brimmed hat.",
      "The nearest railway station is Hosapete Junction (approx. 13 km away).",
      "Licensed guide services are available at main entrance monuments.",
    ],
    nearbyDestinations: [
      { name: "Badami", slug: "badami", distanceKm: 140 },
      { name: "Shivamogga", slug: "shivamogga", distanceKm: 215 },
    ],
    featured: true,
  },
  {
    id: "dest-coorg",
    slug: "coorg",
    name: "Coorg (Kodagu)",
    district: "Kodagu",
    region: "Malnad & Western Ghats",
    categories: [
      "Hill stations",
      "Nature and waterfalls",
      "Family-friendly destinations",
    ],
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "Misty coffee estates, spices, and Kodava hospitality",
    description:
      "Nestled in the lush slopes of the Western Ghats, Kodagu is Karnataka's celebrated coffee country. Renowned for its misty valleys, indigenous Kodava martial heritage, spiced cuisine, and sprawling plantation homestays.",
    highlights: [
      "Abbey Falls and Iruppu Falls tucked in evergreen forests",
      "Raja's Seat scenic sunset overlook in Madikeri",
      "Namdroling Monastery (Golden Temple) in Bylakuppe",
      "Coffee, black pepper, and cardamom estate trails",
      "Tadiandamol Peak — Highest peak in Kodagu district",
    ],
    thingsToDo: [
      {
        title: "Coffee Plantation Guided Walk",
        description: "Learn how Arabica and Robusta berries are grown, shade-canopied, and harvested.",
        duration: "2.5 hours",
      },
      {
        title: "Trek to Tadiandamol Peak",
        description: "Traverse rolling shola grasslands to reach panoramic views of the Western Ghats.",
        duration: "Full day",
      },
      {
        title: "Bylakuppe Tibetan Settlement Visit",
        description: "Experience the calming chanting halls and ornate statues at the Golden Temple.",
        duration: "3 hours",
      },
    ],
    suggestedDuration: "3 to 4 days",
    bestTimeToVisit: {
      months: "October to April",
      reason: "Clear skies, fragrant coffee blossoms (March–April), and cool evening temperatures.",
      weatherNote: "Monsoons (July–August) bring heavy rainfall, ideal for nature lovers but slippery for trekking.",
    },
    travelTips: [
      "Homestays offer the most authentic experience of Kodava meals and family hospitality.",
      "Pack light woollens for chilly evenings in Madikeri and higher elevations.",
      "Pick up fresh Coorg honey, homemade chocolates, and freshly roasted coffee beans.",
    ],
    nearbyDestinations: [
      { name: "Mysuru", slug: "mysuru", distanceKm: 120 },
      { name: "Chikkamagaluru", slug: "chikkamagaluru", distanceKm: 140 },
    ],
    featured: true,
  },
  {
    id: "dest-mysuru",
    slug: "mysuru",
    name: "Mysuru",
    district: "Mysuru",
    region: "South Karnataka & Mysore Region",
    categories: [
      "Heritage and monuments",
      "Family-friendly destinations",
      "Local food and crafts",
      "Temples and cultural heritage",
    ],
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600100397608-f010f443b350?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "The royal city of palaces, silk, sandalwood, and sweet heritage",
    description:
      "Mysuru embodies the cultural grandeur of the Wadiyar dynasty. Famous for the majestic illumination of the Mysore Palace, heritage markets scented with jasmine, pure silk sarees, and traditional confectionery like the melt-in-mouth Mysore Pak.",
    highlights: [
      "Mysore Palace (Amba Vilas) with its Indo-Saracenic grandeur",
      "Chamundi Hills and the monumental Nandi monolith",
      "Devaraja Market — Century-old bustling bazaar of colors and spices",
      "Brindavan Gardens and Krishnarajasagara Dam",
      "St. Philomena’s Cathedral Gothic architecture",
    ],
    thingsToDo: [
      {
        title: "Evening Palace Illumination",
        description: "Witness nearly 100,000 bulbs light up the grand facade on Sundays and festive days.",
        duration: "1.5 hours",
      },
      {
        title: "Walk Devaraja Heritage Market",
        description: "Explore rows of conical kumkuma powder mounds, fragrant Mysore mallige jasmine, and betel leaves.",
        duration: "2 hours",
      },
      {
        title: "Climb Chamundi Hill Steps",
        description: "Walk the 1,000 stone steps built by the Maharajas to seek blessings at the summit shrine.",
        duration: "2.5 hours",
      },
    ],
    suggestedDuration: "2 to 3 days",
    bestTimeToVisit: {
      months: "September to March",
      reason: "Pleasant climate and celebrated Dasara festivities during September/October.",
      weatherNote: "Comfortable temperatures throughout the year with moderate rainfall.",
    },
    travelTips: [
      "Avoid unofficial vendors around the palace; use designated ticket kiosks.",
      "Sample hot Mylari dosas and traditional Mysore Pak from century-old sweet shops.",
      "Easily accessible from Bengaluru via the 10-lane expressway or Vande Bharat express.",
    ],
    nearbyDestinations: [
      { name: "Coorg", slug: "coorg", distanceKm: 120 },
      { name: "Chikkamagaluru", slug: "chikkamagaluru", distanceKm: 175 },
    ],
    featured: true,
  },
  {
    id: "dest-gokarna",
    slug: "gokarna",
    name: "Gokarna",
    district: "Uttara Kannada",
    region: "Coastal Karnataka",
    categories: [
      "Beaches and coastal escapes",
      "Temples and cultural heritage",
      "Adventure and outdoor activities",
    ],
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "Sacred coastlines, cliff trails, and tranquil Arabian tides",
    description:
      "Where the Western Ghats gently descend into the Arabian Sea, Gokarna preserves a unique dual character: an ancient pilgrimage hub centered around the Mahabaleshwar temple and a serene haven of crescent-shaped beaches reachable by scenic coastal cliff treks.",
    highlights: [
      "Om Beach, Kudle Beach, Half Moon Beach, and Paradise Beach",
      "Mahabaleshwar Temple and the sacred Atmalinga legend",
      "Five Beach Trek along scenic coastal headlands",
      "Cliffside cafes and sunset views over the Arabian Sea",
      "Mirjan Fort — Laterite architecture nearby",
    ],
    thingsToDo: [
      {
        title: "The Five Beach Coastal Trek",
        description: "Hike from Kudle over rocky cliffs through Om, Half Moon, and Paradise Beach.",
        duration: "4 hours",
      },
      {
        title: "Visit Historic Mahabaleshwar Temple",
        description: "Participate in early morning sea rituals and temple darshan in traditional attire.",
        duration: "2 hours",
      },
      {
        title: "Sunset at Kudle Beach Point",
        description: "Relax by the shore watching local fishing boats against the golden twilight.",
        duration: "Evening",
      },
    ],
    suggestedDuration: "3 to 4 days",
    bestTimeToVisit: {
      months: "October to March",
      reason: "Calm seas, open shacks, and comfortable sea breezes.",
      weatherNote: "Monsoon period (June–September) brings rough seas and temple-centric atmosphere.",
    },
    travelTips: [
      "Strict dress codes apply within the inner sanctum of the Mahabaleshwar temple.",
      "Wear sturdy trail sandals for hiking between beach coves.",
      "Carry cash as certain remote beach cafes have intermittent digital network connectivity.",
    ],
    nearbyDestinations: [
      { name: "Udupi", slug: "udupi", distanceKm: 175 },
      { name: "Badami", slug: "badami", distanceKm: 270 },
    ],
    featured: true,
  },
  {
    id: "dest-chikkamagaluru",
    slug: "chikkamagaluru",
    name: "Chikkamagaluru",
    district: "Chikkamagaluru",
    region: "Malnad & Western Ghats",
    categories: [
      "Hill stations",
      "Nature and waterfalls",
      "Adventure and outdoor activities",
    ],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "The birthplace of Indian coffee nestled beneath Karnataka's highest peak",
    description:
      "Tucked under the Bababudan range where Baba Budan first planted coffee seeds smuggled from Yemen in the 17th century. Chikkamagaluru is celebrated for its rolling emerald estates, cascading waterfalls, and Mullayanagiri peak.",
    highlights: [
      "Mullayanagiri — Highest mountain peak in Karnataka (1,930 m)",
      "Baba Budangiri and Dattatreya Peetha ridge",
      "Hebbe Falls and Kalhatti Falls deep in Malnad forests",
      "Bhadra Wildlife Sanctuary jeep safaris",
      "Century-old British and Malnad coffee estate bungalows",
    ],
    thingsToDo: [
      {
        title: "Summit Trek to Mullayanagiri",
        description: "Climb steps through cloud cover to reach the small Shiva temple at the pinnacle.",
        duration: "3 hours",
      },
      {
        title: "4x4 Jeep Safari to Hebbe Falls",
        description: "Rumble through rugged coffee estate trails followed by a short forest hike to double-tier waterfalls.",
        duration: "Half day",
      },
      {
        title: "Coffee Roasting & Cupping Session",
        description: "Learn to distinguish Arabica floral notes from Robusta body with local growers.",
        duration: "2 hours",
      },
    ],
    suggestedDuration: "2 to 3 days",
    bestTimeToVisit: {
      months: "September to May",
      reason: "Post-monsoon lush greenery and refreshing winter morning mists.",
      weatherNote: "Winters are cool and crisp with daytime temperatures averaging 22°C.",
    },
    travelTips: [
      "Steep hill roads require careful driving or experienced local 4WD drivers.",
      "Stay in an estate homestay to experience Malnad vegetarian dishes like Akki Roti and Halasina Hannu delicacies.",
    ],
    nearbyDestinations: [
      { name: "Coorg", slug: "coorg", distanceKm: 140 },
      { name: "Shivamogga", slug: "shivamogga", distanceKm: 95 },
    ],
    featured: true,
  },
  {
    id: "dest-badami",
    slug: "badami",
    name: "Badami",
    district: "Bagalkot",
    region: "North Karnataka (Heritage)",
    categories: [
      "Heritage and monuments",
      "Temples and cultural heritage",
    ],
    heroImage: "https://images.unsplash.com/photo-1627993078456-91e779a5ea5f?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627993078456-91e779a5ea5f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600100397608-f010f443b350?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "Red sandstone rock-cut caves of the early Chalukya kings",
    description:
      "Formerly known as Vatapi, Badami was the majestic capital of the Early Chalukyas from the 6th to 8th centuries. Set dramatically around the waters of Agastya Lake, it is famed for its monumental rock-cut cave temples carved directly into rugged red sandstone cliffs.",
    highlights: [
      "Four monumental Cave Temples (Vedic, Vaishnava, and Jain)",
      "Bhuthanatha Group of Temples on the edge of Agastya Lake",
      "Badami Fort perched on northern cliff rocks",
      "Nearby UNESCO sites of Pattadakal and Aihole (Cradle of Indian Temple Architecture)",
    ],
    thingsToDo: [
      {
        title: "Explore the Rock-Cut Cave Sanctuaries",
        description: "Marvel at the 18-armed dancing Nataraja carving and Varaha reliefs inside cave one and two.",
        duration: "3 hours",
      },
      {
        title: "Sunset Walk around Agastya Lake",
        description: "Watch the red sandstone cliffs and Bhuthanatha temple reflect in the calm lake waters.",
        duration: "2 hours",
      },
      {
        title: "Day Excursion to Pattadakal & Aihole",
        description: "Visit the coronation complex of Chalukyan kings with blend of Nagara and Dravida styles.",
        duration: "Full day",
      },
    ],
    suggestedDuration: "2 days",
    bestTimeToVisit: {
      months: "October to February",
      reason: "Cooler climate suited for exploring exposed stone cliffs and archaeological monuments.",
      weatherNote: "Bagalkot district can be quite hot from March to May.",
    },
    travelTips: [
      "Combine Badami with Aihole (35 km) and Pattadakal (22 km) for the complete Chalukyan architectural circuit.",
      "Wear sturdy walking shoes for rocky stairs.",
      "Local guides offer fascinating insights into 6th-century rock-sculpting techniques.",
    ],
    nearbyDestinations: [
      { name: "Hampi", slug: "hampi", distanceKm: 140 },
      { name: "Gokarna", slug: "gokarna", distanceKm: 270 },
    ],
    featured: true,
  },
  {
    id: "dest-udupi",
    slug: "udupi",
    name: "Udupi",
    district: "Udupi",
    region: "Coastal Karnataka",
    categories: [
      "Beaches and coastal escapes",
      "Temples and cultural heritage",
      "Local food and crafts",
      "Family-friendly destinations",
    ],
    heroImage: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "Temple bells, legendary vegetarian culinary tradition, and island shores",
    description:
      "A coastal jewel founded on devotion, culinary finesse, and oceanic calm. Udupi is globally famous for its Krishna Matha founded by Saint Madhvacharya, the Kanakana Kindi window, unique coastal Tuluva culture, and Malpe beach.",
    highlights: [
      "Sri Krishna Matha and the historic Car Street",
      "St. Mary's Island hexagonal basaltic volcanic rock formations",
      "Malpe Beach watersports and sea walk promenade",
      "Kaup Lighthouse with sweeping coastal vistas",
      "World-renowned Udupi vegetarian thali and Neer Dosa with Gassi",
    ],
    thingsToDo: [
      {
        title: "Boat Trip to St. Mary's Island",
        description: "Take a ferry from Malpe to walk among millions-of-years-old volcanic columnar rocks.",
        duration: "3 hours",
      },
      {
        title: "Darshan and Anna Santana at Krishna Matha",
        description: "View Lord Krishna through the ornate nine-holed silver window (Kanakana Kindi).",
        duration: "2 hours",
      },
      {
        title: "Sunset Climb up Kaup Lighthouse",
        description: "Climb the spiral staircase of the 1901 British lighthouse overlooking pristine sands.",
        duration: "1.5 hours",
      },
    ],
    suggestedDuration: "2 to 3 days",
    bestTimeToVisit: {
      months: "October to March",
      reason: "Pleasant coastal weather, open boat rides to St. Mary's Island, and temple festivals.",
      weatherNote: "Boat rides to St. Mary's Island are suspended during monsoon season (June–mid-September).",
    },
    travelTips: [
      "Don't miss authentic coastal breakfast: Goli Baje, Neer Dosa, and aromatic filter coffee.",
      "Traditional Yakshagana dance performances happen frequently during winter festivals.",
    ],
    nearbyDestinations: [
      { name: "Gokarna", slug: "gokarna", distanceKm: 175 },
      { name: "Chikkamagaluru", slug: "chikkamagaluru", distanceKm: 160 },
    ],
    featured: true,
  },
  {
    id: "dest-shivamogga",
    slug: "shivamogga",
    name: "Shivamogga (Shimoga)",
    district: "Shivamogga",
    region: "Malnad & Western Ghats",
    categories: [
      "Nature and waterfalls",
      "Adventure and outdoor activities",
      "Family-friendly destinations",
    ],
    heroImage: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    ],
    tagline: "Gateway to the Malnad heartland and majestic Jog Falls",
    description:
      "Known as the Gateway to Malnad, Shivamogga is a verdant land watered by the Tunga, Bhadra, and Sharavathi rivers. Home to Jog Falls—where the Sharavathi river plunges 253 meters in four distinct cascades (Raja, Roarer, Rocket, and Rani).",
    highlights: [
      "Jog Falls — Second highest plunge waterfall in India",
      "Sharavathi Valley Wildlife Sanctuary and backwaters",
      "Sakrebyle Elephant Camp on the banks of River Tunga",
      "Tyavarekoppa Lion and Tiger Safari",
      "Ikkeri Aghoreshwara Temple stone architecture",
    ],
    thingsToDo: [
      {
        title: "Marvel at Jog Falls Viewing Platform",
        description: "Watch the massive roar of Sharavathi river drop into the misty canyon depths.",
        duration: "3 hours",
      },
      {
        title: "Morning Bathing Session at Sakrebyle",
        description: "Watch mahouts bathe elephants in the cool morning waters of the Tunga River.",
        duration: "2 hours",
      },
      {
        title: "Kayaking in Sharavathi Backwaters",
        description: "Paddle across calm green backwaters surrounded by untouched rainforest ridges.",
        duration: "Half day",
      },
    ],
    suggestedDuration: "2 to 3 days",
    bestTimeToVisit: {
      months: "August to December",
      reason: "Peak water volume at Jog Falls right after monsoons, followed by cool winter months.",
      weatherNote: "Water volume reduces in peak summer months (March–May).",
    },
    travelTips: [
      "Carry rain gear if visiting in late August or September to enjoy waterfalls in full glory.",
      "Try local Malnad specialties such as Todadevu sweet crepes and Thambli herbal soups.",
    ],
    nearbyDestinations: [
      { name: "Chikkamagaluru", slug: "chikkamagaluru", distanceKm: 95 },
      { name: "Hampi", slug: "hampi", distanceKm: 215 },
    ],
    featured: true,
  },
];
