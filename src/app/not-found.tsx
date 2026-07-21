import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <div className="not-found__index">404</div>
      <div className="not-found__content">
        <p>Archive reference not found</p>
        <h1>File does not exist.</h1>
        <span>
          The requested weapon record is missing, restricted, or has moved to a
          new archive position.
        </span>
        <Link className="button button--primary" href="/">
          <span>Return to the armory</span>
          <span className="button__arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}

