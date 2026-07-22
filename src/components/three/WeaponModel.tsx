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
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import {
  ACESFilmicToneMapping,
  Mesh,
  type Object3D,
  SRGBColorSpace,
} from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { getR2AssetUrl } from "@/lib/assets/r2";
import type { Weapon } from "@/types/weapon";
import type {
  ViewerFraming,
  ViewerLightingPreset,
  ViewerPresentation,
  ViewerSurfaceMode,
} from "@/types/viewer";
import { ViewerLoading } from "./ViewerLoading";

interface LightingConfiguration {
  background: string;
  ambient: number;
  hemisphere: number;
  hemisphereColor: string;
  groundColor: string;
  key: number;
  keyColor: string;
  fill: number;
  fillColor: string;
  rim: number;
  rimColor: string;
  top: number;
  topColor: string;
  environmentKey: number;
  environmentFill: number;
  environmentRim: number;
}

const LIGHTING: Record<ViewerLightingPreset, LightingConfiguration> = {
  studio: {
    background: "#08090a",
    ambient: 0.9,
    hemisphere: 1.35,
    hemisphereColor: "#fff8e9",
    groundColor: "#20272d",
    key: 4.2,
    keyColor: "#fff4df",
    fill: 2.6,
    fillColor: "#b8d5e8",
    rim: 3.4,
    rimColor: "#f04424",
    top: 2.8,
    topColor: "#f2efe8",
    environmentKey: 3.5,
    environmentFill: 2.5,
    environmentRim: 2.2,
  },
  tactical: {
    background: "#080705",
    ambient: 0.42,
    hemisphere: 0.82,
    hemisphereColor: "#ffd8bc",
    groundColor: "#120b08",
    key: 3.2,
    keyColor: "#ffd1b2",
    fill: 1.2,
    fillColor: "#78564c",
    rim: 5.6,
    rimColor: "#ff3b1f",
    top: 2.1,
    topColor: "#f3a478",
    environmentKey: 2.3,
    environmentFill: 1.1,
    environmentRim: 4.2,
  },
  cold: {
    background: "#060a0e",
    ambient: 0.62,
    hemisphere: 1.15,
    hemisphereColor: "#d8efff",
    groundColor: "#0d1720",
    key: 4.4,
    keyColor: "#d6f1ff",
    fill: 3.1,
    fillColor: "#65a9d2",
    rim: 3.8,
    rimColor: "#78d4ff",
    top: 2.4,
    topColor: "#eef9ff",
    environmentKey: 3.8,
    environmentFill: 3,
    environmentRim: 3.2,
  },
  silhouette: {
    background: "#030404",
    ambient: 0.08,
    hemisphere: 0.18,
    hemisphereColor: "#55616a",
    groundColor: "#020303",
    key: 0.38,
    keyColor: "#77848c",
    fill: 0.12,
    fillColor: "#27333b",
    rim: 8.2,
    rimColor: "#ff3b1f",
    top: 0.65,
    topColor: "#a6bbc5",
    environmentKey: 0.4,
    environmentFill: 0.2,
    environmentRim: 6.5,
  },
};

const FRAMING_MARGIN: Record<ViewerFraming, number> = {
  wide: 1.38,
  standard: 1.06,
  detail: 0.84,
};

function ModelLoadingProgress() {
  const { progress } = useProgress();

  return (
    <Html center fullscreen>
      <ViewerLoading progress={progress} compact />
    </Html>
  );
}

function SceneConfiguration({
  preset,
  captureEnabled,
  onCanvasReady,
}: {
  preset: ViewerLightingPreset;
  captureEnabled: boolean;
  onCanvasReady?: (canvas: HTMLCanvasElement | null) => void;
}) {
  const { gl } = useThree();
  const configuration = LIGHTING[preset];

  useEffect(() => {
    onCanvasReady?.(gl.domElement);
    return () => onCanvasReady?.(null);
  }, [gl, onCanvasReady]);

  return captureEnabled ? (
    <color attach="background" args={[configuration.background]} />
  ) : null;
}

function SceneLighting({ preset }: { preset: ViewerLightingPreset }) {
  const lighting = LIGHTING[preset];

  return (
    <>
      <ambientLight intensity={lighting.ambient} />
      <hemisphereLight
        intensity={lighting.hemisphere}
        color={lighting.hemisphereColor}
        groundColor={lighting.groundColor}
      />
      <directionalLight
        position={[4, 6, 5]}
        intensity={lighting.key}
        color={lighting.keyColor}
      />
      <directionalLight
        position={[-4, 2, 4]}
        intensity={lighting.fill}
        color={lighting.fillColor}
      />
      <spotLight
        position={[-4, 1, -5]}
        angle={0.52}
        penumbra={1}
        intensity={lighting.rim}
        color={lighting.rimColor}
      />
      <spotLight
        position={[1, 5, 6]}
        angle={0.58}
        penumbra={0.9}
        intensity={lighting.top}
        color={lighting.topColor}
      />
      <Environment resolution={128}>
        <Lightformer
          form="rect"
          intensity={lighting.environmentKey}
          color={lighting.keyColor}
          position={[0, 5, -6]}
          scale={[8, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={lighting.environmentFill}
          color={lighting.fillColor}
          position={[-5, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[5, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={lighting.environmentRim}
          color={lighting.rimColor}
          position={[5, 0, -2]}
          rotation-y={-Math.PI / 2}
          scale={[4, 1, 1]}
        />
      </Environment>
    </>
  );
}

function SurfaceModel({
  scene,
  surface,
}: {
  scene: Object3D;
  surface: ViewerSurfaceMode;
}) {
  if (surface === "material") {
    return <Clone object={scene} />;
  }

  const injectScanSurface = (object: Object3D) =>
    object instanceof Mesh ? (
      <meshStandardMaterial
        color="#11191c"
        metalness={0.72}
        roughness={0.26}
      />
    ) : null;
  const injectWireframe = (object: Object3D) =>
    object instanceof Mesh ? (
      <meshBasicMaterial
        color="#ff4a2c"
        wireframe
        transparent
        opacity={0.55}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    ) : null;

  return (
    <>
      <Clone object={scene} inject={injectScanSurface} />
      <Clone object={scene} scale={1.002} inject={injectWireframe} />
    </>
  );
}

function ModelAsset({
  weapon,
  inspection,
  framing,
  surface,
  onModelReady,
}: {
  weapon: Weapon;
  inspection: boolean;
  framing: ViewerFraming;
  surface: ViewerSurfaceMode;
  onModelReady?: () => void;
}) {
  const url = getR2AssetUrl(weapon.assets.modelKey);
  const { scene } = useGLTF(url);
  const reducedMotion = useReducedMotionPreference();
  const rotation = weapon.viewer?.rotation ?? [0, -0.45, 0];
  const scale = weapon.viewer?.scale ?? 1;

  useEffect(() => {
    onModelReady?.();
  }, [onModelReady]);

  return (
    <Float
      speed={inspection || reducedMotion ? 0 : 0.7}
      rotationIntensity={inspection || reducedMotion ? 0 : 0.04}
      floatIntensity={inspection || reducedMotion ? 0 : 0.09}
    >
      <Bounds
        key={`${framing}-${surface}`}
        fit
        clip
        observe
        margin={FRAMING_MARGIN[framing]}
      >
        <Center>
          <group rotation={rotation} scale={scale}>
            <SurfaceModel scene={scene} surface={surface} />
          </group>
        </Center>
      </Bounds>
    </Float>
  );
}

export function WeaponCanvas({
  weapon,
  active = true,
  inspection = false,
  captureEnabled = false,
  presentation,
  onCanvasReady,
  onModelReady,
}: {
  weapon: Weapon;
  active?: boolean;
  inspection?: boolean;
  captureEnabled?: boolean;
  presentation?: ViewerPresentation;
  onCanvasReady?: (canvas: HTMLCanvasElement | null) => void;
  onModelReady?: () => void;
}) {
  const mobile = useMediaQuery("(max-width: 700px)");
  const reducedMotion = useReducedMotionPreference();
  const lighting = presentation?.lighting ?? "studio";
  const surface = presentation?.surface ?? "material";
  const framing = presentation?.framing ?? "standard";
  const autoRotate = (presentation?.autoRotate ?? true) && !reducedMotion;
  const autoRotateSpeed = presentation?.autoRotateSpeed ?? 0.22;

  return (
    <Canvas
      dpr={mobile ? [1, 1.2] : [1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{
        fov: mobile ? 38 : 32,
        near: 0.01,
        far: 100,
        position: mobile ? [0, 0.2, 6.5] : [0, 0.2, 5.5],
      }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: captureEnabled,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.24;
      }}
    >
      <SceneConfiguration
        preset={lighting}
        captureEnabled={captureEnabled}
        onCanvasReady={onCanvasReady}
      />
      <SceneLighting preset={lighting} />
      <Suspense fallback={<ModelLoadingProgress />}>
        <ModelAsset
          weapon={weapon}
          inspection={inspection}
          framing={framing}
          surface={surface}
          onModelReady={onModelReady}
        />
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
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
      />
    </Canvas>
  );
}
