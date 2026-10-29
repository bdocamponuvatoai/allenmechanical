import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keeps the legacy URL shape: /about/ is written to out/about/index.html.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
