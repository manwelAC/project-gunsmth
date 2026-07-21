export type WeaponClass =
  | "assault"
  | "smg"
  | "shotgun"
  | "sniper"
  | "lmg"
  | "marksman"
  | "pistol"
  | "launcher"
  | "melee";

export interface WeaponAssetKeys {
  modelKey: string;
  thumbnailKey?: string;
  posterKey?: string;
  videoKey?: string;
}

export interface WeaponStatistics {
  damage: number;
  accuracy: number;
  range: number;
  fireRate: number;
  mobility: number;
  control: number;
}

export interface WeaponViewerPreset {
  rotation?: [number, number, number];
  scale?: number;
}

export const WEAPON_ATTACHMENT_CATEGORIES = [
  { key: "muzzle", label: "Muzzle" },
  { key: "barrel", label: "Barrel" },
  { key: "optic", label: "Optic" },
  { key: "stock", label: "Stock" },
  { key: "laser", label: "Laser" },
  { key: "underbarrel", label: "Underbarrel" },
  { key: "ammunition", label: "Ammunition" },
  { key: "rearGrip", label: "Rear Grip" },
] as const;

export const GUNSMITH_ATTACHMENT_LIMIT = 5;

export type WeaponAttachmentCategory =
  (typeof WEAPON_ATTACHMENT_CATEGORIES)[number]["key"];

export interface WeaponBuild {
  attachments: Partial<Record<WeaponAttachmentCategory, string>>;
  suggestedBy?: string;
  suggestedAt?: string;
}

export interface Weapon {
  id: string;
  slug: string;
  name: string;
  weaponClass: WeaponClass;
  modelId: string;
  description: string;
  fireMode: string;
  build: WeaponBuild;
  status: "draft" | "ready" | "updating";
  releaseDate?: string;
  assets: WeaponAssetKeys;
  statistics?: WeaponStatistics;
  viewer?: WeaponViewerPreset;
}
