package com.tripmate.services;

import com.tripmate.models.*;
import java.util.Map;

public class BudgetEngine {

    public static BudgetAnalysis calculate(int totalBudget, int days, int travellers,
                                           String travelStyle, Destination dest,
                                           Accommodation acc, TransportOption trans,
                                           Map<String, Integer> customAllocations) {
        BudgetAnalysis analysis = new BudgetAnalysis();
        int numDays = Math.max(1, days);
        int numNights = Math.max(1, numDays - 1);
        int numTravellers = Math.max(1, travellers);
        int budget = Math.max(1000, totalBudget);

        int allocAcc = customAllocations != null && customAllocations.containsKey("accommodation") ? customAllocations.get("accommodation") : 30;
        int allocTrans = customAllocations != null && customAllocations.containsKey("intercityTransport") ? customAllocations.get("intercityTransport") : 22;
        int allocFood = customAllocations != null && customAllocations.containsKey("food") ? customAllocations.get("food") : 22;
        int allocSight = customAllocations != null && customAllocations.containsKey("sightseeing") ? customAllocations.get("sightseeing") : 12;
        int allocLocal = customAllocations != null && customAllocations.containsKey("localTransport") ? customAllocations.get("localTransport") : 8;
        int allocBuffer = customAllocations != null && customAllocations.containsKey("emergencyBuffer") ? customAllocations.get("emergencyBuffer") : 6;

        analysis.allocations.put("accommodation", allocAcc);
        analysis.allocations.put("intercityTransport", allocTrans);
        analysis.allocations.put("food", allocFood);
        analysis.allocations.put("sightseeing", allocSight);
        analysis.allocations.put("localTransport", allocLocal);
        analysis.allocations.put("emergencyBuffer", allocBuffer);

        // 1. Accommodation estimation
        int nightlyRate = acc != null ? acc.pricePerNight : (dest != null && !dest.accommodations.isEmpty() ? dest.accommodations.get(0).pricePerNight : 600);
        boolean isDorm = acc != null && "hostel".equalsIgnoreCase(acc.type);
        int roomsNeeded = isDorm ? numTravellers : (int) Math.ceil(numTravellers / 2.0);
        int estAccCost = nightlyRate * roomsNeeded * numNights;

        // 2. Intercity transport estimation
        int transFareOneWay = trans != null ? trans.avgFare : (dest != null && !dest.transportOptions.isEmpty() ? dest.transportOptions.get(0).avgFare : 400);
        int estTransCost = (transFareOneWay * 2) * numTravellers;

        // 3. Food estimation
        int foodPerDay = "Budget".equalsIgnoreCase(travelStyle) ? 350 : ("Standard".equalsIgnoreCase(travelStyle) ? 650 : 1200);
        int estFoodCost = foodPerDay * numDays * numTravellers;

        // 4. Sightseeing entry tickets
        int totalAttractionFees = 0;
        if (dest != null && dest.attractions != null) {
            for (Attraction a : dest.attractions) {
                totalAttractionFees += a.entryFee;
            }
        } else {
            totalAttractionFees = numDays * 120;
        }
        int estSightCost = totalAttractionFees * numTravellers;

        // 5. Local transport
        int localDailyRate = "Budget".equalsIgnoreCase(travelStyle) ? 120 : ("Standard".equalsIgnoreCase(travelStyle) ? 220 : 400);
        int estLocalCost = localDailyRate * numDays * numTravellers;

        // 6. Emergency reserve buffer
        int emergencyReserve = (int) Math.round((budget * allocBuffer) / 100.0);

        // Total
        int estimatedTotal = estAccCost + estTransCost + estFoodCost + estSightCost + estLocalCost + emergencyReserve;
        int remaining = budget - estimatedTotal;
        boolean within = remaining >= 0;

        analysis.totalBudget = budget;
        analysis.estimatedTotalCost = estimatedTotal;
        analysis.remainingBalance = remaining;
        analysis.costPerPerson = (int) Math.round((double) estimatedTotal / numTravellers);
        analysis.costPerDay = (int) Math.round((double) estimatedTotal / numDays);
        analysis.isWithinBudget = within;
        analysis.status = within ? "Within Budget" : "Over Budget";

        analysis.breakdown.put("accommodation", new BudgetAnalysis.CategoryBreakdown(
                (int) Math.round((budget * allocAcc) / 100.0), estAccCost, allocAcc,
                roomsNeeded + " " + (isDorm ? "bunk(s)" : "room(s)") + " × ₹" + nightlyRate + " × " + numNights + " night(s)"
        ));
        analysis.breakdown.put("intercityTransport", new BudgetAnalysis.CategoryBreakdown(
                (int) Math.round((budget * allocTrans) / 100.0), estTransCost, allocTrans,
                "₹" + (transFareOneWay * 2) + " round trip × " + numTravellers + " traveller(s)"
        ));
        analysis.breakdown.put("food", new BudgetAnalysis.CategoryBreakdown(
                (int) Math.round((budget * allocFood) / 100.0), estFoodCost, allocFood,
                "₹" + foodPerDay + "/day × " + numDays + " days × " + numTravellers + " traveller(s)"
        ));
        analysis.breakdown.put("sightseeing", new BudgetAnalysis.CategoryBreakdown(
                (int) Math.round((budget * allocSight) / 100.0), estSightCost, allocSight,
                "₹" + totalAttractionFees + " entry tickets × " + numTravellers + " traveller(s)"
        ));
        analysis.breakdown.put("localTransport", new BudgetAnalysis.CategoryBreakdown(
                (int) Math.round((budget * allocLocal) / 100.0), estLocalCost, allocLocal,
                "₹" + localDailyRate + "/day × " + numDays + " days × " + numTravellers + " traveller(s)"
        ));
        analysis.breakdown.put("emergencyReserve", new BudgetAnalysis.CategoryBreakdown(
                emergencyReserve, emergencyReserve, allocBuffer,
                "Recommended 5-10% contingency buffer for peace of mind"
        ));

        return analysis;
    }
}
