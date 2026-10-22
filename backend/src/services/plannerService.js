import { calculateBudget, generateMoneySavingTips } from './budgetEngine.js';

// Curated sustainable travel tips (SDG 8 & SDG 12)
const RESPONSIBLE_TRAVEL_TIPS = [
  {
    title: 'Support Indigenous Artisans (SDG 8)',
    tip: 'Purchase souvenirs directly from local cottage craftswomen and weavers instead of commercial souvenir shops to ensure 100% of your money reaches creator households.'
  },
  {
    title: 'Plastic-Free Hydration (SDG 12)',
    tip: 'Carry an insulated steel bottle. Most homestays, verified hostels, and cafes provide free, UV/RO filtered drinking water dispensers.'
  },
  {
    title: 'Electrified Public Transit (SDG 12)',
    tip: 'Opt for shared e-rickshaws, city metros, or rented bicycles instead of single-passenger taxis to reduce urban carbon emissions.'
  },
  {
    title: 'Savor Local Farm Produce (SDG 8)',
    tip: 'Eat regional traditional dishes made with locally sourced seasonal ingredients, empowering regional farmers and reducing long-haul food transport.'
  },
  {
    title: 'Respect Sacred & Heritage Spaces (SDG 12)',
    tip: 'Remove footwear where customary, dress modestly, do not touch delicate ancient murals or carvings, and refrain from leaving any plastic trail behind.'
  },
  {
    title: 'Decent Work & Fair Tipping (SDG 8)',
    tip: 'Always tip your local heritage guides, luggage porters, and small eatery waitstaff fairly; your direct support fosters decent local employment.'
  }
];

/**
 * Filter attractions by user interests
 */
function prioritizeAttractions(attractions, interests = []) {
  if (!interests || interests.length === 0) return [...attractions];

  const interestList = Array.isArray(interests) ? interests : [interests];
  const normalizedInterests = interestList.map(i => i.toLowerCase());

  const scored = attractions.map(att => {
    let score = 0;
    if (normalizedInterests.includes(att.type.toLowerCase())) score += 10;
    if (normalizedInterests.includes('budget') && att.entryFee === 0) score += 5;
    return { att, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.att);
}

/**
 * Filter restaurants by dietary preference
 */
function filterRestaurantsByDiet(restaurants, dietaryPref) {
  if (!dietaryPref || dietaryPref === 'No preference' || dietaryPref === 'Any') {
    return restaurants;
  }
  const pref = dietaryPref.toLowerCase();
  if (pref.includes('veg') && !pref.includes('non')) {
    return restaurants.filter(r => r.dietary === 'veg' || r.dietary === 'vegan');
  }
  if (pref.includes('vegan')) {
    return restaurants.filter(r => r.dietary === 'vegan' || r.dietary === 'veg');
  }
  return restaurants;
}

/**
 * Main itinerary generation function
 */
export function generateItinerary({
  destination,
  days = 3,
  budget = 10000,
  travellers = 1,
  travelStyle = 'Budget',
  interests = [],
  transportPref = 'Any',
  accommodationPref = 'Any',
  dietaryPref = 'No preference',
  startingCity = 'Delhi'
}) {
  const numDays = Math.max(1, parseInt(days) || 1);
  const numTravellers = Math.max(1, parseInt(travellers) || 1);

  // 1. Select Accommodation
  let selectedAccommodation = destination.accommodations[0];
  if (accommodationPref && accommodationPref !== 'Any') {
    const prefLower = accommodationPref.toLowerCase();
    const match = destination.accommodations.find(a => {
      if (prefLower.includes('hostel')) return a.type === 'hostel';
      if (prefLower.includes('homestay')) return a.type === 'homestay';
      if (prefLower.includes('hotel')) return a.type === 'budget_hotel';
      return false;
    });
    if (match) selectedAccommodation = match;
  }

  // 2. Select Transport
  let selectedTransport = null;
  const cityTransport = destination.transportOptions.find(t =>
    t.fromCity.toLowerCase().includes(startingCity.toLowerCase())
  ) || destination.transportOptions[0];

  if (cityTransport && cityTransport.modes.length > 0) {
    if (transportPref && transportPref !== 'Any') {
      const modeMatch = cityTransport.modes.find(m =>
        m.type.toLowerCase().includes(transportPref.toLowerCase())
      );
      selectedTransport = modeMatch || cityTransport.modes[0];
    } else {
      // Pick best budget mode by default (train or bus)
      selectedTransport = cityTransport.modes[0];
    }
  }

  // 3. Compute Budget breakdown
  const budgetAnalysis = calculateBudget({
    totalBudget: budget,
    days: numDays,
    travellers: numTravellers,
    travelStyle,
    destination,
    selectedAccommodation,
    selectedTransport
  });

  // 4. Generate Day-wise Itinerary
  const prioritizedAttractions = prioritizeAttractions(destination.attractions, interests);
  const filteredRestaurants = filterRestaurantsByDiet(destination.restaurants, dietaryPref);

  const breakfastSpots = filteredRestaurants.filter(r => r.mealType === 'breakfast' || r.mealType === 'street_food');
  const lunchSpots = filteredRestaurants.filter(r => r.mealType === 'lunch' || r.mealType === 'all');
  const dinnerSpots = filteredRestaurants.filter(r => r.mealType === 'dinner' || r.mealType === 'all');

  const fallbackBreakfast = destination.restaurants[0];
  const fallbackLunch = destination.restaurants[1] || destination.restaurants[0];
  const fallbackDinner = destination.restaurants[2] || destination.restaurants[0];

  const dailyItinerary = [];
  let attractionCursor = 0;

  for (let dayNum = 1; dayNum <= numDays; dayNum++) {
    // Pick morning & afternoon/evening attractions with cyclic wrap
    const morningAttraction = prioritizedAttractions[attractionCursor % prioritizedAttractions.length];
    attractionCursor++;
    const afternoonAttraction = prioritizedAttractions[attractionCursor % prioritizedAttractions.length];
    attractionCursor++;
    const eveningAttraction = prioritizedAttractions[attractionCursor % prioritizedAttractions.length];
    attractionCursor++;

    // Pick food recommendations
    const breakfast = breakfastSpots[(dayNum - 1) % Math.max(1, breakfastSpots.length)] || fallbackBreakfast;
    const lunch = lunchSpots[(dayNum - 1) % Math.max(1, lunchSpots.length)] || fallbackLunch;
    const dinner = dinnerSpots[(dayNum - 1) % Math.max(1, dinnerSpots.length)] || fallbackDinner;

    // Daily SDG tip
    const sdgTip = RESPONSIBLE_TRAVEL_TIPS[(dayNum - 1) % RESPONSIBLE_TRAVEL_TIPS.length];

    // Estimated daily spending for activities + meals + local transit
    const dayMealCost = Math.round((breakfast.avgCostForTwo / 2 + lunch.avgCostForTwo / 2 + dinner.avgCostForTwo / 2) * numTravellers);
    const dayAttractionFees = ((morningAttraction?.entryFee || 0) + (afternoonAttraction?.entryFee || 0) + (eveningAttraction?.entryFee || 0)) * numTravellers;
    const dayLocalTransit = (travelStyle === 'Budget' ? 120 : travelStyle === 'Standard' ? 220 : 400) * numTravellers;
    const estimatedDayTotal = dayMealCost + dayAttractionFees + dayLocalTransit;

    dailyItinerary.push({
      dayNumber: dayNum,
      theme: dayNum === 1
        ? 'Arrival, Orientation & Historic Landmarks'
        : dayNum === 2
        ? 'Cultural Immersion, Local Bazaars & Sunset'
        : dayNum === 3
        ? 'Hidden Gems, Scenic Views & Culinary Delights'
        : `Day ${dayNum} – Extended Exploration & Natural Wonders`,
      morning: {
        time: '08:30 AM - 12:30 PM',
        breakfastSpot: {
          name: breakfast.name,
          cost: Math.round(breakfast.avgCostForTwo / 2),
          dishes: breakfast.signatureDishes,
          address: breakfast.address,
          ecoTip: breakfast.ecoTip
        },
        activity: {
          id: morningAttraction.id,
          name: morningAttraction.name,
          type: morningAttraction.type,
          duration: `${morningAttraction.estimatedDuration} hrs`,
          entryFee: morningAttraction.entryFee,
          openingHours: morningAttraction.openingHours,
          description: morningAttraction.description,
          ecoTip: morningAttraction.ecoTip,
          imageUrl: morningAttraction.imageUrl,
          coords: morningAttraction.coords
        },
        transitSuggestion: 'Take a pleasant 15-minute walk or a shared electric rickshaw (₹20-30).'
      },
      afternoon: {
        time: '12:30 PM - 04:30 PM',
        lunchSpot: {
          name: lunch.name,
          cost: Math.round(lunch.avgCostForTwo / 2),
          dishes: lunch.signatureDishes,
          address: lunch.address,
          ecoTip: lunch.ecoTip
        },
        activity: {
          id: afternoonAttraction.id,
          name: afternoonAttraction.name,
          type: afternoonAttraction.type,
          duration: `${afternoonAttraction.estimatedDuration} hrs`,
          entryFee: afternoonAttraction.entryFee,
          openingHours: afternoonAttraction.openingHours,
          description: afternoonAttraction.description,
          ecoTip: afternoonAttraction.ecoTip,
          imageUrl: afternoonAttraction.imageUrl,
          coords: afternoonAttraction.coords
        },
        transitSuggestion: 'Rent a bicycle or hail a short metered auto-rickshaw (approx ₹40-50).'
      },
      evening: {
        time: '04:30 PM - 09:30 PM',
        activity: {
          id: eveningAttraction.id,
          name: eveningAttraction.name,
          type: eveningAttraction.type,
          duration: `${eveningAttraction.estimatedDuration} hrs`,
          entryFee: eveningAttraction.entryFee,
          openingHours: eveningAttraction.openingHours,
          description: eveningAttraction.description,
          ecoTip: eveningAttraction.ecoTip,
          imageUrl: eveningAttraction.imageUrl,
          coords: eveningAttraction.coords
        },
        dinnerSpot: {
          name: dinner.name,
          cost: Math.round(dinner.avgCostForTwo / 2),
          dishes: dinner.signatureDishes,
          address: dinner.address,
          ecoTip: dinner.ecoTip
        },
        transitSuggestion: 'Stroll along well-lit pedestrian pathways or take an evening public bus back to your stay.'
      },
      sdgTip,
      estimatedDayTotal,
      costBreakdown: {
        meals: dayMealCost,
        entryTickets: dayAttractionFees,
        localTransit: dayLocalTransit
      }
    });
  }

  // 5. Generate Money Saving Tips
  const savingTips = generateMoneySavingTips({
    currentTrip: {
      days: numDays,
      travellers: numTravellers,
      budget,
      transportPref,
      accommodation: selectedAccommodation
    },
    destination
  });

  return {
    id: `trip_${Date.now()}`,
    destination: {
      id: destination.id,
      name: destination.name,
      state: destination.state,
      region: destination.region,
      tagline: destination.tagline,
      coordinates: destination.coordinates,
      heroImage: destination.heroImage,
      bestSeason: destination.bestSeason
    },
    meta: {
      startingCity,
      departureDate: new Date().toISOString().split('T')[0],
      days: numDays,
      travellers: numTravellers,
      totalBudget: budget,
      travelStyle,
      interests,
      transportPref,
      accommodationPref,
      dietaryPref,
      createdAt: new Date().toISOString()
    },
    budgetAnalysis,
    selectedAccommodation,
    selectedTransport,
    allAccommodations: destination.accommodations,
    allRestaurants: destination.restaurants,
    allTransportOptions: cityTransport?.modes || [],
    allAttractions: destination.attractions,
    dailyItinerary,
    moneySavingTips: savingTips
  };
}
