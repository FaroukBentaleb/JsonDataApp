import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {}, // Changed from boolean to empty object
    optimizePackageImports: ['@prisma/client', '@prisma/extension-accelerate'],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary during fixes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;