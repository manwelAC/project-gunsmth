"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationItems } from "@/config/navigation";
import { MobileNavigation } from "./MobileNavigation";

export function GunsmthMark() {
  return (
    <span className="gunsmth-mark" aria-hidden="true">
      <span />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("armory");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["armory", "latest-drop", "about", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-brand" aria-label="Project Gunsmth home">
          <GunsmthMark />
          <span>Project Gunsmth</span>
        </Link>

        <nav className="site-navigation" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const section = item.href.split("#")[1];
            return (
              <Link
                href={item.href}
                key={item.href}
                data-active={section === activeSection}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-navigation">
        <MobileNavigation
          open={menuOpen}
          onNavigate={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}

