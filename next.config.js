/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-case-api.sbdev.nl",
        port: '',
        pathname: "/storage/images/**"
      }
    ]
  }
}

module.exports = nextConfig
