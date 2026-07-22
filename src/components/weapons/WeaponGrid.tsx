"use client";

import { AnimatePresence, motion } from "motion/react";
import { useWeaponFilters } from "@/hooks/useWeaponFilters";
import { WeaponCard } from "./WeaponCard";
import { WeaponFilters } from "./WeaponFilters";

export function WeaponGrid() {
  const { activeFilter, setActiveFilter, filteredWeapons, counts } =
    useWeaponFilters();

  return (
    <div className="weapon-grid-shell">
      <WeaponFilters
        activeFilter={activeFilter}
        counts={counts}
        onChange={setActiveFilter}
      />
      <p className="sr-only" aria-live="polite">
        Showing {filteredWeapons.length} weapon
        {filteredWeapons.length === 1 ? "" : "s"}.
      </p>
      <motion.div layout className="armory-grid">
        <AnimatePresence mode="popLayout">
          {filteredWeapons.map((weapon, index) => (
            <WeaponCard key={weapon.id} weapon={weapon} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
      {!filteredWeapons.length ? (
        <div className="armory-empty">
          <span>00</span>
          <p>No files in this class yet.</p>
          <button type="button" onClick={() => setActiveFilter("all")}>
            Return to all weapons
          </button>
        </div>
      ) : null}
    </div>
  );
}
