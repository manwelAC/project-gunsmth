import type { NextConfig } from "next";

const assetBaseUrl = process.env.NEXT_PUBLIC_R2_ASSET_BASE_URL?.replace(
  /\/+$/,
  "",
);
const r2AssetOrigin = process.env.R2_ASSET_ORIGIN?.replace(/\/+$/, "");

function isAbsoluteHttpUrl(value?: string): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

if (r2AssetOrigin && !isAbsoluteHttpUrl(r2AssetOrigin)) {
  throw new Error("R2_ASSET_ORIGIN must be an absolute HTTP or HTTPS URL.");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: isAbsoluteHttpUrl(assetBaseUrl)
      ? [new URL(`${assetBaseUrl}/**`)]
      : [],
  },
  poweredByHeader: false,
  async rewrites() {
    return r2AssetOrigin
      ? [
          {
            source: "/r2-assets/:path*",
            destination: `${r2AssetOrigin}/:path*`,
          },
        ]
      : [];
  },
  async headers() {
    return r2AssetOrigin
      ? [
          {
            source: "/r2-assets/:path*",
            headers: [
              {
                key: "x-vercel-enable-rewrite-caching",
                value: "1",
              },
              {
                key: "CDN-Cache-Control",
                value: "public, max-age=86400",
              },
              {
                key: "Cache-Control",
                value: "public, max-age=3600, stale-while-revalidate=86400",
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
