package com.tripmate.models;

public class Attraction {
    public String id;
    public String name;
    public String type;
    public String timeSlot;
    public double durationHours;
    public int entryFee;
    public String openingHours;
    public String description;
    public double lat;
    public double lng;
    public String ecoTip;
    public String imageUrl;

    public Attraction(String id, String name, String type, String timeSlot, double durationHours,
                      int entryFee, String openingHours, String description, double lat, double lng,
                      String ecoTip, String imageUrl) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.timeSlot = timeSlot;
        this.durationHours = durationHours;
        this.entryFee = entryFee;
        this.openingHours = openingHours;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.ecoTip = ecoTip;
        this.imageUrl = imageUrl;
    }
}
