import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { Wallet, CheckCircle2, AlertTriangle, TrendingDown, RefreshCw, Sliders } from 'lucide-react';

const COLORS = [
  '#0D9488', // Teal (Accommodation)
  '#2563EB', // Blue (Transport)
  '#EA580C', // Orange (Food)
  '#8B5CF6', // Purple (Sightseeing)
  '#F59E0B', // Amber (Local transport)
  '#64748B'  // Slate (Emergency buffer)
];

export default function BudgetChart({
  budgetAnalysis,
  onAllocationChange,
  onResetAllocations
}) {
  if (!budgetAnalysis || !budgetAnalysis.breakdown) {
    return <div className="p-6 text-center text-slate-500">No budget data available.</div>;
  }

  const {
    totalBudget,
    estimatedTotalCost,
    remainingBalance,
    costPerPerson,
    costPerDay,
    status,
    isWithinBudget,
    breakdown,
    allocations
  } = budgetAnalysis;

  // Donut chart data
  const pieData = [
    { name: 'Accommodation', value: breakdown.accommodation.estimated, color: COLORS[0] },
    { name: 'Transport', value: breakdown.intercityTransport.estimated, color: COLORS[1] },
    { name: 'Food & Drinks', value: breakdown.food.estimated, color: COLORS[2] },
    { name: 'Sightseeing', value: breakdown.sightseeing.estimated, color: COLORS[3] },
    { name: 'Local Transit', value: breakdown.localTransport.estimated, color: COLORS[4] },
    { name: 'Emergency Buffer', value: breakdown.emergencyReserve.estimated, color: COLORS[5] }
  ];

  // Comparison Bar Chart data (Allocated vs Estimated)
  const barData = [
    {
      category: 'Stay',
      Allocated: breakdown.accommodation.allocated,
      Estimated: breakdown.accommodation.estimated
    },
    {
      category: 'Transport',
      Allocated: breakdown.intercityTransport.allocated,
      Estimated: breakdown.intercityTransport.estimated
    },
    {
      category: 'Food',
      Allocated: breakdown.food.allocated,
      Estimated: breakdown.food.estimated
    },
    {
      category: 'Activities',
      Allocated: breakdown.sightseeing.allocated,
      Estimated: breakdown.sightseeing.estimated
    },
    {
      category: 'Local',
      Allocated: breakdown.localTransport.allocated,
      Estimated: breakdown.localTransport.estimated
    },
    {
      category: 'Reserve',
      Allocated: breakdown.emergencyReserve.allocated,
      Estimated: breakdown.emergencyReserve.estimated
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Budget */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Total Budget</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹{totalBudget.toLocaleString()}</p>
          <span className="text-[10px] text-slate-600 font-medium">Available</span>
        </div>

        {/* Estimated Cost */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Estimated Cost</p>
          <p className={`text-xl sm:text-2xl font-extrabold mt-1 ${isWithinBudget ? 'text-teal-600' : 'text-rose-600'}`}>
            ₹{estimatedTotalCost.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-600 font-medium">Trip total</span>
        </div>

        {/* Remaining / Deficit */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            {remainingBalance >= 0 ? 'Surplus Balance' : 'Budget Deficit'}
          </p>
          <p className={`text-xl sm:text-2xl font-extrabold mt-1 ${remainingBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {remainingBalance >= 0 ? `+₹${remainingBalance.toLocaleString()}` : `-₹${Math.abs(remainingBalance).toLocaleString()}`}
          </p>
          <span className="text-[10px] text-slate-600 font-medium">
            {remainingBalance >= 0 ? 'Safe margin' : 'Need adjustments'}
          </span>
        </div>

        {/* Cost Per Person */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Per Person</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹{costPerPerson.toLocaleString()}</p>
          <span className="text-[10px] text-slate-600 font-medium">All inclusive</span>
        </div>

        {/* Cost Per Day */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Daily Spending</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">₹{costPerDay.toLocaleString()}</p>
          <span className="text-[10px] text-slate-600 font-medium">Avg per day</span>
        </div>

        {/* Status Badge */}
        <div className={`p-4 rounded-2xl border shadow-xs flex flex-col justify-between ${
          isWithinBudget
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
            : 'bg-rose-50/70 border-rose-200 text-rose-800'
        }`}>
          <p className="text-[11px] font-semibold uppercase tracking-wider">Status</p>
          <div className="flex items-center gap-1.5 my-1 font-bold text-sm sm:text-base">
            {isWithinBudget ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
            <span>{status}</span>
          </div>
          <span className="text-[10px] opacity-80">
            {isWithinBudget ? 'Ready to travel' : 'Over budget'}
          </span>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Estimated Cost Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900">Estimated Expense Distribution</h4>
            <p className="text-xs text-slate-500">Breakdown of calculated expenses across trip categories</p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(val) => [`₹${val.toLocaleString()}`, 'Estimated']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}</span>
                <span className="font-semibold text-slate-800 ml-auto">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Allocated vs Estimated */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900">Allocated Budget vs Estimated Costs</h4>
            <p className="text-xs text-slate-500">Compare what you planned to spend versus reality</p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `₹${v}`} />
                <RechartsTooltip
                  formatter={(val, name) => [`₹${val.toLocaleString()}`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Allocated" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Estimated" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span>💡 Bars showing green higher than grey indicate potential savings targets.</span>
          </div>
        </div>
      </div>

      {/* Allocation Sliders Section */}
      {onAllocationChange && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                Customize Budget Allocation Percentages
              </h4>
              <p className="text-xs text-slate-500">
                Adjust how your ₹{totalBudget.toLocaleString()} total budget is distributed across categories.
              </p>
            </div>
            {onResetAllocations && (
              <button
                onClick={onResetAllocations}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {[
              { key: 'accommodation', label: 'Accommodation', color: 'accent-teal-600' },
              { key: 'intercityTransport', label: 'Intercity Transport', color: 'accent-blue-600' },
              { key: 'food', label: 'Food & Beverages', color: 'accent-orange-600' },
              { key: 'sightseeing', label: 'Sightseeing & Activities', color: 'accent-purple-600' },
              { key: 'localTransport', label: 'Local Transport', color: 'accent-amber-600' },
              { key: 'emergencyBuffer', label: 'Emergency Reserve', color: 'accent-slate-600' }
            ].map((slider) => {
              const currentVal = allocations?.[slider.key] || 15;
              const allocatedAmount = Math.round((totalBudget * currentVal) / 100);

              return (
                <div key={slider.key} className="space-y-1.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{slider.label}</span>
                    <span className="font-bold text-teal-700">{currentVal}% (₹{allocatedAmount.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={currentVal}
                    onChange={(e) => onAllocationChange(slider.key, parseInt(e.target.value))}
                    className={`w-full cursor-pointer h-2 bg-slate-200 rounded-lg ${slider.color}`}
                  />
                  <p className="text-[10px] text-slate-600 line-clamp-1">
                    {breakdown[slider.key]?.details || ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
