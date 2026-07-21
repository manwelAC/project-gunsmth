import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeaponDetails } from "@/components/weapons/WeaponDetails";
import { getWeaponBySlug, weapons } from "@/data/weapons";
import { getR2AssetUrl } from "@/lib/assets/r2";

interface WeaponPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export async function generateMetadata({
  params,
}: WeaponPageProps): Promise<Metadata> {
  const { slug } = await params;
  const weapon = getWeaponBySlug(slug);

  if (!weapon) {
    return { title: "Weapon File Not Found" };
  }

  const posterImage = weapon.assets.posterKey
    ? [
        {
          url: getR2AssetUrl(weapon.assets.posterKey),
          width: 1600,
          height: 900,
          alt: `${weapon.name} weapon study`,
        },
      ]
    : undefined;

  return {
    title: `${weapon.name} Weapon File`,
    description: weapon.description,
    alternates: { canonical: `/weapons/${weapon.slug}` },
    openGraph: {
      title: `${weapon.name} — Project Gunsmth`,
      description: weapon.description,
      images: posterImage,
    },
  };
}

export default async function WeaponPage({ params }: WeaponPageProps) {
  const { slug } = await params;
  const weapon = getWeaponBySlug(slug);

  if (!weapon) notFound();

  return <WeaponDetails weapon={weapon} />;
}
