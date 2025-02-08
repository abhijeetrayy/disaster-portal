"use client";

import { useState, useEffect } from "react";

const ContactSection = () => {
  const [governmentContacts, setGovernmentContacts] = useState([]);
  const [hospitalContacts, setHospitalContacts] = useState([]);

  // useEffect(() => {
  //   // Fetch emergency contact data (replace with your actual API endpoint)
  //   const fetchContacts = async () => {
  //     try {
  //       const response = await fetch("/api/emergency-contacts");
  //       const data = await response.json();

  //       setGovernmentContacts(data.government);
  //       setHospitalContacts(data.hospitals);
  //     } catch (error) {
  //       console.error("Error fetching emergency contacts:", error);
  //     }
  //   };

  //   fetchContacts();
  // }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Emergency Contact Numbers
      </h2>

      {/* Government Authorities Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-red-600">
          🚨 Government Authorities
        </h3>
        <ul className="list-disc pl-5">
          {governmentContacts.length > 0 ? (
            governmentContacts.map((contact, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{contact.department}:</span>{" "}
                {contact.number}
              </li>
            ))
          ) : (
            <p>Loading government contacts...</p>
          )}
        </ul>
      </div>

      {/* Hospitals Section */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-green-600">
          🏥 Hospitals
        </h3>
        <ul className="list-disc pl-5">
          {hospitalContacts.length > 0 ? (
            hospitalContacts.map((hospital, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{hospital.name}:</span>{" "}
                {hospital.contact}
              </li>
            ))
          ) : (
            <p>Loading hospital contacts...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactSection;
