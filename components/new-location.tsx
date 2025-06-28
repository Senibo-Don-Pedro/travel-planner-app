"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { addLocation } from "@/lib/actions/add-location";
import { useRouter } from "next/navigation";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await addLocation(formData, tripId); // ← server action, throws or redirects
        toast.success("Trip created!");
        router.push(`/trips/${tripId}`); // Redirect to the trip page
        
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(message || "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Add New Location
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="address"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding ..." : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
