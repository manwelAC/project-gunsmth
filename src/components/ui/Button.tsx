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
  const classes = cn("button", `button--${variant}`, className);
  const content = (
    <>
      <span>{children}</span>
      <span className="button__arrow" aria-hidden="true">
        ↗
      </span>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}
