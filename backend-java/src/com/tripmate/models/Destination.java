package com.tripmate.models;

import java.util.List;

public class Destination {
    public String id;
    public String name;
    public String state;
    public String region;
    public String tagline;
    public String description;
    public String heroImage;
    public double lat;
    public double lng;
    public List<String> tags;
    public int avgDailyCostBudget;
    public String bestSeason;
    public int idealDuration;
    public List<Attraction> attractions;
    public List<Accommodation> accommodations;
    public List<Restaurant> restaurants;
    public List<TransportOption> transportOptions;

    public Destination(String id, String name, String state, String region, String tagline,
                       String description, String heroImage, double lat, double lng,
                       List<String> tags, int avgDailyCostBudget, String bestSeason, int idealDuration,
                       List<Attraction> attractions, List<Accommodation> accommodations,
                       List<Restaurant> restaurants, List<TransportOption> transportOptions) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.region = region;
        this.tagline = tagline;
        this.description = description;
        this.heroImage = heroImage;
        this.lat = lat;
        this.lng = lng;
        this.tags = tags;
        this.avgDailyCostBudget = avgDailyCostBudget;
        this.bestSeason = bestSeason;
        this.idealDuration = idealDuration;
        this.attractions = attractions;
        this.accommodations = accommodations;
        this.restaurants = restaurants;
        this.transportOptions = transportOptions;
    }
}
