import React from 'react';
import {
  Bookmark,
  Calendar,
  Wallet,
  Users,
  MapPin,
  ArrowRight,
  Trash2,
  Download,
  Sparkles,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function SavedTripsPage({
  savedTrips = [],
  onOpenTrip,
  onDeleteTrip,
  onPlanNew
}) {
  const handleExportJSON = (trip) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `TripMate_${trip.destination.name}_${trip.meta?.days}D.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Saved Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Saved Itineraries
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Access, edit, or print previously generated trips stored safely in your catalog.
          </p>
        </div>

        <button
          onClick={onPlanNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-transform hover:scale-102 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Plan a New Trip</span>
        </button>
      </div>

      {/* Trips Grid or Empty State */}
      {savedTrips.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Saved Trips Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Plan your first trip with our budget engine and click "Save Trip" to keep it stored here.
          </p>
          <div className="pt-2">
            <button
              onClick={onPlanNew}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Start Planning Now</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => {
            const isWithin = trip.budgetAnalysis?.isWithinBudget;
            return (
              <div
                key={trip.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo & Title */}
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={trip.destination.heroImage}
                      alt={trip.destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-amber-300">
                        {trip.meta?.travelStyle} Tier
                      </span>
                      <h3 className="text-xl font-bold">{trip.destination.name}</h3>
                      <p className="text-xs text-slate-300">{trip.destination.state}</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">Duration</p>
                          <p className="font-bold text-slate-800">{trip.meta?.days} Days</p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">Travellers</p>
                          <p className="font-bold text-slate-800">{trip.meta?.travellers} People</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400">Total Budget</p>
                        <p className="font-extrabold text-slate-900 text-sm">
                          ₹{trip.budgetAnalysis?.totalBudget?.toLocaleString() || trip.meta?.totalBudget?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">Estimated Cost</p>
                        <p className={`font-extrabold text-sm ${isWithin ? 'text-teal-600' : 'text-rose-600'}`}>
                          ₹{trip.budgetAnalysis?.estimatedTotalCost?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleExportJSON(trip)}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                      title="Download JSON Itinerary"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Saved Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenTrip(trip)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-all"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
