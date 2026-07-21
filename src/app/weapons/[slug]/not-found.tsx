import Link from "next/link";

export default function WeaponNotFound() {
  return (
    <main className="not-found not-found--weapon" id="main-content">
      <div className="not-found__index">NO FILE</div>
      <div className="not-found__content">
        <p>Unknown weapon reference</p>
        <h1>Weapon file unavailable.</h1>
        <span>
          This slug does not match a record in the current Project Gunsmth archive.
        </span>
        <Link className="button button--primary" href="/#armory">
          <span>Browse active files</span>
          <span className="button__arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}

