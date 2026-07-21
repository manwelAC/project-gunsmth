"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { WeaponViewer } from "@/components/three/WeaponViewer";
import { featuredWeapon } from "@/data/weapons";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.08 }}
        >
          <TechnicalLabel index="01">COD:M Weapon Archive</TechnicalLabel>
        </motion.div>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__title-clip">
            <motion.span
              initial={reducedMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.15 }}
            >
              Every Weapon.
            </motion.span>
          </span>
          <span className="hero__title-clip hero__title-clip--accent">
            <motion.span
              initial={reducedMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.24 }}
            >
              Forged in Detail.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero__rule"
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...transition, delay: 0.36 }}
        />

        <motion.p
          className="hero__description"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.34 }}
        >
          Explore interactive 3D weapon models and short in-game demonstrations,
          built for Call of Duty: Mobile fans and 3D enthusiasts.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.43 }}
        >
          <Button href="#armory">Explore the armory</Button>
          <Button href="#latest-drop" variant="secondary">
            View latest drop
          </Button>
        </motion.div>

        <motion.div
          className="hero__footnote"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.65 }}
        >
          <span>Archive build 01.07</span>
          <span>Independent fan project</span>
        </motion.div>
      </div>

      <motion.div
        className="hero__viewer"
        initial={reducedMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transition, duration: reducedMotion ? 0 : 1, delay: 0.2 }}
      >
        <div className="hero__viewer-index" aria-hidden="true">
          <span>Featured study</span>
          <strong>{featuredWeapon.name}</strong>
        </div>
        <WeaponViewer weapon={featuredWeapon} />
      </motion.div>
    </section>
  );
}

