package com.tripmate.data;

import com.tripmate.models.*;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class DestinationRepository {
    private static final Map<String, Destination> destinations = new LinkedHashMap<>();
    private static final String SAVED_TRIPS_FILE = "data/saved_trips.json";

    static {
        initData();
    }

    private static void initData() {
        // 1. JAIPUR
        List<Attraction> jprAttractions = List.of(
            new Attraction("jpr_hawa_mahal", "Hawa Mahal (Palace of Winds)", "Heritage", "morning", 1.5, 50, "09:00 AM - 05:00 PM", "Iconic honeycomb facade with 953 jharokhas designed for royal women to observe street festivities.", 26.9239, 75.8267, "Buy composite heritage ticket to save ₹150 across Amber Fort, Jantar Mantar, and Albert Hall.", "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=600&q=80"),
            new Attraction("jpr_amber_fort", "Amber Fort & Palace", "History", "morning", 3.0, 100, "08:00 AM - 05:30 PM", "Sprawling hilltop fortress with Sheesh Mahal mirror palace and sweeping Maota Lake views.", 26.9855, 75.8513, "Walk up the scenic stone ramp instead of animal rides for sustainable cruelty-free tourism.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"),
            new Attraction("jpr_city_palace", "Jaipur City Palace & Museum", "History", "afternoon", 2.0, 200, "09:30 AM - 05:00 PM", "The ceremonial seat of the Maharaja of Jaipur featuring courtyards and peacock gates.", 26.9258, 75.8236, "Hire a licensed local heritage guide at the counter to support decent local employment (SDG 8).", "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"),
            new Attraction("jpr_nahargarh", "Nahargarh Fort Sunset Point", "Mountains", "evening", 2.0, 50, "10:00 AM - 06:30 PM", "Perched on the edge of the Aravalli Hills overlooking the entire glowing pink city at sunset.", 26.9388, 75.8155, "Carry your own refillable water flask to avoid single-use plastic at hill altitudes.", "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80")
        );

        List<Accommodation> jprStays = List.of(
            new Accommodation("jpr_hostel_zostel", "Zostel Jaipur (M.I. Road)", "hostel", 599, 4.6, 1840, List.of("Free WiFi", "Rooftop Cafe", "AC Bunks", "Luggage Storage"), "M.I. Road, Jaipur", 26.9180, 75.8050, "Top rated backpacker hostel with vibrant student community and walking tours.", "https://www.zostel.com", true),
            new Accommodation("jpr_homestay_krishna", "Krishna Heritage Eco-Homestay", "homestay", 1250, 4.8, 420, List.of("Home Breakfast Included", "Solar Water Heating", "Courtyard"), "Bani Park, Jaipur", 26.9220, 75.7980, "Family-run Rajput home with authentic home-cooked Rajasthani thalis and zero plastic policy.", "https://www.homestay.com", true),
            new Accommodation("jpr_hotel_kalyan", "Hotel Kalyan & Heritage Rooftop", "budget_hotel", 1450, 4.3, 890, List.of("Rooftop Restaurant", "Ensuite Bath", "AC"), "Ajmer Road, Jaipur", 26.9110, 75.7950, "Clean private rooms with fort views, popular for budget families.", "https://www.booking.com", false)
        );

        List<Restaurant> jprFood = List.of(
            new Restaurant("jpr_rest_rawat", "Rawat Mishthan Bhandar", "breakfast", "veg", 220, List.of("Pyaz Ki Kachori", "Mawa Kachori", "Lassi"), "Station Road, Jaipur", 26.9212, 75.7988, "Century-old breakfast institution famous across Rajasthan."),
            new Restaurant("jpr_rest_lmb", "Laxmi Mishthan Bhandar (LMB)", "lunch", "veg", 600, List.of("Dal Baati Churma Thali", "Ker Sangri", "Ghewar"), "Johari Bazaar, Jaipur", 26.9210, 75.8230, "World-famous heritage vegetarian dining."),
            new Restaurant("jpr_rest_gulab", "Gulab Ji Chai & Bun Maska", "street_food", "veg", 90, List.of("Masala Chai in Clay Kulhad", "Bun Maska"), "MI Road, Jaipur", 26.9189, 75.8015, "Clay kulhads support regional potter communities (SDG 12).")
        );

        List<TransportOption> jprTransport = List.of(
            new TransportOption("train", 190, 4.5, "Indian Railways (Double Decker / Shatabdi)", "https://www.irctc.co.in"),
            new TransportOption("bus", 320, 5.5, "RSRTC Express & Volvo Sleeper", "https://www.redbus.in"),
            new TransportOption("flight", 2100, 1.0, "IndiGo / SpiceJet", "https://www.makemytrip.com")
        );

        destinations.put("jaipur", new Destination(
            "jaipur", "Jaipur", "Rajasthan", "North India",
            "The Pink City of Royal Forts & Vibrant Bazaars",
            "A UNESCO World Heritage city bursting with majestic hill forts, pink-hued palaces, bustling traditional bazaars, and delectable street delicacies.",
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            26.9124, 75.7873, List.of("History", "Heritage", "Shopping", "Food", "Budget"),
            1100, "October to March", 3,
            jprAttractions, jprStays, jprFood, jprTransport
        ));

        // 2. GOA
        List<Attraction> goaAttractions = List.of(
            new Attraction("goa_anjuna", "Anjuna & Ozran Beach Coastline", "Beaches", "morning", 3.0, 0, "Open 24 Hours", "Red rocky coastline, swaying coconut palms, and refreshing Arabian sea breezes.", 15.5800, 73.7430, "Participate in 'Leave No Trace' beach culture; avoid plastic bottles.", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"),
            new Attraction("goa_fontainhas", "Fontainhas Latin Quarter Stroll", "Heritage", "afternoon", 2.0, 0, "09:00 AM - 07:00 PM", "Asia's only Latin Quarter featuring pastel Portuguese villas and azulejos tiles.", 15.4989, 73.8278, "Walk quietly and respect residential privacy while photographing colonial architecture.", "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80"),
            new Attraction("goa_chapora", "Chapora Fort ('Dil Chahta Hai' Fort)", "Adventure", "evening", 2.0, 0, "06:00 AM - 06:30 PM", "Laterite ramparts offering panoramic sunset views across the Chapora river estuary.", 15.6059, 73.7364, "100% free panoramic sunset views; wear sturdy shoes.", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80")
        );

        List<Accommodation> goaStays = List.of(
            new Accommodation("goa_hosteller", "The Hosteller Goa (Anjuna)", "hostel", 550, 4.7, 1580, List.of("Swimming Pool", "WiFi", "Coworking", "Lockers"), "Anjuna, North Goa", 15.5820, 73.7480, "Top backpacker choice with swimming pool, community events, and 10 mins walk to beach.", "https://www.thehosteller.com", true),
            new Accommodation("goa_fernandes", "Fernandes Wooden Eco Cottages", "homestay", 1350, 4.8, 510, List.of("Beachfront Access", "Garden Cafe", "Hammocks"), "Palolem Beach, South Goa", 15.0100, 74.0230, "Family-run palm-leaf cottages directly touching the calm south waters.", "https://www.airbnb.co.in", true)
        );

        List<Restaurant> goaFood = List.of(
            new Restaurant("goa_vinayak", "Vinayak Family Restaurant", "lunch", "all", 350, List.of("Special Goan Fish Thali", "Prawn Curry Rice", "Sol Kadhi"), "Assagao, Goa", 15.5905, 73.7710, "Beloved local gem with the most pocket-friendly authentic Goan thali."),
            new Restaurant("goa_artjuna", "Artjuna Garden Cafe", "breakfast", "vegan", 480, List.of("Shakshuka", "Smoothie Bowls", "Croissants"), "Anjuna, Goa", 15.5760, 73.7490, "Lush mango grove setting with zero single-use plastic.")
        );

        List<TransportOption> goaTransport = List.of(
            new TransportOption("train", 360, 9.5, "Konkan Kanya Express / Vande Bharat", "https://www.irctc.co.in"),
            new TransportOption("bus", 650, 12.0, "Paulo Travels Sleeper Bus", "https://www.redbus.in"),
            new TransportOption("flight", 2400, 1.1, "IndiGo / Akasa Air", "https://www.makemytrip.com")
        );

        destinations.put("goa", new Destination(
            "goa", "Goa", "Goa", "West Coast",
            "Sun-Kissed Beaches, Portuguese Quarters & Laid-Back Vibes",
            "Tropical coastal haven known for golden sandy beaches, historic UNESCO churches, vibrant night shacks, fresh seafood, and palm-fringed backwaters.",
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
            15.2993, 74.1240, List.of("Beaches", "Nature", "Food", "Adventure", "Budget"),
            1200, "November to March", 4,
            goaAttractions, goaStays, goaFood, goaTransport
        ));

        // 3. MANALI
        List<Attraction> mnlAttractions = List.of(
            new Attraction("mnl_hadimba", "Hadimba Devi Cedar Temple", "Spirituality", "morning", 2.0, 0, "08:00 AM - 06:00 PM", "1553 AD wooden pagoda-style temple inside deodar cedar forests.", 32.2483, 77.1809, "Walk the scenic 1.5 km shaded cedar forest path from Mall Road.", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"),
            new Attraction("mnl_solang", "Solang Valley Snow Point", "Adventure", "morning", 4.0, 0, "09:00 AM - 05:30 PM", "Alpine meadow known for paragliding, ropeway cable car, and winter ski slopes.", 32.3166, 77.1583, "Take HRTC public bus from Manali stand for ₹35 instead of ₹1,500 private taxis.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80")
        );

        List<Accommodation> mnlStays = List.of(
            new Accommodation("mnl_zostel", "Zostel Old Manali", "hostel", 599, 4.7, 2210, List.of("Mountain View", "Bonfire", "WiFi"), "Old Manali", 32.2540, 77.1770, "Legendary backpacker haven overlooking snow peaks.", "https://www.zostel.com", true)
        );

        List<Restaurant> mnlFood = List.of(
            new Restaurant("mnl_cafe_1947", "Cafe 1947 Riverside", "dinner", "all", 550, List.of("Wood-fired Pizza", "Trout Fish", "Apple Crumble"), "Old Manali", 32.2580, 77.1830, "Dine right beside the gushing mountain river.")
        );

        List<TransportOption> mnlTransport = List.of(
            new TransportOption("bus", 750, 13.5, "HRTC Himgaurav Volvo AC Sleeper", "https://www.hrtchp.com")
        );

        destinations.put("manali", new Destination(
            "manali", "Manali", "Himachal Pradesh", "Himalayas / North",
            "Himalayan Wonderland of Pine Forests & Snow Peaks",
            "Nestled in the Beas River Valley, Manali offers scenic apple orchards, snow adventure sports at Solang, ancient wooden temples, and peaceful Old Manali vibes.",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
            32.2432, 77.1892, List.of("Mountains", "Nature", "Adventure", "Spirituality", "Budget"),
            1050, "March to June & Dec to Feb", 4,
            mnlAttractions, mnlStays, mnlFood, mnlTransport
        ));
    }

    public static Collection<Destination> getAll() {
        return destinations.values();
    }

    public static Destination getById(String id) {
        if (id == null) return null;
        return destinations.get(id.toLowerCase());
    }

    public static synchronized String getSavedTripsJson() {
        try {
            File file = new File(SAVED_TRIPS_FILE);
            if (!file.exists()) {
                file.getParentFile().mkdirs();
                Files.writeString(file.toPath(), "[]");
                return "[]";
            }
            return Files.readString(file.toPath());
        } catch (Exception e) {
            return "[]";
        }
    }

    public static synchronized void saveTripJson(String tripJson) {
        try {
            File file = new File(SAVED_TRIPS_FILE);
            file.getParentFile().mkdirs();
            String current = getSavedTripsJson().trim();
            if (current.equals("[]") || current.isEmpty()) {
                Files.writeString(file.toPath(), "[\n" + tripJson + "\n]");
            } else if (current.startsWith("[") && current.endsWith("]")) {
                String inner = current.substring(1, current.length() - 1).trim();
                Files.writeString(file.toPath(), "[\n" + tripJson + (inner.isEmpty() ? "" : ",\n" + inner) + "\n]");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
