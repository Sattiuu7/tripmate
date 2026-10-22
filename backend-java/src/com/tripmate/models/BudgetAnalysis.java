package com.tripmate.models;

import java.util.HashMap;
import java.util.Map;

public class BudgetAnalysis {
    public int totalBudget;
    public int estimatedTotalCost;
    public int remainingBalance;
    public int costPerPerson;
    public int costPerDay;
    public String status;
    public boolean isWithinBudget;
    public Map<String, CategoryBreakdown> breakdown = new HashMap<>();
    public Map<String, Integer> allocations = new HashMap<>();

    public static class CategoryBreakdown {
        public int allocated;
        public int estimated;
        public int percentage;
        public String details;

        public CategoryBreakdown(int allocated, int estimated, int percentage, String details) {
            this.allocated = allocated;
            this.estimated = estimated;
            this.percentage = percentage;
            this.details = details;
        }
    }
}
