// components/PlanCard.jsx
import React, { useContext } from "react";
import { PlansContext } from "../context/PlansContext";
import { Link } from "react-router-dom";
export default function PlanCard({ plan }) {
  const { comparePlans, toggleComparePlan } = useContext(PlansContext);
  const isSelected = comparePlans.some((p) => p.packageName === plan.packageName);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
          {plan.packageName}
        </h2>

        {/* Duration & Cost */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Duration</span>
            <span className="text-sm font-semibold text-gray-900">
              {plan.duration.nights}N / {plan.duration.days}D
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Total Cost</span>
            <span className="text-lg font-bold text-green-600">
              ₹{plan.costing.totalCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Accommodation Locations */}
        {plan.accomodation.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
              Stay Locations
            </p>
            <div className="space-y-2">
              {plan.accomodation.slice(0, 2).map((acc, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">{acc.location}</span>
                  <span className="text-gray-500 text-xs">
                    {acc.duration.nights}N/{acc.duration.days}D
                  </span>
                </div>
              ))}
              {plan.accomodation.length > 2 && (
                <p className="text-xs text-gray-500 italic">
                  +{plan.accomodation.length - 2} more locations
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm">

            <Link
              to={`/plan/${encodeURIComponent(plan.packageName)}`}

            >
              View Details
            </Link>
          </button>

          <label className="relative flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleComparePlan(plan)}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-all duration-200 ${isSelected ? 'bg-gray-900' : 'bg-gray-300'
              }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isSelected ? 'translate-x-6' : 'translate-x-0.5'
                } translate-y-0.5`}></div>
            </div>
            <span className="ml-2 text-xs font-medium text-gray-600">
              Compare
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}