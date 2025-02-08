"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import AiReco from "../../components/ai/reco";

const article = [
  {
    heading: "Severe Floods Devastate Assam, Millions Displaced",
    summary:
      "Heavy monsoon rains have caused widespread flooding in Assam, affecting millions of people and forcing them to evacuate their homes.  Relief efforts are underway.",
    article_link: "https://example-news-site.com/assam-floods", // Replace with actual link
    editor: "Anjali Sharma",
    published_time: "2024-07-26T10:00:00Z",
    district: "patna", // ISO 8601 format
  },
  {
    heading: "Earthquake Hits Himachal Pradesh, Several Feared Dead",
    summary:
      "A strong earthquake has struck Himachal Pradesh, causing damage to buildings and infrastructure.  Rescue teams are searching for survivors.",
    article_link: "https://example-news-site.com/himachal-earthquake", // Replace with actual link
    editor: "Rohan Gupta",
    published_time: "2024-07-25T15:30:00Z",
    district: "patna",
  },
  {
    heading: "Cyclone Alert Issued for Coastal Andhra Pradesh",
    summary:
      "Authorities have issued a cyclone alert for coastal areas of Andhra Pradesh.  Residents are being evacuated as a precaution.",
    article_link: "https://example-news-site.com/andhra-cyclone", // Replace with actual link
    editor: "Priya Patel",
    published_time: "2024-07-24T08:45:00Z",
    district: "Anantapur",
  },
  {
    heading: "Landslide in Kerala Claims Lives",
    summary:
      "A landslide triggered by heavy rainfall has occurred in Kerala, resulting in fatalities and injuries.  Search and rescue operations are ongoing.",
    article_link: "https://example-news-site.com/kerala-landslide", // Replace with actual link
    editor: "Vivek Singh",
    published_time: "2024-07-23T12:00:00Z",
    district: "patna",
  },
  {
    heading: "Heatwave Sweeps Across North India",
    summary:
      "A severe heatwave is affecting several states in North India, with temperatures soaring to record highs.  Health advisories have been issued.",
    article_link: "https://example-news-site.com/north-india-heatwave", // Replace with actual link
    editor: "Neha Kapoor",
    published_time: "2024-07-22T17:15:00Z",
    district: "patna",
  },
].find(
  (news) => news.heading === "Cyclone Alert Issued for Coastal Andhra Pradesh"
);

const NewsPage = ({ params }) => {
  const [center, setCenter] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const singleArticle = article;

  useEffect(() => {
    const fetchCoordinates = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          singleArticle.district
        )},India&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setCenter(data.results[0].geometry.location);
      }
    };

    const fetchHospitals = async () => {
      if (!singleArticle.district) {
        console.error("District information not available");
        return;
      }

      try {
        const response = await fetch(
          `/api/getHospital?location=${encodeURIComponent(
            "papampeta"
          )}&district=${encodeURIComponent(singleArticle.district)}`
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

    fetchCoordinates();
    fetchHospitals();
  }, [params, singleArticle.district]);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Headline and Image */}
      <h1 className="text-4xl font-bold mb-4">{singleArticle.heading}</h1>
      <img
        src={
          "https://plus.unsplash.com/premium_photo-1690284037651-ba07853a79a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="news"
        className="w-full h-60 object-cover rounded-lg mb-4"
      />

      {/* Author and Published Date */}
      <p className="text-sm text-gray-600 mb-2">
        District: {singleArticle.district}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Edited by: <span className="font-semibold">{singleArticle.editor}</span>
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Published: {new Date(singleArticle.published_time).toLocaleString()}
      </p>

      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <AiReco />
      </section>

      {/* Article Content */}
      <p className="text-lg leading-relaxed mb-6">{singleArticle.summary}</p>
      <a
        href={singleArticle.article_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold hover:underline"
      >
        Read Full Article →
      </a>

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">
          Hospitals in {singleArticle.district}
        </h3>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
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

      {/* Emergency Helpline */}
      <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500">
        <h2 className="text-2xl font-semibold text-red-700">
          Emergency Helpline
        </h2>
        <p className="text-lg">
          For emergencies, call: <span className="font-bold">123-456-7890</span>
        </p>
      </div>

      {/* Related Articles */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
        <ul className="list-disc list-inside text-blue-600">
          <li>
            <a href="#" className="hover:underline">
              Floods Devastate Assam
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Earthquake Hits Himachal
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Landslide in Kerala
            </a>
          </li>
        </ul>
      </div>

      {/* Comment Section */}
      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <textarea
          className="w-full border p-2 rounded-lg"
          placeholder="Leave a comment..."
        ></textarea>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default NewsPage;
