export type MotionMotifVariantKey = "baseline" | "tiled-field";

export const MOTION_MOTIF_VARIANT_KEYS = [
  "baseline",
  "tiled-field",
] as const satisfies readonly MotionMotifVariantKey[];

export const MOTION_MOTIF_VARIANTS: Record<
  MotionMotifVariantKey,
  {
    readonly motifOpacity: number;
    readonly motifScale: number;
    readonly tileCount?: number;
  }
> = {
  baseline: {
    motifOpacity: 0.42,
    motifScale: 1.18,
  },
  "tiled-field": {
    motifOpacity: 0.28,
    motifScale: 0.46,
    tileCount: 3,
  },
};

export const LOOP_DURATION_IN_SECONDS = 12;

export const MOTION_MOTIF_GRADIENT = {
  start: [0.08, 0] as const,
  end: [0.92, 1] as const,
};

export const MOTION_MOTIF_GLOW = {
  radius: 18,
  baseIntensity: 0.16,
  pulseAmplitude: 0.04,
  threshold: 0.5,
} as const;

export const MOTION_MOTIF_VIGNETTE = {
  amount: 0.66,
  radius: 0.6,
  feather: 0.48,
} as const;

export const getMotionMotifLoopProgress = (
  frame: number,
  fps: number,
): number => {
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  return (frame % loopFrames) / loopFrames;
};

export const getMotionMotifGlowIntensity = (loopProgress: number): number =>
  MOTION_MOTIF_GLOW.baseIntensity +
  Math.sin(loopProgress * Math.PI * 2) * MOTION_MOTIF_GLOW.pulseAmplitude;

export const getTilePlaybackRate = (phase: number): number =>
  phase === 0 ? 1 : phase === 1 ? 0.82 : 1.18;

export const getTileOpacityMultiplier = (phase: number): number =>
  0.85 + phase * 0.05;
