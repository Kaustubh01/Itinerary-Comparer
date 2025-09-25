// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Holiday Planner</h1>
      <div className="flex gap-6">
        <Link 
          to="/add-plan" 
          className="hover:text-gray-300 transition"
        >
          Add Plan
        </Link>
        <Link 
          to="/view-plans" 
          className="hover:text-gray-300 transition"
        >
          View Plans
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
