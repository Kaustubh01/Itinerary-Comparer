// components/ComparePlans.jsx
import React, { useContext } from "react";
import { PlansContext } from "../context/PlansContext";
import { Link } from "react-router-dom";

export default function ComparePlans() {
  const { comparePlans, clearComparison } = useContext(PlansContext);

  if (comparePlans.length < 2) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-light text-gray-900">Compare Plans</h2>
            <button
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-all duration-200 hover:scale-105"
              onClick={clearComparison}
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="p-8 overflow-auto max-h-[calc(90vh-120px)]">
          {/* Comparison Grid */}
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${comparePlans.length}, 1fr)` }}
          >
            {comparePlans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  {plan.packageName}
                </h3>

                {/* Total Cost */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                    Total Cost
                  </p>
                  <p className="text-2xl font-light text-green-600">
                    ₹{plan.costing.totalCost.toLocaleString()}
                  </p>
                </div>

                {/* Total Duration */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                    Duration
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    {plan.duration.nights} Nights / {plan.duration.days} Days
                  </p>
                </div>

                {/* Number of Activities */}
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                    Activities
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    {plan.itinerary.length} Activities
                  </p>
                </div>

                {/* View Details Link */}
                <Link
                  to={`/plan/${encodeURIComponent(plan.packageName)}`}
                  className="block text-center w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
