import { DEMO_DATA_NOTICE } from "@/lib/constants";
import type { WeaponStatistics as WeaponStatisticsData } from "@/types/weapon";

interface WeaponStatisticsProps {
  statistics?: WeaponStatisticsData;
}

const statisticLabels: Array<{
  key: keyof WeaponStatisticsData;
  label: string;
}> = [
  { key: "damage", label: "Damage" },
  { key: "accuracy", label: "Accuracy" },
  { key: "range", label: "Range" },
  { key: "fireRate", label: "Fire rate" },
  { key: "mobility", label: "Mobility" },
  { key: "control", label: "Control" },
];

export function WeaponStatistics({ statistics }: WeaponStatisticsProps) {
  if (!statistics) {
    return <p className="weapon-statistics__empty">Statistics pending review.</p>;
  }

  return (
    <div className="weapon-statistics">
      <div className="weapon-statistics__grid">
        {statisticLabels.map(({ key, label }) => (
          <div className="weapon-stat" key={key}>
            <div className="weapon-stat__header">
              <span>{label}</span>
              <strong>{statistics[key].toString().padStart(2, "0")}</strong>
            </div>
            <div
              className="weapon-stat__track"
              role="meter"
              aria-label={label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={statistics[key]}
            >
              <span style={{ width: `${statistics[key]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="weapon-statistics__notice">{DEMO_DATA_NOTICE}</p>
    </div>
  );
}

