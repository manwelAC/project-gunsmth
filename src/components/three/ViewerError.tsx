import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

interface ViewerErrorProps {
  posterKey?: string;
  weaponName: string;
  onRetry?: () => void;
  reason?: "model" | "webgl";
}

export function ViewerError({
  posterKey,
  weaponName,
  onRetry,
  reason = "model",
}: ViewerErrorProps) {
  return (
    <div className="viewer-error">
      <MediaPlaceholder
        objectKey={posterKey}
        alt={`${weaponName} model poster fallback`}
        label="POSTER FILE PENDING"
        priority
        sizes="(max-width: 900px) 100vw, 56vw"
      />
      <div className="viewer-error__message">
        <p>{reason === "webgl" ? "WebGL unavailable" : "Model signal interrupted"}</p>
        <span>
          {reason === "webgl"
            ? "A compatible browser and graphics device are required for 3D inspection."
            : "The poster fallback is being shown while the GLB source is unavailable."}
        </span>
        {onRetry ? (
          <button type="button" onClick={onRetry}>
            Retry model
          </button>
        ) : null}
      </div>
    </div>
  );
}
