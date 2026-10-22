import React from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, TrendingDown, PiggyBank } from 'lucide-react';

export default function CheaperModal({
  isOpen,
  onClose,
  moneySavingTips,
  onApplySaving
}) {
  if (!isOpen) return null;

  const { potentialSavings = 0, suggestions = [] } = moneySavingTips || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <PiggyBank className="w-4 h-4 text-amber-300" />
            <span>Smart Cost Optimizer</span>
          </div>
          <h3 className="text-2xl font-bold">Make My Trip Cheaper 💡</h3>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-md">
            AI analyzed your current plan. Here are realistic swaps and public transit alternatives to save money without compromising safety.
          </p>

          {/* Potential Savings Banner */}
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
            <TrendingDown className="w-5 h-5 text-amber-300" />
            <div>
              <p className="text-[10px] text-teal-100 uppercase font-semibold">Total Potential Savings</p>
              <p className="text-lg font-extrabold text-amber-300">
                Save up to ₹{potentialSavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {suggestions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Check className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">Your trip is already exceptionally budget-optimized!</p>
              <p className="text-xs text-slate-500 mt-1">No further cost reductions needed without affecting safety or convenience.</p>
            </div>
          ) : (
            suggestions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Save ₹{item.estimatedSavings.toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {item.actionType && item.actionType.startsWith('CHANGE_') && onApplySaving && (
                  <button
                    onClick={() => {
                      onApplySaving(item);
                      onClose();
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-all hover:scale-102"
                  >
                    <span>Apply Swap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Safety-first, verified alternatives</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
