"use client";

import Image from "next/image";
import { useState } from "react";
import { getR2AssetUrl } from "@/lib/assets/r2";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  objectKey?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function MediaPlaceholder({
  objectKey,
  alt,
  label = "MEDIA FILE PENDING",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: MediaPlaceholderProps) {
  const src = objectKey ? getR2AssetUrl(objectKey) : null;
  const [failedSource, setFailedSource] = useState<string | null>(null);

  const failed = !src || failedSource === src;

  return (
    <div className={cn("media-placeholder", className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          onError={() => setFailedSource(src)}
        />
      ) : (
        <div className="media-placeholder__fallback" role="img" aria-label={alt}>
          <span className="media-placeholder__reticle" aria-hidden="true" />
          <span className="media-placeholder__silhouette" aria-hidden="true" />
          <span className="media-placeholder__label">{label}</span>
        </div>
      )}
    </div>
  );
}
