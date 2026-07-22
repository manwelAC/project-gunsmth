# Cloudflare R2 asset setup

Project Gunsmth uses a same-origin Next.js proxy by default:

```env
R2_ASSET_ORIGIN=https://your-public-r2-url.r2.dev
NEXT_PUBLIC_R2_ASSET_BASE_URL=/r2-assets
```

The browser requests `/r2-assets/<object-key>` from the same hostname as the website. Next.js then proxies that request to `R2_ASSET_ORIGIN`. Visitors therefore do not resolve `r2.dev`, and browser CORS does not apply. The proxy also enables Vercel rewrite caching for these responses.

Do not use the S3 API endpoint and do not expose account IDs, access keys, secret keys, or signed URLs to browser code. The public development URL is not a secret, but keeping it in the server-side `R2_ASSET_ORIGIN` variable prevents browsers from depending on that hostname.

## Optional CORS policy for direct R2 access

The proxy does not require an R2 CORS policy because asset requests are same-origin from the browser's perspective. Apply the policy below only if another browser application will access R2 directly.

Replace the production placeholder before applying this policy in the Cloudflare dashboard:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://your-production-domain.example"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "Range"
    ],
    "ExposeHeaders": [
      "Accept-Ranges",
      "Content-Length",
      "Content-Range",
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

The `Range`, `Accept-Ranges`, and `Content-Range` headers are important for seeking and partial loading of gameplay videos. GLB files need cross-origin `GET` access so the browser can load them into WebGL.

Recommended object metadata:

- `.glb`: `model/gltf-binary`
- `.webp`: `image/webp`
- `.mp4`: `video/mp4`

The current model objects may still load as `application/octet-stream`, but `model/gltf-binary` is the clearer content type.

## Public object layout used by the application

The first model records use the existing keys under `assault-rifles/`. Placeholder media records expect this structure as those assets are added:

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

If the bucket becomes private, browser-side signing must not be added. Private objects require a secure server-side signing route and a separate implementation decision.
