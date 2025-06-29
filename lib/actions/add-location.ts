"use server";

import { auth } from "@/auth";
import { db } from "../prisma";
// import { redirect } from "next/navigation";

// async function geocodeAddress(address: string) {
//   const response = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//       address
//     )}`
//   );

//   const data = await response.json();

//   if (!data.length) throw new Error("No results found");

//   console.log(data);

//   const { lat, lon } = data[0];
//   return { lat: parseFloat(lat), lng: parseFloat(lon) };
// }

async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
    {
      headers: {
        'User-Agent': 'travel-planner-app/1.0 (senibodonpedro@gmail.com)'
      }
    }
  );

  console.log('Nominatim status:', response.status);

  const data = await response.json();
  console.log('Nominatim data:', data);

  if (!data.length) throw new Error("No results found");
  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
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

  // redirect(`/trips/${tripId}`);
}
