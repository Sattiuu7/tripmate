export const destinations = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    tagline: "The Pink City of Royal Forts & Vibrant Bazaars",
    description: "A UNESCO World Heritage city bursting with majestic hill forts, pink-hued palaces, bustling traditional bazaars, and delectable street delicacies.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    tags: ["History", "Heritage", "Shopping", "Food", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1100, standard: 2200, comfort: 4200 },
    bestSeason: "October to March",
    idealDuration: 3,
    weatherCode: "pleasant",
    attractions: [
      {
        id: "jpr_hawa_mahal",
        name: "Hawa Mahal (Palace of Winds)",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 1.5,
        entryFee: 50,
        openingHours: "09:00 AM - 05:00 PM",
        description: "Iconic honeycomb facade with 953 jharokhas designed for royal women to observe street festivities while unobserved.",
        coords: { lat: 26.9239, lng: 75.8267 },
        verified: true,
        ecoTip: "Buy composite heritage ticket at Hawa Mahal to save ₹150 across Amber Fort, Jantar Mantar, and Albert Hall.",
        imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jpr_amber_fort",
        name: "Amber Fort & Palace",
        type: "History",
        timeSlot: "morning",
        estimatedDuration: 3,
        entryFee: 100,
        openingHours: "08:00 AM - 05:30 PM",
        description: "Sprawling hilltop fortress with Sheesh Mahal (mirror palace), Mughal gardens, and sweeping Maota Lake views.",
        coords: { lat: 26.9855, lng: 75.8513 },
        verified: true,
        ecoTip: "Walk up the scenic stone ramp or take government e-rickshaws instead of animal rides for cruelty-free sustainable travel.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jpr_city_palace",
        name: "Jaipur City Palace & Museum",
        type: "History",
        timeSlot: "afternoon",
        estimatedDuration: 2,
        entryFee: 200,
        openingHours: "09:30 AM - 05:00 PM",
        description: "The ceremonial seat of the Maharaja of Jaipur, featuring courtyards, Pritam Niwas Chowk peacock gate, and royal armory.",
        coords: { lat: 26.9258, lng: 75.8236 },
        verified: true,
        ecoTip: "Hire a licensed local heritage guide at the counter to support decent employment for local historians (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jpr_jantar_mantar",
        name: "Jantar Mantar Astronomical Observatory",
        type: "History",
        timeSlot: "afternoon",
        estimatedDuration: 1.5,
        entryFee: 50,
        openingHours: "09:00 AM - 04:30 PM",
        description: "World Heritage collection of nineteen architectural astronomical instruments built by Sawai Jai Singh II.",
        coords: { lat: 26.9248, lng: 75.8246 },
        verified: true,
        ecoTip: "Visit around midday when the giant sundial casts crisp, accurate shadow time readings.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jpr_nahargarh",
        name: "Nahargarh Fort Sunset Viewpoint",
        type: "Mountains",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 50,
        openingHours: "10:00 AM - 06:30 PM",
        description: "Perched on the edge of the Aravalli Hills overlooking the entire glowing pink city at golden sunset.",
        coords: { lat: 26.9388, lng: 75.8155 },
        verified: true,
        ecoTip: "Carry your own refillable water flask to avoid single-use plastic waste at hill altitudes.",
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "jpr_bazaars",
        name: "Johari & Bapu Bazaar Walk",
        type: "Shopping",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "11:00 AM - 09:00 PM",
        description: "Vibrant pedestrian shopping avenues famous for authentic block prints, mojaris, blue pottery, and lac bangles.",
        coords: { lat: 26.9200, lng: 75.8210 },
        verified: true,
        ecoTip: "Support independent artisan stalls directly rather than luxury showroom middlemen (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "jpr_hostel_zostel",
        name: "Zostel Jaipur (M.I. Road)",
        type: "hostel",
        pricePerNight: 599,
        rating: 4.6,
        reviewsCount: 1840,
        amenities: ["Free High-speed WiFi", "Rooftop Café", "Common Lounge", "Luggage Storage", "AC Dorms", "Female Dorms Available"],
        address: "First Floor, Mathuradas Building, M.I. Road, Jaipur",
        coords: { lat: 26.9180, lng: 75.8050 },
        whyBudget: "Top rated hostel with vibrant student community, free walking tours, and rooftop games.",
        bookingUrl: "https://www.zostel.com",
        ecoFriendly: true
      },
      {
        id: "jpr_homestay_krishna",
        name: "Krishna Heritage Eco-Homestay",
        type: "homestay",
        pricePerNight: 1250,
        rating: 4.8,
        reviewsCount: 420,
        amenities: ["Home Cooked Breakfast", "Solar Water Heating", "Quiet Courtyard", "Filtered Water Dispenser", "Host Guide Map"],
        address: "Near Sindhi Camp, Bani Park, Jaipur",
        coords: { lat: 26.9220, lng: 75.7980 },
        whyBudget: "Family-run Rajput home with authentic home-cooked Rajasthani thalis and zero plastic policy.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      },
      {
        id: "jpr_hotel_kalyan",
        name: "Hotel Kalyan & Heritage Rooftop",
        type: "budget_hotel",
        pricePerNight: 1450,
        rating: 4.3,
        reviewsCount: 890,
        amenities: ["Rooftop Restaurant", "Attached Bath", "Elevator", "Tour Desk", "Free Pick-up from Station"],
        address: "59 Hathroi Fort, Ajmer Road, Jaipur",
        coords: { lat: 26.9110, lng: 75.7950 },
        whyBudget: "Clean ensuite private rooms with fort views, popular among budget families and couples.",
        bookingUrl: "https://www.booking.com",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "jpr_rest_rawat",
        name: "Rawat Mishthan Bhandar",
        mealType: "breakfast",
        dietary: "veg",
        avgCostForTwo: 220,
        signatureDishes: ["Pyaz Pyaaz Ki Kachori", "Mawa Kachori", "Mirchi Vada", "Lassi"],
        address: "Opposite Polovictory Cinema, Station Road, Jaipur",
        coords: { lat: 26.9212, lng: 75.7988 },
        ecoTip: "Iconic century-old spot. Come early at 8:30 AM to avoid crowds and get piping hot kachoris."
      },
      {
        id: "jpr_rest_laxmi",
        name: "Laxmi Mishthan Bhandar (LMB)",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 600,
        signatureDishes: ["Royal Rajasthani Dal Baati Churma", "Ghewar", "Ker Sangri"],
        address: "Johari Bazaar, Pink City, Jaipur",
        coords: { lat: 26.9210, lng: 75.8230 },
        ecoTip: "Famous heritage vegetarian institution; order the half thali to prevent food wastage."
      },
      {
        id: "jpr_rest_gulab",
        name: "Gulab Ji Chai Wale & Bun Maska",
        mealType: "street_food",
        dietary: "veg",
        avgCostForTwo: 90,
        signatureDishes: ["Masala Chai in Kulhad", "Bun Maska with Pav Bhaji"],
        address: "Ganpati Plaza, MI Road, Jaipur",
        coords: { lat: 26.9189, lng: 75.8015 },
        ecoTip: "Serves tea in biodegradable clay kulhads supporting local potter communities (SDG 12)."
      },
      {
        id: "jpr_rest_handi",
        name: "Handi Restaurant & Maya Rooftop",
        mealType: "dinner",
        dietary: "all",
        avgCostForTwo: 550,
        signatureDishes: ["Laal Maas", "Handi Meat", "Paneer Butter Masala", "Roomali Roti"],
        address: "Maya Mansion, Opp GPO, MI Road, Jaipur",
        coords: { lat: 26.9175, lng: 75.8035 },
        ecoTip: "Great rooftop ambience with both vegetarian and traditional authentic meat specialities."
      }
    ],
    transportOptions: [
      {
        fromCity: "Delhi",
        modes: [
          { type: "train", avgFare: 190, durationHours: 4.5, provider: "Indian Railways (Double Decker / Shatabdi / Intercity)", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 320, durationHours: 5.5, provider: "RSRTC Express & Volvo Sleeper", bookingUrl: "https://www.redbus.in" },
          { type: "flight", avgFare: 2100, durationHours: 1.0, provider: "IndiGo / SpiceJet", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Mumbai",
        modes: [
          { type: "train", avgFare: 520, durationHours: 16.5, provider: "Jaipur Superfast Express / Aravali Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 3200, durationHours: 1.8, provider: "Air India / IndiGo", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Bengaluru",
        modes: [
          { type: "train", avgFare: 840, durationHours: 39, provider: "Jaipur Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 4200, durationHours: 2.5, provider: "IndiGo / Akasa Air", bookingUrl: "https://www.makemytrip.com" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 15,
      autoPerDayAvg: 300,
      eRickshawPerRide: 20,
      scooterRentPerDay: 400,
      walkingSuitability: "High in walled city Pink City markets"
    }
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    region: "West Coast",
    tagline: "Sun-Kissed Beaches, Portuguese Quarters & Laid-Back Vibes",
    description: "Tropical coastal haven known for golden sandy beaches, historic UNESCO churches, vibrant night shacks, fresh seafood, and palm-fringed backwaters.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.2993, lng: 74.1240 },
    tags: ["Beaches", "Nature", "Food", "Adventure", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1200, standard: 2400, comfort: 4800 },
    bestSeason: "November to March",
    idealDuration: 4,
    weatherCode: "warm_coastal",
    attractions: [
      {
        id: "goa_anjuna_flea",
        name: "Anjuna & Ozran Beach Coastline",
        type: "Beaches",
        timeSlot: "morning",
        estimatedDuration: 3,
        entryFee: 0,
        openingHours: "Open 24 Hours",
        description: "Red rocky coastline, swaying coconut groves, laid-back beach cafes, and refreshing ocean breeze.",
        coords: { lat: 15.5800, lng: 73.7430 },
        verified: true,
        ecoTip: "Participate in 'Leave No Trace' beach culture; refrain from plastic bottles on the shores.",
        imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "goa_fontainhas",
        name: "Fontainhas Latin Quarter Heritage Walk",
        type: "Heritage",
        timeSlot: "afternoon",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "09:00 AM - 07:00 PM",
        description: "Asia's only Latin Quarter featuring pastel-painted Portuguese villas, azulejos tiles, and historic bakeries in Panaji.",
        coords: { lat: 15.4989, lng: 73.8278 },
        verified: true,
        ecoTip: "Walk gently and respect residents' residential privacy while photographing vibrant colored doors.",
        imageUrl: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "goa_bom_jesus",
        name: "Basilica of Bom Jesus (Old Goa)",
        type: "History",
        timeSlot: "morning",
        estimatedDuration: 1.5,
        entryFee: 0,
        openingHours: "09:00 AM - 06:30 PM",
        description: "16th-century UNESCO World Heritage church housing the sacred mortal remains of St. Francis Xavier.",
        coords: { lat: 15.5009, lng: 73.9116 },
        verified: true,
        ecoTip: "Dress respectfully covering shoulders and knees; free audio guides available at portal.",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "goa_chapora_fort",
        name: "Chapora Fort ('Dil Chahta Hai' Fort)",
        type: "Adventure",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "06:00 AM - 06:30 PM",
        description: "Historic laterite ramparts offering panoramic sunset views across the Chapora river estuary and Vagator sea.",
        coords: { lat: 15.6059, lng: 73.7364 },
        verified: true,
        ecoTip: "Hike up in good footwear; capture stunning panoramic sunset photos without ticket fees.",
        imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "goa_dudhsagar",
        name: "Dudhsagar Waterfalls Day Hike",
        type: "Nature",
        timeSlot: "morning",
        estimatedDuration: 4.5,
        entryFee: 150,
        openingHours: "07:00 AM - 04:00 PM",
        description: "Four-tiered massive cascade resembling a sea of milk nestled within Bhagwan Mahaveer Sanctuary.",
        coords: { lat: 15.3144, lng: 74.3143 },
        verified: true,
        ecoTip: "Use shared government forest jeeps to reduce carbon footprint and protect wildlife trails.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "goa_hostel_jungle",
        name: "The Hosteller Goa (Anjuna)",
        type: "hostel",
        pricePerNight: 550,
        rating: 4.7,
        reviewsCount: 1580,
        amenities: ["Swimming Pool", "High-speed Wi-Fi", "Coworking Space", "Bar & Cafe", "Bicycle Rental", "Lockers"],
        address: "Deulvaddo, Anjuna, North Goa",
        coords: { lat: 15.5820, lng: 73.7480 },
        whyBudget: "Top backpacker choice with swimming pool, community events, and 10 mins walk to beach.",
        bookingUrl: "https://www.thehosteller.com",
        ecoFriendly: true
      },
      {
        id: "goa_homestay_fernandes",
        name: "Fernandes Wooden Eco Cottages (Palolem)",
        type: "homestay",
        pricePerNight: 1350,
        rating: 4.8,
        reviewsCount: 510,
        amenities: ["Beachfront Access", "Mosquito Nets", "Organic Garden Cafe", "Hammocks", "Filtered RO Water"],
        address: "Palolem Beach South, Canacona, South Goa",
        coords: { lat: 15.0100, lng: 74.0230 },
        whyBudget: "Family-run sustainable palm-leaf cottages directly touching the calm south waters.",
        bookingUrl: "https://www.airbnb.co.in",
        ecoFriendly: true
      },
      {
        id: "goa_hotel_calangute",
        name: "Seashell Budget Inn",
        type: "budget_hotel",
        pricePerNight: 1600,
        rating: 4.2,
        reviewsCount: 640,
        amenities: ["Balcony AC Rooms", "Complimentary Breakfast", "Scooter Parking", "Close to Market"],
        address: "Holiday Street, Gauravaddo, Calangute, Goa",
        coords: { lat: 15.5390, lng: 73.7680 },
        whyBudget: "Central location near market and beach with clean air-conditioned private rooms.",
        bookingUrl: "https://www.booking.com",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "goa_rest_vinayak",
        name: "Vinayak Family Restaurant",
        mealType: "lunch",
        dietary: "all",
        avgCostForTwo: 350,
        signatureDishes: ["Special Goan Fish Thali", "Prawn Curry Rice", "Sol Kadhi", "Veg Goan Thali"],
        address: "Near Main Circle, Assagao, Goa",
        coords: { lat: 15.5905, lng: 73.7710 },
        ecoTip: "Beloved local gem with the most pocket-friendly authentic Goan thali in the state."
      },
      {
        id: "goa_rest_artbistro",
        name: "Artjuna Garden Cafe & Bakery",
        mealType: "breakfast",
        dietary: "vegan",
        avgCostForTwo: 480,
        signatureDishes: ["Shakshuka", "Organic Smoothie Bowls", "Fresh Croissants", "Pour-over Coffee"],
        address: "Market Road, Monteiro Vaddan, Anjuna, Goa",
        coords: { lat: 15.5760, lng: 73.7490 },
        ecoTip: "Set in a lush mango grove; zero single-use plastic and organic local produce (SDG 12)."
      },
      {
        id: "goa_rest_fat_fish",
        name: "Fat Fish Goan Kitchen",
        mealType: "dinner",
        dietary: "all",
        avgCostForTwo: 650,
        signatureDishes: ["Caldine Curry", "Rava Fried Kingfish", "Mushroom Xacuti", "Poi Bread"],
        address: "Agarvaddo, Calangute-Arpora Road, Goa",
        coords: { lat: 15.5510, lng: 73.7660 },
        ecoTip: "Locally sourced catch of the day from small-scale Goan fishermen."
      },
      {
        id: "goa_rest_cafe_bhosle",
        name: "Cafe Bhosle (Since 1920)",
        mealType: "street_food",
        dietary: "veg",
        avgCostForTwo: 140,
        signatureDishes: ["Sukha Puri Bhaji", "Chana Masala with Hot Pao", "Sheera", "Filter Coffee"],
        address: "Near Municipal Market, Panaji, Goa",
        coords: { lat: 15.4975, lng: 73.8260 },
        ecoTip: "Over 100 years of serving authentic vegetarian Goan morning breakfasts to locals for under ₹70."
      }
    ],
    transportOptions: [
      {
        fromCity: "Mumbai",
        modes: [
          { type: "train", avgFare: 360, durationHours: 9.5, provider: "Konkan Kanya Express / Vande Bharat", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 650, durationHours: 12.0, provider: "Paulo Travels Sleeper Bus", bookingUrl: "https://www.redbus.in" },
          { type: "flight", avgFare: 2400, durationHours: 1.1, provider: "IndiGo / Akasa Air", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Bengaluru",
        modes: [
          { type: "train", avgFare: 390, durationHours: 12.5, provider: "Yesvantpur Vasco Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 700, durationHours: 11.0, provider: "KSRTC Airavat Club Class", bookingUrl: "https://www.ksrtc.in" },
          { type: "flight", avgFare: 2200, durationHours: 1.1, provider: "IndiGo / Air India Express", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Delhi",
        modes: [
          { type: "train", avgFare: 760, durationHours: 25.0, provider: "Goa Sampark Kranti Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 4200, durationHours: 2.5, provider: "SpiceJet / IndiGo", bookingUrl: "https://www.makemytrip.com" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 600,
      eRickshawPerRide: 0,
      scooterRentPerDay: 350,
      walkingSuitability: "Best explored by rented scooter (₹350/day) or shared local Kadamba bus (₹15/ticket)"
    }
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    region: "Himalayas / North",
    tagline: "Himalayan Wonderland of Pine Forests & Snow Peaks",
    description: "Nestled in the Beas River Valley, Manali offers scenic apple orchards, snow adventure sports at Solang, ancient wooden temples, and peaceful Old Manali vibes.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 32.2432, lng: 77.1892 },
    tags: ["Mountains", "Nature", "Adventure", "Spirituality", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1050, standard: 2100, comfort: 4000 },
    bestSeason: "March to June & Dec to Feb for snow",
    idealDuration: 4,
    weatherCode: "cold_mountain",
    attractions: [
      {
        id: "mnl_hadimba",
        name: "Hadimba Devi Cedar Forest Temple",
        type: "Spirituality",
        timeSlot: "morning",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "08:00 AM - 06:00 PM",
        description: "1553 AD pagoda-style wooden temple constructed around a natural cave sanctuary surrounded by towering deodar cedar trees.",
        coords: { lat: 32.2483, lng: 77.1809 },
        verified: true,
        ecoTip: "Keep the sacred forest plastic-free and enjoy walking the 1.5 km shaded cedar path from Mall Road.",
        imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnl_solang_valley",
        name: "Solang Valley Adventure Hub",
        type: "Adventure",
        timeSlot: "morning",
        estimatedDuration: 4,
        entryFee: 0,
        openingHours: "09:00 AM - 05:30 PM",
        description: "Spectacular alpine meadow known for paragliding, zorbing, ropeway cable car, and winter ski slopes.",
        coords: { lat: 32.3166, lng: 77.1583 },
        verified: true,
        ecoTip: "Take the HRTC public bus from Manali bus stand for ₹35 instead of private cabs charging ₹1,500.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnl_jogini_falls",
        name: "Jogini Waterfall Forest Hike",
        type: "Nature",
        timeSlot: "afternoon",
        estimatedDuration: 3,
        entryFee: 0,
        openingHours: "Open daylight hours",
        description: "Picturesque 3 km forest trek from Vashisht hot springs village ending at a dramatic 160-foot cascading mountain waterfall.",
        coords: { lat: 32.2680, lng: 77.1950 },
        verified: true,
        ecoTip: "Completely free nature trek! Carry your own trash back to Vashisht disposal bins (SDG 12).",
        imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnl_old_manali",
        name: "Old Manali Wooden Cafes & Street Walk",
        type: "Shopping",
        timeSlot: "evening",
        estimatedDuration: 2.5,
        entryFee: 0,
        openingHours: "10:00 AM - 10:00 PM",
        description: "Bohemian village filled with traditional Himachali Kathkuni timber homes, acoustic live music, and handcrafted woollens.",
        coords: { lat: 32.2530, lng: 77.1780 },
        verified: true,
        ecoTip: "Buy hand-knitted Kullu wool socks directly from local village women cooperatives (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "mnl_hostel_zostel",
        name: "Zostel Old Manali",
        type: "hostel",
        pricePerNight: 599,
        rating: 4.7,
        reviewsCount: 2210,
        amenities: ["Mountain View Balconies", "Bonfire Garden", "Cafe", "WiFi", "Heated Beds Option", "Board Games"],
        address: "Manu Temple Road, Old Manali, Himachal Pradesh",
        coords: { lat: 32.2540, lng: 77.1770 },
        whyBudget: "Legendary backpacker haven overlooking snow peaks with community hiking trips.",
        bookingUrl: "https://www.zostel.com",
        ecoFriendly: true
      },
      {
        id: "mnl_homestay_apple",
        name: "Orchard View Himalayan Homestay",
        type: "homestay",
        pricePerNight: 1100,
        rating: 4.8,
        reviewsCount: 380,
        amenities: ["Apple Orchard Walk", "Home-cooked Siddu", "Hot Geyser", "Family Lounge", "Luggage Drop"],
        address: "Village Vashisht, Manali",
        coords: { lat: 32.2640, lng: 77.1900 },
        whyBudget: "Authentic wooden Himachali house inside a family organic apple orchard with panoramic valley views.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      },
      {
        id: "mnl_hotel_beas",
        name: "HPTDC Hotel Beas",
        type: "budget_hotel",
        pricePerNight: 1450,
        rating: 4.2,
        reviewsCount: 710,
        amenities: ["Riverfront Lawns", "Government Verified Rates", "Restaurant", "Parking", "Doctor on Call"],
        address: "Near Bus Stand, The Mall, Manali",
        coords: { lat: 32.2410, lng: 77.1870 },
        whyBudget: "Himachal Tourism official budget hotel directly beside the gushing Beas River with no surge pricing.",
        bookingUrl: "https://hptdc.in",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "mnl_rest_cafe_1947",
        name: "Cafe 1947 (Riverside)",
        mealType: "dinner",
        dietary: "all",
        avgCostForTwo: 550,
        signatureDishes: ["Wood-fired Pizza", "Trout Fish", "Himalayan Herb Pasta", "Warm Apple Crumble"],
        address: "Near Nehru Kund, Old Manali Bridge, Manali",
        coords: { lat: 32.2580, lng: 77.1830 },
        ecoTip: "Dine on the open wooden patio right over the flowing mountain stream."
      },
      {
        id: "mnl_rest_siddu",
        name: "Himachali Traditional Rasoi",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 240,
        signatureDishes: ["Steamed Stuffed Siddu with Desi Ghee", "Babru", "Madra Chickpea Curry"],
        address: "Mall Road, Manali",
        coords: { lat: 26.9189, lng: 75.8015 },
        ecoTip: "Siddu is nutritious, filling, and costs only ₹90 each while supporting indigenous Himachali culinary heritage."
      },
      {
        id: "mnl_rest_drifters",
        name: "Drifters' Cafe & Inn",
        mealType: "breakfast",
        dietary: "all",
        avgCostForTwo: 360,
        signatureDishes: ["Buckwheat Pancakes", "Scrambled Eggs with Herbs", "Hot Ginger Lemon Honey Tea"],
        address: "Manu Temple Road, Old Manali",
        coords: { lat: 32.2550, lng: 77.1765 },
        ecoTip: "Cozy morning reading spot with high-speed WiFi and local wildflower honey."
      }
    ],
    transportOptions: [
      {
        fromCity: "Delhi",
        modes: [
          { type: "bus", avgFare: 750, durationHours: 13.5, provider: "HRTC Himgaurav / Volvo AC Sleeper", bookingUrl: "https://www.hrtchp.com" },
          { type: "train", avgFare: 480, durationHours: 7.0, provider: "Train to Chandigarh + 7 hr HRTC bus", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 4800, durationHours: 1.2, provider: "Alliance Air to Bhuntar Airport (50 km away)", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Chandigarh",
        modes: [
          { type: "bus", avgFare: 520, durationHours: 8.5, provider: "HRTC Express Bus (Frequent every 30 mins)", bookingUrl: "https://www.hrtchp.com" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 450,
      eRickshawPerRide: 0,
      scooterRentPerDay: 500,
      walkingSuitability: "Very walkable in Old Manali, Mall Road, and Vashisht. HRTC local buses connect Solang & Naggar for ₹25-40."
    }
  },
  {
    id: "munnar",
    name: "Munnar & Kerala Highlands",
    state: "Kerala",
    region: "South India",
    tagline: "Emerald Carpet Tea Hills, Mist-Veiled Peaks & Cascades",
    description: "Serene hill station in God's Own Country blessed with rolling tea plantations, mist-covered valleys, rare Neelakurinji blooms, and fragrant spice farms.",
    heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    tags: ["Nature", "Mountains", "Food", "Relaxation", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1050, standard: 2150, comfort: 4100 },
    bestSeason: "September to March",
    idealDuration: 3,
    weatherCode: "cool_misty",
    attractions: [
      {
        id: "mnr_tea_museum",
        name: "KDHP Tea Museum & Factory Walk",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 2,
        entryFee: 125,
        openingHours: "09:00 AM - 05:00 PM (Closed Mondays)",
        description: "Historic tea estate showcasing century-old tea manufacturing machinery, leaf plucking, and artisanal tea tasting.",
        coords: { lat: 10.0860, lng: 77.0520 },
        verified: true,
        ecoTip: "Buy fresh black & green tea directly from the workers' cooperative store at factory rates.",
        imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnr_eravikulam",
        name: "Eravikulam National Park (Rajamalai)",
        type: "Nature",
        timeSlot: "morning",
        estimatedDuration: 3.5,
        entryFee: 200,
        openingHours: "07:30 AM - 04:00 PM",
        description: "Protected sanctuary home to the endangered Nilgiri Tahr mountain goat and the highest peak in South India, Anamudi.",
        coords: { lat: 10.1500, lng: 77.0600 },
        verified: true,
        ecoTip: "Book forest department safari bus online at munnatourism.kerala.gov.in to skip ticket counters.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnr_mattupetty",
        name: "Mattupetty Dam & Echo Point",
        type: "Nature",
        timeSlot: "afternoon",
        estimatedDuration: 2,
        entryFee: 40,
        openingHours: "09:00 AM - 05:30 PM",
        description: "Scenic water storage dam surrounded by verdant hills where wild elephants occasionally drink at water edges.",
        coords: { lat: 10.1060, lng: 77.1230 },
        verified: true,
        ecoTip: "Rent pedal boats rather than diesel speedboats to prevent lake water pollution.",
        imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mnr_spice_garden",
        name: "Punnamada Ayurvedic & Spice Plantation",
        type: "Nature",
        timeSlot: "evening",
        estimatedDuration: 1.5,
        entryFee: 100,
        openingHours: "08:30 AM - 06:00 PM",
        description: "Guided walk showing cardamom, black pepper, cinnamon, vanilla pods, and medicinal Kerala herbs.",
        coords: { lat: 10.0600, lng: 77.0450 },
        verified: true,
        ecoTip: "Support local family spice cultivators by buying small packets of whole raw spices directly (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "mnr_hostel_zostel",
        name: "Zostel Munnar (Pothamedu)",
        type: "hostel",
        pricePerNight: 649,
        rating: 4.8,
        reviewsCount: 1670,
        amenities: ["Tea Garden View", "Campfire", "Common Room", "Free WiFi", "Cafeteria", "Board Games"],
        address: "Pothamedu View Point Road, Munnar",
        coords: { lat: 10.0710, lng: 77.0540 },
        whyBudget: "Surrounded by tea hills with spectacular views of misty sunsets and hiking trails right outside.",
        bookingUrl: "https://www.zostel.com",
        ecoFriendly: true
      },
      {
        id: "mnr_homestay_kerala",
        name: "Green Valley Tea Garden Homestay",
        type: "homestay",
        pricePerNight: 1150,
        rating: 4.9,
        reviewsCount: 390,
        amenities: ["Traditional Kerala Breakfast Included", "Organic Spice Garden", "Hot Shower", "Balcony"],
        address: "Chithirapuram Post, Munnar",
        coords: { lat: 10.0400, lng: 77.0300 },
        whyBudget: "Hosted by warm Malayali family serving homemade Appam, Stew, and Kerala Sadya meals.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      },
      {
        id: "mnr_hotel_drizzle",
        name: "Drizzle Valley Budget Hotel",
        type: "budget_hotel",
        pricePerNight: 1500,
        rating: 4.3,
        reviewsCount: 520,
        amenities: ["Valley View Rooms", "Restaurant", "Travel Desk", "Free Parking"],
        address: "Near KSRTC Bus Stand, Munnar Town",
        coords: { lat: 10.0890, lng: 77.0600 },
        whyBudget: "Steps from KSRTC bus station, saving you local taxi hiring fees.",
        bookingUrl: "https://www.booking.com",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "mnr_rest_saravana",
        name: "Saravana Bhavan (Pure Veg)",
        mealType: "breakfast",
        dietary: "veg",
        avgCostForTwo: 180,
        signatureDishes: ["Crispy Ghee Roast Dosa", "Steamed Idli Vada with Coconut Chutney", "Filter Coffee"],
        address: "Near Post Office, Munnar Town",
        coords: { lat: 10.0880, lng: 77.0610 },
        ecoTip: "Piping hot traditional South Indian breakfast prepared fresh every morning from 7 AM."
      },
      {
        id: "mnr_rest_rya",
        name: "Rapsy Restaurant (Since 1985)",
        mealType: "lunch",
        dietary: "all",
        avgCostForTwo: 280,
        signatureDishes: ["Kerala Malabar Parotta with Beef/Chicken Fry", "Biryani", "Spanish Omelette"],
        address: "Main Bazaar, Munnar Town",
        coords: { lat: 10.0875, lng: 77.0598 },
        ecoTip: "Beloved backpacker landmark known for generous portions at student-friendly prices."
      },
      {
        id: "mnr_rest_gurubhavan",
        name: "Hotel Guru Bhavan Kerala Meals",
        mealType: "dinner",
        dietary: "veg",
        avgCostForTwo: 220,
        signatureDishes: ["Unlimited Kerala Banana Leaf Meals (Sadya)", "Avial", "Sambar", "Payasam"],
        address: "M.G. Road, Old Munnar",
        coords: { lat: 10.0850, lng: 77.0570 },
        ecoTip: "Served on fresh banana leaves reducing dishwashing detergents and paper waste (SDG 12)."
      }
    ],
    transportOptions: [
      {
        fromCity: "Kochi (Ernakulam)",
        modes: [
          { type: "bus", avgFare: 140, durationHours: 4.0, provider: "KSRTC Ordinary & Fast Passenger (Leaves every 45 mins)", bookingUrl: "https://www.onlineksrtcswift.com" },
          { type: "cab", avgFare: 2200, durationHours: 3.5, provider: "Shared Pre-paid Taxi / Uber Intercity", bookingUrl: "https://www.uber.com" }
        ]
      },
      {
        fromCity: "Bengaluru",
        modes: [
          { type: "bus", avgFare: 750, durationHours: 10.5, provider: "KSRTC Airavat / Kerala RTC Swift AC Sleeper", bookingUrl: "https://www.redbus.in" },
          { type: "train", avgFare: 380, durationHours: 9.0, provider: "Train to Ernakulam + 4 hr KSRTC bus", bookingUrl: "https://www.irctc.co.in" }
        ]
      },
      {
        fromCity: "Chennai",
        modes: [
          { type: "train", avgFare: 390, durationHours: 10.0, provider: "Train to Madurai + 4 hr bus to Munnar", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 890, durationHours: 13.0, provider: "Private Sleeper Bus directly to Munnar", bookingUrl: "https://www.redbus.in" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 400,
      eRickshawPerRide: 0,
      scooterRentPerDay: 450,
      walkingSuitability: "Local KSRTC town buses run between Munnar, Top Station, and Marayoor for ₹15 to ₹40."
    }
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi)",
    state: "Uttar Pradesh",
    region: "North / Eastern",
    tagline: "The World's Oldest Living Spiritual City on the Sacred Ganga",
    description: "Spiritual epicenter of India, famous for ancient stone ghats along the sacred Ganges river, mesmerizing evening Ganga Aarti, timeless alleyways, and heavenly street foods.",
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    tags: ["Spirituality", "History", "Food", "Heritage", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 900, standard: 1800, comfort: 3600 },
    bestSeason: "October to March",
    idealDuration: 3,
    weatherCode: "pleasant_temperate",
    attractions: [
      {
        id: "vns_dashashwamedh",
        name: "Dashashwamedh Ghat & Evening Ganga Aarti",
        type: "Spirituality",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "Aarti starts at 06:30 PM daily",
        description: "Breathtaking grand spiritual ritual where priests hoist massive brass lamps amidst ringing bells, chants, and incense.",
        coords: { lat: 25.3080, lng: 83.0105 },
        verified: true,
        ecoTip: "Watch from the ghat steps for free rather than booking noisy diesel boats to support zero-emission viewing.",
        imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "vns_boat_sunrise",
        name: "Sunrise Hand-Rowed Boat Ride on the Ganges",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 2,
        entryFee: 150,
        openingHours: "05:30 AM - 08:00 AM",
        description: "Glide gently past 84 ghats from Assi Ghat to Manikarnika Ghat as pilgrims perform morning surya namaskar.",
        coords: { lat: 25.2890, lng: 83.0060 },
        verified: true,
        ecoTip: "Choose traditional manual wooden rowboats over noisy diesel motorboats to directly empower local boatmen families (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "vns_kashi_vishwanath",
        name: "Kashi Vishwanath Corridor & Golden Temple",
        type: "Spirituality",
        timeSlot: "morning",
        estimatedDuration: 2.5,
        entryFee: 0,
        openingHours: "04:00 AM - 11:00 PM",
        description: "One of the 12 sacred Jyotirlingas, newly restored with expansive sandstone promenade connecting straight to the river.",
        coords: { lat: 25.3109, lng: 83.0107 },
        verified: true,
        ecoTip: "Leave mobile phones and leather articles in designated free locker stalls outside before queueing.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "vns_sarnath",
        name: "Sarnath Deer Park & Dhamek Stupa",
        type: "History",
        timeSlot: "afternoon",
        estimatedDuration: 3,
        entryFee: 25,
        openingHours: "06:00 AM - 05:30 PM",
        description: "The serene holy site where Gautama Buddha gave his first sermon after attaining enlightenment.",
        coords: { lat: 25.3811, lng: 83.0214 },
        verified: true,
        ecoTip: "Take electric city bus from Cantt Railway Station to Sarnath for ₹20.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "vns_hostel_hosteller",
        name: "The Hosteller Varanasi (Ghat View)",
        type: "hostel",
        pricePerNight: 499,
        rating: 4.7,
        reviewsCount: 1980,
        amenities: ["Rooftop Cafe Overlooking Ganga", "AC Bunks", "Free WiFi", "Morning Walking Tours", "Luggage Storage"],
        address: "Near Dashashwamedh Ghat, Varanasi",
        coords: { lat: 25.3090, lng: 83.0080 },
        whyBudget: "Steps away from the main ghats, perfect for young travellers and students with super low prices.",
        bookingUrl: "https://www.thehosteller.com",
        ecoFriendly: true
      },
      {
        id: "vns_homestay_shanti",
        name: "Shanti Heritage Riverside Homestay",
        type: "homestay",
        pricePerNight: 950,
        rating: 4.6,
        reviewsCount: 460,
        amenities: ["River Facing Terrace", "Home Food", "Filtered Water", "Yoga Sessions"],
        address: "Manikarnika Gali, Varanasi",
        coords: { lat: 25.3115, lng: 83.0120 },
        whyBudget: "Centuries-old ancestral haveli in the old winding gallis offering budget private rooms.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      },
      {
        id: "vns_hotel_kashi",
        name: "Hotel Kashi Residency",
        type: "budget_hotel",
        pricePerNight: 1300,
        rating: 4.2,
        reviewsCount: 610,
        amenities: ["Air Conditioning", "Lift", "24hr Front Desk", "Pure Veg Dining"],
        address: "Godowlia Crossing, Varanasi",
        coords: { lat: 25.3100, lng: 83.0050 },
        whyBudget: "Walking distance to Vishwanath temple with reliable clean rooms for families.",
        bookingUrl: "https://www.booking.com",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "vns_rest_kashi_chaat",
        name: "Kashi Chaat Bhandar",
        mealType: "dinner",
        dietary: "veg",
        avgCostForTwo: 160,
        signatureDishes: ["Tamatar Chaat", "Palak Patta Chaat", "Dahi Puri", "Gulab Jamun"],
        address: "Godowlia Chowk, Varanasi",
        coords: { lat: 25.3095, lng: 83.0062 },
        ecoTip: "World-famous legendary street chaat served in clay donas (earthen bowls) that compost naturally."
      },
      {
        id: "vns_rest_blue_lassi",
        name: "Blue Lassi Shop (Since 1925)",
        mealType: "street_food",
        dietary: "veg",
        avgCostForTwo: 140,
        signatureDishes: ["Pomegranate Pistachio Lassi", "Banana Chocolate Lassi", "Plain Malai Lassi"],
        address: "CK 12/40 Bangali Tola, near Manikarnika Ghat, Varanasi",
        coords: { lat: 25.3118, lng: 83.0112 },
        ecoTip: "Hand-churned yogurt topped with rich Rabri served in traditional earthenware."
      },
      {
        id: "vns_rest_ram_kachori",
        name: "Ram Bhandar Morning Kachori Jalebi",
        mealType: "breakfast",
        dietary: "veg",
        avgCostForTwo: 100,
        signatureDishes: ["Kachori Sabzi with Heeng Chutney", "Hot Crisp Jalebi in Desi Ghee"],
        address: "Thatheri Bazaar, Varanasi",
        coords: { lat: 25.3125, lng: 83.0090 },
        ecoTip: "A quintessential Banarasi breakfast served from 6:30 AM to 10:30 AM. Don't miss this."
      }
    ],
    transportOptions: [
      {
        fromCity: "Delhi",
        modes: [
          { type: "train", avgFare: 290, durationHours: 8.0, provider: "Vande Bharat Express / Shiv Ganga Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 2600, durationHours: 1.2, provider: "IndiGo / SpiceJet", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Kolkata",
        modes: [
          { type: "train", avgFare: 340, durationHours: 10.0, provider: "Vibhuti Express / Doon Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 2800, durationHours: 1.3, provider: "IndiGo", bookingUrl: "https://www.makemytrip.com" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 250,
      eRickshawPerRide: 15,
      scooterRentPerDay: 350,
      walkingSuitability: "Extremely high. The historic ghats and winding narrow alleys are completely pedestrian-only."
    }
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "Himalayas / North",
    tagline: "Yoga Capital of the World & Gateway to the Garhwal Himalayas",
    description: "Nestled along the emerald currents of the holy Ganga and lush Himalayan foothills, Rishikesh blends adrenaline-fueled river rafting with peaceful meditation ashrams.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 30.0869, lng: 78.2676 },
    tags: ["Adventure", "Spirituality", "Nature", "Mountains", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 950, standard: 1900, comfort: 3800 },
    bestSeason: "September to November & March to May",
    idealDuration: 3,
    weatherCode: "pleasant_mountain",
    attractions: [
      {
        id: "rsk_rafting",
        name: "Ganges White Water River Rafting (Shivpuri)",
        type: "Adventure",
        timeSlot: "morning",
        estimatedDuration: 3,
        entryFee: 600,
        openingHours: "08:00 AM - 04:00 PM (Oct-Jun)",
        description: "16 km thrilling whitewater rafting down Grade III & IV rapids including Roller Coaster and Golf Course with certified guides.",
        coords: { lat: 30.1380, lng: 78.3890 },
        verified: true,
        ecoTip: "Book through certified eco-tourism certified operators who do not dump plastic gear in the river.",
        imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rsk_triveni_ghat",
        name: "Triveni Ghat Maha Aarti",
        type: "Spirituality",
        timeSlot: "evening",
        estimatedDuration: 1.5,
        entryFee: 0,
        openingHours: "06:00 PM - 07:30 PM",
        description: "Spectacular choral evening aarti ceremony on the ghat with oil lamps floating on the river waters.",
        coords: { lat: 30.1030, lng: 78.2930 },
        verified: true,
        ecoTip: "Use organic leaf diyas with natural flowers rather than thermocol floats.",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rsk_beatles_ashram",
        name: "Beatles Ashram (Chaurasi Kutia)",
        type: "History",
        timeSlot: "afternoon",
        estimatedDuration: 2.5,
        entryFee: 150,
        openingHours: "09:00 AM - 04:30 PM",
        description: "Historic meditation dome complex inside Rajaji National Park where The Beatles composed the White Album in 1968.",
        coords: { lat: 30.1140, lng: 78.3120 },
        verified: true,
        ecoTip: "Walk from Ram Jhula suspension bridge along the peaceful river bank trail.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rsk_neer_waterfall",
        name: "Neer Garh Waterfall Hike",
        type: "Nature",
        timeSlot: "morning",
        estimatedDuration: 2.5,
        entryFee: 30,
        openingHours: "08:00 AM - 05:00 PM",
        description: "Crystal clear natural turquoise pools cascading down limestone cliffs surrounded by butterflies.",
        coords: { lat: 30.1450, lng: 78.3320 },
        verified: true,
        ecoTip: "Carry water in metal bottles; the forest department checks for single-use plastic at the checkpoint.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "rsk_hostel_gostops",
        name: "goSTOPS Rishikesh (Tapovan)",
        type: "hostel",
        pricePerNight: 450,
        rating: 4.6,
        reviewsCount: 1420,
        amenities: ["Rooftop Yoga Deck", "Fast WiFi", "Board Games", "Co-working", "Cafe"],
        address: "Badrinath Road, Tapovan, Rishikesh",
        coords: { lat: 30.1320, lng: 78.3240 },
        whyBudget: "Super economical pod dorms, walking distance to cafes and Laxman Jhula viewpoints.",
        bookingUrl: "https://gostops.com",
        ecoFriendly: true
      },
      {
        id: "rsk_homestay_ashram",
        name: "Parmarth Niketan Guest Ashram",
        type: "homestay",
        pricePerNight: 800,
        rating: 4.7,
        reviewsCount: 890,
        amenities: ["Daily Yoga Included", "Sattvic Meals Option", "Ganga View Garden", "Library"],
        address: "Swargashram, Rishikesh",
        coords: { lat: 30.1180, lng: 78.3150 },
        whyBudget: "Spiritual, calm retreat on the Ganga with complimentary yoga and meditation classes.",
        bookingUrl: "https://www.parmarth.org",
        ecoFriendly: true
      },
      {
        id: "rsk_hotel_tapovan",
        name: "Tapovan Green Budget Hotel",
        type: "budget_hotel",
        pricePerNight: 1200,
        rating: 4.3,
        reviewsCount: 430,
        amenities: ["Mountain Balcony", "Air Conditioning", "Hot Water", "Restaurant"],
        address: "Upper Tapovan, Rishikesh",
        coords: { lat: 30.1350, lng: 78.3260 },
        whyBudget: "Peaceful location above the bustle with panoramic hill views for couples and families.",
        bookingUrl: "https://www.booking.com",
        ecoFriendly: false
      }
    ],
    restaurants: [
      {
        id: "rsk_rest_chotiwala",
        name: "Chotiwala Restaurant (Since 1958)",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 320,
        signatureDishes: ["Special Garhwali Thali", "Kadhi Chawal", "Paneer Bhurji", "Gulab Jamun"],
        address: "Swargashram, Ram Jhula, Rishikesh",
        coords: { lat: 30.1210, lng: 78.3140 },
        ecoTip: "Historic pilgrimage dining spot serving delicious 100% vegetarian satvik meals."
      },
      {
        id: "rsk_rest_little_buddha",
        name: "Little Buddha Cafe & Treehouse",
        mealType: "breakfast",
        dietary: "vegan",
        avgCostForTwo: 380,
        signatureDishes: ["Israeli Breakfast with Hummus & Pita", "Avocado Toast", "Ginger Lemon Mint Tea"],
        address: "Laxman Jhula Road, Tapovan, Rishikesh",
        coords: { lat: 30.1290, lng: 78.3280 },
        ecoTip: "Open bamboo treehouse directly overlooking the emerald Ganga water."
      },
      {
        id: "rsk_rest_ganga_beach",
        name: "Ganga Beach Restaurant",
        mealType: "dinner",
        dietary: "veg",
        avgCostForTwo: 350,
        signatureDishes: ["Wood-fired Veg Pizza", "Tibetan Veg Thukpa", "Falafel Platter"],
        address: "Near Sivananda Ashram, Ram Jhula, Rishikesh",
        coords: { lat: 30.1220, lng: 78.3180 },
        ecoTip: "Supports local organic farmers for flour and fresh salad greens."
      }
    ],
    transportOptions: [
      {
        fromCity: "Delhi",
        modes: [
          { type: "train", avgFare: 165, durationHours: 4.5, provider: "Jan Shatabdi / Vande Bharat to Haridwar/Rishikesh", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 360, durationHours: 6.0, provider: "UTC Ordinary & Volvo Bus", bookingUrl: "https://www.redbus.in" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 300,
      eRickshawPerRide: 20,
      scooterRentPerDay: 400,
      walkingSuitability: "Very walkable. Suspension footbridges (Ram Jhula, Janki Jhula) connect both sides of the river."
    }
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North / West",
    tagline: "The City of Lakes & Romantic Havelis",
    description: "Famed for shimmering Lake Pichola, ornate white marble palaces, hillside vantage points, vibrant folk dances at Bagore Ki Haveli, and peaceful lakefront cafes.",
    heroImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 24.5854, lng: 73.7125 },
    tags: ["Heritage", "History", "Nature", "Food", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1100, standard: 2300, comfort: 4400 },
    bestSeason: "October to March",
    idealDuration: 3,
    weatherCode: "pleasant",
    attractions: [
      {
        id: "udp_city_palace",
        name: "Udaipur City Palace & Lake Pichola View",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 3,
        entryFee: 300,
        openingHours: "09:00 AM - 05:30 PM",
        description: "Spectacular complex of 11 palaces built over 400 years by the Sisodia Rajput clan on the banks of Lake Pichola.",
        coords: { lat: 24.5764, lng: 73.6835 },
        verified: true,
        ecoTip: "Buy ticket early at 9:00 AM to beat the tour buses and enjoy unhurried photo angles.",
        imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "udp_bagore_ki_haveli",
        name: "Bagore Ki Haveli & Dharohar Folk Dance",
        type: "Heritage",
        timeSlot: "evening",
        estimatedDuration: 1.5,
        entryFee: 100,
        openingHours: "07:00 PM - 08:00 PM show",
        description: "18th-century mansion at Gangaur Ghat hosting mesmerizing traditional Rajasthani puppet and Chari fire dance shows.",
        coords: { lat: 24.5795, lng: 73.6810 },
        verified: true,
        ecoTip: "Directly funds veteran rural folk artists preserving indigenous musical traditions (SDG 8).",
        imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "udp_fateh_sagar",
        name: "Fateh Sagar Lake & Sunset Drive",
        type: "Nature",
        timeSlot: "afternoon",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "Open all day",
        description: "Picturesque manmade lake surrounded by the Aravalli hills with pleasant pedestrian walking promenade.",
        coords: { lat: 24.6040, lng: 73.6730 },
        verified: true,
        ecoTip: "Rent an electric bicycle (₹50/hour) from the lake entrance to cycle around the tree-lined rim.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "udp_hostel_zostel",
        name: "Zostel Udaipur",
        type: "hostel",
        pricePerNight: 550,
        rating: 4.7,
        reviewsCount: 2100,
        amenities: ["Rooftop Pool", "Lake View Deck", "Free High-speed WiFi", "Cafe", "Lockers"],
        address: "Near Gangaur Ghat, Jagdish Chowk, Udaipur",
        coords: { lat: 24.5790, lng: 73.6820 },
        whyBudget: "Voted one of the best lake-view hostels in India with rooftop terrace overlooking the palace.",
        bookingUrl: "https://www.zostel.com",
        ecoFriendly: true
      },
      {
        id: "udp_homestay_mewar",
        name: "Mewar Heritage Lake Homestay",
        type: "homestay",
        pricePerNight: 1200,
        rating: 4.8,
        reviewsCount: 390,
        amenities: ["Jharokha Window Seating", "Home Breakfast", "Filtered Water", "Walking Map"],
        address: "Lal Ghat, Udaipur",
        coords: { lat: 24.5800, lng: 73.6800 },
        whyBudget: "Traditional Rajasthani stone haveli run by locals on the shores of Lake Pichola.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      }
    ],
    restaurants: [
      {
        id: "udp_rest_jagdish",
        name: "Jagdish Misthan Bhandar",
        mealType: "breakfast",
        dietary: "veg",
        avgCostForTwo: 140,
        signatureDishes: ["Crisp Poha with Sev", "Hot Mirchi Bada", "Moong Dal Halwa", "Masala Chai"],
        address: "Outside Jagdish Temple, Udaipur",
        coords: { lat: 24.5798, lng: 73.6840 },
        ecoTip: "Beloved breakfast joint where local citizens gather every morning."
      },
      {
        id: "udp_rest_natraj",
        name: "Natraj Dining Hall & Thali",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 450,
        signatureDishes: ["Unlimited Gujarati & Rajasthani Thali", "Dal Baati Churma", "Kadhi", "Khichdi"],
        address: "Near Railway Station, City Station Road, Udaipur",
        coords: { lat: 24.5820, lng: 73.6990 },
        ecoTip: "Famous for unpretentious, lightning-fast unlimited thali service that feeds you royally."
      }
    ],
    transportOptions: [
      {
        fromCity: "Delhi",
        modes: [
          { type: "train", avgFare: 420, durationHours: 11.5, provider: "Mewar Express / Chetak Express", bookingUrl: "https://www.irctc.co.in" },
          { type: "flight", avgFare: 3100, durationHours: 1.3, provider: "Air India / IndiGo", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Mumbai",
        modes: [
          { type: "train", avgFare: 410, durationHours: 14.0, provider: "Bandra Udaipur Express", bookingUrl: "https://www.irctc.co.in" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 300,
      eRickshawPerRide: 20,
      scooterRentPerDay: 400,
      walkingSuitability: "Lal Ghat and Gangaur Ghat areas are narrow stone lanes best explored on foot."
    }
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South India",
    tagline: "UNESCO Boulder Kingdom of the Vijayanagara Empire",
    description: "Surreal boulder-strewn landscape dotted with magnificent 14th-century temple ruins, riverside coracle boat rides, and bohemian hippie island cafe vibes.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 15.3350, lng: 76.4600 },
    tags: ["History", "Heritage", "Nature", "Adventure", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 850, standard: 1750, comfort: 3400 },
    bestSeason: "October to February",
    idealDuration: 3,
    weatherCode: "warm_dry",
    attractions: [
      {
        id: "hmp_virupaksha",
        name: "Virupaksha Temple & Hampi Bazaar",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 2,
        entryFee: 50,
        openingHours: "06:00 AM - 06:00 PM",
        description: "7th-century active Shiva sanctuary with a towering 160-foot gopuram gateway standing by the Tungabhadra River.",
        coords: { lat: 15.3353, lng: 76.4597 },
        verified: true,
        ecoTip: "Hire a licensed cycle right outside Virupaksha for ₹100/day to explore ruins emission-free.",
        imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "hmp_vittala",
        name: "Vijaya Vittala Temple & Stone Chariot",
        type: "Heritage",
        timeSlot: "morning",
        estimatedDuration: 2.5,
        entryFee: 40,
        openingHours: "08:30 AM - 05:30 PM",
        description: "Iconic stone chariot shrine featured on the ₹50 banknote and musical pillars that resonate melodic notes when tapped.",
        coords: { lat: 15.3430, lng: 76.4770 },
        verified: true,
        ecoTip: "Walk the 1.5 km riverside boulder trail from Virupaksha to Vittala; it's free and stunning.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "hmp_matanga",
        name: "Matanga Hill Sunrise / Sunset Hike",
        type: "Adventure",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "Open daylight hours",
        description: "The highest hill in Hampi offering 360-degree aerial panorama across the boulder ruins and emerald paddy fields.",
        coords: { lat: 30.1380, lng: 78.3890 },
        verified: true,
        ecoTip: "Free trek; carry a torch for descent and wear sturdy sneakers.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "hmp_hostel_zostel",
        name: "Zostel Hampi (Sanapur)",
        type: "hostel",
        pricePerNight: 599,
        rating: 4.7,
        reviewsCount: 1350,
        amenities: ["Paddy Field View", "Cafe", "Bouldering Mats", "High Speed WiFi", "Cycle Hire"],
        address: "Near Sanapur Lake, Gangavathi, Hampi",
        coords: { lat: 15.3610, lng: 76.4480 },
        whyBudget: "Surrounded by lush coconut palms and lakes with great social backpacking vibes.",
        bookingUrl: "https://www.zostel.com",
        ecoFriendly: true
      },
      {
        id: "hmp_homestay_ravi",
        name: "Ravi Rose Heritage Homestay",
        type: "homestay",
        pricePerNight: 850,
        rating: 4.6,
        reviewsCount: 310,
        amenities: ["Rooftop Dining", "Bicycle Rental", "Hot Water", "Home-cooked South Indian meals"],
        address: "Janata Plot, Hampi Bazaar",
        coords: { lat: 15.3340, lng: 76.4620 },
        whyBudget: "Right behind the main bazaar, hosted by local family who arrange coracle rides.",
        bookingUrl: "https://www.homestay.com",
        ecoFriendly: true
      }
    ],
    restaurants: [
      {
        id: "hmp_rest_mango_tree",
        name: "Mango Tree Restaurant",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 300,
        signatureDishes: ["Special South Indian Thali", "Curry Rice", "Nutella Banana Pancake", "Fresh Lime Soda"],
        address: "Near Janata Plot, Hampi",
        coords: { lat: 15.3330, lng: 76.4610 },
        ecoTip: "Iconic garden restaurant with floor cushion seating serving travellers since decades."
      }
    ],
    transportOptions: [
      {
        fromCity: "Bengaluru",
        modes: [
          { type: "train", avgFare: 240, durationHours: 8.5, provider: "Hampi Express to Hosapete (12 km away)", bookingUrl: "https://www.irctc.co.in" },
          { type: "bus", avgFare: 480, durationHours: 7.5, provider: "KSRTC Airavat / Non-AC Sleeper", bookingUrl: "https://www.ksrtc.in" }
        ]
      },
      {
        fromCity: "Goa",
        modes: [
          { type: "train", avgFare: 195, durationHours: 7.0, provider: "Vasco da Gama to Hosapete train", bookingUrl: "https://www.irctc.co.in" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 400,
      eRickshawPerRide: 0,
      scooterRentPerDay: 350,
      walkingSuitability: "Bicycles (₹100/day) or rented mopeds (₹350/day) are the absolute best sustainable ways to travel."
    }
  },
  {
    id: "pondicherry",
    name: "Pondicherry (Puducherry)",
    state: "Puducherry",
    region: "South Coast",
    tagline: "French Colonial Elegance Meets Seaside Serenity",
    description: "Charming coastal enclave where yellow mustard colonial villas, French cafes, the experimental township of Auroville, and seaside promenades await.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    coordinates: { lat: 11.9416, lng: 79.8083 },
    tags: ["Heritage", "Beaches", "Food", "Spirituality", "Budget"],
    budgetTier: "budget",
    avgDailyCost: { budget: 1050, standard: 2100, comfort: 4000 },
    bestSeason: "October to March",
    idealDuration: 3,
    weatherCode: "coastal_breeze",
    attractions: [
      {
        id: "pon_promenade",
        name: "Rock Beach & Seaside Promenade Walk",
        type: "Beaches",
        timeSlot: "evening",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "Pedestrian only from 04:00 PM to 07:30 AM",
        description: "1.5 km scenic sea-facing boulevard free from motorized vehicles every evening, flanked by historic statues and crashing waves.",
        coords: { lat: 11.9330, lng: 79.8350 },
        verified: true,
        ecoTip: "100% vehicle-free walking paradise every evening. Sit on the rocks and enjoy sea breezes.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pon_auroville",
        name: "Auroville & Matrimandir Viewing Point",
        type: "Spirituality",
        timeSlot: "morning",
        estimatedDuration: 3.5,
        entryFee: 0,
        openingHours: "09:00 AM - 04:30 PM",
        description: "Universal township founded by The Mother, featuring the golden globe Matrimandir surrounded by peaceful green amphitheatre.",
        coords: { lat: 12.0069, lng: 79.8106 },
        verified: true,
        ecoTip: "Auroville free viewing passes must be collected at the visitors centre; support organic solar-powered craft shops (SDG 12).",
        imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "pon_white_town",
        name: "White Town (French Quarter) Heritage Walk",
        type: "Heritage",
        timeSlot: "afternoon",
        estimatedDuration: 2,
        entryFee: 0,
        openingHours: "Open all day",
        description: "Cobblestone streets with bougainvillea-covered yellow colonial facades, wrought-iron balconies, and artisan boutiques.",
        coords: { lat: 11.9310, lng: 79.8330 },
        verified: true,
        ecoTip: "Best explored on rental bicycle (₹80/day) for eco-friendly sightseeing.",
        imageUrl: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80"
      }
    ],
    accommodations: [
      {
        id: "pon_hostel_micasa",
        name: "Micasa Backpacker Hostel (White Town)",
        type: "hostel",
        pricePerNight: 550,
        rating: 4.6,
        reviewsCount: 1120,
        amenities: ["Rooftop Cafe", "Free Wi-Fi", "Air Conditioned Dorms", "Bicycle Rental", "Common Room"],
        address: "Rue Romain Rolland, White Town, Pondicherry",
        coords: { lat: 11.9325, lng: 79.8340 },
        whyBudget: "Located inside the French Quarter within 2 minutes walk to the promenade beach.",
        bookingUrl: "https://www.hostelworld.com",
        ecoFriendly: true
      },
      {
        id: "pon_homestay_ashram",
        name: "Sri Aurobindo Ashram Guest House",
        type: "homestay",
        pricePerNight: 750,
        rating: 4.7,
        reviewsCount: 650,
        amenities: ["Sea-facing Balcony", "Quiet Hours", "Filtered Water", "Library"],
        address: "Beach Road, Pondicherry",
        coords: { lat: 11.9340, lng: 79.8360 },
        whyBudget: "Extremely serene, impeccably clean, and affordable guest house run with non-profit ethos.",
        bookingUrl: "https://www.sriaurobindoashram.org",
        ecoFriendly: true
      }
    ],
    restaurants: [
      {
        id: "pon_rest_baker",
        name: "Baker Street French Bakery",
        mealType: "breakfast",
        dietary: "all",
        avgCostForTwo: 360,
        signatureDishes: ["Almond Croissants", "Baguette Sandwiches", "Quiche", "Espresso"],
        address: "Bussy Street, Pondicherry",
        coords: { lat: 11.9300, lng: 79.8290 },
        ecoTip: "Authentic French patisserie recipes made with unadulterated butter."
      },
      {
        id: "pon_rest_surguru",
        name: "Hotel Surguru (Pure South Indian)",
        mealType: "lunch",
        dietary: "veg",
        avgCostForTwo: 240,
        signatureDishes: ["Surguru Mini Tiffin", "Rava Onion Dosa", "South Indian Thali"],
        address: "Sardar Vallabhai Patel Salai, Pondicherry",
        coords: { lat: 11.9370, lng: 79.8310 },
        ecoTip: "The most trusted local spot for affordable, hygienic, and flavorful vegetarian meals."
      }
    ],
    transportOptions: [
      {
        fromCity: "Chennai",
        modes: [
          { type: "bus", avgFare: 110, durationHours: 3.0, provider: "TNSTC / SETC via scenic ECR coastal highway", bookingUrl: "https://www.tnstc.in" },
          { type: "cab", avgFare: 1800, durationHours: 2.5, provider: "Shared Intercity Cab", bookingUrl: "https://www.makemytrip.com" }
        ]
      },
      {
        fromCity: "Bengaluru",
        modes: [
          { type: "bus", avgFare: 450, durationHours: 6.5, provider: "KSRTC / TNSTC Sleeper & Airavat", bookingUrl: "https://www.redbus.in" },
          { type: "train", avgFare: 210, durationHours: 8.0, provider: "Yesvantpur - Puducherry Weekly Express", bookingUrl: "https://www.irctc.co.in" }
        ]
      }
    ],
    localTransport: {
      metroPerRide: 0,
      autoPerDayAvg: 250,
      eRickshawPerRide: 20,
      scooterRentPerDay: 350,
      walkingSuitability: "White Town and Beach road are best explored by bicycle (₹80/day) or walking."
    }
  }
];
