import tinycolor from "tinycolor2";
import type { LuminanceLookupTable, LuminanceSegment } from "./types";
import { LUMINANCE_LUT_SIZE } from "./types";

const findSegment = (
  segments: readonly LuminanceSegment[],
  position: number,
): LuminanceSegment => {
  const last = segments[segments.length - 1];

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const isLast = index === segments.length - 1;

    if (isLast) {
      if (position >= segment.from && position <= segment.to) {
        return segment;
      }
    } else if (position >= segment.from && position < segment.to) {
      return segment;
    }
  }

  return last;
};

const colorAtPosition = (
  segments: readonly LuminanceSegment[],
  position: number,
): tinycolor.Instance => {
  const segment = findSegment(segments, position);

  if (segment.kind === "solid") {
    return tinycolor(segment.color);
  }

  const range = segment.to - segment.from;
  const ratio = range === 0 ? 0 : (position - segment.from) / range;
  return tinycolor.mix(segment.fromColor, segment.toColor, ratio * 100);
};

export const sampleLutFromSegments = (
  segments: readonly LuminanceSegment[],
): LuminanceLookupTable => {
  const r: number[] = [];
  const g: number[] = [];
  const b: number[] = [];

  for (let index = 0; index < LUMINANCE_LUT_SIZE; index += 1) {
    const position = index / (LUMINANCE_LUT_SIZE - 1);
    const rgb = colorAtPosition(segments, position).toRgb();
    r.push(rgb.r);
    g.push(rgb.g);
    b.push(rgb.b);
  }

  return { r, g, b };
};

/** LUT index for a luminance position in [0, 1]. */
export const lutIndexForPosition = (position: number): number =>
  Math.round(position * (LUMINANCE_LUT_SIZE - 1));
