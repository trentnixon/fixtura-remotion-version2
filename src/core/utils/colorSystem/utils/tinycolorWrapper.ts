import tinycolor from "tinycolor2";
import { memoizeColorFunction } from "../core/memoization";
import { memoize } from "../core/memoization";

/**
 * A wrapper around tinycolor2 to ensure consistent usage and enable future library swapping
 * Also adds memoization for performance
 */

// Basic color validation and conversion
export const isValidColor = memoize((...args: unknown[]): boolean => {
  const color = args[0] as string;
  return tinycolor(color).isValid();
});

export const toHex = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  return tinycolor(color).toHexString();
});

export const toRgb = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  return tinycolor(color).toRgbString();
});

export const toHsl = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  return tinycolor(color).toHslString();
});

// Color information
export const isDark = memoize((...args: unknown[]): boolean => {
  const color = args[0] as string;
  return tinycolor(color).isDark();
});

export const isLight = memoize((...args: unknown[]): boolean => {
  const color = args[0] as string;
  return tinycolor(color).isLight();
});

export const getLuminance = memoize((...args: unknown[]): number => {
  const color = args[0] as string;
  return tinycolor(color).getLuminance();
});

export const getBrightness = memoize((...args: unknown[]): number => {
  const color = args[0] as string;
  return tinycolor(color).getBrightness();
});

// Color manipulation
export const lighten = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  const amount = args[1] as number;
  return tinycolor(color).lighten(amount).toString();
});

export const brighten = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  const amount = args[1] as number;
  return tinycolor(color).brighten(amount).toString();
});

export const darken = memoizeColorFunction((...args: unknown[]): string => {
  const color = args[0] as string;
  const amount = args[1] as number;
  return tinycolor(color).darken(amount).toString();
});
