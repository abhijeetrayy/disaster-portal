export const fetchDisasterNews = async (district) => {
    return [
      { title: "Flood in XYZ", date: "2025-02-07" },
      { title: "Earthquake in ABC", date: "2025-02-06" },
    ];
  };
  
  export const fetchEmergencyContacts = async (district) => {
    return { police: "100", fire: "101", ambulance: "102" };
  };
  
  export const fetchHospitals = async (district) => {
    return [
      { name: "City Hospital", contact: "9876543210" },
      { name: "Metro Hospital", contact: "9123456789" },
    ];
  };
  