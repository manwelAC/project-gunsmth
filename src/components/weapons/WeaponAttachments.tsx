import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { countConfiguredAttachments } from "@/lib/utils";
import {
  GUNSMITH_ATTACHMENT_LIMIT,
  WEAPON_ATTACHMENT_CATEGORIES,
  type WeaponBuild,
} from "@/types/weapon";

interface WeaponAttachmentsProps {
  build: WeaponBuild;
}

export function WeaponAttachments({ build }: WeaponAttachmentsProps) {
  const configuredCount = countConfiguredAttachments(build.attachments);

  return (
    <div className="weapon-attachments">
      <div className="weapon-attachments__header">
        <div>
          <TechnicalLabel index="02">Attachments</TechnicalLabel>
          <h2>Gunsmith configuration.</h2>
        </div>
        <p
          className="weapon-attachments__count"
          aria-label={`${configuredCount} of ${GUNSMITH_ATTACHMENT_LIMIT} attachments configured`}
        >
          <strong>{configuredCount.toString().padStart(2, "0")}</strong>
          <span>
            / {GUNSMITH_ATTACHMENT_LIMIT.toString().padStart(2, "0")} equipped
          </span>
        </p>
      </div>

      <dl className="weapon-attachments__grid">
        {WEAPON_ATTACHMENT_CATEGORIES.map(({ key, label }, index) => {
          const attachment = build.attachments[key]?.trim();

          return (
            <div className="weapon-attachment" key={key}>
              <dt>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                {label}
              </dt>
              <dd className={attachment ? undefined : "weapon-attachment__empty"}>
                {attachment || "Open slot"}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
