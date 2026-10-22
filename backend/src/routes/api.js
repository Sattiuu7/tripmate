import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { destinations } from '../data/destinations.js';
import { generateItinerary } from '../services/plannerService.js';
import { calculateBudget, generateMoneySavingTips } from '../services/budgetEngine.js';
import { getLiveWeather } from '../services/weatherService.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SAVED_TRIPS_FILE = path.join(__dirname, '../../data/saved_trips.json');

// Ensure data directory and saved_trips.json exist
function getSavedTrips() {
  try {
    if (!fs.existsSync(SAVED_TRIPS_FILE)) {
      const initialDir = path.dirname(SAVED_TRIPS_FILE);
      if (!fs.existsSync(initialDir)) {
        fs.mkdirSync(initialDir, { recursive: true });
      }
      fs.writeFileSync(SAVED_TRIPS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(SAVED_TRIPS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading saved trips:', err);
    return [];
  }
}

function persistSavedTrips(trips) {
  try {
    const initialDir = path.dirname(SAVED_TRIPS_FILE);
    if (!fs.existsSync(initialDir)) {
      fs.mkdirSync(initialDir, { recursive: true });
    }
    fs.writeFileSync(SAVED_TRIPS_FILE, JSON.stringify(trips, null, 2));
  } catch (err) {
    console.error('Error saving trips to disk:', err);
  }
}

/**
 * Health check
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'TripMate Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/destinations
 * List destinations with optional search and filters
 */
router.get('/destinations', (req, res) => {
  const { search, tag, region, maxBudget } = req.query;
  let results = [...destinations];

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(d =>
      d.name.toLowerCase().includes(term) ||
      d.state.toLowerCase().includes(term) ||
      d.tagline.toLowerCase().includes(term)
    );
  }

  if (tag) {
    results = results.filter(d =>
      d.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  if (region) {
    results = results.filter(d =>
      d.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  if (maxBudget) {
    const budgetNum = parseFloat(maxBudget);
    results = results.filter(d => (d.avgDailyCost?.budget * 3) <= budgetNum);
  }

  res.json({
    total: results.length,
    destinations: results
  });
});

/**
 * GET /api/destinations/:id
 */
router.get('/destinations/:id', (req, res) => {
  const destination = destinations.find(d => d.id.toLowerCase() === req.params.id.toLowerCase());
  if (!destination) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(destination);
});

/**
 * GET /api/weather
 * Fetch live weather using destination coordinates
 */
router.get('/weather', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  const weather = await getLiveWeather(parseFloat(lat), parseFloat(lng));
  res.json(weather);
});

/**
 * POST /api/trips/generate
 * Main endpoint: generates smart trip plan, budget breakdown, and day-wise itinerary
 */
router.post('/trips/generate', (req, res) => {
  const {
    startingCity = 'Delhi',
    destinationId,
    departureDate,
    travellers = 1,
    days = 3,
    budget = 10000,
    travelStyle = 'Budget',
    interests = [],
    transportPref = 'Any',
    accommodationPref = 'Any',
    dietaryPref = 'No preference'
  } = req.body;

  // Validation
  if (!destinationId) {
    return res.status(400).json({ error: 'Please specify a destination' });
  }

  const destination = destinations.find(d => d.id.toLowerCase() === destinationId.toLowerCase());
  if (!destination) {
    return res.status(404).json({ error: `Destination "${destinationId}" not found in our catalog.` });
  }

  const numDays = parseInt(days);
  if (isNaN(numDays) || numDays < 1 || numDays > 14) {
    return res.status(400).json({ error: 'Trip duration must be between 1 and 14 days.' });
  }

  const numTravellers = parseInt(travellers);
  if (isNaN(numTravellers) || numTravellers < 1 || numTravellers > 20) {
    return res.status(400).json({ error: 'Number of travellers must be between 1 and 20.' });
  }

  const numBudget = parseFloat(budget);
  if (isNaN(numBudget) || numBudget < 1000) {
    return res.status(400).json({ error: 'Total trip budget should be at least ₹1,000.' });
  }

  try {
    const trip = generateItinerary({
      destination,
      days: numDays,
      budget: numBudget,
      travellers: numTravellers,
      travelStyle,
      interests,
      transportPref,
      accommodationPref,
      dietaryPref,
      startingCity
    });

    if (departureDate) {
      trip.meta.departureDate = departureDate;
    }

    res.json(trip);
  } catch (err) {
    console.error('Itinerary generation error:', err);
    res.status(500).json({ error: 'Failed to generate itinerary. ' + err.message });
  }
});

/**
 * POST /api/budget/calculate
 * Recalculate budget when user changes allocations or preferences
 */
router.post('/budget/calculate', (req, res) => {
  const {
    totalBudget,
    days,
    travellers,
    travelStyle,
    destinationId,
    selectedAccommodation,
    selectedTransport,
    customAllocations
  } = req.body;

  const destination = destinations.find(d => d.id === destinationId);

  const budgetResult = calculateBudget({
    totalBudget,
    days,
    travellers,
    travelStyle,
    destination,
    selectedAccommodation,
    selectedTransport,
    customAllocations
  });

  res.json(budgetResult);
});

/**
 * POST /api/trips/cheaper
 * Suggestions to make trip cheaper
 */
router.post('/trips/cheaper', (req, res) => {
  const { currentTrip, destinationId } = req.body;
  const destination = destinations.find(d => d.id === destinationId);

  const tips = generateMoneySavingTips({
    currentTrip: currentTrip || {},
    destination: destination || {}
  });

  res.json(tips);
});

/**
 * GET /api/trips
 * List saved trips
 */
router.get('/trips', (req, res) => {
  const trips = getSavedTrips();
  res.json(trips);
});

/**
 * POST /api/trips/save
 * Save a trip plan
 */
router.post('/trips/save', (req, res) => {
  const trip = req.body;
  if (!trip || !trip.id) {
    return res.status(400).json({ error: 'Invalid trip data' });
  }

  const trips = getSavedTrips();
  const existingIdx = trips.findIndex(t => t.id === trip.id);

  if (existingIdx >= 0) {
    trips[existingIdx] = { ...trip, updatedAt: new Date().toISOString() };
  } else {
    trips.unshift({ ...trip, savedAt: new Date().toISOString() });
  }

  persistSavedTrips(trips);
  res.json({ message: 'Trip successfully saved!', tripId: trip.id });
});

/**
 * DELETE /api/trips/:id
 */
router.delete('/trips/:id', (req, res) => {
  const { id } = req.params;
  const trips = getSavedTrips();
  const filtered = trips.filter(t => t.id !== id);
  persistSavedTrips(filtered);
  res.json({ message: 'Trip successfully deleted.' });
});

export default router;
