"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GunsmthMark } from "@/components/brand/GunsmthMark";
import { formatWeaponClass } from "@/lib/utils";
import type { Weapon } from "@/types/weapon";
import type {
  ViewerAspect,
  ViewerFraming,
  ViewerLightingPreset,
  ViewerPresentation,
  ViewerSurfaceMode,
} from "@/types/viewer";
import { WeaponViewer } from "./WeaponViewer";

const LIGHTING_OPTIONS: Array<{
  value: ViewerLightingPreset;
  label: string;
}> = [
  { value: "studio", label: "Studio" },
  { value: "tactical", label: "Tactical" },
  { value: "cold", label: "Cold light" },
  { value: "silhouette", label: "Silhouette" },
];

const SURFACE_OPTIONS: Array<{
  value: ViewerSurfaceMode;
  label: string;
}> = [
  { value: "material", label: "Material" },
  { value: "scan", label: "Tech scan" },
];

const FRAMING_OPTIONS: Array<{
  value: ViewerFraming;
  label: string;
}> = [
  { value: "wide", label: "Wide" },
  { value: "standard", label: "Standard" },
  { value: "detail", label: "Detail" },
];

const ASPECT_OPTIONS: Array<{
  value: ViewerAspect;
  label: string;
  ratio: string;
}> = [
  { value: "landscape", label: "Desktop", ratio: "16:9" },
  { value: "square", label: "Square", ratio: "1:1" },
  { value: "portrait", label: "Mobile", ratio: "9:16" },
];

const INITIAL_PRESENTATION: ViewerPresentation = {
  lighting: "studio",
  surface: "material",
  framing: "standard",
  autoRotate: true,
  autoRotateSpeed: 0.55,
};

interface WeaponInspectionModeProps {
  weapon: Weapon;
}

export function WeaponInspectionMode({ weapon }: WeaponInspectionModeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [interfaceHidden, setInterfaceHidden] = useState(false);
  const [presentation, setPresentation] =
    useState<ViewerPresentation>(INITIAL_PRESENTATION);
  const [aspect, setAspect] = useState<ViewerAspect>("landscape");
  const [modelReady, setModelReady] = useState(false);
  const [captureMessage, setCaptureMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key.toLowerCase() === "h") {
        setInterfaceHidden((hidden) => !hidden);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!captureMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setCaptureMessage(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [captureMessage]);

  const updatePresentation = useCallback(
    <Key extends keyof ViewerPresentation,>(
      key: Key,
      value: ViewerPresentation[Key],
    ) => {
      setPresentation((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement | null) => {
    captureCanvasRef.current = canvas;
  }, []);

  const handleModelReady = useCallback(() => setModelReady(true), []);

  const handleOpen = () => {
    setModelReady(false);
    setCaptureMessage("");
    setInterfaceHidden(false);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleCapture = () => {
    const canvas = captureCanvasRef.current;

    if (!canvas || !modelReady) {
      setCaptureMessage("Model is still preparing");
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = `project-gunsmth-${weapon.slug}-${presentation.lighting}-${aspect}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCaptureMessage("PNG capture saved");
    } catch {
      setCaptureMessage("Capture unavailable in this browser");
    }
  };

  return (
    <div className="weapon-inspection-experience">
      <WeaponViewer weapon={weapon} compact paused={isOpen} />

      <button
        className="inspection-launch"
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
      >
        <span className="inspection-launch__reticle" aria-hidden="true" />
        <span>
          <small>Fullscreen image lab</small>
          <strong>Inspection mode</strong>
        </span>
        <span className="inspection-launch__key" aria-hidden="true">Enter</span>
      </button>

      <dialog
        ref={dialogRef}
        className="inspection-dialog"
        aria-label={`${weapon.name} cinematic inspection mode`}
        onCancel={(event) => {
          event.preventDefault();
          handleClose();
        }}
        onClose={handleClose}
      >
        {isOpen ? (
          <div
            className="inspection-shell"
            data-interface-hidden={interfaceHidden}
            data-lighting={presentation.lighting}
          >
            <header className="inspection-header">
              <div className="inspection-header__brand">
                <GunsmthMark />
                <span>
                  <small>Project Gunsmth</small>
                  <strong>Cinematic inspection</strong>
                </span>
              </div>

              <div className="inspection-header__file">
                <span>{weapon.id}</span>
                <strong>{weapon.name}</strong>
                <span>{formatWeaponClass(weapon.weaponClass)}</span>
              </div>

              <button
                ref={closeButtonRef}
                className="inspection-header__close"
                type="button"
                onClick={handleClose}
                aria-label="Close inspection mode"
              >
                <span>Close</span>
                <strong aria-hidden="true">×</strong>
              </button>
            </header>

            <main className="inspection-stage">
              <div className="inspection-stage__frame" data-aspect={aspect}>
                <div className="inspection-stage__grid" aria-hidden="true" />
                <WeaponViewer
                  weapon={weapon}
                  compact
                  inspection
                  showControls={false}
                  captureEnabled
                  presentation={presentation}
                  onCanvasReady={handleCanvasReady}
                onModelReady={handleModelReady}
                />
                {presentation.surface === "scan" ? (
                  <div className="inspection-stage__scan" aria-hidden="true" />
                ) : null}

                <div className="inspection-stage__metadata" aria-hidden="true">
                  <div>
                    <span>Subject / {weapon.modelId}</span>
                    <strong>{weapon.name}</strong>
                  </div>
                  <div>
                    <span>Environment</span>
                    <strong>{presentation.lighting}</strong>
                  </div>
                  <div>
                    <span>Surface</span>
                    <strong>{presentation.surface}</strong>
                  </div>
                </div>
              </div>

              {interfaceHidden ? (
                <button
                  className="inspection-interface-restore"
                  type="button"
                  onClick={() => setInterfaceHidden(false)}
                >
                  Show interface <kbd>H</kbd>
                </button>
              ) : null}
            </main>

            <aside className="inspection-panel" aria-label="Inspection controls">
              <div className="inspection-panel__heading">
                <span>Image lab / 01</span>
                <strong>Configure the frame.</strong>
              </div>

              <fieldset className="inspection-control-group">
                <legend>Lighting environment</legend>
                <div className="inspection-options inspection-options--two">
                  {LIGHTING_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      data-active={presentation.lighting === option.value}
                      aria-pressed={presentation.lighting === option.value}
                      onClick={() => updatePresentation("lighting", option.value)}
                    >
                      <span className={`inspection-swatch inspection-swatch--${option.value}`} />
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="inspection-control-group">
                <legend>Surface rendering</legend>
                <div className="inspection-options inspection-options--two">
                  {SURFACE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      data-active={presentation.surface === option.value}
                      aria-pressed={presentation.surface === option.value}
                      onClick={() => updatePresentation("surface", option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="inspection-control-group">
                <legend>Camera framing</legend>
                <div className="inspection-options inspection-options--three">
                  {FRAMING_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      data-active={presentation.framing === option.value}
                      aria-pressed={presentation.framing === option.value}
                      onClick={() => updatePresentation("framing", option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="inspection-control-group">
                <legend>Turntable motion</legend>
                <button
                  className="inspection-toggle"
                  type="button"
                  role="switch"
                  aria-checked={presentation.autoRotate}
                  onClick={() =>
                    updatePresentation("autoRotate", !presentation.autoRotate)
                  }
                >
                  <span>{presentation.autoRotate ? "Running" : "Paused"}</span>
                  <i aria-hidden="true" />
                </button>
                <label className="inspection-range">
                  <span>
                    Rotation speed
                    <output>{presentation.autoRotateSpeed.toFixed(2)}</output>
                  </span>
                  <input
                    type="range"
                    min="0.15"
                    max="1.2"
                    step="0.05"
                    value={presentation.autoRotateSpeed}
                    disabled={!presentation.autoRotate}
                    onChange={(event) =>
                      updatePresentation(
                        "autoRotateSpeed",
                        Number(event.currentTarget.value),
                      )
                    }
                  />
                </label>
              </fieldset>

              <fieldset className="inspection-control-group">
                <legend>Capture format</legend>
                <div className="inspection-options inspection-options--three">
                  {ASPECT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      data-active={aspect === option.value}
                      aria-pressed={aspect === option.value}
                      onClick={() => setAspect(option.value)}
                    >
                      <span>{option.label}</span>
                      <small>{option.ratio}</small>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="inspection-panel__actions">
                <button
                  type="button"
                  className="inspection-capture"
                  disabled={!modelReady}
                  onClick={handleCapture}
                >
                  <span>{modelReady ? "Save PNG capture" : "Preparing model"}</span>
                  <strong aria-hidden="true">↓</strong>
                </button>
                <button
                  type="button"
                  className="inspection-hide-interface"
                  onClick={() => setInterfaceHidden(true)}
                >
                  Hide interface <kbd>H</kbd>
                </button>
                <p className="inspection-capture__status" aria-live="polite">
                  {captureMessage || "PNG output contains the clean 3D frame."}
                </p>
              </div>
            </aside>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
