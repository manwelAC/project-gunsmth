const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const siteConfig = {
  name: "Project Gunsmth",
  shortName: "GUNSMTH",
  description:
    "An independent fan-made digital armory featuring interactive weapon studies and gameplay demonstrations.",
  url: configuredSiteUrl || "http://localhost:3000",
} as const;

