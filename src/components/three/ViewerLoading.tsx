interface ViewerLoadingProps {
  progress?: number;
  compact?: boolean;
}

export function ViewerLoading({
  progress = 0,
  compact = false,
}: ViewerLoadingProps) {
  const roundedProgress = Math.round(progress);

  return (
    <div className="viewer-loading" data-compact={compact} role="status">
      <span className="viewer-loading__reticle" aria-hidden="true" />
      <div className="viewer-loading__copy">
        <span>Loading model geometry</span>
        <span>{roundedProgress.toString().padStart(2, "0")}%</span>
      </div>
      <span className="viewer-loading__track" aria-hidden="true">
        <span style={{ width: `${roundedProgress}%` }} />
      </span>
    </div>
  );
}

