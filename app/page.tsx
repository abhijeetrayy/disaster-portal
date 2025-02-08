import React from "react";
import AiReco from "./components/ai/reco";
import GoogleMapComponent from "./components/googleMap/mapComponent";

const DisasterDataPortal = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="container mx-auto p-6">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold">Real-time Disaster Alerts</h2>
          <p>
            Live updates on ongoing disasters with severity levels and affected
            areas.
          </p>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <AiReco />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold">Interactive Disaster Map</h2>
          <p>Map showing disaster-prone areas and live disaster reports.</p>
          <GoogleMapComponent />
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Disaster Statistics</h3>
            <p>Graph-based analysis of past disasters.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Relief & Resources</h3>
            <p>Information on emergency contacts and rescue operations.</p>
          </div>
        </div>
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Community Reports</h2>
          <p>User-submitted disaster reports and relief collaboration.</p>
        </section>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        <p>&copy; 2025 Disaster Data Portal | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default DisasterDataPortal;
