import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PlanTripPage from './pages/PlanTripPage.jsx';
import TripResultPage from './pages/TripResultPage.jsx';
import SavedTripsPage from './pages/SavedTripsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { fetchDestinations, getSavedTrips, deleteTrip } from './utils/api.js';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [destinations, setDestinations] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [planPrefill, setPlanPrefill] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Initial data loading
  useEffect(() => {
    async function initData() {
      try {
        const destResponse = await fetchDestinations();
        if (destResponse.destinations) {
          setDestinations(destResponse.destinations);
        }
      } catch (err) {
        console.error('Error loading destinations:', err);
      }

      try {
        const trips = await getSavedTrips();
        setSavedTrips(trips || []);
      } catch (err) {
        console.error('Error loading saved trips:', err);
      } finally {
        setLoadingInitial(false);
      }
    }

    initData();
  }, []);

  // Handlers
  const handleStartPlanning = (prefill = null) => {
    setPlanPrefill(prefill);
    setActiveView('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (dest) => {
    setPlanPrefill({
      destinationId: dest.id,
      budget: (dest.avgDailyCost?.budget || 1100) * 3 * 2, // 3 days for 2 people
      days: dest.idealDuration || 3
    });
    setActiveView('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTripGenerated = (trip) => {
    setCurrentTrip(trip);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTripUpdated = async (updatedTrip) => {
    setCurrentTrip(updatedTrip);
    const refreshed = await getSavedTrips();
    setSavedTrips(refreshed);
  };

  const handleOpenSavedTrip = (trip) => {
    setCurrentTrip(trip);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedTrip = async (tripId) => {
    await deleteTrip(tripId);
    const updated = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Persistent Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        savedCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomePage
            destinations={destinations}
            onStartPlanning={handleStartPlanning}
            onSelectDestination={handleSelectDestination}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'plan' && (
          <PlanTripPage
            destinations={destinations}
            prefill={planPrefill}
            onTripGenerated={handleTripGenerated}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'result' && currentTrip && (
          <TripResultPage
            trip={currentTrip}
            onTripUpdated={handleTripUpdated}
            onPlanAnother={() => {
              setPlanPrefill(null);
              setActiveView('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'saved' && (
          <SavedTripsPage
            savedTrips={savedTrips}
            onOpenTrip={handleOpenSavedTrip}
            onDeleteTrip={handleDeleteSavedTrip}
            onPlanNew={() => {
              setPlanPrefill(null);
              setActiveView('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'about' && <AboutPage />}
      </main>

      {/* Persistent Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
