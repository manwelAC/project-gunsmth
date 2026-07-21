import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("button", `button--${variant}`, className)}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      <span className="button__arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}

