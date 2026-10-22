import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Leaf,
  MapPin,
  Calendar,
  Users,
  Wallet,
  TrendingDown,
  CheckCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import DestinationCard from '../components/DestinationCard.jsx';

export default function HomePage({
  destinations = [],
  onStartPlanning,
  onSelectDestination,
  setActiveView
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [quickBudget, setQuickBudget] = useState(12000);
  const [quickDays, setQuickDays] = useState(3);
  const [quickTravellers, setQuickTravellers] = useState(2);

  // Filter destinations
  const filteredDestinations = destinations.filter((dest) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Budget') return (dest.avgDailyCost?.budget || 1000) <= 1000;
    return dest.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
  });

  const handleQuickEstimate = (e) => {
    e.preventDefault();
    onStartPlanning({
      budget: quickBudget,
      days: quickDays,
      travellers: quickTravellers
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-amber-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold shadow-xs animate-bounce-subtle">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI-Powered Budget Travel Planning for India</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your Dream Trip, <br />
              <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                Within Your Budget.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Plan smarter, spend less, and explore more. Generate personalized day-wise itineraries, verified budget stays, and authentic local food without overspending.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onStartPlanning()}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const destElem = document.getElementById('destinations-section');
                  destElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-xs transition-colors"
              >
                <span>Browse Destinations</span>
              </button>
            </div>
          </div>

          {/* Quick Budget Estimator Floating Box */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <form
              onSubmit={handleQuickEstimate}
              className="glass-panel p-4 sm:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
                {/* Budget Slider */}
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-teal-600" /> Total Budget
                    </span>
                    <span className="font-bold text-teal-700 text-sm">₹{quickBudget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="50000"
                    step="1000"
                    value={quickBudget}
                    onChange={(e) => setQuickBudget(parseInt(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹3,000</span>
                    <span>₹50,000+</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-500" /> Duration
                    </span>
                    <span className="font-bold text-amber-600 text-sm">{quickDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={quickDays}
                    onChange={(e) => setQuickDays(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Day</span>
                    <span>10 Days</span>
                  </div>
                </div>

                {/* Travellers */}
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" /> Travellers
                    </span>
                    <span className="font-bold text-blue-600 text-sm">{quickTravellers} People</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={quickTravellers}
                    onChange={(e) => setQuickTravellers(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Solo (1)</span>
                    <span>Group (6)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Submit Row */}
              <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block animate-ping" />
                  <span>
                    Est. Daily Budget: <strong className="text-slate-800">₹{Math.round(quickBudget / quickDays / quickTravellers).toLocaleString()}</strong> / person / day
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Calculate & Find Trips</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Destinations in India */}
      <section id="destinations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              <Compass className="w-4 h-4" />
              <span>Explore India on a Budget</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Destinations in India
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Hand-curated hubs with reliable hostels, street delicacies, and public transit links.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs font-medium">
            {['All', 'Heritage', 'Beaches', 'Mountains', 'Spirituality', 'Budget'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeFilter === filter
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {filter === 'Budget' ? 'Budget < ₹1k/day' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </section>

      {/* How TripMate Works */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Smart Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How TripMate Works
            </h2>
            <p className="text-slate-400 text-sm">
              We eliminate guesswork by combining realistic travel economics with day-by-day itineraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Input Your Budget & Days',
                desc: 'Enter your starting city, destination, total budget in ₹, and travel style (Budget Backpacker, Standard, or Comfort).'
              },
              {
                step: '02',
                title: 'Smart Cost Breakdown',
                desc: 'Our engine divides your budget into accommodation, food, intercity transit, sightseeing, and a 6% emergency reserve.'
              },
              {
                step: '03',
                title: 'Day-Wise Itinerary Generated',
                desc: 'Get morning-to-night plans grouping nearby monuments, opening times, verified entry fees, and authentic eateries.'
              },
              {
                step: '04',
                title: 'Make It Cheaper & Save',
                desc: 'Use our 1-click optimizer to swap costly stays for Zostels, switch to trains, and save up to ₹3,000 with SDG tips.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                <span className="text-3xl font-extrabold text-teal-400 font-mono opacity-80">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onStartPlanning()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg transition-transform hover:scale-102"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try the Trip Planner Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sustainable Tourism & SDG Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-300 text-xs font-semibold border border-teal-700/60">
              <Leaf className="w-3.5 h-3.5" />
              <span>Sustainable Development Goals Alignment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Empowering Local Communities (SDG 8) & Promoting Responsible Consumption (SDG 12)
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              TripMate prioritizes local homestays, licensed heritage guides, and independent family dining messes over giant multinational intermediaries. Every itinerary includes responsible travel tips to minimize plastic waste and carbon emissions.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveView('about')}
                className="px-5 py-2.5 rounded-xl bg-white text-teal-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
              >
                Learn About Our SDG Framework
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
