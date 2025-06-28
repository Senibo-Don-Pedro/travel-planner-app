"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/upload-thing";
import Image from "next/image";

export default function NewTrip() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    startTransition(async () => {
      try {
        await createTrip(formData); // ← server action, throws or redirects
        toast.success("Trip created!");
        router.push("/trips");
        // Redirect to trips page after successful creation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader className="font-bold text-xl"> New Trip</CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            // action={(formData: FormData) => {
            //   startTransition(() => {
            //     createTrip(formData);
            //   });
            //   toast("Event has been created.");
            // }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Japan trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Trip description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                />
              </div>
            </div>
            <div>
              <label> Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-48 object-cover"
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>

            <Button type="submit" className="w-full mt-3" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating Trip...
                </div>
              ) : (
                "Create Trip"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
