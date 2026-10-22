import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Hotel, Utensils, Landmark, Eye, List, Compass, Star } from 'lucide-react';

// Custom modern SVG DivIcons for Leaflet
function createCustomIcon(category) {
  let bgColor = '#0D9488'; // Teal for attractions
  let svgPath = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h12M4 14h16M3 10h18M12 2l9 6H3l9-6z"/></svg>';

  if (category === 'hotel') {
    bgColor = '#2563EB'; // Blue for hotels
    svgPath = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M9 16h6"/><path d="M9 12h6"/><path d="M9 8h6"/></svg>';
  } else if (category === 'restaurant') {
    bgColor = '#EA580C'; // Orange for restaurants
    svgPath = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/><path d="M2 2h6"/></svg>';
  }

  const html = `
    <div style="
      background-color: ${bgColor};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2.5px solid white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      ${svgPath}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
}

export default function InteractiveMap({
  destination,
  accommodations = [],
  restaurants = [],
  attractions = []
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'

  const centerCoords = destination?.coordinates
    ? [destination.coordinates.lat, destination.coordinates.lng]
    : [26.9124, 75.7873]; // default Jaipur

  // Filter items based on activeCategory
  const showHotels = activeCategory === 'all' || activeCategory === 'hotel';
  const showFood = activeCategory === 'all' || activeCategory === 'restaurant';
  const showAttractions = activeCategory === 'all' || activeCategory === 'attraction';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-600" />
            Interactive Trip Navigator – {destination?.name || 'Destination'}
          </h3>
          <p className="text-xs text-slate-500">
            OpenStreetMap live geolocation showing stays, authentic eats, and attractions.
          </p>
        </div>

        {/* View mode toggle & category filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category tabs */}
          <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('hotel')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'hotel'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              Hotels
            </button>
            <button
              onClick={() => setActiveCategory('restaurant')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'restaurant'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              Food
            </button>
            <button
              onClick={() => setActiveCategory('attraction')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'attraction'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              Places
            </button>
          </div>

          {/* Map vs List View toggle */}
          <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
              title="Interactive Map View"
            >
              <Eye className="w-3.5 h-3.5" />
              Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
              title="Accessible List View"
            >
              <List className="w-3.5 h-3.5" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Main Map or List Container */}
      {viewMode === 'map' ? (
        <div className="relative h-[480px] w-full">
          <MapContainer
            center={centerCoords}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Hotel Markers */}
            {showHotels &&
              accommodations.map((hotel) => {
                if (!hotel.coords?.lat) return null;
                return (
                  <Marker
                    key={hotel.id}
                    position={[hotel.coords.lat, hotel.coords.lng]}
                    icon={createCustomIcon('hotel')}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1 space-y-1.5 max-w-[220px]">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
                          {hotel.type === 'hostel' ? 'Hostel' : 'Hotel / Homestay'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{hotel.name}</h4>
                        <p className="text-xs text-slate-600 font-semibold text-teal-700">
                          ₹{hotel.pricePerNight} <span className="font-normal text-slate-500">/ night</span>
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{hotel.whyBudget}</p>
                        <p className="text-[10px] text-slate-400">{hotel.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

            {/* Restaurant Markers */}
            {showFood &&
              restaurants.map((rest) => {
                if (!rest.coords?.lat) return null;
                return (
                  <Marker
                    key={rest.id}
                    position={[rest.coords.lat, rest.coords.lng]}
                    icon={createCustomIcon('restaurant')}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1 space-y-1.5 max-w-[220px]">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-100 text-orange-700 capitalize">
                          {rest.mealType} • {rest.dietary}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{rest.name}</h4>
                        <p className="text-xs font-semibold text-orange-600">
                          ~₹{rest.avgCostForTwo} for two
                        </p>
                        <p className="text-[11px] text-slate-600">
                          Famous: {rest.signatureDishes?.slice(0, 2).join(', ')}
                        </p>
                        <p className="text-[10px] text-slate-400">{rest.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

            {/* Attraction Markers */}
            {showAttractions &&
              attractions.map((place) => {
                if (!place.coords?.lat) return null;
                return (
                  <Marker
                    key={place.id}
                    position={[place.coords.lat, place.coords.lng]}
                    icon={createCustomIcon('attraction')}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1 space-y-1.5 max-w-[220px]">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-100 text-teal-700">
                          {place.type} Sightseeing
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{place.name}</h4>
                        <p className="text-xs text-slate-700 font-medium">
                          Entry: {place.entryFee === 0 ? 'FREE Entry' : `₹${place.entryFee}`}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{place.description}</p>
                        <p className="text-[10px] text-teal-600 font-medium">🕒 {place.openingHours}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>

          {/* Map legend overlay */}
          <div className="absolute bottom-4 left-4 z-1000 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/90 shadow-md text-xs space-y-1.5">
            <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">Map Legend</p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span className="text-slate-700">Accommodations (Hotels / Stays)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-600 inline-block"></span>
              <span className="text-slate-700">Food & Eateries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
              <span className="text-slate-700">Attractions & Monuments</span>
            </div>
          </div>
        </div>
      ) : (
        /* Accessible List View fallback */
        <div className="p-5 divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
          {showAttractions && (
            <div className="py-3">
              <h4 className="text-sm font-bold text-teal-700 flex items-center gap-1.5 mb-2">
                <Landmark className="w-4 h-4" /> Tourist Attractions ({attractions.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attractions.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <p className="font-bold text-slate-900 text-sm">{a.name}</p>
                    <p className="text-slate-600 line-clamp-1">{a.description}</p>
                    <div className="mt-2 flex items-center justify-between text-teal-700 font-medium">
                      <span>{a.entryFee === 0 ? 'FREE' : `Ticket: ₹${a.entryFee}`}</span>
                      <span>🕒 {a.openingHours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showHotels && (
            <div className="py-3">
              <h4 className="text-sm font-bold text-blue-700 flex items-center gap-1.5 mb-2">
                <Hotel className="w-4 h-4" /> Recommended Stays ({accommodations.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accommodations.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <p className="font-bold text-slate-900 text-sm">{h.name}</p>
                    <p className="text-slate-600">{h.address}</p>
                    <div className="mt-2 flex items-center justify-between font-semibold">
                      <span className="text-teal-700">₹{h.pricePerNight} / night</span>
                      <span className="text-amber-600 flex items-center gap-1">★ {h.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showFood && (
            <div className="py-3">
              <h4 className="text-sm font-bold text-orange-700 flex items-center gap-1.5 mb-2">
                <Utensils className="w-4 h-4" /> Local Eateries ({restaurants.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurants.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                    <p className="text-slate-600">Dishes: {r.signatureDishes?.join(', ')}</p>
                    <div className="mt-2 flex items-center justify-between text-orange-700 font-semibold">
                      <span>~₹{r.avgCostForTwo} for two</span>
                      <span className="capitalize">{r.mealType} ({r.dietary})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
