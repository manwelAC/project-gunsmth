"use client";

import { useMemo, useState } from "react";
import { weapons } from "@/data/weapons";
import { WEAPON_CLASSES } from "@/lib/constants";
import type { WeaponClass } from "@/types/weapon";

export type WeaponFilter = "all" | WeaponClass;

export function useWeaponFilters() {
  const [activeFilter, setActiveFilter] = useState<WeaponFilter>("all");

  const counts = useMemo(() => {
    const classCounts = Object.fromEntries(
      WEAPON_CLASSES.map((weaponClass) => [
        weaponClass,
        weapons.filter((weapon) => weapon.weaponClass === weaponClass).length,
      ]),
    ) as Record<WeaponClass, number>;

    return { all: weapons.length, ...classCounts };
  }, []);

  const filteredWeapons = useMemo(
    () =>
      activeFilter === "all"
        ? weapons
        : weapons.filter((weapon) => weapon.weaponClass === activeFilter),
    [activeFilter],
  );

  return { activeFilter, setActiveFilter, filteredWeapons, counts };
}

