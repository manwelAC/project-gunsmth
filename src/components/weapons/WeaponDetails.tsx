import Link from "next/link";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { WeaponViewer } from "@/components/three/WeaponViewer";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { getAdjacentWeapons } from "@/data/weapons";
import {
  countConfiguredAttachments,
  formatArchiveDate,
  formatWeaponClass,
} from "@/lib/utils";
import { GUNSMITH_ATTACHMENT_LIMIT } from "@/types/weapon";
import type { Weapon } from "@/types/weapon";
import { WeaponAttachments } from "./WeaponAttachments";
import { WeaponStatistics } from "./WeaponStatistics";
import { WeaponVideo } from "./WeaponVideo";

interface WeaponDetailsProps {
  weapon: Weapon;
}

export function WeaponDetails({ weapon }: WeaponDetailsProps) {
  const { previous, next } = getAdjacentWeapons(weapon.slug);
  const attachmentCount = countConfiguredAttachments(weapon.build.attachments);

  return (
    <main className="weapon-file" id="main-content">
      <section className="weapon-file__hero" aria-labelledby="weapon-file-title">
        <div className="weapon-file__grid" aria-hidden="true" />
        <SectionContainer className="weapon-file__hero-container">
          <Link className="weapon-file__back" href="/#armory">
            <span aria-hidden="true">←</span> Back to armory
          </Link>

          <div className="weapon-file__intro">
            <TechnicalLabel index="File">Weapon dossier</TechnicalLabel>
            <p className="weapon-file__model-id">{weapon.modelId}</p>
            <h1 id="weapon-file-title">{weapon.name}</h1>
            <p className="weapon-file__lede">{weapon.description}</p>

            <dl className="weapon-file__quick-specs">
              <div>
                <dt>Class</dt>
                <dd>{formatWeaponClass(weapon.weaponClass)}</dd>
              </div>
              <div>
                <dt>Fire mode</dt>
                <dd>{weapon.fireMode}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd><StatusIndicator status={weapon.status} /></dd>
              </div>
            </dl>

            <div className="weapon-file__hero-actions">
              <Button href="#attachments">View attachments</Button>
              <Button href="#field-test" variant="secondary">Field test</Button>
            </div>
          </div>

          <div className="weapon-file__viewer" id="model-inspector">
            <div className="weapon-file__viewer-label" aria-hidden="true">
              <span>Interactive asset</span>
              <strong>360°</strong>
            </div>
            <WeaponViewer weapon={weapon} compact />
          </div>

          <span className="weapon-file__serial" aria-hidden="true">
            {weapon.id}
          </span>
        </SectionContainer>
      </section>

      <section className="weapon-dossier" aria-labelledby="specification-title">
        <SectionContainer>
          <div className="weapon-dossier__header">
            <TechnicalLabel index="01">Gunsmith overview</TechnicalLabel>
            <p>Community build / attachment specification</p>
          </div>

          <div className="weapon-dossier__layout">
            <div className="weapon-dossier__narrative">
              <h2 id="specification-title">Built for the match.</h2>
              <p>{weapon.description}</p>
              <blockquote>
                “Every gunsmith file records the full loadout and the player
                who put it forward.”
              </blockquote>
            </div>

            <dl className="weapon-dossier__specs">
              <div><dt>Archive ID</dt><dd>{weapon.id}</dd></div>
              <div><dt>Model ID</dt><dd>{weapon.modelId}</dd></div>
              <div><dt>Fire mode</dt><dd>{weapon.fireMode}</dd></div>
              <div><dt>Attachments</dt><dd>{attachmentCount} / {GUNSMITH_ATTACHMENT_LIMIT}</dd></div>
              <div><dt>Suggested by</dt><dd>{weapon.build.suggestedBy || "Open for suggestions"}</dd></div>
              <div>
                <dt>Suggested on</dt>
                <dd>
                  {weapon.build.suggestedAt ? (
                    <time dateTime={weapon.build.suggestedAt}>
                      {formatArchiveDate(weapon.build.suggestedAt)}
                    </time>
                  ) : (
                    formatArchiveDate()
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <WeaponAttachments build={weapon.build} />

          <div className="weapon-dossier__statistics">
            <div>
              <TechnicalLabel index="03">Demonstration values</TechnicalLabel>
              <h2>Performance profile.</h2>
            </div>
            <WeaponStatistics statistics={weapon.statistics} />
          </div>
        </SectionContainer>
      </section>

      <section className="weapon-field-test" id="field-test" aria-labelledby="field-test-title">
        <SectionContainer>
          <div className="weapon-field-test__heading">
            <TechnicalLabel index="04">Field test</TechnicalLabel>
            <h2 id="field-test-title">Gameplay demonstration.</h2>
            <p>
              Short, focused capture showing the weapon study in motion. No
              autoplay, no distractions—just the archive record.
            </p>
          </div>
          <WeaponVideo weapon={weapon} />
        </SectionContainer>
      </section>

      <nav className="weapon-pagination" aria-label="Adjacent weapon files">
        <Link href={`/weapons/${previous.slug}`}>
          <span>← Previous file</span>
          <strong>{previous.name}</strong>
          <small>{previous.modelId}</small>
        </Link>
        <Link href="/#armory" className="weapon-pagination__all">
          <span>Archive index</span>
          <strong>View all weapons</strong>
        </Link>
        <Link href={`/weapons/${next.slug}`}>
          <span>Next file →</span>
          <strong>{next.name}</strong>
          <small>{next.modelId}</small>
        </Link>
      </nav>
    </main>
  );
}
