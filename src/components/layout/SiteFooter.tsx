import Link from "next/link";
import { navigationItems } from "@/config/navigation";
import { GunsmthMark } from "./SiteHeader";
import { SectionContainer } from "./SectionContainer";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <SectionContainer>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <GunsmthMark />
            <p>Project Gunsmth</p>
            <span>Independent digital armory / Est. 2026</span>
          </div>

          <nav className="site-footer__navigation" aria-label="Footer navigation">
            {navigationItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__links">
            <p>External</p>
            <a href="#contact" aria-label="Portfolio link placeholder">
              Portfolio ↗
            </a>
            <a href="#contact" aria-label="Social link placeholder">
              Social ↗
            </a>
          </div>

          <a className="back-to-top" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="site-footer__bottom">
          <p>
            Project Gunsmth is an independent fan-made project and is not
            affiliated with, endorsed by, or sponsored by Activision.
          </p>
          <p>© 2026 / ALL ORIGINAL 3D WORK RESERVED</p>
        </div>
      </SectionContainer>
    </footer>
  );
}

