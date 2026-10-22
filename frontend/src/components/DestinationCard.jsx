import React from 'react';
import { MapPin, Calendar, Wallet, ArrowRight, Tag } from 'lucide-react';

export default function DestinationCard({ destination, onSelect }) {
  const {
    id,
    name,
    state,
    region,
    tagline,
    heroImage,
    tags = [],
    avgDailyCost,
    idealDuration = 3
  } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Region & State badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
            {state}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-900/70 text-slate-200 backdrop-blur-md">
            {region}
          </span>
        </div>

        {/* Daily budget badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-slate-300 line-clamp-1">{tagline}</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Key Info Bar */}
        <div className="grid grid-cols-2 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Wallet className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-600 uppercase font-semibold">Budget Style</p>
              <p className="font-bold text-slate-800">
                ₹{avgDailyCost?.budget || 1000}<span className="text-[10px] text-slate-600 font-normal">/day</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-600 uppercase font-semibold">Ideal Trip</p>
              <p className="font-bold text-slate-800">{idealDuration} Days</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(destination)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white font-semibold text-sm transition-all group/btn border border-teal-200 hover:border-teal-600"
        >
          <span>Plan Trip to {name}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
