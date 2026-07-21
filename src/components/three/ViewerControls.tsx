import type { Weapon } from "@/types/weapon";
import { formatWeaponClass } from "@/lib/utils";

interface ViewerControlsProps {
  weapon: Weapon;
  compact?: boolean;
}

export function ViewerControls({ weapon, compact = false }: ViewerControlsProps) {
  return (
    <div className="viewer-controls" data-compact={compact} aria-hidden="true">
      <div className="viewer-callout viewer-callout--class">
        <span>Weapon class</span>
        <strong>{formatWeaponClass(weapon.weaponClass)}</strong>
      </div>
      <div className="viewer-callout viewer-callout--mode">
        <span>Fire mode</span>
        <strong>{weapon.fireMode}</strong>
      </div>
      <div className="viewer-callout viewer-callout--status">
        <span>Model status</span>
        <strong>{weapon.status}</strong>
      </div>
      <div className="viewer-callout viewer-callout--id">
        <span>Model ID</span>
        <strong>{weapon.modelId}</strong>
      </div>
      <div className="viewer-controls__hint">
        <span className="viewer-controls__mouse" />
        Click + drag to rotate / Scroll to zoom
      </div>
    </div>
  );
}

