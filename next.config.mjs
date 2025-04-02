/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use minimal configuration
  output: process.env.NEXT_PUBLIC_NETLIFY_SITE ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;