"use client";

import type { WeaponFilter } from "@/hooks/useWeaponFilters";
import { WEAPON_CLASSES, WEAPON_CLASS_LABELS } from "@/lib/constants";

interface WeaponFiltersProps {
  activeFilter: WeaponFilter;
  counts: Record<WeaponFilter, number>;
  onChange: (filter: WeaponFilter) => void;
}

export function WeaponFilters({
  activeFilter,
  counts,
  onChange,
}: WeaponFiltersProps) {
  const filters: Array<{ value: WeaponFilter; label: string }> = [
    { value: "all", label: "All" },
    ...WEAPON_CLASSES.map((value) => ({
      value,
      label: WEAPON_CLASS_LABELS[value],
    })),
  ];

  return (
    <div className="weapon-filters" aria-label="Filter weapons by class">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter.value}
          aria-pressed={activeFilter === filter.value}
          onClick={() => onChange(filter.value)}
        >
          <span>{filter.label}</span>
          <sup>{counts[filter.value].toString().padStart(2, "0")}</sup>
        </button>
      ))}
    </div>
  );
}

