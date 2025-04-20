import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: "incremental",
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
