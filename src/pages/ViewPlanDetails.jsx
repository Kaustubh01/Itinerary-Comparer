// components/ViewPlanDetails.jsx
import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PlansContext } from "../context/PlansContext";
import heroImage from "../assets/images/2.jpg";

const ViewPlanDetails = () => {
  const { packageName } = useParams();
  const { plans } = useContext(PlansContext);

  const plan = plans.find((p) => p.packageName === decodeURIComponent(packageName));

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-12 shadow-sm border border-gray-200 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Plan Not Found</h1>
          <p className="text-gray-600 mb-8">The package you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          minHeight: "400px"
        }}
      >
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-between">
            {/* Back Button */}
            <div className="pt-6">
              <Link 
                to="/" 
                className="inline-flex items-center text-white hover:text-gray-200 font-medium transition-colors duration-200 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Plans
              </Link>
            </div>
            
            {/* Title and Cost Info */}
            <div className="pb-8">
              <div className="text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-light mb-4 drop-shadow-lg">
                  {plan.packageName}
                </h1>
                <div className="flex flex-wrap justify-center gap-6 text-lg">
                  <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-gray-200">Duration: </span>
                    <span className="font-medium">{plan.duration.days} Days / {plan.duration.nights} Nights</span>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-gray-200">Cost: </span>
                    <span className="font-medium text-green-300">₹{plan.costing.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section - Duration & Cost */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Duration</p>
              <p className="text-2xl font-light">
                {plan.duration.days} Days / {plan.duration.nights} Nights
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Travelers</p>
              <p className="text-2xl font-light">
                {plan.costing.adults} Adults{plan.costing.children > 0 && `, ${plan.costing.children} Children`}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Total Cost</p>
              <p className="text-3xl font-light text-green-400">
                ₹{plan.costing.totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Accommodation */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Accommodation
              </h2>
              <div className="space-y-4">
                {plan.accomodation.map((acc, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{acc.location}</h3>
                        <p className="text-gray-600">{acc.name}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium text-gray-900">{acc.duration.days}D / {acc.duration.nights}N</p>
                        <p className="text-gray-600">{acc.totalRooms} Rooms</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {acc.roomType.map((room, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Transportation */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Transportation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["road", "ferry", "air"].map((type) => (
                  <div key={type} className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                        {type === "road" && (
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5h-2A.5.5 0 0 1 8 9V3.5zM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5h-2A.5.5 0 0 1 12 9V3.5z" />
                          </svg>
                        )}
                        {type === "ferry" && (
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {type === "air" && (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 capitalize">{type}</h3>
                    </div>
                    {plan.transportation[type].length > 0 ? (
                      <div className="space-y-2">
                        {plan.transportation[type].map((transport, index) => (
                          <div key={index} className="text-sm">
                            <p className="font-medium text-gray-900">{transport.mode}</p>
                            <p className="text-gray-600">{transport.from} → {transport.to}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No {type} transportation</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                Itinerary
              </h2>
              <div className="space-y-4">
                {plan.itinerary.map((day, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-semibold mr-4">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Day {day.day}</h3>
                      <p className="text-gray-700 mb-2">{day.activities}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Stay: {day.stayLocation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inclusions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                What's Included
              </h2>
              <div className="space-y-3">
                {plan.inclusion.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions */}
            {plan.exclusion.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  What's Not Included
                </h2>
                <div className="space-y-3">
                  {plan.exclusion.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {plan.travelTips && plan.travelTips.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Travel Tips
                </h2>
                <div className="space-y-3">
                  {plan.travelTips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {plan.notes.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Important Notes
                </h2>
                <div className="space-y-3">
                  {plan.notes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700 text-sm">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                Book This Package
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Contact us for customization options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlanDetails;