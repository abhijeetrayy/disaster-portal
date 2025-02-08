"use client";

import React, { useState } from "react";
import districtsData from "../data/districts.json";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface District {
  districtCode: string;
  district: string;
  headquarters: string;
  population: number;
  area: number;
  density: number;
}

interface Hospital {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const districts: District[] = districtsData.districts;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DistrictDropdown: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Handle district selection
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
    setSearchTerm(""); // Reset search term when district changes
    setHospitals([]);

    // Find coordinates of selected district
    const selectedDistrictData = districts.find(
      (d) => d.district === districtName
    );
    if (selectedDistrictData) {
      fetchCoordinates(districtName);
    }
  };

  // Fetch coordinates for district using Google Geocoding API
  const fetchCoordinates = async (location: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )},India&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      setCenter(data.results[0].geometry.location);
    }
  };

  // Fetch nearby hospitals using Google Places API
  const fetchHospitals = async () => {
    if (!selectedDistrict || !searchTerm) {
      alert("Please select a district and enter a search term.");
      return;
    }

    try {
      const response = await fetch(
        `/api/getHospital?location=${encodeURIComponent(
          searchTerm
        )}&district=${encodeURIComponent(selectedDistrict)}`
      );

      if (!response.ok) {
        console.error("Server returned an error:", response.status);
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const text = await response.text(); // Handle empty responses
      if (!text) {
        alert("Received an empty response from the API.");
        return;
      }

      const data = JSON.parse(text);
      console.log(data);

      if (data.results && data.results.length > 0) {
        setHospitals(data.results);
        setCenter(data.results[0].geometry.location);
      } else {
        alert("No hospitals found in this area.");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      alert("Failed to fetch hospitals. Check console for details.");
    }
  };

  // Filter districts based on search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = districts.filter((district) =>
        district.district.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Search or Select a District</h2>

      {/* Search Bar for Districts */}
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search for a district..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Display Filtered Districts */}
      {filteredDistricts.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Matching Districts:</h3>
          <ul className="space-y-2">
            {filteredDistricts.map((district, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSelectedDistrict(district.district);
                  setSearchTerm("");
                  setFilteredDistricts([]);
                  fetchCoordinates(district.district);
                }}
              >
                {district.district}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* District Dropdown */}
      <select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select a District --</option>
        {districts.map((district, index) => (
          <option key={index} value={district.district}>
            {district.district}
          </option>
        ))}
      </select>

      {/* Search Bar for Hospitals - Appears only after selecting a district */}
      {selectedDistrict && (
        <div className="mt-4">
          <label className="block font-semibold mb-2">Enter Location:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search for hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchHospitals}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search Hospitals
          </button>
        </div>
      )}

      {/* Display Selected District Details */}
      {selectedDistrict && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-md font-semibold">
            Selected District: {selectedDistrict}
          </h3>
        </div>
      )}

      {/* Google Map - Displays Hospitals as Markers */}
      {center && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">
            Hospitals in {searchTerm}, {selectedDistrict}
          </h3>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.place_id}
                  position={hospital.geometry.location}
                  title={hospital.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default DistrictDropdown;
