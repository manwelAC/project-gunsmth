export type ViewerLightingPreset =
  | "studio"
  | "tactical"
  | "cold"
  | "silhouette";

export type ViewerSurfaceMode = "material" | "scan";

export type ViewerFraming = "wide" | "standard" | "detail";

export type ViewerAspect = "landscape" | "square" | "portrait";

export interface ViewerPresentation {
  lighting: ViewerLightingPreset;
  surface: ViewerSurfaceMode;
  framing: ViewerFraming;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

