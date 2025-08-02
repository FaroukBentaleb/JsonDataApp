import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NETLIFY_URL
      ? `https://${process.env.NETLIFY_URL}`
      : 'http://localhost:3000',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [
        'localhost:3000',
        process.env.NETLIFY_URL && `https://${process.env.NETLIFY_URL}`,
      ].filter(Boolean) as string[],
    },
    optimizePackageImports: ['@prisma/client', '@prisma/extension-accelerate'],
  },
};

export default nextConfig;