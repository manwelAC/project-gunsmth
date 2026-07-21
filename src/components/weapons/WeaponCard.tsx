"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import {
  countConfiguredAttachments,
  formatWeaponClass,
} from "@/lib/utils";
import { GUNSMITH_ATTACHMENT_LIMIT } from "@/types/weapon";
import type { Weapon } from "@/types/weapon";

interface WeaponCardProps {
  weapon: Weapon;
  index: number;
}

export function WeaponCard({ weapon, index }: WeaponCardProps) {
  const reducedMotion = useReducedMotion();
  const attachmentCount = countConfiguredAttachments(weapon.build.attachments);

  return (
    <motion.article
      layout={!reducedMotion}
      className="weapon-card"
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: reducedMotion ? 0 : 0.48,
        delay: Math.min(index * 0.06, 0.24),
      }}
    >
      <Link
        className="weapon-card__link"
        href={`/weapons/${weapon.slug}`}
        aria-label={`Open ${weapon.name} weapon file`}
      >
        <div className="weapon-card__media">
          <MediaPlaceholder
            objectKey={weapon.assets.thumbnailKey}
            alt={`${weapon.name} archive thumbnail`}
            label={`${weapon.name} / IMAGE PENDING`}
          />
          <span className="weapon-card__index" aria-hidden="true">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <span className="weapon-card__class">
            {formatWeaponClass(weapon.weaponClass)}
          </span>
        </div>

        <div className="weapon-card__heading">
          <div>
            <p>{weapon.modelId}</p>
            <h3>{weapon.name}</h3>
          </div>
          <StatusIndicator status={weapon.status} />
        </div>

        <div className="weapon-card__metadata">
          <span>Attachments</span>
          <strong>{attachmentCount} / {GUNSMITH_ATTACHMENT_LIMIT} equipped</strong>
        </div>

        <div className="weapon-card__action" aria-hidden="true">
          <span>Inspect model</span>
          <span>↗</span>
        </div>
      </Link>
    </motion.article>
  );
}
