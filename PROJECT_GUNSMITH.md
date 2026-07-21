# Project Gunsmth — Complete Next.js Build Prompt

Build a fresh Next.js application called **Project Gunsmth**.

Project Gunsmth is an independent Call of Duty: Mobile fan project that showcases weapons through interactive 3D GLB models, weapon information, and short gameplay demonstration videos.

The application must feel like a premium, cinematic digital armory—not a generic landing-page template.

---

## 1. Workflow and Approval Rules

Before making changes:

1. Inspect the fresh Next.js project structure.
2. Inspect `package.json` and identify the installed dependencies.
3. Explain the implementation plan.
4. List any missing packages.

Before installing any package:

1. Tell me the exact package names.
2. Explain why each package is needed.
3. Show the exact installation command.
4. Wait for my explicit approval.

Do not run any of the following without approval:

- `npm install`
- `npm update`
- `npx` commands that download packages
- dependency upgrades
- package-manager migrations

Do not silently replace a requested feature because its dependency is unavailable. Pause, explain the situation, and request approval.

---

## 2. Technology

Use:

- Next.js with the App Router
- TypeScript
- React
- Tailwind CSS
- Motion for React
- React Three Fiber
- Drei

Check whether these packages are installed before using them. Request approval before installing missing packages.

Do not add a backend, database, authentication system, CMS, upload manager, or admin dashboard yet.

Use Server Components by default. Add `"use client"` only to components requiring browser state, events, animation, filtering, video control, or WebGL.

---

## 3. Required File Architecture

Use a scalable, feature-oriented structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── weapons/
│       └── [slug]/
│           ├── page.tsx
│           ├── loading.tsx
│           └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── MobileNavigation.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SectionContainer.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ArchiveStatus.tsx
│   │   ├── ArmorySection.tsx
│   │   ├── LatestDropSection.tsx
│   │   └── AboutSection.tsx
│   │
│   ├── weapons/
│   │   ├── WeaponCard.tsx
│   │   ├── WeaponGrid.tsx
│   │   ├── WeaponFilters.tsx
│   │   ├── WeaponDetails.tsx
│   │   ├── WeaponStatistics.tsx
│   │   └── WeaponVideo.tsx
│   │
│   ├── three/
│   │   ├── WeaponViewer.tsx
│   │   ├── WeaponModel.tsx
│   │   ├── ViewerControls.tsx
│   │   ├── ViewerLoading.tsx
│   │   └── ViewerError.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── TechnicalLabel.tsx
│       ├── SectionHeading.tsx
│       ├── StatusIndicator.tsx
│       └── MediaPlaceholder.tsx
│
├── config/
│   ├── navigation.ts
│   └── site.ts
│
├── data/
│   └── weapons.ts
│
├── hooks/
│   ├── useMediaQuery.ts
│   ├── useReducedMotionPreference.ts
│   └── useWeaponFilters.ts
│
├── lib/
│   ├── assets/
│   │   ├── asset-url.ts
│   │   └── r2.ts
│   ├── constants.ts
│   └── utils.ts
│
└── types/
    ├── assets.ts
    └── weapon.ts
```

Responsibilities:

- `app`: routing, layouts, metadata, route loading states, and page composition.
- `components`: reusable UI and interactive features.
- `config`: public site and navigation configuration.
- `data`: temporary structured weapon records.
- `hooks`: reusable browser behavior.
- `lib`: R2 URL construction and application utilities.
- `types`: shared TypeScript definitions.

Do not put the entire application in `page.tsx`.

Do not create components merely to wrap a single element. Components should represent a meaningful layout, reusable interface element, or isolated interactive responsibility.

---

## 4. Global CSS Rules

Use one centralized stylesheet:

```text
src/app/globals.css
```

Do not create:

- CSS Modules
- Separate CSS files for individual components
- Inline `<style>` blocks
- Styled Components
- Emotion
- Other CSS-in-JS systems

Import `globals.css` only from the root layout.

The global stylesheet must contain:

- CSS reset and base rules
- Design tokens and CSS variables
- Typography
- Shared layout utilities
- Reusable component classes
- Section styling
- Animation keyframes
- Responsive breakpoints
- Focus states
- Reduced-motion overrides
- 3D viewer styles

Tailwind may be used for common layout utilities, but avoid enormous duplicated class strings. Put repeated visual patterns in reusable global classes or React components.

Use understandable class names such as:

```text
.site-header
.site-navigation
.hero
.hero__content
.hero__viewer
.technical-label
.button
.button--primary
.status-strip
.armory-grid
.weapon-card
.weapon-viewer
.latest-drop
.site-footer
```

Use a consistent naming convention. Do not generate random class names.

---

## 5. Cloudflare R2 Integration

I already have Cloudflare R2 object storage prepared.

Large assets must be loaded from R2, including:

- GLB models
- Weapon thumbnails
- Video poster images
- Gameplay demonstration videos

Do not store these large files in Git.

Do not hardcode:

- The R2 bucket URL
- The Cloudflare account ID
- Bucket names
- Custom asset domains
- Access keys
- Secret keys
- Signed URLs
- Full Cloudflare URLs inside components
- Full Cloudflare URLs inside weapon records

Use this public environment variable:

```text
NEXT_PUBLIC_R2_ASSET_BASE_URL
```

Create `.env.example`:

```env
NEXT_PUBLIC_R2_ASSET_BASE_URL=
```

The developer will create `.env.local`:

```env
NEXT_PUBLIC_R2_ASSET_BASE_URL=https://assets.example.com
```

Make sure `.env.local` is ignored by Git.

Only a public asset origin may use a `NEXT_PUBLIC_` variable. Never place Cloudflare credentials in a public environment variable.

Create one centralized URL builder in `src/lib/assets/r2.ts` or `asset-url.ts`.

It must:

- Read `NEXT_PUBLIC_R2_ASSET_BASE_URL`
- Remove trailing slashes from the origin
- Remove leading slashes from object keys
- Validate empty keys
- Encode path segments safely
- Preserve intentional object-key subdirectories
- Prevent malformed double slashes
- Return a helpful development error when configuration is missing

Example direction:

```ts
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_ASSET_BASE_URL;

export function getR2AssetUrl(objectKey: string): string {
  if (!R2_BASE_URL) {
    throw new Error("NEXT_PUBLIC_R2_ASSET_BASE_URL is not configured.");
  }

  if (!objectKey.trim()) {
    throw new Error("An R2 object key is required.");
  }

  const origin = R2_BASE_URL.replace(/\/+$/, "");
  const key = objectKey
    .replace(/^\/+/, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  return `${origin}/${key}`;
}
```

Components must never concatenate the R2 domain themselves.

Weapon records must store object keys:

```ts
assets: {
  modelKey: "models/assault/vx-9-reclaimer.glb",
  thumbnailKey: "images/weapons/vx-9-reclaimer.webp",
  posterKey: "images/posters/vx-9-reclaimer.webp",
  videoKey: "videos/demos/vx-9-reclaimer.mp4"
}
```

Recommended R2 structure:

```text
models/
├── assault/
├── smg/
├── shotgun/
├── sniper/
├── lmg/
├── marksman/
├── pistol/
├── launcher/
└── melee/

images/
├── weapons/
├── posters/
└── placeholders/

videos/
└── demos/
```

If the bucket is private, do not implement signing in browser code. Explain that private assets require a secure server-side signing route and request approval before adding it.

Document the R2 CORS configuration required for:

- The local-development origin
- The production domain
- `GET` and `HEAD`
- GLB requests
- Video requests and byte ranges

Do not modify Cloudflare settings automatically.

---

## 6. TypeScript Data Model

Create strict shared types:

```ts
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
  thumbnailKey: string;
  posterKey: string;
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

export interface Weapon {
  id: string;
  slug: string;
  name: string;
  weaponClass: WeaponClass;
  modelId: string;
  description: string;
  fireMode: string;
  buildFocus?: string;
  status: "draft" | "ready" | "updating";
  releaseDate?: string;
  assets: WeaponAssetKeys;
  statistics?: WeaponStatistics;
}
```

Use realistic placeholder records, but clearly identify them as demonstration data. Do not claim placeholder statistics are official COD Mobile values.

---

## 7. Complete Styling Direction

Create a premium futuristic **digital armory**.

The interface must feel:

- Dark
- Cinematic
- Industrial
- Technical
- High-end
- Modern
- Weapon-focused
- Precise
- Similar to a premium game archive or equipment-inspection interface

Use an asymmetric editorial composition. Avoid generic centered landing-page sections.

Do not reproduce the official Call of Duty interface. Do not use official logos, copied weapon skins, or copyrighted weapon renders as placeholders.

### Color Tokens

Define these variables in `globals.css`:

```css
:root {
  --color-background: #070809;
  --color-background-soft: #0a0b0c;
  --color-surface: #0e1012;
  --color-surface-raised: #151719;
  --color-text-primary: #f2efe8;
  --color-text-secondary: #8b8e91;
  --color-text-muted: #666a6d;
  --color-accent: #f04424;
  --color-accent-bright: #ff4b2b;
  --color-border: #292c2f;
  --color-border-hover: #52575a;
  --color-light-section: #f0ede6;
  --color-light-text: #111214;
}
```

Use red-orange only for:

- Primary actions
- Active navigation
- Selected filters
- Status indicators
- Technical marks
- Subtle model rim lighting
- Small emphasis text

Do not make entire sections orange.

### Typography

Use `next/font` where possible:

- Bebas Neue for oversized headings
- Space Grotesk for navigation, buttons, and interface copy
- IBM Plex Mono for model IDs and metadata
- Inter for paragraphs

Typography behavior:

- Major headings are uppercase and condensed
- Hero headings use a tight `0.84–0.9` line-height
- Use slightly negative tracking on display text
- Technical labels use wide tracking around `0.16em–0.32em`
- Use monospace for IDs, dates, statuses, and specifications
- Body text uses comfortable `1.6–1.8` line-height
- Use `clamp()` for responsive headline sizes
- Prevent text overflow at narrow widths

Suggested desktop hero headline:

```css
font-size: clamp(4.75rem, 7.6vw, 8.75rem);
line-height: 0.84;
letter-spacing: -0.035em;
```

### Spacing and Layout

Use an 8px spacing system.

Common values:

- 8px
- 16px
- 24px
- 32px
- 48px
- 64px
- 96px
- 120px

Use large intentional negative space. Avoid wrapping every item in a card.

Limit major content to a consistent maximum width while allowing the hero and status strip to span the viewport.

### Component Language

- Use sharp rectangular components
- Use 0–4px corner radii unless a circle has functional meaning
- Avoid pill-shaped buttons
- Use thin 1px borders
- Use technical corner brackets
- Use measurement ticks and leader lines sparingly
- Use subtle crosshair marks
- Use graphite gradients
- Use very restrained orange glow
- Use background grid lines at low opacity
- Avoid excessive glassmorphism
- Avoid excessive shadows
- Avoid constant neon animation
- Avoid generic gradient blobs
- Avoid a repetitive card-on-card appearance

### Buttons

Primary button:

- Solid red-orange background
- Light text
- Rectangular shape
- Uppercase label
- Monospace or interface typography
- Directional arrow
- Approximately 56–64px tall on desktop

Secondary button:

- Transparent dark background
- Gray technical border
- Light text
- Orange border on hover

Hover behavior:

- Move upward no more than 2–3px
- Move the arrow approximately 4px
- Do not use large scale animations

Focus behavior:

- Visible 2px outline
- High contrast
- 3px outline offset

---

## 8. Header

Create a transparent header over the hero.

Left:

- Geometric crosshair-style symbol
- `PROJECT GUNSMTH` wordmark

Right navigation:

- Armory
- Latest Drops
- About
- Contact

Styling:

- Approximately 72–76px tall
- Thin bottom border
- Uppercase navigation
- Wide tracking
- Small orange underline on the active item
- No rounded navigation container

Behavior:

- Change to a blurred, nearly black surface after scrolling
- Use an accessible mobile menu button
- Lock body scrolling while the mobile menu is open
- Close mobile navigation after selection
- Provide visible focus styles

---

## 9. Hero Section

Make the hero approximately one viewport tall.

Desktop layout:

- 44% content column
- 56% model-viewer column
- Headline anchored left
- Weapon dominates the center-right

Eyebrow:

```text
COD:M WEAPON ARCHIVE
```

Heading:

```text
EVERY WEAPON.
FORGED IN DETAIL.
```

Description:

```text
Explore interactive 3D weapon models and short in-game demonstrations, built for Call of Duty: Mobile fans and 3D enthusiasts.
```

Actions:

- `EXPLORE THE ARMORY`
- `VIEW LATEST DROP`

Hero styling:

- Near-black radial background
- Subtle illumination behind the weapon
- Perspective floor grid beneath the viewer
- Red-orange technical edge lighting
- Tiny measurement marks
- Sparse metadata callouts
- Thin decorative rule beneath the heading
- No large glowing blobs

Add these model callouts:

- Weapon Class
- Fire Mode
- Model Status
- Model ID
- Click + Drag to Rotate

Decorative callouts must not block model controls and should use `pointer-events: none` unless interactive.

---

## 10. Interactive Weapon Viewer

Use React Three Fiber and Drei.

Requirements:

- Load the GLB from an R2 object key
- Dynamically import the viewer with SSR disabled
- Use `Suspense`
- Show loading progress
- Show a useful error state
- Display an R2 poster image when WebGL or model loading fails
- Support pointer drag rotation
- Support wheel and pinch zoom
- Support touch interaction
- Use responsive camera positioning
- Limit device pixel ratio for performance
- Use restrained studio lighting
- Add subtle red-orange rim lighting
- Respect reduced-motion preferences
- Dispose of model resources correctly
- Do not render WebGL for catalog cards
- Prevent viewer gestures from hijacking mobile page scrolling

Do not use a CSS gun silhouette as the final model. A CSS or geometric placeholder is acceptable only when clearly marked as a temporary placeholder.

---

## 11. Archive Status Strip

Place the strip directly under the hero.

Include:

- Armory Status: Online
- Weapons Archived
- Latest Drop
- 3D Models: High Fidelity
- Built for: COD:M Fans

Styling:

- Full-width dark surface
- Top and bottom 1px borders
- Divided cells
- Small muted labels
- Larger monospace values
- Orange status dot
- Restrained signal-line animation

On small screens, use responsive stacking or horizontal scrolling without hiding important information.

---

## 12. Armory Section

Heading:

```text
CHOOSE YOUR
WEAPON CLASS.
```

Include a short description explaining that this is a growing archive of handcrafted 3D weapon studies.

Filters:

- All
- Assault
- SMG
- Shotgun
- Sniper
- LMG
- Marksman
- Pistol
- Launcher
- Melee

Display the result count beside each filter.

Selected filters must use more than color—for example an underline, border, or `aria-pressed` state.

Grid:

- Three columns on desktop
- Two columns on tablet
- One column on mobile

Weapon card contents:

- R2 thumbnail or poster
- Weapon name
- Weapon class
- Model ID
- Build focus
- Archive status
- Subtle index number
- `INSPECT MODEL` action

Card styling:

- Dark flat surface
- Sharp corners
- 1px border
- Large media region
- Technical metadata row
- Separate action row
- No excessive padding or rounding

Hover/focus:

- Raise no more than 5px
- Brighten border
- Reveal orange accent
- Keep a visible keyboard focus state

Do not initialize a Three.js canvas inside every card.

---

## 13. Weapon Detail Route

Create:

```text
/weapons/[slug]
```

Include:

- Weapon name
- Weapon class
- Model ID
- Interactive GLB viewer
- Poster fallback
- Description
- Fire mode
- Archive status
- Weapon statistics
- Short gameplay video
- Previous weapon
- Next weapon
- Back-to-armory action

Generate metadata from the weapon record.

Use the route-level `not-found.tsx` for unknown slugs.

---

## 14. Latest Drop Section

Use a split layout:

- Left: gameplay video
- Right: weapon information

Video requirements:

- URL resolved from an R2 object key
- R2 poster image
- No autoplay with sound
- `preload="metadata"`
- Native or accessible custom controls
- Keyboard support
- Error fallback
- Explicit aspect ratio
- Avoid downloading all videos on the catalog page
- Prepare for HTTP byte-range requests

Information:

- Latest Drop eyebrow
- Weapon name
- Description
- Weapon class
- Model ID
- Archive status
- `OPEN WEAPON FILE` action

Use a restrained scanning-line overlay without reducing video readability.

---

## 15. About Section

Create a strong tonal break using a warm light background.

Use:

- Background: `#f0ede6`
- Text: `#111214`
- Orange emphasis

Heading:

```text
BUILT BY A FAN.
FOR THE ARMORY.
```

Explain that Project Gunsmth is an independent showcase celebrating weapon design through original 3D asset work, interactive presentations, and short gameplay demonstrations.

Mention that GLB models, thumbnails, and gameplay clips are served from Cloudflare R2 so the Git repository remains lightweight as the archive grows.

---

## 16. Footer

Include:

- Project Gunsmth symbol and wordmark
- Navigation
- Portfolio and social-link placeholders
- Back-to-top action
- Fan-made disclaimer

Use this disclaimer exactly:

```text
Project Gunsmth is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by Activision.
```

---

## 17. Motion

Use Motion for React carefully.

Include:

- Staggered hero eyebrow, heading, description, and actions
- Heading lines entering from approximately 20px below
- Slow model idle movement
- Technical callout-line reveals
- Button-arrow movement of approximately 4px
- One-time card entrance animation
- Smooth filter transitions
- Restrained scanning line
- Subtle viewer rim-light pulse

Avoid:

- Excessive parallax
- Large scale animations
- Constant bouncing
- Bright flashing
- Animating every element
- Motion that delays content or navigation

Honor `prefers-reduced-motion` in both JavaScript and CSS.

---

## 18. Responsive Behavior

Desktop:

- Preserve the 44/56 hero composition
- Let the weapon viewer dominate the right side
- Keep annotations readable
- Use a three-column weapon grid

Tablet:

- Reduce headline sizes
- Reposition or hide low-priority annotations
- Use a two-column weapon grid
- Preserve useful negative space

Mobile:

- Stack hero content and model viewer
- Use a one-column weapon grid
- Stack hero actions
- Simplify model annotations
- Make controls at least 44×44px
- Prevent horizontal overflow
- Keep text readable below 375px wide
- Keep normal vertical scrolling available over the viewer
- Ensure the header and menu do not cover content

---

## 19. Accessibility

- Use semantic landmarks
- Maintain logical heading order
- Add visible keyboard focus states
- Use accessible labels
- Use `aria-expanded` for mobile navigation
- Use `aria-pressed` for filters
- Do not communicate status through color alone
- Provide image alt text
- Provide a text fallback for the 3D viewer
- Support keyboard navigation
- Use at least 44×44px touch targets
- Maintain sufficient contrast
- Respect reduced-motion preferences
- Announce filter-result changes when useful

---

## 20. Performance

- Use `next/image` for raster imagery
- Lazy-load GLB models
- Lazy-load videos
- Dynamically import Three.js code
- Avoid WebGL inside catalog cards
- Limit canvas DPR
- Use explicit media aspect ratios
- Prevent layout shifts
- Use loading skeletons
- Load only the hero asset needed above the fold
- Do not preload the full weapon archive
- Keep Client Components small
- Avoid unnecessary dependencies

---

## 21. Metadata and SEO

Add:

- Page title
- Description
- Open Graph metadata
- Twitter metadata
- Favicon placeholder
- Canonical-URL configuration placeholder
- Robots configuration appropriate for development

Never describe the website as official.

---

## 22. Implementation Order

After dependency approval:

1. Create the folder architecture.
2. Create shared TypeScript types.
3. Create placeholder weapon data using R2 object keys.
4. Create the R2 URL utility.
5. Create the global design system in `globals.css`.
6. Build layout components.
7. Build the hero.
8. Build the interactive model viewer.
9. Build the status strip.
10. Build filters, cards, and the armory grid.
11. Build the weapon detail route.
12. Build the latest-drop video section.
13. Build the about section and footer.
14. Add motion.
15. Complete responsive behavior.
16. Complete accessibility checks.
17. Run linting.
18. Run the production build.
19. Fix all TypeScript, linting, and build errors.

---

## 23. Completion Requirements

Do not mark the task complete if:

- The production build fails
- TypeScript errors remain
- Cloudflare URLs are hardcoded
- Cloudflare credentials appear in client code
- Large GLB or video files are committed
- Components concatenate R2 domains
- Every component has a separate CSS file
- The application is contained in one giant page component
- Mobile layouts overflow horizontally
- Filters cannot be operated by keyboard
- Missing models have no fallback

At completion, report:

- What was implemented
- The final file structure
- Dependencies installed
- Environment variables required
- R2 and CORS configuration required
- Local-development command
- Production-build command
- Placeholder assets or content I still need to replace