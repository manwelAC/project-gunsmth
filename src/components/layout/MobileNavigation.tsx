"use client";

import Link from "next/link";
import { navigationItems } from "@/config/navigation";

interface MobileNavigationProps {
  open: boolean;
  onNavigate: () => void;
}

export function MobileNavigation({
  open,
  onNavigate,
}: MobileNavigationProps) {
  return (
    <div className="mobile-navigation" data-open={open} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">
        {navigationItems.map((item, index) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={onNavigate}
            tabIndex={open ? 0 : -1}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <p>
        Independent archive
        <br />
        System status: online
      </p>
    </div>
  );
}

