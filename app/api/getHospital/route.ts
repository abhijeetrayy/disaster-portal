import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const district = searchParams.get("district");

    if (!location || !district) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+in+${encodeURIComponent(
      location
    )}+${encodeURIComponent(district)},India&key=${apiKey}`;

    const response = await fetch(googleApiUrl);
    const text = await response.text(); // Handle empty responses
    if (!text) {
      return NextResponse.json(
        { error: "Empty response from Google API" },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch hospitals", details: errorMessage },
      { status: 500 }
    );
  }
}
