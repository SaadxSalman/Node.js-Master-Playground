import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 1. Tell Turbopack how to handle .node files
  experimental: {
    turbo: {
      rules: {
        "*.node": {
          loaders: ["node-loader"],
          as: "resource",
        },
      },
    },
  },
  // 2. Keep the Webpack config for production builds
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

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