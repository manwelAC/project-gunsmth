export default function WeaponLoading() {
  return (
    <main className="weapon-route-loading" aria-label="Loading weapon file">
      <div className="weapon-route-loading__copy">
        <span>Retrieving archive asset</span>
        <h1>Weapon file loading.</h1>
      </div>
      <div className="weapon-route-loading__viewer" aria-hidden="true">
        <span />
      </div>
    </main>
  );
}

