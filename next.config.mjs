/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/themis-womens-health",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*"],
}

export default nextConfig
