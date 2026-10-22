import React, { useState } from 'react';
import { X, Plus, Trash2, Receipt, Wallet, Check } from 'lucide-react';

export default function ExpenseTrackerModal({
  isOpen,
  onClose,
  trip,
  onUpdateExpenses
}) {
  if (!isOpen || !trip) return null;

  const [expenses, setExpenses] = useState(trip.actualExpenses || []);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalBudget = trip.meta?.totalBudget || trip.budgetAnalysis?.totalBudget || 10000;
  const remaining = totalBudget - totalSpent;

  const handleAddExpense = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const newExpense = {
      id: `exp_${Date.now()}`,
      category,
      amount: val,
      note: note.trim() || category,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    setAmount('');
    setNote('');
    if (onUpdateExpenses) onUpdateExpenses(updated);
  };

  const handleDeleteExpense = (id) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    if (onUpdateExpenses) onUpdateExpenses(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white relative flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Receipt className="w-5 h-5 text-teal-400" />
              On-Trip Expense Tracker
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Track your actual expenditures against your ₹{totalBudget.toLocaleString()} budget
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spend Summary Bar */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 border-b border-slate-200 text-center">
          <div className="p-2 rounded-xl bg-white border border-slate-200/70">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Budget</p>
            <p className="text-sm font-extrabold text-slate-900">₹{totalBudget.toLocaleString()}</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200/70">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Logged Spent</p>
            <p className="text-sm font-extrabold text-rose-600">₹{totalSpent.toLocaleString()}</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200/70">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Remaining</p>
            <p className={`text-sm font-extrabold ${remaining >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
              ₹{remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} className="p-4 sm:p-5 bg-teal-50/50 border-b border-teal-100/80 space-y-3">
          <p className="text-xs font-bold text-teal-900 uppercase tracking-wider">Log New Expense</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700"
            >
              <option value="Food">🍽️ Food & Snacks</option>
              <option value="Transport">🛺 Local Transport</option>
              <option value="Stay">🏨 Hotel / Stay</option>
              <option value="Sightseeing">🏛️ Entry Ticket</option>
              <option value="Shopping">🛍️ Souvenir / Local Art</option>
              <option value="Misc">📦 Miscellaneous</option>
            </select>

            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 font-semibold"
              min="1"
              required
            />

            <input
              type="text"
              placeholder="Description (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </form>

        {/* Expenses List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {expenses.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No expenses recorded yet. Use the form above to track real spending.
            </div>
          ) : (
            expenses.map((exp) => (
              <div key={exp.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{exp.note}</p>
                  <p className="text-[10px] text-slate-400">{exp.category} • {exp.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">₹{exp.amount.toLocaleString()}</span>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
