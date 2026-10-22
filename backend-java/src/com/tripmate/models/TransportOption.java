package com.tripmate.models;

public class TransportOption {
    public String type;
    public int avgFare;
    public double durationHours;
    public String provider;
    public String bookingUrl;

    public TransportOption(String type, int avgFare, double durationHours, String provider, String bookingUrl) {
        this.type = type;
        this.avgFare = avgFare;
        this.durationHours = durationHours;
        this.provider = provider;
        this.bookingUrl = bookingUrl;
    }
}
