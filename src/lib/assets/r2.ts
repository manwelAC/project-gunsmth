const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_ASSET_BASE_URL;

function encodeObjectKey(objectKey: string): string {
  const key = objectKey.trim().replace(/^\/+/, "");

  if (!key) {
    throw new Error("An R2 object key is required.");
  }

  return key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function getR2AssetUrl(objectKey: string): string {
  if (!R2_BASE_URL?.trim()) {
    throw new Error(
      "NEXT_PUBLIC_R2_ASSET_BASE_URL is not configured. Add the public R2 asset origin to .env.local.",
    );
  }

  const origin = R2_BASE_URL.trim().replace(/\/+$/, "");

  try {
    const parsedOrigin = new URL(origin);
    if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
      throw new Error("The R2 asset origin must use HTTP or HTTPS.");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("must use")) {
      throw error;
    }
    throw new Error("NEXT_PUBLIC_R2_ASSET_BASE_URL must be a valid URL.");
  }

  return `${origin}/${encodeObjectKey(objectKey)}`;
}

