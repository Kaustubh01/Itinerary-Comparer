// context/PlansContext.jsx
import React, { createContext, useState, useEffect } from "react";
import plansData from "../data/plans.json";

export const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comparePlans, setComparePlans] = useState([]); // selected plans for comparison

  useEffect(() => {
    setPlans(plansData);
    setLoading(false);
  }, []);

  const toggleComparePlan = (plan) => {
    setComparePlans((prev) => {
      const exists = prev.find((p) => p.packageName === plan.packageName);
      if (exists) {
        // remove if already selected
        return prev.filter((p) => p.packageName !== plan.packageName);
      } else {
        // allow max 3 plans
        if (prev.length >= 3) {
          alert("You can compare up to 3 plans only!");
          return prev;
        }
        return [...prev, plan];
      }
    });
  };

  const clearComparison = () => setComparePlans([]);

  return (
    <PlansContext.Provider
      value={{
        plans,
        loading,
        comparePlans,
        toggleComparePlan,
        clearComparison,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};
