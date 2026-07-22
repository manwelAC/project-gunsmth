import type { Weapon, WeaponClass } from "@/types/weapon";
import { assaultWeapons } from "./weapons/assault";
import { launcherWeapons } from "./weapons/launcher";
import { lmgWeapons } from "./weapons/lmg";
import { marksmanWeapons } from "./weapons/marksman";
import { meleeWeapons } from "./weapons/melee";
import { pistolWeapons } from "./weapons/pistol";
import { shotgunWeapons } from "./weapons/shotgun";
import { smgWeapons } from "./weapons/smg";
import { sniperWeapons } from "./weapons/sniper";

export {
  assaultWeapons,
  launcherWeapons,
  lmgWeapons,
  marksmanWeapons,
  meleeWeapons,
  pistolWeapons,
  shotgunWeapons,
  smgWeapons,
  sniperWeapons,
};

export const weaponsByClass: Readonly<
  Record<WeaponClass, readonly Weapon[]>
> = {
  assault: assaultWeapons,
  smg: smgWeapons,
  shotgun: shotgunWeapons,
  sniper: sniperWeapons,
  lmg: lmgWeapons,
  marksman: marksmanWeapons,
  pistol: pistolWeapons,
  launcher: launcherWeapons,
  melee: meleeWeapons,
};

export const weapons: readonly Weapon[] = [
  ...assaultWeapons,
  ...smgWeapons,
  ...shotgunWeapons,
  ...sniperWeapons,
  ...lmgWeapons,
  ...marksmanWeapons,
  ...pistolWeapons,
  ...launcherWeapons,
  ...meleeWeapons,
];

export const featuredWeapon = weapons[0];
export const latestWeapon = weapons[0];

export function getWeaponBySlug(slug: string): Weapon | undefined {
  return weapons.find((weapon) => weapon.slug === slug);
}

export function getAdjacentWeapons(slug: string): {
  previous: Weapon;
  next: Weapon;
} {
  const index = weapons.findIndex((weapon) => weapon.slug === slug);
  const safeIndex = index < 0 ? 0 : index;

  return {
    previous: weapons[(safeIndex - 1 + weapons.length) % weapons.length],
    next: weapons[(safeIndex + 1) % weapons.length],
  };
}
