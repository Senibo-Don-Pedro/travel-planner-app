"use server";

import { auth } from "@/auth";
import { db } from "../prisma";


async function geocodeAddress(address: string) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      { headers: { "User-Agent": "travel-planner-app/1.0" } }
    );
    if (!res.ok) {
      throw new Error(`Geocode failed: ${res.status}`);
    }
    const data = await res.json();
    if (!data.length) throw new Error("No geocode results");
    return { lat: +data[0].lat, lng: +data[0].lon };
  } catch (e) {
    console.error("Geocode error for", address, e);
    // choose sensible defaults or re-throw with more context
    throw new Error("Unable to look up that address right now");
  }
}


export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();

  if (!session || !session.user)
    throw new Error("You must be logged in to add a location.");

  const address = formData.get("address")?.toString();

  if (!address) throw new Error("Missing address");

  const { lat, lng } = await geocodeAddress(address);

  const count = await db.location.count({
    where: { tripId },
  });

  await db.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  
}
