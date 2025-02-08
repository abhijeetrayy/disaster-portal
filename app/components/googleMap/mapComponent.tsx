"use client"; // Ensures it runs only on the client side

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.5937, // India Center
  lng: 78.9629,
};

const hospitalData = [
  { id: 1, name: "AIIMS Delhi", lat: 28.5672, lng: 77.21 },
  { id: 2, name: "Apollo Chennai", lat: 13.063, lng: 80.2496 },
];

export default function GoogleMapComponent() {
  const [mapCenter, setMapCenter] = useState(center);

  const fetchHospitals = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const query = "Hospitals in India";
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    setMapCenter(data.results[0].geometry.location);
    console.log(data.results); // Contains hospital names, lat, lng
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={5}
        >
          {hospitalData.map((hospital) => (
            <Marker
              key={hospital.id}
              position={{ lat: hospital.lat, lng: hospital.lng }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <button onClick={() => fetchHospitals}>Get Locaiton</button>
    </>
  );
}
