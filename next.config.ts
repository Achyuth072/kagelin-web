import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The marketing site is intentionally tiny — no image optimization backend
  // needed for a handful of local screenshots.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
