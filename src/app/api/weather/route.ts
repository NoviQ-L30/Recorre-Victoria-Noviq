import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENWEATHER_API_KEY" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=23.7369&lon=-99.1411&units=metric&lang=es&appid=${apiKey}`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Error fetching weather" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
