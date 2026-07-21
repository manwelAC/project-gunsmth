import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { latestWeapon, weapons } from "@/data/weapons";

const statusItems = [
  { label: "Armory status", value: <StatusIndicator key="online" status="online" label="Online" /> },
  { label: "Weapons archived", value: weapons.length.toString().padStart(2, "0") },
  { label: "Latest drop", value: latestWeapon.name },
  { label: "3D models", value: "High fidelity" },
  { label: "Built for", value: "COD:M fans" },
];

export function ArchiveStatus() {
  return (
    <section className="status-strip" aria-label="Archive status">
      <div className="status-strip__track">
        {statusItems.map((item) => (
          <div className="status-strip__item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

