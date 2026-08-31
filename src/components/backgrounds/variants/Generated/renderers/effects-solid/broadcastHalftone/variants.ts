export type GradientPoint = readonly [number, number];

export const LOOP_DURATION_IN_SECONDS = 6;

export const BROADCAST_HALFTONE_CONFIG = {
  gradientStart: [0, 0.1] as GradientPoint,
  gradientEnd: [1, 0.9] as GradientPoint,
  halftone: {
    firstStopDotSize: 2,
    secondStopDotSize: 46,
    firstStopPosition: [0, 0.08] as GradientPoint,
    secondStopPosition: [1, 0.88] as GradientPoint,
    gridSize: 34,
  },
  wave: {
    direction: "horizontal" as const,
    amplitude: 24,
    wavelength: 420,
  },
  vignette: {
    amount: 0.36,
    radius: 0.72,
    feather: 0.5,
  },
} as const;

export const getWavePhase = (frame: number, fps: number): number => {
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;
  return loopProgress * Math.PI * 2;
};
