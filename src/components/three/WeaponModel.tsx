"use client";

import {
  Bounds,
  Center,
  Clone,
  Environment,
  Float,
  Html,
  Lightformer,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { getR2AssetUrl } from "@/lib/assets/r2";
import type { Weapon } from "@/types/weapon";
import { ViewerLoading } from "./ViewerLoading";

function ModelLoadingProgress() {
  const { progress } = useProgress();
  return (
    <Html center fullscreen>
      <ViewerLoading progress={progress} compact />
    </Html>
  );
}

function ModelAsset({ weapon }: { weapon: Weapon }) {
  const url = getR2AssetUrl(weapon.assets.modelKey);
  const { scene } = useGLTF(url);
  const reducedMotion = useReducedMotionPreference();
  const rotation = weapon.viewer?.rotation ?? [0, -0.45, 0];
  const scale = weapon.viewer?.scale ?? 1;

  return (
    <Float
      speed={reducedMotion ? 0 : 0.7}
      rotationIntensity={reducedMotion ? 0 : 0.04}
      floatIntensity={reducedMotion ? 0 : 0.09}
    >
      <Bounds fit clip observe margin={1.06}>
        <Center>
          <group rotation={rotation} scale={scale}>
            <Clone object={scene} />
          </group>
        </Center>
      </Bounds>
    </Float>
  );
}

export function WeaponCanvas({ weapon }: { weapon: Weapon }) {
  const mobile = useMediaQuery("(max-width: 700px)");
  const reducedMotion = useReducedMotionPreference();

  return (
    <Canvas
      dpr={mobile ? [1, 1.35] : [1, 1.75]}
      camera={{
        fov: mobile ? 38 : 32,
        near: 0.01,
        far: 100,
        position: mobile ? [0, 0.2, 6.5] : [0, 0.2, 5.5],
      }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.24;
      }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight
        intensity={1.35}
        color="#fff8e9"
        groundColor="#20272d"
      />
      <directionalLight
        position={[4, 6, 5]}
        intensity={4.2}
        color="#fff4df"
      />
      <directionalLight
        position={[-4, 2, 4]}
        intensity={2.6}
        color="#b8d5e8"
      />
      <spotLight
        position={[-4, 1, -5]}
        angle={0.52}
        penumbra={1}
        intensity={3.4}
        color="#f04424"
      />
      <spotLight
        position={[1, 5, 6]}
        angle={0.58}
        penumbra={0.9}
        intensity={2.8}
        color="#f2efe8"
      />
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3.5}
          color="#fff5e5"
          position={[0, 5, -6]}
          scale={[8, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#b8d8eb"
          position={[-5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[5, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#f04424"
          position={[5, 0, -2]}
          rotation-y={-Math.PI / 2}
          scale={[4, 1, 1]}
        />
      </Environment>
      <Suspense fallback={<ModelLoadingProgress />}>
        <ModelAsset weapon={weapon} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.06}
        minDistance={2.4}
        maxDistance={9}
        zoomSpeed={0.65}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.22}
      />
    </Canvas>
  );
}
