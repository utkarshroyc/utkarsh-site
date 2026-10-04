import type { NextConfig } from "next";

// The site used to be multi-page; send old links to the matching section.
const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/resume", destination: "/#work", permanent: true },
      { source: "/projects/:slug*", destination: "/#work", permanent: true },
      { source: "/writing", destination: "/#writing", permanent: true },
    ];
  },
};

export default nextConfig;
