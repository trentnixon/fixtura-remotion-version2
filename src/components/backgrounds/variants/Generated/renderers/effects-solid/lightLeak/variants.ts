export type GradientPoint = readonly [number, number];

export type LightLeakHueRole = "main" | "accent";

export type LightLeakLayerConfig = {
  readonly seed: number;
  readonly hueRole: LightLeakHueRole;
  readonly phaseOffset: number;
};

export type LightLeakVariantKey =
  | "warm-flare"
  | "cool-flare"
  | "slow-breathe"
  | "dual-flare"
  | "vertical-wash"
  | "soft-bloom";

export type LightLeakVariantConfig = {
  readonly gradientStart: GradientPoint;
  readonly gradientEnd: GradientPoint;
  readonly leaks: readonly LightLeakLayerConfig[];
  readonly progressCycles: number;
  readonly vignetteAmount: number;
  readonly vignetteRadius: number;
};

export const LIGHT_LEAK_VARIANT_KEYS = [
  "warm-flare",
  "cool-flare",
  "slow-breathe",
  "dual-flare",
  "vertical-wash",
  "soft-bloom",
] as const satisfies readonly LightLeakVariantKey[];

export const LIGHT_LEAK_VARIANTS: Record<
  LightLeakVariantKey,
  LightLeakVariantConfig
> = {
  "warm-flare": {
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 4, hueRole: "accent", phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.58,
    vignetteRadius: 0.64,
  },
  "cool-flare": {
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 9, hueRole: "main", phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.62,
    vignetteRadius: 0.64,
  },
  "slow-breathe": {
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [{ seed: 6, hueRole: "accent", phaseOffset: 0 }],
    progressCycles: 1,
    vignetteAmount: 0.56,
    vignetteRadius: 0.66,
  },
  "dual-flare": {
    gradientStart: [0, 1],
    gradientEnd: [1, 0],
    leaks: [
      { seed: 4, hueRole: "accent", phaseOffset: 0 },
      { seed: 13, hueRole: "main", phaseOffset: 0.5 },
    ],
    progressCycles: 2,
    vignetteAmount: 0.6,
    vignetteRadius: 0.62,
  },
  "vertical-wash": {
    gradientStart: [0.5, 0],
    gradientEnd: [0.5, 1],
    leaks: [{ seed: 11, hueRole: "accent", phaseOffset: 0.15 }],
    progressCycles: 2,
    vignetteAmount: 0.54,
    vignetteRadius: 0.68,
  },
  "soft-bloom": {
    gradientStart: [0, 0.5],
    gradientEnd: [1, 0.5],
    leaks: [{ seed: 16, hueRole: "accent", phaseOffset: 0 }],
    progressCycles: 2,
    vignetteAmount: 0.42,
    vignetteRadius: 0.72,
  },
};

export const LOOP_DURATION_IN_SECONDS = 12;

export const getLeakProgress = (
  loopProgress: number,
  phaseOffset: number,
  progressCycles: number,
): number => {
  const phased = (loopProgress + phaseOffset) % 1;
  return 0.5 - 0.5 * Math.cos(phased * Math.PI * 2 * progressCycles);
};

export const resolveHueShift = (
  role: LightLeakHueRole,
  palette: {
    main: string | null | undefined;
    accent: string | null | undefined;
  },
  colorToHueFn: (color: string | null | undefined) => number,
): number => colorToHueFn(role === "main" ? palette.main : palette.accent);
