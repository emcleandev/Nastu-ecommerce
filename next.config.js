const { getRedirectStatus } = require("next/dist/lib/load-custom-routes");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
};

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/canceled",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
