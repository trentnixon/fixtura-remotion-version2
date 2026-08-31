import type { LuminancePreMapControls } from "./types";
import { DEFAULT_PRE_MAP, LUMINANCE_LUT_SIZE } from "./types";

export const clampByte = (value: number): number =>
  Math.min(255, Math.max(0, Math.round(value)));

export const applyPreMapTone = (
  tone: number,
  controls: LuminancePreMapControls = DEFAULT_PRE_MAP,
): number => {
  const contrast = controls.contrast ?? DEFAULT_PRE_MAP.contrast;
  const brightness = controls.brightness ?? DEFAULT_PRE_MAP.brightness;

  let normalized = tone / (LUMINANCE_LUT_SIZE - 1);
  normalized += brightness;
  normalized = (normalized - 0.5) * contrast + 0.5;

  return clampByte(normalized * (LUMINANCE_LUT_SIZE - 1));
};

export const reverseSourceTone = (tone: number): number =>
  LUMINANCE_LUT_SIZE - 1 - tone;

export const lookupChannel = (table: readonly number[], tone: number): number =>
  table[tone] ?? table[table.length - 1] ?? 0;

export const toneToHex = (
  lut: { r: readonly number[]; g: readonly number[]; b: readonly number[] },
  tone: number,
): string => {
  const r = lookupChannel(lut.r, tone);
  const g = lookupChannel(lut.g, tone);
  const b = lookupChannel(lut.b, tone);
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
};
