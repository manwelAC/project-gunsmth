import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "draft" | "ready" | "updating" | "online";
  label?: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  return (
    <span className={cn("status-indicator", `status-indicator--${status}`)}>
      <span className="status-indicator__dot" aria-hidden="true" />
      {label || status}
    </span>
  );
}

