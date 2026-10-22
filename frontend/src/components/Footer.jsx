import React from 'react';
import { Compass, Heart, Globe, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export default function Footer({ setActiveView }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Trip<span className="text-teal-400">Mate</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering students, solo backpackers, and families to experience incredible destinations across India within their budget through smart, day-wise itineraries and verified budget stays.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-2 rounded-lg max-w-fit">
              <Leaf className="w-4 h-4 shrink-0 text-teal-300" />
              <span>Aligned with UN SDG 8 (Decent Work) & SDG 12 (Responsible Consumption)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveView('home'); window.scrollTo(0,0); }} className="hover:text-teal-400 transition-colors">
                  Top Destinations
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('plan'); window.scrollTo(0,0); }} className="hover:text-teal-400 transition-colors">
                  Budget Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('saved'); window.scrollTo(0,0); }} className="hover:text-teal-400 transition-colors">
                  My Saved Itineraries
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('about'); window.scrollTo(0,0); }} className="hover:text-teal-400 transition-colors">
                  How TripMate Works
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Popular Hubs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Jaipur, Rajasthan</li>
              <li>Goa Coastline</li>
              <li>Manali, Himachal Pradesh</li>
              <li>Varanasi, Uttar Pradesh</li>
              <li>Munnar, Kerala</li>
              <li>Rishikesh, Uttarakhand</li>
            </ul>
          </div>

          {/* Responsible Travel */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Responsible Travel</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Choose Local Homestays</li>
              <li>Carry Reusable Water Flasks</li>
              <li>Hire Licensed Heritage Guides</li>
              <li>Leave No Trace on Trails</li>
              <li>Support Small Dining Messes</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TripMate – AI-Powered Budget Travel Planner. Built for College Demonstration.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Verified Public Data & Free APIs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
