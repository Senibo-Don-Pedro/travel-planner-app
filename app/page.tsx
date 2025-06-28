import React from "react";
import { Map as MapIcon } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-100 py-24 md:py-40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
                Your Next Journey, Effortlessly Planned
              </h1>
              <p className="text-lg md:text-2xl text-gray-700 mb-10">
                Map out dream trips, manage your route, and share memories — all
                in one platform made for explorers.
              </p>
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
              >
                {isLoggedIn ? (
                  "See My Trips"
                ) : (
                  <>
                    <span className="inline-block mr-2">
                      <MapIcon className="w-6 h-6" />
                    </span>
                    Start Planning
                  </>
                )}
              </AuthButton>
            </div>
          </div>
          {/* Decorative Wave */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-100 to-transparent"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
          />
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
              Travel Smarter, Not Harder
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="p-8 rounded-2xl border border-blue-100 shadow bg-gradient-to-br from-blue-50 to-white">
                <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center mb-5">
                  <MapIcon className="h-7 w-7 text-blue-700" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Visual Trip Builder
                </h3>
                <p className="text-gray-700">
                  Place every stop on a map, drag to reorder, and see your
                  journey come alive visually.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-yellow-100 shadow bg-gradient-to-br from-yellow-50 to-white">
                <div className="w-14 h-14 rounded-full bg-yellow-200 flex items-center justify-center mb-5">
                  <svg
                    className="h-7 w-7 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Flexible Schedules
                </h3>
                <p className="text-gray-700">
                  Plan your trip day-by-day or on-the-fly — we help you stay
                  organized, but in your own style.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-green-100 shadow bg-gradient-to-br from-green-50 to-white">
                <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center mb-5">
                  <svg
                    className="h-7 w-7 text-green-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Easy Reordering</h3>
                <p className="text-gray-700">
                  Adjust plans anytime — just drag and drop to shuffle your
                  itinerary and keep everything in sync.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Make Every Trip Your Best One Yet
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Sign up for free and start creating unforgettable adventures —
              your perfect itinerary is just a click away.
            </p>
            <AuthButton
              isLoggedIn={isLoggedIn}
              className="inline-block bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              {isLoggedIn ? "Go to Dashboard" : "Create My Account"}
            </AuthButton>
          </div>
        </section>
      </main>
    </div>
  );
}
