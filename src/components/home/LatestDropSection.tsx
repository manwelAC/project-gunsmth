import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { WeaponVideo } from "@/components/weapons/WeaponVideo";
import { latestWeapon } from "@/data/weapons";
import {
  countConfiguredAttachments,
  formatWeaponClass,
} from "@/lib/utils";
import { GUNSMITH_ATTACHMENT_LIMIT } from "@/types/weapon";

export function LatestDropSection() {
  const attachmentCount = countConfiguredAttachments(
    latestWeapon.build.attachments,
  );

  return (
    <section className="latest-drop" id="latest-drop" aria-labelledby="latest-title">
      <SectionContainer className="latest-drop__container">
        <div className="latest-drop__media">
          <WeaponVideo weapon={latestWeapon} />
        </div>

        <div className="latest-drop__content">
          <TechnicalLabel index="03">Latest drop</TechnicalLabel>
          <p className="latest-drop__id">{latestWeapon.modelId}</p>
          <h2 id="latest-title">{latestWeapon.name}</h2>
          <p className="latest-drop__description">{latestWeapon.description}</p>

          <dl className="latest-drop__metadata">
            <div>
              <dt>Weapon class</dt>
              <dd>{formatWeaponClass(latestWeapon.weaponClass)}</dd>
            </div>
            <div>
              <dt>Archive status</dt>
              <dd><StatusIndicator status={latestWeapon.status} /></dd>
            </div>
            <div>
              <dt>Attachments</dt>
              <dd>{attachmentCount} / {GUNSMITH_ATTACHMENT_LIMIT} equipped</dd>
            </div>
          </dl>

          <Button href={`/weapons/${latestWeapon.slug}`}>Open weapon file</Button>
        </div>
      </SectionContainer>
    </section>
  );
}
