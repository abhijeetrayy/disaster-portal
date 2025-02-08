"use client";

import { useState } from "react";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/AiRecommendation`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch recommendations");
      }

      const data = await response.json();
      console.log(data);

      if (data.safety_tips) {
        setRecommendations(data.safety_tips);
      } else {
        setError("Invalid response format.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={handleGetRecommendations}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-6"
      >
        {isLoading ? "Generating..." : "Get Safety Tips"}
      </button>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {recommendations.length > 0 && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Cyclone Safety Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            {recommendations.map((tip, index) => (
              <li key={index} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
