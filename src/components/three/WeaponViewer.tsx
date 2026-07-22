"use client";

import dynamic from "next/dynamic";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Weapon } from "@/types/weapon";
import { ViewerControls } from "./ViewerControls";
import { ViewerError } from "./ViewerError";
import { ViewerLoading } from "./ViewerLoading";

const WeaponCanvas = dynamic(
  () => import("./WeaponModel").then((module) => module.WeaponCanvas),
  {
    ssr: false,
    loading: () => <ViewerLoading />,
  },
);

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("Weapon model failed to render", error, info);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

const subscribeToBrowserCapability = () => () => undefined;

function useViewerActivity() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );

    observer.observe(viewer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { viewerRef, active: isNearViewport && isPageVisible };
}

interface WeaponViewerProps {
  weapon: Weapon;
  compact?: boolean;
}

export function WeaponViewer({ weapon, compact = false }: WeaponViewerProps) {
  const webglAvailable = useSyncExternalStore(
    subscribeToBrowserCapability,
    supportsWebGL,
    () => false,
  );
  const [instance, setInstance] = useState(0);
  const { viewerRef, active } = useViewerActivity();

  const fallback = (
    <ViewerError
      posterKey={weapon.assets.posterKey}
      weaponName={weapon.name}
      reason={webglAvailable ? "model" : "webgl"}
      onRetry={webglAvailable ? () => setInstance((value) => value + 1) : undefined}
    />
  );

  return (
    <div ref={viewerRef} className="weapon-viewer" data-compact={compact}>
      <span className="weapon-viewer__corner weapon-viewer__corner--tl" aria-hidden="true" />
      <span className="weapon-viewer__corner weapon-viewer__corner--tr" aria-hidden="true" />
      <span className="weapon-viewer__corner weapon-viewer__corner--bl" aria-hidden="true" />
      <span className="weapon-viewer__corner weapon-viewer__corner--br" aria-hidden="true" />

      {webglAvailable ? (
        <ModelErrorBoundary key={instance} fallback={fallback}>
          <WeaponCanvas weapon={weapon} active={active} />
        </ModelErrorBoundary>
      ) : (
        fallback
      )}

      <ViewerControls weapon={weapon} compact={compact} />
      <p className="sr-only">
        Interactive 3D model of {weapon.name}. Drag to rotate it and use the
        mouse wheel or pinch gesture to zoom. A poster and description are
        available if the model cannot load.
      </p>
    </div>
  );
}
