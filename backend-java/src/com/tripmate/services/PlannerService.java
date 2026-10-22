package com.tripmate.services;

import com.tripmate.models.*;
import java.util.*;

public class PlannerService {

    public static String generateTripJson(Destination dest, int days, int budget, int travellers,
                                          String travelStyle, String startingCity, String departureDate) {
        if (dest == null) return "{\"error\":\"Destination not found\"}";

        int numDays = Math.max(1, days);
        int numTravellers = Math.max(1, travellers);

        Accommodation selectedAcc = !dest.accommodations.isEmpty() ? dest.accommodations.get(0) : null;
        TransportOption selectedTrans = !dest.transportOptions.isEmpty() ? dest.transportOptions.get(0) : null;

        BudgetAnalysis budgetAnalysis = BudgetEngine.calculate(budget, numDays, numTravellers, travelStyle, dest, selectedAcc, selectedTrans, null);

        StringBuilder sb = new StringBuilder();
        sb.append("{\n");
        sb.append("  \"id\": \"trip_").append(System.currentTimeMillis()).append("\",\n");

        // Destination
        sb.append("  \"destination\": {\n");
        sb.append("    \"id\": \"").append(dest.id).append("\",\n");
        sb.append("    \"name\": \"").append(dest.name).append("\",\n");
        sb.append("    \"state\": \"").append(dest.state).append("\",\n");
        sb.append("    \"region\": \"").append(dest.region).append("\",\n");
        sb.append("    \"tagline\": \"").append(escapeJson(dest.tagline)).append("\",\n");
        sb.append("    \"heroImage\": \"").append(dest.heroImage).append("\",\n");
        sb.append("    \"coordinates\": {\"lat\": ").append(dest.lat).append(", \"lng\": ").append(dest.lng).append("},\n");
        sb.append("    \"bestSeason\": \"").append(dest.bestSeason).append("\"\n");
        sb.append("  },\n");

        // Meta
        sb.append("  \"meta\": {\n");
        sb.append("    \"startingCity\": \"").append(startingCity).append("\",\n");
        sb.append("    \"departureDate\": \"").append(departureDate).append("\",\n");
        sb.append("    \"days\": ").append(numDays).append(",\n");
        sb.append("    \"travellers\": ").append(numTravellers).append(",\n");
        sb.append("    \"totalBudget\": ").append(budget).append(",\n");
        sb.append("    \"travelStyle\": \"").append(travelStyle).append("\"\n");
        sb.append("  },\n");

        // Budget Analysis
        sb.append("  \"budgetAnalysis\": {\n");
        sb.append("    \"totalBudget\": ").append(budgetAnalysis.totalBudget).append(",\n");
        sb.append("    \"estimatedTotalCost\": ").append(budgetAnalysis.estimatedTotalCost).append(",\n");
        sb.append("    \"remainingBalance\": ").append(budgetAnalysis.remainingBalance).append(",\n");
        sb.append("    \"costPerPerson\": ").append(budgetAnalysis.costPerPerson).append(",\n");
        sb.append("    \"costPerDay\": ").append(budgetAnalysis.costPerDay).append(",\n");
        sb.append("    \"status\": \"").append(budgetAnalysis.status).append("\",\n");
        sb.append("    \"isWithinBudget\": ").append(budgetAnalysis.isWithinBudget).append(",\n");
        sb.append("    \"allocations\": {\n");
        int aIdx = 0;
        for (Map.Entry<String, Integer> e : budgetAnalysis.allocations.entrySet()) {
            sb.append("      \"").append(e.getKey()).append("\": ").append(e.getValue());
            if (++aIdx < budgetAnalysis.allocations.size()) sb.append(",");
            sb.append("\n");
        }
        sb.append("    },\n");
        sb.append("    \"breakdown\": {\n");
        int bIdx = 0;
        for (Map.Entry<String, BudgetAnalysis.CategoryBreakdown> e : budgetAnalysis.breakdown.entrySet()) {
            BudgetAnalysis.CategoryBreakdown cb = e.getValue();
            sb.append("      \"").append(e.getKey()).append("\": {\n");
            sb.append("        \"allocated\": ").append(cb.allocated).append(",\n");
            sb.append("        \"estimated\": ").append(cb.estimated).append(",\n");
            sb.append("        \"percentage\": ").append(cb.percentage).append(",\n");
            sb.append("        \"details\": \"").append(escapeJson(cb.details)).append("\"\n");
            sb.append("      }");
            if (++bIdx < budgetAnalysis.breakdown.size()) sb.append(",");
            sb.append("\n");
        }
        sb.append("    }\n");
        sb.append("  },\n");

        // Selected Stay
        if (selectedAcc != null) {
            sb.append("  \"selectedAccommodation\": {\n");
            sb.append("    \"id\": \"").append(selectedAcc.id).append("\",\n");
            sb.append("    \"name\": \"").append(selectedAcc.name).append("\",\n");
            sb.append("    \"type\": \"").append(selectedAcc.type).append("\",\n");
            sb.append("    \"pricePerNight\": ").append(selectedAcc.pricePerNight).append(",\n");
            sb.append("    \"rating\": ").append(selectedAcc.rating).append(",\n");
            sb.append("    \"address\": \"").append(escapeJson(selectedAcc.address)).append("\"\n");
            sb.append("  },\n");
        }

        // Daily Itinerary
        sb.append("  \"dailyItinerary\": [\n");
        for (int d = 1; d <= numDays; d++) {
            Attraction morningAtt = !dest.attractions.isEmpty() ? dest.attractions.get((d - 1) % dest.attractions.size()) : null;
            Attraction afternoonAtt = dest.attractions.size() > 1 ? dest.attractions.get(d % dest.attractions.size()) : morningAtt;
            Restaurant morningFood = !dest.restaurants.isEmpty() ? dest.restaurants.get(0) : null;
            Restaurant lunchFood = dest.restaurants.size() > 1 ? dest.restaurants.get(1) : morningFood;
            Restaurant dinnerFood = dest.restaurants.size() > 2 ? dest.restaurants.get(2) : morningFood;

            sb.append("    {\n");
            sb.append("      \"dayNumber\": ").append(d).append(",\n");
            sb.append("      \"theme\": \"Day ").append(d).append(" – Cultural Exploration & Heritage Landmarks\",\n");
            sb.append("      \"estimatedDayTotal\": ").append(650 * numTravellers).append(",\n");

            // Morning
            sb.append("      \"morning\": {\n");
            sb.append("        \"time\": \"08:30 AM - 12:30 PM\",\n");
            sb.append("        \"transitSuggestion\": \"Take a shared electric rickshaw or rental bicycle (₹20-30).\",\n");
            if (morningFood != null) {
                sb.append("        \"breakfastSpot\": {\"name\": \"").append(morningFood.name).append("\", \"cost\": ").append(morningFood.avgCostForTwo / 2).append(", \"dishes\": [\"Kachori\", \"Hot Chai\"]},\n");
            }
            if (morningAtt != null) {
                sb.append("        \"activity\": {\"id\": \"").append(morningAtt.id).append("\", \"name\": \"").append(morningAtt.name).append("\", \"type\": \"").append(morningAtt.type).append("\", \"duration\": \"2.0 hrs\", \"entryFee\": ").append(morningAtt.entryFee).append(", \"description\": \"").append(escapeJson(morningAtt.description)).append("\", \"openingHours\": \"").append(morningAtt.openingHours).append("\"}\n");
            }
            sb.append("      },\n");

            // Afternoon
            sb.append("      \"afternoon\": {\n");
            sb.append("        \"time\": \"12:30 PM - 04:30 PM\",\n");
            sb.append("        \"transitSuggestion\": \"Stroll through heritage bazaar or hail a quick metered auto.\",\n");
            if (lunchFood != null) {
                sb.append("        \"lunchSpot\": {\"name\": \"").append(lunchFood.name).append("\", \"cost\": ").append(lunchFood.avgCostForTwo / 2).append(", \"dishes\": [\"Heritage Thali\", \"Curry Rice\"]},\n");
            }
            if (afternoonAtt != null) {
                sb.append("        \"activity\": {\"id\": \"").append(afternoonAtt.id).append("\", \"name\": \"").append(afternoonAtt.name).append("\", \"type\": \"").append(afternoonAtt.type).append("\", \"duration\": \"2.5 hrs\", \"entryFee\": ").append(afternoonAtt.entryFee).append(", \"description\": \"").append(escapeJson(afternoonAtt.description)).append("\", \"openingHours\": \"").append(afternoonAtt.openingHours).append("\"}\n");
            }
            sb.append("      },\n");

            // Evening
            sb.append("      \"evening\": {\n");
            sb.append("        \"time\": \"04:30 PM - 09:30 PM\",\n");
            sb.append("        \"transitSuggestion\": \"Walk along pedestrian promenades back to your accommodation.\",\n");
            if (dinnerFood != null) {
                sb.append("        \"dinnerSpot\": {\"name\": \"").append(dinnerFood.name).append("\", \"cost\": ").append(dinnerFood.avgCostForTwo / 2).append(", \"dishes\": [\"Special Dinner\", \"Dessert\"]}\n");
            }
            sb.append("      },\n");

            // SDG tip
            sb.append("      \"sdgTip\": {\"title\": \"Responsible Tourism & Local Support (SDG 8 & 12)\", \"tip\": \"Carry a reusable steel flask to refill RO water at your stay, avoiding single-use plastic waste.\"}\n");
            sb.append("    }");
            if (d < numDays) sb.append(",");
            sb.append("\n");
        }
        sb.append("  ],\n");

        // Collections for tabs
        sb.append("  \"allAccommodations\": [\n");
        for (int i = 0; i < dest.accommodations.size(); i++) {
            Accommodation a = dest.accommodations.get(i);
            sb.append("    {\"id\": \"").append(a.id).append("\", \"name\": \"").append(a.name)
              .append("\", \"type\": \"").append(a.type)
              .append("\", \"pricePerNight\": ").append(a.pricePerNight)
              .append(", \"rating\": ").append(a.rating)
              .append(", \"reviewsCount\": ").append(a.reviewsCount)
              .append(", \"address\": \"").append(escapeJson(a.address))
              .append("\", \"whyBudget\": \"").append(escapeJson(a.whyBudget))
              .append("\", \"ecoFriendly\": ").append(a.ecoFriendly)
              .append(", \"amenities\": [\"Free WiFi\", \"Common Lounge\", \"Luggage Lockers\"]")
              .append("}");
            if (i < dest.accommodations.size() - 1) sb.append(",");
            sb.append("\n");
        }
        sb.append("  ],\n");

        sb.append("  \"allRestaurants\": [\n");
        for (int i = 0; i < dest.restaurants.size(); i++) {
            Restaurant r = dest.restaurants.get(i);
            sb.append("    {\"id\": \"").append(r.id).append("\", \"name\": \"").append(r.name)
              .append("\", \"mealType\": \"").append(r.mealType)
              .append("\", \"dietary\": \"").append(r.dietary)
              .append("\", \"avgCostForTwo\": ").append(r.avgCostForTwo)
              .append(", \"address\": \"").append(escapeJson(r.address))
              .append("\", \"signatureDishes\": [\"Local Thali\", \"Specialty\"]")
              .append(", \"ecoTip\": \"").append(escapeJson(r.ecoTip)).append("\"")
              .append("}");
            if (i < dest.restaurants.size() - 1) sb.append(",");
            sb.append("\n");
        }
        sb.append("  ],\n");

        sb.append("  \"allTransportOptions\": [\n");
        for (int i = 0; i < dest.transportOptions.size(); i++) {
            TransportOption t = dest.transportOptions.get(i);
            sb.append("    {\"type\": \"").append(t.type)
              .append("\", \"avgFare\": ").append(t.avgFare)
              .append(", \"durationHours\": ").append(t.durationHours)
              .append(", \"provider\": \"").append(escapeJson(t.provider))
              .append("\", \"bookingUrl\": \"").append(t.bookingUrl).append("\"}")
              ;
            if (i < dest.transportOptions.size() - 1) sb.append(",");
            sb.append("\n");
        }
        sb.append("  ],\n");

        sb.append("  \"allAttractions\": [\n");
        for (int i = 0; i < dest.attractions.size(); i++) {
            Attraction a = dest.attractions.get(i);
            sb.append("    {\"id\": \"").append(a.id).append("\", \"name\": \"").append(a.name)
              .append("\", \"type\": \"").append(a.type)
              .append("\", \"entryFee\": ").append(a.entryFee)
              .append(", \"openingHours\": \"").append(a.openingHours)
              .append("\", \"description\": \"").append(escapeJson(a.description)).append("\"")
              .append(", \"coords\": {\"lat\": ").append(a.lat).append(", \"lng\": ").append(a.lng).append("}")
              .append("}");
            if (i < dest.attractions.size() - 1) sb.append(",");
            sb.append("\n");
        }
        sb.append("  ]\n");

        sb.append("}\n");

        return sb.toString();
    }

    private static String escapeJson(String text) {
        if (text == null) return "";
        return text.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
