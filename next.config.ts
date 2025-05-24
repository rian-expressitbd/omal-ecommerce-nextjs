import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

module.exports = nextConfig;
