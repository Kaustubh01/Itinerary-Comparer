// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HolidayPackageForm from './components/HolidayPackageForm';
import PlansGrid from './components/PlansGrid';
import ComparePlans from './components/ComparePlans';
import { PlansProvider } from './context/PlansContext';
import Navbar from './components/Navbar'; 
import ViewPlanDetails from './pages/ViewPlanDetails';


const App = () => {
  return (
    <PlansProvider>
      <Router>
        <div className="min-h-screen overflow-y-auto bg-gray-50">
          {/* Navbar for navigation */}
          <Navbar />

          <div className="p-6">
            <Routes>
              {/* Route for viewing plans */}
              <Route
                path="/view-plans"
                element={
                  <div>
                    <PlansGrid />
                    <ComparePlans />
                  </div>
                }
              />

              {/* Route for adding a plan */}
              <Route path="/add-plan" element={<HolidayPackageForm />} />

              {/* View plan details */}
              <Route path="/plan/:packageName" element={<ViewPlanDetails/>} />

              {/* Default route */}
              <Route
                path="/"
                element={
                  <div className="text-center text-gray-700">
                    <h2 className="text-2xl font-semibold">Welcome to Holiday Planner</h2>
                    <p className="mt-2">Use the navigation bar to get started.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </PlansProvider>
  );
};

export default App;
