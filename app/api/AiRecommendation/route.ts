import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prompt = `
      List the top 5 safety measures to follow during a cyclone, separated only by commas. 
      Do not include any extra words, explanations, or JSON formatting.
      
      Example output:
      Secure loose objects, Stay indoors, Avoid windows, Have an emergency plan, Listen to official warnings
    `;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const geminiData = await geminiResponse.json();
    const suggestedTitlesText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!suggestedTitlesText) {
      return NextResponse.json(
        { error: "Invalid Gemini response" },
        { status: 500 }
      );
    }

    // Convert comma-separated string into an array
    const safetyTipsArray = suggestedTitlesText
      .split(",")
      .map((tip: string) => tip.trim());

    return NextResponse.json({ safety_tips: safetyTipsArray });
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
