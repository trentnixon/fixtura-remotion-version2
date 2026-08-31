export type TopographicFlowVariantKey = "baseline" | "fine" | "smooth";

export type TopographicFlowVariantConfig = {
  readonly spacing: number;
  readonly scale: number;
  readonly complexity: number;
  readonly smoothness: number;
  readonly glowRadius: number;
  readonly glowIntensity: number;
  readonly glowThreshold: number;
  readonly contourSeed: number;
};

export const TOPOGRAPHIC_FLOW_VARIANT_KEYS = [
  "baseline",
  "fine",
  "smooth",
] as const satisfies readonly TopographicFlowVariantKey[];

export const TOPOGRAPHIC_FLOW_VARIANTS: Record<
  TopographicFlowVariantKey,
  TopographicFlowVariantConfig
> = {
  baseline: {
    spacing: 72,
    scale: 300,
    complexity: 0.35,
    smoothness: 0.86,
    glowRadius: 18,
    glowIntensity: 0.45,
    glowThreshold: 0.35,
    contourSeed: 7,
  },
  fine: {
    spacing: 34,
    scale: 250,
    complexity: 0.7,
    smoothness: 0.78,
    glowRadius: 10,
    glowIntensity: 0.25,
    glowThreshold: 0.55,
    contourSeed: 7,
  },
  smooth: {
    spacing: 96,
    scale: 440,
    complexity: 0.18,
    smoothness: 0.98,
    glowRadius: 28,
    glowIntensity: 0.18,
    glowThreshold: 0.6,
    contourSeed: 7,
  },
};

export const LOOP_DURATION_IN_SECONDS = 12;

export const TOPOGRAPHIC_FLOW_VIGNETTE = {
  amount: 0.62,
  radius: 0.62,
  feather: 0.42,
} as const;

export const getContourPhase = (frame: number, fps: number): number => {
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  return loopProgress * Math.PI * 2;
};
