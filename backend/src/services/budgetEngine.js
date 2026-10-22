/**
 * Budget Calculation Engine for TripMate
 * Handles realistic travel economics, shared accommodation, per-person rates, and allocations
 */

// Default budget allocation percentages
export const DEFAULT_ALLOCATIONS = {
  accommodation: 30, // 30%
  intercityTransport: 22, // 22%
  food: 22, // 22%
  sightseeing: 12, // 12%
  localTransport: 8, // 8%
  emergencyBuffer: 6 // 6%
};

/**
 * Calculates budget breakdown and estimated expenses
 */
export function calculateBudget({
  totalBudget,
  days,
  travellers = 1,
  travelStyle = 'Budget', // 'Budget' | 'Standard' | 'Comfort'
  destination,
  selectedAccommodation = null,
  selectedTransport = null,
  customAllocations = null
}) {
  const numDays = Math.max(1, parseInt(days) || 1);
  const numNights = Math.max(1, numDays - 1);
  const numTravellers = Math.max(1, parseInt(travellers) || 1);
  const budget = Math.max(500, parseFloat(totalBudget) || 10000);

  const allocations = customAllocations || DEFAULT_ALLOCATIONS;

  // Allocated amounts based on percentage
  const allocatedAmounts = {
    accommodation: Math.round((budget * allocations.accommodation) / 100),
    intercityTransport: Math.round((budget * allocations.intercityTransport) / 100),
    food: Math.round((budget * allocations.food) / 100),
    sightseeing: Math.round((budget * allocations.sightseeing) / 100),
    localTransport: Math.round((budget * allocations.localTransport) / 100),
    emergencyBuffer: Math.round((budget * allocations.emergencyBuffer) / 100)
  };

  // Accommodation estimation
  // If hostel, each traveller gets a bed; if hotel/homestay, 2 travellers share a room
  let nightlyRate = 550;
  let isDorm = false;

  if (selectedAccommodation) {
    nightlyRate = selectedAccommodation.pricePerNight;
    isDorm = selectedAccommodation.type === 'hostel';
  } else if (destination?.accommodations?.length) {
    const acc = destination.accommodations[0];
    nightlyRate = acc.pricePerNight;
    isDorm = acc.type === 'hostel';
  }

  const roomsNeeded = isDorm ? numTravellers : Math.ceil(numTravellers / 2);
  const estimatedAccommodationCost = nightlyRate * roomsNeeded * numNights;

  // Intercity transport estimation
  let transportPerPerson = 450;
  if (selectedTransport) {
    transportPerPerson = selectedTransport.avgFare * 2; // Round trip
  } else if (destination?.transportOptions?.[0]?.modes?.[0]) {
    transportPerPerson = destination.transportOptions[0].modes[0].avgFare * 2;
  }
  const estimatedTransportCost = transportPerPerson * numTravellers;

  // Food estimation per day per traveller based on style
  const foodRatePerDayPerson = travelStyle === 'Budget' ? 350 : travelStyle === 'Standard' ? 650 : 1200;
  const estimatedFoodCost = foodRatePerDayPerson * numDays * numTravellers;

  // Sightseeing / Attractions entry fees
  let totalAttractionFeesPerPerson = 0;
  if (destination?.attractions?.length) {
    totalAttractionFeesPerPerson = destination.attractions.reduce((acc, curr) => acc + (curr.entryFee || 0), 0);
  } else {
    totalAttractionFeesPerPerson = numDays * 150;
  }
  const estimatedSightseeingCost = totalAttractionFeesPerPerson * numTravellers;

  // Local transport (autos, rented scooters, metro, e-rickshaws)
  const localTransportDailyRatePerPerson = travelStyle === 'Budget' ? 120 : travelStyle === 'Standard' ? 250 : 450;
  const estimatedLocalTransportCost = localTransportDailyRatePerPerson * numDays * numTravellers;

  // Estimated emergency buffer
  const emergencyReserve = Math.round(budget * (allocations.emergencyBuffer / 100));

  // Grand estimated total
  const estimatedTotalCost =
    estimatedAccommodationCost +
    estimatedTransportCost +
    estimatedFoodCost +
    estimatedSightseeingCost +
    estimatedLocalTransportCost +
    emergencyReserve;

  const costPerPerson = Math.round(estimatedTotalCost / numTravellers);
  const costPerDay = Math.round(estimatedTotalCost / numDays);
  const remainingBalance = Math.round(budget - estimatedTotalCost);
  const isWithinBudget = remainingBalance >= 0;

  return {
    totalBudget: budget,
    estimatedTotalCost,
    remainingBalance,
    costPerPerson,
    costPerDay,
    status: isWithinBudget ? 'Within Budget' : 'Over Budget',
    isWithinBudget,
    breakdown: {
      accommodation: {
        allocated: allocatedAmounts.accommodation,
        estimated: estimatedAccommodationCost,
        percentage: allocations.accommodation,
        details: `${roomsNeeded} ${isDorm ? 'bed(s)' : 'room(s)'} × ₹${nightlyRate} × ${numNights} night(s)`
      },
      intercityTransport: {
        allocated: allocatedAmounts.intercityTransport,
        estimated: estimatedTransportCost,
        percentage: allocations.intercityTransport,
        details: `₹${transportPerPerson} round trip × ${numTravellers} traveller(s)`
      },
      food: {
        allocated: allocatedAmounts.food,
        estimated: estimatedFoodCost,
        percentage: allocations.food,
        details: `₹${foodRatePerDayPerson}/day × ${numDays} days × ${numTravellers} traveller(s)`
      },
      sightseeing: {
        allocated: allocatedAmounts.sightseeing,
        estimated: estimatedSightseeingCost,
        percentage: allocations.sightseeing,
        details: `₹${totalAttractionFeesPerPerson} entry tickets × ${numTravellers} traveller(s)`
      },
      localTransport: {
        allocated: allocatedAmounts.localTransport,
        estimated: estimatedLocalTransportCost,
        percentage: allocations.localTransport,
        details: `₹${localTransportDailyRatePerPerson}/day local transit × ${numDays} days × ${numTravellers} traveller(s)`
      },
      emergencyReserve: {
        allocated: allocatedAmounts.emergencyBuffer,
        estimated: emergencyReserve,
        percentage: allocations.emergencyBuffer,
        details: `Recommended 5-10% contingency buffer for peace of mind`
      }
    },
    allocations
  };
}

/**
 * Smart Money-Saving Recommendation Engine ("Make My Trip Cheaper")
 */
export function generateMoneySavingTips({ currentTrip, destination }) {
  const suggestions = [];
  let potentialSavings = 0;

  // 1. Accommodation Optimization
  if (destination?.accommodations?.length > 1) {
    const currentPrice = currentTrip.accommodation?.pricePerNight || 1200;
    const cheaperStay = destination.accommodations.find(a => a.pricePerNight < currentPrice);
    if (cheaperStay) {
      const numNights = Math.max(1, (currentTrip.days || 3) - 1);
      const rooms = currentTrip.travellers > 1 ? Math.ceil(currentTrip.travellers / 2) : 1;
      const staySavings = (currentPrice - cheaperStay.pricePerNight) * rooms * numNights;
      if (staySavings > 0) {
        suggestions.push({
          category: 'Accommodation',
          title: `Switch to ${cheaperStay.name}`,
          description: `Switch from your current stay to ${cheaperStay.name} (${cheaperStay.type === 'hostel' ? 'Top-rated Backpacker Hostel' : 'Eco-Homestay'}). Saves on nightly rates with awesome social perks.`,
          estimatedSavings: staySavings,
          actionType: 'CHANGE_ACCOMMODATION',
          actionPayload: cheaperStay
        });
        potentialSavings += staySavings;
      }
    }
  }

  // 2. Transport Optimization (Train instead of Flight/Cab)
  if (destination?.transportOptions?.[0]?.modes?.length > 1) {
    const modes = destination.transportOptions[0].modes;
    const trainOrBus = modes.find(m => m.type === 'train' || m.type === 'bus');
    const flight = modes.find(m => m.type === 'flight');

    if (trainOrBus && flight && currentTrip.transportPref === 'Flight') {
      const diffPerPerson = (flight.avgFare - trainOrBus.avgFare) * 2;
      const totalTransportSavings = diffPerPerson * (currentTrip.travellers || 1);
      suggestions.push({
        category: 'Intercity Transport',
        title: `Take ${trainOrBus.type.toUpperCase()} instead of Flight`,
        description: `Travel via ${trainOrBus.provider}. Save substantial money and reduce carbon emissions significantly (SDG 12).`,
        estimatedSavings: totalTransportSavings,
        actionType: 'CHANGE_TRANSPORT',
        actionPayload: trainOrBus
      });
      potentialSavings += totalTransportSavings;
    }
  }

  // 3. Local Transport Optimization
  suggestions.push({
    category: 'Local Transit',
    title: 'Rent a Bicycle or Moped / Use Electric City Bus',
    description: 'Avoid hiring full-day private cabs. Renting a bicycle (₹80-100/day) or taking local electric buses costs under ₹30/day while letting you explore at your own pace.',
    estimatedSavings: 450 * (currentTrip.days || 3),
    actionType: 'LOCAL_TRANSPORT_TIP'
  });
  potentialSavings += 450 * (currentTrip.days || 3);

  // 4. Free Walking Tours and Sightseeing Passes
  suggestions.push({
    category: 'Sightseeing & Culture',
    title: 'Utilize Composite Passes & Free Sunset Viewpoints',
    description: 'Take advantage of combined heritage monument passes and free natural viewpoints (sunset points, public ghats, beach walks) instead of ticketed commercial attractions.',
    estimatedSavings: 250 * (currentTrip.travellers || 1),
    actionType: 'SIGHTSEEING_TIP'
  });
  potentialSavings += 250 * (currentTrip.travellers || 1);

  // 5. Authentic Local Street Dining
  suggestions.push({
    category: 'Food & Dining',
    title: 'Dine at Iconic Street Food & Heritage Thali Joints',
    description: 'Skip hotel dining and tourist-hub continental bistros. Experience legendary decades-old local tiffin rooms and thali messes for authentic flavors under ₹150/meal.',
    estimatedSavings: 300 * (currentTrip.days || 3) * (currentTrip.travellers || 1),
    actionType: 'FOOD_TIP'
  });
  potentialSavings += 300 * (currentTrip.days || 3) * (currentTrip.travellers || 1);

  return {
    potentialSavings,
    suggestionsCount: suggestions.length,
    suggestions
  };
}
