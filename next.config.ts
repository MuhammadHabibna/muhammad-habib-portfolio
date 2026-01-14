import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Wildcard for all supabase projects or specific ID
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For dummy data
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // For dummy data
      }
    ],
  },
};

export default nextConfig;
