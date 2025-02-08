"use client"; // Ensures it runs only on the client side

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

// Default map center (India)
const defaultCenter: [number, number] = [20.5937, 78.9629]; // India coordinates
const defaultZoom = 5;

// Sample hospital data (Replace this with API data)
const hospitalData = [
  { id: 1, name: "AIIMS Delhi", lat: 28.5672, lng: 77.21 },
  { id: 2, name: "Apollo Hospital", lat: 12.9366, lng: 77.6101 },
  { id: 3, name: "CMC Vellore", lat: 12.9237, lng: 79.1342 },
];

// Custom hospital marker icon
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png", // Hospital icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function IndiaMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Function to fetch lat/lng from pincode or tehsil (Mock API)
  const getCoordinates = async (query: string) => {
    // Replace this with a real API call
    const mockLocationData: Record<string, { lat: number; lng: number }> = {
      "110001": { lat: 28.6304, lng: 77.2177 }, // Connaught Place, Delhi
      "560001": { lat: 12.9716, lng: 77.5946 }, // Bangalore
      Mumbai: { lat: 19.076, lng: 72.8777 },
      Dehradun: { lat: 30.3165, lng: 78.0322 },
    };

    return mockLocationData[query] || null;
  };

  // Handle location change by pincode/tehsil
  const handleLocationChange = async (query: string) => {
    const coords = await getCoordinates(query);
    if (coords) {
      setLocation(coords);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Pincode or Tehsil"
          className="border p-2 rounded w-64"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLocationChange((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>

      {/* Map Container */}
      <MapContainer
        center={location || defaultCenter}
        zoom={location ? 12 : defaultZoom}
        style={{ height: "500px", width: "100%" }}
      >
        {/* Tile Layer for Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Show hospitals on map */}
        {hospitalData.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
            icon={hospitalIcon}
          >
            <Popup>{hospital.name}</Popup>
          </Marker>
        ))}

        {/* Show searched location */}
        {location && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
