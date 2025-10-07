import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_PRODUCTS_API_URL: process.env.NEXT_PUBLIC_PRODUCTS_API_URL,
    NEXT_PUBLIC_SEGMENTS_API_URL: process.env.NEXT_PUBLIC_SEGMENTS_API_URL
  },
};

export default nextConfig;
