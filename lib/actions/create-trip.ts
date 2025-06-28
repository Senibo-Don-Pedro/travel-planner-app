"use server";
import { auth } from "@/auth";
import { db } from "../prisma";
// import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to create a trip");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await db.trip.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      userId: session.user.id,
      imageUrl: imageUrl || null, // Optional field, can be null
    },
  });

  // redirect("/trips");
}
