import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "awacchmn71.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
