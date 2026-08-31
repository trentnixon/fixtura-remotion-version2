export type SignalGridVariantKey = "floor" | "floor-inverted";

export type SignalGridVariantConfig = {
  readonly gridSize: number;
  readonly lineWidth: number;
  readonly rotation: number;
  readonly rotationX: number;
  readonly rotationY: number;
  readonly perspective: number;
  readonly scanAmount: number;
  readonly scanSpacing: number;
};

export const SIGNAL_GRID_VARIANT_KEYS = [
  "floor",
  "floor-inverted",
] as const satisfies readonly SignalGridVariantKey[];

export const SIGNAL_GRID_VARIANTS: Record<
  SignalGridVariantKey,
  SignalGridVariantConfig
> = {
  floor: {
    gridSize: 64,
    lineWidth: 2,
    rotation: 0,
    rotationX: 42,
    rotationY: 0,
    perspective: 650,
    scanAmount: 0.08,
    scanSpacing: 8,
  },
  "floor-inverted": {
    gridSize: 64,
    lineWidth: 2,
    rotation: 0,
    rotationX: -42,
    rotationY: 0,
    perspective: 650,
    scanAmount: 0.08,
    scanSpacing: 8,
  },
};

export const LOOP_DURATION_IN_SECONDS = 12;

export const SIGNAL_GRID_VIGNETTE = {
  amount: 0.64,
  radius: 0.62,
  feather: 0.42,
} as const;

export const getSignalGridLoopProgress = (
  frame: number,
  fps: number,
): number => {
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  return (frame % loopFrames) / loopFrames;
};

export const getGridOffsetY = (
  loopProgress: number,
  gridSize: number,
): number => loopProgress * gridSize;

export const getScanlineOffset = (loopProgress: number): number =>
  loopProgress * 6;
