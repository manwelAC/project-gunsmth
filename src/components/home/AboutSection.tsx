import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <SectionContainer>
        <div className="about-section__header">
          <TechnicalLabel index="04">The project</TechnicalLabel>
          <span>Independent / Original / Growing</span>
        </div>

        <div className="about-section__grid">
          <SectionHeading
            id="about-title"
            firstLine={
              <>
                Built by <em className="about-section__name">Mxnwel.</em>
              </>
            }
            secondLine="For the armory."
            theme="light"
            className="about-section__title"
          />
          <div className="about-section__manifesto">
            <span>Creator statement / 01</span>
            <p>
              Project Gunsmth is an independent showcase celebrating weapon
              design through original 3D asset work, interactive presentations,
              and short gameplay demonstrations.
            </p>
          </div>

          <div className="about-section__creator">
            <div className="about-section__creator-meta">
              <strong>Mxnwel</strong>
              <span>COD:M player</span>
              <span>Active since 2020</span>
            </div>
            <p>
              Though he may have stepped away from the game, his passion for it
              has never faded. Bringing together a lasting love for COD:M and a
              drive to create thoughtful web experiences, he built Project
              Gunsmth to showcase Call of Duty: Mobile gunsmith builds in a new,
              interactive form.
            </p>
          </div>

          <div className="about-section__infrastructure">
            <span>Archive infrastructure</span>
            <p>
              GLB models, thumbnails, and gameplay clips are served from
              Cloudflare R2, keeping the repository lightweight while the
              archive continues to grow.
            </p>
          </div>
          <div className="about-section__signature">
            <span aria-hidden="true">+</span>
            <p>Crafted one weapon file at a time.</p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
