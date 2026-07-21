import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  firstLine: ReactNode;
  secondLine?: ReactNode;
  theme?: "dark" | "light";
  className?: string;
  id?: string;
}

export function SectionHeading({
  firstLine,
  secondLine,
  theme = "dark",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn("section-heading", `section-heading--${theme}`, className)}
      id={id}
    >
      <span>{firstLine}</span>
      {secondLine ? <span>{secondLine}</span> : null}
    </h2>
  );
}
