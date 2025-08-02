import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@prisma/client'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;