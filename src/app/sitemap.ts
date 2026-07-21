import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { weapons } from "@/data/weapons";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...weapons.map((weapon) => ({
      url: `${siteConfig.url}/weapons/${weapon.slug}`,
      lastModified: weapon.releaseDate ? new Date(weapon.releaseDate) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

