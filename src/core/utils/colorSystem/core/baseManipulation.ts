import tinycolor from "tinycolor2";
import { COLOR_AMOUNTS } from "../config/constants";

/**
 * Gets a contrasting color (black or white) for the provided color
 * @param color The base color
 * @returns Either black or white depending on what contrasts better
 */
export const getContrastColor = (color: string): string => {
  return tinycolor(color).isDark() ? "#FFFFFF" : "#000000";
};

/**
 * Lightens a color by a specified amount
 * @param color The color to lighten
 * @param amount Amount to lighten (0-100)
 * @returns Lightened color string
 */
export const lightenColor = (color: string, amount: number): string => {
  return tinycolor(color).lighten(amount).toString();
};

/**
 * Darkens a color by a specified amount
 * @param color The color to darken
 * @param amount Amount to darken (0-100)
 * @returns Darkened color string
 */
export const darkenColor = (color: string, amount: number): string => {
  return tinycolor(color).darken(amount).toString();
};

/**
 * Sets the opacity/alpha of a color
 * @param color The color to adjust
 * @param alpha Alpha value (0-1)
 * @returns Color with adjusted opacity
 */
export const setOpacity = (color: string, alpha: number): string => {
  return tinycolor(color).setAlpha(alpha).toRgbString();
};

/**
 * Saturates or desaturates a color
 * @param color The color to adjust
 * @param amount Amount to saturate (positive) or desaturate (negative)
 * @returns Adjusted color string
 */
export const saturateOrDesaturateColor = (
  color: string,
  amount: number,
): string => {
  return amount >= 0
    ? tinycolor(color).saturate(amount).toString()
    : tinycolor(color).desaturate(Math.abs(amount)).toString();
};

/**
 * Mixes two colors together
 * @param color1 First color
 * @param color2 Second color
 * @param amount Amount of the second color to mix in (0-100)
 * @returns Mixed color string
 */
export const mixColors = (
  color1: string,
  color2: string,
  amount: number = 50,
): string => {
  return tinycolor.mix(color1, color2, amount).toString();
};

/**
 * Generates a random color
 * @param options Configuration options
 * @returns Random color string
 */
export const randomColor = (options?: {
  hue?: number | string;
  luminosity?: "bright" | "light" | "dark" | "random";
  seed?: string;
}): string => {
  const result = tinycolor.random();

  if (options?.luminosity === "bright") {
    return result.brighten(20).toString();
  }

  if (options?.luminosity === "light") {
    return result.lighten(20).toString();
  }

  if (options?.luminosity === "dark") {
    return result.darken(20).toString();
  }

  return result.toString();
};

/**
 * Creates standard variations of a color
 * @param color The base color
 * @returns Object containing variations
 */
export const createColorVariations = (color: string) => {
  return {
    base: color,
    light: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_SMALL),
    lighter: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_MEDIUM),
    lightest: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_LARGE),
    dark: darkenColor(color, COLOR_AMOUNTS.DARKEN_SMALL),
    darker: darkenColor(color, COLOR_AMOUNTS.DARKEN_MEDIUM),
    darkest: darkenColor(color, COLOR_AMOUNTS.DARKEN_LARGE),
    transparent: setOpacity(color, COLOR_AMOUNTS.OPACITY_MEDIUM),
    semiTransparent: setOpacity(color, COLOR_AMOUNTS.OPACITY_LOW),
    contrastText: getContrastColor(color),
    saturated: saturateOrDesaturateColor(color, COLOR_AMOUNTS.SATURATE),
    desaturated: saturateOrDesaturateColor(color, COLOR_AMOUNTS.DESATURATE),
    muted: setOpacity(
      saturateOrDesaturateColor(color, COLOR_AMOUNTS.DESATURATE / 2),
      COLOR_AMOUNTS.OPACITY_HIGH,
    ),
    accent: saturateOrDesaturateColor(
      lightenColor(color, 5),
      COLOR_AMOUNTS.SATURATE,
    ),
  };
};

/**
 * Determines if a color is valid
 * @param color The color to validate
 * @returns Boolean indicating if color is valid
 */
export const isValidColor = (color: string): boolean => {
  return tinycolor(color).isValid();
};

/**
 * Gets information about a color
 * @param color The color to analyze
 * @returns Object with color information
 */
export const getColorInfo = (color: string) => {
  const tc = tinycolor(color);
  return {
    isValid: tc.isValid(),
    isDark: tc.isDark(),
    isLight: tc.isLight(),
    brightness: tc.getBrightness(),
    format: tc.getFormat(),
    rgb: tc.toRgb(),
    hsl: tc.toHsl(),
    hex: tc.toHex(),
    hexString: tc.toHexString(),
  };
};
