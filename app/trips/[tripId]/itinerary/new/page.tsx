import NewLocationClient from "@/components/new-location";

interface NewLocationProps {
  params: Promise<{ tripId: string }>;
}

export default async function NewLocation({ params }: NewLocationProps) {
  const { tripId } = await params;

  return <NewLocationClient tripId={tripId} />;
}
