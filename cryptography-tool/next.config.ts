import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack: (config, { isServer }) => {
    // This allows Webpack to recognize and link the .node binary
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // Fix for N-API modules in Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },
};

export default nextConfig;