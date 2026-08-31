import tinycolor from "tinycolor2";
import type { LottieAnimationData } from "@remotion/lottie";

export type MotifPalette = {
  accent: string;
  line: string;
};

const colorToLottieColor = (
  color: string | null | undefined,
): [number, number, number, number] => {
  const parsed = tinycolor(color ?? "#ffffff");
  const rgb = parsed.isValid() ? parsed.toRgb() : { r: 255, g: 255, b: 255 };

  return [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1];
};

const staticTransform = {
  p: { a: 0, k: [0, 0, 0] },
  a: { a: 0, k: [0, 0, 0] },
  s: { a: 0, k: [100, 100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
};

const ringLayer = (
  name: string,
  radius: number,
  strokeWidth: number,
  dash: number,
  gap: number,
  color: [number, number, number, number],
  direction: 1 | -1,
) => ({
  ddd: 0,
  ind: name,
  ty: 4,
  nm: name,
  sr: 1,
  ks: {
    o: { a: 0, k: 100 },
    r: {
      a: 1,
      k: [
        {
          t: 0,
          s: [0],
          e: [360 * direction],
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        },
        { t: 360, s: [360 * direction] },
      ],
    },
    p: { a: 0, k: [540, 540, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  },
  ao: 0,
  shapes: [
    {
      ty: "gr",
      it: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [radius, radius] },
        },
        {
          ty: "st",
          c: { a: 0, k: color },
          o: { a: 0, k: 100 },
          w: { a: 0, k: strokeWidth },
          lc: 2,
          lj: 2,
          d: [
            { n: "d", nm: "dash", v: { a: 0, k: dash } },
            { n: "g", nm: "gap", v: { a: 0, k: gap } },
          ],
        },
        { ty: "tr", ...staticTransform },
      ],
    },
  ],
  ip: 0,
  op: 360,
  st: 0,
  bm: 0,
});

const tickLayer = (
  name: string,
  angle: number,
  color: [number, number, number, number],
) => ({
  ddd: 0,
  ind: name,
  ty: 4,
  nm: name,
  sr: 1,
  ks: {
    o: {
      a: 1,
      k: [
        {
          t: 0,
          s: [35],
          e: [90],
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        },
        {
          t: 90,
          s: [90],
          e: [35],
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        },
        {
          t: 180,
          s: [35],
          e: [90],
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        },
        {
          t: 270,
          s: [90],
          e: [35],
          i: { x: [0.667], y: [1] },
          o: { x: [0.333], y: [0] },
        },
        { t: 360, s: [35] },
      ],
    },
    r: { a: 0, k: angle },
    p: { a: 0, k: [540, 540, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: { a: 0, k: [100, 100, 100] },
  },
  ao: 0,
  shapes: [
    {
      ty: "gr",
      it: [
        {
          ty: "rc",
          p: { a: 0, k: [0, -320] },
          s: { a: 0, k: [10, 48] },
          r: { a: 0, k: 4 },
        },
        {
          ty: "fl",
          c: { a: 0, k: color },
          o: { a: 0, k: 100 },
        },
        { ty: "tr", ...staticTransform },
      ],
    },
  ],
  ip: 0,
  op: 360,
  st: 0,
  bm: 0,
});

/** Twelve-second broadcast motif loop — palette colours injected per club theme. */
export const createBroadcastMotifLottie = (
  palette: MotifPalette,
): LottieAnimationData => {
  const accent = colorToLottieColor(palette.accent);
  const line = colorToLottieColor(palette.line);

  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 360,
    w: 1080,
    h: 1080,
    nm: "BroadcastMotifLoop",
    ddd: 0,
    assets: [],
    layers: [
      ringLayer("outer-ring", 760, 10, 120, 160, line, 1),
      ringLayer("mid-ring", 560, 8, 90, 110, accent, -1),
      ringLayer("inner-ring", 360, 6, 70, 80, line, 1),
      tickLayer("tick-a", 0, accent),
      tickLayer("tick-b", 90, line),
      tickLayer("tick-c", 180, accent),
      tickLayer("tick-d", 270, line),
    ],
  };
};
