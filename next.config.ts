import type { NextConfig } from "next";

// For GitHub Pages: set BASE_PATH to '/<repo-name>' if NOT using username.github.io
// e.g. BASE_PATH='/portfolio' for https://username.github.io/portfolio/
// Leave empty '' for https://username.github.io/ (user/org site)
const BASE_PATH = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (enabled during build only)
  // output: "export",

  // Required for static export: disables Next.js image optimization
  images: {
    unoptimized: true,
  },

  // Trailing slash required for GitHub Pages asset resolution
  trailingSlash: true,

  // Base path for GitHub Pages subdirectory deployment
  basePath: BASE_PATH || undefined,

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;