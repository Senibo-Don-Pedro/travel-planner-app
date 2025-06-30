"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log to console so Vercel function logs pick it up
  useEffect(() => {
    console.error("🔥 Server Components Error:", error);
  }, [error]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">{error.message}</p>
      {error.digest && (
        <pre className="text-xs bg-gray-100 p-2 rounded">
          Digest: {error.digest}
        </pre>
      )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
