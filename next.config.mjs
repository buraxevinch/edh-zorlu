/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Accept-CH", value: "Sec-CH-Viewport-Width" },
        { key: "Vary", value: "Sec-CH-Viewport-Width" },
      ],
    },
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.bulentsevinc.com", pathname: "/public/images/**" },
      { protocol: "https", hostname: "bulentsevinc.com", pathname: "/public/images/**" },
    ],
  },
};

export default nextConfig;
