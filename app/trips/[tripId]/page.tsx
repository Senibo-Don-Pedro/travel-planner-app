import { auth } from "@/auth";
import TripDetailClient from "@/components/Trip-Detail";
import { db } from "@/lib/prisma";

interface TripDetailProps {
  params: Promise<{ tripId: string }>;
}

const TripDetail = async ({ params }: TripDetailProps) => {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Please sign in to view your trip details.
        </h1>
      </div>
    );
  }

  const { tripId } = await params;

  const trip = await db.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
    include: {locations: true},
  });

  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Trip not found.</h1>
      </div>
    );
  }

  return <TripDetailClient trip={trip} />;

};

export default TripDetail;
