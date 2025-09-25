import React, { useState } from "react";
import JsonUpload from "./JsonUpload";

export default function HolidayPackageForm() {
  const [formData, setFormData] = useState({
    packageName: "",
    duration: { nights: 0, days: 0 },
    costing: {
      adults: 0,
      children: 0,
      costPerAdult: 0,
      costPerChild: 0,
      totalCost: 0,
    },
    accomodation: [],
    transportation: { road: [], ferry: [], air: [] },
    itinerary: [],
    inclusion: [],
    exclusion: [],
    travelTips: [],
    notes: [],
  });

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add functions for dynamic fields
  const addAccommodation = () => {
    setFormData({
      ...formData,
      accomodation: [
        ...formData.accomodation,
        {
          location: "",
          name: "",
          duration: { days: "", nights: "" },
          roomType: [""],
          totalRooms: "",
        },
      ],
    });
  };

  const deleteAccommodation = (index) => {
    const updated = [...formData.accomodation];
    updated.splice(index, 1);
    setFormData({ ...formData, accomodation: updated });
  };

  const addTransport = (type) => {
    setFormData({
      ...formData,
      transportation: {
        ...formData.transportation,
        [type]: [...formData.transportation[type], { mode: "", from: "", to: "" }],
      },
    });
  };

  const deleteTransport = (type, index) => {
    const updated = [...formData.transportation[type]];
    updated.splice(index, 1);
    setFormData({
      ...formData,
      transportation: {
        ...formData.transportation,
        [type]: updated,
      },
    });
  };

  const addItinerary = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, stayLocation: "", activities: "" }],
    });
  };

  const addSimpleListItem = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ""] });
  };

  // Handle nested changes
  const handleNestedChange = (e, index, section, field) => {
    const value = e.target.value;
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleAccommodationFieldChange = (e, index, field) => {
    const value = e.target.value;
    const updated = [...formData.accomodation];
    updated[index][field] = value;
    setFormData({ ...formData, accomodation: updated });
  };

  const handleAccommodationDurationChange = (e, index, type) => {
    const value = +e.target.value;
    const updated = [...formData.accomodation];
    updated[index].duration[type] = value;
    setFormData({ ...formData, accomodation: updated });
  };

  const handleRoomTypeChange = (e, accIndex, roomIndex) => {
    const value = e.target.value;
    const updated = [...formData.accomodation];
    updated[accIndex].roomType[roomIndex] = value;
    setFormData({ ...formData, accomodation: updated });
  };

  const addRoomType = (accIndex) => {
    const updated = [...formData.accomodation];
    updated[accIndex].roomType.push("");
    setFormData({ ...formData, accomodation: updated });
  };

  const deleteRoomType = (accIndex, roomIndex) => {
    const updated = [...formData.accomodation];
    updated[accIndex].roomType.splice(roomIndex, 1);
    setFormData({ ...formData, accomodation: updated });
  };


  // Handler to populate form from uploaded JSON
  const handleJsonUpload = (data) => {
    // Optional: Add basic validation for structure
    if (!data.packageName || !data.duration) {
      alert("Invalid JSON structure: Missing required fields.");
      return;
    }

    setFormData({
      ...formData,
      ...data, // Overwrite formData with uploaded JSON
    });

    alert("Form populated from JSON!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Package Data:", formData);
    alert("Package data logged in console!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Holiday Package Management</h1>
          <p className="text-gray-600">Create and manage your holiday packages</p>
        </div>

        {/* TODO: JSON Upload Section */}
        {/* <JsonUpload onJsonUpload={handleJsonUpload} /> */}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Package Name</label>
              <input
                type="text"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Enter package name"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Duration</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    value={formData.duration.nights}
                    onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, nights: +e.target.value } })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="Nights"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={formData.duration.days}
                    onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, days: +e.target.value } })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="Days"
                  />
                </div>
              </div>
            </div>

            {/* Costing */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Costing Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData.costing).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="number"
                      value={formData.costing[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, costing: { ...formData.costing, [key]: +e.target.value } })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                      placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Accommodations</h2>
                <button
                  type="button"
                  onClick={addAccommodation}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                >
                  + Add Accommodation
                </button>
              </div>

              <div className="space-y-4">
                {formData.accomodation.map((acc, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Location"
                        value={acc.location}
                        onChange={(e) => handleAccommodationFieldChange(e, idx, "location")}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder="Hotel Name"
                        value={acc.name}
                        onChange={(e) => handleAccommodationFieldChange(e, idx, "name")}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <input
                        type="number"
                        placeholder="Nights"
                        value={acc.duration.nights}
                        onChange={(e) => handleAccommodationDurationChange(e, idx, "nights")}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <input
                        type="number"
                        placeholder="Days"
                        value={acc.duration.days}
                        onChange={(e) => handleAccommodationDurationChange(e, idx, "days")}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <input
                        type="number"
                        placeholder="Total Rooms"
                        value={acc.totalRooms}
                        onChange={(e) => handleAccommodationFieldChange(e, idx, "totalRooms")}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Types</label>
                      <div className="space-y-2">
                        {acc.roomType.map((room, rIdx) => (
                          <div key={rIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={room}
                              onChange={(e) => handleRoomTypeChange(e, idx, rIdx)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                              placeholder="Room type"
                            />
                            <button
                              type="button"
                              onClick={() => deleteRoomType(idx, rIdx)}
                              className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addRoomType(idx)}
                          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                        >
                          + Add Room Type
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteAccommodation(idx)}
                      className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                    >
                      Delete Accommodation
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation Section */}
            {["road", "ferry", "air"].map((type) => (
              <div key={type} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 capitalize">
                    {type} Transportation
                  </h2>
                  <button
                    type="button"
                    onClick={() => addTransport(type)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                  >
                    + Add {type} Transport
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.transportation[type].map((item, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-3 bg-white rounded-xl p-3 border border-gray-200">
                      <input
                        type="text"
                        placeholder="Mode"
                        value={item.mode}
                        onChange={(e) => {
                          const updated = [...formData.transportation[type]];
                          updated[idx].mode = e.target.value;
                          setFormData({ ...formData, transportation: { ...formData.transportation, [type]: updated } });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder="From"
                        value={item.from}
                        onChange={(e) => {
                          const updated = [...formData.transportation[type]];
                          updated[idx].from = e.target.value;
                          setFormData({ ...formData, transportation: { ...formData.transportation, [type]: updated } });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <input
                        type="text"
                        placeholder="To"
                        value={item.to}
                        onChange={(e) => {
                          const updated = [...formData.transportation[type]];
                          updated[idx].to = e.target.value;
                          setFormData({ ...formData, transportation: { ...formData.transportation, [type]: updated } });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => deleteTransport(type, idx)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Itinerary */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Itinerary</h2>
                <button
                  type="button"
                  onClick={addItinerary}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                >
                  + Add Day
                </button>
              </div>

              <div className="space-y-3">
                {formData.itinerary.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-3 bg-white rounded-xl p-3 border border-gray-200">
                    <input
                      type="number"
                      placeholder="Day"
                      value={item.day}
                      onChange={(e) => handleNestedChange(e, idx, "itinerary", "day")}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Stay Location"
                      value={item.stayLocation}
                      onChange={(e) => handleNestedChange(e, idx, "itinerary", "stayLocation")}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Activities"
                      value={item.activities}
                      onChange={(e) => handleNestedChange(e, idx, "itinerary", "activities")}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Simple list sections */}
            {["inclusion", "exclusion", "travelTips", "notes"].map((key) => (
              <div key={key} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 capitalize">
                    {key === "travelTips" ? "Travel Tips" : key}
                  </h2>
                  <button
                    type="button"
                    onClick={() => addSimpleListItem(key)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                  >
                    +
                  </button>
                </div>

                <div className="space-y-3">
                  {formData[key].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData[key]];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, [key]: updated });
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                        placeholder={`Enter ${key === "travelTips" ? "travel tip" : key.slice(0)}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData[key]];
                          updated.splice(idx, 1);
                          setFormData({ ...formData, [key]: updated });
                        }}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Save Package
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}