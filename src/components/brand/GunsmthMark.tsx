interface GunsmthMarkProps {
  className?: string;
}

export function GunsmthMark({ className }: GunsmthMarkProps) {
  return (
    <svg
      className={["gunsmth-mark", className].filter(Boolean).join(" ")}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="gunsmth-mark__frame"
        d="M21 4 5 20M5 28l16 16M27 44l16-16M43 20 27 4"
      />
      <path
        className="gunsmth-mark__reticle"
        d="M24 14 34 24 24 34 14 24Z"
      />
      <path
        className="gunsmth-mark__ticks"
        d="M24 0v9M24 39v9M0 24h9M39 24h9"
      />
      <rect className="gunsmth-mark__core" x="21" y="21" width="6" height="6" />
    </svg>
  );
}
