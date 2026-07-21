import type { WeaponClass } from "@/types/weapon";

export const WEAPON_CLASSES: readonly WeaponClass[] = [
  "assault",
  "smg",
  "shotgun",
  "sniper",
  "lmg",
  "marksman",
  "pistol",
  "launcher",
  "melee",
] as const;

export const WEAPON_CLASS_LABELS: Record<WeaponClass, string> = {
  assault: "Assault",
  smg: "SMG",
  shotgun: "Shotgun",
  sniper: "Sniper",
  lmg: "LMG",
  marksman: "Marksman",
  pistol: "Pistol",
  launcher: "Launcher",
  melee: "Melee",
};

export const DEMO_DATA_NOTICE =
  "Archive specifications are demonstration data and are not official Call of Duty: Mobile values.";

