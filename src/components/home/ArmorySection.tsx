import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { WeaponGrid } from "@/components/weapons/WeaponGrid";

export function ArmorySection() {
  return (
    <section className="armory-section" id="armory" aria-labelledby="armory-title">
      <SectionContainer>
        <div className="section-intro">
          <div>
            <TechnicalLabel index="02">Browse the archive</TechnicalLabel>
            <SectionHeading
              id="armory-title"
              firstLine="Choose your"
              secondLine="weapon class."
              className="section-intro__heading"
            />
          </div>
          <div className="section-intro__copy">
            <span className="section-intro__rule" aria-hidden="true" />
            <p>
              A growing archive of handcrafted 3D weapon studies—built to be
              rotated, inspected, and experienced beyond a static render.
            </p>
          </div>
        </div>
        <WeaponGrid />
      </SectionContainer>
    </section>
  );
}
