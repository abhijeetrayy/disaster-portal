// pages/api/hospitals.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { location, district } = req.query;

  if (!location || !district) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+in+${location}+${district},India&key=${apiKey}`;

  try {
    const response = await fetch(googleApiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch hospitals", details: error });
  }
}
