/**
 * TripMate API Client
 * Connects to the Express backend with automatic fallback to localStorage and local data
 */

const BASE_URL = '/api';

export async function fetchDestinations(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/destinations?${query}`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return await res.json();
  } catch (err) {
    console.warn('API error, using local fallback:', err);
    return { total: 0, destinations: [] };
  }
}

export async function fetchDestinationById(id) {
  try {
    const res = await fetch(`${BASE_URL}/destinations/${id}`);
    if (!res.ok) throw new Error('Failed to fetch destination');
    return await res.json();
  } catch (err) {
    console.error('Error fetching destination:', err);
    return null;
  }
}

export async function generateTripPlan(tripData) {
  try {
    const res = await fetch(`${BASE_URL}/trips/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to generate trip plan');
    }
    return await res.json();
  } catch (err) {
    console.error('Trip generation error:', err);
    throw err;
  }
}

export async function recalculateBudget(payload) {
  try {
    const res = await fetch(`${BASE_URL}/budget/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Budget recalculation failed');
    return await res.json();
  } catch (err) {
    console.error('Recalculate budget error:', err);
    throw err;
  }
}

export async function fetchWeather(lat, lng) {
  try {
    const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error('Weather fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('Live weather unavailable, using default:', err);
    return {
      isLive: false,
      temperature: 25,
      condition: 'Sunny & Pleasant',
      icon: 'Sun',
      humidity: 50
    };
  }
}

export async function getSavedTrips() {
  try {
    const res = await fetch(`${BASE_URL}/trips`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem('tripmate_saved_trips', JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend saved trips unavailable, checking localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem('tripmate_saved_trips');
    return local ? JSON.parse(local) : [];
  } catch {
    return [];
  }
}

export async function saveTrip(trip) {
  // Always write to localStorage first for instant UI response
  try {
    const current = await getSavedTrips();
    const existingIdx = current.findIndex(t => t.id === trip.id);
    let updated;
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = { ...trip, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...trip, savedAt: new Date().toISOString() }, ...current];
    }
    localStorage.setItem('tripmate_saved_trips', JSON.stringify(updated));
  } catch (err) {
    console.error('localStorage save error:', err);
  }

  // Also sync to backend API
  try {
    await fetch(`${BASE_URL}/trips/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    });
  } catch (err) {
    console.warn('Backend sync failed, saved locally:', err);
  }
}

export async function deleteTrip(tripId) {
  try {
    const current = await getSavedTrips();
    const updated = current.filter(t => t.id !== tripId);
    localStorage.setItem('tripmate_saved_trips', JSON.stringify(updated));
  } catch (err) {
    console.error('localStorage delete error:', err);
  }

  try {
    await fetch(`${BASE_URL}/trips/${tripId}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend delete sync failed:', err);
  }
}
