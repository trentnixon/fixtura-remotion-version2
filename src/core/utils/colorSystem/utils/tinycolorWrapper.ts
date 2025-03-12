import tinycolor from "tinycolor2";
import { memoizeColorFunction } from "../core/memoization";

/**
 * A wrapper around tinycolor2 to ensure consistent usage and enable future library swapping
 * Also adds memoization for performance
 */

// Basic color validation and conversion
export const isValidColor = memoizeColorFunction(
  (color: string): boolean => tinycolor(color).isValid()
);

export const toHex = memoizeColorFunction(
  (color: string): string => tinycolor(color).toHexString()
);

export const toRgb = memoizeColorFunction(
  (color: string): string => tinycolor(color).toRgbString()
);

export const toHsl = memoizeColorFunction(
  (color: string): string => tinycolor(color).toHslString()
);

// Color information
export const isDark = memoizeColorFunction(
  (color: string): boolean => tinycolor(color).isDark()
);

export const isLight = memoizeColorFunction(
  (color: string): boolean => tinycolor(color).isLight()
);

export const getLuminance = memoizeColorFunction(
  (color: string): number => tinycolor(color).getLuminance()
);

export const getBrightness = memoizeColorFunction(
  (color: string): number => tinycolor(color).getBrightness()
);

// Color manipulation
export const lighten = memoizeColorFunction(
  (color: string, amount: number): string => tinycolor(color).lighten(amount).toString()
);

export const brighten = memoizeColorFunction(
  (color: string, amount: number): string => tinycolor(color).brighten(amount).toString()
);

export const darken = memoizeColorFunction(
  (color: string, amount: number): string => tinycolor(color).darken(amount).toString()