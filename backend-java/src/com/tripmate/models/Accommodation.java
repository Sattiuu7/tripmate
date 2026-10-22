package com.tripmate.models;

import java.util.List;

public class Accommodation {
    public String id;
    public String name;
    public String type;
    public int pricePerNight;
    public double rating;
    public int reviewsCount;
    public List<String> amenities;
    public String address;
    public double lat;
    public double lng;
    public String whyBudget;
    public String bookingUrl;
    public boolean ecoFriendly;

    public Accommodation(String id, String name, String type, int pricePerNight, double rating,
                         int reviewsCount, List<String> amenities, String address, double lat, double lng,
                         String whyBudget, String bookingUrl, boolean ecoFriendly) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.pricePerNight = pricePerNight;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.amenities = amenities;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.whyBudget = whyBudget;
        this.bookingUrl = bookingUrl;
        this.ecoFriendly = ecoFriendly;
    }
}
