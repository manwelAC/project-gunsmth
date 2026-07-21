import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechnicalLabelProps {
  children: ReactNode;
  className?: string;
  index?: string;
}

export function TechnicalLabel({
  children,
  className,
  index,
}: TechnicalLabelProps) {
  return (
    <p className={cn("technical-label", className)}>
      {index ? <span aria-hidden="true">{index}</span> : null}
      {children}
    </p>
  );
}

