import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Train,
  Bus,
  Plane,
  Car,
  Hotel,
  Home,
  Bed,
  Utensils
} from 'lucide-react';

const MAJOR_STARTING_CITIES = [
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Chandigarh'
];

const INTEREST_OPTIONS = [
  { id: 'History', label: 'History & Forts', icon: '🏛️' },
  { id: 'Nature', label: 'Nature & Scenery', icon: '🌲' },
  { id: 'Beaches', label: 'Beaches & Ocean', icon: '🏖️' },
  { id: 'Mountains', label: 'Mountains & Treks', icon: '🏔️' },
  { id: 'Adventure', label: 'Adventure Sports', icon: '🧗' },
  { id: 'Food', label: 'Local Food & Street Eats', icon: '🍛' },
  { id: 'Shopping', label: 'Bazaars & Crafts', icon: '🛍️' },
  { id: 'Spirituality', label: 'Spirituality & Ghats', icon: '🪔' }
];

export default function PlanTripPage({
  destinations = [],
  prefill = null,
  onTripGenerated,
  setActiveView
}) {
  // Form State
  const [startingCity, setStartingCity] = useState(prefill?.startingCity || 'Delhi');
  const [destinationId, setDestinationId] = useState(prefill?.destinationId || 'jaipur');
  const [departureDate, setDepartureDate] = useState(
    prefill?.departureDate || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [travellers, setTravellers] = useState(prefill?.travellers || 2);
  const [days, setDays] = useState(prefill?.days || 3);
  const [budget, setBudget] = useState(prefill?.budget || 12000);
  const [travelStyle, setTravelStyle] = useState(prefill?.travelStyle || 'Budget');
  const [interests, setInterests] = useState(prefill?.interests || ['History', 'Food']);
  const [transportPref, setTransportPref] = useState(prefill?.transportPref || 'Any');
  const [accommodationPref, setAccommodationPref] = useState(prefill?.accommodationPref || 'Hostel');
  const [dietaryPref, setDietaryPref] = useState(prefill?.dietaryPref || 'No preference');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dynamic calculations
  const perPersonTotal = Math.round(budget / Math.max(1, travellers));
  const perPersonPerDay = Math.round(budget / (Math.max(1, days) * Math.max(1, travellers)));

  const handleInterestToggle = (id) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(i => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!destinationId) {
      setError('Please select a destination city.');
      return;
    }
    if (budget < 1000) {
      setError('Please enter a budget of at least ₹1,000.');
      return;
    }
    if (days < 1 || days > 14) {
      setError('Trip duration must be between 1 and 14 days.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        startingCity,
        destinationId,
        departureDate,
        travellers,
        days,
        budget,
        travelStyle,
        interests,
        transportPref,
        accommodationPref,
        dietaryPref
      };

      const res = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      const generatedTrip = await res.json();
      onTripGenerated(generatedTrip);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while generating the trip plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Budget Trip Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Customize Your Dream Trip
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Tell us your budget, dates, and preferences. TripMate will calculate exact costs and construct your day-wise schedule.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8"
      >
        {/* Section 1: Route & Dates */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>1. Route & Destination</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Starting City */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Starting From
              </label>
              <select
                value={startingCity}
                onChange={(e) => setStartingCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {MAJOR_STARTING_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Destination City
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                required
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Departure Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Budget, Travellers & Duration */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Wallet className="w-4 h-4 text-teal-600" />
            <span>2. Budget & Group Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Total Budget */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Total Budget (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Math.max(1000, parseInt(e.target.value) || 0))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              {/* Quick presets */}
              <div className="flex gap-1.5 mt-2">
                {[8000, 15000, 25000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                  >
                    ₹{(b / 1000)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Days Counter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Trip Duration (Days)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <div className="flex-1 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-900 text-sm">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </div>
                <button
                  type="button"
                  onClick={() => setDays(Math.min(14, days + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Travellers Counter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Number of Travellers
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTravellers(Math.max(1, travellers - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <div className="flex-1 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-900 text-sm">
                  {travellers} {travellers === 1 ? 'Solo' : 'People'}
                </div>
                <button
                  type="button"
                  onClick={() => setTravellers(Math.min(10, travellers + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Real-time budget metric preview box */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-teal-900 font-medium">
              💡 Live Projection: <strong>₹{perPersonTotal.toLocaleString()}</strong> per person (approx. <strong>₹{perPersonPerDay.toLocaleString()}</strong>/day/person)
            </span>
            <span className="text-[11px] text-teal-700 font-semibold bg-white/80 px-2 py-0.5 rounded-md">
              {perPersonPerDay < 1200 ? 'Backpacker Budget' : perPersonPerDay < 2500 ? 'Standard Budget' : 'Comfort Budget'}
            </span>
          </div>
        </div>

        {/* Section 3: Travel Style & Preferences */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>3. Style & Preferences</span>
          </h3>

          {/* Travel Style Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Travel Comfort Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Budget', label: 'Budget Backpacker', desc: 'Hostel dorms, trains/buses, iconic street eats' },
                { id: 'Standard', label: 'Standard Explorer', desc: 'Private rooms, AC sleeper, cafes & diners' },
                { id: 'Comfort', label: 'Comfort Seeker', desc: 'Boutique stays, cabs, premium heritage thalis' }
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setTravelStyle(style.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    travelStyle === style.id
                      ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-bold text-slate-900 text-sm">{style.label}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation & Transport Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Accommodation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Accommodation
              </label>
              <select
                value={accommodationPref}
                onChange={(e) => setAccommodationPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800"
              >
                <option value="Hostel">Hostel (Zostel, Gostops - Most Economical)</option>
                <option value="Homestay">Eco-Homestay (Family run & Authentic)</option>
                <option value="Budget hotel">Budget Hotel (Private Ensuite Rooms)</option>
                <option value="Any">Any Affordable Option</option>
              </select>
            </div>

            {/* Transport */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Intercity Transport
              </label>
              <select
                value={transportPref}
                onChange={(e) => setTransportPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800"
              >
                <option value="Train">Train (Indian Railways - Best Value)</option>
                <option value="Bus">Bus (Volvo / RTC Express)</option>
                <option value="Flight">Flight (Fastest)</option>
                <option value="Any">Any Affordable Option</option>
              </select>
            </div>
          </div>

          {/* Dietary Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Dietary Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'No preference', label: 'All / No Preference' },
                { id: 'Vegetarian', label: 'Pure Vegetarian' },
                { id: 'Vegan', label: 'Vegan Friendly' },
                { id: 'Non-vegetarian', label: 'Non-Vegetarian' }
              ].map((diet) => (
                <button
                  key={diet.id}
                  type="button"
                  onClick={() => setDietaryPref(diet.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    dietaryPref === diet.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Interests (Multi-select) */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Your Travel Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INTEREST_OPTIONS.map((opt) => {
                const isSelected = interests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleInterestToggle(opt.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 text-teal-800 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                <span>Generating Smart Itinerary & Budget Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate My Complete Trip Plan</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
