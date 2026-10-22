import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Sparkles,
  MapPin,
  Bookmark,
  Printer,
  Share2,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Hotel,
  Utensils,
  Train,
  Landmark,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sun,
  CloudSun,
  CloudRain,
  Snowflake,
  Leaf,
  ExternalLink,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BudgetChart from '../components/BudgetChart.jsx';
import InteractiveMap from '../components/InteractiveMap.jsx';
import CheaperModal from '../components/CheaperModal.jsx';
import ExpenseTrackerModal from '../components/ExpenseTrackerModal.jsx';
import { saveTrip, recalculateBudget, fetchWeather } from '../utils/api.js';

export default function TripResultPage({
  trip,
  onTripUpdated,
  onPlanAnother
}) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [isSaved, setIsSaved] = useState(false);
  const [cheaperModalOpen, setCheaperModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [weather, setWeather] = useState(null);

  // Editable itinerary state
  const [itinerary, setItinerary] = useState(trip.dailyItinerary || []);
  const [budgetAnalysis, setBudgetAnalysis] = useState(trip.budgetAnalysis || {});
  const [selectedAccommodation, setSelectedAccommodation] = useState(trip.selectedAccommodation);
  const [selectedTransport, setSelectedTransport] = useState(trip.selectedTransport);

  // New activity modal state
  const [addingDayNum, setAddingDayNum] = useState(null);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityCost, setNewActivityCost] = useState('');
  const [newActivitySlot, setNewActivitySlot] = useState('afternoon');

  // Load weather for destination coordinates
  useEffect(() => {
    if (trip.destination?.coordinates) {
      const { lat, lng } = trip.destination.coordinates;
      fetchWeather(lat, lng).then(data => {
        if (data) setWeather(data);
      });
    }
  }, [trip]);

  // Recalculate budget when accommodation or allocations change
  const handleAllocationChange = async (categoryKey, newPercent) => {
    const currentAlloc = { ...budgetAnalysis.allocations, [categoryKey]: newPercent };
    try {
      const updatedBudget = await recalculateBudget({
        totalBudget: trip.meta?.totalBudget || budgetAnalysis.totalBudget,
        days: trip.meta?.days,
        travellers: trip.meta?.travellers,
        travelStyle: trip.meta?.travelStyle,
        destinationId: trip.destination.id,
        selectedAccommodation,
        selectedTransport,
        customAllocations: currentAlloc
      });
      setBudgetAnalysis(updatedBudget);
    } catch (err) {
      console.error('Failed to recalculate budget:', err);
    }
  };

  const handleSelectAccommodation = async (acc) => {
    setSelectedAccommodation(acc);
    try {
      const updatedBudget = await recalculateBudget({
        totalBudget: trip.meta?.totalBudget || budgetAnalysis.totalBudget,
        days: trip.meta?.days,
        travellers: trip.meta?.travellers,
        travelStyle: trip.meta?.travelStyle,
        destinationId: trip.destination.id,
        selectedAccommodation: acc,
        selectedTransport,
        customAllocations: budgetAnalysis.allocations
      });
      setBudgetAnalysis(updatedBudget);
    } catch (err) {
      console.error('Failed to recalculate budget:', err);
    }
  };

  const handleSelectTransport = async (trans) => {
    setSelectedTransport(trans);
    try {
      const updatedBudget = await recalculateBudget({
        totalBudget: trip.meta?.totalBudget || budgetAnalysis.totalBudget,
        days: trip.meta?.days,
        travellers: trip.meta?.travellers,
        travelStyle: trip.meta?.travelStyle,
        destinationId: trip.destination.id,
        selectedAccommodation,
        selectedTransport: trans,
        customAllocations: budgetAnalysis.allocations
      });
      setBudgetAnalysis(updatedBudget);
    } catch (err) {
      console.error('Failed to recalculate budget:', err);
    }
  };

  // Save Trip with confetti
  const handleSaveTrip = async () => {
    const fullTripData = {
      ...trip,
      dailyItinerary: itinerary,
      budgetAnalysis,
      selectedAccommodation,
      selectedTransport
    };

    await saveTrip(fullTripData);
    setIsSaved(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onTripUpdated) onTripUpdated(fullTripData);
  };

  // Add custom activity to day
  const handleAddActivity = (dayNumber) => {
    if (!newActivityTitle.trim()) return;

    const updated = itinerary.map((day) => {
      if (day.dayNumber === dayNumber) {
        const slotKey = newActivitySlot; // 'morning' | 'afternoon' | 'evening'
        const currentSlot = day[slotKey] || {};
        return {
          ...day,
          [slotKey]: {
            ...currentSlot,
            activity: {
              id: `custom_${Date.now()}`,
              name: newActivityTitle.trim(),
              type: 'Custom Activity',
              duration: '1.5 hrs',
              entryFee: parseInt(newActivityCost) || 0,
              description: 'Custom user-added itinerary activity.',
              verified: false
            }
          }
        };
      }
      return day;
    });

    setItinerary(updated);
    setAddingDayNum(null);
    setNewActivityTitle('');
    setNewActivityCost('');
  };

  // Remove activity from day slot
  const handleRemoveActivity = (dayNumber, slotKey) => {
    const updated = itinerary.map((day) => {
      if (day.dayNumber === dayNumber) {
        const currentSlot = day[slotKey];
        return {
          ...day,
          [slotKey]: {
            ...currentSlot,
            activity: null
          }
        };
      }
      return day;
    });
    setItinerary(updated);
  };

  // Apply money-saving swap
  const handleApplySaving = (suggestion) => {
    if (suggestion.actionType === 'CHANGE_ACCOMMODATION' && suggestion.actionPayload) {
      handleSelectAccommodation(suggestion.actionPayload);
    } else if (suggestion.actionType === 'CHANGE_TRANSPORT' && suggestion.actionPayload) {
      handleSelectTransport(suggestion.actionPayload);
    }
  };

  // Print itinerary
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Summary Header Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={trip.destination.heroImage}
            alt={trip.destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-md">
              {trip.destination.name}, {trip.destination.state}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-600/90 text-white backdrop-blur-md">
              {trip.meta?.travelStyle} Style
            </span>
          </div>

          {/* Live Weather Widget */}
          {weather && (
            <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-2xl px-3.5 py-2 text-white flex items-center gap-3 shadow-lg">
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              <div>
                <p className="text-xs font-bold leading-none">{weather.temperature}°C</p>
                <p className="text-[10px] text-slate-300 capitalize">{weather.condition}</p>
              </div>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 font-semibold">
                Live API
              </span>
            </div>
          )}

          {/* Header Title & Details */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs text-amber-300 font-bold uppercase tracking-widest">
                AI Budget Travel Plan
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
                {trip.meta?.days}-Day Trip to {trip.destination.name}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Departing from {trip.meta?.startingCity} • {trip.meta?.travellers} {trip.meta?.travellers === 1 ? 'Solo Traveller' : 'Travellers'} • Best Season: {trip.destination.bestSeason}
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className={`px-4 py-2 rounded-2xl backdrop-blur-md border flex items-center gap-2 self-start md:self-auto font-bold text-sm ${
              budgetAnalysis.isWithinBudget
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
            }`}>
              {budgetAnalysis.isWithinBudget ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>{budgetAnalysis.status} (₹{budgetAnalysis.estimatedTotalCost?.toLocaleString()} / ₹{budgetAnalysis.totalBudget?.toLocaleString()})</span>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Left Buttons: Save & Cheaper */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveTrip}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Trip Saved to Catalog!' : 'Save Trip Plan'}</span>
            </button>

            <button
              onClick={() => setCheaperModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-xs transition-transform hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Make My Trip Cheaper 💡</span>
            </button>

            <button
              onClick={() => setExpenseModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs sm:text-sm transition-colors"
            >
              <Receipt className="w-4 h-4 text-teal-600" />
              <span>Track Expenses</span>
            </button>
          </div>

          {/* Right Buttons: Print & Plan Another */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onPlanAnother}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-700 hover:bg-teal-50 border border-teal-200 transition-colors"
            >
              Plan Another
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2 text-sm font-semibold">
        {[
          { id: 'itinerary', label: 'Day-Wise Itinerary', icon: Calendar },
          { id: 'budget', label: 'Budget Engine & Charts', icon: Wallet },
          { id: 'hotels', label: 'Stays & Hostels', icon: Hotel },
          { id: 'food', label: 'Food & Restaurants', icon: Utensils },
          { id: 'transport', label: 'Transport Planner', icon: Train },
          { id: 'map', label: 'Interactive Map View', icon: Compass }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Day-Wise Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Day-Wise Travel Schedule</h3>
              <p className="text-xs text-slate-500">
                Optimized by geographic proximity to minimize transit time. Add or remove activities as needed.
              </p>
            </div>
          </div>

          {/* Daily Schedule Cards */}
          <div className="space-y-6">
            {itinerary.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                {/* Day Header */}
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
                      D{day.dayNumber}
                    </span>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg">
                        Day {day.dayNumber}: {day.theme}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Est. Daily Out-of-Pocket: ~₹{day.estimatedDayTotal?.toLocaleString()} (Meals + Entries + Transit)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setAddingDayNum(day.dayNumber)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Activity</span>
                  </button>
                </div>

                {/* Day Content Slots: Morning, Afternoon, Evening */}
                <div className="p-5 sm:p-6 space-y-6 divide-y divide-slate-100">
                  {/* Morning Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-1">
                    <div className="md:col-span-3 text-xs">
                      <span className="px-2 py-0.5 rounded-md font-bold bg-amber-100 text-amber-800 uppercase tracking-wider text-[10px]">
                        Morning
                      </span>
                      <p className="font-bold text-slate-800 text-sm mt-1">{day.morning?.time || '08:30 AM - 12:30 PM'}</p>
                      <p className="text-slate-500 text-[11px] mt-1">{day.morning?.transitSuggestion}</p>
                    </div>

                    <div className="md:col-span-9 space-y-3">
                      {/* Breakfast */}
                      {day.morning?.breakfastSpot && (
                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-amber-800 uppercase">☕ Breakfast Spot</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-0.5">{day.morning.breakfastSpot.name}</h5>
                            <p className="text-slate-600 text-xs">
                              Signature: {day.morning.breakfastSpot.dishes?.join(', ')} • ~₹{day.morning.breakfastSpot.cost}/person
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Morning Attraction */}
                      {day.morning?.activity && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-800">
                                {day.morning.activity.type}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                🕒 {day.morning.activity.duration}
                              </span>
                              <span className="text-xs font-bold text-teal-700">
                                {day.morning.activity.entryFee === 0 ? 'FREE Entry' : `Ticket: ₹${day.morning.activity.entryFee}`}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-base">{day.morning.activity.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed">{day.morning.activity.description}</p>
                            {day.morning.activity.openingHours && (
                              <p className="text-[11px] text-slate-500">Open: {day.morning.activity.openingHours}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(day.dayNumber, 'morning')}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove this activity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Afternoon Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-6">
                    <div className="md:col-span-3 text-xs">
                      <span className="px-2 py-0.5 rounded-md font-bold bg-blue-100 text-blue-800 uppercase tracking-wider text-[10px]">
                        Afternoon
                      </span>
                      <p className="font-bold text-slate-800 text-sm mt-1">{day.afternoon?.time || '12:30 PM - 04:30 PM'}</p>
                      <p className="text-slate-500 text-[11px] mt-1">{day.afternoon?.transitSuggestion}</p>
                    </div>

                    <div className="md:col-span-9 space-y-3">
                      {/* Lunch */}
                      {day.afternoon?.lunchSpot && (
                        <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/60 flex items-start justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-orange-800 uppercase">🍛 Budget Lunch</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-0.5">{day.afternoon.lunchSpot.name}</h5>
                            <p className="text-slate-600 text-xs">
                              Specialities: {day.afternoon.lunchSpot.dishes?.join(', ')} • ~₹{day.afternoon.lunchSpot.cost}/person
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Afternoon Attraction */}
                      {day.afternoon?.activity && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-800">
                                {day.afternoon.activity.type}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                🕒 {day.afternoon.activity.duration}
                              </span>
                              <span className="text-xs font-bold text-teal-700">
                                {day.afternoon.activity.entryFee === 0 ? 'FREE Entry' : `Ticket: ₹${day.afternoon.activity.entryFee}`}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-base">{day.afternoon.activity.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed">{day.afternoon.activity.description}</p>
                            {day.afternoon.activity.openingHours && (
                              <p className="text-[11px] text-slate-500">Open: {day.afternoon.activity.openingHours}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(day.dayNumber, 'afternoon')}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove this activity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Evening Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-6">
                    <div className="md:col-span-3 text-xs">
                      <span className="px-2 py-0.5 rounded-md font-bold bg-purple-100 text-purple-800 uppercase tracking-wider text-[10px]">
                        Evening
                      </span>
                      <p className="font-bold text-slate-800 text-sm mt-1">{day.evening?.time || '04:30 PM - 09:30 PM'}</p>
                      <p className="text-slate-500 text-[11px] mt-1">{day.evening?.transitSuggestion}</p>
                    </div>

                    <div className="md:col-span-9 space-y-3">
                      {/* Evening Attraction */}
                      {day.evening?.activity && (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-800">
                                {day.evening.activity.type}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                🕒 {day.evening.activity.duration}
                              </span>
                              <span className="text-xs font-bold text-teal-700">
                                {day.evening.activity.entryFee === 0 ? 'FREE Entry' : `Ticket: ₹${day.evening.activity.entryFee}`}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-base">{day.evening.activity.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed">{day.evening.activity.description}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(day.dayNumber, 'evening')}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove this activity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Dinner */}
                      {day.evening?.dinnerSpot && (
                        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-start justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-slate-700 uppercase">🍽️ Dinner Recommendation</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-0.5">{day.evening.dinnerSpot.name}</h5>
                            <p className="text-slate-600 text-xs">
                              Signature: {day.evening.dinnerSpot.dishes?.join(', ')} • ~₹{day.evening.dinnerSpot.cost}/person
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Daily SDG Responsible Tourism Tip Box */}
                  {day.sdgTip && (
                    <div className="pt-4">
                      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200/80 text-xs flex items-start gap-3">
                        <Leaf className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-teal-900">{day.sdgTip.title}</p>
                          <p className="text-teal-800 text-[11px] mt-0.5 leading-relaxed">{day.sdgTip.tip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Activity Modal Form */}
          {addingDayNum !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <h4 className="font-bold text-slate-900 text-base">
                  Add Activity to Day {addingDayNum}
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Time Slot</label>
                    <select
                      value={newActivitySlot}
                      onChange={(e) => setNewActivitySlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Activity Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Visit Local Handicrafts Cooperative"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Entry Ticket Fee (₹)</label>
                    <input
                      type="number"
                      placeholder="0 if free"
                      value={newActivityCost}
                      onChange={(e) => setNewActivityCost(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setAddingDayNum(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddActivity(addingDayNum)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs"
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Budget Engine & Charts */}
      {activeTab === 'budget' && (
        <BudgetChart
          budgetAnalysis={budgetAnalysis}
          onAllocationChange={handleAllocationChange}
          onResetAllocations={() => handleAllocationChange('reset', 0)}
        />
      )}

      {/* Tab 3: Stays & Hostels */}
      {activeTab === 'hotels' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Recommended Budget Accommodations</h3>
            <p className="text-xs text-slate-500">
              Verified backpacker hostels, sustainable homestays, and budget private stays in {trip.destination.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(trip.allAccommodations || []).map((hotel) => {
              const isSelected = selectedAccommodation?.id === hotel.id;
              const numNights = Math.max(1, (trip.meta?.days || 3) - 1);
              const rooms = hotel.type === 'hostel' ? (trip.meta?.travellers || 1) : Math.ceil((trip.meta?.travellers || 1) / 2);
              const totalStay = hotel.pricePerNight * rooms * numNights;

              return (
                <div
                  key={hotel.id}
                  className={`bg-white rounded-3xl overflow-hidden border p-5 flex flex-col justify-between space-y-4 transition-all ${
                    isSelected
                      ? 'border-teal-600 ring-2 ring-teal-500/30 shadow-md'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wider">
                        {hotel.type === 'hostel' ? 'Hostel Dorm' : hotel.type === 'homestay' ? 'Eco-Homestay' : 'Budget Hotel'}
                      </span>
                      {hotel.ecoFriendly && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                          <Leaf className="w-3 h-3" /> Eco Stay
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{hotel.name}</h4>
                      <p className="text-xs text-slate-500">{hotel.address}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        ★ {hotel.rating} ({hotel.reviewsCount} reviews)
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="font-extrabold text-teal-700 text-base">
                        ₹{hotel.pricePerNight} <span className="text-xs font-normal text-slate-500">/ night</span>
                      </span>
                    </div>

                    {/* Amenities tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities?.map((amen, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                          {amen}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                      💡 {hotel.whyBudget}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] text-slate-400">Total Stay ({numNights} nights)</p>
                      <p className="font-extrabold text-slate-900 text-sm">₹{totalStay.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {hotel.bookingUrl && (
                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                          title="Check availability on official portal"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        onClick={() => handleSelectAccommodation(hotel)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
                          isSelected
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Choose Stay'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Food & Restaurants */}
      {activeTab === 'food' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Food & Affordable Eateries</h3>
            <p className="text-xs text-slate-500">
              Iconic heritage thali messes, legendary breakfast joints, and safe street food in {trip.destination.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(trip.allRestaurants || []).map((rest) => (
              <div
                key={rest.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 uppercase tracking-wider capitalize">
                      {rest.mealType}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 capitalize">
                      {rest.dietary === 'veg' ? 'Pure Veg' : rest.dietary === 'vegan' ? 'Vegan' : 'All Diet'}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg">{rest.name}</h4>
                  <p className="text-xs text-slate-500">{rest.address}</p>

                  <div className="py-2 border-y border-slate-100 text-xs">
                    <span className="font-semibold text-slate-700">Famous for:</span>
                    <p className="text-teal-700 font-bold mt-0.5">{rest.signatureDishes?.join(', ')}</p>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    🌱 {rest.ecoTip}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Average Meal Cost</span>
                  <span className="font-extrabold text-slate-900 text-sm">~₹{rest.avgCostForTwo} for two</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Transport Planner */}
      {activeTab === 'transport' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Economical Transport Options</h3>
            <p className="text-xs text-slate-500">
              Intercity routes connecting {trip.meta?.startingCity} to {trip.destination.name}, plus local transit tips.
            </p>
          </div>

          {/* Intercity Transport Options */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Train className="w-5 h-5 text-teal-600" />
              <span>Intercity Travel: {trip.meta?.startingCity} ➔ {trip.destination.name}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(trip.allTransportOptions || []).map((trans, idx) => {
                const isSelected = selectedTransport?.type === trans.type;
                const roundTripTotal = trans.avgFare * 2 * (trip.meta?.travellers || 1);

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/30'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                          {trans.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">⏱️ {trans.durationHours} hrs</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">{trans.provider}</h5>
                      <p className="text-xs font-extrabold text-teal-700 mt-1">
                        ₹{trans.avgFare} <span className="font-normal text-slate-500">one-way / person</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Est. Round trip group total: ₹{roundTripTotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                      {trans.bookingUrl && (
                        <a
                          href={trans.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-teal-700 hover:underline flex items-center gap-1"
                        >
                          Book Ticket <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => handleSelectTransport(trans)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-teal-600 text-white'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local Transit Guide */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>Local Transit & Sustainable Getting Around</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Shared Auto / E-Rickshaw</p>
                <p className="text-teal-700 font-bold mt-1">₹15 - ₹30 per ride</p>
                <p className="text-slate-500 mt-1">Direct, zero-emission option inside old quarters.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Bicycle / Moped Rental</p>
                <p className="text-teal-700 font-bold mt-1">₹80 - ₹350 per day</p>
                <p className="text-slate-500 mt-1">Explore ruins, tea gardens, and beaches at leisure.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Local Public Bus / Metro</p>
                <p className="text-teal-700 font-bold mt-1">₹10 - ₹40 per ticket</p>
                <p className="text-slate-500 mt-1">State transport buses connecting major landmarks.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800">Pedestrian Heritage Strolls</p>
                <p className="text-teal-700 font-bold mt-1">100% Free</p>
                <p className="text-slate-500 mt-1">Walled cities, ghats, and coastal promenades are walking-only.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Interactive Map View */}
      {activeTab === 'map' && (
        <InteractiveMap
          destination={trip.destination}
          accommodations={trip.allAccommodations || []}
          restaurants={trip.allRestaurants || []}
          attractions={trip.allAttractions || []}
        />
      )}

      {/* Modals */}
      <CheaperModal
        isOpen={cheaperModalOpen}
        onClose={() => setCheaperModalOpen(false)}
        moneySavingTips={trip.moneySavingTips}
        onApplySaving={handleApplySaving}
      />

      <ExpenseTrackerModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        trip={trip}
        onUpdateExpenses={(updatedExpenses) => {
          const fullTripData = { ...trip, actualExpenses: updatedExpenses };
          saveTrip(fullTripData);
        }}
      />
    </div>
  );
}
