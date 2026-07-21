"use client";

import { useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { getR2AssetUrl } from "@/lib/assets/r2";
import type { Weapon } from "@/types/weapon";

interface WeaponVideoProps {
  weapon: Weapon;
}

export function WeaponVideo({ weapon }: WeaponVideoProps) {
  const [failed, setFailed] = useState(false);
  const videoKey = weapon.assets.videoKey;
  const posterUrl = weapon.assets.posterKey
    ? getR2AssetUrl(weapon.assets.posterKey)
    : undefined;

  if (!videoKey || failed) {
    return (
      <div className="weapon-video weapon-video--fallback">
        <MediaPlaceholder
          objectKey={weapon.assets.posterKey}
          alt={`${weapon.name} gameplay demonstration poster`}
          label="GAMEPLAY CAPTURE PENDING"
          sizes="(max-width: 900px) 100vw, 58vw"
        />
        <span className="weapon-video__scan" aria-hidden="true" />
        <p>Gameplay demonstration pending archive upload</p>
      </div>
    );
  }

  return (
    <div className="weapon-video">
      <video
        controls
        playsInline
        preload="metadata"
        poster={posterUrl}
        onError={() => setFailed(true)}
      >
        <source src={getR2AssetUrl(videoKey)} type="video/mp4" />
        Your browser does not support the video element.
      </video>
      <span className="weapon-video__scan" aria-hidden="true" />
      <div className="weapon-video__hud" aria-hidden="true">
        <span>Field test / 01</span>
        <span>00:30 MAX</span>
      </div>
    </div>
  );
}
