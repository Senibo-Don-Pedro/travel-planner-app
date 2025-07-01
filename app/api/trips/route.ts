import { auth } from "@/auth";

import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const locations = await db.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        country: true,
        formattedAddress: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    // const transformedLocations = await Promise.all(
    //   locations.map(async (loc) => {
    //     const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);

    //     return {
    //       name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
    //       lat: loc.lat,
    //       lng: loc.lng,
    //       country: geocodeResult.country,
    //     };
    //   })
    // );

    const transformedLocations = locations.map((l) => ({
      name: `${l.trip.title} — ${l.formattedAddress ?? "Unknown address"}`,
      lat: l.lat,
      lng: l.lng,
      country: l.country ?? "Unknown",
    }));

    return NextResponse.json(transformedLocations);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
