import type { NextConfig } from "next";
import { APP_URL } from "@/lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/login",
        destination: `${APP_URL}/login`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
