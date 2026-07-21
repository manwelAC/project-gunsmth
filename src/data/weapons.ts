import type { Weapon } from "@/types/weapon";

export const weapons: readonly Weapon[] = [
  {
    id: "PG-AR-001",
    slug: "ak-47",
    name: "AK-47",
    weaponClass: "assault",
    modelId: "AR / 001-A",
    description:
      "A close study of a legendary rifle silhouette, presented as a responsive real-time asset with a focus on stamped geometry, functional proportions, and material separation.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-21",
    assets: {
      modelKey: "assault-rifles/AK47.glb",
    },
    statistics: {
      damage: 78,
      accuracy: 67,
      range: 71,
      fireRate: 64,
      mobility: 59,
      control: 62,
    },
    viewer: { rotation: [0, -0.55, 0], scale: 1 },
  },
  {
    id: "PG-AR-002",
    slug: "asm10",
    name: "ASM10",
    weaponClass: "assault",
    modelId: "AR / 002-B",
    description:
      "A high-impact assault platform study balancing a dense receiver assembly with a strong, readable long-form profile.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-18",
    assets: {
      modelKey: "assault-rifles/ASM10.glb",
    },
    statistics: { damage: 74, accuracy: 64, range: 69, fireRate: 60, mobility: 57, control: 61 },
  },
  {
    id: "PG-AR-003",
    slug: "as-val",
    name: "AS VAL",
    weaponClass: "assault",
    modelId: "AR / 003-C",
    description:
      "An integrated-suppressor weapon study exploring compact massing, dark material response, and a tightly controlled tactical silhouette.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-15",
    assets: {
      modelKey: "assault-rifles/ASVAL.glb",
    },
    statistics: { damage: 72, accuracy: 65, range: 54, fireRate: 77, mobility: 72, control: 58 },
  },
  {
    id: "PG-AR-004",
    slug: "bp50",
    name: "BP50",
    weaponClass: "assault",
    modelId: "AR / 004-D",
    description:
      "A compact bullpup-inspired study shaped around high-tempo handling, layered hard-surface forms, and a clean studio presentation.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-12",
    assets: {
      modelKey: "assault-rifles/BP50.glb",
    },
    statistics: { damage: 61, accuracy: 70, range: 60, fireRate: 88, mobility: 75, control: 69 },
  },
  {
    id: "PG-AR-005",
    slug: "grau-556",
    name: "GRAU 5.56",
    weaponClass: "assault",
    modelId: "AR / 005-E",
    description:
      "A modular rifle study emphasizing a slim front assembly, controlled surface wear, and precise mechanical transitions.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-09",
    assets: {
      modelKey: "assault-rifles/Grau.glb",
    },
    statistics: { damage: 66, accuracy: 76, range: 72, fireRate: 70, mobility: 66, control: 76 },
  },
  {
    id: "PG-AR-006",
    slug: "hvk-30",
    name: "HVK-30",
    weaponClass: "assault",
    modelId: "AR / 006-F",
    description:
      "A contemporary rifle study using contrasting material zones and a compact, forward-driven visual rhythm.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "updating",
    releaseDate: "2026-07-06",
    assets: {
      modelKey: "assault-rifles/HVK.glb",
    },
    statistics: { damage: 65, accuracy: 71, range: 63, fireRate: 79, mobility: 69, control: 68 },
  },
  {
    id: "PG-AR-007",
    slug: "ak117",
    name: "AK117",
    weaponClass: "assault",
    modelId: "AR / 007-G",
    description:
      "A lightweight assault-rifle study designed around speed, compact detailing, and a clean visual read from every inspection angle.",
    fireMode: "Fully Automatic",
    build: { attachments: {} },
    status: "ready",
    releaseDate: "2026-07-03",
    assets: {
      modelKey: "assault-rifles/ak117.glb",
    },
    statistics: { damage: 60, accuracy: 73, range: 62, fireRate: 83, mobility: 74, control: 72 },
  },
] as const;

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
