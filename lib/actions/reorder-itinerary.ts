"use server";

import { auth } from "../../auth";
import { db } from "../prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  await db.$transaction(
    newOrder.map((locationId: string, key: number) =>
      db.location.update({
        where: { id: locationId },
        data: { order: key },
      })
    )
  );
}
