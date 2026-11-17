import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    VITE_CARTO_API_KEY:
      process.env.VITE_CARTO_API_KEY ||
      process.env.NEXT_PUBLIC_CARTO_API_KEY ||
      "",
    NEXT_PUBLIC_CARTO_API_KEY:
      process.env.NEXT_PUBLIC_CARTO_API_KEY ||
      process.env.VITE_CARTO_API_KEY ||
      "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
