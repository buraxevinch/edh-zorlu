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
      { protocol: "https", hostname: process.env.NEXT_PUBLIC_BACKEND_URL },
      { protocol: "http", hostname: process.env.NEXT_PUBLIC_BACKEND_URL, port: "" },
    ],
    // deviceSizes: [500, 968],
    // imageSizes: [475, 768],
  },
};

export default nextConfig;
