import { AboutSection } from "@/components/home/AboutSection";
import { ArchiveStatus } from "@/components/home/ArchiveStatus";
import { ArmorySection } from "@/components/home/ArmorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestDropSection } from "@/components/home/LatestDropSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ArchiveStatus />
      <ArmorySection />
      <LatestDropSection />
      <AboutSection />
    </main>
  );
}

