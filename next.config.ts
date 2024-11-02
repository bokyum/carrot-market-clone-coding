import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
