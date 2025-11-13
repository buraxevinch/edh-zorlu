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
  /*
  */
    images: {
      remotePatterns: [
        { protocol: "https", hostname: process.env.NEXT_PUBLIC_BACKEND_URL },
        { protocol: "http", hostname: process.env.NEXT_PUBLIC_BACKEND_URL, port: "" },
      ],
    },
};

export default nextConfig;
