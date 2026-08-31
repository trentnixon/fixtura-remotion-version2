import tinycolor from "tinycolor2";
import type { LuminanceLookupTable, LuminanceStop } from "./types";
import { LUMINANCE_LUT_SIZE } from "./types";

const interpolateStopColor = (
  stops: readonly LuminanceStop[],
  position: number,
): tinycolor.Instance => {
  if (position <= stops[0].position) {
    return tinycolor(stops[0].color);
  }

  const last = stops[stops.length - 1];
  if (position >= last.position) {
    return tinycolor(last.color);
  }

  for (let index = 0; index < stops.length - 1; index += 1) {
    const start = stops[index];
    const end = stops[index + 1];

    if (position >= start.position && position <= end.position) {
      const range = end.position - start.position;
      const ratio = range === 0 ? 0 : (position - start.position) / range;
      return tinycolor.mix(start.color, end.color, ratio * 100);
    }
  }

  return tinycolor(last.color);
};

export const sampleLutFromStops = (
  stops: readonly LuminanceStop[],
): LuminanceLookupTable => {
  const r: number[] = [];
  const g: number[] = [];
  const b: number[] = [];

  for (let index = 0; index < LUMINANCE_LUT_SIZE; index += 1) {
    const position = index / (LUMINANCE_LUT_SIZE - 1);
    const rgb = interpolateStopColor(stops, position).toRgb();
    r.push(rgb.r);
    g.push(rgb.g);
    b.push(rgb.b);
  }

  return { r, g, b };
};

export const lutIndexForStopPosition = (position: number): number =>
  Math.round(position * (LUMINANCE_LUT_SIZE - 1));

export const midpointIndexBetweenStops = (
  left: number,
  right: number,
): number => Math.round(((left + right) / 2) * (LUMINANCE_LUT_SIZE - 1));
