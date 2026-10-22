import React from 'react';
import { Leaf, Award, Globe, Heart, ShieldCheck, CheckCircle2, Code2, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Leaf className="w-4 h-4 text-teal-600" />
          <span>Responsible Tourism & Sustainable Travel Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About TripMate & Sustainable Travel
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          TripMate was designed to make travel accessible and affordable for students and budget backpackers while actively promoting mindful tourism that respects local communities and the environment.
        </p>
      </div>

      {/* Sustainable Development Goals Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">United Nations SDGs Connection</h2>
          <p className="text-slate-500 text-xs mt-1">
            TripMate is thoughtfully aligned with the United Nations 2030 Agenda for Sustainable Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary SDG 8 */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50/50 p-8 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                8
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider">
                  Primary Alignment
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  SDG 8: Decent Work & Economic Growth
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Target 8.9: By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products.
            </p>

            <div className="space-y-2 pt-2 border-t border-rose-200/60">
              <p className="text-xs font-bold text-rose-900">How TripMate Contributes:</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Promotes family-run eco-homestays directly supporting local household income.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Recommends licensed local heritage guides rather than automated tour buses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Highlights century-old family eateries and local artisans over luxury hotel chains.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Supporting SDG 12 */}
          <div className="bg-gradient-to-br from-amber-50 to-emerald-50/50 p-8 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                12
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  Supporting Alignment
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  SDG 12: Responsible Consumption & Production
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Target 12.B: Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs, promotes local culture and products.
            </p>

            <div className="space-y-2 pt-2 border-t border-amber-200/60">
              <p className="text-xs font-bold text-amber-900">How TripMate Contributes:</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Prioritizes low-carbon travel: trains, shared electric rickshaws, and rental bicycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Embeds responsible travel tips into every daily schedule to prevent single-use plastic waste.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Encourages "Leave No Trace" ethics on trekking trails and sacred heritage ghats.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100 text-slate-600 text-xs text-center border border-slate-200 max-w-2xl mx-auto">
          ⚠️ <em>Academic Disclosure:</em> TripMate is an educational capstone project designed to promote awareness of sustainable tourism practices; it does not claim to independently measure or certify aggregate macroeconomic SDG results.
        </div>
      </section>

      {/* Technical Architecture Overview */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">System Architecture & Tech Stack</h3>
            <p className="text-xs text-slate-500">Built for production performance and easy local deployment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">Frontend Framework</p>
            <p className="text-teal-700 font-semibold">React 19 + Vite</p>
            <p className="text-slate-500 leading-relaxed">Lightning-fast Hot Module Replacement and modular component hierarchy.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">Styling & Design System</p>
            <p className="text-teal-700 font-semibold">Tailwind CSS + Glassmorphism</p>
            <p className="text-slate-500 leading-relaxed">Modern navy-teal aesthetic, fluid typography, and mobile-first responsiveness.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">Mapping & Geolocation</p>
            <p className="text-teal-700 font-semibold">Leaflet + OpenStreetMap</p>
            <p className="text-slate-500 leading-relaxed">Interactive maps with custom SVG markers and an accessible list-view alternative.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">Data Visualizations</p>
            <p className="text-teal-700 font-semibold">Recharts</p>
            <p className="text-slate-500 leading-relaxed">Interactive Donut & Bar charts displaying budget allocations vs actual estimates.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">Backend Engine</p>
            <p className="text-teal-700 font-semibold">Node.js + Express REST API</p>
            <p className="text-slate-500 leading-relaxed">Robust endpoint routing, algorithmic itinerary generation, and cost modeling.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-800 text-sm">External Integrations</p>
            <p className="text-teal-700 font-semibold">Open-Meteo Free Live Weather</p>
            <p className="text-slate-500 leading-relaxed">Live forecast without API key friction, backed by offline fallback resilience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
