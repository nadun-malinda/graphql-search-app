/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nextjs-graphql-search-app.vercel.app",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
