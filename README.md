# Project Gunsmth

An independent, fan-made digital armory for exploring Call of Duty: Mobile weapon models and community gunsmith builds.

Project Gunsmth combines an editorial archive interface with interactive 3D weapon inspection, weapon statistics, attachment records, build credits, and gameplay media. Large assets are delivered from Cloudflare R2 so the application repository stays lightweight as the archive grows.

Created by **Mxnwel**, a COD:M player since 2020 and a web designer carrying his appreciation for the game into an interactive showcase.

## Features

- Interactive GLB weapon viewer with rotation, wheel or pinch zoom, bounded camera controls, and subtle idle motion
- Responsive armory with weapon-class filters and fully clickable weapon cards
- Statically generated detail pages at `/weapons/[slug]`
- Eight COD:M attachment categories with a five-attachment loadout limit
- Optional build attribution through `suggestedBy` and `suggestedAt`
- Weapon statistics, archive status, adjacent-weapon navigation, and gameplay-video slots
- Cloudflare R2 delivery for models, thumbnails, posters, and video
- Poster and descriptive fallbacks when WebGL or an external asset is unavailable
- Per-weapon metadata, sitemap, robots configuration, and accessible keyboard states
- Responsive layouts and reduced-motion support

## Technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4, custom CSS |
| 3D | Three.js, React Three Fiber, Drei |
| Motion | Motion for React |
| Asset storage | Cloudflare R2 |
| Fonts | Bebas Neue, Space Grotesk, IBM Plex Mono, Inter |

## Project structure

```text
src/
  app/                       App Router pages, metadata, and global styles
    weapons/[slug]/          Statically generated weapon detail route
  components/
    home/                    Homepage sections
    layout/                  Header, navigation, footer, and containers
    three/                   GLB viewer, controls, loading, and fallbacks
    ui/                      Reusable interface components
    weapons/                 Archive cards, filters, details, and statistics
  config/                    Site and navigation configuration
  data/
    weapons.ts               Combined weapon index and lookup helpers
    weapons/                 Records split by weapon class
      assault.ts
      smg.ts
      shotgun.ts
      sniper.ts
      lmg.ts
      marksman.ts
      pistol.ts
      launcher.ts
      melee.ts
  hooks/                     Media-query and accessibility hooks
  lib/assets/                R2 asset URL helpers
  types/weapon.ts            Weapon, build, attachment, and asset types

docs/
  R2_SETUP.md                R2 CORS, metadata, and object-layout guidance
```

## Requirements

- Node.js 20.9 or newer
- npm
- A public Cloudflare R2 development URL or custom asset domain
- A modern browser with WebGL support for interactive models

## Local development

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local`.

   macOS or Linux:

   ```bash
   cp .env.example .env.local
   ```

   Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Configure the public asset origin and site URL:

   ```env
   NEXT_PUBLIC_R2_ASSET_BASE_URL=https://your-public-r2-url.r2.dev
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Use the public `r2.dev` URL during development. For production, replace it with a custom public asset domain. Do not use the R2 S3 API endpoint here and never expose R2 access keys or secret keys through `NEXT_PUBLIC_` variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Turbopack development server |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Create and type-check the production build |
| `npm run start` | Serve an existing production build |

## Cloudflare R2 assets

Asset fields contain object keys rather than complete URLs. The application safely combines each key with `NEXT_PUBLIC_R2_ASSET_BASE_URL`.

The current bucket layout is:

```text
assault-rifles/
  AK47.glb
  ASM10.glb
  ASVAL.glb
  BP50.glb
  Grau.glb
  HVK.glb
  ak117.glb

thumbnails/
  ak47-thumbnail.jpg

videos/
  AK47-demo.mp4
```

R2 object keys are case-sensitive. For example, `assault-rifles/AK47.glb` and `assault-rifles/ak47.glb` are different objects.

Recommended content types:

- `.glb`: `model/gltf-binary`
- `.webp`: `image/webp`
- `.mp4`: `video/mp4`

See [Cloudflare R2 asset setup](docs/R2_SETUP.md) for the required CORS policy, video range headers, and production guidance.

## Adding or editing a weapon

Weapon records are maintained by class in [`src/data/weapons/`](src/data/weapons). For example, assault-rifle records belong in [`assault.ts`](src/data/weapons/assault.ts). Each record is collected by [`src/data/weapons.ts`](src/data/weapons.ts) and automatically produces an armory card and a statically generated weapon page.

```ts
{
  id: "PG-AR-008",
  slug: "weapon-slug",
  name: "Weapon Name",
  weaponClass: "assault",
  modelId: "AR / 008-H",
  description: "A concise description of the weapon and build.",
  fireMode: "Fully Automatic",
  build: {
    attachments: {
      muzzle: "Attachment name",
      barrel: "Attachment name",
      stock: "Attachment name",
      laser: "Attachment name",
      ammunition: "Attachment name",
    },
    suggestedBy: "Player name",
    suggestedAt: "2026-07-21",
  },
  status: "ready",
  releaseDate: "2026-07-21",
  assets: {
    modelKey: "assault-rifles/Weapon.glb",
    thumbnailKey: "thumbnails/weapon-thumbnail.jpg",
    posterKey: "posters/weapon-poster.jpg",
    videoKey: "videos/weapon-demo.mp4",
  },
  statistics: {
    damage: 70,
    accuracy: 65,
    range: 60,
    fireRate: 75,
    mobility: 70,
    control: 65,
  },
  viewer: {
    rotation: [0, -0.45, 0],
    scale: 1,
  },
}
```

The supported attachment keys are:

- `muzzle`
- `barrel`
- `optic`
- `stock`
- `laser`
- `underbarrel`
- `ammunition`
- `rearGrip`

Keep no more than five attachment values populated for a valid COD:M gunsmith build. Categories without an attachment can be omitted; the interface will display them as open slots. Build attribution is optional and falls back to an open-suggestion state.

The `thumbnailKey`, `posterKey`, `videoKey`, `statistics`, and `viewer` fields are optional. The application supplies visual or textual fallbacks where possible.

## Featured and latest weapons

The homepage selections are exported at the bottom of `src/data/weapons.ts`:

```ts
export const featuredWeapon = weapons[0];
export const latestWeapon = weapons[0];
```

Point either export at a different weapon record when the featured study or latest drop changes.

## Production

Set these environment variables in the hosting platform:

```env
NEXT_PUBLIC_R2_ASSET_BASE_URL=https://assets.your-domain.example
NEXT_PUBLIC_SITE_URL=https://your-site.example
```

Then verify and run the production server:

```bash
npm run lint
npm run build
npm run start
```

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs and metadata. The R2 public development URL is rate-limited, so a custom asset domain is recommended for a public production deployment.

## Project status

The archive currently contains seven assault-rifle models. Attachment records, thumbnails, posters, and gameplay demonstrations can be added independently as verified assets and build information become available.

## Disclaimer

Project Gunsmth is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Activision.

Call of Duty, Call of Duty: Mobile, and related names and assets belong to their respective owners.
