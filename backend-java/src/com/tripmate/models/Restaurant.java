package com.tripmate.models;

import java.util.List;

public class Restaurant {
    public String id;
    public String name;
    public String mealType;
    public String dietary;
    public int avgCostForTwo;
    public List<String> signatureDishes;
    public String address;
    public double lat;
    public double lng;
    public String ecoTip;

    public Restaurant(String id, String name, String mealType, String dietary, int avgCostForTwo,
                      List<String> signatureDishes, String address, double lat, double lng, String ecoTip) {
        this.id = id;
        this.name = name;
        this.mealType = mealType;
        this.dietary = dietary;
        this.avgCostForTwo = avgCostForTwo;
        this.signatureDishes = signatureDishes;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.ecoTip = ecoTip;
    }
}
