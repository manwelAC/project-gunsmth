const R2_ASSET_BASE = process.env.NEXT_PUBLIC_R2_ASSET_BASE_URL;

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
  if (!R2_ASSET_BASE?.trim()) {
    throw new Error(
      "NEXT_PUBLIC_R2_ASSET_BASE_URL is not configured. Add the same-origin proxy path or public asset origin to .env.local.",
    );
  }

  const base = R2_ASSET_BASE.trim().replace(/\/+$/, "");

  if (base.startsWith("/")) {
    return `${base}/${encodeObjectKey(objectKey)}`;
  }

  try {
    const parsedOrigin = new URL(base);
    if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
      throw new Error("The asset origin must use HTTP or HTTPS.");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("must use")) {
      throw error;
    }
    throw new Error(
      "NEXT_PUBLIC_R2_ASSET_BASE_URL must be a root-relative path or valid URL.",
    );
  }

  return `${base}/${encodeObjectKey(objectKey)}`;
}
