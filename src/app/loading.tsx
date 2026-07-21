export default function Loading() {
  return (
    <main className="route-loading" aria-label="Loading Project Gunsmth">
      <div>
        <span className="route-loading__mark" aria-hidden="true" />
        <p>Accessing armory archive</p>
        <span className="route-loading__bar" aria-hidden="true" />
      </div>
    </main>
  );
}

