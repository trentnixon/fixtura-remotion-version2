export type ReactivePathVariantKey = "orbits" | "hits";

export type OrbitSpec = {
  readonly radius: number;
  readonly dashRatio: number;
  readonly strokeWidth: number;
  readonly direction: 1 | -1;
  readonly color: "accent" | "line";
};

export type RouteSpec = {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly strokeWidth: number;
  readonly color: "accent" | "line";
  readonly direction: 1 | -1;
  readonly phase: number;
};

export type ReactivePathPalette = {
  readonly main: string;
  readonly accent: string;
  readonly line: string;
};

export type ResolvedRoute = {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly length: number;
};

export const REACTIVE_PATH_VARIANT_KEYS = [
  "orbits",
  "hits",
] as const satisfies readonly ReactivePathVariantKey[];

export const REACTIVE_PATH_ORBITS: readonly OrbitSpec[] = [
  {
    radius: 220,
    dashRatio: 0.34,
    strokeWidth: 2,
    direction: 1,
    color: "line",
  },
  {
    radius: 310,
    dashRatio: 0.28,
    strokeWidth: 2,
    direction: -1,
    color: "accent",
  },
  {
    radius: 400,
    dashRatio: 0.22,
    strokeWidth: 3,
    direction: 1,
    color: "line",
  },
  {
    radius: 490,
    dashRatio: 0.18,
    strokeWidth: 2,
    direction: -1,
    color: "accent",
  },
  {
    radius: 580,
    dashRatio: 0.14,
    strokeWidth: 2,
    direction: 1,
    color: "line",
  },
];

export const REACTIVE_PATH_ROUTES: readonly RouteSpec[] = [
  {
    x1: 0.07,
    y1: 0.14,
    x2: 0.93,
    y2: 0.11,
    strokeWidth: 2,
    color: "line",
    direction: 1,
    phase: 0,
  },
  {
    x1: 0.09,
    y1: 0.27,
    x2: 0.91,
    y2: 0.31,
    strokeWidth: 2,
    color: "accent",
    direction: -1,
    phase: 0.14,
  },
  {
    x1: 0.06,
    y1: 0.44,
    x2: 0.88,
    y2: 0.4,
    strokeWidth: 3,
    color: "line",
    direction: 1,
    phase: 0.28,
  },
  {
    x1: 0.12,
    y1: 0.58,
    x2: 0.9,
    y2: 0.62,
    strokeWidth: 2,
    color: "accent",
    direction: 1,
    phase: 0.42,
  },
  {
    x1: 0.08,
    y1: 0.74,
    x2: 0.86,
    y2: 0.7,
    strokeWidth: 2,
    color: "line",
    direction: -1,
    phase: 0.56,
  },
  {
    x1: 0.14,
    y1: 0.86,
    x2: 0.72,
    y2: 0.52,
    strokeWidth: 2,
    color: "accent",
    direction: 1,
    phase: 0.7,
  },
];

export const REACTIVE_PATH_VARIANTS: Record<
  ReactivePathVariantKey,
  {
    readonly glowRadius: number;
    readonly glowIntensity: number;
  }
> = {
  orbits: {
    glowRadius: 16,
    glowIntensity: 0.18,
  },
  hits: {
    glowRadius: 20,
    glowIntensity: 0.24,
  },
};

export const LOOP_DURATION_IN_SECONDS = 12;

export const REACTIVE_PATH_GRADIENT = {
  start: [0.1, 0] as const,
  end: [0.9, 1] as const,
};

export const REACTIVE_PATH_VIGNETTE = {
  amount: 0.64,
  radius: 0.62,
  feather: 0.46,
} as const;

export const REACTIVE_PATH_GLOW = {
  threshold: 0.52,
} as const;

export const REACTIVE_PATH_ORBIT_CENTER = {
  x: 0.52,
  y: 0.46,
} as const;

export const getReactivePathLoopProgress = (
  frame: number,
  fps: number,
): number => {
  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  return (frame % loopFrames) / loopFrames;
};

export const strokeFor = (
  palette: ReactivePathPalette,
  color: "accent" | "line",
): string => (color === "accent" ? palette.accent : palette.line);

export const resolveRoute = (
  route: RouteSpec,
  width: number,
  height: number,
): ResolvedRoute => {
  const x1 = route.x1 * width;
  const y1 = route.y1 * height;
  const x2 = route.x2 * width;
  const y2 = route.y2 * height;

  return {
    x1,
    y1,
    x2,
    y2,
    length: Math.hypot(x2 - x1, y2 - y1),
  };
};

export const routeProgress = (route: RouteSpec, loopProgress: number): number =>
  (loopProgress * route.direction + route.phase + 1) % 1;

export const pointOnRoute = (
  route: RouteSpec,
  width: number,
  height: number,
  t: number,
): { x: number; y: number } => {
  const resolved = resolveRoute(route, width, height);
  const clampedT = route.direction === 1 ? t : 1 - t;

  return {
    x: resolved.x1 + (resolved.x2 - resolved.x1) * clampedT,
    y: resolved.y1 + (resolved.y2 - resolved.y1) * clampedT,
  };
};
