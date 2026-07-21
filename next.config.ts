import type { NextConfig } from "next";

const assetBaseUrl = process.env.NEXT_PUBLIC_R2_ASSET_BASE_URL?.replace(
  /\/+$/,
  "",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: assetBaseUrl ? [new URL(`${assetBaseUrl}/**`)] : [],
  },
  poweredByHeader: false,
};

export default nextConfig;
