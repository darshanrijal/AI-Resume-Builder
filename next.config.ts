import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utshsllvd5rvpk5n.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
