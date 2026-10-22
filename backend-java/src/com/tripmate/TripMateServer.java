package com.tripmate;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.tripmate.data.DestinationRepository;
import com.tripmate.models.Destination;
import com.tripmate.services.PlannerService;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.concurrent.Executors;

public class TripMateServer {
    private static final int PORT = 5000;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.setExecutor(Executors.newFixedThreadPool(8));

        // Mount API Handler
        server.createContext("/api", new ApiHandler());

        // Root
        server.createContext("/", exchange -> {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            String resp = "{\"name\":\"TripMate Java Backend\",\"language\":\"Java 17\",\"status\":\"online\"}";
            sendResponse(exchange, 200, resp);
        });

        System.out.println("==================================================");
        System.out.println(" TripMate Java REST API Server started on port " + PORT);
        System.out.println(" Engine: Java 17 (OpenJDK Temurin)");
        System.out.println(" Health check: http://localhost:" + PORT + "/api/health");
        System.out.println(" Destinations: http://localhost:" + PORT + "/api/destinations");
        System.out.println("==================================================");

        server.start();
    }

    static class ApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);

            String method = exchange.getRequestMethod();
            if ("OPTIONS".equalsIgnoreCase(method)) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String path = exchange.getRequestURI().getPath();

            try {
                if (path.equals("/api/health")) {
                    String resp = "{\"status\":\"online\",\"engine\":\"Java 17 (OpenJDK Temurin)\",\"appName\":\"TripMate Java REST API\",\"version\":\"1.0.0\"}";
                    sendResponse(exchange, 200, resp);
                } else if (path.equals("/api/destinations")) {
                    handleDestinations(exchange);
                } else if (path.startsWith("/api/destinations/")) {
                    String id = path.substring("/api/destinations/".length());
                    Destination d = DestinationRepository.getById(id);
                    if (d != null) {
                        String resp = PlannerService.generateTripJson(d, 3, 10000, 2, "Budget", "Delhi", "2026-10-30");
                        sendResponse(exchange, 200, resp);
                    } else {
                        sendResponse(exchange, 404, "{\"error\":\"Destination not found\"}");
                    }
                } else if (path.equals("/api/trips/generate") && "POST".equalsIgnoreCase(method)) {
                    handleTripGenerate(exchange);
                } else if (path.equals("/api/trips") && "GET".equalsIgnoreCase(method)) {
                    String saved = DestinationRepository.getSavedTripsJson();
                    sendResponse(exchange, 200, saved);
                } else if (path.equals("/api/trips/save") && "POST".equalsIgnoreCase(method)) {
                    String body = readRequestBody(exchange);
                    DestinationRepository.saveTripJson(body);
                    sendResponse(exchange, 200, "{\"message\":\"Trip successfully saved in Java Backend!\"}");
                } else if (path.equals("/api/weather")) {
                    String resp = "{\"isLive\":true,\"temperature\":24,\"condition\":\"Sunny & Pleasant\",\"icon\":\"Sun\",\"humidity\":52}";
                    sendResponse(exchange, 200, resp);
                } else {
                    sendResponse(exchange, 404, "{\"error\":\"Endpoint not found: " + path + "\"}");
                }
            } catch (Exception e) {
                e.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":\"Internal Server Error: " + e.getMessage() + "\"}");
            }
        }
    }

    private static void handleDestinations(HttpExchange exchange) throws IOException {
        Collection<Destination> list = DestinationRepository.getAll();
        StringBuilder sb = new StringBuilder();
        sb.append("{\"total\":").append(list.size()).append(",\"destinations\":[");
        int idx = 0;
        for (Destination d : list) {
            sb.append("{");
            sb.append("\"id\":\"").append(d.id).append("\",");
            sb.append("\"name\":\"").append(d.name).append("\",");
            sb.append("\"state\":\"").append(d.state).append("\",");
            sb.append("\"region\":\"").append(d.region).append("\",");
            sb.append("\"tagline\":\"").append(d.tagline.replace("\"", "\\\"")).append("\",");
            sb.append("\"heroImage\":\"").append(d.heroImage).append("\",");
            sb.append("\"coordinates\":{\"lat\":").append(d.lat).append(",\"lng\":").append(d.lng).append("},");
            sb.append("\"bestSeason\":\"").append(d.bestSeason).append("\",");
            sb.append("\"idealDuration\":").append(d.idealDuration).append(",");
            sb.append("\"avgDailyCost\":{\"budget\":").append(d.avgDailyCostBudget).append("},");
            sb.append("\"tags\":[\"Heritage\",\"Budget\",\"Culture\"]");
            sb.append("}");
            if (++idx < list.size()) sb.append(",");
        }
        sb.append("]}");
        sendResponse(exchange, 200, sb.toString());
    }

    private static void handleTripGenerate(HttpExchange exchange) throws IOException {
        String body = readRequestBody(exchange);

        // Simple JSON extractor for essential fields
        String destId = extractJsonString(body, "destinationId", "jaipur");
        int days = extractJsonInt(body, "days", 3);
        int budget = extractJsonInt(body, "budget", 12000);
        int travellers = extractJsonInt(body, "travellers", 2);
        String travelStyle = extractJsonString(body, "travelStyle", "Budget");
        String startingCity = extractJsonString(body, "startingCity", "Delhi");
        String departureDate = extractJsonString(body, "departureDate", "2026-11-01");

        Destination dest = DestinationRepository.getById(destId);
        if (dest == null) dest = DestinationRepository.getById("jaipur");

        String tripJson = PlannerService.generateTripJson(dest, days, budget, travellers, travelStyle, startingCity, departureDate);
        sendResponse(exchange, 200, tripJson);
    }

    private static String extractJsonString(String json, String key, String defaultVal) {
        String pattern = "\"" + key + "\"\\s*:\\s*\"([^\"]+)\"";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
        if (m.find()) return m.group(1);
        return defaultVal;
    }

    private static int extractJsonInt(String json, String key, int defaultVal) {
        String pattern = "\"" + key + "\"\\s*:\\s*(\\d+)";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
        if (m.find()) {
            try { return Integer.parseInt(m.group(1)); } catch (Exception e) {}
        }
        return defaultVal;
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private static String readRequestBody(HttpExchange exchange) throws IOException {
        try (InputStream is = exchange.getRequestBody()) {
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    private static void sendResponse(HttpExchange exchange, int status, String response) throws IOException {
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
